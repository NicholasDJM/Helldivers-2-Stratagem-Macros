import { writeFileSync } from "node:fs";
import { cwd } from "node:process";
import { join } from "node:path";
import { stratagems, version } from "../help/src/js/stratagems.js"
import { parse } from "./inject.js";
import { read } from "./read.mjs";
//@ts-expect-error
import { Base64 } from "npm:base64-string"; // NPM protocol only works in Deno.
import { langLong, langShort, language, dir } from "./lang.mjs"

// Generates a list of stratagems, concatenates files.
// This is the pre-build script, and must be executed before "vite build"

/* TODO: Ensure every stratagem has a language specific name.
		Grab from Helldivers 2 directly? Would require changing languages and writing down their names on paper.
		How do I copy characters that are not ASCII? I can only visually see the characters, and I can't copy/paste.
*/

/**
 * 
 * @param {string} text 
 * @returns 
 */
function capitalize(text) {
	return text.split(" ").map(text=>text.toUpperCase()[0]+text.substring(1)).join(" ")
}

parse("../help/src/html/layout_template.html", "../help/src/html/layout.html", {
	ahkExample: `data:application/autohotkey;base64,${new Base64().encode(read("../help/src/example.ahk"))}`,
	optionsExample: `data:application/toml;base64,${new Base64().encode(read("../help/src/exampleOptions.toml"))}`,
	lang: langLong,
	dir,
	languageSwitch: `<summary>${language}</summary>
<ul>
<li>${language}</li>
</ul>` // TODO: languageSwitch, generate list of supported languages, with native names.
	/*
		template:
		<summary>current language</summary>
		<ul>
			<li><a href="">List of languages.</a></li>
		</ul>
	*/
	// Hrefs will be blank until I can setup a website with "github.io".
});

try {
	parse(`../help/src/locales/${langLong}.html`, "../help/src/index.html", {
		version
	})
} catch {
	try {
		parse(`../help/src/locales/${langShort}.html`, "../help/src/index.html", {
			version
		})
	} catch {
		const e = `Cannot find HTML file for current language. [${langLong}]`;
		throw new Error(e)
	}
}

stratagems.forEach(stratagem=>{
	if (!stratagem.icon) console.info(stratagem.key, " is missing an icon.");
	// Inform dev during build of any missing Stratagem icons.
	// Unfortunately, not all Stratagems have icons, as they have not been documented on the Helldivers 2 Wiki. Usually because they were event-based Stratagems, so the image hasn't been data mined.
})

const formattedStratagems = stratagems.map(value => {
	// TODO: HTML structure should be in it's own module, imported both here and main.ts in /help/src/js
	// This allows changing the structure of the HTML once, and it still being accurate everywhere.
	// What about data injection? Here it's template strings, but on the frontend it uses Alpine.js.
	// TODO: Also, CSS needs to be simplified. Check test.html for some ideas. `.arrrows` has already been simplified. See animation.scss.
	const img = value.icon
			? `<span class="centerMarginVertical overlay">
		<img class="icon" src="${value.icon}" alt="${(value.displayName || value.key) + " icon"}" width="50px" height="50px"/>
	</span>`
			: "",
		arrows = value.code.map(value => {
			return `<span class="${value}"></span>`
		}).join("")
	return `<li class="stratagemNoScript" data-types='${JSON.stringify(value.type)}' data-key="${value.key}" data-display="${value.displayName || ""}" data-code='${JSON.stringify(value.code)}'>
	${img}
	<div class="stratagemArrows">
		<span>${value.displayName || value.key}</span>
		<div class="arrows">${arrows}</div>
	</div>
</li>`
}).join("\n");

writeFileSync(join(cwd(), "..", "help", "src", "html", "stratagems.html"), formattedStratagems)