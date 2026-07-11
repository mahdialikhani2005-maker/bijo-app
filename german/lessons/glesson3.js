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
question:"welches ist Haus ?",
speak:"Haus",
options:[
{text:"Zimmer",image:"../../media/house/room.png"},
{text:"Haus",image:"../../media/house/house.png"},
{text:"Tür",image:"../../media/house/door.png"},
{text:"Fenster",image:"../../media/house/window.png"}
],
answer:"Haus"
},

{
type:"image",
question:"welches ist Zimmer ?",
speak:"Zimmer",
options:[
{text:"Fenster",image:"../../media/house/window.png"},
{text:"Zimmer",image:"../../media/house/room.png"},
{text:"Küche",image:"../../media/house/kitchen.png"},
{text:"Haus",image:"../../media/house/house.png"}
],
answer:"Zimmer"
},

{
type:"image",
question:"welches ist Tür ?",
speak:"Tür",
options:[
{text:"Haus",image:"../../media/house/house.png"},
{text:"Tür",image:"../../media/house/door.png"},
{text:"Fenster",image:"../../media/house/window.png"},
{text:"Zimmer",image:"../../media/house/room.png"}
],
answer:"Tür"
},

{
type:"image",
question:"welches ist Fenster ?",
speak:"Fenster",
options:[
{text:"Tür",image:"../../media/house/door.png"},
{text:"Haus",image:"../../media/house/house.png"},
{text:"Fenster",image:"../../media/house/window.png"},
{text:"Zimmer",image:"../../media/house/room.png"}
],
answer:"Fenster"
},

{
type:"image",
question:"welches ist Küche ?",
speak:"Küche",
options:[
{text:"Zimmer",image:"../../media/house/room.png"},
{text:"Fenster",image:"../../media/house/window.png"},
{text:"Haus",image:"../../media/house/house.png"},
{text:"Küche",image:"../../media/house/kitchen.png"}
],
answer:"Küche"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/house/house.png",
options:["Zimmer","Haus","Tür","Fenster"],
answer:"Haus"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/house/room.png",
options:["Fenster","Zimmer","Küche","Haus"],
answer:"Zimmer"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/house/door.png",
options:["Haus","Tür","Fenster","Zimmer"],
answer:"Tür"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/house/window.png",
options:["Tür","Haus","Fenster","Zimmer"],
answer:"Fenster"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/house/kitchen.png",
options:["Zimmer","Fenster","Haus","Küche"],
answer:"Küche"
},

/* AUDIO */

{
type:"audio",
speak:"Haus",
question:"Welches Wort hast du gehört?",
options:["Zimmer","Haus","Tür","Fenster"],
answer:"Haus"
},

{
type:"audio",
speak:"Zimmer",
question:"Welches Wort hast du gehört?",
options:["Fenster","Zimmer","Küche","Haus"],
answer:"Zimmer"
},

{
type:"audio",
speak:"Tür",
question:"Welches Wort hast du gehört?",
options:["Haus","Tür","Fenster","Zimmer"],
answer:"Tür"
},

{
type:"audio",
speak:"Fenster",
question:"Welches Wort hast du gehört?",
options:["Tür","Haus","Fenster","Zimmer"],
answer:"Fenster"
},

{
type:"audio",
speak:"Küche",
question:"Welches Wort hast du gehört?",
options:["Zimmer","Fenster","Haus","Küche"],
answer:"Küche"
},

/* BUILD DE */

{
type:"build-de",
speak:"Das ist ein Haus",
question:"Bauen Sie den deutschen Satz:",
text:"این یک خانه است",
words:["Haus","ein","ist","Das"],
answer:["Das","ist","ein","Haus"]
},

{
type:"build-de",
speak:"Das ist ein Zimmer",
question:"Bauen Sie den deutschen Satz:",
text:"این یک اتاق است",
words:["Zimmer","ein","ist","Das"],
answer:["Das","ist","ein","Zimmer"]
},

{
type:"build-de",
speak:"Das ist eine Tür",
question:"Bauen Sie den deutschen Satz:",
text:"این یک در است",
words:["Tür","eine","ist","Das"],
answer:["Das","ist","eine","Tür"]
},

{
type:"build-de",
speak:"Das ist ein Fenster",
question:"Bauen Sie den deutschen Satz:",
text:"این یک پنجره است",
words:["Fenster","ein","ist","Das"],
answer:["Das","ist","ein","Fenster"]
},

{
type:"build-de",
speak:"Das ist eine Küche",
question:"Bauen Sie den deutschen Satz:",
text:"این یک آشپزخانه است",
words:["Küche","eine","ist","Das"],
answer:["Das","ist","eine","Küche"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Das ist ein Haus",
question:"ترجمه را بساز:",
text:"Das ist ein Haus",
words:["است","خانه","یک","این"],
answer:["این","یک","خانه","است"]
},

{
type:"build-fa",
speak:"Das ist ein Zimmer",
question:"ترجمه را بساز:",
text:"Das ist ein Zimmer",
words:["است","اتاق","یک","این"],
answer:["این","یک","اتاق","است"]
},

{
type:"build-fa",
speak:"Das ist eine Tür",
question:"ترجمه را بساز:",
text:"Das ist eine Tür",
words:["است","در","یک","این"],
answer:["این","یک","در","است"]
},

{
type:"build-fa",
speak:"Das ist ein Fenster",
question:"ترجمه را بساز:",
text:"Das ist ein Fenster",
words:["است","پنجره","یک","این"],
answer:["این","یک","پنجره","است"]
},

{
type:"build-fa",
speak:"Das ist eine Küche",
question:"ترجمه را بساز:",
text:"Das ist eine Küche",
words:["است","آشپزخانه","یک","این"],
answer:["این","یک","آشپزخانه","است"]
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
