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
question:"哪个是开心 ？",
speak:"kāixīn",
options:[
{text:"难过",image:"../../media/feelings/sad.png"},
{text:"开心",image:"../../media/feelings/happy.png"},
{text:"生气",image:"../../media/feelings/angry.png"},
{text:"累",image:"../../media/feelings/tired.png"}
],
answer:"开心"
},

{
type:"image",
question:"哪个是难过 ？",
speak:"nánguò",
options:[
{text:"累",image:"../../media/feelings/tired.png"},
{text:"难过",image:"../../media/feelings/sad.png"},
{text:"饿",image:"../../media/feelings/hungry.png"},
{text:"开心",image:"../../media/feelings/happy.png"}
],
answer:"难过"
},

{
type:"image",
question:"哪个是生气 ？",
speak:"shēngqì",
options:[
{text:"开心",image:"../../media/feelings/happy.png"},
{text:"生气",image:"../../media/feelings/angry.png"},
{text:"饿",image:"../../media/feelings/hungry.png"},
{text:"难过",image:"../../media/feelings/sad.png"}
],
answer:"生气"
},

{
type:"image",
question:"哪个是累 ？",
speak:"lèi",
options:[
{text:"生气",image:"../../media/feelings/angry.png"},
{text:"难过",image:"../../media/feelings/sad.png"},
{text:"累",image:"../../media/feelings/tired.png"},
{text:"开心",image:"../../media/feelings/happy.png"}
],
answer:"累"
},

{
type:"image",
question:"哪个是饿 ？",
speak:"è",
options:[
{text:"累",image:"../../media/feelings/tired.png"},
{text:"开心",image:"../../media/feelings/happy.png"},
{text:"难过",image:"../../media/feelings/sad.png"},
{text:"饿",image:"../../media/feelings/hungry.png"}
],
answer:"饿"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/feelings/happy.png",
options:["难过","开心","生气","累"],
answer:"开心"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/feelings/sad.png",
options:["累","难过","饿","开心"],
answer:"难过"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/feelings/angry.png",
options:["开心","生气","饿","难过"],
answer:"生气"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/feelings/tired.png",
options:["生气","难过","累","开心"],
answer:"累"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/feelings/hungry.png",
options:["累","开心","难过","饿"],
answer:"饿"
},

/* AUDIO */

{
type:"audio",
speak:"kāixīn",
question:"你听到了哪个词？",
options:["难过","开心","生气","累"],
answer:"开心"
},

{
type:"audio",
speak:"nánguò",
question:"你听到了哪个词？",
options:["累","难过","饿","开心"],
answer:"难过"
},

{
type:"audio",
speak:"shēngqì",
question:"你听到了哪个词？",
options:["开心","生气","饿","难过"],
answer:"生气"
},

{
type:"audio",
speak:"lèi",
question:"你听到了哪个词？",
options:["生气","难过","累","开心"],
answer:"累"
},

{
type:"audio",
speak:"è",
question:"你听到了哪个词？",
options:["累","开心","难过","饿"],
answer:"饿"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"我开心",
question:"请组成中文句子：",
text:"من خوشحال هستم",
words:["开心","我"],
answer:["我","开心"]
},

{
type:"build-zh",
speak:"我难过",
question:"请组成中文句子：",
text:"من ناراحت هستم",
words:["难过","我"],
answer:["我","难过"]
},

{
type:"build-zh",
speak:"我生气",
question:"请组成中文句子：",
text:"من عصبانی هستم",
words:["生气","我"],
answer:["我","生气"]
},

{
type:"build-zh",
speak:"我累",
question:"请组成中文句子：",
text:"من خسته هستم",
words:["累","我"],
answer:["我","累"]
},

{
type:"build-zh",
speak:"我饿",
question:"请组成中文句子：",
text:"من گرسنه هستم",
words:["饿","我"],
answer:["我","饿"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"我开心",
question:"ترجمه را بساز:",
text:"我开心",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"我难过",
question:"ترجمه را بساز:",
text:"我难过",
words:["هستم","ناراحت","من"],
answer:["من","ناراحت","هستم"]
},

{
type:"build-fa",
speak:"我生气",
question:"ترجمه را بساز:",
text:"我生气",
words:["هستم","عصبانی","من"],
answer:["من","عصبانی","هستم"]
},

{
type:"build-fa",
speak:"我累",
question:"ترجمه را بساز:",
text:"我累",
words:["هستم","خسته","من"],
answer:["من","خسته","هستم"]
},

{
type:"build-fa",
speak:"我饿",
question:"ترجمه را بساز:",
text:"我饿",
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
