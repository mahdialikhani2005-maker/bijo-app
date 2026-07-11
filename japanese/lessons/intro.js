// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های ژاپنی =====
const allLessons = {
  "ja-lesson1": {
    title: "第1課：人々",
    nextPage: "lesson1.html",
    words: [
      { ja: "男性", fa: "مرد", image: "../../media/people/man.png" },
      { ja: "女性", fa: "زن", image: "../../media/people/woman.png" },
      { ja: "男の子", fa: "پسر", image: "../../media/people/boy.png" },
      { ja: "女の子", fa: "دختر", image: "../../media/people/girl.png" },
      { ja: "赤ちゃん", fa: "نوزاد", image: "../../media/people/baby.png" }
    ]
  },
  "ja-lesson2": {
    title: "第2課：体の部位",
    nextPage: "lesson2.html",
    words: [
      { ja: "頭", fa: "سر", image: "../../media/body/head.png" },
      { ja: "手", fa: "دست", image: "../../media/body/hand.png" },
      { ja: "目", fa: "چشم", image: "../../media/body/eye.png" },
      { ja: "足", fa: "پا", image: "../../media/body/foot.png" },
      { ja: "鼻", fa: "بینی", image: "../../media/body/nose.png" }
    ]
  },
  "ja-lesson3": {
    title: "第3課：家",
    nextPage: "lesson3.html",
    words: [
      { ja: "家", fa: "خانه", image: "../../media/house/house.png" },
      { ja: "部屋", fa: "اتاق", image: "../../media/house/room.png" },
      { ja: "ドア", fa: "در", image: "../../media/house/door.png" },
      { ja: "窓", fa: "پنجره", image: "../../media/house/window.png" },
      { ja: "キッチン", fa: "آشپزخانه", image: "../../media/house/kitchen.png" }
    ]
  },
  "ja-lesson4": {
    title: "第4課：衣服",
    nextPage: "lesson4.html",
    words: [
      { ja: "シャツ", fa: "پیراهن", image: "../../media/clothes/shirt.png" },
      { ja: "ズボン", fa: "شلوار", image: "../../media/clothes/pants.png" },
      { ja: "靴", fa: "کفش", image: "../../media/clothes/shoes.png" },
      { ja: "帽子", fa: "کلاه", image: "../../media/clothes/hat.png" },
      { ja: "ワンピース", fa: "لباس", image: "../../media/clothes/dress.png" }
    ]
  },
  "ja-lesson5": {
    title: "第5課：食べ物",
    nextPage: "lesson5.html",
    words: [
      { ja: "パン", fa: "نان", image: "../../media/food/bread.png" },
      { ja: "ごはん", fa: "برنج", image: "../../media/food/rice.png" },
      { ja: "肉", fa: "گوشت", image: "../../media/food/meat.png" },
      { ja: "卵", fa: "تخم‌مرغ", image: "../../media/food/egg.png" },
      { ja: "牛乳", fa: "شیر", image: "../../media/food/milk.png" }
    ]
  },
  "ja-lesson6": {
    title: "第6課：果物",
    nextPage: "lesson6.html",
    words: [
      { ja: "りんご", fa: "سیب", image: "../../media/fruits/apple.png" },
      { ja: "バナナ", fa: "موز", image: "../../media/fruits/banana.png" },
      { ja: "オレンジ", fa: "پرتقال", image: "../../media/fruits/orange.png" },
      { ja: "ぶどう", fa: "انگور", image: "../../media/fruits/grape.png" },
      { ja: "すいか", fa: "هندوانه", image: "../../media/fruits/watermelon.png" }
    ]
  },
  "ja-lesson7": {
    title: "第7課：野菜",
    nextPage: "lesson7.html",
    words: [
      { ja: "トマト", fa: "گوجه", image: "../../media/vegetables/tomato.png" },
      { ja: "じゃがいも", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.png" },
      { ja: "にんじん", fa: "هویج", image: "../../media/vegetables/carrot.png" },
      { ja: "たまねぎ", fa: "پیاز", image: "../../media/vegetables/onion.png" },
      { ja: "きゅうり", fa: "خیار", image: "../../media/vegetables/cucumber.png" }
    ]
  },
  "ja-lesson8": {
    title: "第8課：動物",
    nextPage: "lesson8.html",
    words: [
      { ja: "犬", fa: "سگ", image: "../../media/animals/dog.png" },
      { ja: "猫", fa: "گربه", image: "../../media/animals/cat.png" },
      { ja: "鳥", fa: "پرنده", image: "../../media/animals/bird.png" },
      { ja: "魚", fa: "ماهی", image: "../../media/animals/fish.png" },
      { ja: "馬", fa: "اسب", image: "../../media/animals/horse.png" }
    ]
  },
  "ja-lesson9": {
    title: "第9課：自然",
    nextPage: "lesson9.html",
    words: [
      { ja: "太陽", fa: "خورشید", image: "../../media/nature/sun.png" },
      { ja: "月", fa: "ماه", image: "../../media/nature/moon.png" },
      { ja: "星", fa: "ستاره", image: "../../media/nature/star.png" },
      { ja: "空", fa: "آسمان", image: "../../media/nature/sky.png" },
      { ja: "雨", fa: "باران", image: "../../media/nature/rain.png" }
    ]
  },
  "ja-lesson10": {
    title: "第10課：天気",
    nextPage: "lesson10.html",
    words: [
      { ja: "暑い", fa: "گرم", image: "../../media/weather/hot.png" },
      { ja: "寒い", fa: "سرد", image: "../../media/weather/cold.png" },
      { ja: "晴れ", fa: "آفتابی", image: "../../media/weather/sunny.png" },
      { ja: "曇り", fa: "ابری", image: "../../media/weather/cloudy.png" },
      { ja: "風", fa: "باد", image: "../../media/weather/wind.png" }
    ]
  },
  "ja-lesson11": {
    title: "第11課：色",
    nextPage: "lesson11.html",
    words: [
      { ja: "赤", fa: "قرمز", image: "../../media/colors/red.png" },
      { ja: "青", fa: "آبی", image: "../../media/colors/blue.png" },
      { ja: "緑", fa: "سبز", image: "../../media/colors/green.png" },
      { ja: "黄色", fa: "زرد", image: "../../media/colors/yellow.png" },
      { ja: "黒", fa: "مشکی", image: "../../media/colors/black.png" }
    ]
  },
  "ja-lesson12": {
    title: "第12課：数字",
    nextPage: "lesson12.html",
    words: [
      { ja: "一", fa: "یک", image: "../../media/numbers/one.png" },
      { ja: "二", fa: "دو", image: "../../media/numbers/two.png" },
      { ja: "三", fa: "سه", image: "../../media/numbers/three.png" },
      { ja: "四", fa: "چهار", image: "../../media/numbers/four.png" },
      { ja: "五", fa: "پنج", image: "../../media/numbers/five.png" }
    ]
  },
  "ja-lesson13": {
    title: "第13課：時間",
    nextPage: "lesson13.html",
    words: [
      { ja: "今日", fa: "امروز", image: "../../media/time/today.png" },
      { ja: "明日", fa: "فردا", image: "../../media/time/tomorrow.png" },
      { ja: "昨日", fa: "دیروز", image: "../../media/time/yesterday.png" },
      { ja: "朝", fa: "صبح", image: "../../media/time/morning.png" },
      { ja: "夜", fa: "شب", image: "../../media/time/night.png" }
    ]
  },
  "ja-lesson14": {
    title: "第14課：職業",
    nextPage: "lesson14.html",
    words: [
      { ja: "先生", fa: "معلم", image: "../../media/jobs/teacher.png" },
      { ja: "医者", fa: "دکتر", image: "../../media/jobs/doctor.png" },
      { ja: "エンジニア", fa: "مهندس", image: "../../media/jobs/engineer.png" },
      { ja: "学生", fa: "دانش‌آموز", image: "../../media/jobs/student.png" },
      { ja: "運転手", fa: "راننده", image: "../../media/jobs/driver.png" }
    ]
  },
  "ja-lesson15": {
    title: "第15課：乗り物",
    nextPage: "lesson15.html",
    words: [
      { ja: "車", fa: "ماشین", image: "../../media/vehicles/car.png" },
      { ja: "バス", fa: "اتوبوس", image: "../../media/vehicles/bus.png" },
      { ja: "電車", fa: "قطار", image: "../../media/vehicles/train.png" },
      { ja: "飛行機", fa: "هواپیما", image: "../../media/vehicles/airplane.png" },
      { ja: "自転車", fa: "دوچرخه", image: "../../media/vehicles/bicycle.png" }
    ]
  },
  "ja-lesson16": {
    title: "第16課：場所",
    nextPage: "lesson16.html",
    words: [
      { ja: "学校", fa: "مدرسه", image: "../../media/places/school.png" },
      { ja: "病院", fa: "بیمارستان", image: "../../media/places/hospital.png" },
      { ja: "店", fa: "فروشگاه", image: "../../media/places/store.png" },
      { ja: "公園", fa: "پارک", image: "../../media/places/park.png" },
      { ja: "モスク", fa: "مسجد", image: "../../media/places/mosque.png" }
    ]
  },
  "ja-lesson17": {
    title: "第17課：感情",
    nextPage: "lesson17.html",
    words: [
      { ja: "嬉しい", fa: "خوشحال", image: "../../media/feelings/happy.png" },
      { ja: "悲しい", fa: "ناراحت", image: "../../media/feelings/sad.png" },
      { ja: "怒っている", fa: "عصبانی", image: "../../media/feelings/angry.png" },
      { ja: "疲れた", fa: "خسته", image: "../../media/feelings/tired.png" },
      { ja: "お腹すいた", fa: "گرسنه", image: "../../media/feelings/hungry.png" }
    ]
  },
  "ja-lesson18": {
    title: "第18課：日常活動",
    nextPage: "lesson18.html",
    words: [
      { ja: "食べる", fa: "خوردن", image: "../../media/actions/eat.png" },
      { ja: "寝る", fa: "خوابیدن", image: "../../media/actions/sleep.png" },
      { ja: "歩く", fa: "راه رفتن", image: "../../media/actions/walk.png" },
      { ja: "読む", fa: "خواندن", image: "../../media/actions/read.png" },
      { ja: "書く", fa: "نوشتن", image: "../../media/actions/write.png" }
    ]
  },
  "ja-lesson19": {
    title: "第19課：形容詞",
    nextPage: "lesson19.html",
    words: [
      { ja: "大きい", fa: "بزرگ", image: "../../media/adjectives/big.png" },
      { ja: "小さい", fa: "کوچک", image: "../../media/adjectives/small.png" },
      { ja: "高い", fa: "بلند", image: "../../media/adjectives/tall.png" },
      { ja: "低い", fa: "کوتاه", image: "../../media/adjectives/short.png" },
      { ja: "きれい", fa: "زیبا", image: "../../media/adjectives/beautiful.png" }
    ]
  },
  "ja-lesson20": {
    title: "第20課：質問",
    nextPage: "lesson20.html",
    words: [
      { ja: "誰", fa: "چه کسی", image: "../../media/questions/who.png" },
      { ja: "何", fa: "چه", image: "../../media/questions/what.png" },
      { ja: "どこ", fa: "کجا", image: "../../media/questions/where.png" },
      { ja: "いつ", fa: "کی", image: "../../media/questions/when.png" },
      { ja: "なぜ", fa: "چرا", image: "../../media/questions/why.png" }
    ]
  }
};

// ===== تابع پخش صدا (ژاپنی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ レッスンが見つかりません！</h2>
      <p>ホームページから入ってください。</p>
      <a href="../index.html">ホームに戻る</a>
    `;
    return;
  }

  document.getElementById("lesson-title").textContent = "📚 " + lesson.title;

  const container = document.getElementById("word-grid");
  container.innerHTML = "";

  lesson.words.forEach((w) => {
    const card = document.createElement("div");
    card.className = "word-card";
    card.innerHTML = `
      <img src="${w.image}" alt="${w.ja}">
      <div class="word-en" style="font-size: 22px;">${w.ja}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.ja);
      card.style.borderColor = "#00b894";
      setTimeout(() => {
        card.style.borderColor = "transparent";
      }, 800);
    });
    container.appendChild(card);
  });

  document.getElementById("start-lesson-btn").addEventListener("click", () => {
    window.location.href = lesson.nextPage;
  });
}

window.onload = renderIntro;