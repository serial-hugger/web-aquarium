function repeat(){
	setInterval(function(){
	UpdateCursor();
	cursor = 0;
	if(movingItemSlot == -1){
		tankDecor[selectedTank].sort(function(a,b){
			return parseFloat(a.z) - parseFloat(b.z);
		});
	}
	//Window size details
	var width = document.body.clientWidth;

	var height = document.body.clientHeight;
	for(i = 0; i < aquariums.length; i++){
		if(i != selectedTank){
			var canvas = aquariums[i];
			var ctx = canvas.getContext("2d");
		}else{
			var canvas = document.getElementById("selectedaquarium");
			var ctx = canvas.getContext("2d");
			var selected = aquariums[i].getContext("2d");
			selected.fillStyle = "#3d3d3d";
			selected.fillRect(0,0,selected.canvas.width,selected.canvas.height);
			selected.drawImage(tankImgs[1],0,0,selected.canvas.width ,selected.canvas.height);
		}
		var bgWidth = canvas.width * .75;
		var bgHeight = canvas.height * .75;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 1;
		ctx.fillStyle = "#70adb3";
		ctx.strokeStyle = "#25393b";
		var c = canvas.getBoundingClientRect();
		
		var xOffset = ((c.left + canvas.width/2) - (width/2))/5;
		var yOffset = ((c.top + canvas.height/2) - (height/2))/5;
		
		var scroller = document.getElementById("aquariums");
		
		var relativeSizing = (canvas.width / 1024);
		
		var grd = ctx.createLinearGradient(-800*relativeSizing, 800*relativeSizing, 800*relativeSizing, -800*relativeSizing);
		grd.addColorStop(0, "#2b2b2b");
		grd.addColorStop(.1, "#ababab");
		grd.addColorStop(1, "#2b2b2b");
		ctx.fillStyle = grd;
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = "#3b3b3b";
		ctx.drawImage(tankImgs[8],(canvas.width/2-bgWidth/2)-xOffset*relativeSizing,(canvas.height/2-bgHeight/2)-(((yOffset+500)/5)/yMult)*relativeSizing,bgWidth,bgHeight);
		//ctx.fillRect((canvas.width/2-bgWidth/2)-xOffset*relativeSizing,(canvas.height/2-bgHeight/2)-(((yOffset+200)/5)/yMult)*relativeSizing,bgWidth,bgHeight);
		ctx.strokeRect((canvas.width/2-bgWidth/2)-xOffset*relativeSizing,(canvas.height/2-bgHeight/2)-(((yOffset+500)/5)/yMult)*relativeSizing,bgWidth,bgHeight);
		
		//topleft tank
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo((canvas.width/2-bgWidth/2)-xOffset*relativeSizing,(canvas.height/2-bgHeight/2)-(((yOffset+500)/5)/yMult)*relativeSizing);
		ctx.stroke();
		
		//topright tank
		ctx.beginPath();
		ctx.moveTo(canvas.width, 0);
		ctx.lineTo((canvas.width/2+bgWidth/2)-xOffset*relativeSizing,(canvas.height/2-bgHeight/2)-(((yOffset+500)/5)/yMult)*relativeSizing);
		ctx.stroke();
		
		//bottomleft tank
		ctx.beginPath();
		ctx.moveTo(0, canvas.height);
		ctx.lineTo((canvas.width/2-bgWidth/2)-xOffset*relativeSizing,(canvas.height/2+bgHeight/2)-(((yOffset+500)/5)/yMult)*relativeSizing);
		ctx.stroke();
		
		//bottomright tank
		ctx.beginPath();
		ctx.moveTo(canvas.width, canvas.height);
		ctx.lineTo((canvas.width/2+bgWidth/2)-xOffset*relativeSizing,(canvas.height/2+bgHeight/2)-(((yOffset+500)/5)/yMult)*relativeSizing);
		ctx.stroke();
		
		var sandW = relativeSizing*tankImgs[2].width;
		var sandH = relativeSizing*tankImgs[2].height;
		var sandFW = relativeSizing*tankImgs[3].width;
		var sandFH = relativeSizing*tankImgs[3].height;
		
		ctx.drawImage(tankImgs[GetImageSlot("sb0001.png")],(canvas.width/2-sandW/2)-xOffset*relativeSizing,(canvas.height/2-sandH/2.5)-(((yOffset+500)/5)/yMult)*(relativeSizing),sandW,sandH);
		DrawTankItems(i,tankDecor[i],canvas,relativeSizing,xOffset,yOffset);
		ctx.drawImage(tankImgs[GetImageSlot("sf0001.png")],0,-5*relativeSizing,canvas.width ,sandFH);
		ctx.drawImage(tankImgs[GetImageSlot("shine1.png")],0,0,canvas.width ,canvas.height);
		ctx.strokeStyle = "#25393b";
		ctx.lineWidth = 3;
		if(movingItemSlot == -1){
			ctx.globalAlpha = 0.6;
		}else{
			ctx.globalAlpha = 1;
		}

		
		ctx.strokeRect(hoverLeft,hoverTop,hoverWidth,hoverHeight);
		ctx.globalAlpha = 1;
		hoverTop = -1000;
		hoverLeft = -1000;
		if(itemSlotOver != -1 || overTank){
			cursor = 1;
		}
		if(movingItemSlot != -1){
			cursor = 2;
		}
	}
	if(mousePrevY != mouseY || mousePrevX != mouseX){
		if(movingItemSlot >= 0){
			var x = parseInt(tankDecor[selectedTank][movingItemSlot].x) + (mouseX-mousePrevX)*1.1;
			var z = parseInt(tankDecor[selectedTank][movingItemSlot].z) + (mouseY-mousePrevY)*1.1;
			var width = tankItems[tankDecor[selectedTank][movingItemSlot].id].width/2;
			

			if(x>400-width){
				x = 400-width;
			}
			if(x<-400+width){
				x = -400+width;
			}
			if(z>50){
				z = 50;
			}
			if(z<0){
				z = 0;
			}
			tankDecor[selectedTank][movingItemSlot].x = x;
			tankDecor[selectedTank][movingItemSlot].z = z;
		}
		mousePrevY = mouseY;
		mousePrevX = mouseX;
	}
	},30);
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

		var xDraw = ((canvas.width/2)  +                      ((x*1)*(1+(z*0.007)))*relSize     -        ((xOffset/5)*((50-z)*0.1))*relSize);//*(5-z/10)*relSize;
		var yDraw = canvas.height -  ((1 - relSize)*5)  - (150*relSize)  - (y * relSize) -    ((z*0.06)*relSize)                -      (((((yOffset+500))/5)*((z-25)*0.01)*relSize)*-1)  + (z*1.8)*relSize;
		drawImageRot(ctx,tankImgs[imgSlot],xDraw+(tankItems[id].x*percentOfSize*relSize),yDraw-(tankItems[id].y*percentOfSize*relSize),iWidth,iHeight,0,flip,false);
		ctx.fillStyle = "red";
		ctx.translate(0, 0);
		//DEBUG ORIGIN POINT
		//ctx.fillRect(xDraw, yDraw, 5*relSize, 5*relSize);

		if((itemSlotOver == i && tank == selectedTank && movingItemSlot == -1) || (movingItemSlot == i && tank == selectedTank)){
			hoverLeft = (xDraw-iWidth/2) +(tankItems[id].x*percentOfSize*relSize);
			hoverTop = (yDraw-iHeight/2)-(tankItems[id].y*percentOfSize*relSize);
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