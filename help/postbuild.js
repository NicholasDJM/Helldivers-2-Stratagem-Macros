import { copyFile, writeFileSync } from "node:fs"
import { langLong } from "../src/lang"
import { hash } from "node:crypto";
import { read } from "../src/read.js";
import { existsSync } from "node:fs";
import { EOL } from "node:os";

// TODO Copy index.html to docs in root, using language code.
// TODO Generate MD5 hash, append to /src/updates.txt, using language code.

const file = "./dist/index.html"

const hashed = hash("md5", file)

copyFile(file, `../dist/${langLong}.html`, error => {
	if (error) throw error;
})

const updateFile = "../src/updates.txt"

let contents = (existsSync(updateFile) ? read(updateFile) : "").split(EOL)

contents[contents.length] = `${langLong}=${hashed}`

writeFileSync(updateFile, contents.join(EOL))