import { writeFileSync, existsSync } from "node:fs";
import { cwd, env } from "node:process";
import { join } from "node:path";
import { stratagems, version } from "./src/js/stratagems.js"
import { parse } from "../src/inject.js";
import { read } from "../src/read.js";
import { Base64 } from "base64-string";
import { langLong, langShort } from "../src/lang.js";
import i18next from "i18next";


// Generates a list of stratagems, concatenates files.
// This is the pre-build script, and must be executed before "vite build"

/* TODO: Ensure every stratagem has a language specific name.
		Grab from Helldivers 2 directly? Would require changing languages and writing down their names on paper.
		How do I copy characters that are not ASCII? I can only visually see the characters, and I can't copy/paste.
*/

i18next.init({ // Only using i18next to get the language writing direction.
	// Wouldn't need it otherwise. W're not using its translation functions,
	// As I'm using full HTML files written in each language, rather than key-values.
	lng: langLong
})

parse("src/html/layout_template.html", "src/html/layout.html", {
	ahkExample: `data:application/autohotkey;base64,${new Base64().encode(read("example.ahk"))}`,
	optionsExample: `data:application/toml;base64,${new Base64().encode(read("optionsExample.toml"))}`,
	lang: i18next.language,
	dir: i18next.dir(),
	languageSwitch: "" // TODO: languageSwitch, generate list of supported languages, with native names.
	/*
		template:
		<summary>current language</summary>
		<ul>
			<li><a href="">List of languages.</a></li>
		</ul>
	*/
	// Hrefs will be blank until I can setup a website with "github.io".
});

/**
 * @param {string} lang
 */
function write(lang) {
	parse(`./src/locales/${lang}.html`, "./src/index.html", {
		version
	})
}

if ( existsSync(join(cwd(), "locales", langLong+".html")) ) {
	write(langLong)
} else if ( existsSync(join(cwd(), "locales", langShort+".html")) ) {
	write(langShort)
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