const todayButton = document.getElementById("today");
const fiveDayButton = document.getElementById("five-day");

fetchWeather("Las Vegas");

async function fetchWeather(city) {
    const API_KEY = "b8004640bc56f78376ed9e623c40d56e";
    const URL = "https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial"

    try {
        //showLoading();

        const response = await fetch(URL);

        if(!response.ok) {
            if(response.status === 404) {
                throw new Error('City not found. Check your spelling');
            }
        }

        const data = await response.json();
        console.log(data)
        //displayWeather(data);


    } catch (error) {
        //showError(error.message);
        console.log(error);
    } finally {
        //hideLoading();
    }
}
