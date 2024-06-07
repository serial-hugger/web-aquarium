//ITEM BANK
var tankItems = [
{"image":"sb0001.png","type":"sandback"},
{"image":"sf0002.png","type":"sandfront"},
{"image":"dp0003.png","type":"decor","name":"Sea Weed","x":0,"y":70,"width":62,"height":169},
{"image":"dp0004.png","type":"decor","name":"Sea Weed","x":0,"y":50,"width":81,"height":117},
{"image":"dp0005.png","type":"decor","name":"Sea Weed","x":0,"y":50,"width":98,"height":110},
{"image":"dp0006.png","type":"decor","name":"Chest","x":0,"y":40,"width":148,"height":127},
{"image":"bg0001.png","type":"background","name":"Background 1","width":700,"height":350}
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
				tankImgs[index].src = tankItems[i1].image;
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
