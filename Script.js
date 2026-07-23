let cart = [];

function addToCart(name, price){

    cart.push({name, price});

    displayCart();

    showToast();

}

function removeFromCart(index){

    cart.splice(index, 1);

    displayCart();

}
function showToast(){

    let toast = document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2000);

}

function displayCart(){

    let cartItems = document.getElementById("cart-items");
    let total = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let totalPrice = 0;

    if(cart.length === 0){

        cartItems.innerHTML = "<p>No items in cart.</p>";
        total.innerHTML = "Total: $0.00";
        return;

    }

    cart.forEach((item, index)=>{

        totalPrice += parseFloat(item.price.replace("$",""));

        cartItems.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

    });

    total.innerHTML = `Total: $${totalPrice.toFixed(2)}`;

}
