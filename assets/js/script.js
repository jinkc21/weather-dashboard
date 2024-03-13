const getWeatherBtn = document.getElementById('get-weather-button')
const weatherOutput = document.getElementById('weather-output')
const cityInput = document.getElementById('city-input')
const APIKey = "fa6f4ef3799ea75f4bd83e1146ea02a9"
const cityNameEl = document.getElementById('city-name')
const dayOneEl = document.getElementById('day-1')
const dayTwoEl = document.getElementById('day-2')
const dayThreeEl = document.getElementById('day-3')
const dayFourEl = document.getElementById('day-4')
const dayFiveEl = document.getElementById('day-5')



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
  cityNameEl.innerHTML = data.city.name
  dayOneEl.children[0].innerHTML = data.list[0].dt_txt
  dayOneEl.children[1].src = "https://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+"@2x.png"
  dayOneEl.children[2].innerHTML = "Temperature: " + data.list[0].main.temp
  dayOneEl.children[3].innerHTML = "Humidity: " + data.list[0].main.humidity
  dayOneEl.children[4].innerHTML = "Wind Speed:" + data.list[0].wind.speed

}
 })
}




getWeatherBtn.addEventListener('click', getGeocode);