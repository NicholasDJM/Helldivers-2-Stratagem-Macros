@echo off
cd %~dp0

REM We're assuming AutoHotkey is installed, as that's what this entire repo is centered around. If not: What are you doing, messing around in this project?!
call :clear
where pnpm > nul
if %errorlevel% NEQ 0 echo Requires PNPM to be installed. Please run `npm i -g pnpm`. If you don't have 'npm', please run 'choco install node' or `winget install node`. && exit /b 1
pushd .\help
echo Compiling HTML...
cmd /c pnpm build
echo Done...
popd

pushd ahk
echo Compiling AHK script...
start /b /wait "" "node" "build.js"
echo Done...
popd

pushd md
echo Updating README...
start /b /wait "" "node" "build.js"
echo Done
popd

exit /b
:clear
exit /b 0