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
question:"哪个是苹果 ？",
speak:"píngguǒ",
options:[
{text:"香蕉",image:"../../media/fruits/banana.png"},
{text:"苹果",image:"../../media/fruits/apple.png"},
{text:"橙子",image:"../../media/fruits/orange.png"},
{text:"葡萄",image:"../../media/fruits/grape.png"}
],
answer:"苹果"
},

{
type:"image",
question:"哪个是香蕉 ？",
speak:"xiāngjiāo",
options:[
{text:"橙子",image:"../../media/fruits/orange.png"},
{text:"香蕉",image:"../../media/fruits/banana.png"},
{text:"西瓜",image:"../../media/fruits/watermelon.png"},
{text:"苹果",image:"../../media/fruits/apple.png"}
],
answer:"香蕉"
},

{
type:"image",
question:"哪个是橙子 ？",
speak:"chéngzi",
options:[
{text:"苹果",image:"../../media/fruits/apple.png"},
{text:"橙子",image:"../../media/fruits/orange.png"},
{text:"葡萄",image:"../../media/fruits/grape.png"},
{text:"香蕉",image:"../../media/fruits/banana.png"}
],
answer:"橙子"
},

{
type:"image",
question:"哪个是葡萄 ？",
speak:"pútáo",
options:[
{text:"橙子",image:"../../media/fruits/orange.png"},
{text:"香蕉",image:"../../media/fruits/banana.png"},
{text:"葡萄",image:"../../media/fruits/grape.png"},
{text:"苹果",image:"../../media/fruits/apple.png"}
],
answer:"葡萄"
},

{
type:"image",
question:"哪个是西瓜 ？",
speak:"xīguā",
options:[
{text:"葡萄",image:"../../media/fruits/grape.png"},
{text:"苹果",image:"../../media/fruits/apple.png"},
{text:"香蕉",image:"../../media/fruits/banana.png"},
{text:"西瓜",image:"../../media/fruits/watermelon.png"}
],
answer:"西瓜"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/fruits/apple.png",
options:["香蕉","苹果","橙子","葡萄"],
answer:"苹果"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/fruits/banana.png",
options:["橙子","香蕉","西瓜","苹果"],
answer:"香蕉"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/fruits/orange.png",
options:["苹果","橙子","葡萄","香蕉"],
answer:"橙子"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/fruits/grape.png",
options:["橙子","香蕉","葡萄","苹果"],
answer:"葡萄"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/fruits/watermelon.png",
options:["葡萄","苹果","香蕉","西瓜"],
answer:"西瓜"
},

/* AUDIO */

{
type:"audio",
speak:"píngguǒ",
question:"你听到了哪个词？",
options:["香蕉","苹果","橙子","葡萄"],
answer:"苹果"
},

{
type:"audio",
speak:"xiāngjiāo",
question:"你听到了哪个词？",
options:["橙子","香蕉","西瓜","苹果"],
answer:"香蕉"
},

{
type:"audio",
speak:"chéngzi",
question:"你听到了哪个词？",
options:["苹果","橙子","葡萄","香蕉"],
answer:"橙子"
},

{
type:"audio",
speak:"pútáo",
question:"你听到了哪个词？",
options:["橙子","香蕉","葡萄","苹果"],
answer:"葡萄"
},

{
type:"audio",
speak:"xīguā",
question:"你听到了哪个词？",
options:["葡萄","苹果","香蕉","西瓜"],
answer:"西瓜"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"我吃苹果",
question:"请组成中文句子：",
text:"من یک سیب می‌خورم",
words:["苹果","吃","我"],
answer:["我","吃","苹果"]
},

{
type:"build-zh",
speak:"我吃香蕉",
question:"请组成中文句子：",
text:"من یک موز می‌خورم",
words:["香蕉","吃","我"],
answer:["我","吃","香蕉"]
},

{
type:"build-zh",
speak:"我吃橙子",
question:"请组成中文句子：",
text:"من یک پرتقال می‌خورم",
words:["橙子","吃","我"],
answer:["我","吃","橙子"]
},

{
type:"build-zh",
speak:"我吃葡萄",
question:"请组成中文句子：",
text:"من انگور می‌خورم",
words:["葡萄","吃","我"],
answer:["我","吃","葡萄"]
},

{
type:"build-zh",
speak:"我吃西瓜",
question:"请组成中文句子：",
text:"من هندوانه می‌خورم",
words:["西瓜","吃","我"],
answer:["我","吃","西瓜"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"我吃苹果",
question:"ترجمه را بساز:",
text:"我吃苹果",
words:["می‌خورم","سیب","یک","من"],
answer:["من","یک","سیب","می‌خورم"]
},

{
type:"build-fa",
speak:"我吃香蕉",
question:"ترجمه را بساز:",
text:"我吃香蕉",
words:["می‌خورم","موز","یک","من"],
answer:["من","یک","موز","می‌خورم"]
},

{
type:"build-fa",
speak:"我吃橙子",
question:"ترجمه را بساز:",
text:"我吃橙子",
words:["می‌خورم","پرتقال","یک","من"],
answer:["من","یک","پرتقال","می‌خورم"]
},

{
type:"build-fa",
speak:"我吃葡萄",
question:"ترجمه را بساز:",
text:"我吃葡萄",
words:["می‌خورم","انگور","من"],
answer:["من","انگور","می‌خورم"]
},

{
type:"build-fa",
speak:"我吃西瓜",
question:"ترجمه را بساز:",
text:"我吃西瓜",
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
