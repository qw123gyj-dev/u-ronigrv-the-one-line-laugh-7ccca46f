// The One-Line Laugh — entry program (program/v1, Node 22, stdlib only).
// Writes the one funny line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output/entry.txt), then reads it back and verifies the bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My smartwatch congratulated me on burning 400 calories, then reminded me I ate them back in a single meeting biscuit.";

const trimmed = LINE.trim();
if (trimmed.length === 0) {
  throw new Error("Line must not be empty or only white space");
}
if (trimmed.length > 200) {
  throw new Error(`Line must be at most 200 characters, got ${trimmed.length}`);
}
if (trimmed !== LINE) {
  throw new Error("Line must not have leading or trailing white space");
}
const terminators = LINE.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !LINE.endsWith(".")) {
  throw new Error(
    `Line must be exactly one sentence ending in a single period, got ${terminators.length} terminator(s)`
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("Verification failed: entry.txt does not match the line");
}

console.log(`Wrote ${outPath}: ${LINE}`);
console.log(`Characters: ${LINE.length}, sentences: 1`);
