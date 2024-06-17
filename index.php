<?php
session_start();
	include("connection.php");
	include("functions.php");
	$user_data = check_login($con);
	$_SESSION;

	$id = $_SESSION['account_id'];
	$query = "select * from tanks where owner_account_id = '$id'";
	$result = mysqli_query($con, $query);

	for($i = 0; $i < mysqli_num_rows($result);$i++){
		$tanks += mysqli_fetch_assoc($result);
		if($i < mysqli_num_rows($result)){
			$tanks += ";";
		}
	}
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

		.item-img-with-text {
			position: relative;
			margin: auto;
			width: 16vw;
			height: 18vw;
		}

		.item-img-with-text p {
			margin: 0;
			padding: 0;
			font-size: 1vw;
			height: 2vw;
			text-align: center;
			line-height: 1.2em;
			vertical-align: text-top;
		}

		.item-img-with-text img {
			width: 8vw;
			height: 8vw;
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
		}

		.item-img-with-text button {
			width: 10vw;
			height: 2vw;
			position: absolute;
			left: 3vw;
			bottom: 1vw;
			font-size: 1vw;
			text-align: center;
		}

		img:hover {
			cursor: pointer;
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
					<p>Bal: $0</p>
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
	<div class="container noSelect" id="container">
		<canvas class="noSelect" id="selectedaquarium"
			style="margin:auto auto auto auto;display: flex;z-index:0"></canvas>
	</div>
	<div class="aquariumlist" id="aquariums"></div>
	<?php
			include("scripts/shop.php");
			include("scripts/items.php");
			include("scripts/tanks.php");
			include("scripts/interaction.php");
			include("scripts/update.php");
	?>
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
					var imgSlot = GetImageSlot(decorArr[i].image);
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
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/default.png onmouseover=this.src='ui/default_hover.png' onmouseout=this.src='ui/default.png' width=\"80px\" height=\"60px\" alt=\"INTERACT\"></img><p><b>INTERACT</b></p></div>";
			} else {
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/default_select.png width=\"80px\" height=\"60px\" alt=\"INTERACT\"></img><p><b>INTERACT</b></p></div>";
			}
			document.getElementById("menu").appendChild(button);
			//CREATE EDIT BUTTON
			button = document.createElement("image");
			button.id = ("button2");
			if (mode != "edit") {
				button.onclick = function () { ButtonEditMode() };
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/edit.png onmouseover=this.src='ui/edit_hover.png' onmouseout=this.src='ui/edit.png' width=\"80px\" height=\"60px\" alt=\"EDIT\"></img><p><b>EDIT</b></p></div>";
			} else {
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/edit_select.png width=\"80px\" height=\"60px\" alt=\"EDIT\"></img><p><b>EDIT</b></p></div>";
			}
			hr = document.createElement("hr");
			hr.innerHTML = "<hr style=\"width: 1px;></hr>";
			document.getElementById("menu").appendChild(hr);
			document.getElementById("menu").appendChild(button);
			//CREATE TANK BUTTON
			button = document.createElement("image");
			button.id = ("button3");
			if (mode != "tanks") {
				button.onclick = function () { ButtonTanksMode() };
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/tanks.png onmouseover=this.src='ui/tanks_hover.png' onmouseout=this.src='ui/tanks.png' width=\"80px\" height=\"60px\" alt=\"TANKS\"></img><p><b>TANKS</b></p></div>";
			} else {
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/tanks_select.png width=\"80px\" height=\"60px\" alt=\"TANKS\"></img><p><b>TANKS</b></p></div>";
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
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/shop.png onmouseover=this.src='ui/shop_hover.png' onmouseout=this.src='ui/shop.png' width=\"80px\" height=\"60px\" alt=\"SHOP\"></img><p><b>SHOP</b></p></div>";
			} else {
				button.innerHTML = "<div class=\"img-with-text\"><img src=ui/shop_select.png width=\"80px\" height=\"60px\" alt=\"SHOP\"></img><p><b>SHOP</b></p></div>";
			}
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
		function ButtonEditMode() {
			mode = "edit";
			disableScroll();
			window.scrollTo(0, 0)
			CreateButtons();
		}
		function ButtonTanksMode() {
			mode = "tanks";
			CreateButtons();
		}
		function ButtonShopMode() {
			mode = "shop";
			CreateButtons();
			CreateShopItems();
		}
		function UpdateElements() {
			if (mode != "edit") {
				enableScroll();
			}
			var element;
			if (mode == "tanks") {
				element = document.getElementById("aquariums");
				element.style.display = "flex";
			} else {
				element = document.getElementById("aquariums");
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
	<div class="shop-grid-container" id="shop-container">
	</div>
	<div>
		<a href="javascript:ButtonShopMode();" id="shop-checkout-return"
			style="text-align:center ; margin:16px">Continue shopping</a>
		<table id="shop-checkout-table">
		</table>
	</div>
	<div id = "shop-checkout-purchase" style="margin:16px;display: flex; flex-direction: row; align-items: center; justify-content: center;">
		<button style="text-align:center ;margin:auto;width:200px;height:50px;font-size: 10">Purchase</button>
	</div>
		<a href="logout.php">Logout</a>
</body>
</html>