let current = 0;
let xp = 0;

function speak(text){
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      window.Capacitor.Plugins.TextToSpeech.speak({
        text: text,
        lang: "ar-SA",
        rate: 0.9,
        category: "ambient"
      });
    } catch (err) {
      console.warn("خطا در پخش صدا (native):", err);
    }
    return;
  }

  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  utter.rate = 0.9;

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

window.onload = async function() {
  if (typeof initUserData === "function") {
    try {
      await initUserData();
    } catch (err) {
      console.warn("گرفتن اطلاعات کاربر ناموفق بود:", err);
    }
  }

  updateHeartDisplay();

  if (typeof getHearts === "function" && getHearts() <= 0) {
    alert("قلب شما تمام شده است! لطفاً منتظر بمانید یا قلب تهیه کنید.");
    window.location.href = "../home.html";
    return;
  }

  showQuestion();
};

function updateHeartDisplay() {
  const heartElement = document.getElementById("heart-count");
  if (heartElement && typeof getHearts === "function") {
    heartElement.textContent = getHearts();
  }
}

const questions = [

/* IMAGE */

{
type:"image",
question:"أي منها رجل؟",
speak:"رجل",
options:[
{text:"امرأة",image:"../../media/people/woman.webp"},
{text:"رجل",image:"../../media/people/man.webp"},
{text:"ولد",image:"../../media/people/boy.webp"},
{text:"بنت",image:"../../media/people/girl.webp"}
],
answer:"رجل"
},

{
type:"image",
question:"أي منها امرأة؟",
speak:"امرأة",
options:[
{text:"بنت",image:"../../media/people/girl.webp"},
{text:"امرأة",image:"../../media/people/woman.webp"},
{text:"ولد",image:"../../media/people/boy.webp"},
{text:"رجل",image:"../../media/people/man.webp"}
],
answer:"امرأة"
},

{
type:"image",
question:"أي منها ولد؟",
speak:"ولد",
options:[
{text:"رجل",image:"../../media/people/man.webp"},
{text:"ولد",image:"../../media/people/boy.webp"},
{text:"طفل",image:"../../media/people/baby.webp"},
{text:"بنت",image:"../../media/people/girl.webp"}
],
answer:"ولد"
},

{
type:"image",
question:"أي منها بنت؟",
speak:"بنت",
options:[
{text:"ولد",image:"../../media/people/boy.webp"},
{text:"رجل",image:"../../media/people/man.webp"},
{text:"بنت",image:"../../media/people/girl.webp"},
{text:"طفل",image:"../../media/people/baby.webp"}
],
answer:"بنت"
},

{
type:"image",
question:"أي منها طفل؟",
speak:"طفل",
options:[
{text:"بنت",image:"../../media/people/girl.webp"},
{text:"ولد",image:"../../media/people/boy.webp"},
{text:"رجل",image:"../../media/people/man.webp"},
{text:"طفل",image:"../../media/people/baby.webp"}
],
answer:"طفل"
},

/* WORD */

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/people/man.webp",
options:["ولد","رجل","امرأة","بنت"],
answer:"رجل"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/people/woman.webp",
options:["امرأة","بنت","طفل","رجل"],
answer:"امرأة"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/people/boy.webp",
options:["ولد","رجل","طفل","بنت"],
answer:"ولد"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/people/girl.webp",
options:["بنت","امرأة","ولد","طفل"],
answer:"بنت"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/people/baby.webp",
options:["طفل","ولد","بنت","رجل"],
answer:"طفل"
},

/* AUDIO */

{
type:"audio",
speak:"رجل",
question:"أي كلمة سمعت؟",
options:["رجل","ولد","امرأة","بنت"],
answer:"رجل"
},

{
type:"audio",
speak:"امرأة",
question:"أي كلمة سمعت؟",
options:["بنت","امرأة","ولد","رجل"],
answer:"امرأة"
},

{
type:"audio",
speak:"ولد",
question:"أي كلمة سمعت؟",
options:["ولد","رجل","طفل","بنت"],
answer:"ولد"
},

{
type:"audio",
speak:"بنت",
question:"أي كلمة سمعت؟",
options:["ولد","امرأة","بنت","طفل"],
answer:"بنت"
},

