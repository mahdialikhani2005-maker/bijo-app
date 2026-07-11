// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های چینی =====
const allLessons = {
  "zh-lesson1": {
    title: "第一课：人们",
    nextPage: "lesson1.html",
    words: [
      { zh: "男人", fa: "مرد", image: "../../media/people/man.png" },
      { zh: "女人", fa: "زن", image: "../../media/people/woman.png" },
      { zh: "男孩", fa: "پسر", image: "../../media/people/boy.png" },
      { zh: "女孩", fa: "دختر", image: "../../media/people/girl.png" },
      { zh: "婴儿", fa: "نوزاد", image: "../../media/people/baby.png" }
    ]
  },
  "zh-lesson2": {
    title: "第二课：身体部位",
    nextPage: "lesson2.html",
    words: [
      { zh: "头", fa: "سر", image: "../../media/body/head.png" },
      { zh: "手", fa: "دست", image: "../../media/body/hand.png" },
      { zh: "眼睛", fa: "چشم", image: "../../media/body/eye.png" },
      { zh: "脚", fa: "پا", image: "../../media/body/foot.png" },
      { zh: "鼻子", fa: "بینی", image: "../../media/body/nose.png" }
    ]
  },
  "zh-lesson3": {
    title: "第三课：房子",
    nextPage: "lesson3.html",
    words: [
      { zh: "房子", fa: "خانه", image: "../../media/house/house.png" },
      { zh: "房间", fa: "اتاق", image: "../../media/house/room.png" },
      { zh: "门", fa: "در", image: "../../media/house/door.png" },
      { zh: "窗户", fa: "پنجره", image: "../../media/house/window.png" },
      { zh: "厨房", fa: "آشپزخانه", image: "../../media/house/kitchen.png" }
    ]
  },
  "zh-lesson4": {
    title: "第四课：衣服",
    nextPage: "lesson4.html",
    words: [
      { zh: "衬衫", fa: "پیراهن", image: "../../media/clothes/shirt.png" },
      { zh: "裤子", fa: "شلوار", image: "../../media/clothes/pants.png" },
      { zh: "鞋", fa: "کفش", image: "../../media/clothes/shoes.png" },
      { zh: "帽子", fa: "کلاه", image: "../../media/clothes/hat.png" },
      { zh: "连衣裙", fa: "لباس", image: "../../media/clothes/dress.png" }
    ]
  },
  "zh-lesson5": {
    title: "第五课：食物",
    nextPage: "lesson5.html",
    words: [
      { zh: "面包", fa: "نان", image: "../../media/food/bread.png" },
      { zh: "米饭", fa: "برنج", image: "../../media/food/rice.png" },
      { zh: "肉", fa: "گوشت", image: "../../media/food/meat.png" },
      { zh: "鸡蛋", fa: "تخم‌مرغ", image: "../../media/food/egg.png" },
      { zh: "牛奶", fa: "شیر", image: "../../media/food/milk.png" }
    ]
  },
  "zh-lesson6": {
    title: "第六课：水果",
    nextPage: "lesson6.html",
    words: [
      { zh: "苹果", fa: "سیب", image: "../../media/fruits/apple.png" },
      { zh: "香蕉", fa: "موز", image: "../../media/fruits/banana.png" },
      { zh: "橙子", fa: "پرتقال", image: "../../media/fruits/orange.png" },
      { zh: "葡萄", fa: "انگور", image: "../../media/fruits/grape.png" },
      { zh: "西瓜", fa: "هندوانه", image: "../../media/fruits/watermelon.png" }
    ]
  },
  "zh-lesson7": {
    title: "第七课：蔬菜",
    nextPage: "lesson7.html",
    words: [
      { zh: "西红柿", fa: "گوجه", image: "../../media/vegetables/tomato.png" },
      { zh: "土豆", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.png" },
      { zh: "胡萝卜", fa: "هویج", image: "../../media/vegetables/carrot.png" },
      { zh: "洋葱", fa: "پیاز", image: "../../media/vegetables/onion.png" },
      { zh: "黄瓜", fa: "خیار", image: "../../media/vegetables/cucumber.png" }
    ]
  },
  "zh-lesson8": {
    title: "第八课：动物",
    nextPage: "lesson8.html",
    words: [
      { zh: "狗", fa: "سگ", image: "../../media/animals/dog.png" },
      { zh: "猫", fa: "گربه", image: "../../media/animals/cat.png" },
      { zh: "鸟", fa: "پرنده", image: "../../media/animals/bird.png" },
      { zh: "鱼", fa: "ماهی", image: "../../media/animals/fish.png" },
      { zh: "马", fa: "اسب", image: "../../media/animals/horse.png" }
    ]
  },
  "zh-lesson9": {
    title: "第九课：自然",
    nextPage: "lesson9.html",
    words: [
      { zh: "太阳", fa: "خورشید", image: "../../media/nature/sun.png" },
      { zh: "月亮", fa: "ماه", image: "../../media/nature/moon.png" },
      { zh: "星星", fa: "ستاره", image: "../../media/nature/star.png" },
      { zh: "天空", fa: "آسمان", image: "../../media/nature/sky.png" },
      { zh: "雨", fa: "باران", image: "../../media/nature/rain.png" }
    ]
  },
  "zh-lesson10": {
    title: "第十课：天气",
    nextPage: "lesson10.html",
    words: [
      { zh: "热", fa: "گرم", image: "../../media/weather/hot.png" },
      { zh: "冷", fa: "سرد", image: "../../media/weather/cold.png" },
      { zh: "晴天", fa: "آفتابی", image: "../../media/weather/sunny.png" },
      { zh: "多云", fa: "ابری", image: "../../media/weather/cloudy.png" },
      { zh: "风", fa: "باد", image: "../../media/weather/wind.png" }
    ]
  },
  "zh-lesson11": {
    title: "第十一课：颜色",
    nextPage: "lesson11.html",
    words: [
      { zh: "红色", fa: "قرمز", image: "../../media/colors/red.png" },
      { zh: "蓝色", fa: "آبی", image: "../../media/colors/blue.png" },
      { zh: "绿色", fa: "سبز", image: "../../media/colors/green.png" },
      { zh: "黄色", fa: "زرد", image: "../../media/colors/yellow.png" },
      { zh: "黑色", fa: "مشکی", image: "../../media/colors/black.png" }
    ]
  },
  "zh-lesson12": {
    title: "第十二课：数字",
    nextPage: "lesson12.html",
    words: [
      { zh: "一", fa: "یک", image: "../../media/numbers/one.png" },
      { zh: "二", fa: "دو", image: "../../media/numbers/two.png" },
      { zh: "三", fa: "سه", image: "../../media/numbers/three.png" },
      { zh: "四", fa: "چهار", image: "../../media/numbers/four.png" },
      { zh: "五", fa: "پنج", image: "../../media/numbers/five.png" }
    ]
  },
  "zh-lesson13": {
    title: "第十三课：时间",
    nextPage: "lesson13.html",
    words: [
      { zh: "今天", fa: "امروز", image: "../../media/time/today.png" },
      { zh: "明天", fa: "فردا", image: "../../media/time/tomorrow.png" },
      { zh: "昨天", fa: "دیروز", image: "../../media/time/yesterday.png" },
      { zh: "早上", fa: "صبح", image: "../../media/time/morning.png" },
      { zh: "晚上", fa: "شب", image: "../../media/time/night.png" }
    ]
  },
  "zh-lesson14": {
    title: "第十四课：职业",
    nextPage: "lesson14.html",
    words: [
      { zh: "老师", fa: "معلم", image: "../../media/jobs/teacher.png" },
      { zh: "医生", fa: "دکتر", image: "../../media/jobs/doctor.png" },
      { zh: "工程师", fa: "مهندس", image: "../../media/jobs/engineer.png" },
      { zh: "学生", fa: "دانش‌آموز", image: "../../media/jobs/student.png" },
      { zh: "司机", fa: "راننده", image: "../../media/jobs/driver.png" }
    ]
  },
  "zh-lesson15": {
    title: "第十五课：交通工具",
    nextPage: "lesson15.html",
    words: [
      { zh: "汽车", fa: "ماشین", image: "../../media/vehicles/car.png" },
      { zh: "公共汽车", fa: "اتوبوس", image: "../../media/vehicles/bus.png" },
      { zh: "火车", fa: "قطار", image: "../../media/vehicles/train.png" },
      { zh: "飞机", fa: "هواپیما", image: "../../media/vehicles/airplane.png" },
      { zh: "自行车", fa: "دوچرخه", image: "../../media/vehicles/bicycle.png" }
    ]
  },
  "zh-lesson16": {
    title: "第十六课：地方",
    nextPage: "lesson16.html",
    words: [
      { zh: "学校", fa: "مدرسه", image: "../../media/places/school.png" },
      { zh: "医院", fa: "بیمارستان", image: "../../media/places/hospital.png" },
      { zh: "商店", fa: "فروشگاه", image: "../../media/places/store.png" },
      { zh: "公园", fa: "پارک", image: "../../media/places/park.png" },
      { zh: "清真寺", fa: "مسجد", image: "../../media/places/mosque.png" }
    ]
  },
  "zh-lesson17": {
    title: "第十七课：感受",
    nextPage: "lesson17.html",
    words: [
      { zh: "开心", fa: "خوشحال", image: "../../media/feelings/happy.png" },
      { zh: "难过", fa: "ناراحت", image: "../../media/feelings/sad.png" },
      { zh: "生气", fa: "عصبانی", image: "../../media/feelings/angry.png" },
      { zh: "累", fa: "خسته", image: "../../media/feelings/tired.png" },
      { zh: "饿", fa: "گرسنه", image: "../../media/feelings/hungry.png" }
    ]
  },
  "zh-lesson18": {
    title: "第十八课：日常活动",
    nextPage: "lesson18.html",
    words: [
      { zh: "吃", fa: "خوردن", image: "../../media/actions/eat.png" },
      { zh: "睡觉", fa: "خوابیدن", image: "../../media/actions/sleep.png" },
      { zh: "走路", fa: "راه رفتن", image: "../../media/actions/walk.png" },
      { zh: "读", fa: "خواندن", image: "../../media/actions/read.png" },
      { zh: "写", fa: "نوشتن", image: "../../media/actions/write.png" }
    ]
  },
  "zh-lesson19": {
    title: "第十九课：形容词",
    nextPage: "lesson19.html",
    words: [
      { zh: "大", fa: "بزرگ", image: "../../media/adjectives/big.png" },
      { zh: "小", fa: "کوچک", image: "../../media/adjectives/small.png" },
      { zh: "高", fa: "بلند", image: "../../media/adjectives/tall.png" },
      { zh: "矮", fa: "کوتاه", image: "../../media/adjectives/short.png" },
      { zh: "漂亮", fa: "زیبا", image: "../../media/adjectives/beautiful.png" }
    ]
  },
  "zh-lesson20": {
    title: "第二十课：问题",
    nextPage: "lesson20.html",
    words: [
      { zh: "谁", fa: "چه کسی", image: "../../media/questions/who.png" },
      { zh: "什么", fa: "چه", image: "../../media/questions/what.png" },
      { zh: "哪里", fa: "کجا", image: "../../media/questions/where.png" },
      { zh: "什么时候", fa: "کی", image: "../../media/questions/when.png" },
      { zh: "为什么", fa: "چرا", image: "../../media/questions/why.png" }
    ]
  }
};

// ===== تابع پخش صدا (چینی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ 未找到课程!</h2>
      <p>请从主页进入。</p>
      <a href="../index.html">返回主页</a>
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
      <img src="${w.image}" alt="${w.zh}">
      <div class="word-en" style="font-size: 22px;">${w.zh}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.zh);
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