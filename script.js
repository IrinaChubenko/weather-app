const weatherIcons = {
  "01d": "☀",
  "02d": "⛅",
  "03d": "☁",
  "04d": "☁",
  "09d": "🌧",
  "10d": "🌦",
  "11d": "⛈",
  "13d": "🌨",
  "50d": "🌫",
  "01n": "🌒",
  "02n": "☁️",
  "03n": "☁️",
  "04n": "☁",
  "09n": "🌧",
  "10n": "🌦",
  "11n": "⛈",
  "13n": "🌨",
  "50n": "🌫",
};

function getDate(timestamp) {
  let curDate = new Date(
    (timestamp + new Date().getTimezoneOffset() * 60) * 1000
  );
  let currentDay = week[curDate.getDay()];

  return (
    currentDay +
    ` ${(curDate.getHours() < 10 ? "0" : "") + curDate.getHours()}:${
      (curDate.getMinutes() < 10 ? "0" : "") + curDate.getMinutes()
    }`
  );
}

function setWeather(response) {
  console.log(response);
  let tem = Math.round(response.data.main.temp);
  let dataTemperature = document.querySelector(".main-temperature");
  dataTemperature.innerHTML = tem;

  celsiusTemperature = Math.round(response.data.main.temp);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let dayTime = document.querySelector(".dayandtime");
  dayTime.innerHTML = getDate(response.data.dt + response.data.timezone);

  let icon = document.querySelector("#icon");
  icon.innerHTML = weatherIcons[response.data.weather[0].icon];

  cButton.classList.add("selected");
  fButton.classList.remove("selected");
}

// Search
document.querySelector(".search-form").addEventListener("submit", (event) => {
  event.preventDefault();

  let input = document.querySelector(".city-input");
  let city = document.querySelector(".city-name");

  city.innerHTML = input.value;
  input.value = "";

  let apiKey = "52e9e32cb26783779ed86b1d03ee38c7";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=metric&lang=en`;

  axios.get(`${apiURL}&${apiKey}`).then(setWeather);
});

// Geolocation
document.querySelector(".geolocation").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let apiKey = "52e9e32cb26783779ed86b1d03ee38c7";
    let apiURL1 = `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${apiKey}`;
    let apiURL2 = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(`${apiURL1}&${apiKey}`).then((response) => {
      document.querySelector(".city-name").innerHTML = response.data[0].name;
    });
    axios.get(`${apiURL2}&${apiKey}`).then(setWeather);
  });
});

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//convert temperature

let temperature = document.querySelector(".main-temperature");
let fButton = document.querySelector(".farengeities");
let cButton = document.querySelector(".celsius");

function farengeit(event) {
  event.preventDefault();
  temperature.innerHTML = 66;

  fButton.classList.add("selected");
  cButton.classList.remove("selected");
}

function cels(event) {
  event.preventDefault();
  console.log(event.target);
  temperature.innerHTML = celsiusTemperature;

  cButton.classList.add("selected");
  fButton.classList.remove("selected");
}

fButton.addEventListener("click", farengeit);
cButton.addEventListener("click", cels);

function showFarengeities(event) {
  event.preventDefault();

  let temperature = document.querySelector(".main-temperature");
  let farengeitiesElement = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(farengeitiesElement);
}

let celsiusTemperature = null;

let farengeitiesBtn = document.querySelector(".farengeities");
farengeitiesBtn.addEventListener("click", showFarengeities);
