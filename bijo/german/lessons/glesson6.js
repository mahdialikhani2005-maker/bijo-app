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
question:"welches ist Apfel ?",
speak:"Apfel",
options:[
{text:"Banane",image:"../../media/fruits/banana.png"},
{text:"Apfel",image:"../../media/fruits/apple.png"},
{text:"Orange",image:"../../media/fruits/orange.png"},
{text:"Traube",image:"../../media/fruits/grape.png"}
],
answer:"Apfel"
},

{
type:"image",
question:"welches ist Banane ?",
speak:"Banane",
options:[
{text:"Orange",image:"../../media/fruits/orange.png"},
{text:"Banane",image:"../../media/fruits/banana.png"},
{text:"Wassermelone",image:"../../media/fruits/watermelon.png"},
{text:"Apfel",image:"../../media/fruits/apple.png"}
],
answer:"Banane"
},

{
type:"image",
question:"welches ist Orange ?",
speak:"Orange",
options:[
{text:"Apfel",image:"../../media/fruits/apple.png"},
{text:"Orange",image:"../../media/fruits/orange.png"},
{text:"Traube",image:"../../media/fruits/grape.png"},
{text:"Banane",image:"../../media/fruits/banana.png"}
],
answer:"Orange"
},

{
type:"image",
question:"welches ist Traube ?",
speak:"Traube",
options:[
{text:"Orange",image:"../../media/fruits/orange.png"},
{text:"Banane",image:"../../media/fruits/banana.png"},
{text:"Traube",image:"../../media/fruits/grape.png"},
{text:"Apfel",image:"../../media/fruits/apple.png"}
],
answer:"Traube"
},

{
type:"image",
question:"welches ist Wassermelone ?",
speak:"Wassermelone",
options:[
{text:"Traube",image:"../../media/fruits/grape.png"},
{text:"Apfel",image:"../../media/fruits/apple.png"},
{text:"Banane",image:"../../media/fruits/banana.png"},
{text:"Wassermelone",image:"../../media/fruits/watermelon.png"}
],
answer:"Wassermelone"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/fruits/apple.png",
options:["Banane","Apfel","Orange","Traube"],
answer:"Apfel"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/fruits/banana.png",
options:["Orange","Banane","Wassermelone","Apfel"],
answer:"Banane"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/fruits/orange.png",
options:["Apfel","Orange","Traube","Banane"],
answer:"Orange"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/fruits/grape.png",
options:["Orange","Banane","Traube","Apfel"],
answer:"Traube"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/fruits/watermelon.png",
options:["Traube","Apfel","Banane","Wassermelone"],
answer:"Wassermelone"
},

/* AUDIO */

{
type:"audio",
speak:"Apfel",
question:"Welches Wort hast du gehört?",
options:["Banane","Apfel","Orange","Traube"],
answer:"Apfel"
},

{
type:"audio",
speak:"Banane",
question:"Welches Wort hast du gehört?",
options:["Orange","Banane","Wassermelone","Apfel"],
answer:"Banane"
},

{
type:"audio",
speak:"Orange",
question:"Welches Wort hast du gehört?",
options:["Apfel","Orange","Traube","Banane"],
answer:"Orange"
},

{
type:"audio",
speak:"Traube",
question:"Welches Wort hast du gehört?",
options:["Orange","Banane","Traube","Apfel"],
answer:"Traube"
},

{
type:"audio",
speak:"Wassermelone",
question:"Welches Wort hast du gehört?",
options:["Traube","Apfel","Banane","Wassermelone"],
answer:"Wassermelone"
},

/* BUILD DE */

{
type:"build-de",
speak:"Ich esse einen Apfel",
question:"Bauen Sie den deutschen Satz:",
text:"من یک سیب می‌خورم",
words:["Apfel","einen","esse","Ich"],
answer:["Ich","esse","einen","Apfel"]
},

{
type:"build-de",
speak:"Ich esse eine Banane",
question:"Bauen Sie den deutschen Satz:",
text:"من یک موز می‌خورم",
words:["Banane","eine","esse","Ich"],
answer:["Ich","esse","eine","Banane"]
},

{
type:"build-de",
speak:"Ich esse eine Orange",
question:"Bauen Sie den deutschen Satz:",
text:"من یک پرتقال می‌خورم",
words:["Orange","eine","esse","Ich"],
answer:["Ich","esse","eine","Orange"]
},

{
type:"build-de",
speak:"Ich esse Trauben",
question:"Bauen Sie den deutschen Satz:",
text:"من انگور می‌خورم",
words:["Trauben","esse","Ich"],
answer:["Ich","esse","Trauben"]
},

{
type:"build-de",
speak:"Ich esse Wassermelone",
question:"Bauen Sie den deutschen Satz:",
text:"من هندوانه می‌خورم",
words:["Wassermelone","esse","Ich"],
answer:["Ich","esse","Wassermelone"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Ich esse einen Apfel",
question:"ترجمه را بساز:",
text:"Ich esse einen Apfel",
words:["می‌خورم","سیب","یک","من"],
answer:["من","یک","سیب","می‌خورم"]
},

{
type:"build-fa",
speak:"Ich esse eine Banane",
question:"ترجمه را بساز:",
text:"Ich esse eine Banane",
words:["می‌خورم","موز","یک","من"],
answer:["من","یک","موز","می‌خورم"]
},

{
type:"build-fa",
speak:"Ich esse eine Orange",
question:"ترجمه را بساز:",
text:"Ich esse eine Orange",
words:["می‌خورم","پرتقال","یک","من"],
answer:["من","یک","پرتقال","می‌خورم"]
},

{
type:"build-fa",
speak:"Ich esse Trauben",
question:"ترجمه را بساز:",
text:"Ich esse Trauben",
words:["می‌خورم","انگور","من"],
answer:["من","انگور","می‌خورم"]
},

{
type:"build-fa",
speak:"Ich esse Wassermelone",
question:"ترجمه را بساز:",
text:"Ich esse Wassermelone",
words:["می‌خورم","هندوانه","من"],
answer:["من","هندوانه","می‌خورم"]
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
