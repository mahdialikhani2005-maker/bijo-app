let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja";
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
question:"どれが学校 ですか？",
speak:"がっこう",
options:[
{text:"病院",image:"../../media/places/hospital.png"},
{text:"学校",image:"../../media/places/school.png"},
{text:"店",image:"../../media/places/store.png"},
{text:"公園",image:"../../media/places/park.png"}
],
answer:"学校"
},

{
type:"image",
question:"どれが病院 ですか？",
speak:"びょういん",
options:[
{text:"公園",image:"../../media/places/park.png"},
{text:"病院",image:"../../media/places/hospital.png"},
{text:"モスク",image:"../../media/places/mosque.png"},
{text:"学校",image:"../../media/places/school.png"}
],
answer:"病院"
},

{
type:"image",
question:"どれが店 ですか？",
speak:"みせ",
options:[
{text:"学校",image:"../../media/places/school.png"},
{text:"店",image:"../../media/places/store.png"},
{text:"モスク",image:"../../media/places/mosque.png"},
{text:"病院",image:"../../media/places/hospital.png"}
],
answer:"店"
},

{
type:"image",
question:"どれが公園 ですか？",
speak:"こうえん",
options:[
{text:"店",image:"../../media/places/store.png"},
{text:"病院",image:"../../media/places/hospital.png"},
{text:"公園",image:"../../media/places/park.png"},
{text:"学校",image:"../../media/places/school.png"}
],
answer:"公園"
},

{
type:"image",
question:"どれがモスク ですか？",
speak:"モスク",
options:[
{text:"公園",image:"../../media/places/park.png"},
{text:"学校",image:"../../media/places/school.png"},
{text:"病院",image:"../../media/places/hospital.png"},
{text:"モスク",image:"../../media/places/mosque.png"}
],
answer:"モスク"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/places/school.png",
options:["病院","学校","店","公園"],
answer:"学校"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/places/hospital.png",
options:["公園","病院","モスク","学校"],
answer:"病院"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/places/store.png",
options:["学校","店","モスク","病院"],
answer:"店"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/places/park.png",
options:["店","病院","公園","学校"],
answer:"公園"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/places/mosque.png",
options:["公園","学校","病院","モスク"],
answer:"モスク"
},

/* AUDIO */

{
type:"audio",
speak:"がっこう",
question:"どの言葉を聞きましたか？",
options:["病院","学校","店","公園"],
answer:"学校"
},

{
type:"audio",
speak:"びょういん",
question:"どの言葉を聞きましたか？",
options:["公園","病院","モスク","学校"],
answer:"病院"
},

{
type:"audio",
speak:"みせ",
question:"どの言葉を聞きましたか？",
options:["学校","店","モスク","病院"],
answer:"店"
},

{
type:"audio",
speak:"こうえん",
question:"どの言葉を聞きましたか？",
options:["店","病院","公園","学校"],
answer:"公園"
},

{
type:"audio",
speak:"モスク",
question:"どの言葉を聞きましたか？",
options:["公園","学校","病院","モスク"],
answer:"モスク"
},

/* BUILD JA */

{
type:"build-ja",
speak:"これは がっこう です",
question:"日本語の文を作ってください:",
text:"این یک مدرسه است",
words:["がっこう","です","これは"],
answer:["これは","がっこう","です"]
},

{
type:"build-ja",
speak:"これは びょういん です",
question:"日本語の文を作ってください:",
text:"این یک بیمارستان است",
words:["びょういん","です","これは"],
answer:["これは","びょういん","です"]
},

{
type:"build-ja",
speak:"これは みせ です",
question:"日本語の文を作ってください:",
text:"این یک فروشگاه است",
words:["みせ","です","これは"],
answer:["これは","みせ","です"]
},

{
type:"build-ja",
speak:"これは こうえん です",
question:"日本語の文を作ってください:",
text:"این یک پارک است",
words:["こうえん","です","これは"],
answer:["これは","こうえん","です"]
},

{
type:"build-ja",
speak:"これは モスク です",
question:"日本語の文を作ってください:",
text:"این یک مسجد است",
words:["モスク","です","これは"],
answer:["これは","モスク","です"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"これは がっこう です",
question:"ترجمه را بساز:",
text:"これは がっこう です",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"これは びょういん です",
question:"ترجمه را بساز:",
text:"これは びょういん です",
words:["است","بیمارستان","یک","این"],
answer:["این","یک","بیمارستان","است"]
},

{
type:"build-fa",
speak:"これは みせ です",
question:"ترجمه را بساز:",
text:"これは みせ です",
words:["است","فروشگاه","یک","این"],
answer:["این","یک","فروشگاه","است"]
},

{
type:"build-fa",
speak:"これは こうえん です",
question:"ترجمه را بساز:",
text:"これは こうえん です",
words:["است","پارک","یک","این"],
answer:["این","یک","پارک","است"]
},

{
type:"build-fa",
speak:"これは モスク です",
question:"ترجمه را بساز:",
text:"これは モスク です",
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

  else if (q.type === "build-en" || q.type === "build-fa" || q.type === "build-ja") {
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

if (q.type === "build-en" || q.type === "build-ja") {
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
