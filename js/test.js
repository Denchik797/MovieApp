const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86"; // API-KEY - это ключ для работы с самим API.
const API_URL_images = "https://kinopoiskapiunofficial.tech/api/v1/staff/100";

getMovies(API_URL_images); 

async function getMovies(url) { // Получаем запрос
  const resp = await fetch(url, { // Ожидание запроса
    headers: {
      "Content-Type": "application/json", // Указываем тип
      "X-API-KEY": API_KEY, // Наш ключ
    },
  });
  const respData = await resp.json(); // Получаем json
  console.log(respData) // Выводим результат в консоль
}



