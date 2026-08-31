import { tool } from "langchain";
import { z } from "zod";
import { agentConfig } from "../config";
import { TOOL_NAMES } from "../events";
import { getAgentStore } from "../db";
import type { LeadRecord } from "../db/types";

/**
 * `saveLeadToPostgres` — lead capture tool for the sales agent.
 *
 * Called when a visitor shares contact details or asks to book a discovery
 * call. Writes to PostgreSQL when `DATABASE_URL` is set, and to the in-memory
 * store otherwise, so the tool always succeeds from the agent's perspective.
 */

const schema = z.object({
  name: z.string().optional().describe("Full name, if the visitor shared it."),
  email: z
    .string()
    .optional()
    .describe("Work email address, if the visitor shared it."),
  companyName: z
    .string()
    .optional()
    .describe("Company or organisation name."),
  projectDetails: z
    .string()
    .optional()
    .describe(
      "One or two sentences on what they want built, in their own words.",
    ),
  budget: z.string().optional().describe("Budget range, if mentioned."),
  timeline: z.string().optional().describe("Desired timeline, if mentioned."),
  score: z
    .number()
    .min(0)
    .max(100)
    .optional()
    .describe(
      "Qualification score 0-100. High means a clear use case, budget " +
        "authority, and near-term timeline.",
    ),
  bookingRequested: z
    .boolean()
    .optional()
    .describe("True if the visitor asked to book or agreed to a call."),
});

/** Basic shape check so obvious typos are not stored as real addresses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Chooses the lead status from what the conversation revealed.
 */
function deriveStatus(input: {
  bookingRequested?: boolean;
  score?: number;
}): LeadRecord["status"] {
  if (input.bookingRequested) return "CALL_BOOKED";
  if ((input.score ?? 0) >= 60) return "QUALIFIED";
  return "NEW";
}

/**
 * Builds the lead capture tool bound to one widget session.
 *
 * @param sessionId - Session the lead belongs to, used to merge repeat saves.
 * @param onSaved - Hook the route uses to emit a `lead_saved` UI event.
 */
export function createSaveLeadTool(
  sessionId: string,
  onSaved?: (lead: LeadRecord) => void,
) {
  return tool(
    async (input) => {
      const email = input.email?.trim();

      // Reject a malformed address instead of storing it, and tell the model
      // why so it can ask the visitor to repeat it.
      if (email && !EMAIL_PATTERN.test(email)) {
        return (
          `The email "${email}" does not look valid. Ask the visitor to ` +
          "confirm it, then call this tool again."
        );
      }

      // Nothing identifying means there is no lead worth storing yet.
      if (!email && !input.name && !input.companyName) {
        return (
          "No contact details yet. Ask for a name and work email before " +
          "calling this tool again."
        );
      }

      const store = await getAgentStore();
      const lead = await store.upsertLead({
        ...input,
        email: email ?? null,
        sessionId,
        status: deriveStatus(input),
      });

      onSaved?.(lead);

      const destination =
        store.kind === "postgres" ? "PostgreSQL" : "the local store";

      return [
        `Saved to ${destination} (lead ${lead.id}, status ${lead.status}).`,
        `Now invite them to pick a time at ${agentConfig.calLink}`,
        "and confirm what they should prepare for the call.",
      ].join(" ");
    },
    {
      name: TOOL_NAMES.saveLead,
      description:
        "Save or update the visitor's lead record. Call this as soon as they " +
        "share a name, email, company, or project details, and whenever they " +
        "ask to book a discovery call. Safe to call more than once: later " +
        "calls merge into the same lead.",
      schema,
    },
  );
}
