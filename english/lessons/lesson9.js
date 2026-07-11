let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
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
question:"sun کدام است؟",
speak:"sun",
options:[
{text:"moon",image:"../../media/nature/moon.png"},
{text:"sun",image:"../../media/nature/sun.png"},
{text:"star",image:"../../media/nature/star.png"},
{text:"sky",image:"../../media/nature/sky.png"}
],
answer:"sun"
},

{
type:"image",
question:"moon کدام است؟",
speak:"moon",
options:[
{text:"star",image:"../../media/nature/star.png"},
{text:"moon",image:"../../media/nature/moon.png"},
{text:"rain",image:"../../media/nature/rain.png"},
{text:"sun",image:"../../media/nature/sun.png"}
],
answer:"moon"
},

{
type:"image",
question:"star کدام است؟",
speak:"star",
options:[
{text:"sun",image:"../../media/nature/sun.png"},
{text:"star",image:"../../media/nature/star.png"},
{text:"rain",image:"../../media/nature/rain.png"},
{text:"moon",image:"../../media/nature/moon.png"}
],
answer:"star"
},

{
type:"image",
question:"sky کدام است؟",
speak:"sky",
options:[
{text:"star",image:"../../media/nature/star.png"},
{text:"moon",image:"../../media/nature/moon.png"},
{text:"sky",image:"../../media/nature/sky.png"},
{text:"sun",image:"../../media/nature/sun.png"}
],
answer:"sky"
},

{
type:"image",
question:"rain کدام است؟",
speak:"rain",
options:[
{text:"sky",image:"../../media/nature/sky.png"},
{text:"sun",image:"../../media/nature/sun.png"},
{text:"moon",image:"../../media/nature/moon.png"},
{text:"rain",image:"../../media/nature/rain.png"}
],
answer:"rain"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sun.png",
options:["moon","sun","star","sky"],
answer:"sun"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/moon.png",
options:["star","moon","rain","sun"],
answer:"moon"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/star.png",
options:["sun","star","rain","moon"],
answer:"star"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/sky.png",
options:["star","moon","sky","sun"],
answer:"sky"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/nature/rain.png",
options:["sky","sun","moon","rain"],
answer:"rain"
},

/* AUDIO */

{
type:"audio",
speak:"sun",
question:"کدام کلمه را شنیدی؟",
options:["moon","sun","star","sky"],
answer:"sun"
},

{
type:"audio",
speak:"moon",
question:"کدام کلمه را شنیدی؟",
options:["star","moon","rain","sun"],
answer:"moon"
},

{
type:"audio",
speak:"star",
question:"کدام کلمه را شنیدی؟",
options:["sun","star","rain","moon"],
answer:"star"
},

{
type:"audio",
speak:"sky",
question:"کدام کلمه را شنیدی؟",
options:["star","moon","sky","sun"],
answer:"sky"
},

{
type:"audio",
speak:"rain",
question:"کدام کلمه را شنیدی؟",
options:["sky","sun","moon","rain"],
answer:"rain"
},

/* BUILD EN */

{
type:"build-en",
speak:"The sun is big",
question:"جمله انگلیسی را بساز:",
text:"خورشید بزرگ است",
words:["sun","big","is","The"],
answer:["The","sun","is","big"]
},

{
type:"build-en",
speak:"The moon is small",
question:"جمله انگلیسی را بساز:",
text:"ماه کوچک است",
words:["moon","small","is","The"],
answer:["The","moon","is","small"]
},

{
type:"build-en",
speak:"The star is bright",
question:"جمله انگلیسی را بساز:",
text:"ستاره درخشان است",
words:["star","bright","is","The"],
answer:["The","star","is","bright"]
},

{
type:"build-en",
speak:"The sky is blue",
question:"جمله انگلیسی را بساز:",
text:"آسمان آبی است",
words:["sky","blue","is","The"],
answer:["The","sky","is","blue"]
},

{
type:"build-en",
speak:"The rain is cold",
question:"جمله انگلیسی را بساز:",
text:"باران سرد است",
words:["rain","cold","is","The"],
answer:["The","rain","is","cold"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"The sun is big",
question:"ترجمه را بساز:",
text:"The sun is big",
words:["است","بزرگ","خورشید"],
answer:["خورشید","بزرگ","است"]
},

{
type:"build-fa",
speak:"The moon is small",
question:"ترجمه را بساز:",
text:"The moon is small",
words:["است","کوچک","ماه"],
answer:["ماه","کوچک","است"]
},

{
type:"build-fa",
speak:"The star is bright",
question:"ترجمه را بساز:",
text:"The star is bright",
words:["است","درخشان","ستاره"],
answer:["ستاره","درخشان","است"]
},

{
type:"build-fa",
speak:"The sky is blue",
question:"ترجمه را بساز:",
text:"The sky is blue",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"The rain is cold",
question:"ترجمه را بساز:",
text:"The rain is cold",
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
