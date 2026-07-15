// ============================================================
//  متغیرهای عمومی
// ============================================================
let current = 0;
let xp = 0;
let hearts = 5;
let totalQuestions = 0;
let isAnswering = false;

// ============================================================
//  دیتابیس سوالات (با ترجمه فارسی)
// ============================================================
const questions = [
  // -------- IMAGE SELECTION --------
  {
    type: "image",
    question: "какой из них счастливый ?",
    questionFa: "کدوم یکی خوشحال هست؟",
    speak: "счастливый",
    options: [
      { text: "грустный", image: "../../media/feelings/sad.png" },
      { text: "счастливый", image: "../../media/feelings/happy.png" },
      { text: "злой", image: "../../media/feelings/angry.png" },
      { text: "усталый", image: "../../media/feelings/tired.png" }
    ],
    answer: "счастливый"
  },
  {
    type: "image",
    question: "какой из них грустный ?",
    questionFa: "کدوم یکی ناراحت هست؟",
    speak: "грустный",
    options: [
      { text: "усталый", image: "../../media/feelings/tired.png" },
      { text: "грустный", image: "../../media/feelings/sad.png" },
      { text: "голодный", image: "../../media/feelings/hungry.png" },
      { text: "счастливый", image: "../../media/feelings/happy.png" }
    ],
    answer: "грустный"
  },
  {
    type: "image",
    question: "какой из них злой ?",
    questionFa: "کدوم یکی عصبانی هست؟",
    speak: "злой",
    options: [
      { text: "счастливый", image: "../../media/feelings/happy.png" },
      { text: "злой", image: "../../media/feelings/angry.png" },
      { text: "голодный", image: "../../media/feelings/hungry.png" },
      { text: "грустный", image: "../../media/feelings/sad.png" }
    ],
    answer: "злой"
  },
  {
    type: "image",
    question: "какой из них усталый ?",
    questionFa: "کدوم یکی خسته هست؟",
    speak: "усталый",
    options: [
      { text: "злой", image: "../../media/feelings/angry.png" },
      { text: "грустный", image: "../../media/feelings/sad.png" },
      { text: "усталый", image: "../../media/feelings/tired.png" },
      { text: "счастливый", image: "../../media/feelings/happy.png" }
    ],
    answer: "усталый"
  },
  {
    type: "image",
    question: "какой из них голодный ?",
    questionFa: "کدوم یکی گرسنه هست؟",
    speak: "голодный",
    options: [
      { text: "усталый", image: "../../media/feelings/tired.png" },
      { text: "счастливый", image: "../../media/feelings/happy.png" },
      { text: "грустный", image: "../../media/feelings/sad.png" },
      { text: "голодный", image: "../../media/feelings/hungry.png" }
    ],
    answer: "голодный"
  },

  // -------- WORD FROM IMAGE --------
  {
    type: "word",
    question: "Что это за изображение?",
    questionFa: "این عکس چیه؟",
    image: "../../media/feelings/happy.png",
    options: ["грустный", "счастливый", "злой", "усталый"],
    answer: "счастливый"
  },
  {
    type: "word",
    question: "Что это за изображение?",
    questionFa: "این عکس چیه؟",
    image: "../../media/feelings/sad.png",
    options: ["усталый", "грустный", "голодный", "счастливый"],
    answer: "грустный"
  },
  {
    type: "word",
    question: "Что это за изображение?",
    questionFa: "این عکس چیه؟",
    image: "../../media/feelings/angry.png",
    options: ["счастливый", "злой", "голодный", "грустный"],
    answer: "злой"
  },
  {
    type: "word",
    question: "Что это за изображение?",
    questionFa: "این عکس چیه؟",
    image: "../../media/feelings/tired.png",
    options: ["злой", "грустный", "усталый", "счастливый"],
    answer: "усталый"
  },
  {
    type: "word",
    question: "Что это за изображение?",
    questionFa: "این عکس چیه؟",
    image: "../../media/feelings/hungry.png",
    options: ["усталый", "счастливый", "грустный", "голодный"],
    answer: "голодный"
  },

  // -------- AUDIO --------
  {
    type: "audio",
    speak: "счастливый",
    question: "Какое слово ты услышал?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["грустный", "счастливый", "злой", "усталый"],
    answer: "счастливый"
  },
  {
    type: "audio",
    speak: "грустный",
    question: "Какое слово ты услышал?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["усталый", "грустный", "голодный", "счастливый"],
    answer: "грустный"
  },
  {
    type: "audio",
    speak: "злой",
    question: "Какое слово ты услышал?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["счастливый", "злой", "голодный", "грустный"],
    answer: "злой"
  },
  {
    type: "audio",
    speak: "усталый",
    question: "Какое слово ты услышал?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["злой", "грустный", "усталый", "счастливый"],
    answer: "усталый"
  },
  {
    type: "audio",
    speak: "голодный",
    question: "Какое слово ты услышал?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["усталый", "счастливый", "грустный", "голодный"],
    answer: "голодный"
  },

  // -------- BUILD RU (ساختن جمله روسی) --------
  {
    type: "build-ru",
    speak: "Я счастлив",
    question: "Составьте русское предложение:",
    questionFa: "جمله روسی رو بساز:",
    text: "من خوشحال هستم",
    words: ["счастлив", "Я"],
    answer: ["Я", "счастлив"]
  },
  {
    type: "build-ru",
    speak: "Я грустный",
    question: "Составьте русское предложение:",
    questionFa: "جمله روسی رو بساز:",
    text: "من ناراحت هستم",
    words: ["грустный", "Я"],
    answer: ["Я", "грустный"]
  },
  {
    type: "build-ru",
    speak: "Я злой",
    question: "Составьте русское предложение:",
    questionFa: "جمله روسی رو بساز:",
    text: "من عصبانی هستم",
    words: ["злой", "Я"],
    answer: ["Я", "злой"]
  },
  {
    type: "build-ru",
    speak: "Я усталый",
    question: "Составьте русское предложение:",
    questionFa: "جمله روسی رو بساز:",
    text: "من خسته هستم",
    words: ["усталый", "Я"],
    answer: ["Я", "усталый"]
  },
  {
    type: "build-ru",
    speak: "Я голодный",
    question: "Составьте русское предложение:",
    questionFa: "جمله روسی رو بساز:",
    text: "من گرسنه هستم",
    words: ["голодный", "Я"],
    answer: ["Я", "голодный"]
  },

  // -------- BUILD FA (ساختن جمله فارسی) --------
  {
    type: "build-fa",
    speak: "Я счастлив",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "Я счастлив",
    words: ["هستم", "خوشحال", "من"],
    answer: ["من", "خوشحال", "هستم"]
  },
  {
    type: "build-fa",
    speak: "Я грустный",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "Я грустный",
    words: ["هستم", "ناراحت", "من"],
    answer: ["من", "ناراحت", "هستم"]
  },
  {
    type: "build-fa",
    speak: "Я злой",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "Я злой",
    words: ["هستم", "عصبانی", "من"],
    answer: ["من", "عصبانی", "هستم"]
  },
  {
    type: "build-fa",
    speak: "Я усталый",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "Я усталый",
    words: ["هستم", "خسته", "من"],
    answer: ["من", "خسته", "هستم"]
  },
  {
    type: "build-fa",
    speak: "Я голодный",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "Я голодный",
    words: ["هستم", "گرسنه", "من"],
    answer: ["من", "گرسنه", "هستم"]
  }
];

