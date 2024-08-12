-brightgreen?style=plastic) [![License AGPL 3.0](https://img.shields.io/github/license/NicholasDJM/Helldivers-2-Stratagem-Macros?color=blue&style=plastic)](/LICENSE.txt) ![Only for Microsoft Windows](https://img.shields.io/badge/Only%20for-Windows-blue?style=plastic)


This is an AutoHotKey macro script, which can be called to automatically enter any Stratagem code in Helldivers 2.
The script automatically uses in-game key bindings and reads the correct keys for each Steam user, eliminating the need for manual configuration.

You can execute these macros either through your own AutoHotKey scripts, or through Elgato Stream Deck.

This script is only for Windows. This script has been tested on Windows 10 22H2, but should work on Windows 11.



## Installation

1. You must have AutoHotKey installed, head to https://www.autohotkey.com/ to download the latest version.

2. Next, if you're using this script with the Stream Deck, you must install [Barraider's Advanced Launcher](https://marketplace.elgato.com/product/advanced-launcher-d9a289e4-9f61-4613-9f86-0069f5897125) plugin.

3. Then, download my script, <a href="https://raw.githubusercontent.com/NicholasDJM/Helldivers-2-Stratagem-Macros/main/Helldivers%202%20Macros.ahk" download="Helldivers 2 Macros.ahk">Helldivers 2 Macros.ahk</a> (Right click on link, and "Save Link as")

4. Once my script has downloaded, place it somewhere in it's own folder, alone. Don't put anything else there. The script will modify itself when updating, and also will download and overwrite any file called "version.txt", and any file called "help.html". Make sure not to save any file with those names.

5. Finally, run the script without any arguments to read the most up-to-date instructions.

## Usage

### Using with AutoHotkey
This AHK script allows you to call your favourite stratagem. In this case, mine is the Recoilless Rifle, and the Patriot Exosuit. You can modify it as you see fit. This particular script will call in the Recoilless rifle on mouse 4, and the Patriot Exosuit on mouse 5.
```ahk
