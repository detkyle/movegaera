$(document).ready(function() {
    'use strict';

	var divmove = document.getElementById("move-root"); //Get a reference to the div
	var movebuttondiv = document.createElement('div'); // var button element
    movebuttondiv.innerHTML = '<button id="movebuttonid" title="Click = Summon hauler from anywhere to current location \nFirst open missions to load them">haufrig</button>'; //fill button element
	movebuttondiv.style.cssText = 'position:absolute; left:20%' // set style of button and its position
	divmove.append(movebuttondiv); // add button to div
	let movebutton = document.getElementById("movebuttonid")
   	 let movebuttonclick = document.getElementById("movebuttonid").addEventListener ("click", MoveButtonClickAction, false); //Get a reference to the button click

	function MoveButtonMouseoverAction () {
	warningMessage(GetLanguage(1105))
}
)();
