// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های روسی =====
const allLessons = {
  "ru-lesson1": {
    title: "Урок 1: Люди",
    nextPage: "lesson1.html",
    words: [
      { ru: "мужчина", fa: "مرد", image: "../../media/people/man.png" },
      { ru: "женщина", fa: "زن", image: "../../media/people/woman.png" },
      { ru: "мальчик", fa: "پسر", image: "../../media/people/boy.png" },
      { ru: "девочка", fa: "دختر", image: "../../media/people/girl.png" },
      { ru: "ребёнок", fa: "نوزاد", image: "../../media/people/baby.png" }
    ]
  },
  "ru-lesson2": {
    title: "Урок 2: Части тела",
    nextPage: "lesson2.html",
    words: [
      { ru: "голова", fa: "سر", image: "../../media/body/head.png" },
      { ru: "рука", fa: "دست", image: "../../media/body/hand.png" },
      { ru: "глаз", fa: "چشم", image: "../../media/body/eye.png" },
      { ru: "нога", fa: "پا", image: "../../media/body/foot.png" },
      { ru: "нос", fa: "بینی", image: "../../media/body/nose.png" }
    ]
  },
  "ru-lesson3": {
    title: "Урок 3: Дом",
    nextPage: "lesson3.html",
    words: [
      { ru: "дом", fa: "خانه", image: "../../media/house/house.png" },
      { ru: "комната", fa: "اتاق", image: "../../media/house/room.png" },
      { ru: "дверь", fa: "در", image: "../../media/house/door.png" },
      { ru: "окно", fa: "پنجره", image: "../../media/house/window.png" },
      { ru: "кухня", fa: "آشپزخانه", image: "../../media/house/kitchen.png" }
    ]
  },
  "ru-lesson4": {
    title: "Урок 4: Одежда",
    nextPage: "lesson4.html",
    words: [
      { ru: "рубашка", fa: "پیراهن", image: "../../media/clothes/shirt.png" },
      { ru: "брюки", fa: "شلوار", image: "../../media/clothes/pants.png" },
      { ru: "туфли", fa: "کفش", image: "../../media/clothes/shoes.png" },
      { ru: "шляпа", fa: "کلاه", image: "../../media/clothes/hat.png" },
      { ru: "платье", fa: "لباس", image: "../../media/clothes/dress.png" }
    ]
  },
  "ru-lesson5": {
    title: "Урок 5: Еда",
    nextPage: "lesson5.html",
    words: [
      { ru: "хлеб", fa: "نان", image: "../../media/food/bread.png" },
      { ru: "рис", fa: "برنج", image: "../../media/food/rice.png" },
      { ru: "мясо", fa: "گوشت", image: "../../media/food/meat.png" },
      { ru: "яйцо", fa: "تخم‌مرغ", image: "../../media/food/egg.png" },
      { ru: "молоко", fa: "شیر", image: "../../media/food/milk.png" }
    ]
  },
  "ru-lesson6": {
    title: "Урок 6: Фрукты",
    nextPage: "lesson6.html",
    words: [
      { ru: "яблоко", fa: "سیب", image: "../../media/fruits/apple.png" },
      { ru: "банан", fa: "موز", image: "../../media/fruits/banana.png" },
      { ru: "апельсин", fa: "پرتقال", image: "../../media/fruits/orange.png" },
      { ru: "виноград", fa: "انگور", image: "../../media/fruits/grape.png" },
      { ru: "арбуз", fa: "هندوانه", image: "../../media/fruits/watermelon.png" }
    ]
  },
  "ru-lesson7": {
    title: "Урок 7: Овощи",
    nextPage: "lesson7.html",
    words: [
      { ru: "помидор", fa: "گوجه", image: "../../media/vegetables/tomato.png" },
      { ru: "картофель", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.png" },
      { ru: "морковь", fa: "هویج", image: "../../media/vegetables/carrot.png" },
      { ru: "лук", fa: "پیاز", image: "../../media/vegetables/onion.png" },
      { ru: "огурец", fa: "خیار", image: "../../media/vegetables/cucumber.png" }
    ]
  },
  "ru-lesson8": {
    title: "Урок 8: Животные",
    nextPage: "lesson8.html",
    words: [
      { ru: "собака", fa: "سگ", image: "../../media/animals/dog.png" },
      { ru: "кошка", fa: "گربه", image: "../../media/animals/cat.png" },
      { ru: "птица", fa: "پرنده", image: "../../media/animals/bird.png" },
      { ru: "рыба", fa: "ماهی", image: "../../media/animals/fish.png" },
      { ru: "лошадь", fa: "اسب", image: "../../media/animals/horse.png" }
    ]
  },
  "ru-lesson9": {
    title: "Урок 9: Природа",
    nextPage: "lesson9.html",
    words: [
      { ru: "солнце", fa: "خورشید", image: "../../media/nature/sun.png" },
      { ru: "луна", fa: "ماه", image: "../../media/nature/moon.png" },
      { ru: "звезда", fa: "ستاره", image: "../../media/nature/star.png" },
      { ru: "небо", fa: "آسمان", image: "../../media/nature/sky.png" },
      { ru: "дождь", fa: "باران", image: "../../media/nature/rain.png" }
    ]
  },
  "ru-lesson10": {
    title: "Урок 10: Погода",
    nextPage: "lesson10.html",
    words: [
      { ru: "жарко", fa: "گرم", image: "../../media/weather/hot.png" },
      { ru: "холодно", fa: "سرد", image: "../../media/weather/cold.png" },
      { ru: "солнечно", fa: "آفتابی", image: "../../media/weather/sunny.png" },
      { ru: "облачно", fa: "ابری", image: "../../media/weather/cloudy.png" },
      { ru: "ветер", fa: "باد", image: "../../media/weather/wind.png" }
    ]
  },
  "ru-lesson11": {
    title: "Урок 11: Цвета",
    nextPage: "lesson11.html",
    words: [
      { ru: "красный", fa: "قرمز", image: "../../media/colors/red.png" },
      { ru: "синий", fa: "آبی", image: "../../media/colors/blue.png" },
      { ru: "зелёный", fa: "سبز", image: "../../media/colors/green.png" },
      { ru: "жёлтый", fa: "زرد", image: "../../media/colors/yellow.png" },
      { ru: "чёрный", fa: "مشکی", image: "../../media/colors/black.png" }
    ]
  },
  "ru-lesson12": {
    title: "Урок 12: Числа",
    nextPage: "lesson12.html",
    words: [
      { ru: "один", fa: "یک", image: "../../media/numbers/one.png" },
      { ru: "два", fa: "دو", image: "../../media/numbers/two.png" },
      { ru: "три", fa: "سه", image: "../../media/numbers/three.png" },
      { ru: "четыре", fa: "چهار", image: "../../media/numbers/four.png" },
      { ru: "пять", fa: "پنج", image: "../../media/numbers/five.png" }
    ]
  },
  "ru-lesson13": {
    title: "Урок 13: Время",
    nextPage: "lesson13.html",
    words: [
      { ru: "сегодня", fa: "امروز", image: "../../media/time/today.png" },
      { ru: "завтра", fa: "فردا", image: "../../media/time/tomorrow.png" },
      { ru: "вчера", fa: "دیروز", image: "../../media/time/yesterday.png" },
      { ru: "утро", fa: "صبح", image: "../../media/time/morning.png" },
      { ru: "ночь", fa: "شب", image: "../../media/time/night.png" }
    ]
  },
  "ru-lesson14": {
    title: "Урок 14: Профессии",
    nextPage: "lesson14.html",
    words: [
      { ru: "учитель", fa: "معلم", image: "../../media/jobs/teacher.png" },
      { ru: "врач", fa: "دکتر", image: "../../media/jobs/doctor.png" },
      { ru: "инженер", fa: "مهندس", image: "../../media/jobs/engineer.png" },
      { ru: "студент", fa: "دانش‌آموز", image: "../../media/jobs/student.png" },
      { ru: "водитель", fa: "راننده", image: "../../media/jobs/driver.png" }
    ]
  },
  "ru-lesson15": {
    title: "Урок 15: Транспорт",
    nextPage: "lesson15.html",
    words: [
      { ru: "машина", fa: "ماشین", image: "../../media/vehicles/car.png" },
      { ru: "автобус", fa: "اتوبوس", image: "../../media/vehicles/bus.png" },
      { ru: "поезд", fa: "قطار", image: "../../media/vehicles/train.png" },
      { ru: "самолёт", fa: "هواپیما", image: "../../media/vehicles/airplane.png" },
      { ru: "велосипед", fa: "دوچرخه", image: "../../media/vehicles/bicycle.png" }
    ]
  },
  "ru-lesson16": {
    title: "Урок 16: Места",
    nextPage: "lesson16.html",
    words: [
      { ru: "школа", fa: "مدرسه", image: "../../media/places/school.png" },
      { ru: "больница", fa: "بیمارستان", image: "../../media/places/hospital.png" },
      { ru: "магазин", fa: "فروشگاه", image: "../../media/places/store.png" },
      { ru: "парк", fa: "پارک", image: "../../media/places/park.png" },
      { ru: "мечеть", fa: "مسجد", image: "../../media/places/mosque.png" }
    ]
  },
  "ru-lesson17": {
    title: "Урок 17: Чувства",
    nextPage: "lesson17.html",
    words: [
      { ru: "счастливый", fa: "خوشحال", image: "../../media/feelings/happy.png" },
      { ru: "грустный", fa: "ناراحت", image: "../../media/feelings/sad.png" },
      { ru: "злой", fa: "عصبانی", image: "../../media/feelings/angry.png" },
      { ru: "усталый", fa: "خسته", image: "../../media/feelings/tired.png" },
      { ru: "голодный", fa: "گرسنه", image: "../../media/feelings/hungry.png" }
    ]
  },
  "ru-lesson18": {
    title: "Урок 18: Повседневные дела",
    nextPage: "lesson18.html",
    words: [
      { ru: "есть", fa: "خوردن", image: "../../media/actions/eat.png" },
      { ru: "спать", fa: "خوابیدن", image: "../../media/actions/sleep.png" },
      { ru: "гулять", fa: "راه رفتن", image: "../../media/actions/walk.png" },
      { ru: "читать", fa: "خواندن", image: "../../media/actions/read.png" },
      { ru: "писать", fa: "نوشتن", image: "../../media/actions/write.png" }
    ]
  },
  "ru-lesson19": {
    title: "Урок 19: Прилагательные",
    nextPage: "lesson19.html",
    words: [
      { ru: "большой", fa: "بزرگ", image: "../../media/adjectives/big.png" },
      { ru: "маленький", fa: "کوچک", image: "../../media/adjectives/small.png" },
      { ru: "высокий", fa: "بلند", image: "../../media/adjectives/tall.png" },
      { ru: "низкий", fa: "کوتاه", image: "../../media/adjectives/short.png" },
      { ru: "красивый", fa: "زیبا", image: "../../media/adjectives/beautiful.png" }
    ]
  },
  "ru-lesson20": {
    title: "Урок 20: Вопросы",
    nextPage: "lesson20.html",
    words: [
      { ru: "кто", fa: "چه کسی", image: "../../media/questions/who.png" },
      { ru: "что", fa: "چه", image: "../../media/questions/what.png" },
      { ru: "где", fa: "کجا", image: "../../media/questions/where.png" },
      { ru: "когда", fa: "کی", image: "../../media/questions/when.png" },
      { ru: "почему", fa: "چرا", image: "../../media/questions/why.png" }
    ]
  }
};

// ===== تابع پخش صدا (روسی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ Урок не найден!</h2>
      <p>Пожалуйста, войдите с главной страницы.</p>
      <a href="../index.html">Вернуться на главную</a>
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
      <img src="${w.image}" alt="${w.ru}">
      <div class="word-en" style="font-size: 20px;">${w.ru}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.ru);
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