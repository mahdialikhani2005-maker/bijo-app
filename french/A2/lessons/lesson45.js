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

// ===== سوالات درس ۴۵ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "la chirurgie" است؟',
    speak: 'la chirurgie',
    options: [
      { text: 'la chirurgie', image: '../../../media/a2/health/surgery.png' },
      { text: 'l\'ambulance', image: '../../../media/a2/health/ambulance.png' },
      { text: 'le brancard', image: '../../../media/a2/health/stretcher.png' },
      { text: 'le fauteuil roulant', image: '../../../media/a2/health/wheelchair.png' }
    ],
    answer: 'la chirurgie'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'ambulance" است؟',
    speak: 'l\'ambulance',
    options: [
      { text: 'la chirurgie', image: '../../../media/a2/health/surgery.png' },
      { text: 'l\'ambulance', image: '../../../media/a2/health/ambulance.png' },
      { text: 'le plâtre', image: '../../../media/a2/health/cast.png' },
      { text: 'le brancard', image: '../../../media/a2/health/stretcher.png' }
    ],
    answer: 'l\'ambulance'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le brancard" است؟',
    speak: 'le brancard',
    options: [
      { text: 'le fauteuil roulant', image: '../../../media/a2/health/wheelchair.png' },
      { text: 'la chirurgie', image: '../../../media/a2/health/surgery.png' },
      { text: 'le brancard', image: '../../../media/a2/health/stretcher.png' },
      { text: 'l\'ambulance', image: '../../../media/a2/health/ambulance.png' }
    ],
    answer: 'le brancard'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le fauteuil roulant" است؟',
    speak: 'le fauteuil roulant',
    options: [
      { text: 'l\'ambulance', image: '../../../media/a2/health/ambulance.png' },
      { text: 'le fauteuil roulant', image: '../../../media/a2/health/wheelchair.png' },
      { text: 'le plâtre', image: '../../../media/a2/health/cast.png' },
      { text: 'la chirurgie', image: '../../../media/a2/health/surgery.png' }
    ],
    answer: 'le fauteuil roulant'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le plâtre" است؟',
    speak: 'le plâtre',
    options: [
      { text: 'la chirurgie', image: '../../../media/a2/health/surgery.png' },
      { text: 'le brancard', image: '../../../media/a2/health/stretcher.png' },
      { text: 'le plâtre', image: '../../../media/a2/health/cast.png' },
      { text: 'le fauteuil roulant', image: '../../../media/a2/health/wheelchair.png' }
    ],
    answer: 'le plâtre'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/surgery.png',
    options: ['la chirurgie', 'l\'ambulance', 'le brancard', 'le fauteuil roulant'],
    answer: 'la chirurgie'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/ambulance.png',
    options: ['la chirurgie', 'l\'ambulance', 'le plâtre', 'le brancard'],
    answer: 'l\'ambulance'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/stretcher.png',
    options: ['le fauteuil roulant', 'la chirurgie', 'le brancard', 'l\'ambulance'],
    answer: 'le brancard'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/wheelchair.png',
    options: ['l\'ambulance', 'le fauteuil roulant', 'le plâtre', 'la chirurgie'],
    answer: 'le fauteuil roulant'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/cast.png',
    options: ['la chirurgie', 'le brancard', 'le plâtre', 'le fauteuil roulant'],
    answer: 'le plâtre'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'la chirurgie',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la chirurgie', 'l\'ambulance', 'le brancard', 'le fauteuil roulant'],
    answer: 'la chirurgie'
  },
  {
    type: 'audio',
    speak: 'l\'ambulance',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la chirurgie', 'l\'ambulance', 'le plâtre', 'le brancard'],
    answer: 'l\'ambulance'
  },
  {
    type: 'audio',
    speak: 'le brancard',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le fauteuil roulant', 'la chirurgie', 'le brancard', 'l\'ambulance'],
    answer: 'le brancard'
  },
  {
    type: 'audio',
    speak: 'le fauteuil roulant',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'ambulance', 'le fauteuil roulant', 'le plâtre', 'la chirurgie'],
    answer: 'le fauteuil roulant'
  },
  {
    type: 'audio',
    speak: 'le plâtre',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la chirurgie', 'le brancard', 'le plâtre', 'le fauteuil roulant'],
    answer: 'le plâtre'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'la chirurgie',
    image: '../../../media/a2/health/surgery.png',
    meaning: 'جراحی'
  },
  {
    type: 'speak',
    word: 'l\'ambulance',
    image: '../../../media/a2/health/ambulance.png',
    meaning: 'آمبولانس'
  },
  {
    type: 'speak',
    word: 'le brancard',
    image: '../../../media/a2/health/stretcher.png',
    meaning: 'برانکارد'
  },
  {
    type: 'speak',
    word: 'le fauteuil roulant',
    image: '../../../media/a2/health/wheelchair.png',
    meaning: 'صندلی چرخدار'
  },
  {
    type: 'speak',
    word: 'le plâtre',
    image: '../../../media/a2/health/cast.png',
    meaning: 'گچ'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'Je fais une chirurgie',
    question: 'جمله فرانسوی را بساز:',
    text: 'من جراحی می‌کنم',
    words: ['chirurgie', 'une', 'fais', 'Je'],
    answer: ['Je', 'fais', 'une', 'chirurgie']
  },
  {
    type: 'build-en',
    speak: 'Je vois une ambulance',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک آمبولانس می‌بینم',
    words: ['ambulance', 'une', 'vois', 'Je'],
    answer: ['Je', 'vois', 'une', 'ambulance']
  },
  {
    type: 'build-en',
    speak: 'Je vois un brancard',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک برانکارد می‌بینم',
    words: ['brancard', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'brancard']
  },
  {
    type: 'build-en',
    speak: 'Je vois un fauteuil roulant',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک صندلی چرخدار می‌بینم',
    words: ['roulant', 'fauteuil', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'fauteuil', 'roulant']
  },
  {
    type: 'build-en',
    speak: 'Je vois un plâtre',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک گچ می‌بینم',
    words: ['plâtre', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'plâtre']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Je fais une chirurgie',
    question: 'ترجمه را بساز:',
    text: 'Je fais une chirurgie',
    words: ['می‌کنم', 'جراحی', 'یک', 'من'],
    answer: ['من', 'یک', 'جراحی', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois une ambulance',
    question: 'ترجمه را بساز:',
    text: 'Je vois une ambulance',
    words: ['می‌بینم', 'آمبولانس', 'یک', 'من'],
    answer: ['من', 'یک', 'آمبولانس', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois un brancard',
    question: 'ترجمه را بساز:',
    text: 'Je vois un brancard',
    words: ['می‌بینم', 'برانکارد', 'یک', 'من'],
    answer: ['من', 'یک', 'برانکارد', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois un fauteuil roulant',
    question: 'ترجمه را بساز:',
    text: 'Je vois un fauteuil roulant',
    words: ['می‌بینم', 'صندلی چرخدار', 'یک', 'من'],
    answer: ['من', 'یک', 'صندلی چرخدار', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois un plâtre',
    question: 'ترجمه را بساز:',
    text: 'Je vois un plâtre',
    words: ['می‌بینم', 'گچ', 'یک', 'من'],
    answer: ['من', 'یک', 'گچ', 'می‌بینم']
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