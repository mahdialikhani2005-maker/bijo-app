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
question:"какой из них собака ?",
speak:"собака",
options:[
{text:"кошка",image:"../../media/animals/cat.png"},
{text:"собака",image:"../../media/animals/dog.png"},
{text:"птица",image:"../../media/animals/bird.png"},
{text:"рыба",image:"../../media/animals/fish.png"}
],
answer:"собака"
},

{
type:"image",
question:"какой из них кошка ?",
speak:"кошка",
options:[
{text:"рыба",image:"../../media/animals/fish.png"},
{text:"кошка",image:"../../media/animals/cat.png"},
{text:"лошадь",image:"../../media/animals/horse.png"},
{text:"собака",image:"../../media/animals/dog.png"}
],
answer:"кошка"
},

{
type:"image",
question:"какой из них птица ?",
speak:"птица",
options:[
{text:"собака",image:"../../media/animals/dog.png"},
{text:"птица",image:"../../media/animals/bird.png"},
{text:"лошадь",image:"../../media/animals/horse.png"},
{text:"кошка",image:"../../media/animals/cat.png"}
],
answer:"птица"
},

{
type:"image",
question:"какой из них рыба ?",
speak:"рыба",
options:[
{text:"птица",image:"../../media/animals/bird.png"},
{text:"кошка",image:"../../media/animals/cat.png"},
{text:"рыба",image:"../../media/animals/fish.png"},
{text:"собака",image:"../../media/animals/dog.png"}
],
answer:"рыба"
},

{
type:"image",
question:"какой из них лошадь ?",
speak:"лошадь",
options:[
{text:"рыба",image:"../../media/animals/fish.png"},
{text:"собака",image:"../../media/animals/dog.png"},
{text:"кошка",image:"../../media/animals/cat.png"},
{text:"лошадь",image:"../../media/animals/horse.png"}
],
answer:"лошадь"
},

/* WORD */

{
type:"word",
question:"Что это за изображение?",
image:"../../media/animals/dog.png",
options:["кошка","собака","птица","рыба"],
answer:"собака"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/animals/cat.png",
options:["рыба","кошка","лошадь","собака"],
answer:"кошка"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/animals/bird.png",
options:["собака","птица","лошадь","кошка"],
answer:"птица"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/animals/fish.png",
options:["птица","кошка","рыба","собака"],
answer:"рыба"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/animals/horse.png",
options:["рыба","собака","кошка","лошадь"],
answer:"лошадь"
},

/* AUDIO */

{
type:"audio",
speak:"собака",
question:"Какое слово ты услышал?",
options:["кошка","собака","птица","рыба"],
answer:"собака"
},

{
type:"audio",
speak:"кошка",
question:"Какое слово ты услышал?",
options:["рыба","кошка","лошадь","собака"],
answer:"кошка"
},

{
type:"audio",
speak:"птица",
question:"Какое слово ты услышал?",
options:["собака","птица","лошадь","кошка"],
answer:"птица"
},

{
type:"audio",
speak:"рыба",
question:"Какое слово ты услышал?",
options:["птица","кошка","рыба","собака"],
answer:"рыба"
},

{
type:"audio",
speak:"лошадь",
question:"Какое слово ты услышал?",
options:["рыба","собака","кошка","лошадь"],
answer:"лошадь"
},

/* BUILD RU */

{
type:"build-ru",
speak:"Это собака",
question:"Составьте русское предложение:",
text:"این یک سگ است",
words:["собака","Это"],
answer:["Это","собака"]
},

{
type:"build-ru",
speak:"Это кошка",
question:"Составьте русское предложение:",
text:"این یک گربه است",
words:["кошка","Это"],
answer:["Это","кошка"]
},

{
type:"build-ru",
speak:"Это птица",
question:"Составьте русское предложение:",
text:"این یک پرنده است",
words:["птица","Это"],
answer:["Это","птица"]
},

{
type:"build-ru",
speak:"Это рыба",
question:"Составьте русское предложение:",
text:"این یک ماهی است",
words:["рыба","Это"],
answer:["Это","рыба"]
},

{
type:"build-ru",
speak:"Это лошадь",
question:"Составьте русское предложение:",
text:"این یک اسب است",
words:["лошадь","Это"],
answer:["Это","лошадь"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Это собака",
question:"ترجمه را بساز:",
text:"Это собака",
words:["است","سگ","یک","این"],
answer:["این","یک","سگ","است"]
},

{
type:"build-fa",
speak:"Это кошка",
question:"ترجمه را بساز:",
text:"Это кошка",
words:["است","گربه","یک","این"],
answer:["این","یک","گربه","است"]
},

{
type:"build-fa",
speak:"Это птица",
question:"ترجمه را بساز:",
text:"Это птица",
words:["است","پرنده","یک","این"],
answer:["این","یک","پرنده","است"]
},

{
type:"build-fa",
speak:"Это рыба",
question:"ترجمه را بساز:",
text:"Это рыба",
words:["است","ماهی","یک","این"],
answer:["این","یک","ماهی","است"]
},

{
type:"build-fa",
speak:"Это лошадь",
question:"ترجمه را بساز:",
text:"Это лошадь",
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
