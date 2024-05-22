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

function displayForecast(){
    
let forecastElement = document.querySelector("#forecast");
let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
let forecastHtml = "";

days.forEach(function(day) {
    forecastHtml = 
    forecastHtml +
    `
<div class="daily-weather-forecast">
<div class="forecast-day">${day}</div>
<div class="daily-weather-icon">☁️</div>
<div class="daily-forecast-temparature">
    <span class="weather-foreast-temparature-max">25&deg;</span>
    <span class="weather-foreast-temparature-min">10&deg;</span>
</div>
</div>
`;
});
forecastElement.innerHTML = forecastHtml;
}


let searchFormInput = document.querySelector("#search-form");
searchFormInput.addEventListener("submit", displayCity);

searchCity("Pretoria");
displayForecast();