const input = document.getElementById('city-input');
const button = document.getElementById('get-forecast');
const forecastList = document.getElementById('forecast-list');

async function fetchForecast(city) {
    const API_KEY = 'b8004640bc56f78376ed9e623c40d56e';
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`;

    try {
    const response = await fetch(URL);

    if (!response.ok) {
        if (response.status === 404) 
            throw new Error('City not found. Check spelling.');
    }

    const data = await response.json();
    displayForecast(data);

    } catch (error) {
    console.error(error);
    }
}

function displayForecast(data) {
    forecastList.innerHTML = ''; // clear any previous instances

    // instantiates constant daily, takes data as list, filters by entries with dt 12:00:00
    const daily = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    daily.slice(0,5).forEach(item => { // take only next 5 days from list using slice, for each item in list:
        const date = new Date(item.dt_txt); // creates date const
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }); // converts the date to a day name
        const temp = Math.round(item.main.temp); //creates temp const and sets it to item.temp
        const li = document.createElement('li'); //creates new list item (5 in total)
        li.textContent = `${dayName}: ${temp} °F`; // applies dayName and temp to it via textContent
        forecastList.appendChild(li); //appends it to forecastList
    });
}

document.getElementById('get-forecast').addEventListener('click', () => {
    fetchForecast(input.value.trim());
});
