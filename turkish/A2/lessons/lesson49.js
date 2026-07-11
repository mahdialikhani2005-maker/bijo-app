let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "tr-TR";
  utter.rate = 0.8;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع ضبط صدا =====
function startRecording(targetWord) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("مرورگر شما از ضبط صدا پشتیبانی نمی‌کند. لطفاً از Chrome استفاده کنید.");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'tr-TR';
  recognition.continuous = false;
  recognition.interimResults = false;

  const recordBtn = document.getElementById('record-btn');
  const statusText = document.getElementById('record-status');

  if (isRecording) {
    recognition.stop();
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 ضبط';
    if (statusText) statusText.textContent = 'برای شروع ضبط کلیک کن';
    return;
  }

  isRecording = true;
  if (recordBtn) recordBtn.textContent = '⏹️ توقف';
  if (statusText) statusText.textContent = 'در حال گوش دادن...';

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.trim();
    if (statusText) statusText.textContent = '🗣️: ' + transcript;

    if (transcript === targetWord) {
      if (statusText) statusText.textContent = '✅ عالی! درست گفتی! 🎉';
      if (recordBtn) recordBtn.textContent = '✅';
      
      xp += 5;
      if (typeof addXP === 'function') {
        addXP(5);
      }
      
      setTimeout(() => {
        current++;
        showQuestion();
      }, 1000);
    } else {
      if (statusText) statusText.textContent = '❌ اشتباه! دوباره تلاش کن. کلمه: ' + targetWord;
      if (typeof loseHeart === 'function') {
        loseHeart();
      }
      const heartElement = document.getElementById('heart-count');
      if (heartElement && typeof getHearts === 'function') {
        heartElement.textContent = getHearts();
      }
    }
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 ضبط';
  };

  recognition.onerror = function(event) {
    if (statusText) statusText.textContent = '❌ خطا: ' + event.error;
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 ضبط';
  };

  recognition.onend = function() {
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 ضبط';
  };

  recognition.start();
}

// ===== تابع رد کردن بخش صدا =====
function skipSpeak() {
  current++;
  showQuestion();
}

// ===== بررسی قلب در شروع =====
window.onload = function() {
  if (typeof checkAndRegenHearts === 'function') {
    checkAndRegenHearts();
  }

  if (typeof getHearts === 'function') {
    const currentHearts = getHearts();
    const heartElement = document.getElementById('heart-count');
    if (heartElement) {
      heartElement.textContent = currentHearts;
    }

    if (currentHearts <= 0) {
      alert('قلب شما تمام شده است! لطفاً منتظر بمانید یا قلب تهیه کنید.');
      window.location.href = '../../../home.html';
    }
  }
};

