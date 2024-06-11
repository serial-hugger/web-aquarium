//ITEM BANK
var tankItems = [
{"image":"sb0001.png","type":"sandback","price":null},
{"image":"sf0001.png","type":"sandfront","price":null},
{"image":"d0001.png","type":"decor","name":"Seaweed 1","x":0,"y":70,"width":62,"height":169,"sway":true,"price":3},
{"image":"d0002.png","type":"decor","name":"Seaweed 2","x":0,"y":50,"width":81,"height":117,"sway":true,"price":3},
{"image":"d0003.png","type":"decor","name":"Seaweed 3","x":0,"y":50,"width":98,"height":110,"sway":true,"price":3},
{"image":"d0004.png","type":"decor","name":"Chest","x":0,"y":40,"width":148,"height":127,"price":10},
{"image":"b0001.png","type":"background","name":"Background 1","width":700,"height":350,"price":30},
{"image":"d0005.png","type":"decor","name":"Medium Rock","x":0,"y":60,"width":140,"height":141,"price":5},
{"image":"d0006.png","type":"decor","name":"Small Rock","x":0,"y":40,"width":84,"height":93,"price":3},
{"image":"f0001.png","type":"fish","name":"Goldfish","x":0,"y":0,"width":84,"height":93,"price":25},
{"image":"f0002.png","type":"fish","name":"Clownfish","x":0,"y":0,"width":153,"height":128,"price":30},
{"image":"f0003.png","type":"fish","name":"Betta Fish","x":0,"y":0,"width":126,"height":119,"price":25},
{"image":"f0004.png","type":"fish","name":"Angelfish","x":0,"y":0,"width":149,"height":154,"price":50},
{"image":"f0005.png","type":"fish","name":"Neon Tetra","x":0,"y":0,"width":180,"height":117,"price":40},
{"image":"f0006.png","type":"fish","name":"Pufferfish","x":0,"y":0,"width":181,"height":121,"price":80}
];
var tankImgs = [];
var storage = [];
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
function NewItem(id){
	var type = tankItems[id].type;
	if(type = "decor"){
		return {"z":z,"id":id,"x":getRandomInt(-300,300),"y":0,"size":(getRandomInt(8,12)/10),"flip":(getRandomInt(0,1)),"image":tankItems[id].image};
	}
	if(type = "background"){
		return {"id":id,"image":tankItems[id].image};
	}
	if(type == "fish"){
		return {"z":getRandomInt(0,50),"id":id,"x":getRandomInt(-300,300),"y":getRandomInt(50,250),"size":0.5,"image":tankItems[id].image,"moveX":getRandomInt(-100,100),"moveY":getRandomInt(-50,50),"moveZ":getRandomInt(-10,10),"rotation":360};
	}
}
