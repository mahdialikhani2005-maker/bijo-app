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
question:"哪个是男人 ？",
speak:"nánrén",
options:[
{text:"女人",image:"../../media/people/woman.png"},
{text:"男人",image:"../../media/people/man.png"},
{text:"男孩",image:"../../media/people/boy.png"},
{text:"女孩",image:"../../media/people/girl.png"}
],
answer:"男人"
},

{
type:"image",
question:"哪个是女人 ？",
speak:"nǚrén",
options:[
{text:"女孩",image:"../../media/people/girl.png"},
{text:"女人",image:"../../media/people/woman.png"},
{text:"男孩",image:"../../media/people/boy.png"},
{text:"男人",image:"../../media/people/man.png"}
],
answer:"女人"
},

{
type:"image",
question:"哪个是男孩 ？",
speak:"nánhái",
options:[
{text:"男人",image:"../../media/people/man.png"},
{text:"男孩",image:"../../media/people/boy.png"},
{text:"婴儿",image:"../../media/people/baby.png"},
{text:"女孩",image:"../../media/people/girl.png"}
],
answer:"男孩"
},

{
type:"image",
question:"哪个是女孩 ？",
speak:"nǚhái",
options:[
{text:"男孩",image:"../../media/people/boy.png"},
{text:"男人",image:"../../media/people/man.png"},
{text:"女孩",image:"../../media/people/girl.png"},
{text:"婴儿",image:"../../media/people/baby.png"}
],
answer:"女孩"
},

{
type:"image",
question:"哪个是婴儿 ？",
speak:"yīngér",
options:[
{text:"女孩",image:"../../media/people/girl.png"},
{text:"男孩",image:"../../media/people/boy.png"},
{text:"男人",image:"../../media/people/man.png"},
{text:"婴儿",image:"../../media/people/baby.png"}
],
answer:"婴儿"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/people/man.png",
options:["男孩","男人","女人","女孩"],
answer:"男人"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/people/woman.png",
options:["女人","女孩","婴儿","男人"],
answer:"女人"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/people/boy.png",
options:["男孩","男人","婴儿","女孩"],
answer:"男孩"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/people/girl.png",
options:["女孩","女人","男孩","婴儿"],
answer:"女孩"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/people/baby.png",
options:["婴儿","男孩","女孩","男人"],
answer:"婴儿"
},

/* AUDIO */

{
type:"audio",
speak:"nánrén",
question:"你听到了哪个词？",
options:["男人","男孩","女人","女孩"],
answer:"男人"
},

{
type:"audio",
speak:"nǚrén",
question:"你听到了哪个词？",
options:["女孩","女人","男孩","男人"],
answer:"女人"
},

{
type:"audio",
speak:"nánhái",
question:"你听到了哪个词？",
options:["男孩","男人","婴儿","女孩"],
answer:"男孩"
},

{
type:"audio",
speak:"nǚhái",
question:"你听到了哪个词？",
options:["男孩","女人","女孩","婴儿"],
answer:"女孩"
},

{
type:"audio",
speak:"yīngér",
question:"你听到了哪个词？",
options:["婴儿","男孩","男人","女孩"],
answer:"婴儿"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"他是男人",
question:"请组成中文句子：",
text:"او یک مرد است",
words:["男人","是","他"],
answer:["他","是","男人"]
},

{
type:"build-zh",
speak:"她是女人",
question:"请组成中文句子：",
text:"او یک زن است",
words:["女人","是","她"],
answer:["她","是","女人"]
},

{
type:"build-zh",
speak:"他是男孩",
question:"请组成中文句子：",
text:"او یک پسر است",
words:["男孩","是","他"],
answer:["他","是","男孩"]
},

{
type:"build-zh",
speak:"她是女孩",
question:"请组成中文句子：",
text:"او یک دختر است",
words:["女孩","是","她"],
answer:["她","是","女孩"]
},

{
type:"build-zh",
speak:"婴儿小",
question:"请组成中文句子：",
text:"نوزاد کوچک است",
words:["婴儿","小"],
answer:["婴儿","小"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"他是男人",
question:"ترجمه را بساز:",
text:"他是男人",
words:["است","مرد","یک","او"],
answer:["او","یک","مرد","است"]
},

{
type:"build-fa",
speak:"她是女人",
question:"ترجمه را بساز:",
text:"她是女人",
words:["یک","است","زن","او"],
answer:["او","یک","زن","است"]
},

{
type:"build-fa",
speak:"他是男孩",
question:"ترجمه را بساز:",
text:"他是男孩",
words:["است","پسر","یک","او"],
answer:["او","یک","پسر","است"]
},

{
type:"build-fa",
speak:"她是女孩",
question:"ترجمه را بساز:",
text:"她是女孩",
words:["است","دختر","یک","او"],
answer:["او","یک","دختر","است"]
},

{
type:"build-fa",
speak:"婴儿小",
question:"ترجمه را بساز:",
text:"婴儿小",
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
