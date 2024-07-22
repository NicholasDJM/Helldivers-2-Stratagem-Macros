# Helldivers 2 Stratagem Macros
[![License AGPL 3.0](https://img.shields.io/github/license/NicholasDJM/Helldivers-2-Stratagem-Macros?color=blue)](/LICENSE.txt) ![Version 5](https://img.shields.io/badge/Version-5-brightgreen)

This is an AutoHotKey macro script, which can be called to automatically enter any Stratagem code in Helldivers 2.
The script automatically uses in-game key bindings and reads the correct keys for each Steam user, eliminating the need for manual configuration.

You can execute these macros either through another AutoHotKey script, or through Elgato Stream Deck.



## Installation

You must have AutoHotKey installed, head to https://www.autohotkey.com/ to download the latest version.

Next, if you're using this script with the Stream Deck, you must install [Barraider's Advanced Launcher](https://marketplace.elgato.com/product/advanced-launcher-d9a289e4-9f61-4613-9f86-0069f5897125) plugin.

Then, download my script, <a href="https://raw.githubusercontent.com/NicholasDJM/Helldivers-2-Stratagem-Macros/main/Helldivers%202%20Macros.ahk" download="Helldivers 2 Macros.ahk">Helldivers 2 Macros.ahk</a> (Right click on link, and "Save Link as")

Once my script has downloaded, place it somewhere in it's own folder, alone. Don't put anything else there. The script will modify itself when updating, and also will download and overwrite any file called "version.txt". Make sure not to save any file with that name.

## Usage

### Using with AutoHotkey
This AHK script allows you to call your favourite stratagem. In this case, mine is the Recoilless Rifle, and the Patriot Exosuit. You can modify it as you see fit. This particular script will call in the Recoilless rifle on mouse 4, and the Patriot Exosuit on mouse 5.
```ahk
#Requires AutoHotkey >=2.0
SendMode "Event"
SetWorkingDir A_ScriptDir
XButton1:: ; Mouse Browser Back button
try {
	Run('"Helldivers 2 Macros.ahk" "Recoilless Rifle"')
} catch e {
	MsgBox(e)
}
exit
XButton2:: ; Mouse Browser Forward button
try {
	Run('"Helldivers 2 Macros.ahk" "Patriot Exosuit"')
} catch e {
	MsgBox(e)
}
exit
```
Look at [AutoHotkey's key list](https://www.autohotkey.com/docs/v2/KeyList.htm) for a complete list of keys that can be bound.

### Using with Elgato Stream Deck

![A screenshot of Elgato Stream Deck software, showing Barraider's Advanced Launcher action configured to launch "Helldivers 2 Macros.ahk" with an argument of "recoilless rifle".](/ExampleUsageWithStreamDeck.png)

1. Open the Elgato Stream Deck software.
2. Ensure [Barraider's Advanced Launcher](https://marketplace.elgato.com/product/advanced-launcher-d9a289e4-9f61-4613-9f86-0069f5897125) plugin is installed.
3. Add "Advanced Launcher" action to a button.
4. In the action's settings, click on "Choose file...", and select the macro script.
5. In the "Arguments" text field, add your desired stratagem, in quotes.


## Limitations

### Key Buffer
Due to AutoHotKey's keystroke sending method, the game won't recognize your keypresses until the script finishes. This may cause your character to stop running, as the system ignores other inputs during this time. Plan accordingly, as this cannot be fixed.


### Mouse Buttons
Please note, currently, Helldivers 2 doesn't like mouse buttons received from AutoHotKey. Please use keyboard keys instead. Looking into a way to fix this.


## Syntax

Syntax is `Helldivers 2 Macros.ahk <Stratagem Name | update macros> [Timing between keypresses, in milliseconds] [Timing between key down/up events, in milliseconds]`

First argument must have quotes if there are spaces.
Execute with `update macros` as the first argument, in quotes, and the script will attempt to update itself with a newer version.

The second argument can be an integer number, in milliseconds, to set the delay between different keypresses.
The third argument can be an integer number, in milliseconds, to set the delay between key down and up events.

## Current Stratagems
This list is up to date with Helldivers 2 version 1.000.405.
When passing these to the script, surround them in quotes. Choose one, and use it as the first argument.

- Machine Gun
- Anti Material Rifle
- Stalwart
- Expendable Anti Tank
- Recoilless Rifle
- Flamethrower
- Autocannon
- Heavy Machine Gun
- Airburst Rocket Launcher
- Commando
- Railgun
- Spear
- Grenade Launcher
- Laser Cannon
- Arc Thrower
- Quasar Cannon
- Orbital Gatling Barrage
- Orbital Airburst Strike
- Orbital 120mm HE Barrage
- Orbital 380mm HE Barrage
- Orbital Walking Barrage
- Orbital Laser
- Orbital Railcannon Strike
- Orbital Precision Strike
- Orbital Gas Strike
- Orbital Smoke Strike
- Orbital EMS Strike
- Eagle Strafing Run
- Eagle Airstrike
- Eagle Cluster Bomb
- Eagle Napalm Strike
- Eagle Smoke Strike
- Eagle 110mm Rocket Pods
- Eagle 500kg Bomb
- Jump Pack
- Supply Pack
- Guard Dog Rover
- Guard Dog
- Ballistic Shield Backpack
- Shield Generator Pack
- Shield Generator Relay
- Tesla Tower
- Anti Personnel Minefield
- Incendiary Mines
- HMG Emplacement
- Machine Gun Sentry
- Gatling Sentry
- Mortar Sentry
- Autocannon Sentry
- Rocket Sentry
- EMS Mortar Sentry
- Patriot Exosuit
- Emancipator Exosuit
- Reinforce
- SOS Beacon
- Resupply
- Eagle Rearm
- SSSD Delivery
- Prospecting Drill
- Super Earth Flag
- Hellbomb
- Upload Data
- Seismic Probe
- SEAF Artillery
- Dark Fluid Vessel
- Tectonic Drill
- Hive Breaker Drill
