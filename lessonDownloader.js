// lessonDownloader.js
// مسئول دانلود و کش کردن فایل‌های هر درس رو خودِ گوشی/مرورگر کاربر

const LESSON_CACHE_NAME = "bijo-lessons-v1";

function isLessonDownloaded(lessonId) {
  return localStorage.getItem(`lesson_downloaded_${lessonId}`) === "1";
}

function markLessonDownloaded(lessonId) {
  localStorage.setItem(`lesson_downloaded_${lessonId}`, "1");
}

async function downloadLesson(lessonId, urls) {
  if (isLessonDownloaded(lessonId)) return;

  if (!("caches" in window)) return;

  const cache = await caches.open(LESSON_CACHE_NAME);

  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const already = await cache.match(url);
        if (already) return true;

        const res = await fetch(url);
        if (res.ok) {
          await cache.put(url, res.clone());
          return true;
        }
        console.warn("دانلود این فایل ناموفق بود (status):", url, res.status);
        return false;
      } catch (err) {
        console.warn("دانلود این فایل ناموفق بود:", url, err);
        return false;
      }
    })
  );

  // فقط اگه واقعاً همه‌ی فایل‌ها با موفقیت دانلود/کش شدن، علامت بزن
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

  // حتی اگه دانلود کامل نشد، بذار کاربر بره تو درس (آنلاین لود میشه)
  window.location.href = nextPage;
}

window.isLessonDownloaded = isLessonDownloaded;
window.downloadLesson = downloadLesson;
window.startLessonWithDownload = startLessonWithDownload;