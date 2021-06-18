// Global variables
var weatherCity = "Kutaisi";

// Global DOM variables
const inp = document.getElementById('inp');
const inpSerchBox = document.querySelector('.inp-serch-box');
const searchIcon = document.getElementById('searchIcon');
const delIcon = document.getElementById('delIcon');
const inpDel = document.getElementById('inpDel');

// Function expression
GetWeatherAPI();

// Enter key event
inp.addEventListener('keyup', function(event){
    if(event.key === "Enter"){
        weatherCity = inp.value;
        GetWeatherAPI();
    }else{
        defaultStyle();
    }
});

// Delete text in input value event
inpDel.addEventListener('click', function(){
    inp.value = null;
    defaultStyle();
});

// Default style function
function defaultStyle(){
    inpSerchBox.style.border = "1px solid rgba(255, 255, 255, 0.082)"
    searchIcon.style.color = "unset"
    delIcon.style.color = "unset"
}

// Get weather API function
function GetWeatherAPI(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + weatherCity + '&appid=94f3b8362f2ea33bcc608bb22818e3f4&units=metric')
    .then(res => res.json())
    .then(data => {
        
        // Background color day or night 
        let dayOrNight = data.weather[0].icon
        const background = document.getElementById("background")
        
        if(dayOrNight.charAt(2) == "d"){
            background.style.background = "linear-gradient(145deg, rgb(20, 141, 255), rgb(131, 189, 255))"
        }else if(dayOrNight.charAt(2) == "n"){
            background.style.background = "linear-gradient(145deg, rgb(0, 113, 219), rgb(157, 141, 253))"
        }
        
        // Main weather information
        const city = document.getElementById('city')
        city.innerHTML = data.name
        
        const geo = document.getElementById('geo')
        geo.innerHTML = data.sys.country
        
        const temp = document.getElementById('temp')
        temp.innerHTML = Math.round(data.main.temp) + "˚C"
        
        const weatherIcon = document.getElementById('weatherIcon')
        weatherIcon.setAttribute('src', 'weatherIcon/' + dayOrNight + '@2x.png')

        const iconTxt = document.getElementById('iconTxt')
        iconTxt.innerHTML = data.weather[0].description

        const colud = document.getElementById('colud')
        colud.innerHTML = data.weather[0].main

        const feel = document.getElementById('feel')
        feel.innerHTML = "Feels like " + Math.round(data.main.feels_like) + "˚C"
        
        // Other weather information
        const wind = document.getElementById('wind')
        wind.innerHTML = "Wind: " + Math.round(data.wind.speed * 10) / 10 + "m/s NE"

        const cursorDeg = document.getElementById('cursorDeg')
        cursorDeg.style.transform = "rotate(" + data.wind.deg + "deg)"

        const humidity = document.getElementById('humidity')
        humidity.innerHTML = "Humidity: " + data.main.humidity + "%"

        const pressure = document.getElementById('pressure')
        pressure.innerHTML = "Pressure: " + data.main.pressure + "hPa"

        const visibility = document.getElementById('visibility')
        visibility.innerHTML = "Visibility: " + Math.round(data.visibility / 1000 * 10) / 10 + "km"

        const dewPoint = document.getElementById('dewPoint')
        dewPoint.innerHTML = "Dew point: " + Math.round(data.main.feels_like) + "˚C"

        // Min and Max temperature
        const tempMin = document.getElementById('tempMin')
        tempMin.innerHTML = "Min temperature: " + Math.round(data.main.temp_min) + "˚C"

        const tempMax = document.getElementById('tempMax')
        tempMax.innerHTML = "Max temperature: " + Math.round(data.main.temp_max)  + "˚C"
    })
    
    // Catch Error 
    .catch(err => {
        inpSerchBox.style.border = "1px solid rgba(255, 0, 0, 0.63)"
        searchIcon.style.color = "rgba(255, 0, 0, 0.63)"
        delIcon.style.color = "rgba(255, 0, 0, 0.63)"
    })
};
