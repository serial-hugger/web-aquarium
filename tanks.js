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
		tankDecor[tank].push({"z":z,"id":random,"x":getRandomInt(-300,300),"y":0,"size":(getRandomInt(8,12)/10),"flip":(getRandomInt(0,1)),"image":tankItems[random].image});
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
	var ctx = canvas.getContext("2d");
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
		imgSlot = GetImageSlot(decorArr[i].image);
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
		//x = -400 - 400 z = 0 - 50
		//drawImageRot(ctx,tankImgs[imgSlot],(canvas.width/2-tankItems[id].x*(z*(x/100)/100+size/2)*relSize+x*relSize)-(xOffset/5)*(5-z/10)*relSize,(topSand-tankItems[id].y*(z/100+size/2)*relSize+z*relSize)-((yOffset/25)*(5-z/10)/yMult)*relSize,iWidth,iHeight,0,flip,false);
		var percentOfSize = iWidth / tankItems[id].width;

		var xCenter = tankItems[id].x;
		var yCenter = tankItems[id].y;

		var xDraw = ((canvas.width/2)  +                      ((x*1)*(1+(z*0.007)))*relSize     -        (xOffset/5)*relSize);//*(5-z/10)*relSize;
		var yDraw = canvas.height - (150*relSize)  - (y * relSize) -    ((z*0.06)*relSize)                -      (((((yOffset+500))/5)*((z-25)*0.01)*relSize)*-1)  + (z*1.8)*relSize;

		drawImageRot(ctx,tankImgs[imgSlot],xDraw+(tankItems[id].x*percentOfSize*relSize),yDraw-(tankItems[id].y*percentOfSize*relSize),iWidth,iHeight,0,flip,false);
		ctx.fillStyle = "red";
		ctx.translate(0, 0);
		ctx.fillRect(xDraw, yDraw, 5*relSize, 5*relSize);

		if((itemSlotOver == i && tank == selectedTank && movingItemSlot == -1) || (movingItemSlot == i && tank == selectedTank)){
			hoverLeft = xDraw;
			hoverTop = yDraw;
			hoverWidth = iWidth;
			hoverHeight = iHeight;
		}
		ctx.globalAlpha = 1;
	}
}
function drawImageRot(ctx,img,x,y,width,height,deg,flipX,flipY){
    // Store the current context state (i.e. rotation, translation etc..)
    ctx.save()

    //Convert degrees to radian 
    var rad = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x, y);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

	var xScale = 1;
	var yScale = 1;
	if(flipX){
		xScale = -1;
	}
	if(flipY){
		yScale = -1;
	}
	ctx.scale(xScale,yScale);

    //draw the image    
    ctx.drawImage(img,width/2*(-1),height/2* (-1),width,height);

    // Restore canvas state as saved from above
    ctx.restore();
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
