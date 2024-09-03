// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = 'c70b1a9da56bcf2eec1b8886e6619048';

// Function to get weather data based on user input or current location
function getWeather() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        // If no location is inputted, get user's current location
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

// Function to fetch weather data by city name
function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => alert("Error fetching weather data: " + error));
}

// Function to fetch weather data by coordinates (latitude and longitude)
function fetchWeatherDataByCoordinates(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => alert("Error fetching weather data: " + error));
}

// Function to display weather data on the webpage
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
            <p><strong>Wind Speed:</strong> ${data.wind.speed} km/h</p>
            </em>
        `;
    } else {
        weatherInfo.innerHTML = `<p><em style="color: red;">Location not found. Please try again.</em></p>`;
    }
}
