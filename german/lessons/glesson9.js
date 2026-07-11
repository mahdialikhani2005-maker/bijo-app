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
question:"welches ist Sonne ?",
speak:"Sonne",
options:[
{text:"Mond",image:"../../media/nature/moon.png"},
{text:"Sonne",image:"../../media/nature/sun.png"},
{text:"Stern",image:"../../media/nature/star.png"},
{text:"Himmel",image:"../../media/nature/sky.png"}
],
answer:"Sonne"
},

{
type:"image",
question:"welches ist Mond ?",
speak:"Mond",
options:[
{text:"Stern",image:"../../media/nature/star.png"},
{text:"Mond",image:"../../media/nature/moon.png"},
{text:"Regen",image:"../../media/nature/rain.png"},
{text:"Sonne",image:"../../media/nature/sun.png"}
],
answer:"Mond"
},

{
type:"image",
question:"welches ist Stern ?",
speak:"Stern",
options:[
{text:"Sonne",image:"../../media/nature/sun.png"},
{text:"Stern",image:"../../media/nature/star.png"},
{text:"Regen",image:"../../media/nature/rain.png"},
{text:"Mond",image:"../../media/nature/moon.png"}
],
answer:"Stern"
},

{
type:"image",
question:"welches ist Himmel ?",
speak:"Himmel",
options:[
{text:"Stern",image:"../../media/nature/star.png"},
{text:"Mond",image:"../../media/nature/moon.png"},
{text:"Himmel",image:"../../media/nature/sky.png"},
{text:"Sonne",image:"../../media/nature/sun.png"}
],
answer:"Himmel"
},

{
type:"image",
question:"welches ist Regen ?",
speak:"Regen",
options:[
{text:"Himmel",image:"../../media/nature/sky.png"},
{text:"Sonne",image:"../../media/nature/sun.png"},
{text:"Mond",image:"../../media/nature/moon.png"},
{text:"Regen",image:"../../media/nature/rain.png"}
],
answer:"Regen"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/nature/sun.png",
options:["Mond","Sonne","Stern","Himmel"],
answer:"Sonne"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/nature/moon.png",
options:["Stern","Mond","Regen","Sonne"],
answer:"Mond"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/nature/star.png",
options:["Sonne","Stern","Regen","Mond"],
answer:"Stern"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/nature/sky.png",
options:["Stern","Mond","Himmel","Sonne"],
answer:"Himmel"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/nature/rain.png",
options:["Himmel","Sonne","Mond","Regen"],
answer:"Regen"
},

/* AUDIO */

{
type:"audio",
speak:"Sonne",
question:"Welches Wort hast du gehört?",
options:["Mond","Sonne","Stern","Himmel"],
answer:"Sonne"
},

{
type:"audio",
speak:"Mond",
question:"Welches Wort hast du gehört?",
options:["Stern","Mond","Regen","Sonne"],
answer:"Mond"
},

{
type:"audio",
speak:"Stern",
question:"Welches Wort hast du gehört?",
options:["Sonne","Stern","Regen","Mond"],
answer:"Stern"
},

{
type:"audio",
speak:"Himmel",
question:"Welches Wort hast du gehört?",
options:["Stern","Mond","Himmel","Sonne"],
answer:"Himmel"
},

{
type:"audio",
speak:"Regen",
question:"Welches Wort hast du gehört?",
options:["Himmel","Sonne","Mond","Regen"],
answer:"Regen"
},

/* BUILD DE */

{
type:"build-de",
speak:"Die Sonne ist groß",
question:"Bauen Sie den deutschen Satz:",
text:"خورشید بزرگ است",
words:["Sonne","Die","groß","ist"],
answer:["Die","Sonne","ist","groß"]
},

{
type:"build-de",
speak:"Der Mond ist klein",
question:"Bauen Sie den deutschen Satz:",
text:"ماه کوچک است",
words:["Mond","Der","klein","ist"],
answer:["Der","Mond","ist","klein"]
},

{
type:"build-de",
speak:"Der Stern ist hell",
question:"Bauen Sie den deutschen Satz:",
text:"ستاره درخشان است",
words:["Stern","Der","hell","ist"],
answer:["Der","Stern","ist","hell"]
},

{
type:"build-de",
speak:"Der Himmel ist blau",
question:"Bauen Sie den deutschen Satz:",
text:"آسمان آبی است",
words:["Himmel","Der","blau","ist"],
answer:["Der","Himmel","ist","blau"]
},

{
type:"build-de",
speak:"Der Regen ist kalt",
question:"Bauen Sie den deutschen Satz:",
text:"باران سرد است",
words:["Regen","Der","kalt","ist"],
answer:["Der","Regen","ist","kalt"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Die Sonne ist groß",
question:"ترجمه را بساز:",
text:"Die Sonne ist groß",
words:["است","بزرگ","خورشید"],
answer:["خورشید","بزرگ","است"]
},

{
type:"build-fa",
speak:"Der Mond ist klein",
question:"ترجمه را بساز:",
text:"Der Mond ist klein",
words:["است","کوچک","ماه"],
answer:["ماه","کوچک","است"]
},

{
type:"build-fa",
speak:"Der Stern ist hell",
question:"ترجمه را بساز:",
text:"Der Stern ist hell",
words:["است","درخشان","ستاره"],
answer:["ستاره","درخشان","است"]
},

{
type:"build-fa",
speak:"Der Himmel ist blau",
question:"ترجمه را بساز:",
text:"Der Himmel ist blau",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"Der Regen ist kalt",
question:"ترجمه را بساز:",
text:"Der Regen ist kalt",
words:["است","سرد","باران"],
answer:["باران","سرد","است"]
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
