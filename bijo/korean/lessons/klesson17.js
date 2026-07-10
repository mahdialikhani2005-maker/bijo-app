let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko";
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
question:"어느 것이 행복하다 입니까 ?",
speak:"행복하다",
options:[
{text:"슬프다",image:"../../media/feelings/sad.png"},
{text:"행복하다",image:"../../media/feelings/happy.png"},
{text:"화나다",image:"../../media/feelings/angry.png"},
{text:"피곤하다",image:"../../media/feelings/tired.png"}
],
answer:"행복하다"
},

{
type:"image",
question:"어느 것이 슬프다 입니까 ?",
speak:"슬프다",
options:[
{text:"피곤하다",image:"../../media/feelings/tired.png"},
{text:"슬프다",image:"../../media/feelings/sad.png"},
{text:"배고프다",image:"../../media/feelings/hungry.png"},
{text:"행복하다",image:"../../media/feelings/happy.png"}
],
answer:"슬프다"
},

{
type:"image",
question:"어느 것이 화나다 입니까 ?",
speak:"화나다",
options:[
{text:"행복하다",image:"../../media/feelings/happy.png"},
{text:"화나다",image:"../../media/feelings/angry.png"},
{text:"배고프다",image:"../../media/feelings/hungry.png"},
{text:"슬프다",image:"../../media/feelings/sad.png"}
],
answer:"화나다"
},

{
type:"image",
question:"어느 것이 피곤하다 입니까 ?",
speak:"피곤하다",
options:[
{text:"화나다",image:"../../media/feelings/angry.png"},
{text:"슬프다",image:"../../media/feelings/sad.png"},
{text:"피곤하다",image:"../../media/feelings/tired.png"},
{text:"행복하다",image:"../../media/feelings/happy.png"}
],
answer:"피곤하다"
},

{
type:"image",
question:"어느 것이 배고프다 입니까 ?",
speak:"배고프다",
options:[
{text:"피곤하다",image:"../../media/feelings/tired.png"},
{text:"행복하다",image:"../../media/feelings/happy.png"},
{text:"슬프다",image:"../../media/feelings/sad.png"},
{text:"배고프다",image:"../../media/feelings/hungry.png"}
],
answer:"배고프다"
},

/* WORD */

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/feelings/happy.png",
options:["슬프다","행복하다","화나다","피곤하다"],
answer:"행복하다"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/feelings/sad.png",
options:["피곤하다","슬프다","배고프다","행복하다"],
answer:"슬프다"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/feelings/angry.png",
options:["행복하다","화나다","배고프다","슬프다"],
answer:"화나다"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/feelings/tired.png",
options:["화나다","슬프다","피곤하다","행복하다"],
answer:"피곤하다"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/feelings/hungry.png",
options:["피곤하다","행복하다","슬프다","배고프다"],
answer:"배고프다"
},

/* AUDIO */

{
type:"audio",
speak:"행복하다",
question:"어떤 단어를 들었습니까?",
options:["슬프다","행복하다","화나다","피곤하다"],
answer:"행복하다"
},

{
type:"audio",
speak:"슬프다",
question:"어떤 단어를 들었습니까?",
options:["피곤하다","슬프다","배고프다","행복하다"],
answer:"슬프다"
},

{
type:"audio",
speak:"화나다",
question:"어떤 단어를 들었습니까?",
options:["행복하다","화나다","배고프다","슬프다"],
answer:"화나다"
},

{
type:"audio",
speak:"피곤하다",
question:"어떤 단어를 들었습니까?",
options:["화나다","슬프다","피곤하다","행복하다"],
answer:"피곤하다"
},

{
type:"audio",
speak:"배고프다",
question:"어떤 단어를 들었습니까?",
options:["피곤하다","행복하다","슬프다","배고프다"],
answer:"배고프다"
},

/* BUILD KO */

{
type:"build-ko",
speak:"저는 행복합니다",
question:"한국어 문장을 만드세요:",
text:"من خوشحال هستم",
words:["행복합니다","저는"],
answer:["저는","행복합니다"]
},

{
type:"build-ko",
speak:"저는 슬픕니다",
question:"한국어 문장을 만드세요:",
text:"من ناراحت هستم",
words:["슬픕니다","저는"],
answer:["저는","슬픕니다"]
},

{
type:"build-ko",
speak:"저는 화가 납니다",
question:"한국어 문장을 만드세요:",
text:"من عصبانی هستم",
words:["화가","납니다","저는"],
answer:["저는","화가","납니다"]
},

{
type:"build-ko",
speak:"저는 피곤합니다",
question:"한국어 문장을 만드세요:",
text:"من خسته هستم",
words:["피곤합니다","저는"],
answer:["저는","피곤합니다"]
},

{
type:"build-ko",
speak:"저는 배가 고픕니다",
question:"한국어 문장을 만드세요:",
text:"من گرسنه هستم",
words:["배가","고픕니다","저는"],
answer:["저는","배가","고픕니다"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"저는 행복합니다",
question:"ترجمه را بساز:",
text:"저는 행복합니다",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"저는 슬픕니다",
question:"ترجمه را بساز:",
text:"저는 슬픕니다",
words:["هستم","ناراحت","من"],
answer:["من","ناراحت","هستم"]
},

{
type:"build-fa",
speak:"저는 화가 납니다",
question:"ترجمه را بساز:",
text:"저는 화가 납니다",
words:["هستم","عصبانی","من"],
answer:["من","عصبانی","هستم"]
},

{
type:"build-fa",
speak:"저는 피곤합니다",
question:"ترجمه را بساز:",
text:"저는 피곤합니다",
words:["هستم","خسته","من"],
answer:["من","خسته","هستم"]
},

{
type:"build-fa",
speak:"저는 배가 고픕니다",
question:"ترجمه را بساز:",
text:"저는 배가 고픕니다",
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

  else if (q.type === "build-en" || q.type === "build-fa" || q.type === "build-ko") {
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

if (q.type === "build-en" || q.type === "build-ko") {
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
