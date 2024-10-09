import { defineConfig } from "vite";
import { env } from "node:process"
import { viteSingleFile } from "vite-plugin-singlefile";
import htmlnano from "htmlnano";
import posthtml from "@vituum/vite-plugin-posthtml";
import prism from "posthtml-prism";
import cssShaker from "posthtml-postcss-treeshaker";

export default defineConfig({
	root: "./src",
	build: {
		minify: "terser", // Minifies JS.
		outDir: "../dist",
		cssMinify: "esbuild", // Minifies CSS.
		sourcemap: env.NODE_ENV === "development" ? "inline" : false
		// Enables sourcemaps when in development, allowing browsers to load unminified code.
	},
	plugins: [
		posthtml({ // Adds <include src="">, <block name="">, and <extend src=""> elements.
			plugins: [
				prism(), // Adds syntax highlighting to <pre class="language-x"><code></code></pre> elements, where x is the name of a language.
				//cssShaker(), //NOTE This doesn't appear to work. // Removes unused CSS
				htmlnano() // Minifies HTML, CSS via cssnano, and SVGs via SVGO.
			]
		}),
		viteSingleFile({ // Inlines assets to a single HTML file.
			removeViteModuleLoader: true // We're not loading any JS past the initial HTML file, so we don't need the module loader.
		})
	],
})