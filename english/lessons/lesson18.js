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
question:"eat کدام است؟",
speak:"eat",
options:[
{text:"sleep",image:"../../media/actions/sleep.png"},
{text:"eat",image:"../../media/actions/eat.png"},
{text:"walk",image:"../../media/actions/walk.png"},
{text:"read",image:"../../media/actions/read.png"}
],
answer:"eat"
},

{
type:"image",
question:"sleep کدام است؟",
speak:"sleep",
options:[
{text:"write",image:"../../media/actions/write.png"},
{text:"sleep",image:"../../media/actions/sleep.png"},
{text:"eat",image:"../../media/actions/eat.png"},
{text:"walk",image:"../../media/actions/walk.png"}
],
answer:"sleep"
},

{
type:"image",
question:"walk کدام است؟",
speak:"walk",
options:[
{text:"eat",image:"../../media/actions/eat.png"},
{text:"walk",image:"../../media/actions/walk.png"},
{text:"write",image:"../../media/actions/write.png"},
{text:"sleep",image:"../../media/actions/sleep.png"}
],
answer:"walk"
},

{
type:"image",
question:"read کدام است؟",
speak:"read",
options:[
{text:"walk",image:"../../media/actions/walk.png"},
{text:"sleep",image:"../../media/actions/sleep.png"},
{text:"read",image:"../../media/actions/read.png"},
{text:"eat",image:"../../media/actions/eat.png"}
],
answer:"read"
},

{
type:"image",
question:"write کدام است؟",
speak:"write",
options:[
{text:"read",image:"../../media/actions/read.png"},
{text:"eat",image:"../../media/actions/eat.png"},
{text:"sleep",image:"../../media/actions/sleep.png"},
{text:"write",image:"../../media/actions/write.png"}
],
answer:"write"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/eat.png",
options:["sleep","eat","walk","read"],
answer:"eat"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/sleep.png",
options:["write","sleep","eat","walk"],
answer:"sleep"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/walk.png",
options:["eat","walk","write","sleep"],
answer:"walk"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/read.png",
options:["walk","sleep","read","eat"],
answer:"read"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/actions/write.png",
options:["read","eat","sleep","write"],
answer:"write"
},

/* AUDIO */

{
type:"audio",
speak:"eat",
question:"کدام کلمه را شنیدی؟",
options:["sleep","eat","walk","read"],
answer:"eat"
},

{
type:"audio",
speak:"sleep",
question:"کدام کلمه را شنیدی؟",
options:["write","sleep","eat","walk"],
answer:"sleep"
},

{
type:"audio",
speak:"walk",
question:"کدام کلمه را شنیدی؟",
options:["eat","walk","write","sleep"],
answer:"walk"
},

{
type:"audio",
speak:"read",
question:"کدام کلمه را شنیدی؟",
options:["walk","sleep","read","eat"],
answer:"read"
},

{
type:"audio",
speak:"write",
question:"کدام کلمه را شنیدی؟",
options:["read","eat","sleep","write"],
answer:"write"
},

/* BUILD EN */

{
type:"build-en",
speak:"I eat bread",
question:"جمله انگلیسی را بساز:",
text:"من نان می‌خورم",
words:["eat","bread","I"],
answer:["I","eat","bread"]
},

{
type:"build-en",
speak:"I sleep at night",
question:"جمله انگلیسی را بساز:",
text:"من شب می‌خوابم",
words:["sleep","night","at","I"],
answer:["I","sleep","at","night"]
},

{
type:"build-en",
speak:"I walk to school",
question:"جمله انگلیسی را بساز:",
text:"من به مدرسه راه می‌روم",
words:["walk","school","to","I"],
answer:["I","walk","to","school"]
},

{
type:"build-en",
speak:"I read a book",
question:"جمله انگلیسی را بساز:",
text:"من یک کتاب می‌خوانم",
words:["read","book","a","I"],
answer:["I","read","a","book"]
},

{
type:"build-en",
speak:"I write a letter",
question:"جمله انگلیسی را بساز:",
text:"من یک نامه می‌نویسم",
words:["write","letter","a","I"],
answer:["I","write","a","letter"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"I eat bread",
question:"ترجمه را بساز:",
text:"I eat bread",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"I sleep at night",
question:"ترجمه را بساز:",
text:"I sleep at night",
words:["می‌خوابم","شب","در","من"],
answer:["من","شب","می‌خوابم"]
},

{
type:"build-fa",
speak:"I walk to school",
question:"ترجمه را بساز:",
text:"I walk to school",
words:["می‌روم","مدرسه","به","من"],
answer:["من","به","مدرسه","می‌روم"]
},

{
type:"build-fa",
speak:"I read a book",
question:"ترجمه را بساز:",
text:"I read a book",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"I write a letter",
question:"ترجمه را بساز:",
text:"I write a letter",
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
