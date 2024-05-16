function displayCity(event) {
    event.preventDefault();
    let searchCity = document.querySelector("#search-input");
    let city = document.querySelector("#weather-app-city");
   city.innerHTML = searchCity.value;
}
let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", displayCity);