//////SPECIFIC TO THE FULL EXPERIMENT

document.write(
    unescape("%3Cscript src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js' type='text/javascript'%3E%3C/script%3E")
  );


// 5 main maps * 16 combinations of the conditions
const eachTimes = 5;        // 8 maps are categorized into 5 groups based on distances from rewards
const amountCondition = 16; // (2 pointers x 2 hammers x 2 walls x 2 rewards) = 16 combos
const amountTrials = amountCondition * eachTimes; // each map group does each combo (16 * 5)

// Conditions
var numbTokensFull = 1; // 1 or 2 selections
var numbAxesFull   = 1; // 1 or 2 hammers
var isWallFull     = 0; // can't (0) or can (1) see wall
var numRewards	   = 1; // 1 or 2 bananas
var map            = 1; // maps 1-8


// The 16 conditions
var combos = new Array(); 
for(var i = 0; i < amountCondition; i++){ 
	combos[i] = new Array();
    
    // push axes, tokens, wall, rewards
	if (numbAxesFull > 2) {numbAxesFull = 1;}
	if (numbTokensFull > 2) {numbTokensFull = 1;}
    
    if (i%4 == 0 && i!=0){
   		numRewards++;
    }
    if (numRewards > 2) {numRewards = 1;}
 
	if (i >= amountCondition/2){
   		isWallFull = 1;
    }

	combos[i].push(numbTokensFull, numbAxesFull, isWallFull, numRewards);

	if (((i/2) == 0) || i%2 == 0) {
		numbAxesFull++
	}

	else {
		numbTokensFull++
	}
}


// Trials
var trials = new Array(); 
var j = 0; // index for conditions

for(var i = 0; i < amountTrials; i++){ 
	trials[i] = new Array();

	// pick a random map for groups 1, 2, and 5
	g1 = getRandomInt(2); //randomly generates a 0 or 1 
	g2 = getRandomInt(2); // the maps for these 3 groups are similar distances from the rwds
	g5 = getRandomInt(2); 

	if (map>8){map = 1} // if reached map8, return to map1
	if (j>15){j = 0}    // loop through conditions (equal after 80 times)
	
	if (map==1){
		if (g1==0){ //g1 being 0 means group 1 should be map 1
		  trials[i].push(map); 
		  map++; //skip map2's turn
		}
		else{
		  map = 2; //if g1 == 1, group 1 = map 2
		  trials[i].push(map); 
		}
	}

	if (map==3){
		if (g2==0){ //g2 being 0 means group 2 should be map 3
		  trials[i].push(map); 
		  map++; //skip map4's turn
		}
		else{
		  map = 4; //if g2 == 1, group 2 = map 4
		  trials[i].push(map); 
		}
	}

	if (map==5 || map==6){ //let 5 and 6 through
		trials[i].push(map);
	}

	if (map==7){
		if (g5==0){ //g5 being 0 means group 5 should be map 7
		  trials[i].push(map); 
		  map++; //skip map8's turn
		}
		else{
		  map = 8; //if g5 == 1, group 5 = map 8
		  trials[i].push(map); 
		}
	}
	trials[i].push(combos[j]); // this way makes sure that each group is paired with each combo
	
	map++;
	j++;
}
shuffle(trials);



var ctx = document.getElementById("myGrid").getContext("2d"); //canvas
var counter = -1 // starts at -1 for each participant
var vers = 0; // declare so global
var start_time = 0; // for RT


