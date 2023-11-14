//////SPECIFIC TO THE PRACTICE ROUNDS

document.write(
    unescape("%3Cscript src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js' type='text/javascript'%3E%3C/script%3E")
  );

// Set big canvas sizes
var w = 500; //grid width
var squares = 5; // 5x5 grid (divided by 5)
var square_size = (w/squares);

// 3 Practice Rounds
const amountPrac = 3; 

var trialsPrac = new Array(); 
var mapPrac        = 1;  //maps 1-3

// Item conditions
var numbTokens = 2;
var numbAxes   = 1;
var isWall     = 0;

var configurations =  [[1, 1, 2],  // AAB
				       [2, 2, 1],  // BBA
				       [2, 1, 1]]; // BAA


// Don't need to shuffle practice rounds
for(var i = 0; i < amountPrac; i++){ 
	trialsPrac[i] = new Array();

    if (i < amountPrac / 3){ // for 1/3 of trials, AAB
    	trialsPrac[i].push(mapPrac, configurations[0]);
     }
     
     else if ((i >= amountPrac / 3) && (i < amountPrac / 3 * 2)){ // 2nd 3rd, ABA
    	trialsPrac[i].push(mapPrac, configurations[1]);
     }
     
     else if ((i >= amountPrac / 3 * 2) && (i < amountPrac)){ // 3rd 3rd BAA
    	trialsPrac[i].push(mapPrac, configurations[2]);
     }
	 mapPrac++

	if (numbAxes > 2) {
		numbAxes = 1;
	}
	if (numbTokens > 2) {
		numbTokens = 1;
	}
	if (i >= amountPrac/2){
		isWall = 1;
	}

	trialsPrac[i].push(numbTokens, numbAxes, isWall);
	numbTokens++

	if (((i/2) == 0) || i%2 == 0) {
		numbAxes++
	}

	// different for practice
	
}


var ctxPrac = document.getElementById("myGridPrac").getContext("2d"); //canvas
var counterPrac = -1 // starts at -1 for each user
var start_timePrac = 0; // global var

