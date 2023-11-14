/////THE UNIVERSALLY USED FUNCTIONS

var ctx2 = document.getElementById("canvItemsPrac").getContext("2d"); //Partner
var ctx3 = document.getElementById("canvConfigsPrac").getContext("2d"); //Helper
var ctx4 = document.getElementById("canvWallPrac").getContext("2d"); //Wall

var ctxHammer = document.getElementById("canvItems").getContext("2d"); //Partner
var ctxHand = document.getElementById("canvConfigs").getContext("2d"); //Helper
var ctxWall = document.getElementById("canvWall").getContext("2d"); //Wall

var w2 = 300; //grid width

function drawItemsGrid(ctx_s){

	// Clear to reset
	ctx_s.clearRect(0, 0, w2, w2); 

	// Overlay grid lines 
	ctx_s.beginPath() 
	for (let i=0; i<=w2; i=i+square_size){
		//horizontal lines
		ctx_s.moveTo(0,i);
		ctx_s.lineTo(w2,i);

		//vertical lines
		ctx_s.moveTo(i,0);
		ctx_s.lineTo(i,w2);
	}
	ctx_s.lineWidth = 2;
	ctx_s.strokeStyle = "#000000";
	ctx_s.stroke();
	ctx_s.closePath();
}

const reward_size = square_size; // made a little smaller and moved over so won't cover grid lines
const box_size = square_size - 10; 

function drawApple(ctx, p_x0, p_y0, item){

	if (item == 1){ // for wall canvas
		apple_image = new Image();
		apple_image.src = 'img/ai_banana.png';
		apple_image.onload = function(){
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(apple_image, p_x0+7, p_y0+25, item_size+10, item_size-15);
		}	
	}
	else{
		// if on map, draw box first
		box_img = new Image();
		box_img.src = 'img/drkbrown_box.png';
		box_img.onload = function(){
			ctx.drawImage(box_img, p_x0+5, p_y0+5, box_size, box_size);

			// then, draw apple
			apple_image = new Image();
			apple_image.src = 'img/ai_banana.png';
			apple_image.onload = function(){
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(apple_image, p_x0+15, p_y0+43, reward_size-30, reward_size-57);

				// then, if selected the box, draw token
				if (item == 2){
					token_image = new Image();
					token_image.src = 'img/silv_token4.png';
					token_image.onload = function(){
						ctx.drawImage(token_image, p_x0+20, p_y0+18, reward_size-40, reward_size-40);
					}	
				}
			}
		}
	}
}


function drawGhost(ctx, p_x0, p_y0, item){

	if (item == 1){ // for wall, just draw item itself
		bee_image = new Image();
		bee_image.src = 'img/ai_scorpion.png';
		bee_image.onload = function(){
			ctx.drawImage(bee_image, p_x0+15, p_y0+15, item_size-5, item_size-5);
		}
	}
	else{
		// on map, draw box first
		box_img = new Image();
		box_img.src = 'img/drkbrown_box.png';
		box_img.onload = function(){
			ctx.drawImage(box_img, p_x0+5, p_y0+5, box_size, box_size);
		
			// then bee
			bee_image = new Image();
			bee_image.src = 'img/ai_scorpion.png';
			bee_image.onload = function(){
				ctx.drawImage(bee_image, p_x0+20, p_y0+34, reward_size-45, reward_size-48);

				// then, if selected the box, draw token
				if (item == 2){
					token_image = new Image();
					token_image.src = 'img/silv_token4.png';
					token_image.onload = function(){
						ctx.drawImage(token_image, p_x0+20, p_y0+18, reward_size-40, reward_size-40);
					}	
				}
			}
		}
	}
}

player_size = square_size - 40;
function drawPlayer(ctx, p_x0, p_y0, square_size){
	// Draw icon for player
	player_img = new Image();
	player_img.src = 'img/person.png';
	player_img.onload = function(){
	  ctx.drawImage(player_img, p_x0+30, p_y0+20, player_size-20, player_size);
  }
}


const item_size = square_size-25;
function drawHammer(ctx, p_x0, p_y0){
	// Draw hammers depending on condition number
	hammer_img = new Image();
	hammer_img.src = 'img/axe2.png';
	hammer_img.onload = function(){
	  ctx.drawImage(hammer_img, p_x0+5, p_y0+10, item_size+10, item_size+5);
  }
}

function drawHand(ctx, p_x0, p_y0){
	// Draw hand depending on condition number
	hand_img = new Image();
	hand_img.src = 'img/hand_pointer.png';
	hand_img.onload = function(){
	  ctx.drawImage(hand_img, p_x0+15, p_y0+15, item_size, item_size);
  }
}

