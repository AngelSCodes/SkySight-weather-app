function updateWeather(response){
let currentTemperature = document.querySelector("#current-weather-temperature");
let temperature = response.data.temperature.current;
let cityValue = document.querySelector("#weather-app-city");
let condition = document.querySelector("#weather-condition");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time *1000);
let iconElement = document.querySelector("#weather-icon");



cityValue.innerHTML = response.data.city;
currentTemperature.innerHTML = Math.round(temperature);
condition.innerHTML = response.data.condition.description;
humidity.innerHTML = `${response.data.temperature.humidity}%`;
windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
timeElement.innerHTML = formatDate(date);
iconElement.innerHTML = `<img src = "${response.data.condition.icon_url}" class= "weather-icon" />`;

getForecast(response.data.city);
}

function formatDate(date){
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



function searchCity(city){
    let apiKey = "ta0fa480a5ddb93fe2fa0b479bf3b70o";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(updateWeather);
}


function displayCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
   

   searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city) {
let apiKey = "ta0fa480a5ddb93fe2fa0b479bf3b70o";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);

}

function displayForecast(response){

let forecastHtml = "";

response.data.daily.forEach(function(day, index) {
    if (index < 6) {
    forecastHtml = 
    forecastHtml +
    `
<div class="daily-weather-forecast">
<div class="forecast-day">${formatDay(day.time)}</div>
<div>
<img src="${day.condition.icon_url}" class="daily-weather-icon"/>
</div>
<div class="daily-forecast-temparature">
    <span class="weather-foreast-temparature-max">
    ${Math.round(day.temperature.maximum)}&deg;
    </span>
    <span class="weather-foreast-temparature-min">
    ${Math.round(day.temperature.maximum)}&deg;
    </span>
</div>
</div>
`;
}
});


let forecastElement = document.querySelector("#forecast");

forecastElement.innerHTML = forecastHtml;
}


let searchFormInput = document.querySelector("#search-form");
searchFormInput.addEventListener("submit", displayCity);

searchCity("Pretoria");

