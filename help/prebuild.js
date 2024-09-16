import { writeFileSync, existsSync } from "node:fs";
import { cwd, env } from "node:process";
import { join } from "node:path";
import { stratagems, version } from "./src/js/stratagems.js"
import { replaceInjectKeyword, includeFile } from "../src/inject.js";
import { read } from "../src/read.js";
import { Base64 } from "base64-string";

// Generates a list of stratagems, concatenates files.
// This is the pre-build script, and must be executed before "vite build"

/* TODO: Ensure every stratagem has a language specific name.
		Grab from Helldivers 2 directly? Would require changing languages and writing down their names on paper.
		How do I copy characters that are not ASCII? I can only visually see the characters, and I can't copy/paste.
*/

const lang = env.LANG?.split(".")[0].split("-")[0] || "en",
	lang2 = env.LANG?.split(".")[0].toLowerCase() || "en-ca";

writeFileSync(join(cwd(), "src", "html", "layout.html"), includeFile(replaceInjectKeyword(read("src", "html", "layout_template.html"), {
	ahkExample: `data:application/autohotkey;base64,${new Base64().encode(read("example.ahk"))}`,
	optionsExample: `data:application/toml;base64,${new Base64().encode(read("optionsExample.toml"))}`
})))

/**
 * @param {string} lang
 */
function write(lang) {
	writeFileSync(
		join(cwd(), "src", "index.html"),
		replaceInjectKeyword(
			read("src", "locales", lang+".html"),
			{
				version
			}
		)
	)
}

if ( existsSync(join(cwd(), "locales", lang2+".html")) ) {
	write(lang2) // Check for language-dialect first
} else if ( existsSync(join(cwd(), "locales", lang+".html")) ) {
	write(lang) // And then check for language only
} else {
	throw new Error("Cannot find HTML file for current language.")
}

const formattedStratagems = stratagems.map(value => {
	const types = value.type.map(val => {
		return val.replaceAll(" ", "-")
	}).join(" ")
	const img = value.icon
		? `<span class="overlay ${types}">
				<img class="icon" src="${value.icon}" alt="${(value.displayName || value.key) + " icon"}" width="50px" height="50px" class="icon">
			</span>`
		: ""
	return `<li class="stratagemNoScript" data-types="${types}" data-key="${value.key}">${img}${value.displayName || value.key}</li>`
}).join("\n");

writeFileSync(join(cwd(), "src", "html", "stratagems.html"), formattedStratagems)