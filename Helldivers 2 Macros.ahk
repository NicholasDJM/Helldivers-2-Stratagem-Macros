/*
    Automatically enters stratagem codes for Helldivers 2
    Copyright (C) 2024  Nicholas Miller

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
#Requires AutoHotkey >=2.0
#SingleInstance
SendMode "Event" ; Must be set to Event mode, Helldivers 2 doesn't like Input or Play modes.
SetWorkingDir A_ScriptDir
version := 9 ; NOTE to Devs, remember to increment this and the number in version.txt to correctly update the script. Must be an integer!

; Macros for every Stratagem in Helldivers 2, up to version 1.001.002.
; Script designed to be called from other AutoHotKey scripts or from a Stream Deck.

; Call this script with a string argument of the name of the stratagem you want, as seen in game, in English.
; For example `Helldivers 2 Macro.ahk "Recoilless Rifle"`
; You can also adjust the timing of each keypress, with a number at the end.
; For example `Helldivers 2 Macro.ahk "Recoilless Rifle" 250`



; DO NOT EDIT ANYTHING BELOW

global appname
appname := "Helldivers 2 Macros"

global MsgBoxEnums
MsgBoxEnums := Map()
MsgBoxEnums["OK"] := 0
MsgBoxEnums["OKCancel"] := 1
MsgBoxEnums["AbortRetryIgnore"] := 2
MsgBoxEnums["YesNoCancel"] := 3
MsgBoxEnums["YesNo"] := 4
MsgBoxEnums["RetryCancel"] := 5
MsgBoxEnums["CancelTryAgainContinue"] := 6
MsgBoxEnums["Stop"] := 16
MsgBoxEnums["Error"] := 16
MsgBoxEnums["Question"] := 32
MsgBoxEnums["Exclamation"] := 48
MsgBoxEnums["Info"] := 64

global TrayEnums
TrayEnums := Map()
TrayEnums["NoIcon"] := 0
TrayEnums["Info"] := 1
TrayEnums["Warning"] := 2
TrayEnums["Error"] := 3
TrayEnums["TrayIcon"] := 4
TrayEnums["Mute"] := 16
TrayEnums["LargeIcon"] := 32

global help
help := Map()
help["main"] := "
(
To use this script, add a Stratagem name as the first argument when calling this script, in quotes.
You may also add a number as the second argument to adjust the timing, in milliseconds.
Add `"update macros`" as the first argument to instead start the auto-updater. Updates add new stratagems.
Created by github.com/NicholasDJM

Do you want to see the names Support Weapon names?
Select No to see the next Stratagem group.
Select Cancel to quit.
)"

help["support"] := "
(
These are the names of Support Weapons currently available.
Pick one, and add it the the end of the script call, Ex: "Helldivers 2 Macros.ahk" "recoilless rifle"

Machine Gun
Anti Material Rifle
Stalwart
Expendable Anti Tank
Recoilless Rifle
Flamethrower
Autocannon
Heavy Machine Gun
Airburst Rocket Launcher
Commando
Railgun
Spear
Grenade Launcher
Laser Cannon
Arc Thrower
Quasar Cannon
)"

help["orbital"] := "
(
These are the names of Orbital Strikes currently available.
Pick one, and add it the the end of the script call, Ex: "Helldivers 2 Macros.ahk" "railcannon strike"

Orbital Gatling Barrage
Orbital Airburst Strike
Orbital 120mm HE Barrage
Orbital 380mm HE Barrage
Orbital Walking Barrage
Orbital Laser
Orbital Railcannon Strike
Orbital Precision Strike
Orbital Gas Strike
Orbital Smoke Strike
Orbital EMS Strike
)"

help["eagle"] := "
(
These are the names of Eagle Strikes currently available.
Pick one, and add it the the end of the script call, Ex: "Helldivers 2 Macros.ahk" "eagle 500kg bomb"

Eagle Strafing Run
Eagle Airstrike
Eagle Cluster Bomb
Eagle Napalm Strike
Eagle Smoke Strike
Eagle 110mm Rocket Pods
Eagle 500kg Bomb
)"

help["defense"] := "
(
These are the names of Defensive Stratagems currently available.
Pick one, and add it the the end of the script call, Ex: "Helldivers 2 Macros.ahk" "gatling sentry"

Shield Generator Relay
Tesla Tower
Anti Personnel Minefield
Incendiary Mines
Anti Tank Mines
HMG Emplacement
Machine Gun Sentry
Gatling Sentry
Mortar Sentry
Autocannon Sentry
Rocket Sentry
EMS Mortar Sentry
)"

help["misc"] := "
(
These are the names of Miscellaneous Stratagems currently available.
Pick one, and add it the the end of the script call, Ex: "Helldivers 2 Macros.ahk" "guard dog rover"

Jump Pack
Supply Pack
Guard Dog Rover
Guard Dog
Ballistic Shield Backpack
Shield Generator Pack
Patriot Exosuit
Emancipator Exosuit
)"

help["mission"] := "
(
These are the names of Mission Stratagems currently available.
Pick one, and add it the the end of the script call, Ex: "Helldivers 2 Macros.ahk" "hellbomb"

Reinforce
SOS Beacon
Resupply
Eagle Rearm
SSSD Delivery
Prospecting Drill
Super Earth Flag
Hellbomb
Upload Data
Seismic Probe
SEAF Artillery
Dark Fluid Vessel
Tectonic Drill
Hive Breaker Drill
)"

if (A_Args.length = 0) {
	result := MsgBox(help["main"], appname, MsgBoxEnums["Question"]+MsgBoxEnums["YesNoCancel"])
	if (result = "Cancel") {
		ExitApp
	}
	if (result = "Yes") {
		MsgBox(help["support"], appname . " - Support Weapons", MsgBoxEnums["Info"])
	}
	result := MsgBox("Do you want to see Orbital Strike names? Select No to see next Stratagem group. Select Cancel to quit.", appname, MsgBoxEnums["Question"]+MsgBoxEnums["YesNoCancel"])
	if (result = "Cancel") {
		ExitApp
	}
	if (result = "Yes") {
		MsgBox(help["orbital"], appname . " - Orbital Strikes", MsgBoxEnums["Info"])
	}
	result := MsgBox("Do you want to see Eagle Strike names? Select No to see next Stratagem group. Select Cancel to quit.", appname, MsgBoxEnums["Question"]+MsgBoxEnums["YesNoCancel"])
	if (result = "Cancel") {
		ExitApp
	}
	if (result = "Yes") {
		MsgBox(help["eagle"], appname . " - Eagle Strikes", MsgBoxEnums["Info"])
	}
	result := MsgBox("Do you want to see Defensive Stratagem names? Select No to see next Stratagem group. Select Cancel to quit.", appname, MsgBoxEnums["Question"]+MsgBoxEnums["YesNoCancel"])
	if (result = "Cancel") {
		ExitApp
	}
	if (result = "Yes") {
		MsgBox(help["defense"], appname . " - Defensive Stratagems", MsgBoxEnums["Info"])
	}
	result := MsgBox("Do you want to see Miscellaneous Stratagem names? Select No to see next Stratagem group.", appname, MsgBoxEnums["Question"]+MsgBoxEnums["YesNoCancel"])
	if (result = "Cancel") {
		ExitApp
	}
	if (result = "Yes") {
		MsgBox(help["misc"], appname . " - Miscellaneous Stratagems", MsgBoxEnums["Info"])
	}
	result := MsgBox("Do you want to see Mission Stratagem names? Select No to quit.", appname, MsgBoxEnums["Question"]+MsgBoxEnums["YesNo"])
	if (result = "Yes") {
		MsgBox(help["mission"], appname . " - Mission Stratagems", MsgBoxEnums["Info"])
	}
	ExitApp
}
if (A_Args[1] = "update macros") {
	goto update
}
if (A_Args.length = 2) {
	timing := A_Args[2]
}
if (A_Args.length = 3) {
	timing := A_Args[2]
	secondarytiming := A_Args[3]
}

global version
global keys
keys := Map()


SteamID := RegRead("HKCU\SOFTWARE\Valve\Steam\ActiveProcess", "ActiveUser")

; TODO WARNING! We must translate every possible key to AutoHotKey's key names.
; What are the key names that Helldivers 2 uses?

; Translates Helldivers 2's key names to AutoHotKey's key names.
Translate(oldkey) {
	switch oldkey {
		case "MouseButton1":
			return "LButton"
		case "MouseButton2":
			return "RButton"
		case "MouseButton3":
			return "MButton"
		case "MouseButton4":
			return "XButton1"
		case "MouseButton5":
			return "XButton2"
		default:
			return oldkey
	}
}

global state
state := "findstratagem"

inputfile := "C:\Program Files (x86)\Steam\userdata\" . SteamID . "\553850\remote\input_settings.config"
global key_found_up
key_found_up := false
global key_found_down
key_found_down := false
global key_found_left
key_found_left := false
global key_found_right
key_found_right := false
global key_found_menu
key_found_menu := false
global key_menu_type
key_menu_type := "unknown"

global loopindex
loopindex := 0
global lastLine
lastLine := ""

; We must only read a file once! It's very expensive time wise to read a file, and the player expects the action to be immediate.
Loop Read inputfile
{
	loopindex := loopindex + 1
	if (state = "findstratagem" && A_LoopReadLine = "Stratagem = {")
	{
		state := "stratagem"
	} else {
		if (!key_found_up && A_LoopReadLine = "`tUp = [")
		{
			state := "findup"
		}
		if (!key_found_down && A_LoopReadLine = "`tDown = [")
		{
			state := "finddown"
		}
		if (!key_found_left && A_LoopReadLine = "`tLeft = [")
		{
			state := "findleft"
		}
		if (!key_found_right && A_LoopReadLine = "`tRight = [")
		{
			state := "findright"
		}
		if (!key_found_menu && A_LoopReadLine = "`tStart = [")
		{
			state := "findmenu"
		}
	}


	if (!key_found_up && state = "findup" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" || A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`"") )
	{
		state := "up"
		key_found_up := true
	}
	else if (!key_found_down && state = "finddown" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" || A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`""))
	{
		state := "down"
		key_found_down := true
	}
	else if (!key_found_left && state = "findleft" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" || A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`""))
	{
		state := "left"
		key_found_left := true
	}
	else if (!key_found_right && state = "findright" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" ||  A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`""))
	{
		state := "right"
		key_found_right := true
	}
	else if (!key_found_menu && state = "findmenu" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" ||  A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`""))
	{
		state := "menu"
		key_found_menu := true
		Switch (lastLine)
		{
			Case "`t`t`ttrigger = `"Press`"":
				key_menu_type := "press"

			Case "`t`t`ttrigger = `"Tap`"":
				key_menu_type := "tap"

			Case "`t`t`ttrigger = `"DoubleTap`"":
				key_menu_type := "doubletap"

			Case "`t`t`ttrigger = `"LongPress`"":
				key_menu_type := "longpress"

			Case "`t`t`ttrigger = `"Hold`"":
				key_menu_type := "hold"
		}
	}
	if (state = "up" || state = "down" || state = "right" || state = "left" || state = "menu")
	{

		SplitA := StrSplit(A_LoopReadLine, "=")
		SplitB := StrSplit(A_LoopReadLine, "=", " `"")
		if (SplitA[1] = "`t`t`tinput ")
		{
			key := SplitB[2]
			keys[state] := Translate(key)
			state := "stratagem"
		}
	}
	lastLine := A_LoopReadLine
}

if (!keys.Has("up"))
{
	keys["up"] := "w"
}
if (!keys.Has("down"))
{
	keys["down"] := "s"
}
if (!keys.Has("left"))
{
	keys["left"] := "a"
}
if (!keys.Has("right"))
{
	keys["right"] := "d"
}
if (!keys.Has("menu"))
{
	keys["menu"] := "ctrl"
	key_menu_type := "hold"
}


global timing
global secondarytiming

timing := 150 ; Primary timing default, between different key presses.
secondarytiming := 10 ; Secondary timing default, between key down and key up of a single key.





Stratagem(code) {
	title := "HELLDIVERS™ 2"
	
	if (WinActive(title)) {
	if (key_menu_type = "hold") {
		Send("{" . keys["menu"] . " DOWN}")

	} else if (key_menu_type = "doubletap") {
		Send("{" . keys["menu"] . " DOWN}")
		Sleep(secondarytiming)
		Send("{" . keys["menu"] . " UP}")
		Sleep(secondarytiming)
		Send("{" . keys["menu"] . " DOWN}")
		Sleep(secondarytiming)
		Send("{" . keys["menu"] . " UP}")

	} else if (key_menu_type = "longpress") {
		Send("{" . keys["menu"] . " DOWN}")
		Sleep(500)
		Send("{" . keys["menu"] . " UP}")
		Sleep(timing)

	} else {
		Send("{" . keys["menu"] . " DOWN}")
		Sleep(10)
		Send("{" . keys["menu"] . " UP}")

	}
	Sleep(timing)


	for index, value in code {
			if (value = "up") {
				Send("{" . keys["up"] . " Down}")
				Sleep(secondarytiming)
				Send("{" . keys["up"] . " Up}")
			}
			else if (value = "left") {
				Send("{" . keys["left"] . " Down}")
				Sleep(secondarytiming)
				Send("{" . keys["left"] . " Up}")
			}
			else if (value = "right") {
				Send("{" . keys["right"] . " Down}")
				Sleep(secondarytiming)
				Send("{" . keys["right"] . " Up}")
			}
			else if (value = "down") {
				Send("{" . keys["down"] . " Down}")
				Sleep(secondarytiming)
				Send("{" . keys["down"] . " Up}")
			} else {
				TrayTip("Incorrect direction for Stratagem.`nPlayers: Contact support at github.com/NicholasDJM/Helldivers-2-Stratagem-Macros.`nDevs: Check your code.",appname, TrayEnums["Error"]+TrayEnums["LargeIcon"])
				Sleep(5000) ; Notifications will immediately go away as soon as we display them if we don't sleep (if the script exits immediately).
				ExitApp
			}
		Sleep(timing)
	}
	} else {
		TrayTip("Helldivers 2 is not in focus.",appname, TrayEnums["Error"]+TrayEnums["LargeIcon"])
		Sleep(5000)
		ExitApp
	}
	if (key_menu_type = "hold" && WinActive(title)) {
		Send("{" . keys["menu"] . " UP}")
	}
}

Switch A_Args[1] {

Case "machine gun":
	Stratagem(["down","left","down","up","right"])

Case "anti material rifle":
	Stratagem(["down","left","right","up","down"])

Case "stalwart":
	Stratagem(["down","left","down","up","up","left"])

Case "expendable anti tank":
	Stratagem(["down","down","left","up","right"])

Case "recoilless rifle":
	Stratagem(["down","left","right","right","left"])

Case "flamethrower":
	Stratagem(["down","left","up","down","up"])

Case "autocannon":
	Stratagem(["down","left","down","up","up","right"])

Case "heavy machine gun":
	Stratagem(["down","left","up","down","down"])

Case "airburst rocket launcher":
	Stratagem(["down","up","up","left","right"])

Case "commando":
	Stratagem(["down","left","up","down","right"])

Case "railgun":
	Stratagem(["down","right","down","up","left","right"])

Case "spear":
	Stratagem(["down","down","up","down","down"])

Case "grenade launcher":
	Stratagem(["down","left","up","left","down"])

Case "laser cannon":
	Stratagem(["down","left","down","up","left"])

Case "arc thrower":
	Stratagem(["down","left","down","up","left","left"])

Case "quasar cannon":
	Stratagem(["down","down","up","left","right"])

Case "orbital gatling barrage":
	Stratagem(["right","down","left","up","up"])

Case "orbital airburst strike":
	Stratagem(["right","right","right"])

Case "orbital 120mm he barrage":
	Stratagem(["right","right","down","left","right","down"])

Case "orbital 380mm he barrage":
	Stratagem(["right","down","up","up","left","down","down"])

Case "orbital walking barrage":
	Stratagem(["right","down","right","down","right","down"])

Case "orbital laser":
	Stratagem(["right","down","up","right","down"])

Case "orbital railcannon strike":
	Stratagem(["right","up","down","down","right"])

Case "orbital precision strike":
	Stratagem(["right","right","down"])

Case "orbital gas strike":
	Stratagem(["right","right","down","right"])

Case "orbital ems strike":
	Stratagem(["right","right","left","down"])

Case "orbital smoke strike":
	Stratagem(["right","right","down","up"])

Case "eagle strafing run":
	Stratagem(["up","right","right"])

Case "eagle airstrike":
	Stratagem(["up","right","down","right"])

Case "eagle cluster bomb":
	Stratagem(["up","right","down","down","right"])

Case "eagle napalm strike":
	Stratagem(["up","right","down","up"])

Case "eagle smoke strike":
	Stratagem(["up","right","up","down"])

Case "eagle 110mm rocket pods":
	Stratagem(["up","right","up","left"])

Case "eagle 500kg bomb":
	Stratagem(["up","right","down","down","down"])

Case "jump pack":
	Stratagem(["down","up","up","down","up"])

Case "supply pack":
	Stratagem(["down","left","down","up","up","down"])

Case "guard dog rover":
	Stratagem(["down","up","left","up","right","right"])

Case "guard dog":
	Stratagem(["down","up","left","up","right","down"])

Case "ballistic shield backpack":
	Stratagem(["down","left","down","down","up","left"])

Case "shield generator pack":
	Stratagem(["down","up","left","right","left","right"])

Case "hmg emplacement":
	Stratagem(["down","up","left","right","right","left"])

Case "shield generator relay":
	Stratagem(["down","down","left","right","left","right"])

Case "tesla tower":
	Stratagem(["down","up","right","up","left","right"])

Case "anti personal minefield":
	Stratagem(["down","left","up","right"])

Case "incendiary mines":
	Stratagem(["down","left","left","down"])

Case "machine gun sentry":
	Stratagem(["down","up","right","right","up"])

Case "gatling sentry":
	Stratagem(["down","up","right","left"])

Case "mortar sentry":
	Stratagem(["down","up","right","right","down"])

Case "autocannon sentry":
	Stratagem(["down","up","right","up","left","up"])

Case "rocket sentry":
	Stratagem(["down","up","right","right","left"])

Case "ems mortar sentry":
	Stratagem(["down","up","right","down","right"])

Case "patriot exosuit":
	Stratagem(["left","down","right","up","left","down","down"])

Case "emancipator exosuit":
	Stratagem(["left","down","right","up","left","down","up"])

Case "reinforce":
	Stratagem(["up","down","right","left","up"])

Case "sos beacon":
	Stratagem(["up","down","right","up"])

Case "resupply":
	Stratagem(["down","down","up","right"])

Case "eagle rearm":
	Stratagem(["up","up","left","up","right"])

Case "SSSD delivery":
	Stratagem(["down","down","down","up","up"])

Case "prospecting drill":
	Stratagem(["down","down","left","right","down","down"])

Case "super earth flag":
	Stratagem(["up","down","up","down"])

Case "hellbomb":
	Stratagem(["down","up","left","down","up","right","down","up"])

Case "upload data":
	Stratagem(["left","right","up","up","up"])

Case "seismic probe":
	Stratagem(["up","up","left","right","down","down"])

Case "orbital illumination flare":
	Stratagem(["right","right","left","left"])

Case "SEAF Artillery":
	Stratagem(["right","up","up","down"])

Case "dark fluid vessel":
	Stratagem(["up","left","right","down","up","up"])

Case "tectonic drill":
	Stratagem(["up","down","up","down","up","down"])

Case "hive breaker drill":
	Stratagem(["left","up","down","right","down","down"])

Case "anti tank mines":
	Stratagem(["down","left","up","up"])

Default:
	TrayTip("Cannot find " . A_Args[1] . " macro.",appname,TrayEnums["Error"]+TrayEnums["LargeIcon"])
	Sleep(5000)
}



try {
	Download("https://raw.githubusercontent.com/NicholasDJM/Helldivers-2-Stratagem-Macros/main/version.txt", "./version.txt")
	try {
		new:=FileRead("./version.txt")
		if (Number(new) > version) {
			TrayTip("Version " . new . " is availave.`n`nRun this script with the `"update macros`" argument to auto update.",appname, TrayEnums["Info"]+TrayEnums["LargeIcon"])
			Sleep(5000)
		}
	} catch error {
		TrayTip("Could not read version file.",appname, TrayEnums["Error"]+TrayEnums["LargeIcon"])
		Sleep(5000)
	}
} catch error {
	TrayTip("Could not retrieve latest version.",appname, TrayEnums["Error"]+TrayEnums["LargeIcon"])
	Sleep(5000)
}
ExitApp

update:
try {
	Download("https://raw.githubusercontent.com/NicholasDJM/Helldivers-2-Stratagem-Macros/main/version.txt", "./version.txt")
	try {
		new := FileRead("./version.txt")
		if (Number(new) > version) {
			try {
				Download("https://raw.githubusercontent.com/NicholasDJM/Helldivers-2-Stratagem-Macros/main/Helldivers 2 Macros.ahk", A_ScriptName)
			} catch error {
				MsgBox("Could not download update.",appname,MsgBoxEnums["Error"])
			}
		} else {
			MsgBox("You already have the latest version.",appname,MsgBoxEnums["Info"])
		}
	} catch error {
		MsgBox("Could not read version file.",appname,MsgBoxEnums["Error"])
	}
} catch error {
	MsgBox("Could not retrieve latest version.",appname,MsgBoxEnums["Error"])
}
ExitApp