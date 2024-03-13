const getWeatherBtn = document.getElementById('get-weather-button')
const weatherOutput = document.getElementById('weather-output')
const cityInput = document.getElementById('city-input')
const APIKey = "fa6f4ef3799ea75f4bd83e1146ea02a9"



function getApi() {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${APIKey}`;
  fetch(queryURL)
console.log(queryURL)


}


function getGeocode(event) {
  event.preventDefault()
  const geocodeUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${APIKey}`

  // console.log(geocodeUrl)
  fetch(geocodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
 const lat = data.city.coord.lat
const lon = data.city.coord.lon 
      // console.log(data)
      // console.log(lat, lon)
      getWeather()

 function getWeather() {  
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
// const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`
  fetch(weatherUrl)
  // fetch(forecastUrl)

  // console.log(weatherUrl)

}
 })
}




getWeatherBtn.addEventListener('click', getGeocode);