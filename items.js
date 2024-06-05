//ITEM BANK
var tankItems = [
{"image":"sb0001.png","imagef":null,"type":"sandback"},
{"image":"sf0002.png","imagef":null,"type":"sandfront"},
{"image":"dp0003.png","imagef":"dp0003f.png","type":"decor","name":"Sea Weed","x":31,"y":155,"width":62,"height":169},
{"image":"dp0004.png","imagef":"dp0004f.png","type":"decor","name":"Sea Weed","x":40,"y":100,"width":81,"height":117},
{"image":"dp0005.png","imagef":"dp0005f.png","type":"decor","name":"Sea Weed","x":31,"y":95,"width":98,"height":110},
{"image":"dp0006.png","imagef":"dp0006f.png","type":"decor","name":"Chest","x":74,"y":90,"width":148,"height":127}
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
				if(tankItems[i1].imagef != null){
					tankImgs[index] = new Image();
					tankImgs[index].src = tankItems[i1].imagef;
					index += 1;
				}
			//window.alert(tankImgs);
		}
		
	}
function GetImageSlot(imageName){
	window.alert(imageName);
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
