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
question:"어느 것이 사과 입니까 ?",
speak:"사과",
options:[
{text:"바나나",image:"../../media/fruits/banana.png"},
{text:"사과",image:"../../media/fruits/apple.png"},
{text:"오렌지",image:"../../media/fruits/orange.png"},
{text:"포도",image:"../../media/fruits/grape.png"}
],
answer:"사과"
},

{
type:"image",
question:"어느 것이 바나나 입니까 ?",
speak:"바나나",
options:[
{text:"오렌지",image:"../../media/fruits/orange.png"},
{text:"바나나",image:"../../media/fruits/banana.png"},
{text:"수박",image:"../../media/fruits/watermelon.png"},
{text:"사과",image:"../../media/fruits/apple.png"}
],
answer:"바나나"
},

{
type:"image",
question:"어느 것이 오렌지 입니까 ?",
speak:"오렌지",
options:[
{text:"사과",image:"../../media/fruits/apple.png"},
{text:"오렌지",image:"../../media/fruits/orange.png"},
{text:"포도",image:"../../media/fruits/grape.png"},
{text:"바나나",image:"../../media/fruits/banana.png"}
],
answer:"오렌지"
},

{
type:"image",
question:"어느 것이 포도 입니까 ?",
speak:"포도",
options:[
{text:"오렌지",image:"../../media/fruits/orange.png"},
{text:"바나나",image:"../../media/fruits/banana.png"},
{text:"포도",image:"../../media/fruits/grape.png"},
{text:"사과",image:"../../media/fruits/apple.png"}
],
answer:"포도"
},

{
type:"image",
question:"어느 것이 수박 입니까 ?",
speak:"수박",
options:[
{text:"포도",image:"../../media/fruits/grape.png"},
{text:"사과",image:"../../media/fruits/apple.png"},
{text:"바나나",image:"../../media/fruits/banana.png"},
{text:"수박",image:"../../media/fruits/watermelon.png"}
],
answer:"수박"
},

/* WORD */

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/fruits/apple.png",
options:["바나나","사과","오렌지","포도"],
answer:"사과"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/fruits/banana.png",
options:["오렌지","바나나","수박","사과"],
answer:"바나나"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/fruits/orange.png",
options:["사과","오렌지","포도","바나나"],
answer:"오렌지"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/fruits/grape.png",
options:["오렌지","바나나","포도","사과"],
answer:"포도"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/fruits/watermelon.png",
options:["포도","사과","바나나","수박"],
answer:"수박"
},

/* AUDIO */

{
type:"audio",
speak:"사과",
question:"어떤 단어를 들었습니까?",
options:["바나나","사과","오렌지","포도"],
answer:"사과"
},

{
type:"audio",
speak:"바나나",
question:"어떤 단어를 들었습니까?",
options:["오렌지","바나나","수박","사과"],
answer:"바나나"
},

{
type:"audio",
speak:"오렌지",
question:"어떤 단어를 들었습니까?",
options:["사과","오렌지","포도","바나나"],
answer:"오렌지"
},

{
type:"audio",
speak:"포도",
question:"어떤 단어를 들었습니까?",
options:["오렌지","바나나","포도","사과"],
answer:"포도"
},

{
type:"audio",
speak:"수박",
question:"어떤 단어를 들었습니까?",
options:["포도","사과","바나나","수박"],
answer:"수박"
},

/* BUILD KO */

{
type:"build-ko",
speak:"저는 사과를 먹습니다",
question:"한국어 문장을 만드세요:",
text:"من یک سیب می‌خورم",
words:["사과를","먹습니다","저는"],
answer:["저는","사과를","먹습니다"]
},

{
type:"build-ko",
speak:"저는 바나나를 먹습니다",
question:"한국어 문장을 만드세요:",
text:"من یک موز می‌خورم",
words:["바나나를","먹습니다","저는"],
answer:["저는","바나나를","먹습니다"]
},

{
type:"build-ko",
speak:"저는 오렌지를 먹습니다",
question:"한국어 문장을 만드세요:",
text:"من یک پرتقال می‌خورم",
words:["오렌지를","먹습니다","저는"],
answer:["저는","오렌지를","먹습니다"]
},

{
type:"build-ko",
speak:"저는 포도를 먹습니다",
question:"한국어 문장을 만드세요:",
text:"من انگور می‌خورم",
words:["포도를","먹습니다","저는"],
answer:["저는","포도를","먹습니다"]
},

{
type:"build-ko",
speak:"저는 수박을 먹습니다",
question:"한국어 문장을 만드세요:",
text:"من هندوانه می‌خورم",
words:["수박을","먹습니다","저는"],
answer:["저는","수박을","먹습니다"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"저는 사과를 먹습니다",
question:"ترجمه را بساز:",
text:"저는 사과를 먹습니다",
words:["می‌خورم","سیب","یک","من"],
answer:["من","یک","سیب","می‌خورم"]
},

{
type:"build-fa",
speak:"저는 바나나를 먹습니다",
question:"ترجمه را بساز:",
text:"저는 바나나를 먹습니다",
words:["می‌خورم","موز","یک","من"],
answer:["من","یک","موز","می‌خورم"]
},

{
type:"build-fa",
speak:"저는 오렌지를 먹습니다",
question:"ترجمه را بساز:",
text:"저는 오렌지를 먹습니다",
words:["می‌خورم","پرتقال","یک","من"],
answer:["من","یک","پرتقال","می‌خورم"]
},

{
type:"build-fa",
speak:"저는 포도를 먹습니다",
question:"ترجمه را بساز:",
text:"저는 포도를 먹습니다",
words:["می‌خورم","انگور","من"],
answer:["من","انگور","می‌خورم"]
},

{
type:"build-fa",
speak:"저는 수박을 먹습니다",
question:"ترجمه را بساز:",
text:"저는 수박을 먹습니다",
words:["می‌خورم","هندوانه","من"],
answer:["من","هندوانه","می‌خورم"]
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