// ===== سوالات درس ۴۹ - ترکی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "not" است؟',
    speak: 'not',
    options: [
      { text: 'not', image: '../../../media/a2/school/grade.png' },
      { text: 'sınav', image: '../../../media/a2/school/exam.png' },
      { text: 'ders', image: '../../../media/a2/school/lesson.png' },
      { text: 'öğretmen', image: '../../../media/a2/school/teacher.png' }
    ],
    answer: 'not'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "sınav" است؟',
    speak: 'sınav',
    options: [
      { text: 'konu', image: '../../../media/a2/school/subject.png' },
      { text: 'sınav', image: '../../../media/a2/school/exam.png' },
      { text: 'not', image: '../../../media/a2/school/grade.png' },
      { text: 'ders', image: '../../../media/a2/school/lesson.png' }
    ],
    answer: 'sınav'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ders" است؟',
    speak: 'ders',
    options: [
      { text: 'not', image: '../../../media/a2/school/grade.png' },
      { text: 'ders', image: '../../../media/a2/school/lesson.png' },
      { text: 'öğretmen', image: '../../../media/a2/school/teacher.png' },
      { text: 'sınav', image: '../../../media/a2/school/exam.png' }
    ],
    answer: 'ders'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "konu" است؟',
    speak: 'konu',
    options: [
      { text: 'sınav', image: '../../../media/a2/school/exam.png' },
      { text: 'not', image: '../../../media/a2/school/grade.png' },
      { text: 'ders', image: '../../../media/a2/school/lesson.png' },
      { text: 'konu', image: '../../../media/a2/school/subject.png' }
    ],
    answer: 'konu'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "öğretmen" است؟',
    speak: 'öğretmen',
    options: [
      { text: 'öğretmen', image: '../../../media/a2/school/teacher.png' },
      { text: 'konu', image: '../../../media/a2/school/subject.png' },
      { text: 'not', image: '../../../media/a2/school/grade.png' },
      { text: 'sınav', image: '../../../media/a2/school/exam.png' }
    ],
    answer: 'öğretmen'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/grade.png',
    options: ['not', 'sınav', 'ders', 'konu'],
    answer: 'not'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/exam.png',
    options: ['not', 'sınav', 'ders', 'öğretmen'],
    answer: 'sınav'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/lesson.png',
    options: ['öğretmen', 'not', 'ders', 'sınav'],
    answer: 'ders'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/subject.png',
    options: ['ders', 'sınav', 'konu', 'not'],
    answer: 'konu'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/teacher.png',
    options: ['not', 'konu', 'sınav', 'öğretmen'],
    answer: 'öğretmen'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'not',
    question: 'کدام کلمه را شنیدی؟',
    options: ['not', 'sınav', 'ders', 'konu'],
    answer: 'not'
  },
  {
    type: 'audio',
    speak: 'sınav',
    question: 'کدام کلمه را شنیدی؟',
    options: ['öğretmen', 'sınav', 'not', 'ders'],
    answer: 'sınav'
  },
  {
    type: 'audio',
    speak: 'ders',
    question: 'کدام کلمه را شنیدی؟',
    options: ['not', 'ders', 'konu', 'sınav'],
    answer: 'ders'
  },
  {
    type: 'audio',
    speak: 'konu',
    question: 'کدام کلمه را شنیدی؟',
    options: ['sınav', 'not', 'ders', 'konu'],
    answer: 'konu'
  },
  {
    type: 'audio',
    speak: 'öğretmen',
    question: 'کدام کلمه را شنیدی؟',
    options: ['öğretmen', 'konu', 'not', 'sınav'],
    answer: 'öğretmen'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'not',
    image: '../../../media/a2/school/grade.png',
    meaning: 'نمره'
  },
  {
    type: 'speak',
    word: 'sınav',
    image: '../../../media/a2/school/exam.png',
    meaning: 'امتحان'
  },
  {
    type: 'speak',
    word: 'ders',
    image: '../../../media/a2/school/lesson.png',
    meaning: 'درس'
  },
  {
    type: 'speak',
    word: 'konu',
    image: '../../../media/a2/school/subject.png',
    meaning: 'موضوع'
  },
  {
    type: 'speak',
    word: 'öğretmen',
    image: '../../../media/a2/school/teacher.png',
    meaning: 'معلم'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ترکی) =====
  {
    type: 'build-it',
    speak: 'Notum yüksek',
    question: 'جمله ترکی را بساز:',
    text: 'نمره‌ام بالا است',
    words: ['yüksek', 'Notum'],
    answer: ['Notum', 'yüksek']
  },
  {
    type: 'build-it',
    speak: 'Sınava hazırlanıyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من برای امتحان آماده می‌شوم',
    words: ['hazırlanıyorum', 'Sınava'],
    answer: ['Sınava', 'hazırlanıyorum']
  },
  {
    type: 'build-it',
    speak: 'Ders çalışıyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من درس می‌خوانم',
    words: ['çalışıyorum', 'Ders'],
    answer: ['Ders', 'çalışıyorum']
  },
  {
    type: 'build-it',
    speak: 'Konuyu anlıyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من موضوع را می‌فهمم',
    words: ['anlıyorum', 'Konuyu'],
    answer: ['Konuyu', 'anlıyorum']
  },
  {
    type: 'build-it',
    speak: 'Öğretmen iyi',
    question: 'جمله ترکی را بساز:',
    text: 'معلم خوب است',
    words: ['iyi', 'Öğretmen'],
    answer: ['Öğretmen', 'iyi']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Notum yüksek',
    question: 'ترجمه را بساز:',
    text: 'Notum yüksek',
    words: ['است', 'بالا', 'نمره‌ام'],
    answer: ['نمره‌ام', 'بالا', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Sınava hazırlanıyorum',
    question: 'ترجمه را بساز:',
    text: 'Sınava hazırlanıyorum',
    words: ['من', 'آماده می‌شوم', 'برای امتحان'],
    answer: ['من', 'برای امتحان', 'آماده می‌شوم']
  },
  {
    type: 'build-fa',
    speak: 'Ders çalışıyorum',
    question: 'ترجمه را بساز:',
    text: 'Ders çalışıyorum',
    words: ['من', 'می‌خوانم', 'درس'],
    answer: ['من', 'درس', 'می‌خوانم']
  },
  {
    type: 'build-fa',
    speak: 'Konuyu anlıyorum',
    question: 'ترجمه را بساز:',
    text: 'Konuyu anlıyorum',
    words: ['من', 'می‌فهمم', 'موضوع را'],
    answer: ['من', 'موضوع را', 'می‌فهمم']
  },
  {
    type: 'build-fa',
    speak: 'Öğretmen iyi',
    question: 'ترجمه را بساز:',
    text: 'Öğretmen iyi',
    words: ['است', 'خوب', 'معلم'],
    answer: ['معلم', 'خوب', 'است']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 درس تمام شد! 🎉</h2>
      <p>امتیاز دریافت‌شده: <b>${finalXP}</b></p>
      <a href="../index.html">بازگشت</a>
    `;
    return;
  }

  const q = questions[current];
  const title = document.getElementById('question-title');
  const content = document.getElementById('question-content');
  const optionsBox = document.getElementById('options');
  const wordBuilder = document.getElementById('word-builder');

  title.innerText = '';
  content.innerHTML = '';
  optionsBox.innerHTML = '';
  wordBuilder.innerHTML = '';
  wordBuilder.classList.add('hidden');

  // ===== بخش SPEAK =====
  if (q.type === 'speak') {
    title.innerText = '🗣️ کلمه را بگو';
    content.innerHTML = `
      <div class="speak-card">
        <img src="${q.image}" alt="${q.word}">
        <div class="word-big">${q.word}</div>
        <div class="word-meaning">${q.meaning}</div>
        <button class="audio-btn" onclick="speak('${q.word}')">🔊 تکرار</button>
        <div class="record-area">
          <button id="record-btn" class="record-btn" onclick="startRecording('${q.word}')">🎤 ضبط</button>
          <div id="record-status" class="record-status">برای شروع ضبط کلیک کن</div>
        </div>
        <div class="skip-area">
          <button class="skip-btn" onclick="skipSpeak()">⏭️ رد کردن (بدون امتیاز)</button>
        </div>
      </div>
    `;
    return;
  }

  // ===== بخش IMAGE =====
  if (q.type === 'image') {
    title.innerText = q.question;
    content.innerHTML = `
      <button class="audio-btn repeat-btn" onclick="speak('${q.speak}')">🔊 تکرار صدا</button>
    `;
    if (q.speak) {
      setTimeout(() => speak(q.speak), 200);
    }
    optionsBox.classList.add('image-grid');
    shuffleArray(q.options).forEach(opt => {
      let btn = document.createElement('button');
      btn.className = 'option image-option';
      btn.innerHTML = `<img src="${opt.image}" alt="${opt.text}">`;
      btn.onclick = () => select(opt.text);
      optionsBox.appendChild(btn);
    });
    return;
  }

  // ===== بخش WORD =====
  if (q.type === 'word') {
    title.innerText = q.question;
    content.innerHTML = `<img src="${q.image}">`;
    shuffleArray(q.options).forEach(opt => {
      let b = document.createElement('button');
      b.className = 'option';
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
    return;
  }

  // ===== بخش AUDIO =====
  if (q.type === 'audio') {
    title.innerText = q.question;
    content.innerHTML = `
      <button class="audio-btn" onclick="speak('${q.speak}')">🔊 تکرار</button>
    `;
    if (q.speak) {
      setTimeout(() => speak(q.speak), 200);
    }
    shuffleArray(q.options).forEach(opt => {
      let b = document.createElement('button');
      b.className = 'option';
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
    return;
  }

  // ===== بخش BUILD IT / FA =====
  if (q.type === 'build-it' || q.type === 'build-fa') {
    title.innerText = q.question;
    content.innerHTML = `
      <p style="margin-bottom:10px;">${q.text}</p>
      <button class="audio-btn" onclick="speak('${q.speak}')">🔊 تکرار جمله</button>
    `;
    if (q.speak) {
      setTimeout(() => speak(q.speak), 200);
    }
    
    wordBuilder.innerHTML = '';
    optionsBox.innerHTML = '';
    wordBuilder.classList.remove('hidden');
    wordBuilder.classList.remove('ltr', 'rtl');
    optionsBox.classList.remove('ltr', 'rtl');

    if (q.type === 'build-it') {
      wordBuilder.classList.add('ltr');
      optionsBox.classList.add('ltr');
    } else {
      wordBuilder.classList.add('rtl');
      optionsBox.classList.add('rtl');
    }

    shuffleArray(q.words).forEach(w => {
      const tile = document.createElement('span');
      tile.className = 'tile';
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
    return;
  }
}

// ===== توابع کمکی =====
function nextQuestion() {
  current++;
  showQuestion();
}

async function select(ans) {
  const correct = questions[current].answer;
  if (String(ans).trim() === String(correct).trim()) {
    xp += 5;
    if (typeof addXP === 'function') {
      await addXP(5);
    }
    current++;
    showQuestion();
  } else {
    alert('❌ اشتباه! دوباره تلاش کن.');
    if (typeof loseHeart === 'function') {
      await loseHeart();
    }
    if (typeof checkAndRegenHearts === 'function') {
      checkAndRegenHearts();
    }
    const heartElement = document.getElementById('heart-count');
    if (heartElement && typeof getHearts === 'function') {
      heartElement.textContent = getHearts();
    }
    if (typeof getHearts === 'function' && getHearts() <= 0) {
      document.getElementById('app').innerHTML = `
        <h2>💔 قلب شما تمام شد!</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../index.html">بازگشت</a>
      `;
      return;
    }
  }
}

async function checkBuild(selected, correct) {
  const s = selected.map(w => w.trim());
  const c = correct.map(w => w.trim());

  if (JSON.stringify(s) === JSON.stringify(c)) {
    xp += 5;
    if (typeof addXP === 'function') {
      await addXP(5);
    }
    current++;
    showQuestion();
  } else {
    alert('❌ اشتباه! دوباره تلاش کن.');
    if (typeof loseHeart === 'function') {
      await loseHeart();
    }
    if (typeof checkAndRegenHearts === 'function') {
      checkAndRegenHearts();
    }
    const heartElement = document.getElementById('heart-count');
    if (heartElement && typeof getHearts === 'function') {
      heartElement.textContent = getHearts();
    }
    if (typeof getHearts === 'function' && getHearts() <= 0) {
      document.getElementById('app').innerHTML = `
        <h2>💔 قلب شما تمام شد!</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../index.html">بازگشت</a>
      `;
      return;
    }
  }
}

function removeLastBuilderItem() {
  const wordBuilder = document.getElementById('word-builder');
  const optionsBox = document.getElementById('options');
  if (!wordBuilder || !optionsBox) return;
  if (wordBuilder.children.length === 0) return;
  const lastItem = wordBuilder.lastElementChild;
  if (lastItem) {
    optionsBox.prepend(lastItem);
  }
}

document.addEventListener('keydown', function (e) {
  const wordBuilder = document.getElementById('word-builder');
  if (!wordBuilder) return;
  if (e.key === 'Backspace') {
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

showQuestion();