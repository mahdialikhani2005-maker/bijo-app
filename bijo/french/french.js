document.addEventListener("DOMContentLoaded", () => {

  const currentFlag = document.getElementById("current-flag");
  const langMenu = document.querySelector(".lang-menu");

  if (!currentFlag || !langMenu) return;

  // زبان ذخیره شده
  let activeCourse = localStorage.getItem("course") || "fr";

  // نمایش پرچم فعلی هنگام باز شدن صفحه
  if (activeCourse === "en") {
    currentFlag.src = "../assets/en.png";
  } else {
    currentFlag.src = "../assets/fr.png";
  }

  // باز و بسته شدن منو
  currentFlag.addEventListener("click", () => {
    langMenu.classList.toggle("hidden");
  });

  // کلیک روی پرچم‌ها
  document.querySelectorAll(".lang-menu img").forEach(flag => {

    flag.addEventListener("click", () => {

      const lang = flag.dataset.lang;

      localStorage.setItem("course", lang);

      if (lang === "fr") {
        window.location.href = "index.html";
      }

      if (lang === "en") {
        window.location.href = "../english/index.html"; 
      }

    });

  });

});
document.addEventListener("DOMContentLoaded", () => {
  const levelBtn = document.getElementById("levelBtn");
  const levelMenu = document.getElementById("levelMenu");

  if (levelBtn && levelMenu) {
    levelBtn.addEventListener("click", () => {
      levelMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!levelBtn.contains(e.target) && !levelMenu.contains(e.target)) {
        levelMenu.classList.remove("show");
      }
    });
  }
});
