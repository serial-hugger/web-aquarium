//ITEM BANK
var tankItems = [
["image:sb0001.png","type:sandback"],
["image:sf0002.png","type:sandfront"],
["image:dp0003.png","imagef:dp0003f.png","name:Sea Weed","x:31","y:155","width:62","height:169"],
["image:dp0004.png","imagef:dp0004f.png","name:Sea Weed","x:40","y:100","width:81","height:117"],
["image:dp0005.png","imagef:dp0005f.png","name:Sea Weed","x:31","y:95","width:98","height:110"],
["image:dp0006.png","imagef:dp0006f.png","name:Chest","x:74","y:90","width:148","height:127"]
];
var tankImgs = [];
function GetImageSlot(imageName){
	if(tankImgs.length > 0){
		for(img = 0; img<tankImgs.length;img++){
			if(tankImgs[img].src.split("/").pop() == imageName){
				return img;
			}
		}
	}
	window.alert("UH OH");
}
function GetItemInfo(info,type){
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
