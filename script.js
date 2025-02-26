document.getElementById('fetchWeather').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value.trim();
    const weatherDisplay = document.getElementById('weatherDisplay');
    const apiKey = '2176234a978741724831421b4cc1dd20'; // Replace with your actual API key
    
    if (!city) {
        weatherDisplay.innerHTML = '<p style="color: red;">Please enter a city name.</p>';
        return;
    }
    
    weatherDisplay.innerHTML = '<p>Loading...</p>';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === 200) {
            weatherDisplay.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        } else {
            weatherDisplay.innerHTML = `<p style="color: red;">${data.message}</p>`;
        }
    } catch (error) {
        weatherDisplay.innerHTML = '<p style="color: red;">Failed to fetch weather data. Please try again later.</p>';
        console.error('Error:', error);
    }
});

// Fetch city suggestions
document.getElementById('cityInput').addEventListener('input', async () => {
    const query = document.getElementById('cityInput').value.trim();
    const apiKey = 'YOUR_API_KEY_HERE';
    const suggestionsContainer = document.getElementById('suggestions');
    
    if (query.length < 3) {
        suggestionsContainer.innerHTML = '';
        return;
    }
    
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
    
    try {
        const response = await fetch(geoUrl);
        const data = await response.json();
        
        suggestionsContainer.innerHTML = data.map(city => 
            `<p class='suggestion' data-name='${city.name}, ${city.country}'>${city.name}, ${city.country}</p>`
        ).join('');
        
        document.querySelectorAll('.suggestion').forEach(item => {
            item.addEventListener('click', (e) => {
                document.getElementById('cityInput').value = e.target.dataset.name;
                suggestionsContainer.innerHTML = '';
            });
        });
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
});
