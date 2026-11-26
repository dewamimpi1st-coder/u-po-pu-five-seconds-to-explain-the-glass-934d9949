// Five Seconds to Explain the Glass — make.fun bounty entry.
//
// A pet cat's one-sentence defence after knocking a glass off the table:
// the glass kept showing the cat its own face, so the cat fired it for
// insubordination. No apology, no admission — just the cat's own logic.
//
// The program writes that sentence, and nothing else, to entry.txt.
// It uses only the Node standard library, is fully deterministic, and
// performs no network access.
//
// Note: the file deliberately uses no TypeScript-only syntax (no type
// annotations), so it is valid plain JavaScript too and `node --check`
// passes on it directly. Node 22.6+ runs it as-is via type stripping.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "It kept showing me my own face, so I fired it for insubordination.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main() {
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(
      `Entry must be 1-200 characters, got ${ENTRY.length}.`,
    );
  }
  if (!ENTRY.endsWith(".")) {
    throw new Error("Entry must be exactly one sentence.");
  }

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, ENTRY, "utf8");

  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== ENTRY) {
    throw new Error("Read-back check failed: entry.txt does not match.");
  }
  console.log(`Wrote ${ENTRY.length} characters to ${OUT_FILE}`);
}

main();
