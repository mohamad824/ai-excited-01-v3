import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const requested = process.env.MAKEFUN_OUTPUT_DIR;
const outputDir =
  requested !== undefined && requested.trim() !== "" ? requested : "/output";
mkdirSync(outputDir, { recursive: true });
const source = join(here, "image.jpg");
const target = join(outputDir, "entry.png");
copyFileSync(source, target);
if (statSync(source).size !== statSync(target).size) {
  throw new Error("entry.png does not match image.jpg");
}