/// Start animation
async function drawMovementPrac() {
	
	// Remove  confidence rating question
	var windBoxPrac = document.getElementById("windowBoxPrac");
	windBoxPrac.style.display = "none";
	var resBoxPrac = document.getElementById("resultRatePrac");
	resBoxPrac.style.display = "none";

	// Clear cond canvases
	ctx2.clearRect(0, 0, 300, 100); 
	ctx3.clearRect(0, 0, 300, 100); 
	ctx4.clearRect(0, 0, 300, 100); 

	// Put instructions line so map doesn't move
	document.getElementById("pleasePointPrac").innerHTML = "Your partner is entering the map. . .";
    document.getElementById("pleasePointPrac").style.color = "black";

	// Update global counter
	counterPrac++
	if (counterPrac > trialsPrac.length){
		return 
	}

	// Find map number on
	var mapNumberPrac = trialsPrac[counterPrac][0]; 

	// Set animation positions for each map: array of tiles will walk on
	if (mapNumberPrac == 1) {
		walkInPrac = [[0, 0], [square_size, 0], [square_size*2, 0]]
	}
	else if (mapNumberPrac == 2) {
		walkInPrac = [[square_size*4, square_size*4], [square_size*3, square_size*4], [square_size*2, square_size*4]]
	}
	else if (mapNumberPrac == 3) {
		walkInPrac = [[square_size*3, square_size*0], [square_size*3, square_size*1], [square_size*3, square_size*2]]
	}

	// Create animation
	var space     = 3; // number of spaces will walk
	var countWalk = 0; // counter for tile positions array
	while (space>0){
		// Redraw canvas, draw Player, delay, redo
		rawCanvas(ctxPrac);
		ctxPrac.drawImage(playerMove, walkInPrac[countWalk][0]+30, walkInPrac[countWalk][1]+20, player_size-20, player_size);
		await sleep(500);
		space -= 1;
		countWalk++;
	}

	// Once finished walking amount of spaces, show boxes and watch for clicks
	generateMapPrac();
}


  
// Each time clicks next, generates different map
function generateMapPrac(){

	// Bring buttons back
	document.getElementById("resetBoxPrac").hidden = false;
	document.getElementById("confirmPrac").hidden = false;

    // Reset instructions 
    document.getElementById("pleasePointPrac").innerHTML = "Click on the box(es) that you wish to highlight for your partner.";
    document.getElementById("pleasePointPrac").style.color = "black";

    clickIndexPrac = 0; // reset every trial (for purplePoint)
    zeroIndexPrac = 0;

	var mapNumberPrac = trialsPrac[counterPrac][0]; // a number from 1-7
	var tokenNumber   = trialsPrac[counterPrac][2]; // either 1 or 2
	var axNumber      = trialsPrac[counterPrac][3]; // either 1 or 2
	var ifWall        = trialsPrac[counterPrac][4]; // either 0 or 1

	var rewardNumberPrac = [1, 2, 2]; // manual for now

	// Make item placements based on how many rewards there are
	if (rewardNumberPrac[counterPrac] == 1){ // one banana
		var itemsConfig =  [1, 2, 2]; // BSS (player will move around rather than boxes)
	}
	else { // two bananas
		var itemsConfig =  [1, 1, 2]; // BBS
	}


	// If there's a wall, add question marks (will add items later)
	if (ifWall == 1){
		drawQuestion(ctx4, 0, 0)
		drawQuestion(ctx4, square_size, 0)
		drawQuestion(ctx4, square_size*2, 0)
	}

	// your items: pointings
	drawToken(ctx3, 0, 0)
	if (tokenNumber == 2) {
		drawToken(ctx3, square_size, 0)
	}

	// partner's items: hammers
	drawHammer(ctx2, 0, 0)
	if (axNumber ==2){
		drawHammer(ctx2, square_size, 0)
	}

	/// Map 1: 
	if (mapNumberPrac == 1) {
		// red tile (goal)
		r_x0  = 0;
		r_y0  = square_size;

		// purple tiles
		p1_x0 = square_size * 4;
		p1_y0 = square_size;
		p2_x0 = square_size;
		p2_y0 = square_size * 3;
		p3_x0 = square_size;
		p3_y0 = square_size * 4;
	}


	/// Map 2:
	else if (mapNumberPrac == 2) {
		// red tile 
		r_x0  = 0;
		r_y0  = square_size * 3;

		// purple tiles
		p1_x0 = square_size * 4;
		p1_y0 = 0;
		p2_x0 = square_size * 3;
		p2_y0 = 0;
		p3_x0 = square_size * 4;
		p3_y0 = square_size * 2;
	}


	/// Map 3: 
	else if (mapNumberPrac == 3) {
		// red tile (goal)
		r_x0  = 0;
		r_y0  = square_size * 3;

		// purple tiles
		p1_x0 = square_size * 2;
		p1_y0 = square_size;
		p2_x0 = square_size;
		p2_y0 = square_size;
		p3_x0 = square_size * 3;
		p3_y0 = square_size * 4;
	}



	/// Map 4: 
	else if (mapNumberPrac == 4) {
		// red tile (goal)
		r_x0  = 0;
		r_y0  = square_size * 3;

		// purple tiles
		p1_x0 = square_size;
		p1_y0 = 0;
		p2_x0 = square_size * 2;
		p2_y0 = square_size * 2;
		p3_x0 = square_size * 4;
		p3_y0 = square_size * 2;
	}



	/// Map 5:
	else if (mapNumberPrac == 5) {
		// red tile (goal)
		r_x0  = 0;
		r_y0  = square_size * 3

		// purple tiles
		p1_x0 = square_size * 2;
		p1_y0 = square_size * 4;
		p2_x0 = square_size;
		p2_y0 = square_size * 4;
		p3_x0 = square_size * 4;
		p3_y0 = square_size * 3;
	}


	/// Map 6:
	else if (mapNumberPrac == 6) {
		// red tile (goal)
		r_x0  = 0;
		r_y0  = 0;

		// purple tiles
		p1_x0 = square_size * 4;
		p1_y0 = 0;
		p2_x0 = square_size * 2;
		p2_y0 = square_size * 2;
		p3_x0 = 0;
		p3_y0 = square_size * 4;
	}


	/// Map 7: 
	else if (mapNumberPrac == 7) {
		// red tile (goal)
		r_x0  = 0;
		r_y0  = square_size;

		// purple tiles
		p1_x0 = square_size * 3;
		p1_y0 = square_size;
		p2_x0 = square_size * 4;
		p2_y0 = square_size * 2;
		p3_x0 = 0;
		p3_y0 = square_size * 3;
	}




	// Apples & Bees images (randomized p's config equally before)
	// var itemsConfig = trials[counter][1]; // an array of 2 ones and 1 two
	itemAt_p1Prac = itemsConfig[0];
	itemAt_p2Prac = itemsConfig[1];
	itemAt_p3Prac = itemsConfig[2];

	// whether p1 is apple or bee, draw accordingly 
	if (itemAt_p1Prac == 1) {
		drawApple(ctxPrac, p1_x0, p1_y0, square_size);
		if (ifWall == 0){
			drawApple(ctx4, 0, 0, 1);
		}
	}
	else if (itemAt_p1Prac == 2) {
		drawGhost(ctxPrac, p1_x0, p1_y0, square_size);
		if (ifWall == 0){
			drawGhost(ctx4, 0, 0, 1);
		}
	}

	// p2
	if (itemAt_p2Prac == 1) {
		drawApple(ctxPrac, p2_x0, p2_y0, square_size);
		if (ifWall == 0){
			drawApple(ctx4, square_size, 0, 1);
		}
	}
	else if (itemAt_p2Prac == 2) {
		drawGhost(ctxPrac, p2_x0, p2_y0, square_size);
		if (ifWall == 0){
			drawGhost(ctx4, square_size, 0, 1);
		}
	}

	// p3
	if (itemAt_p3Prac == 1) {
		drawApple(ctxPrac, p3_x0, p3_y0, square_size);
		if (ifWall == 0){
			drawApple(ctx4, square_size*2, 0, 1);
		}
	}
	else if (itemAt_p3Prac == 2) {
		drawGhost(ctxPrac, p3_x0, p3_y0, square_size);
		if (ifWall == 0){
			drawGhost(ctx4, square_size*2, 0, 1);
		}
	}

	// hammer and pointer containers
	drawItemsGrid(ctx2);
	drawItemsGrid(ctx3);
	drawItemsGrid(ctx4);
	

	// Player's role:
	pointPurplePrac();
}



