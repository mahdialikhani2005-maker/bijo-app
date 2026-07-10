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
question:"какой из них яблоко ?",
speak:"яблоко",
options:[
{text:"банан",image:"../../media/fruits/banana.png"},
{text:"яблоко",image:"../../media/fruits/apple.png"},
{text:"апельсин",image:"../../media/fruits/orange.png"},
{text:"виноград",image:"../../media/fruits/grape.png"}
],
answer:"яблоко"
},

{
type:"image",
question:"какой из них банан ?",
speak:"банан",
options:[
{text:"апельсин",image:"../../media/fruits/orange.png"},
{text:"банан",image:"../../media/fruits/banana.png"},
{text:"арбуз",image:"../../media/fruits/watermelon.png"},
{text:"яблоко",image:"../../media/fruits/apple.png"}
],
answer:"банан"
},

{
type:"image",
question:"какой из них апельсин ?",
speak:"апельсин",
options:[
{text:"яблоко",image:"../../media/fruits/apple.png"},
{text:"апельсин",image:"../../media/fruits/orange.png"},
{text:"виноград",image:"../../media/fruits/grape.png"},
{text:"банан",image:"../../media/fruits/banana.png"}
],
answer:"апельсин"
},

{
type:"image",
question:"какой из них виноград ?",
speak:"виноград",
options:[
{text:"апельсин",image:"../../media/fruits/orange.png"},
{text:"банан",image:"../../media/fruits/banana.png"},
{text:"виноград",image:"../../media/fruits/grape.png"},
{text:"яблоко",image:"../../media/fruits/apple.png"}
],
answer:"виноград"
},

{
type:"image",
question:"какой из них арбуз ?",
speak:"арбуз",
options:[
{text:"виноград",image:"../../media/fruits/grape.png"},
{text:"яблоко",image:"../../media/fruits/apple.png"},
{text:"банан",image:"../../media/fruits/banana.png"},
{text:"арбуз",image:"../../media/fruits/watermelon.png"}
],
answer:"арбуз"
},

/* WORD */

{
type:"word",
question:"Что это за изображение?",
image:"../../media/fruits/apple.png",
options:["банан","яблоко","апельсин","виноград"],
answer:"яблоко"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/fruits/banana.png",
options:["апельсин","банан","арбуз","яблоко"],
answer:"банан"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/fruits/orange.png",
options:["яблоко","апельсин","виноград","банан"],
answer:"апельсин"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/fruits/grape.png",
options:["апельсин","банан","виноград","яблоко"],
answer:"виноград"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/fruits/watermelon.png",
options:["виноград","яблоко","банан","арбуз"],
answer:"арбуз"
},

/* AUDIO */

{
type:"audio",
speak:"яблоко",
question:"Какое слово ты услышал?",
options:["банан","яблоко","апельсин","виноград"],
answer:"яблоко"
},

{
type:"audio",
speak:"банан",
question:"Какое слово ты услышал?",
options:["апельсин","банан","арбуз","яблоко"],
answer:"банан"
},

{
type:"audio",
speak:"апельсин",
question:"Какое слово ты услышал?",
options:["яблоко","апельсин","виноград","банан"],
answer:"апельсин"
},

{
type:"audio",
speak:"виноград",
question:"Какое слово ты услышал?",
options:["апельсин","банан","виноград","яблоко"],
answer:"виноград"
},

{
type:"audio",
speak:"арбуз",
question:"Какое слово ты услышал?",
options:["виноград","яблоко","банан","арбуз"],
answer:"арбуз"
},

/* BUILD RU */

{
type:"build-ru",
speak:"Я ем яблоко",
question:"Составьте русское предложение:",
text:"من یک سیب می‌خورم",
words:["яблоко","ем","Я"],
answer:["Я","ем","яблоко"]
},

{
type:"build-ru",
speak:"Я ем банан",
question:"Составьте русское предложение:",
text:"من یک موز می‌خورم",
words:["банан","ем","Я"],
answer:["Я","ем","банан"]
},

{
type:"build-ru",
speak:"Я ем апельсин",
question:"Составьте русское предложение:",
text:"من یک پرتقال می‌خورم",
words:["апельсин","ем","Я"],
answer:["Я","ем","апельсин"]
},

{
type:"build-ru",
speak:"Я ем виноград",
question:"Составьте русское предложение:",
text:"من انگور می‌خورم",
words:["виноград","ем","Я"],
answer:["Я","ем","виноград"]
},

{
type:"build-ru",
speak:"Я ем арбуз",
question:"Составьте русское предложение:",
text:"من هندوانه می‌خورم",
words:["арбуз","ем","Я"],
answer:["Я","ем","арбуз"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Я ем яблоко",
question:"ترجمه را بساز:",
text:"Я ем яблоко",
words:["می‌خورم","سیب","یک","من"],
answer:["من","یک","سیب","می‌خورم"]
},

{
type:"build-fa",
speak:"Я ем банан",
question:"ترجمه را بساز:",
text:"Я ем банан",
words:["می‌خورم","موز","یک","من"],
answer:["من","یک","موز","می‌خورم"]
},

{
type:"build-fa",
speak:"Я ем апельсин",
question:"ترجمه را بساز:",
text:"Я ем апельсин",
words:["می‌خورم","پرتقال","یک","من"],
answer:["من","یک","پرتقال","می‌خورم"]
},

{
type:"build-fa",
speak:"Я ем виноград",
question:"ترجمه را بساز:",
text:"Я ем виноград",
words:["می‌خورم","انگور","من"],
answer:["من","انگور","می‌خورم"]
},

{
type:"build-fa",
speak:"Я ем арбуз",
question:"ترجمه را بساز:",
text:"Я ем арбуз",
words:["می‌خورم","هندوانه","من"],
answer:["من","هندوانه","می‌خورم"]
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
