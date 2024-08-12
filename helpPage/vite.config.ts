import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"
import { createHtmlPlugin } from "vite-plugin-html";
import { imagetools } from "vite-imagetools";
// Tried using a CSS purger, but found it was too aggressive without a lot of fine tuning.
// PicoCSS especially suffered. So we'll have to do with a larger file size.

export default defineConfig({
	root: "./src",
	build: {
		minify: "terser", // Minifies JS
		outDir: "../dist",
		cssMinify: "lightningcss" // Minifies CSS
	},
	plugins: [
		imagetools(), // Tools to manipulate image files via JavaScript imports.
		viteSingleFile({ // Inlines assets to HTML
			removeViteModuleLoader: true
		}),
		createHtmlPlugin() // Minifies HTML
	],
})