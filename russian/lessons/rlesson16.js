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
question:"какой из них школа ?",
speak:"школа",
options:[
{text:"больница",image:"../../media/places/hospital.png"},
{text:"школа",image:"../../media/places/school.png"},
{text:"магазин",image:"../../media/places/store.png"},
{text:"парк",image:"../../media/places/park.png"}
],
answer:"школа"
},

{
type:"image",
question:"какой из них больница ?",
speak:"больница",
options:[
{text:"парк",image:"../../media/places/park.png"},
{text:"больница",image:"../../media/places/hospital.png"},
{text:"мечеть",image:"../../media/places/mosque.png"},
{text:"школа",image:"../../media/places/school.png"}
],
answer:"больница"
},

{
type:"image",
question:"какой из них магазин ?",
speak:"магазин",
options:[
{text:"школа",image:"../../media/places/school.png"},
{text:"магазин",image:"../../media/places/store.png"},
{text:"мечеть",image:"../../media/places/mosque.png"},
{text:"больница",image:"../../media/places/hospital.png"}
],
answer:"магазин"
},

{
type:"image",
question:"какой из них парк ?",
speak:"парк",
options:[
{text:"магазин",image:"../../media/places/store.png"},
{text:"больница",image:"../../media/places/hospital.png"},
{text:"парк",image:"../../media/places/park.png"},
{text:"школа",image:"../../media/places/school.png"}
],
answer:"парк"
},

{
type:"image",
question:"какой из них мечеть ?",
speak:"мечеть",
options:[
{text:"парк",image:"../../media/places/park.png"},
{text:"школа",image:"../../media/places/school.png"},
{text:"больница",image:"../../media/places/hospital.png"},
{text:"мечеть",image:"../../media/places/mosque.png"}
],
answer:"мечеть"
},

/* WORD */

{
type:"word",
question:"Что это за изображение?",
image:"../../media/places/school.png",
options:["больница","школа","магазин","парк"],
answer:"школа"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/places/hospital.png",
options:["парк","больница","мечеть","школа"],
answer:"больница"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/places/store.png",
options:["школа","магазин","мечеть","больница"],
answer:"магазин"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/places/park.png",
options:["магазин","больница","парк","школа"],
answer:"парк"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/places/mosque.png",
options:["парк","школа","больница","мечеть"],
answer:"мечеть"
},

/* AUDIO */

{
type:"audio",
speak:"школа",
question:"Какое слово ты услышал?",
options:["больница","школа","магазин","парк"],
answer:"школа"
},

{
type:"audio",
speak:"больница",
question:"Какое слово ты услышал?",
options:["парк","больница","мечеть","школа"],
answer:"больница"
},

{
type:"audio",
speak:"магазин",
question:"Какое слово ты услышал?",
options:["школа","магазин","мечеть","больница"],
answer:"магазин"
},

{
type:"audio",
speak:"парк",
question:"Какое слово ты услышал?",
options:["магазин","больница","парк","школа"],
answer:"парк"
},

{
type:"audio",
speak:"мечеть",
question:"Какое слово ты услышал?",
options:["парк","школа","больница","мечеть"],
answer:"мечеть"
},

/* BUILD RU */

{
type:"build-ru",
speak:"Это школа",
question:"Составьте русское предложение:",
text:"این یک مدرسه است",
words:["школа","Это"],
answer:["Это","школа"]
},

{
type:"build-ru",
speak:"Это больница",
question:"Составьте русское предложение:",
text:"این یک بیمارستان است",
words:["больница","Это"],
answer:["Это","больница"]
},

{
type:"build-ru",
speak:"Это магазин",
question:"Составьте русское предложение:",
text:"این یک فروشگاه است",
words:["магазин","Это"],
answer:["Это","магазин"]
},

{
type:"build-ru",
speak:"Это парк",
question:"Составьте русское предложение:",
text:"این یک پارک است",
words:["парк","Это"],
answer:["Это","парк"]
},

{
type:"build-ru",
speak:"Это мечеть",
question:"Составьте русское предложение:",
text:"این یک مسجد است",
words:["мечеть","Это"],
answer:["Это","мечеть"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Это школа",
question:"ترجمه را بساز:",
text:"Это школа",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"Это больница",
question:"ترجمه را بساز:",
text:"Это больница",
words:["است","بیمارستان","یک","این"],
answer:["این","یک","بیمارستان","است"]
},

{
type:"build-fa",
speak:"Это магазин",
question:"ترجمه را بساز:",
text:"Это магазин",
words:["است","فروشگاه","یک","این"],
answer:["این","یک","فروشگاه","است"]
},

{
type:"build-fa",
speak:"Это парк",
question:"ترجمه را بساز:",
text:"Это парк",
words:["است","پارک","یک","این"],
answer:["این","یک","پارک","است"]
},

{
type:"build-fa",
speak:"Это мечеть",
question:"ترجمه را بساز:",
text:"Это мечеть",
words:["است","مسجد","یک","این"],
answer:["این","یک","مسجد","است"]
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
