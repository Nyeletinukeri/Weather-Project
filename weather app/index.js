function updateWeather(data) {
  document.querySelector(".city-name").innerHTML = data.city;
  document.querySelector(".temperature").innerHTML =
    Math.round(data.temperature.current) + " °C";
  document.querySelector(".condition").innerHTML = data.condition.description;
  document.querySelector(".humidity-value").innerHTML =
    data.temperature.humidity + "%";
  document.querySelector(".wind-value").innerHTML = data.wind.speed + " Km/h";
  document.querySelector(".weather-img").src = data.condition.icon_url;

  let date = new Date(data.time * 1000);
  document.querySelector(".date").innerHTML = formatDate(date);
}

function updateForecast(data) {
  let forecastContainer = document.querySelector(".forecast-item-container");
  forecastContainer.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    let day = data.daily[i];
    let date = new Date(day.time * 1000);
    let dayName = getDayName(date);

    let forecastHTML = `
        <div class="forecast-item">
          <h5 class="day">${dayName}</h5>
          <img src="${day.condition.icon_url}" class="weather-img" />
          <h5 class="temperature">${Math.round(day.temperature.day)} °C</h5>
        </div>
      `;

    forecastContainer.innerHTML += forecastHTML;
  }
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  if (minutes < 10) minutes = "0" + minutes;
  let day = getDayName(date);
  return `${day}, ${hours}:${minutes}`;
}

function getDayName(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}

function getWeather(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let currentUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(currentUrl).then(function (response) {
    updateWeather(response.data);
  });

  axios.get(forecastUrl).then(function (response) {
    updateForecast(response.data);
  });
}

document.querySelector(".search-btn").addEventListener("click", function () {
  let city = document.querySelector(".city-input").value;
  if (city.trim() !== "") {
    getWeather(city);
  }
});

getWeather("Middelburg");
