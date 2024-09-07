@echo off
call filesize.cmd "Helldivers 2 Macros.ahk">%tmp%/%0_string.txt
set /p ahkSize=<%tmp%/%0_string.txt
call filesize.cmd "Helldivers 2 Macros.ahk.tar.gz">%tmp%/%0_string.txt
set /p zipSize=<%tmp%/%0_string.txt

powershell .\build.ps1

call filesize.cmd "Helldivers 2 Macros.ahk">%tmp%/%0_string.txt
set /p newAhkSize=<%tmp%/%0_string.txt
call filesize.cmd "Helldivers 2 Macros.ahk.tar.gz">%tmp%/%0_string.txt
set /p newZipSize=<%tmp%/%0_string.txt
if [%ahkSize%] GTR [%newAhkSize%] echo [33m"Helldiveres 2 Macros.ahk"[0m has [32mreduced[0m in size. It was [94m%ahkSize%[0m bytes, and is now [94m%newAhkSize%[0m bytes.
if [%ahkSize%] LSS [%newAhkSize%] echo [33m"Helldiveres 2 Macros.ahk"[0m has [31mexpanded[0m in size. It was [94m%ahkSize%[0m bytes, and is now [94m%newAhkSize%[0m bytes.
if [%ahkSize%] EQU [%newAhkSize%] echo [33m"Helldiveres 2 Macros.ahk"[0m is the same size. It's currently [94m%newAhkSize%[0m bytes.
if [%zipSize%] GTR [%newZipSize%] echo [33m"Helldiveres 2 Macros.ahk.tar.gz"[0m has [32mreduced[0m in size. It was [94m%zipSize%[0m bytes, and is now [94m%newZipSize%[0m bytes.
if [%zipSize%] LSS [%newZipSize%] echo [33m"Helldiveres 2 Macros.ahk.tar.gz"[0m has [31mexpanded[0m in size. It was [94m%zipSize%[0m bytes, and is now [94m%newZipSize%[0m bytes.
if [%zipSize%] EQU [%newZipSize%] echo [33m"Helldiveres 2 Macros.ahk.tar.gz"[0m is the same size. It's currently [94m%newZipSize%[0m bytes.