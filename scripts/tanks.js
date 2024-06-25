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
	fetch('tank_functions/get_tank_contents.php',{
		"method":"POST",
		"body": JSON.stringify(info)
	}).then(function(response){
		return response.text();
	}).then(function(data){
		if(!data||data==""){
			//DecorateTank(tank);
			let info = {"contents" : JSON.stringify(tankContent[tank])};
			//Decorate and create on database if not
			fetch('tank_functions/create_tank.php',{
				"method":"POST",
				"body": JSON.stringify(info)
			}).then(function(response){
				return response.text();
			}).then(function(data){
			})
		}else{
			//Retrieve tank info
			let info = {"tank" : tank};
			fetch('tank_functions/get_tank_contents.php',{
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
	fetch('tank_functions/set_tank_contents.php',{
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
function AddItemToTank(tank,item){
	if(item.x == null){
		item = NewItem(item.id);
	}
	tankContent[tank].push(item);
	UpdateTank(tank);
}
function RemoveItemFromTank(tank,index){
	tankContent[tank].splice(index,1);
	UpdateTank(tank);
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
	InitializeStorage();
	GetAccountMoney();
}