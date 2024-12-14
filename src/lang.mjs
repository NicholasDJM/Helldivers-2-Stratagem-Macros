import { read } from "./read.mjs";
import { env } from "node:process";
import { EOL } from "node:os";

const supportedLangs = read("./supportedLangs.txt").split(EOL).filter(value=>value!="");

// env.LANG is in format xx-XX.UTF-8
export const langShort = env.LANG?.split(".")[0].split("-")[0] || "en",
	langLong = env.LANG?.split(".")[0] || "en-CA",
	// Grab language name from "supportedLangs.txt" instead of from env vars. Can't save UTF-8 chars correctly to env vars.
	language = supportedLangs.filter(value=>RegExp(`${langLong}=.*`).test(value))[0]?.split("=")[1] || "English", 
	dir = env.dir || "ltr";