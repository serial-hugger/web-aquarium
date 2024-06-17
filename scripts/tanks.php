<script>
function Test(say){
	window.alert(say);
}


//TANK CONTENTS
var tankContent = [,];

var myTankIds = [];


var aquariums = [];
var selectedTank = 0;

function CreateTankSave(tank){
	var string = "";
	//for(var c = 0;c < tankContent[tank].length;c++){
	//	string += JSON.stringify(tankContent[tank][c]);
	//	if(c<tankContent[tank][c].length){
	//		string += ";";
	//	}
	//}
	return JSON.stringify(tankContent[tank]);
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
	DecorateTank(tank);
}
function DecorateTank(tank){
	tankContent[tank] = [];
	for(z=0;z<50;z+=getRandomInt(2,3)){
		var id = GetRandomItem("decor");
		tankContent[tank].push({"z":z,"id":id,"x":getRandomInt(-300,300),"y":0,"size":(getRandomInt(8,12)/10),"flip":(getRandomInt(0,1)),"image":tankItems[id].image});
	}
	for(f=0;f<25;f+=getRandomInt(1,3)){
		var id = GetRandomItem("fish");
		tankContent[tank].push({"z":getRandomInt(0,50),"id":id,"x":getRandomInt(-300,300),"y":getRandomInt(50,250),"size":0.5,"image":tankItems[id].image,"moveX":getRandomInt(-100,100),"moveY":getRandomInt(-50,50),"moveZ":getRandomInt(-10,10),"rotation":360});
	}
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
	for(i = 0; i < 10; i++){
		CreateTank(i);
	}
	preloadTankImages();
	repeat();
	CreateButtons();
}
</script>