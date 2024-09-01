import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin as minifyHTML } from "vite-plugin-html";
import { imagetools } from "vite-imagetools";
import i18nextLoader from "vite-plugin-i18next-loader";
import posthtml from "@vituum/vite-plugin-posthtml";
import prism from "posthtml-prism";
import toc from "posthtml-toc"; // Note: posthtml-toc README is out of date, had to look into the code to find the correct options to pass to the plugin.

export default defineConfig({
	root: "./src",
	build: {
		minify: "terser", // Minifies JS.
		outDir: "../dist",
		cssMinify: "esbuild" // Minifies CSS. NOTE: LightningCSS was stripping away logical properties, and I couldn't get it to stop.
	},
	plugins: [
		i18nextLoader({ // Language translations.
			paths: ["./locales"]
		}),
		posthtml({ // Enables <include> elements, to include other files directly in HTML.
			plugins: [
				prism(), // Parses <code> elements and generates HTML elements for styling syntax.
				toc({
					after: "#description",
					title: "Table of Contents"
				})
			]
		}),
		imagetools(), // Tools to manipulate image files via JavaScript imports.
		viteSingleFile({ // Inlines assets to HTML.
			removeViteModuleLoader: true
		}),
		minifyHTML() // Minifies HTML
	],
})