// ============================================================
//  توابع کمکی
// ============================================================
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ============================================================
//  توابع ارتباط با dataStorage.js
// ============================================================
function updateUIStats() {
  if (typeof getHearts === "function") {
    hearts = getHearts();
  }
  const heartEl = document.getElementById("heart-count");
  const xpEl = document.getElementById("xp-display");
  if (heartEl) heartEl.textContent = hearts;
  if (xpEl) xpEl.textContent = typeof getTotalXP === "function" ? getTotalXP() : xp;
}

async function handleCorrectAnswer() {
  xp += 5;
  if (typeof addXP === "function") {
    await addXP(5);
  }
  updateUIStats();
}

async function handleWrongAnswer() {
  if (typeof loseHeart === "function") {
    await loseHeart();
  }
  if (typeof checkAndRegenHearts === "function") {
    checkAndRegenHearts();
  }
  updateUIStats();

  if (hearts <= 0) {
    document.getElementById("app").innerHTML = `
      <div style="text-align:center; padding:40px 20px;">
        <h2 style="color:#e74c3c;">💔 قلبتان تمام شد!</h2>
        <p style="color:#4a5a7a;">لطفاً کمی صبر کنید تا قلب‌ها بازیابی شوند.</p>
        <a href="../index.html" style="display:inline-block; margin-top:20px; background:#4a6cf7; color:#fff; padding:12px 32px; border-radius:60px; text-decoration:none;">بازگشت به خانه</a>
      </div>
    `;
    return true;
  }
  return false;
}

// ============================================================
//  نمایش پیام بازخورد
// ============================================================
function showFeedback(text, type) {
  const el = document.getElementById("feedback-message");
  if (!el) return;
  el.textContent = text;
  el.className = "feedback-message show " + type;
  clearTimeout(el._timeout);
  el._timeout = setTimeout(() => {
    el.className = "feedback-message";
  }, 800);
}

