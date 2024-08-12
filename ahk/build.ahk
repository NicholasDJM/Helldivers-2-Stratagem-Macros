#Requires AutoHotkey >=v2.0 
SetWorkingDir A_ScriptDir

; Compiles the AHK script, by embedding the version and HTML help file into the AutoHotkey script.
part1 := FileRead("./part1.ahk")
part2 := FileRead("./part2.ahk")
part3 := FileRead("./part3.ahk")
version := FileRead("../version.txt")
html := FileRead("../helpPage/dist/index.html")
html := StrReplace(html, "``", "````")
; Must escape all backticks, as they are escape characters in AutoHotkey. Without this, final output will be missing the backticks, breaking the JavaScript.

FileDelete("../Helldivers 2 Macros.ahk")
FileAppend(part1 . version . part2 . html . part3, "../Helldivers 2 Macros.ahk")