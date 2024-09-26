# HELLDIVERS™ 2 Stratagem Macros [![License AGPL 3.0](https://img.shields.io/github/license/NicholasDJM/Helldivers-2-Stratagem-Macros?color=blue&style=plastic)](/LICENSE.txt) ![Only for Microsoft Windows](https://img.shields.io/badge/Only%20for-Windows-blue?style=plastic)

This is an AutoHotKey macro script, which can be called to automatically enter any Stratagem code in Helldivers 2.

The script automatically uses in-game key bindings and reads the correct keys for each Steam user, eliminating the need for manual configuration.

You can execute these macros either through your own AutoHotKey scripts, or through Elgato Stream Deck.

This script is only for Windows. This script has been tested on Windows 10 22H2, but should work on Windows 11.

## Installation

1. You must have AutoHotKey installed, head to https://www.autohotkey.com/ to download the latest version.

2. Next, if you're using this script with the Stream Deck, you must install [Barraider's Advanced Launcher](https://marketplace.elgato.com/product/advanced-launcher-d9a289e4-9f61-4613-9f86-0069f5897125) plugin.

3. Then, download my script, <a href="https://raw.githubusercontent.com/NicholasDJM/Helldivers-2-Stratagem-Macros/main/Helldivers%202%20Macros.ahk" download="Helldivers 2 Macros.ahk">Helldivers 2 Macros.ahk</a> (Right click on link, and "Save Link as")

4. Once my script has downloaded, place it somewhere in it's own folder, alone. Don't put anything else there. The script will modify itself when updating, and also will overwrite any files called "version.txt", "help.html", and "play.ahk". Make sure not to save any file with those names.

5. Finally, run the script without any arguments to read the most up-to-date instructions. You can double-click on the file in Windows Explorer to open the instructions.

## Usage

### Using with AutoHotkey
This AHK script allows you to call your favourite stratagem. You can modify it as you see fit. This particular script will call in the Recoilless Rifle on mouse 4, the Patriot Exosuit on mouse 5, and the Hellbomb on the H key.
```ahk
!INJECT("example")
```
Look at [AutoHotkey's key list](https://www.autohotkey.com/docs/v2/KeyList.htm) for a complete list of keys that can be bound.

### Using with Elgato Stream Deck

![A screenshot of Elgato Stream Deck software, showing BarRaider's Advanced Launcher action configured to launch "Helldivers 2 Macros.ahk" with an argument of "recoilless rifle".](/help/src/images/ExampleUsageWithStreamDeck.webp)

1. Open the Elgato Stream Deck software.
2. Ensure [BarRaider's Advanced Launcher](https://marketplace.elgato.com/product/advanced-launcher-d9a289e4-9f61-4613-9f86-0069f5897125) plugin is installed.
3. Add "Advanced Launcher" action to a button.
4. In the action's settings, click on "Choose file...", and select the macro script.
5. In the "Arguments" text field, add your desired stratagem, in quotes.


## Limitations

### Key Buffer
Due to AutoHotKey's keystroke sending method, the game won't recognize your keypresses until the script finishes. This may cause your character to stop running, as the system ignores other inputs during this time. Plan accordingly, as this cannot be fixed.


### Mouse Buttons
Please note, currently, Helldivers 2 doesn't like mouse buttons received from AutoHotKey. This means, for example, that if you have set your Stratagem menu key to be mouse 4 instead of the default CTRL, it will not work. Please use keyboard keys instead. Looking into a way to fix this.

### Frame rates
Please note, if you're unable to run Helldivers 2 at a high frame rate, the script may be running too fast for the game to recognize the inputs.

## Current Stratagems
This is a list of all the stratagems currently accepted. When passing these to the script, surround them in quotes.
This list is up to date with Helldivers 2 version `!INJECT("version")`

!INJECT("stratagems")

# License

This program is licensed under the GNU Affero General Public License Version 3 or later.
Read the full license in the [license.txt](/license.txt) file.

# Contributors
[![Contrbutions Image](https://contrib.rocks/image?repo=NicholasDJM/Helldivers-2-Stratagem-Macros)](https://github.com/NicholasDJM/Helldivers-2-Stratagem-Macros/graphs/contributors)

Made with [contrib.rocks](https://contrib.rocks).