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
question:"qual è grande ?",
speak:"grande",
options:[
{text:"piccolo",image:"../../media/adjectives/small.png"},
{text:"grande",image:"../../media/adjectives/big.png"},
{text:"alto",image:"../../media/adjectives/tall.png"},
{text:"basso",image:"../../media/adjectives/short.png"}
],
answer:"grande"
},

{
type:"image",
question:"qual è piccolo ?",
speak:"piccolo",
options:[
{text:"bello",image:"../../media/adjectives/beautiful.png"},
{text:"piccolo",image:"../../media/adjectives/small.png"},
{text:"grande",image:"../../media/adjectives/big.png"},
{text:"alto",image:"../../media/adjectives/tall.png"}
],
answer:"piccolo"
},

{
type:"image",
question:"qual è alto ?",
speak:"alto",
options:[
{text:"grande",image:"../../media/adjectives/big.png"},
{text:"alto",image:"../../media/adjectives/tall.png"},
{text:"bello",image:"../../media/adjectives/beautiful.png"},
{text:"piccolo",image:"../../media/adjectives/small.png"}
],
answer:"alto"
},

{
type:"image",
question:"qual è basso ?",
speak:"basso",
options:[
{text:"alto",image:"../../media/adjectives/tall.png"},
{text:"piccolo",image:"../../media/adjectives/small.png"},
{text:"basso",image:"../../media/adjectives/short.png"},
{text:"grande",image:"../../media/adjectives/big.png"}
],
answer:"basso"
},

{
type:"image",
question:"qual è bello ?",
speak:"bello",
options:[
{text:"basso",image:"../../media/adjectives/short.png"},
{text:"grande",image:"../../media/adjectives/big.png"},
{text:"piccolo",image:"../../media/adjectives/small.png"},
{text:"bello",image:"../../media/adjectives/beautiful.png"}
],
answer:"bello"
},

/* WORD */

{
type:"word",
question:"Che immagine è?",
image:"../../media/adjectives/big.png",
options:["piccolo","grande","alto","basso"],
answer:"grande"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/adjectives/small.png",
options:["bello","piccolo","grande","alto"],
answer:"piccolo"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/adjectives/tall.png",
options:["grande","alto","bello","piccolo"],
answer:"alto"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/adjectives/short.png",
options:["alto","piccolo","basso","grande"],
answer:"basso"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/adjectives/beautiful.png",
options:["basso","grande","piccolo","bello"],
answer:"bello"
},

/* AUDIO */

{
type:"audio",
speak:"grande",
question:"Che parola hai sentito?",
options:["piccolo","grande","alto","basso"],
answer:"grande"
},

{
type:"audio",
speak:"piccolo",
question:"Che parola hai sentito?",
options:["bello","piccolo","grande","alto"],
answer:"piccolo"
},

{
type:"audio",
speak:"alto",
question:"Che parola hai sentito?",
options:["grande","alto","bello","piccolo"],
answer:"alto"
},

{
type:"audio",
speak:"basso",
question:"Che parola hai sentito?",
options:["alto","piccolo","basso","grande"],
answer:"basso"
},

{
type:"audio",
speak:"bello",
question:"Che parola hai sentito?",
options:["basso","grande","piccolo","bello"],
answer:"bello"
},

/* BUILD IT */

{
type:"build-it",
speak:"Il cane è grande",
question:"Costruisci la frase in italiano:",
text:"سگ بزرگ است",
words:["cane","Il","grande","è"],
answer:["Il","cane","è","grande"]
},

{
type:"build-it",
speak:"Il gatto è piccolo",
question:"Costruisci la frase in italiano:",
text:"گربه کوچک است",
words:["gatto","Il","piccolo","è"],
answer:["Il","gatto","è","piccolo"]
},

{
type:"build-it",
speak:"Lui è alto",
question:"Costruisci la frase in italiano:",
text:"او بلند است",
words:["alto","è","Lui"],
answer:["Lui","è","alto"]
},

{
type:"build-it",
speak:"Lei è bassa",
question:"Costruisci la frase in italiano:",
text:"او کوتاه است",
words:["bassa","è","Lei"],
answer:["Lei","è","bassa"]
},

{
type:"build-it",
speak:"Lei è bella",
question:"Costruisci la frase in italiano:",
text:"او زیبا است",
words:["bella","è","Lei"],
answer:["Lei","è","bella"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Il cane è grande",
question:"ترجمه را بساز:",
text:"Il cane è grande",
words:["است","بزرگ","سگ"],
answer:["سگ","بزرگ","است"]
},

{
type:"build-fa",
speak:"Il gatto è piccolo",
question:"ترجمه را بساز:",
text:"Il gatto è piccolo",
words:["است","کوچک","گربه"],
answer:["گربه","کوچک","است"]
},

{
type:"build-fa",
speak:"Lui è alto",
question:"ترجمه را بساز:",
text:"Lui è alto",
words:["است","بلند","او"],
answer:["او","بلند","است"]
},

{
type:"build-fa",
speak:"Lei è bassa",
question:"ترجمه را بساز:",
text:"Lei è bassa",
words:["است","کوتاه","او"],
answer:["او","کوتاه","است"]
},

{
type:"build-fa",
speak:"Lei è bella",
question:"ترجمه را بساز:",
text:"Lei è bella",
words:["است","زیبا","او"],
answer:["او","زیبا","است"]
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