var onlyOnePurplePrac = new Array ();

function pointPurplePrac(){

	var mapNumberPrac = trialsPrac[counterPrac][0]; // a number from 1-7

	// Message to point
	document.getElementById("pleasePointPrac").hidden = false;

	// access which purple tile clicked
	var elem = document.getElementById("myGridPrac");
	pWidth = 600 / 5; // (canvas width / square); bc canvas fitted to screen 

	elemLeft = elem.offsetLeft, //know locations of canvas
    elemTop = elem.offsetTop, 
    elements = []; // consider all purple tile locations as elements 

	// find tile locations given where canvas was drawn
	/// Map 1: 
	if (mapNumberPrac == 1) {
		// red tile (goal)
		ir_x0   = 0;
		ir_y0   = pWidth;

		// purple tiles
		ip1_x0 = pWidth * 4;
		ip1_y0 = pWidth;
		ip2_x0 = pWidth;
		ip2_y0 = pWidth * 3;
		ip3_x0 = pWidth;
		ip3_y0 = pWidth * 4;
	}


	/// Map 2:
	else if (mapNumberPrac == 2) {
		// red tile 
		ir_x0   = 0;
		ir_y0   = pWidth * 3;

		// purple tiles
		ip1_x0 = pWidth * 4;
		ip1_y0 = 0;
		ip2_x0 = pWidth * 3;
		ip2_y0 = 0;
		ip3_x0 = pWidth * 4;
		ip3_y0 = pWidth * 2;
	}


	/// Map 3: 
	else if (mapNumberPrac == 3) {
		// red tile (goal)
		ir_x0   = 0;
		ir_y0   = pWidth * 3;

		// purple tiles
		ip1_x0 = pWidth * 2;
		ip1_y0 = pWidth;
		ip2_x0 = pWidth;
		ip2_y0 = pWidth;
		ip3_x0 = pWidth * 3;
		ip3_y0 = pWidth * 4;
	}



	/// Map 4: 
	else if (mapNumberPrac == 4) {
		// red tile (goal)
		ir_x0   = 0;
		ir_y0   = pWidth * 3;

		// purple tiles
		ip1_x0 = pWidth;
		ip1_y0 = 0;
		ip2_x0 = pWidth * 2;
		ip2_y0 = pWidth * 2;
		ip3_x0 = pWidth * 4;
		ip3_y0 = pWidth * 2;
	}



	/// Map 5:
	else if (mapNumberPrac == 5) {
		// red tile (goal)
		ir_x0   = 0;
		ir_y0   = pWidth * 3

		// purple tiles
		ip1_x0 = pWidth * 2;
		ip1_y0 = pWidth * 4;
		ip2_x0 = pWidth;
		ip2_y0 = pWidth * 4;
		ip3_x0 = pWidth * 4;
		ip3_y0 = pWidth * 3;
	}


	/// Map 6:
	else if (mapNumberPrac == 6) {
		// red tile (goal)
		ir_x0   = 0;
		ir_y0   = 0;

		// purple tiles
		ip1_x0 = pWidth * 4;
		ip1_y0 = 0;
		ip2_x0 = pWidth * 2;
		ip2_y0 = pWidth * 2;
		ip3_x0 = 0;
		ip3_y0 = pWidth * 4;
	}


	/// Map 7: 
	else if (mapNumberPrac == 7) {
		// red tile (goal)
		ir_x0   = 0;
		ir_y0   = pWidth;

		// purple tiles
		ip1_x0 = pWidth * 3;
		ip1_y0 = pWidth;
		ip2_x0 = pWidth * 4;
		ip2_y0 = pWidth * 2;
		ip3_x0 = 0;
		ip3_y0 = pWidth * 3;
	}


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
	elem.addEventListener('click', handlerPrac); //**true makes it ask only once

	// RT from after display boxes
	start_timePrac = Date.now();
}

