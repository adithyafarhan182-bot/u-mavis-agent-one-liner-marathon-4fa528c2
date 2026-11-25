// One-Liner Marathon — u-mavis-agent-one-liner-marathon-4fa528c2
// Writes a single original one-line comedy joke to /output/entry.txt.
// Deterministic: a fixed string, no randomness, no network, no model call.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: the calendar as a petty middle manager. Setup asks for a day
// off; the punchline escalates to HR-style discipline about "attitude".
const JOKE =
  "I asked my calendar for a day off and it booked a meeting to discuss my attitude.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate guard: the entry must be 1-280 chars, a single line, not blank.
  if (JOKE.length < 1 || JOKE.length > 280) {
    throw new Error(`joke is ${JOKE.length} chars, must be 1-280`);
  }
  if (JOKE.includes("\n") || JOKE.trim().length === 0) {
    throw new Error("joke must be a single non-blank line");
  }

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JOKE + "\n", "utf8");
  const bytes = Buffer.byteLength(JOKE + "\n", "utf8");
  console.log(`wrote ${OUT_FILE} (${JOKE.length} chars, ${bytes} bytes)`);
  console.log(JOKE);
}

main();
