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
question:"哪个是西红柿 ？",
speak:"xīhóngshì",
options:[
{text:"土豆",image:"../../media/vegetables/potato.png"},
{text:"西红柿",image:"../../media/vegetables/tomato.png"},
{text:"胡萝卜",image:"../../media/vegetables/carrot.png"},
{text:"洋葱",image:"../../media/vegetables/onion.png"}
],
answer:"西红柿"
},

{
type:"image",
question:"哪个是土豆 ？",
speak:"tǔdòu",
options:[
{text:"洋葱",image:"../../media/vegetables/onion.png"},
{text:"土豆",image:"../../media/vegetables/potato.png"},
{text:"黄瓜",image:"../../media/vegetables/cucumber.png"},
{text:"西红柿",image:"../../media/vegetables/tomato.png"}
],
answer:"土豆"
},

{
type:"image",
question:"哪个是胡萝卜 ？",
speak:"húluóbo",
options:[
{text:"西红柿",image:"../../media/vegetables/tomato.png"},
{text:"胡萝卜",image:"../../media/vegetables/carrot.png"},
{text:"黄瓜",image:"../../media/vegetables/cucumber.png"},
{text:"土豆",image:"../../media/vegetables/potato.png"}
],
answer:"胡萝卜"
},

{
type:"image",
question:"哪个是洋葱 ？",
speak:"yángcōng",
options:[
{text:"胡萝卜",image:"../../media/vegetables/carrot.png"},
{text:"土豆",image:"../../media/vegetables/potato.png"},
{text:"洋葱",image:"../../media/vegetables/onion.png"},
{text:"西红柿",image:"../../media/vegetables/tomato.png"}
],
answer:"洋葱"
},

{
type:"image",
question:"哪个是黄瓜 ？",
speak:"huángguā",
options:[
{text:"洋葱",image:"../../media/vegetables/onion.png"},
{text:"西红柿",image:"../../media/vegetables/tomato.png"},
{text:"土豆",image:"../../media/vegetables/potato.png"},
{text:"黄瓜",image:"../../media/vegetables/cucumber.png"}
],
answer:"黄瓜"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/vegetables/tomato.png",
options:["土豆","西红柿","胡萝卜","洋葱"],
answer:"西红柿"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/vegetables/potato.png",
options:["洋葱","土豆","黄瓜","西红柿"],
answer:"土豆"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/vegetables/carrot.png",
options:["西红柿","胡萝卜","黄瓜","土豆"],
answer:"胡萝卜"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/vegetables/onion.png",
options:["胡萝卜","土豆","洋葱","西红柿"],
answer:"洋葱"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/vegetables/cucumber.png",
options:["洋葱","西红柿","土豆","黄瓜"],
answer:"黄瓜"
},

/* AUDIO */

{
type:"audio",
speak:"xīhóngshì",
question:"你听到了哪个词？",
options:["土豆","西红柿","胡萝卜","洋葱"],
answer:"西红柿"
},

{
type:"audio",
speak:"tǔdòu",
question:"你听到了哪个词？",
options:["洋葱","土豆","黄瓜","西红柿"],
answer:"土豆"
},

{
type:"audio",
speak:"húluóbo",
question:"你听到了哪个词？",
options:["西红柿","胡萝卜","黄瓜","土豆"],
answer:"胡萝卜"
},

{
type:"audio",
speak:"yángcōng",
question:"你听到了哪个词？",
options:["胡萝卜","土豆","洋葱","西红柿"],
answer:"洋葱"
},

{
type:"audio",
speak:"huángguā",
question:"你听到了哪个词？",
options:["洋葱","西红柿","土豆","黄瓜"],
answer:"黄瓜"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"这是一个西红柿",
question:"请组成中文句子：",
text:"این یک گوجه است",
words:["西红柿","一个","这是"],
answer:["这是","一个","西红柿"]
},

{
type:"build-zh",
speak:"这是一个土豆",
question:"请组成中文句子：",
text:"این یک سیب‌زمینی است",
words:["土豆","一个","这是"],
answer:["这是","一个","土豆"]
},

{
type:"build-zh",
speak:"这是一个胡萝卜",
question:"请组成中文句子：",
text:"این یک هویج است",
words:["胡萝卜","一个","这是"],
answer:["这是","一个","胡萝卜"]
},

{
type:"build-zh",
speak:"这是一个洋葱",
question:"请组成中文句子：",
text:"این یک پیاز است",
words:["洋葱","一个","这是"],
answer:["这是","一个","洋葱"]
},

{
type:"build-zh",
speak:"这是一个黄瓜",
question:"请组成中文句子：",
text:"این یک خیار است",
words:["黄瓜","一个","这是"],
answer:["这是","一个","黄瓜"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"这是一个西红柿",
question:"ترجمه را بساز:",
text:"这是一个西红柿",
words:["است","گوجه","یک","این"],
answer:["این","یک","گوجه","است"]
},

{
type:"build-fa",
speak:"这是一个土豆",
question:"ترجمه را بساز:",
text:"这是一个土豆",
words:["است","سیب‌زمینی","یک","این"],
answer:["این","یک","سیب‌زمینی","است"]
},

{
type:"build-fa",
speak:"这是一个胡萝卜",
question:"ترجمه را بساز:",
text:"这是一个胡萝卜",
words:["است","هویج","یک","این"],
answer:["این","یک","هویج","است"]
},

{
type:"build-fa",
speak:"这是一个洋葱",
question:"ترجمه را بساز:",
text:"这是一个洋葱",
words:["است","پیاز","یک","این"],
answer:["این","یک","پیاز","است"]
},

{
type:"build-fa",
speak:"这是一个黄瓜",
question:"ترجمه را بساز:",
text:"这是一个黄瓜",
words:["است","خیار","یک","این"],
answer:["این","یک","خیار","است"]
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
