let inputValCity = document.getElementById("city");
const showData = document.getElementById("showWeather");
const temp = document.getElementById("temp");
const weatherType = document.getElementById("weatherType");
const weatherDesc = document.getElementById("weatherDesc");
const country = document.getElementById("country");
const celsiusInput = document.querySelector("#celsius");
const farenheitInput = document.querySelector("#farenheit");
let tempC;
let tempF;
let userLocation;
let url;

// Geolocation
window.addEventListener('load', (event) => {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLonLat, showError);
    } else {
      console.log("The Browser Does not Support Geolocation");
    }
  }
  function getLonLat(position) {
    userLocation = {
      "lon": position.coords.longitude,
      "lat": position.coords.latitude
    }
    console.log(userLocation);
  }
  function showError(error) {
    if(error.PERMISSION_DENIED){
        console.log("The User have denied the request for Geolocation.");
    }
  }
  getLocation();
});


let weatherBtn = document
  .querySelector("button")
  .addEventListener("click", function (e) {
    e.preventDefault();

    if (!userLocation == null) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.long}&appid=131c028170b0cf867703265c71524ce8`;
      console.log(url);
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValCity.value}&appid=131c028170b0cf867703265c71524ce8`;
    }

    fetch(url)
      .then((res) => res.json())

      .then((data) => {
        try {
          //for temp
          tempC = Math.round(data.main.temp - 273.15) + "<sup>°C</sup>";
          tempF = Math.round(((data.main.temp - 273.15) * 9) / 5 + 32) + "<sup>°F</sup>";

          if (celsiusInput.checked) {
            temp.innerHTML = tempC;
          } else {
            temp.innerHTML = tempF;
          }

          //for weather type
          weatherType.innerHTML = data.weather.map(
            (weatherTypes) => weatherTypes.main
          );

          //for weather description
          weatherDesc.innerHTML = data.weather.map(
            (weatherTypes) => weatherTypes.description
          );

          //for country
          country.innerHTML = data.sys.country;

        } catch (err) {
          alert(
            "Please enter city name correctly or something went wrong from our side. Sorry for the inconvenience.\n\n" + err
          );
        }
      });
  });