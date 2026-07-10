let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru";
  utter.rate = 0.9;

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

window.onload = function() {
  if (typeof checkAndRegenHearts === 'function') {
  checkAndRegenHearts();
}

    if (typeof getHearts === 'function') {
        const currentHearts = getHearts();
        const heartElement = document.getElementById("heart-count");
        if (heartElement) {
            heartElement.textContent = currentHearts;
        }
        
        // اگر قلب کاربر 0 بود، اجازه شروع درس را نده (اختیاری)
        if (currentHearts <= 0) {
            alert("قلب شما تمام شده است! لطفاً منتظر بمانید یا قلب تهیه کنید.");
            window.location.href = "../home.html";
        }
    }
};



const questions = [

/* IMAGE */

{
type:"image",
question:"какой из них сегодня ?",
speak:"сегодня",
options:[
{text:"завтра",image:"../../media/time/tomorrow.png"},
{text:"сегодня",image:"../../media/time/today.png"},
{text:"вчера",image:"../../media/time/yesterday.png"},
{text:"утро",image:"../../media/time/morning.png"}
],
answer:"сегодня"
},

{
type:"image",
question:"какой из них завтра ?",
speak:"завтра",
options:[
{text:"ночь",image:"../../media/time/night.png"},
{text:"завтра",image:"../../media/time/tomorrow.png"},
{text:"сегодня",image:"../../media/time/today.png"},
{text:"вчера",image:"../../media/time/yesterday.png"}
],
answer:"завтра"
},

{
type:"image",
question:"какой из них вчера ?",
speak:"вчера",
options:[
{text:"сегодня",image:"../../media/time/today.png"},
{text:"вчера",image:"../../media/time/yesterday.png"},
{text:"ночь",image:"../../media/time/night.png"},
{text:"завтра",image:"../../media/time/tomorrow.png"}
],
answer:"вчера"
},

{
type:"image",
question:"какой из них утро ?",
speak:"утро",
options:[
{text:"вчера",image:"../../media/time/yesterday.png"},
{text:"завтра",image:"../../media/time/tomorrow.png"},
{text:"утро",image:"../../media/time/morning.png"},
{text:"сегодня",image:"../../media/time/today.png"}
],
answer:"утро"
},

{
type:"image",
question:"какой из них ночь ?",
speak:"ночь",
options:[
{text:"утро",image:"../../media/time/morning.png"},
{text:"сегодня",image:"../../media/time/today.png"},
{text:"завтра",image:"../../media/time/tomorrow.png"},
{text:"ночь",image:"../../media/time/night.png"}
],
answer:"ночь"
},

/* WORD */

{
type:"word",
question:"Что это за изображение?",
image:"../../media/time/today.png",
options:["завтра","сегодня","вчера","утро"],
answer:"сегодня"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/time/tomorrow.png",
options:["ночь","завтра","сегодня","вчера"],
answer:"завтра"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/time/yesterday.png",
options:["сегодня","вчера","ночь","завтра"],
answer:"вчера"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/time/morning.png",
options:["вчера","завтра","утро","сегодня"],
answer:"утро"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/time/night.png",
options:["утро","сегодня","завтра","ночь"],
answer:"ночь"
},

/* AUDIO */

{
type:"audio",
speak:"сегодня",
question:"Какое слово ты услышал?",
options:["завтра","сегодня","вчера","утро"],
answer:"сегодня"
},

{
type:"audio",
speak:"завтра",
question:"Какое слово ты услышал?",
options:["ночь","завтра","сегодня","вчера"],
answer:"завтра"
},

{
type:"audio",
speak:"вчера",
question:"Какое слово ты услышал?",
options:["сегодня","вчера","ночь","завтра"],
answer:"вчера"
},

{
type:"audio",
speak:"утро",
question:"Какое слово ты услышал?",
options:["вчера","завтра","утро","сегодня"],
answer:"утро"
},

{
type:"audio",
speak:"ночь",
question:"Какое слово ты услышал?",
options:["утро","сегодня","завтра","ночь"],
answer:"ночь"
},

/* BUILD RU */

{
type:"build-ru",
speak:"Сегодня понедельник",
question:"Составьте русское предложение:",
text:"امروز دوشنبه است",
words:["Сегодня","понедельник"],
answer:["Сегодня","понедельник"]
},

{
type:"build-ru",
speak:"Завтра вторник",
question:"Составьте русское предложение:",
text:"فردا سه‌شنبه است",
words:["Завтра","вторник"],
answer:["Завтра","вторник"]
},

{
type:"build-ru",
speak:"Вчера было воскресенье",
question:"Составьте русское предложение:",
text:"دیروز یک‌شنبه بود",
words:["Вчера","было","воскресенье"],
answer:["Вчера","было","воскресенье"]
},

{
type:"build-ru",
speak:"Доброе утро",
question:"Составьте русское предложение:",
text:"صبح بخیر",
words:["Доброе","утро"],
answer:["Доброе","утро"]
},

{
type:"build-ru",
speak:"Спокойной ночи",
question:"Составьте русское предложение:",
text:"شب بخیر",
words:["Спокойной","ночи"],
answer:["Спокойной","ночи"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Сегодня понедельник",
question:"ترجمه را بساز:",
text:"Сегодня понедельник",
words:["است","دوشنبه","امروز"],
answer:["امروز","دوشنبه","است"]
},

{
type:"build-fa",
speak:"Завтра вторник",
question:"ترجمه را بساز:",
text:"Завтра вторник",
words:["است","سه‌شنبه","فردا"],
answer:["فردا","سه‌شنبه","است"]
},

{
type:"build-fa",
speak:"Вчера было воскресенье",
question:"ترجمه را بساز:",
text:"Вчера было воскресенье",
words:["بود","یک‌شنبه","دیروز"],
answer:["دیروز","یک‌شنبه","بود"]
},

{
type:"build-fa",
speak:"Доброе утро",
question:"ترجمه را بساز:",
text:"Доброе утро",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"Спокойной ночи",
question:"ترجمه را بساز:",
text:"Спокойной ночи",
words:["بخیر","شب"],
answer:["شب","بخیر"]
}

];



// =====================================
// نمایش سوال
// =====================================
    // اضافه کردن XP کسب شده به دیتابیس پروفایل در پایان درس


    function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === "function" ? getTotalXP() : xp;

    document.getElementById("app").innerHTML = `
      <h2>درس تمام شد 🎉</h2>
      <p>XP دریافت‌شده: <b>${finalXP}</b></p>
      <a href="../index.html">بازگشت</a>
    `;
    return;
  }


  const q = questions[current];
  if (q.speak) {
  setTimeout(() => {
    speak(q.speak);
  }, 200);
}

  const title = document.getElementById("question-title");
  const content = document.getElementById("question-content");
  const optionsBox = document.getElementById("options");
  const wordBuilder = document.getElementById("word-builder");

  title.innerText = q.question;
  content.innerHTML = "";
  optionsBox.innerHTML = "";
  wordBuilder.innerHTML = "";
