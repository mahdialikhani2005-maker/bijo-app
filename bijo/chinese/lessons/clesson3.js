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
question:"哪个是房子 ？",
speak:"fángzi",
options:[
{text:"房间",image:"../../media/house/room.png"},
{text:"房子",image:"../../media/house/house.png"},
{text:"门",image:"../../media/house/door.png"},
{text:"窗户",image:"../../media/house/window.png"}
],
answer:"房子"
},

{
type:"image",
question:"哪个是房间 ？",
speak:"fángjiān",
options:[
{text:"窗户",image:"../../media/house/window.png"},
{text:"房间",image:"../../media/house/room.png"},
{text:"厨房",image:"../../media/house/kitchen.png"},
{text:"房子",image:"../../media/house/house.png"}
],
answer:"房间"
},

{
type:"image",
question:"哪个是门 ？",
speak:"mén",
options:[
{text:"房子",image:"../../media/house/house.png"},
{text:"门",image:"../../media/house/door.png"},
{text:"窗户",image:"../../media/house/window.png"},
{text:"房间",image:"../../media/house/room.png"}
],
answer:"门"
},

{
type:"image",
question:"哪个是窗户 ？",
speak:"chuānghu",
options:[
{text:"门",image:"../../media/house/door.png"},
{text:"房子",image:"../../media/house/house.png"},
{text:"窗户",image:"../../media/house/window.png"},
{text:"房间",image:"../../media/house/room.png"}
],
answer:"窗户"
},

{
type:"image",
question:"哪个是厨房 ？",
speak:"chúfáng",
options:[
{text:"房间",image:"../../media/house/room.png"},
{text:"窗户",image:"../../media/house/window.png"},
{text:"房子",image:"../../media/house/house.png"},
{text:"厨房",image:"../../media/house/kitchen.png"}
],
answer:"厨房"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/house/house.png",
options:["房间","房子","门","窗户"],
answer:"房子"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/house/room.png",
options:["窗户","房间","厨房","房子"],
answer:"房间"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/house/door.png",
options:["房子","门","窗户","房间"],
answer:"门"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/house/window.png",
options:["门","房子","窗户","房间"],
answer:"窗户"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/house/kitchen.png",
options:["房间","窗户","房子","厨房"],
answer:"厨房"
},

/* AUDIO */

{
type:"audio",
speak:"fángzi",
question:"你听到了哪个词？",
options:["房间","房子","门","窗户"],
answer:"房子"
},

{
type:"audio",
speak:"fángjiān",
question:"你听到了哪个词？",
options:["窗户","房间","厨房","房子"],
answer:"房间"
},

{
type:"audio",
speak:"mén",
question:"你听到了哪个词？",
options:["房子","门","窗户","房间"],
answer:"门"
},

{
type:"audio",
speak:"chuānghu",
question:"你听到了哪个词？",
options:["门","房子","窗户","房间"],
answer:"窗户"
},

{
type:"audio",
speak:"chúfáng",
question:"你听到了哪个词？",
options:["房间","窗户","房子","厨房"],
answer:"厨房"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"这是一个房子",
question:"请组成中文句子：",
text:"این یک خانه است",
words:["房子","一个","这是"],
answer:["这是","一个","房子"]
},

{
type:"build-zh",
speak:"这是一个房间",
question:"请组成中文句子：",
text:"این یک اتاق است",
words:["房间","一个","这是"],
answer:["这是","一个","房间"]
},

{
type:"build-zh",
speak:"这是一个门",
question:"请组成中文句子：",
text:"این یک در است",
words:["门","一个","这是"],
answer:["这是","一个","门"]
},

{
type:"build-zh",
speak:"这是一个窗户",
question:"请组成中文句子：",
text:"این یک پنجره است",
words:["窗户","一个","这是"],
answer:["这是","一个","窗户"]
},

{
type:"build-zh",
speak:"这是一个厨房",
question:"请组成中文句子：",
text:"این یک آشپزخانه است",
words:["厨房","一个","这是"],
answer:["这是","一个","厨房"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"这是一个房子",
question:"ترجمه را بساز:",
text:"这是一个房子",
words:["است","خانه","یک","این"],
answer:["این","یک","خانه","است"]
},

{
type:"build-fa",
speak:"这是一个房间",
question:"ترجمه را بساز:",
text:"这是一个房间",
words:["است","اتاق","یک","این"],
answer:["این","یک","اتاق","است"]
},

{
type:"build-fa",
speak:"这是一个门",
question:"ترجمه را بساز:",
text:"这是一个门",
words:["است","در","یک","این"],
answer:["این","یک","در","است"]
},

{
type:"build-fa",
speak:"这是一个窗户",
question:"ترجمه را بساز:",
text:"这是一个窗户",
words:["است","پنجره","یک","این"],
answer:["این","یک","پنجره","است"]
},

{
type:"build-fa",
speak:"这是一个厨房",
question:"ترجمه را بساز:",
text:"这是一个厨房",
words:["است","آشپزخانه","یک","این"],
answer:["این","یک","آشپزخانه","است"]
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
