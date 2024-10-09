import { env } from "node:process";

export const langShort = env.LANG?.split(".")[0].split("-")[0] || "en",
	langLong = env.LANG?.split(".")[0] || "en-CA",
	language = env.fullLanguage || "English",
	dir = env.langDir || "ltr";