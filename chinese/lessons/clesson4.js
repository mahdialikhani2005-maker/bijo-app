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
question:"哪个是衬衫 ？",
speak:"chènshān",
options:[
{text:"裤子",image:"../../media/clothes/pants.png"},
{text:"衬衫",image:"../../media/clothes/shirt.png"},
{text:"帽子",image:"../../media/clothes/hat.png"},
{text:"连衣裙",image:"../../media/clothes/dress.png"}
],
answer:"衬衫"
},

{
type:"image",
question:"哪个是裤子 ？",
speak:"kùzi",
options:[
{text:"连衣裙",image:"../../media/clothes/dress.png"},
{text:"裤子",image:"../../media/clothes/pants.png"},
{text:"鞋",image:"../../media/clothes/shoes.png"},
{text:"衬衫",image:"../../media/clothes/shirt.png"}
],
answer:"裤子"
},

{
type:"image",
question:"哪个是鞋 ？",
speak:"xié",
options:[
{text:"衬衫",image:"../../media/clothes/shirt.png"},
{text:"鞋",image:"../../media/clothes/shoes.png"},
{text:"帽子",image:"../../media/clothes/hat.png"},
{text:"裤子",image:"../../media/clothes/pants.png"}
],
answer:"鞋"
},

{
type:"image",
question:"哪个是帽子 ？",
speak:"màozi",
options:[
{text:"鞋",image:"../../media/clothes/shoes.png"},
{text:"裤子",image:"../../media/clothes/pants.png"},
{text:"帽子",image:"../../media/clothes/hat.png"},
{text:"衬衫",image:"../../media/clothes/shirt.png"}
],
answer:"帽子"
},

{
type:"image",
question:"哪个是连衣裙 ？",
speak:"liányīqún",
options:[
{text:"帽子",image:"../../media/clothes/hat.png"},
{text:"衬衫",image:"../../media/clothes/shirt.png"},
{text:"裤子",image:"../../media/clothes/pants.png"},
{text:"连衣裙",image:"../../media/clothes/dress.png"}
],
answer:"连衣裙"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/clothes/shirt.png",
options:["裤子","衬衫","帽子","连衣裙"],
answer:"衬衫"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/clothes/pants.png",
options:["连衣裙","裤子","鞋","衬衫"],
answer:"裤子"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/clothes/shoes.png",
options:["衬衫","鞋","帽子","裤子"],
answer:"鞋"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/clothes/hat.png",
options:["鞋","裤子","帽子","衬衫"],
answer:"帽子"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/clothes/dress.png",
options:["帽子","衬衫","裤子","连衣裙"],
answer:"连衣裙"
},

/* AUDIO */

{
type:"audio",
speak:"chènshān",
question:"你听到了哪个词？",
options:["裤子","衬衫","帽子","连衣裙"],
answer:"衬衫"
},

{
type:"audio",
speak:"kùzi",
question:"你听到了哪个词？",
options:["连衣裙","裤子","鞋","衬衫"],
answer:"裤子"
},

{
type:"audio",
speak:"xié",
question:"你听到了哪个词？",
options:["衬衫","鞋","帽子","裤子"],
answer:"鞋"
},

{
type:"audio",
speak:"màozi",
question:"你听到了哪个词？",
options:["鞋","裤子","帽子","衬衫"],
answer:"帽子"
},

{
type:"audio",
speak:"liányīqún",
question:"你听到了哪个词？",
options:["帽子","衬衫","裤子","连衣裙"],
answer:"连衣裙"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"这是一件衬衫",
question:"请组成中文句子：",
text:"این یک پیراهن است",
words:["衬衫","一件","这是"],
answer:["这是","一件","衬衫"]
},

{
type:"build-zh",
speak:"这是一条裤子",
question:"请组成中文句子：",
text:"این یک شلوار است",
words:["裤子","一条","这是"],
answer:["这是","一条","裤子"]
},

{
type:"build-zh",
speak:"这是一双鞋",
question:"请组成中文句子：",
text:"این کفش‌ها هستند",
words:["鞋","一双","这是"],
answer:["这是","一双","鞋"]
},

{
type:"build-zh",
speak:"这是一顶帽子",
question:"请组成中文句子：",
text:"این یک کلاه است",
words:["帽子","一顶","这是"],
answer:["这是","一顶","帽子"]
},

{
type:"build-zh",
speak:"这是一条连衣裙",
question:"请组成中文句子：",
text:"این یک لباس است",
words:["连衣裙","一条","这是"],
answer:["这是","一条","连衣裙"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"这是一件衬衫",
question:"ترجمه را بساز:",
text:"这是一件衬衫",
words:["است","پیراهن","یک","این"],
answer:["این","یک","پیراهن","است"]
},

{
type:"build-fa",
speak:"这是一条裤子",
question:"ترجمه را بساز:",
text:"这是一条裤子",
words:["است","شلوار","یک","این"],
answer:["این","یک","شلوار","است"]
},

{
type:"build-fa",
speak:"这是一双鞋",
question:"ترجمه را بساز:",
text:"这是一双鞋",
words:["هستند","کفش‌ها","این"],
answer:["این","کفش‌ها","هستند"]
},

{
type:"build-fa",
speak:"这是一顶帽子",
question:"ترجمه را بساز:",
text:"这是一顶帽子",
words:["است","کلاه","یک","این"],
answer:["این","یک","کلاه","است"]
},

{
type:"build-fa",
speak:"这是一条连衣裙",
question:"ترجمه را بساز:",
text:"这是一条连衣裙",
words:["است","لباس","یک","این"],
answer:["این","یک","لباس","است"]
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
