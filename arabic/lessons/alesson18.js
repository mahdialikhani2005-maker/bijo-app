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
question:"أي منها أكل ؟",
speak:"أكل",
options:[
{text:"نام",image:"../../media/actions/sleep.png"},
{text:"أكل",image:"../../media/actions/eat.png"},
{text:"مشى",image:"../../media/actions/walk.png"},
{text:"قرأ",image:"../../media/actions/read.png"}
],
answer:"أكل"
},

{
type:"image",
question:"أي منها نام ؟",
speak:"نام",
options:[
{text:"كتب",image:"../../media/actions/write.png"},
{text:"نام",image:"../../media/actions/sleep.png"},
{text:"أكل",image:"../../media/actions/eat.png"},
{text:"مشى",image:"../../media/actions/walk.png"}
],
answer:"نام"
},

{
type:"image",
question:"أي منها مشى ؟",
speak:"مشى",
options:[
{text:"أكل",image:"../../media/actions/eat.png"},
{text:"مشى",image:"../../media/actions/walk.png"},
{text:"كتب",image:"../../media/actions/write.png"},
{text:"نام",image:"../../media/actions/sleep.png"}
],
answer:"مشى"
},

{
type:"image",
question:"أي منها قرأ ؟",
speak:"قرأ",
options:[
{text:"مشى",image:"../../media/actions/walk.png"},
{text:"نام",image:"../../media/actions/sleep.png"},
{text:"قرأ",image:"../../media/actions/read.png"},
{text:"أكل",image:"../../media/actions/eat.png"}
],
answer:"قرأ"
},

{
type:"image",
question:"أي منها كتب ؟",
speak:"كتب",
options:[
{text:"قرأ",image:"../../media/actions/read.png"},
{text:"أكل",image:"../../media/actions/eat.png"},
{text:"نام",image:"../../media/actions/sleep.png"},
{text:"كتب",image:"../../media/actions/write.png"}
],
answer:"كتب"
},

/* WORD */

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/actions/eat.png",
options:["نام","أكل","مشى","قرأ"],
answer:"أكل"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/actions/sleep.png",
options:["كتب","نام","أكل","مشى"],
answer:"نام"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/actions/walk.png",
options:["أكل","مشى","كتب","نام"],
answer:"مشى"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/actions/read.png",
options:["مشى","نام","قرأ","أكل"],
answer:"قرأ"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/actions/write.png",
options:["قرأ","أكل","نام","كتب"],
answer:"كتب"
},

/* AUDIO */

{
type:"audio",
speak:"أكل",
question:"أي كلمة سمعت؟",
options:["نام","أكل","مشى","قرأ"],
answer:"أكل"
},

{
type:"audio",
speak:"نام",
question:"أي كلمة سمعت؟",
options:["كتب","نام","أكل","مشى"],
answer:"نام"
},

{
type:"audio",
speak:"مشى",
question:"أي كلمة سمعت؟",
options:["أكل","مشى","كتب","نام"],
answer:"مشى"
},

{
type:"audio",
speak:"قرأ",
question:"أي كلمة سمعت؟",
options:["مشى","نام","قرأ","أكل"],
answer:"قرأ"
},

{
type:"audio",
speak:"كتب",
question:"أي كلمة سمعت؟",
options:["قرأ","أكل","نام","كتب"],
answer:"كتب"
},

/* BUILD AR */

{
type:"build-ar",
speak:"آكل خبزاً",
question:"قم بتكوين الجملة العربية:",
text:"من نان می‌خورم",
words:["خبزاً","آكل"],
answer:["آكل","خبزاً"]
},

{
type:"build-ar",
speak:"أنام ليلاً",
question:"قم بتكوين الجملة العربية:",
text:"من شب می‌خوابم",
words:["ليلاً","أنام"],
answer:["أنام","ليلاً"]
},

{
type:"build-ar",
speak:"أمشي إلى المدرسة",
question:"قم بتكوين الجملة العربية:",
text:"من به مدرسه راه می‌روم",
words:["المدرسة","إلى","أمشي"],
answer:["أمشي","إلى","المدرسة"]
},

{
type:"build-ar",
speak:"أقرأ كتاباً",
question:"قم بتكوين الجملة العربية:",
text:"من یک کتاب می‌خوانم",
words:["كتاباً","أقرأ"],
answer:["أقرأ","كتاباً"]
},

{
type:"build-ar",
speak:"أكتب رسالة",
question:"قم بتكوين الجملة العربية:",
text:"من یک نامه می‌نویسم",
words:["رسالة","أكتب"],
answer:["أكتب","رسالة"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"آكل خبزاً",
question:"ترجمه را بساز:",
text:"آكل خبزاً",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"أنام ليلاً",
question:"ترجمه را بساز:",
text:"أنام ليلاً",
words:["می‌خوابم","شب","در","من"],
answer:["من","شب","می‌خوابم"]
},

{
type:"build-fa",
speak:"أمشي إلى المدرسة",
question:"ترجمه را بساز:",
text:"أمشي إلى المدرسة",
words:["می‌روم","مدرسه","به","من"],
answer:["من","به","مدرسه","می‌روم"]
},

{
type:"build-fa",
speak:"أقرأ كتاباً",
question:"ترجمه را بساز:",
text:"أقرأ كتاباً",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"أكتب رسالة",
question:"ترجمه را بساز:",
text:"أكتب رسالة",
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
