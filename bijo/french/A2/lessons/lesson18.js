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

// ===== سوالات درس ۱۸ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "mécanicien" است؟',
    speak: 'mécanicien',
    options: [
      { text: 'plombier', image: '../../../media/a2/jobs/plumber.png' },
      { text: 'mécanicien', image: '../../../media/a2/jobs/mechanic.png' },
      { text: 'électricien', image: '../../../media/a2/jobs/electrician.png' },
      { text: 'charpentier', image: '../../../media/a2/jobs/carpenter.png' }
    ],
    answer: 'mécanicien'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "plombier" است؟',
    speak: 'plombier',
    options: [
      { text: 'mécanicien', image: '../../../media/a2/jobs/mechanic.png' },
      { text: 'plombier', image: '../../../media/a2/jobs/plumber.png' },
      { text: 'maçon', image: '../../../media/a2/jobs/mason.png' },
      { text: 'électricien', image: '../../../media/a2/jobs/electrician.png' }
    ],
    answer: 'plombier'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "électricien" است؟',
    speak: 'électricien',
    options: [
      { text: 'charpentier', image: '../../../media/a2/jobs/carpenter.png' },
      { text: 'mécanicien', image: '../../../media/a2/jobs/mechanic.png' },
      { text: 'électricien', image: '../../../media/a2/jobs/electrician.png' },
      { text: 'plombier', image: '../../../media/a2/jobs/plumber.png' }
    ],
    answer: 'électricien'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "charpentier" است؟',
    speak: 'charpentier',
    options: [
      { text: 'charpentier', image: '../../../media/a2/jobs/carpenter.png' },
      { text: 'maçon', image: '../../../media/a2/jobs/mason.png' },
      { text: 'plombier', image: '../../../media/a2/jobs/plumber.png' },
      { text: 'mécanicien', image: '../../../media/a2/jobs/mechanic.png' }
    ],
    answer: 'charpentier'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "maçon" است؟',
    speak: 'maçon',
    options: [
      { text: 'électricien', image: '../../../media/a2/jobs/electrician.png' },
      { text: 'maçon', image: '../../../media/a2/jobs/mason.png' },
      { text: 'charpentier', image: '../../../media/a2/jobs/carpenter.png' },
      { text: 'plombier', image: '../../../media/a2/jobs/plumber.png' }
    ],
    answer: 'maçon'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/mechanic.png',
    options: ['plombier', 'mécanicien', 'électricien', 'charpentier'],
    answer: 'mécanicien'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/plumber.png',
    options: ['mécanicien', 'plombier', 'maçon', 'électricien'],
    answer: 'plombier'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/electrician.png',
    options: ['charpentier', 'mécanicien', 'électricien', 'plombier'],
    answer: 'électricien'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/carpenter.png',
    options: ['charpentier', 'maçon', 'plombier', 'mécanicien'],
    answer: 'charpentier'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/mason.png',
    options: ['électricien', 'maçon', 'charpentier', 'plombier'],
    answer: 'maçon'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'mécanicien',
    question: 'کدام کلمه را شنیدی؟',
    options: ['plombier', 'mécanicien', 'électricien', 'charpentier'],
    answer: 'mécanicien'
  },
  {
    type: 'audio',
    speak: 'plombier',
    question: 'کدام کلمه را شنیدی؟',
    options: ['mécanicien', 'plombier', 'maçon', 'électricien'],
    answer: 'plombier'
  },
  {
    type: 'audio',
    speak: 'électricien',
    question: 'کدام کلمه را شنیدی؟',
    options: ['charpentier', 'mécanicien', 'électricien', 'plombier'],
    answer: 'électricien'
  },
  {
    type: 'audio',
    speak: 'charpentier',
    question: 'کدام کلمه را شنیدی؟',
    options: ['charpentier', 'maçon', 'plombier', 'mécanicien'],
    answer: 'charpentier'
  },
  {
    type: 'audio',
    speak: 'maçon',
    question: 'کدام کلمه را شنیدی؟',
    options: ['électricien', 'maçon', 'charpentier', 'plombier'],
    answer: 'maçon'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'mécanicien',
    image: '../../../media/a2/jobs/mechanic.png',
    meaning: 'مکانیک'
  },
  {
    type: 'speak',
    word: 'plombier',
    image: '../../../media/a2/jobs/plumber.png',
    meaning: 'لوله‌کش'
  },
  {
    type: 'speak',
    word: 'électricien',
    image: '../../../media/a2/jobs/electrician.png',
    meaning: 'برق‌کار'
  },
  {
    type: 'speak',
    word: 'charpentier',
    image: '../../../media/a2/jobs/carpenter.png',
    meaning: 'نجار'
  },
  {
    type: 'speak',
    word: 'maçon',
    image: '../../../media/a2/jobs/mason.png',
    meaning: 'بنا'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'C\'est un mécanicien',
    question: 'جمله فرانسوی را بساز:',
    text: 'او مکانیک است',
    words: ['mécanicien', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'mécanicien']
  },
  {
    type: 'build-en',
    speak: 'C\'est un plombier',
    question: 'جمله فرانسوی را بساز:',
    text: 'او لوله‌کش است',
    words: ['plombier', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'plombier']
  },
  {
    type: 'build-en',
    speak: 'C\'est un électricien',
    question: 'جمله فرانسوی را بساز:',
    text: 'او برق‌کار است',
    words: ['électricien', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'électricien']
  },
  {
    type: 'build-en',
    speak: 'C\'est un charpentier',
    question: 'جمله فرانسوی را بساز:',
    text: 'او نجار است',
    words: ['charpentier', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'charpentier']
  },
  {
    type: 'build-en',
    speak: 'C\'est un maçon',
    question: 'جمله فرانسوی را بساز:',
    text: 'او بنا است',
    words: ['maçon', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'maçon']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'C\'est un mécanicien',
    question: 'ترجمه را بساز:',
    text: 'C\'est un mécanicien',
    words: ['است', 'مکانیک', 'او'],
    answer: ['او', 'مکانیک', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est un plombier',
    question: 'ترجمه را بساز:',
    text: 'C\'est un plombier',
    words: ['است', 'لوله‌کش', 'او'],
    answer: ['او', 'لوله‌کش', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est un électricien',
    question: 'ترجمه را بساز:',
    text: 'C\'est un électricien',
    words: ['است', 'برق‌کار', 'او'],
    answer: ['او', 'برق‌کار', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est un charpentier',
    question: 'ترجمه را بساز:',
    text: 'C\'est un charpentier',
    words: ['است', 'نجار', 'او'],
    answer: ['او', 'نجار', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est un maçon',
    question: 'ترجمه را بساز:',
    text: 'C\'est un maçon',
    words: ['است', 'بنا', 'او'],
    answer: ['او', 'بنا', 'است']
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