// Need to track double clicks
var clickArrayPrac = new Array(); 
var clickIndexPrac = 0; // check if clicked the same item as the prev index 

// Function for when click on an item
var handlerPrac = function(event) {

	var tokenNumber   = trialsPrac[counterPrac][2]; // either 1 or 2

	// Redrawing box with a token on top (to control the order in which the images load)
	var rewardNumberPrac = [1, 2, 2]; // manual for now
	if (rewardNumberPrac[counterPrac] == 1){ // one banana
		var itemsConfig =  [1, 2, 2]; // BSS (player will move around rather than boxes)
	}
	else { // two bananas
		var itemsConfig =  [1, 1, 2]; // BBS
	}

	itemAt_p1Prac = itemsConfig[0];
	itemAt_p2Prac = itemsConfig[1];
	itemAt_p3Prac = itemsConfig[2];


	// x and y are the coordinates of where the mouse clicked; given page and canvas
	var x = event.pageX - elemLeft,
		y = event.pageY - elemTop;

	
	// Go through each purple tile's location 
	elements.forEach(function(element) {
			if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
				
				// Update counter for confirm button 
				zeroIndexPrac++;

                // Instruct to press confirm
				document.getElementById("pleasePointPrac").innerHTML = "Click <b>Confirm Selection</b> to confirm your choice.";
				document.getElementById("pleasePointPrac").style.color = "#911879";

                if (clickIndexPrac == 0){
                    // First click, place a token on what they chose
                    if (element.name == "p1"){
						// To do so, redraw the box, but with the token on top (send function item = 2)
                        if (itemAt_p1Prac == 1) {
							drawApple(ctxPrac, p1_x0, p1_y0, 2);
						}
						else if (itemAt_p1Prac == 2) {
							drawGhost(ctxPrac, p1_x0, p1_y0, 2);
						}
                    }

                    else if (element.name == "p2"){
                        if (itemAt_p2Prac == 1) {
							drawApple(ctxPrac, p2_x0, p2_y0, 2);
						}
						else if (itemAt_p2Prac == 2) {
							drawGhost(ctxPrac, p2_x0, p2_y0, 2);
						}
                    }

                    else if (element.name == "p3"){
                       if (itemAt_p3Prac == 1) {
							drawApple(ctxPrac, p3_x0, p3_y0, 2);
						}
						else if (itemAt_p3Prac == 2) {
							drawGhost(ctxPrac, p3_x0, p3_y0, 2);
						}
                    }
                }
                
                // Process double click (NOT USING ANYMORE?)
                clickArrayPrac[clickIndexPrac] = element.name // save what picked this time 

				if (tokenNumber == 1){
					// Since can only choose one in this cond, erase what they previously clicked 
					resetMapPrac();
					zeroIndexPrac++;

					// Place token on what clicked now
                     if (element.name == "p1"){
                        if (itemAt_p1Prac == 1) {
							drawApple(ctxPrac, p1_x0, p1_y0, 2);
						}
						else if (itemAt_p1Prac == 2) {
							drawGhost(ctxPrac, p1_x0, p1_y0, 2);
						}
                    }

                    else if (element.name == "p2"){
                        if (itemAt_p2Prac == 1) {
							drawApple(ctxPrac, p2_x0, p2_y0, 2);
						}
						else if (itemAt_p2Prac == 2) {
							drawGhost(ctxPrac, p2_x0, p2_y0, 2);
						}
                    }

                    else if (element.name == "p3"){
                        if (itemAt_p3Prac == 1) {
							drawApple(ctxPrac, p3_x0, p3_y0, 2);
						}
						else if (itemAt_p3Prac == 2) {
							drawGhost(ctxPrac, p3_x0, p3_y0, 2);
						}
                    }
				}

				else{
					if (clickIndexPrac < 2) {
						// Here, can click up to, but no more than, 2
						if (element.name == "p1"){
							if (itemAt_p1Prac == 1) {
								drawApple(ctxPrac, p1_x0, p1_y0, 2);
							}
							else if (itemAt_p1Prac == 2) {
								drawGhost(ctxPrac, p1_x0, p1_y0, 2);
							}
						}

						else if (element.name == "p2"){
							if (itemAt_p2Prac == 1) {
								drawApple(ctxPrac, p2_x0, p2_y0, 2);
							}
							else if (itemAt_p2Prac == 2) {
								drawGhost(ctxPrac, p2_x0, p2_y0, 2);
							}
						}

						else if (element.name == "p3"){
							if (itemAt_p3Prac == 1) {
								drawApple(ctxPrac, p3_x0, p3_y0, 2);
							}
							else if (itemAt_p3Prac == 2) {
								drawGhost(ctxPrac, p3_x0, p3_y0, 2);
							}
						}
					}

					else {
						// Instruct to press reset
						document.getElementById("pleasePointPrac").innerHTML = "You have already selected 2 boxes. Click <b>Clear Selections</b> if you would like to make any changes. Otherwise, click <b>Confirm Selection</b>.";
						document.getElementById("pleasePointPrac").style.color = "#911879";
					}
				}
                clickIndexPrac++ //for next click 
			}
	});

}; 


