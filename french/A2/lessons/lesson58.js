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

// ===== سوالات درس ۵۸ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "le logiciel" است؟',
    speak: 'le logiciel',
    options: [
      { text: 'le logiciel', image: '../../../media/a2/tech/software.png' },
      { text: 'le matériel', image: '../../../media/a2/tech/hardware.png' },
      { text: 'la mise à jour', image: '../../../media/a2/tech/update.png' },
      { text: 'le mot de passe', image: '../../../media/a2/tech/password.png' }
    ],
    answer: 'le logiciel'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le matériel" است؟',
    speak: 'le matériel',
    options: [
      { text: 'le logiciel', image: '../../../media/a2/tech/software.png' },
      { text: 'le matériel', image: '../../../media/a2/tech/hardware.png' },
      { text: 'le compte', image: '../../../media/a2/tech/account.png' },
      { text: 'la mise à jour', image: '../../../media/a2/tech/update.png' }
    ],
    answer: 'le matériel'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la mise à jour" است؟',
    speak: 'la mise à jour',
    options: [
      { text: 'le mot de passe', image: '../../../media/a2/tech/password.png' },
      { text: 'le logiciel', image: '../../../media/a2/tech/software.png' },
      { text: 'la mise à jour', image: '../../../media/a2/tech/update.png' },
      { text: 'le matériel', image: '../../../media/a2/tech/hardware.png' }
    ],
    answer: 'la mise à jour'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le mot de passe" است؟',
    speak: 'le mot de passe',
    options: [
      { text: 'le matériel', image: '../../../media/a2/tech/hardware.png' },
      { text: 'le mot de passe', image: '../../../media/a2/tech/password.png' },
      { text: 'le compte', image: '../../../media/a2/tech/account.png' },
      { text: 'le logiciel', image: '../../../media/a2/tech/software.png' }
    ],
    answer: 'le mot de passe'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le compte" است؟',
    speak: 'le compte',
    options: [
      { text: 'le logiciel', image: '../../../media/a2/tech/software.png' },
      { text: 'la mise à jour', image: '../../../media/a2/tech/update.png' },
      { text: 'le compte', image: '../../../media/a2/tech/account.png' },
      { text: 'le mot de passe', image: '../../../media/a2/tech/password.png' }
    ],
    answer: 'le compte'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/software.png',
    options: ['le logiciel', 'le matériel', 'la mise à jour', 'le mot de passe'],
    answer: 'le logiciel'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/hardware.png',
    options: ['le logiciel', 'le matériel', 'le compte', 'la mise à jour'],
    answer: 'le matériel'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/update.png',
    options: ['le mot de passe', 'le logiciel', 'la mise à jour', 'le matériel'],
    answer: 'la mise à jour'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/password.png',
    options: ['le matériel', 'le mot de passe', 'le compte', 'le logiciel'],
    answer: 'le mot de passe'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/account.png',
    options: ['le logiciel', 'la mise à jour', 'le compte', 'le mot de passe'],
    answer: 'le compte'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'le logiciel',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le logiciel', 'le matériel', 'la mise à jour', 'le mot de passe'],
    answer: 'le logiciel'
  },
  {
    type: 'audio',
    speak: 'le matériel',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le logiciel', 'le matériel', 'le compte', 'la mise à jour'],
    answer: 'le matériel'
  },
  {
    type: 'audio',
    speak: 'la mise à jour',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le mot de passe', 'le logiciel', 'la mise à jour', 'le matériel'],
    answer: 'la mise à jour'
  },
  {
    type: 'audio',
    speak: 'le mot de passe',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le matériel', 'le mot de passe', 'le compte', 'le logiciel'],
    answer: 'le mot de passe'
  },
  {
    type: 'audio',
    speak: 'le compte',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le logiciel', 'la mise à jour', 'le compte', 'le mot de passe'],
    answer: 'le compte'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'le logiciel',
    image: '../../../media/a2/tech/software.png',
    meaning: 'نرم‌افزار'
  },
  {
    type: 'speak',
    word: 'le matériel',
    image: '../../../media/a2/tech/hardware.png',
    meaning: 'سخت‌افزار'
  },
  {
    type: 'speak',
    word: 'la mise à jour',
    image: '../../../media/a2/tech/update.png',
    meaning: 'به‌روزرسانی'
  },
  {
    type: 'speak',
    word: 'le mot de passe',
    image: '../../../media/a2/tech/password.png',
    meaning: 'رمز عبور'
  },
  {
    type: 'speak',
    word: 'le compte',
    image: '../../../media/a2/tech/account.png',
    meaning: 'حساب کاربری'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'J\'ai un logiciel',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک نرم‌افزار دارم',
    words: ['logiciel', 'un', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'un', 'logiciel']
  },
  {
    type: 'build-en',
    speak: 'J\'ai du matériel',
    question: 'جمله فرانسوی را بساز:',
    text: 'من سخت‌افزار دارم',
    words: ['matériel', 'du', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'du', 'matériel']
  },
  {
    type: 'build-en',
    speak: 'Je fais une mise à jour',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک به‌روزرسانی انجام می‌دهم',
    words: ['jour', 'à', 'mise', 'une', 'fais', 'Je'],
    answer: ['Je', 'fais', 'une', 'mise', 'à', 'jour']
  },
  {
    type: 'build-en',
    speak: 'J\'ai un mot de passe',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک رمز عبور دارم',
    words: ['passe', 'de', 'mot', 'un', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'un', 'mot', 'de', 'passe']
  },
  {
    type: 'build-en',
    speak: 'J\'ai un compte',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک حساب کاربری دارم',
    words: ['compte', 'un', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'un', 'compte']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'J\'ai un logiciel',
    question: 'ترجمه را بساز:',
    text: 'J\'ai un logiciel',
    words: ['دارم', 'نرم‌افزار', 'یک', 'من'],
    answer: ['من', 'یک', 'نرم‌افزار', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai du matériel',
    question: 'ترجمه را بساز:',
    text: 'J\'ai du matériel',
    words: ['دارم', 'سخت‌افزار', 'من'],
    answer: ['من', 'سخت‌افزار', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'Je fais une mise à jour',
    question: 'ترجمه را بساز:',
    text: 'Je fais une mise à jour',
    words: ['می‌کنم', 'به‌روزرسانی', 'یک', 'انجام', 'من'],
    answer: ['من', 'یک', 'به‌روزرسانی', 'انجام', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai un mot de passe',
    question: 'ترجمه را بساز:',
    text: 'J\'ai un mot de passe',
    words: ['دارم', 'رمز عبور', 'یک', 'من'],
    answer: ['من', 'یک', 'رمز عبور', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai un compte',
    question: 'ترجمه را بساز:',
    text: 'J\'ai un compte',
    words: ['دارم', 'حساب کاربری', 'یک', 'من'],
    answer: ['من', 'یک', 'حساب کاربری', 'دارم']
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