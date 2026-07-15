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
    question: "どれが食べる ですか؟",
    questionFa: "کدوم یکی خوردن هست؟",
    speak: "たべる",
    options: [
      { text: "寝る", image: "../../media/actions/sleep.png" },
      { text: "食べる", image: "../../media/actions/eat.png" },
      { text: "歩く", image: "../../media/actions/walk.png" },
      { text: "読む", image: "../../media/actions/read.png" }
    ],
    answer: "食べる"
  },
  {
    type: "image",
    question: "どれが寝る ですか؟",
    questionFa: "کدوم یکی خوابیدن هست؟",
    speak: "ねる",
    options: [
      { text: "書く", image: "../../media/actions/write.png" },
      { text: "寝る", image: "../../media/actions/sleep.png" },
      { text: "食べる", image: "../../media/actions/eat.png" },
      { text: "歩く", image: "../../media/actions/walk.png" }
    ],
    answer: "寝る"
  },
  {
    type: "image",
    question: "どれが歩く ですか؟",
    questionFa: "کدوم یکی راه رفتن هست؟",
    speak: "あるく",
    options: [
      { text: "食べる", image: "../../media/actions/eat.png" },
      { text: "歩く", image: "../../media/actions/walk.png" },
      { text: "書く", image: "../../media/actions/write.png" },
      { text: "寝る", image: "../../media/actions/sleep.png" }
    ],
    answer: "歩く"
  },
  {
    type: "image",
    question: "どれが読む ですか؟",
    questionFa: "کدوم یکی خواندن هست؟",
    speak: "よむ",
    options: [
      { text: "歩く", image: "../../media/actions/walk.png" },
      { text: "寝る", image: "../../media/actions/sleep.png" },
      { text: "読む", image: "../../media/actions/read.png" },
      { text: "食べる", image: "../../media/actions/eat.png" }
    ],
    answer: "読む"
  },
  {
    type: "image",
    question: "どれが書く ですか؟",
    questionFa: "کدوم یکی نوشتن هست؟",
    speak: "かく",
    options: [
      { text: "読む", image: "../../media/actions/read.png" },
      { text: "食べる", image: "../../media/actions/eat.png" },
      { text: "寝る", image: "../../media/actions/sleep.png" },
      { text: "書く", image: "../../media/actions/write.png" }
    ],
    answer: "書く"
  },

  // -------- WORD FROM IMAGE --------
  {
    type: "word",
    question: "この画像は何ですか؟",
    questionFa: "این عکس چیه؟",
    image: "../../media/actions/eat.png",
    options: ["寝る", "食べる", "歩く", "読む"],
    answer: "食べる"
  },
  {
    type: "word",
    question: "この画像は何ですか؟",
    questionFa: "این عکس چیه؟",
    image: "../../media/actions/sleep.png",
    options: ["書く", "寝る", "食べる", "歩く"],
    answer: "寝る"
  },
  {
    type: "word",
    question: "この画像は何ですか؟",
    questionFa: "این عکس چیه؟",
    image: "../../media/actions/walk.png",
    options: ["食べる", "歩く", "書く", "寝る"],
    answer: "歩く"
  },
  {
    type: "word",
    question: "この画像は何ですか؟",
    questionFa: "این عکس چیه؟",
    image: "../../media/actions/read.png",
    options: ["歩く", "寝る", "読む", "食べる"],
    answer: "読む"
  },
  {
    type: "word",
    question: "この画像は何ですか؟",
    questionFa: "این عکس چیه؟",
    image: "../../media/actions/write.png",
    options: ["読む", "食べる", "寝る", "書く"],
    answer: "書く"
  },

  // -------- AUDIO --------
  {
    type: "audio",
    speak: "たべる",
    question: "どの言葉を聞きましたか؟",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["寝る", "食べる", "歩く", "読む"],
    answer: "食べる"
  },
  {
    type: "audio",
    speak: "ねる",
    question: "どの言葉を聞きましたか؟",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["書く", "寝る", "食べる", "歩く"],
    answer: "寝る"
  },
  {
    type: "audio",
    speak: "あるく",
    question: "どの言葉を聞きましたか؟",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["食べる", "歩く", "書く", "寝る"],
    answer: "歩く"
  },
  {
    type: "audio",
    speak: "よむ",
    question: "どの言葉を聞きましたか؟",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["歩く", "寝る", "読む", "食べる"],
    answer: "読む"
  },
  {
    type: "audio",
    speak: "かく",
    question: "どの言葉を聞きましたか؟",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["読む", "食べる", "寝る", "書く"],
    answer: "書く"
  },

  // -------- BUILD JA (ساختن جمله ژاپنی) --------
  {
    type: "build-ja",
    speak: "わたしは パン を たべます",
    question: "日本語の文を作ってください:",
    questionFa: "جمله ژاپنی رو بساز:",
    text: "من نان می‌خورم",
    words: ["パン", "を", "たべます", "わたしは"],
    answer: ["わたしは", "パン", "を", "たべます"]
  },
  {
    type: "build-ja",
    speak: "わたしは よる ねます",
    question: "日本語の文を作ってください:",
    questionFa: "جمله ژاپنی رو بساز:",
    text: "من شب می‌خوابم",
    words: ["よる", "ねます", "わたしは"],
    answer: ["わたしは", "よる", "ねます"]
  },
  {
    type: "build-ja",
    speak: "わたしは がっこう に あるきます",
    question: "日本語の文を作ってください:",
    questionFa: "جمله ژاپنی رو بساز:",
    text: "من به مدرسه راه می‌روم",
    words: ["がっこう", "に", "あるきます", "わたしは"],
    answer: ["わたしは", "がっこう", "に", "あるきます"]
  },
  {
    type: "build-ja",
    speak: "わたしは ほん を よみます",
    question: "日本語の文を作ってください:",
    questionFa: "جمله ژاپنی رو بساز:",
    text: "من یک کتاب می‌خوانم",
    words: ["ほん", "を", "よみます", "わたしは"],
    answer: ["わたしは", "ほん", "を", "よみます"]
  },
  {
    type: "build-ja",
    speak: "わたしは てがみ を かきます",
    question: "日本語の文を作ってください:",
    questionFa: "جمله ژاپنی رو بساز:",
    text: "من یک نامه می‌نویسم",
    words: ["てがみ", "を", "かきます", "わたしは"],
    answer: ["わたしは", "てがみ", "を", "かきます"]
  },

  // -------- BUILD FA (ساختن جمله فارسی) --------
  {
    type: "build-fa",
    speak: "わたしは パン を たべます",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "わたしは パン を たべます",
    words: ["می‌خورم", "نان", "من"],
    answer: ["من", "نان", "می‌خورم"]
  },
  {
    type: "build-fa",
    speak: "わたしは よる ねます",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "わたしは よる ねます",
    words: ["می‌خوابم", "شب", "در", "من"],
    answer: ["من", "شب", "می‌خوابم"]
  },
  {
    type: "build-fa",
    speak: "わたしは がっこう に あるきます",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "わたしは がっこう に あるきます",
    words: ["می‌روم", "مدرسه", "به", "من"],
    answer: ["من", "به", "مدرسه", "می‌روم"]
  },
  {
    type: "build-fa",
    speak: "わたしは ほん を よみます",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "わたしは ほん を よみます",
    words: ["می‌خوانم", "کتاب", "یک", "من"],
    answer: ["من", "یک", "کتاب", "می‌خوانم"]
  },
  {
    type: "build-fa",
    speak: "わたしは てがみ を かきます",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "わたしは てがみ を かきます",
    words: ["می‌نویسم", "نامه", "یک", "من"],
    answer: ["من", "یک", "نامه", "می‌نویسم"]
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
  utter.lang = "ja-JP";
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
  else if (q.type === "build-ja" || q.type === "build-fa") {
    if (content) {
      content.innerHTML = `<p style="font-size:1.2rem; font-weight:500; color:#1e2a41;">${q.text}</p>`;
    }
    if (wordBuilder) {
      wordBuilder.classList.remove("hidden");
    }
    if (resetBtn) resetBtn.style.display = "inline-block";

    if (wordBuilder) {
      wordBuilder.classList.remove("ltr", "rtl");
      if (q.type === "build-ja") {
        wordBuilder.classList.add("ltr");
      } else {
        wordBuilder.classList.add("rtl");
      }
    }
    
    if (optionsBox) {
      optionsBox.classList.remove("ltr", "rtl");
      if (q.type === "build-ja") {
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
      const lesson = params.get("lesson") || "ja-lesson18";
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