function confirmPrac(){
	var elem = document.getElementById("myGridPrac");

    // First time clicking: 
    if (zeroIndexPrac == 0){
        // Instruct to double click 
        document.getElementById("pleasePointPrac").innerHTML = "You are choosing to not select any items. Click the button again to confirm your choice.";
        document.getElementById("pleasePointPrac").style.color = "#911879";
        zeroIndexPrac++;
    }

    // Second time clicking:
    else {

		// Store reaction time up to when pressed confirm
		react_timePrac = Date.now()-start_timePrac;

        // Record the data 
		recordSelectionsPrac("zero");

		// Hide buttons
		document.getElementById("resetBoxPrac").hidden = true;
		document.getElementById("confirmPrac").hidden = true;
		
		// If chose not to click any items, don't let them click any 
		elem.removeEventListener('click', handlerPrac);

         // Move on to confidence rating
        checkConfidencePrac();
    }

}


function checkConfidencePrac(){

	// Ask for confidence rating: display window with radio buttons
	var windBoxPrac = document.getElementById("windowBoxPrac");
	windBoxPrac.style.display = "block";
	var resBoxPrac = document.getElementById("resultRatePrac");
	resBoxPrac.style.display = "block";

	// Add confirm button to it.
	document.getElementById("ConfirmPrac").hidden = false;

}


