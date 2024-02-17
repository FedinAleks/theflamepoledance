// меню бургер
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

  function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    const menuIcon = document.querySelector('.mobile-menu-icon img');
    menuIcon.src = mobileMenu.classList.contains('active') ? './image/iconamoon_close.png' : './image/menu_icon_mobile.png';
    menuIcon.alt = mobileMenu.classList.contains('active') ? 'Close Icon' : 'Menu Icon';
  }

  mobileMenuIcon.addEventListener('click', function() {
    toggleMobileMenu();
  });

  mobileMenuLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Закриваємо меню після натискання на будь-який пункт меню
        toggleMobileMenu();
      }
    });
  });

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      mobileMenuIcon.style.top = '0';
    } else {
      mobileMenuIcon.style.top = '10px';
    }
  });
});



// shedulе
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
  const myLatLng = { lat: 50.4219414, lng: 30.3801301 }; // Замініть це значеннями вашої локації

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
  adults: {
    1: 200,
    4: 700,
    8: 1280,
    12: 1500,
    16: 1690,
    30: 2990
  },
  children: {
    4: 660,
    8: 1180,
    12: 1380
  },
  individual: {
    solo: 700,
    duet: 850
  },
  rental: {
    from300: 300
  },
  subscriptions: {
    4: 700,
    8: 1200,
    12: 1600,
    16: 2000
  }
};

var currentCategory = 'adults';

function changeCategory(category, event) {
  currentCategory = category;
  updatePrices();
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function getWordForm(count) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'заняття';
  } else if ((count % 10 === 2 || count % 10 === 3 || count % 10 === 4) && (count % 100 < 10 || count % 100 >= 20)) {
    return 'заняття';
  } else {
    return 'занять';
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
  } else if (currentCategory === 'subscriptions') {
    for (var duration in prices.subscriptions) {
      if (prices.subscriptions.hasOwnProperty(duration)) {
        var priceSection = createPriceSection(duration + ' ' + getWordForm(duration), prices.subscriptions[duration]);
        priceBlock.appendChild(priceSection);
      }
    }
  } else {
    for (var duration in prices[currentCategory]) {
      if (prices[currentCategory].hasOwnProperty(duration)) {
        var priceSection = createPriceSection(duration + ' ' + getWordForm(duration), prices[currentCategory][duration]);
        priceBlock.appendChild(priceSection);
      }
    }
  }
}

function createPriceSection(classText, price) {
  var priceSection = document.createElement('div');
  priceSection.className = 'price_section';
  priceSection.innerHTML = '<div class="price_general">' +
    '<p class="price_text_class">' + classText + '</p>' +
    '<p class="price_text_price">' + price + 'грн</p>' +
    '<button class="black_button" onclick="openTelegramChat()" data-price="' + price + '">Замовити</button>' +
    '</div>';
  return priceSection;
}

function order(price) {
  var telegramChatUrl = 'https://t.me/theflamepoledance';
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
    
    var videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';
    player = null;
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



// directions
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


// Функція для відкриття Instagram-профілю в новому вікні

function openInstagramProfile() {
  // URL вашого Instagram-профілю
  var instagramProfileUrl = 'https://instagram.com/theflamepole/';

  // Відкриваємо Instagram-профіль в новому вікні
  window.open(instagramProfileUrl, '_blank');
}
