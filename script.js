var searchBtn = $("#searchBtn")
var currentCity = $("#currentCity")
var currentTemp = $("#currentTemp")
var currentHumid = $("#currentHumid")
var windSpeed = $("#windSpeed")
var uvIndex = $("#uvIndex")
var saveCities = []

searchBtn.on("click", function(){
    var city = $(this).siblings("input").val();
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e38ce3347beb048675316478b3f3b0c5"
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response)
        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;
        var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=e38ce3347beb048675316478b3f3b0c5&lat=" + cityLat + "&lon=" + cityLon;
        
        $.ajax({
            url: uvUrl,
            method: "GET"
        }).then(function(uvResponse){
            console.log(uvResponse)
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
        
    })
})
