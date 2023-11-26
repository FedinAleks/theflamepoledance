function playVideo() {
  var iframe = document.getElementById('player');
  
  // Замініть 'abcdefghijk' на ваш ID відео на YouTube
  iframe.src = "https://www.youtube.com/embed/XnDz1_4h5k0?si=ociK_Wt3xIOnqRfi?autoplay=1";
}
// Змінні для ідентифікації відео на YouTube
var videoId = 'XnDz1_4h5k0?si=ociK_Wt3xIOnqRfi';
var player;

// Функція для створення та відтворення відеоплеєра
function playVideo() {
    // Ініціалізація плеєра
    if (!player) {
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady,
            },
        });
    } else {
        // Якщо плеєр вже ініціалізований, відтворіть відео
        player.playVideo();
    }
}

// Функція, яка викликається, коли відеоплеєр готовий
function onPlayerReady(event) {
    // Відтворіть відео після готовності плеєра
    event.target.playVideo();
}



// telegram checkin
function openTelegramChat() {
  var telegramUsername = "theflamepoledance";
  var telegramLink = "https://t.me/" + telegramUsername;

  // Відкрийте посилання в новому вікні або вкладці
  window.open(telegramLink, "_blank");
}

//button shedule
function scrollToSchedule() {
  var scheduleElement = document.getElementById('schedule');
  scheduleElement.scrollIntoView({ behavior: 'smooth' });
}

// Fixed Menu
document.addEventListener("DOMContentLoaded", function () {
  var menu = document.getElementById('menu');
  var menuOffsetTop = menu.offsetTop;

  function handleScroll() {
      if (window.pageYOffset >= menuOffsetTop) {
          menu.classList.add('fixed-menu');
          // Показати лого та кнопку при фіксації меню
          document.querySelector(".image_logo").style.display = "block";
          document.querySelector(".pink_button").style.display = "block";
      } else {
          menu.classList.remove('fixed-menu');
          // Сховати лого та кнопку, коли меню не фіксується
          document.querySelector(".image_logo").style.display = "none";
          document.querySelector(".pink_button").style.display = "none";
      }
  }

  window.addEventListener('scroll', handleScroll);
});


// slider trainers
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const slidesContainer = document.getElementById("slides");

let currentSlide = 0;
let canNavigateNext = true;

function showButtons() {
  prevButton.style.display = currentSlide === 0 ? "none" : "block";
  nextButton.style.display =
    currentSlide === slidesContainer.children.length - 1 ? "none" : "block";
}

function showSlide() {
  slidesContainer.style.transform = `translateX(-${currentSlide * 33.33}%)`;
}

prevButton.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    canNavigateNext = true; // Робимо можливим гортання далі після натискання "Previous"
    showSlide();
    showButtons();
  }
});

nextButton.addEventListener("click", () => {
  if (canNavigateNext && currentSlide < slidesContainer.children.length - 1) {
    currentSlide++;
    showSlide();
    showButtons();

    // Забороняємо гортання далі після досягнення останнього слайду
    if (currentSlide === slidesContainer.children.length - 1) {
      canNavigateNext = false;
    }
  }
});

// Початкове налаштування
showButtons();




var currentDescription = document.querySelector('.block3_direction:first-child');

function showDescription(descriptionId) {
   // Ховаємо поточний блок опису
  currentDescription.style.display = 'none';

  // Показуємо обраний блок опису
  var selectedDescription = document.getElementById(descriptionId + 'Description');
  if (selectedDescription) {
    selectedDescription.style.display = 'block';
    // Оновлюємо поточний блок опису
    currentDescription = selectedDescription;
  }
}