{
type:"audio",
speak:"طفل",
question:"أي كلمة سمعت؟",
options:["طفل","ولد","رجل","بنت"],
answer:"طفل"
},

/* BUILD AR */

{
type:"build-ar",
speak:"هو رجل",
question:"قم بتكوين الجملة العربية:",
text:"او یک مرد است",
words:["رجل","هو"],
answer:["هو","رجل"]
},

{
type:"build-ar",
speak:"هي امرأة",
question:"قم بتكوين الجملة العربية:",
text:"او یک زن است",
words:["امرأة","هي"],
answer:["هي","امرأة"]
},

{
type:"build-ar",
speak:"هو ولد",
question:"قم بتكوين الجملة العربية:",
text:"او یک پسر است",
words:["ولد","هو"],
answer:["هو","ولد"]
},

{
type:"build-ar",
speak:"هي بنت",
question:"قم بتكوين الجملة العربية:",
text:"او یک دختر است",
words:["بنت","هي"],
answer:["هي","بنت"]
},

{
type:"build-ar",
speak:"الطفل صغير",
question:"قم بتكوين الجملة العربية:",
text:"نوزاد کوچک است",
words:["الطفل","صغير"],
answer:["الطفل","صغير"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"هو رجل",
question:"ترجمه را بساز:",
text:"هو رجل",
words:["است","مرد","یک","او"],
answer:["او","یک","مرد","است"]
},

{
type:"build-fa",
speak:"هي امرأة",
question:"ترجمه را بساز:",
text:"هي امرأة",
words:["یک","است","زن","او"],
answer:["او","یک","زن","است"]
},

{
type:"build-fa",
speak:"هو ولد",
question:"ترجمه را بساز:",
text:"هو ولد",
words:["است","پسر","یک","او"],
answer:["او","یک","پسر","است"]
},

{
type:"build-fa",
speak:"هي بنت",
question:"ترجمه را بساز:",
text:"هي بنت",
words:["است","دختر","یک","او"],
answer:["او","یک","دختر","است"]
},

{
type:"build-fa",
speak:"الطفل صغير",
question:"ترجمه را بساز:",
text:"الطفل صغير",
words:["است","کوچک","نوزاد"],
answer:["نوزاد","کوچک","است"]
}

];


// =====================================
// نمایش سوال
// =====================================

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
  const repeatBtn = document.getElementById("repeat-audio-btn");

  if (repeatBtn) {
    if (q.speak) {
      repeatBtn.style.display = "inline-block";
      repeatBtn.onclick = () => speak(q.speak);
    } else {
      repeatBtn.style.display = "none";
      repeatBtn.onclick = null;
    }
  }

  title.innerText = q.question;
  content.innerHTML = "";
  optionsBox.innerHTML = "";
  wordBuilder.innerHTML = "";
wordBuilder.classList.add("hidden");

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
    content.innerHTML = "";

shuffleArray(q.options).forEach(opt => {
      let b = document.createElement("button");
      b.className = "option";
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
  }

  // BUILD ARABIC / FA

  else if (q.type === "build-ar" || q.type === "build-fa") {
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

  if (q.type === "build-ar") {
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

async function safeAddXP(amount) {
  try {
    if (typeof addXP === "function") {
      await addXP(amount);
    }
  } catch (err) {
    console.warn("ثبت XP رو سرور ناموفق بود (آفلاین یا خطای شبکه):", err);
  }
}

async function safeLoseHeart() {
  try {
    if (typeof loseHeart === "function") {
      await loseHeart();
    }
  } catch (err) {
    console.warn("کم کردن قلب رو سرور ناموفق بود (آفلاین یا خطای شبکه):", err);
  }
}

async function checkBuild(selected, correct) {
  const s = selected.map(w => w.trim().toLowerCase());
  const c = correct.map(w => w.trim().toLowerCase());

  if (JSON.stringify(s) === JSON.stringify(c)) {
    xp += 5;

    await safeAddXP(5);

    current++;
    showQuestion();
  } else {
    alert("اشتباه بود! دوباره تلاش کن.");

    await safeLoseHeart();

    updateHeartDisplay();

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

    await safeAddXP(5);

    current++;
    showQuestion();
  } else {
    alert("اشتباه بود! دوباره تلاش کن.");

    await safeLoseHeart();

    updateHeartDisplay();

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