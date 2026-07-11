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
question:"какой из них солнце ?",
speak:"солнце",
options:[
{text:"луна",image:"../../media/nature/moon.png"},
{text:"солнце",image:"../../media/nature/sun.png"},
{text:"звезда",image:"../../media/nature/star.png"},
{text:"небо",image:"../../media/nature/sky.png"}
],
answer:"солнце"
},

{
type:"image",
question:"какой из них луна ?",
speak:"луна",
options:[
{text:"звезда",image:"../../media/nature/star.png"},
{text:"луна",image:"../../media/nature/moon.png"},
{text:"дождь",image:"../../media/nature/rain.png"},
{text:"солнце",image:"../../media/nature/sun.png"}
],
answer:"луна"
},

{
type:"image",
question:"какой из них звезда ?",
speak:"звезда",
options:[
{text:"солнце",image:"../../media/nature/sun.png"},
{text:"звезда",image:"../../media/nature/star.png"},
{text:"дождь",image:"../../media/nature/rain.png"},
{text:"луна",image:"../../media/nature/moon.png"}
],
answer:"звезда"
},

{
type:"image",
question:"какой из них небо ?",
speak:"небо",
options:[
{text:"звезда",image:"../../media/nature/star.png"},
{text:"луна",image:"../../media/nature/moon.png"},
{text:"небо",image:"../../media/nature/sky.png"},
{text:"солнце",image:"../../media/nature/sun.png"}
],
answer:"небо"
},

{
type:"image",
question:"какой из них дождь ?",
speak:"дождь",
options:[
{text:"небо",image:"../../media/nature/sky.png"},
{text:"солнце",image:"../../media/nature/sun.png"},
{text:"луна",image:"../../media/nature/moon.png"},
{text:"дождь",image:"../../media/nature/rain.png"}
],
answer:"дождь"
},

/* WORD */

{
type:"word",
question:"Что это за изображение?",
image:"../../media/nature/sun.png",
options:["луна","солнце","звезда","небо"],
answer:"солнце"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/nature/moon.png",
options:["звезда","луна","дождь","солнце"],
answer:"луна"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/nature/star.png",
options:["солнце","звезда","дождь","луна"],
answer:"звезда"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/nature/sky.png",
options:["звезда","луна","небо","солнце"],
answer:"небо"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/nature/rain.png",
options:["небо","солнце","луна","дождь"],
answer:"дождь"
},

/* AUDIO */

{
type:"audio",
speak:"солнце",
question:"Какое слово ты услышал?",
options:["луна","солнце","звезда","небо"],
answer:"солнце"
},

{
type:"audio",
speak:"луна",
question:"Какое слово ты услышал?",
options:["звезда","луна","дождь","солнце"],
answer:"луна"
},

{
type:"audio",
speak:"звезда",
question:"Какое слово ты услышал?",
options:["солнце","звезда","дождь","луна"],
answer:"звезда"
},

{
type:"audio",
speak:"небо",
question:"Какое слово ты услышал?",
options:["звезда","луна","небо","солнце"],
answer:"небо"
},

{
type:"audio",
speak:"дождь",
question:"Какое слово ты услышал?",
options:["небо","солнце","луна","дождь"],
answer:"дождь"
},

/* BUILD RU */

{
type:"build-ru",
speak:"Солнце большое",
question:"Составьте русское предложение:",
text:"خورشید بزرگ است",
words:["Солнце","большое"],
answer:["Солнце","большое"]
},

{
type:"build-ru",
speak:"Луна маленькая",
question:"Составьте русское предложение:",
text:"ماه کوچک است",
words:["Луна","маленькая"],
answer:["Луна","маленькая"]
},

{
type:"build-ru",
speak:"Звезда яркая",
question:"Составьте русское предложение:",
text:"ستاره درخشان است",
words:["Звезда","яркая"],
answer:["Звезда","яркая"]
},

{
type:"build-ru",
speak:"Небо голубое",
question:"Составьте русское предложение:",
text:"آسمان آبی است",
words:["Небо","голубое"],
answer:["Небо","голубое"]
},

{
type:"build-ru",
speak:"Дождь холодный",
question:"Составьте русское предложение:",
text:"باران سرد است",
words:["Дождь","холодный"],
answer:["Дождь","холодный"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Солнце большое",
question:"ترجمه را بساز:",
text:"Солнце большое",
words:["است","بزرگ","خورشید"],
answer:["خورشید","بزرگ","است"]
},

{
type:"build-fa",
speak:"Луна маленькая",
question:"ترجمه را بساز:",
text:"Луна маленькая",
words:["است","کوچک","ماه"],
answer:["ماه","کوچک","است"]
},

{
type:"build-fa",
speak:"Звезда яркая",
question:"ترجمه را بساز:",
text:"Звезда яркая",
words:["است","درخشان","ستاره"],
answer:["ستاره","درخشان","است"]
},

{
type:"build-fa",
speak:"Небо голубое",
question:"ترجمه را بساز:",
text:"Небо голубое",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"Дождь холодный",
question:"ترجمه را بساز:",
text:"Дождь холодный",
words:["است","سرد","باران"],
answer:["باران","سرد","است"]
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
