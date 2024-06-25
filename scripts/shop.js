var shoppingCart = [];
var money = 1000;

function AddItemToCart(itemId){
    for(var i = 0; i < shoppingCart.length;i++){
        if(shoppingCart[i].id == itemId){
            shoppingCart[i].qty += 1;
            document.getElementById("viewcart").innerText= "Cart ("+GetCartAmount()+")";
            LoadCheckoutTable();
            return;
        }
    }
    shoppingCart.push({"id":itemId,"qty":1});
    document.getElementById("viewcart").innerText= "Cart ("+GetCartAmount()+")";
    LoadCheckoutTable();
}
function RemoveItemFromCart(itemId){
    for(var i = 0; i < shoppingCart.length;i++){
        if(shoppingCart[i].id == itemId){
            if(shoppingCart[i].qty>0){
                shoppingCart[i].qty -= 1;
                document.getElementById("viewcart").innerText= "Cart ("+GetCartAmount()+")";
            }
            LoadCheckoutTable();
            return;
        }
    }
    document.getElementById("viewcart").innerText= "Cart ("+GetCartAmount()+")";
    LoadCheckoutTable();
}
function GetCartAmount(){
    var amt = 0;
    for(var i = 0; i < shoppingCart.length;i++){
        amt += shoppingCart[i].qty;
    }
    return amt;
}
function GetCartPrice(){
    var amt = 0;
    for(var i = 0; i < shoppingCart.length;i++){
        amt += tankItems[shoppingCart[i].id].price * shoppingCart[i].qty;
    }
    return amt;
}
function CreateShopItems(startIndex){
    document.getElementById("viewcart").innerText= "Cart ("+GetCartAmount()+")";
	var shop = document.getElementById("shop-container");
	shop.innerHTML = '';
	var index = 0;
	for(var i = 0; i< tankItems.length;i++){
		if(tankItems[i].price!=null){
			var item = document.createElement("div");
			item.innerHTML = "<div class=\"shop-item-img-with-text\"><img src="+tankItems[i].type + "/" + tankItems[i].image + " alt=\"SHOP\"></img><p><b>"+tankItems[i].name+"</b><br> $"+tankItems[i].price+"</b></p> <button onclick=\"AddItemToCart("+i+")\">Add to cart</button> </div>";
			shop.appendChild(item);
		}
	}
}
function GoToCheckout(){
    mode = "checkout";
    LoadCheckoutTable();
    CreateButtons();
}
function PurchaseItems(){
    if(money >= GetCartPrice()){
        for(var i = 0;i < shoppingCart.length;i++){
            AddItemToStorage({"id":shoppingCart[i].id,"qty":1}, shoppingCart[i].qty);
        }
        ChangeAccountMoney(GetCartPrice());
        shoppingCart = [];
        LoadCheckoutTable();
        UpdateStorage();
        mode = "stuff";
    }
}
function ChangeAccountMoney(amt){
    let info = {"change" : amt};
	//Check if tank exists
	fetch('account_functions/change_account_money.php',{
		"method":"POST",
		"body": JSON.stringify(info)
	}).then(function(response){
		return response.text();
	}).then(function(data){
        GetAccountMoney();
    })
}
function GetAccountMoney(){
			//Retrieve storage info
			fetch('account_functions/get_account_money.php',{
				"method":"GET"
			}).then(function(response){
				return response.text();
			}).then(function(data){
				money = JSON.parse(data);
			})
}
function LoadCheckoutTable(){
    var table = document.getElementById("shop-checkout-table");
    table.innerHTML = '';
    var innerHTML = "<tr><th>Item</th><th>Price</th><th>Qty</th></tr>";
    for(var i =0; i<shoppingCart.length;i++){
        if(shoppingCart[i].qty>0){
            var itemId = shoppingCart[i].id;
            innerHTML += "<tr><td>"+tankItems[itemId].name+"</td><td>$"+tankItems[itemId].price*shoppingCart[i].qty+"</td><td>"+shoppingCart[i].qty+"<button onclick=\"AddItemToCart("+shoppingCart[i].id+")\">Add</button><button onclick=\"RemoveItemFromCart("+shoppingCart[i].id+")\">Remove</button></td></tr>";
        }
    }
    innerHTML += "<tr><td><b>TOTAL</b></td><td><b>$"+GetCartPrice()+"</b></td><td><b>"+GetCartAmount()+"</b></td></tr>";
    table.innerHTML = innerHTML;

}