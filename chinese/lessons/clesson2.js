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
question:"哪个是头 ？",
speak:"tóu",
options:[
{text:"手",image:"../../media/body/hand.png"},
{text:"头",image:"../../media/body/head.png"},
{text:"眼睛",image:"../../media/body/eye.png"},
{text:"鼻子",image:"../../media/body/nose.png"}
],
answer:"头"
},

{
type:"image",
question:"哪个是手 ？",
speak:"shǒu",
options:[
{text:"眼睛",image:"../../media/body/eye.png"},
{text:"手",image:"../../media/body/hand.png"},
{text:"脚",image:"../../media/body/foot.png"},
{text:"头",image:"../../media/body/head.png"}
],
answer:"手"
},

{
type:"image",
question:"哪个是眼睛 ？",
speak:"yǎnjīng",
options:[
{text:"头",image:"../../media/body/head.png"},
{text:"眼睛",image:"../../media/body/eye.png"},
{text:"鼻子",image:"../../media/body/nose.png"},
{text:"手",image:"../../media/body/hand.png"}
],
answer:"眼睛"
},

{
type:"image",
question:"哪个是脚 ？",
speak:"jiǎo",
options:[
{text:"手",image:"../../media/body/hand.png"},
{text:"头",image:"../../media/body/head.png"},
{text:"脚",image:"../../media/body/foot.png"},
{text:"眼睛",image:"../../media/body/eye.png"}
],
answer:"脚"
},

{
type:"image",
question:"哪个是鼻子 ？",
speak:"bízi",
options:[
{text:"眼睛",image:"../../media/body/eye.png"},
{text:"鼻子",image:"../../media/body/nose.png"},
{text:"头",image:"../../media/body/head.png"},
{text:"手",image:"../../media/body/hand.png"}
],
answer:"鼻子"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/body/head.png",
options:["手","头","眼睛","鼻子"],
answer:"头"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/body/hand.png",
options:["眼睛","手","脚","头"],
answer:"手"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/body/eye.png",
options:["头","眼睛","鼻子","手"],
answer:"眼睛"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/body/foot.png",
options:["手","脚","头","眼睛"],
answer:"脚"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/body/nose.png",
options:["眼睛","鼻子","手","头"],
answer:"鼻子"
},

/* AUDIO */

{
type:"audio",
speak:"tóu",
question:"你听到了哪个词？",
options:["手","头","眼睛","鼻子"],
answer:"头"
},

{
type:"audio",
speak:"shǒu",
question:"你听到了哪个词？",
options:["眼睛","手","脚","头"],
answer:"手"
},

{
type:"audio",
speak:"yǎnjīng",
question:"你听到了哪个词？",
options:["头","眼睛","鼻子","手"],
answer:"眼睛"
},

{
type:"audio",
speak:"jiǎo",
question:"你听到了哪个词？",
options:["手","脚","头","眼睛"],
answer:"脚"
},

{
type:"audio",
speak:"bízi",
question:"你听到了哪个词？",
options:["眼睛","鼻子","手","头"],
answer:"鼻子"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"这是我的头",
question:"请组成中文句子：",
text:"این سر من است",
words:["头","我的","这是"],
answer:["这是","我的","头"]
},

{
type:"build-zh",
speak:"这是我的手",
question:"请组成中文句子：",
text:"این دست من است",
words:["手","我的","这是"],
answer:["这是","我的","手"]
},

{
type:"build-zh",
speak:"这是我的眼睛",
question:"请组成中文句子：",
text:"این چشم من است",
words:["眼睛","我的","这是"],
answer:["这是","我的","眼睛"]
},

{
type:"build-zh",
speak:"这是我的脚",
question:"请组成中文句子：",
text:"این پای من است",
words:["脚","我的","这是"],
answer:["这是","我的","脚"]
},

{
type:"build-zh",
speak:"这是我的鼻子",
question:"请组成中文句子：",
text:"این بینی من است",
words:["鼻子","我的","这是"],
answer:["这是","我的","鼻子"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"这是我的头",
question:"ترجمه را بساز:",
text:"这是我的头",
words:["است","سر","این","من"],
answer:["این","سر","من","است"]
},

{
type:"build-fa",
speak:"这是我的手",
question:"ترجمه را بساز:",
text:"这是我的手",
words:["است","دست","این","من"],
answer:["این","دست","من","است"]
},

{
type:"build-fa",
speak:"这是我的眼睛",
question:"ترجمه را بساز:",
text:"这是我的眼睛",
words:["است","چشم","این","من"],
answer:["این","چشم","من","است"]
},

{
type:"build-fa",
speak:"这是我的脚",
question:"ترجمه را بساز:",
text:"这是我的脚",
words:["است","پا","این","من"],
answer:["این","پا","من","است"]
},

{
type:"build-fa",
speak:"这是我的鼻子",
question:"ترجمه را بساز:",
text:"这是我的鼻子",
words:["است","بینی","این","من"],
answer:["این","بینی","من","است"]
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
