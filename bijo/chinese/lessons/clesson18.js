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
question:"哪个是吃 ？",
speak:"chī",
options:[
{text:"睡觉",image:"../../media/actions/sleep.png"},
{text:"吃",image:"../../media/actions/eat.png"},
{text:"走路",image:"../../media/actions/walk.png"},
{text:"读",image:"../../media/actions/read.png"}
],
answer:"吃"
},

{
type:"image",
question:"哪个是睡觉 ？",
speak:"shuìjiào",
options:[
{text:"写",image:"../../media/actions/write.png"},
{text:"睡觉",image:"../../media/actions/sleep.png"},
{text:"吃",image:"../../media/actions/eat.png"},
{text:"走路",image:"../../media/actions/walk.png"}
],
answer:"睡觉"
},

{
type:"image",
question:"哪个是走路 ？",
speak:"zǒulù",
options:[
{text:"吃",image:"../../media/actions/eat.png"},
{text:"走路",image:"../../media/actions/walk.png"},
{text:"写",image:"../../media/actions/write.png"},
{text:"睡觉",image:"../../media/actions/sleep.png"}
],
answer:"走路"
},

{
type:"image",
question:"哪个是读 ？",
speak:"dú",
options:[
{text:"走路",image:"../../media/actions/walk.png"},
{text:"睡觉",image:"../../media/actions/sleep.png"},
{text:"读",image:"../../media/actions/read.png"},
{text:"吃",image:"../../media/actions/eat.png"}
],
answer:"读"
},

{
type:"image",
question:"哪个是写 ？",
speak:"xiě",
options:[
{text:"读",image:"../../media/actions/read.png"},
{text:"吃",image:"../../media/actions/eat.png"},
{text:"睡觉",image:"../../media/actions/sleep.png"},
{text:"写",image:"../../media/actions/write.png"}
],
answer:"写"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/actions/eat.png",
options:["睡觉","吃","走路","读"],
answer:"吃"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/actions/sleep.png",
options:["写","睡觉","吃","走路"],
answer:"睡觉"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/actions/walk.png",
options:["吃","走路","写","睡觉"],
answer:"走路"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/actions/read.png",
options:["走路","睡觉","读","吃"],
answer:"读"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/actions/write.png",
options:["读","吃","睡觉","写"],
answer:"写"
},

/* AUDIO */

{
type:"audio",
speak:"chī",
question:"你听到了哪个词？",
options:["睡觉","吃","走路","读"],
answer:"吃"
},

{
type:"audio",
speak:"shuìjiào",
question:"你听到了哪个词？",
options:["写","睡觉","吃","走路"],
answer:"睡觉"
},

{
type:"audio",
speak:"zǒulù",
question:"你听到了哪个词？",
options:["吃","走路","写","睡觉"],
answer:"走路"
},

{
type:"audio",
speak:"dú",
question:"你听到了哪个词？",
options:["走路","睡觉","读","吃"],
answer:"读"
},

{
type:"audio",
speak:"xiě",
question:"你听到了哪个词？",
options:["读","吃","睡觉","写"],
answer:"写"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"我吃面包",
question:"请组成中文句子：",
text:"من نان می‌خورم",
words:["面包","吃","我"],
answer:["我","吃","面包"]
},

{
type:"build-zh",
speak:"我晚上睡觉",
question:"请组成中文句子：",
text:"من شب می‌خوابم",
words:["晚上","睡觉","我"],
answer:["我","晚上","睡觉"]
},

{
type:"build-zh",
speak:"我走路去学校",
question:"请组成中文句子：",
text:"من به مدرسه راه می‌روم",
words:["走路","学校","去","我"],
answer:["我","走路","去","学校"]
},

{
type:"build-zh",
speak:"我读书",
question:"请组成中文句子：",
text:"من یک کتاب می‌خوانم",
words:["读书","我"],
answer:["我","读书"]
},

{
type:"build-zh",
speak:"我写信",
question:"请组成中文句子：",
text:"من یک نامه می‌نویسم",
words:["信","写","我"],
answer:["我","写","信"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"我吃面包",
question:"ترجمه را بساز:",
text:"我吃面包",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"我晚上睡觉",
question:"ترجمه را بساز:",
text:"我晚上睡觉",
words:["می‌خوابم","شب","در","من"],
answer:["من","شب","می‌خوابم"]
},

{
type:"build-fa",
speak:"我走路去学校",
question:"ترجمه را بساز:",
text:"我走路去学校",
words:["می‌روم","مدرسه","به","من"],
answer:["من","به","مدرسه","می‌روم"]
},

{
type:"build-fa",
speak:"我读书",
question:"ترجمه را بساز:",
text:"我读书",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"我写信",
question:"ترجمه را بساز:",
text:"我写信",
words:["می‌نویسم","نامه","یک","من"],
answer:["من","یک","نامه","می‌نویسم"]
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
