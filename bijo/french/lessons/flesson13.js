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
question:"lequel est aujourd'hui ?",
speak:"aujourd'hui",
options:[
{text:"demain",image:"../../media/time/tomorrow.png"},
{text:"aujourd'hui",image:"../../media/time/today.png"},
{text:"hier",image:"../../media/time/yesterday.png"},
{text:"matin",image:"../../media/time/morning.png"}
],
answer:"aujourd'hui"
},

{
type:"image",
question:"lequel est demain ?",
speak:"demain",
options:[
{text:"nuit",image:"../../media/time/night.png"},
{text:"demain",image:"../../media/time/tomorrow.png"},
{text:"aujourd'hui",image:"../../media/time/today.png"},
{text:"hier",image:"../../media/time/yesterday.png"}
],
answer:"demain"
},

{
type:"image",
question:"lequel est hier ?",
speak:"hier",
options:[
{text:"aujourd'hui",image:"../../media/time/today.png"},
{text:"hier",image:"../../media/time/yesterday.png"},
{text:"nuit",image:"../../media/time/night.png"},
{text:"demain",image:"../../media/time/tomorrow.png"}
],
answer:"hier"
},

{
type:"image",
question:"lequel est matin ?",
speak:"matin",
options:[
{text:"hier",image:"../../media/time/yesterday.png"},
{text:"demain",image:"../../media/time/tomorrow.png"},
{text:"matin",image:"../../media/time/morning.png"},
{text:"aujourd'hui",image:"../../media/time/today.png"}
],
answer:"matin"
},

{
type:"image",
question:"lequel est nuit ?",
speak:"nuit",
options:[
{text:"matin",image:"../../media/time/morning.png"},
{text:"aujourd'hui",image:"../../media/time/today.png"},
{text:"demain",image:"../../media/time/tomorrow.png"},
{text:"nuit",image:"../../media/time/night.png"}
],
answer:"nuit"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/time/today.png",
options:["demain","aujourd'hui","hier","matin"],
answer:"aujourd'hui"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/time/tomorrow.png",
options:["nuit","demain","aujourd'hui","hier"],
answer:"demain"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/time/yesterday.png",
options:["aujourd'hui","hier","nuit","demain"],
answer:"hier"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/time/morning.png",
options:["hier","demain","matin","aujourd'hui"],
answer:"matin"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/time/night.png",
options:["matin","aujourd'hui","demain","nuit"],
answer:"nuit"
},

/* AUDIO */

{
type:"audio",
speak:"aujourd'hui",
question:"Quel mot as-tu entendu ?",
options:["demain","aujourd'hui","hier","matin"],
answer:"aujourd'hui"
},

{
type:"audio",
speak:"demain",
question:"Quel mot as-tu entendu ?",
options:["nuit","demain","aujourd'hui","hier"],
answer:"demain"
},

{
type:"audio",
speak:"hier",
question:"Quel mot as-tu entendu ?",
options:["aujourd'hui","hier","nuit","demain"],
answer:"hier"
},

{
type:"audio",
speak:"matin",
question:"Quel mot as-tu entendu ?",
options:["hier","demain","matin","aujourd'hui"],
answer:"matin"
},

{
type:"audio",
speak:"nuit",
question:"Quel mot as-tu entendu ?",
options:["matin","aujourd'hui","demain","nuit"],
answer:"nuit"
},

/* BUILD FR */

{
type:"build-fr",
speak:"Aujourd'hui est lundi",
question:"Construisez la phrase française :",
text:"امروز دوشنبه است",
words:["est","aujourd'hui","lundi"],
answer:["Aujourd'hui","est","lundi"]
},

{
type:"build-fr",
speak:"Demain est mardi",
question:"Construisez la phrase française :",
text:"فردا سه‌شنبه است",
words:["Demain","est","mardi"],
answer:["Demain","est","mardi"]
},

{
type:"build-fr",
speak:"Hier était dimanche",
question:"Construisez la phrase française :",
text:"دیروز یک‌شنبه بود",
words:["était","Hier","dimanche"],
answer:["Hier","était","dimanche"]
},

{
type:"build-fr",
speak:"Bonjour",
question:"Construisez la phrase française :",
text:"صبح بخیر",
words:["Bonjour"],
answer:["Bonjour"]
},

{
type:"build-fr",
speak:"Bonsoir",
question:"Construisez la phrase française :",
text:"شب بخیر",
words:["Bonsoir"],
answer:["Bonsoir"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Aujourd'hui est lundi",
question:"ترجمه را بساز:",
text:"Aujourd'hui est lundi",
words:["است","دوشنبه","امروز"],
answer:["امروز","دوشنبه","است"]
},

{
type:"build-fa",
speak:"Demain est mardi",
question:"ترجمه را بساز:",
text:"Demain est mardi",
words:["است","سه‌شنبه","فردا"],
answer:["فردا","سه‌شنبه","است"]
},

{
type:"build-fa",
speak:"Hier était dimanche",
question:"ترجمه را بساز:",
text:"Hier était dimanche",
words:["بود","یک‌شنبه","دیروز"],
answer:["دیروز","یک‌شنبه","بود"]
},

{
type:"build-fa",
speak:"Bonjour",
question:"ترجمه را بساز:",
text:"Bonjour",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"Bonsoir",
question:"ترجمه را بساز:",
text:"Bonsoir",
words:["بخیر","شب"],
answer:["شب","بخیر"]
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
