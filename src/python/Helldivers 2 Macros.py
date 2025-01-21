import pyautogui
import time
import sys
import os
import winreg
from typing import Dict, List

# Configure PyAutoGUI settings
pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.1  # Default delay between actions

class HelldiversMacros:
    def __init__(self):
        self.options = {
            "delay": 100,      # Delay between key presses (ms)
            "holdDelay": 50,   # How long to hold keys (ms)
            "wait": 50,        # Initial delay before macro starts (ms)
        }
        
        self.keys = {
            "up": "w",
            "down": "s",
            "left": "a",
            "right": "d",
            "menu": "ctrl"
        }
        
        # Try to read actual keybinds from Helldivers 2 config
        self.read_game_keybinds()

    def read_game_keybinds(self):
        """Read keybindings from Helldivers 2 config file"""
        try:
            # Get Steam ID from registry
            steam_key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"SOFTWARE\Valve\Steam\ActiveProcess")
            steam_id = winreg.QueryValueEx(steam_key, "ActiveUser")[0]
            
            # Construct path to config file
            config_path = os.path.expandvars(
                f"%ProgramFiles(x86)%\\Steam\\userdata\\{steam_id}\\553850\\remote\\input_settings.config"
            )
            
            # TODO: Implement config file parsing similar to AHK version
            # For now, using default keybinds
            
        except Exception as e:
            print(f"Warning: Could not read game keybinds: {e}")
            # Fall back to default keybinds

    def key_press(self, key: str, delay: float):
        """Press and hold a key for specified duration"""
        pyautogui.keyDown(key)
        time.sleep(delay / 1000)  # Convert ms to seconds
        pyautogui.keyUp(key)

    def execute_stratagem(self, code: List[str]):
        """Execute a stratagem sequence"""
        # Check if Helldivers 2 window is active
        try:
            # TODO: Implement window check
            pass
        except:
            print("Error: Helldivers 2 is not in focus")
            return

        # Initial delay
        time.sleep(self.options["wait"] / 1000)

        # Press and hold menu key (ctrl by default)
        pyautogui.keyDown(self.keys["menu"])
        time.sleep(self.options["delay"] / 1000)

        # Execute the stratagem sequence
        for direction in code:
            if direction in self.keys:
                self.key_press(self.keys[direction], self.options["holdDelay"])
                time.sleep(self.options["delay"] / 1000)
            else:
                print(f"Error: Invalid direction '{direction}' in stratagem code")
                return

        # Release menu key
        pyautogui.keyUp(self.keys["menu"])

    def get_stratagem_code(self, name: str) -> List[str]:
        """Get the key sequence for a stratagem"""
        stratagems = {
            "resupply": ["down", "down", "up", "right"],
            "machine gun": ["down", "left", "down", "up", "right"],
            # Add more stratagems here
        }
        
        name = name.lower().strip()
        return stratagems.get(name, None)

def main():
    if len(sys.argv) < 2:
        print("Usage: python script.py <stratagem_name>")
        return

    macro = HelldiversMacros()
    stratagem_name = " ".join(sys.argv[1:])
    code = macro.get_stratagem_code(stratagem_name)
    
    if code:
        print(f"Executing stratagem: {stratagem_name}")
        macro.execute_stratagem(code)
    else:
        print(f"Unknown stratagem: {stratagem_name}")

if __name__ == "__main__":
    main()