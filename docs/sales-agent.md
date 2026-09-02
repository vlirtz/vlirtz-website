# VLIRTZ sales agent

An autonomous sales and onboarding agent embedded in the website. It answers
technical questions from the knowledge base, qualifies the visitor, saves the
lead, and guides them to a Cal.com discovery call.

## Design principle: nothing is required

Every integration degrades instead of failing. With an empty `.env.local` the
site still builds and the widget still works:

| Missing | Fallback |
| --- | --- |
| `OPENAI_API_KEY` | `DemoChatModel` — scripted replies through the real agent loop and real tools |
| `PINECONE_API_KEY` / `PINECONE_INDEX_NAME` | BM25 keyword search over this repo's content |
| `DATABASE_URL` | In-memory lead store, every capture logged to the console |

The fallbacks are real implementations, not stubs. Verify with:

```bash
npm run smoke:agent
```

## File map

```
prisma/schema.prisma                Lead, Conversation, Message models
prisma.config.ts                    Prisma 7 CLI config (reads DATABASE_URL)
scripts/
  ingest.ts                         scrape → chunk → embed → upsert
  smoke-agent.ts                     offline end-to-end check
  loadEnv.ts                        .env loader for standalone scripts
src/app/api/agent/chat/route.ts     NDJSON streaming endpoint
src/components/chat/
  ChatWidget.tsx                    floating container, open/close state
  ChatLauncher.tsx                  bubble button
  ChatPanel.tsx                     card shell, owns conversation state
  ChatHeader.tsx                    brand, status, compact booking CTA
  ChatMessageList.tsx               transcript, empty state, autoscroll
  ChatMessageBubble.tsx             one turn, links, typing indicator
  ToolActivityList.tsx              "Searching Vlirtz knowledge base…" rows
  ChatComposer.tsx                  input, Enter to send
  BookCallButton.tsx                Cal.com CTA
  useAgentChat.ts                   streaming client state machine
src/lib/agent/
  config.ts                         env parsing and capability flags
  calLink.ts                        Cal.com link, safe on client and server
  events.ts                         wire protocol shared by route and widget
  prompt.ts                         persona, guardrails, booking cadence
  agent.ts                          createAgent wiring
  demoModel.ts                      key-less fallback chat model
  run.ts                            LangGraph stream → UI events
  session.ts                        request validation, history, session ids
  rateLimit.ts                      per-IP fixed window limiter
  tools/searchKnowledgeBase.ts      searchVlirtzKnowledgeBase
  tools/saveLead.ts                 saveLeadToPostgres
  rag/corpus.ts                     chunking, shared by ingest and fallback
  rag/localSearch.ts                BM25 over the local corpus
  rag/pinecone.ts                   client, query, upsert, index creation
  rag/retriever.ts                  Pinecone first, local second
  db/index.ts                       store selection
  db/prismaStore.ts                 PostgreSQL implementation
  db/memoryStore.ts                 in-memory implementation
  db/types.ts                       shared storage contract
```

## Request flow

1. The widget POSTs `{ message, history, sessionId, sourceUrl }` to
   `/api/agent/chat`.
2. The route rate limits, validates with Zod, and issues a session id.
3. `createVlirtzAgent` builds a LangGraph ReAct agent with the two tools bound
   to that session, and a system prompt that depends on the visitor turn count.
4. The graph streams in `["updates", "messages"]` mode. `run.ts` turns that into
   UI events: tokens from `messages`, tool start/end from `updates`.
5. The route writes each event as one line of NDJSON.
6. After the stream closes, the turn is persisted.

### Wire protocol

Newline-delimited JSON, one `AgentEvent` per line (see `events.ts`):

```
{"type":"session","sessionId":"sess_…"}
{"type":"tool_start","id":"…","name":"searchVlirtzKnowledgeBase","label":"Searching Vlirtz knowledge base…"}
{"type":"tool_end","id":"…","name":"searchVlirtzKnowledgeBase","ok":true}
{"type":"token","value":"We build agents that…"}
{"type":"lead_saved","email":"person@acme.se"}
{"type":"done"}
```

