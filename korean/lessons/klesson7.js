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
question:"어느 것이 토마토 입니까 ?",
speak:"토마토",
options:[
{text:"감자",image:"../../media/vegetables/potato.png"},
{text:"토마토",image:"../../media/vegetables/tomato.png"},
{text:"당근",image:"../../media/vegetables/carrot.png"},
{text:"양파",image:"../../media/vegetables/onion.png"}
],
answer:"토마토"
},

{
type:"image",
question:"어느 것이 감자 입니까 ?",
speak:"감자",
options:[
{text:"양파",image:"../../media/vegetables/onion.png"},
{text:"감자",image:"../../media/vegetables/potato.png"},
{text:"오이",image:"../../media/vegetables/cucumber.png"},
{text:"토마토",image:"../../media/vegetables/tomato.png"}
],
answer:"감자"
},

{
type:"image",
question:"어느 것이 당근 입니까 ?",
speak:"당근",
options:[
{text:"토마토",image:"../../media/vegetables/tomato.png"},
{text:"당근",image:"../../media/vegetables/carrot.png"},
{text:"오이",image:"../../media/vegetables/cucumber.png"},
{text:"감자",image:"../../media/vegetables/potato.png"}
],
answer:"당근"
},

{
type:"image",
question:"어느 것이 양파 입니까 ?",
speak:"양파",
options:[
{text:"당근",image:"../../media/vegetables/carrot.png"},
{text:"감자",image:"../../media/vegetables/potato.png"},
{text:"양파",image:"../../media/vegetables/onion.png"},
{text:"토마토",image:"../../media/vegetables/tomato.png"}
],
answer:"양파"
},

{
type:"image",
question:"어느 것이 오이 입니까 ?",
speak:"오이",
options:[
{text:"양파",image:"../../media/vegetables/onion.png"},
{text:"토마토",image:"../../media/vegetables/tomato.png"},
{text:"감자",image:"../../media/vegetables/potato.png"},
{text:"오이",image:"../../media/vegetables/cucumber.png"}
],
answer:"오이"
},

/* WORD */

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/vegetables/tomato.png",
options:["감자","토마토","당근","양파"],
answer:"토마토"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/vegetables/potato.png",
options:["양파","감자","오이","토마토"],
answer:"감자"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/vegetables/carrot.png",
options:["토마토","당근","오이","감자"],
answer:"당근"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/vegetables/onion.png",
options:["당근","감자","양파","토마토"],
answer:"양파"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/vegetables/cucumber.png",
options:["양파","토마토","감자","오이"],
answer:"오이"
},

/* AUDIO */

{
type:"audio",
speak:"토마토",
question:"어떤 단어를 들었습니까?",
options:["감자","토마토","당근","양파"],
answer:"토마토"
},

{
type:"audio",
speak:"감자",
question:"어떤 단어를 들었습니까?",
options:["양파","감자","오이","토마토"],
answer:"감자"
},

{
type:"audio",
speak:"당근",
question:"어떤 단어를 들었습니까?",
options:["토마토","당근","오이","감자"],
answer:"당근"
},

{
type:"audio",
speak:"양파",
question:"어떤 단어를 들었습니까?",
options:["당근","감자","양파","토마토"],
answer:"양파"
},

{
type:"audio",
speak:"오이",
question:"어떤 단어를 들었습니까?",
options:["양파","토마토","감자","오이"],
answer:"오이"
},

/* BUILD KO */

{
type:"build-ko",
speak:"이것은 토마토입니다",
question:"한국어 문장을 만드세요:",
text:"این یک گوجه است",
words:["토마토입니다","이것은"],
answer:["이것은","토마토입니다"]
},

{
type:"build-ko",
speak:"이것은 감자입니다",
question:"한국어 문장을 만드세요:",
text:"این یک سیب‌زمینی است",
words:["감자입니다","이것은"],
answer:["이것은","감자입니다"]
},

{
type:"build-ko",
speak:"이것은 당근입니다",
question:"한국어 문장을 만드세요:",
text:"این یک هویج است",
words:["당근입니다","이것은"],
answer:["이것은","당근입니다"]
},

{
type:"build-ko",
speak:"이것은 양파입니다",
question:"한국어 문장을 만드세요:",
text:"این یک پیاز است",
words:["양파입니다","이것은"],
answer:["이것은","양파입니다"]
},

{
type:"build-ko",
speak:"이것은 오이입니다",
question:"한국어 문장을 만드세요:",
text:"این یک خیار است",
words:["오이입니다","이것은"],
answer:["이것은","오이입니다"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"이것은 토마토입니다",
question:"ترجمه را بساز:",
text:"이것은 토마토입니다",
words:["است","گوجه","یک","این"],
answer:["این","یک","گوجه","است"]
},

{
type:"build-fa",
speak:"이것은 감자입니다",
question:"ترجمه را بساز:",
text:"이것은 감자입니다",
words:["است","سیب‌زمینی","یک","این"],
answer:["این","یک","سیب‌زمینی","است"]
},

{
type:"build-fa",
speak:"이것은 당근입니다",
question:"ترجمه را بساز:",
text:"이것은 당근입니다",
words:["است","هویج","یک","این"],
answer:["این","یک","هویج","است"]
},

{
type:"build-fa",
speak:"이것은 양파입니다",
question:"ترجمه را بساز:",
text:"이것은 양파입니다",
words:["است","پیاز","یک","این"],
answer:["این","یک","پیاز","است"]
},

{
type:"build-fa",
speak:"이것은 오이입니다",
question:"ترجمه را بساز:",
text:"이것은 오이입니다",
words:["است","خیار","یک","این"],
answer:["این","یک","خیار","است"]
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
