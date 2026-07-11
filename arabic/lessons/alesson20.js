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
question:"أي منها من ؟",
speak:"من",
options:[
{text:"ماذا",image:"../../media/questions/what.png"},
{text:"من",image:"../../media/questions/who.png"},
{text:"أين",image:"../../media/questions/where.png"},
{text:"متى",image:"../../media/questions/when.png"}
],
answer:"من"
},

{
type:"image",
question:"أي منها ماذا ؟",
speak:"ماذا",
options:[
{text:"لماذا",image:"../../media/questions/why.png"},
{text:"ماذا",image:"../../media/questions/what.png"},
{text:"من",image:"../../media/questions/who.png"},
{text:"أين",image:"../../media/questions/where.png"}
],
answer:"ماذا"
},

{
type:"image",
question:"أي منها أين ؟",
speak:"أين",
options:[
{text:"ماذا",image:"../../media/questions/what.png"},
{text:"أين",image:"../../media/questions/where.png"},
{text:"لماذا",image:"../../media/questions/why.png"},
{text:"من",image:"../../media/questions/who.png"}
],
answer:"أين"
},

{
type:"image",
question:"أي منها متى ؟",
speak:"متى",
options:[
{text:"أين",image:"../../media/questions/where.png"},
{text:"من",image:"../../media/questions/who.png"},
{text:"متى",image:"../../media/questions/when.png"},
{text:"ماذا",image:"../../media/questions/what.png"}
],
answer:"متى"
},

{
type:"image",
question:"أي منها لماذا ؟",
speak:"لماذا",
options:[
{text:"متى",image:"../../media/questions/when.png"},
{text:"ماذا",image:"../../media/questions/what.png"},
{text:"من",image:"../../media/questions/who.png"},
{text:"لماذا",image:"../../media/questions/why.png"}
],
answer:"لماذا"
},

/* WORD */

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/questions/who.png",
options:["ماذا","من","أين","متى"],
answer:"من"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/questions/what.png",
options:["لماذا","ماذا","من","أين"],
answer:"ماذا"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/questions/where.png",
options:["ماذا","أين","لماذا","من"],
answer:"أين"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/questions/when.png",
options:["أين","من","متى","ماذا"],
answer:"متى"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/questions/why.png",
options:["متى","ماذا","من","لماذا"],
answer:"لماذا"
},

/* AUDIO */

{
type:"audio",
speak:"من",
question:"أي كلمة سمعت؟",
options:["ماذا","من","أين","متى"],
answer:"من"
},

{
type:"audio",
speak:"ماذا",
question:"أي كلمة سمعت؟",
options:["لماذا","ماذا","من","أين"],
answer:"ماذا"
},

{
type:"audio",
speak:"أين",
question:"أي كلمة سمعت؟",
options:["ماذا","أين","لماذا","من"],
answer:"أين"
},

{
type:"audio",
speak:"متى",
question:"أي كلمة سمعت؟",
options:["أين","من","متى","ماذا"],
answer:"متى"
},

{
type:"audio",
speak:"لماذا",
question:"أي كلمة سمعت؟",
options:["متى","ماذا","من","لماذا"],
answer:"لماذا"
},

/* BUILD AR */

{
type:"build-ar",
speak:"من هي؟",
question:"قم بتكوين الجملة العربية:",
text:"او کیست؟",
words:["من","هي"],
answer:["من","هي؟"]
},

{
type:"build-ar",
speak:"ما هذا؟",
question:"قم بتكوين الجملة العربية:",
text:"این چیست؟",
words:["ما","هذا"],
answer:["ما","هذا؟"]
},

{
type:"build-ar",
speak:"أين المدرسة؟",
question:"قم بتكوين الجملة العربية:",
text:"مدرسه کجاست؟",
words:["أين","المدرسة"],
answer:["أين","المدرسة؟"]
},

{
type:"build-ar",
speak:"متى الدرس؟",
question:"قم بتكوين الجملة العربية:",
text:"کلاس کی است؟",
words:["متى","الدرس"],
answer:["متى","الدرس؟"]
},

{
type:"build-ar",
speak:"لماذا أنت سعيد؟",
question:"قم بتكوين الجملة العربية:",
text:"چرا خوشحالی؟",
words:["لماذا","أنت","سعيد"],
answer:["لماذا","أنت","سعيد؟"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"من هي؟",
question:"ترجمه را بساز:",
text:"من هي؟",
words:["کیست","او"],
answer:["او","کیست؟"]
},

{
type:"build-fa",
speak:"ما هذا؟",
question:"ترجمه را بساز:",
text:"ما هذا؟",
words:["چیست","این"],
answer:["این","چیست؟"]
},

{
type:"build-fa",
speak:"أين المدرسة؟",
question:"ترجمه را بساز:",
text:"أين المدرسة؟",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست؟"]
},

{
type:"build-fa",
speak:"متى الدرس؟",
question:"ترجمه را بساز:",
text:"متى الدرس؟",
words:["کیست","کلاس"],
answer:["کلاس","کیست؟"]
},

{
type:"build-fa",
speak:"لماذا أنت سعيد؟",
question:"ترجمه را بساز:",
text:"لماذا أنت سعيد؟",
words:["چرا","خوشحال","تو","هستی"],
answer:["تو","چرا","خوشحال","هستی؟"]
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
