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
question:"welches ist essen ?",
speak:"essen",
options:[
{text:"schlafen",image:"../../media/actions/sleep.png"},
{text:"essen",image:"../../media/actions/eat.png"},
{text:"gehen",image:"../../media/actions/walk.png"},
{text:"lesen",image:"../../media/actions/read.png"}
],
answer:"essen"
},

{
type:"image",
question:"welches ist schlafen ?",
speak:"schlafen",
options:[
{text:"schreiben",image:"../../media/actions/write.png"},
{text:"schlafen",image:"../../media/actions/sleep.png"},
{text:"essen",image:"../../media/actions/eat.png"},
{text:"gehen",image:"../../media/actions/walk.png"}
],
answer:"schlafen"
},

{
type:"image",
question:"welches ist gehen ?",
speak:"gehen",
options:[
{text:"essen",image:"../../media/actions/eat.png"},
{text:"gehen",image:"../../media/actions/walk.png"},
{text:"schreiben",image:"../../media/actions/write.png"},
{text:"schlafen",image:"../../media/actions/sleep.png"}
],
answer:"gehen"
},

{
type:"image",
question:"welches ist lesen ?",
speak:"lesen",
options:[
{text:"gehen",image:"../../media/actions/walk.png"},
{text:"schlafen",image:"../../media/actions/sleep.png"},
{text:"lesen",image:"../../media/actions/read.png"},
{text:"essen",image:"../../media/actions/eat.png"}
],
answer:"lesen"
},

{
type:"image",
question:"welches ist schreiben ?",
speak:"schreiben",
options:[
{text:"lesen",image:"../../media/actions/read.png"},
{text:"essen",image:"../../media/actions/eat.png"},
{text:"schlafen",image:"../../media/actions/sleep.png"},
{text:"schreiben",image:"../../media/actions/write.png"}
],
answer:"schreiben"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/actions/eat.png",
options:["schlafen","essen","gehen","lesen"],
answer:"essen"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/actions/sleep.png",
options:["schreiben","schlafen","essen","gehen"],
answer:"schlafen"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/actions/walk.png",
options:["essen","gehen","schreiben","schlafen"],
answer:"gehen"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/actions/read.png",
options:["gehen","schlafen","lesen","essen"],
answer:"lesen"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/actions/write.png",
options:["lesen","essen","schlafen","schreiben"],
answer:"schreiben"
},

/* AUDIO */

{
type:"audio",
speak:"essen",
question:"Welches Wort hast du gehört?",
options:["schlafen","essen","gehen","lesen"],
answer:"essen"
},

{
type:"audio",
speak:"schlafen",
question:"Welches Wort hast du gehört?",
options:["schreiben","schlafen","essen","gehen"],
answer:"schlafen"
},

{
type:"audio",
speak:"gehen",
question:"Welches Wort hast du gehört?",
options:["essen","gehen","schreiben","schlafen"],
answer:"gehen"
},

{
type:"audio",
speak:"lesen",
question:"Welches Wort hast du gehört?",
options:["gehen","schlafen","lesen","essen"],
answer:"lesen"
},

{
type:"audio",
speak:"schreiben",
question:"Welches Wort hast du gehört?",
options:["lesen","essen","schlafen","schreiben"],
answer:"schreiben"
},

/* BUILD DE */

{
type:"build-de",
speak:"Ich esse Brot",
question:"Bauen Sie den deutschen Satz:",
text:"من نان می‌خورم",
words:["Brot","esse","Ich"],
answer:["Ich","esse","Brot"]
},

{
type:"build-de",
speak:"Ich schlafe in der Nacht",
question:"Bauen Sie den deutschen Satz:",
text:"من شب می‌خوابم",
words:["schlafe","Nacht","der","in","Ich"],
answer:["Ich","schlafe","in","der","Nacht"]
},

{
type:"build-de",
speak:"Ich gehe zur Schule",
question:"Bauen Sie den deutschen Satz:",
text:"من به مدرسه راه می‌روم",
words:["gehe","Schule","zur","Ich"],
answer:["Ich","gehe","zur","Schule"]
},

{
type:"build-de",
speak:"Ich lese ein Buch",
question:"Bauen Sie den deutschen Satz:",
text:"من یک کتاب می‌خوانم",
words:["lese","Buch","ein","Ich"],
answer:["Ich","lese","ein","Buch"]
},

{
type:"build-de",
speak:"Ich schreibe einen Brief",
question:"Bauen Sie den deutschen Satz:",
text:"من یک نامه می‌نویسم",
words:["schreibe","Brief","einen","Ich"],
answer:["Ich","schreibe","einen","Brief"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Ich esse Brot",
question:"ترجمه را بساز:",
text:"Ich esse Brot",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"Ich schlafe in der Nacht",
question:"ترجمه را بساز:",
text:"Ich schlafe in der Nacht",
words:["می‌خوابم","شب","در","من"],
answer:["من","شب","می‌خوابم"]
},

{
type:"build-fa",
speak:"Ich gehe zur Schule",
question:"ترجمه را بساز:",
text:"Ich gehe zur Schule",
words:["می‌روم","مدرسه","به","من"],
answer:["من","به","مدرسه","می‌روم"]
},

{
type:"build-fa",
speak:"Ich lese ein Buch",
question:"ترجمه را بساز:",
text:"Ich lese ein Buch",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"Ich schreibe einen Brief",
question:"ترجمه را بساز:",
text:"Ich schreibe einen Brief",
words:["می‌نویسم","نامه","یک","من"],
answer:["من","یک","نامه","می‌نویسم"]
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
