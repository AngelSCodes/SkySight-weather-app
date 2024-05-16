function updateWeather(response){
let currentTemperature = document.querySelector("#current-weather-temperature");
let temperature = response.data.temperature.current;
let cityValue = document.querySelector("#weather-app-city");

cityValue.innerHTML = response.data.city;
currentTemperature.innerHTML = Math.round(temperature);
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
let searchFormInput = document.querySelector("#search-form");
searchFormInput.addEventListener("submit", displayCity);

searchCity("Pretoria");