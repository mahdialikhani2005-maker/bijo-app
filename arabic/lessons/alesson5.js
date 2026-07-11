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
question:"أي منها خبز ؟",
speak:"خبز",
options:[
{text:"أرز",image:"../../media/food/rice.png"},
{text:"خبز",image:"../../media/food/bread.png"},
{text:"لحم",image:"../../media/food/meat.png"},
{text:"بيض",image:"../../media/food/egg.png"}
],
answer:"خبز"
},

{
type:"image",
question:"أي منها أرز ؟",
speak:"أرز",
options:[
{text:"بيض",image:"../../media/food/egg.png"},
{text:"أرز",image:"../../media/food/rice.png"},
{text:"حليب",image:"../../media/food/milk.png"},
{text:"خبز",image:"../../media/food/bread.png"}
],
answer:"أرز"
},

{
type:"image",
question:"أي منها لحم ؟",
speak:"لحم",
options:[
{text:"خبز",image:"../../media/food/bread.png"},
{text:"لحم",image:"../../media/food/meat.png"},
{text:"حليب",image:"../../media/food/milk.png"},
{text:"أرز",image:"../../media/food/rice.png"}
],
answer:"لحم"
},

{
type:"image",
question:"أي منها بيض ؟",
speak:"بيض",
options:[
{text:"لحم",image:"../../media/food/meat.png"},
{text:"أرز",image:"../../media/food/rice.png"},
{text:"بيض",image:"../../media/food/egg.png"},
{text:"خبز",image:"../../media/food/bread.png"}
],
answer:"بيض"
},

{
type:"image",
question:"أي منها حليب ؟",
speak:"حليب",
options:[
{text:"بيض",image:"../../media/food/egg.png"},
{text:"خبز",image:"../../media/food/bread.png"},
{text:"أرز",image:"../../media/food/rice.png"},
{text:"حليب",image:"../../media/food/milk.png"}
],
answer:"حليب"
},

/* WORD */

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/food/bread.png",
options:["أرز","خبز","لحم","بيض"],
answer:"خبز"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/food/rice.png",
options:["بيض","أرز","حليب","خبز"],
answer:"أرز"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/food/meat.png",
options:["خبز","لحم","حليب","أرز"],
answer:"لحم"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/food/egg.png",
options:["لحم","أرز","بيض","خبز"],
answer:"بيض"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/food/milk.png",
options:["بيض","خبز","أرز","حليب"],
answer:"حليب"
},

/* AUDIO */

{
type:"audio",
speak:"خبز",
question:"أي كلمة سمعت؟",
options:["أرز","خبز","لحم","بيض"],
answer:"خبز"
},

{
type:"audio",
speak:"أرز",
question:"أي كلمة سمعت؟",
options:["بيض","أرز","حليب","خبز"],
answer:"أرز"
},

{
type:"audio",
speak:"لحم",
question:"أي كلمة سمعت؟",
options:["خبز","لحم","حليب","أرز"],
answer:"لحم"
},

{
type:"audio",
speak:"بيض",
question:"أي كلمة سمعت؟",
options:["لحم","أرز","بيض","خبز"],
answer:"بيض"
},

{
type:"audio",
speak:"حليب",
question:"أي كلمة سمعت؟",
options:["بيض","خبز","أرز","حليب"],
answer:"حليب"
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
speak:"آكل أرزاً",
question:"قم بتكوين الجملة العربية:",
text:"من برنج می‌خورم",
words:["أرزاً","آكل"],
answer:["آكل","أرزاً"]
},

{
type:"build-ar",
speak:"آكل لحماً",
question:"قم بتكوين الجملة العربية:",
text:"من گوشت می‌خورم",
words:["لحماً","آكل"],
answer:["آكل","لحماً"]
},

{
type:"build-ar",
speak:"آكل بيضة",
question:"قم بتكوين الجملة العربية:",
text:"من تخم‌مرغ می‌خورم",
words:["بيضة","آكل"],
answer:["آكل","بيضة"]
},

{
type:"build-ar",
speak:"أشرب حليباً",
question:"قم بتكوين الجملة العربية:",
text:"من شیر می‌نوشم",
words:["حليباً","أشرب"],
answer:["أشرب","حليباً"]
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
speak:"آكل أرزاً",
question:"ترجمه را بساز:",
text:"آكل أرزاً",
words:["می‌خورم","برنج","من"],
answer:["من","برنج","می‌خورم"]
},

{
type:"build-fa",
speak:"آكل لحماً",
question:"ترجمه را بساز:",
text:"آكل لحماً",
words:["می‌خورم","گوشت","من"],
answer:["من","گوشت","می‌خورم"]
},

{
type:"build-fa",
speak:"آكل بيضة",
question:"ترجمه را بساز:",
text:"آكل بيضة",
words:["می‌خورم","تخم‌مرغ","یک","من"],
answer:["من","یک","تخم‌مرغ","می‌خورم"]
},

{
type:"build-fa",
speak:"أشرب حليباً",
question:"ترجمه را بساز:",
text:"أشرب حليباً",
words:["می‌نوشم","شیر","من"],
answer:["من","شیر","می‌نوشم"]
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
