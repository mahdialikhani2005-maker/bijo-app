let current = 0;
let xp = 0;

function speak(text){
  // اگه داخل اپ موبایل (Capacitor) اجرا میشه، از موتور صدای خودِ اندروید استفاده کن
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "en-US",
        rate: 0.9,
        category: "ambient"
      });
    } catch (err) {
      console.warn("خطا در پخش صدا (native):", err);
    }
    return;
  }

  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.9;

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

window.onload = async function() {
  // قبل از هر چیز، اطلاعات واقعی کاربر (قلب، XP) رو از سرور می‌گیریم
  if (typeof initUserData === "function") {
    try {
      await initUserData();
    } catch (err) {
      console.warn("گرفتن اطلاعات کاربر ناموفق بود:", err);
    }
  }

  updateHeartDisplay();

  if (typeof getHearts === "function" && getHearts() <= 0) {
    alert("قلب شما تمام شده است! لطفاً منتظر بمانید یا قلب تهیه کنید.");
    window.location.href = "../home.html";
    return;
  }

  showQuestion();
};

function updateHeartDisplay() {
  const heartElement = document.getElementById("heart-count");
  if (heartElement && typeof getHearts === "function") {
    heartElement.textContent = getHearts();
  }
}

const questions = [

/* IMAGE */

{
type:"image",
question:"head کدام است؟",
speak:"head",
options:[
{text:"hand",image:"../../media/body/hand.webp"},
{text:"head",image:"../../media/body/head.webp"},
{text:"eye",image:"../../media/body/eye.webp"},
{text:"nose",image:"../../media/body/nose.webp"}
],
answer:"head"
},

{
type:"image",
question:"hand کدام است؟",
speak:"hand",
options:[
{text:"eye",image:"../../media/body/eye.webp"},
{text:"hand",image:"../../media/body/hand.webp"},
{text:"foot",image:"../../media/body/foot.webp"},
{text:"head",image:"../../media/body/head.webp"}
],
answer:"hand"
},

{
type:"image",
question:"eye کدام است؟",
speak:"eye",
options:[
{text:"head",image:"../../media/body/head.webp"},
{text:"eye",image:"../../media/body/eye.webp"},
{text:"nose",image:"../../media/body/nose.webp"},
{text:"hand",image:"../../media/body/hand.webp"}
],
answer:"eye"
},

{
type:"image",
question:"foot کدام است؟",
speak:"foot",
options:[
{text:"hand",image:"../../media/body/hand.webp"},
{text:"head",image:"../../media/body/head.webp"},
{text:"foot",image:"../../media/body/foot.webp"},
{text:"eye",image:"../../media/body/eye.webp"}
],
answer:"foot"
},

{
type:"image",
question:"nose کدام است؟",
speak:"nose",
options:[
{text:"eye",image:"../../media/body/eye.webp"},
{text:"nose",image:"../../media/body/nose.webp"},
{text:"head",image:"../../media/body/head.webp"},
{text:"hand",image:"../../media/body/hand.webp"}
],
answer:"nose"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/head.webp",
options:["hand","head","eye","nose"],
answer:"head"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/hand.webp",
options:["eye","hand","foot","head"],
answer:"hand"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/eye.webp",
options:["head","eye","nose","hand"],
answer:"eye"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/foot.webp",
options:["hand","foot","head","eye"],
answer:"foot"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/body/nose.webp",
options:["eye","nose","hand","head"],
answer:"nose"
},

/* AUDIO */

{
type:"audio",
speak:"head",
question:"کدام کلمه را شنیدی؟",
options:["hand","head","eye","nose"],
answer:"head"
},

{
type:"audio",
speak:"hand",
question:"کدام کلمه را شنیدی؟",
options:["eye","hand","foot","head"],
answer:"hand"
},

{
type:"audio",
speak:"eye",
question:"کدام کلمه را شنیدی؟",
options:["head","eye","nose","hand"],
answer:"eye"
},

{
type:"audio",
speak:"foot",
question:"کدام کلمه را شنیدی؟",
options:["hand","foot","head","eye"],
answer:"foot"
},

{
type:"audio",
speak:"nose",
question:"کدام کلمه را شنیدی؟",
options:["eye","nose","hand","head"],
answer:"nose"
},

/* BUILD EN */

{
type:"build-en",
speak:"This is my head",
question:"جمله انگلیسی را بساز:",
text:"این سر من است",
words:["head","is","my","This"],
answer:["This","is","my","head"]
},

{
type:"build-en",
speak:"This is my hand",
question:"جمله انگلیسی را بساز:",
text:"این دست من است",
words:["hand","is","my","This"],
answer:["This","is","my","hand"]
},

{
type:"build-en",
speak:"This is my eye",
question:"جمله انگلیسی را بساز:",
text:"این چشم من است",
words:["eye","is","my","This"],
answer:["This","is","my","eye"]
},

{
type:"build-en",
speak:"This is my foot",
question:"جمله انگلیسی را بساز:",
text:"این پای من است",
words:["foot","is","my","This"],
answer:["This","is","my","foot"]
},

{
type:"build-en",
speak:"This is my nose",
question:"جمله انگلیسی را بساز:",
text:"این بینی من است",
words:["nose","is","my","This"],
answer:["This","is","my","nose"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"This is my head",
question:"ترجمه را بساز:",
text:"This is my head",
words:["است","سر","این","من"],
answer:["این","سر","من","است"]
},

{
type:"build-fa",
speak:"This is my hand",
question:"ترجمه را بساز:",
text:"This is my hand",
words:["است","دست","این","من"],
answer:["این","دست","من","است"]
},

{
type:"build-fa",
speak:"This is my eye",
question:"ترجمه را بساز:",
text:"This is my eye",
words:["است","چشم","این","من"],
answer:["این","چشم","من","است"]
},

{
type:"build-fa",
speak:"This is my foot",
question:"ترجمه را بساز:",
text:"This is my foot",
words:["است","پا","این","من"],
answer:["این","پا","من","است"]
},

{
type:"build-fa",
speak:"This is my nose",
question:"ترجمه را بساز:",
text:"This is my nose",
words:["است","بینی","این","من"],
answer:["این","بینی","من","است"]
}

];


// =====================================
// نمایش سوال
// =====================================

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
  const repeatBtn = document.getElementById("repeat-audio-btn");

  if (repeatBtn) {
    if (q.speak) {
      repeatBtn.style.display = "inline-block";
      repeatBtn.onclick = () => speak(q.speak);
    } else {
      repeatBtn.style.display = "none";
      repeatBtn.onclick = null;
    }
  }

  title.innerText = q.question;
  content.innerHTML = "";
  optionsBox.innerHTML = "";
  wordBuilder.innerHTML = "";
wordBuilder.classList.add("hidden");

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
    content.innerHTML = "";

shuffleArray(q.options).forEach(opt => {
      let b = document.createElement("button");
      b.className = "option";
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
  }

  // BUILD ENGLISH / FA

  else if (q.type === "build-en" || q.type === "build-fa") {
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

  if (q.type === "build-en") {
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

async function safeAddXP(amount) {
  try {
    if (typeof addXP === "function") {
      await addXP(amount);
    }
  } catch (err) {
    console.warn("ثبت XP رو سرور ناموفق بود (آفلاین یا خطای شبکه):", err);
  }
}

async function safeLoseHeart() {
  try {
    if (typeof loseHeart === "function") {
      await loseHeart();
    }
  } catch (err) {
    console.warn("کم کردن قلب رو سرور ناموفق بود (آفلاین یا خطای شبکه):", err);
  }
}

async function checkBuild(selected, correct) {
  const s = selected.map(w => w.trim().toLowerCase());
  const c = correct.map(w => w.trim().toLowerCase());

  if (JSON.stringify(s) === JSON.stringify(c)) {
    xp += 5;

    await safeAddXP(5);

    current++;
    showQuestion();
  } else {
    alert("اشتباه بود! دوباره تلاش کن.");

    await safeLoseHeart();

    updateHeartDisplay();

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

    await safeAddXP(5);

    current++;
    showQuestion();
  } else {
    alert("اشتباه بود! دوباره تلاش کن.");

    await safeLoseHeart();

    updateHeartDisplay();

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