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
question:"哪个是学校 ？",
speak:"xuéxiào",
options:[
{text:"医院",image:"../../media/places/hospital.png"},
{text:"学校",image:"../../media/places/school.png"},
{text:"商店",image:"../../media/places/store.png"},
{text:"公园",image:"../../media/places/park.png"}
],
answer:"学校"
},

{
type:"image",
question:"哪个是医院 ？",
speak:"yīyuàn",
options:[
{text:"公园",image:"../../media/places/park.png"},
{text:"医院",image:"../../media/places/hospital.png"},
{text:"清真寺",image:"../../media/places/mosque.png"},
{text:"学校",image:"../../media/places/school.png"}
],
answer:"医院"
},

{
type:"image",
question:"哪个是商店 ？",
speak:"shāngdiàn",
options:[
{text:"学校",image:"../../media/places/school.png"},
{text:"商店",image:"../../media/places/store.png"},
{text:"清真寺",image:"../../media/places/mosque.png"},
{text:"医院",image:"../../media/places/hospital.png"}
],
answer:"商店"
},

{
type:"image",
question:"哪个是公园 ？",
speak:"gōngyuán",
options:[
{text:"商店",image:"../../media/places/store.png"},
{text:"医院",image:"../../media/places/hospital.png"},
{text:"公园",image:"../../media/places/park.png"},
{text:"学校",image:"../../media/places/school.png"}
],
answer:"公园"
},

{
type:"image",
question:"哪个是清真寺 ？",
speak:"qīngzhēnsì",
options:[
{text:"公园",image:"../../media/places/park.png"},
{text:"学校",image:"../../media/places/school.png"},
{text:"医院",image:"../../media/places/hospital.png"},
{text:"清真寺",image:"../../media/places/mosque.png"}
],
answer:"清真寺"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/places/school.png",
options:["医院","学校","商店","公园"],
answer:"学校"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/places/hospital.png",
options:["公园","医院","清真寺","学校"],
answer:"医院"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/places/store.png",
options:["学校","商店","清真寺","医院"],
answer:"商店"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/places/park.png",
options:["商店","医院","公园","学校"],
answer:"公园"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/places/mosque.png",
options:["公园","学校","医院","清真寺"],
answer:"清真寺"
},

/* AUDIO */

{
type:"audio",
speak:"xuéxiào",
question:"你听到了哪个词？",
options:["医院","学校","商店","公园"],
answer:"学校"
},

{
type:"audio",
speak:"yīyuàn",
question:"你听到了哪个词？",
options:["公园","医院","清真寺","学校"],
answer:"医院"
},

{
type:"audio",
speak:"shāngdiàn",
question:"你听到了哪个词？",
options:["学校","商店","清真寺","医院"],
answer:"商店"
},

{
type:"audio",
speak:"gōngyuán",
question:"你听到了哪个词？",
options:["商店","医院","公园","学校"],
answer:"公园"
},

{
type:"audio",
speak:"qīngzhēnsì",
question:"你听到了哪个词？",
options:["公园","学校","医院","清真寺"],
answer:"清真寺"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"这是一个学校",
question:"请组成中文句子：",
text:"این یک مدرسه است",
words:["学校","一个","这是"],
answer:["这是","一个","学校"]
},

{
type:"build-zh",
speak:"这是一个医院",
question:"请组成中文句子：",
text:"این یک بیمارستان است",
words:["医院","一个","这是"],
answer:["这是","一个","医院"]
},

{
type:"build-zh",
speak:"这是一个商店",
question:"请组成中文句子：",
text:"این یک فروشگاه است",
words:["商店","一个","这是"],
answer:["这是","一个","商店"]
},

{
type:"build-zh",
speak:"这是一个公园",
question:"请组成中文句子：",
text:"این یک پارک است",
words:["公园","一个","这是"],
answer:["这是","一个","公园"]
},

{
type:"build-zh",
speak:"这是一个清真寺",
question:"请组成中文句子：",
text:"این یک مسجد است",
words:["清真寺","一个","这是"],
answer:["这是","一个","清真寺"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"这是一个学校",
question:"ترجمه را بساز:",
text:"这是一个学校",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"这是一个医院",
question:"ترجمه را بساز:",
text:"这是一个医院",
words:["است","بیمارستان","یک","این"],
answer:["این","یک","بیمارستان","است"]
},

{
type:"build-fa",
speak:"这是一个商店",
question:"ترجمه را بساز:",
text:"这是一个商店",
words:["است","فروشگاه","یک","این"],
answer:["این","یک","فروشگاه","است"]
},

{
type:"build-fa",
speak:"这是一个公园",
question:"ترجمه را بساز:",
text:"这是一个公园",
words:["است","پارک","یک","این"],
answer:["این","یک","پارک","است"]
},

{
type:"build-fa",
speak:"这是一个清真寺",
question:"ترجمه را بساز:",
text:"这是一个清真寺",
words:["است","مسجد","یک","این"],
answer:["این","یک","مسجد","است"]
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
