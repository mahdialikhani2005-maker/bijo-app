let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "tr";
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
question:"hangisi büyük ?",
speak:"büyük",
options:[
{text:"küçük",image:"../../media/adjectives/small.png"},
{text:"büyük",image:"../../media/adjectives/big.png"},
{text:"uzun",image:"../../media/adjectives/tall.png"},
{text:"kısa",image:"../../media/adjectives/short.png"}
],
answer:"büyük"
},

{
type:"image",
question:"hangisi küçük ?",
speak:"küçük",
options:[
{text:"güzel",image:"../../media/adjectives/beautiful.png"},
{text:"küçük",image:"../../media/adjectives/small.png"},
{text:"büyük",image:"../../media/adjectives/big.png"},
{text:"uzun",image:"../../media/adjectives/tall.png"}
],
answer:"küçük"
},

{
type:"image",
question:"hangisi uzun ?",
speak:"uzun",
options:[
{text:"büyük",image:"../../media/adjectives/big.png"},
{text:"uzun",image:"../../media/adjectives/tall.png"},
{text:"güzel",image:"../../media/adjectives/beautiful.png"},
{text:"küçük",image:"../../media/adjectives/small.png"}
],
answer:"uzun"
},

{
type:"image",
question:"hangisi kısa ?",
speak:"kısa",
options:[
{text:"uzun",image:"../../media/adjectives/tall.png"},
{text:"küçük",image:"../../media/adjectives/small.png"},
{text:"kısa",image:"../../media/adjectives/short.png"},
{text:"büyük",image:"../../media/adjectives/big.png"}
],
answer:"kısa"
},

{
type:"image",
question:"hangisi güzel ?",
speak:"güzel",
options:[
{text:"kısa",image:"../../media/adjectives/short.png"},
{text:"büyük",image:"../../media/adjectives/big.png"},
{text:"küçük",image:"../../media/adjectives/small.png"},
{text:"güzel",image:"../../media/adjectives/beautiful.png"}
],
answer:"güzel"
},

/* WORD */

{
type:"word",
question:"Bu resim ne?",
image:"../../media/adjectives/big.png",
options:["küçük","büyük","uzun","kısa"],
answer:"büyük"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/adjectives/small.png",
options:["güzel","küçük","büyük","uzun"],
answer:"küçük"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/adjectives/tall.png",
options:["büyük","uzun","güzel","küçük"],
answer:"uzun"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/adjectives/short.png",
options:["uzun","küçük","kısa","büyük"],
answer:"kısa"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/adjectives/beautiful.png",
options:["kısa","büyük","küçük","güzel"],
answer:"güzel"
},

/* AUDIO */

{
type:"audio",
speak:"büyük",
question:"Hangi kelimeyi duydun?",
options:["küçük","büyük","uzun","kısa"],
answer:"büyük"
},

{
type:"audio",
speak:"küçük",
question:"Hangi kelimeyi duydun?",
options:["güzel","küçük","büyük","uzun"],
answer:"küçük"
},

{
type:"audio",
speak:"uzun",
question:"Hangi kelimeyi duydun?",
options:["büyük","uzun","güzel","küçük"],
answer:"uzun"
},

{
type:"audio",
speak:"kısa",
question:"Hangi kelimeyi duydun?",
options:["uzun","küçük","kısa","büyük"],
answer:"kısa"
},

{
type:"audio",
speak:"güzel",
question:"Hangi kelimeyi duydun?",
options:["kısa","büyük","küçük","güzel"],
answer:"güzel"
},

/* BUILD TR */

{
type:"build-tr",
speak:"Köpek büyük",
question:"Türkçe cümleyi kur:",
text:"سگ بزرگ است",
words:["Köpek","büyük"],
answer:["Köpek","büyük"]
},

{
type:"build-tr",
speak:"Kedi küçük",
question:"Türkçe cümleyi kur:",
text:"گربه کوچک است",
words:["Kedi","küçük"],
answer:["Kedi","küçük"]
},

{
type:"build-tr",
speak:"O uzun",
question:"Türkçe cümleyi kur:",
text:"او بلند است",
words:["O","uzun"],
answer:["O","uzun"]
},

{
type:"build-tr",
speak:"O kısa",
question:"Türkçe cümleyi kur:",
text:"او کوتاه است",
words:["O","kısa"],
answer:["O","kısa"]
},

{
type:"build-tr",
speak:"O güzel",
question:"Türkçe cümleyi kur:",
text:"او زیبا است",
words:["O","güzel"],
answer:["O","güzel"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Köpek büyük",
question:"ترجمه را بساز:",
text:"Köpek büyük",
words:["است","بزرگ","سگ"],
answer:["سگ","بزرگ","است"]
},

{
type:"build-fa",
speak:"Kedi küçük",
question:"ترجمه را بساز:",
text:"Kedi küçük",
words:["است","کوچک","گربه"],
answer:["گربه","کوچک","است"]
},

{
type:"build-fa",
speak:"O uzun",
question:"ترجمه را بساز:",
text:"O uzun",
words:["است","بلند","او"],
answer:["او","بلند","است"]
},

{
type:"build-fa",
speak:"O kısa",
question:"ترجمه را بساز:",
text:"O kısa",
words:["است","کوتاه","او"],
answer:["او","کوتاه","است"]
},

{
type:"build-fa",
speak:"O güzel",
question:"ترجمه را بساز:",
text:"O güzel",
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
