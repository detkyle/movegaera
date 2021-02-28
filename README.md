# movegaera
Script for summon hauling ship and tooltip missions

## Installation

### Script manager

- Install [TamperMonkey](http://tampermonkey.net) or [ViolentMonkey](https://violentmonkey.github.io/get-it) for your browser
- Go to the [install script](https://github.com/detkyle/movegaera/blob/main/movegaera.user.js)
- Your script manager should prompt you to install script
- Once installed, refresh page
- You can configure your script manager to check for updates

# Usage

## Use of ship summon
0. Use only for H hull ships with decent speeds(trip less 14 days) or idk what will happen.
1. Name your hauling ship for planet missions = hauler
2. Go to planet you want ship be
3. Push button with "S" on top to summon ship here.
4. If all done correctly and console without errors ship begins to move to that planet on server but on client side there is no indication of that. You can check that something happens if push button second time - game says "invalid response". That because ship already moves and you cant do anything about it. Thats subarashi and what we need.
5. If you reload game you see that ship actually moves. 

Use of planet tooltip
1. After login game cant see what missions you have so you need to go to planet missions to load them.
2. Hover mouse on "S" button to see tooltip with all missions

## Known bugs 
1. Need to reload game after summon. Client dont update automatically.
2. After complete mission tooltip may not wont work because script dont know that mission number has decreased and it causes undefined error. 
3. Didnt tested with slower not H ships with speeds like 10-50 dont know what will happen. Gameengine UI have function to trip not have 14+ days.
