let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "fr";
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
question:"lequel est rouge ?",
speak:"rouge",
options:[
{text:"bleu",image:"../../media/colors/blue.png"},
{text:"rouge",image:"../../media/colors/red.png"},
{text:"vert",image:"../../media/colors/green.png"},
{text:"jaune",image:"../../media/colors/yellow.png"}
],
answer:"rouge"
},

{
type:"image",
question:"lequel est bleu ?",
speak:"bleu",
options:[
{text:"jaune",image:"../../media/colors/yellow.png"},
{text:"bleu",image:"../../media/colors/blue.png"},
{text:"noir",image:"../../media/colors/black.png"},
{text:"rouge",image:"../../media/colors/red.png"}
],
answer:"bleu"
},

{
type:"image",
question:"lequel est vert ?",
speak:"vert",
options:[
{text:"rouge",image:"../../media/colors/red.png"},
{text:"vert",image:"../../media/colors/green.png"},
{text:"noir",image:"../../media/colors/black.png"},
{text:"bleu",image:"../../media/colors/blue.png"}
],
answer:"vert"
},

{
type:"image",
question:"lequel est jaune ?",
speak:"jaune",
options:[
{text:"vert",image:"../../media/colors/green.png"},
{text:"bleu",image:"../../media/colors/blue.png"},
{text:"jaune",image:"../../media/colors/yellow.png"},
{text:"rouge",image:"../../media/colors/red.png"}
],
answer:"jaune"
},

{
type:"image",
question:"lequel est noir ?",
speak:"noir",
options:[
{text:"jaune",image:"../../media/colors/yellow.png"},
{text:"rouge",image:"../../media/colors/red.png"},
{text:"bleu",image:"../../media/colors/blue.png"},
{text:"noir",image:"../../media/colors/black.png"}
],
answer:"noir"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/colors/red.png",
options:["bleu","rouge","vert","jaune"],
answer:"rouge"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/colors/blue.png",
options:["jaune","bleu","noir","rouge"],
answer:"bleu"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/colors/green.png",
options:["rouge","vert","noir","bleu"],
answer:"vert"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/colors/yellow.png",
options:["vert","bleu","jaune","rouge"],
answer:"jaune"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/colors/black.png",
options:["jaune","rouge","bleu","noir"],
answer:"noir"
},

/* AUDIO */

{
type:"audio",
speak:"rouge",
question:"Quel mot as-tu entendu ?",
options:["bleu","rouge","vert","jaune"],
answer:"rouge"
},

{
type:"audio",
speak:"bleu",
question:"Quel mot as-tu entendu ?",
options:["jaune","bleu","noir","rouge"],
answer:"bleu"
},

{
type:"audio",
speak:"vert",
question:"Quel mot as-tu entendu ?",
options:["rouge","vert","noir","bleu"],
answer:"vert"
},

{
type:"audio",
speak:"jaune",
question:"Quel mot as-tu entendu ?",
options:["vert","bleu","jaune","rouge"],
answer:"jaune"
},

{
type:"audio",
speak:"noir",
question:"Quel mot as-tu entendu ?",
options:["jaune","rouge","bleu","noir"],
answer:"noir"
},

/* BUILD FR */

{
type:"build-fr",
speak:"C'est rouge",
question:"Construisez la phrase française :",
text:"این قرمز است",
words:["rouge","est","C'est"],
answer:["C'est","rouge"]
},

{
type:"build-fr",
speak:"C'est bleu",
question:"Construisez la phrase française :",
text:"این آبی است",
words:["bleu","est","C'est"],
answer:["C'est","bleu"]
},

{
type:"build-fr",
speak:"C'est vert",
question:"Construisez la phrase française :",
text:"این سبز است",
words:["vert","est","C'est"],
answer:["C'est","vert"]
},

{
type:"build-fr",
speak:"C'est jaune",
question:"Construisez la phrase française :",
text:"این زرد است",
words:["jaune","est","C'est"],
answer:["C'est","jaune"]
},

{
type:"build-fr",
speak:"C'est noir",
question:"Construisez la phrase française :",
text:"این مشکی است",
words:["noir","est","C'est"],
answer:["C'est","noir"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"C'est rouge",
question:"ترجمه را بساز:",
text:"C'est rouge",
words:["است","قرمز","این"],
answer:["این","قرمز","است"]
},

{
type:"build-fa",
speak:"C'est bleu",
question:"ترجمه را بساز:",
text:"C'est bleu",
words:["است","آبی","این"],
answer:["این","آبی","است"]
},

{
type:"build-fa",
speak:"C'est vert",
question:"ترجمه را بساز:",
text:"C'est vert",
words:["است","سبز","این"],
answer:["این","سبز","است"]
},

{
type:"build-fa",
speak:"C'est jaune",
question:"ترجمه را بساز:",
text:"C'est jaune",
words:["است","زرد","این"],
answer:["این","زرد","است"]
},

{
type:"build-fa",
speak:"C'est noir",
question:"ترجمه را بساز:",
text:"C'est noir",
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

 else if (q.type === "build-en" || q.type === "build-fr" || q.type === "build-fa") {
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

  if (q.type === "build-en" || q.type === "build-fr") {
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
