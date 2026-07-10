/* courseRouter.js
   مسئول:
   - تعیین کورس فعال (english/french)
   - هماهنگ کردن userLang و currentCourse
   - پویا کردن لینک‌های bottom bar
*/

const STORAGE_KEY = "duolingo_app_data"; // مطابق dataStorage.js

function getAllDataSafe() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveAllDataSafe(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** گرفتن کورس فعلی از dataStorage (منبع اصلی) */
export function getCurrentCourse() {
  const data = getAllDataSafe();
  return (data && data.currentCourse) ? data.currentCourse : "english";
}

/** ست کردن کورس فعلی + همگام‌سازی userLang */
export function setCurrentCourse(course) {
  const normalized = (course === "french") ? "french" : "english";

  let data = getAllDataSafe();
  if (!data) {
    // اگر هنوز duolingo_app_data ساخته نشده، یک اسکلت حداقلی درست می‌کنیم
    data = {
      global: { hearts: 5, streak: 0, lastHeartUpdate: null },
      courses: {
        english: { xp: 0, lessonsCompleted: 0, learnedWords: [] },
        french: { xp: 0, lessonsCompleted: 0, learnedWords: [] }
      },
      currentCourse: "english"
    };
  }

  data.currentCourse = normalized;
  saveAllDataSafe(data);

  // همگام‌سازی با languageManager.js
  localStorage.setItem("userLang", normalized);
}

/**
 * پویا کردن لینک‌های bottom bar
 * انتظار: در HTML لینک‌ها id داشته باشند:
 *  - #nav-home
 *  - #nav-progress
 *  - #nav-profile
 */
export function wireBottomNav() {
  const home = document.querySelector("#nav-home");
  const progress = document.querySelector("#nav-progress");
  const profile = document.querySelector("#nav-profile");

  if (!home || !progress || !profile) return;

  // ما لینک‌ها را ثابت می‌گذاریم و مقصدها را "صفحات مشترک" می‌کنیم
  // چون خود صفحات بر اساس currentCourse رندر می‌شوند.
  home.setAttribute("href", "index.html");
  progress.setAttribute("href", "progress.html");
  profile.setAttribute("href", "profile.html");

  // (اختیاری) فعال کردن آیتم صفحه فعلی
  const path = (location.pathname.split("/").pop() || "").toLowerCase();

  // پاک کردن active
  [home, progress, profile].forEach(a => a.classList.remove("active"));

  if (path.includes("progress")) progress.classList.add("active");
  else if (path.includes("profile")) profile.classList.add("active");
  else home.classList.add("active");
}

/**
 * وقتی وارد صفحه‌ای می‌شویم که "وابسته به کورس" است (مثلا lesson های فرانسوی)
 * می‌توانیم از طریق query مثل ?course=french کورس را ست کنیم.
 */
export function applyCourseFromQuery() {
  const params = new URLSearchParams(location.search);
  const course = params.get("course");
  if (course === "english" || course === "french") {
    setCurrentCourse(course);
  }
}

// اجرای خودکار
document.addEventListener("DOMContentLoaded", () => {
  applyCourseFromQuery();
  wireBottomNav();
});
