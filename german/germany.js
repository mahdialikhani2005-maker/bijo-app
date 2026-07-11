document.addEventListener("DOMContentLoaded", () => {

  const currentFlag = document.getElementById("current-flag");
  const langMenu = document.querySelector(".lang-menu");

  if (!currentFlag || !langMenu) return;

  // زبان ذخیره شده
  let activeCourse = localStorage.getItem("course") || "en";

  // نمایش پرچم فعلی هنگام باز شدن صفحه
  if (activeCourse === "fr") {
    currentFlag.src = "../assets/fr.png";
  } else {
    currentFlag.src = "../assets/en.png";
  }

  // باز و بسته شدن منو
  currentFlag.addEventListener("click", () => {
    langMenu.classList.toggle("hidden");
  });

  // کلیک روی پرچم‌ها
  document.querySelectorAll(".lang-menu img").forEach(flag => {

    flag.addEventListener("click", () => {

      const lang = flag.dataset.lang;

      localStorage.setItem("course", lang);

      if (lang === "en") {
        window.location.href = "index.html";
      }

      if (lang === "fr") {
        window.location.href = "../french/index.html"; 
      }

    });

  });

});
document.addEventListener("DOMContentLoaded", () => {
  const levelBtn = document.getElementById("levelBtn");
  const levelMenu = document.getElementById("levelMenu");

  if (levelBtn && levelMenu) {
    levelBtn.addEventListener("click", () => {
      levelMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!levelBtn.contains(e.target) && !levelMenu.contains(e.target)) {
        levelMenu.classList.remove("show");
      }
    });
  }
});
// این توابع را در یک فایل JS که در همه صفحات هست، قرار بده
// یا در main.js اصلی

const globalLoader = document.getElementById('global-loader');
const globalLoaderText = document.getElementById('global-loader-text');

function showLoader(text = "در حال بارگذاری...") {
  if (globalLoader && globalLoaderText) {
    globalLoaderText.textContent = text;
    globalLoader.classList.remove('hidden');
    // اطمینان از اینکه فعال است
    document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول صفحه در زمان لودینگ
  }
}

function hideLoader() {
  if (globalLoader) {
    globalLoader.classList.add('hidden');
    // بازگرداندن قابلیت اسکرول
    document.body.style.overflow = '';
  }
}

// --- مثال نحوه استفاده ---

// فرض کنید یک تابع داریم که داده‌ها را لود می‌کند
async function loadCourseData() {
  showLoader("در حال بارگذاری اطلاعات درس..."); // نمایش لودر

  try {
    // شبیه‌سازی یک عملیات طولانی
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("داده‌های درس لود شد.");
    // ... اینجا کد واقعی لود داده‌ها ...
  } catch (error) {
    console.error("خطا در لود داده‌ها:", error);
    // اینجا می‌توانی یک toast خطا هم نمایش دهی
  } finally {
    hideLoader(); // مخفی کردن لودر، چه موفق چه ناموفق
  }
}

// برای تست:
// document.addEventListener('DOMContentLoaded', () => {
//   // وقتی صفحه کامل لود شد، این تابع رو صدا بزن
//   loadCourseData();
// });

// مثال دیگر: برای دکمه ورود
// const loginButton = document.getElementById('login-button');
// loginButton.addEventListener('click', async () => {
//   showLoader("در حال ورود...");
//   await loginUser(); // تابع ورود شما
//   hideLoader();
// });
