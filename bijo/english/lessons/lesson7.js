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
question:"tomato کدام است؟",
speak:"tomato",
options:[
{text:"potato",image:"../../media/vegetables/potato.png"},
{text:"tomato",image:"../../media/vegetables/tomato.png"},
{text:"carrot",image:"../../media/vegetables/carrot.png"},
{text:"onion",image:"../../media/vegetables/onion.png"}
],
answer:"tomato"
},

{
type:"image",
question:"potato کدام است؟",
speak:"potato",
options:[
{text:"onion",image:"../../media/vegetables/onion.png"},
{text:"potato",image:"../../media/vegetables/potato.png"},
{text:"cucumber",image:"../../media/vegetables/cucumber.png"},
{text:"tomato",image:"../../media/vegetables/tomato.png"}
],
answer:"potato"
},

{
type:"image",
question:"carrot کدام است؟",
speak:"carrot",
options:[
{text:"tomato",image:"../../media/vegetables/tomato.png"},
{text:"carrot",image:"../../media/vegetables/carrot.png"},
{text:"cucumber",image:"../../media/vegetables/cucumber.png"},
{text:"potato",image:"../../media/vegetables/potato.png"}
],
answer:"carrot"
},

{
type:"image",
question:"onion کدام است؟",
speak:"onion",
options:[
{text:"carrot",image:"../../media/vegetables/carrot.png"},
{text:"potato",image:"../../media/vegetables/potato.png"},
{text:"onion",image:"../../media/vegetables/onion.png"},
{text:"tomato",image:"../../media/vegetables/tomato.png"}
],
answer:"onion"
},

{
type:"image",
question:"cucumber کدام است؟",
speak:"cucumber",
options:[
{text:"onion",image:"../../media/vegetables/onion.png"},
{text:"tomato",image:"../../media/vegetables/tomato.png"},
{text:"potato",image:"../../media/vegetables/potato.png"},
{text:"cucumber",image:"../../media/vegetables/cucumber.png"}
],
answer:"cucumber"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/tomato.png",
options:["potato","tomato","carrot","onion"],
answer:"tomato"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/potato.png",
options:["onion","potato","cucumber","tomato"],
answer:"potato"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/carrot.png",
options:["tomato","carrot","cucumber","potato"],
answer:"carrot"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/onion.png",
options:["carrot","potato","onion","tomato"],
answer:"onion"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/vegetables/cucumber.png",
options:["onion","tomato","potato","cucumber"],
answer:"cucumber"
},

/* AUDIO */

{
type:"audio",
speak:"tomato",
question:"کدام کلمه را شنیدی؟",
options:["potato","tomato","carrot","onion"],
answer:"tomato"
},

{
type:"audio",
speak:"potato",
question:"کدام کلمه را شنیدی؟",
options:["onion","potato","cucumber","tomato"],
answer:"potato"
},

{
type:"audio",
speak:"carrot",
question:"کدام کلمه را شنیدی؟",
options:["tomato","carrot","cucumber","potato"],
answer:"carrot"
},

{
type:"audio",
speak:"onion",
question:"کدام کلمه را شنیدی؟",
options:["carrot","potato","onion","tomato"],
answer:"onion"
},

{
type:"audio",
speak:"cucumber",
question:"کدام کلمه را شنیدی؟",
options:["onion","tomato","potato","cucumber"],
answer:"cucumber"
},

/* BUILD EN */

{
type:"build-en",
speak:"This is a tomato",
question:"جمله انگلیسی را بساز:",
text:"این یک گوجه است",
words:["tomato","a","is","This"],
answer:["This","is","a","tomato"]
},

{
type:"build-en",
speak:"This is a potato",
question:"جمله انگلیسی را بساز:",
text:"این یک سیب‌زمینی است",
words:["potato","a","is","This"],
answer:["This","is","a","potato"]
},

{
type:"build-en",
speak:"This is a carrot",
question:"جمله انگلیسی را بساز:",
text:"این یک هویج است",
words:["carrot","a","is","This"],
answer:["This","is","a","carrot"]
},

{
type:"build-en",
speak:"This is an onion",
question:"جمله انگلیسی را بساز:",
text:"این یک پیاز است",
words:["onion","an","is","This"],
answer:["This","is","an","onion"]
},

{
type:"build-en",
speak:"This is a cucumber",
question:"جمله انگلیسی را بساز:",
text:"این یک خیار است",
words:["cucumber","a","is","This"],
answer:["This","is","a","cucumber"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"This is a tomato",
question:"ترجمه را بساز:",
text:"This is a tomato",
words:["است","گوجه","یک","این"],
answer:["این","یک","گوجه","است"]
},

{
type:"build-fa",
speak:"This is a potato",
question:"ترجمه را بساز:",
text:"This is a potato",
words:["است","سیب‌زمینی","یک","این"],
answer:["این","یک","سیب‌زمینی","است"]
},

{
type:"build-fa",
speak:"This is a carrot",
question:"ترجمه را بساز:",
text:"This is a carrot",
words:["است","هویج","یک","این"],
answer:["این","یک","هویج","است"]
},

{
type:"build-fa",
speak:"This is an onion",
question:"ترجمه را بساز:",
text:"This is an onion",
words:["است","پیاز","یک","این"],
answer:["این","یک","پیاز","است"]
},

{
type:"build-fa",
speak:"This is a cucumber",
question:"ترجمه را بساز:",
text:"This is a cucumber",
words:["است","خیار","یک","این"],
answer:["این","یک","خیار","است"]
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
