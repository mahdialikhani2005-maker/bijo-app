let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
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
question:"哪个是汽车 ？",
speak:"qìchē",
options:[
{text:"公共汽车",image:"../../media/vehicles/bus.png"},
{text:"汽车",image:"../../media/vehicles/car.png"},
{text:"火车",image:"../../media/vehicles/train.png"},
{text:"飞机",image:"../../media/vehicles/airplane.png"}
],
answer:"汽车"
},

{
type:"image",
question:"哪个是公共汽车 ？",
speak:"gōnggòng qìchē",
options:[
{text:"飞机",image:"../../media/vehicles/airplane.png"},
{text:"公共汽车",image:"../../media/vehicles/bus.png"},
{text:"自行车",image:"../../media/vehicles/bicycle.png"},
{text:"汽车",image:"../../media/vehicles/car.png"}
],
answer:"公共汽车"
},

{
type:"image",
question:"哪个是火车 ？",
speak:"huǒchē",
options:[
{text:"汽车",image:"../../media/vehicles/car.png"},
{text:"火车",image:"../../media/vehicles/train.png"},
{text:"自行车",image:"../../media/vehicles/bicycle.png"},
{text:"公共汽车",image:"../../media/vehicles/bus.png"}
],
answer:"火车"
},

{
type:"image",
question:"哪个是飞机 ？",
speak:"fēijī",
options:[
{text:"火车",image:"../../media/vehicles/train.png"},
{text:"公共汽车",image:"../../media/vehicles/bus.png"},
{text:"飞机",image:"../../media/vehicles/airplane.png"},
{text:"汽车",image:"../../media/vehicles/car.png"}
],
answer:"飞机"
},

{
type:"image",
question:"哪个是自行车 ？",
speak:"zìxíngchē",
options:[
{text:"飞机",image:"../../media/vehicles/airplane.png"},
{text:"汽车",image:"../../media/vehicles/car.png"},
{text:"公共汽车",image:"../../media/vehicles/bus.png"},
{text:"自行车",image:"../../media/vehicles/bicycle.png"}
],
answer:"自行车"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/vehicles/car.png",
options:["公共汽车","汽车","火车","飞机"],
answer:"汽车"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/vehicles/bus.png",
options:["飞机","公共汽车","自行车","汽车"],
answer:"公共汽车"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/vehicles/train.png",
options:["汽车","火车","自行车","公共汽车"],
answer:"火车"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/vehicles/airplane.png",
options:["火车","公共汽车","飞机","汽车"],
answer:"飞机"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/vehicles/bicycle.png",
options:["飞机","汽车","公共汽车","自行车"],
answer:"自行车"
},

/* AUDIO */

{
type:"audio",
speak:"qìchē",
question:"你听到了哪个词？",
options:["公共汽车","汽车","火车","飞机"],
answer:"汽车"
},

{
type:"audio",
speak:"gōnggòng qìchē",
question:"你听到了哪个词？",
options:["飞机","公共汽车","自行车","汽车"],
answer:"公共汽车"
},

{
type:"audio",
speak:"huǒchē",
question:"你听到了哪个词？",
options:["汽车","火车","自行车","公共汽车"],
answer:"火车"
},

{
type:"audio",
speak:"fēijī",
question:"你听到了哪个词？",
options:["火车","公共汽车","飞机","汽车"],
answer:"飞机"
},

{
type:"audio",
speak:"zìxíngchē",
question:"你听到了哪个词？",
options:["飞机","汽车","公共汽车","自行车"],
answer:"自行车"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"我有一辆汽车",
question:"请组成中文句子：",
text:"من یک ماشین دارم",
words:["汽车","一辆","有","我"],
answer:["我","有","一辆","汽车"]
},

{
type:"build-zh",
speak:"我有一辆公共汽车",
question:"请组成中文句子：",
text:"من یک اتوبوس دارم",
words:["公共汽车","一辆","有","我"],
answer:["我","有","一辆","公共汽车"]
},

{
type:"build-zh",
speak:"我有一列火车",
question:"请组成中文句子：",
text:"من یک قطار دارم",
words:["火车","一列","有","我"],
answer:["我","有","一列","火车"]
},

{
type:"build-zh",
speak:"我有一架飞机",
question:"请组成中文句子：",
text:"من یک هواپیما دارم",
words:["飞机","一架","有","我"],
answer:["我","有","一架","飞机"]
},

{
type:"build-zh",
speak:"我有一辆自行车",
question:"请组成中文句子：",
text:"من یک دوچرخه دارم",
words:["自行车","一辆","有","我"],
answer:["我","有","一辆","自行车"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"我有一辆汽车",
question:"ترجمه را بساز:",
text:"我有一辆汽车",
words:["دارم","ماشین","یک","من"],
answer:["من","یک","ماشین","دارم"]
},

{
type:"build-fa",
speak:"我有一辆公共汽车",
question:"ترجمه را بساز:",
text:"我有一辆公共汽车",
words:["دارم","اتوبوس","یک","من"],
answer:["من","یک","اتوبوس","دارم"]
},

{
type:"build-fa",
speak:"我有一列火车",
question:"ترجمه را بساز:",
text:"我有一列火车",
words:["دارم","قطار","یک","من"],
answer:["من","یک","قطار","دارم"]
},

{
type:"build-fa",
speak:"我有一架飞机",
question:"ترجمه را بساز:",
text:"我有一架飞机",
words:["دارم","هواپیما","یک","من"],
answer:["من","یک","هواپیما","دارم"]
},

{
type:"build-fa",
speak:"我有一辆自行车",
question:"ترجمه را بساز:",
text:"我有一辆自行车",
words:["دارم","دوچرخه","یک","من"],
answer:["من","یک","دوچرخه","دارم"]
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

  else if (q.type === "build-en" || q.type === "build-fa" || q.type === "build-zh-CN") {
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

if (q.type === "build-en" || q.type === "build-zh-CN") {
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
