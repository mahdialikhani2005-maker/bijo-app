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
question:"welches ist Kopf ?",
speak:"Kopf",
options:[
{text:"Hand",image:"../../media/body/hand.png"},
{text:"Kopf",image:"../../media/body/head.png"},
{text:"Auge",image:"../../media/body/eye.png"},
{text:"Nase",image:"../../media/body/nose.png"}
],
answer:"Kopf"
},

{
type:"image",
question:"welches ist Hand ?",
speak:"Hand",
options:[
{text:"Auge",image:"../../media/body/eye.png"},
{text:"Hand",image:"../../media/body/hand.png"},
{text:"Fuß",image:"../../media/body/foot.png"},
{text:"Kopf",image:"../../media/body/head.png"}
],
answer:"Hand"
},

{
type:"image",
question:"welches ist Auge ?",
speak:"Auge",
options:[
{text:"Kopf",image:"../../media/body/head.png"},
{text:"Auge",image:"../../media/body/eye.png"},
{text:"Nase",image:"../../media/body/nose.png"},
{text:"Hand",image:"../../media/body/hand.png"}
],
answer:"Auge"
},

{
type:"image",
question:"welches ist Fuß ?",
speak:"Fuß",
options:[
{text:"Hand",image:"../../media/body/hand.png"},
{text:"Kopf",image:"../../media/body/head.png"},
{text:"Fuß",image:"../../media/body/foot.png"},
{text:"Auge",image:"../../media/body/eye.png"}
],
answer:"Fuß"
},

{
type:"image",
question:"welches ist Nase ?",
speak:"Nase",
options:[
{text:"Auge",image:"../../media/body/eye.png"},
{text:"Nase",image:"../../media/body/nose.png"},
{text:"Kopf",image:"../../media/body/head.png"},
{text:"Hand",image:"../../media/body/hand.png"}
],
answer:"Nase"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/body/head.png",
options:["Hand","Kopf","Auge","Nase"],
answer:"Kopf"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/body/hand.png",
options:["Auge","Hand","Fuß","Kopf"],
answer:"Hand"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/body/eye.png",
options:["Kopf","Auge","Nase","Hand"],
answer:"Auge"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/body/foot.png",
options:["Hand","Fuß","Kopf","Auge"],
answer:"Fuß"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/body/nose.png",
options:["Auge","Nase","Hand","Kopf"],
answer:"Nase"
},

/* AUDIO */

{
type:"audio",
speak:"Kopf",
question:"Welches Wort hast du gehört?",
options:["Hand","Kopf","Auge","Nase"],
answer:"Kopf"
},

{
type:"audio",
speak:"Hand",
question:"Welches Wort hast du gehört?",
options:["Auge","Hand","Fuß","Kopf"],
answer:"Hand"
},

{
type:"audio",
speak:"Auge",
question:"Welches Wort hast du gehört?",
options:["Kopf","Auge","Nase","Hand"],
answer:"Auge"
},

{
type:"audio",
speak:"Fuß",
question:"Welches Wort hast du gehört?",
options:["Hand","Fuß","Kopf","Auge"],
answer:"Fuß"
},

{
type:"audio",
speak:"Nase",
question:"Welches Wort hast du gehört?",
options:["Auge","Nase","Hand","Kopf"],
answer:"Nase"
},

/* BUILD DE */

{
type:"build-de",
speak:"Das ist mein Kopf",
question:"Bauen Sie den deutschen Satz:",
text:"این سر من است",
words:["Kopf","mein","ist","Das"],
answer:["Das","ist","mein","Kopf"]
},

{
type:"build-de",
speak:"Das ist meine Hand",
question:"Bauen Sie den deutschen Satz:",
text:"این دست من است",
words:["Hand","meine","ist","Das"],
answer:["Das","ist","meine","Hand"]
},

{
type:"build-de",
speak:"Das ist mein Auge",
question:"Bauen Sie den deutschen Satz:",
text:"این چشم من است",
words:["Auge","mein","ist","Das"],
answer:["Das","ist","mein","Auge"]
},

{
type:"build-de",
speak:"Das ist mein Fuß",
question:"Bauen Sie den deutschen Satz:",
text:"این پای من است",
words:["Fuß","mein","ist","Das"],
answer:["Das","ist","mein","Fuß"]
},

{
type:"build-de",
speak:"Das ist meine Nase",
question:"Bauen Sie den deutschen Satz:",
text:"این بینی من است",
words:["Nase","meine","ist","Das"],
answer:["Das","ist","meine","Nase"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Das ist mein Kopf",
question:"ترجمه را بساز:",
text:"Das ist mein Kopf",
words:["است","سر","این","من"],
answer:["این","سر","من","است"]
},

{
type:"build-fa",
speak:"Das ist meine Hand",
question:"ترجمه را بساز:",
text:"Das ist meine Hand",
words:["است","دست","این","من"],
answer:["این","دست","من","است"]
},

{
type:"build-fa",
speak:"Das ist mein Auge",
question:"ترجمه را بساز:",
text:"Das ist mein Auge",
words:["است","چشم","این","من"],
answer:["این","چشم","من","است"]
},

{
type:"build-fa",
speak:"Das ist mein Fuß",
question:"ترجمه را بساز:",
text:"Das ist mein Fuß",
words:["است","پا","این","من"],
answer:["این","پا","من","است"]
},

{
type:"build-fa",
speak:"Das ist meine Nase",
question:"ترجمه را بساز:",
text:"Das ist meine Nase",
words:["است","بینی","این","من"],
answer:["این","بینی","من","است"]
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
