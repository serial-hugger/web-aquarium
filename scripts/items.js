//ITEM BANK
var tankItems = [
{"image":"sb0001.png","type":"sandback"},
{"image":"sf0001.png","type":"sandfront"},
{"image":"d0001.png","type":"decor","name":"Sea Weed","x":0,"y":70,"width":62,"height":169,"sway":true},
{"image":"d0002.png","type":"decor","name":"Sea Weed","x":0,"y":50,"width":81,"height":117,"sway":true},
{"image":"d0003.png","type":"decor","name":"Sea Weed","x":0,"y":50,"width":98,"height":110,"sway":true},
{"image":"d0004.png","type":"decor","name":"Chest","x":0,"y":40,"width":148,"height":127},
{"image":"b0001.png","type":"background","name":"Background 1","width":700,"height":350},
{"image":"d0005.png","type":"decor","name":"Rock","x":0,"y":60,"width":140,"height":141},
{"image":"d0006.png","type":"decor","name":"Rock","x":0,"y":40,"width":84,"height":93},
{"image":"f0001.png","type":"fish","name":"Goldfish","x":0,"y":0,"width":84,"height":93},
{"image":"f0002.png","type":"fish","name":"Clownfish","x":0,"y":0,"width":153,"height":128},
{"image":"f0003.png","type":"fish","name":"Betta Fish","x":0,"y":0,"width":126,"height":119},
{"image":"f0004.png","type":"fish","name":"Angelfish","x":0,"y":0,"width":149,"height":154},
{"image":"f0005.png","type":"fish","name":"Neon Tetra","x":0,"y":0,"width":180,"height":117},
{"image":"f0006.png","type":"fish","name":"Pufferfish","x":0,"y":0,"width":181,"height":121}
];
var tankImgs = [];
function preloadTankImages() {
	tankImgs[0] = new Image();
	tankImgs[0].src = "shine1.png";
	tankImgs[1] = new Image();
	tankImgs[1].src = "selected.png";
		var index = 2;
		for (i1 = 0; i1 < tankItems.length; i1++) {
				tankImgs[index] = new Image();
				tankImgs[index].src = tankItems[i1].type + "/" +tankItems[i1].image;
				//window.alert(tankImgs[index].src);
				index += 1;
			//window.alert(tankImgs);
		}
		
	}
function GetImageSlot(imageName){
	if(tankImgs.length > 0){
		for(img = 0; img<tankImgs.length;img++){
			if(tankImgs[img].src.split("/").pop() == imageName){
				return img;
			}
		}
	}
	return 0;
	//window.alert("UH OH");
}
function SetItemInfo(info,type,value){
	for(var i=0;i<info.length;i++){
		var splitted = info[i].split(':');
		if(splitted[0]==type){
			info[i] = null;
			info[i] = type.toString() + ":" + value.toString();
			//window.alert(info[i]);
		}
	}
}
function GetRandomItem(type){
	index = getRandomInt(0,tankItems.length);
	totalSteps = getRandomInt(0,10);
	while(true){
		index ++;
		if(index > tankItems.length-1){
			index = 0;
		}
		if(tankItems[index].type==type){
			totalSteps-=1;
			if(totalSteps <= 0){
				return index;
			}
		}
	}
}
