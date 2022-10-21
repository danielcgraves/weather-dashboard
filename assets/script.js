

//Variables

var currentCityName = document.getElementById("current-city-name");

//Date Variables----------------------------//

    //Today's Date

var date = new Date();

var dateFormatted = date.toLocaleDateString();

    //Tomorrow's Date

var tomorrowDate = new Date(date);
tomorrowDate.setDate(tomorrowDate.getDate() + 1)

var tomorrowDateEl = document.getElementById("tomorrow-date");

var tomorrowDateFormatted = tomorrowDate.toLocaleDateString();

    //Day 2 Date

var dayTwoDate = new Date(date);
dayTwoDate.setDate(dayTwoDate.getDate() + 2)
    
var dayTwoDateEl = document.getElementById("day-two-date");
    
var dayTwoDateFormatted = dayTwoDate.toLocaleDateString();
    
    //Day 3 Date

var dayThreeDate = new Date(date);
dayThreeDate.setDate(dayThreeDate.getDate() + 3)
    
var dayThreeDateEl = document.getElementById("day-three-date");
    
var dayThreeDateFormatted = dayThreeDate.toLocaleDateString();

    //Day 4 Date

var dayFourDate = new Date(date);
dayFourDate.setDate(dayFourDate.getDate() + 4)
    
var dayFourDateEl = document.getElementById("day-four-date");
        
var dayFourDateFormatted = dayFourDate.toLocaleDateString();

    //Day 5 Date

var dayFiveDate = new Date(date);
dayFiveDate.setDate(dayFiveDate.getDate() + 5)
    
var dayFiveDateEl = document.getElementById("day-five-date");
    
var dayFiveDateFormatted = dayFiveDate.toLocaleDateString();

    //Temperature Variables

var currentTemp = document.getElementById("current-temp");

var tomorrowTemp = document.getElementById("tomorrow-temp");

var dayTwoTemp = document.getElementById("day-two-temp");

var dayThreeTemp = document.getElementById("day-three-temp");

var dayFourTemp = document.getElementById("day-four-temp");

var dayFiveTemp = document.getElementById("day-five-temp");

    //Wind Speed Variables

var currentWindSpeed = document.getElementById
("current-wind");

var tomorrowWindSpeed = document.getElementById("tomorrow-wind");

var dayTwoWindSpeed = document.getElementById("day-two-wind");

var dayThreeWindSpeed = document.getElementById("day-three-wind");

var dayFourWindSpeed = document.getElementById("day-four-wind");

var dayFiveWindSpeed = document.getElementById("day-five-wind");

    //Humidity Variables

var currentHumidity = document.getElementById("current-humidity");

var tomorrowHumidity = document.getElementById("tomorrow-humidity");

var dayTwoHumidity = document.getElementById("day-two-humidity");

var dayThreeHumidity = document.getElementById("day-three-humidity");

var dayFourHumidity = document.getElementById("day-four-humidity");

var dayFiveHumidity = document.getElementById("day-five-humidity");

    //Other Variables

var cityInputEl = document.getElementById("city-input");

var searchButtonEl = document.getElementById("search-btn")

var city = cityInputEl.value;

var cards = document.querySelectorAll(".card");





//EventListeners which sets and gets localStorage items.

searchButtonEl.addEventListener("click", function (event) {
    event.preventDefault();

    if (!cityInputEl.value) return;

    performSearch(cityInputEl.value);

    var pastCityInput = cityInputEl.value;
    localStorage.setItem("pastCityInput", JSON.stringify(pastCityInput));
   
    function searchHistory() {
        var history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        var updatedHistory = history.concat(pastCityInput);

        if (!history) return;

        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

        for (let i = 0; i < updatedHistory.length; i++) {
        }

        var previousCity = updatedHistory.pop();
        var newButton = document.createElement("button");
        newButton.innerHTML = previousCity;
        newButton.classList.add("past-btn");
        document.getElementById("search-container").appendChild(newButton);

        //When User Clicks the newButton they get a search result
        
        newButton.addEventListener("click", function (event) {
            event.preventDefault();

            performSearch(newButton.innerHTML);
        })
    }

    searchHistory();  
})




