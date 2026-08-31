/**
 * Offline smoke test for the sales agent.
 *
 * Runs the full agentic loop (LangGraph → tools → retrieval → lead capture) and
 * prints the event stream the widget would receive. Works with no environment
 * variables at all, so it verifies the fallback paths, and works against the
 * real services once keys are present.
 *
 * Usage: npm run smoke:agent
 */
import { describeCapabilities } from "../src/lib/agent/config";
import { getAgentStore } from "../src/lib/agent/db";
import { runAgent } from "../src/lib/agent/run";
import type { ChatTurn } from "../src/lib/agent/session";

/** Conversation that should trigger retrieval and then lead capture. */
const SCRIPT: string[] = [
  "What kind of AI agents do you build?",
  "We want to automate lead qualification for our sales team. I'm Borja from Acme AB, borja@acme.se — can we book a call?",
];

/**
 * Streams one visitor message through the agent and returns the reply.
 */
async function sendMessage(
  history: ChatTurn[],
  sessionId: string,
): Promise<string> {
  const run = runAgent({ history, sessionId });

  let reply = "";
  let step = await run.next();

  while (!step.done) {
    const event = step.value;

    switch (event.type) {
      case "token":
        reply += event.value;
        break;
      case "tool_start":
        console.log(`   ⚙  ${event.label} (${event.name})`);
        break;
      case "tool_end":
        console.log(`   ✓  ${event.name} finished (ok=${event.ok})`);
        break;
      case "lead_saved":
        console.log(`   ★  lead saved: ${event.email ?? "no email"}`);
        break;
      default:
        break;
    }

    step = await run.next();
  }

  return step.value.reply || reply;
}

async function main() {
  console.log(`\nCapabilities: ${describeCapabilities()}\n`);

  const sessionId = "sess_smoke_test";
  const history: ChatTurn[] = [];

  for (const message of SCRIPT) {
    console.log(`\n👤 ${message}`);
    history.push({ role: "user", content: message });

    const reply = await sendMessage([...history], sessionId);

    console.log(`🤖 ${reply || "(empty reply)"}`);
    history.push({ role: "assistant", content: reply });
  }

  const store = await getAgentStore();
  const leads = await store.listLeads(5);

  console.log(`\nLeads in ${store.kind} store: ${leads.length}`);
  for (const lead of leads) {
    console.log(
      `  - ${lead.email ?? "no email"} | ${lead.companyName ?? "no company"} | ` +
        `${lead.status} | score ${lead.score}`,
    );
  }

  if (leads.length === 0) {
    console.error("\n✗ Expected at least one captured lead.");
    process.exit(1);
  }

  console.log("\n✓ Smoke test passed.\n");
}

main().catch((error) => {
  console.error("\n✗ Smoke test failed:", error);
  process.exit(1);
});
