// lessonDownloader.js
// مسئول دانلود و کش کردن فایل‌های هر درس رو خودِ گوشی کاربر.
// فایل‌های درس‌ها (HTML/JS/عکس) دیگه داخل خودِ اپ بسته‌بندی نمیشن؛
// این فایل اونا رو از روی سایت زنده (گیت‌هاب پیجز) دانلود می‌کنه.
//
// ⚠️ وقتی بعداً یه سرور دائمی/واقعی گرفتی، فقط همین یه خط رو عوض کن:
const REMOTE_BASE = "https://mahdialikhani2005-maker.github.io/bijo-app";

const LESSON_CACHE_NAME = "bijo-lessons-v2";

function isLessonDownloaded(lessonId) {
  return localStorage.getItem(`lesson_downloaded_${LESSON_CACHE_NAME}_${lessonId}`) === "1";
}

function markLessonDownloaded(lessonId) {
  localStorage.setItem(`lesson_downloaded_${LESSON_CACHE_NAME}_${lessonId}`, "1");
}

// یه مسیر نسبی (مثل "lesson1.js" یا "../../media/x.png") رو به دو
// چیز تبدیل می‌کنه: آدرس محلی (که اپ باهاش صداش می‌زنه) و آدرس واقعی
// رو گیت‌هاب پیجز (که ازش دانلود می‌کنیم)
function resolveUrls(relativePath) {
  const localUrlObj = new URL(relativePath, window.location.href);
  const remoteUrl = REMOTE_BASE + localUrlObj.pathname;
  return { localUrl: localUrlObj.href, remoteUrl };
}

async function downloadLesson(lessonId, relativeUrls) {
  if (isLessonDownloaded(lessonId)) return;

  if (!("caches" in window)) return;

  const cache = await caches.open(LESSON_CACHE_NAME);

  const results = await Promise.all(
    relativeUrls.map(async (relativePath) => {
      try {
        const { localUrl, remoteUrl } = resolveUrls(relativePath);

        const already = await cache.match(localUrl);
        if (already) return true;

        const res = await fetch(remoteUrl);
        if (res.ok) {
          await cache.put(localUrl, res.clone());
          return true;
        }
        console.warn("دانلود این فایل ناموفق بود (status):", remoteUrl, res.status);
        return false;
      } catch (err) {
        console.warn("دانلود این فایل ناموفق بود:", relativePath, err);
        return false;
      }
    })
  );

  const allSucceeded = results.every(r => r === true);
  if (allSucceeded) {
    markLessonDownloaded(lessonId);
  }
}

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
  }

  window.location.href = nextPage;
}

window.isLessonDownloaded = isLessonDownloaded;
window.downloadLesson = downloadLesson;
window.startLessonWithDownload = startLessonWithDownload;