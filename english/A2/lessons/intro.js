// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های A2 (درس ۱ تا ۳۰) =====
const allLessons = {

  // ===== دسته ۱: خانواده و روابط (درس ۱-۵) =====
  "a2-lesson1": {
    title: "درس ۱: خانواده",
    nextPage: "lesson1.html",
    words: [
      { en: "uncle", fa: "عمو/دایی", image: "../../../media/a2/family/uncle.png" },
      { en: "aunt", fa: "عمه/خاله", image: "../../../media/a2/family/aunt.png" },
      { en: "cousin", fa: "پسرعمو/دخترعمو", image: "../../../media/a2/family/cousin.png" },
      { en: "nephew", fa: "برادرزاده", image: "../../../media/a2/family/nephew.png" },
      { en: "niece", fa: "خواهرزاده", image: "../../../media/a2/family/niece.png" }
    ]
  },
  "a2-lesson2": {
    title: "درس ۲: خانواده ۲",
    nextPage: "lesson2.html",
    words: [
      { en: "husband", fa: "شوهر", image: "../../../media/a2/family/husband.png" },
      { en: "wife", fa: "همسر", image: "../../../media/a2/family/wife.png" },
      { en: "parent", fa: "والدین", image: "../../../media/a2/family/parent.png" },
      { en: "grandparent", fa: "پدربزرگ/مادربزرگ", image: "../../../media/a2/family/grandparent.png" },
      { en: "grandchild", fa: "نوه", image: "../../../media/a2/family/grandchild.png" }
    ]
  },
  "a2-lesson3": {
    title: "درس ۳: روابط خانوادگی",
    nextPage: "lesson3.html",
    words: [
      { en: "relative", fa: "خویشاوند", image: "../../../media/a2/family/relative.png" },
      { en: "twin", fa: "دوقلو", image: "../../../media/a2/family/twin.png" },
      { en: "orphan", fa: "یتیم", image: "../../../media/a2/family/orphan.png" },
      { en: "widow", fa: "بیوه زن", image: "../../../media/a2/family/widow.png" },
      { en: "bride", fa: "عروس", image: "../../../media/a2/family/bride.png" }
    ]
  },
  "a2-lesson4": {
    title: "درس ۴: خانواده ناتنی",
    nextPage: "lesson4.html",
    words: [
      { en: "groom", fa: "داماد", image: "../../../media/a2/family/groom.png" },
      { en: "in-law", fa: "خویشاوند سببی", image: "../../../media/a2/family/inlaw.png" },
      { en: "stepfather", fa: "پدرخوانده", image: "../../../media/a2/family/stepfather.png" },
      { en: "stepmother", fa: "مادرخوانده", image: "../../../media/a2/family/stepmother.png" },
      { en: "stepsister", fa: "خواهر ناتنی", image: "../../../media/a2/family/stepsister.png" }
    ]
  },
  "a2-lesson5": {
    title: "درس ۵: نسب و تبار",
    nextPage: "lesson5.html",
    words: [
      { en: "ancestor", fa: "جد", image: "../../../media/a2/family/ancestor.png" },
      { en: "descendant", fa: "فرزند", image: "../../../media/a2/family/descendant.png" },
      { en: "sibling", fa: "خواهر/برادر", image: "../../../media/a2/family/sibling.png" },
      { en: "fiancé", fa: "نامزد (مرد)", image: "../../../media/a2/family/fiance.png" },
      { en: "fiancée", fa: "نامزد (زن)", image: "../../../media/a2/family/fiancee.png" }
    ]
  },

  // ===== دسته ۲: خانه و وسایل (درس ۶-۱۰) =====
  "a2-lesson6": {
    title: "درس ۶: وسایل خانه",
    nextPage: "lesson6.html",
    words: [
      { en: "sofa", fa: "مبل", image: "../../../media/a2/house/sofa.png" },
      { en: "fridge", fa: "یخچال", image: "../../../media/a2/house/fridge.png" },
      { en: "wardrobe", fa: "کمد لباس", image: "../../../media/a2/house/wardrobe.png" },
      { en: "mirror", fa: "آینه", image: "../../../media/a2/house/mirror.png" },
      { en: "shelf", fa: "قفسه", image: "../../../media/a2/house/shelf.png" }
    ]
  },
  "a2-lesson7": {
    title: "درس ۷: وسایل خانه ۲",
    nextPage: "lesson7.html",
    words: [
      { en: "curtain", fa: "پرده", image: "../../../media/a2/house/curtain.png" },
      { en: "carpet", fa: "فرش", image: "../../../media/a2/house/carpet.png" },
      { en: "pillow", fa: "بالش", image: "../../../media/a2/house/pillow.png" },
      { en: "blanket", fa: "پتو", image: "../../../media/a2/house/blanket.png" },
      { en: "lamp", fa: "چراغ", image: "../../../media/a2/house/lamp.png" }
    ]
  },
  "a2-lesson8": {
    title: "درس ۸: قسمت‌های خانه",
    nextPage: "lesson8.html",
    words: [
      { en: "balcony", fa: "بالکن", image: "../../../media/a2/house/balcony.png" },
      { en: "garage", fa: "گاراژ", image: "../../../media/a2/house/garage.png" },
      { en: "basement", fa: "زیرزمین", image: "../../../media/a2/house/basement.png" },
      { en: "attic", fa: "اتاق زیرشیروانی", image: "../../../media/a2/house/attic.png" },
      { en: "yard", fa: "حیاط", image: "../../../media/a2/house/yard.png" }
    ]
  },
  "a2-lesson9": {
    title: "درس ۹: وسایل آشپزخانه",
    nextPage: "lesson9.html",
    words: [
      { en: "kettle", fa: "کتری", image: "../../../media/a2/house/kettle.png" },
      { en: "toaster", fa: "توستر", image: "../../../media/a2/house/toaster.png" },
      { en: "blender", fa: "مخلوط‌کن", image: "../../../media/a2/house/blender.png" },
      { en: "microwave", fa: "مایکروویو", image: "../../../media/a2/house/microwave.png" },
      { en: "dishwasher", fa: "ماشین ظرفشویی", image: "../../../media/a2/house/dishwasher.png" }
    ]
  },
  "a2-lesson10": {
    title: "درس ۱۰: وسایل برقی",
    nextPage: "lesson10.html",
    words: [
      { en: "heater", fa: "بخاری", image: "../../../media/a2/house/heater.png" },
      { en: "fan", fa: "پنکه", image: "../../../media/a2/house/fan.png" },
      { en: "iron", fa: "اتو", image: "../../../media/a2/house/iron.png" },
      { en: "vacuum", fa: "جاروبرقی", image: "../../../media/a2/house/vacuum.png" },
      { en: "broom", fa: "جارو", image: "../../../media/a2/house/broom.png" }
    ]
  },

  // ===== دسته ۳: شهر و مکان‌ها (درس ۱۱-۱۵) =====
  "a2-lesson11": {
    title: "درس ۱۱: مکان‌های شهر",
    nextPage: "lesson11.html",
    words: [
      { en: "bank", fa: "بانک", image: "../../../media/a2/city/bank.png" },
      { en: "library", fa: "کتابخانه", image: "../../../media/a2/city/library.png" },
      { en: "cinema", fa: "سینما", image: "../../../media/a2/city/cinema.png" },
      { en: "museum", fa: "موزه", image: "../../../media/a2/city/museum.png" },
      { en: "restaurant", fa: "رستوران", image: "../../../media/a2/city/restaurant.png" }
    ]
  },
  "a2-lesson12": {
    title: "درس ۱۲: مکان‌های شهری ۲",
    nextPage: "lesson12.html",
    words: [
      { en: "hotel", fa: "هتل", image: "../../../media/a2/city/hotel.png" },
      { en: "café", fa: "کافه", image: "../../../media/a2/city/cafe.png" },
      { en: "bakery", fa: "نانوایی", image: "../../../media/a2/city/bakery.png" },
      { en: "pharmacy", fa: "داروخانه", image: "../../../media/a2/city/pharmacy.png" },
      { en: "butchery", fa: "قصابی", image: "../../../media/a2/city/butchery.png" }
    ]
  },
  "a2-lesson13": {
    title: "درس ۱۳: بناها و سازه‌ها",
    nextPage: "lesson13.html",
    words: [
      { en: "bridge", fa: "پل", image: "../../../media/a2/city/bridge.png" },
      { en: "square", fa: "میدان", image: "../../../media/a2/city/square.png" },
      { en: "fountain", fa: "آبنما", image: "../../../media/a2/city/fountain.png" },
      { en: "tower", fa: "برج", image: "../../../media/a2/city/tower.png" },
      { en: "castle", fa: "قلعه", image: "../../../media/a2/city/castle.png" }
    ]
  },
  "a2-lesson14": {
    title: "درس ۱۴: مکان‌های مذهبی",
    nextPage: "lesson14.html",
    words: [
      { en: "temple", fa: "معبد", image: "../../../media/a2/city/temple.png" },
      { en: "church", fa: "کلیسا", image: "../../../media/a2/city/church.png" },
      { en: "synagogue", fa: "کنیسه", image: "../../../media/a2/city/synagogue.png" },
      { en: "mosque", fa: "مسجد", image: "../../../media/a2/city/mosque.png" },
      { en: "shrine", fa: "زیارتگاه", image: "../../../media/a2/city/shrine.png" }
    ]
  },
  "a2-lesson15": {
    title: "درس ۱۵: مکان‌های اداری",
    nextPage: "lesson15.html",
    words: [
      { en: "embassy", fa: "سفارت", image: "../../../media/a2/city/embassy.png" },
      { en: "court", fa: "دادگاه", image: "../../../media/a2/city/court.png" },
      { en: "jail", fa: "زندان", image: "../../../media/a2/city/jail.png" },
      { en: "factory", fa: "کارخانه", image: "../../../media/a2/city/factory.png" },
      { en: "warehouse", fa: "انبار", image: "../../../media/a2/city/warehouse.png" }
    ]
  },

  // ===== دسته ۴: حرفه‌ها (درس ۱۶-۲۰) =====
  "a2-lesson16": {
    title: "درس ۱۶: مشاغل ۱",
    nextPage: "lesson16.html",
    words: [
      { en: "pilot", fa: "خلبان", image: "../../../media/a2/jobs/pilot.png" },
      { en: "nurse", fa: "پرستار", image: "../../../media/a2/jobs/nurse.png" },
      { en: "lawyer", fa: "وکیل", image: "../../../media/a2/jobs/lawyer.png" },
      { en: "artist", fa: "هنرمند", image: "../../../media/a2/jobs/artist.png" },
      { en: "chef", fa: "آشپز", image: "../../../media/a2/jobs/chef.png" }
    ]
  },
  "a2-lesson17": {
    title: "درس ۱۷: مشاغل ۲",
    nextPage: "lesson17.html",
    words: [
      { en: "waiter", fa: "پیشخدمت", image: "../../../media/a2/jobs/waiter.png" },
      { en: "waitress", fa: "پیشخدمت (زن)", image: "../../../media/a2/jobs/waitress.png" },
      { en: "barber", fa: "آرایشگر", image: "../../../media/a2/jobs/barber.png" },
      { en: "tailor", fa: "خیاط", image: "../../../media/a2/jobs/tailor.png" },
      { en: "butcher", fa: "قصاب", image: "../../../media/a2/jobs/butcher.png" }
    ]
  },
  "a2-lesson18": {
    title: "درس ۱۸: مشاغل ۳",
    nextPage: "lesson18.html",
    words: [
      { en: "mechanic", fa: "مکانیک", image: "../../../media/a2/jobs/mechanic.png" },
      { en: "plumber", fa: "لوله‌کش", image: "../../../media/a2/jobs/plumber.png" },
      { en: "electrician", fa: "برق‌کار", image: "../../../media/a2/jobs/electrician.png" },
      { en: "carpenter", fa: "نجار", image: "../../../media/a2/jobs/carpenter.png" },
      { en: "mason", fa: "بنّا", image: "../../../media/a2/jobs/mason.png" }
    ]
  },
  "a2-lesson19": {
    title: "درس ۱۹: مشاغل ۴",
    nextPage: "lesson19.html",
    words: [
      { en: "scientist", fa: "دانشمند", image: "../../../media/a2/jobs/scientist.png" },
      { en: "professor", fa: "استاد", image: "../../../media/a2/jobs/professor.png" },
      { en: "author", fa: "نویسنده", image: "../../../media/a2/jobs/author.png" },
      { en: "poet", fa: "شاعر", image: "../../../media/a2/jobs/poet.png" },
      { en: "musician", fa: "نوازنده", image: "../../../media/a2/jobs/musician.png" }
    ]
  },
  "a2-lesson20": {
    title: "درس ۲۰: مشاغل ۵",
    nextPage: "lesson20.html",
    words: [
      { en: "actor", fa: "بازیگر", image: "../../../media/a2/jobs/actor.png" },
      { en: "actress", fa: "بازیگر (زن)", image: "../../../media/a2/jobs/actress.png" },
      { en: "director", fa: "کارگردان", image: "../../../media/a2/jobs/director.png" },
      { en: "producer", fa: "تهیه‌کننده", image: "../../../media/a2/jobs/producer.png" },
      { en: "editor", fa: "ویراستار", image: "../../../media/a2/jobs/editor.png" }
    ]
  },

  // ===== دسته ۵: غذا و نوشیدنی (درس ۲۱-۲۵) =====
  "a2-lesson21": {
    title: "درس ۲۱: نوشیدنی‌ها",
    nextPage: "lesson21.html",
    words: [
      { en: "juice", fa: "آبمیوه", image: "../../../media/a2/food/juice.png" },
      { en: "coffee", fa: "قهوه", image: "../../../media/a2/food/coffee.png" },
      { en: "tea", fa: "چای", image: "../../../media/a2/food/tea.png" },
      { en: "soup", fa: "سوپ", image: "../../../media/a2/food/soup.png" },
      { en: "cake", fa: "کیک", image: "../../../media/a2/food/cake.png" }
    ]
  },
  "a2-lesson22": {
    title: "درس ۲۲: غذاهای رایج",
    nextPage: "lesson22.html",
    words: [
      { en: "pizza", fa: "پیتزا", image: "../../../media/a2/food/pizza.png" },
      { en: "pasta", fa: "پاستا", image: "../../../media/a2/food/pasta.png" },
      { en: "salad", fa: "سالاد", image: "../../../media/a2/food/salad.png" },
      { en: "sandwich", fa: "ساندویچ", image: "../../../media/a2/food/sandwich.png" },
      { en: "burger", fa: "برگر", image: "../../../media/a2/food/burger.png" }
    ]
  },
  "a2-lesson23": {
    title: "درس ۲۳: غذاهای دریایی",
    nextPage: "lesson23.html",
    words: [
      { en: "steak", fa: "استیک", image: "../../../media/a2/food/steak.png" },
      { en: "shrimp", fa: "میگو", image: "../../../media/a2/food/shrimp.png" },
      { en: "lobster", fa: "خرچنگ", image: "../../../media/a2/food/lobster.png" },
      { en: "oyster", fa: "صدف", image: "../../../media/a2/food/oyster.png" },
      { en: "crab", fa: "خرچنگ دریایی", image: "../../../media/a2/food/crab.png" }
    ]
  },
  "a2-lesson24": {
    title: "درس ۲۴: لبنیات",
    nextPage: "lesson24.html",
    words: [
      { en: "butter", fa: "کره", image: "../../../media/a2/food/butter.png" },
      { en: "cheese", fa: "پنیر", image: "../../../media/a2/food/cheese.png" },
      { en: "cream", fa: "خامه", image: "../../../media/a2/food/cream.png" },
      { en: "yogurt", fa: "ماست", image: "../../../media/a2/food/yogurt.png" },
      { en: "ice cream", fa: "بستنی", image: "../../../media/a2/food/icecream.png" }
    ]
  },
  "a2-lesson25": {
    title: "درس ۲۵: صبحانه",
    nextPage: "lesson25.html",
    words: [
      { en: "toast", fa: "نان تست", image: "../../../media/a2/food/toast.png" },
      { en: "cereal", fa: "غلات صبحانه", image: "../../../media/a2/food/cereal.png" },
      { en: "oatmeal", fa: "بلغور جو", image: "../../../media/a2/food/oatmeal.png" },
      { en: "jam", fa: "مربا", image: "../../../media/a2/food/jam.png" },
      { en: "honey", fa: "عسل", image: "../../../media/a2/food/honey.png" }
    ]
  },

  // ===== دسته ۶: پوشاک و اکسسوری (درس ۲۶-۳۰) =====
  "a2-lesson26": {
    title: "درس ۲۶: اکسسوری‌ها",
    nextPage: "lesson26.html",
    words: [
      { en: "belt", fa: "کمربند", image: "../../../media/a2/clothes/belt.png" },
      { en: "scarf", fa: "شال", image: "../../../media/a2/clothes/scarf.png" },
      { en: "gloves", fa: "دستکش", image: "../../../media/a2/clothes/gloves.png" },
      { en: "watch", fa: "ساعت مچی", image: "../../../media/a2/clothes/watch.png" },
      { en: "necklace", fa: "گردنبند", image: "../../../media/a2/clothes/necklace.png" }
    ]
  },
  "a2-lesson27": {
    title: "درس ۲۷: جواهرات",
    nextPage: "lesson27.html",
    words: [
      { en: "bracelet", fa: "دستبند", image: "../../../media/a2/clothes/bracelet.png" },
      { en: "earring", fa: "گوشواره", image: "../../../media/a2/clothes/earring.png" },
      { en: "ring", fa: "حلقه", image: "../../../media/a2/clothes/ring.png" },
      { en: "chain", fa: "زنجیر", image: "../../../media/a2/clothes/chain.png" },
      { en: "crown", fa: "تاج", image: "../../../media/a2/clothes/crown.png" }
    ]
  },
  "a2-lesson28": {
    title: "درس ۲۸: لباس‌های گرم",
    nextPage: "lesson28.html",
    words: [
      { en: "jeans", fa: "شلوار جین", image: "../../../media/a2/clothes/jeans.png" },
      { en: "jacket", fa: "ژاکت", image: "../../../media/a2/clothes/jacket.png" },
      { en: "coat", fa: "کت", image: "../../../media/a2/clothes/coat.png" },
      { en: "vest", fa: "جلیقه", image: "../../../media/a2/clothes/vest.png" },
      { en: "sweater", fa: "پلیور", image: "../../../media/a2/clothes/sweater.png" }
    ]
  },
  "a2-lesson29": {
    title: "درس ۲۹: لباس‌های تابستانی",
    nextPage: "lesson29.html",
    words: [
      { en: "shorts", fa: "شورت", image: "../../../media/a2/clothes/shorts.png" },
      { en: "skirt", fa: "دامن", image: "../../../media/a2/clothes/skirt.png" },
      { en: "socks", fa: "جوراب", image: "../../../media/a2/clothes/socks.png" },
      { en: "underwear", fa: "لباس زیر", image: "../../../media/a2/clothes/underwear.png" },
      { en: "pajama", fa: "پیژامه", image: "../../../media/a2/clothes/pajama.png" }
    ]
  },
  "a2-lesson30": {
    title: "درس ۳۰: وسایل شخصی",
    nextPage: "lesson30.html",
    words: [
      { en: "umbrella", fa: "چتر", image: "../../../media/a2/clothes/umbrella.png" },
      { en: "bag", fa: "کیف", image: "../../../media/a2/clothes/bag.png" },
      { en: "backpack", fa: "کوله پشتی", image: "../../../media/a2/clothes/backpack.png" },
      { en: "wallet", fa: "کیف پول", image: "../../../media/a2/clothes/wallet.png" },
      { en: "purse", fa: "کیف دستی", image: "../../../media/a2/clothes/purse.png" }
    ]
  },
// ===== دسته ۷: حمل و نقل (درس ۳۱-۳۵) =====

  "a2-lesson31": {
    title: "درس ۳۱: وسایل نقلیه ۱",
    nextPage: "lesson31.html",
    words: [
      { en: "taxi", fa: "تاکسی", image: "../../../media/a2/vehicles/taxi.png" },
      { en: "boat", fa: "قایق", image: "../../../media/a2/vehicles/boat.png" },
      { en: "motorcycle", fa: "موتورسیکلت", image: "../../../media/a2/vehicles/motorcycle.png" },
      { en: "helicopter", fa: "بالگرد", image: "../../../media/a2/vehicles/helicopter.png" },
      { en: "truck", fa: "کامیون", image: "../../../media/a2/vehicles/truck.png" }
    ]
  },
  "a2-lesson32": {
    title: "درس ۳۲: وسایل نقلیه ۲",
    nextPage: "lesson32.html",
    words: [
      { en: "van", fa: "ون", image: "../../../media/a2/vehicles/van.png" },
      { en: "jeep", fa: "جیپ", image: "../../../media/a2/vehicles/jeep.png" },
      { en: "limousine", fa: "لیموزین", image: "../../../media/a2/vehicles/limousine.png" },
      { en: "ambulance", fa: "آمبولانس", image: "../../../media/a2/vehicles/ambulance.png" },
      { en: "fire truck", fa: "آتش‌نشانی", image: "../../../media/a2/vehicles/firetruck.png" }
    ]
  },
  "a2-lesson33": {
    title: "درس ۳۳: وسایل نقلیه دریایی",
    nextPage: "lesson33.html",
    words: [
      { en: "submarine", fa: "زیردریایی", image: "../../../media/a2/vehicles/submarine.png" },
      { en: "ferry", fa: "کشتی", image: "../../../media/a2/vehicles/ferry.png" },
      { en: "yacht", fa: "قایق تفریحی", image: "../../../media/a2/vehicles/yacht.png" },
      { en: "canoe", fa: "کانو", image: "../../../media/a2/vehicles/canoe.png" },
      { en: "raft", fa: "قایق بادی", image: "../../../media/a2/vehicles/raft.png" }
    ]
  },
  "a2-lesson34": {
    title: "درس ۳۴: وسایل نقلیه مدرن",
    nextPage: "lesson34.html",
    words: [
      { en: "scooter", fa: "اسکوتر", image: "../../../media/a2/vehicles/scooter.png" },
      { en: "skateboard", fa: "اسکیت‌برد", image: "../../../media/a2/vehicles/skateboard.png" },
      { en: "rollerblade", fa: "اسکیت خطی", image: "../../../media/a2/vehicles/rollerblade.png" },
      { en: "hoverboard", fa: "هووربرد", image: "../../../media/a2/vehicles/hoverboard.png" },
      { en: "unicycle", fa: "دوچرخه یک چرخ", image: "../../../media/a2/vehicles/unicycle.png" }
    ]
  },
  "a2-lesson35": {
    title: "درس ۳۵: وسایل نقلیه سنتی",
    nextPage: "lesson35.html",
    words: [
      { en: "carriage", fa: "درشکه", image: "../../../media/a2/vehicles/carriage.png" },
      { en: "wagon", fa: "واگن", image: "../../../media/a2/vehicles/wagon.png" },
      { en: "sleigh", fa: "سورتمه", image: "../../../media/a2/vehicles/sleigh.png" },
      { en: "rickshaw", fa: "ریکشا", image: "../../../media/a2/vehicles/rickshaw.png" },
      { en: "tram", fa: "تراموا", image: "../../../media/a2/vehicles/tram.png" }
    ]
  },

  // ===== دسته ۸: طبیعت و آب و هوا (درس ۳۶-۴۰) =====
  "a2-lesson36": {
    title: "درس ۳۶: طبیعت",
    nextPage: "lesson36.html",
    words: [
      { en: "river", fa: "رودخانه", image: "../../../media/a2/nature/river.png" },
      { en: "forest", fa: "جنگل", image: "../../../media/a2/nature/forest.png" },
      { en: "desert", fa: "بیابان", image: "../../../media/a2/nature/desert.png" },
      { en: "island", fa: "جزیره", image: "../../../media/a2/nature/island.png" },
      { en: "storm", fa: "طوفان", image: "../../../media/a2/nature/storm.png" }
    ]
  },
  "a2-lesson37": {
    title: "درس ۳۷: پدیده‌های طبیعی",
    nextPage: "lesson37.html",
    words: [
      { en: "waterfall", fa: "آبشار", image: "../../../media/a2/nature/waterfall.png" },
      { en: "volcano", fa: "آتشفشان", image: "../../../media/a2/nature/volcano.png" },
      { en: "glacier", fa: "یخچال طبیعی", image: "../../../media/a2/nature/glacier.png" },
      { en: "canyon", fa: "دره", image: "../../../media/a2/nature/canyon.png" },
      { en: "cave", fa: "غار", image: "../../../media/a2/nature/cave.png" }
    ]
  },
  "a2-lesson38": {
    title: "درس ۳۸: ساحل و دریا",
    nextPage: "lesson38.html",
    words: [
      { en: "beach", fa: "ساحل", image: "../../../media/a2/nature/beach.png" },
      { en: "coast", fa: "خط ساحلی", image: "../../../media/a2/nature/coast.png" },
      { en: "wave", fa: "موج", image: "../../../media/a2/nature/wave.png" },
      { en: "tide", fa: "جزر و مد", image: "../../../media/a2/nature/tide.png" },
      { en: "cliff", fa: "صخره", image: "../../../media/a2/nature/cliff.png" }
    ]
  },
  "a2-lesson39": {
    title: "درس ۳۹: آب و هوا",
    nextPage: "lesson39.html",
    words: [
      { en: "fog", fa: "مه", image: "../../../media/a2/nature/fog.png" },
      { en: "hail", fa: "تگرگ", image: "../../../media/a2/nature/hail.png" },
      { en: "snowflake", fa: "دانه برف", image: "../../../media/a2/nature/snowflake.png" },
      { en: "lightning", fa: "صاعقه", image: "../../../media/a2/nature/lightning.png" },
      { en: "thunder", fa: "رعد", image: "../../../media/a2/nature/thunder.png" }
    ]
  },
  "a2-lesson40": {
    title: "درس ۴۰: پدیده‌های جوی",
    nextPage: "lesson40.html",
    words: [
      { en: "rainbow", fa: "رنگین‌کمان", image: "../../../media/a2/nature/rainbow.png" },
      { en: "breeze", fa: "نسیم", image: "../../../media/a2/nature/breeze.png" },
      { en: "flood", fa: "سیل", image: "../../../media/a2/nature/flood.png" },
      { en: "drought", fa: "خشکسالی", image: "../../../media/a2/nature/drought.png" },
      { en: "earthquake", fa: "زلزله", image: "../../../media/a2/nature/earthquake.png" }
    ]
  },  // ===== دسته ۹: سلامتی و بدن (درس ۴۱-۴۵) =====
  "a2-lesson41": {
    title: "درس ۴۱: بدن انسان",
    nextPage: "lesson41.html",
    words: [
      { en: "heart", fa: "قلب", image: "../../../media/a2/health/heart.png" },
      { en: "bone", fa: "استخوان", image: "../../../media/a2/health/bone.png" },
      { en: "muscle", fa: "عضله", image: "../../../media/a2/health/muscle.png" },
      { en: "skin", fa: "پوست", image: "../../../media/a2/health/skin.png" },
      { en: "blood", fa: "خون", image: "../../../media/a2/health/blood.png" }
    ]
  },
  "a2-lesson42": {
    title: "درس ۴۲: سیستم بدن",
    nextPage: "lesson42.html",
    words: [
      { en: "brain", fa: "مغز", image: "../../../media/a2/health/brain.png" },
      { en: "nerve", fa: "عصب", image: "../../../media/a2/health/nerve.png" },
      { en: "vein", fa: "ورید", image: "../../../media/a2/health/vein.png" },
      { en: "artery", fa: "سرخرگ", image: "../../../media/a2/health/artery.png" },
      { en: "joint", fa: "مفصل", image: "../../../media/a2/health/joint.png" }
    ]
  },
  "a2-lesson43": {
    title: "درس ۴۳: بیماری‌ها",
    nextPage: "lesson43.html",
    words: [
      { en: "cough", fa: "سرفه", image: "../../../media/a2/health/cough.png" },
      { en: "fever", fa: "تب", image: "../../../media/a2/health/fever.png" },
      { en: "aspirin", fa: "آسپرین", image: "../../../media/a2/health/aspirin.png" },
      { en: "medicine", fa: "دارو", image: "../../../media/a2/health/medicine.png" },
      { en: "injection", fa: "آمپول", image: "../../../media/a2/health/injection.png" }
    ]
  },
  "a2-lesson44": {
    title: "درس ۴۴: آسیب‌ها و درمان",
    nextPage: "lesson44.html",
    words: [
      { en: "allergy", fa: "حساسیت", image: "../../../media/a2/health/allergy.png" },
      { en: "infection", fa: "عفونت", image: "../../../media/a2/health/infection.png" },
      { en: "injury", fa: "آسیب", image: "../../../media/a2/health/injury.png" },
      { en: "wound", fa: "زخم", image: "../../../media/a2/health/wound.png" },
      { en: "scar", fa: "جای زخم", image: "../../../media/a2/health/scar.png" }
    ]
  },
  "a2-lesson45": {
    title: "درس ۴۵: درمان و بیمارستان",
    nextPage: "lesson45.html",
    words: [
      { en: "surgery", fa: "جراحی", image: "../../../media/a2/health/surgery.png" },
      { en: "stretcher", fa: "برانکارد", image: "../../../media/a2/health/stretcher.png" },
      { en: "wheelchair", fa: "صندلی چرخدار", image: "../../../media/a2/health/wheelchair.png" },
      { en: "cast", fa: "گچ", image: "../../../media/a2/health/cast.png" },
      { en: "bandage", fa: "بانداژ", image: "../../../media/a2/health/bandage.png" }
    ]
  },

  // ===== دسته ۱۰: تحصیل و مدرسه (درس ۴۶-۵۰) =====
  "a2-lesson46": {
    title: "درس ۴۶: وسایل مدرسه",
    nextPage: "lesson46.html",
    words: [
      { en: "notebook", fa: "دفتر", image: "../../../media/a2/school/notebook.png" },
      { en: "pencil", fa: "مداد", image: "../../../media/a2/school/pencil.png" },
      { en: "ruler", fa: "خط‌کش", image: "../../../media/a2/school/ruler.png" },
      { en: "eraser", fa: "پاک‌کن", image: "../../../media/a2/school/eraser.png" },
      { en: "calculator", fa: "ماشین حساب", image: "../../../media/a2/school/calculator.png" }
    ]
  },
  "a2-lesson47": {
    title: "درس ۴۷: کتاب و مطالعه",
    nextPage: "lesson47.html",
    words: [
      { en: "dictionary", fa: "فرهنگ لغت", image: "../../../media/a2/school/dictionary.png" },
      { en: "encyclopedia", fa: "دایره‌المعارف", image: "../../../media/a2/school/encyclopedia.png" },
      { en: "atlas", fa: "اطلس", image: "../../../media/a2/school/atlas.png" },
      { en: "compass", fa: "قطب‌نما", image: "../../../media/a2/school/compass.png" },
      { en: "protractor", fa: "نقاله", image: "../../../media/a2/school/protractor.png" }
    ]
  },
  "a2-lesson48": {
    title: "درس ۴۸: دانشگاه",
    nextPage: "lesson48.html",
    words: [
      { en: "university", fa: "دانشگاه", image: "../../../media/a2/school/university.png" },
      { en: "college", fa: "کالج", image: "../../../media/a2/school/college.png" },
      { en: "campus", fa: "محوطه دانشگاه", image: "../../../media/a2/school/campus.png" },
      { en: "dormitory", fa: "خوابگاه", image: "../../../media/a2/school/dormitory.png" },
      { en: "laboratory", fa: "آزمایشگاه", image: "../../../media/a2/school/laboratory.png" }
    ]
  },
  "a2-lesson49": {
    title: "درس ۴۹: تحصیل",
    nextPage: "lesson49.html",
    words: [
      { en: "grade", fa: "نمره", image: "../../../media/a2/school/grade.png" },
      { en: "exam", fa: "امتحان", image: "../../../media/a2/school/exam.png" },
      { en: "lesson", fa: "درس", image: "../../../media/a2/school/lesson.png" },
      { en: "subject", fa: "موضوع درسی", image: "../../../media/a2/school/subject.png" },
      { en: "teacher", fa: "معلم", image: "../../../media/a2/school/teacher.png" }
    ]
  },
  "a2-lesson50": {
    title: "درس ۵۰: تحقیق و مقاله",
    nextPage: "lesson50.html",
    words: [
      { en: "essay", fa: "مقاله", image: "../../../media/a2/school/essay.png" },
      { en: "thesis", fa: "پایان‌نامه", image: "../../../media/a2/school/thesis.png" },
      { en: "report", fa: "گزارش", image: "../../../media/a2/school/report.png" },
      { en: "project", fa: "پروژه", image: "../../../media/a2/school/project.png" },
      { en: "workshop", fa: "کارگاه آموزشی", image: "../../../media/a2/school/workshop.png" }
    ]
  },

  // ===== دسته ۱۱: سفر و گردشگری (درس ۵۱-۵۵) =====
  "a2-lesson51": {
    title: "درس ۵۱: سفر",
    nextPage: "lesson51.html",
    words: [
      { en: "passport", fa: "گذرنامه", image: "../../../media/a2/travel/passport.png" },
      { en: "hotel", fa: "هتل", image: "../../../media/a2/travel/hotel.png" },
      { en: "luggage", fa: "چمدان", image: "../../../media/a2/travel/luggage.png" },
      { en: "flight", fa: "پرواز", image: "../../../media/a2/travel/flight.png" },
      { en: "map", fa: "نقشه", image: "../../../media/a2/travel/map.png" }
    ]
  },
  "a2-lesson52": {
    title: "درس ۵۲: وسایل سفر",
    nextPage: "lesson52.html",
    words: [
      { en: "backpack", fa: "کوله پشتی", image: "../../../media/a2/travel/backpack.png" },
      { en: "tent", fa: "چادر", image: "../../../media/a2/travel/tent.png" },
      { en: "compass", fa: "قطب‌نما", image: "../../../media/a2/travel/compass.png" },
      { en: "binoculars", fa: "دوربین دوچشمی", image: "../../../media/a2/travel/binoculars.png" },
      { en: "sunscreen", fa: "کرم ضدآفتاب", image: "../../../media/a2/travel/sunscreen.png" }
    ]
  },
  "a2-lesson53": {
    title: "درس ۵۳: گردشگری",
    nextPage: "lesson53.html",
    words: [
      { en: "guide", fa: "راهنما", image: "../../../media/a2/travel/guide.png" },
      { en: "tourist", fa: "گردشگر", image: "../../../media/a2/travel/tourist.png" },
      { en: "souvenir", fa: "سوغاتی", image: "../../../media/a2/travel/souvenir.png" },
      { en: "adventure", fa: "ماجراجویی", image: "../../../media/a2/travel/adventure.png" },
      { en: "journey", fa: "سفر", image: "../../../media/a2/travel/journey.png" }
    ]
  },
  "a2-lesson54": {
    title: "درس ۵۴: بندر و فرودگاه",
    nextPage: "lesson54.html",
    words: [
      { en: "harbor", fa: "بندر", image: "../../../media/a2/travel/harbor.png" },
      { en: "port", fa: "بندرگاه", image: "../../../media/a2/travel/port.png" },
      { en: "terminal", fa: "ترمینال", image: "../../../media/a2/travel/terminal.png" },
      { en: "gate", fa: "دروازه", image: "../../../media/a2/travel/gate.png" },
      { en: "crew", fa: "خدمه", image: "../../../media/a2/travel/crew.png" }
    ]
  },
  "a2-lesson55": {
    title: "درس ۵۵: مدارک سفر",
    nextPage: "lesson55.html",
    words: [
      { en: "visa", fa: "ویزا", image: "../../../media/a2/travel/visa.png" },
      { en: "currency", fa: "ارز", image: "../../../media/a2/travel/currency.png" },
      { en: "exchange", fa: "تبادل", image: "../../../media/a2/travel/exchange.png" },
      { en: "departure", fa: "حرکت", image: "../../../media/a2/travel/departure.png" },
      { en: "arrival", fa: "ورود", image: "../../../media/a2/travel/arrival.png" }
    ]
  },

  // ===== دسته ۱۲: فناوری و کامپیوتر (درس ۵۶-۶۰) =====
  "a2-lesson56": {
    title: "درس ۵۶: کامپیوتر",
    nextPage: "lesson56.html",
    words: [
      { en: "computer", fa: "کامپیوتر", image: "../../../media/a2/technology/computer.png" },
      { en: "keyboard", fa: "صفحه کلید", image: "../../../media/a2/technology/keyboard.png" },
      { en: "mouse", fa: "موشواره", image: "../../../media/a2/technology/mouse.png" },
      { en: "internet", fa: "اینترنت", image: "../../../media/a2/technology/internet.png" },
      { en: "email", fa: "ایمیل", image: "../../../media/a2/technology/email.png" }
    ]
  },
  "a2-lesson57": {
    title: "درس ۵۷: لوازم کامپیوتر",
    nextPage: "lesson57.html",
    words: [
      { en: "screen", fa: "صفحه نمایش", image: "../../../media/a2/technology/screen.png" },
      { en: "monitor", fa: "مانیتور", image: "../../../media/a2/technology/monitor.png" },
      { en: "printer", fa: "چاپگر", image: "../../../media/a2/technology/printer.png" },
      { en: "scanner", fa: "اسکنر", image: "../../../media/a2/technology/scanner.png" },
      { en: "speaker", fa: "بلندگو", image: "../../../media/a2/technology/speaker.png" }
    ]
  },
  "a2-lesson58": {
    title: "درس ۵۸: نرم‌افزار",
    nextPage: "lesson58.html",
    words: [
      { en: "software", fa: "نرم‌افزار", image: "../../../media/a2/technology/software.png" },
      { en: "hardware", fa: "سخت‌افزار", image: "../../../media/a2/technology/hardware.png" },
      { en: "update", fa: "به‌روزرسانی", image: "../../../media/a2/technology/update.png" },
      { en: "password", fa: "رمز عبور", image: "../../../media/a2/technology/password.png" },
      { en: "account", fa: "حساب کاربری", image: "../../../media/a2/technology/account.png" }
    ]
  },
  "a2-lesson59": {
    title: "درس ۵۹: اینترنت",
    nextPage: "lesson59.html",
    words: [
      { en: "download", fa: "دانلود", image: "../../../media/a2/technology/download.png" },
      { en: "upload", fa: "آپلود", image: "../../../media/a2/technology/upload.png" },
      { en: "stream", fa: "پخش زنده", image: "../../../media/a2/technology/stream.png" },
      { en: "video", fa: "ویدیو", image: "../../../media/a2/technology/video.png" },
      { en: "audio", fa: "صوت", image: "../../../media/a2/technology/audio.png" }
    ]
  },
  "a2-lesson60": {
    title: "درس ۶۰: فناوری‌های جدید",
    nextPage: "lesson60.html",
    words: [
      { en: "device", fa: "دستگاه", image: "../../../media/a2/technology/device.png" },
      { en: "gadget", fa: "ابزار", image: "../../../media/a2/technology/gadget.png" },
      { en: "robot", fa: "ربات", image: "../../../media/a2/technology/robot.png" },
      { en: "drone", fa: "پهپاد", image: "../../../media/a2/technology/drone.png" },
      { en: "smart watch", fa: "ساعت هوشمند", image: "../../../media/a2/technology/smartwatch.png" }
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
      <a href="../index.html">بازگشت به صفحه اصلی</a>
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