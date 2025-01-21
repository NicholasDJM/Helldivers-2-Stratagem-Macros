import { writeFileSync } from "node:fs";
import { cwd } from "node:process";
import { join } from "node:path";
import { stratagems, version } from "../help/src/js/stratagems.js"
import { parse } from "./inject.mjs";
import { read } from "./read.mjs";
//@ts-expect-error
import { Base64 } from "npm:base64-string"; // NPM protocol only works in Deno.
import { langLong, langShort, language, dir } from "./lang.mjs"
import { EOL } from "node:os";
import { configOutput } from "./config_gen.mjs";

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


const supportedLangs = read("./supportedLangs.txt").split(EOL).filter(value=>value!=""),
	langList = supportedLangs.map((value, index)=>{
		const name = value.split("=")[1],
		code = value.split("=")[0];
		// TODO: Once github.io website is up, `code` will be used to create the link.
		return `<li><a href="https://NicholasDJM.github.io/Helldivers%202%20Stratagem%20Macros/${code}.html">${name}</a></li>`;
	}).join("");

parse("../help/src/html/layout_template.html", "../help/src/html/layout.html", {
	ahkExample: `data:application/autohotkey;base64,${new Base64().encode(read("../help/src/example.ahk"))}`,
	optionsExample: `data:application/toml;base64,${new Base64().encode(read("../help/src/exampleOptions.toml"))}`,
	lang: langLong,
	dir,
	languageSwitch: `<summary>${language}</summary><ul>${langList}</ul>`
// TODO: languageSwitch, generate list of supported languages, with native names.
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

// Checks for Stratagems.
stratagems.forEach((stratagem, index)=>{
	// Check for key
	if (!stratagem.key) throw new Error("Stratagem "+index+" requires a key.")
	// Check for key correctness
	if (!/^[a-zA-Z0-9- ]+$/.test(stratagem.key)) throw new Error("Stratagem Key for "+stratagem.key+" can only contain alphanumeric characters, space and dashes.")
	
	// Check for stratagem input.
	if (!stratagem.code) throw new Error("Stratagem "+stratagem.key+" requires a Stratagem code.")
	const filter = stratagem.code.filter(value=>
		!["left","right","up","down"].includes(value)
	)
	if (filter.length > 0) throw new Error(`Code array of Stratagem ${stratagem.key} may only contain values "left", "right", "up", and "down". Found ${filter}`)

	// Check for stratagem input length
	if (stratagem.code.length < 3 || stratagem.code.length > 8) throw new Error(stratagem.key+"'s code length is outside the range of 3 to 8. "+stratagem.key+" has a code length of "+stratagem.code.length)

	// Check for icon
	if (!stratagem.icon) console.warn(stratagem.key, "is missing an icon.");

	// Check for stratagem model constraint
	if (stratagem.modelName) {
		if (stratagem.type.includes("sentry") && !/^A\//.test(stratagem.modelName)) console.warn(stratagem.key,"is of type \"sentry\", but does not have a model name that starts with \"A/\".")
		if (stratagem.type.includes("mech") && !/^EXO-/.test(stratagem.modelName)) console.warn(stratagem.key,"is of type \"mech\", but does not have a model name that starts with \"EXO-\".")
		if (stratagem.type.includes("guard dog") && !/^AX\//.test(stratagem.modelName)) console.warn(stratagem.key,"is of type \"guard dog\", but does not have a model name that starts with \"AX/\".")
		if (!stratagem.modelName.includes("-")) console.warn(stratagem.key,"has no sub model identifier.")
	}
})

const formattedStratagems = stratagems.map(value => {
	// TODO: HTML structure should be in it's own module, imported both here and main.ts in /help/src/js
	// This allows changing the structure of the HTML once, and it still being accurate everywhere.
	// What about data injection? Here it's template strings, but on the frontend it uses Alpine.js.
	// 		We should use inject.js, and inject the data into the HTML via parse(). HTML can use <include>, while here we can use parse().
	// Like everything, we still need to implement localization.
	const img = value.icon
			? `<span class="centerMarginVertical overlay">
		<img class="icon" src="${value.icon}" alt="${(value.displayName || value.key) + " icon"}" width="50px" height="50px"/>
	</span>`
			: "",
		arrows = value.code.map(value => {
			return `<span class="${value}"></span>`
		}).join("")
	return `<li class="stratagems" data-types='${JSON.stringify(value.type)}' data-key="${value.key}" ${value.displayName && `data-display="${value.displayName}"`} data-code='${JSON.stringify(value.code)}'>
	${img}
	<div class="stratagemArrows">
		<span class="stratagemName">${value.modelName && value.modelName + " "}${value.displayName || value.key}</span>
		<div class="arrows">${arrows}</div>
	</div>
</li>`
}).join("\n");

writeFileSync(join(cwd(), "..", "help", "src", "html", "stratagems.html"), formattedStratagems)


writeFileSync(join(cwd(), "..", "help", "src", "html", "optionsExample.toml"), configOutput)