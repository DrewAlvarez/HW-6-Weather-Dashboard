var searchBtn = $("#searchBtn")
var saveCities = ["","","","","",""]

searchBtn.on("click", function(){
    var city = $(this).siblings("input").val();
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e38ce3347beb048675316478b3f3b0c5"
    var currentDay = $("<div>")
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response)
    })
})
