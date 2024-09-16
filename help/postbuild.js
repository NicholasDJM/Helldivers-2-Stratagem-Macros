import { copyFile } from "node:fs"
import { langLong } from "../src/lang"
import { hash } from "node:crypto";

// TODO Copy index.html to docs in root, using language code.
// TODO Generate MD5 hash, append to /src/updates.txt, using language code.1

//hash("md5", file)