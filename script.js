var searchBtn = $("#searchBtn");
var currentCity = $("#currentCity");
var currentTemp = $("#currentTemp");
var currentHumid = $("#currentHumid");
var windSpeed = $("#windSpeed");
var uvIndex = $("#uvIndex");
var newCities = [];
var saveCity = JSON.parse(localStorage.getItem("savedCity"))

for(i=0; i < saveCity.length; i++){
    var newCityBtn = $("<button>");
    newCityBtn.attr("type","button");
    newCityBtn.attr("class", "btn btn-light savedBtn");
    newCityBtn.text(saveCity[i]);

    $("#btn-group").append(newCityBtn);

    
}


searchBtn.on("click", function(){
    var city = $(this).siblings("input").val();
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e38ce3347beb048675316478b3f3b0c5"
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;
        var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=e38ce3347beb048675316478b3f3b0c5&lat=" + cityLat + "&lon=" + cityLon;
        
        $.ajax({
            url: uvUrl,
            method: "GET"
        }).then(function(uvResponse){
            var weatherImg = $("#weatherImg")
            weatherImg.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
            currentCity.text(city+" (" + moment().format('L') + ")")
            currentTemp.text("Temperature: " + response.main.temp + " F")
            currentHumid.text("Humidity: " + response.main.humidity +"%")
            windSpeed.text("WindSpeed: " + response.wind.speed + " MPH")
            uvIndex.text("UV Index: " + uvResponse.value)
            if(uvResponse.value>=8){
                uvIndex.attr("class","uvSevere")
            }else if(uvResponse.value>=6 && uvResponse.value<8){
                uvIndex.attr("class","uvModerate")
            }else if(uvResponse.value>=3 && uvResponse.value<6){
                uvIndex.attr("class","uvFavorable")
            }else if(uvResponse.value>0 && uvResponse.value<3){
                uvIndex.attr("class","uvLow")
            }


        })

        var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat +"&lon=" + cityLon + "&exclude=minutely,hourly&units=imperial&appid=e38ce3347beb048675316478b3f3b0c5"

        $.ajax({
            url: forecastUrl,
            metod: "GET"
        }).then(function(forecastResponse){
            $("#fiveDay").text("");


            for(i=0; i<5; i++){
                var forecastEl = $("<div>")
                var forecastDate = $("<h5>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p>");
                var forecastHumid = $("<p>");
                forecastEl.attr("class", "forecast")
                //forecastEl.attr("data-forecast", [i])

                forecastDate.text(moment().add(i+1, "days").format("l"));
                forecastIcon.attr("src", "http://openweathermap.org/img/wn/" + forecastResponse.daily[i+1].weather[0].icon + ".png");
                forecastTemp.text("Temp: " + forecastResponse.daily[i+1].temp.max + " F");
                forecastHumid.text("Humidity: " + forecastResponse.daily[i+1].humidity + " %");
                
                $("#fiveDay").append(forecastEl);
                forecastEl.append(forecastDate)
                forecastEl.append(forecastIcon)
                forecastEl.append(forecastTemp)
                forecastEl.append(forecastHumid)

                


            }
        })
        
    })

    newCities.unshift(city)
    localStorage.setItem("savedCity", JSON.stringify(newCities))

    console.log(JSON.parse(localStorage.getItem("savedCity")))


})



var savedCityBtn = $(".savedBtn")

savedCityBtn.on("click", function(){
    console.log($(this)[0].textContent)
    
    var city = $(this)[0].textContent;
    
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e38ce3347beb048675316478b3f3b0c5"
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;
        var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=e38ce3347beb048675316478b3f3b0c5&lat=" + cityLat + "&lon=" + cityLon;
        
        $.ajax({
            url: uvUrl,
            method: "GET"
        }).then(function(uvResponse){
            var weatherImg = $("#weatherImg")
            weatherImg.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
            currentCity.text(city+" (" + moment().format('L') + ")")
            currentTemp.text("Temperature: " + response.main.temp + " F")
            currentHumid.text("Humidity: " + response.main.humidity +"%")
            windSpeed.text("WindSpeed: " + response.wind.speed + " MPH")
            uvIndex.text("UV Index: " + uvResponse.value)
            if(uvResponse.value>=8){
                uvIndex.attr("class","uvSevere")
            }else if(uvResponse.value>=6 && uvResponse.value<8){
                uvIndex.attr("class","uvModerate")
            }else if(uvResponse.value>=3 && uvResponse.value<6){
                uvIndex.attr("class","uvFavorable")
            }else if(uvResponse.value>0 && uvResponse.value<3){
                uvIndex.attr("class","uvLow")
            }


        })

        var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat +"&lon=" + cityLon + "&exclude=minutely,hourly&units=imperial&appid=e38ce3347beb048675316478b3f3b0c5"

        $.ajax({
            url: forecastUrl,
            metod: "GET"
        }).then(function(forecastResponse){
            $("#fiveDay").text("");


            for(i=0; i<5; i++){
                var forecastEl = $("<div>")
                var forecastDate = $("<h5>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p>");
                var forecastHumid = $("<p>");
                forecastEl.attr("class", "forecast")
                //forecastEl.attr("data-forecast", [i])

                forecastDate.text(moment().add(i+1, "days").format("l"));
                forecastIcon.attr("src", "http://openweathermap.org/img/wn/" + forecastResponse.daily[i+1].weather[0].icon + ".png");
                forecastTemp.text("Temp: " + forecastResponse.daily[i+1].temp.max + " F");
                forecastHumid.text("Humidity: " + forecastResponse.daily[i+1].humidity + " %");
                
                $("#fiveDay").append(forecastEl);
                forecastEl.append(forecastDate)
                forecastEl.append(forecastIcon)
                forecastEl.append(forecastTemp)
                forecastEl.append(forecastHumid)

                


            }
        })
        
    })
})

