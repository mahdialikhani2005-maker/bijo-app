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
question:"какой из них один ?",
speak:"один",
options:[
{text:"два",image:"../../media/numbers/two.png"},
{text:"один",image:"../../media/numbers/one.png"},
{text:"три",image:"../../media/numbers/three.png"},
{text:"четыре",image:"../../media/numbers/four.png"}
],
answer:"один"
},

{
type:"image",
question:"какой из них два ?",
speak:"два",
options:[
{text:"четыре",image:"../../media/numbers/four.png"},
{text:"два",image:"../../media/numbers/two.png"},
{text:"пять",image:"../../media/numbers/five.png"},
{text:"один",image:"../../media/numbers/one.png"}
],
answer:"два"
},

{
type:"image",
question:"какой из них три ?",
speak:"три",
options:[
{text:"один",image:"../../media/numbers/one.png"},
{text:"три",image:"../../media/numbers/three.png"},
{text:"пять",image:"../../media/numbers/five.png"},
{text:"два",image:"../../media/numbers/two.png"}
],
answer:"три"
},

{
type:"image",
question:"какой из них четыре ?",
speak:"четыре",
options:[
{text:"три",image:"../../media/numbers/three.png"},
{text:"два",image:"../../media/numbers/two.png"},
{text:"четыре",image:"../../media/numbers/four.png"},
{text:"один",image:"../../media/numbers/one.png"}
],
answer:"четыре"
},

{
type:"image",
question:"какой из них пять ?",
speak:"пять",
options:[
{text:"четыре",image:"../../media/numbers/four.png"},
{text:"один",image:"../../media/numbers/one.png"},
{text:"два",image:"../../media/numbers/two.png"},
{text:"пять",image:"../../media/numbers/five.png"}
],
answer:"пять"
},

/* WORD */

{
type:"word",
question:"Какое это число?",
image:"../../media/numbers/one.png",
options:["два","один","три","четыре"],
answer:"один"
},

{
type:"word",
question:"Какое это число?",
image:"../../media/numbers/two.png",
options:["четыре","два","пять","один"],
answer:"два"
},

{
type:"word",
question:"Какое это число?",
image:"../../media/numbers/three.png",
options:["один","три","пять","два"],
answer:"три"
},

{
type:"word",
question:"Какое это число?",
image:"../../media/numbers/four.png",
options:["три","два","четыре","один"],
answer:"четыре"
},

{
type:"word",
question:"Какое это число?",
image:"../../media/numbers/five.png",
options:["четыре","один","два","пять"],
answer:"пять"
},

/* AUDIO */

{
type:"audio",
speak:"один",
question:"Какое слово ты услышал?",
options:["два","один","три","четыре"],
answer:"один"
},

{
type:"audio",
speak:"два",
question:"Какое слово ты услышал?",
options:["четыре","два","пять","один"],
answer:"два"
},

{
type:"audio",
speak:"три",
question:"Какое слово ты услышал?",
options:["один","три","пять","два"],
answer:"три"
},

{
type:"audio",
speak:"четыре",
question:"Какое слово ты услышал?",
options:["три","два","четыре","один"],
answer:"четыре"
},

{
type:"audio",
speak:"пять",
question:"Какое слово ты услышал?",
options:["четыре","один","два","пять"],
answer:"пять"
},

/* BUILD RU */

{
type:"build-ru",
speak:"У меня одна книга",
question:"Составьте русское предложение:",
text:"من یک کتاب دارم",
words:["книга","одна","У","меня"],
answer:["У","меня","одна","книга"]
},

{
type:"build-ru",
speak:"У меня две книги",
question:"Составьте русское предложение:",
text:"من دو کتاب دارم",
words:["книги","две","У","меня"],
answer:["У","меня","две","книги"]
},

{
type:"build-ru",
speak:"У меня три книги",
question:"Составьте русское предложение:",
text:"من سه کتاب دارم",
words:["книги","три","У","меня"],
answer:["У","меня","три","книги"]
},

{
type:"build-ru",
speak:"У меня четыре книги",
question:"Составьте русское предложение:",
text:"من چهار کتاب دارم",
words:["книги","четыре","У","меня"],
answer:["У","меня","четыре","книги"]
},

{
type:"build-ru",
speak:"У меня пять книг",
question:"Составьте русское предложение:",
text:"من پنج کتاب دارم",
words:["книг","пять","У","меня"],
answer:["У","меня","пять","книг"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"У меня одна книга",
question:"ترجمه را بساز:",
text:"У меня одна книга",
words:["دارم","یک","کتاب","من"],
answer:["من","یک","کتاب","دارم"]
},

{
type:"build-fa",
speak:"У меня две книги",
question:"ترجمه را بساز:",
text:"У меня две книги",
words:["دارم","دو","کتاب","من"],
answer:["من","دو","کتاب","دارم"]
},

{
type:"build-fa",
speak:"У меня три книги",
question:"ترجمه را بساز:",
text:"У меня три книги",
words:["دارم","سه","کتاب","من"],
answer:["من","سه","کتاب","دارم"]
},

{
type:"build-fa",
speak:"У меня четыре книги",
question:"ترجمه را بساز:",
text:"У меня четыре книги",
words:["دارم","چهار","کتاب","من"],
answer:["من","چهار","کتاب","دارم"]
},

{
type:"build-fa",
speak:"У меня пять книг",
question:"ترجمه را بساز:",
text:"У меня пять книг",
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
