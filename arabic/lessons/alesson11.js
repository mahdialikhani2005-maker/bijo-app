let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar";
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
question:"أي منها أحمر ؟",
speak:"أحمر",
options:[
{text:"أزرق",image:"../../media/colors/blue.png"},
{text:"أحمر",image:"../../media/colors/red.png"},
{text:"أخضر",image:"../../media/colors/green.png"},
{text:"أصفر",image:"../../media/colors/yellow.png"}
],
answer:"أحمر"
},

{
type:"image",
question:"أي منها أزرق ؟",
speak:"أزرق",
options:[
{text:"أصفر",image:"../../media/colors/yellow.png"},
{text:"أزرق",image:"../../media/colors/blue.png"},
{text:"أسود",image:"../../media/colors/black.png"},
{text:"أحمر",image:"../../media/colors/red.png"}
],
answer:"أزرق"
},

{
type:"image",
question:"أي منها أخضر ؟",
speak:"أخضر",
options:[
{text:"أحمر",image:"../../media/colors/red.png"},
{text:"أخضر",image:"../../media/colors/green.png"},
{text:"أسود",image:"../../media/colors/black.png"},
{text:"أزرق",image:"../../media/colors/blue.png"}
],
answer:"أخضر"
},

{
type:"image",
question:"أي منها أصفر ؟",
speak:"أصفر",
options:[
{text:"أخضر",image:"../../media/colors/green.png"},
{text:"أزرق",image:"../../media/colors/blue.png"},
{text:"أصفر",image:"../../media/colors/yellow.png"},
{text:"أحمر",image:"../../media/colors/red.png"}
],
answer:"أصفر"
},

{
type:"image",
question:"أي منها أسود ؟",
speak:"أسود",
options:[
{text:"أصفر",image:"../../media/colors/yellow.png"},
{text:"أحمر",image:"../../media/colors/red.png"},
{text:"أزرق",image:"../../media/colors/blue.png"},
{text:"أسود",image:"../../media/colors/black.png"}
],
answer:"أسود"
},

/* WORD */

{
type:"word",
question:"ما هذا اللون؟",
image:"../../media/colors/red.png",
options:["أزرق","أحمر","أخضر","أصفر"],
answer:"أحمر"
},

{
type:"word",
question:"ما هذا اللون؟",
image:"../../media/colors/blue.png",
options:["أصفر","أزرق","أسود","أحمر"],
answer:"أزرق"
},

{
type:"word",
question:"ما هذا اللون؟",
image:"../../media/colors/green.png",
options:["أحمر","أخضر","أسود","أزرق"],
answer:"أخضر"
},

{
type:"word",
question:"ما هذا اللون؟",
image:"../../media/colors/yellow.png",
options:["أخضر","أزرق","أصفر","أحمر"],
answer:"أصفر"
},

{
type:"word",
question:"ما هذا اللون؟",
image:"../../media/colors/black.png",
options:["أصفر","أحمر","أزرق","أسود"],
answer:"أسود"
},

/* AUDIO */

{
type:"audio",
speak:"أحمر",
question:"أي كلمة سمعت؟",
options:["أزرق","أحمر","أخضر","أصفر"],
answer:"أحمر"
},

{
type:"audio",
speak:"أزرق",
question:"أي كلمة سمعت؟",
options:["أصفر","أزرق","أسود","أحمر"],
answer:"أزرق"
},

{
type:"audio",
speak:"أخضر",
question:"أي كلمة سمعت؟",
options:["أحمر","أخضر","أسود","أزرق"],
answer:"أخضر"
},

{
type:"audio",
speak:"أصفر",
question:"أي كلمة سمعت؟",
options:["أخضر","أزرق","أصفر","أحمر"],
answer:"أصفر"
},

{
type:"audio",
speak:"أسود",
question:"أي كلمة سمعت؟",
options:["أصفر","أحمر","أزرق","أسود"],
answer:"أسود"
},

/* BUILD AR */

{
type:"build-ar",
speak:"هذا أحمر",
question:"قم بتكوين الجملة العربية:",
text:"این قرمز است",
words:["أحمر","هذا"],
answer:["هذا","أحمر"]
},

{
type:"build-ar",
speak:"هذا أزرق",
question:"قم بتكوين الجملة العربية:",
text:"این آبی است",
words:["أزرق","هذا"],
answer:["هذا","أزرق"]
},

{
type:"build-ar",
speak:"هذا أخضر",
question:"قم بتكوين الجملة العربية:",
text:"این سبز است",
words:["أخضر","هذا"],
answer:["هذا","أخضر"]
},

{
type:"build-ar",
speak:"هذا أصفر",
question:"قم بتكوين الجملة العربية:",
text:"این زرد است",
words:["أصفر","هذا"],
answer:["هذا","أصفر"]
},

{
type:"build-ar",
speak:"هذا أسود",
question:"قم بتكوين الجملة العربية:",
text:"این مشکی است",
words:["أسود","هذا"],
answer:["هذا","أسود"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"هذا أحمر",
question:"ترجمه را بساز:",
text:"هذا أحمر",
words:["است","قرمز","این"],
answer:["این","قرمز","است"]
},

{
type:"build-fa",
speak:"هذا أزرق",
question:"ترجمه را بساز:",
text:"هذا أزرق",
words:["است","آبی","این"],
answer:["این","آبی","است"]
},

{
type:"build-fa",
speak:"هذا أخضر",
question:"ترجمه را بساز:",
text:"هذا أخضر",
words:["است","سبز","این"],
answer:["این","سبز","است"]
},

{
type:"build-fa",
speak:"هذا أصفر",
question:"ترجمه را بساز:",
text:"هذا أصفر",
words:["است","زرد","این"],
answer:["این","زرد","است"]
},

{
type:"build-fa",
speak:"هذا أسود",
question:"ترجمه را بساز:",
text:"هذا أسود",
words:["است","مشکی","این"],
answer:["این","مشکی","است"]
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

  else if (q.type === "build-en" || q.type === "build-fa" || q.type === "build-ar") {
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

if (q.type === "build-en" || q.type === "build-ar") {
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
