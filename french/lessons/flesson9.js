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
    question: "lequel est soleil ?",
    questionFa: "کدوم یکی خورشید هست؟",
    speak: "soleil",
    options: [
      { text: "lune", image: "../../media/nature/moon.png" },
      { text: "soleil", image: "../../media/nature/sun.png" },
      { text: "étoile", image: "../../media/nature/star.png" },
      { text: "ciel", image: "../../media/nature/sky.png" }
    ],
    answer: "soleil"
  },
  {
    type: "image",
    question: "lequel est lune ?",
    questionFa: "کدوم یکی ماه هست؟",
    speak: "lune",
    options: [
      { text: "étoile", image: "../../media/nature/star.png" },
      { text: "lune", image: "../../media/nature/moon.png" },
      { text: "pluie", image: "../../media/nature/rain.png" },
      { text: "soleil", image: "../../media/nature/sun.png" }
    ],
    answer: "lune"
  },
  {
    type: "image",
    question: "lequel est étoile ?",
    questionFa: "کدوم یکی ستاره هست؟",
    speak: "étoile",
    options: [
      { text: "soleil", image: "../../media/nature/sun.png" },
      { text: "étoile", image: "../../media/nature/star.png" },
      { text: "pluie", image: "../../media/nature/rain.png" },
      { text: "lune", image: "../../media/nature/moon.png" }
    ],
    answer: "étoile"
  },
  {
    type: "image",
    question: "lequel est ciel ?",
    questionFa: "کدوم یکی آسمان هست؟",
    speak: "ciel",
    options: [
      { text: "étoile", image: "../../media/nature/star.png" },
      { text: "lune", image: "../../media/nature/moon.png" },
      { text: "ciel", image: "../../media/nature/sky.png" },
      { text: "soleil", image: "../../media/nature/sun.png" }
    ],
    answer: "ciel"
  },
  {
    type: "image",
    question: "lequel est pluie ?",
    questionFa: "کدوم یکی باران هست؟",
    speak: "pluie",
    options: [
      { text: "ciel", image: "../../media/nature/sky.png" },
      { text: "soleil", image: "../../media/nature/sun.png" },
      { text: "lune", image: "../../media/nature/moon.png" },
      { text: "pluie", image: "../../media/nature/rain.png" }
    ],
    answer: "pluie"
  },

  // -------- WORD FROM IMAGE --------
  {
    type: "word",
    question: "Cette image représente quoi ?",
    questionFa: "این عکس چیه؟",
    image: "../../media/nature/sun.png",
    options: ["lune", "soleil", "étoile", "ciel"],
    answer: "soleil"
  },
  {
    type: "word",
    question: "Cette image représente quoi ?",
    questionFa: "این عکس چیه؟",
    image: "../../media/nature/moon.png",
    options: ["étoile", "lune", "pluie", "soleil"],
    answer: "lune"
  },
  {
    type: "word",
    question: "Cette image représente quoi ?",
    questionFa: "این عکس چیه؟",
    image: "../../media/nature/star.png",
    options: ["soleil", "étoile", "pluie", "lune"],
    answer: "étoile"
  },
  {
    type: "word",
    question: "Cette image représente quoi ?",
    questionFa: "این عکس چیه؟",
    image: "../../media/nature/sky.png",
    options: ["étoile", "lune", "ciel", "soleil"],
    answer: "ciel"
  },
  {
    type: "word",
    question: "Cette image représente quoi ?",
    questionFa: "این عکس چیه؟",
    image: "../../media/nature/rain.png",
    options: ["ciel", "soleil", "lune", "pluie"],
    answer: "pluie"
  },

  // -------- AUDIO --------
  {
    type: "audio",
    speak: "soleil",
    question: "Quel mot as-tu entendu ?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["lune", "soleil", "étoile", "ciel"],
    answer: "soleil"
  },
  {
    type: "audio",
    speak: "lune",
    question: "Quel mot as-tu entendu ?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["étoile", "lune", "pluie", "soleil"],
    answer: "lune"
  },
  {
    type: "audio",
    speak: "étoile",
    question: "Quel mot as-tu entendu ?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["soleil", "étoile", "pluie", "lune"],
    answer: "étoile"
  },
  {
    type: "audio",
    speak: "ciel",
    question: "Quel mot as-tu entendu ?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["étoile", "lune", "ciel", "soleil"],
    answer: "ciel"
  },
  {
    type: "audio",
    speak: "pluie",
    question: "Quel mot as-tu entendu ?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["ciel", "soleil", "lune", "pluie"],
    answer: "pluie"
  },

  // -------- BUILD FR (ساختن جمله فرانسوی) --------
  {
    type: "build-fr",
    speak: "Le soleil est grand",
    question: "Construisez la phrase française :",
    questionFa: "جمله فرانسوی رو بساز:",
    text: "خورشید بزرگ است",
    words: ["soleil", "Le", "grand", "est"],
    answer: ["Le", "soleil", "est", "grand"]
  },
  {
    type: "build-fr",
    speak: "La lune est petite",
    question: "Construisez la phrase française :",
    questionFa: "جمله فرانسوی رو بساز:",
    text: "ماه کوچک است",
    words: ["lune", "La", "petite", "est"],
    answer: ["La", "lune", "est", "petite"]
  },
  {
    type: "build-fr",
    speak: "L'étoile est brillante",
    question: "Construisez la phrase française :",
    questionFa: "جمله فرانسوی رو بساز:",
    text: "ستاره درخشان است",
    words: ["étoile", "L'", "brillante", "est"],
    answer: ["L'", "étoile", "est", "brillante"]
  },
  {
    type: "build-fr",
    speak: "Le ciel est bleu",
    question: "Construisez la phrase française :",
    questionFa: "جمله فرانسوی رو بساز:",
    text: "آسمان آبی است",
    words: ["ciel", "Le", "bleu", "est"],
    answer: ["Le", "ciel", "est", "bleu"]
  },
  {
    type: "build-fr",
    speak: "La pluie est froide",
    question: "Construisez la phrase française :",
    questionFa: "جمله فرانسوی رو بساز:",
    text: "باران سرد است",
    words: ["pluie", "La", "froide", "est"],
    answer: ["La", "pluie", "est", "froide"]
  },

  // -------- BUILD FA (ساختن جمله فارسی) --------
  {
    type: "build-fa",
    speak: "Le soleil est grand",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "Le soleil est grand",
    words: ["است", "بزرگ", "خورشید"],
    answer: ["خورشید", "بزرگ", "است"]
  },
  {
    type: "build-fa",
    speak: "La lune est petite",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "La lune est petite",
    words: ["است", "کوچک", "ماه"],
    answer: ["ماه", "کوچک", "است"]
  },
  {
    type: "build-fa",
    speak: "L'étoile est brillante",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "L'étoile est brillante",
    words: ["است", "درخشان", "ستاره"],
    answer: ["ستاره", "درخشان", "است"]
  },
  {
    type: "build-fa",
    speak: "Le ciel est bleu",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "Le ciel est bleu",
    words: ["است", "آبی", "آسمان"],
    answer: ["آسمان", "آبی", "است"]
  },
  {
    type: "build-fa",
    speak: "La pluie est froide",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "La pluie est froide",
    words: ["است", "سرد", "باران"],
    answer: ["باران", "سرد", "است"]
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
  utter.lang = "fr-FR";
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
  else if (q.type === "build-fr" || q.type === "build-fa") {
    if (content) {
      content.innerHTML = `<p style="font-size:1.2rem; font-weight:500; color:#1e2a41;">${q.text}</p>`;
    }
    if (wordBuilder) {
      wordBuilder.classList.remove("hidden");
    }
    if (resetBtn) resetBtn.style.display = "inline-block";

    if (wordBuilder) {
      wordBuilder.classList.remove("ltr", "rtl");
      if (q.type === "build-fr") {
        wordBuilder.classList.add("ltr");
      } else {
        wordBuilder.classList.add("rtl");
      }
    }
    
    if (optionsBox) {
      optionsBox.classList.remove("ltr", "rtl");
      if (q.type === "build-fr") {
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
      const lesson = params.get("lesson") || "fr-lesson9";
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