let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar";
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
question:"أي منها سعيد ؟",
speak:"سعيد",
options:[
{text:"حزين",image:"../../media/feelings/sad.png"},
{text:"سعيد",image:"../../media/feelings/happy.png"},
{text:"غاضب",image:"../../media/feelings/angry.png"},
{text:"متعب",image:"../../media/feelings/tired.png"}
],
answer:"سعيد"
},

{
type:"image",
question:"أي منها حزين ؟",
speak:"حزين",
options:[
{text:"متعب",image:"../../media/feelings/tired.png"},
{text:"حزين",image:"../../media/feelings/sad.png"},
{text:"جائع",image:"../../media/feelings/hungry.png"},
{text:"سعيد",image:"../../media/feelings/happy.png"}
],
answer:"حزين"
},

{
type:"image",
question:"أي منها غاضب ؟",
speak:"غاضب",
options:[
{text:"سعيد",image:"../../media/feelings/happy.png"},
{text:"غاضب",image:"../../media/feelings/angry.png"},
{text:"جائع",image:"../../media/feelings/hungry.png"},
{text:"حزين",image:"../../media/feelings/sad.png"}
],
answer:"غاضب"
},

{
type:"image",
question:"أي منها متعب ؟",
speak:"متعب",
options:[
{text:"غاضب",image:"../../media/feelings/angry.png"},
{text:"حزين",image:"../../media/feelings/sad.png"},
{text:"متعب",image:"../../media/feelings/tired.png"},
{text:"سعيد",image:"../../media/feelings/happy.png"}
],
answer:"متعب"
},

{
type:"image",
question:"أي منها جائع ؟",
speak:"جائع",
options:[
{text:"متعب",image:"../../media/feelings/tired.png"},
{text:"سعيد",image:"../../media/feelings/happy.png"},
{text:"حزين",image:"../../media/feelings/sad.png"},
{text:"جائع",image:"../../media/feelings/hungry.png"}
],
answer:"جائع"
},

/* WORD */

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/feelings/happy.png",
options:["حزين","سعيد","غاضب","متعب"],
answer:"سعيد"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/feelings/sad.png",
options:["متعب","حزين","جائع","سعيد"],
answer:"حزين"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/feelings/angry.png",
options:["سعيد","غاضب","جائع","حزين"],
answer:"غاضب"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/feelings/tired.png",
options:["غاضب","حزين","متعب","سعيد"],
answer:"متعب"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/feelings/hungry.png",
options:["متعب","سعيد","حزين","جائع"],
answer:"جائع"
},

/* AUDIO */

{
type:"audio",
speak:"سعيد",
question:"أي كلمة سمعت؟",
options:["حزين","سعيد","غاضب","متعب"],
answer:"سعيد"
},

{
type:"audio",
speak:"حزين",
question:"أي كلمة سمعت؟",
options:["متعب","حزين","جائع","سعيد"],
answer:"حزين"
},

{
type:"audio",
speak:"غاضب",
question:"أي كلمة سمعت？",
options:["سعيد","غاضب","جائع","حزين"],
answer:"غاضب"
},

{
type:"audio",
speak:"متعب",
question:"أي كلمة سمعت؟",
options:["غاضب","حزين","متعب","سعيد"],
answer:"متعب"
},

{
type:"audio",
speak:"جائع",
question:"أي كلمة سمعت؟",
options:["متعب","سعيد","حزين","جائع"],
answer:"جائع"
},

/* BUILD AR */

{
type:"build-ar",
speak:"أنا سعيد",
question:"قم بتكوين الجملة العربية:",
text:"من خوشحال هستم",
words:["سعيد","أنا"],
answer:["أنا","سعيد"]
},

{
type:"build-ar",
speak:"أنا حزين",
question:"قم بتكوين الجملة العربية:",
text:"من ناراحت هستم",
words:["حزين","أنا"],
answer:["أنا","حزين"]
},

{
type:"build-ar",
speak:"أنا غاضب",
question:"قم بتكوين الجملة العربية:",
text:"من عصبانی هستم",
words:["غاضب","أنا"],
answer:["أنا","غاضب"]
},

{
type:"build-ar",
speak:"أنا متعب",
question:"قم بتكوين الجملة العربية:",
text:"من خسته هستم",
words:["متعب","أنا"],
answer:["أنا","متعب"]
},

{
type:"build-ar",
speak:"أنا جائع",
question:"قم بتكوين الجملة العربية:",
text:"من گرسنه هستم",
words:["جائع","أنا"],
answer:["أنا","جائع"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"أنا سعيد",
question:"ترجمه را بساز:",
text:"أنا سعيد",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"أنا حزين",
question:"ترجمه را بساز:",
text:"أنا حزين",
words:["هستم","ناراحت","من"],
answer:["من","ناراحت","هستم"]
},

{
type:"build-fa",
speak:"أنا غاضب",
question:"ترجمه را بساز:",
text:"أنا غاضب",
words:["هستم","عصبانی","من"],
answer:["من","عصبانی","هستم"]
},

{
type:"build-fa",
speak:"أنا متعب",
question:"ترجمه را بساز:",
text:"أنا متعب",
words:["هستم","خسته","من"],
answer:["من","خسته","هستم"]
},

{
type:"build-fa",
speak:"أنا جائع",
question:"ترجمه را بساز:",
text:"أنا جائع",
words:["هستم","گرسنه","من"],
answer:["من","گرسنه","هستم"]
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

  else if (q.type === "build-en" || q.type === "build-fa" || q.type === "build-ar") {
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

if (q.type === "build-en" || q.type === "build-ar") {
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
