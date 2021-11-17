function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let months = [
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
  let currentMonth = months[now.getMonth()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = `${hours}:${minutes}`;

  return `${currentDay}, ${currentMonth} ${date}, ${currentTime}`;
}
function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city-input").innerHTML = response.data.name;
  document.querySelector("#city-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#current-high-low"
  ).innerHTML = `${maxTemp}°C / ${minTemp}°C`;

  let description = response.data.weather[0].main;
  let cityWeather = document.querySelector("h4");
  cityWeather.innerHTML = description;
}
function searchCity(city) {
  let apiKey = "65b5662e22ff1bb3952c072792011a99";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city-input").value;
  searchCity(city);
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "65b5662e22ff1bb3952c072792011a99";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#city-temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#city-temperature");
  temperatureElement.innerHTML = 19;
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentPosition);

let now = new Date();
let date = now.getDate();

let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(date);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("New York");