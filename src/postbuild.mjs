import { copyFile, writeFileSync } from "node:fs"
import { langLong } from "./lang.mjs"
import { hash } from "node:crypto"; // Crypto API only exists in Node, not Deno.
import { read } from "./read.mjs";
import { existsSync } from "node:fs";
import { EOL } from "node:os";
import { join } from "node:path";
import { cwd } from "node:process";

// This is the post-build script, which runs after "pnpm build".

const file = "../help/dist/index.html",
	updateFile = "../dist/updates.txt";
/** @type {string} */
const hashed = hash("md5", file)

copyFile(file, `../docs/${langLong}.html`, (/** @type {any} */ error) => {
	if (error) throw error;
})


let contents = (existsSync(updateFile) ? read(updateFile) : "").split(EOL)

contents[contents.length] = `${langLong}=${hashed}`

writeFileSync(join(cwd(), updateFile), contents.join(EOL))