wordBuilder.classList.add("hidden");

  // IMAGE SELECTION
  // IMAGE SELECTION
if (q.type === "image") {
  optionsBox.classList.add("image-grid");

 shuffleArray(q.options).forEach(opt => {

    let btn = document.createElement("button");
    btn.className = "option image-option";
    btn.innerHTML = `
      <img src="${opt.image}" alt="${opt.text}">
    `;
    btn.onclick = () => select(opt.text);
    optionsBox.appendChild(btn);
  });
}


  // WORD FROM IMAGE
  if (q.type === "word") {
    content.innerHTML = `<img src="${q.image}">`;
shuffleArray(q.options).forEach(opt => {

      let b = document.createElement("button");
      b.className = "option";
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
  }

  // AUDIO
  if (q.type === "audio") {
    content.innerHTML = `<button class="audio-btn" onclick="speak('${q.speak}')">🔊 پخش</button>`;

shuffleArray(q.options).forEach(opt => {
      let b = document.createElement("button");
      b.className = "option";
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
  }

  // BUILD ENGLISH
    // BUILD ENGLISH / FA

  else if (q.type === "build-en" || q.type === "build-fa") {
  content.innerHTML = `<p>${q.text}</p>`;

  const wordBuilder = document.getElementById("word-builder");
  const optionsBox = document.getElementById("options");
  if (!wordBuilder || !optionsBox) return;

  // پاک کردن محتوای قبلی
  wordBuilder.innerHTML = "";
  optionsBox.innerHTML = "";
 wordBuilder.classList.remove("hidden");
  // تنظیم جهت
  wordBuilder.classList.remove("ltr", "rtl");
  optionsBox.classList.remove("ltr", "rtl");

  if (q.type === "build-en") {
    wordBuilder.classList.add("ltr");
    optionsBox.classList.add("ltr");
  } else {
    wordBuilder.classList.add("rtl");
    optionsBox.classList.add("rtl");
  }

shuffleArray(q.words).forEach(w => {

    const tile = document.createElement("span");
    tile.className = "tile";
    tile.innerText = w;
    tile.dataset.word = w;

    // کلیک اول: انتقال از options به word-builder
    tile.onclick = () => {
  // اگر کارت در گزینه‌هاست → بفرستش داخل builder
  if (tile.parentNode === optionsBox) {
    wordBuilder.appendChild(tile);

  // اگر کارت داخل builder بود → برگردونش به گزینه‌ها
  } else if (tile.parentNode === wordBuilder) {
    optionsBox.appendChild(tile);
  }

  // بررسی کامل بودن جواب
  const userWords = [...wordBuilder.children].map(el => el.dataset.word);
  if (userWords.length === q.answer.length) {
    checkBuild(userWords, q.answer);
  }
};


    optionsBox.appendChild(tile);
  });
}

async function checkBuild(selected, correct) {
  const s = selected.map(w => w.trim().toLowerCase());
  const c = correct.map(w => w.trim().toLowerCase());

  if (JSON.stringify(s) === JSON.stringify(c)) {
    xp += 5;

    if (typeof addXP === "function") {
      await addXP(5);
    }

    current++;
    showQuestion();
  } else {
    alert("اشتباه بود! دوباره تلاش کن.");

    if (typeof loseHeart === "function") {
      await loseHeart();
    }

    if (typeof checkAndRegenHearts === "function") {
      checkAndRegenHearts();
    }

    const heartElement = document.getElementById("heart-count");
    if (heartElement && typeof getHearts === "function") {
      heartElement.textContent = getHearts();
    }

    if (typeof getHearts === "function" && getHearts() <= 0) {
      document.getElementById("app").innerHTML = `
        <h2>قلب شما تمام شد 💔</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../home.html">بازگشت</a>
      `;
      return;
    }
  }
}


async function select(ans) {
  const correct = questions[current].answer;

  if (String(ans).trim().toLowerCase() === String(correct).trim().toLowerCase()) {
    xp += 5;

    if (typeof addXP === "function") {
      await addXP(5);
    }

    current++;
    showQuestion();
  } else {
    alert("اشتباه بود! دوباره تلاش کن.");

    if (typeof loseHeart === "function") {
      await loseHeart();
    }

    if (typeof checkAndRegenHearts === "function") {
      checkAndRegenHearts();
    }

    const heartElement = document.getElementById("heart-count");
    if (heartElement && typeof getHearts === "function") {
      heartElement.textContent = getHearts();
    }

    if (typeof getHearts === "function" && getHearts() <= 0) {
      document.getElementById("app").innerHTML = `
        <h2>قلب شما تمام شد 💔</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../home.html">بازگشت</a>
      `;
      return;
    }
  }
}



  // اگر بعداً آرایه‌ی selected هم ساختی، اینجا باید از آن هم حذف شود
}
function removeLastBuilderItem() {
  const wordBuilder = document.getElementById("word-builder");
  const optionsBox = document.getElementById("options");

  if (!wordBuilder || !optionsBox) return;
  if (wordBuilder.children.length === 0) return;

  const lastItem = wordBuilder.lastElementChild;
  if (lastItem) {
    optionsBox.prepend(lastItem);
  }
}

// Word Builder Keyboard Control

document.addEventListener("keydown", function (e) {
  const wordBuilder = document.getElementById("word-builder");
  if (!wordBuilder) return;

  //if (document.activeElement !== wordBuilder) return;

  if (e.key === "Backspace") {
    e.preventDefault();
    removeLastBuilderItem();
  }
});

function returnTileToOptions(tile) {
  const optionsBox = document.getElementById("options");
  if (!optionsBox || !tile) return;

  optionsBox.appendChild(tile);
  tile.classList.remove("selected");

  if (tile.returnFunction) {
    tile.removeEventListener("click", tile.returnFunction);
    delete tile.returnFunction;
  }
}


function shuffleArray(arr) {
  let array = [...arr];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}


showQuestion(); 