/// Start animation
async function drawMovement() {

	// Remove  confidence rating question
	var windBox = document.getElementById("windowBox");
	windBox.style.display = "none";
	var resBox = document.getElementById("resultRate");
	resBox.style.display = "none";

	// Clear cond canvases
	ctxHammer.clearRect(0, 0, 300, 100); 
	ctxHand.clearRect(  0, 0, 300, 100); 
	ctxWall.clearRect(  0, 0, 300, 100); 

	// Put instructions line so map doesn't move
	document.getElementById("pleasePoint").innerHTML = "Your partner is entering the map. . .";
    document.getElementById("pleasePoint").style.color = "black";

	// Update global counter
	counter++
	if (counter > trials.length){
		return 
	}

	// Find map number on
	var mapNumber = trials[counter][0]; 



	// Assign version from now
	vers = getRandomInt(8); // randomly generates number from 0-7 for rotations (creates variety)


	// Set animation positions for each map: array of tiles will walk on (including mirrored versions)
	if (mapNumber == 1) {
		walkIn  = [[square_size*2, square_size*2], [square_size*2, square_size*3], [square_size*2, square_size*4]];
		walkInM = [[square_size*2, square_size*2], [square_size*2, square_size*3], [square_size*2, square_size*4]];
	}
	else if (mapNumber == 2) {
		walkIn  = [[square_size*4, square_size*4], [square_size*3, square_size*4], [square_size*2, square_size*4]];
		walkInM = [[square_size*0, square_size*4], [square_size*1, square_size*4], [square_size*2, square_size*4]];
	}
	else if (mapNumber == 3) {
		walkIn  = [[square_size*0, square_size*2], [square_size*0, square_size*1], [square_size*0, square_size*0]];
		walkInM = [[square_size*4, square_size*2], [square_size*4, square_size*1], [square_size*4, square_size*0]];
	}
	else if (mapNumber == 4) {
		walkIn  = [[square_size*4, square_size*4], [square_size*4, square_size*3], [square_size*4, square_size*2]];
		walkInM = [[square_size*0, square_size*4], [square_size*0, square_size*3], [square_size*0, square_size*2]];
	}
	else if (mapNumber == 5) {
		walkIn  = [[square_size*1, square_size*2], [square_size*1, square_size*3], [square_size*1, square_size*4]];
		walkInM = [[square_size*3, square_size*2], [square_size*3, square_size*3], [square_size*3, square_size*4]];
	}
	else if (mapNumber == 6) {
		walkIn  = [[square_size*3, square_size*3], [square_size*3, square_size*4], [square_size*4, square_size*4]];
		walkInM = [[square_size*1, square_size*3], [square_size*1, square_size*4], [square_size*0, square_size*4]];
	}
	else if (mapNumber == 7) {
		walkIn  = [[square_size*1, square_size*4], [square_size*2, square_size*4], [square_size*2, square_size*3]];
		walkInM = [[square_size*3, square_size*4], [square_size*2, square_size*4], [square_size*2, square_size*3]];
	}
	else if (mapNumber == 8) {
		walkIn  = [[square_size*3, square_size*4], [square_size*2, square_size*4], [square_size*2, square_size*3]];
		walkInM = [[square_size*1, square_size*4], [square_size*2, square_size*4], [square_size*2, square_size*3]];
	}

	// Adjust per rotations
	var temp  = walkIn;
	var tempM = walkInM;
	if (vers == 1){ // vers == 0: 0G
		// 90G
		walkIn = [rotateMap(temp[0][0], temp[0][1], 90), rotateMap(temp[1][0], temp[1][1], 90), rotateMap(temp[2][0], temp[2][1], 90)];
	}
	else if (vers == 2){
		// 180G
		walkIn = [rotateMap(temp[0][0], temp[0][1], 180), rotateMap(temp[1][0], temp[1][1], 180), rotateMap(temp[2][0], temp[2][1], 180)];
	}
	else if (vers == 3){ 
		// 270G
		walkIn = [rotateMap(temp[0][0], temp[0][1], 270), rotateMap(temp[1][0], temp[1][1], 270), rotateMap(temp[2][0], temp[2][1], 270)];
	}
	else if (vers == 4){
		// 0F
		walkIn = walkInM;
	}
	else if (vers == 5){ 
		// 90F
		walkIn = [rotateMap(tempM[0][0], tempM[0][1], 90), rotateMap(tempM[1][0], tempM[1][1], 90), rotateMap(tempM[2][0], tempM[2][1], 90)];
	}
	else if (vers == 6){
		// 180F
		walkIn = [rotateMap(tempM[0][0], tempM[0][1], 180), rotateMap(tempM[1][0], tempM[1][1], 180), rotateMap(tempM[2][0], tempM[2][1], 180)];
	}
	else if (vers == 7){
		// 270F
		walkIn = [rotateMap(tempM[0][0], tempM[0][1], 270), rotateMap(tempM[1][0], tempM[1][1], 270), rotateMap(tempM[2][0], tempM[2][1], 270)];
	}

	
	// Create animation
	var space     = 3; // number of spaces will walk
	var countWalk = 0; // counter for tile positions array
	while (space>0){
		// Redraw canvas, draw Player, delay, redo
		rawCanvas(ctx);
		ctx.drawImage(playerMove, walkIn[countWalk][0]+30, walkIn[countWalk][1]+20, player_size-20, player_size);
		await sleep(500);
		space -= 1;
		countWalk++;
	}

	// Once finished walking amount of spaces, show boxes and watch for clicks
	generateMap();
}



