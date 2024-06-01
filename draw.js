function repeat(){
	setInterval(function(){
	UpdateCursor();
	cursor = 0;
	if(movingItemSlot == -1){
		tankDecor[selectedTank].sort(sortFunction);
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
		
		var relativeSizing = (canvas.width / 1000);
		
		var grd = ctx.createLinearGradient(-800, 800, 800, -800);
		grd.addColorStop(0, "#8ad4db");
		grd.addColorStop(.1, "#25393b");
		grd.addColorStop(1, "#8ad4db");
		ctx.fillStyle = grd;
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = "#487378";
		ctx.fillRect((canvas.width/2-bgWidth/2)-xOffset*relativeSizing,(canvas.height/2-bgHeight/2)-((yOffset/5)/yMult)*relativeSizing,bgWidth,bgHeight);
		ctx.strokeRect((canvas.width/2-bgWidth/2)-xOffset*relativeSizing,(canvas.height/2-bgHeight/2)-((yOffset/5)/yMult)*relativeSizing,bgWidth,bgHeight);
		
		//topleft tank
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo((canvas.width/2-bgWidth/2)-xOffset*relativeSizing,(canvas.height/2-bgHeight/2)-((yOffset/5)/yMult)*relativeSizing);
		ctx.stroke();
		
		//topright tank
		ctx.beginPath();
		ctx.moveTo(canvas.width, 0);
		ctx.lineTo((canvas.width/2+bgWidth/2)-xOffset*relativeSizing,(canvas.height/2-bgHeight/2)-((yOffset/5)/yMult)*relativeSizing);
		ctx.stroke();
		
		//bottomleft tank
		ctx.beginPath();
		ctx.moveTo(0, canvas.height);
		ctx.lineTo((canvas.width/2-bgWidth/2)-xOffset*relativeSizing,(canvas.height/2+bgHeight/2)-((yOffset/5)/yMult)*relativeSizing);
		ctx.stroke();
		
		//bottomright tank
		ctx.beginPath();
		ctx.moveTo(canvas.width, canvas.height);
		ctx.lineTo((canvas.width/2+bgWidth/2)-xOffset*relativeSizing,(canvas.height/2+bgHeight/2)-((yOffset/5)/yMult)*relativeSizing);
		ctx.stroke();
		
		var sandW = relativeSizing*tankImgs[2].width;
		var sandH = relativeSizing*tankImgs[2].height;
		var sandFW = relativeSizing*tankImgs[3].width;
		var sandFH = relativeSizing*tankImgs[3].height;
		
		ctx.drawImage(tankImgs[GetImageSlot("sb0001.png")],(canvas.width/2-sandW/2)-xOffset*relativeSizing,(canvas.height/2-sandH/2.5)-((yOffset/5)/yMult)*(relativeSizing),sandW,sandH);
		DrawTankItems(i,tankDecor[i],canvas,relativeSizing,xOffset,yOffset);
		ctx.drawImage(tankImgs[GetImageSlot("sf0002.png")],0,0,canvas.width ,sandFH);
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
			var x = parseInt(GetItemInfo(tankDecor[selectedTank][movingItemSlot],"x")) + (mouseX-mousePrevX)*1.1;
			var z = parseInt(GetItemInfo(tankDecor[selectedTank][movingItemSlot],"z")) + (mouseY-mousePrevY)*1.1;
			var width = GetItemInfo(tankItems[GetItemInfo(tankDecor[selectedTank][movingItemSlot],"id")],"width")/2;
			

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
			//window.alert("x:" + (mouseX-mousePrevX) + " z:" + (mouseY-mousePrevY));
			SetItemInfo(tankDecor[selectedTank][movingItemSlot],"x",x);
			SetItemInfo(tankDecor[selectedTank][movingItemSlot],"z",z);
		}
		mousePrevY = mouseY;
		mousePrevX = mouseX;
	}
	},30);
}