function postConfirmPrac(){
	
	// Listen to Confirm button
	var confSelected = document.getElementsByName("ConfidenceScale");
	let selectedRating;
	var pracRatings = new Array();
	var wasFilled = 0; // to not allow confirm without pressing

	// cycle through the radio buttons
	for(var i = 0; i < confSelected.length; i++) {
		if(confSelected[i].checked) {

			selectedRating = confSelected[i].value; // value of the button that was checked 
			pracRatings[counterPrac] = selectedRating;  // store

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

		
		// If on last trial
		if (counterPrac == trialsPrac.length-1) {
			// get rid of everything currently being displayed
			var windBoxPrac = document.getElementById("windowBoxPrac");
			windBoxPrac.style.display = "none";
			var pracPage = document.getElementById("practicePage");
			pracPage.style.display = "none";

			// go to next instructions
			instr.next();
		}
		// Otherwise, generate next map
		else {
			// generateMapPrac();
			drawMovementPrac();
		}
	}

}


// which p did they select, or "zero" if didn't
var selectDataPrac = new Array(); 
function recordSelectionsPrac(p){ 
	selectDataPrac.push(p); //**stopped using */
}



// Restore canvas to previous state 
function resetMapPrac(){

	zeroIndexPrac = 0;
	clickIndexPrac = 0;

    var mapNumberPrac = trialsPrac[counterPrac][0]; // a number from 1-7
	var rewardNumberPrac = [1, 2, 2]; // manual for now

	// Make item placements based on how many rewards there are
	if (rewardNumberPrac[counterPrac] == 1){ // one banana
		var itemsConfig =  [1, 2, 2]; // BSS (player will move around rather than boxes)
	}
	else { // two bananas
		var itemsConfig =  [1, 1, 2]; // BBS
	}

	// Clear and redo canvas each time gen map: always light blue
	ctxPrac.clearRect(0, 0, w, w); 
	ctxPrac.fillStyle = "#dde7f0";
	ctxPrac.fillRect(0, 0, w, w);	
	

	/// Map 1: 
	if (mapNumberPrac == 1) {
		// red tile (goal)
		r_x0  = 0;
		r_y0  = square_size;

		// purple tiles
		p1_x0 = square_size * 4;
		p1_y0 = square_size;
		p2_x0 = square_size;
		p2_y0 = square_size * 3;
		p3_x0 = square_size;
		p3_y0 = square_size * 4;
	}


	/// Map 2:
	else if (mapNumberPrac == 2) {
		// red tile 
		r_x0  = 0;
		r_y0  = square_size * 3;

		// purple tiles
		p1_x0 = square_size * 4;
		p1_y0 = 0;
		p2_x0 = square_size * 3;
		p2_y0 = 0;
		p3_x0 = square_size * 4;
		p3_y0 = square_size * 2;
	}


	/// Map 3: 
	else if (mapNumberPrac == 3) {
		// red tile (goal)
		r_x0  = 0;
		r_y0  = square_size * 3;

		// purple tiles
		p1_x0 = square_size * 2;
		p1_y0 = square_size;
		p2_x0 = square_size;
		p2_y0 = square_size;
		p3_x0 = square_size * 3;
		p3_y0 = square_size * 4;
	}



	/// Map 4: 
	else if (mapNumberPrac == 4) {
		// red tile (goal)
		r_x0  = 0;
		r_y0  = square_size * 3;

		// purple tiles
		p1_x0 = square_size;
		p1_y0 = 0;
		p2_x0 = square_size * 2;
		p2_y0 = square_size * 2;
		p3_x0 = square_size * 4;
		p3_y0 = square_size * 2;
	}



	/// Map 5:
	else if (mapNumberPrac == 5) {
		// red tile (goal)
		r_x0  = 0;
		r_y0  = square_size * 3

		// purple tiles
		p1_x0 = square_size * 2;
		p1_y0 = square_size * 4;
		p2_x0 = square_size;
		p2_y0 = square_size * 4;
		p3_x0 = square_size * 4;
		p3_y0 = square_size * 3;
	}


	/// Map 6:
	else if (mapNumberPrac == 6) {
		// red tile (goal)
		r_x0  = 0;
		r_y0  = 0;

		// purple tiles
		p1_x0 = square_size * 4;
		p1_y0 = 0;
		p2_x0 = square_size * 2;
		p2_y0 = square_size * 2;
		p3_x0 = 0;
		p3_y0 = square_size * 4;
	}


	/// Map 7: 
	else if (mapNumberPrac == 7) {
		// red tile (goal)
		r_x0  = 0;
		r_y0  = square_size;

		// purple tiles
		p1_x0 = square_size * 3;
		p1_y0 = square_size;
		p2_x0 = square_size * 4;
		p2_y0 = square_size * 2;
		p3_x0 = 0;
		p3_y0 = square_size * 3;
	}



	///// Make the grid drawing 

	// Apples & Bees images (randomized p's config equally before)
	// var itemsConfig = trials[counter][1]; // an array of 2 ones and 1 two
	itemAt_p1Prac = itemsConfig[0];
	itemAt_p2Prac = itemsConfig[1];
	itemAt_p3Prac = itemsConfig[2];

	// whether p1 is apple or bee, draw accordingly 
	if (itemAt_p1Prac == 1) {
		drawApple(ctxPrac, p1_x0, p1_y0, square_size);
	}
	else if (itemAt_p1Prac == 2) {
		drawGhost(ctxPrac, p1_x0, p1_y0, square_size);
	}

	// p2
	if (itemAt_p2Prac == 1) {
		drawApple(ctxPrac, p2_x0, p2_y0, square_size);
	}
	else if (itemAt_p2Prac == 2) {
		drawGhost(ctxPrac, p2_x0, p2_y0, square_size);
	}

	// p3
	if (itemAt_p3Prac == 1) {
		drawApple(ctxPrac, p3_x0, p3_y0, square_size);
	}
	else if (itemAt_p3Prac == 2) {
		drawGhost(ctxPrac, p3_x0, p3_y0, square_size);
	}


	// Player position
	if (mapNumberPrac==1){
		var g_x0 = square_size*2;
		var g_y0 = 0;
	}
	else if (mapNumberPrac == 2){
		var g_x0 = square_size*2;
		var g_y0 = square_size*4;
	}
	else if (mapNumberPrac == 3){
		var g_x0 = square_size*2;
		var g_y0 = 0;
	}
	drawPlayer(ctxPrac, g_x0, g_y0);


	// Grid lines (code put after tiles so will be overlayed)
	ctxPrac.beginPath() 
	for (let i=0; i<=w; i=i+square_size){
		//horizontal lines
		ctxPrac.moveTo(0,i);
		ctxPrac.lineTo(w,i);

		//vertical lines
		ctxPrac.moveTo(i,0);
		ctxPrac.lineTo(i,w);
	}
	ctxPrac.lineWidth = 2;
	ctxPrac.strokeStyle = "#000000";
	ctxPrac.stroke();
	ctxPrac.closePath();
}
