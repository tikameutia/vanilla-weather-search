// time and date

let now = new Date();

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

document.querySelector("#time").innerHTML = `${hour}:${minute}`;

document.querySelector("#day").innerHTML = `${day[now.getDay()]}`;

document.querySelector("#date").innerHTML = now.getDate();

document.querySelector("#month").innerHTML = `${month[now.getMonth()]}`;

//current temperature

function showTemperature(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp-today").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-desc").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

// forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "b32becf372227220ef6868c3037c0a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-3">
          <span id="day-forecast">${formatDay(forecastDay.dt)}</span>
          <br />
          <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            id="forecast-icon"
          />
          <div id="temp-forecast">
            <span id="temp-forecast-high">${Math.round(
              forecastDay.temp.max
            )}??</span>
            <span id="temp-forecast-low">${Math.round(
              forecastDay.temp.min
            )}??</span>
          </div>
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// search engine

function searchEngine(city) {
  let apiKey = "b32becf372227220ef6868c3037c0a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSumbit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  searchEngine(cityInput.value);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSumbit);

searchEngine("Amsterdam");
