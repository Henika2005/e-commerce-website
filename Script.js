let cart = [];

function addToCart(name, price){

    cart.push({name,price});

    displayCart();

}

function displayCart(){

    let cartItems = document.getElementById("cart-items");
    let total = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let totalPrice = 0;

    cart.forEach(item => {

        totalPrice += parseFloat(item.price.replace("$",""));

        cartItems.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>${item.price}</p>
            </div>
        `;

    });

    if(cart.length === 0){
        cartItems.innerHTML = "<p>No items in cart.</p>";
    }

    total.innerHTML = `Total: $${totalPrice.toFixed(2)}`;

}
