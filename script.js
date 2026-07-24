let cart = [];

function addToCart(name, price){

    let existingItem = cart.find(item => item.name === name);

    if(existingItem){

        existingItem.quantity++;

    }else{

        cart.push({
            name:name,
            price:price,
            quantity:1
        });

    }

    displayCart();

    showToast();

}


function removeFromCart(index){

    cart.splice(index, 1);

    displayCart();

}
function increaseQuantity(index){

    cart[index].quantity++;

    displayCart();

}

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

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

	let cartCount = document.getElementById("cart-count");

    if(cart.length === 0){

    cartItems.innerHTML = "<p>No items in cart.</p>";

    total.innerHTML = "Total: $0.00";

    cartCount.innerHTML = "0";

    return;

}

    cart.forEach((item, index)=>{

        totalPrice += parseFloat(item.price.replace("$","")) * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">

    <h4>${item.name}</h4>

    <p>${item.price}</p>

    <div class="quantity-box">

        <button onclick="decreaseQuantity(${index})">−</button>

        <span>${item.quantity}</span>

        <button onclick="increaseQuantity(${index})">+</button>

    </div>

    <p>
        Subtotal:
        $${(parseFloat(item.price.replace("$","")) * item.quantity).toFixed(2)}
    </p>

    <button onclick="removeFromCart(${index})">
        Remove
    </button>

</div>
        `;

    });

    total.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
	cartCount.innerHTML = cart.length;

}
// Wishlist

const wishlistButtons = document.querySelectorAll(".wishlist");

wishlistButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        button.classList.toggle("active");

        const icon = button.querySelector("i");

        if(button.classList.contains("active")){

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

        }else{

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }

    });

});
// Scroll Animation

const hiddenElements = document.querySelectorAll(
".hero, .categories, .products, .offers, .about, .reviews, .brands, .newsletter, .cart, footer"
);

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

hiddenElements.forEach(element=>{

    element.classList.add("hidden");

    observer.observe(element);

});
// ==============================
// Product Search
// ==============================

function searchProducts(){

    let input = document.getElementById("search").value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    products.forEach(product=>{

        let name = product.querySelector("h3").textContent.toLowerCase();

        if(name.includes(input)){

            product.style.display="block";

        }else{

            product.style.display="none";

        }

    });

}
// ==============================
// Product Filter
// ==============================

function filterProducts(category){

    let products = document.querySelectorAll(".product-card");

    products.forEach(product=>{

        let productCategory = product.querySelector(".category").textContent.trim();

        if(category === "all" || productCategory === category){

            product.style.display = "block";

        }else{

            product.style.display = "none";

        }

    });

}
// ==============================
// Countdown Timer
// ==============================

let hours = 2;
let minutes = 0;
let seconds = 0;

function updateCountdown(){

    let timer = document.getElementById("countdown");

    timer.innerHTML =
        String(hours).padStart(2,"0") + " : " +
        String(minutes).padStart(2,"0") + " : " +
        String(seconds).padStart(2,"0");

    if(hours===0 && minutes===0 && seconds===0){

        timer.innerHTML = "Sale Ended";
        clearInterval(countdownInterval);
        return;

    }

    if(seconds===0){

        if(minutes===0){

            if(hours>0){

                hours--;
                minutes=59;
                seconds=59;

            }

        }else{

            minutes--;
            seconds=59;

        }

    }else{

        seconds--;

    }

}

let countdownInterval = setInterval(updateCountdown,1000);

updateCountdown();

// ==============================
// Active Navigation
// ==============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});
// ==============================
// Back To Top Button
// ==============================

let topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 300){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

function topFunction(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
// ==============================
// Dark / Light Mode
// ==============================

const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    let icon = themeBtn.querySelector("i");

    if(document.body.classList.contains("dark-mode")){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }else{

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});
// ==============================
// Hero Image Slider
// ==============================

const heroImages = [

"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",

"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",

"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",

"https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800"

];

let currentImage = 0;

const heroSlider = document.getElementById("hero-slider");

setInterval(()=>{

    currentImage++;

    if(currentImage >= heroImages.length){

        currentImage = 0;

    }

    heroSlider.style.opacity = 0;

    setTimeout(()=>{

        heroSlider.src = heroImages[currentImage];

        heroSlider.style.opacity = 1;

    },300);

},3000);
// ==============================
// Order Confirmation
// ==============================

function placeOrder(){

    if(cart.length === 0){

        alert("Your cart is empty!");

        return;

    }

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item=>{

        totalItems += item.quantity;
        totalPrice += parseFloat(item.price.replace("$","")) * item.quantity;

    });

    let orderId = "SE" + Math.floor(Math.random()*900000 + 100000);

    document.getElementById("order-details").innerHTML = `
        <strong>Order ID:</strong> ${orderId}<br><br>

        <strong>Total Items:</strong> ${totalItems}<br>

        <strong>Total Amount:</strong> $${totalPrice.toFixed(2)}<br><br>

        Estimated Delivery:
        <strong>3-5 Business Days</strong>
    `;

    document.getElementById("order-popup").style.display="flex";

}

function closePopup(){

    document.getElementById("order-popup").style.display = "none";

    closeCart();

    cart = [];

    displayCart();

}
// ==============================
// Open / Close Cart
// ==============================

function openCart(){

    document.getElementById("cart-panel").classList.add("open");

}

function closeCart(){

    document.getElementById("cart-panel").classList.remove("open");

}
