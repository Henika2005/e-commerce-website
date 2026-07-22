let cart = [];

function addToCart(name, price){

    cart.push({name,price});

    displayCart();

}

function displayCart(){

    let cartItems = document.getElementById("cart-items");

    cartItems.innerHTML="";

    cart.forEach(item=>{

        cartItems.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>${item.price}</p>
            </div>
        `;

    });

}
