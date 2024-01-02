var APIKey = '0dc2e4aef9c53ae1be98352041f29566';
var searchButton = document.getElementById('search-button');
var input = document.getElementById('search-input');
var queryUrlGet = '';
var today = document.getElementById('today');


function clickSearchButton(e) {
    e.preventDefault();
    // get the city name and add it to main card
    var name = input.value.trim();
    var cityName = document.getElementById('city');
    cityName.textContent = name.toUpperCase();

    // Store the city name 
    localStorage.setItem('cityName', name.toUpperCase());

    // Create a button element to display the city name stored in history
    var history = document.getElementById('history');
    var localCityName = document.createElement('button');
    localCityName.textContent = localStorage.getItem('cityName');
    localCityName.setAttribute('class', 'show')

    // Check if the city name already exists in the search history
    var historyCityNames = document.getElementsByClassName('show');
    var cityExists = false;
        for (var button of historyCityNames) {
            if (button.textContent === localCityName.textContent) {
            cityExists = true;
            break;
            }
        }

        if (!cityExists) {
            history.appendChild(localCityName);
            localCityName.addEventListener("click", getData);
        }
    // Get the forecast Data (lat, lon, weather)
    
    function getData() {
        queryUrlGet = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${APIKey}`;
        fetch(queryUrlGet).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data)
            var lat = data[0].lat;
            console.log(lat)
            var lon = data[0].lon;
            console.log(lon)
            var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
            console.log(queryUrl);
            fetch(queryUrl)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data)

                    // get the weather forecast data 
                    var weatherArrey = data.list;
                    console.log(weatherArrey);
                    // store the weather forecast data
                    var storedForecast = {
                        city: name,
                        forecast: weatherArrey
                    }
                    localStorage.setItem('storedForecast', JSON.stringify(storedForecast));
                    cityName.textContent = '';
                    
                    cityName.textContent = name.toUpperCase();

                    // add the weather icon to main card
                    var todayIcon = document.getElementById('today-icon');
                    var src = `${weatherArrey[0].weather[0].icon}.png`;
                    //console.log(src);
                    todayIcon.setAttribute('src', `./img/${src}`);

                    // get the today date
                    var todayDate = document.getElementById('today-date');
                    todayDate.textContent = dayjs(`${weatherArrey[0].dt_txt}`).format('DD.MM.YYYY');

                    // get the temperature, wind, humidity
                    var tempr = document.getElementById('tempr-today');
                    tempr.textContent = `Temp: ${Math.round(weatherArrey[0].main.temp - 273, 15)}°C`;
                    var wind = document.getElementById('wind-today');
                    wind.textContent = `Wind: ${weatherArrey[0].wind.speed} KPH`;
                    var humid = document.getElementById('humid-today');
                    humid.textContent = `Humidity: ${weatherArrey[0].main.humidity} %`
                     
                    // get forecast
                    
                    var forecastTitle = document.getElementById('forecastTitle');
                    // console.log(forecastTitle)
                    forecastTitle.textContent = '5-Day Forecast';
                    var forecastCars = document.getElementById('forecast-cars');
                    forecastCars.innerHTML = ''; // clear the existing content
                    
                    for (var i = 6; i < weatherArrey.length; i += 7) {
                        
                        var date = dayjs(`${weatherArrey[i].dt_txt}`).format('DD.MM.YYYY');
                        var srcForecast = `${weatherArrey[i].weather[0].icon}.png`;
                        var cardForecast = `
                                    <div class="cards me-5 bg-primary p-4 rounded-2" style="width: 100%;">
                                        <div class="row">
                                        <p class="date fs-5 fw-semibold text-white">${date}</p>
                                        <img class="icon" src='./img/${srcForecast}' style="width: 65px;"></img>
                                        </div>
                                        <div class="tempr text-white">Temp: ${Math.round(weatherArrey[i].main.temp - 273, 15)}°C</div>
                                        <div class="wind text-white">Wind: ${weatherArrey[i].wind.speed} KPH</div>
                                        <div class="humid text-white">Humidity: ${weatherArrey[i].main.humidity} %</div>
                                    </div>
                                    `;
                        var cardElement = document.createElement('div');
                        cardElement.innerHTML = cardForecast;
                        forecastCars.appendChild(cardElement);

                    };
                })
                    .catch(function (error) {
                        console.log(error);
                    });
           })
    };
    getData();
    
   
}

searchButton.addEventListener('click', clickSearchButton);



