let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru";
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
question:"какой из них дом ?",
speak:"дом",
options:[
{text:"комната",image:"../../media/house/room.png"},
{text:"дом",image:"../../media/house/house.png"},
{text:"дверь",image:"../../media/house/door.png"},
{text:"окно",image:"../../media/house/window.png"}
],
answer:"дом"
},

{
type:"image",
question:"какой из них комната ?",
speak:"комната",
options:[
{text:"окно",image:"../../media/house/window.png"},
{text:"комната",image:"../../media/house/room.png"},
{text:"кухня",image:"../../media/house/kitchen.png"},
{text:"дом",image:"../../media/house/house.png"}
],
answer:"комната"
},

{
type:"image",
question:"какой из них дверь ?",
speak:"дверь",
options:[
{text:"дом",image:"../../media/house/house.png"},
{text:"дверь",image:"../../media/house/door.png"},
{text:"окно",image:"../../media/house/window.png"},
{text:"комната",image:"../../media/house/room.png"}
],
answer:"дверь"
},

{
type:"image",
question:"какой из них окно ?",
speak:"окно",
options:[
{text:"дверь",image:"../../media/house/door.png"},
{text:"дом",image:"../../media/house/house.png"},
{text:"окно",image:"../../media/house/window.png"},
{text:"комната",image:"../../media/house/room.png"}
],
answer:"окно"
},

{
type:"image",
question:"какой из них кухня ?",
speak:"кухня",
options:[
{text:"комната",image:"../../media/house/room.png"},
{text:"окно",image:"../../media/house/window.png"},
{text:"дом",image:"../../media/house/house.png"},
{text:"кухня",image:"../../media/house/kitchen.png"}
],
answer:"кухня"
},

/* WORD */

{
type:"word",
question:"Что это за изображение?",
image:"../../media/house/house.png",
options:["комната","дом","дверь","окно"],
answer:"дом"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/house/room.png",
options:["окно","комната","кухня","дом"],
answer:"комната"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/house/door.png",
options:["дом","дверь","окно","комната"],
answer:"дверь"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/house/window.png",
options:["дверь","дом","окно","комната"],
answer:"окно"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/house/kitchen.png",
options:["комната","окно","дом","кухня"],
answer:"кухня"
},

/* AUDIO */

{
type:"audio",
speak:"дом",
question:"Какое слово ты услышал?",
options:["комната","дом","дверь","окно"],
answer:"дом"
},

{
type:"audio",
speak:"комната",
question:"Какое слово ты услышал?",
options:["окно","комната","кухня","дом"],
answer:"комната"
},

{
type:"audio",
speak:"дверь",
question:"Какое слово ты услышал?",
options:["дом","дверь","окно","комната"],
answer:"дверь"
},

{
type:"audio",
speak:"окно",
question:"Какое слово ты услышал?",
options:["дверь","дом","окно","комната"],
answer:"окно"
},

{
type:"audio",
speak:"кухня",
question:"Какое слово ты услышал?",
options:["комната","окно","дом","кухня"],
answer:"кухня"
},

/* BUILD RU */

{
type:"build-ru",
speak:"Это дом",
question:"Составьте русское предложение:",
text:"این یک خانه است",
words:["дом","Это"],
answer:["Это","дом"]
},

{
type:"build-ru",
speak:"Это комната",
question:"Составьте русское предложение:",
text:"این یک اتاق است",
words:["комната","Это"],
answer:["Это","комната"]
},

{
type:"build-ru",
speak:"Это дверь",
question:"Составьте русское предложение:",
text:"این یک در است",
words:["дверь","Это"],
answer:["Это","дверь"]
},

{
type:"build-ru",
speak:"Это окно",
question:"Составьте русское предложение:",
text:"این یک پنجره است",
words:["окно","Это"],
answer:["Это","окно"]
},

{
type:"build-ru",
speak:"Это кухня",
question:"Составьте русское предложение:",
text:"این یک آشپزخانه است",
words:["кухня","Это"],
answer:["Это","кухня"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Это дом",
question:"ترجمه را بساز:",
text:"Это дом",
words:["است","خانه","یک","این"],
answer:["این","یک","خانه","است"]
},

{
type:"build-fa",
speak:"Это комната",
question:"ترجمه را بساز:",
text:"Это комната",
words:["است","اتاق","یک","این"],
answer:["این","یک","اتاق","است"]
},

{
type:"build-fa",
speak:"Это дверь",
question:"ترجمه را بساز:",
text:"Это дверь",
words:["است","در","یک","این"],
answer:["این","یک","در","است"]
},

{
type:"build-fa",
speak:"Это окно",
question:"ترجمه را بساز:",
text:"Это окно",
words:["است","پنجره","یک","این"],
answer:["این","یک","پنجره","است"]
},

{
type:"build-fa",
speak:"Это кухня",
question:"ترجمه را بساز:",
text:"Это кухня",
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