// Each time clicks next, generates different map
function generateMap(){

	/// Setup for each trial:

	// Bring buttons back
	document.getElementById("resetBox").hidden = false;
	document.getElementById("confirm").hidden  = false;

	// Reset instructions 
    document.getElementById("pleasePoint").innerHTML = "Click on the box(es) that you wish to highlight for your partner.";
    document.getElementById("pleasePoint").style.color = "black";

	// Reset counters need for each trial (for purplePoint)
    clickIndex = 0; 
    confirmIndex  = 0;
	zeroIndex = 0;

	// Find conditions
	var mapNumber         = trials[counter][0]; // a number from 1-8
	var tokenNumberFull   = trials[counter][1][0]; // either 1 or 2
	var axNumberFull      = trials[counter][1][1]; // either 1 or 2
	var ifWallFull        = trials[counter][1][2]; // either 0 or 1
	var rewardNumber      = trials[counter][1][3]; // either 1 or 2

	// Make item placements based on how many rewards there are
	if (rewardNumber == 1){ // one banana
		var itemsConfigFull =  [1, 2, 2]; // BSS (player will move around rather than boxes)
	}
	else { // two bananas
		var itemsConfigFull =  [1, 1, 2]; // BBS
	}

	// Add to dataset
	document.getElementById("trial_num").value = counter+1;
	document.getElementById("map_num").value = mapNumber;
	document.getElementById("rewards").value = rewardNumber;
	document.getElementById("tokens").value  = tokenNumberFull;
	document.getElementById("hammers").value = axNumberFull;
	document.getElementById("walls").value   = ifWallFull;

	
	// Fill in cond canvas based on if there is a wall or not
	if (ifWallFull == 1){
		drawQuestion(ctxWall, 0, 0)
		drawQuestion(ctxWall, square_size, 0)
		drawQuestion(ctxWall, square_size*2, 0)
	}

	// items 1st row: number of pointings
	drawToken(ctxHand, 0, 0)
	if (tokenNumberFull == 2) {
		drawToken(ctxHand, square_size, 0)
	}

	// items 2nd row: partner's hammers
	drawHammer(ctxHammer, 0, 0)
	if (axNumberFull == 2){
		drawHammer(ctxHammer, square_size, 0)
	}


	//// Design maps:
	
	/// Maps 1/3/5 (same layout except for Player's position)
	if (mapNumber == 1 || mapNumber == 3 || mapNumber == 5) {

		// Box locations: originally
		p1_x0 = 0;
		p1_y0 = square_size * 4;
		p2_x0 = square_size * 2;
		p2_y0 = 0;
		p3_x0 = square_size * 3;
		p3_y0 = square_size * 4;

		// Box locations: flipped
		f1_x0 = square_size * 4;
		f1_y0 = square_size * 4;
		f2_x0 = square_size * 1;
		f2_y0 = square_size * 4;
		f3_x0 = square_size * 2;
		f3_y0 = 0;

		// Player's locations (differs per map)
		if (mapNumber == 1){
			g_x0 = square_size * 2;
			g_y0 = square_size * 4;

			f_x0 = square_size * 2;
			f_y0 = square_size * 4;			
		}
		else if (mapNumber == 3){
			g_x0 = 0;
			g_y0 = 0;

			f_x0 = square_size * 4;
			f_y0 = 0;
		}
		else{
			g_x0 = square_size;
			g_y0 = square_size * 4;

			f_x0 = square_size * 3;
			f_y0 = square_size * 4;
		}	
	}

	/// Maps 2/4/6 have same layout except for Player's position
	else if (mapNumber == 2 || mapNumber == 4 || mapNumber == 6) {

		// Box locations: originally
		p1_x0 = square_size * 0;
		p1_y0 = square_size * 4;
		p2_x0 = 0;
		p2_y0 = square_size * 3;
		p3_x0 = square_size * 4;
		p3_y0 = 0;

		// Box locations: flipped
		f1_x0 = square_size * 4;
		f1_y0 = square_size * 4;
		f2_x0 = square_size * 4;
		f2_y0 = square_size * 3;
		f3_x0 = square_size * 0;
		f3_y0 = 0;

		// Player's locations (differs per map)
		if (mapNumber == 2){
			g_x0 = square_size * 2;
			g_y0 = square_size * 4;

			f_x0 = square_size * 2;
			f_y0 = square_size * 4;			
		}
		else if (mapNumber == 4){
			g_x0 = square_size * 4;
			g_y0 = square_size * 2;

			f_x0 = square_size * 0;
			f_y0 = square_size * 2;
		}
		else{
			g_x0 = square_size * 4;
			g_y0 = square_size * 4;

			f_x0 = square_size * 0;
			f_y0 = square_size * 4;
		}	
	}

	/// Map 7
	else if (mapNumber == 7) {
		// Box locations: originally
		p1_x0 = square_size * 1;
		p1_y0 = square_size * 2;
		p2_x0 = square_size * 2;
		p2_y0 = square_size * 1;
		p3_x0 = square_size * 3;
		p3_y0 = square_size * 2;

		// Box locations: flipped (symmetrical)
		f1_x0 = p1_x0;
		f1_y0 = p1_y0;
		f2_x0 = p2_x0;
		f2_y0 = p2_y0;
		f3_x0 = p3_x0;
		f3_y0 = p3_y0;

		// Player's location
		g_x0 = square_size * 2;
		g_y0 = square_size * 3;

		// Player's flipped (same)
		f_x0 = g_x0;
		f_y0 = g_y0;
	}

	/// Map 8
	else if (mapNumber == 8) {
		// Box locations: originally
		p1_x0 = square_size * 0;
		p1_y0 = square_size * 2;
		p2_x0 = square_size * 2;
		p2_y0 = square_size * 0;
		p3_x0 = square_size * 4;
		p3_y0 = square_size * 2;

		// Box locations: flipped (symmetrical)
		f1_x0 = p1_x0;
		f1_y0 = p1_y0;
		f2_x0 = p2_x0;
		f2_y0 = p2_y0;
		f3_x0 = p3_x0;
		f3_y0 = p3_y0;

		// Player's location
		g_x0 = square_size * 2;
		g_y0 = square_size * 3;

		// Player's flipped (same)
		f_x0 = g_x0;
		f_y0 = g_y0;
	}


	/// Settle alterations 
	// Original map, original rotation
	if (vers == 0){
		// Just label and move on
		document.getElementById("version").value = "0G";	
	}

	// Original map, 90 degree clockwise rotation
	else if (vers == 1){
		// Label correctly
		document.getElementById("version").value = "90G";

		// Box locations
		boxLoc1 = rotateMap(p1_x0, p1_y0, 90)
		p1_x0 = boxLoc1[0];
		p1_y0 = boxLoc1[1];

		boxLoc2 = rotateMap(p2_x0, p2_y0, 90)
		p2_x0 = boxLoc2[0];
		p2_y0 = boxLoc2[1];

		boxLoc3 = rotateMap(p3_x0, p3_y0, 90)
		p3_x0 = boxLoc3[0];
		p3_y0 = boxLoc3[1];

		playerLoc = rotateMap(g_x0, g_y0, 90)
		g_x0 = playerLoc[0];
		g_y0 = playerLoc[1];
	}

	// Original map, 180 degree clockwise rotation
	else if (vers == 2){
		// Label correctly
		document.getElementById("version").value = "180G";

		// Box locations
		boxLoc1 = rotateMap(p1_x0, p1_y0, 180)
		p1_x0 = boxLoc1[0];
		p1_y0 = boxLoc1[1];

		boxLoc2 = rotateMap(p2_x0, p2_y0, 180)
		p2_x0 = boxLoc2[0];
		p2_y0 = boxLoc2[1];

		boxLoc3 = rotateMap(p3_x0, p3_y0, 180)
		p3_x0 = boxLoc3[0];
		p3_y0 = boxLoc3[1];

		playerLoc = rotateMap(g_x0, g_y0, 180)
		g_x0 = playerLoc[0];
		g_y0 = playerLoc[1];
	}

	// Original map, 270 degree clockwise rotation
	else if (vers == 3){
		// Label correctly
		document.getElementById("version").value = "270G";

		// Box locations
		boxLoc1 = rotateMap(p1_x0, p1_y0, 270)
		p1_x0 = boxLoc1[0];
		p1_y0 = boxLoc1[1];

		boxLoc2 = rotateMap(p2_x0, p2_y0, 270)
		p2_x0 = boxLoc2[0];
		p2_y0 = boxLoc2[1];

		boxLoc3 = rotateMap(p3_x0, p3_y0, 270)
		p3_x0 = boxLoc3[0];
		p3_y0 = boxLoc3[1];

		playerLoc = rotateMap(g_x0, g_y0, 270)
		g_x0 = playerLoc[0];
		g_y0 = playerLoc[1];
	}

	// Flipped map, original rotation
	else if (vers == 4){
		// Label correctly
		document.getElementById("version").value = "0F";

		// Locations already set, just switch it
		p1_x0 = f1_x0;
		p1_y0 = f1_y0;
		p2_x0 = f2_x0;
		p2_y0 = f2_y0;
		p3_x0 = f3_x0;
		p3_y0 = f3_y0;
		g_x0  = f_x0;
		g_y0  = f_y0;
	}

	// Flipped map, 90 degree clockwise rotation
	else if (vers == 5){
		// Label correctly
		document.getElementById("version").value = "90F";

		// Box locations
		boxLoc1 = rotateMap(f1_x0, f1_y0, 90)
		p1_x0 = boxLoc1[0];
		p1_y0 = boxLoc1[1];

		boxLoc2 = rotateMap(f2_x0, f2_y0, 90)
		p2_x0 = boxLoc2[0];
		p2_y0 = boxLoc2[1];

		boxLoc3 = rotateMap(f3_x0, f3_y0, 90)
		p3_x0 = boxLoc3[0];
		p3_y0 = boxLoc3[1];

		playerLoc = rotateMap(f_x0, f_y0, 90)
		g_x0 = playerLoc[0];
		g_y0 = playerLoc[1];
	}

	// Flipped map, 180 degree clockwise rotation
	else if (vers == 6){
		// Label correctly
		document.getElementById("version").value = "180F";

		// Box locations
		boxLoc1 = rotateMap(f1_x0, f1_y0, 180)
		p1_x0 = boxLoc1[0];
		p1_y0 = boxLoc1[1];

		boxLoc2 = rotateMap(f2_x0, f2_y0, 180)
		p2_x0 = boxLoc2[0];
		p2_y0 = boxLoc2[1];

		boxLoc3 = rotateMap(f3_x0, f3_y0, 180)
		p3_x0 = boxLoc3[0];
		p3_y0 = boxLoc3[1];

		playerLoc = rotateMap(f_x0, f_y0, 180)
		g_x0 = playerLoc[0];
		g_y0 = playerLoc[1];
	}

	// Flipped map, 270 degree clockwise rotation
	else if (vers == 7){
		// Label correctly
		document.getElementById("version").value = "270F";

		// Box locations
		boxLoc1 = rotateMap(f1_x0, f1_y0, 270)
		p1_x0 = boxLoc1[0];
		p1_y0 = boxLoc1[1];

		boxLoc2 = rotateMap(f2_x0, f2_y0, 270)
		p2_x0 = boxLoc2[0];
		p2_y0 = boxLoc2[1];

		boxLoc3 = rotateMap(f3_x0, f3_y0, 270)
		p3_x0 = boxLoc3[0];
		p3_y0 = boxLoc3[1];

		playerLoc = rotateMap(f_x0, f_y0, 270)
		g_x0 = playerLoc[0];
		g_y0 = playerLoc[1];
	}

	

	///// Make the grid drawing 

	// Apples & Bees images (randomized p's config equally before)
	itemAt_p1 = itemsConfigFull[0];
	itemAt_p2 = itemsConfigFull[1];
	itemAt_p3 = itemsConfigFull[2];

	// whether p1 is apple or bee, draw accordingly 
	if (itemAt_p1 == 1) {
		drawApple(ctx, p1_x0, p1_y0, square_size);
		// if there is no wall, display the amounts of rewards
		if (ifWallFull== 0){
			drawApple(ctxWall, 0, 0, 1);
		}
	}
	else if (itemAt_p1 == 2) {
		drawGhost(ctx, p1_x0, p1_y0, square_size);
		if (ifWallFull== 0){
			drawGhost(ctxWall, 0, 0, 1);
		}
	}

	// p2
	if (itemAt_p2 == 1) {
		drawApple(ctx, p2_x0, p2_y0, square_size);
		if (ifWallFull== 0){
			drawApple(ctxWall, square_size, 0, 1);
		}
	}
	else if (itemAt_p2 == 2) {
		drawGhost(ctx, p2_x0, p2_y0, square_size);
		if (ifWallFull== 0){
			drawGhost(ctxWall, square_size, 0, 1);
		}
	}

	// p3
	if (itemAt_p3 == 1) {
		drawApple(ctx, p3_x0, p3_y0, square_size);
		if (ifWallFull== 0){
			drawApple(ctxWall, square_size*2, 0, 1);
		}
	}
	else if (itemAt_p3 == 2) {
		drawGhost(ctx, p3_x0, p3_y0, square_size);
		if (ifWallFull== 0){
			drawGhost(ctxWall, square_size*2, 0, 1);
		}
	}

	// hammer, pointer, wall containers
	drawItemsGrid(ctxHammer);
	drawItemsGrid(ctxHand);
	drawItemsGrid(ctxWall);
	
	// Player's role:
	pointPurple(p1_x0, p1_y0, p2_x0, p2_y0, p3_x0, p3_y0);
}



