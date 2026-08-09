/* ===========================================================
   Trạm Rèm - shop.js
   Shared helpers for: session (login/register/profile) và
   giỏ hàng (cart) dùng localStorage để mô phỏng dữ liệu người
   dùng phía client (đáp ứng tiêu chí P6 - Login/Register/Profile/Cart
   của Unit 13 ASM2).
   =========================================================== */

const TR_USER_KEY = 'tramrem_user';
const TR_CART_KEY = 'tramrem_cart';

/* Danh sách tài khoản demo (mô phỏng dữ liệu server-side) */
const TR_DEMO_ACCOUNTS = [
  { email: 'khach@tramrem.vn', password: '123456', name: 'Nguyễn Văn Khách', phone: '0909123456' }
];

/* ---------- SESSION HELPERS ---------- */
function trGetUser() {
  try {
    const raw = localStorage.getItem(TR_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function trSetUser(user) {
  localStorage.setItem(TR_USER_KEY, JSON.stringify(user));
}

function trLogout() {
  localStorage.removeItem(TR_USER_KEY);
  window.location.href = 'login.html';
}

/* ---------- CART HELPERS ---------- */
function trGetCart() {
  try {
    const raw = localStorage.getItem(TR_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function trSetCart(cart) {
  localStorage.setItem(TR_CART_KEY, JSON.stringify(cart));
  trUpdateCartBadge();
}

function trAddToCart(item) {
  const cart = trGetCart();
  const existing = cart.find((p) => p.id === item.id);
  if (existing) {
    existing.qty += item.qty || 1;
  } else {
    cart.push({ ...item, qty: item.qty || 1 });
  }
  trSetCart(cart);
}

function trCartCount() {
  return trGetCart().reduce((sum, item) => sum + item.qty, 0);
}

function trUpdateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = trCartCount();
}

function trUpdateAccountLabel() {
  const label = document.getElementById('accountLabel');
  const link = document.getElementById('accountLink');
  const user = trGetUser();
  if (label && link) {
    if (user) {
      label.textContent = user.name.split(' ').slice(-1)[0];
      link.setAttribute('href', 'profile.html');
    } else {
      label.textContent = 'Đăng nhập';
      link.setAttribute('href', 'login.html');
    }
  }
}

/* Seed a default demo cart the first time a visitor lands on the site,
   so the Cart page (P6) always has content to demonstrate quantity
   controls, removal and total calculation. */
function trSeedCartIfEmpty() {
  if (!localStorage.getItem(TR_CART_KEY)) {
    trSetCart([
      { id: 'rem-vai-01', name: 'Rèm vải chống nắng', variant: 'Màu be, khổ 2.4m', price: 3200000, qty: 2, img: 'img/phongngu1.jpg' },
      { id: 'rem-cv-01', name: 'Rèm cầu vồng cao cấp', variant: 'Màu xám, khổ 1.8m', price: 4500000, qty: 1, img: 'img/cauvong2.jpg' },
      { id: 'rem-sg-01', name: 'Rèm sáo gỗ tự nhiên', variant: 'Gỗ sồi, khổ 1.5m', price: 5900000, qty: 1, img: 'img/saogo1.jpg' }
    ]);
  }
}

/* ---------- CATEGORY: ADD TO CART ---------- */
function trBindAddToCart() {
  document.addEventListener('click', function (event) {
    const button = event.target.closest('.add-to-cart');
    if (!button) return;

    const item = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      qty: 1,
      img: button.dataset.img,
      variant: ''
    };

    trAddToCart(item);

    const oldText = button.textContent;
    button.textContent = 'Đã thêm ✓';
    button.disabled = true;

    setTimeout(function () {
      button.textContent = oldText;
      button.disabled = false;
    }, 1200);

    // Thông báo ngắn để người dùng biết sản phẩm đã được thêm.
    alert(item.name + ' đã được thêm vào giỏ hàng!');
  });
}


document.addEventListener('DOMContentLoaded', function () {
  trSeedCartIfEmpty();
  trUpdateCartBadge();
  trUpdateAccountLabel();
  trBindAddToCart();
});
