let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
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
question:"one کدام است؟",
speak:"one",
options:[
{text:"two",image:"../../media/numbers/two.png"},
{text:"one",image:"../../media/numbers/one.png"},
{text:"three",image:"../../media/numbers/three.png"},
{text:"four",image:"../../media/numbers/four.png"}
],
answer:"one"
},

{
type:"image",
question:"two کدام است؟",
speak:"two",
options:[
{text:"four",image:"../../media/numbers/four.png"},
{text:"two",image:"../../media/numbers/two.png"},
{text:"five",image:"../../media/numbers/five.png"},
{text:"one",image:"../../media/numbers/one.png"}
],
answer:"two"
},

{
type:"image",
question:"three کدام است؟",
speak:"three",
options:[
{text:"one",image:"../../media/numbers/one.png"},
{text:"three",image:"../../media/numbers/three.png"},
{text:"five",image:"../../media/numbers/five.png"},
{text:"two",image:"../../media/numbers/two.png"}
],
answer:"three"
},

{
type:"image",
question:"four کدام است؟",
speak:"four",
options:[
{text:"three",image:"../../media/numbers/three.png"},
{text:"two",image:"../../media/numbers/two.png"},
{text:"four",image:"../../media/numbers/four.png"},
{text:"one",image:"../../media/numbers/one.png"}
],
answer:"four"
},

{
type:"image",
question:"five کدام است؟",
speak:"five",
options:[
{text:"four",image:"../../media/numbers/four.png"},
{text:"one",image:"../../media/numbers/one.png"},
{text:"two",image:"../../media/numbers/two.png"},
{text:"five",image:"../../media/numbers/five.png"}
],
answer:"five"
},

/* WORD */

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/one.png",
options:["two","one","three","four"],
answer:"one"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/two.png",
options:["four","two","five","one"],
answer:"two"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/three.png",
options:["one","three","five","two"],
answer:"three"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/four.png",
options:["three","two","four","one"],
answer:"four"
},

{
type:"word",
question:"این عدد چیست؟",
image:"../../media/numbers/five.png",
options:["four","one","two","five"],
answer:"five"
},

/* AUDIO */

{
type:"audio",
speak:"one",
question:"کدام کلمه را شنیدی؟",
options:["two","one","three","four"],
answer:"one"
},

{
type:"audio",
speak:"two",
question:"کدام کلمه را شنیدی؟",
options:["four","two","five","one"],
answer:"two"
},

{
type:"audio",
speak:"three",
question:"کدام کلمه را شنیدی؟",
options:["one","three","five","two"],
answer:"three"
},

{
type:"audio",
speak:"four",
question:"کدام کلمه را شنیدی؟",
options:["three","two","four","one"],
answer:"four"
},

{
type:"audio",
speak:"five",
question:"کدام کلمه را شنیدی؟",
options:["four","one","two","five"],
answer:"five"
},

/* BUILD EN */

{
type:"build-en",
speak:"I have one book",
question:"جمله انگلیسی را بساز:",
text:"من یک کتاب دارم",
words:["one","have","book","I"],
answer:["I","have","one","book"]
},

{
type:"build-en",
speak:"I have two books",
question:"جمله انگلیسی را بساز:",
text:"من دو کتاب دارم",
words:["two","have","books","I"],
answer:["I","have","two","books"]
},

{
type:"build-en",
speak:"I have three books",
question:"جمله انگلیسی را بساز:",
text:"من سه کتاب دارم",
words:["three","have","books","I"],
answer:["I","have","three","books"]
},

{
type:"build-en",
speak:"I have four books",
question:"جمله انگلیسی را بساز:",
text:"من چهار کتاب دارم",
words:["four","have","books","I"],
answer:["I","have","four","books"]
},

{
type:"build-en",
speak:"I have five books",
question:"جمله انگلیسی را بساز:",
text:"من پنج کتاب دارم",
words:["five","have","books","I"],
answer:["I","have","five","books"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"I have one book",
question:"ترجمه را بساز:",
text:"I have one book",
words:["دارم","یک","کتاب","من"],
answer:["من","یک","کتاب","دارم"]
},

{
type:"build-fa",
speak:"I have two books",
question:"ترجمه را بساز:",
text:"I have two books",
words:["دارم","دو","کتاب","من"],
answer:["من","دو","کتاب","دارم"]
},

{
type:"build-fa",
speak:"I have three books",
question:"ترجمه را بساز:",
text:"I have three books",
words:["دارم","سه","کتاب","من"],
answer:["من","سه","کتاب","دارم"]
},

{
type:"build-fa",
speak:"I have four books",
question:"ترجمه را بساز:",
text:"I have four books",
words:["دارم","چهار","کتاب","من"],
answer:["من","چهار","کتاب","دارم"]
},

{
type:"build-fa",
speak:"I have five books",
question:"ترجمه را بساز:",
text:"I have five books",
words:["دارم","پنج","کتاب","من"],
answer:["من","پنج","کتاب","دارم"]
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
