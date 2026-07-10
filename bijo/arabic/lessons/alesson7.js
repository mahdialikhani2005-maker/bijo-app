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
question:"أي منها طماطم ؟",
speak:"طماطم",
options:[
{text:"بطاطس",image:"../../media/vegetables/potato.png"},
{text:"طماطم",image:"../../media/vegetables/tomato.png"},
{text:"جزر",image:"../../media/vegetables/carrot.png"},
{text:"بصل",image:"../../media/vegetables/onion.png"}
],
answer:"طماطم"
},

{
type:"image",
question:"أي منها بطاطس ؟",
speak:"بطاطس",
options:[
{text:"بصل",image:"../../media/vegetables/onion.png"},
{text:"بطاطس",image:"../../media/vegetables/potato.png"},
{text:"خيار",image:"../../media/vegetables/cucumber.png"},
{text:"طماطم",image:"../../media/vegetables/tomato.png"}
],
answer:"بطاطس"
},

{
type:"image",
question:"أي منها جزر ؟",
speak:"جزر",
options:[
{text:"طماطم",image:"../../media/vegetables/tomato.png"},
{text:"جزر",image:"../../media/vegetables/carrot.png"},
{text:"خيار",image:"../../media/vegetables/cucumber.png"},
{text:"بطاطس",image:"../../media/vegetables/potato.png"}
],
answer:"جزر"
},

{
type:"image",
question:"أي منها بصل ؟",
speak:"بصل",
options:[
{text:"جزر",image:"../../media/vegetables/carrot.png"},
{text:"بطاطس",image:"../../media/vegetables/potato.png"},
{text:"بصل",image:"../../media/vegetables/onion.png"},
{text:"طماطم",image:"../../media/vegetables/tomato.png"}
],
answer:"بصل"
},

{
type:"image",
question:"أي منها خيار ؟",
speak:"خيار",
options:[
{text:"بصل",image:"../../media/vegetables/onion.png"},
{text:"طماطم",image:"../../media/vegetables/tomato.png"},
{text:"بطاطس",image:"../../media/vegetables/potato.png"},
{text:"خيار",image:"../../media/vegetables/cucumber.png"}
],
answer:"خيار"
},

/* WORD */

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/vegetables/tomato.png",
options:["بطاطس","طماطم","جزر","بصل"],
answer:"طماطم"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/vegetables/potato.png",
options:["بصل","بطاطس","خيار","طماطم"],
answer:"بطاطس"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/vegetables/carrot.png",
options:["طماطم","جزر","خيار","بطاطس"],
answer:"جزر"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/vegetables/onion.png",
options:["جزر","بطاطس","بصل","طماطم"],
answer:"بصل"
},

{
type:"word",
question:"ما هذه الصورة؟",
image:"../../media/vegetables/cucumber.png",
options:["بصل","طماطم","بطاطس","خيار"],
answer:"خيار"
},

/* AUDIO */

{
type:"audio",
speak:"طماطم",
question:"أي كلمة سمعت؟",
options:["بطاطس","طماطم","جزر","بصل"],
answer:"طماطم"
},

{
type:"audio",
speak:"بطاطس",
question:"أي كلمة سمعت؟",
options:["بصل","بطاطس","خيار","طماطم"],
answer:"بطاطس"
},

{
type:"audio",
speak:"جزر",
question:"أي كلمة سمعت؟",
options:["طماطم","جزر","خيار","بطاطس"],
answer:"جزر"
},

{
type:"audio",
speak:"بصل",
question:"أي كلمة سمعت؟",
options:["جزر","بطاطس","بصل","طماطم"],
answer:"بصل"
},

{
type:"audio",
speak:"خيار",
question:"أي كلمة سمعت؟",
options:["بصل","طماطم","بطاطس","خيار"],
answer:"خيار"
},

/* BUILD AR */

{
type:"build-ar",
speak:"هذه طماطم",
question:"قم بتكوين الجملة العربية:",
text:"این یک گوجه است",
words:["طماطم","هذه"],
answer:["هذه","طماطم"]
},

{
type:"build-ar",
speak:"هذه بطاطس",
question:"قم بتكوين الجملة العربية:",
text:"این یک سیب‌زمینی است",
words:["بطاطس","هذه"],
answer:["هذه","بطاطس"]
},

{
type:"build-ar",
speak:"هذه جزر",
question:"قم بتكوين الجملة العربية:",
text:"این یک هویج است",
words:["جزر","هذه"],
answer:["هذه","جزر"]
},

{
type:"build-ar",
speak:"هذه بصل",
question:"قم بتكوين الجملة العربية:",
text:"این یک پیاز است",
words:["بصل","هذه"],
answer:["هذه","بصل"]
},

{
type:"build-ar",
speak:"هذه خيار",
question:"قم بتكوين الجملة العربية:",
text:"این یک خیار است",
words:["خيار","هذه"],
answer:["هذه","خيار"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"هذه طماطم",
question:"ترجمه را بساز:",
text:"هذه طماطم",
words:["است","گوجه","یک","این"],
answer:["این","یک","گوجه","است"]
},

{
type:"build-fa",
speak:"هذه بطاطس",
question:"ترجمه را بساز:",
text:"هذه بطاطس",
words:["است","سیب‌زمینی","یک","این"],
answer:["این","یک","سیب‌زمینی","است"]
},

{
type:"build-fa",
speak:"هذه جزر",
question:"ترجمه را بساز:",
text:"هذه جزر",
words:["است","هویج","یک","این"],
answer:["این","یک","هویج","است"]
},

{
type:"build-fa",
speak:"هذه بصل",
question:"ترجمه را بساز:",
text:"هذه بصل",
words:["است","پیاز","یک","این"],
answer:["این","یک","پیاز","است"]
},

{
type:"build-fa",
speak:"هذه خيار",
question:"ترجمه را بساز:",
text:"هذه خيار",
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
