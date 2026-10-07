'use strict';

const products = [
  { id: 1, name: 'Tito\'s Handmade Vodka', category: 'Spirits', price: 29.99, emoji: '🥃', desc: 'Smooth, clean vodka for cocktails and classics.', badge: 'Top Seller' },
  { id: 2, name: 'Jack Daniel\'s Old No. 7', category: 'Spirits', price: 34.99, emoji: '🥃', desc: 'Bold and smooth with a classic whiskey finish.', badge: 'House Favorite' },
  { id: 3, name: 'Crown Royal', category: 'Spirits', price: 36.99, emoji: '🥃', desc: 'A rich and velvety whiskey with a warm finish.', badge: 'Popular' },
  { id: 4, name: 'Hennessy VS', category: 'Spirits', price: 44.99, emoji: '🥃', desc: 'A refined cognac that stands out in any pour.', badge: 'Premium' },
  { id: 5, name: 'Fireball Cinnamon Whisky', category: 'Spirits', price: 21.99, emoji: '🔥', desc: 'Sweet cinnamon spice for a fun, bold pour.', badge: 'Party Pick' },
  { id: 6, name: 'Casamigos Blanco', category: 'Spirits', price: 39.99, emoji: '🥃', desc: 'Crisp tequila with a fresh citrus profile.', badge: 'Best Seller' },
  { id: 7, name: 'Patrón Silver', category: 'Spirits', price: 41.99, emoji: '🥃', desc: 'Smooth tequila made for margaritas and sipping.', badge: 'Trending' },
  { id: 8, name: 'Modelo Especial', category: 'Beer', price: 12.99, emoji: '🍺', desc: 'Crisp Mexican lager with a golden finish.', badge: 'Classic' },
  { id: 9, name: 'Corona Extra', category: 'Beer', price: 12.99, emoji: '🍺', desc: 'Light, refreshing, and perfect with a lime.', badge: 'Easy Favorite' },
  { id: 10, name: 'Bud Light', category: 'Beer', price: 11.99, emoji: '🍺', desc: 'Light brewing with a smooth finish.', badge: 'Light' },
  { id: 11, name: 'Coors Light', category: 'Beer', price: 11.99, emoji: '🍺', desc: 'A simple, crisp light beer for everyday hangs.', badge: 'Value' },
  { id: 12, name: 'White Claw', category: 'Beer', price: 13.99, emoji: '🍋', desc: 'Refreshing hard seltzer in a light citrus blend.', badge: 'Fresh' },
  { id: 13, name: 'Barefoot Cabernet', category: 'Wine', price: 9.99, emoji: '🍷', desc: 'Smooth red wine with easy fruit notes.', badge: 'Value' },
  { id: 14, name: 'Josh Cellars Cabernet', category: 'Wine', price: 14.99, emoji: '🍷', desc: 'Balanced and rich with a soft finish.', badge: 'Popular' },
  { id: 15, name: 'Kendall-Jackson Chardonnay', category: 'Wine', price: 16.99, emoji: '🍷', desc: 'Bright and buttery with a smooth texture.', badge: 'Classic' },
  { id: 16, name: 'Coca-Cola', category: 'Mixers', price: 2.49, emoji: '🥤', desc: 'A classic cola for mixing or sipping.', badge: 'Classic' },
  { id: 17, name: 'Sprite', category: 'Mixers', price: 2.49, emoji: '🥤', desc: 'Crisp lemon-lime soda for easy mixers.', badge: 'Best Mix' },
  { id: 18, name: 'Mexican Coke', category: 'Mixers', price: 2.99, emoji: '🥤', desc: 'Authentic cane sugar cola with a smooth finish.', badge: 'Fan Favorite' },
  { id: 19, name: 'Ginger Beer', category: 'Mixers', price: 3.49, emoji: '🥤', desc: 'Bold, spicy, and perfect with whiskey.', badge: 'Craft' },
  { id: 20, name: 'Tonic Water', category: 'Mixers', price: 3.19, emoji: '🥤', desc: 'Crisp tonic for gin, vodka, and mixed drinks.', badge: 'Fresh' },
  { id: 21, name: 'Doritos', category: 'Snacks', price: 3.49, emoji: '🥔', desc: 'Crunchy and cheesy for game night.', badge: 'Snack Time' },
  { id: 22, name: 'Lay\'s Classic', category: 'Snacks', price: 3.29, emoji: '🥔', desc: 'A timeless potato chip favorite.', badge: 'Classic' },
  { id: 23, name: 'Cheetos', category: 'Snacks', price: 3.39, emoji: '🧀', desc: 'Crunchy, cheesy, and easy to share.', badge: 'Popular' },
  { id: 24, name: 'Takis', category: 'Snacks', price: 3.99, emoji: '🌶️', desc: 'Bold spicy crunch for extra kick.', badge: 'Heat' },
  { id: 25, name: 'Flamin\' Hot Cheetos', category: 'Snacks', price: 3.99, emoji: '🌶️', desc: 'Extra crunchy, fiery, and crowd-pleasing.', badge: 'Hot' }
];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const cartButton = document.getElementById('cartButton');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const filterButtons = document.querySelectorAll('.filter-btn');