NDJSON rather than Server-Sent Events: the client already needs a JSON parse per
frame, and this avoids SSE's `data:` prefix and reconnection semantics that a
one-shot POST does not want.

## Tools

**`searchVlirtzKnowledgeBase`** — the prompt requires calling it before any
answer about services or capabilities. Tries Pinecone, falls back to BM25. When
nothing matches it returns `NO_MATCHING_CONTEXT`, and the prompt instructs the
agent to offer the call rather than guess.

**`saveLeadToPostgres`** — called as soon as a name, email, company, or project
detail appears, and whenever the visitor asks to book. Validates the email
shape, refuses to store an empty lead, and merges repeat calls into one lead per
conversation. Fires a `lead_saved` event so the widget highlights the CTA.

## Guardrails

Defined in `src/lib/agent/prompt.ts`:

- Retrieval before answering; never describe the offering from memory.
- No invented prices, dates, client names, or case study numbers.
- 2–4 sentences, plain text, one question per reply.
- Booking is offered only after real intent, at most once every few exchanges,
  and never with a repeated sentence. Every third visitor turn the prompt gains
  a live directive to close with a specific invitation, so the behaviour does
  not decay in long conversations.
- Refuses to reveal its instructions or configuration.

## Setup

### 1. Model

```bash
OPENAI_API_KEY=sk-…
```

### 2. PostgreSQL

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/vlirtz?schema=public
npx prisma migrate dev --name init
```

Prisma 7 removed `url` from the schema's `datasource` block. The connection
string is read from `DATABASE_URL` by `prisma.config.ts` for CLI commands, and
passed to the `@prisma/adapter-pg` driver adapter at runtime.

The client is generated into `src/generated/prisma` by the `postinstall` script.

### 3. Pinecone

```bash
PINECONE_API_KEY=…
PINECONE_ENVIRONMENT=aws:us-east-1
PINECONE_INDEX_NAME=vlirtz-knowledge-base
```

`PINECONE_ENVIRONMENT` is interpreted as the serverless cloud and region, since
Pinecone replaced pod environments with serverless. `us-east-1`,
`aws:us-east-1`, and the legacy `us-east-1-aws` all parse.

Then ingest. The index is created automatically at the right dimension:

```bash
npm run ingest                      # this repo's services and blog posts
npm run ingest -- --site            # crawl every URL in sitemap.xml
npm run ingest -- https://a.com/x   # specific URLs
npm run ingest -- --site --dry-run  # inspect without writing
```

Re-running is safe: chunk ids are deterministic, so an ingest updates vectors
rather than duplicating them.

### 4. Cal.com

```bash
NEXT_PUBLIC_CAL_LINK=https://cal.com/borja-javierre/discovery-call
```

Used by the header and footer CTAs and offered by the agent in conversation.
Both the fallback in `lib/agent/calLink.ts` and this value must be a link that
actually resolves: it is rendered straight into an `href` and quoted verbatim in
the system prompt, so a wrong slug degrades to a silent 404 rather than an error
anyone would notice.

## Operations

The first request logs the active configuration, which is the fastest way to
spot a missing variable in production:

```
[vlirtz-agent] model=gpt-4o-mini | retrieval=pinecone:vlirtz-knowledge-base | leads=postgres
```

Retrieval is logged per call with its backend and hit count.

## Known limits

- **Rate limiting is per instance.** `rateLimit.ts` is an in-memory fixed
  window, so it does not coordinate across serverless instances. Move to Redis
  or Vercel KV before relying on it.
- **History is client-supplied.** The transcript is stored for analytics, but
  each request replays history from the browser. A visitor could edit it.
  Add a LangGraph checkpointer to make the server authoritative.
- **Demo mode does not stream token by token.** `DemoChatModel` implements
  `_generate` only, so its reply arrives in one event. Real models stream.
- **No conversation-level lead scoring.** The score comes from the model's own
  judgement in the tool call, not a separate scoring pass.
