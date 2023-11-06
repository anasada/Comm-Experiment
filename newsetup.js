var ctx2 = document.getElementById("canvItemsPrac").getContext("2d"); //Partner
var ctx3 = document.getElementById("canvConfigsPrac").getContext("2d"); //Helper

var ctxHammer = document.getElementById("canvItems").getContext("2d"); //Partner
var ctxHand = document.getElementById("canvConfigs").getContext("2d"); //Helper

var w2 = 300; //grid width

function drawItemsGrid(ctx2, ctx3){


	// Clear to reset
	ctx2.clearRect(0, 0, w2, w2); 
	ctx3.clearRect(0, 0, w2, w2); 

	// Overlay grid lines (3 x 1)
	ctx2.beginPath() 
	for (let i=0; i<=w2; i=i+square_size){
		//horizontal lines
		ctx2.moveTo(0,i);
		ctx2.lineTo(w2,i);

		//vertical lines
		ctx2.moveTo(i,0);
		ctx2.lineTo(i,w2);
	}
	ctx2.lineWidth = 2;
	ctx2.strokeStyle = "#000000";
	ctx2.stroke();
	ctx2.closePath();

	// Overlay grid lines (3 x 1)
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
	ctx3.stroke();
	ctx3.closePath();
}

function drawPlayer(ctx, p_x0, p_y0, square_size){
	// Draw icon for player
	player_size = square_size - 40;
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
	hammer_img.src = 'img/hammer.png';
	hammer_img.onload = function(){
	  ctx.drawImage(hammer_img, p_x0+15, p_y0+15, item_size, item_size);
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

function drawConfigGrid(){

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

// not using anymore (being able to select from 3rd canvas too)
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

// Function for when click on an item
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