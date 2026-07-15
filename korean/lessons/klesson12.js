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
    question: "어느 것이 하나 입니까 ?",
    questionFa: "کدوم یکی یک هست؟",
    speak: "하나",
    options: [
      { text: "둘", image: "../../media/numbers/two.png" },
      { text: "하나", image: "../../media/numbers/one.png" },
      { text: "셋", image: "../../media/numbers/three.png" },
      { text: "넷", image: "../../media/numbers/four.png" }
    ],
    answer: "하나"
  },
  {
    type: "image",
    question: "어느 것이 둘 입니까 ?",
    questionFa: "کدوم یکی دو هست؟",
    speak: "둘",
    options: [
      { text: "넷", image: "../../media/numbers/four.png" },
      { text: "둘", image: "../../media/numbers/two.png" },
      { text: "다섯", image: "../../media/numbers/five.png" },
      { text: "하나", image: "../../media/numbers/one.png" }
    ],
    answer: "둘"
  },
  {
    type: "image",
    question: "어느 것이 셋 입니까 ?",
    questionFa: "کدوم یکی سه هست؟",
    speak: "셋",
    options: [
      { text: "하나", image: "../../media/numbers/one.png" },
      { text: "셋", image: "../../media/numbers/three.png" },
      { text: "다섯", image: "../../media/numbers/five.png" },
      { text: "둘", image: "../../media/numbers/two.png" }
    ],
    answer: "셋"
  },
  {
    type: "image",
    question: "어느 것이 넷 입니까 ?",
    questionFa: "کدوم یکی چهار هست؟",
    speak: "넷",
    options: [
      { text: "셋", image: "../../media/numbers/three.png" },
      { text: "둘", image: "../../media/numbers/two.png" },
      { text: "넷", image: "../../media/numbers/four.png" },
      { text: "하나", image: "../../media/numbers/one.png" }
    ],
    answer: "넷"
  },
  {
    type: "image",
    question: "어느 것이 다섯 입니까 ?",
    questionFa: "کدوم یکی پنج هست؟",
    speak: "다섯",
    options: [
      { text: "넷", image: "../../media/numbers/four.png" },
      { text: "하나", image: "../../media/numbers/one.png" },
      { text: "둘", image: "../../media/numbers/two.png" },
      { text: "다섯", image: "../../media/numbers/five.png" }
    ],
    answer: "다섯"
  },

  // -------- WORD FROM IMAGE --------
  {
    type: "word",
    question: "이 숫자는 무엇입니까?",
    questionFa: "این چه عددی هست؟",
    image: "../../media/numbers/one.png",
    options: ["둘", "하나", "셋", "넷"],
    answer: "하나"
  },
  {
    type: "word",
    question: "이 숫자는 무엇입니까?",
    questionFa: "این چه عددی هست؟",
    image: "../../media/numbers/two.png",
    options: ["넷", "둘", "다섯", "하나"],
    answer: "둘"
  },
  {
    type: "word",
    question: "이 숫자는 무엇입니까?",
    questionFa: "این چه عددی هست؟",
    image: "../../media/numbers/three.png",
    options: ["하나", "셋", "다섯", "둘"],
    answer: "셋"
  },
  {
    type: "word",
    question: "이 숫자는 무엇입니까?",
    questionFa: "این چه عددی هست؟",
    image: "../../media/numbers/four.png",
    options: ["셋", "둘", "넷", "하나"],
    answer: "넷"
  },
  {
    type: "word",
    question: "이 숫자는 무엇입니까?",
    questionFa: "این چه عددی هست؟",
    image: "../../media/numbers/five.png",
    options: ["넷", "하나", "둘", "다섯"],
    answer: "다섯"
  },

  // -------- AUDIO --------
  {
    type: "audio",
    speak: "하나",
    question: "어떤 단어를 들었습니까?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["둘", "하나", "셋", "넷"],
    answer: "하나"
  },
  {
    type: "audio",
    speak: "둘",
    question: "어떤 단어를 들었습니까?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["넷", "둘", "다섯", "하나"],
    answer: "둘"
  },
  {
    type: "audio",
    speak: "셋",
    question: "어떤 단어를 들었습니까?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["하나", "셋", "다섯", "둘"],
    answer: "셋"
  },
  {
    type: "audio",
    speak: "넷",
    question: "어떤 단어를 들었습니까?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["셋", "둘", "넷", "하나"],
    answer: "넷"
  },
  {
    type: "audio",
    speak: "다섯",
    question: "어떤 단어를 들었습니까?",
    questionFa: "کدوم کلمه رو شنیدی؟",
    options: ["넷", "하나", "둘", "다섯"],
    answer: "다섯"
  },

  // -------- BUILD KO (ساختن جمله کرهای) --------
  {
    type: "build-ko",
    speak: "저는 책 한 권을 가지고 있습니다",
    question: "한국어 문장을 만드세요:",
    questionFa: "جمله کرهای رو بساز:",
    text: "من یک کتاب دارم",
    words: ["책", "한", "권을", "가지고", "있습니다", "저는"],
    answer: ["저는", "책", "한", "권을", "가지고", "있습니다"]
  },
  {
    type: "build-ko",
    speak: "저는 책 두 권을 가지고 있습니다",
    question: "한국어 문장을 만드세요:",
    questionFa: "جمله کرهای رو بساز:",
    text: "من دو کتاب دارم",
    words: ["책", "두", "권을", "가지고", "있습니다", "저는"],
    answer: ["저는", "책", "두", "권을", "가지고", "있습니다"]
  },
  {
    type: "build-ko",
    speak: "저는 책 세 권을 가지고 있습니다",
    question: "한국어 문장을 만드세요:",
    questionFa: "جمله کرهای رو بساز:",
    text: "من سه کتاب دارم",
    words: ["책", "세", "권을", "가지고", "있습니다", "저는"],
    answer: ["저는", "책", "세", "권을", "가지고", "있습니다"]
  },
  {
    type: "build-ko",
    speak: "저는 책 네 권을 가지고 있습니다",
    question: "한국어 문장을 만드세요:",
    questionFa: "جمله کرهای رو بساز:",
    text: "من چهار کتاب دارم",
    words: ["책", "네", "권을", "가지고", "있습니다", "저는"],
    answer: ["저는", "책", "네", "권을", "가지고", "있습니다"]
  },
  {
    type: "build-ko",
    speak: "저는 책 다섯 권을 가지고 있습니다",
    question: "한국어 문장을 만드세요:",
    questionFa: "جمله کرهای رو بساز:",
    text: "من پنج کتاب دارم",
    words: ["책", "다섯", "권을", "가지고", "있습니다", "저는"],
    answer: ["저는", "책", "다섯", "권을", "가지고", "있습니다"]
  },

  // -------- BUILD FA (ساختن جمله فارسی) --------
  {
    type: "build-fa",
    speak: "저는 책 한 권을 가지고 있습니다",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "저는 책 한 권을 가지고 있습니다",
    words: ["دارم", "یک", "کتاب", "من"],
    answer: ["من", "یک", "کتاب", "دارم"]
  },
  {
    type: "build-fa",
    speak: "저는 책 두 권을 가지고 있습니다",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "저는 책 두 권을 가지고 있습니다",
    words: ["دارم", "دو", "کتاب", "من"],
    answer: ["من", "دو", "کتاب", "دارم"]
  },
  {
    type: "build-fa",
    speak: "저는 책 세 권을 가지고 있습니다",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "저는 책 세 권을 가지고 있습니다",
    words: ["دارم", "سه", "کتاب", "من"],
    answer: ["من", "سه", "کتاب", "دارم"]
  },
  {
    type: "build-fa",
    speak: "저는 책 네 권을 가지고 있습니다",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "저는 책 네 권을 가지고 있습니다",
    words: ["دارم", "چهار", "کتاب", "من"],
    answer: ["من", "چهار", "کتاب", "دارم"]
  },
  {
    type: "build-fa",
    speak: "저는 책 다섯 권을 가지고 있습니다",
    question: "ترجمه را بساز:",
    questionFa: "ترجمه فارسی رو بساز:",
    text: "저는 책 다섯 권을 가지고 있습니다",
    words: ["دارم", "پنج", "کتاب", "من"],
    answer: ["من", "پنج", "کتاب", "دارم"]
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
  utter.lang = "ko-KR";
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
  else if (q.type === "build-ko" || q.type === "build-fa") {
    if (content) {
      content.innerHTML = `<p style="font-size:1.2rem; font-weight:500; color:#1e2a41;">${q.text}</p>`;
    }
    if (wordBuilder) {
      wordBuilder.classList.remove("hidden");
    }
    if (resetBtn) resetBtn.style.display = "inline-block";

    if (wordBuilder) {
      wordBuilder.classList.remove("ltr", "rtl");
      if (q.type === "build-ko") {
        wordBuilder.classList.add("ltr");
      } else {
        wordBuilder.classList.add("rtl");
      }
    }
    
    if (optionsBox) {
      optionsBox.classList.remove("ltr", "rtl");
      if (q.type === "build-ko") {
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
      const lesson = params.get("lesson") || "ko-lesson12";
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