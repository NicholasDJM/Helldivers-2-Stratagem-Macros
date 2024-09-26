import { copyFile, writeFileSync } from "node:fs"
import { langLong } from "./lang.mjs"
import { hash } from "node:crypto";
import { read } from "./read.mjs";
import { existsSync } from "node:fs";
import { EOL } from "node:os";
import { join } from "node:path";
import { cwd } from "node:process";

// TODO Copy index.html to docs in root, using language code.
// TODO Generate MD5 hash, append to /src/updates.txt, using language code.

const file = "../help/dist/index.html"

const hashed = hash("md5", file)

copyFile(file, `../dist/${langLong}.html`, error => {
	if (error) throw error;
})

const updateFile = "../dist/updates.txt"

let contents = (existsSync(updateFile) ? read(updateFile) : "").split(EOL)

contents[contents.length] = `${langLong}=${hashed}`

writeFileSync(join(cwd(), updateFile), contents.join(EOL))