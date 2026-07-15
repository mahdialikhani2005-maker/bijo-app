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
    question: "hangisi yemek ?",
    questionFa: "کدوم یکی خوردن هست؟",
    speak: "yemek",
    options: [
      { text: "uyumak", image: "../../media/actions/sleep.png" },
      { text: "yemek", image: "../../media/actions/eat.png" },
      { text: "yürümek", image: "../../media/actions/walk.png" },
      { text: "okumak", image: "../../media/actions/read.png" }
    ],
    answer: "yemek"
  },
  {
    type: "image",
    question: "hangisi uyumak ?",
    questionFa: "کدوم یکی خوابیدن هست؟",
    speak: "uyumak",
    options: [
      { text: "yazmak", image: "../../media/actions/write.png" },
      { text: "uyumak", image: "../../media/actions/sleep.png" },
      { text: "yemek", image: "../../media/actions/eat.png" },
      { text: "yürümek", image: "../../media/actions/walk.png" }
    ],
    answer: "uyumak"
  },
  {
    type: "image",
    question: "hangisi yürümek ?",
    questionFa: "کدوم یکی راه رفتن هست؟",
    speak: "yürümek",
    options: [
      { text: "yemek", image: "../../media/actions/eat.png" },
      { text: "yürümek", image: "../../media/actions/walk.png" },
      { text: "yazmak", image: "../../media/actions/write.png" },
      { text: "uyumak", image: "../../media/actions/sleep.png" }
    ],
    answer: "yürümek"
  },
  {
    type: "image",
    question: "hangisi okumak ?",
    questionFa: "کدوم یکی خواندن هست؟",
    speak: "okumak",
    options: [
      { text: "yürümek", image: "../../media/actions/walk.png" },
      { text: "uyumak", image: "../../media/actions/sleep.png" },
      { text: "okumak", image: "../../media/actions/read.png" },
      { text: "yemek", image: "../../media/actions/eat.png" }
    ],
    answer: "okumak"
  },
  {
    type: "image",
    question: "hangisi yazmak ?",
    questionFa: "کدوم یکی نوشتن هست؟",
    speak: "yazmak",
    options: [
      { text: "okumak", image: "../../media/actions/read.png" },
      { text: "yemek", image: "../../media/actions/eat.png" },
      { text: "uyumak", image: "../../media/actions/sleep.png" },
      { text: "yazmak", image: "../../media/actions/write.png" }
    ],
    answer: "yazmak"
  },

  // -------- WORD FROM IMAGE --------
  {
    type: "word",
    question: "Bu resim ne?",
    questionFa: "این عکس چیه؟",
    image: "../../media/actions/eat.png",
    options: ["uyumak", "yemek", "yürümek", "okumak"],
    answer: "yemek"
  },
  {
    type: "word",
    question: "Bu resim ne?",
    questionFa: "این عکس چیه؟",
    image: "../../media/actions/sleep.png",
    options: ["yazmak", "uyumak", "yemek", "yürümek"],
    answer: "uyumak"
  },
  {
    type: "word",
    question: "Bu resim ne?",
    questionFa: "این عکس چیه؟",
    image: "../../media/actions/walk.png",
    options: ["yemek", "yürümek", "yazmak", "uyumak"],
    answer: "yürümek"
  },
  {
    type: "word",
    question: "Bu resim ne?",
    questionFa: "این عکس چیه؟",
    image: "../../media/actions/read.png",
    options: ["yürümek", "uyumak", "okumak", "yemek"],
    answer: "okumak"
  },
  {
    type: "word",
    question: "Bu resim ne?",
    questionFa: "این عکس چیه؟",
    image: "../../media/actions/write.png",
    options: ["okumak", "yemek", "uyumak", "yazmak"],
    answer: "yazmak"
  },

  // -------- AUDIO --------
  {
    type: "audio",
    speak: "yemek",
    question: "Hangi kelimeyi duydun?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["uyumak", "yemek", "yürümek", "okumak"],
    answer: "yemek"
  },
  {
    type: "audio",
    speak: "uyumak",
    question: "Hangi kelimeyi duydun?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["yazmak", "uyumak", "yemek", "yürümek"],
    answer: "uyumak"
  },
  {
    type: "audio",
    speak: "yürümek",
    question: "Hangi kelimeyi duydun?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["yemek", "yürümek", "yazmak", "uyumak"],
    answer: "yürümek"
  },
  {
    type: "audio",
    speak: "okumak",
    question: "Hangi kelimeyi duydun?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["yürümek", "uyumak", "okumak", "yemek"],
    answer: "okumak"
  },
  {
    type: "audio",
    speak: "yazmak",
    question: "Hangi kelimeyi duydun?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["okumak", "yemek", "uyumak", "yazmak"],
    answer: "yazmak"
  },

  // -------- BUILD TR --------
  {
    type: "build-tr",
    speak: "Ben ekmek yerim",
    question: "Türkçe cümleyi kur:",
    questionFa: "جمله ترکی رو بساز:",
    text: "من نان می‌خورم",
    words: ["ekmek", "yerim", "Ben"],
    answer: ["Ben", "ekmek", "yerim"]
  },
  {
    type: "build-tr",
    speak: "Ben gece uyurum",
    question: "Türkçe cümleyi kur:",
    questionFa: "جمله ترکی رو بساز:",
    text: "من شب می‌خوابم",
    words: ["gece", "uyurum", "Ben"],
    answer: ["Ben", "gece", "uyurum"]
  },
  {
    type: "build-tr",
    speak: "Ben okula yürürüm",
    question: "Türkçe cümleyi kur:",
    questionFa: "جمله ترکی رو بساز:",
    text: "من به مدرسه راه می‌روم",
    words: ["okula", "yürürüm", "Ben"],
    answer: ["Ben", "okula", "yürürüm"]
  },
  {
    type: "build-tr",
    speak: "Ben kitap okurum",
    question: "Türkçe cümleyi kur:",
    questionFa: "جمله ترکی رو بساز:",
    text: "من یک کتاب می‌خوانم",
    words: ["kitap", "okurum", "Ben"],
    answer: ["Ben", "kitap", "okurum"]
  },
  {
    type: "build-tr",
    speak: "Ben mektup yazarım",
    question: "Türkçe cümleyi kur:",
    questionFa: "جمله ترکی رو بساز:",
    text: "من یک نامه می‌نویسم",
    words: ["mektup", "yazarım", "Ben"],
    answer: ["Ben", "mektup", "yazarım"]
  },

  // -------- BUILD FA --------
  {
    type: "build-fa",
    speak: "Ben ekmek yerim",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "Ben ekmek yerim",
    words: ["می‌خورم", "نان", "من"],
    answer: ["من", "نان", "می‌خورم"]
  },
  {
    type: "build-fa",
    speak: "Ben gece uyurum",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "Ben gece uyurum",
    words: ["می‌خوابم", "شب", "من"],
    answer: ["من", "شب", "می‌خوابم"]
  },
  {
    type: "build-fa",
    speak: "Ben okula yürürüm",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "Ben okula yürürüm",
    words: ["می‌روم", "مدرسه", "به", "من"],
    answer: ["من", "به", "مدرسه", "می‌روم"]
  },
  {
    type: "build-fa",
    speak: "Ben kitap okurum",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "Ben kitap okurum",
    words: ["می‌خوانم", "کتاب", "یک", "من"],
    answer: ["من", "یک", "کتاب", "می‌خوانم"]
  },
  {
    type: "build-fa",
    speak: "Ben mektup yazarım",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "Ben mektup yazarım",
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
  utter.lang = "tr-TR";
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
  else if (q.type === "build-tr" || q.type === "build-fa") {
    if (content) {
      content.innerHTML = `<p style="font-size:1.2rem; font-weight:500; color:#1e2a41;">${q.text}</p>`;
    }
    if (wordBuilder) {
      wordBuilder.classList.remove("hidden");
    }
    if (resetBtn) resetBtn.style.display = "inline-block";

    if (wordBuilder) {
      wordBuilder.classList.remove("ltr", "rtl");
      if (q.type === "build-tr") {
        wordBuilder.classList.add("ltr");
      } else {
        wordBuilder.classList.add("rtl");
      }
    }
    
    if (optionsBox) {
      optionsBox.classList.remove("ltr", "rtl");
      if (q.type === "build-tr") {
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
      const lesson = params.get("lesson") || "tr-lesson18";
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