let cart = [];
let activeFilter = 'all';

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

function getFilteredProducts() {
  const term = searchInput.value.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    const matchesSearch = !term || product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();

  if (!filteredProducts.length) {
    productGrid.innerHTML = '<div class="empty-state">No products match your search.</div>';
    return;
  }

  productGrid.innerHTML = filteredProducts.map((product) => `
    <article class="product-card">
      <div class="product-visual" data-badge="${product.badge}">
        <span>${product.emoji}</span>
      </div>
      <div class="product-body">
        <h4>${product.name}</h4>
        <div class="product-meta">
          <span class="product-category">${product.category}</span>
          <span class="product-price">${formatPrice(product.price)}</span>
        </div>
        <p class="product-desc">${product.desc}</p>
        <button class="add-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    </article>
  `).join('');
}

function addToCart(productId) {
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = formatPrice(totalCost);

  cartItems.innerHTML = cart.length
    ? cart.map((item) => `
      <div class="cart-item">
        <div class="cart-item-badge">${item.emoji}</div>
        <div style="flex: 1;">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">
            <div class="qty-controls">
              <button data-action="decrease" data-id="${item.id}">−</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-id="${item.id}">+</button>
            </div>
            <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
          </div>
        </div>
      </div>
    `).join('')
    : '<p style="color: #56372c;">Your cart is empty.</p>';
}

function changeQuantity(productId, delta) {
  const item = cart.find((cartItem) => cartItem.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    cart = cart.filter((cartItem) => cartItem.id !== productId);
  }

  updateCartUI();
}

function openCart() {
  cartPanel.classList.add('open');
  cartOverlay.classList.add('visible');
}

function closeCartPanel() {
  cartPanel.classList.remove('open');
  cartOverlay.classList.remove('visible');
}

searchInput.addEventListener('input', renderProducts);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderProducts();
  });
});

document.addEventListener('click', (event) => {
  const addButton = event.target.closest('.add-cart');
  if (addButton) {
    addToCart(Number(addButton.dataset.id));
    openCart();
    return;
  }

  const cartAction = event.target.closest('[data-action]');
  if (cartAction) {
    const id = Number(cartAction.dataset.id);
    const action = cartAction.dataset.action;
    changeQuantity(id, action === 'increase' ? 1 : -1);
    return;
  }

  if (event.target === cartOverlay) {
    closeCartPanel();
  }
});

cartButton.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartPanel);

document.querySelector('.checkout-btn').addEventListener('click', () => {
  if (!cart.length) {
    alert('Your cart is empty. Add a few favorites first.');
    return;
  }
  alert('Checkout is ready to connect with Stripe in the next step.');
});

renderProducts();
updateCartUI();
