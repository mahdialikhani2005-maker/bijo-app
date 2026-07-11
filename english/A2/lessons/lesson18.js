let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
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
  recognition.lang = 'en-US';
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
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    if (statusText) statusText.textContent = '🗣️: ' + transcript;

    if (transcript === targetWord.toLowerCase()) {
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

// ===== سوالات درس ۱۸ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'mechanic کدام است؟',
    speak: 'mechanic',
    options: [
      { text: 'plumber', image: '../../../media/a2/jobs/plumber.png' },
      { text: 'mechanic', image: '../../../media/a2/jobs/mechanic.png' },
      { text: 'electrician', image: '../../../media/a2/jobs/electrician.png' },
      { text: 'carpenter', image: '../../../media/a2/jobs/carpenter.png' }
    ],
    answer: 'mechanic'
  },
  {
    type: 'image',
    question: 'plumber کدام است؟',
    speak: 'plumber',
    options: [
      { text: 'carpenter', image: '../../../media/a2/jobs/carpenter.png' },
      { text: 'plumber', image: '../../../media/a2/jobs/plumber.png' },
      { text: 'mason', image: '../../../media/a2/jobs/mason.png' },
      { text: 'mechanic', image: '../../../media/a2/jobs/mechanic.png' }
    ],
    answer: 'plumber'
  },
  {
    type: 'image',
    question: 'electrician کدام است؟',
    speak: 'electrician',
    options: [
      { text: 'mechanic', image: '../../../media/a2/jobs/mechanic.png' },
      { text: 'electrician', image: '../../../media/a2/jobs/electrician.png' },
      { text: 'mason', image: '../../../media/a2/jobs/mason.png' },
      { text: 'plumber', image: '../../../media/a2/jobs/plumber.png' }
    ],
    answer: 'electrician'
  },
  {
    type: 'image',
    question: 'carpenter کدام است؟',
    speak: 'carpenter',
    options: [
      { text: 'carpenter', image: '../../../media/a2/jobs/carpenter.png' },
      { text: 'plumber', image: '../../../media/a2/jobs/plumber.png' },
      { text: 'mechanic', image: '../../../media/a2/jobs/mechanic.png' },
      { text: 'electrician', image: '../../../media/a2/jobs/electrician.png' }
    ],
    answer: 'carpenter'
  },
  {
    type: 'image',
    question: 'mason کدام است؟',
    speak: 'mason',
    options: [
      { text: 'electrician', image: '../../../media/a2/jobs/electrician.png' },
      { text: 'mechanic', image: '../../../media/a2/jobs/mechanic.png' },
      { text: 'mason', image: '../../../media/a2/jobs/mason.png' },
      { text: 'plumber', image: '../../../media/a2/jobs/plumber.png' }
    ],
    answer: 'mason'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/mechanic.png',
    options: ['plumber', 'mechanic', 'electrician', 'carpenter'],
    answer: 'mechanic'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/plumber.png',
    options: ['carpenter', 'plumber', 'mason', 'mechanic'],
    answer: 'plumber'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/electrician.png',
    options: ['mechanic', 'electrician', 'mason', 'plumber'],
    answer: 'electrician'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/carpenter.png',
    options: ['carpenter', 'plumber', 'mechanic', 'electrician'],
    answer: 'carpenter'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/mason.png',
    options: ['electrician', 'mechanic', 'mason', 'plumber'],
    answer: 'mason'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'mechanic',
    question: 'کدام کلمه را شنیدی؟',
    options: ['mechanic', 'plumber', 'electrician', 'carpenter'],
    answer: 'mechanic'
  },
  {
    type: 'audio',
    speak: 'plumber',
    question: 'کدام کلمه را شنیدی؟',
    options: ['carpenter', 'plumber', 'mason', 'mechanic'],
    answer: 'plumber'
  },
  {
    type: 'audio',
    speak: 'electrician',
    question: 'کدام کلمه را شنیدی؟',
    options: ['mechanic', 'electrician', 'mason', 'plumber'],
    answer: 'electrician'
  },
  {
    type: 'audio',
    speak: 'carpenter',
    question: 'کدام کلمه را شنیدی؟',
    options: ['carpenter', 'plumber', 'mechanic', 'electrician'],
    answer: 'carpenter'
  },
  {
    type: 'audio',
    speak: 'mason',
    question: 'کدام کلمه را شنیدی؟',
    options: ['electrician', 'mechanic', 'mason', 'plumber'],
    answer: 'mason'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'mechanic',
    image: '../../../media/a2/jobs/mechanic.png',
    meaning: 'مکانیک'
  },
  {
    type: 'speak',
    word: 'plumber',
    image: '../../../media/a2/jobs/plumber.png',
    meaning: 'لوله‌کش'
  },
  {
    type: 'speak',
    word: 'electrician',
    image: '../../../media/a2/jobs/electrician.png',
    meaning: 'برق‌کار'
  },
  {
    type: 'speak',
    word: 'carpenter',
    image: '../../../media/a2/jobs/carpenter.png',
    meaning: 'نجار'
  },
  {
    type: 'speak',
    word: 'mason',
    image: '../../../media/a2/jobs/mason.png',
    meaning: 'بنّا'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'He is a mechanic',
    question: 'جمله انگلیسی را بساز:',
    text: 'او مکانیک است',
    words: ['mechanic', 'a', 'is', 'He'],
    answer: ['He', 'is', 'a', 'mechanic']
  },
  {
    type: 'build-en',
    speak: 'He is a plumber',
    question: 'جمله انگلیسی را بساز:',
    text: 'او لوله‌کش است',
    words: ['plumber', 'a', 'is', 'He'],
    answer: ['He', 'is', 'a', 'plumber']
  },
  {
    type: 'build-en',
    speak: 'He is an electrician',
    question: 'جمله انگلیسی را بساز:',
    text: 'او برق‌کار است',
    words: ['electrician', 'an', 'is', 'He'],
    answer: ['He', 'is', 'an', 'electrician']
  },
  {
    type: 'build-en',
    speak: 'He is a carpenter',
    question: 'جمله انگلیسی را بساز:',
    text: 'او نجار است',
    words: ['carpenter', 'a', 'is', 'He'],
    answer: ['He', 'is', 'a', 'carpenter']
  },
  {
    type: 'build-en',
    speak: 'He is a mason',
    question: 'جمله انگلیسی را بساز:',
    text: 'او بنّا است',
    words: ['mason', 'a', 'is', 'He'],
    answer: ['He', 'is', 'a', 'mason']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'He is a mechanic',
    question: 'ترجمه را بساز:',
    text: 'He is a mechanic',
    words: ['است', 'مکانیک', 'او'],
    answer: ['او', 'مکانیک', 'است']
  },
  {
    type: 'build-fa',
    speak: 'He is a plumber',
    question: 'ترجمه را بساز:',
    text: 'He is a plumber',
    words: ['است', 'لوله‌کش', 'او'],
    answer: ['او', 'لوله‌کش', 'است']
  },
  {
    type: 'build-fa',
    speak: 'He is an electrician',
    question: 'ترجمه را بساز:',
    text: 'He is an electrician',
    words: ['است', 'برق‌کار', 'او'],
    answer: ['او', 'برق‌کار', 'است']
  },
  {
    type: 'build-fa',
    speak: 'He is a carpenter',
    question: 'ترجمه را بساز:',
    text: 'He is a carpenter',
    words: ['است', 'نجار', 'او'],
    answer: ['او', 'نجار', 'است']
  },
  {
    type: 'build-fa',
    speak: 'He is a mason',
    question: 'ترجمه را بساز:',
    text: 'He is a mason',
    words: ['است', 'بنّا', 'او'],
    answer: ['او', 'بنّا', 'است']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>درس تمام شد 🎉</h2>
      <p>XP دریافت‌شده: <b>${finalXP}</b></p>
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
  if (String(ans).trim().toLowerCase() === String(correct).trim().toLowerCase()) {
    xp += 5;
    if (typeof addXP === 'function') {
      await addXP(5);
    }
    current++;
    showQuestion();
  } else {
    alert('اشتباه بود! دوباره تلاش کن.');
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
        <h2>قلب شما تمام شد 💔</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../index.html">بازگشت</a>
      `;
      return;
    }
  }
}

async function checkBuild(selected, correct) {
  const s = selected.map(w => w.trim().toLowerCase());
  const c = correct.map(w => w.trim().toLowerCase());

  if (JSON.stringify(s) === JSON.stringify(c)) {
    xp += 5;
    if (typeof addXP === 'function') {
      await addXP(5);
    }
    current++;
    showQuestion();
  } else {
    alert('اشتباه بود! دوباره تلاش کن.');
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
        <h2>قلب شما تمام شد 💔</h2>
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