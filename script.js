const apiKey = 'c70b1a9da56bcf2eec1b8886e6619048';

function getWeather() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherDataByCoordinates(lat, lon);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
}

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => alert("Error fetching weather data: " + error));
}


function fetchWeatherDataByCoordinates(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => alert("Error fetching weather data: " + error));
}


function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    if (data.cod === 200) {
        weatherInfo.innerHTML = `
        <em>
            <h2>${data.name}, ${data.sys.country}</h2>
            <h5><em>Feels like:</em></h5>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            </em>
        `;
    } else {
        weatherInfo.innerHTML = `<p>Location not found. Please try again.</p>`;
    }
}
