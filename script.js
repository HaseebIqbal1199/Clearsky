document.addEventListener('DOMContentLoaded', function () {

    // * API CALL AUTH-KEY
    const auth = "0af35aebac0941daa8c123054240302"

    // * VALIDATOR {PERMISSIONS}
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(IF_FETCHED, IF_FETHING_ERORR)

        // * AFTER VALIDATION IF {TRUE} 
        function IF_FETCHED(position) {
            var lat = position.coords.latitude
            var lon = position.coords.longitude
            getWeather(lat, lon, auth) //* DIRECTED TO THE PROCESS OF FETCHING INFO
        }

        // * AFTER VALIDATION IF {FALSE}
        function IF_FETHING_ERORR() {
            alert('Data Fetching Error!')
        }
    }
    else {
        alert("Not supported!")
    }

    // * FUNTION THAT FETCH THE RESPONSE FROM API
    async function getWeather(latitude, longitude, apikey) {
        try {
            // *
            // * *
            // * * *
            // Sample of API URL : 
            //          https://api.weatherapi.com/v1/current.json?key=0af35aebac0941daa8c123054240302&q=31.5997072,74.4904416&&aqi=no
            // * * *
            // * *
            // *

            // * RESPONSE CONTAINING ALL INFO ABOUT THE {TEMPRATURE}
            const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=" + apikey + "&q=" + latitude + "," + longitude + "&days=7&aqi=no&alerts=no");
            console.log(response);
            const data = await response.json();
            console.log(data);

            // * DISPLAYING ASTRODATA {SUNRISE - SUNSET}.
            // * THIS FUNCTION IS IN ANOTHER JS FILE {/dir/js/sunrise-sunset.js}
            // Sunrise_sunset();

            // * DISPLAY {temperature}
            const temperature = document.getElementsByClassName('currentdeg')[0];
            temperature.innerHTML = Number(JSON.stringify(data.current.temp_c)).toFixed(0) + "°";
            console.log(JSON.stringify(data.current.temp_c));

            // * DISPLAY {Temp[feel-like]}
            const tempraturedetails = document.getElementsByClassName('feellike')[0]
            const feellike = Number(JSON.stringify(data.current.feelslike_c))
            tempraturedetails.innerHTML = "feels like " + feellike + "°"

            // * MODIFYING CONDITIONS EG: [HAZY,MIST,FOG]
            const condition = document.getElementsByClassName('currentstatus')[0]
            condition.innerHTML = data.current.condition.text
            console.log(data.current.condition.text);

            // * MODIFYING LOCATION NAME EG: [LAHORE]
            const location_name = document.getElementById('location-name')
            location_name.innerHTML = data.location.name

            // * Humidity showcase
            const humid = document.getElementsByClassName('humid')[0]
            humid.innerHTML = data.current.humidity + "%"

            // * Wind showcase
            const windtxt = document.getElementsByClassName('windtxt')[0]
            windtxt.innerHTML = data.current.wind_kph + " km/h"
            
            // * uv showcase
            let uv = document.getElementsByClassName('uv')[0]
            let uvIndex = Number(data.current.uv)
            console.log("uv" + uvIndex);
            function uv_ai(uvIndex) {
                if (uvIndex <= 2) {
                    uv.innerHTML = "low".charAt(0).toUpperCase() + "low".slice(1);
                  } else if (uvIndex <= 5) {
                   uv.innerHTML = "moderate";
                  } else if (uvIndex <= 7) {
                    uv.innerHTML = "high";
                  } else if (uvIndex <= 10) {
                    uv.innerHTML = ("very high");
                  } else {
                    uv.innerHTML = "extreme";
                  }
            }
            uv_ai(uvIndex)

            // * weekly Monday
            const Monday_temp = document.getElementsByClassName('monny_temp')[0]
            const Monday_sun_state = document.getElementsByClassName('monny_sun_state')[0]
            Monday_temp.innerHTML = Number(data.forecast.forecastday[0].day.avgtemp_c).toFixed(0) + " °"
            console.log(data.forecast.forecastday[0].day.avgtemp_c + " °");
            // * weekly Tuesday
            const Tuesday_temp = document.getElementsByClassName('tuesi_temp')[0]
            const Tuesday_sun_state = document.getElementsByClassName('tuesi_sun_state')[0]
            Tuesday_temp.innerHTML = Number(data.forecast.forecastday[1].day.avgtemp_c).toFixed(0) + " °"
            console.log(data.forecast.forecastday[1].day.avgtemp_c + " °");
            // * weekly Wednesday
            const Wednesday_temp = document.getElementsByClassName('wed_temp')[0]
            const Wednesday_sun_state = document.getElementsByClassName('wed_sun_state')[0]
            Wednesday_temp.innerHTML = Number(data.forecast.forecastday[2].day.avgtemp_c).toFixed(0) + " °"
            console.log(data.forecast.forecastday[2].day.avgtemp_c + " °");
            // * weekly Thursday
            const Thursday_temp = document.getElementsByClassName('thur_temp')[0]
            const Thursday_sun_state = document.getElementsByClassName('thur_sun_state')[0]
            Thursday_temp.innerHTML = Number(data.forecast.forecastday[3].day.avgtemp_c).toFixed(0) + " °"
            console.log(data.forecast.forecastday[3].day.avgtemp_c + " °");
            // * weekly Friday
            const Friday_temp = document.getElementsByClassName('fri_temp')[0]
            const Friday_sun_state = document.getElementsByClassName('fri_sun_state')[0]
            Friday_temp.innerHTML = Number(data.forecast.forecastday[4].day.avgtemp_c).toFixed(0) + " °"
            console.log(data.forecast.forecastday[4].day.avgtemp_c + " °");
            // * weekly Saturday
            const Saturday_temp = document.getElementsByClassName('sat_temp')[0]
            const Saturday_sun_state = document.getElementsByClassName('sat_sun_state')[0]
            Saturday_temp.innerHTML = Number(data.forecast.forecastday[5].day.avgtemp_c).toFixed(0) + " °"
            console.log(data.forecast.forecastday[6].day.avgtemp_c + " °");
            // * weekly Sunday
            const Sunday_temp = document.getElementsByClassName('sund_temp')[0]
            const Sunday_sun_state = document.getElementsByClassName('sund_sun_state')[0]
            Sunday_temp.innerHTML = Number(data.forecast.forecastday[6].day.avgtemp_c).toFixed(0) + " °"
            console.log(data.forecast.forecastday[6].day.avgtemp_c + " °");

            // * sunset-rise showcase
            const sun_state = document.getElementsByClassName('sun-state')[0]
            const rise = data.forecast.forecastday[0].astro.sunrise
            const set = data.forecast.forecastday[0].astro.sunset
            sun_state.innerHTML = rise +" - "+set

            // // * CHANIGING PICTUE BASED ON CURRENT WEATHER
            weather_preset(data);
            console.log(data.forecast.forecastday[0]);


        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    }
})