import { defineConfig, loadEnv } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import htmlnano from "htmlnano";
import { imagetools } from "vite-imagetools";
import i18nextLoader from "vite-plugin-i18next-loader";
import posthtml from "@vituum/vite-plugin-posthtml";
import prism from "posthtml-prism";
//import toc from "posthtml-toc"; // Note: posthtml-toc README is out of date, had to look into the code to find the correct options to pass to the plugin.
import cssShaker from "posthtml-postcss-treeshaker";
import { posthtmlExternalLink } from "posthtml-external-link";

const lang = "en"
const {main} = await import("./src/locales/"+lang+"/locales.json");

export default defineConfig({
	root: "./src",
	build: {
		minify: "terser", // Minifies JS.
		outDir: "../dist",
		cssMinify: "esbuild" // Minifies CSS. NOTE: LightningCSS was stripping away logical properties, and I couldn't get it to stop.
	},
	plugins: [
		i18nextLoader({ // Language translations.
			paths: ["./src/locales"]
		}),
		posthtml({ // Enables <include> elements, to include other files directly in HTML.
			plugins: [
				prism(), // Parses code elements and generates HTML elements for styling syntax.
				/*toc({ // TODO: How to translate headings at build time, so I can continue to use this plugin?
					after: "#description",
					title: main.toc
				}),*/
				// NOTE: Not using the TOC plugin until I can find a way to integrate i18n support.
				cssShaker(),
				posthtmlExternalLink(),
				htmlnano() // Minifies HTML
			]
		}),
		imagetools(), // Tools to manipulate image files via JavaScript imports.
		viteSingleFile({ // Inlines assets to HTML.
			removeViteModuleLoader: true
		})
	],
})