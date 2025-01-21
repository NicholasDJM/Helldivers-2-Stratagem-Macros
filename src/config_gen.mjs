import { EOL } from "node:os";
import { optionsData } from "./config_template.js";

optionsData.forEach(({name, type}, index)=>{
    if (!name) throw new Error(`Missing a name in config_template.json5 (Entry ${index+1})`);
    if (!type) throw new Error(`Missing a type in config_template.json5 (Entry ${index+1})`);
    if (type !== "string" && type !== "boolean" && type !== "number" && type !== "path") throw new Error(`Type is incorrect in config_template.json5. Should be one of string, number, boolean, or path. (Entry ${index+1})`);
})
const optionsData2 = optionsData.map(({name, type, defaultData, description})=>{
    // Surround value in quotes
    if (type === "string" || type === "path") defaultData = `"${defaultData}"`
    return {name, type, defaultData, description}
})
export const configOutput = optionsData2.map(({name, defaultData, description})=>{
    return `${name} = ${defaultData}${description && " # " +description}`
}).join(EOL)