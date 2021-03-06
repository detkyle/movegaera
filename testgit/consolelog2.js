	$("body").append("<div id='move-root'/>"); //add div for html
	var divmove = document.getElementById("move-root"); //Get a reference to the div
	var movebuttondiv = document.createElement('div'); // var button element
    movebuttondiv.innerHTML = '<button id="movebuttonid" title="Click = Summon hauler from anywhere to current location \nFirst open missions to load them">haufrig</button>'; //fill button element
	movebuttondiv.style.cssText = 'position:absolute; left:20%' // set style of button and its position
	divmove.append(movebuttondiv); // add button to div
	let movebutton = document.getElementById("movebuttonid")


console.log(planet.id)
console.log(shipMoveCommand)
