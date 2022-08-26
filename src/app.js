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
}

// forecast

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2">
          <span id="day-forecast">TUE</span>
          <br />
          <img
            src="https://openweathermap.org/img/wn/10d@2x.png"
            alt="partly_cloudy"
            id="forecast-icon"
          />
          <div id="temp-forecast">
            <span id="temp-forecast-high">23°</span>
            <span id="temp-forecast-low">13°</span>
          </div>
        </div>
        `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
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

searchEngine("Yogyakarta");