// ============================================================
//  نمایش سوال
// ============================================================
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === "function" ? getTotalXP() : xp;
    document.getElementById("app").innerHTML = `
      <div style="text-align:center; padding:40px 20px;">
        <h2 style="color:#2ecc71;">🎉 درس تمام شد!</h2>
        <p style="color:#1e2a41; font-size:1.2rem;">امتیاز کسب‌شده: <b>${finalXP}</b> XP</p>
        <a href="../index.html" style="display:inline-block; margin-top:24px; background:#4a6cf7; color:#fff; padding:14px 44px; border-radius:60px; text-decoration:none;">بازگشت به خانه</a>
      </div>
    `;
    document.getElementById("progress-bar").style.width = "100%";
    const footer = document.getElementById("lesson-footer");
    if (footer) footer.style.display = "none";
    return;
  }

  const q = questions[current];
  totalQuestions = questions.length;
  
  const currentNumEl = document.getElementById("current-q-num");
  const totalNumEl = document.getElementById("total-q-count");
  const progressBar = document.getElementById("progress-bar");
  
  if (currentNumEl) currentNumEl.textContent = current + 1;
  if (totalNumEl) totalNumEl.textContent = totalQuestions;
  if (progressBar) progressBar.style.width = ((current / totalQuestions) * 100) + "%";

  // پخش صدا
  if (q.speak) {
    setTimeout(() => speak(q.speak), 300);
  }

  const title = document.getElementById("question-title");
  const content = document.getElementById("question-content");
  const optionsBox = document.getElementById("options");
  const wordBuilder = document.getElementById("word-builder");

  // نمایش سوال با ترجمه فارسی
  if (title) {
    title.innerHTML = `
      ${q.question}
      <span style="display:block; font-size:0.9rem; font-weight:400; color:#7c8ba0; margin-top:4px;">
        ${q.questionFa || ''}
      </span>
    `;
  }

  if (content) content.innerHTML = "";
  if (optionsBox) optionsBox.innerHTML = "";
  if (wordBuilder) {
    wordBuilder.innerHTML = "";
    wordBuilder.classList.add("hidden");
  }
  
  const resetBtn = document.getElementById("reset-builder-btn");
  if (resetBtn) resetBtn.style.display = "none";
  
  isAnswering = false;

  // ----- نوع سوال -----
  if (q.type === "image") {
    if (optionsBox) optionsBox.className = "options-container image-grid";
    shuffleArray(q.options).forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option image-option";
      btn.innerHTML = `<img src="${opt.image}" alt="${opt.text}" />`;
      btn.dataset.value = opt.text;
      btn.onclick = () => handleOptionClick(btn, q.answer);
      if (optionsBox) optionsBox.appendChild(btn);
    });
  } 
  else if (q.type === "word") {
    if (content) content.innerHTML = `<img src="${q.image}" alt="word" />`;
    if (optionsBox) optionsBox.className = "options-container";
    shuffleArray(q.options).forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.innerText = opt;
      btn.dataset.value = opt;
      btn.onclick = () => handleOptionClick(btn, q.answer);
      if (optionsBox) optionsBox.appendChild(btn);
    });
  } 
  else if (q.type === "audio") {
    if (content) {
      content.innerHTML = `<button class="audio-btn" onclick="speak('${q.speak}')">🔊 پخش صدا</button>`;
    }
    if (optionsBox) optionsBox.className = "options-container";
    shuffleArray(q.options).forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.innerText = opt;
      btn.dataset.value = opt;
      btn.onclick = () => handleOptionClick(btn, q.answer);
      if (optionsBox) optionsBox.appendChild(btn);
    });
  } 
  else if (q.type === "build-ru" || q.type === "build-fa") {
    if (content) {
      content.innerHTML = `<p style="font-size:1.2rem; font-weight:500; color:#1e2a41;">${q.text}</p>`;
    }
    if (wordBuilder) {
      wordBuilder.classList.remove("hidden");
    }
    if (resetBtn) resetBtn.style.display = "inline-block";

    if (wordBuilder) {
      wordBuilder.classList.remove("ltr", "rtl");
      if (q.type === "build-ru") {
        wordBuilder.classList.add("ltr");
      } else {
        wordBuilder.classList.add("rtl");
      }
    }
    
    if (optionsBox) {
      optionsBox.classList.remove("ltr", "rtl");
      if (q.type === "build-ru") {
        optionsBox.classList.add("ltr");
      } else {
        optionsBox.classList.add("rtl");
      }
    }

    shuffleArray(q.words).forEach(w => {
      const tile = document.createElement("span");
      tile.className = "tile";
      tile.innerText = w;
      tile.dataset.word = w;
      tile.onclick = () => handleTileClick(tile, q);
      if (optionsBox) optionsBox.appendChild(tile);
    });
  }
}

