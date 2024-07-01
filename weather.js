// Function to fetch weather data from OpenWeatherMap API based on user input or geolocation
async function fetchWeather() {
    const apiKey = 'your_openweathermap_api_key';
    let location = '';

    // Check if geolocation is available
    if (navigator.geolocation) {
        try {
            const position = await getCurrentPosition();
            location = `${position.coords.latitude},${position.coords.longitude}`;
        } catch (error) {
            console.error('Error getting current position:', error);
            alert('Failed to get your current location. Please enter a location manually.');
            return;
        }
    } else {
        alert('Geolocation is not supported by this browser. Please enter a location manually.');
        return;
    }

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location}&lon=${location}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            alert(`Weather data not found for location.`);
            return;
        }

        const weatherBox = document.getElementById('weatherBox');
        const locationElement = document.getElementById('location');
        const descriptionElement = document.getElementById('description');
        const temperatureElement = document.getElementById('temperature');
        const humidityElement = document.getElementById('humidity');

        locationElement.textContent = data.name;
        descriptionElement.textContent = `Weather: ${data.weather[0].description}`;
        temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

        // Add animation class
        weatherBox.classList.add('animate');

        // Remove animation class after 1 second
        setTimeout(() => {
            weatherBox.classList.remove('animate');
        }, 1000);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

// Function to get current position using Geolocation API
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
