$("#search-button").on("click", function weather(search){
    search.preventDefault();
    //Need a variable to store city
    var city = "";
    var clickcity = [];
    //var declaration
    var searchCity = $("#search-city").val();
    var searchButton = $("#search-button");
    var listEL = event.target;
    console.log(searchCity)
    //Using AJAX search input
    var APIKey = "a0aca8a89948154a4182dcecc780b513";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&APPID=" + APIKey;
   
    //Call
    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(res){
        console.log(res)
       
     

        //to display weather icon beside City name
        var weathericon = res.weather[0].icon
        var iconurl = "https://openweathermap.org/img/wn/"+ weathericon +"@2x.png";
        var date=new Date(res.dt*1000).toLocaleDateString();
        var tempF = (res.main.temp - 273.15) * 1.80 + 32;
        var ws=res.wind.speed;
        var windsmph=(ws*2.237).toFixed(1);

       

        //Display results current-weather
        $("#current-city").html(res.name + "("+date+")" + "<img src="+ iconurl + ">");
        $("#temperature").html((tempF).toFixed(2) +"&#8457");
        $("#humidity").html(res.main.humidity + "%");
        $("#wind").html(windsmph +"MPH");
        UVIndex(res.coord.lon,res.coord.lat);
        forcast(searchCity);
        store();

        
    })
})

//Function to get UV index Lat & Lon
function UVIndex(ln,lt){
var APIKey = "791cda9eee227670805a4f8b0c70d2de";
var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;
$.ajax({
        url:uvqURL,
        method:"GET"
        }).then(function(res){
            $("#uv-index").html(res.value);
        });
                    }
//Function 5 day forecast
function forcast(searchCity){
    var APIKey = "a0aca8a89948154a4182dcecc780b513";   
    var fURL = "https://api.openweathermap.org/data/2.5/forecast?q= " + searchCity + "&APPID=" + APIKey;

    $.ajax({
        url:fURL,
        method:"GET"
    }).then(function(res){
        console.log(res)
        console.log(searchCity)

        for (i=0;i<5;i++){
        var date= new Date((res.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
        var iconcode= res.list[((i+1)*8)-1].weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
        var tempK= res.list[((i+1)*8)-1].main.temp;
        var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
        var humidity= res.list[((i+1)*8)-1].main.humidity;
        
        $("#fdate"+i).html(date);
        $("#ficon"+i).html("<img src="+iconurl+">");
        $("#ftemp"+i).html("Temp: " +tempF+"&#8457");
        $("#fhumidity"+i).html("Humidity: "+humidity+"%");
    }
        
    }) 
}

//local storage function
//create an array to save cities and display
function store(){
   //get data from input box
   let data;
   var new_data = $("#search-city").val();
   console.log(new_data)

   if(localStorage.getItem('data') == null){
       localStorage.setItem('data', '[]')
   } 
    //get old data
     var old_data = JSON.parse(localStorage.getItem('data'));
     old_data.push(new_data);

     //save old and new data to local storage
     localStorage.setItem('data', JSON.stringify(old_data));
     //display data
     //var tList = $("<ul>");
     var li= document.createElement('lg')
     var getcityarray = JSON.parse(localStorage.getItem('data'));
     var results = $(li).html(getcityarray[getcityarray.length - 1]);
    $("#searchedcities").append(results.css({
        "background" : "white",
        "border" : " 1px solid",
        "border-radius" : "5px",
        }));
    ///need to display data even page gets refresh

    $("lg").on("click", function(city){
       alert($("ul lg").value)
     
        //var clickcity = city[city.length - 1];
  })
}