// ============================================================
//  کلیک روی گزینه‌ها
// ============================================================
async function handleOptionClick(btn, correctAnswer) {
  if (isAnswering) return;
  isAnswering = true;

  const selected = btn.dataset.value;
  const isCorrect = String(selected).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase();

  document.querySelectorAll(".option").forEach(b => b.classList.add("disabled"));

  if (isCorrect) {
    btn.classList.add("correct");
    showFeedback("✅ عالی!", "correct");
    await handleCorrectAnswer();
    setTimeout(() => {
      current++;
      showQuestion();
    }, 700);
  } else {
    btn.classList.add("wrong");
    document.querySelectorAll(".option").forEach(b => {
      if (String(b.dataset.value).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase()) {
        b.classList.add("correct");
      }
    });
    showFeedback("❌ دوباره تلاش کن", "wrong");
    const stopped = await handleWrongAnswer();
    if (!stopped) {
      setTimeout(() => {
        document.querySelectorAll(".option").forEach(b => {
          b.classList.remove("wrong", "correct", "disabled");
        });
        isAnswering = false;
      }, 1000);
    } else {
      isAnswering = true;
    }
  }
}

// ============================================================
//  کلیک روی کاشی‌های builder
// ============================================================
function handleTileClick(tile, q) {
  if (isAnswering) return;
  const wordBuilder = document.getElementById("word-builder");
  const optionsBox = document.getElementById("options");

  if (tile.parentNode === optionsBox) {
    wordBuilder.appendChild(tile);
  } else if (tile.parentNode === wordBuilder) {
    optionsBox.appendChild(tile);
  }

  const userWords = [...wordBuilder.children].map(el => el.dataset.word);
  if (userWords.length === q.answer.length) {
    checkBuild(userWords, q.answer);
  }
}

// ============================================================
//  بررسی جواب builder
// ============================================================
async function checkBuild(selected, correct) {
  if (isAnswering) return;
  isAnswering = true;

  const s = selected.map(w => w.trim().toLowerCase());
  const c = correct.map(w => w.trim().toLowerCase());
  const isCorrect = JSON.stringify(s) === JSON.stringify(c);

  document.querySelectorAll(".tile").forEach(t => t.style.pointerEvents = "none");

  if (isCorrect) {
    showFeedback("✅ عالی!", "correct");
    await handleCorrectAnswer();
    setTimeout(() => {
      current++;
      showQuestion();
    }, 700);
  } else {
    showFeedback("❌ دوباره تلاش کن", "wrong");
    const stopped = await handleWrongAnswer();
    if (!stopped) {
      setTimeout(() => {
        resetBuilder();
        document.querySelectorAll(".tile").forEach(t => t.style.pointerEvents = "");
        isAnswering = false;
      }, 1000);
    } else {
      isAnswering = true;
    }
  }
}

// ============================================================
//  دکمه پاک کردن builder
// ============================================================
function resetBuilder() {
  const wordBuilder = document.getElementById("word-builder");
  const optionsBox = document.getElementById("options");
  if (!wordBuilder || !optionsBox) return;
  while (wordBuilder.children.length > 0) {
    const tile = wordBuilder.firstElementChild;
    optionsBox.appendChild(tile);
  }
}

// ============================================================
//  رویدادهای کلید
// ============================================================
document.addEventListener("keydown", function(e) {
  const wordBuilder = document.getElementById("word-builder");
  if (!wordBuilder || wordBuilder.classList.contains("hidden")) return;
  if (e.key === "Backspace") {
    e.preventDefault();
    const last = wordBuilder.lastElementChild;
    if (last) {
      document.getElementById("options").appendChild(last);
    }
  }
});

// ============================================================
//  بارگذاری اولیه
// ============================================================
window.onload = function() {
  if (typeof checkAndRegenHearts === "function") {
    checkAndRegenHearts();
  }
  updateUIStats();

  if (hearts <= 0) {
    alert("💔 قلب شما تمام شده! لطفاً کمی صبر کنید.");
    window.location.href = "../index.html";
    return;
  }

  const backBtn = document.getElementById("back-to-intro");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      const params = new URLSearchParams(window.location.search);
      const lesson = params.get("lesson") || "ru-lesson17";
      window.location.href = `intro.html?lesson=${lesson}`;
    });
  }

  const resetBtn = document.getElementById("reset-builder-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetBuilder);
  }

  const speakBtn = document.getElementById("speak-question-btn");
  if (speakBtn) {
    speakBtn.addEventListener("click", () => {
      const q = questions[current];
      if (q && q.speak) speak(q.speak);
    });
  }

  showQuestion();
};