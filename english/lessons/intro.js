// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== تشخیص زبان از درس آیدی =====
function getLanguageFromLessonId(id) {
  if (!id) return 'english';
  const parts = id.split('-');
  return parts[0] || 'english';
}

const currentLang = getLanguageFromLessonId(lessonId);

// ===== دیتابیس همه درس‌ها (انگلیسی) =====
const allLessons = {
  "en-lesson1": {
    title: "درس ۱: مردم",
    nextPage: "/english/lessons/lesson1.html",
    words: [
      { en: "man", fa: "مرد", image: "/media/people/man.png" },
      { en: "woman", fa: "زن", image: "/media/people/woman.png" },
      { en: "boy", fa: "پسر", image: "/media/people/boy.png" },
      { en: "girl", fa: "دختر", image: "/media/people/girl.png" },
      { en: "baby", fa: "نوزاد", image: "/media/people/baby.png" }
    ]
  },
  "en-lesson2": {
    title: "درس ۲: اعضای بدن",
    nextPage: "/english/lessons/lesson2.html",
    words: [
      { en: "head", fa: "سر", image: "/media/body/head.png" },
      { en: "hand", fa: "دست", image: "/media/body/hand.png" },
      { en: "eye", fa: "چشم", image: "/media/body/eye.png" },
      { en: "foot", fa: "پا", image: "/media/body/foot.png" },
      { en: "nose", fa: "بینی", image: "/media/body/nose.png" }
    ]
  },
  "en-lesson3": {
    title: "درس ۳: خانه",
    nextPage: "/english/lessons/lesson3.html",
    words: [
      { en: "house", fa: "خانه", image: "/media/house/house.png" },
      { en: "room", fa: "اتاق", image: "/media/house/room.png" },
      { en: "door", fa: "در", image: "/media/house/door.png" },
      { en: "window", fa: "پنجره", image: "/media/house/window.png" },
      { en: "kitchen", fa: "آشپزخانه", image: "/media/house/kitchen.png" }
    ]
  },
  "en-lesson4": {
    title: "درس ۴: لباس",
    nextPage: "/english/lessons/lesson4.html",
    words: [
      { en: "shirt", fa: "پیراهن", image: "/media/clothes/shirt.png" },
      { en: "pants", fa: "شلوار", image: "/media/clothes/pants.png" },
      { en: "shoes", fa: "کفش", image: "/media/clothes/shoes.png" },
      { en: "hat", fa: "کلاه", image: "/media/clothes/hat.png" },
      { en: "dress", fa: "لباس", image: "/media/clothes/dress.png" }
    ]
  },
  "en-lesson5": {
    title: "درس ۵: غذا",
    nextPage: "/english/lessons/lesson5.html",
    words: [
      { en: "bread", fa: "نان", image: "/media/food/bread.png" },
      { en: "rice", fa: "برنج", image: "/media/food/rice.png" },
      { en: "meat", fa: "گوشت", image: "/media/food/meat.png" },
      { en: "egg", fa: "تخم‌مرغ", image: "/media/food/egg.png" },
      { en: "milk", fa: "شیر", image: "/media/food/milk.png" }
    ]
  },
  "en-lesson6": {
    title: "درس ۶: میوه‌ها",
    nextPage: "/english/lessons/lesson6.html",
    words: [
      { en: "apple", fa: "سیب", image: "/media/fruits/apple.png" },
      { en: "banana", fa: "موز", image: "/media/fruits/banana.png" },
      { en: "orange", fa: "پرتقال", image: "/media/fruits/orange.png" },
      { en: "grape", fa: "انگور", image: "/media/fruits/grape.png" },
      { en: "watermelon", fa: "هندوانه", image: "/media/fruits/watermelon.png" }
    ]
  },
  "en-lesson7": {
    title: "درس ۷: سبزیجات",
    nextPage: "/english/lessons/lesson7.html",
    words: [
      { en: "tomato", fa: "گوجه", image: "/media/vegetables/tomato.png" },
      { en: "potato", fa: "سیب‌زمینی", image: "/media/vegetables/potato.png" },
      { en: "carrot", fa: "هویج", image: "/media/vegetables/carrot.png" },
      { en: "onion", fa: "پیاز", image: "/media/vegetables/onion.png" },
      { en: "cucumber", fa: "خیار", image: "/media/vegetables/cucumber.png" }
    ]
  },
  "en-lesson8": {
    title: "درس ۸: حیوانات",
    nextPage: "/english/lessons/lesson8.html",
    words: [
      { en: "dog", fa: "سگ", image: "/media/animals/dog.png" },
      { en: "cat", fa: "گربه", image: "/media/animals/cat.png" },
      { en: "bird", fa: "پرنده", image: "/media/animals/bird.png" },
      { en: "fish", fa: "ماهی", image: "/media/animals/fish.png" },
      { en: "horse", fa: "اسب", image: "/media/animals/horse.png" }
    ]
  },
  "en-lesson9": {
    title: "درس ۹: طبیعت",
    nextPage: "/english/lessons/lesson9.html",
    words: [
      { en: "sun", fa: "خورشید", image: "/media/nature/sun.png" },
      { en: "moon", fa: "ماه", image: "/media/nature/moon.png" },
      { en: "star", fa: "ستاره", image: "/media/nature/star.png" },
      { en: "sky", fa: "آسمان", image: "/media/nature/sky.png" },
      { en: "rain", fa: "باران", image: "/media/nature/rain.png" }
    ]
  },
  "en-lesson10": {
    title: "درس ۱۰: آب و هوا",
    nextPage: "/english/lessons/lesson10.html",
    words: [
      { en: "hot", fa: "گرم", image: "/media/weather/hot.png" },
      { en: "cold", fa: "سرد", image: "/media/weather/cold.png" },
      { en: "sunny", fa: "آفتابی", image: "/media/weather/sunny.png" },
      { en: "cloudy", fa: "ابری", image: "/media/weather/cloudy.png" },
      { en: "wind", fa: "باد", image: "/media/weather/wind.png" }
    ]
  },
  "en-lesson11": {
    title: "درس ۱۱: رنگ‌ها",
    nextPage: "/english/lessons/lesson11.html",
    words: [
      { en: "red", fa: "قرمز", image: "/media/colors/red.png" },
      { en: "blue", fa: "آبی", image: "/media/colors/blue.png" },
      { en: "green", fa: "سبز", image: "/media/colors/green.png" },
      { en: "yellow", fa: "زرد", image: "/media/colors/yellow.png" },
      { en: "black", fa: "مشکی", image: "/media/colors/black.png" }
    ]
  },
  "en-lesson12": {
    title: "درس ۱۲: اعداد",
    nextPage: "/english/lessons/lesson12.html",
    words: [
      { en: "one", fa: "یک", image: "/media/numbers/one.png" },
      { en: "two", fa: "دو", image: "/media/numbers/two.png" },
      { en: "three", fa: "سه", image: "/media/numbers/three.png" },
      { en: "four", fa: "چهار", image: "/media/numbers/four.png" },
      { en: "five", fa: "پنج", image: "/media/numbers/five.png" }
    ]
  },
  "en-lesson13": {
    title: "درس ۱۳: زمان",
    nextPage: "/english/lessons/lesson13.html",
    words: [
      { en: "today", fa: "امروز", image: "/media/time/today.png" },
      { en: "tomorrow", fa: "فردا", image: "/media/time/tomorrow.png" },
      { en: "yesterday", fa: "دیروز", image: "/media/time/yesterday.png" },
      { en: "morning", fa: "صبح", image: "/media/time/morning.png" },
      { en: "night", fa: "شب", image: "/media/time/night.png" }
    ]
  },
  "en-lesson14": {
    title: "درس ۱۴: مشاغل",
    nextPage: "/english/lessons/lesson14.html",
    words: [
      { en: "teacher", fa: "معلم", image: "/media/jobs/teacher.png" },
      { en: "doctor", fa: "دکتر", image: "/media/jobs/doctor.png" },
      { en: "engineer", fa: "مهندس", image: "/media/jobs/engineer.png" },
      { en: "student", fa: "دانش‌آموز", image: "/media/jobs/student.png" },
      { en: "driver", fa: "راننده", image: "/media/jobs/driver.png" }
    ]
  },
  "en-lesson15": {
    title: "درس ۱۵: وسایل نقلیه",
    nextPage: "/english/lessons/lesson15.html",
    words: [
      { en: "car", fa: "ماشین", image: "/media/vehicles/car.png" },
      { en: "bus", fa: "اتوبوس", image: "/media/vehicles/bus.png" },
      { en: "train", fa: "قطار", image: "/media/vehicles/train.png" },
      { en: "airplane", fa: "هواپیما", image: "/media/vehicles/airplane.png" },
      { en: "bicycle", fa: "دوچرخه", image: "/media/vehicles/bicycle.png" }
    ]
  },
  "en-lesson16": {
    title: "درس ۱۶: مکان‌ها",
    nextPage: "/english/lessons/lesson16.html",
    words: [
      { en: "school", fa: "مدرسه", image: "/media/places/school.png" },
      { en: "hospital", fa: "بیمارستان", image: "/media/places/hospital.png" },
      { en: "store", fa: "فروشگاه", image: "/media/places/store.png" },
      { en: "park", fa: "پارک", image: "/media/places/park.png" },
      { en: "mosque", fa: "مسجد", image: "/media/places/mosque.png" }
    ]
  },
  "en-lesson17": {
    title: "درس ۱۷: احساسات",
    nextPage: "/english/lessons/lesson17.html",
    words: [
      { en: "happy", fa: "خوشحال", image: "/media/feelings/happy.png" },
      { en: "sad", fa: "ناراحت", image: "/media/feelings/sad.png" },
      { en: "angry", fa: "عصبانی", image: "/media/feelings/angry.png" },
      { en: "tired", fa: "خسته", image: "/media/feelings/tired.png" },
      { en: "hungry", fa: "گرسنه", image: "/media/feelings/hungry.png" }
    ]
  },
  "en-lesson18": {
    title: "درس ۱۸: کارهای روزمره",
    nextPage: "/english/lessons/lesson18.html",
    words: [
      { en: "eat", fa: "خوردن", image: "/media/actions/eat.png" },
      { en: "sleep", fa: "خوابیدن", image: "/media/actions/sleep.png" },
      { en: "walk", fa: "راه رفتن", image: "/media/actions/walk.png" },
      { en: "read", fa: "خواندن", image: "/media/actions/read.png" },
      { en: "write", fa: "نوشتن", image: "/media/actions/write.png" }
    ]
  },
  "en-lesson19": {
    title: "درس ۱۹: صفات",
    nextPage: "/english/lessons/lesson19.html",
    words: [
      { en: "big", fa: "بزرگ", image: "/media/adjectives/big.png" },
      { en: "small", fa: "کوچک", image: "/media/adjectives/small.png" },
      { en: "tall", fa: "بلند", image: "/media/adjectives/tall.png" },
      { en: "short", fa: "کوتاه", image: "/media/adjectives/short.png" },
      { en: "beautiful", fa: "زیبا", image: "/media/adjectives/beautiful.png" }
    ]
  },
  "en-lesson20": {
    title: "درس ۲۰: سوالات",
    nextPage: "/english/lessons/lesson20.html",
    words: [
      { en: "who", fa: "چه کسی", image: "/media/questions/who.png" },
      { en: "what", fa: "چه", image: "/media/questions/what.png" },
      { en: "where", fa: "کجا", image: "/media/questions/where.png" },
      { en: "when", fa: "کی", image: "/media/questions/when.png" },
      { en: "why", fa: "چرا", image: "/media/questions/why.png" }
    ]
  }
};

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ درس پیدا نشد!</h2>
      <p>لطفاً از صفحه اصلی وارد شوید.</p>
      <a href="/${currentLang}/index.html">بازگشت به صفحه اصلی</a>
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
      <img src="${w.image}" alt="${w.en}">
      <div class="word-en">${w.en}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.en);
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