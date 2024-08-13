
```
Look at [AutoHotkey's key list](https://www.autohotkey.com/docs/v2/KeyList.htm) for a complete list of keys that can be bound.

### Using with Elgato Stream Deck

![A screenshot of Elgato Stream Deck software, showing Barraider's Advanced Launcher action configured to launch "Helldivers 2 Macros.ahk" with an argument of "recoilless rifle".](/helpPage/public/ExampleUsageWithStreamDeck.webp)

1. Open the Elgato Stream Deck software.
2. Ensure [Barraider's Advanced Launcher](https://marketplace.elgato.com/product/advanced-launcher-d9a289e4-9f61-4613-9f86-0069f5897125) plugin is installed.
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
This list is up to date with Helldivers 2 version 