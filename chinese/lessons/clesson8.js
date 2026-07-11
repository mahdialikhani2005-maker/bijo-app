let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
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
question:"哪个是狗 ？",
speak:"gǒu",
options:[
{text:"猫",image:"../../media/animals/cat.png"},
{text:"狗",image:"../../media/animals/dog.png"},
{text:"鸟",image:"../../media/animals/bird.png"},
{text:"鱼",image:"../../media/animals/fish.png"}
],
answer:"狗"
},

{
type:"image",
question:"哪个是猫 ？",
speak:"māo",
options:[
{text:"鱼",image:"../../media/animals/fish.png"},
{text:"猫",image:"../../media/animals/cat.png"},
{text:"马",image:"../../media/animals/horse.png"},
{text:"狗",image:"../../media/animals/dog.png"}
],
answer:"猫"
},

{
type:"image",
question:"哪个是鸟 ？",
speak:"niǎo",
options:[
{text:"狗",image:"../../media/animals/dog.png"},
{text:"鸟",image:"../../media/animals/bird.png"},
{text:"马",image:"../../media/animals/horse.png"},
{text:"猫",image:"../../media/animals/cat.png"}
],
answer:"鸟"
},

{
type:"image",
question:"哪个是鱼 ？",
speak:"yú",
options:[
{text:"鸟",image:"../../media/animals/bird.png"},
{text:"猫",image:"../../media/animals/cat.png"},
{text:"鱼",image:"../../media/animals/fish.png"},
{text:"狗",image:"../../media/animals/dog.png"}
],
answer:"鱼"
},

{
type:"image",
question:"哪个是马 ？",
speak:"mǎ",
options:[
{text:"鱼",image:"../../media/animals/fish.png"},
{text:"狗",image:"../../media/animals/dog.png"},
{text:"猫",image:"../../media/animals/cat.png"},
{text:"马",image:"../../media/animals/horse.png"}
],
answer:"马"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/animals/dog.png",
options:["猫","狗","鸟","鱼"],
answer:"狗"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/animals/cat.png",
options:["鱼","猫","马","狗"],
answer:"猫"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/animals/bird.png",
options:["狗","鸟","马","猫"],
answer:"鸟"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/animals/fish.png",
options:["鸟","猫","鱼","狗"],
answer:"鱼"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/animals/horse.png",
options:["鱼","狗","猫","马"],
answer:"马"
},

/* AUDIO */

{
type:"audio",
speak:"gǒu",
question:"你听到了哪个词？",
options:["猫","狗","鸟","鱼"],
answer:"狗"
},

{
type:"audio",
speak:"māo",
question:"你听到了哪个词？",
options:["鱼","猫","马","狗"],
answer:"猫"
},

{
type:"audio",
speak:"niǎo",
question:"你听到了哪个词？",
options:["狗","鸟","马","猫"],
answer:"鸟"
},

{
type:"audio",
speak:"yú",
question:"你听到了哪个词？",
options:["鸟","猫","鱼","狗"],
answer:"鱼"
},

{
type:"audio",
speak:"mǎ",
question:"你听到了哪个词？",
options:["鱼","狗","猫","马"],
answer:"马"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"这是一只狗",
question:"请组成中文句子：",
text:"این یک سگ است",
words:["狗","一只","这是"],
answer:["这是","一只","狗"]
},

{
type:"build-zh",
speak:"这是一只猫",
question:"请组成中文句子：",
text:"این یک گربه است",
words:["猫","一只","这是"],
answer:["这是","一只","猫"]
},

{
type:"build-zh",
speak:"这是一只鸟",
question:"请组成中文句子：",
text:"این یک پرنده است",
words:["鸟","一只","这是"],
answer:["这是","一只","鸟"]
},

{
type:"build-zh",
speak:"这是一条鱼",
question:"请组成中文句子：",
text:"این یک ماهی است",
words:["鱼","一条","这是"],
answer:["这是","一条","鱼"]
},

{
type:"build-zh",
speak:"这是一匹马",
question:"请组成中文句子：",
text:"این یک اسب است",
words:["马","一匹","这是"],
answer:["这是","一匹","马"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"这是一只狗",
question:"ترجمه را بساز:",
text:"这是一只狗",
words:["است","سگ","یک","این"],
answer:["این","یک","سگ","است"]
},

{
type:"build-fa",
speak:"这是一只猫",
question:"ترجمه را بساز:",
text:"这是一只猫",
words:["است","گربه","یک","این"],
answer:["این","یک","گربه","است"]
},

{
type:"build-fa",
speak:"这是一只鸟",
question:"ترجمه را بساز:",
text:"这是一只鸟",
words:["است","پرنده","یک","این"],
answer:["این","یک","پرنده","است"]
},

{
type:"build-fa",
speak:"这是一条鱼",
question:"ترجمه را بساز:",
text:"这是一条鱼",
words:["است","ماهی","یک","این"],
answer:["این","یک","ماهی","است"]
},

{
type:"build-fa",
speak:"这是一匹马",
question:"ترجمه را بساز:",
text:"这是一匹马",
words:["است","اسب","یک","این"],
answer:["این","یک","اسب","است"]
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

  else if (q.type === "build-en" || q.type === "build-fa" || q.type === "build-zh-CN") {
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

if (q.type === "build-en" || q.type === "build-zh-CN") {
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
