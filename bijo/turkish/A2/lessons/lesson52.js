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

// ===== سوالات درس ۵۲ - ترکی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "sırt çantası" است؟',
    speak: 'sırt çantası',
    options: [
      { text: 'sırt çantası', image: '../../../media/a2/travel/backpack.png' },
      { text: 'çadır', image: '../../../media/a2/travel/tent.png' },
      { text: 'pusula', image: '../../../media/a2/travel/compass.png' },
      { text: 'dürbün', image: '../../../media/a2/travel/binoculars.png' }
    ],
    answer: 'sırt çantası'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "çadır" است؟',
    speak: 'çadır',
    options: [
      { text: 'güneş kremi', image: '../../../media/a2/travel/sunscreen.png' },
      { text: 'çadır', image: '../../../media/a2/travel/tent.png' },
      { text: 'sırt çantası', image: '../../../media/a2/travel/backpack.png' },
      { text: 'pusula', image: '../../../media/a2/travel/compass.png' }
    ],
    answer: 'çadır'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "pusula" است؟',
    speak: 'pusula',
    options: [
      { text: 'sırt çantası', image: '../../../media/a2/travel/backpack.png' },
      { text: 'pusula', image: '../../../media/a2/travel/compass.png' },
      { text: 'dürbün', image: '../../../media/a2/travel/binoculars.png' },
      { text: 'çadır', image: '../../../media/a2/travel/tent.png' }
    ],
    answer: 'pusula'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "dürbün" است؟',
    speak: 'dürbün',
    options: [
      { text: 'çadır', image: '../../../media/a2/travel/tent.png' },
      { text: 'sırt çantası', image: '../../../media/a2/travel/backpack.png' },
      { text: 'pusula', image: '../../../media/a2/travel/compass.png' },
      { text: 'dürbün', image: '../../../media/a2/travel/binoculars.png' }
    ],
    answer: 'dürbün'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "güneş kremi" است؟',
    speak: 'güneş kremi',
    options: [
      { text: 'güneş kremi', image: '../../../media/a2/travel/sunscreen.png' },
      { text: 'dürbün', image: '../../../media/a2/travel/binoculars.png' },
      { text: 'sırt çantası', image: '../../../media/a2/travel/backpack.png' },
      { text: 'çadır', image: '../../../media/a2/travel/tent.png' }
    ],
    answer: 'güneş kremi'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/backpack.png',
    options: ['sırt çantası', 'çadır', 'pusula', 'dürbün'],
    answer: 'sırt çantası'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/tent.png',
    options: ['sırt çantası', 'çadır', 'pusula', 'güneş kremi'],
    answer: 'çadır'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/compass.png',
    options: ['güneş kremi', 'sırt çantası', 'pusula', 'çadır'],
    answer: 'pusula'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/binoculars.png',
    options: ['pusula', 'çadır', 'dürbün', 'sırt çantası'],
    answer: 'dürbün'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/sunscreen.png',
    options: ['sırt çantası', 'dürbün', 'çadır', 'güneş kremi'],
    answer: 'güneş kremi'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'sırt çantası',
    question: 'کدام کلمه را شنیدی؟',
    options: ['sırt çantası', 'çadır', 'pusula', 'dürbün'],
    answer: 'sırt çantası'
  },
  {
    type: 'audio',
    speak: 'çadır',
    question: 'کدام کلمه را شنیدی؟',
    options: ['güneş kremi', 'çadır', 'sırt çantası', 'pusula'],
    answer: 'çadır'
  },
  {
    type: 'audio',
    speak: 'pusula',
    question: 'کدام کلمه را شنیدی؟',
    options: ['sırt çantası', 'pusula', 'dürbün', 'çadır'],
    answer: 'pusula'
  },
  {
    type: 'audio',
    speak: 'dürbün',
    question: 'کدام کلمه را شنیدی؟',
    options: ['çadır', 'sırt çantası', 'pusula', 'dürbün'],
    answer: 'dürbün'
  },
  {
    type: 'audio',
    speak: 'güneş kremi',
    question: 'کدام کلمه را شنیدی؟',
    options: ['güneş kremi', 'dürbün', 'sırt çantası', 'çadır'],
    answer: 'güneş kremi'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'sırt çantası',
    image: '../../../media/a2/travel/backpack.png',
    meaning: 'کوله‌پشتی'
  },
  {
    type: 'speak',
    word: 'çadır',
    image: '../../../media/a2/travel/tent.png',
    meaning: 'چادر'
  },
  {
    type: 'speak',
    word: 'pusula',
    image: '../../../media/a2/travel/compass.png',
    meaning: 'قطب‌نما'
  },
  {
    type: 'speak',
    word: 'dürbün',
    image: '../../../media/a2/travel/binoculars.png',
    meaning: 'دوربین دوچشمی'
  },
  {
    type: 'speak',
    word: 'güneş kremi',
    image: '../../../media/a2/travel/sunscreen.png',
    meaning: 'کرم ضدآفتاب'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ترکی) =====
  {
    type: 'build-it',
    speak: 'Sırt çantam var',
    question: 'جمله ترکی را بساز:',
    text: 'من کوله‌پشتی دارم',
    words: ['var', 'çantam', 'Sırt'],
    answer: ['Sırt', 'çantam', 'var']
  },
  {
    type: 'build-it',
    speak: 'Çadır kuruyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من چادر برپا می‌کنم',
    words: ['kuruyorum', 'Çadır'],
    answer: ['Çadır', 'kuruyorum']
  },
  {
    type: 'build-it',
    speak: 'Pusula kullanıyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من قطب‌نما استفاده می‌کنم',
    words: ['kullanıyorum', 'Pusula'],
    answer: ['Pusula', 'kullanıyorum']
  },
  {
    type: 'build-it',
    speak: 'Dürbünle bakıyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من با دوربین دوچشمی نگاه می‌کنم',
    words: ['bakıyorum', 'Dürbünle'],
    answer: ['Dürbünle', 'bakıyorum']
  },
  {
    type: 'build-it',
    speak: 'Güneş kremi sürüyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من کرم ضدآفتاب می‌زنم',
    words: ['sürüyorum', 'kremi', 'Güneş'],
    answer: ['Güneş', 'kremi', 'sürüyorum']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Sırt çantam var',
    question: 'ترجمه را بساز:',
    text: 'Sırt çantam var',
    words: ['من', 'دارم', 'کوله‌پشتی'],
    answer: ['من', 'کوله‌پشتی', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Çadır kuruyorum',
    question: 'ترجمه را بساز:',
    text: 'Çadır kuruyorum',
    words: ['من', 'برپا می‌کنم', 'چادر'],
    answer: ['من', 'چادر', 'برپا می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Pusula kullanıyorum',
    question: 'ترجمه را بساز:',
    text: 'Pusula kullanıyorum',
    words: ['من', 'استفاده می‌کنم', 'قطب‌نما'],
    answer: ['من', 'قطب‌نما', 'استفاده می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Dürbünle bakıyorum',
    question: 'ترجمه را بساز:',
    text: 'Dürbünle bakıyorum',
    words: ['من', 'نگاه می‌کنم', 'با دوربین دوچشمی'],
    answer: ['من', 'با دوربین دوچشمی', 'نگاه می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Güneş kremi sürüyorum',
    question: 'ترجمه را بساز:',
    text: 'Güneş kremi sürüyorum',
    words: ['من', 'می‌زنم', 'کرم ضدآفتاب'],
    answer: ['من', 'کرم ضدآفتاب', 'می‌زنم']
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