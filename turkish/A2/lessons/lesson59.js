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

// ===== سوالات درس ۵۹ - ترکی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "indirme" است؟',
    speak: 'indirme',
    options: [
      { text: 'indirme', image: '../../../media/a2/technology/download.png' },
      { text: 'yükleme', image: '../../../media/a2/technology/upload.png' },
      { text: 'yayın', image: '../../../media/a2/technology/stream.png' },
      { text: 'video', image: '../../../media/a2/technology/video.png' }
    ],
    answer: 'indirme'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "yükleme" است؟',
    speak: 'yükleme',
    options: [
      { text: 'ses', image: '../../../media/a2/technology/audio.png' },
      { text: 'yükleme', image: '../../../media/a2/technology/upload.png' },
      { text: 'indirme', image: '../../../media/a2/technology/download.png' },
      { text: 'yayın', image: '../../../media/a2/technology/stream.png' }
    ],
    answer: 'yükleme'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "yayın" است؟',
    speak: 'yayın',
    options: [
      { text: 'indirme', image: '../../../media/a2/technology/download.png' },
      { text: 'yayın', image: '../../../media/a2/technology/stream.png' },
      { text: 'video', image: '../../../media/a2/technology/video.png' },
      { text: 'yükleme', image: '../../../media/a2/technology/upload.png' }
    ],
    answer: 'yayın'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "video" است؟',
    speak: 'video',
    options: [
      { text: 'yükleme', image: '../../../media/a2/technology/upload.png' },
      { text: 'indirme', image: '../../../media/a2/technology/download.png' },
      { text: 'yayın', image: '../../../media/a2/technology/stream.png' },
      { text: 'video', image: '../../../media/a2/technology/video.png' }
    ],
    answer: 'video'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ses" است؟',
    speak: 'ses',
    options: [
      { text: 'ses', image: '../../../media/a2/technology/audio.png' },
      { text: 'video', image: '../../../media/a2/technology/video.png' },
      { text: 'indirme', image: '../../../media/a2/technology/download.png' },
      { text: 'yükleme', image: '../../../media/a2/technology/upload.png' }
    ],
    answer: 'ses'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/download.png',
    options: ['indirme', 'yükleme', 'yayın', 'video'],
    answer: 'indirme'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/upload.png',
    options: ['indirme', 'yükleme', 'yayın', 'ses'],
    answer: 'yükleme'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/stream.png',
    options: ['ses', 'indirme', 'yayın', 'yükleme'],
    answer: 'yayın'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/video.png',
    options: ['yayın', 'yükleme', 'video', 'indirme'],
    answer: 'video'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/technology/audio.png',
    options: ['indirme', 'video', 'yükleme', 'ses'],
    answer: 'ses'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'indirme',
    question: 'کدام کلمه را شنیدی؟',
    options: ['indirme', 'yükleme', 'yayın', 'video'],
    answer: 'indirme'
  },
  {
    type: 'audio',
    speak: 'yükleme',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ses', 'yükleme', 'indirme', 'yayın'],
    answer: 'yükleme'
  },
  {
    type: 'audio',
    speak: 'yayın',
    question: 'کدام کلمه را شنیدی؟',
    options: ['indirme', 'yayın', 'video', 'yükleme'],
    answer: 'yayın'
  },
  {
    type: 'audio',
    speak: 'video',
    question: 'کدام کلمه را شنیدی؟',
    options: ['yükleme', 'indirme', 'yayın', 'video'],
    answer: 'video'
  },
  {
    type: 'audio',
    speak: 'ses',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ses', 'video', 'indirme', 'yükleme'],
    answer: 'ses'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'indirme',
    image: '../../../media/a2/technology/download.png',
    meaning: 'دانلود'
  },
  {
    type: 'speak',
    word: 'yükleme',
    image: '../../../media/a2/technology/upload.png',
    meaning: 'آپلود'
  },
  {
    type: 'speak',
    word: 'yayın',
    image: '../../../media/a2/technology/stream.png',
    meaning: 'پخش/استریم'
  },
  {
    type: 'speak',
    word: 'video',
    image: '../../../media/a2/technology/video.png',
    meaning: 'ویدئو'
  },
  {
    type: 'speak',
    word: 'ses',
    image: '../../../media/a2/technology/audio.png',
    meaning: 'صدا/صوتی'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ترکی) =====
  {
    type: 'build-it',
    speak: 'Dosya indiriyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من فایل دانلود می‌کنم',
    words: ['indiriyorum', 'Dosya'],
    answer: ['Dosya', 'indiriyorum']
  },
  {
    type: 'build-it',
    speak: 'Fotoğraf yüklüyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من عکس آپلود می‌کنم',
    words: ['yüklüyorum', 'Fotoğraf'],
    answer: ['Fotoğraf', 'yüklüyorum']
  },
  {
    type: 'build-it',
    speak: 'Yayını izliyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من پخش را تماشا می‌کنم',
    words: ['izliyorum', 'Yayını'],
    answer: ['Yayını', 'izliyorum']
  },
  {
    type: 'build-it',
    speak: 'Video çekiyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من ویدئو ضبط می‌کنم',
    words: ['çekiyorum', 'Video'],
    answer: ['Video', 'çekiyorum']
  },
  {
    type: 'build-it',
    speak: 'Ses kaydediyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من صدا ضبط می‌کنم',
    words: ['kaydediyorum', 'Ses'],
    answer: ['Ses', 'kaydediyorum']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Dosya indiriyorum',
    question: 'ترجمه را بساز:',
    text: 'Dosya indiriyorum',
    words: ['من', 'دانلود می‌کنم', 'فایل'],
    answer: ['من', 'فایل', 'دانلود می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Fotoğraf yüklüyorum',
    question: 'ترجمه را بساز:',
    text: 'Fotoğraf yüklüyorum',
    words: ['من', 'آپلود می‌کنم', 'عکس'],
    answer: ['من', 'عکس', 'آپلود می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Yayını izliyorum',
    question: 'ترجمه را بساز:',
    text: 'Yayını izliyorum',
    words: ['من', 'تماشا می‌کنم', 'پخش را'],
    answer: ['من', 'پخش را', 'تماشا می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Video çekiyorum',
    question: 'ترجمه را بساز:',
    text: 'Video çekiyorum',
    words: ['من', 'ضبط می‌کنم', 'ویدئو'],
    answer: ['من', 'ویدئو', 'ضبط می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Ses kaydediyorum',
    question: 'ترجمه را بساز:',
    text: 'Ses kaydediyorum',
    words: ['من', 'ضبط می‌کنم', 'صدا'],
    answer: ['من', 'صدا', 'ضبط می‌کنم']
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