var onlyOnePurple = new Array ();

function pointPurple(p1_x0, p1_y0, p2_x0, p2_y0, p3_x0, p3_y0){

	// Message to point
	document.getElementById("pleasePoint").hidden = false;

	// access which purple tile clicked
	var elem = document.getElementById("myGrid");
	pWidth = 600 / 5; // (canvas width / square); bc canvas fitted to screen 
	conv_factor = pWidth / square_size; // multiply by everything to adjust 

	elemLeft = elem.offsetLeft, //know locations of canvas
    elemTop = elem.offsetTop, 
    elements = []; // consider all purple tile locations as elements 


	// find tile locations given where canvas was drawn
	ip1_x0 = p1_x0 * conv_factor;
	ip1_y0 = p1_y0 * conv_factor;
	ip2_x0 = p2_x0 * conv_factor;
	ip2_y0 = p2_y0 * conv_factor;
	ip3_x0 = p3_x0 * conv_factor;
	ip3_y0 = p3_y0 * conv_factor;


	// put the p's of this round in an array 
	elements.push({
		name: "p1",
		width: pWidth,
		height: pWidth,
		top: ip1_y0,
		left: ip1_x0
	});

	elements.push({
		name: "p2",
		width: pWidth,
		height: pWidth,
		top: ip2_y0,
		left: ip2_x0
	});

	elements.push({
		name: "p3",
		width: pWidth,
		height: pWidth,
		top: ip3_y0,
		left: ip3_x0
	});

	// Monitor when click on a purple box 
	elem.addEventListener('click', handler); 

	// RT from after display boxes
	start_time = Date.now();
}




