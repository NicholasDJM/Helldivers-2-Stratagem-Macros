/**
 * @typedef {Object} Command
 * @property {string} name
 * @property {string} goto
 */
/**
 * @type {Command[]}
 */
const commands = [
	{
		name: "update macros",
		goto: "update"
	},
	{
		name: "generate config",
		goto: "genOptions"
	}
]

export {commands}