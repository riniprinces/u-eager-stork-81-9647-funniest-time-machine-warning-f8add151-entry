// Entry for make.fun: "Funniest Time Machine Warning Label".
// One warning label, 120 characters at most, built to make a room of
// time travellers laugh: a genuine-looking safety notice whose punchline
// is the grandfather paradox, saved for the very last words.
//
// Running this program prints the label and writes it to the harness
// artifact path /output/entry.txt (falling back to ./entry.txt when the
// sandbox output directory is not writable).
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LIMIT = 120;
const OUTPUT_PATH = "/output/entry.txt";

const WARNING_LABEL =
  "WARNING: Never introduce yourself to your grandfather. " +
  "He is charming, and one handshake away from erasing you.";

function countCharacters(text: string): number {
  return [...text].length;
}

function validatedLabel(): string {
  const text = WARNING_LABEL;
  const length = countCharacters(text);
  if (text.trim().length === 0) {
    throw new Error("Refusing to emit a blank warning label.");
  }
  if (length > LIMIT) {
    throw new Error(
      `Warning label is ${length} characters; the limit is ${LIMIT}.`,
    );
  }
  return text;
}

function emit(text: string): void {
  console.log(text);
  const target = existsSync(dirname(OUTPUT_PATH))
    ? OUTPUT_PATH
    : join(process.cwd(), "entry.txt");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, text, { encoding: "utf8" });
}

emit(validatedLabel());
