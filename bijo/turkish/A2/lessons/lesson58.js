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

// ===== سوالات درس ۵۸ - ترکی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "yazılım" است؟',
    speak: 'yazılım',
    options: [
      { text: 'yazılım', image: '../../../media/a2/technology/software.png' },
      { text: 'donanım', image: '../../../media/a2/technology/hardware.png' },
      { text: 'güncelleme', image: '../../../media/a2/technology/update.png' },
      { text: 'şifre', image: '../../../media/a2/technology/password.png' }
    ],
    answer: 'yazılım'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "donanım" است؟',
    speak: 'donanım',
    options: [
      { text: 'hesap', image: '../../../media/a2/technology/account.png' },
      { text: 'donanım', image: '../../../media/a2/technology/hardware.png' },
      { text: 'yazılım', image: '../../../media/a2/technology/software.png' },
      { text: 'güncelleme', image: '../../../media/a2/technology/update.png' }
    ],
    answer: 'donanım'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "güncelleme" است؟',
    speak: 'güncelleme',
    options: [
      { text: 'yazılım', image: '../../../media/a2/technology/software.png' },
      { text: 'güncelleme', image: '../../../media/a2/technology/update.png' },
      { text: 'şifre', image: '../../../media/a2/technology/password.png' },
      { text: 'donanım', image: '../../../media/a2/technology/hardware.png' }
    ],
    answer: 'güncelleme'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "şifre" است؟',
    speak: 'şifre',
    options: [
      { text: 'donanım', image: '../../../media/a2/technology/hardware.png' },
      { text: 'yazılım', image: '../../../media/a2/technology/software.png' },
      { text: 'güncelleme', image: '../../../media/a2/technology/update.png' },
      { text: 'şifre', image: '../../../media/a2/technology/password.png' }
    ],
    answer: 'şifre'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "hesap" است؟',
    speak: 'hesap',
    options: [
      { text: 'hesap', image: '../../../media/a2/technology/account.png' },
      { text: 'şifre', image: '../../../media/a2/technology/password.png' },
      { text: 'yazılım', image: '../../../media/a2/technology/software.png' },
      { text: 'donanım', image: '../../../media/a2/technology/hardware.png' }
    ],
    answer: 'hesap'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/software.png',
    options: ['yazılım', 'donanım', 'güncelleme', 'şifre'],
    answer: 'yazılım'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/hardware.png',
    options: ['yazılım', 'donanım', 'güncelleme', 'hesap'],
    answer: 'donanım'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/update.png',
    options: ['hesap', 'yazılım', 'güncelleme', 'donanım'],
    answer: 'güncelleme'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/password.png',
    options: ['güncelleme', 'donanım', 'şifre', 'yazılım'],
    answer: 'şifre'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/account.png',
    options: ['yazılım', 'şifre', 'donanım', 'hesap'],
    answer: 'hesap'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'yazılım',
    question: 'کدام کلمه را شنیدی؟',
    options: ['yazılım', 'donanım', 'güncelleme', 'şifre'],
    answer: 'yazılım'
  },
  {
    type: 'audio',
    speak: 'donanım',
    question: 'کدام کلمه را شنیدی؟',
    options: ['hesap', 'donanım', 'yazılım', 'güncelleme'],
    answer: 'donanım'
  },
  {
    type: 'audio',
    speak: 'güncelleme',
    question: 'کدام کلمه را شنیدی؟',
    options: ['yazılım', 'güncelleme', 'şifre', 'donanım'],
    answer: 'güncelleme'
  },
  {
    type: 'audio',
    speak: 'şifre',
    question: 'کدام کلمه را شنیدی؟',
    options: ['donanım', 'yazılım', 'güncelleme', 'şifre'],
    answer: 'şifre'
  },
  {
    type: 'audio',
    speak: 'hesap',
    question: 'کدام کلمه را شنیدی؟',
    options: ['hesap', 'şifre', 'yazılım', 'donanım'],
    answer: 'hesap'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'yazılım',
    image: '../../../media/a2/technology/software.png',
    meaning: 'نرم‌افزار'
  },
  {
    type: 'speak',
    word: 'donanım',
    image: '../../../media/a2/technology/hardware.png',
    meaning: 'سخت‌افزار'
  },
  {
    type: 'speak',
    word: 'güncelleme',
    image: '../../../media/a2/technology/update.png',
    meaning: 'بروزرسانی'
  },
  {
    type: 'speak',
    word: 'şifre',
    image: '../../../media/a2/technology/password.png',
    meaning: 'رمز عبور'
  },
  {
    type: 'speak',
    word: 'hesap',
    image: '../../../media/a2/technology/account.png',
    meaning: 'حساب کاربری'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ترکی) =====
  {
    type: 'build-it',
    speak: 'Yazılım yüklüyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من نرم‌افزار نصب می‌کنم',
    words: ['yüklüyorum', 'Yazılım'],
    answer: ['Yazılım', 'yüklüyorum']
  },
  {
    type: 'build-it',
    speak: 'Donanım alıyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من سخت‌افزار می‌خرم',
    words: ['alıyorum', 'Donanım'],
    answer: ['Donanım', 'alıyorum']
  },
  {
    type: 'build-it',
    speak: 'Güncelleme yapıyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من بروزرسانی انجام می‌دهم',
    words: ['yapıyorum', 'Güncelleme'],
    answer: ['Güncelleme', 'yapıyorum']
  },
  {
    type: 'build-it',
    speak: 'Şifremi unuttum',
    question: 'جمله ترکی را بساز:',
    text: 'رمز عبورم را فراموش کردم',
    words: ['unuttum', 'Şifremi'],
    answer: ['Şifremi', 'unuttum']
  },
  {
    type: 'build-it',
    speak: 'Hesabım var',
    question: 'جمله ترکی را بساز:',
    text: 'من حساب کاربری دارم',
    words: ['var', 'Hesabım'],
    answer: ['Hesabım', 'var']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Yazılım yüklüyorum',
    question: 'ترجمه را بساز:',
    text: 'Yazılım yüklüyorum',
    words: ['من', 'نصب می‌کنم', 'نرم‌افزار'],
    answer: ['من', 'نرم‌افزار', 'نصب می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Donanım alıyorum',
    question: 'ترجمه را بساز:',
    text: 'Donanım alıyorum',
    words: ['من', 'می‌خرم', 'سخت‌افزار'],
    answer: ['من', 'سخت‌افزار', 'می‌خرم']
  },
  {
    type: 'build-fa',
    speak: 'Güncelleme yapıyorum',
    question: 'ترجمه را بساز:',
    text: 'Güncelleme yapıyorum',
    words: ['من', 'انجام می‌دهم', 'بروزرسانی'],
    answer: ['من', 'بروزرسانی', 'انجام می‌دهم']
  },
  {
    type: 'build-fa',
    speak: 'Şifremi unuttum',
    question: 'ترجمه را بساز:',
    text: 'Şifremi unuttum',
    words: ['من', 'فراموش کردم', 'رمز عبورم را'],
    answer: ['من', 'رمز عبورم را', 'فراموش کردم']
  },
  {
    type: 'build-fa',
    speak: 'Hesabım var',
    question: 'ترجمه را بساز:',
    text: 'Hesabım var',
    words: ['من', 'دارم', 'حساب کاربری'],
    answer: ['من', 'حساب کاربری', 'دارم']
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