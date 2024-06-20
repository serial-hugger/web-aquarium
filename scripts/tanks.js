function Test(say){
	window.alert(say);
}


//TANK CONTENTS
var tankContent = [,];

var myTankIds = [];


var aquariums = [];
var selectedTank = 0;

function InitializeTank(tank){
	tankContent[tank] = [];
	if(CheckForTankInfo(tank)==-1){
		tankContent[tank].push({"id":"tankinformation","type":"tankinformation","cleanliness":100});
	}
	let info = {"tank" : tank};
	//Check if tank exists
	fetch('https://webquarium.000webhostapp.com/tank_functions/get_tank_contents.php',{
		"method":"POST",
		"body": JSON.stringify(info)
	}).then(function(response){
		return response.text();
	}).then(function(data){
		if(data=="" || data==null){
			DecorateTank(tank);
			let info = {"contents" : JSON.stringify(tankContent[tank])};
			//Decorate and create on database if not
			fetch('https://webquarium.000webhostapp.com/tank_functions/create_tank.php',{
				"method":"POST",
				"body": JSON.stringify(info)
			}).then(function(response){
				return response.text();
			}).then(function(data){
				window.alert(data);
			})
		}else{
			//Retrieve tank info
			let info = {"tank" : tank};
			fetch('https://webquarium.000webhostapp.com/tank_functions/get_tank_contents.php',{
				"method":"POST",
				"body": JSON.stringify(info)
			}).then(function(response){
				return response.text();
			}).then(function(data){
				tankContent[tank] = JSON.parse(data);
			})
		}
	})
}
function UpdateTank(tank){
	let info = {"tank" : tank,"contents":JSON.stringify(tankContent[tank])};
	//Check if tank exists
	fetch('https://webquarium.000webhostapp.com/tank_functions/set_tank_contents.php',{
		"method":"POST",
		"body": JSON.stringify(info)
	}).then(function(response){
		return response.text();
	}).then(function(data){
	})
}
function CheckForTankInfo(tank){
	var info = -1;
	for(var c = 0;c < tankContent[tank].length;c++){
		if(tankContent[tank][c].type == "tankinformation"){
			info = c;
		}
	}
	return c;
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
	InitializeTank(tank);
}
function DecorateTank(tank){
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