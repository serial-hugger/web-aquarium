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
	var currentDecor = [];
	tankDecor[tank] = [];
	for(z=0;z<50;z+=getRandomInt(2,3)){
		var random;
		if(getRandomInt(0,100)<90){
			random = getRandomInt(2,4);
		}else{
			random = 5;
		}
		currentDecor.push("z:"+z.toString());
		currentDecor.push("id:"+random.toString());
		currentDecor.push("x:"+getRandomInt(-300,300).toString());
		currentDecor.push("y:0");
		currentDecor.push("size:"+(getRandomInt(8,12)/10).toString());
		currentDecor.push("flip:"+(getRandomInt(0,1)).toString());
		tankDecor[tank].push(currentDecor);
		currentDecor = [];
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
		var x = GetItemInfo(decorArr[i],"x");
		var y = GetItemInfo(decorArr[i],"y");
		var z = GetItemInfo(decorArr[i],"z");
		var id = GetItemInfo(decorArr[i],"id");
		var size = GetItemInfo(decorArr[i],"size");
		var flip = GetItemInfo(decorArr[i],"flip");
		var imgSlot;
		if(flip == 0){
			imgSlot = GetImageSlot(GetItemInfo(tankItems[parseInt(id)],"image"));
		}else{
			imgSlot = GetImageSlot(GetItemInfo(tankItems[parseInt(id)],"imagef"));
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
		ctx.drawImage(tankImgs[imgSlot],GetItemXPos(x,y,size,relSize,xOffset,canvas.width,id),GetItemYPos(x,y,size,relSize,yOffset,topSand,id),iWidth,iHeight);
		if((itemSlotOver == i && tank == selectedTank && movingItemSlot == -1) || (movingItemSlot == i && tank == selectedTank)){
			hoverLeft = (canvas.width/2-GetItemInfo(tankItems[id],"x")*(z*(x/-100)/100+size/2)*relSize+x*relSize)-(xOffset/5)*(5-z/10)*relSize;
			hoverTop = (topSand-GetItemInfo(tankItems[id],"y")*(z/100+size/2)*relSize+z*relSize)-((yOffset/25)*(5-z/10)/yMult)*relSize;
			hoverWidth = iWidth;
			hoverHeight = iHeight;
		}
		ctx.globalAlpha = 1;
	}
}
function GetItemXPos(x,z,size,relSize,xOffset,canvasWidth,id){
	return (canvasWidth/2-GetItemInfo(tankItems[id],"x"));
}
function GetItemYPos(x,z,size,relSize,yOffset,topSand,id){
	return (topSand-GetItemInfo(tankItems[id],"y")*(z/100+size/2)*relSize+z*relSize)-((yOffset/25)*(5-z/10)/yMult)*relSize;
}
function GetItemAtPos(decorArr,canvas,relSize,xOffset,yOffset,topSand){
	var currentSel = -1;
	for(var i = 0;i<decorArr.length;i++){
		var x = GetItemInfo(decorArr[i],"x");
		var y = GetItemInfo(decorArr[i],"y");
		var z = GetItemInfo(decorArr[i],"z");
		var id = GetItemInfo(decorArr[i],"id");
		var size = GetItemInfo(decorArr[i],"size");
		var left = (canvas.width/2-GetItemInfo(tankItems[id],"x")*(z*(x/-100)/100+size/2)*relSize+x*relSize)-(xOffset/5)*(5-z/10)*relSize;
		var top = (topSand-GetItemInfo(tankItems[id],"y")*(z/100+size/2)*relSize+z*relSize)-((yOffset/25)*(5-z/10)/yMult)*relSize;
		var flip = GetItemInfo(decorArr[i],"flip");
		var imgSlot;
		if(flip == 0){
			imgSlot = GetImageSlot(GetItemInfo(tankItems[parseInt(id)],"image"));
		}else{
			imgSlot = GetImageSlot(GetItemInfo(tankItems[parseInt(id)],"imagef"));
		}
		var iWidth = (tankImgs[imgSlot].width * relSize)*(z/100+size/2);
		var iHeight = (tankImgs[imgSlot].height * relSize)*(z/100+size/2);
		if(mouseX > left && mouseX < left + iWidth && mouseY > top && mouseY < top + iHeight){
			currentSel = i;
		}
	}
	return currentSel;
}
function GetTankItemInfo(info,type){
	var infoList = [];
	for(var i=0;i<info.length;i++){
		var splitted = info[i].split(':');
		if(splitted[0]==type){
			infoList.push(splitted[1]);
			//window.alert(splitted[1]);
		}
	}
	return infoList;
}
function SetTankInfo(info,type,value){
	for(var i=0;i<info.length;i++){
		var splitted = info[i].split(':');
		if(splitted[0]==type){
			info[i] = null;
			info[i] = type.toString() + ":" + value.toString();
			//window.alert(info[i]);
		}
	}
}
function sortFunction(a,b)
{
	return parseInt(a[0].replace(/\D/g,'')) - parseInt(b[0].replace(/\D/g,''));
}
function preloadTankImages() {
tankImgs[0] = new Image();
tankImgs[0].src = "shine1.png";
tankImgs[1] = new Image();
tankImgs[1].src = "selected.png";
	var index = 2;
	for (i1 = 0; i1 < tankItems.length; i1++) {
		var imgNames = GetItemInfo(tankItems[i1],"image");
		for(i2=0;i2<imgNames.length;i2++){
			tankImgs[index] = new Image();
			tankImgs[index].src = imgNames[i2];
			index += 1;
		}
		imgNames = GetItemInfo(tankItems[i1],"imagef");
		for(i2=0;i2<imgNames.length;i2++){
			tankImgs[index] = new Image();
			tankImgs[index].src = imgNames[i2];
			index += 1;
		}
		//window.alert(tankImgs);
	}
	
}