// ===== گرفتن دوره و شماره‌ی درس از آدرس =====
// مثال آدرس: /lesson.html?course=french&lesson=fr-lesson1
const urlParams = new URLSearchParams(window.location.search);
const courseSlug = urlParams.get('course');
const lessonId = urlParams.get('lesson');

// کد زبان برای Text-to-Speech، به ازای هر دوره
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

// جهت متن برای تمرین جمله‌سازی به زبان مقصد (build-target).
// همه چپ‌به‌راستن به‌جز عربی
const DIRECTION_BY_COURSE = {
  arabic: 'rtl'
};

function getTtsLang() {
  return TTS_LANG_BY_COURSE[courseSlug] || 'en-US';
}

function getTargetDirection() {
  return DIRECTION_BY_COURSE[courseSlug] || 'ltr';
}

let current = 0;
let xp = 0;
let lessonData = null; // از {course}/lessons/data/{lesson}.json لود میشه

function speak(text) {
  const lang = getTtsLang();

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

async function fetchLessonData() {
  const res = await fetch(`${courseSlug}/lessons/data/${lessonId}.json`);
  if (!res.ok) throw new Error(`لود دیتای درس ناموفق بود: ${res.status}`);
  return res.json();
}

window.onload = async function() {
  const exitBtn = document.getElementById("exit-lesson-btn");
  if (exitBtn) exitBtn.setAttribute("href", `${courseSlug}/index.html`);

  if (typeof initUserData === "function") {
    try {
      await initUserData();
    } catch (err) {
      console.warn("گرفتن اطلاعات کاربر ناموفق بود:", err);
    }
  }

  updateHeartDisplay();

  if (typeof getHearts === "function" && getHearts() <= 0) {
    alert("قلب شما تمام شده است! لطفاً منتظر بمانید یا قلب تهیه کنید.");
    window.location.href = "home.html";
    return;
  }

  try {
    lessonData = await fetchLessonData();
  } catch (err) {
    console.error("خطا در گرفتن دیتای درس:", err);
    document.getElementById("app").innerHTML = `
      <h2>❌ درس پیدا نشد</h2>
      <a href="${courseSlug}/index.html">بازگشت</a>
    `;
    return;
  }

  showQuestion();
};

function updateHeartDisplay() {
  const heartElement = document.getElementById("heart-count");
  if (heartElement && typeof getHearts === "function") {
    heartElement.textContent = getHearts();
  }
}

async function onLessonFinished() {
  const finalXP = typeof getTotalXP === "function" ? getTotalXP() : xp;

  if (typeof completeLesson === "function") {
    try {
      await completeLesson(courseSlug, lessonId, lessonData.words || []);
    } catch (err) {
      console.warn("ثبت اتمام درس رو سرور ناموفق بود:", err);
    }
  }

  document.getElementById("app").innerHTML = `
    <h2>درس تمام شد 🎉</h2>
    <p>XP دریافت‌شده: <b>${finalXP}</b></p>
    <a href="${courseSlug}/index.html">بازگشت</a>
  `;
}

function showQuestion() {
  const questions = lessonData.questions || [];

  if (current >= questions.length) {
    onLessonFinished();
    return;
  }

  const q = questions[current];
  if (q.speak) {
    setTimeout(() => { speak(q.speak); }, 200);
  }

  const title = document.getElementById("question-title");
  const content = document.getElementById("question-content");
  const optionsBox = document.getElementById("options");
  const wordBuilder = document.getElementById("word-builder");
  const repeatBtn = document.getElementById("repeat-audio-btn");

  if (repeatBtn) {
    if (q.speak) {
      repeatBtn.style.display = "inline-block";
      repeatBtn.onclick = () => speak(q.speak);
    } else {
      repeatBtn.style.display = "none";
      repeatBtn.onclick = null;
    }
  }

  title.innerText = q.question;
  content.innerHTML = "";
  optionsBox.innerHTML = "";
  wordBuilder.innerHTML = "";
  wordBuilder.classList.add("hidden");

  if (q.type === "image") {
    optionsBox.classList.add("image-grid");
    shuffleArray(q.options).forEach(opt => {
      let btn = document.createElement("button");
      btn.className = "option image-option";
      btn.innerHTML = `<img src="${opt.image}" alt="${opt.text}">`;
      btn.onclick = () => select(opt.text);
      optionsBox.appendChild(btn);
    });
  }

  if (q.type === "word") {
    content.innerHTML = `<img src="${q.image}">`;
    shuffleArray(q.options).forEach(opt => {
      let b = document.createElement("button");
      b.className = "option";
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
  }

  if (q.type === "audio") {
    content.innerHTML = "";
    shuffleArray(q.options).forEach(opt => {
      let b = document.createElement("button");
      b.className = "option";
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
  }

  // build-target: جمله‌سازی به زبان مقصد (قبلاً build-en/build-fr جدا بود)
  // build-fa: ترجمه به فارسی
  else if (q.type === "build-target" || q.type === "build-fa") {
    content.innerHTML = `<p>${q.text}</p>`;

    wordBuilder.classList.remove("hidden");
    wordBuilder.classList.remove("ltr", "rtl");
    optionsBox.classList.remove("ltr", "rtl");

    const dir = (q.type === "build-target") ? getTargetDirection() : "rtl";
    wordBuilder.classList.add(dir);
    optionsBox.classList.add(dir);

    shuffleArray(q.words).forEach(w => {
      const tile = document.createElement("span");
      tile.className = "tile";
      tile.innerText = w;
      tile.dataset.word = w;

      tile.onclick = () => {
        if (tile.parentNode === optionsBox) {
          wordBuilder.appendChild(tile);
        } else if (tile.parentNode === wordBuilder) {
          optionsBox.appendChild(tile);
        }

        const userWords = [...wordBuilder.children].map(el => el.dataset.word);
        if (userWords.length === q.answer.length) {
          checkBuild(userWords, q.answer);
        }
      };

      optionsBox.appendChild(tile);
    });
  }
}

async function safeAddXP(amount) {
  try {
    if (typeof addXP === "function") {
      await addXP(amount);
    }
  } catch (err) {
    console.warn("ثبت XP رو سرور ناموفق بود (آفلاین یا خطای شبکه):", err);
  }
}

async function safeLoseHeart() {
  try {
    if (typeof loseHeart === "function") {
      await loseHeart();
    }
  } catch (err) {
    console.warn("کم کردن قلب رو سرور ناموفق بود (آفلاین یا خطای شبکه):", err);
  }
}

function showOutOfHearts() {
  document.getElementById("app").innerHTML = `
    <h2>قلب شما تمام شد 💔</h2>
    <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
    <a href="home.html">بازگشت</a>
  `;
}

async function checkBuild(selected, correct) {
  const s = selected.map(w => w.trim().toLowerCase());
  const c = correct.map(w => w.trim().toLowerCase());

  if (JSON.stringify(s) === JSON.stringify(c)) {
    xp += 5;
    await safeAddXP(5);
    current++;
    showQuestion();
  } else {
    alert("اشتباه بود! دوباره تلاش کن.");
    await safeLoseHeart();
    updateHeartDisplay();
    if (typeof getHearts === "function" && getHearts() <= 0) {
      showOutOfHearts();
      return;
    }
  }
}

async function select(ans) {
  const correct = lessonData.questions[current].answer;

  if (String(ans).trim().toLowerCase() === String(correct).trim().toLowerCase()) {
    xp += 5;
    await safeAddXP(5);
    current++;
    showQuestion();
  } else {
    alert("اشتباه بود! دوباره تلاش کن.");
    await safeLoseHeart();
    updateHeartDisplay();
    if (typeof getHearts === "function" && getHearts() <= 0) {
      showOutOfHearts();
      return;
    }
  }
}

function removeLastBuilderItem() {
  const wordBuilder = document.getElementById("word-builder");
  const optionsBox = document.getElementById("options");
  if (!wordBuilder || !optionsBox) return;
  if (wordBuilder.children.length === 0) return;
  const lastItem = wordBuilder.lastElementChild;
  if (lastItem) optionsBox.prepend(lastItem);
}

document.addEventListener("keydown", function (e) {
  const wordBuilder = document.getElementById("word-builder");
  if (!wordBuilder) return;
  if (e.key === "Backspace") {
    e.preventDefault();
    removeLastBuilderItem();
  }
});

function shuffleArray(arr) {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}