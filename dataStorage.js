// این فایل به‌جای تعریف دوباره‌ی API_URL، از همون متغیری که
// config.js تعریف کرده استفاده می‌کنه (باید همیشه بعد از config.js لود بشه)
const API_BASE = `${API_URL}/api`;

let currentUser = null;
let heartsCache = 5;
let xpCache = 0;

const HEART_REGEN_TIME = 4 * 60 * 60 * 1000; // 4 ساعت

// ======================
// HELPER
// ======================

async function apiRequest(url, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token && !options.skipAuth) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });

  let data = {};
  try { data = await res.json(); } catch {}

  if (!res.ok) throw new Error(data.detail || "خطای سرور");
  return data;
}

// ======================
// SESSION
// ======================

function loadUserFromStorage() {
  const saved = localStorage.getItem("user");
  if (saved) currentUser = JSON.parse(saved);
}

function saveUser(user) {
  currentUser = user;
  localStorage.setItem("user", JSON.stringify(user));

  if (user.access_token) {
    localStorage.setItem("access_token", user.access_token);
  }
}

function getToken() {
  return localStorage.getItem("access_token");
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("premiumUntil");
}

function getUserId() { return currentUser?.id; }
function getUserProfile() { return currentUser; }
function isLoggedIn() { return currentUser != null && !!getToken(); }

// ======================
// AUTH
// ======================

async function registerUser(data) {
  const user = await apiRequest(`${API_BASE}/register`, {
    method: "POST",
    skipAuth: true,
    body: JSON.stringify({
      full_name: data.name || data.full_name,
      username: data.username,
      phone_number: data.phone || data.phone_number || data.mobile,
      password: data.password
    })
  });
  saveUser(user);
  return user;
}

async function loginUser(username, password) {
  const user = await apiRequest(`${API_BASE}/login`, {
    method: "POST",
    skipAuth: true,
    body: JSON.stringify({ username, password })
  });
  saveUser(user);
  return user;
}

// ======================
// PREMIUM (حالا واقعاً از سرور تایید می‌گیره)
// ======================

function isPremium() {
  const until = localStorage.getItem("premiumUntil");
  if (!until) return false;
  return new Date(parseInt(until)) > new Date();
}

// planId باید یکی از این‌ها باشه: premium_30d, premium_90d, premium_180d, premium_365d
async function buyPremium(planId) {
  if (!isLoggedIn()) {
    throw new Error("ابتدا وارد حساب کاربری خود شوید");
  }

  const data = await apiRequest(`${API_BASE}/premium/buy`, {
    method: "POST",
    body: JSON.stringify({ plan: planId })
  });

  // expires_on از سرور میاد، نه از محاسبه‌ی خودِ مرورگر
  const expiresAt = new Date(data.expires_on).getTime();
  localStorage.setItem("premiumUntil", expiresAt);

  if (currentUser) {
    currentUser.premium = true;
    localStorage.setItem("user", JSON.stringify(currentUser));
  }

  return data;
}

// ======================
// HEARTS
// ======================

async function fetchHearts() {
  if (isPremium()) {
    heartsCache = 999;
    return heartsCache;
  }

  if (!isLoggedIn()) {
    heartsCache = 5;
    return heartsCache;
  }

  try {
    const data = await apiRequest(`${API_BASE}/hearts/me`, { method: "GET" });
    heartsCache = data.heart_count;
  } catch (err) {
    console.error("خطا در گرفتن قلب‌ها:", err);
  }

  return heartsCache;
}

function getHearts() {
  if (isPremium()) return 999;
  return heartsCache;
}

async function loseHeart() {
  if (isPremium()) return 999;

  if (!isLoggedIn()) {
    heartsCache = Math.max(0, heartsCache - 1);
    return heartsCache;
  }

  try {
    const data = await apiRequest(`${API_BASE}/hearts/decrease`, { method: "POST" });
    heartsCache = data.remaining;
  } catch (err) {
    console.error("خطا در کم کردن قلب:", err);
  }

  return heartsCache;
}

// ======================
// XP
// ======================

async function addXP(amount, lesson_slug = "general") {
  if (!isLoggedIn()) {
    xpCache = parseInt(localStorage.getItem("xp") || "0") + amount;
    localStorage.setItem("xp", xpCache);
    return xpCache;
  }

  try {
    const data = await apiRequest(`${API_BASE}/progress/xp`, {
      method: "POST",
      body: JSON.stringify({ lesson_slug, amount })
    });
    xpCache = data.xp;
  } catch (err) {
    console.error("خطا در ثبت XP:", err);
  }

  return xpCache;
}

async function fetchXP() {
  xpCache = parseInt(localStorage.getItem("xp") || "0");
  return xpCache;
}

function getTotalXP() { return xpCache; }

// ======================
// INIT
// ======================

async function initUserData() {
  loadUserFromStorage();
  await fetchHearts();
  await fetchXP();
}

// ======================
// GLOBAL EXPORTS
// ======================

window.initUserData = initUserData;

window.registerUser = registerUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.getToken = getToken;

window.getUserProfile = getUserProfile;
window.isLoggedIn = isLoggedIn;
window.isPremium = isPremium;
window.buyPremium = buyPremium;

window.getHearts = getHearts;
window.loseHeart = loseHeart;
window.fetchHearts = fetchHearts;

window.addXP = addXP;
window.getTotalXP = getTotalXP;