// To track double clicks
var clickArray = new Array(); 
var clickIndex = 0; // check if clicked the same item as the prev index 
var doubleArray = new Array();

// Function for when click on an item
var handler = function(event) {

	var tokenNumberFull   = trials[counter][1][0]; // either 1 or 2

	// Record both selections if have 2 tokens
	if (tokenNumberFull == 2){
		if (typeof doubleArray[counter] == 'undefined'){
			doubleArray[counter] = new Array();
		}
	}

	// Need to know to what the token is being placed on
	var rewardNumber      = trials[counter][1][3]; // either 1 or 2
	if (rewardNumber == 1){ // one banana
		var itemsConfigFull =  [1, 2, 2]; // BSS
	}
	else { // two bananas
		var itemsConfigFull =  [1, 1, 2]; // BBS
	}
	itemAt_p1 = itemsConfigFull[0];
	itemAt_p2 = itemsConfigFull[1];
	itemAt_p3 = itemsConfigFull[2];

	// x and y are the coordinates of where the mouse clicked; given page and canvas
	var x = event.pageX - elemLeft,
		y = event.pageY - elemTop;

	
	// Go through each purple tile's location 
	elements.forEach(function(element) {
			if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {

				 // Update counter for confirm button 
				 confirmIndex++;
				 zeroIndex++;

				 // Instruct to press confirm
				 document.getElementById("pleasePoint").innerHTML = "Click <b>Confirm Selection</b> to confirm your choice.";
				 document.getElementById("pleasePoint").style.color = "#911879";
 
				 
				 // First click:
				 if (clickIndex == 0){
					 // First click, place a token on what they chose
					 if (element.name == "p1"){
						// To do so, redraw the box, but with the token on top (send function item = 2)
                        if (itemAt_p1 == 1) {
							drawApple(ctx, p1_x0, p1_y0, 2);
						}
						else if (itemAt_p1 == 2) {
							drawGhost(ctx, p1_x0, p1_y0, 2);
						}
                    }

                    else if (element.name == "p2"){
                        if (itemAt_p2 == 1) {
							drawApple(ctx, p2_x0, p2_y0, 2);
						}
						else if (itemAt_p2 == 2) {
							drawGhost(ctx, p2_x0, p2_y0, 2);
						}
                    }

                    else if (element.name == "p3"){
                       if (itemAt_p3 == 1) {
							drawApple(ctx, p3_x0, p3_y0, 2);
						}
						else if (itemAt_p3 == 2) {
							drawGhost(ctx, p3_x0, p3_y0, 2);
						}
                    }
				 }
				 
				 // Process double click  (NOT USING ANYMORE?)
				 clickArray[clickIndex] = element.name // save what picked this time 
 
				 // After first click:
				 if (tokenNumberFull == 1){
					// Since can only choose one in this cond, erase what they previously clicked 
					resetMap();
					confirmIndex++;
					zeroIndex++;

					// Place token on what clicked now
                     if (element.name == "p1"){
                        if (itemAt_p1 == 1) {
							drawApple(ctx, p1_x0, p1_y0, 2);
						}
						else if (itemAt_p1 == 2) {
							drawGhost(ctx, p1_x0, p1_y0, 2);
						}
                    }

                    else if (element.name == "p2"){
                        if (itemAt_p2 == 1) {
							drawApple(ctx, p2_x0, p2_y0, 2);
						}
						else if (itemAt_p2 == 2) {
							drawGhost(ctx, p2_x0, p2_y0, 2);
						}
                    }

                    else if (element.name == "p3"){
                        if (itemAt_p3 == 1) {
							drawApple(ctx, p3_x0, p3_y0, 2);
						}
						else if (itemAt_p3 == 2) {
							drawGhost(ctx, p3_x0, p3_y0, 2);
						}
                    }

					// Record what selected
					recordSelections(element.name);
				}
				

				// If have 2 tokens:
				else{
					if (clickIndex < 2) {
						// Can click up to, but no more than, 2
						if (element.name == "p1"){
							if (itemAt_p1 == 1) {
								drawApple(ctx, p1_x0, p1_y0, 2);
							}
							else if (itemAt_p1 == 2) {
								drawGhost(ctx, p1_x0, p1_y0, 2);
							}
						}

						else if (element.name == "p2"){
							if (itemAt_p2 == 1) {
								drawApple(ctx, p2_x0, p2_y0, 2);
							}
							else if (itemAt_p2 == 2) {
								drawGhost(ctx, p2_x0, p2_y0, 2);
							}
						}

						else if (element.name == "p3"){
							if (itemAt_p3 == 1) {
								drawApple(ctx, p3_x0, p3_y0, 2);
							}
							else if (itemAt_p3 == 2) {
								drawGhost(ctx, p3_x0, p3_y0, 2);
							}
						}

						// Record both selections
						doubleArray[counter].push(element.name);
						recordSelections(doubleArray[counter]);
					}

					else {
						// Instruct to press reset
						document.getElementById("pleasePoint").innerHTML = "You have already selected 2 boxes. Click <b>Clear Selections</b> if you would like to make any changes. Otherwise, click <b>Confirm Selection</b>.";
						document.getElementById("pleasePoint").style.color = "#911879";
					}

				}

				 clickIndex++ //finished first click 
			 }
	 });
 
 }; 


