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

// ===== سوالات درس ۱۷ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "serveur" است؟',
    speak: 'serveur',
    options: [
      { text: 'serveuse', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'serveur', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'coiffeur', image: '../../../media/a2/jobs/barber.png' },
      { text: 'tailleur', image: '../../../media/a2/jobs/tailor.png' }
    ],
    answer: 'serveur'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "serveuse" است؟',
    speak: 'serveuse',
    options: [
      { text: 'serveur', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'serveuse', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'boucher', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'coiffeur', image: '../../../media/a2/jobs/barber.png' }
    ],
    answer: 'serveuse'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "coiffeur" است؟',
    speak: 'coiffeur',
    options: [
      { text: 'tailleur', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'serveur', image: '../../../media/a2/jobs/waiter.png' },
      { text: 'coiffeur', image: '../../../media/a2/jobs/barber.png' },
      { text: 'serveuse', image: '../../../media/a2/jobs/waitress.png' }
    ],
    answer: 'coiffeur'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "tailleur" است؟',
    speak: 'tailleur',
    options: [
      { text: 'tailleur', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'boucher', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'serveuse', image: '../../../media/a2/jobs/waitress.png' },
      { text: 'serveur', image: '../../../media/a2/jobs/waiter.png' }
    ],
    answer: 'tailleur'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "boucher" است؟',
    speak: 'boucher',
    options: [
      { text: 'coiffeur', image: '../../../media/a2/jobs/barber.png' },
      { text: 'boucher', image: '../../../media/a2/jobs/butcher.png' },
      { text: 'tailleur', image: '../../../media/a2/jobs/tailor.png' },
      { text: 'serveuse', image: '../../../media/a2/jobs/waitress.png' }
    ],
    answer: 'boucher'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/waiter.png',
    options: ['serveuse', 'serveur', 'coiffeur', 'tailleur'],
    answer: 'serveur'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/waitress.png',
    options: ['serveur', 'serveuse', 'boucher', 'coiffeur'],
    answer: 'serveuse'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/barber.png',
    options: ['tailleur', 'serveur', 'coiffeur', 'serveuse'],
    answer: 'coiffeur'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/tailor.png',
    options: ['tailleur', 'boucher', 'serveuse', 'serveur'],
    answer: 'tailleur'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/butcher.png',
    options: ['coiffeur', 'boucher', 'tailleur', 'serveuse'],
    answer: 'boucher'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'serveur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['serveuse', 'serveur', 'coiffeur', 'tailleur'],
    answer: 'serveur'
  },
  {
    type: 'audio',
    speak: 'serveuse',
    question: 'کدام کلمه را شنیدی؟',
    options: ['serveur', 'serveuse', 'boucher', 'coiffeur'],
    answer: 'serveuse'
  },
  {
    type: 'audio',
    speak: 'coiffeur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['tailleur', 'serveur', 'coiffeur', 'serveuse'],
    answer: 'coiffeur'
  },
  {
    type: 'audio',
    speak: 'tailleur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['tailleur', 'boucher', 'serveuse', 'serveur'],
    answer: 'tailleur'
  },
  {
    type: 'audio',
    speak: 'boucher',
    question: 'کدام کلمه را شنیدی؟',
    options: ['coiffeur', 'boucher', 'tailleur', 'serveuse'],
    answer: 'boucher'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'serveur',
    image: '../../../media/a2/jobs/waiter.png',
    meaning: 'پیشخدمت'
  },
  {
    type: 'speak',
    word: 'serveuse',
    image: '../../../media/a2/jobs/waitress.png',
    meaning: 'پیشخدمت (زن)'
  },
  {
    type: 'speak',
    word: 'coiffeur',
    image: '../../../media/a2/jobs/barber.png',
    meaning: 'آرایشگر'
  },
  {
    type: 'speak',
    word: 'tailleur',
    image: '../../../media/a2/jobs/tailor.png',
    meaning: 'خیاط'
  },
  {
    type: 'speak',
    word: 'boucher',
    image: '../../../media/a2/jobs/butcher.png',
    meaning: 'قصاب'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'C\'est un serveur',
    question: 'جمله فرانسوی را بساز:',
    text: 'او پیشخدمت است',
    words: ['serveur', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'serveur']
  },
  {
    type: 'build-en',
    speak: 'C\'est une serveuse',
    question: 'جمله فرانسوی را بساز:',
    text: 'او پیشخدمت است (زن)',
    words: ['serveuse', 'une', 'C\'est'],
    answer: ['C\'est', 'une', 'serveuse']
  },
  {
    type: 'build-en',
    speak: 'C\'est un coiffeur',
    question: 'جمله فرانسوی را بساز:',
    text: 'او آرایشگر است',
    words: ['coiffeur', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'coiffeur']
  },
  {
    type: 'build-en',
    speak: 'C\'est un tailleur',
    question: 'جمله فرانسوی را بساز:',
    text: 'او خیاط است',
    words: ['tailleur', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'tailleur']
  },
  {
    type: 'build-en',
    speak: 'C\'est un boucher',
    question: 'جمله فرانسوی را بساز:',
    text: 'او قصاب است',
    words: ['boucher', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'boucher']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'C\'est un serveur',
    question: 'ترجمه را بساز:',
    text: 'C\'est un serveur',
    words: ['است', 'پیشخدمت', 'او'],
    answer: ['او', 'پیشخدمت', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est une serveuse',
    question: 'ترجمه را بساز:',
    text: 'C\'est une serveuse',
    words: ['است', 'پیشخدمت', 'او'],
    answer: ['او', 'پیشخدمت', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est un coiffeur',
    question: 'ترجمه را بساز:',
    text: 'C\'est un coiffeur',
    words: ['است', 'آرایشگر', 'او'],
    answer: ['او', 'آرایشگر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est un tailleur',
    question: 'ترجمه را بساز:',
    text: 'C\'est un tailleur',
    words: ['است', 'خیاط', 'او'],
    answer: ['او', 'خیاط', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est un boucher',
    question: 'ترجمه را بساز:',
    text: 'C\'est un boucher',
    words: ['است', 'قصاب', 'او'],
    answer: ['او', 'قصاب', 'است']
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