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
question:"welches ist Hund ?",
speak:"Hund",
options:[
{text:"Katze",image:"../../media/animals/cat.png"},
{text:"Hund",image:"../../media/animals/dog.png"},
{text:"Vogel",image:"../../media/animals/bird.png"},
{text:"Fisch",image:"../../media/animals/fish.png"}
],
answer:"Hund"
},

{
type:"image",
question:"welches ist Katze ?",
speak:"Katze",
options:[
{text:"Fisch",image:"../../media/animals/fish.png"},
{text:"Katze",image:"../../media/animals/cat.png"},
{text:"Pferd",image:"../../media/animals/horse.png"},
{text:"Hund",image:"../../media/animals/dog.png"}
],
answer:"Katze"
},

{
type:"image",
question:"welches ist Vogel ?",
speak:"Vogel",
options:[
{text:"Hund",image:"../../media/animals/dog.png"},
{text:"Vogel",image:"../../media/animals/bird.png"},
{text:"Pferd",image:"../../media/animals/horse.png"},
{text:"Katze",image:"../../media/animals/cat.png"}
],
answer:"Vogel"
},

{
type:"image",
question:"welches ist Fisch ?",
speak:"Fisch",
options:[
{text:"Vogel",image:"../../media/animals/bird.png"},
{text:"Katze",image:"../../media/animals/cat.png"},
{text:"Fisch",image:"../../media/animals/fish.png"},
{text:"Hund",image:"../../media/animals/dog.png"}
],
answer:"Fisch"
},

{
type:"image",
question:"welches ist Pferd ?",
speak:"Pferd",
options:[
{text:"Fisch",image:"../../media/animals/fish.png"},
{text:"Hund",image:"../../media/animals/dog.png"},
{text:"Katze",image:"../../media/animals/cat.png"},
{text:"Pferd",image:"../../media/animals/horse.png"}
],
answer:"Pferd"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/animals/dog.png",
options:["Katze","Hund","Vogel","Fisch"],
answer:"Hund"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/animals/cat.png",
options:["Fisch","Katze","Pferd","Hund"],
answer:"Katze"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/animals/bird.png",
options:["Hund","Vogel","Pferd","Katze"],
answer:"Vogel"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/animals/fish.png",
options:["Vogel","Katze","Fisch","Hund"],
answer:"Fisch"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/animals/horse.png",
options:["Fisch","Hund","Katze","Pferd"],
answer:"Pferd"
},

/* AUDIO */

{
type:"audio",
speak:"Hund",
question:"Welches Wort hast du gehört?",
options:["Katze","Hund","Vogel","Fisch"],
answer:"Hund"
},

{
type:"audio",
speak:"Katze",
question:"Welches Wort hast du gehört?",
options:["Fisch","Katze","Pferd","Hund"],
answer:"Katze"
},

{
type:"audio",
speak:"Vogel",
question:"Welches Wort hast du gehört?",
options:["Hund","Vogel","Pferd","Katze"],
answer:"Vogel"
},

{
type:"audio",
speak:"Fisch",
question:"Welches Wort hast du gehört?",
options:["Vogel","Katze","Fisch","Hund"],
answer:"Fisch"
},

{
type:"audio",
speak:"Pferd",
question:"Welches Wort hast du gehört?",
options:["Fisch","Hund","Katze","Pferd"],
answer:"Pferd"
},

/* BUILD DE */

{
type:"build-de",
speak:"Das ist ein Hund",
question:"Bauen Sie den deutschen Satz:",
text:"این یک سگ است",
words:["Hund","ein","ist","Das"],
answer:["Das","ist","ein","Hund"]
},

{
type:"build-de",
speak:"Das ist eine Katze",
question:"Bauen Sie den deutschen Satz:",
text:"این یک گربه است",
words:["Katze","eine","ist","Das"],
answer:["Das","ist","eine","Katze"]
},

{
type:"build-de",
speak:"Das ist ein Vogel",
question:"Bauen Sie den deutschen Satz:",
text:"این یک پرنده است",
words:["Vogel","ein","ist","Das"],
answer:["Das","ist","ein","Vogel"]
},

{
type:"build-de",
speak:"Das ist ein Fisch",
question:"Bauen Sie den deutschen Satz:",
text:"این یک ماهی است",
words:["Fisch","ein","ist","Das"],
answer:["Das","ist","ein","Fisch"]
},

{
type:"build-de",
speak:"Das ist ein Pferd",
question:"Bauen Sie den deutschen Satz:",
text:"این یک اسب است",
words:["Pferd","ein","ist","Das"],
answer:["Das","ist","ein","Pferd"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Das ist ein Hund",
question:"ترجمه را بساز:",
text:"Das ist ein Hund",
words:["است","سگ","یک","این"],
answer:["این","یک","سگ","است"]
},

{
type:"build-fa",
speak:"Das ist eine Katze",
question:"ترجمه را بساز:",
text:"Das ist eine Katze",
words:["است","گربه","یک","این"],
answer:["این","یک","گربه","است"]
},

{
type:"build-fa",
speak:"Das ist ein Vogel",
question:"ترجمه را بساز:",
text:"Das ist ein Vogel",
words:["است","پرنده","یک","این"],
answer:["این","یک","پرنده","است"]
},

{
type:"build-fa",
speak:"Das ist ein Fisch",
question:"ترجمه را بساز:",
text:"Das ist ein Fisch",
words:["است","ماهی","یک","این"],
answer:["این","یک","ماهی","است"]
},

{
type:"build-fa",
speak:"Das ist ein Pferd",
question:"ترجمه را بساز:",
text:"Das ist ein Pferd",
words:["است","اسب","یک","این"],
answer:["این","یک","اسب","است"]
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
