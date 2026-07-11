let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de";
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
question:"welches ist Mann ?",
speak:"Mann",
options:[
{text:"Frau",image:"../../media/people/woman.png"},
{text:"Mann",image:"../../media/people/man.png"},
{text:"Junge",image:"../../media/people/boy.png"},
{text:"Mädchen",image:"../../media/people/girl.png"}
],
answer:"Mann"
},

{
type:"image",
question:"welches ist Frau ?",
speak:"Frau",
options:[
{text:"Mädchen",image:"../../media/people/girl.png"},
{text:"Frau",image:"../../media/people/woman.png"},
{text:"Junge",image:"../../media/people/boy.png"},
{text:"Mann",image:"../../media/people/man.png"}
],
answer:"Frau"
},

{
type:"image",
question:"welches ist Junge ?",
speak:"Junge",
options:[
{text:"Mann",image:"../../media/people/man.png"},
{text:"Junge",image:"../../media/people/boy.png"},
{text:"Baby",image:"../../media/people/baby.png"},
{text:"Mädchen",image:"../../media/people/girl.png"}
],
answer:"Junge"
},

{
type:"image",
question:"welches ist Mädchen ?",
speak:"Mädchen",
options:[
{text:"Junge",image:"../../media/people/boy.png"},
{text:"Mann",image:"../../media/people/man.png"},
{text:"Mädchen",image:"../../media/people/girl.png"},
{text:"Baby",image:"../../media/people/baby.png"}
],
answer:"Mädchen"
},

{
type:"image",
question:"welches ist Baby ?",
speak:"Baby",
options:[
{text:"Mädchen",image:"../../media/people/girl.png"},
{text:"Junge",image:"../../media/people/boy.png"},
{text:"Mann",image:"../../media/people/man.png"},
{text:"Baby",image:"../../media/people/baby.png"}
],
answer:"Baby"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/people/man.png",
options:["Junge","Mann","Frau","Mädchen"],
answer:"Mann"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/people/woman.png",
options:["Frau","Mädchen","Baby","Mann"],
answer:"Frau"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/people/boy.png",
options:["Junge","Mann","Baby","Mädchen"],
answer:"Junge"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/people/girl.png",
options:["Mädchen","Frau","Junge","Baby"],
answer:"Mädchen"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/people/baby.png",
options:["Baby","Junge","Mädchen","Mann"],
answer:"Baby"
},

/* AUDIO */

{
type:"audio",
speak:"Mann",
question:"Welches Wort hast du gehört?",
options:["Mann","Junge","Frau","Mädchen"],
answer:"Mann"
},

{
type:"audio",
speak:"Frau",
question:"Welches Wort hast du gehört?",
options:["Mädchen","Frau","Junge","Mann"],
answer:"Frau"
},

{
type:"audio",
speak:"Junge",
question:"Welches Wort hast du gehört?",
options:["Junge","Mann","Baby","Mädchen"],
answer:"Junge"
},

{
type:"audio",
speak:"Mädchen",
question:"Welches Wort hast du gehört?",
options:["Junge","Frau","Mädchen","Baby"],
answer:"Mädchen"
},

{
type:"audio",
speak:"Baby",
question:"Welches Wort hast du gehört?",
options:["Baby","Junge","Mann","Mädchen"],
answer:"Baby"
},

/* BUILD DE */

{
type:"build-de",
speak:"Er ist ein Mann",
question:"Bauen Sie den deutschen Satz:",
text:"او یک مرد است",
words:["Mann","ein","ist","Er"],
answer:["Er","ist","ein","Mann"]
},

{
type:"build-de",
speak:"Sie ist eine Frau",
question:"Bauen Sie den deutschen Satz:",
text:"او یک زن است",
words:["Frau","eine","ist","Sie"],
answer:["Sie","ist","eine","Frau"]
},

{
type:"build-de",
speak:"Er ist ein Junge",
question:"Bauen Sie den deutschen Satz:",
text:"او یک پسر است",
words:["Junge","ein","ist","Er"],
answer:["Er","ist","ein","Junge"]
},

{
type:"build-de",
speak:"Sie ist ein Mädchen",
question:"Bauen Sie den deutschen Satz:",
text:"او یک دختر است",
words:["Mädchen","ein","ist","Sie"],
answer:["Sie","ist","ein","Mädchen"]
},

{
type:"build-de",
speak:"Das Baby ist klein",
question:"Bauen Sie den deutschen Satz:",
text:"نوزاد کوچک است",
words:["Baby","Das","klein","ist"],
answer:["Das","Baby","ist","klein"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Er ist ein Mann",
question:"ترجمه را بساز:",
text:"Er ist ein Mann",
words:["است","مرد","یک","او"],
answer:["او","یک","مرد","است"]
},

{
type:"build-fa",
speak:"Sie ist eine Frau",
question:"ترجمه را بساز:",
text:"Sie ist eine Frau",
words:["یک","است","زن","او"],
answer:["او","یک","زن","است"]
},

{
type:"build-fa",
speak:"Er ist ein Junge",
question:"ترجمه را بساز:",
text:"Er ist ein Junge",
words:["است","پسر","یک","او"],
answer:["او","یک","پسر","است"]
},

{
type:"build-fa",
speak:"Sie ist ein Mädchen",
question:"ترجمه را بساز:",
text:"Sie ist ein Mädchen",
words:["است","دختر","یک","او"],
answer:["او","یک","دختر","است"]
},

{
type:"build-fa",
speak:"Das Baby ist klein",
question:"ترجمه را بساز:",
text:"Das Baby ist klein",
words:["است","کوچک","نوزاد"],
answer:["نوزاد","کوچک","است"]
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
