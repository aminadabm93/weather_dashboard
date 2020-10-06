var APIKey = "2725115e753205536570b154ebf75545";
var hist = [];


function displayCurrent(city){
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=" + APIKey;

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"}).then(function(response){  
      //display city name and date
      var d = new Date();
      //make city name upper case 
      city = city.charAt(0).toUpperCase() + city.slice(1);
      $("#city-name").text(city+": "+d.toDateString());
      //get icon for current 
      var currentPic = response.weather[0].icon;
      //set src and alt for image
      $("#current-pic").attr("src","https://openweathermap.org/img/wn/" +currentPic + "@2x.png")
      $("#current-pic").attr("alt",response.weather[0].description);

      //set temp
      $("#temperature").text("Temperature: "+response.main.temp+" \xB0F");
      //set humidity
      $("#humidity").text("Humidity: "+response.main.humidity+"%");
      //set wind speed
      $("#wind-speed").text("Wind speed: "+response.wind.speed+" Mph");
      //need lat and long for UV and 5day query
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=impereial&exclude=minutely,hourly,alerts,current&appid="+APIKey;
      $.ajax({
        url: queryURL2,
        method: "GET"}).then(function(response2){
          console.log(response2);
          $("#UV-index").text("UV Index: "+response2.daily[0].uvi);
          //for loop to create 5 day forecast
          //need date
          var month = d.getMonth();
          var day = d.getDate();
          var year = d.getFullYear();
          for(var i=1;i<6;i++){ 
          var dayEl = $("#day"+i);
          dayEl.append($("<p>"+month+"/"+day+i+"/"+year+"</p>"));
          //then icon
          var dayIcon = $("<img>");
          dayIcon.attr("src","https://openweathermap.org/img/wn/"+response2.daily[i].weather[0].icon+"@2x.png");
          dayEl.append(dayIcon);
          //then temp
          var dailyTempEl = $("<p>");
          var tempConvert =  Math.floor((response2.daily[i].temp.day - 273.15) *1.8 +32);
          dailyTempEl.text("Temp: "+tempConvert+"\xB0F");
          dayEl.append(dailyTempEl);
          //then humidity
          var dailyHumEl= $("<p>");
          dailyHumEl.text("Humidity: "+response2.daily[i].humidity+"%");
          dayEl.append(dailyHumEl);
          }
        });
      });
    
}

//read from input once the search button is clicked
$("#search-button").on("click",function(){
  var queryCity = $("#city-input").val();
  hist.push(queryCity);
  displayCurrent(queryCity);
});
//use ajax to read data from city 
// display city and today's date and picture 

//display temp
//display humidity 
//display wind speed 
//display uv index w/ color 

// 

//     // Here we are building the URL we need to query the database
//     