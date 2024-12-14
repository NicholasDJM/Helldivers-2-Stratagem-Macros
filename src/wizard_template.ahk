#Requires AutoHotkey >=v2.0
#SingleInstance Force
#Include "dummy.ahk" ;!REMOVE()
; dummy.ahk defines several functions, so your IDE doesn't complain about undefined functions.
; It does not contain any logic. "Inject.js" instead handles the logic for injection.


; TODO: Add download check for latest list of languages, otherwise, use internal list.
; TODO: Self rename to Install.ahk on update.
; TODO: Add translation strings via !LOCALE()

title := !LOCALE("appname")
installButtonText := !LOCALE("wizardInstallButton")
lang := !INJECT("language")

getLanguageCodes() {
	return !INJECT("languageCodeArray")
}

getLanguages() {
	return !INJECT("languageNameArray")
}


windowWidth := 300
margin := 10
rowLimit := 16

window := Gui("", title)
listbox := window.Add("ListBox", "r" . (getLanguages().Length > rowLimit ? rowLimit : getLanguages().Length) . " vLanguage Choose1 AltSubmit w" . windowWidth - (margin * 2), getLanguages())
githubButton := window.Add("Button", "w80", "GitHub")
button := window.Add("Button", "Default w80 X+M", installButtonText)

/*
	Default = Auto highlight this button
	w80 = Set the control size to 80 pixels
	X+M = Set the X position to 0 plus the margin
	AltSubmit = Get ListBox's selected item's position rather than text.
	vLanguage = Set control name to "Language"
	Choose1 = Set which item is pre selected.
	r10 = Set how many rows the control takes up.
*/

listbox.OnEvent("Change", updateLanguage)
updateLanguage(GuiObj, Info) {
	;MsgBox(GuiObj.value)
	; TODO: Update window title and buttons to reflect new language.
	value := GuiObj.value
}

button.OnEvent("Click", Submit)
Submit(GuiObj, Info) {
	values := window.Submit()
	;MsgBox(values.Language)
	; TODO: Get language, then download macro script in that language. Requires generated language list. See TODO 2
}

githubButton.OnEvent("Click", OpenGitHub)
OpenGitHub(GuiObj, Info) {
	Run("https://www.github.com/NicholasDJM/Helldivers-2-Stratagem-Macros#readme")
}

; TODO: Create submit callback, and download the relevent language file.

window.Show("center")
