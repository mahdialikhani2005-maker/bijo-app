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
question:"어느 것이 남자 입니까 ?",
speak:"남자",
options:[
{text:"여자",image:"../../media/people/woman.png"},
{text:"남자",image:"../../media/people/man.png"},
{text:"소년",image:"../../media/people/boy.png"},
{text:"소녀",image:"../../media/people/girl.png"}
],
answer:"남자"
},

{
type:"image",
question:"어느 것이 여자 입니까 ?",
speak:"여자",
options:[
{text:"소녀",image:"../../media/people/girl.png"},
{text:"여자",image:"../../media/people/woman.png"},
{text:"소년",image:"../../media/people/boy.png"},
{text:"남자",image:"../../media/people/man.png"}
],
answer:"여자"
},

{
type:"image",
question:"어느 것이 소년 입니까 ?",
speak:"소년",
options:[
{text:"남자",image:"../../media/people/man.png"},
{text:"소년",image:"../../media/people/boy.png"},
{text:"아기",image:"../../media/people/baby.png"},
{text:"소녀",image:"../../media/people/girl.png"}
],
answer:"소년"
},

{
type:"image",
question:"어느 것이 소녀 입니까 ?",
speak:"소녀",
options:[
{text:"소년",image:"../../media/people/boy.png"},
{text:"남자",image:"../../media/people/man.png"},
{text:"소녀",image:"../../media/people/girl.png"},
{text:"아기",image:"../../media/people/baby.png"}
],
answer:"소녀"
},

{
type:"image",
question:"어느 것이 아기 입니까 ?",
speak:"아기",
options:[
{text:"소녀",image:"../../media/people/girl.png"},
{text:"소년",image:"../../media/people/boy.png"},
{text:"남자",image:"../../media/people/man.png"},
{text:"아기",image:"../../media/people/baby.png"}
],
answer:"아기"
},

/* WORD */

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/people/man.png",
options:["소년","남자","여자","소녀"],
answer:"남자"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/people/woman.png",
options:["여자","소녀","아기","남자"],
answer:"여자"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/people/boy.png",
options:["소년","남자","아기","소녀"],
answer:"소년"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/people/girl.png",
options:["소녀","여자","소년","아기"],
answer:"소녀"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/people/baby.png",
options:["아기","소년","소녀","남자"],
answer:"아기"
},

/* AUDIO */

{
type:"audio",
speak:"남자",
question:"어떤 단어를 들었습니까?",
options:["남자","소년","여자","소녀"],
answer:"남자"
},

{
type:"audio",
speak:"여자",
question:"어떤 단어를 들었습니까?",
options:["소녀","여자","소년","남자"],
answer:"여자"
},

{
type:"audio",
speak:"소년",
question:"어떤 단어를 들었습니까?",
options:["소년","남자","아기","소녀"],
answer:"소년"
},

{
type:"audio",
speak:"소녀",
question:"어떤 단어를 들었습니까?",
options:["소년","여자","소녀","아기"],
answer:"소녀"
},

{
type:"audio",
speak:"아기",
question:"어떤 단어를 들었습니까?",
options:["아기","소년","남자","소녀"],
answer:"아기"
},

/* BUILD KO */

{
type:"build-ko",
speak:"그는 남자입니다",
question:"한국어 문장을 만드세요:",
text:"او یک مرد است",
words:["남자입니다","그는"],
answer:["그는","남자입니다"]
},

{
type:"build-ko",
speak:"그녀는 여자입니다",
question:"한국어 문장을 만드세요:",
text:"او یک زن است",
words:["여자입니다","그녀는"],
answer:["그녀는","여자입니다"]
},

{
type:"build-ko",
speak:"그는 소년입니다",
question:"한국어 문장을 만드세요:",
text:"او یک پسر است",
words:["소년입니다","그는"],
answer:["그는","소년입니다"]
},

{
type:"build-ko",
speak:"그녀는 소녀입니다",
question:"한국어 문장을 만드세요:",
text:"او یک دختر است",
words:["소녀입니다","그녀는"],
answer:["그녀는","소녀입니다"]
},

{
type:"build-ko",
speak:"아기는 작습니다",
question:"한국어 문장을 만드세요:",
text:"نوزاد کوچک است",
words:["아기는","작습니다"],
answer:["아기는","작습니다"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"그는 남자입니다",
question:"ترجمه را بساز:",
text:"그는 남자입니다",
words:["است","مرد","یک","او"],
answer:["او","یک","مرد","است"]
},

{
type:"build-fa",
speak:"그녀는 여자입니다",
question:"ترجمه را بساز:",
text:"그녀는 여자입니다",
words:["یک","است","زن","او"],
answer:["او","یک","زن","است"]
},

{
type:"build-fa",
speak:"그는 소년입니다",
question:"ترجمه را بساز:",
text:"그는 소년입니다",
words:["است","پسر","یک","او"],
answer:["او","یک","پسر","است"]
},

{
type:"build-fa",
speak:"그녀는 소녀입니다",
question:"ترجمه را بساز:",
text:"그녀는 소녀입니다",
words:["است","دختر","یک","او"],
answer:["او","یک","دختر","است"]
},

{
type:"build-fa",
speak:"아기는 작습니다",
question:"ترجمه را بساز:",
text:"아기는 작습니다",
words:["است","کوچک","نوزاد"],
answer:["نوزاد","کوچک","است"]
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
