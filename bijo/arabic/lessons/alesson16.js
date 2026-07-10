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
question:"أي منها مدرسة ؟",
speak:"مدرسة",
options:[
{text:"مستشفى",image:"../../media/places/hospital.png"},
{text:"مدرسة",image:"../../media/places/school.png"},
{text:"متجر",image:"../../media/places/store.png"},
{text:"حديقة",image:"../../media/places/park.png"}
],
answer:"مدرسة"
},

{
type:"image",
question:"أي منها مستشفى ؟",
speak:"مستشفى",
options:[
{text:"حديقة",image:"../../media/places/park.png"},
{text:"مستشفى",image:"../../media/places/hospital.png"},
{text:"مسجد",image:"../../media/places/mosque.png"},
{text:"مدرسة",image:"../../media/places/school.png"}
],
answer:"مستشفى"
},

{
type:"image",
question:"أي منها متجر ؟",
speak:"متجر",
options:[
{text:"مدرسة",image:"../../media/places/school.png"},
{text:"متجر",image:"../../media/places/store.png"},
{text:"مسجد",image:"../../media/places/mosque.png"},
{text:"مستشفى",image:"../../media/places/hospital.png"}
],
answer:"متجر"
},

{
type:"image",
question:"أي منها حديقة ؟",
speak:"حديقة",
options:[
{text:"متجر",image:"../../media/places/store.png"},
{text:"مستشفى",image:"../../media/places/hospital.png"},
{text:"حديقة",image:"../../media/places/park.png"},
{text:"مدرسة",image:"../../media/places/school.png"}
],
answer:"حديقة"
},

{
type:"image",
question:"أي منها مسجد ؟",
speak:"مسجد",
options:[
{text:"حديقة",image:"../../media/places/park.png"},
{text:"مدرسة",image:"../../media/places/school.png"},
{text:"مستشفى",image:"../../media/places/hospital.png"},
{text:"مسجد",image:"../../media/places/mosque.png"}
],
answer:"مسجد"
},

/* WORD */

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/places/school.png",
options:["مستشفى","مدرسة","متجر","حديقة"],
answer:"مدرسة"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/places/hospital.png",
options:["حديقة","مستشفى","مسجد","مدرسة"],
answer:"مستشفى"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/places/store.png",
options:["مدرسة","متجر","مسجد","مستشفى"],
answer:"متجر"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/places/park.png",
options:["متجر","مستشفى","حديقة","مدرسة"],
answer:"حديقة"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/places/mosque.png",
options:["حديقة","مدرسة","مستشفى","مسجد"],
answer:"مسجد"
},

/* AUDIO */

{
type:"audio",
speak:"مدرسة",
question:"أي كلمة سمعت؟",
options:["مستشفى","مدرسة","متجر","حديقة"],
answer:"مدرسة"
},

{
type:"audio",
speak:"مستشفى",
question:"أي كلمة سمعت؟",
options:["حديقة","مستشفى","مسجد","مدرسة"],
answer:"مستشفى"
},

{
type:"audio",
speak:"متجر",
question:"أي كلمة سمعت؟",
options:["مدرسة","متجر","مسجد","مستشفى"],
answer:"متجر"
},

{
type:"audio",
speak:"حديقة",
question:"أي كلمة سمعت؟",
options:["متجر","مستشفى","حديقة","مدرسة"],
answer:"حديقة"
},

{
type:"audio",
speak:"مسجد",
question:"أي كلمة سمعت؟",
options:["حديقة","مدرسة","مستشفى","مسجد"],
answer:"مسجد"
},

/* BUILD AR */

{
type:"build-ar",
speak:"هذه مدرسة",
question:"قم بتكوين الجملة العربية:",
text:"این یک مدرسه است",
words:["مدرسة","هذه"],
answer:["هذه","مدرسة"]
},

{
type:"build-ar",
speak:"هذا مستشفى",
question:"قم بتكوين الجملة العربية:",
text:"این یک بیمارستان است",
words:["مستشفى","هذا"],
answer:["هذا","مستشفى"]
},

{
type:"build-ar",
speak:"هذا متجر",
question:"قم بتكوين الجملة العربية:",
text:"این یک فروشگاه است",
words:["متجر","هذا"],
answer:["هذا","متجر"]
},

{
type:"build-ar",
speak:"هذه حديقة",
question:"قم بتكوين الجملة العربية:",
text:"این یک پارک است",
words:["حديقة","هذه"],
answer:["هذه","حديقة"]
},

{
type:"build-ar",
speak:"هذا مسجد",
question:"قم بتكوين الجملة العربية:",
text:"این یک مسجد است",
words:["مسجد","هذا"],
answer:["هذا","مسجد"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"هذه مدرسة",
question:"ترجمه را بساز:",
text:"هذه مدرسة",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"هذا مستشفى",
question:"ترجمه را بساز:",
text:"هذا مستشفى",
words:["است","بیمارستان","یک","این"],
answer:["این","یک","بیمارستان","است"]
},

{
type:"build-fa",
speak:"هذا متجر",
question:"ترجمه را بساز:",
text:"هذا متجر",
words:["است","فروشگاه","یک","این"],
answer:["این","یک","فروشگاه","است"]
},

{
type:"build-fa",
speak:"هذه حديقة",
question:"ترجمه را بساز:",
text:"هذه حديقة",
words:["است","پارک","یک","این"],
answer:["این","یک","پارک","است"]
},

{
type:"build-fa",
speak:"هذا مسجد",
question:"ترجمه را بساز:",
text:"هذا مسجد",
words:["است","مسجد","یک","این"],
answer:["این","یک","مسجد","است"]
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
