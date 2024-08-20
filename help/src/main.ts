import Alpine from "alpinejs";
globalThis.Alpine = Alpine;
import Fuse from "fuse.js";
import "@picocss/pico/css/pico.amber.min.css";
import "./main.css";
import Prism from "prismjs";
globalThis.Prism = Prism
import "./highlight.css"
import "prismjs/plugins/toolbar/prism-toolbar.js";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js";
import "prismjs/components/prism-autohotkey.min.js";
import "prismjs/components/prism-toml.min.js";
//@ts-expect-error Not a module.
import ahk from "/example.ahk?raw"
import {stratagems, version} from "./stratagems.js";
import { Base64 } from "base64-string";

Prism.manual = true;

const ahkEl = document.querySelector("#ahk-example") as HTMLPreElement
if (ahkEl) ahkEl.dataset.src = ahk

function download(data: string, filename: string) {
	const enc = new Base64()
	const a = document.createElement("a"),
	b = "data:text/plain;base64," + enc.urlEncode(data)
	a.setAttribute("href", b);
	a.setAttribute("download", filename);
	document.body.append(a);
	a.click();
	a.remove();
}


Prism.plugins.toolbar.registerButton("download-file", {
	text: "Download",
	onClick: env => {
		download(env.element.textContent, env.element.parentNode.dataset.filename ?? "file.txt")
	}
})


const fuse = new Fuse(stratagems, {
	keys: ["key", "type"],
	threshold: 0.4
})
Alpine.data("tools", ()=>{
	return {
		example: ahk,
		version,
		search() {
			if (this.$data.input) {
				return fuse.search(this.$data.input)
			}
			return stratagems.map((item, refIndex)=>({
				item,
				refIndex
			}));
		},
		copy() {
			// TODO: I should rewrite this to use bubbling.
			const timing = 7000; // Minimum 2000
			navigator.clipboard.writeText(this.$el.textContent).then(()=>{
				this.$el.classList.add("copy", "fadein");
				let current = timing - 2000;
				const element = this.$el.querySelector("code"),
				time = (milliseconds: number) => {
					const seconds = Math.floor(milliseconds / 1000),
						minutes = Math.floor(seconds / 60);
					return "Inbound T-" + (minutes < 10 ? "0" : "") + minutes +":" + (seconds < 10 ? "0" : "") + seconds
				}
				element.textContent = time(current)
				this.$el.style.setProperty("--time", timing-1000+"ms");
				const timer = setInterval(()=>{
					// This section emulates how stratagems are called in in-game. So when you copy the text, it's like you're calling in the stratagem.
					if (element) { // MUST check if element exists. Users can search, and Alpine will delete/add elements.
						current = current - 1000;
						element.textContent = time(current);
						if (current < 0) {
							element.textContent = "Impact";
						}
					}
				},1000)
				setTimeout(() => {
					if (this.$el) { // MUST check if element exists. Users can search, and Alpine will delete/add elements.
						this.$el.classList.remove("fadein")
						this.$el.classList.add("fadeout")
						setTimeout(()=>{
							if (this.$el) { // MUST check if element exists. Users can search, and Alpine will delete/add elements.
								this.$el.classList.remove("fadeout", "copy")
								element.textContent = element.dataset.original
							}
							clearInterval(timer);
						},250)
					}
				}, timing - 250);
			}).catch(error=>{
				// If we can't copy to clipboard, we should make the text selected, so the user can CTRL + C
				console.error(error)
				this.$el.classList.add("failed","copy","fadein")
				this.$el.setAttribute("contenteditable", "true")
				const range = document.createRange();
				range.selectNodeContents(this.$el.querySelector("code"));
				const selection = window.getSelection();
				selection?.removeAllRanges();
				selection?.addRange(range);
				setTimeout(()=>{
					if (this.$el) {
						this.$el.classList.remove("failed", "copy","fadein")
					}
				},5000)
			})
		},
		border(type: string[]) {
			if (type.includes("weapon") || type.includes("backpack") || type.includes("vehicle")) return "#2288a7"
			if (type.includes("mission")) return "#c9b269" // We want mission before eagle, as "eagle rearm" has both, but is mission coloured.
			if (type.includes("orbital") || type.includes("eagle")) return "#ba2f23"
			if (type.includes("defense")) return "#326021"
		}
	}
})

document.addEventListener("alpine:initialized", ()=>{
	Prism.highlightAll();
})

Alpine.start();


// If you add a period to a `class` HTML attribute, and can't figure out why your styles aren't applying, this will fix that.
// Example: `<div class=".red">` to `<div class="red">`
document.querySelectorAll("*").forEach(element=>{
	element.classList.forEach(className => {
		if (className[0] === ".") element.classList.replace(className, className.slice(1))
	})
})
