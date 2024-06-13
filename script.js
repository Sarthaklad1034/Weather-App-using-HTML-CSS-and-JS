// Global constants for API key and API url
const apiKey = "b53fc618e1257ef7087f65f6dcdf3cec";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Global constants for event listeners/input
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const intUnits = document.querySelector(".slider input");

// Asynchronous function to gather data for input city
async function checkWeather(city) {
    // Gather results from url using api key
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Input validation for city name
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".slider").style.display = "none";
    } else {
        var data = await response.json();

        // Convert from celsius to fahrenheit 
        var temp = (data.main.temp * 1.8) + 32;

        // Convert kmph to mph 
        var mph = (data.wind.speed) * 0.621371;

        // Target class names and replace inner html with data from response
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = parseInt(temp) + " &deg;F";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = mph.toFixed(1) + " MPH";

        // Update weather image based on condition
        var weatherType = data.weather[0].main;

        // Switch-case on 
        switch (weatherType) {
            case "Clouds":
                weatherIcon.src = "images/clouds.svg";
                break;
            case "Clear":
                weatherIcon.src = "images/sunny.svg";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.svg";
                break;
            case "Drizzle":
            case "Mist":
                weatherIcon.src = "images/drizzle.svg";
                break;
            case "Snow":
                weatherIcon.src = "images/snow.svg";
                break;
            default:
                weatherIcon.src = "images/sunny.svg";
        }

        // Display weather + slider elements, hide error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".slider").style.display = "flex";
        document.querySelector(".error").style.display = "none";
    }

    // International units toggle
    if (!intUnits.checked) {
        document.querySelector(".temp").innerHTML = parseInt(data.main.temp) + " &deg;C";
        document.querySelector(".wind").innerHTML = data.wind.speed.toFixed(1) + " KM/H";
    }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event listener for international units toggle button
intUnits.addEventListener("click", () => {
    checkWeather(searchBox.value);
})