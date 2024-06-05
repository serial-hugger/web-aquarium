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
			random = 5;
		}
		tankDecor[tank].push({"z":z,"id":random,"x":getRandomInt(-300,300),"y":0,"size":(getRandomInt(8,12)/10),"flip":(getRandomInt(0,1)),"image":tankItems[random].image,"imagef":tankItems[random].imagef});
	}
}
function DecorateAll(){
	for(i = 0; i<aquariums.length;i++){
		DecorateTank(i);
	}
	//window.alert(tankDecor);
}
function DrawTankItems(tank,decorArr,canvas,relSize,xOffset,yOffset){
	var canvas = canvas;
	var ctx = canvas.getContext("2d")
	if(tank == selectedTank){
		itemSlotOver = GetItemAtPos(decorArr,canvas,relSize,xOffset,yOffset);
	}
	for(var i=0;i<decorArr.length;i++){
		var x = decorArr[i].x;
		var y = decorArr[i].y;
		var z = decorArr[i].z;
		var id = decorArr[i].id;
		var size = decorArr[i].size;
		var flip = decorArr[i].flip;
		var imgSlot;
		if(flip == 0){
			imgSlot = GetImageSlot(decorArr[i].image);
		}else{
			imgSlot = GetImageSlot(decorArr[i].imagef);
		}
		var iWidth = (tankImgs[imgSlot].width * relSize)*(z/90+size/2);
		var iHeight = (tankImgs[imgSlot].height * relSize)*(z/90+size/2);
		var sandW = relSize*tankImgs[0].width;
		var sandH = relSize*tankImgs[0].height;
		var topSand = (canvas.height/2)+sandH/4;
		var bottomSand = (canvas.height/2)+sandH/2.8;
		if(tank == selectedTank){
			itemSlotOver = GetItemAtPos(decorArr,canvas,relSize,xOffset,yOffset,topSand);
		}
		//topsand draw
		ctx.beginPath();
		ctx.moveTo(0, topSand);
		ctx.lineTo(10000,topSand);
		//ctx.stroke();
		//bottomsand draw
		ctx.beginPath();
		ctx.moveTo(0, bottomSand);
		ctx.lineTo(10000,bottomSand);
		//ctx.stroke();
		if(movingItemSlot == i && tank == selectedTank){
			ctx.globalAlpha = 0.6;
		}else{
			ctx.globalAlpha = 1;
		}
		ctx.drawImage(tankImgs[imgSlot],(canvas.width/2-tankItems[id].x*(z*(x/-100)/100+size/2)*relSize+x*relSize)-(xOffset/5)*(5-z/10)*relSize,(topSand-tankItems[id].y*(z/100+size/2)*relSize+z*relSize)-((yOffset/25)*(5-z/10)/yMult)*relSize,iWidth,iHeight);
		if((itemSlotOver == i && tank == selectedTank && movingItemSlot == -1) || (movingItemSlot == i && tank == selectedTank)){
			hoverLeft = (canvas.width/2-tankItems[id].x*(z*(x/-100)/100+size/2)*relSize+x*relSize)-(xOffset/5)*(5-z/10)*relSize;
			hoverTop = (topSand-tankItems[id].y*(z/100+size/2)*relSize+z*relSize)-((yOffset/25)*(5-z/10)/yMult)*relSize;
			hoverWidth = iWidth;
			hoverHeight = iHeight;
		}
		ctx.globalAlpha = 1;
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
	DecorateAll();
	preloadTankImages();
	repeat();
}
