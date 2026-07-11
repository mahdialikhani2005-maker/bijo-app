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
question:"哪个是一 ？",
speak:"yī",
options:[
{text:"二",image:"../../media/numbers/two.png"},
{text:"一",image:"../../media/numbers/one.png"},
{text:"三",image:"../../media/numbers/three.png"},
{text:"四",image:"../../media/numbers/four.png"}
],
answer:"一"
},

{
type:"image",
question:"哪个是二 ？",
speak:"èr",
options:[
{text:"四",image:"../../media/numbers/four.png"},
{text:"二",image:"../../media/numbers/two.png"},
{text:"五",image:"../../media/numbers/five.png"},
{text:"一",image:"../../media/numbers/one.png"}
],
answer:"二"
},

{
type:"image",
question:"哪个是三 ？",
speak:"sān",
options:[
{text:"一",image:"../../media/numbers/one.png"},
{text:"三",image:"../../media/numbers/three.png"},
{text:"五",image:"../../media/numbers/five.png"},
{text:"二",image:"../../media/numbers/two.png"}
],
answer:"三"
},

{
type:"image",
question:"哪个是四 ？",
speak:"sì",
options:[
{text:"三",image:"../../media/numbers/three.png"},
{text:"二",image:"../../media/numbers/two.png"},
{text:"四",image:"../../media/numbers/four.png"},
{text:"一",image:"../../media/numbers/one.png"}
],
answer:"四"
},

{
type:"image",
question:"哪个是五 ？",
speak:"wǔ",
options:[
{text:"四",image:"../../media/numbers/four.png"},
{text:"一",image:"../../media/numbers/one.png"},
{text:"二",image:"../../media/numbers/two.png"},
{text:"五",image:"../../media/numbers/five.png"}
],
answer:"五"
},

/* WORD */

{
type:"word",
question:"这个数字是什么？",
image:"../../media/numbers/one.png",
options:["二","一","三","四"],
answer:"一"
},

{
type:"word",
question:"这个数字是什么？",
image:"../../media/numbers/two.png",
options:["四","二","五","一"],
answer:"二"
},

{
type:"word",
question:"这个数字是什么？",
image:"../../media/numbers/three.png",
options:["一","三","五","二"],
answer:"三"
},

{
type:"word",
question:"这个数字是什么？",
image:"../../media/numbers/four.png",
options:["三","二","四","一"],
answer:"四"
},

{
type:"word",
question:"这个数字是什么？",
image:"../../media/numbers/five.png",
options:["四","一","二","五"],
answer:"五"
},

/* AUDIO */

{
type:"audio",
speak:"yī",
question:"你听到了哪个词？",
options:["二","一","三","四"],
answer:"一"
},

{
type:"audio",
speak:"èr",
question:"你听到了哪个词？",
options:["四","二","五","一"],
answer:"二"
},

{
type:"audio",
speak:"sān",
question:"你听到了哪个词？",
options:["一","三","五","二"],
answer:"三"
},

{
type:"audio",
speak:"sì",
question:"你听到了哪个词？",
options:["三","二","四","一"],
answer:"四"
},

{
type:"audio",
speak:"wǔ",
question:"你听到了哪个词？",
options:["四","一","二","五"],
answer:"五"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"我有一本书",
question:"请组成中文句子：",
text:"من یک کتاب دارم",
words:["书","一本","有","我"],
answer:["我","有","一本","书"]
},

{
type:"build-zh",
speak:"我有两本书",
question:"请组成中文句子：",
text:"من دو کتاب دارم",
words:["书","两本","有","我"],
answer:["我","有","两本","书"]
},

{
type:"build-zh",
speak:"我有三本书",
question:"请组成中文句子：",
text:"من سه کتاب دارم",
words:["书","三本","有","我"],
answer:["我","有","三本","书"]
},

{
type:"build-zh",
speak:"我有四本书",
question:"请组成中文句子：",
text:"من چهار کتاب دارم",
words:["书","四本","有","我"],
answer:["我","有","四本","书"]
},

{
type:"build-zh",
speak:"我有五本书",
question:"请组成中文句子：",
text:"من پنج کتاب دارم",
words:["书","五本","有","我"],
answer:["我","有","五本","书"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"我有一本书",
question:"ترجمه را بساز:",
text:"我有一本书",
words:["دارم","یک","کتاب","من"],
answer:["من","یک","کتاب","دارم"]
},

{
type:"build-fa",
speak:"我有两本书",
question:"ترجمه را بساز:",
text:"我有两本书",
words:["دارم","دو","کتاب","من"],
answer:["من","دو","کتاب","دارم"]
},

{
type:"build-fa",
speak:"我有三本书",
question:"ترجمه را بساز:",
text:"我有三本书",
words:["دارم","سه","کتاب","من"],
answer:["من","سه","کتاب","دارم"]
},

{
type:"build-fa",
speak:"我有四本书",
question:"ترجمه را بساز:",
text:"我有四本书",
words:["دارم","چهار","کتاب","من"],
answer:["من","چهار","کتاب","دارم"]
},

{
type:"build-fa",
speak:"我有五本书",
question:"ترجمه را بساز:",
text:"我有五本书",
words:["دارم","پنج","کتاب","من"],
answer:["من","پنج","کتاب","دارم"]
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
