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
question:"어느 것이 빵 입니까 ?",
speak:"빵",
options:[
{text:"밥",image:"../../media/food/rice.png"},
{text:"빵",image:"../../media/food/bread.png"},
{text:"고기",image:"../../media/food/meat.png"},
{text:"계란",image:"../../media/food/egg.png"}
],
answer:"빵"
},

{
type:"image",
question:"어느 것이 밥 입니까 ?",
speak:"밥",
options:[
{text:"계란",image:"../../media/food/egg.png"},
{text:"밥",image:"../../media/food/rice.png"},
{text:"우유",image:"../../media/food/milk.png"},
{text:"빵",image:"../../media/food/bread.png"}
],
answer:"밥"
},

{
type:"image",
question:"어느 것이 고기 입니까 ?",
speak:"고기",
options:[
{text:"빵",image:"../../media/food/bread.png"},
{text:"고기",image:"../../media/food/meat.png"},
{text:"우유",image:"../../media/food/milk.png"},
{text:"밥",image:"../../media/food/rice.png"}
],
answer:"고기"
},

{
type:"image",
question:"어느 것이 계란 입니까 ?",
speak:"계란",
options:[
{text:"고기",image:"../../media/food/meat.png"},
{text:"밥",image:"../../media/food/rice.png"},
{text:"계란",image:"../../media/food/egg.png"},
{text:"빵",image:"../../media/food/bread.png"}
],
answer:"계란"
},

{
type:"image",
question:"어느 것이 우유 입니까 ?",
speak:"우유",
options:[
{text:"계란",image:"../../media/food/egg.png"},
{text:"빵",image:"../../media/food/bread.png"},
{text:"밥",image:"../../media/food/rice.png"},
{text:"우유",image:"../../media/food/milk.png"}
],
answer:"우유"
},

/* WORD */

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/food/bread.png",
options:["밥","빵","고기","계란"],
answer:"빵"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/food/rice.png",
options:["계란","밥","우유","빵"],
answer:"밥"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/food/meat.png",
options:["빵","고기","우유","밥"],
answer:"고기"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/food/egg.png",
options:["고기","밥","계란","빵"],
answer:"계란"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/food/milk.png",
options:["계란","빵","밥","우유"],
answer:"우유"
},

/* AUDIO */

{
type:"audio",
speak:"빵",
question:"어떤 단어를 들었습니까?",
options:["밥","빵","고기","계란"],
answer:"빵"
},

{
type:"audio",
speak:"밥",
question:"어떤 단어를 들었습니까?",
options:["계란","밥","우유","빵"],
answer:"밥"
},

{
type:"audio",
speak:"고기",
question:"어떤 단어를 들었습니까?",
options:["빵","고기","우유","밥"],
answer:"고기"
},

{
type:"audio",
speak:"계란",
question:"어떤 단어를 들었습니까?",
options:["고기","밥","계란","빵"],
answer:"계란"
},

{
type:"audio",
speak:"우유",
question:"어떤 단어를 들었습니까?",
options:["계란","빵","밥","우유"],
answer:"우유"
},

/* BUILD KO */

{
type:"build-ko",
speak:"저는 빵을 먹습니다",
question:"한국어 문장을 만드세요:",
text:"من نان می‌خورم",
words:["빵을","먹습니다","저는"],
answer:["저는","빵을","먹습니다"]
},

{
type:"build-ko",
speak:"저는 밥을 먹습니다",
question:"한국어 문장을 만드세요:",
text:"من برنج می‌خورم",
words:["밥을","먹습니다","저는"],
answer:["저는","밥을","먹습니다"]
},

{
type:"build-ko",
speak:"저는 고기를 먹습니다",
question:"한국어 문장을 만드세요:",
text:"من گوشت می‌خورم",
words:["고기를","먹습니다","저는"],
answer:["저는","고기를","먹습니다"]
},

{
type:"build-ko",
speak:"저는 계란을 먹습니다",
question:"한국어 문장을 만드세요:",
text:"من تخم‌مرغ می‌خورم",
words:["계란을","먹습니다","저는"],
answer:["저는","계란을","먹습니다"]
},

{
type:"build-ko",
speak:"저는 우유를 마십니다",
question:"한국어 문장을 만드세요:",
text:"من شیر می‌نوشم",
words:["우유를","마십니다","저는"],
answer:["저는","우유를","마십니다"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"저는 빵을 먹습니다",
question:"ترجمه را بساز:",
text:"저는 빵을 먹습니다",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"저는 밥을 먹습니다",
question:"ترجمه را بساز:",
text:"저는 밥을 먹습니다",
words:["می‌خورم","برنج","من"],
answer:["من","برنج","می‌خورم"]
},

{
type:"build-fa",
speak:"저는 고기를 먹습니다",
question:"ترجمه را بساز:",
text:"저는 고기를 먹습니다",
words:["می‌خورم","گوشت","من"],
answer:["من","گوشت","می‌خورم"]
},

{
type:"build-fa",
speak:"저는 계란을 먹습니다",
question:"ترجمه را بساز:",
text:"저는 계란을 먹습니다",
words:["می‌خورم","تخم‌مرغ","یک","من"],
answer:["من","یک","تخم‌مرغ","می‌خورم"]
},

{
type:"build-fa",
speak:"저는 우유를 마십니다",
question:"ترجمه را بساز:",
text:"저는 우유를 마십니다",
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
