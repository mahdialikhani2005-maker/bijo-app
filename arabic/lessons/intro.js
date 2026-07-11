// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های عربی =====
const allLessons = {
  "ar-lesson1": {
    title: "الدرس ۱: الناس",
    nextPage: "lesson1.html",
    words: [
      { ar: "رجل", fa: "مرد", image: "../../media/people/man.png" },
      { ar: "امرأة", fa: "زن", image: "../../media/people/woman.png" },
      { ar: "ولد", fa: "پسر", image: "../../media/people/boy.png" },
      { ar: "بنت", fa: "دختر", image: "../../media/people/girl.png" },
      { ar: "طفل", fa: "نوزاد", image: "../../media/people/baby.png" }
    ]
  },
  "ar-lesson2": {
    title: "الدرس ۲: أجزاء الجسم",
    nextPage: "lesson2.html",
    words: [
      { ar: "رأس", fa: "سر", image: "../../media/body/head.png" },
      { ar: "يد", fa: "دست", image: "../../media/body/hand.png" },
      { ar: "عين", fa: "چشم", image: "../../media/body/eye.png" },
      { ar: "قدم", fa: "پا", image: "../../media/body/foot.png" },
      { ar: "أنف", fa: "بینی", image: "../../media/body/nose.png" }
    ]
  },
  "ar-lesson3": {
    title: "الدرس ۳: البيت",
    nextPage: "lesson3.html",
    words: [
      { ar: "بيت", fa: "خانه", image: "../../media/house/house.png" },
      { ar: "غرفة", fa: "اتاق", image: "../../media/house/room.png" },
      { ar: "باب", fa: "در", image: "../../media/house/door.png" },
      { ar: "نافذة", fa: "پنجره", image: "../../media/house/window.png" },
      { ar: "مطبخ", fa: "آشپزخانه", image: "../../media/house/kitchen.png" }
    ]
  },
  "ar-lesson4": {
    title: "الدرس ۴: الملابس",
    nextPage: "lesson4.html",
    words: [
      { ar: "قميص", fa: "پیراهن", image: "../../media/clothes/shirt.png" },
      { ar: "بنطلون", fa: "شلوار", image: "../../media/clothes/pants.png" },
      { ar: "حذاء", fa: "کفش", image: "../../media/clothes/shoes.png" },
      { ar: "قبعة", fa: "کلاه", image: "../../media/clothes/hat.png" },
      { ar: "فستان", fa: "لباس", image: "../../media/clothes/dress.png" }
    ]
  },
  "ar-lesson5": {
    title: "الدرس ۵: الطعام",
    nextPage: "lesson5.html",
    words: [
      { ar: "خبز", fa: "نان", image: "../../media/food/bread.png" },
      { ar: "أرز", fa: "برنج", image: "../../media/food/rice.png" },
      { ar: "لحم", fa: "گوشت", image: "../../media/food/meat.png" },
      { ar: "بيض", fa: "تخم‌مرغ", image: "../../media/food/egg.png" },
      { ar: "حليب", fa: "شیر", image: "../../media/food/milk.png" }
    ]
  },
  "ar-lesson6": {
    title: "الدرس ۶: الفواكه",
    nextPage: "lesson6.html",
    words: [
      { ar: "تفاح", fa: "سیب", image: "../../media/fruits/apple.png" },
      { ar: "موز", fa: "موز", image: "../../media/fruits/banana.png" },
      { ar: "برتقال", fa: "پرتقال", image: "../../media/fruits/orange.png" },
      { ar: "عنب", fa: "انگور", image: "../../media/fruits/grape.png" },
      { ar: "بطيخ", fa: "هندوانه", image: "../../media/fruits/watermelon.png" }
    ]
  },
  "ar-lesson7": {
    title: "الدرس ۷: الخضروات",
    nextPage: "lesson7.html",
    words: [
      { ar: "طماطم", fa: "گوجه", image: "../../media/vegetables/tomato.png" },
      { ar: "بطاطس", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.png" },
      { ar: "جزر", fa: "هویج", image: "../../media/vegetables/carrot.png" },
      { ar: "بصل", fa: "پیاز", image: "../../media/vegetables/onion.png" },
      { ar: "خيار", fa: "خیار", image: "../../media/vegetables/cucumber.png" }
    ]
  },
  "ar-lesson8": {
    title: "الدرس ۸: الحيوانات",
    nextPage: "lesson8.html",
    words: [
      { ar: "كلب", fa: "سگ", image: "../../media/animals/dog.png" },
      { ar: "قطة", fa: "گربه", image: "../../media/animals/cat.png" },
      { ar: "طائر", fa: "پرنده", image: "../../media/animals/bird.png" },
      { ar: "سمكة", fa: "ماهی", image: "../../media/animals/fish.png" },
      { ar: "حصان", fa: "اسب", image: "../../media/animals/horse.png" }
    ]
  },
  "ar-lesson9": {
    title: "الدرس ۹: الطبيعة",
    nextPage: "lesson9.html",
    words: [
      { ar: "شمس", fa: "خورشید", image: "../../media/nature/sun.png" },
      { ar: "قمر", fa: "ماه", image: "../../media/nature/moon.png" },
      { ar: "نجم", fa: "ستاره", image: "../../media/nature/star.png" },
      { ar: "سماء", fa: "آسمان", image: "../../media/nature/sky.png" },
      { ar: "مطر", fa: "باران", image: "../../media/nature/rain.png" }
    ]
  },
  "ar-lesson10": {
    title: "الدرس ۱۰: الطقس",
    nextPage: "lesson10.html",
    words: [
      { ar: "حار", fa: "گرم", image: "../../media/weather/hot.png" },
      { ar: "بارد", fa: "سرد", image: "../../media/weather/cold.png" },
      { ar: "مشمس", fa: "آفتابی", image: "../../media/weather/sunny.png" },
      { ar: "غائم", fa: "ابری", image: "../../media/weather/cloudy.png" },
      { ar: "رياح", fa: "باد", image: "../../media/weather/wind.png" }
    ]
  },
  "ar-lesson11": {
    title: "الدرس ۱۱: الألوان",
    nextPage: "lesson11.html",
    words: [
      { ar: "أحمر", fa: "قرمز", image: "../../media/colors/red.png" },
      { ar: "أزرق", fa: "آبی", image: "../../media/colors/blue.png" },
      { ar: "أخضر", fa: "سبز", image: "../../media/colors/green.png" },
      { ar: "أصفر", fa: "زرد", image: "../../media/colors/yellow.png" },
      { ar: "أسود", fa: "مشکی", image: "../../media/colors/black.png" }
    ]
  },
  "ar-lesson12": {
    title: "الدرس ۱۲: الأرقام",
    nextPage: "lesson12.html",
    words: [
      { ar: "واحد", fa: "یک", image: "../../media/numbers/one.png" },
      { ar: "اثنان", fa: "دو", image: "../../media/numbers/two.png" },
      { ar: "ثلاثة", fa: "سه", image: "../../media/numbers/three.png" },
      { ar: "أربعة", fa: "چهار", image: "../../media/numbers/four.png" },
      { ar: "خمسة", fa: "پنج", image: "../../media/numbers/five.png" }
    ]
  },
  "ar-lesson13": {
    title: "الدرس ۱۳: الوقت",
    nextPage: "lesson13.html",
    words: [
      { ar: "اليوم", fa: "امروز", image: "../../media/time/today.png" },
      { ar: "غداً", fa: "فردا", image: "../../media/time/tomorrow.png" },
      { ar: "أمس", fa: "دیروز", image: "../../media/time/yesterday.png" },
      { ar: "صباح", fa: "صبح", image: "../../media/time/morning.png" },
      { ar: "ليل", fa: "شب", image: "../../media/time/night.png" }
    ]
  },
  "ar-lesson14": {
    title: "الدرس ۱۴: المهن",
    nextPage: "lesson14.html",
    words: [
      { ar: "معلم", fa: "معلم", image: "../../media/jobs/teacher.png" },
      { ar: "طبيب", fa: "دکتر", image: "../../media/jobs/doctor.png" },
      { ar: "مهندس", fa: "مهندس", image: "../../media/jobs/engineer.png" },
      { ar: "طالب", fa: "دانش‌آموز", image: "../../media/jobs/student.png" },
      { ar: "سائق", fa: "راننده", image: "../../media/jobs/driver.png" }
    ]
  },
  "ar-lesson15": {
    title: "الدرس ۱۵: المركبات",
    nextPage: "lesson15.html",
    words: [
      { ar: "سيارة", fa: "ماشین", image: "../../media/vehicles/car.png" },
      { ar: "حافلة", fa: "اتوبوس", image: "../../media/vehicles/bus.png" },
      { ar: "قطار", fa: "قطار", image: "../../media/vehicles/train.png" },
      { ar: "طائرة", fa: "هواپیما", image: "../../media/vehicles/airplane.png" },
      { ar: "دراجة", fa: "دوچرخه", image: "../../media/vehicles/bicycle.png" }
    ]
  },
  "ar-lesson16": {
    title: "الدرس ۱۶: الأماكن",
    nextPage: "lesson16.html",
    words: [
      { ar: "مدرسة", fa: "مدرسه", image: "../../media/places/school.png" },
      { ar: "مستشفى", fa: "بیمارستان", image: "../../media/places/hospital.png" },
      { ar: "متجر", fa: "فروشگاه", image: "../../media/places/store.png" },
      { ar: "حديقة", fa: "پارک", image: "../../media/places/park.png" },
      { ar: "مسجد", fa: "مسجد", image: "../../media/places/mosque.png" }
    ]
  },
  "ar-lesson17": {
    title: "الدرس ۱۷: المشاعر",
    nextPage: "lesson17.html",
    words: [
      { ar: "سعيد", fa: "خوشحال", image: "../../media/feelings/happy.png" },
      { ar: "حزين", fa: "ناراحت", image: "../../media/feelings/sad.png" },
      { ar: "غاضب", fa: "عصبانی", image: "../../media/feelings/angry.png" },
      { ar: "متعب", fa: "خسته", image: "../../media/feelings/tired.png" },
      { ar: "جائع", fa: "گرسنه", image: "../../media/feelings/hungry.png" }
    ]
  },
  "ar-lesson18": {
    title: "الدرس ۱۸: الأعمال اليومية",
    nextPage: "lesson18.html",
    words: [
      { ar: "أكل", fa: "خوردن", image: "../../media/actions/eat.png" },
      { ar: "نام", fa: "خوابیدن", image: "../../media/actions/sleep.png" },
      { ar: "مشى", fa: "راه رفتن", image: "../../media/actions/walk.png" },
      { ar: "قرأ", fa: "خواندن", image: "../../media/actions/read.png" },
      { ar: "كتب", fa: "نوشتن", image: "../../media/actions/write.png" }
    ]
  },
  "ar-lesson19": {
    title: "الدرس ۱۹: الصفات",
    nextPage: "lesson19.html",
    words: [
      { ar: "كبير", fa: "بزرگ", image: "../../media/adjectives/big.png" },
      { ar: "صغير", fa: "کوچک", image: "../../media/adjectives/small.png" },
      { ar: "طويل", fa: "بلند", image: "../../media/adjectives/tall.png" },
      { ar: "قصير", fa: "کوتاه", image: "../../media/adjectives/short.png" },
      { ar: "جميل", fa: "زیبا", image: "../../media/adjectives/beautiful.png" }
    ]
  },
  "ar-lesson20": {
    title: "الدرس ۲۰: الأسئلة",
    nextPage: "lesson20.html",
    words: [
      { ar: "من", fa: "چه کسی", image: "../../media/questions/who.png" },
      { ar: "ماذا", fa: "چه", image: "../../media/questions/what.png" },
      { ar: "أين", fa: "کجا", image: "../../media/questions/where.png" },
      { ar: "متى", fa: "کی", image: "../../media/questions/when.png" },
      { ar: "لماذا", fa: "چرا", image: "../../media/questions/why.png" }
    ]
  }
};

// ===== تابع پخش صدا (عربی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ الدرس غير موجود!</h2>
      <p>يرجى الدخول من الصفحة الرئيسية.</p>
      <a href="../index.html">العودة إلى الصفحة الرئيسية</a>
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
      <img src="${w.image}" alt="${w.ar}">
      <div class="word-en" style="font-family: 'Traditional Arabic', 'Amiri', serif; font-size: 22px;">${w.ar}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.ar);
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