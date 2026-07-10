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
question:"welches ist Schule ?",
speak:"Schule",
options:[
{text:"Krankenhaus",image:"../../media/places/hospital.png"},
{text:"Schule",image:"../../media/places/school.png"},
{text:"Geschäft",image:"../../media/places/store.png"},
{text:"Park",image:"../../media/places/park.png"}
],
answer:"Schule"
},

{
type:"image",
question:"welches ist Krankenhaus ?",
speak:"Krankenhaus",
options:[
{text:"Park",image:"../../media/places/park.png"},
{text:"Krankenhaus",image:"../../media/places/hospital.png"},
{text:"Moschee",image:"../../media/places/mosque.png"},
{text:"Schule",image:"../../media/places/school.png"}
],
answer:"Krankenhaus"
},

{
type:"image",
question:"welches ist Geschäft ?",
speak:"Geschäft",
options:[
{text:"Schule",image:"../../media/places/school.png"},
{text:"Geschäft",image:"../../media/places/store.png"},
{text:"Moschee",image:"../../media/places/mosque.png"},
{text:"Krankenhaus",image:"../../media/places/hospital.png"}
],
answer:"Geschäft"
},

{
type:"image",
question:"welches ist Park ?",
speak:"Park",
options:[
{text:"Geschäft",image:"../../media/places/store.png"},
{text:"Krankenhaus",image:"../../media/places/hospital.png"},
{text:"Park",image:"../../media/places/park.png"},
{text:"Schule",image:"../../media/places/school.png"}
],
answer:"Park"
},

{
type:"image",
question:"welches ist Moschee ?",
speak:"Moschee",
options:[
{text:"Park",image:"../../media/places/park.png"},
{text:"Schule",image:"../../media/places/school.png"},
{text:"Krankenhaus",image:"../../media/places/hospital.png"},
{text:"Moschee",image:"../../media/places/mosque.png"}
],
answer:"Moschee"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/places/school.png",
options:["Krankenhaus","Schule","Geschäft","Park"],
answer:"Schule"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/places/hospital.png",
options:["Park","Krankenhaus","Moschee","Schule"],
answer:"Krankenhaus"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/places/store.png",
options:["Schule","Geschäft","Moschee","Krankenhaus"],
answer:"Geschäft"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/places/park.png",
options:["Geschäft","Krankenhaus","Park","Schule"],
answer:"Park"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/places/mosque.png",
options:["Park","Schule","Krankenhaus","Moschee"],
answer:"Moschee"
},

/* AUDIO */

{
type:"audio",
speak:"Schule",
question:"Welches Wort hast du gehört?",
options:["Krankenhaus","Schule","Geschäft","Park"],
answer:"Schule"
},

{
type:"audio",
speak:"Krankenhaus",
question:"Welches Wort hast du gehört?",
options:["Park","Krankenhaus","Moschee","Schule"],
answer:"Krankenhaus"
},

{
type:"audio",
speak:"Geschäft",
question:"Welches Wort hast du gehört?",
options:["Schule","Geschäft","Moschee","Krankenhaus"],
answer:"Geschäft"
},

{
type:"audio",
speak:"Park",
question:"Welches Wort hast du gehört?",
options:["Geschäft","Krankenhaus","Park","Schule"],
answer:"Park"
},

{
type:"audio",
speak:"Moschee",
question:"Welches Wort hast du gehört?",
options:["Park","Schule","Krankenhaus","Moschee"],
answer:"Moschee"
},

/* BUILD DE */

{
type:"build-de",
speak:"Das ist eine Schule",
question:"Bauen Sie den deutschen Satz:",
text:"این یک مدرسه است",
words:["Schule","eine","ist","Das"],
answer:["Das","ist","eine","Schule"]
},

{
type:"build-de",
speak:"Das ist ein Krankenhaus",
question:"Bauen Sie den deutschen Satz:",
text:"این یک بیمارستان است",
words:["Krankenhaus","ein","ist","Das"],
answer:["Das","ist","ein","Krankenhaus"]
},

{
type:"build-de",
speak:"Das ist ein Geschäft",
question:"Bauen Sie den deutschen Satz:",
text:"این یک فروشگاه است",
words:["Geschäft","ein","ist","Das"],
answer:["Das","ist","ein","Geschäft"]
},

{
type:"build-de",
speak:"Das ist ein Park",
question:"Bauen Sie den deutschen Satz:",
text:"این یک پارک است",
words:["Park","ein","ist","Das"],
answer:["Das","ist","ein","Park"]
},

{
type:"build-de",
speak:"Das ist eine Moschee",
question:"Bauen Sie den deutschen Satz:",
text:"این یک مسجد است",
words:["Moschee","eine","ist","Das"],
answer:["Das","ist","eine","Moschee"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Das ist eine Schule",
question:"ترجمه را بساز:",
text:"Das ist eine Schule",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"Das ist ein Krankenhaus",
question:"ترجمه را بساز:",
text:"Das ist ein Krankenhaus",
words:["است","بیمارستان","یک","این"],
answer:["این","یک","بیمارستان","است"]
},

{
type:"build-fa",
speak:"Das ist ein Geschäft",
question:"ترجمه را بساز:",
text:"Das ist ein Geschäft",
words:["است","فروشگاه","یک","این"],
answer:["این","یک","فروشگاه","است"]
},

{
type:"build-fa",
speak:"Das ist ein Park",
question:"ترجمه را بساز:",
text:"Das ist ein Park",
words:["است","پارک","یک","این"],
answer:["این","یک","پارک","است"]
},

{
type:"build-fa",
speak:"Das ist eine Moschee",
question:"ترجمه را بساز:",
text:"Das ist eine Moschee",
words:["است","مسجد","یک","این"],
answer:["این","یک","مسجد","است"]
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
