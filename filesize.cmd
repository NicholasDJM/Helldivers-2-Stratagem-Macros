@echo off
if [%1]==[/v] (
	if not exist %2 echo %2 does not exist.&&exit /b 1
	echo [33m%2[0m has a filesize of [94m%~z2[0m bytes.
) else (
	if not exist %1 echo %1 does not exist.&&exit /b 1
	echo %~z1
)