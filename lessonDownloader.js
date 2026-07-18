// lessonDownloader.js
// مسئول دانلود و کش کردن فایل‌های هر درس رو خودِ گوشی/مرورگر کاربر
// از Cache Storage API استفاده می‌کنه (همونی که sw.js هم باهاش کار می‌کنه)

const LESSON_CACHE_NAME = "bijo-lessons-v1";

function isLessonDownloaded(lessonId) {
  return localStorage.getItem(`lesson_downloaded_${lessonId}`) === "1";
}

function markLessonDownloaded(lessonId) {
  localStorage.setItem(`lesson_downloaded_${lessonId}`, "1");
}

/**
 * urls: آرایه‌ای از مسیر همه‌ی فایل‌های لازم برای این درس
 * (html, js, css, عکسا)
 */
async function downloadLesson(lessonId, urls) {
  if (isLessonDownloaded(lessonId)) return;

  if (!("caches" in window)) {
    // مرورگر خیلی قدیمیه یا Cache API در دسترس نیست؛ بدون کش رد شو
    return;
  }

  const cache = await caches.open(LESSON_CACHE_NAME);

  // addAll اگه یکی از فایل‌ها fail بشه کل عملیات رو fail می‌کنه،
  // برای همین تک‌تک اضافه می‌کنیم تا یه فایل گم‌شده کل درس رو خراب نکنه
  await Promise.all(
    urls.map(async (url) => {
      try {
        const already = await cache.match(url);
        if (!already) {
          const res = await fetch(url);
          if (res.ok) await cache.put(url, res.clone());
        }
      } catch (err) {
        console.warn("دانلود این فایل ناموفق بود:", url, err);
      }
    })
  );

  markLessonDownloaded(lessonId);
}

/**
 * تابعی که intro.js صداش می‌زنه: اگه درس قبلاً دانلود نشده،
 * یه لودینگ نشون میده، دانلود می‌کنه، بعد به صفحه‌ی درس میره
 */
async function startLessonWithDownload(lessonId, urls, nextPage, loadingElementId) {
  const loadingEl = document.getElementById(loadingElementId);

  if (isLessonDownloaded(lessonId)) {
    window.location.href = nextPage;
    return;
  }

  if (loadingEl) loadingEl.style.display = "flex";

  try {
    await downloadLesson(lessonId, urls);
  } catch (err) {
    console.error("خطا در دانلود درس:", err);
    // حتی اگه دانلود ناقص بود، بذار کاربر بره تو درس (آنلاین لود میشه)
  }

  window.location.href = nextPage;
}

window.isLessonDownloaded = isLessonDownloaded;
window.downloadLesson = downloadLesson;
window.startLessonWithDownload = startLessonWithDownload;