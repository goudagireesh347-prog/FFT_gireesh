/* ==========================================
   OUTDOORX - CAMPING GEAR E-COMMERCE
   Complete JavaScript
========================================== */

/* 1. CAMPING PRODUCTS */

const products = [
    {
        id: 1,
        name: "Explorer Camping Tent",
        category: "Shelter",
        price: 3499,
        image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=700&q=80",
        description:
            "A spacious camping tent for weekend trips, nature escapes and outdoor adventures.",
        weather: ["sunny", "rainy", "windy"]
    },

    {
        id: 2,
        name: "Trailblazer Backpack",
        category: "Storage",
        price: 1899,
        image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=700&q=80",
        description:
            "A practical adventure backpack with generous storage for your outdoor essentials.",
        weather: ["sunny", "rainy", "windy"]
    },

    {
        id: 3,
        name: "WildGlow Camping Lantern",
        category: "Lighting",
        price: 799,
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
        description:
            "A portable camping companion for illuminating your campsite during evening activities.",
        weather: ["sunny", "rainy", "cold", "windy"]
    },

    {
        id: 4,
        name: "DreamTrail Sleeping Bag",
        category: "Sleep",
        price: 1499,
        image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=700&q=80",
        description:
            "A portable sleeping bag for comfortable overnight camping trips. Check its temperature rating before use.",
        weather: ["sunny", "cold"]
    }
];


/* 2. DOM ELEMENTS */

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartCountSummary =
    document.getElementById("cart-count-summary");
const cartTotal = document.getElementById("cart-total");

const dialog = document.getElementById("product-dialog");
const productDetails =
    document.getElementById("product-details");

const checkoutMessage =
    document.getElementById("checkout-message");

const weatherSelect =
    document.getElementById("weather-select");

const weatherResults =
    document.getElementById("weather-results");


/* 3. CART DATA */

let cart = [];
let selectedCategory = "All";


/* 4. FORMAT PRICE IN INDIAN RUPEES */

function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(price);
}


/* 5. DISPLAY PRODUCTS */

function displayProducts() {
    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                product =>
                    product.category === selectedCategory
            );

    productList.innerHTML = "";

    if (filteredProducts.length === 0) {
        productList.textContent =
            "No products available in this category.";
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        image.onerror = function () {
            this.onerror = null;
            this.src =
                "https://placehold.co/600x400?text=Camping+Gear";
        };

        const info = document.createElement("div");
        info.className = "product-info";

        const category = document.createElement("span");
        category.className = "product-category";
        category.textContent = product.category;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const description = document.createElement("p");
        description.className = "description";
        description.textContent = product.description;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = formatPrice(product.price);

        const actions = document.createElement("div");
        actions.className = "product-actions";

        const detailsButton = document.createElement("button");
        detailsButton.type = "button";
        detailsButton.className = "details-btn";
        detailsButton.textContent = "View Details";
        detailsButton.addEventListener("click", () => {
            showDetails(product.id);
        });

        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.className = "add-btn";
        addButton.textContent = "Add to Cart +";
        addButton.addEventListener("click", () => {
            addToCart(product.id);
        });

        actions.append(detailsButton, addButton);

        info.append(
            category,
            name,
            description,
            price,
            actions
        );

        card.append(image, info);
        productList.appendChild(card);
    });
}


/* 6. FILTER PRODUCTS BY CATEGORY */

document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        document.querySelectorAll(".category-btn").forEach(btn => {
            btn.classList.toggle("active", btn === button);
        });

        displayProducts();
    });
});


/* 7. VIEW PRODUCT DETAILS */

function showDetails(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    productDetails.replaceChildren();

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;

    image.onerror = function () {
        this.onerror = null;
        this.src =
            "https://placehold.co/600x400?text=Camping+Gear";
    };

    const category = document.createElement("span");
    category.className = "product-category";
    category.textContent = product.category;

    const heading = document.createElement("h2");
    heading.id = "dialog-title";
    heading.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = formatPrice(product.price);

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "btn";
    addButton.textContent = "Add to Cart +";

    addButton.addEventListener("click", () => {
        addToCart(product.id);
        dialog.close();
    });

    productDetails.append(
        image,
        category,
        heading,
        description,
        price,
        addButton
    );

    dialog.showModal();
}


/* 8. CLOSE PRODUCT DETAILS POPUP */

document.getElementById("close-dialog")
    .addEventListener("click", () => {
        dialog.close();
    });

dialog.addEventListener("click", event => {
    if (event.target === dialog) {
        dialog.close();
    }
});


/* 9. ADD PRODUCTS TO CART */

function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const existingItem =
        cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: id,
            quantity: 1
        });
    }

    renderCart();

    checkoutMessage.textContent =
        product.name + " added to your cart!";
}


/* 10. CHANGE PRODUCT QUANTITY */

function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    renderCart();

    checkoutMessage.textContent = "";
}


/* 11. REMOVE PRODUCT FROM CART */

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);

    renderCart();

    checkoutMessage.textContent =
        "Product removed from your cart.";
}


/* 12. DISPLAY SHOPPING CART AND TOTAL */

