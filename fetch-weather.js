const input = document.getElementById('city-input');
const cityNameElement = document.getElementById('city-name');
const conditionElement = document.getElementById('condition');
const tempElement = document.getElementById('current-temp');
const highElement = document.getElementById('temp-high');
const lowElement = document.getElementById('temp-low');
const iconElement = document.getElementById('weather-icon');

async function fetchWeather(city) {
    const API_KEY = "b8004640bc56f78376ed9e623c40d56e";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`;

    try {
        const response = await fetch(URL);

        if(!response.ok) {
            if(response.status === 404)
                throw new Error("City not found, check your spelling.");
        }

        const data = await response.json();
        console.log(data);

        displayWeather(data);

    } catch (error) {
        console.log(error);
    }
}

function displayWeather(data) { // populate all fields with the data from API
    cityNameElement.textContent = data.name;
    tempElement.textContent = `${Math.round(data.main.temp)} °F`;
    highElement.textContent = Math.round(data.main.temp_max);
    lowElement.textContent = Math.round(data.main.temp_min);
    conditionElement.textContent = data.weather[0].description;
    iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    iconElement.alt = data.weather[0].description;
}

document.getElementById('get-weather').addEventListener('click', () => {
    fetchWeather(input.value.trim());
});