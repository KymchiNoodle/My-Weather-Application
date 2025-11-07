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
  let background = document.querySelector("#background-container");

  locationElement.innerHTML = response.data.city;
  conditionElement.innerHTML = `Condition: ${response.data.condition.description}`;
  humidityElement.innerHTML = `🌫️Humidity: ${response.data.temperature.humidity}%`;
  windElement.innerHTML = `🍃Wind: ${response.data.wind.speed} km/h`;
  feelsLikeElement.innerHTML = `Feels like - ${response.data.temperature.feels_like}°C`;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temp);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  const condition = response.data.condition.description.toLowerCase();
  iconElement.className = "";
  if (condition.includes("rain")) iconElement.classList.add("rainy");
  else if (condition.includes("sun") || condition.includes("clear"))
    iconElement.classList.add("sunny");

  if (condition.includes("rain")) {
    background.style.background = "linear-gradient(135deg, #3b5998, #182848)";
  } else if (condition.includes("cloud")) {
    background.style.background = "linear-gradient(135deg, #5d6d7e, #aab7b8)";
  } else if (condition.includes("snow")) {
    background.style.background = "linear-gradient(135deg, #dfe9f3, #a3cbe3)";
  } else if (condition.includes("sun") || condition.includes("clear")) {
    background.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
  } else if (condition.includes("storm")) {
    background.style.background = "linear-gradient(135deg, #232526, #414345)";
  } else {
    background.style.background = "linear-gradient(135deg, #4f8ef7, #b6d9ff)";
  }
  getForecast(response.data.city);
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
  if (minutes < 10) minutes = `0${minutes}`;
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

function displayForecast(response) {
  let forecastContainer = document.querySelector("#forecast-container");
  let forecastHTML = "";
  let forecast = response.data.daily;

  forecast.slice(0, 5).forEach(function (day) {
    let date = new Date(day.time * 1000);
    let options = { weekday: "short" };
    let dayName = date.toLocaleDateString("en-US", options);

    forecastHTML += `
      <div class="forecast-day">
        <div class="forecast-date">${dayName}</div>
        <img src="${day.condition.icon_url}" alt="${day.condition.description}">
        <div class="forecast-temp">
          ${Math.round(day.temperature.maximum)}° / 
          <span>${Math.round(day.temperature.minimum)}°</span>
        </div>
      </div>`;
  });

  forecastContainer.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
