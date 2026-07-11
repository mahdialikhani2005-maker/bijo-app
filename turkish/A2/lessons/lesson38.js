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

// ===== سوالات درس ۳۸ - ترکی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "plaj" است؟',
    speak: 'plaj',
    options: [
      { text: 'plaj', image: '../../../media/a2/nature/beach.png' },
      { text: 'kıyı', image: '../../../media/a2/nature/coast.png' },
      { text: 'dalga', image: '../../../media/a2/nature/wave.png' },
      { text: 'uçurum', image: '../../../media/a2/nature/cliff.png' }
    ],
    answer: 'plaj'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "kıyı" است؟',
    speak: 'kıyı',
    options: [
      { text: 'gelgit', image: '../../../media/a2/nature/tide.png' },
      { text: 'kıyı', image: '../../../media/a2/nature/coast.png' },
      { text: 'plaj', image: '../../../media/a2/nature/beach.png' },
      { text: 'dalga', image: '../../../media/a2/nature/wave.png' }
    ],
    answer: 'kıyı'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "dalga" است؟',
    speak: 'dalga',
    options: [
      { text: 'plaj', image: '../../../media/a2/nature/beach.png' },
      { text: 'dalga', image: '../../../media/a2/nature/wave.png' },
      { text: 'uçurum', image: '../../../media/a2/nature/cliff.png' },
      { text: 'kıyı', image: '../../../media/a2/nature/coast.png' }
    ],
    answer: 'dalga'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "gelgit" است؟',
    speak: 'gelgit',
    options: [
      { text: 'kıyı', image: '../../../media/a2/nature/coast.png' },
      { text: 'plaj', image: '../../../media/a2/nature/beach.png' },
      { text: 'dalga', image: '../../../media/a2/nature/wave.png' },
      { text: 'gelgit', image: '../../../media/a2/nature/tide.png' }
    ],
    answer: 'gelgit'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "uçurum" است؟',
    speak: 'uçurum',
    options: [
      { text: 'uçurum', image: '../../../media/a2/nature/cliff.png' },
      { text: 'gelgit', image: '../../../media/a2/nature/tide.png' },
      { text: 'plaj', image: '../../../media/a2/nature/beach.png' },
      { text: 'kıyı', image: '../../../media/a2/nature/coast.png' }
    ],
    answer: 'uçurum'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/beach.png',
    options: ['plaj', 'kıyı', 'dalga', 'uçurum'],
    answer: 'plaj'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/coast.png',
    options: ['plaj', 'kıyı', 'dalga', 'gelgit'],
    answer: 'kıyı'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/wave.png',
    options: ['gelgit', 'plaj', 'dalga', 'kıyı'],
    answer: 'dalga'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/tide.png',
    options: ['dalga', 'kıyı', 'gelgit', 'plaj'],
    answer: 'gelgit'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/cliff.png',
    options: ['plaj', 'gelgit', 'kıyı', 'uçurum'],
    answer: 'uçurum'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'plaj',
    question: 'کدام کلمه را شنیدی؟',
    options: ['plaj', 'kıyı', 'dalga', 'uçurum'],
    answer: 'plaj'
  },
  {
    type: 'audio',
    speak: 'kıyı',
    question: 'کدام کلمه را شنیدی؟',
    options: ['gelgit', 'kıyı', 'plaj', 'dalga'],
    answer: 'kıyı'
  },
  {
    type: 'audio',
    speak: 'dalga',
    question: 'کدام کلمه را شنیدی؟',
    options: ['plaj', 'dalga', 'uçurum', 'kıyı'],
    answer: 'dalga'
  },
  {
    type: 'audio',
    speak: 'gelgit',
    question: 'کدام کلمه را شنیدی؟',
    options: ['kıyı', 'plaj', 'dalga', 'gelgit'],
    answer: 'gelgit'
  },
  {
    type: 'audio',
    speak: 'uçurum',
    question: 'کدام کلمه را شنیدی؟',
    options: ['uçurum', 'gelgit', 'plaj', 'kıyı'],
    answer: 'uçurum'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'plaj',
    image: '../../../media/a2/nature/beach.png',
    meaning: 'ساحل (شنی)'
  },
  {
    type: 'speak',
    word: 'kıyı',
    image: '../../../media/a2/nature/coast.png',
    meaning: 'خط ساحلی'
  },
  {
    type: 'speak',
    word: 'dalga',
    image: '../../../media/a2/nature/wave.png',
    meaning: 'موج'
  },
  {
    type: 'speak',
    word: 'gelgit',
    image: '../../../media/a2/nature/tide.png',
    meaning: 'جزر و مد'
  },
  {
    type: 'speak',
    word: 'uçurum',
    image: '../../../media/a2/nature/cliff.png',
    meaning: 'صخره/پرتگاه'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ترکی) =====
  {
    type: 'build-it',
    speak: 'Plajda yüzüyoruz',
    question: 'جمله ترکی را بساز:',
    text: 'ما در ساحل شنا می‌کنیم',
    words: ['yüzüyoruz', 'Plajda'],
    answer: ['Plajda', 'yüzüyoruz']
  },
  {
    type: 'build-it',
    speak: 'Kıyıda yürüyoruz',
    question: 'جمله ترکی را بساز:',
    text: 'ما در خط ساحلی قدم می‌زنیم',
    words: ['yürüyoruz', 'Kıyıda'],
    answer: ['Kıyıda', 'yürüyoruz']
  },
  {
    type: 'build-it',
    speak: 'Dalgalar büyük',
    question: 'جمله ترکی را بساز:',
    text: 'امواج بزرگ هستند',
    words: ['büyük', 'Dalgalar'],
    answer: ['Dalgalar', 'büyük']
  },
  {
    type: 'build-it',
    speak: 'Gelgit başlıyor',
    question: 'جمله ترکی را بساز:',
    text: 'جزر و مد شروع می‌شود',
    words: ['başlıyor', 'Gelgit'],
    answer: ['Gelgit', 'başlıyor']
  },
  {
    type: 'build-it',
    speak: 'Uçurumdan bakıyoruz',
    question: 'جمله ترکی را بساز:',
    text: 'ما از صخره نگاه می‌کنیم',
    words: ['bakıyoruz', 'Uçurumdan'],
    answer: ['Uçurumdan', 'bakıyoruz']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Plajda yüzüyoruz',
    question: 'ترجمه را بساز:',
    text: 'Plajda yüzüyoruz',
    words: ['ما', 'شنا می‌کنیم', 'در ساحل'],
    answer: ['ما', 'در ساحل', 'شنا می‌کنیم']
  },
  {
    type: 'build-fa',
    speak: 'Kıyıda yürüyoruz',
    question: 'ترجمه را بساز:',
    text: 'Kıyıda yürüyoruz',
    words: ['ما', 'قدم می‌زنیم', 'در خط ساحلی'],
    answer: ['ما', 'در خط ساحلی', 'قدم می‌زنیم']
  },
  {
    type: 'build-fa',
    speak: 'Dalgalar büyük',
    question: 'ترجمه را بساز:',
    text: 'Dalgalar büyük',
    words: ['بزرگ', 'هستند', 'امواج'],
    answer: ['امواج', 'بزرگ', 'هستند']
  },
  {
    type: 'build-fa',
    speak: 'Gelgit başlıyor',
    question: 'ترجمه را بساز:',
    text: 'Gelgit başlıyor',
    words: ['شروع می‌شود', 'جزر و مد'],
    answer: ['جزر و مد', 'شروع می‌شود']
  },
  {
    type: 'build-fa',
    speak: 'Uçurumdan bakıyoruz',
    question: 'ترجمه را بساز:',
    text: 'Uçurumdan bakıyoruz',
    words: ['ما', 'نگاه می‌کنیم', 'از صخره'],
    answer: ['ما', 'از صخره', 'نگاه می‌کنیم']
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