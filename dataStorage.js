const API_URL = "http://127.0.0.1:8000/api";

let currentUser = null;
let heartsCache = 5;
let xpCache = 0;

const HEART_REGEN_TIME = 4 * 60 * 60 * 1000; // 4 ساعت

// ======================
// HELPER
// ======================

async function apiRequest(url, options = {}) {
  const res = await fetch(url, options);
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
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem("user");
}

function getUserId() { return currentUser?.id; }
function getUserProfile() { return currentUser; }
function isLoggedIn() { return currentUser != null; }

// ======================
// AUTH
// ======================

async function registerUser(data) {
  const user = await apiRequest(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
  const user = await apiRequest(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  saveUser(user);
  return user;
}

// ======================
// PREMIUM
// ======================

function isPremium() {
  const until = localStorage.getItem("premiumUntil");
  if (!until) return false;
  return new Date(parseInt(until)) > new Date();
}

// ======================
// HEARTS
// ======================

async function fetchHearts() {
  if (isPremium()) {
    heartsCache = 999;
    return heartsCache;
  }
  checkAndRegenHearts();
  return heartsCache;
}

function getHearts() {
  if (isPremium()) return 999;
  return heartsCache;
}

async function loseHeart() {
  if (isPremium()) return 999;
  heartsCache = Math.max(0, heartsCache - 1);
  localStorage.setItem("hearts", heartsCache);
  if (!localStorage.getItem("lastHeartLostTime") || heartsCache === 4) {
    localStorage.setItem("lastHeartLostTime", Date.now());
  }
  return heartsCache;
}

async function gainHeart() {
  if (isPremium()) return 999;
  heartsCache = Math.min(5, heartsCache + 1);
  localStorage.setItem("hearts", heartsCache);
  if (heartsCache >= 5) localStorage.removeItem("lastHeartLostTime");
  return heartsCache;
}

// ======================
// HEART REGEN
// ======================

function checkAndRegenHearts() {
  if (isPremium()) {
    heartsCache = 999;
    return;
  }
  const now = Date.now();
  let hearts = parseInt(localStorage.getItem("hearts") ?? "5");

  if (hearts >= 5) {
    heartsCache = 5;
    localStorage.removeItem("lastHeartLostTime");
    return;
  }

  const last = parseInt(localStorage.getItem("lastHeartLostTime") || now);
  const diff = now - last;
  const healed = Math.floor(diff / HEART_REGEN_TIME);

  if (healed > 0) {
    hearts = Math.min(5, hearts + healed);
    localStorage.setItem("hearts", hearts);
    if (hearts >= 5) {
      localStorage.removeItem("lastHeartLostTime");
    } else {
      localStorage.setItem("lastHeartLostTime", last + healed * HEART_REGEN_TIME);
    }
  }

  heartsCache = hearts;
}

function getTimeUntilNextHeart() {
  if (isPremium()) return null;
  const hearts = parseInt(localStorage.getItem("hearts") ?? "5");
  if (hearts >= 5) return null;
  const last = parseInt(localStorage.getItem("lastHeartLostTime") || Date.now());
  const elapsed = Date.now() - last;
  const remaining = HEART_REGEN_TIME - (elapsed % HEART_REGEN_TIME);
  return Math.ceil(remaining / 1000);
}

// ======================
// XP
// ======================

async function addXP(amount, lesson_slug = "general") {
  xpCache = parseInt(localStorage.getItem("xp") || "0") + amount;
  localStorage.setItem("xp", xpCache);
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

window.getUserProfile = getUserProfile;
window.isLoggedIn = isLoggedIn;
window.isPremium = isPremium;

window.getHearts = getHearts;
window.loseHeart = loseHeart;
window.gainHeart = gainHeart;
window.checkAndRegenHearts = checkAndRegenHearts;
window.getTimeUntilNextHeart = getTimeUntilNextHeart;

window.addXP = addXP;
window.getTotalXP = getTotalXP;