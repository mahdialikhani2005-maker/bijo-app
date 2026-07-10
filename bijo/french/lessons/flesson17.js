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
question:"lequel est heureux ?",
speak:"heureux",
options:[
{text:"triste",image:"../../media/feelings/sad.png"},
{text:"heureux",image:"../../media/feelings/happy.png"},
{text:"fâché",image:"../../media/feelings/angry.png"},
{text:"fatigué",image:"../../media/feelings/tired.png"}
],
answer:"heureux"
},

{
type:"image",
question:"lequel est triste ?",
speak:"triste",
options:[
{text:"fatigué",image:"../../media/feelings/tired.png"},
{text:"triste",image:"../../media/feelings/sad.png"},
{text:"affamé",image:"../../media/feelings/hungry.png"},
{text:"heureux",image:"../../media/feelings/happy.png"}
],
answer:"triste"
},

{
type:"image",
question:"lequel est fâché ?",
speak:"fâché",
options:[
{text:"heureux",image:"../../media/feelings/happy.png"},
{text:"fâché",image:"../../media/feelings/angry.png"},
{text:"affamé",image:"../../media/feelings/hungry.png"},
{text:"triste",image:"../../media/feelings/sad.png"}
],
answer:"fâché"
},

{
type:"image",
question:"lequel est fatigué ?",
speak:"fatigué",
options:[
{text:"fâché",image:"../../media/feelings/angry.png"},
{text:"triste",image:"../../media/feelings/sad.png"},
{text:"fatigué",image:"../../media/feelings/tired.png"},
{text:"heureux",image:"../../media/feelings/happy.png"}
],
answer:"fatigué"
},

{
type:"image",
question:"lequel est affamé ?",
speak:"affamé",
options:[
{text:"fatigué",image:"../../media/feelings/tired.png"},
{text:"heureux",image:"../../media/feelings/happy.png"},
{text:"triste",image:"../../media/feelings/sad.png"},
{text:"affamé",image:"../../media/feelings/hungry.png"}
],
answer:"affamé"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/feelings/happy.png",
options:["triste","heureux","fâché","fatigué"],
answer:"heureux"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/feelings/sad.png",
options:["fatigué","triste","affamé","heureux"],
answer:"triste"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/feelings/angry.png",
options:["heureux","fâché","affamé","triste"],
answer:"fâché"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/feelings/tired.png",
options:["fâché","triste","fatigué","heureux"],
answer:"fatigué"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/feelings/hungry.png",
options:["fatigué","heureux","triste","affamé"],
answer:"affamé"
},

/* AUDIO */

{
type:"audio",
speak:"heureux",
question:"Quel mot as-tu entendu ?",
options:["triste","heureux","fâché","fatigué"],
answer:"heureux"
},

{
type:"audio",
speak:"triste",
question:"Quel mot as-tu entendu ?",
options:["fatigué","triste","affamé","heureux"],
answer:"triste"
},

{
type:"audio",
speak:"fâché",
question:"Quel mot as-tu entendu ?",
options:["heureux","fâché","affamé","triste"],
answer:"fâché"
},

{
type:"audio",
speak:"fatigué",
question:"Quel mot as-tu entendu ?",
options:["fâché","triste","fatigué","heureux"],
answer:"fatigué"
},

{
type:"audio",
speak:"affamé",
question:"Quel mot as-tu entendu ?",
options:["fatigué","heureux","triste","affamé"],
answer:"affamé"
},

/* BUILD FR */

{
type:"build-fr",
speak:"Je suis heureux",
question:"Construisez la phrase française :",
text:"من خوشحال هستم",
words:["heureux","suis","Je"],
answer:["Je","suis","heureux"]
},

{
type:"build-fr",
speak:"Je suis triste",
question:"Construisez la phrase française :",
text:"من ناراحت هستم",
words:["triste","suis","Je"],
answer:["Je","suis","triste"]
},

{
type:"build-fr",
speak:"Je suis fâché",
question:"Construisez la phrase française :",
text:"من عصبانی هستم",
words:["fâché","suis","Je"],
answer:["Je","suis","fâché"]
},

{
type:"build-fr",
speak:"Je suis fatigué",
question:"Construisez la phrase française :",
text:"من خسته هستم",
words:["fatigué","suis","Je"],
answer:["Je","suis","fatigué"]
},

{
type:"build-fr",
speak:"J'ai faim",
question:"Construisez la phrase française :",
text:"من گرسنه هستم",
words:["faim","ai","J'"],
answer:["J'","ai","faim"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Je suis heureux",
question:"ترجمه را بساز:",
text:"Je suis heureux",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"Je suis triste",
question:"ترجمه را بساز:",
text:"Je suis triste",
words:["هستم","ناراحت","من"],
answer:["من","ناراحت","هستم"]
},

{
type:"build-fa",
speak:"Je suis fâché",
question:"ترجمه را بساز:",
text:"Je suis fâché",
words:["هستم","عصبانی","من"],
answer:["من","عصبانی","هستم"]
},

{
type:"build-fa",
speak:"Je suis fatigué",
question:"ترجمه را بساز:",
text:"Je suis fatigué",
words:["هستم","خسته","من"],
answer:["من","خسته","هستم"]
},

{
type:"build-fa",
speak:"J'ai faim",
question:"ترجمه را بساز:",
text:"J'ai faim",
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