function drawQuestion(ctx, p_x0, p_y0){
	// Draw question mark
	quest_img = new Image();
	quest_img.src = 'img/question.png';
	quest_img.onload = function(){
	  ctx.drawImage(quest_img, p_x0+15, p_y0+15, item_size, item_size);
  }
}

function drawToken(ctx, p_x0, p_y0){
	// Draw token
	tok_img = new Image();
	tok_img.src = 'img/silv_token4.png';
	tok_img.onload = function(){
	  ctx.drawImage(tok_img, p_x0+15, p_y0+15, item_size, item_size);
  }
}

function drawConfigGrid(){
	/// FUNCTION NOT USED ANYMORE
	///being able to view boxes on a separate canvas

	// Background color: light blue
	ctx3.fillStyle = "#dde7f0";
	ctx3.fillRect(0, 0, 300, 100);	

	// Draw the boxes
	drawBox(ctx3, 0,             0, square_size, "green" , "conf1");
	drawBox(ctx3, square_size,   0, square_size, "red"   , "conf2");
	drawBox(ctx3, square_size*2, 0, square_size, "yellow", "conf3");

	// Ovelay grid lines (3 x 1)
	ctx3.beginPath() 
	for (let i=0; i<=w2; i=i+square_size){
		//horizontal lines
		ctx3.moveTo(0,i);
		ctx3.lineTo(w2,i);

		//vertical lines
		ctx3.moveTo(i,0);
		ctx3.lineTo(i,w2);
	}
	ctx3.lineWidth = 2;
	ctx3.strokeStyle = "#000000";
	ctx3.stroke();
	ctx3.closePath();

	// pointCanv3();
}

// FUNCTION NOT USED ANYMORE (being able to select from 3rd canvas too)
function pointCanv3(){

	// access which one clicked
	var elemCanv = document.getElementById("canvConfigsPrac");
	
	// convFactor = 1.2; // square_size -> pWidth 
	bWidth = 107; // not sure why??
	bHeight = 180;

	elemCanvLeft = elemCanv.offsetLeft, //know locations of canvas
    elemCanvTop = elemCanv.offsetTop, 
    elementsCanv = []; // consider all locations as elements 

	b1_x0 = 0;
	b2_x0 = bWidth;
	b3_x0 = bWidth + 100; // also not sure why

	// put the p's of this round in an array 
	elementsCanv.push({
		name: "green",
		width: bWidth,
		height: bHeight,
		top: 0,
		left: b1_x0
	});

	elementsCanv.push({
		name: "red",
		width: bWidth,
		height: bHeight,
		top: 0,
		left: b2_x0
	});

	elementsCanv.push({
		name: "yellow",
		width: bWidth,
		height: bHeight,
		top: 0,
		left: b3_x0
	});

	// Monitor when click on a box 
	elemCanv.addEventListener('click', canvHandlerPrac); 
}

// Need to track double clicks
var clickArrayPrac = new Array(); 
var clickIndexPrac = 0; // check if clicked the same item as the prev index 

