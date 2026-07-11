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
question:"哪个是老师 ？",
speak:"lǎoshī",
options:[
{text:"医生",image:"../../media/jobs/doctor.png"},
{text:"老师",image:"../../media/jobs/teacher.png"},
{text:"工程师",image:"../../media/jobs/engineer.png"},
{text:"学生",image:"../../media/jobs/student.png"}
],
answer:"老师"
},

{
type:"image",
question:"哪个是医生 ？",
speak:"yīshēng",
options:[
{text:"学生",image:"../../media/jobs/student.png"},
{text:"医生",image:"../../media/jobs/doctor.png"},
{text:"司机",image:"../../media/jobs/driver.png"},
{text:"老师",image:"../../media/jobs/teacher.png"}
],
answer:"医生"
},

{
type:"image",
question:"哪个是工程师 ？",
speak:"gōngchéngshī",
options:[
{text:"老师",image:"../../media/jobs/teacher.png"},
{text:"工程师",image:"../../media/jobs/engineer.png"},
{text:"司机",image:"../../media/jobs/driver.png"},
{text:"医生",image:"../../media/jobs/doctor.png"}
],
answer:"工程师"
},

{
type:"image",
question:"哪个是学生 ？",
speak:"xuésheng",
options:[
{text:"工程师",image:"../../media/jobs/engineer.png"},
{text:"医生",image:"../../media/jobs/doctor.png"},
{text:"学生",image:"../../media/jobs/student.png"},
{text:"老师",image:"../../media/jobs/teacher.png"}
],
answer:"学生"
},

{
type:"image",
question:"哪个是司机 ？",
speak:"sījī",
options:[
{text:"学生",image:"../../media/jobs/student.png"},
{text:"老师",image:"../../media/jobs/teacher.png"},
{text:"医生",image:"../../media/jobs/doctor.png"},
{text:"司机",image:"../../media/jobs/driver.png"}
],
answer:"司机"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/jobs/teacher.png",
options:["医生","老师","工程师","学生"],
answer:"老师"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/jobs/doctor.png",
options:["学生","医生","司机","老师"],
answer:"医生"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/jobs/engineer.png",
options:["老师","工程师","司机","医生"],
answer:"工程师"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/jobs/student.png",
options:["工程师","医生","学生","老师"],
answer:"学生"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/jobs/driver.png",
options:["学生","老师","医生","司机"],
answer:"司机"
},

/* AUDIO */

{
type:"audio",
speak:"lǎoshī",
question:"你听到了哪个词？",
options:["医生","老师","工程师","学生"],
answer:"老师"
},

{
type:"audio",
speak:"yīshēng",
question:"你听到了哪个词？",
options:["学生","医生","司机","老师"],
answer:"医生"
},

{
type:"audio",
speak:"gōngchéngshī",
question:"你听到了哪个词？",
options:["老师","工程师","司机","医生"],
answer:"工程师"
},

{
type:"audio",
speak:"xuésheng",
question:"你听到了哪个词？",
options:["工程师","医生","学生","老师"],
answer:"学生"
},

{
type:"audio",
speak:"sījī",
question:"你听到了哪个词？",
options:["学生","老师","医生","司机"],
answer:"司机"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"她是老师",
question:"请组成中文句子：",
text:"او یک معلم است",
words:["老师","是","她"],
answer:["她","是","老师"]
},

{
type:"build-zh",
speak:"他是医生",
question:"请组成中文句子：",
text:"او یک دکتر است",
words:["医生","是","他"],
answer:["他","是","医生"]
},

{
type:"build-zh",
speak:"她是工程师",
question:"请组成中文句子：",
text:"او یک مهندس است",
words:["工程师","是","她"],
answer:["她","是","工程师"]
},

{
type:"build-zh",
speak:"我是学生",
question:"请组成中文句子：",
text:"من یک دانش‌آموز هستم",
words:["学生","是","我"],
answer:["我","是","学生"]
},

{
type:"build-zh",
speak:"他是司机",
question:"请组成中文句子：",
text:"او یک راننده است",
words:["司机","是","他"],
answer:["他","是","司机"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"她是老师",
question:"ترجمه را بساز:",
text:"她是老师",
words:["است","معلم","او"],
answer:["او","معلم","است"]
},

{
type:"build-fa",
speak:"他是医生",
question:"ترجمه را بساز:",
text:"他是医生",
words:["است","دکتر","او"],
answer:["او","دکتر","است"]
},

{
type:"build-fa",
speak:"她是工程师",
question:"ترجمه را بساز:",
text:"她是工程师",
words:["است","مهندس","او"],
answer:["او","مهندس","است"]
},

{
type:"build-fa",
speak:"我是学生",
question:"ترجمه را بساز:",
text:"我是学生",
words:["هستم","دانش‌آموز","من"],
answer:["من","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"他是司机",
question:"ترجمه را بساز:",
text:"他是司机",
words:["است","راننده","او"],
answer:["او","راننده","است"]
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