function renderCart() {
    cartItems.replaceChildren();

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-cart";
        emptyMessage.textContent =
            "Your cart is empty. Explore our camping gear!";

        cartItems.appendChild(emptyMessage);
    } else {
        cart.forEach(item => {
            const product =
                products.find(p => p.id === item.id);

            if (!product) return;

            const row = document.createElement("div");
            row.className = "cart-row";

            const cartProduct = document.createElement("div");
            cartProduct.className = "cart-product";

            const image = document.createElement("img");
            image.src = product.image;
            image.alt = product.name;

            image.onerror = function () {
                this.onerror = null;
                this.src =
                    "https://placehold.co/200x200?text=Gear";
            };

            const info = document.createElement("div");

            const name = document.createElement("h3");
            name.textContent = product.name;

            const unitPrice = document.createElement("p");
            unitPrice.textContent =
                formatPrice(product.price) + " each";

            const subtotal = document.createElement("strong");
            subtotal.textContent =
                formatPrice(product.price * item.quantity);

            info.append(name, unitPrice, subtotal);
            cartProduct.append(image, info);

            const quantityControls =
                document.createElement("div");

            quantityControls.className = "quantity-controls";

            const decreaseButton =
                document.createElement("button");

            decreaseButton.type = "button";
            decreaseButton.textContent = "−";
            decreaseButton.setAttribute(
                "aria-label",
                "Decrease " + product.name + " quantity"
            );

            decreaseButton.addEventListener("click", () => {
                changeQuantity(product.id, -1);
            });

            const quantity = document.createElement("span");
            quantity.textContent = item.quantity;

            const increaseButton =
                document.createElement("button");

            increaseButton.type = "button";
            increaseButton.textContent = "+";
            increaseButton.setAttribute(
                "aria-label",
                "Increase " + product.name + " quantity"
            );

            increaseButton.addEventListener("click", () => {
                changeQuantity(product.id, 1);
            });

            quantityControls.append(
                decreaseButton,
                quantity,
                increaseButton
            );

            const removeButton =
                document.createElement("button");

            removeButton.type = "button";
            removeButton.className = "remove-btn";
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", () => {
                removeFromCart(product.id);
            });

            row.append(
                cartProduct,
                quantityControls,
                removeButton
            );

            cartItems.appendChild(row);
        });
    }

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = cart.reduce((sum, item) => {
        const product =
            products.find(p => p.id === item.id);

        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    cartCount.textContent = totalQuantity;
    cartCountSummary.textContent = totalQuantity;
    cartTotal.textContent = formatPrice(totalPrice);
}


/* 13. WEATHER SUITABILITY GUIDANCE */

const weatherGuidance = {
    sunny: {
        title: "☀️ Sunny Weather Gear",
        note:
            "Prepare for sun exposure, hydration and changing temperatures."
    },

    rainy: {
        title: "🌧️ Rainy Weather Gear",
        note:
            "Check waterproof ratings and use suitable rain protection."
    },

    cold: {
        title: "❄️ Cold Weather Gear",
        note:
            "Choose insulation appropriate for the expected temperature."
    },

    windy: {
        title: "💨 Windy Weather Gear",
        note:
            "Secure shelters properly and follow manufacturer wind limits."
    }
};


/* 14. WEATHER RECOMMENDATION DETAILS */

const weatherReasons = {
    1: {
        sunny: "A shelter option for sunny campsites.",
        rainy: "Use only if the tent has adequate rain protection.",
        windy: "Use secure stakes and follow the tent's wind limits."
    },

    2: {
        sunny: "Carries essential items for outdoor activities.",
        rainy: "Use a rain cover or waterproof liner.",
        windy: "Secure and balance your backpack while hiking."
    },

    3: {
        sunny: "Useful for lighting your campsite after sunset.",
        rainy: "Use in wet conditions only if its rating permits.",
        cold: "Helps illuminate your campsite during dark evenings.",
        windy: "Provides light when visibility is reduced."
    },

    4: {
        sunny: "Suitable when nighttime temperatures match its rating.",
        cold: "Check the sleeping bag's temperature rating before use."
    }
};


/* 15. FIND GEAR SUITABLE FOR SELECTED WEATHER */

document.getElementById("check-weather")
    .addEventListener("click", () => {
        const selectedWeather = weatherSelect.value;

        const guidance = weatherGuidance[selectedWeather];

        if (!guidance) return;

        const suitableProducts = products.filter(product =>
            product.weather.includes(selectedWeather)
        );

        weatherResults.replaceChildren();

        const heading = document.createElement("h3");
        heading.className = "weather-result-heading";
        heading.textContent = guidance.title;

        const note = document.createElement("p");
        note.className = "weather-result-note";
        note.textContent = guidance.note;

        const grid = document.createElement("div");
        grid.className = "weather-result-grid";

        if (suitableProducts.length === 0) {
            const message = document.createElement("p");
            message.textContent =
                "No matching products found for this weather.";
            grid.appendChild(message);
        }

        suitableProducts.forEach(product => {
            const card = document.createElement("article");
            card.className = "weather-result-item";

            const name = document.createElement("h4");
            name.textContent = product.name;

            const reason = document.createElement("p");
            reason.textContent =
                weatherReasons[product.id][selectedWeather];

            const price = document.createElement("p");
            price.textContent = formatPrice(product.price);

            const button = document.createElement("button");
            button.type = "button";
            button.textContent = "Add to Cart +";

            button.addEventListener("click", () => {
                addToCart(product.id);
            });

            card.append(name, reason, price, button);
            grid.appendChild(card);
        });

        weatherResults.append(heading, note, grid);
    });


/* 16. DEMO CHECKOUT */

document.getElementById("checkout-btn")
    .addEventListener("click", () => {
        if (cart.length === 0) {
            checkoutMessage.textContent =
                "Your cart is empty. Add products before checkout.";
            return;
        }

        checkoutMessage.textContent =
            "Demo checkout: your cart is ready! " +
            "Online payment is not configured.";
    });


/* 17. INITIALIZE THE WEBSITE */

displayProducts();
renderCart();
