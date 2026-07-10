let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا (ترکی استانبولی) =====
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

// ===== سوالات درس ۲۵ - ترکی استانبولی به فارسی (صبحانه) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "tost" است؟',
    speak: 'tost',
    options: [
      { text: 'tost', image: '../../../media/a2/food/toast.png' },
      { text: 'tahıl', image: '../../../media/a2/food/cereal.png' },
      { text: 'yulaf ezmesi', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'reçel', image: '../../../media/a2/food/jam.png' }
    ],
    answer: 'tost'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "tahıl" است؟',
    speak: 'tahıl',
    options: [
      { text: 'tost', image: '../../../media/a2/food/toast.png' },
      { text: 'tahıl', image: '../../../media/a2/food/cereal.png' },
      { text: 'bal', image: '../../../media/a2/food/honey.png' },
      { text: 'yulaf ezmesi', image: '../../../media/a2/food/oatmeal.png' }
    ],
    answer: 'tahıl'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "yulaf ezmesi" است؟',
    speak: 'yulaf ezmesi',
    options: [
      { text: 'reçel', image: '../../../media/a2/food/jam.png' },
      { text: 'tost', image: '../../../media/a2/food/toast.png' },
      { text: 'yulaf ezmesi', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'tahıl', image: '../../../media/a2/food/cereal.png' }
    ],
    answer: 'yulaf ezmesi'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "reçel" است؟',
    speak: 'reçel',
    options: [
      { text: 'tost', image: '../../../media/a2/food/toast.png' },
      { text: 'reçel', image: '../../../media/a2/food/jam.png' },
      { text: 'tahıl', image: '../../../media/a2/food/cereal.png' },
      { text: 'bal', image: '../../../media/a2/food/honey.png' }
    ],
    answer: 'reçel'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "bal" است؟',
    speak: 'bal',
    options: [
      { text: 'yulaf ezmesi', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'bal', image: '../../../media/a2/food/honey.png' },
      { text: 'reçel', image: '../../../media/a2/food/jam.png' },
      { text: 'tost', image: '../../../media/a2/food/toast.png' }
    ],
    answer: 'bal'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/toast.png',
    options: ['tost', 'tahıl', 'yulaf ezmesi', 'reçel'],
    answer: 'tost'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cereal.png',
    options: ['tost', 'tahıl', 'bal', 'yulaf ezmesi'],
    answer: 'tahıl'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/oatmeal.png',
    options: ['reçel', 'tost', 'yulaf ezmesi', 'tahıl'],
    answer: 'yulaf ezmesi'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/jam.png',
    options: ['tost', 'reçel', 'tahıl', 'bal'],
    answer: 'reçel'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/honey.png',
    options: ['yulaf ezmesi', 'bal', 'reçel', 'tost'],
    answer: 'bal'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'tost',
    question: 'کدام کلمه را شنیدی؟',
    options: ['tost', 'tahıl', 'yulaf ezmesi', 'reçel'],
    answer: 'tost'
  },
  {
    type: 'audio',
    speak: 'tahıl',
    question: 'کدام کلمه را شنیدی؟',
    options: ['tost', 'tahıl', 'bal', 'yulaf ezmesi'],
    answer: 'tahıl'
  },
  {
    type: 'audio',
    speak: 'yulaf ezmesi',
    question: 'کدام کلمه را شنیدی؟',
    options: ['reçel', 'tost', 'yulaf ezmesi', 'tahıl'],
    answer: 'yulaf ezmesi'
  },
  {
    type: 'audio',
    speak: 'reçel',
    question: 'کدام کلمه را شنیدی؟',
    options: ['tost', 'reçel', 'tahıl', 'bal'],
    answer: 'reçel'
  },
  {
    type: 'audio',
    speak: 'bal',
    question: 'کدام کلمه را شنیدی؟',
    options: ['yulaf ezmesi', 'bal', 'reçel', 'tost'],
    answer: 'bal'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'tost',
    image: '../../../media/a2/food/toast.png',
    meaning: 'نان تست'
  },
  {
    type: 'speak',
    word: 'tahıl',
    image: '../../../media/a2/food/cereal.png',
    meaning: 'غلات صبحانه'
  },
  {
    type: 'speak',
    word: 'yulaf ezmesi',
    image: '../../../media/a2/food/oatmeal.png',
    meaning: 'بلغور جو'
  },
  {
    type: 'speak',
    word: 'reçel',
    image: '../../../media/a2/food/jam.png',
    meaning: 'مربا'
  },
  {
    type: 'speak',
    word: 'bal',
    image: '../../../media/a2/food/honey.png',
    meaning: 'عسل'
  },

  // ===== بخش ۵: BUILD TR (ساخت جمله ترکی) =====
  {
    type: 'build-tr',
    speak: 'Bu bir tost',
    question: 'جمله ترکی را بساز:',
    text: 'این یک نان تست است',
    words: ['tost', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'tost']
  },
  {
    type: 'build-tr',
    speak: 'Bu tahıl',
    question: 'جمله ترکی را بساز:',
    text: 'این غلات صبحانه است',
    words: ['tahıl', 'Bu'],
    answer: ['Bu', 'tahıl']
  },
  {
    type: 'build-tr',
    speak: 'Bu yulaf ezmesi',
    question: 'جمله ترکی را بساز:',
    text: 'این بلغور جو است',
    words: ['yulaf', 'ezmesi', 'Bu'],
    answer: ['Bu', 'yulaf', 'ezmesi']
  },
  {
    type: 'build-tr',
    speak: 'Bu reçel',
    question: 'جمله ترکی را بساز:',
    text: 'این مربا است',
    words: ['reçel', 'Bu'],
    answer: ['Bu', 'reçel']
  },
  {
    type: 'build-tr',
    speak: 'Bu bal',
    question: 'جمله ترکی را بساز:',
    text: 'این عسل است',
    words: ['bal', 'Bu'],
    answer: ['Bu', 'bal']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Bu bir tost',
    question: 'ترجمه را بساز:',
    text: 'Bu bir tost',
    words: ['است', 'نان تست', 'یک', 'این'],
    answer: ['این', 'یک', 'نان تست', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu tahıl',
    question: 'ترجمه را بساز:',
    text: 'Bu tahıl',
    words: ['است', 'غلات صبحانه', 'این'],
    answer: ['این', 'غلات صبحانه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu yulaf ezmesi',
    question: 'ترجمه را بساز:',
    text: 'Bu yulaf ezmesi',
    words: ['است', 'بلغور جو', 'این'],
    answer: ['این', 'بلغور جو', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu reçel',
    question: 'ترجمه را بساز:',
    text: 'Bu reçel',
    words: ['است', 'مربا', 'این'],
    answer: ['این', 'مربا', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bal',
    question: 'ترجمه را بساز:',
    text: 'Bu bal',
    words: ['است', 'عسل', 'این'],
    answer: ['این', 'عسل', 'است']
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

  // ===== بخش BUILD TR / FA =====
  if (q.type === 'build-tr' || q.type === 'build-fa') {
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

    if (q.type === 'build-tr') {
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