function confirm(){
	var elem = document.getElementById("myGrid");

	 // Didn't select anything the first time
	 if (confirmIndex == 0){
        // Instruct to double click 
        document.getElementById("pleasePoint").innerHTML = "You are choosing to not select any items. Click the button again to confirm your choice.";
        document.getElementById("pleasePoint").style.color = "#911879";
        confirmIndex++;
    }

    else {
		// Store reaction time up to when pressed confirm
		react_time = Date.now()-start_time;
		document.getElementById("rt").value = react_time;

		// If still didn't select anything
		if (zeroIndex == 0) {
			// Record the data 
			recordSelections("zero");
		}

		// Hide buttons
		document.getElementById("confirm").hidden = true;
		document.getElementById("resetBox").hidden = true;

		// If chose not to click any items, don't let them click any 
		elem.removeEventListener('click', handler);

         // Move on to confidence rating
        checkConfidence();
    }
}


function checkConfidence(){

	// Ask for confidence rating: display window with radio buttons
	var windBox = document.getElementById("windowBox");
	windBox.style.display = "block";
	var resBox = document.getElementById("resultRate");
	resBox.style.display = "block";

	// Add confirm button to it.
	document.getElementById("Confirm").hidden = false;

}


function postConfirm(){
	
	// Listen to Confirm button
	var confSelected = document.getElementsByName("ConfidenceScale");
	let selectedRating;
	var allRatings = new Array();
	var wasFilled = 0; // to not allow confirm without pressing

	// cycle through the radio buttons
	for(var i = 0; i < confSelected.length; i++) {
		if(confSelected[i].checked) {

			selectedRating = confSelected[i].value; // value of the button that was checked 
			allRatings[counter] = selectedRating;  // store (useless now)

			// Save in database
			document.getElementById("conf_rating").value = selectedRating;

			// Push everything to database
			$("#data_container").submit()

			wasFilled = 1; // allowed to continue now

			// After recording selection, reset the form  
			confSelected[i].checked = false;
		}
	}

	// Make sure clicked Confirm AFTER selected something 
	if (wasFilled == 0){
		alert("Please choose a rating first!")
	}
	else{
		
		// If on last trial, 
		if (counter == trials.length-1) {
			// get rid of everything currently being displayed
			var windBox = document.getElementById("windowBox");
			windBox.style.display = "none";
			var expPage = document.getElementById("formalPage");
			expPage.style.display = "none";


			// go to next instructions page
			instr.next();
		}

		// Else if halfway through, 
		else if (counter == (Math.round(trials.length/2))){
			
			// get rid of everything currently being displayed
			var windBox = document.getElementById("windowBox");
			windBox.style.display = "none";
			var expPage = document.getElementById("formalPage");
			expPage.style.display = "none";

			// Show attention check 
			var attentionPage = document.getElementById("attentionCheck");
			attentionPage.style.display = "block";

		}

		// Otherwise, generate next map
		else {
			// generateMap();
			drawMovement();
		}
	}

}


// which p did they select, or "zero" if didn't (make sure to record other data too)
// var selectData = new Array(); 
function recordSelections(p){ 
	// selectData.push(p); //***stopped using*/
	document.getElementById("point_to").value = p;
}


