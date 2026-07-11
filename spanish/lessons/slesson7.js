let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
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
question:"¿cuál es tomate ?",
speak:"tomate",
options:[
{text:"papa",image:"../../media/vegetables/potato.png"},
{text:"tomate",image:"../../media/vegetables/tomato.png"},
{text:"zanahoria",image:"../../media/vegetables/carrot.png"},
{text:"cebolla",image:"../../media/vegetables/onion.png"}
],
answer:"tomate"
},

{
type:"image",
question:"¿cuál es papa ?",
speak:"papa",
options:[
{text:"cebolla",image:"../../media/vegetables/onion.png"},
{text:"papa",image:"../../media/vegetables/potato.png"},
{text:"pepino",image:"../../media/vegetables/cucumber.png"},
{text:"tomate",image:"../../media/vegetables/tomato.png"}
],
answer:"papa"
},

{
type:"image",
question:"¿cuál es zanahoria ?",
speak:"zanahoria",
options:[
{text:"tomate",image:"../../media/vegetables/tomato.png"},
{text:"zanahoria",image:"../../media/vegetables/carrot.png"},
{text:"pepino",image:"../../media/vegetables/cucumber.png"},
{text:"papa",image:"../../media/vegetables/potato.png"}
],
answer:"zanahoria"
},

{
type:"image",
question:"¿cuál es cebolla ?",
speak:"cebolla",
options:[
{text:"zanahoria",image:"../../media/vegetables/carrot.png"},
{text:"papa",image:"../../media/vegetables/potato.png"},
{text:"cebolla",image:"../../media/vegetables/onion.png"},
{text:"tomate",image:"../../media/vegetables/tomato.png"}
],
answer:"cebolla"
},

{
type:"image",
question:"¿cuál es pepino ?",
speak:"pepino",
options:[
{text:"cebolla",image:"../../media/vegetables/onion.png"},
{text:"tomate",image:"../../media/vegetables/tomato.png"},
{text:"papa",image:"../../media/vegetables/potato.png"},
{text:"pepino",image:"../../media/vegetables/cucumber.png"}
],
answer:"pepino"
},

/* WORD */

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/vegetables/tomato.png",
options:["papa","tomate","zanahoria","cebolla"],
answer:"tomate"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/vegetables/potato.png",
options:["cebolla","papa","pepino","tomate"],
answer:"papa"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/vegetables/carrot.png",
options:["tomate","zanahoria","pepino","papa"],
answer:"zanahoria"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/vegetables/onion.png",
options:["zanahoria","papa","cebolla","tomate"],
answer:"cebolla"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/vegetables/cucumber.png",
options:["cebolla","tomate","papa","pepino"],
answer:"pepino"
},

/* AUDIO */

{
type:"audio",
speak:"tomate",
question:"¿Qué palabra escuchaste?",
options:["papa","tomate","zanahoria","cebolla"],
answer:"tomate"
},

{
type:"audio",
speak:"papa",
question:"¿Qué palabra escuchaste?",
options:["cebolla","papa","pepino","tomate"],
answer:"papa"
},

{
type:"audio",
speak:"zanahoria",
question:"¿Qué palabra escuchaste?",
options:["tomate","zanahoria","pepino","papa"],
answer:"zanahoria"
},

{
type:"audio",
speak:"cebolla",
question:"¿Qué palabra escuchaste?",
options:["zanahoria","papa","cebolla","tomate"],
answer:"cebolla"
},

{
type:"audio",
speak:"pepino",
question:"¿Qué palabra escuchaste?",
options:["cebolla","tomate","papa","pepino"],
answer:"pepino"
},

/* BUILD ES */

{
type:"build-es",
speak:"Este es un tomate",
question:"Construya la frase en español:",
text:"این یک گوجه است",
words:["tomate","un","es","Este"],
answer:["Este","es","un","tomate"]
},

{
type:"build-es",
speak:"Esta es una papa",
question:"Construya la frase en español:",
text:"این یک سیب‌زمینی است",
words:["papa","una","es","Esta"],
answer:["Esta","es","una","papa"]
},

{
type:"build-es",
speak:"Esta es una zanahoria",
question:"Construya la frase en español:",
text:"این یک هویج است",
words:["zanahoria","una","es","Esta"],
answer:["Esta","es","una","zanahoria"]
},

{
type:"build-es",
speak:"Esta es una cebolla",
question:"Construya la frase en español:",
text:"این یک پیاز است",
words:["cebolla","una","es","Esta"],
answer:["Esta","es","una","cebolla"]
},

{
type:"build-es",
speak:"Este es un pepino",
question:"Construya la frase en español:",
text:"این یک خیار است",
words:["pepino","un","es","Este"],
answer:["Este","es","un","pepino"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Este es un tomate",
question:"ترجمه را بساز:",
text:"Este es un tomate",
words:["است","گوجه","یک","این"],
answer:["این","یک","گوجه","است"]
},

{
type:"build-fa",
speak:"Esta es una papa",
question:"ترجمه را بساز:",
text:"Esta es una papa",
words:["است","سیب‌زمینی","یک","این"],
answer:["این","یک","سیب‌زمینی","است"]
},

{
type:"build-fa",
speak:"Esta es una zanahoria",
question:"ترجمه را بساز:",
text:"Esta es una zanahoria",
words:["است","هویج","یک","این"],
answer:["این","یک","هویج","است"]
},

{
type:"build-fa",
speak:"Esta es una cebolla",
question:"ترجمه را بساز:",
text:"Esta es una cebolla",
words:["است","پیاز","یک","این"],
answer:["این","یک","پیاز","است"]
},

{
type:"build-fa",
speak:"Este es un pepino",
question:"ترجمه را بساز:",
text:"Este es un pepino",
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
