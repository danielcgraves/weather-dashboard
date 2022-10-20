//Pseudocode

//2. After entering a city into the searchbar, the current weather conditions for that city will come up in a main section: This will include the city's: Name, date, icon of weather conditions, temperature, humidity and wind speed.
    // Also the city name will be displayed under the searchbar and stored in localStorage
    //Another section will include a five day (future) forcast displaying all of the same information as the current temperature section.
//3. When clicking a city in the "search history" it will take me back to the page with all of the information above.

//Variables

var currentCityName = document.getElementById("current-city-name");
var date = new Date();
var dateFormatted = date.toLocaleDateString();
var currentTemp = document.getElementById("current-temp");
var currentWindSpeed = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var cityInputEl = document.getElementById("city-input");
var searchButtonEl = document.getElementById("search-btn")

var city = cityInputEl.value;




//EventListeners

searchButtonEl.addEventListener("click", function (event) {
    event.preventDefault();



    if (!cityInputEl.value) return;

    performSearch(cityInputEl.value);

})


function getSearchResults(city) {
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e6e83f4fb26faf5d75b3667dbf50e5db&units=imperial`;

    return fetch(url).then(function (response) {
        if (!response.ok) throw new Error(response.statusText);

        return response.json();   

    })
}

function performSearch(city) {
    getSearchResults(city).then(function(data){
        console.log(data);
        currentCityName.textContent = data.name + " " + dateFormatted;
        currentTemp.textContent = "Temp: " + data.main.temp + "F";
        currentWindSpeed.textContent = "Wind: " + data.wind.speed + "mph";
        currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
    })
}


 
/* function performSearch() {
    getSearchResults().then(function (data){

    })
}
 */