// Restore canvas to previous state 
function resetMap(){

	confirmIndex = 0;
	clickIndex = 0;
	zeroIndex = 0;

    var mapNumber         = trials[counter][0]; // a number from 1-8
	var tokenNumberFull   = trials[counter][1][0]; // either 1 or 2
	var rewardNumber      = trials[counter][1][3]; // either 1 or 2

	// Make item placements based on how many rewards there are
	if (rewardNumber == 1){ // one banana
		var itemsConfigFull =  [1, 2, 2]; // BSS (player will move around rather than boxes)
	}
	else { // two bananas
		var itemsConfigFull =  [1, 1, 2]; // BBS
	}
	

	// reset selections for 2 token condition
	if (tokenNumberFull == 2){
		doubleArray[counter] = []; 
	}
	

	// Clear and repaint canvas each time gen map: always light blue
	ctx.clearRect(0, 0, w, w); 
	ctx.fillStyle = "#dde7f0";
	ctx.fillRect(0, 0, w, w);	
	

	/// Maps 1/3/5 (same layout except for Player's position)
	if (mapNumber == 1 || mapNumber == 3 || mapNumber == 5) {

		// Box locations: originally
		p1_x0 = 0;
		p1_y0 = square_size * 4;
		p2_x0 = square_size * 2;
		p2_y0 = 0;
		p3_x0 = square_size * 3;
		p3_y0 = square_size * 4;

		// Box locations: flipped
		f1_x0 = square_size * 4;
		f1_y0 = square_size * 4;
		f2_x0 = square_size * 1;
		f2_y0 = square_size * 4;
		f3_x0 = square_size * 2;
		f3_y0 = 0;

		// Player's locations (differs per map)
		if (mapNumber == 1){
			g_x0 = square_size * 2;
			g_y0 = square_size * 4;

			f_x0 = square_size * 2;
			f_y0 = square_size * 4;			
		}
		else if (mapNumber == 3){
			g_x0 = 0;
			g_y0 = 0;

			f_x0 = square_size * 4;
			f_y0 = 0;
		}
		else{
			g_x0 = square_size;
			g_y0 = square_size * 4;

			f_x0 = square_size * 3;
			f_y0 = square_size * 4;
		}	
	}

	/// Maps 2/4/6 have same layout except for Player's position
	else if (mapNumber == 2 || mapNumber == 4 || mapNumber == 6) {

		// Box locations: originally
		p1_x0 = square_size * 0;
		p1_y0 = square_size * 4;
		p2_x0 = 0;
		p2_y0 = square_size * 3;
		p3_x0 = square_size * 4;
		p3_y0 = 0;

		// Box locations: flipped
		f1_x0 = square_size * 4;
		f1_y0 = square_size * 4;
		f2_x0 = square_size * 4;
		f2_y0 = square_size * 3;
		f3_x0 = square_size * 0;
		f3_y0 = 0;

		// Player's locations (differs per map)
		if (mapNumber == 2){
			g_x0 = square_size * 2;
			g_y0 = square_size * 4;

			f_x0 = square_size * 2;
			f_y0 = square_size * 4;			
		}
		else if (mapNumber == 4){
			g_x0 = square_size * 4;
			g_y0 = square_size * 2;

			f_x0 = square_size * 0;
			f_y0 = square_size * 2;
		}
		else{
			g_x0 = square_size * 4;
			g_y0 = square_size * 4;

			f_x0 = square_size * 0;
			f_y0 = square_size * 4;
		}	
	}

	/// Map 7
	else if (mapNumber == 7) {
		// Box locations: originally
		p1_x0 = square_size * 1;
		p1_y0 = square_size * 2;
		p2_x0 = square_size * 2;
		p2_y0 = square_size * 1;
		p3_x0 = square_size * 3;
		p3_y0 = square_size * 2;

		// Box locations: flipped (symmetrical)
		f1_x0 = p1_x0;
		f1_y0 = p1_y0;
		f2_x0 = p2_x0;
		f2_y0 = p2_y0;
		f3_x0 = p3_x0;
		f3_y0 = p3_y0;

		// Player's location
		g_x0 = square_size * 2;
		g_y0 = square_size * 3;

		// Player's flipped (same)
		f_x0 = g_x0;
		f_y0 = g_y0;
	}

	/// Map 8
	else if (mapNumber == 8) {
		// Box locations: originally
		p1_x0 = square_size * 0;
		p1_y0 = square_size * 2;
		p2_x0 = square_size * 2;
		p2_y0 = square_size * 0;
		p3_x0 = square_size * 4;
		p3_y0 = square_size * 2;

		// Box locations: flipped (symmetrical)
		f1_x0 = p1_x0;
		f1_y0 = p1_y0;
		f2_x0 = p2_x0;
		f2_y0 = p2_y0;
		f3_x0 = p3_x0;
		f3_y0 = p3_y0;

		// Player's location
		g_x0 = square_size * 2;
		g_y0 = square_size * 3;

		// Player's flipped (same)
		f_x0 = g_x0;
		f_y0 = g_y0;
	}


	/// Settle alterations 
	// Original map, original rotation
	if (vers == 0){
		// Just label and move on
		document.getElementById("version").value = "0G";	
	}

	// Original map, 90 degree clockwise rotation
	else if (vers == 1){
		// Label correctly
		document.getElementById("version").value = "90G";

		// Box locations
		boxLoc1 = rotateMap(p1_x0, p1_y0, 90)
		p1_x0 = boxLoc1[0];
		p1_y0 = boxLoc1[1];

		boxLoc2 = rotateMap(p2_x0, p2_y0, 90)
		p2_x0 = boxLoc2[0];
		p2_y0 = boxLoc2[1];

		boxLoc3 = rotateMap(p3_x0, p3_y0, 90)
		p3_x0 = boxLoc3[0];
		p3_y0 = boxLoc3[1];

		playerLoc = rotateMap(g_x0, g_y0, 90)
		g_x0 = playerLoc[0];
		g_y0 = playerLoc[1];
	}

	// Original map, 180 degree clockwise rotation
	else if (vers == 2){
		// Label correctly
		document.getElementById("version").value = "180G";

		// Box locations
		boxLoc1 = rotateMap(p1_x0, p1_y0, 180)
		p1_x0 = boxLoc1[0];
		p1_y0 = boxLoc1[1];

		boxLoc2 = rotateMap(p2_x0, p2_y0, 180)
		p2_x0 = boxLoc2[0];
		p2_y0 = boxLoc2[1];

		boxLoc3 = rotateMap(p3_x0, p3_y0, 180)
		p3_x0 = boxLoc3[0];
		p3_y0 = boxLoc3[1];

		playerLoc = rotateMap(g_x0, g_y0, 180)
		g_x0 = playerLoc[0];
		g_y0 = playerLoc[1];
	}

	// Original map, 270 degree clockwise rotation
	else if (vers == 3){
		// Label correctly
		document.getElementById("version").value = "270G";

		// Box locations
		boxLoc1 = rotateMap(p1_x0, p1_y0, 270)
		p1_x0 = boxLoc1[0];
		p1_y0 = boxLoc1[1];

		boxLoc2 = rotateMap(p2_x0, p2_y0, 270)
		p2_x0 = boxLoc2[0];
		p2_y0 = boxLoc2[1];

		boxLoc3 = rotateMap(p3_x0, p3_y0, 270)
		p3_x0 = boxLoc3[0];
		p3_y0 = boxLoc3[1];

		playerLoc = rotateMap(g_x0, g_y0, 270)
		g_x0 = playerLoc[0];
		g_y0 = playerLoc[1];
	}

	// Flipped map, original rotation
	else if (vers == 4){
		// Label correctly
		document.getElementById("version").value = "0F";

		// Locations already set, just switch it
		p1_x0 = f1_x0;
		p1_y0 = f1_y0;
		p2_x0 = f2_x0;
		p2_y0 = f2_y0;
		p3_x0 = f3_x0;
		p3_y0 = f3_y0;
		g_x0  = f_x0;
		g_y0  = f_y0;
	}

	// Flipped map, 90 degree clockwise rotation
	else if (vers == 5){
		// Label correctly
		document.getElementById("version").value = "90F";

		// Box locations
		boxLoc1 = rotateMap(f1_x0, f1_y0, 90)
		p1_x0 = boxLoc1[0];
		p1_y0 = boxLoc1[1];

		boxLoc2 = rotateMap(f2_x0, f2_y0, 90)
		p2_x0 = boxLoc2[0];
		p2_y0 = boxLoc2[1];

		boxLoc3 = rotateMap(f3_x0, f3_y0, 90)
		p3_x0 = boxLoc3[0];
		p3_y0 = boxLoc3[1];

		playerLoc = rotateMap(f_x0, f_y0, 90)
		g_x0 = playerLoc[0];
		g_y0 = playerLoc[1];
	}

	// Flipped map, 180 degree clockwise rotation
	else if (vers == 6){
		// Label correctly
		document.getElementById("version").value = "180F";

		// Box locations
		boxLoc1 = rotateMap(f1_x0, f1_y0, 180)
		p1_x0 = boxLoc1[0];
		p1_y0 = boxLoc1[1];

		boxLoc2 = rotateMap(f2_x0, f2_y0, 180)
		p2_x0 = boxLoc2[0];
		p2_y0 = boxLoc2[1];

		boxLoc3 = rotateMap(f3_x0, f3_y0, 180)
		p3_x0 = boxLoc3[0];
		p3_y0 = boxLoc3[1];

		playerLoc = rotateMap(f_x0, f_y0, 180)
		g_x0 = playerLoc[0];
		g_y0 = playerLoc[1];
	}

	// Flipped map, 270 degree clockwise rotation
	else if (vers == 7){
		// Label correctly
		document.getElementById("version").value = "270F";

		// Box locations
		boxLoc1 = rotateMap(f1_x0, f1_y0, 270)
		p1_x0 = boxLoc1[0];
		p1_y0 = boxLoc1[1];

		boxLoc2 = rotateMap(f2_x0, f2_y0, 270)
		p2_x0 = boxLoc2[0];
		p2_y0 = boxLoc2[1];

		boxLoc3 = rotateMap(f3_x0, f3_y0, 270)
		p3_x0 = boxLoc3[0];
		p3_y0 = boxLoc3[1];

		playerLoc = rotateMap(f_x0, f_y0, 270)
		g_x0 = playerLoc[0];
		g_y0 = playerLoc[1];
	}



	///// Make the grid drawing 

	// Apples & Bees images (randomized p's config equally before)
	itemAt_p1 = itemsConfigFull[0];
	itemAt_p2 = itemsConfigFull[1];
	itemAt_p3 = itemsConfigFull[2];

	// whether p1 is apple or bee, draw accordingly 
	if (itemAt_p1 == 1) {
		drawApple(ctx, p1_x0, p1_y0, square_size);
	}
	else if (itemAt_p1 == 2) {
		drawGhost(ctx, p1_x0, p1_y0, square_size);
	}

	// p2
	if (itemAt_p2 == 1) {
		drawApple(ctx, p2_x0, p2_y0, square_size);
	}
	else if (itemAt_p2 == 2) {
		drawGhost(ctx, p2_x0, p2_y0, square_size);
	}

	// p3
	if (itemAt_p3 == 1) {
		drawApple(ctx, p3_x0, p3_y0, square_size);
	}
	else if (itemAt_p3 == 2) {
		drawGhost(ctx, p3_x0, p3_y0, square_size);
	}

	// Player starts
	drawPlayer(ctx, g_x0, g_y0, square_size);
	

	// Grid lines (code put after tiles so will be overlayed)
	ctx.beginPath() 
	for (let i=0; i<=w; i=i+square_size){
		//horizontal lines
		ctx.moveTo(0,i);
		ctx.lineTo(w,i);

		//vertical lines
		ctx.moveTo(i,0);
		ctx.lineTo(i,w);
	}
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#000000";
	ctx.stroke();
	ctx.closePath();
}
