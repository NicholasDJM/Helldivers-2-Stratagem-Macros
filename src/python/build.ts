import { stratagems } from "../../help/src/js/stratagems.js";
import type { Stratagem } from "../../help/src/js/types.d.ts";
import { parse } from "../inject.mjs";
import { EOL } from "node:os"
import { actions } from "../actions.mjs";
import { langLong } from "../lang.mjs";
import { read } from "../read.mjs";

let html = read("../../help/dist/index.html")

html.split(EOL).forEach((line, index) => {
    if (/^\s*"{3}\s*$/.test(line)) {
        throw new Error(`Line ${index + 1} cannot have triple quotes only, this will break Python script.`);
    }
})

let formattedStratagems = stratagems.map((item, index)=>{
    if (item.buildConfig && item.buildConfig.specialAction && actions[item.buildConfig.specialAction] !== undefined) {
        return actions[item.buildConfig.specialAction](item)
    }
    return `case "${item.key}":${EOL}\tstratagem(${JSON.stringify(item.code)})`
}).join(EOL)

parse("./macros_template.py", "./macros.py", {
    stratagems: formattedStratagems,
    language: langLong,
    html
})