	$("body").append("<div id='move-root'/>"); //add div for html
	var divmove = document.getElementById("move-root"); //Get a reference to the div
	var movebuttondiv = document.createElement('div'); // var button element
    movebuttondiv.innerHTML = '<button id="movebuttonid" title="Click = Summon hauler from anywhere to current location \nFirst open missions to load them">haufrig</button>'; //fill button element
	movebuttondiv.style.cssText = 'position:absolute; left:20%' // set style of button and its position
	divmove.append(movebuttondiv); // add button to div
	let movebutton = document.getElementById("movebuttonid")
    let movebuttonclick = document.getElementById("movebuttonid").addEventListener ("click", MoveButtonClickFunction, false); //Get a reference to the button click
	let movebuttonhover = document.getElementById("movebuttonid").addEventListener ("mouseover", MoveButtonMouseoverAction, false); //Get a reference to the button mouseover

	
	function MoveButtonMouseoverAction () {
		//load all planet missions array from game
		for (var a = 0, b = 0, MissionArray = []; b < playerInfo.planetMission.mission.length; b++){ //its to get all missions from game engine
			if (0 <= playerInfo.planetMission.mission[b][1][2]) {
				MissionArray[b] = new Planet_UI_Mission_Item(playerInfo.planetMission.mission[b]); // takes player data through game constructor
				a++
		}}
		//console.log(MissionArray)
		movebutton.title = "Click = Summon hauler from anywhere to current location"
		for (var d = 0; d < playerInfo.planetMission.mission.length; d++){  //its for each mission quantity
			var resstring = MissionArray[d].planetMission.s1 //string like "3_10_69754|3_5_1627604" from gameengine
			var resdivider = resstring.indexOf("|") //find index of | diviser of two items
			var fin = []			// place of | (divider) if he there then there is 2 items if  its -1 then there is 1 item
			var spaceindex = 0 // index of _ or |
					for (var e=0; e<6; e++){ //its for string divide in to array to kill trash = _ and |
					if (e<3){ //if first item need to check for _ or |
					spaceindex = Math.min(resstring.indexOf("_"), resstring.indexOf("|")) //find indexs of next _ or |
					fin[e] = resstring.substring(0, spaceindex) //write number in array 
					resstring = resstring.substring(spaceindex+1) // skip the "_" or "|"
					} else if (e==5) { // if last not needed to check for _ or |
						fin[e] = resstring.substring(0) //write number in array 
					} else { //if second need to check only for _
						spaceindex = resstring.indexOf("_") //index of _
						fin[e] = resstring.substring(0, spaceindex) //write number in array 
						resstring = resstring.substring(spaceindex+1) // skip the "_" or "|"
					}
					//console.log(e, fin[e], resstring)
					}
					// add to tooltip for 1 item
					var targetplanet = MissionArray[d].planet[1] // get coord of planet 
					for (var t = targetplanet.length;targetplanet.length <7; t++){targetplanet += "_"} //for fancy UI spaces 
					fin[6] = GetItemName(fin[0],fin[1])
					if (resdivider == -1){
						fin[7] = GetItemName(fin[3],fin[4])
						movebutton.title += "\n" + " lvl" + MissionArray[d].planetMission[1] + " p " +  targetplanet  + " " + fin[7] + " = " + Math.floor(fin[5]*MissionArray[0].effect) // add to tooltip for 1 item effect for skill multiply
					}else {
						fin[7] = GetItemName(fin[3],fin[4])
						movebutton.title += "\n" + " lvl" + MissionArray[d].planetMission[1] + " p " + targetplanet + " " + fin[6] + " = " + Math.floor(fin[2]*MissionArray[0].effect) + " and " + fin[7] + " = " + Math.floor(fin[5]*MissionArray[0].effect)
					}//if there is divider need to operate 2 resources 
					
					//console.log(d + " " + MissionArray[d].planet[1])
		
		}
	}
	
	function MoveButtonClickFunction () {
	
    console.log("button was clicked");
	var MissionPlanetId = planet.id //get current planet id
	var hauler = 0 //var hauler id
	var shipscount = playerInfo.shipes.length // to get ships count on acc
	for (i = 0; i < shipscount; i++) //go through all ship names to find one named "hauler" H hauler ship, thats one to move
		if (playerInfo.shipes[i].name == "haufrig"){
			hauler = playerInfo.shipes[i] // if found write ship to var
		}
	if (hauler.planet != MissionPlanetId) { // check if already at the planet

	//create all data to send to gameengine from ShipMove_UI.prototype.beginMove
	GetPlanetHandle(hauler.planet, 1, 0, 0, 0);// load hauler planet from game server
	var a = GD_Shipbody.getById[hauler.shipBody];
	shipMoveCommand = {}; //new array of ship move for gameengine
	shipMoveCommand.planetId = hauler.planet; //start planet id of ship
	shipMoveCommand.targetId = MissionPlanetId // finish planet id
    shipMoveCommand.type = 1; // need to be 1 for gameengine
	shipMoveCommand.flag = true // need to be true for gameengine
	shipMoveCommand.planetTargetId = 1 //need to be 1 for gameengine
	shipMoveCommand.shipData = hauler // set ship data to our chosen ship
	
	//start time and distance calculation
	//this is a mess from gameengine
	//var a = GD_Shipbody.getById[hauler.shipBody];
	a.shipStarSpeedLevel = a.shipPlanetSpeedLevel = 0;
	55 == a.tech[GD_Technology.type] && (a.shipPlanetSpeedLevel = FormulaConfig.value(310, a[GD_Shipbody.level], Number(a.tech[GD_Technology.sizeStr])), a.shipStarSpeedLevel = FormulaConfig.value(311, a[GD_Shipbody.level], Number(a.tech[GD_Technology.sizeStr])));
	a.sw1 = {};
	a.sw1.flag = true // use orbit accelerator when available
	
	beginMove = ShipMove_UI.prototype.beginMove;
	a.beginMove = ShipMove_UI.prototype.beginMove;
	a.beginMove_ = ShipMove_UI.prototype.beginMove_;
	a.beginMoveomplete = ShipMove_UI.prototype.beginMoveomplete;
	a.UI_close_ = ShipMove_UI.prototype.UI_close_;


	//find distance between planet or stars
	c = GD_Planet.getStarId(shipMoveCommand.planetId);
    d = GD_Planet.getStarId(shipMoveCommand.targetId);

	if (c == d) { // if in same star system 
    e = GetPlanetPoint(shipMoveCommand.planetId); // coord planet of start planet
    f = GetPlanetPoint(shipMoveCommand.targetId); // coord planet of finish planet
	var k = getDistance(e, f);
	a.level = planetTotalInfo[shipMoveCommand.planetId].info.accelerationLevel;
	a.level = Math.max(a.level, a.shipPlanetSpeedLevel);
	a.time = FormulaConfig.value(306, k, shipMoveCommand.shipData.ship_speed, a.level);
	} else { // if in not same star system
	a.level = 0;
	//a.level = planetTotalInfo[shipMoveCommand.planetId].info.interceptLevel
	g = GetStarPoint(c);
    h = GetStarPoint(d);
	k = getDistance(g, h);
	
	a.level = Math.max(a.level, a.shipStarSpeedLevel);

    shipMoveCommand.shipData.ship_speed = hauler.ship_speed
	a.time = FormulaConfig.value(307, k, shipMoveCommand.shipData.ship_speed, a.level);
	beginMove.call(a);
	}
	} else {console.log("Already at the planet")}
	
	
	//say game to move ship
	//var b = gameResponse.iCmd.shipMove // = 507 for game engine to send in net code
	//var c = new SpaceMsg.ShipMoveReq; // create message like game does
	//c.shipId = hauler.shipId; //ship id
	//c.desPlanet = MissionPlanetId; //target planet
	//c.isjiasu = false; //needs to be false
	//if (hauler.planet != c.desPlanet) { // check if already at the planet
	//Net.send(b, c) // send info to game server what ship to where go
	//} else {console.log("Already at the planet")}
}
