let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "it";
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
question:"qual è cane ?",
speak:"cane",
options:[
{text:"gatto",image:"../../media/animals/cat.png"},
{text:"cane",image:"../../media/animals/dog.png"},
{text:"uccello",image:"../../media/animals/bird.png"},
{text:"pesce",image:"../../media/animals/fish.png"}
],
answer:"cane"
},

{
type:"image",
question:"qual è gatto ?",
speak:"gatto",
options:[
{text:"pesce",image:"../../media/animals/fish.png"},
{text:"gatto",image:"../../media/animals/cat.png"},
{text:"cavallo",image:"../../media/animals/horse.png"},
{text:"cane",image:"../../media/animals/dog.png"}
],
answer:"gatto"
},

{
type:"image",
question:"qual è uccello ?",
speak:"uccello",
options:[
{text:"cane",image:"../../media/animals/dog.png"},
{text:"uccello",image:"../../media/animals/bird.png"},
{text:"cavallo",image:"../../media/animals/horse.png"},
{text:"gatto",image:"../../media/animals/cat.png"}
],
answer:"uccello"
},

{
type:"image",
question:"qual è pesce ?",
speak:"pesce",
options:[
{text:"uccello",image:"../../media/animals/bird.png"},
{text:"gatto",image:"../../media/animals/cat.png"},
{text:"pesce",image:"../../media/animals/fish.png"},
{text:"cane",image:"../../media/animals/dog.png"}
],
answer:"pesce"
},

{
type:"image",
question:"qual è cavallo ?",
speak:"cavallo",
options:[
{text:"pesce",image:"../../media/animals/fish.png"},
{text:"cane",image:"../../media/animals/dog.png"},
{text:"gatto",image:"../../media/animals/cat.png"},
{text:"cavallo",image:"../../media/animals/horse.png"}
],
answer:"cavallo"
},

/* WORD */

{
type:"word",
question:"Che immagine è?",
image:"../../media/animals/dog.png",
options:["gatto","cane","uccello","pesce"],
answer:"cane"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/animals/cat.png",
options:["pesce","gatto","cavallo","cane"],
answer:"gatto"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/animals/bird.png",
options:["cane","uccello","cavallo","gatto"],
answer:"uccello"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/animals/fish.png",
options:["uccello","gatto","pesce","cane"],
answer:"pesce"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/animals/horse.png",
options:["pesce","cane","gatto","cavallo"],
answer:"cavallo"
},

/* AUDIO */

{
type:"audio",
speak:"cane",
question:"Che parola hai sentito?",
options:["gatto","cane","uccello","pesce"],
answer:"cane"
},

{
type:"audio",
speak:"gatto",
question:"Che parola hai sentito?",
options:["pesce","gatto","cavallo","cane"],
answer:"gatto"
},

{
type:"audio",
speak:"uccello",
question:"Che parola hai sentito?",
options:["cane","uccello","cavallo","gatto"],
answer:"uccello"
},

{
type:"audio",
speak:"pesce",
question:"Che parola hai sentito?",
options:["uccello","gatto","pesce","cane"],
answer:"pesce"
},

{
type:"audio",
speak:"cavallo",
question:"Che parola hai sentito?",
options:["pesce","cane","gatto","cavallo"],
answer:"cavallo"
},

/* BUILD IT */

{
type:"build-it",
speak:"Questo è un cane",
question:"Costruisci la frase in italiano:",
text:"این یک سگ است",
words:["cane","un","è","Questo"],
answer:["Questo","è","un","cane"]
},

{
type:"build-it",
speak:"Questo è un gatto",
question:"Costruisci la frase in italiano:",
text:"این یک گربه است",
words:["gatto","un","è","Questo"],
answer:["Questo","è","un","gatto"]
},

{
type:"build-it",
speak:"Questo è un uccello",
question:"Costruisci la frase in italiano:",
text:"این یک پرنده است",
words:["uccello","un","è","Questo"],
answer:["Questo","è","un","uccello"]
},

{
type:"build-it",
speak:"Questo è un pesce",
question:"Costruisci la frase in italiano:",
text:"این یک ماهی است",
words:["pesce","un","è","Questo"],
answer:["Questo","è","un","pesce"]
},

{
type:"build-it",
speak:"Questo è un cavallo",
question:"Costruisci la frase in italiano:",
text:"این یک اسب است",
words:["cavallo","un","è","Questo"],
answer:["Questo","è","un","cavallo"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Questo è un cane",
question:"ترجمه را بساز:",
text:"Questo è un cane",
words:["است","سگ","یک","این"],
answer:["این","یک","سگ","است"]
},

{
type:"build-fa",
speak:"Questo è un gatto",
question:"ترجمه را بساز:",
text:"Questo è un gatto",
words:["است","گربه","یک","این"],
answer:["این","یک","گربه","است"]
},

{
type:"build-fa",
speak:"Questo è un uccello",
question:"ترجمه را بساز:",
text:"Questo è un uccello",
words:["است","پرنده","یک","این"],
answer:["این","یک","پرنده","است"]
},

{
type:"build-fa",
speak:"Questo è un pesce",
question:"ترجمه را بساز:",
text:"Questo è un pesce",
words:["است","ماهی","یک","این"],
answer:["این","یک","ماهی","است"]
},

{
type:"build-fa",
speak:"Questo è un cavallo",
question:"ترجمه را بساز:",
text:"Questo è un cavallo",
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
