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
question:"welches ist wer ?",
speak:"wer",
options:[
{text:"was",image:"../../media/questions/what.png"},
{text:"wer",image:"../../media/questions/who.png"},
{text:"wo",image:"../../media/questions/where.png"},
{text:"wann",image:"../../media/questions/when.png"}
],
answer:"wer"
},

{
type:"image",
question:"welches ist was ?",
speak:"was",
options:[
{text:"warum",image:"../../media/questions/why.png"},
{text:"was",image:"../../media/questions/what.png"},
{text:"wer",image:"../../media/questions/who.png"},
{text:"wo",image:"../../media/questions/where.png"}
],
answer:"was"
},

{
type:"image",
question:"welches ist wo ?",
speak:"wo",
options:[
{text:"was",image:"../../media/questions/what.png"},
{text:"wo",image:"../../media/questions/where.png"},
{text:"warum",image:"../../media/questions/why.png"},
{text:"wer",image:"../../media/questions/who.png"}
],
answer:"wo"
},

{
type:"image",
question:"welches ist wann ?",
speak:"wann",
options:[
{text:"wo",image:"../../media/questions/where.png"},
{text:"wer",image:"../../media/questions/who.png"},
{text:"wann",image:"../../media/questions/when.png"},
{text:"was",image:"../../media/questions/what.png"}
],
answer:"wann"
},

{
type:"image",
question:"welches ist warum ?",
speak:"warum",
options:[
{text:"wann",image:"../../media/questions/when.png"},
{text:"was",image:"../../media/questions/what.png"},
{text:"wer",image:"../../media/questions/who.png"},
{text:"warum",image:"../../media/questions/why.png"}
],
answer:"warum"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/questions/who.png",
options:["was","wer","wo","wann"],
answer:"wer"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/questions/what.png",
options:["warum","was","wer","wo"],
answer:"was"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/questions/where.png",
options:["was","wo","warum","wer"],
answer:"wo"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/questions/when.png",
options:["wo","wer","wann","was"],
answer:"wann"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/questions/why.png",
options:["wann","was","wer","warum"],
answer:"warum"
},

/* AUDIO */

{
type:"audio",
speak:"wer",
question:"Welches Wort hast du gehört?",
options:["was","wer","wo","wann"],
answer:"wer"
},

{
type:"audio",
speak:"was",
question:"Welches Wort hast du gehört?",
options:["warum","was","wer","wo"],
answer:"was"
},

{
type:"audio",
speak:"wo",
question:"Welches Wort hast du gehört?",
options:["was","wo","warum","wer"],
answer:"wo"
},

{
type:"audio",
speak:"wann",
question:"Welches Wort hast du gehört?",
options:["wo","wer","wann","was"],
answer:"wann"
},

{
type:"audio",
speak:"warum",
question:"Welches Wort hast du gehört?",
options:["wann","was","wer","warum"],
answer:"warum"
},

/* BUILD DE */

{
type:"build-de",
speak:"Wer ist sie?",
question:"Bauen Sie den deutschen Satz:",
text:"او کیست؟",
words:["Wer","sie","ist"],
answer:["Wer","ist","sie?"]
},

{
type:"build-de",
speak:"Was ist das?",
question:"Bauen Sie den deutschen Satz:",
text:"این چیست؟",
words:["Was","das","ist"],
answer:["Was","ist","das?"]
},

{
type:"build-de",
speak:"Wo ist die Schule?",
question:"Bauen Sie den deutschen Satz:",
text:"مدرسه کجاست؟",
words:["Wo","Schule","die","ist"],
answer:["Wo","ist","die","Schule?"]
},

{
type:"build-de",
speak:"Wann ist der Kurs?",
question:"Bauen Sie den deutschen Satz:",
text:"کلاس کی است؟",
words:["Wann","Kurs","der","ist"],
answer:["Wann","ist","der","Kurs?"]
},

{
type:"build-de",
speak:"Warum bist du glücklich?",
question:"Bauen Sie den deutschen Satz:",
text:"چرا خوشحالی؟",
words:["Warum","du","glücklich","bist"],
answer:["Warum","bist","du","glücklich?"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Wer ist sie?",
question:"ترجمه را بساز:",
text:"Wer ist sie?",
words:["کیست","او"],
answer:["او","کیست؟"]
},

{
type:"build-fa",
speak:"Was ist das?",
question:"ترجمه را بساز:",
text:"Was ist das?",
words:["چیست","این"],
answer:["این","چیست؟"]
},

{
type:"build-fa",
speak:"Wo ist die Schule?",
question:"ترجمه را بساز:",
text:"Wo ist die Schule?",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست؟"]
},

{
type:"build-fa",
speak:"Wann ist der Kurs?",
question:"ترجمه را بساز:",
text:"Wann ist der Kurs?",
words:["کیست","کلاس"],
answer:["کلاس","کیست؟"]
},

{
type:"build-fa",
speak:"Warum bist du glücklich?",
question:"ترجمه را بساز:",
text:"Warum bist du glücklich?",
words:["چرا","خوشحال","تو","هستی"],
answer:["تو","چرا","خوشحال","هستی؟"]
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
