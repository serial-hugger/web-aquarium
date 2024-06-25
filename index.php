<?php
session_start();
require("connection.php");
require("functions.php");
	$user_data = check_login($con);
	$_SESSION;
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<title>Webquarium</title>
	<link rel="icon" type="image/x-icon" href="favicon.ico">
</head>

<body>
	<style>
		table {
			font-family: arial, sans-serif;
			border-collapse: collapse;
			margin: auto;
			width: 75vw;
		}

		td,
		th {
			border: 1px solid #dddddd;
			text-align: left;
			padding: 8px;
			width: 75vw;
		}

		tr:nth-child(even) {
			background-color: #dddddd;
		}

		tr:last-child {
			background-color: #8fc781;
		}

		body {
			/*background: #005881;*/
			background-size: 65vw 65vw, 20vw 20vw;
			background-image: url('paper.png'), url('paperbg.png');
			background-repeat: repeat-y, repeat;
			background-position: center;
			margin: 0;
			margin-bottom: 8px;
			padding: 0;
		}

		.shop-grid-container {
			padding: 1vw;
			margin: auto;
			display: grid;
			justify-content: space-evenly;
			grid-template-columns: auto auto auto auto auto;
			width: 10vw;
			height: 20vw;
			gap: 2vw;
		}

		.shop-grid-container>div {
			background-color: rgba(255, 255, 255, 0.8);
			border: 0.2vw solid black;
			text-align: center;
			font-size: 30px;
			width: 16vw;
			height: 18vw;
		}

		.storage-grid-container {
			padding: 1vw;
			margin: auto;
			display: grid;
			justify-content: space-evenly;
			grid-template-columns: auto auto auto auto;
			width: 7vw;
			height: 20vw;
			gap: 2vw;
		}

		.storage-grid-container>div {
			background-color: rgba(255, 255, 255, 0.8);
			border: 0.2vw solid black;
			text-align: center;
			font-size: 30px;
			width: 12vw;
			height: 14vw;
		}

		.noSelect {
			-webkit-tap-highlight-color: transparent;
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}

		.noSelect:focus {
			outline: none !important;
		}

		.container {
			width: 60vw;
			height: 30vw;
			margin: auto;
		}

		.aquariumlist {
			margin: auto;
			width: 60vw;
			height: 123px;
			display: flex;
			overflow-x: scroll;
			overflow-y: none;
			background: #000000;
		}

		.menubanner {
			margin: auto;
			padding: 0;
			width: 100vw;
			height: 100px;
			display: flex;
			overflow-x: none;
			overflow-y: none;
			background-image: url('paperlight.png');
			background-size: 20vw 20vw;
		}

		.sticky-div {
			z-index: 10;
			position: sticky;
			top: 0px;
		}

		.start {
			height: 100px;
		}

		.end {
			height: 5000px;
		}

		.shoptoolbar {
			position: sticky;
			z-index: 10;
			padding: 0;
			width: 100vw;
			height: 25px;
			display: none;
			overflow-x: none;
			overflow-y: none;
			background: #fafafa;
			border-style: ridge ridge ridge ridge;
		}

		.shoptoolbar p {
			margin: 3px;
			padding: 0;
			font-size: 100%;
			height: 100%;
			text-align: center;
			vertical-align: text-bottom;
		}

		.shoptoolbar a {
			margin: 3px;
			padding: 0;
			font-size: 100%;
			height: 100%;
			text-align: center;
			vertical-align: text-bottom;
		}

		.shoptoolbar input {
			height: 20px;
			width: 100px;
			margin: 3px;
			;
		}

		.shoptoolbar button {
			height: 20px;
			margin: 3px;
		}

		.img-with-text {
			margin: 0;
			padding: 0;
			text-align: center;
			width: 60;
			font-size: 10px;
		}

		.img-with-text img {
			margin: 0;
			padding: 0;
		}
		
		/*SHOP ITEM CARDS*/

		.shop-item-img-with-text {
			position: relative;
			margin: auto;
			width: 16vw;
			height: 18vw;
		}

		.shop-item-img-with-text p {
			margin: 0;
			padding: 0;
			font-size: 1vw;
			height: 2vw;
			text-align: center;
			line-height: 1.2em;
			vertical-align: text-top;
		}

		.shop-item-img-with-text img {
			width: 8vw;
			height: 8vw;
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
		}

		.shop-item-img-with-text button {
			width: 10vw;
			height: 2vw;
			position: absolute;
			left: 3vw;
			bottom: 1vw;
			font-size: 1vw;
			text-align: center;
		}

		/*STORAGE ITEM CARDS*/

		.storage-item-img-with-text {
			position: relative;
			margin: auto;
			width: 12vw;
			height: 14vw;
		}

		.storage-item-img-with-text p {
			margin: 0;
			padding: 0;
			font-size: 1vw;
			height: 1vw;
			text-align: center;
			line-height: 1.2em;
			vertical-align: text-top;
		}

		.storage-item-img-with-text img {
			width: 6vw;
			height: 6vw;
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
		}
		.storage-item-img-with-text label {
			width: 8vw;
			height: 2vw;
			position: absolute;
			left: 2vw;
			bottom: 1vw;
			font-size: 1vw;
			text-align: center;
		}

		.storage-item-img-with-text button {
			width: 90%;
			height: 2vw;
			position: absolute;
			left: 5%;
			bottom: 1vw;
			font-size: 1vw;
			text-align: center;
		}
		.item-options {
			width: 60%;
			height: 15%;
			position: absolute;
			left: 20%;
			bottom: 10%;
			font-size: 1vw;
			text-align: center;
		}

		img:hover {
			cursor: pointer;
		}
		select > option.hidden_option{
    		display: none;
		}
	</style>
	<div class="menubanner" id="menu"></div>
	<div class="sticky-div">
		<div class="shoptoolbar" id="shoptoolbar1">
			<hr>
			</hr>
			<input type="search" id="itemsearch" name="itemsearch" height="5px">
			<button>Find</button>
			<hr>
			</hr>
			<button><</button>
					<p>Pg.1</p>
					<button>></button>
					<hr>
					</hr>
					<p id=shop-balance>Bal: $0</p>
					<hr>
					</hr>
					<a id=viewcart href="javascript:GoToCheckout();">Cart (0)</a>
					<hr>
					</hr>
		</div>
		<div class="shoptoolbar" id="shoptoolbar2" style="background: #dadada" position="relative">
			<hr>
			</hr>
			<a href="javascript:ShowOld(2367, 146986, 2);">New</a>
			<a href="javascript:ShowOld(2367, 146986, 2);">Event</a>
			<a href="javascript:ShowOld(2367, 146986, 2);">Sale</a>
			<a href="javascript:ShowOld(2367, 146986, 2);">Fish</a>
			<a href="javascript:ShowOld(2367, 146986, 2);">Decor</a>
			<a href="javascript:ShowOld(2367, 146986, 2);">Backgrounds</a>
			<a href="javascript:ShowOld(2367, 146986, 2);">Floors</a>
			<hr>
			</hr>
		</div>
	</div>
	<div class="aquariumlist" id="aquariums"></div>
	<div class="container noSelect" id="container">
		<canvas class="noSelect" id="selectedaquarium"
			style="margin:auto auto auto auto;display: flex;z-index:0"></canvas>
	</div>
			<script src = "scripts/items.js"></script>
			<script src = "scripts/tanks.js"></script>
			<script src = "scripts/interaction.js"></script>
			<script src = "scripts/update.js"></script>
			<script src = "scripts/shop.js"></script>
	<script>
		//1 is fastest game speed, higher numbers lower frame rate
		var gameSpeed = 1;
		// left: 37, up: 38, right: 39, down: 40,
		// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
		var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };



		function preventDefault(e) {
			e.preventDefault();
		}

		function preventDefaultForScrollKeys(e) {
			if (keys[e.keyCode]) {
				preventDefault(e);
				return false;
			}
		}

		// modern Chrome requires { passive: false } when adding event
		var supportsPassive = false;
		try {
			window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
				get: function () { supportsPassive = true; }
			}));
		} catch (e) { }

		var wheelOpt = supportsPassive ? { passive: false } : false;
		var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

		// call this to Disable
		function disableScroll() {
			window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
			window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
			window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
			window.addEventListener('keydown', preventDefaultForScrollKeys, false);
		}

		// call this to Enable
		function enableScroll() {
			window.removeEventListener('DOMMouseScroll', preventDefault, false);
			window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
			window.removeEventListener('touchmove', preventDefault, wheelOpt);
			window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
		}

		var mode = "default";

		function GetItemAtPos(decorArr, canvas, relSize, xOffset, yOffset, topSand) {
			var currentSel = -1;
			for (var i = 0; i < decorArr.length; i++) {
				if (tankItems[decorArr[i].id].type == "decor") {
					var x = decorArr[i].x;
					var y = decorArr[i].y;
					var z = decorArr[i].z;
					var id = decorArr[i].id;
					var size = decorArr[i].size;
					var flip = decorArr[i].flip;
					var imgSlot = GetImageSlot(tankItems[decorArr[i].id].image);
					var iWidth = (tankImgs[imgSlot].width * relSize) * (z / 100 + size / 2);
					var iHeight = (tankImgs[imgSlot].height * relSize) * (z / 100 + size / 2);

					var percentOfSize = iWidth / tankItems[id].width;

					var xDraw = ((canvas.width / 2) + ((x * 1) * (1 + (z * 0.007))) * relSize - ((xOffset / 5) * ((50 - z) * 0.1)) * relSize);//*(5-z/10)*relSize;
					var yDraw = canvas.height - (150 * relSize) - (y * relSize) - ((z * 0.06) * relSize) - (((((yOffset + 500)) / 5) * ((z - 25) * 0.01) * relSize) * -1) + (z * 1.8) * relSize;

					var left = (xDraw - iWidth / 2) + (tankItems[id].x * percentOfSize * relSize);
					var top = (yDraw - iHeight / 2) - (tankItems[id].y * percentOfSize * relSize);

					if (mouseX > left && mouseX < left + iWidth && mouseY > top && mouseY < top + iHeight) {
						currentSel = i;
					}
				}
			}
			return currentSel;
		}

		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		function CreateButtons() {
			document.getElementById("menu").innerHTML = '';
			var button;
			var hr;
			hr = document.createElement("hr");
			hr.innerHTML = "<hr style=\"width: 1px;></hr>";
			document.getElementById("menu").appendChild(hr);
			//CREATE DEFAULT BUTTON
			button = document.createElement("image");
			button.id = ("button1");
			if (mode != "default") {
				button.onclick = function () { ButtonDefaultMode() };
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/default.png onmouseover=this.src='ui/default_hover.png' onmouseout=this.src='ui/default.png' width=\"60px\" height=\"60px\" alt=\"INTERACT\"></img><p><b>INTERACT</b></p></div>";
			} else {
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/default_select.png width=\"60px\" height=\"60px\" alt=\"INTERACT\"></img><p><b>INTERACT</b></p></div>";
			}
			document.getElementById("menu").appendChild(button);
			//CREATE STUFF BUTTON
			button = document.createElement("image");
			button.id = ("button2");
			if (mode != "stuff") {
				button.onclick = function () { ButtonStuffMode() };
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/stuff.png onmouseover=this.src='ui/stuff_hover.png' onmouseout=this.src='ui/stuff.png' width=\"60px\" height=\"60px\" alt=\"MY STUFF\"></img><p><b>MY STUFF</b></p></div>";
			} else {
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/stuff_select.png width=\"60px\" height=\"60px\" alt=\"MY STUFF\"></img><p><b>MY STUFF</b></p></div>";
			}
			hr = document.createElement("hr");
			hr.innerHTML = "<hr style=\"width: 1px;></hr>";
			document.getElementById("menu").appendChild(hr);
			document.getElementById("menu").appendChild(button);
			//CREATE SHOP BUTTON
			button = document.createElement("image");
			button.id = ("button3");
			if (mode != "shop" && mode != "checkout") {
				button.onclick = function () { ButtonShopMode() };
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/shop.png onmouseover=this.src='ui/shop_hover.png' onmouseout=this.src='ui/shop.png' width=\"60px\" height=\"60px\" alt=\"SHOP\"></img><p><b>SHOP</b></p></div>";
			} else {
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/shop_select.png width=\"60px\" height=\"60px\" alt=\"SHOP\"></img><p><b>SHOP</b></p></div>";
			}
			hr = document.createElement("hr");
			hr.innerHTML = "<hr style=\"width: 1px;></hr>";
			document.getElementById("menu").appendChild(hr);
			document.getElementById("menu").appendChild(button);
			//CREATE LOGOUT BUTTON
			button = document.createElement("image");
			button.id = ("button3");
				button.innerHTML = "<a href='logout.php'><div class=\"img-with-text\"><img src=ui/logout.png onmouseover=this.src='ui/logout_hover.png' onmouseout=this.src='ui/logout.png' width=\"60px\" height=\"60px\" alt=\"LOG OUT\"></img><p><b>LOG OUT</b></p></div></a>";

			hr = document.createElement("hr");
			hr.innerHTML = "<hr style=\"width: 1px;></hr>";
			document.getElementById("menu").appendChild(hr);
			document.getElementById("menu").appendChild(button);

			//LAST HR
			hr = document.createElement("hr");
			hr.innerHTML = "<hr style=\"width: 1px;></hr>";
			document.getElementById("menu").appendChild(hr);
			UpdateElements();
		}
		function ButtonDefaultMode() {
			mode = "default";
			CreateButtons();
		}
		function ButtonStuffMode() {
			mode = "stuff";
			//disableScroll();
			//window.scrollTo(0, 0)
			CreateButtons();
			CreateStorageItems(0);
		}
		function ButtonShopMode() {
			mode = "shop";
			CreateButtons();
			CreateShopItems(0);
			document.getElementById("shop-balance").innerText = "Bal: $"+ money;
		}
		function ButtonLogout() {
				window.alert("LOGOUT");
				//Check if tank exists
				fetch('logout.php',{
					"method":"POST"
				}).then(function(response){
					return response.text();
				}).then(function(data){
				})
		}
		function UpdateElements() {
			if (mode != "stuff") {
				enableScroll();
			}
			var element;
			if (mode == "stuff") {
				element = document.getElementById("aquariums");
				element.style.display = "flex";
				element = document.getElementById("storage-container");
				element.style.display = "grid";
				if(showingTankStorage){
					element = document.getElementById("show-storage-items");
					element.style.display = "block";
					element = document.getElementById("show-tank-items");
					element.style.display = "none";
				}else{
					element = document.getElementById("show-storage-items");
					element.style.display = "none";
					element = document.getElementById("show-tank-items");
					element.style.display = "block";
				}
			} else {
				element = document.getElementById("aquariums");
				element.style.display = "none";
				element = document.getElementById("storage-container");
				element.style.display = "none";
				element = document.getElementById("show-storage-items");
				element.style.display = "none";
				element = document.getElementById("show-tank-items");
				element.style.display = "none";
			}
			if (mode == "shop" || mode == "checkout") {
				document.body.style.background = "#ffffff";
				element = document.getElementById("container");
				element.style.display = "none";
			} else {
				document.body.style.backgroundSize = "65vw 65vw, 20vw 20vw";
				document.body.style.backgroundImage = "url('paper.png'),url('paperbg.png')";
				document.body.style.backgroundRepeat = "repeat-y, repeat";
				document.body.style.backgroundPosition = "center";
				element = document.getElementById("container");
				element.style.display = "block";
			}
			if (mode == "shop") {
				element = document.getElementById("shop-container");
				element.style.display = "grid";
				element = document.getElementById("shoptoolbar1");
				element.style.display = "flex";
				element = document.getElementById("shoptoolbar2");
				element.style.display = "flex";
			} else {
				element = document.getElementById("shop-container");
				element.style.display = "none";
				element = document.getElementById("shoptoolbar1");
				element.style.display = "none";
				element = document.getElementById("shoptoolbar2");
				element.style.display = "none";
			}
			if (mode == "checkout") {
				element = document.getElementById("shop-checkout-table");
				element.style.display = "block";
				element = document.getElementById("shop-checkout-return");
				element.style.display = "block";
				element = document.getElementById("shop-checkout-purchase");
				element.style.display = "flex";
			} else {
				element = document.getElementById("shop-checkout-table");
				element.style.display = "none";
				element = document.getElementById("shop-checkout-return");
				element.style.display = "none";
				element = document.getElementById("shop-checkout-purchase");
				element.style.display = "none";
			}
		}
	</script>
	<!--  GRID FOR DISPLAYING SHOP ITEMS  -->
	<div class="shop-grid-container" id="shop-container">
	</div>
	<!--  GRID FOR DISPLAYING STORAGE  -->
	<div>
	<a id="show-storage-items" href="#" onclick="ChangeStorageView(false);" style="text-align:center ; margin:16px">Show items in storage</a>
		<a id="show-tank-items" href="#" onclick="ChangeStorageView(true);" style="text-align:center ; margin:16px">Show items in this tank</a>
	</div>
	<div class="storage-grid-container" id="storage-container">
	</div>
	<div>
		<a href="javascript:ButtonShopMode();" id="shop-checkout-return"
			style="text-align:center ; margin:16px">Continue shopping</a>
		<table id="shop-checkout-table">
		</table>
	</div>
	<div id = "shop-checkout-purchase" style="margin:16px;display: flex; flex-direction: row; align-items: center; justify-content: center;">
		<button onclick="PurchaseItems();"style="text-align:center ;margin:auto;width:200px;height:50px;font-size: 10">Purchase</button>
	</div>
</body>
</html>