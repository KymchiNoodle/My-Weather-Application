function updateWeather(response) {
  let temperatureElement = document.querySelector("#temp");
  let temp = response.data.temperature.current;
  let locationElement = document.querySelector("#location");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsLikeElement = document.querySelector("#feels-like");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  locationElement.innerHTML = response.data.city;
  conditionElement.innerHTML = `Condition: ${response.data.condition.description}`;
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  windElement.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  feelsLikeElement.innerHTML = `Feels like -  ${response.data.temperature.feels_like}°C`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" "class="weather-app-icon"/>`;
  temperatureElement.innerHTML = Math.round(temp);
  feelsLikeElement.innerHTML = Math.round(feels_like);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchLocation(location) {
  let apiKey = "5a83000tfbfa938fbo55b33e304bb87b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${location}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchLocation(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchLocation("Tortola");
