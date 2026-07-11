let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "fr-FR";
  utter.rate = 0.9;
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
  recognition.lang = 'fr-FR';
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

// ===== سوالات درس ۴۹ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "la note" است؟',
    speak: 'la note',
    options: [
      { text: 'la note', image: '../../../media/a2/school/grade.png' },
      { text: 'l\'examen', image: '../../../media/a2/school/exam.png' },
      { text: 'la leçon', image: '../../../media/a2/school/lesson.png' },
      { text: 'le professeur', image: '../../../media/a2/school/teacher.png' }
    ],
    answer: 'la note'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'examen" است؟',
    speak: 'l\'examen',
    options: [
      { text: 'l\'examen', image: '../../../media/a2/school/exam.png' },
      { text: 'la matière', image: '../../../media/a2/school/subject.png' },
      { text: 'la note', image: '../../../media/a2/school/grade.png' },
      { text: 'la leçon', image: '../../../media/a2/school/lesson.png' }
    ],
    answer: 'l\'examen'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la leçon" است؟',
    speak: 'la leçon',
    options: [
      { text: 'le professeur', image: '../../../media/a2/school/teacher.png' },
      { text: 'la leçon', image: '../../../media/a2/school/lesson.png' },
      { text: 'l\'examen', image: '../../../media/a2/school/exam.png' },
      { text: 'la note', image: '../../../media/a2/school/grade.png' }
    ],
    answer: 'la leçon'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la matière" است؟',
    speak: 'la matière',
    options: [
      { text: 'la matière', image: '../../../media/a2/school/subject.png' },
      { text: 'la note', image: '../../../media/a2/school/grade.png' },
      { text: 'l\'examen', image: '../../../media/a2/school/exam.png' },
      { text: 'le professeur', image: '../../../media/a2/school/teacher.png' }
    ],
    answer: 'la matière'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le professeur" است؟',
    speak: 'le professeur',
    options: [
      { text: 'la leçon', image: '../../../media/a2/school/lesson.png' },
      { text: 'le professeur', image: '../../../media/a2/school/teacher.png' },
      { text: 'la matière', image: '../../../media/a2/school/subject.png' },
      { text: 'l\'examen', image: '../../../media/a2/school/exam.png' }
    ],
    answer: 'le professeur'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/grade.png',
    options: ['la note', 'l\'examen', 'la leçon', 'le professeur'],
    answer: 'la note'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/exam.png',
    options: ['l\'examen', 'la matière', 'la note', 'la leçon'],
    answer: 'l\'examen'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/lesson.png',
    options: ['le professeur', 'la leçon', 'l\'examen', 'la note'],
    answer: 'la leçon'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/subject.png',
    options: ['la matière', 'la note', 'l\'examen', 'le professeur'],
    answer: 'la matière'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/teacher.png',
    options: ['la leçon', 'le professeur', 'la matière', 'l\'examen'],
    answer: 'le professeur'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'la note',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la note', 'l\'examen', 'la leçon', 'le professeur'],
    answer: 'la note'
  },
  {
    type: 'audio',
    speak: 'l\'examen',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'examen', 'la matière', 'la note', 'la leçon'],
    answer: 'l\'examen'
  },
  {
    type: 'audio',
    speak: 'la leçon',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le professeur', 'la leçon', 'l\'examen', 'la note'],
    answer: 'la leçon'
  },
  {
    type: 'audio',
    speak: 'la matière',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la matière', 'la note', 'l\'examen', 'le professeur'],
    answer: 'la matière'
  },
  {
    type: 'audio',
    speak: 'le professeur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la leçon', 'le professeur', 'la matière', 'l\'examen'],
    answer: 'le professeur'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'la note',
    image: '../../../media/a2/school/grade.png',
    meaning: 'نمره'
  },
  {
    type: 'speak',
    word: 'l\'examen',
    image: '../../../media/a2/school/exam.png',
    meaning: 'امتحان'
  },
  {
    type: 'speak',
    word: 'la leçon',
    image: '../../../media/a2/school/lesson.png',
    meaning: 'درس'
  },
  {
    type: 'speak',
    word: 'la matière',
    image: '../../../media/a2/school/subject.png',
    meaning: 'موضوع درسی'
  },
  {
    type: 'speak',
    word: 'le professeur',
    image: '../../../media/a2/school/teacher.png',
    meaning: 'معلم'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'J\'ai une bonne note',
    question: 'جمله فرانسوی را بساز:',
    text: 'من نمره خوبی دارم',
    words: ['note', 'bonne', 'une', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'une', 'bonne', 'note']
  },
  {
    type: 'build-en',
    speak: 'J\'ai un examen aujourd\'hui',
    question: 'جمله فرانسوی را بساز:',
    text: 'من امروز امتحان دارم',
    words: ['aujourd\'hui', 'examen', 'un', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'un', 'examen', 'aujourd\'hui']
  },
  {
    type: 'build-en',
    speak: 'J\'étudie ma leçon',
    question: 'جمله فرانسوی را بساز:',
    text: 'من درس‌ام را می‌خوانم',
    words: ['leçon', 'ma', 'étudie', 'J\''],
    answer: ['J\'', 'étudie', 'ma', 'leçon']
  },
  {
    type: 'build-en',
    speak: 'Les maths sont ma matière préférée',
    question: 'جمله فرانسوی را بساز:',
    text: 'ریاضی موضوع مورد علاقه من است',
    words: ['matière', 'préférée', 'ma', 'sont', 'maths', 'Les'],
    answer: ['Les', 'maths', 'sont', 'ma', 'matière', 'préférée']
  },
  {
    type: 'build-en',
    speak: 'Le professeur est gentil',
    question: 'جمله فرانسوی را بساز:',
    text: 'معلم مهربان است',
    words: ['professeur', 'est', 'gentil', 'Le'],
    answer: ['Le', 'professeur', 'est', 'gentil']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'J\'ai une bonne note',
    question: 'ترجمه را بساز:',
    text: 'J\'ai une bonne note',
    words: ['دارم', 'نمره', 'خوبی', 'یک', 'من'],
    answer: ['من', 'یک', 'نمره', 'خوبی', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai un examen aujourd\'hui',
    question: 'ترجمه را بساز:',
    text: 'J\'ai un examen aujourd\'hui',
    words: ['دارم', 'امتحان', 'امروز', 'من'],
    answer: ['من', 'امروز', 'امتحان', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'étudie ma leçon',
    question: 'ترجمه را بساز:',
    text: 'J\'étudie ma leçon',
    words: ['می‌خوانم', 'درس', 'را', 'من'],
    answer: ['من', 'درس', 'را', 'می‌خوانم']
  },
  {
    type: 'build-fa',
    speak: 'Les maths sont ma matière préférée',
    question: 'ترجمه را بساز:',
    text: 'Les maths sont ma matière préférée',
    words: ['است', 'مورد علاقه', 'ریاضی', 'موضوع', 'من'],
    answer: ['ریاضی', 'موضوع', 'مورد علاقه', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Le professeur est gentil',
    question: 'ترجمه را بساز:',
    text: 'Le professeur est gentil',
    words: ['است', 'مهربان', 'معلم'],
    answer: ['معلم', 'مهربان', 'است']
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

  // ===== بخش BUILD EN / FA =====
  if (q.type === 'build-en' || q.type === 'build-fa') {
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

    if (q.type === 'build-en') {
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