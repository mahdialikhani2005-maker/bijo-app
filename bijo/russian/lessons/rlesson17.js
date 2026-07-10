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
question:"какой из них счастливый ?",
speak:"счастливый",
options:[
{text:"грустный",image:"../../media/feelings/sad.png"},
{text:"счастливый",image:"../../media/feelings/happy.png"},
{text:"злой",image:"../../media/feelings/angry.png"},
{text:"усталый",image:"../../media/feelings/tired.png"}
],
answer:"счастливый"
},

{
type:"image",
question:"какой из них грустный ?",
speak:"грустный",
options:[
{text:"усталый",image:"../../media/feelings/tired.png"},
{text:"грустный",image:"../../media/feelings/sad.png"},
{text:"голодный",image:"../../media/feelings/hungry.png"},
{text:"счастливый",image:"../../media/feelings/happy.png"}
],
answer:"грустный"
},

{
type:"image",
question:"какой из них злой ?",
speak:"злой",
options:[
{text:"счастливый",image:"../../media/feelings/happy.png"},
{text:"злой",image:"../../media/feelings/angry.png"},
{text:"голодный",image:"../../media/feelings/hungry.png"},
{text:"грустный",image:"../../media/feelings/sad.png"}
],
answer:"злой"
},

{
type:"image",
question:"какой из них усталый ?",
speak:"усталый",
options:[
{text:"злой",image:"../../media/feelings/angry.png"},
{text:"грустный",image:"../../media/feelings/sad.png"},
{text:"усталый",image:"../../media/feelings/tired.png"},
{text:"счастливый",image:"../../media/feelings/happy.png"}
],
answer:"усталый"
},

{
type:"image",
question:"какой из них голодный ?",
speak:"голодный",
options:[
{text:"усталый",image:"../../media/feelings/tired.png"},
{text:"счастливый",image:"../../media/feelings/happy.png"},
{text:"грустный",image:"../../media/feelings/sad.png"},
{text:"голодный",image:"../../media/feelings/hungry.png"}
],
answer:"голодный"
},

/* WORD */

{
type:"word",
question:"Что это за изображение?",
image:"../../media/feelings/happy.png",
options:["грустный","счастливый","злой","усталый"],
answer:"счастливый"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/feelings/sad.png",
options:["усталый","грустный","голодный","счастливый"],
answer:"грустный"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/feelings/angry.png",
options:["счастливый","злой","голодный","грустный"],
answer:"злой"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/feelings/tired.png",
options:["злой","грустный","усталый","счастливый"],
answer:"усталый"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/feelings/hungry.png",
options:["усталый","счастливый","грустный","голодный"],
answer:"голодный"
},

/* AUDIO */

{
type:"audio",
speak:"счастливый",
question:"Какое слово ты услышал?",
options:["грустный","счастливый","злой","усталый"],
answer:"счастливый"
},

{
type:"audio",
speak:"грустный",
question:"Какое слово ты услышал?",
options:["усталый","грустный","голодный","счастливый"],
answer:"грустный"
},

{
type:"audio",
speak:"злой",
question:"Какое слово ты услышал?",
options:["счастливый","злой","голодный","грустный"],
answer:"злой"
},

{
type:"audio",
speak:"усталый",
question:"Какое слово ты услышал?",
options:["злой","грустный","усталый","счастливый"],
answer:"усталый"
},

{
type:"audio",
speak:"голодный",
question:"Какое слово ты услышал?",
options:["усталый","счастливый","грустный","голодный"],
answer:"голодный"
},

/* BUILD RU */

{
type:"build-ru",
speak:"Я счастлив",
question:"Составьте русское предложение:",
text:"من خوشحال هستم",
words:["счастлив","Я"],
answer:["Я","счастлив"]
},

{
type:"build-ru",
speak:"Я грустный",
question:"Составьте русское предложение:",
text:"من ناراحت هستم",
words:["грустный","Я"],
answer:["Я","грустный"]
},

{
type:"build-ru",
speak:"Я злой",
question:"Составьте русское предложение:",
text:"من عصبانی هستم",
words:["злой","Я"],
answer:["Я","злой"]
},

{
type:"build-ru",
speak:"Я усталый",
question:"Составьте русское предложение:",
text:"من خسته هستم",
words:["усталый","Я"],
answer:["Я","усталый"]
},

{
type:"build-ru",
speak:"Я голодный",
question:"Составьте русское предложение:",
text:"من گرسنه هستم",
words:["голодный","Я"],
answer:["Я","голодный"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Я счастлив",
question:"ترجمه را بساز:",
text:"Я счастлив",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"Я грустный",
question:"ترجمه را بساز:",
text:"Я грустный",
words:["هستم","ناراحت","من"],
answer:["من","ناراحت","هستم"]
},

{
type:"build-fa",
speak:"Я злой",
question:"ترجمه را بساز:",
text:"Я злой",
words:["هستم","عصبانی","من"],
answer:["من","عصبانی","هستم"]
},

{
type:"build-fa",
speak:"Я усталый",
question:"ترجمه را بساز:",
text:"Я усталый",
words:["هستم","خسته","من"],
answer:["من","خسته","هستم"]
},

{
type:"build-fa",
speak:"Я голодный",
question:"ترجمه را بساز:",
text:"Я голодный",
words:["هستم","گرسنه","من"],
answer:["من","گرسنه","هستم"]
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
