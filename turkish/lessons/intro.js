// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های ترکی =====
const allLessons = {
  "tr-lesson1": {
    title: "Ders 1: İnsanlar",
    nextPage: "lesson1.html",
    words: [
      { tr: "adam", fa: "مرد", image: "../../media/people/man.png" },
      { tr: "kadın", fa: "زن", image: "../../media/people/woman.png" },
      { tr: "oğlan", fa: "پسر", image: "../../media/people/boy.png" },
      { tr: "kız", fa: "دختر", image: "../../media/people/girl.png" },
      { tr: "bebek", fa: "نوزاد", image: "../../media/people/baby.png" }
    ]
  },
  "tr-lesson2": {
    title: "Ders 2: Vücut",
    nextPage: "lesson2.html",
    words: [
      { tr: "baş", fa: "سر", image: "../../media/body/head.png" },
      { tr: "el", fa: "دست", image: "../../media/body/hand.png" },
      { tr: "göz", fa: "چشم", image: "../../media/body/eye.png" },
      { tr: "ayak", fa: "پا", image: "../../media/body/foot.png" },
      { tr: "burun", fa: "بینی", image: "../../media/body/nose.png" }
    ]
  },
  "tr-lesson3": {
    title: "Ders 3: Ev",
    nextPage: "lesson3.html",
    words: [
      { tr: "ev", fa: "خانه", image: "../../media/house/house.png" },
      { tr: "oda", fa: "اتاق", image: "../../media/house/room.png" },
      { tr: "kapı", fa: "در", image: "../../media/house/door.png" },
      { tr: "pencere", fa: "پنجره", image: "../../media/house/window.png" },
      { tr: "mutfak", fa: "آشپزخانه", image: "../../media/house/kitchen.png" }
    ]
  },
  "tr-lesson4": {
    title: "Ders 4: Giysiler",
    nextPage: "lesson4.html",
    words: [
      { tr: "gömlek", fa: "پیراهن", image: "../../media/clothes/shirt.png" },
      { tr: "pantolon", fa: "شلوار", image: "../../media/clothes/pants.png" },
      { tr: "ayakkabı", fa: "کفش", image: "../../media/clothes/shoes.png" },
      { tr: "şapka", fa: "کلاه", image: "../../media/clothes/hat.png" },
      { tr: "elbise", fa: "لباس", image: "../../media/clothes/dress.png" }
    ]
  },
  "tr-lesson5": {
    title: "Ders 5: Yiyecekler",
    nextPage: "lesson5.html",
    words: [
      { tr: "ekmek", fa: "نان", image: "../../media/food/bread.png" },
      { tr: "pirinç", fa: "برنج", image: "../../media/food/rice.png" },
      { tr: "et", fa: "گوشت", image: "../../media/food/meat.png" },
      { tr: "yumurta", fa: "تخم‌مرغ", image: "../../media/food/egg.png" },
      { tr: "süt", fa: "شیر", image: "../../media/food/milk.png" }
    ]
  },
  "tr-lesson6": {
    title: "Ders 6: Meyveler",
    nextPage: "lesson6.html",
    words: [
      { tr: "elma", fa: "سیب", image: "../../media/fruits/apple.png" },
      { tr: "muz", fa: "موز", image: "../../media/fruits/banana.png" },
      { tr: "portakal", fa: "پرتقال", image: "../../media/fruits/orange.png" },
      { tr: "üzüm", fa: "انگور", image: "../../media/fruits/grape.png" },
      { tr: "karpuz", fa: "هندوانه", image: "../../media/fruits/watermelon.png" }
    ]
  },
  "tr-lesson7": {
    title: "Ders 7: Sebzeler",
    nextPage: "lesson7.html",
    words: [
      { tr: "domates", fa: "گوجه", image: "../../media/vegetables/tomato.png" },
      { tr: "patates", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.png" },
      { tr: "havuç", fa: "هویج", image: "../../media/vegetables/carrot.png" },
      { tr: "soğan", fa: "پیاز", image: "../../media/vegetables/onion.png" },
      { tr: "salatalık", fa: "خیار", image: "../../media/vegetables/cucumber.png" }
    ]
  },
  "tr-lesson8": {
    title: "Ders 8: Hayvanlar",
    nextPage: "lesson8.html",
    words: [
      { tr: "köpek", fa: "سگ", image: "../../media/animals/dog.png" },
      { tr: "kedi", fa: "گربه", image: "../../media/animals/cat.png" },
      { tr: "kuş", fa: "پرنده", image: "../../media/animals/bird.png" },
      { tr: "balık", fa: "ماهی", image: "../../media/animals/fish.png" },
      { tr: "at", fa: "اسب", image: "../../media/animals/horse.png" }
    ]
  },
  "tr-lesson9": {
    title: "Ders 9: Doğa",
    nextPage: "lesson9.html",
    words: [
      { tr: "güneş", fa: "خورشید", image: "../../media/nature/sun.png" },
      { tr: "ay", fa: "ماه", image: "../../media/nature/moon.png" },
      { tr: "yıldız", fa: "ستاره", image: "../../media/nature/star.png" },
      { tr: "gökyüzü", fa: "آسمان", image: "../../media/nature/sky.png" },
      { tr: "yağmur", fa: "باران", image: "../../media/nature/rain.png" }
    ]
  },
  "tr-lesson10": {
    title: "Ders 10: Hava",
    nextPage: "lesson10.html",
    words: [
      { tr: "sıcak", fa: "گرم", image: "../../media/weather/hot.png" },
      { tr: "soğuk", fa: "سرد", image: "../../media/weather/cold.png" },
      { tr: "güneşli", fa: "آفتابی", image: "../../media/weather/sunny.png" },
      { tr: "bulutlu", fa: "ابری", image: "../../media/weather/cloudy.png" },
      { tr: "rüzgâr", fa: "باد", image: "../../media/weather/wind.png" }
    ]
  },
  "tr-lesson11": {
    title: "Ders 11: Renkler",
    nextPage: "lesson11.html",
    words: [
      { tr: "kırmızı", fa: "قرمز", image: "../../media/colors/red.png" },
      { tr: "mavi", fa: "آبی", image: "../../media/colors/blue.png" },
      { tr: "yeşil", fa: "سبز", image: "../../media/colors/green.png" },
      { tr: "sarı", fa: "زرد", image: "../../media/colors/yellow.png" },
      { tr: "siyah", fa: "مشکی", image: "../../media/colors/black.png" }
    ]
  },
  "tr-lesson12": {
    title: "Ders 12: Sayılar",
    nextPage: "lesson12.html",
    words: [
      { tr: "bir", fa: "یک", image: "../../media/numbers/one.png" },
      { tr: "iki", fa: "دو", image: "../../media/numbers/two.png" },
      { tr: "üç", fa: "سه", image: "../../media/numbers/three.png" },
      { tr: "dört", fa: "چهار", image: "../../media/numbers/four.png" },
      { tr: "beş", fa: "پنج", image: "../../media/numbers/five.png" }
    ]
  },
  "tr-lesson13": {
    title: "Ders 13: Zaman",
    nextPage: "lesson13.html",
    words: [
      { tr: "bugün", fa: "امروز", image: "../../media/time/today.png" },
      { tr: "yarın", fa: "فردا", image: "../../media/time/tomorrow.png" },
      { tr: "dün", fa: "دیروز", image: "../../media/time/yesterday.png" },
      { tr: "sabah", fa: "صبح", image: "../../media/time/morning.png" },
      { tr: "gece", fa: "شب", image: "../../media/time/night.png" }
    ]
  },
  "tr-lesson14": {
    title: "Ders 14: Meslekler",
    nextPage: "lesson14.html",
    words: [
      { tr: "öğretmen", fa: "معلم", image: "../../media/jobs/teacher.png" },
      { tr: "doktor", fa: "دکتر", image: "../../media/jobs/doctor.png" },
      { tr: "mühendis", fa: "مهندس", image: "../../media/jobs/engineer.png" },
      { tr: "öğrenci", fa: "دانش‌آموز", image: "../../media/jobs/student.png" },
      { tr: "şoför", fa: "راننده", image: "../../media/jobs/driver.png" }
    ]
  },
  "tr-lesson15": {
    title: "Ders 15: Taşıtlar",
    nextPage: "lesson15.html",
    words: [
      { tr: "araba", fa: "ماشین", image: "../../media/vehicles/car.png" },
      { tr: "otobüs", fa: "اتوبوس", image: "../../media/vehicles/bus.png" },
      { tr: "tren", fa: "قطار", image: "../../media/vehicles/train.png" },
      { tr: "uçak", fa: "هواپیما", image: "../../media/vehicles/airplane.png" },
      { tr: "bisiklet", fa: "دوچرخه", image: "../../media/vehicles/bicycle.png" }
    ]
  },
  "tr-lesson16": {
    title: "Ders 16: Yerler",
    nextPage: "lesson16.html",
    words: [
      { tr: "okul", fa: "مدرسه", image: "../../media/places/school.png" },
      { tr: "hastane", fa: "بیمارستان", image: "../../media/places/hospital.png" },
      { tr: "mağaza", fa: "فروشگاه", image: "../../media/places/store.png" },
      { tr: "park", fa: "پارک", image: "../../media/places/park.png" },
      { tr: "cami", fa: "مسجد", image: "../../media/places/mosque.png" }
    ]
  },
  "tr-lesson17": {
    title: "Ders 17: Duygular",
    nextPage: "lesson17.html",
    words: [
      { tr: "mutlu", fa: "خوشحال", image: "../../media/feelings/happy.png" },
      { tr: "üzgün", fa: "ناراحت", image: "../../media/feelings/sad.png" },
      { tr: "kızgın", fa: "عصبانی", image: "../../media/feelings/angry.png" },
      { tr: "yorgun", fa: "خسته", image: "../../media/feelings/tired.png" },
      { tr: "aç", fa: "گرسنه", image: "../../media/feelings/hungry.png" }
    ]
  },
  "tr-lesson18": {
    title: "Ders 18: Günlük Aktiviteler",
    nextPage: "lesson18.html",
    words: [
      { tr: "yemek", fa: "خوردن", image: "../../media/actions/eat.png" },
      { tr: "uyumak", fa: "خوابیدن", image: "../../media/actions/sleep.png" },
      { tr: "yürümek", fa: "راه رفتن", image: "../../media/actions/walk.png" },
      { tr: "okumak", fa: "خواندن", image: "../../media/actions/read.png" },
      { tr: "yazmak", fa: "نوشتن", image: "../../media/actions/write.png" }
    ]
  },
  "tr-lesson19": {
    title: "Ders 19: Sıfatlar",
    nextPage: "lesson19.html",
    words: [
      { tr: "büyük", fa: "بزرگ", image: "../../media/adjectives/big.png" },
      { tr: "küçük", fa: "کوچک", image: "../../media/adjectives/small.png" },
      { tr: "uzun", fa: "بلند", image: "../../media/adjectives/tall.png" },
      { tr: "kısa", fa: "کوتاه", image: "../../media/adjectives/short.png" },
      { tr: "güzel", fa: "زیبا", image: "../../media/adjectives/beautiful.png" }
    ]
  },
  "tr-lesson20": {
    title: "Ders 20: Sorular",
    nextPage: "lesson20.html",
    words: [
      { tr: "kim", fa: "چه کسی", image: "../../media/questions/who.png" },
      { tr: "ne", fa: "چه", image: "../../media/questions/what.png" },
      { tr: "nerede", fa: "کجا", image: "../../media/questions/where.png" },
      { tr: "ne zaman", fa: "کی", image: "../../media/questions/when.png" },
      { tr: "neden", fa: "چرا", image: "../../media/questions/why.png" }
    ]
  }
};

// ===== تابع پخش صدا (ترکی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "tr-TR";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ Ders bulunamadı!</h2>
      <p>Lütfen ana sayfadan girin.</p>
      <a href="../index.html">Ana sayfaya dön</a>
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
      <img src="${w.image}" alt="${w.tr}">
      <div class="word-en" style="font-size: 20px;">${w.tr}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.tr);
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