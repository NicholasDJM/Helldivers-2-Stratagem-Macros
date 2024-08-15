Set-Location $PSScriptRoot

function Invoke-Script {
	param (
		[string]$command,
		[string]$message,
		[string]$location
	)
	Process {
		Push-Location $location
		Write-Host "[....] Running $command" -NoNewLine
		Invoke-Expression "$command" >$null 2>&1 # Hide the output so we can apply fancy linux startup-esque done or fail status messages.	
		if ($LASTEXITCODE -ne 0) {
			Write-Output "`r[[31mFail[0m]"
			Invoke-Expression "$command" # If there's error messages, we need to run the command again, with output enabled.
			Write-Output "[41m ERROR [0m [31m$message[0m"
			Pop-Location
			Exit
		}
		Write-Output "`r[[32mDone[0m]"
		Pop-Location
	}
}

Invoke-Script -command "pnpm build" -message "Failed to build HTML." -location .\help

Invoke-Script -command "node .\build.mjs" -message "Failed to build AutoHotkey script." -location .\ahk

Invoke-Script -command "node .\build.mjs" -message "Failed to build README file." -location .\md

Write-Output "[32mComplete[0m"

# While I could use the `e escape code for the escape character, it won't show up in CMD.exe. So I'm using the literal escape character in this script.