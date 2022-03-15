const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86"; // API-KEY - это ключ для работы с самим API.
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1"; // Список ТОП 250 лучших фильмов по версиии КиноПоиск
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="; // API для функции поиска фильмов или сериалов в библеотеке КиноПоиск

getMovies(API_URL_POPULAR); 

async function getMovies(url) { // Получаем запрос
  const resp = await fetch(url, { // Ожидание запроса
    headers: {
      "Content-Type": "application/json", // Указываем тип
      "X-API-KEY": API_KEY, // Наш ключ
    },
  });
  const respData = await resp.json(); // Получаем json
  console.log(respData) // Выводим результат в консоль
  showMovies(respData); // Вызываем функцию с нашим ответом
}

// Функция для изменения цвета рейтинга у фильмов. Условно: если больше 7 то цвет зелёный, если меньше 7 то оранжевый, если меньше или равно 5 то цвет красный
function getClassByRate(vote) {
  if (vote >= 7) {
    return "green"; 
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  // Очищаем предыдущие фильмы
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => { // Прогоняем по циклу каждый элемент массива
    // Верстание карточек с помощью JS
    const movieEl = document.createElement("div"); // Создаём тег div 
    movieEl.classList.add("movie"); // И добавляем его к нашему уже существующему тегу div с классом movies
    movieEl.innerHTML = `
      <div class="movie__cover-inner"> 
        <img src="${movie.posterUrlPreview}"class="movie__cover"alt="${movie.nameRu}"/>
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div> 
        <div class="movie__title">${movie.nameEn}</div>
        <div class="movie__card">${movie.genres.map(
          (genre) => ` ${genre.genre}`
        )}</div>
				<div class="movie__card">${movie.countries.map(
          (country) => ` ${country.country}`
					)}</div>
        <div class="movie__card">${movie.year}</div>
				<div class="movie__card">${movie.filmLength}</div>
        ${
          movie.rating &&
          `
        <div class="movie__average movie__average--${getClassByRate(
          movie.rating
        )}">${movie.rating}</div>
        `
        }
      </div>
        `;
    moviesEl.appendChild(movieEl); 
    // Конец верстания карточек с помощью JS
  });
}

// Пишем функцию поиска
const form = document.querySelector("form");  // Получаем форму
const search = document.querySelector(".header__search"); // Получаем input 

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Убираем перезагрузку страницы

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`; // 1 - Берём саму перемнную с API поиска и 2 берём что искать
  // Обращаемся к функции с фильмами не попульрными и к функции поиска
  if (search.value) {
    getMovies(apiSearchUrl);
    console.log(search.value)

    search.value = ""; // Очищаем наш input
  }
});

