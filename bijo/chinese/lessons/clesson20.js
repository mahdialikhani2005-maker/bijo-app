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
question:"哪个是谁 ？",
speak:"shéi",
options:[
{text:"什么",image:"../../media/questions/what.png"},
{text:"谁",image:"../../media/questions/who.png"},
{text:"哪里",image:"../../media/questions/where.png"},
{text:"什么时候",image:"../../media/questions/when.png"}
],
answer:"谁"
},

{
type:"image",
question:"哪个是什么 ？",
speak:"shénme",
options:[
{text:"为什么",image:"../../media/questions/why.png"},
{text:"什么",image:"../../media/questions/what.png"},
{text:"谁",image:"../../media/questions/who.png"},
{text:"哪里",image:"../../media/questions/where.png"}
],
answer:"什么"
},

{
type:"image",
question:"哪个是哪里 ？",
speak:"nǎlǐ",
options:[
{text:"什么",image:"../../media/questions/what.png"},
{text:"哪里",image:"../../media/questions/where.png"},
{text:"为什么",image:"../../media/questions/why.png"},
{text:"谁",image:"../../media/questions/who.png"}
],
answer:"哪里"
},

{
type:"image",
question:"哪个是什么时候 ？",
speak:"shénme shíhou",
options:[
{text:"哪里",image:"../../media/questions/where.png"},
{text:"谁",image:"../../media/questions/who.png"},
{text:"什么时候",image:"../../media/questions/when.png"},
{text:"什么",image:"../../media/questions/what.png"}
],
answer:"什么时候"
},

{
type:"image",
question:"哪个是为什么 ？",
speak:"wèishénme",
options:[
{text:"什么时候",image:"../../media/questions/when.png"},
{text:"什么",image:"../../media/questions/what.png"},
{text:"谁",image:"../../media/questions/who.png"},
{text:"为什么",image:"../../media/questions/why.png"}
],
answer:"为什么"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/questions/who.png",
options:["什么","谁","哪里","什么时候"],
answer:"谁"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/questions/what.png",
options:["为什么","什么","谁","哪里"],
answer:"什么"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/questions/where.png",
options:["什么","哪里","为什么","谁"],
answer:"哪里"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/questions/when.png",
options:["哪里","谁","什么时候","什么"],
answer:"什么时候"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/questions/why.png",
options:["什么时候","什么","谁","为什么"],
answer:"为什么"
},

/* AUDIO */

{
type:"audio",
speak:"shéi",
question:"你听到了哪个词？",
options:["什么","谁","哪里","什么时候"],
answer:"谁"
},

{
type:"audio",
speak:"shénme",
question:"你听到了哪个词？",
options:["为什么","什么","谁","哪里"],
answer:"什么"
},

{
type:"audio",
speak:"nǎlǐ",
question:"你听到了哪个词？",
options:["什么","哪里","为什么","谁"],
answer:"哪里"
},

{
type:"audio",
speak:"shénme shíhou",
question:"你听到了哪个词？",
options:["哪里","谁","什么时候","什么"],
answer:"什么时候"
},

{
type:"audio",
speak:"wèishénme",
question:"你听到了哪个词？",
options:["什么时候","什么","谁","为什么"],
answer:"为什么"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"她是谁？",
question:"请组成中文句子：",
text:"او کیست؟",
words:["她","是","谁"],
answer:["她","是","谁？"]
},

{
type:"build-zh",
speak:"这是什么？",
question:"请组成中文句子：",
text:"این چیست؟",
words:["这","是","什么"],
answer:["这","是","什么？"]
},

{
type:"build-zh",
speak:"学校在哪里？",
question:"请组成中文句子：",
text:"مدرسه کجاست؟",
words:["学校","在","哪里"],
answer:["学校","在","哪里？"]
},

{
type:"build-zh",
speak:"课是什么时候？",
question:"请组成中文句子：",
text:"کلاس کی است؟",
words:["课","是","什么时候"],
answer:["课","是","什么时候？"]
},

{
type:"build-zh",
speak:"你为什么开心？",
question:"请组成中文句子：",
text:"چرا خوشحالی؟",
words:["你","为什么","开心"],
answer:["你","为什么","开心？"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"她是谁？",
question:"ترجمه را بساز:",
text:"她是谁？",
words:["کیست","او"],
answer:["او","کیست؟"]
},

{
type:"build-fa",
speak:"这是什么？",
question:"ترجمه را بساز:",
text:"这是什么？",
words:["چیست","این"],
answer:["این","چیست؟"]
},

{
type:"build-fa",
speak:"学校在哪里？",
question:"ترجمه را بساز:",
text:"学校在哪里？",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست؟"]
},

{
type:"build-fa",
speak:"课是什么时候？",
question:"ترجمه را بساز:",
text:"课是什么时候？",
words:["کیست","کلاس"],
answer:["کلاس","کیست؟"]
},

{
type:"build-fa",
speak:"你为什么开心？",
question:"ترجمه را بساز:",
text:"你为什么开心？",
words:["چرا","خوشحال","تو","هستی"],
answer:["تو","چرا","خوشحال","هستی؟"]
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
