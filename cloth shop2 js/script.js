/* script.js
 - Cart functionality for your Cloth Shop
 - Requirements:
   - HTML: keep your .cloth elements as-is (each .cloth contains an <img> and a <p> with name and price)
   - Replace the existing #cartview block with the provided HTML snippet (see next message part)
*/

// --- helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Storage key
const STORAGE_KEY = 'cloth_shop_cart_v1';

// read DOM
const cartView = $('#cartview');                  // clickable cart button area
const cartCountEl = $('#cartCount');              // the small counter
const outerDiv = $('#outer-div');
const clothElems = $$('.cloth');                  // your product boxes

// Create cart panel element (will be appended after cartView)
let cartPanel = null;

// load cart from localStorage
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {}
}

let cart = loadCart(); // { productId: { id, name, price, img, qty } }

// utility: parse product info from a .cloth element
function parseProductFromCloth(clothEl) {
  const id = clothEl.id || ('prod-' + Math.random().toString(36).slice(2,8));
  const imgEl = clothEl.querySelector('img');
  const img = imgEl ? imgEl.src : '';
  const p = clothEl.querySelector('p');
  let name = '', priceText = '', price = 0;
  if (p) {
    // The <p> contains name and then <br> and price (e.g. "Lilen ...<br>RS: 4,999")
    // We'll get text nodes and split by newline if present
    const lines = p.innerText.split('\n').map(s => s.trim()).filter(Boolean);
    if (lines.length === 1) {
      // fallback: attempt to split on "RS:"
      const parts = lines[0].split('RS:');
      name = parts[0].trim();
      priceText = parts[1] ? 'RS:' + parts[1].trim() : '';
    } else {
      name = lines[0];
      priceText = lines[1] || '';
    }
    // extract number from priceText
    const m = priceText.match(/[\d,]+/);
    price = m ? Number(m[0].replace(/,/g, '')) : 0;
  }
  return { id, name, price, img };
}

// update cart count shown in UI
function updateCartCountUI() {
  const totalQty = Object.values(cart).reduce((s, it) => s + (it.qty || 0), 0);
  cartCountEl.innerText = totalQty;
}

// create cart panel DOM (once)
function ensureCartPanel() {
  if (cartPanel) return cartPanel;

  cartPanel = document.createElement('div');
  cartPanel.id = 'cartPanel';
  cartPanel.className = 'cart-panel hidden';

  cartPanel.innerHTML = `
    <div class="cart-panel-header">
      <h3>Your Cart</h3>
      <button id="closeCartBtn" class="close-cart">✕</button>
    </div>
    <div id="cartItems" class="cart-items"></div>
    <div class="cart-panel-footer">
      <div class="cart-total">Total: <span id="cartTotal">0</span> RS</div>
      <div class="cart-actions">
        <button id="checkoutBtn" class="checkout">Checkout</button>
        <button id="clearCartBtn" class="clear">Clear</button>
      </div>
    </div>
  `;

  // append next to cartView (or at end of body if cartView absent)
  if (cartView && cartView.parentElement) {
    cartView.parentElement.appendChild(cartPanel);
  } else {
    document.body.appendChild(cartPanel);
  }

  // event listeners
  $('#closeCartBtn', cartPanel).addEventListener('click', () => {
    cartPanel.classList.add('hidden');
  });
  $('#clearCartBtn', cartPanel).addEventListener('click', () => {
    if (!confirm('Clear all items from cart?')) return;
    cart = {};
    saveCart(cart);
    renderCart();
  });
  $('#checkoutBtn', cartPanel).addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
      alert('Cart is empty.');
      return;
    }
    // simple checkout: show summary then clear
    const total = calculateTotal();
    alert(`Thank you for your purchase! Total: RS ${total}\n(Checkout simulated)`);
    window.location.href = 'placeorder.html'; // redirect to thank you page
    cart = {};
    saveCart(cart);
    renderCart();
  });

  return cartPanel;
}

// calculate total price sum
function calculateTotal() {
  return Object.values(cart).reduce((sum, it) => sum + (it.price * (it.qty || 0)), 0);
}

// render cart items inside panel
function renderCart() {
  ensureCartPanel();
  const itemsWrap = $('#cartItems', cartPanel);
  itemsWrap.innerHTML = '';

  const keys = Object.keys(cart);
  if (keys.length === 0) {
    itemsWrap.innerHTML = '<div class="empty">Cart is empty</div>';
    $('#cartTotal', cartPanel).innerText = '0';
    updateCartCountUI();
    return;
  }

  keys.forEach(key => {
    const it = cart[key];
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${it.img}" alt="${escapeHtml(it.name)}">
      <div class="ci-info">
        <div class="ci-name">${escapeHtml(it.name)}</div>
        <div class="ci-price">RS ${formatNumber(it.price)}</div>
        <div class="ci-qty">
          <button class="qty-decrease" data-id="${it.id}">−</button>
          <span class="qty-value">${it.qty}</span>
          <button class="qty-increase" data-id="${it.id}">+</button>
          <button class="remove-item" data-id="${it.id}">Remove</button>
        </div>
      </div>
    `;
    itemsWrap.appendChild(row);
  });

  // attach handlers for qty buttons & remove
  $$('.qty-increase', itemsWrap).forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      cart[id].qty = (cart[id].qty || 0) + 1;
      saveCart(cart);
      renderCart();
    });
  });
  $$('.qty-decrease', itemsWrap).forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      cart[id].qty = (cart[id].qty || 0) - 1;
      if (cart[id].qty <= 0) delete cart[id];
      saveCart(cart);
      renderCart();
    });
  });
  $$('.remove-item', itemsWrap).forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      if (!confirm('Remove this item?')) return;
      delete cart[id];
      saveCart(cart);
      renderCart();
    });
  });

  // update total and cart count
  $('#cartTotal', cartPanel).innerText = formatNumber(calculateTotal());
  updateCartCountUI();
  cartPanel.classList.remove('hidden'); // auto-show panel when rendering
}

// safe text escape (small)
function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}
function formatNumber(n) {
  return n.toLocaleString('en-US');
}

// when clicking a cloth's add button
function addToCartFromCloth(clothEl) {
  const prod = parseProductFromCloth(clothEl);
  const id = prod.id;
  if (!cart[id]) {
    cart[id] = { ...prod, qty: 1 };
  } else {
    cart[id].qty += 1;
  }
  saveCart(cart);
  updateCartCountUI();
  flashCart(); // animation feedback
}

// small cart flash animation
function flashCart() {
  if (!cartView) return;
  cartView.classList.add('pulse');
  setTimeout(() => cartView.classList.remove('pulse'), 300);
}

// wire up add buttons
function setupAddButtons() {
  clothElems.forEach(clothEl => {
    const btn = clothEl.querySelector('.addcart');
    if (!btn) return;
    btn.addEventListener('click', () => addToCartFromCloth(clothEl));

    // also allow clicking the image to view/add or open details - optional:
    const img = clothEl.querySelector('img');
    if (img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        // open cart panel and highlight this product
        addToCartFromCloth(clothEl);
        ensureCartPanel();
        renderCart();
      });
    }
  });
}

// toggle cart panel when clicking cartView
if (cartView) {
  cartView.addEventListener('click', (e) => {
    ensureCartPanel();
    cartPanel.classList.toggle('hidden');
  });
}

// init
setupAddButtons();
renderCart(); // draws initial UI from persisted cart
updateCartCountUI();
