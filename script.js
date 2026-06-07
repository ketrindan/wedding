// Countdown timer
const weddingDate = new Date("2026-08-08T14:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById("timer").innerHTML =
      "<p>Свадьба уже состоялась!</p>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Скрываем scroll-hint при начале скролла
function initScrollHint() {
  const scrollHint = document.querySelector(".scroll-hint");

  if (!scrollHint) return;

  let scrollStarted = false;

  // Слушаем событие wheel (скролл мышью)
  window.addEventListener("wheel", function () {
    if (!scrollStarted) {
      scrollStarted = true;
      scrollHint.classList.add("hidden");
    }
  });

  // Слушаем события touch для мобильных
  window.addEventListener("touchstart", function () {
    if (!scrollStarted) {
      scrollStarted = true;
      scrollHint.classList.add("hidden");
    }
  });

  // Слушаем событие scroll для скроллбара
  window.addEventListener("scroll", function () {
    if (!scrollStarted) {
      scrollStarted = true;
      scrollHint.classList.add("hidden");
    }
  });
}

// Запускаем при сколе страницы
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollHint);
} else {
  initScrollHint();
}

// Анимация сердечка при доскролле до календаря
function initCalendarAnimation() {
  const weddingDayElement = document.querySelector(".wedding-day-heart");

  if (!weddingDayElement) return;

  const svg = weddingDayElement.querySelector("svg.heart-border");

  if (!svg) return;

  // Проверяем, есть ли у нас путь
  const path = svg.querySelector("path");
  if (!path) return;

  // Создаем Observer для отслеживания видимости
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Блок виден - добавляем класс для показа сердечка
          svg.classList.add("visible");

          // Прекращаем наблюдение после запуска
          observer.unobserve(entry.target);

          console.log("Сердечко появилось!");
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  observer.observe(weddingDayElement);
}

// Запускаем наблюдение после загрузки страницы
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCalendarAnimation);
} else {
  initCalendarAnimation();
}

// Smooth scroll for better UX
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
