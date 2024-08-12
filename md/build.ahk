#Requires AutoHotkey >=v2.0 
SetWorkingDir A_ScriptDir

part1 := FileRead("./part1.md")
part2 := FileRead("./part2.md")
part3 := FileRead("./part3.md")
part4 := FileRead("./part4.md")
version := FileRead("../version.txt")
exampleCode1 := FileRead("../helpPage/public/example.ahk") ; Grabs the example AHK script to inject into the README file.

try FileDelete("../readme.md")
FileAppend(part1 . version . part2 . version . part3 . exampleCode1 . part4, "../readme.md")