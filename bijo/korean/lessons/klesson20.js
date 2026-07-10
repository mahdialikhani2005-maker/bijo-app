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
question:"어느 것이 누구 입니까 ?",
speak:"누구",
options:[
{text:"무엇",image:"../../media/questions/what.png"},
{text:"누구",image:"../../media/questions/who.png"},
{text:"어디",image:"../../media/questions/where.png"},
{text:"언제",image:"../../media/questions/when.png"}
],
answer:"누구"
},

{
type:"image",
question:"어느 것이 무엇 입니까 ?",
speak:"무엇",
options:[
{text:"왜",image:"../../media/questions/why.png"},
{text:"무엇",image:"../../media/questions/what.png"},
{text:"누구",image:"../../media/questions/who.png"},
{text:"어디",image:"../../media/questions/where.png"}
],
answer:"무엇"
},

{
type:"image",
question:"어느 것이 어디 입니까 ?",
speak:"어디",
options:[
{text:"무엇",image:"../../media/questions/what.png"},
{text:"어디",image:"../../media/questions/where.png"},
{text:"왜",image:"../../media/questions/why.png"},
{text:"누구",image:"../../media/questions/who.png"}
],
answer:"어디"
},

{
type:"image",
question:"어느 것이 언제 입니까 ?",
speak:"언제",
options:[
{text:"어디",image:"../../media/questions/where.png"},
{text:"누구",image:"../../media/questions/who.png"},
{text:"언제",image:"../../media/questions/when.png"},
{text:"무엇",image:"../../media/questions/what.png"}
],
answer:"언제"
},

{
type:"image",
question:"어느 것이 왜 입니까 ?",
speak:"왜",
options:[
{text:"언제",image:"../../media/questions/when.png"},
{text:"무엇",image:"../../media/questions/what.png"},
{text:"누구",image:"../../media/questions/who.png"},
{text:"왜",image:"../../media/questions/why.png"}
],
answer:"왜"
},

/* WORD */

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/questions/who.png",
options:["무엇","누구","어디","언제"],
answer:"누구"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/questions/what.png",
options:["왜","무엇","누구","어디"],
answer:"무엇"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/questions/where.png",
options:["무엇","어디","왜","누구"],
answer:"어디"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/questions/when.png",
options:["어디","누구","언제","무엇"],
answer:"언제"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/questions/why.png",
options:["언제","무엇","누구","왜"],
answer:"왜"
},

/* AUDIO */

{
type:"audio",
speak:"누구",
question:"어떤 단어를 들었습니까?",
options:["무엇","누구","어디","언제"],
answer:"누구"
},

{
type:"audio",
speak:"무엇",
question:"어떤 단어를 들었습니까?",
options:["왜","무엇","누구","어디"],
answer:"무엇"
},

{
type:"audio",
speak:"어디",
question:"어떤 단어를 들었습니까?",
options:["무엇","어디","왜","누구"],
answer:"어디"
},

{
type:"audio",
speak:"언제",
question:"어떤 단어를 들었습니까?",
options:["어디","누구","언제","무엇"],
answer:"언제"
},

{
type:"audio",
speak:"왜",
question:"어떤 단어를 들었습니까?",
options:["언제","무엇","누구","왜"],
answer:"왜"
},

/* BUILD KO */

{
type:"build-ko",
speak:"그녀는 누구입니까?",
question:"한국어 문장을 만드세요:",
text:"او کیست؟",
words:["그녀는","누구입니까"],
answer:["그녀는","누구입니까?"]
},

{
type:"build-ko",
speak:"이것은 무엇입니까?",
question:"한국어 문장을 만드세요:",
text:"این چیست؟",
words:["이것은","무엇입니까"],
answer:["이것은","무엇입니까?"]
},

{
type:"build-ko",
speak:"학교는 어디에 있습니까?",
question:"한국어 문장을 만드세요:",
text:"مدرسه کجاست؟",
words:["학교는","어디에","있습니까"],
answer:["학교는","어디에","있습니까?"]
},

{
type:"build-ko",
speak:"수업은 언제입니까?",
question:"한국어 문장을 만드세요:",
text:"کلاس کی است؟",
words:["수업은","언제입니까"],
answer:["수업은","언제입니까?"]
},

{
type:"build-ko",
speak:"당신은 왜 행복합니까?",
question:"한국어 문장을 만드세요:",
text:"چرا خوشحالی؟",
words:["당신은","왜","행복합니까"],
answer:["당신은","왜","행복합니까?"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"그녀는 누구입니까?",
question:"ترجمه را بساز:",
text:"그녀는 누구입니까?",
words:["کیست","او"],
answer:["او","کیست؟"]
},

{
type:"build-fa",
speak:"이것은 무엇입니까?",
question:"ترجمه را بساز:",
text:"이것은 무엇입니까?",
words:["چیست","این"],
answer:["این","چیست؟"]
},

{
type:"build-fa",
speak:"학교는 어디에 있습니까?",
question:"ترجمه را بساز:",
text:"학교는 어디에 있습니까?",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست؟"]
},

{
type:"build-fa",
speak:"수업은 언제입니까?",
question:"ترجمه را بساز:",
text:"수업은 언제입니까?",
words:["کیست","کلاس"],
answer:["کلاس","کیست؟"]
},

{
type:"build-fa",
speak:"당신은 왜 행복합니까?",
question:"ترجمه را بساز:",
text:"당신은 왜 행복합니까?",
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
