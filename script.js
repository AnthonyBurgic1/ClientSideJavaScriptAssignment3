document.addEventListener("DOMContentLoaded", () => {
     const weatherResult = document.getElementById("weather-result");

    document.getElementById("getWeather").addEventListener("click", async () => {
        const city = document.getElementById("city").value.trim();
        if (!city) {
            alert("Please enter a city name.");
            return;
        }

        try {
            // Get latitude and longitude from Open-Meteo Geocoding API
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en`;
            const geoResponse = await fetch(geoUrl);
            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) {
                weatherResult.innerHTML = `<p style="color:red;">Error: City not found.</p>`;
                return;
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // Fetch weather data from Open-Meteo API
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            // Display weather data
            weatherResult.innerHTML = `
                <h3>${name}, ${country}</h3>
                <p>Temperature: ${weatherData.current_weather.temperature}°C</p>
                <p>Weather: ${weatherData.current_weather.weathercode}</p>
                <p>Wind Speed: ${weatherData.current_weather.windspeed} km/h</p>
            `;
        } catch (error) {
            weatherResult.innerHTML = `<p style="color:red;">Error fetching data.</p>`;
            console.error("Error:", error);
        }
    });
});

