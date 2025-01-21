import { EOL } from "node:os"

/** @typedef {import ("../help/src/js/types.d.ts").Stratagem} Stratagem */
/** @type {Record<string, (stratagem: Stratagem, ...args: string[])=>string>} */
export const actions = Object.create(null);
/**
 * Extra enables case statements to have multiple values. Use actionData to store an array of extra keys.
 * Check stratagems.js for the Fast Recon Vehicle, which has an example.
 * @param {Stratagem} stratagem 
 * @returns {string}
 */
actions.extra = function (stratagem) {
	
	if (stratagem.special?.actionData && Array.isArray(stratagem.special.actionData)) {
		let data = [`"${stratagem.key}"`, ...stratagem.special.actionData.map(value=>`"${value}"`)].join(",").toLowerCase()
		return `${EOL}case ${data}:${EOL}\tStratagem(${JSON.stringify(stratagem.code)})`
		
	}
	throw new Error("ActionData must be an array.");
	
}