//Main Functions


function getSearchResults(city) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e6e83f4fb26faf5d75b3667dbf50e5db&units=imperial`;

    return fetch(url).then(function (response) {
        if (!response.ok) throw new Error(response.statusText);

        return response.json();   

    })
}

function performSearch(city) {


    getSearchResults(city).then(function(data){
        console.log(data);
        var iconImg = document.getElementById("current-weather-icon");

        var tomorrowIconImg = document.getElementById("tomorrow-icon")

        var dayTwoIconImg = document.getElementById("day-two-icon");

        var dayThreeIconImg = document.getElementById("day-three-icon");

        var dayFourIconImg = document.getElementById("day-four-icon");

        var dayFiveIconImg = document.getElementById("day-five-icon");

        iconImg.src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";

        tomorrowIconImg.src = "https://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + "@2x.png";


        dayTwoIconImg.src = "https://openweathermap.org/img/wn/" + data.list[2].weather[0].icon + "@2x.png";


        dayThreeIconImg.src = "https://openweathermap.org/img/wn/" + data.list[3].weather[0].icon + "@2x.png";

 
        dayFourIconImg.src = "https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + "@2x.png";


        dayFiveIconImg.src = "https://openweathermap.org/img/wn/" + data.list[5].weather[0].icon + "@2x.png";
        
        



        currentCityName.textContent = data.city.name + " " + dateFormatted;

        cards.forEach(card => {
            card.classList.remove('hide');
        })

        

        //Today's Weather


        currentTemp.textContent = "Temp: " + data.list[0].main.temp + "F";
        currentWindSpeed.textContent = "Wind: " + data.list[0].wind.speed + "mph";
        currentHumidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";

        
        //Tomorrow's Weather

        tomorrowDateEl.textContent = tomorrowDateFormatted;
        tomorrowTemp.textContent = "Temp: " + data.list[1].main.temp + "F";
        tomorrowWindSpeed.textContent = "Wind: " + data.list[1].wind.speed + "mph";
        tomorrowHumidity.textContent = "Humidity: " + data.list[1].main.humidity + "%";


        //Day 2 Weather

        dayTwoDateEl.textContent = dayTwoDateFormatted;
        dayTwoTemp.textContent = "Temp: " + data.list[2].main.temp + "F";
        dayTwoWindSpeed.textContent = "Wind: " + data.list[2].wind.speed + "mph";
        dayTwoHumidity.textContent = "Humidity: " + data.list[2].main.humidity + "%";

        //Day 3 Weather

        dayThreeDateEl.textContent = dayThreeDateFormatted;
        dayThreeTemp.textContent = "Temp: " + data.list[3].main.temp + "F";
        dayThreeWindSpeed.textContent = "Wind: " + data.list[3].wind.speed + "mph";
        dayThreeHumidity.textContent = "Humidity: " + data.list[3].main.humidity + "%";

        //Day 4 Weather

        dayFourDateEl.textContent = dayFourDateFormatted;
        dayFourTemp.textContent = "Temp: " + data.list[4].main.temp + "F";
        dayFourWindSpeed.textContent = "Wind: " + data.list[4].wind.speed + "mph";
        dayFourHumidity.textContent = "Humidity: " + data.list[4].main.humidity + "%";

        //Day 5 Weather

        dayFiveDateEl.textContent = dayFiveDateFormatted;
        dayFiveTemp.textContent = "Temp: " + data.list[5].main.temp + "F";
        dayFiveWindSpeed.textContent = "Wind: " + data.list[5].wind.speed + "mph";
        dayFiveHumidity.textContent = "Humidity: " + data.list[5].main.humidity + "%";


    })
    
}


