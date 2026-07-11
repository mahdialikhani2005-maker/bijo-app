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
question:"welches ist heute ?",
speak:"heute",
options:[
{text:"morgen",image:"../../media/time/tomorrow.png"},
{text:"heute",image:"../../media/time/today.png"},
{text:"gestern",image:"../../media/time/yesterday.png"},
{text:"Morgen",image:"../../media/time/morning.png"}
],
answer:"heute"
},

{
type:"image",
question:"welches ist morgen ?",
speak:"morgen",
options:[
{text:"Nacht",image:"../../media/time/night.png"},
{text:"morgen",image:"../../media/time/tomorrow.png"},
{text:"heute",image:"../../media/time/today.png"},
{text:"gestern",image:"../../media/time/yesterday.png"}
],
answer:"morgen"
},

{
type:"image",
question:"welches ist gestern ?",
speak:"gestern",
options:[
{text:"heute",image:"../../media/time/today.png"},
{text:"gestern",image:"../../media/time/yesterday.png"},
{text:"Nacht",image:"../../media/time/night.png"},
{text:"morgen",image:"../../media/time/tomorrow.png"}
],
answer:"gestern"
},

{
type:"image",
question:"welches ist Morgen ?",
speak:"Morgen",
options:[
{text:"gestern",image:"../../media/time/yesterday.png"},
{text:"morgen",image:"../../media/time/tomorrow.png"},
{text:"Morgen",image:"../../media/time/morning.png"},
{text:"heute",image:"../../media/time/today.png"}
],
answer:"Morgen"
},

{
type:"image",
question:"welches ist Nacht ?",
speak:"Nacht",
options:[
{text:"Morgen",image:"../../media/time/morning.png"},
{text:"heute",image:"../../media/time/today.png"},
{text:"morgen",image:"../../media/time/tomorrow.png"},
{text:"Nacht",image:"../../media/time/night.png"}
],
answer:"Nacht"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/time/today.png",
options:["morgen","heute","gestern","Morgen"],
answer:"heute"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/time/tomorrow.png",
options:["Nacht","morgen","heute","gestern"],
answer:"morgen"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/time/yesterday.png",
options:["heute","gestern","Nacht","morgen"],
answer:"gestern"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/time/morning.png",
options:["gestern","morgen","Morgen","heute"],
answer:"Morgen"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/time/night.png",
options:["Morgen","heute","morgen","Nacht"],
answer:"Nacht"
},

/* AUDIO */

{
type:"audio",
speak:"heute",
question:"Welches Wort hast du gehört?",
options:["morgen","heute","gestern","Morgen"],
answer:"heute"
},

{
type:"audio",
speak:"morgen",
question:"Welches Wort hast du gehört?",
options:["Nacht","morgen","heute","gestern"],
answer:"morgen"
},

{
type:"audio",
speak:"gestern",
question:"Welches Wort hast du gehört?",
options:["heute","gestern","Nacht","morgen"],
answer:"gestern"
},

{
type:"audio",
speak:"Morgen",
question:"Welches Wort hast du gehört?",
options:["gestern","morgen","Morgen","heute"],
answer:"Morgen"
},

{
type:"audio",
speak:"Nacht",
question:"Welches Wort hast du gehört?",
options:["Morgen","heute","morgen","Nacht"],
answer:"Nacht"
},

/* BUILD DE */

{
type:"build-de",
speak:"Heute ist Montag",
question:"Bauen Sie den deutschen Satz:",
text:"امروز دوشنبه است",
words:["ist","heute","Montag"],
answer:["Heute","ist","Montag"]
},

{
type:"build-de",
speak:"Morgen ist Dienstag",
question:"Bauen Sie den deutschen Satz:",
text:"فردا سه‌شنبه است",
words:["Morgen","ist","Dienstag"],
answer:["Morgen","ist","Dienstag"]
},

{
type:"build-de",
speak:"Gestern war Sonntag",
question:"Bauen Sie den deutschen Satz:",
text:"دیروز یک‌شنبه بود",
words:["war","Gestern","Sonntag"],
answer:["Gestern","war","Sonntag"]
},

{
type:"build-de",
speak:"Guten Morgen",
question:"Bauen Sie den deutschen Satz:",
text:"صبح بخیر",
words:["Guten","Morgen"],
answer:["Guten","Morgen"]
},

{
type:"build-de",
speak:"Gute Nacht",
question:"Bauen Sie den deutschen Satz:",
text:"شب بخیر",
words:["Gute","Nacht"],
answer:["Gute","Nacht"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Heute ist Montag",
question:"ترجمه را بساز:",
text:"Heute ist Montag",
words:["است","دوشنبه","امروز"],
answer:["امروز","دوشنبه","است"]
},

{
type:"build-fa",
speak:"Morgen ist Dienstag",
question:"ترجمه را بساز:",
text:"Morgen ist Dienstag",
words:["است","سه‌شنبه","فردا"],
answer:["فردا","سه‌شنبه","است"]
},

{
type:"build-fa",
speak:"Gestern war Sonntag",
question:"ترجمه را بساز:",
text:"Gestern war Sonntag",
words:["بود","یک‌شنبه","دیروز"],
answer:["دیروز","یک‌شنبه","بود"]
},

{
type:"build-fa",
speak:"Guten Morgen",
question:"ترجمه را بساز:",
text:"Guten Morgen",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"Gute Nacht",
question:"ترجمه را بساز:",
text:"Gute Nacht",
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
