const products = [
  {
    id: 1,
    name: "Rolex Datejust",
    price: 12500,
    image: "0-02-05-55eec32a3b19a005c23f03196765d58c53449674b9c28b8df975ce25dd0b0f14_492bfa82fb11977b.jpg"
  },
  {
    id: 2,
    name: "Rolex Submariner",
    price: 14200,
    image: "0-02-05-2ff5f28c46260de6889303cf03e8e132d74b53c566d8522f8d86601768cf8bc6_752afec1574a74fc.jpg"
  },
  {
    id: 3,
    name: "Rolex Day-Date",
    price: 18000,
    image: "0-02-05-481b0793ea0b4b6035b685e9aec883d7e78ce0496d0a83a945159fb2777c77ef_1738b3ae6f8e97ed.jpg"
  }
];

let cart = [];

/* PRODUCTS */
function renderProducts() {
  const grid = document.getElementById("productGrid");

  grid.innerHTML = products.map(p => `
    <div class="product">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

/* ADD */
function addToCart(id) {
  const product = products.find(p => p.id === id);

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
}

/* REMOVE (FIXED - тепер працює) */
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

/* CART UPDATE */
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const totalEl = document.getElementById("total");

  let total = 0;
  let count = 0;

  cartItems.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} x${item.qty}</span>
        <span>$${item.price * item.qty}</span>
        <button onclick="removeFromCart(${item.id})">✕</button>
      </div>
    `;
  });

  cartCount.textContent = count;
  totalEl.textContent = total;
}

/* CART TOGGLE */
document.querySelector(".cart").onclick = () => {
  document.getElementById("cartPanel").classList.toggle("open");
};

renderProducts();