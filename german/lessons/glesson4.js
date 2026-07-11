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
question:"welches ist Hemd ?",
speak:"Hemd",
options:[
{text:"Hose",image:"../../media/clothes/pants.png"},
{text:"Hemd",image:"../../media/clothes/shirt.png"},
{text:"Hut",image:"../../media/clothes/hat.png"},
{text:"Kleid",image:"../../media/clothes/dress.png"}
],
answer:"Hemd"
},

{
type:"image",
question:"welches ist Hose ?",
speak:"Hose",
options:[
{text:"Kleid",image:"../../media/clothes/dress.png"},
{text:"Hose",image:"../../media/clothes/pants.png"},
{text:"Schuhe",image:"../../media/clothes/shoes.png"},
{text:"Hemd",image:"../../media/clothes/shirt.png"}
],
answer:"Hose"
},

{
type:"image",
question:"welches ist Schuhe ?",
speak:"Schuhe",
options:[
{text:"Hemd",image:"../../media/clothes/shirt.png"},
{text:"Schuhe",image:"../../media/clothes/shoes.png"},
{text:"Hut",image:"../../media/clothes/hat.png"},
{text:"Hose",image:"../../media/clothes/pants.png"}
],
answer:"Schuhe"
},

{
type:"image",
question:"welches ist Hut ?",
speak:"Hut",
options:[
{text:"Schuhe",image:"../../media/clothes/shoes.png"},
{text:"Hose",image:"../../media/clothes/pants.png"},
{text:"Hut",image:"../../media/clothes/hat.png"},
{text:"Hemd",image:"../../media/clothes/shirt.png"}
],
answer:"Hut"
},

{
type:"image",
question:"welches ist Kleid ?",
speak:"Kleid",
options:[
{text:"Hut",image:"../../media/clothes/hat.png"},
{text:"Hemd",image:"../../media/clothes/shirt.png"},
{text:"Hose",image:"../../media/clothes/pants.png"},
{text:"Kleid",image:"../../media/clothes/dress.png"}
],
answer:"Kleid"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/clothes/shirt.png",
options:["Hose","Hemd","Hut","Kleid"],
answer:"Hemd"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/clothes/pants.png",
options:["Kleid","Hose","Schuhe","Hemd"],
answer:"Hose"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/clothes/shoes.png",
options:["Hemd","Schuhe","Hut","Hose"],
answer:"Schuhe"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/clothes/hat.png",
options:["Schuhe","Hose","Hut","Hemd"],
answer:"Hut"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/clothes/dress.png",
options:["Hut","Hemd","Hose","Kleid"],
answer:"Kleid"
},

/* AUDIO */

{
type:"audio",
speak:"Hemd",
question:"Welches Wort hast du gehört?",
options:["Hose","Hemd","Hut","Kleid"],
answer:"Hemd"
},

{
type:"audio",
speak:"Hose",
question:"Welches Wort hast du gehört?",
options:["Kleid","Hose","Schuhe","Hemd"],
answer:"Hose"
},

{
type:"audio",
speak:"Schuhe",
question:"Welches Wort hast du gehört?",
options:["Hemd","Schuhe","Hut","Hose"],
answer:"Schuhe"
},

{
type:"audio",
speak:"Hut",
question:"Welches Wort hast du gehört?",
options:["Schuhe","Hose","Hut","Hemd"],
answer:"Hut"
},

{
type:"audio",
speak:"Kleid",
question:"Welches Wort hast du gehört?",
options:["Hut","Hemd","Hose","Kleid"],
answer:"Kleid"
},

/* BUILD DE */

{
type:"build-de",
speak:"Das ist ein Hemd",
question:"Bauen Sie den deutschen Satz:",
text:"این یک پیراهن است",
words:["Hemd","ein","ist","Das"],
answer:["Das","ist","ein","Hemd"]
},

{
type:"build-de",
speak:"Das ist eine Hose",
question:"Bauen Sie den deutschen Satz:",
text:"این یک شلوار است",
words:["Hose","eine","ist","Das"],
answer:["Das","ist","eine","Hose"]
},

{
type:"build-de",
speak:"Das sind Schuhe",
question:"Bauen Sie den deutschen Satz:",
text:"این کفش‌ها هستند",
words:["Schuhe","sind","Das"],
answer:["Das","sind","Schuhe"]
},

{
type:"build-de",
speak:"Das ist ein Hut",
question:"Bauen Sie den deutschen Satz:",
text:"این یک کلاه است",
words:["Hut","ein","ist","Das"],
answer:["Das","ist","ein","Hut"]
},

{
type:"build-de",
speak:"Das ist ein Kleid",
question:"Bauen Sie den deutschen Satz:",
text:"این یک لباس است",
words:["Kleid","ein","ist","Das"],
answer:["Das","ist","ein","Kleid"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Das ist ein Hemd",
question:"ترجمه را بساز:",
text:"Das ist ein Hemd",
words:["است","پیراهن","یک","این"],
answer:["این","یک","پیراهن","است"]
},

{
type:"build-fa",
speak:"Das ist eine Hose",
question:"ترجمه را بساز:",
text:"Das ist eine Hose",
words:["است","شلوار","یک","این"],
answer:["این","یک","شلوار","است"]
},

{
type:"build-fa",
speak:"Das sind Schuhe",
question:"ترجمه را بساز:",
text:"Das sind Schuhe",
words:["هستند","کفش‌ها","این"],
answer:["این","کفش‌ها","هستند"]
},

{
type:"build-fa",
speak:"Das ist ein Hut",
question:"ترجمه را بساز:",
text:"Das ist ein Hut",
words:["است","کلاه","یک","این"],
answer:["این","یک","کلاه","است"]
},

{
type:"build-fa",
speak:"Das ist ein Kleid",
question:"ترجمه را بساز:",
text:"Das ist ein Kleid",
words:["است","لباس","یک","این"],
answer:["این","یک","لباس","است"]
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
