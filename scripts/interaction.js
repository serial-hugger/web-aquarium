var overTank = false;
var cursor = 0;
var debug = document.getElementById("debug");
//the canvas of selected aquarium being displayed
var mainCanvas = document.getElementById("selectedaquarium");
//position of mouse
var mouseX;
var mousePrevX;
var mouseY;
var mousePrevY;
//slot of the item that the mouse is over
var itemSlotOver;
//variables to draw rectangle around item hovered over or selected
var hoverTop;
var hoverLeft;
var hoverWidth;
var hoverHeight;

var movingItemSlot = -1;

var yMult = 1;

//ACTIONS
mainCanvas.addEventListener("pointerdown", function(e) 
{ 
	if(mode == "edit"){
		movingItemSlot = itemSlotOver;
		xDebt = 0;
		yDebt = 0;
	}
	return false;
}); 
mainCanvas.addEventListener("pointerup", function(e) 
{ 
	movingItemSlot = -1;
}); 

mainCanvas.addEventListener("pointermove", function(e) 
{ 
    mouseX = getMousePos(mainCanvas,e).x;
	mouseY = getMousePos(mainCanvas,e).y;
}); 
mainCanvas.addEventListener("pointerout", function(e) 
{ 
	hoverTop = -1000;
	hoverLeft = -1000;
	movingItemSlot = -1;
}); 

function getMousePos(canvas, evt) {
    var rect = mainCanvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
function UpdateCursor(){
	if(cursor == 0){
		document.body.style.cursor = "default";
	}
	if(cursor == 1){
		document.body.style.cursor = "pointer";
	}
	if(cursor == 2){
		document.body.style.cursor = "move";
	}
}
