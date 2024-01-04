const daysBlocks = document.querySelectorAll('.days');
let currentDayIndex = 0;

function changeSchedule(direction) {
    currentDayIndex += direction;

    if (currentDayIndex < 0) {
        currentDayIndex = daysBlocks.length - 1;
    } else if (currentDayIndex >= daysBlocks.length) {
        currentDayIndex = 0;
    }

    daysBlocks.forEach((dayBlock, index) => {
        if (index === currentDayIndex) {
            dayBlock.style.display = 'block';
        } else {
            dayBlock.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    daysBlocks.forEach((dayBlock, index) => {
        if (index !== 0) {
            dayBlock.style.display = 'none';
        }
    });

    // Визначення ширини екрану при завантаженні і зміна розкладу за потреби
    checkScreenWidth();
});

// Функція для перевірки ширини екрану і виклику зміни розкладу
function checkScreenWidth() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
        // Показати кнопки і запустити функціонал для маленького екрану
        showButtons();
    } else {
        // Показати весь розклад і сховати кнопки для великого екрану
        hideButtons();
    }
}

// Функція для відображення кнопок
function showButtons() {
    const navButtons = document.querySelector('.schedule-nav');
    if (navButtons) {
        navButtons.style.display = 'flex';
    }
}

// Функція для приховування кнопок
function hideButtons() {
    const navButtons = document.querySelector('.schedule-nav');
    if (navButtons) {
        navButtons.style.display = 'none';
    }
}

// Визначення розміру екрану при зміні його розміру і зміна розкладу за потреби
window.addEventListener('resize', () => {
    checkScreenWidth();
});

function checkScreenWidth() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 768) {
      // Показати кнопки і запустити функціонал для маленького екрану
      showButtons();
  } else if (screenWidth > 768 && screenWidth <= 900) {
      // Приховати кнопки і показати відповідний блок днів для екрану від 769px до 1024px
      hideButtons();
      showCurrentDayBlock();
  } else {
      // Показати весь розклад і сховати кнопки для великого екрану
      hideButtons();
      showAllDayBlocks();
  }
}

// Функція для показу відповідного блоку днів
function showCurrentDayBlock() {
  daysBlocks.forEach((dayBlock, index) => {
      if (index === currentDayIndex) {
          dayBlock.style.display = 'block';
      } else {
          dayBlock.style.display = 'none';
      }
  });
}

// Функція для показу всіх блоків днів
function showAllDayBlocks() {
  daysBlocks.forEach((dayBlock) => {
      dayBlock.style.display = 'block';
  });
}








// map google
function initMap() {
  const myLatLng = { lat: -25.363, lng: 131.044 }; // Замініть це значеннями вашої локації

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng,
  });

  new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "Моя локація",
  });
}
function onYouTubeIframeAPIReady() {
// Тут можна залишити порожнім
}



// Slider price

var prices = {
  adults: [200, 700, 1280, 1690, 2990],
  children: [185, 660, 1180, 1380],
  individual: {
      solo: 700,
      duet: 850
  },
  rental: {
      from300: 300
  }
};

var currentCategory = 'adults';

function changeCategory(category, event) {
  currentCategory = category;
  updatePrices();
  if (event) {
      event.preventDefault(); // Заблокує стандартну дію посилання
      event.stopPropagation(); // Зупинить випливання подій
  }
}

function updatePrices() {
  var priceBlock = document.getElementById('priceBlock');
  priceBlock.innerHTML = '';

  if (currentCategory === 'individual') {
      var soloSection = createPriceSection('Соло', prices.individual.solo);
      var duetSection = createPriceSection('Дуєт', prices.individual.duet);
      priceBlock.appendChild(soloSection);
      priceBlock.appendChild(duetSection);
  } else if (currentCategory === 'rental') {
      var rentalSection = createPriceSection('Оренда залів', prices.rental.from300);
      priceBlock.appendChild(rentalSection);
  } else {
      for (var i = 0; i < prices[currentCategory].length; i++) {
          var priceSection = createPriceSection((i + 1) + ' заняття', prices[currentCategory][i]);
          priceBlock.appendChild(priceSection);
      }
  }
}

function createPriceSection(classText, price) {
  var priceSection = document.createElement('div');
  priceSection.className = 'price_section';
  priceSection.innerHTML = '<div class="price_general">' +
      '<p class="price_text_class">' + classText + '</p>' +
      '<p class="price_text_price">' + price + 'грн</p>' +
      '<button class="black_button" onclick="order(' + price + ')">Замовити</button>' +
      '</div>';
  return priceSection;
}

function order(price) {
  // Замініть цей URL на посилання на ваш Telegram-чат
  var telegramChatUrl = 'https://t.me/theflamepoledance';
  // Відкриття Telegram-чату в новому вікні
  window.open(telegramChatUrl, '_blank');
}

updatePrices();




// iframe playvideo
var videoId = 'XnDz1_4h5k0?si=ociK_Wt3xIOnqRfi';
var player;

function playVideo() {
    openVideoPopup();

    if (!player) {
        // Ініціалізація плеєра
        player = new YT.Player('video-container', {
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

function onPlayerReady(event) {
    // Відтворіть відео після готовності плеєра
    event.target.playVideo();
}

function openVideoPopup() {
    // Відображення контейнера з відео при натисканні кнопки
    document.getElementById('video-popup').style.display = 'flex';
}

function closeVideoPopup() {
    // Приховання контейнера з відео при натисканні кнопки "Закрити"
    document.getElementById('video-popup').style.display = 'none';

    // Зупинка відео (додайте код для зупинки відео, якщо це необхідно)
    if (player) {
        player.stopVideo();
    }
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
  var spacer = document.querySelector('.spacer');
  var menuOffsetTop = menu.offsetTop;

  function handleScroll() {
      var scrollPosition = window.pageYOffset;

      if (scrollPosition >= menuOffsetTop) {
          menu.classList.add('fixed-menu');
          spacer.style.display = 'block';
          document.body.style.paddingTop = menu.clientHeight + 'px'; // Додаємо висоту фіксованого меню до paddingTop
      } else {
          menu.classList.remove('fixed-menu');
          spacer.style.display = 'none';
          document.body.style.paddingTop = '0';
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
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
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

function showDescription(descriptionId, event) {
    // Запобігаємо стандартній поведінці, яка прокручує сторінку вгору
    event.preventDefault();

    // Ховаємо поточний блок опису
    currentDescription.style.display = 'none';

    // Показуємо обраний блок опису
    var selectedDescription = document.getElementById(descriptionId + 'Description');
    if (selectedDescription) {
        selectedDescription.style.display = 'flex';  // Змінено на flex
        selectedDescription.style.alignItems = 'center'; 
        // Оновлюємо поточний блок опису
        currentDescription = selectedDescription;
    }
}

// Приклад використання на HTML-елементі
var directionLink = document.getElementById('directionLink');
directionLink.addEventListener('click', function (event) {
    showDescription('yourDescriptionId', event);
});