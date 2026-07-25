// ===== گرفتن دوره و شماره‌ی درس از آدرس =====
// مثال آدرس: /intro.html?course=english&lesson=en-lesson1
const urlParams = new URLSearchParams(window.location.search);
const courseSlug = urlParams.get('course');
const lessonId = urlParams.get('lesson');

// کد زبان برای Text-to-Speech، به ازای هر دوره.
// وقتی زبان جدیدی اضافه کردی، فقط همینجا یه خط اضافه کن.
const TTS_LANG_BY_COURSE = {
  english: 'en-US',
  french: 'fr-FR',
  spanish: 'es-ES',
  german: 'de-DE',
  italian: 'it-IT',
  turkish: 'tr-TR',
  arabic: 'ar-SA',
  russian: 'ru-RU',
  japanese: 'ja-JP',
  korean: 'ko-KR',
  chinese: 'zh-CN'
};

function getTtsLang() {
  return TTS_LANG_BY_COURSE[courseSlug] || 'en-US';
}

// ===== تابع پخش صدا =====
function speak(text) {
  const lang = getTtsLang();

  // اگه داخل اپ Capacitor اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: lang,
        rate: 0.9,
        category: "ambient"
      });
    } catch (err) {
      console.warn("خطا در پخش صدا (native):", err);
    }
    return;
  }

  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// داده‌ی درس (عنوان، صفحه‌ی بعدی، کلمات) رو از سرور می‌گیره —
// دیگه هاردکد تو intro.js نیست، برای همینه که یه intro.js واحد
// برای هر ۱۱ زبون کافیه.
async function fetchLessonData() {
  const url = `${courseSlug}/lessons/data/${lessonId}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`لود دیتای درس ناموفق بود: ${res.status}`);
  return res.json();
}

// فایل‌های لازم برای هر درس: چون lesson.html/lesson.js حالا مشترکن
// (فقط یه‌بار کش میشن)، اینجا فقط عکس‌های همین درس رو لازم داریم
function getLessonAssetUrls(lesson) {
  return (lesson.words || []).map(w => w.image).filter(Boolean);
}

function renderIntro(lesson) {
  document.getElementById("lesson-title").textContent = "📚 " + lesson.title;

  const container = document.getElementById("word-grid");
  container.innerHTML = "";

  lesson.words.forEach((w) => {
    const card = document.createElement("div");
    card.className = "word-card";
    card.innerHTML = `
      <span class="word-speaker">🔊</span>
      <div class="word-text">
        <div class="word-en">${w.term}</div>
        <div class="word-fa">${w.translation}</div>
      </div>
      ${w.image ? `<img src="${w.image}" alt="${w.term}">` : ""}
    `;
    card.addEventListener("click", () => {
      speak(w.term);
      card.classList.add("playing");
      setTimeout(() => card.classList.remove("playing"), 800);
    });
    container.appendChild(card);
  });

  document.getElementById("start-lesson-btn").addEventListener("click", () => {
    const urls = getLessonAssetUrls(lesson);
    const targetPage = `lesson.html?course=${encodeURIComponent(courseSlug)}&lesson=${encodeURIComponent(lessonId)}`;
    window.startLessonWithDownload(
      `${courseSlug}-${lessonId}`,
      urls,
      targetPage,
      "lesson-loading"
    );
  });
}

function renderError() {
  document.getElementById("intro-container").innerHTML = `
    <h2>❌ درس پیدا نشد</h2>
    <p>لطفاً از صفحه‌ی اصلی دوباره وارد شو.</p>
    <a href="/${courseSlug || 'english'}/index.html">بازگشت</a>
  `;
}

async function initIntroPage() {
  if (!courseSlug || !lessonId) {
    renderError();
    return;
  }

  const loadingEl = document.getElementById("lesson-loading");
  let lesson;

  try {
    lesson = await fetchLessonData();
  } catch (err) {
    console.error("خطا در گرفتن دیتای درس:", err);
    renderError();
    return;
  }

  if (loadingEl) loadingEl.style.display = "flex";
  try {
    const urls = getLessonAssetUrls(lesson);
    await window.downloadLesson(`${courseSlug}-${lessonId}`, urls);
  } catch (err) {
    console.warn("دانلود اولیه‌ی درس ناموفق بود:", err);
  }
  if (loadingEl) loadingEl.style.display = "none";

  renderIntro(lesson);
}

window.onload = initIntroPage;