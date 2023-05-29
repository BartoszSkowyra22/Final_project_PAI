
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const notificationCandy = document.querySelector(".candyPermission");


const weather = {};

weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Twoja przeglądarka nieobsługuje geolokalizacji</p>";
}


function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pl&appid=${key}`;

    fetch(api)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
            showCandyPermissionNotification();
        });
}

function displayWeather(){
    iconElement.innerHTML = `<img src="./assets/img/icons/${weather.iconId}.png" alt="Weather icon">`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function showCandyPermissionNotification(){
    if(weather.temperature.value < 30){
        notificationCandy.innerHTML = `<h2 class="section-subheading candyPermission">Możesz wcinać słodycze, nie jest zbyt gorąco :-)</h2>`;
    } else {
        notificationCandy.innerHTML = `<h2 class="section-subheading candyPermission">Jest zbyt gorąco, lepiej napis się wody :-(</h2>`;
    }
}

