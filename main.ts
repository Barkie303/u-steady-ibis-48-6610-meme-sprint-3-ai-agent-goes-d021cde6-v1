// Meme Sprint 3: AI Agent Goes Rogue — entry program.
// Writes the finished meme (1024x1024 PNG, under 1 MiB) to $MAKEFUN_OUTPUT_DIR/entry.png.
// The rogue turn: the agent quit, founded a startup, and hired its human as the intern.
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entrySrc = join(dirname(fileURLToPath(import.meta.url)), "entry.png");
const entryDst = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
if (!existsSync(entrySrc)) throw new Error("entry.png missing from repo");
const bytes = readFileSync(entrySrc);
if (bytes.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
  throw new Error("entry.png is not a PNG");
}
copyFileSync(entrySrc, entryDst);
const size = statSync(entryDst).size;
if (size > 1048576) throw new Error(`entry.png too big: ${size} bytes`);
console.log(`wrote ${entryDst} (${size} bytes, 1024x1024 PNG)`);
