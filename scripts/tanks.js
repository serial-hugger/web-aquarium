function Test(say){
	window.alert(say);
}

//TANK CONTENTS
var tankDecor = [,];


var aquariums = [];
var selectedTank = 0;
for(i = 0; i < 10; i++){
	CreateTank(i);
}
function CreateTank(tank){
	var canvas = document.createElement("canvas");
	canvas.id = ("aquarium" + tank);
	canvas.width = 200;
	canvas.height = 100;
	canvas.style = "border:2.5px solid #303030";
	document.getElementById("aquariums").appendChild(canvas);
	aquariums.push(canvas);
	canvas.addEventListener("mousedown", function(e) 
	{ 
		selectedTank = tank;
		overTank = false;
	}); 
	canvas.addEventListener("mouseenter", function(e) 
	{ 
		if(selectedTank != tank){
			overTank = true;
		}
	}); 
	canvas.addEventListener("mouseleave", function(e) 
	{ 
		overTank = false;
	});
}
function DecorateTank(tank){
	tankDecor[tank] = [];
	for(z=0;z<50;z+=getRandomInt(2,3)){
		var random;
		if(getRandomInt(0,100)<90){
			random = getRandomInt(2,4);
		}else{
			if(getRandomInt(0,100)<50){
				random = 5;
			}else{
				random = getRandomInt(7,8);
			}
		}
		tankDecor[tank].push({"z":z,"id":random,"x":getRandomInt(-300,300),"y":0,"size":(getRandomInt(8,12)/10),"flip":(getRandomInt(0,1)),"image":tankItems[random].image});
	}
}
function DecorateAll(){
	for(i = 0; i<aquariums.length;i++){
		DecorateTank(i);
	}
	//window.alert(tankDecor);
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
window.onload = function() {
	DecorateAll();
	preloadTankImages();
	repeat();
}
