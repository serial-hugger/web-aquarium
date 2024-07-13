//ITEM BANK
var tankItems = [
{"image":"sb0001.png","type":"sandback","price":null},
{"image":"sf0001.png","type":"sandfront","price":null},
{"image":"d0001.png","type":"decor","name":"Seaweed 1","x":0,"y":70,"width":62,"height":169,"sway":true,"stackable":true,"price":3},
{"image":"d0002.png","type":"decor","name":"Seaweed 2","x":0,"y":50,"width":81,"height":117,"sway":true,"stackable":true,"price":3},
{"image":"d0003.png","type":"decor","name":"Seaweed 3","x":0,"y":50,"width":98,"height":110,"sway":true,"stackable":true,"price":3},
{"image":"d0004.png","type":"decor","name":"Chest","x":0,"y":40,"width":148,"height":127,"stackable":true,"price":10},
{"image":"b0001.png","type":"background","name":"Background 1","width":700,"height":350,"stackable":true,"price":30},
{"image":"d0005.png","type":"decor","name":"Medium Rock","x":0,"y":60,"width":140,"height":141,"stackable":true,"price":5},
{"image":"d0006.png","type":"decor","name":"Small Rock","x":0,"y":40,"width":84,"height":93,"stackable":true,"price":3},
{"image":"f0001.png","type":"fish","name":"Goldfish","x":0,"y":0,"width":84,"height":93,"stackable":false,"price":25},
{"image":"f0002.png","type":"fish","name":"Clownfish","x":0,"y":0,"width":153,"height":128,"stackable":false,"price":30},
{"image":"f0003.png","type":"fish","name":"Betta Fish","x":0,"y":0,"width":126,"height":119,"stackable":false,"price":25},
{"image":"f0004.png","type":"fish","name":"Angelfish","x":0,"y":0,"width":149,"height":154,"stackable":false,"price":50},
{"image":"f0005.png","type":"fish","name":"Neon Tetra","x":0,"y":0,"width":180,"height":117,"stackable":false,"price":40},
{"image":"f0006.png","type":"fish","name":"Pufferfish","x":0,"y":0,"width":181,"height":121,"stackable":false,"price":80}
];
var maleFishNames = [
	"Seavenger",
	"Finster",
	"Reefinator",
	"Ray",
	"Thunder",
	"Gill",
	"Nemo",
	"Flipper",
	"Finley",
	"Jeff",
	"Marlin",
	"Flounder"
];
var femaleFishNames = [
	"Elara",
	"Dashelle",
	"Dory",
	"Goldie",
	"Ariel",
	"Celeste",
	"Deanne",
	"Debbie",
	"Angel",
	"Luna",
	"Ava",
	"Isla"
];
var tankImgs = [];
var storage = [];
var showingTankStorage = false;
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
	if(type == "decor"){
		return {"z":getRandomInt(0,50),"id":id,"x":getRandomInt(-300,300),"y":0,"size":(getRandomInt(8,12)/10),"flip":(getRandomInt(0,1))};
	}
	if(type == "background"){
		return {"id":id,"image":tankItems[id].image};
	}
	if(type == "fish"){
		var x;
		var gender = getRandomInt(0,1);
		var genderName;
		if(gender){
			genderName = "female";
		}else{
			genderName = "male";
		}
		var randomName;
		if(gender){
			randomName = femaleFishNames[getRandomInt(0,femaleFishNames.length-1)];
		}else{
			randomName = maleFishNames[getRandomInt(0,maleFishNames.length-1)];
		}
		var name=prompt("Name your new "+genderName+" fish!",randomName);
		if (name==null){
			name = randomName;
	   }
		return {"z":getRandomInt(0,50),"id":id,"x":getRandomInt(-300,300),"y":getRandomInt(50,250),"size":0.5,"moveX":getRandomInt(-100,100),"moveY":getRandomInt(-50,50),"moveZ":getRandomInt(-10,10),"rotation":360,"name":name,"gender":gender};
	}
}
function CreateStorageItems(startIndex){
	var storageContainer = document.getElementById("storage-container");
	storageContainer.innerHTML = '';
	var index = 0;
	var array;
	if(!showingTankStorage){
		array = storage;
	}else{
		array = tankContent[selectedTank];
	}
	for(var i = 0; i< array.length;i++){
		if(true){
			var item = document.createElement("div");
			var html = "";
			var additionalText = "";
			if(array[i].gender==0){
				additionalText += " ♂ ";
			}
			if(array[i].gender==1){
				additionalText += " ♀ ";
			}
			if(!showingTankStorage){
				if(tankItems[array[i].id].stackable){
					additionalText += " (" + array[i].qty+")";
				}
				if(tankItems[array[i].id].type == "fish" && array[i].name!=null){
					additionalText += "<br>(" + array[i].name+")";
				}
			}else{
				if(tankItems[array[i].id].type == "fish"){
					additionalText += "<br>(" + array[i].name+")";
				}
			}
			html += "<div class=\"storage-item-img-with-text\"><img src="+tankItems[array[i].id].type + "/" + tankItems[array[i].id].image + " alt=\"SHOP\"></img><p><b>"+tankItems[array[i].id].name + additionalText + "</b></p><br><select name='options' class = 'item-options' onchange='StorageItemAction(this.value,"+i+");'>";
			html += "<option class='hidden_option' value='action'>Action</option>";
			if(tankItems[array[i].id].type == "decor"){
				if(!showingTankStorage){
					html += "<option value='place'>Place in tank</option>";
				}else{
					html += "<option value='storage'>Put in storage</option>";
				}
			}
			if(tankItems[array[i].id].type == "fish"){
				if(!showingTankStorage){
					html += "<option value='place'>Inhabit tank</option>";
				}else{
					html += "<option value='storage'>Put in storage</option>";
				}
			}
			if(tankItems[array[i].id].qty>1){
				html += "<option value='sell1'>Sell 1 ($"+Math.ceil(tankItems[array[i].id].price*0.5)+")</option>";
				html += "<option value='sellall'>Sell all ($"+(Math.ceil(tankItems[array[i].id].price*tankItems[array[i].id].qty)*0.5)+")</option>";
			}else{
				html += "<option value='sell1'>Sell ($"+Math.ceil(tankItems[array[i].id].price*0.5)+")</option>";
			}
			html += "</select> </div>";
			item.innerHTML = html;
			storageContainer.appendChild(item);
		}
	}
	UpdateElements();
}
function StorageItemAction(value,itemIndex){
	if(value == "place"){
		PlaceItemInTank(selectedTank,storage[itemIndex]);
		//AddItemToTank(selectedTank,storage[itemIndex]);
		//RemoveItemFromStorage(itemIndex);
	}
	if(value == "storage"){
		AddItemToStorage(tankContent[selectedTank][itemIndex],1);
		RemoveItemFromTank(selectedTank,itemIndex);
	}
	if(value == "sell1"){
		if(!showingTankStorage){
			ChangeAccountMoney(Math.ceil(tankItems[storage[itemIndex].id].price*0.5));
		}else{
			ChangeAccountMoney(Math.ceil(tankItems[tankContent[selectedTank][itemIndex].id].price*0.5));
		}
		if(!showingTankStorage){
			RemoveItemFromStorage(itemIndex);
		}else{
			RemoveItemFromTank(selectedTank,itemIndex);
		}
	}
	CreateStorageItems(0);
}
function AddItemToStorage(item,amt){
	if(tankItems[item.id].stackable){
		for(var i = 0; i < storage.length;i++){
			if(storage[i].id == item.id){
				storage[i].qty += amt;
				return;
			}
		}
		item.qty = 1;
		storage.push(item);
		return;
	}else{
		for(var i = 0; i < amt;i++){
			storage.push(item);
		}
	}
}
function RemoveItemFromStorage(itemIndex){
	if(storage[itemIndex].qty!=null){
		if(storage[itemIndex].qty>0){
			storage[itemIndex].qty -= 1;
		}
	}else{
		storage.splice(itemIndex,1);
	}
	//Remove items if qty is 0
	var filtered = storage.filter(function(item) { 
		return item.qty != 0;  
	 });
	 storage = filtered;
}
function InitializeStorage(){
	storage = [];
			//Retrieve storage info
			fetch('account_functions/get_account_storage.php',{
				"method":"GET"
			}).then(function(response){
				return response.text();
			}).then(function(data){
				storage = JSON.parse(data);
			})
}
function UpdateStorage(){
	let info = {"storage":JSON.stringify(storage)};
	//Check if tank exists
	fetch('account_functions/set_account_storage.php',{
		"method":"POST",
		"body": JSON.stringify(info)
	}).then(function(response){
		return response.text();
	}).then(function(data){
	})
}
function ChangeStorageView(tankStorage){
	showingTankStorage = tankStorage;
	CreateStorageItems();
}
