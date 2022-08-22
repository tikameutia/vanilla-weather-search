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

document.querySelector("#hour").innerHTML = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
document.querySelector("#minute").innerHTML = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

document.querySelector("#day").innerHTML = `${day[now.getDay()]} ${date} ${
  month[now.getMonth()]
}`;

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
}

let apiKey = "b32becf372227220ef6868c3037c0a49";
let city = "Ubud";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
