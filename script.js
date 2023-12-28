//var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${getLat()}&lon=${lon}&appid=${APIKey}`;
var APIKey = '0dc2e4aef9c53ae1be98352041f29566';
var searchButton = document.getElementById('search-button');
var input = document.getElementById('search-input');
var queryUrlGet = '';
var today = document.getElementById('today');

searchButton.addEventListener('click', clickSearchButton);


function clickSearchButton(e) {
    e.preventDefault();
    // get the city name and add it to main card
    var name = input.value.trim();
    var cityName = document.getElementById('city');
    cityName.textContent = name.toUpperCase();
    
    // get the lon, lat 
    queryUrlGet = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${APIKey}`
    fetch(queryUrlGet)
        .then(function (response) {
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
                    //console.log(data)

                    // get the weather forecast array 
                    var weatherArrey = data.list;
                    console.log(weatherArrey);
                    
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
                     
           
                });
   

        })
};


// localStorage.setItem(btnId, noteValue);
//             var note = document.createElement('p');
//             note.textContent = localStorage.getItem('note');
//             timeBlock[i].appendChild(note);