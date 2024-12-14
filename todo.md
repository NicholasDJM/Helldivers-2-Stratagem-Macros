# Coming soon
- Localization support
	Create Documentation on how to translate project.
- Redo help.html stratagem list to be more accessible (make it semantically correct).
- Redo help.html stratagem copy animation.

# Maybe
- Add automatic input of multiple stratagems, by clicking the mouse to throw a stratagem, and calling the next one in, etc.
	- Let users create text files that are a list of stratagem names they want to use.
- Create backup when updating. If an error occurs, revert to old version, disable auto updates, and inform user.
- Generate Profile for Stream Deck with all possible stratagems already configured.
	(What about different models of Stream Deck? I only have Stream Deck Mini.)

# Wishful thinking
- Port to Linux (AutoHotkey is not available on Linux)
- Machine Vision based automatic inputs for puzzles. (Take screenshot, script automatically analyzes the puzzle, and inputs the correct sequence)
	- Local LLM and MV, no internet required. Although HD2 is already an internet only game, so it doesn't need to be offline.
- OBS and Elgato Stream Deck integration.
	- Get screen recording from OBS to analyze currently available stratagems, and update Stream Deck buttons accordingly. This would allow players to not have to search through Stream Deck pages looking for their currently equipped stratagem. Instead, the buttons would be dynamically updated to reflect their equipped stratagems, along with any other available stratagems.
	- This is what I'm most excited for. I think I'll need to use Python to quickly get this working. I'll also need to create both an OBS plugin, and a Stream Deck plugin. But, not until the bloody localization support is finally done. It's taken weeks, I'm getting burned out.

# Not Possible
- NOT POSSIBLE --- Generate Stream Deck actions ready to be pasted into the software.
	Stream Deck software does not use the clipboard to copy/paste actions.