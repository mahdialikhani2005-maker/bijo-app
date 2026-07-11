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

// ===== سوالات درس ۲۹ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "le short" است؟',
    speak: 'le short',
    options: [
      { text: 'le short', image: '../../../media/a2/clothes/shorts.png' },
      { text: 'la jupe', image: '../../../media/a2/clothes/skirt.png' },
      { text: 'les chaussettes', image: '../../../media/a2/clothes/socks.png' },
      { text: 'le pyjama', image: '../../../media/a2/clothes/pajama.png' }
    ],
    answer: 'le short'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la jupe" است؟',
    speak: 'la jupe',
    options: [
      { text: 'le short', image: '../../../media/a2/clothes/shorts.png' },
      { text: 'la jupe', image: '../../../media/a2/clothes/skirt.png' },
      { text: 'les sous-vêtements', image: '../../../media/a2/clothes/underwear.png' },
      { text: 'les chaussettes', image: '../../../media/a2/clothes/socks.png' }
    ],
    answer: 'la jupe'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "les chaussettes" است؟',
    speak: 'les chaussettes',
    options: [
      { text: 'le pyjama', image: '../../../media/a2/clothes/pajama.png' },
      { text: 'le short', image: '../../../media/a2/clothes/shorts.png' },
      { text: 'les chaussettes', image: '../../../media/a2/clothes/socks.png' },
      { text: 'la jupe', image: '../../../media/a2/clothes/skirt.png' }
    ],
    answer: 'les chaussettes'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "les sous-vêtements" است؟',
    speak: 'les sous-vêtements',
    options: [
      { text: 'les chaussettes', image: '../../../media/a2/clothes/socks.png' },
      { text: 'les sous-vêtements', image: '../../../media/a2/clothes/underwear.png' },
      { text: 'le pyjama', image: '../../../media/a2/clothes/pajama.png' },
      { text: 'le short', image: '../../../media/a2/clothes/shorts.png' }
    ],
    answer: 'les sous-vêtements'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le pyjama" است؟',
    speak: 'le pyjama',
    options: [
      { text: 'le short', image: '../../../media/a2/clothes/shorts.png' },
      { text: 'la jupe', image: '../../../media/a2/clothes/skirt.png' },
      { text: 'le pyjama', image: '../../../media/a2/clothes/pajama.png' },
      { text: 'les sous-vêtements', image: '../../../media/a2/clothes/underwear.png' }
    ],
    answer: 'le pyjama'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/shorts.png',
    options: ['le short', 'la jupe', 'les chaussettes', 'le pyjama'],
    answer: 'le short'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/skirt.png',
    options: ['le short', 'la jupe', 'les sous-vêtements', 'les chaussettes'],
    answer: 'la jupe'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/socks.png',
    options: ['le pyjama', 'le short', 'les chaussettes', 'la jupe'],
    answer: 'les chaussettes'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/underwear.png',
    options: ['les chaussettes', 'les sous-vêtements', 'le pyjama', 'le short'],
    answer: 'les sous-vêtements'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/clothes/pajama.png',
    options: ['le short', 'la jupe', 'le pyjama', 'les sous-vêtements'],
    answer: 'le pyjama'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'le short',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le short', 'la jupe', 'les chaussettes', 'le pyjama'],
    answer: 'le short'
  },
  {
    type: 'audio',
    speak: 'la jupe',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le short', 'la jupe', 'les sous-vêtements', 'les chaussettes'],
    answer: 'la jupe'
  },
  {
    type: 'audio',
    speak: 'les chaussettes',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le pyjama', 'le short', 'les chaussettes', 'la jupe'],
    answer: 'les chaussettes'
  },
  {
    type: 'audio',
    speak: 'les sous-vêtements',
    question: 'کدام کلمه را شنیدی؟',
    options: ['les chaussettes', 'les sous-vêtements', 'le pyjama', 'le short'],
    answer: 'les sous-vêtements'
  },
  {
    type: 'audio',
    speak: 'le pyjama',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le short', 'la jupe', 'le pyjama', 'les sous-vêtements'],
    answer: 'le pyjama'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'le short',
    image: '../../../media/a2/clothes/shorts.png',
    meaning: 'شورت'
  },
  {
    type: 'speak',
    word: 'la jupe',
    image: '../../../media/a2/clothes/skirt.png',
    meaning: 'دامن'
  },
  {
    type: 'speak',
    word: 'les chaussettes',
    image: '../../../media/a2/clothes/socks.png',
    meaning: 'جوراب'
  },
  {
    type: 'speak',
    word: 'les sous-vêtements',
    image: '../../../media/a2/clothes/underwear.png',
    meaning: 'لباس زیر'
  },
  {
    type: 'speak',
    word: 'le pyjama',
    image: '../../../media/a2/clothes/pajama.png',
    meaning: 'پیژامه'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'Je porte un short',
    question: 'جمله فرانسوی را بساز:',
    text: 'من شورت می‌پوشم',
    words: ['short', 'un', 'porte', 'Je'],
    answer: ['Je', 'porte', 'un', 'short']
  },
  {
    type: 'build-en',
    speak: 'Je porte une jupe',
    question: 'جمله فرانسوی را بساز:',
    text: 'من دامن می‌پوشم',
    words: ['jupe', 'une', 'porte', 'Je'],
    answer: ['Je', 'porte', 'une', 'jupe']
  },
  {
    type: 'build-en',
    speak: 'Je porte des chaussettes',
    question: 'جمله فرانسوی را بساز:',
    text: 'من جوراب می‌پوشم',
    words: ['chaussettes', 'des', 'porte', 'Je'],
    answer: ['Je', 'porte', 'des', 'chaussettes']
  },
  {
    type: 'build-en',
    speak: 'Je porte des sous-vêtements',
    question: 'جمله فرانسوی را بساز:',
    text: 'من لباس زیر می‌پوشم',
    words: ['sous-vêtements', 'des', 'porte', 'Je'],
    answer: ['Je', 'porte', 'des', 'sous-vêtements']
  },
  {
    type: 'build-en',
    speak: 'Je porte un pyjama',
    question: 'جمله فرانسوی را بساز:',
    text: 'من پیژامه می‌پوشم',
    words: ['pyjama', 'un', 'porte', 'Je'],
    answer: ['Je', 'porte', 'un', 'pyjama']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Je porte un short',
    question: 'ترجمه را بساز:',
    text: 'Je porte un short',
    words: ['می‌پوشم', 'شورت', 'یک', 'من'],
    answer: ['من', 'یک', 'شورت', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Je porte une jupe',
    question: 'ترجمه را بساز:',
    text: 'Je porte une jupe',
    words: ['می‌پوشم', 'دامن', 'یک', 'من'],
    answer: ['من', 'یک', 'دامن', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Je porte des chaussettes',
    question: 'ترجمه را بساز:',
    text: 'Je porte des chaussettes',
    words: ['می‌پوشم', 'جوراب', 'من'],
    answer: ['من', 'جوراب', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Je porte des sous-vêtements',
    question: 'ترجمه را بساز:',
    text: 'Je porte des sous-vêtements',
    words: ['می‌پوشم', 'زیر', 'لباس', 'من'],
    answer: ['من', 'لباس', 'زیر', 'می‌پوشم']
  },
  {
    type: 'build-fa',
    speak: 'Je porte un pyjama',
    question: 'ترجمه را بساز:',
    text: 'Je porte un pyjama',
    words: ['می‌پوشم', 'پیژامه', 'یک', 'من'],
    answer: ['من', 'یک', 'پیژامه', 'می‌پوشم']
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