// Function for when click on an item (NOT USED ANYMORE)
var canvHandlerPrac = function(event) {

	// x and y are the coordinates of where the mouse clicked; given page and canvas
	var x = event.pageX - elemCanvLeft,
		y = event.pageY - elemCanvTop;

	
	// Go through each purple tile's location 
	elementsCanv.forEach(function(element) {
		
		if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
			
			// Reset counter for zero button 
			zeroIndexPrac = 0;

			// Instruct to double click 
			document.getElementById("pleasePointPrac").innerHTML = "Click on the location again to confirm your choice.";
			document.getElementById("pleasePointPrac").style.color = "#911879";

			// if (confirm("Press OK to confirm your selection.\nPress CANCEL to make a different selection.") == true) {
				
			if (clickIndexPrac == 0){
				// Show them what they clicked 
				ctx3.beginPath();
				ctx3.strokeStyle = "#FFBD21";
				ctx3.lineWidth = 8;
				if (element.name == "green"){
					ctx3.strokeRect(b1_x0, 0, square_size, square_size);
				}

				else if (element.name == "red"){
					ctx3.strokeRect(b2_x0-10, 0, square_size, square_size);
				}

				else if (element.name == "yellow"){
					ctx3.strokeRect(b3_x0-10, 0, square_size, square_size);
				}
				ctx3.closePath();
			}
			


			// Process double click 
			clickArrayPrac[clickIndexPrac] = element.name // save what picked this time 

			if (clickIndexPrac > 0) { // track after first click 
				// if this x, y is equal to previous x,y => double clicked
					if ((clickArrayPrac[clickIndexPrac] == clickArrayPrac[clickIndexPrac-1])){
						recordSelectionsPrac(element.name);

						// Hide zeroBox, hide instructions
						document.getElementById("pleasePointPrac").hidden = true;
						document.getElementById("zeroBoxPrac").hidden = true;
						document.getElementById("expNextPrac").hidden = false;

						event.stopImmediatePropagation();

						// Stop from selecting more
						onlyOnePurplePrac[counterPrac] = 1;

						// Confidence rating
						checkConfidencePrac();
					}
					else {
						// Erase what previously clicked 
						drawConfigGrid();

						// Highlight what they clicked NOW
						ctx3.beginPath();
						ctx3.strokeStyle = "#FFBD21";
						ctx3.lineWidth = 8;
						if (element.name == "green"){
							ctx3.strokeRect(b1_x0, 0, square_size, square_size);
						}

						else if (element.name == "red"){
							ctx3.strokeRect(b2_x0-10, 0, square_size, square_size);
						}

						else if (element.name == "yellow"){
							ctx3.strokeRect(b3_x0-10, 0, square_size, square_size);
						}
						ctx3.closePath();
						}
				}

			clickIndexPrac++ //for next click 
		}
	});

}; 

function afterAttend(){
	// Close attention check 
	var attentionPage = document.getElementById("attentionCheck");
	attentionPage.style.display = "none";

	// Show formal page
	var expPage = document.getElementById("formalPage");
	expPage.style.display = "block";

	// Continue experiment
	generateMap();

}


function namingFunc(){
	// Save username as variable 
	var playername = document.getElementById("username").value;

	// If not at least 3 characters, alert
	if (playername.length < 3){
		alert("Your username is too short. Please make it at least 3 characters.")
	}
	else{
		// When done, close this window to move on to instructions
		var windBoxInstr = document.getElementById("windowBoxInstr");
		windBoxInstr.style.display = "none";
		var nameDisplay = document.getElementById("namingDisplay");
		nameDisplay.style.display = "none";
	}

	// check if used before??
}

//FUNCTION TO (RE)DRAW BLUE CANVAS WITH GRID LINES
function rawCanvas(ctx_r){
	// Clear canvas each time gen map: always light blue
	ctx_r.clearRect(0, 0, w, w); 
	ctx_r.fillStyle = "#dde7f0";
	ctx_r.fillRect(0, 0, w, w);

	// Grid lines (code put after tiles so will be overlayed)
	ctx_r.beginPath() 
	for (let i=0; i<=w; i=i+square_size){
		//horizontal lines
		ctx_r.moveTo(0,i);
		ctx_r.lineTo(w,i);

		//vertical lines
		ctx_r.moveTo(i,0);
		ctx_r.lineTo(i,w);
	}
	ctx_r.lineWidth = 2;
	ctx_r.strokeStyle = "#000000";
	ctx_r.stroke();
	ctx_r.closePath();
}


// Function that causes delay: for animations
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
  
// Preload image of Player first (need to use it before all others)
playerMove = new Image();
playerMove.src = 'img/person.png';


// Shuffling function that keeps the values in the arrays together
function shuffle(array) {
	// trials shown in different random order for each participant
	let currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle.
	while (currentIndex != 0) {
  
	  // Pick a remaining element.
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
  
	return array;
}


// Function to get random number
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}


// Function to rotate maps certain degrees
function rotateMap(x, y, degrees){

	// Assign x' and y'
	if (x==0){                 var x_m = square_size*4;}
	else if (x==square_size){  var x_m = square_size*3;}
	else if (x==square_size*2){var x_m = square_size*2;}
	else if (x==square_size*3){var x_m = square_size*1;}
	else if (x==square_size*4){var x_m = 0;}

	if (y==0){                 var y_m = square_size*4;}
	else if (y==square_size){  var y_m = square_size*3;}
	else if (y==square_size*2){var y_m = square_size*2;}
	else if (y==square_size*3){var y_m = square_size*1;}
	else if (y==square_size*4){var y_m = 0;}

	// Returns the new (x, y) coordinates 
	if (degrees == 90){
		return [y_m, x];
	}
	else if (degrees == 180){
		return [x_m, y_m];
	}
	else if (degrees == 270){
		return [y, x_m];
	}
	
}
