# Coming soon
- Localization support
	Create lang.ts, which will contain currently supported languages, rather than pasring env.LANG and blindly loading files.
	Finish setting up blocks in layout.html. Finish filling in blocks in en.html.
	Update build.ps1 to run a build.js to programatically load languages in lang.ts and build every version of help.html in each language.
		(Maybe programmatically build directly in build.ps1? Would get cool CLI output.)
	Create Documentation on how to translate project.
	Update inject.mjs to add locale() for ahk script, load translations from a json file.
- Redo help.html stratagem list to be more accessible (make it semantically correct).

# Maybe
- Redo help.html stratagem copy animation.
- Drop PicoCSS in favour of self made CSS
- Add automatic input of multiple stratagems, by clicking the mouse to throw a stratagem, and calling the next one in, etc.
- Create backup when updating. If an error occurs, revert to old version, disable auto updates, and inform user.
- Generate Profile for Stream Deck with all possible stratagems already configured.
	(What about different models of Stream Deck? I only have Stream Deck Mini.)

# Wishful thinking
- Port to Linux (AutoHotkey is not available on Linux)

# Not Possible
- NOT POSSIBLE --- Generate Stream Deck actions ready to be pasted into the software.
	Stream Deck software does not use the clipboard to copy/paste actions.