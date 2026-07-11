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
question:"哪个是太阳 ？",
speak:"tàiyáng",
options:[
{text:"月亮",image:"../../media/nature/moon.png"},
{text:"太阳",image:"../../media/nature/sun.png"},
{text:"星星",image:"../../media/nature/star.png"},
{text:"天空",image:"../../media/nature/sky.png"}
],
answer:"太阳"
},

{
type:"image",
question:"哪个是月亮 ？",
speak:"yuèliàng",
options:[
{text:"星星",image:"../../media/nature/star.png"},
{text:"月亮",image:"../../media/nature/moon.png"},
{text:"雨",image:"../../media/nature/rain.png"},
{text:"太阳",image:"../../media/nature/sun.png"}
],
answer:"月亮"
},

{
type:"image",
question:"哪个是星星 ？",
speak:"xīngxing",
options:[
{text:"太阳",image:"../../media/nature/sun.png"},
{text:"星星",image:"../../media/nature/star.png"},
{text:"雨",image:"../../media/nature/rain.png"},
{text:"月亮",image:"../../media/nature/moon.png"}
],
answer:"星星"
},

{
type:"image",
question:"哪个是天空 ？",
speak:"tiānkōng",
options:[
{text:"星星",image:"../../media/nature/star.png"},
{text:"月亮",image:"../../media/nature/moon.png"},
{text:"天空",image:"../../media/nature/sky.png"},
{text:"太阳",image:"../../media/nature/sun.png"}
],
answer:"天空"
},

{
type:"image",
question:"哪个是雨 ？",
speak:"yǔ",
options:[
{text:"天空",image:"../../media/nature/sky.png"},
{text:"太阳",image:"../../media/nature/sun.png"},
{text:"月亮",image:"../../media/nature/moon.png"},
{text:"雨",image:"../../media/nature/rain.png"}
],
answer:"雨"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/nature/sun.png",
options:["月亮","太阳","星星","天空"],
answer:"太阳"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/nature/moon.png",
options:["星星","月亮","雨","太阳"],
answer:"月亮"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/nature/star.png",
options:["太阳","星星","雨","月亮"],
answer:"星星"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/nature/sky.png",
options:["星星","月亮","天空","太阳"],
answer:"天空"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/nature/rain.png",
options:["天空","太阳","月亮","雨"],
answer:"雨"
},

/* AUDIO */

{
type:"audio",
speak:"tàiyáng",
question:"你听到了哪个词？",
options:["月亮","太阳","星星","天空"],
answer:"太阳"
},

{
type:"audio",
speak:"yuèliàng",
question:"你听到了哪个词？",
options:["星星","月亮","雨","太阳"],
answer:"月亮"
},

{
type:"audio",
speak:"xīngxing",
question:"你听到了哪个词？",
options:["太阳","星星","雨","月亮"],
answer:"星星"
},

{
type:"audio",
speak:"tiānkōng",
question:"你听到了哪个词？",
options:["星星","月亮","天空","太阳"],
answer:"天空"
},

{
type:"audio",
speak:"yǔ",
question:"你听到了哪个词？",
options:["天空","太阳","月亮","雨"],
answer:"雨"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"太阳大",
question:"请组成中文句子：",
text:"خورشید بزرگ است",
words:["太阳","大"],
answer:["太阳","大"]
},

{
type:"build-zh",
speak:"月亮小",
question:"请组成中文句子：",
text:"ماه کوچک است",
words:["月亮","小"],
answer:["月亮","小"]
},

{
type:"build-zh",
speak:"星星亮",
question:"请组成中文句子：",
text:"ستاره درخشان است",
words:["星星","亮"],
answer:["星星","亮"]
},

{
type:"build-zh",
speak:"天空蓝",
question:"请组成中文句子：",
text:"آسمان آبی است",
words:["天空","蓝"],
answer:["天空","蓝"]
},

{
type:"build-zh",
speak:"雨冷",
question:"请组成中文句子：",
text:"باران سرد است",
words:["雨","冷"],
answer:["雨","冷"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"太阳大",
question:"ترجمه را بساز:",
text:"太阳大",
words:["است","بزرگ","خورشید"],
answer:["خورشید","بزرگ","است"]
},

{
type:"build-fa",
speak:"月亮小",
question:"ترجمه را بساز:",
text:"月亮小",
words:["است","کوچک","ماه"],
answer:["ماه","کوچک","است"]
},

{
type:"build-fa",
speak:"星星亮",
question:"ترجمه را بساز:",
text:"星星亮",
words:["است","درخشان","ستاره"],
answer:["ستاره","درخشان","است"]
},

{
type:"build-fa",
speak:"天空蓝",
question:"ترجمه را بساز:",
text:"天空蓝",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"雨冷",
question:"ترجمه را بساز:",
text:"雨冷",
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
