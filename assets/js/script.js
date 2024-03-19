const getWeatherBtn = document.getElementById('get-weather-button')
// const getForecastBtn = document.getElementById('get-forecast-button')
const weatherOutput = document.getElementById('weather-output')
const cityInput = document.getElementById('city-input')
const APIKey = "fa6f4ef3799ea75f4bd83e1146ea02a9"
const cityNameEl = document.getElementById('city-name')
const forecastEl = document.getElementById('forecast')
const dayZeroEl = document.getElementById('day-0')
const dayOneEl = document.getElementById('day-1')
const dayTwoEl = document.getElementById('day-2')
const dayThreeEl = document.getElementById('day-3')
const dayFourEl = document.getElementById('day-4')
const dayFiveEl = document.getElementById('day-5')
const recentCities = document.getElementById('recent-cities')
const recentSearch = JSON.parse(localStorage.getItem('city')) || []
const latLon = JSON.parse(localStorage.getItem('coord'))

const today = dayjs()
$('#today').text(today.format('YYYY-MM-D'))

function getWeather(event) {
  if (cityInput.value === ""){
    return
  }
  // event.preventDefault()
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=${APIKey}`

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      // const lat = data.coord.lat
      // const lon = data.coord.lon
      var cityLower = cityInput.value.toLowerCase()
      if (!recentSearch.includes(cityLower)) {
        // console.log(recentSearch.value)
        recentSearch.push(cityLower)
        localStorage.setItem("city", JSON.stringify(recentSearch))
      }
      getForecast(data.coord.lat, data.coord.lon)
      //localStorage.setItem("coord", JSON.stringify(data.coord))
      cityNameEl.innerHTML = data.name
      $('#day-0-date').text(today.format('YYYY-MM-D') + "   Today's Weather");
      dayZeroEl.children[1].src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      dayZeroEl.children[2].innerHTML = "Temperature: " + data.main.temp + "°F"
      dayZeroEl.children[3].innerHTML = "Humidity: " + data.main.humidity + "%"
      dayZeroEl.children[4].innerHTML = "Wind Speed:" + data.wind.speed + "mph"

      // if (cityInput === recentSearch.value) {
        // console.log("hello")
        // let cityList = document.createElement('button')
        // cityList.textContent = data.name
        // cityList.setAttribute("value", data.name)
        // cityList.addEventListener("click", getRecent)
        // recentCities.appendChild(cityList)

        renderHistory()
      // }
    })





  //getForecast()
}

getWeatherBtn.addEventListener('click', getWeather);
// getForecastBtn.addEventListener('click', getForecast);

function getForecast(lat, lon) {
  // event.preventDefault()
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //  console.log(data)
      forecastEl.innerHTML = "5 Day Forecast"
      dayOneEl.children[0].setAttribute('maxlength', "10")
      dayOneEl.children[0].innerHTML = data.list[0].dt_txt.substring(0, 10)

      dayOneEl.children[1].src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png"
      dayOneEl.children[2].innerHTML = "Temperature: " + data.list[0].main.temp + "°F"
      dayOneEl.children[3].innerHTML = "Humidity: " + data.list[0].main.humidity + "%"
      dayOneEl.children[4].innerHTML = "Wind Speed:" + data.list[0].wind.speed + "mph"

      dayTwoEl.children[0].innerHTML = data.list[8].dt_txt.substring(0, 10)
      dayTwoEl.children[1].src = "https://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + "@2x.png"
      dayTwoEl.children[2].innerHTML = "Temperature: " + data.list[8].main.temp + "°F"
      dayTwoEl.children[3].innerHTML = "Humidity: " + data.list[8].main.humidity + "%"
      dayTwoEl.children[4].innerHTML = "Wind Speed:" + data.list[8].wind.speed + "mph"

      dayThreeEl.children[0].innerHTML = data.list[16].dt_txt.substring(0, 10)
      dayThreeEl.children[1].src = "https://openweathermap.org/img/wn/" + data.list[16].weather[0].icon + "@2x.png"
      dayThreeEl.children[2].innerHTML = "Temperature: " + data.list[16].main.temp + "°F"
      dayThreeEl.children[3].innerHTML = "Humidity: " + data.list[16].main.humidity + "%"
      dayThreeEl.children[4].innerHTML = "Wind Speed:" + data.list[16].wind.speed + "mph"

      dayFourEl.children[0].innerHTML = data.list[24].dt_txt.substring(0, 10)
      dayFourEl.children[1].src = "https://openweathermap.org/img/wn/" + data.list[24].weather[0].icon + "@2x.png"
      dayFourEl.children[2].innerHTML = "Temperature: " + data.list[24].main.temp + "°F"
      dayFourEl.children[3].innerHTML = "Humidity: " + data.list[24].main.humidity + "%"
      dayFourEl.children[4].innerHTML = "Wind Speed:" + data.list[24].wind.speed + "mph"

      dayFiveEl.children[0].innerHTML = data.list[32].dt_txt.substring(0, 10)
      dayFiveEl.children[1].src = "https://openweathermap.org/img/wn/" + data.list[32].weather[0].icon + "@2x.png"
      dayFiveEl.children[2].innerHTML = "Temperature: " + data.list[32].main.temp + "°F"
      dayFiveEl.children[3].innerHTML = "Humidity: " + data.list[32].main.humidity + "%"
      dayFiveEl.children[4].innerHTML = "Wind Speed:" + data.list[32].wind.speed + "mph"
    })
}

function renderHistory() {
  recentCities.innerHTML = ''
  for (let i = 0; i < recentSearch.length; i++) {
    let cityList = document.createElement('button')
    cityList.textContent = recentSearch[i].toUpperCase()
    cityList.setAttribute("value", recentSearch[i])
    cityList.addEventListener("click", getRecent)
    recentCities.appendChild(cityList)
  }
}

renderHistory()

function getRecent(event) {
  // event.preventDefault()
  const recentCityName = event.target.value
  console.log(recentCityName)
  const recentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${recentCityName}&units=imperial&appid=${APIKey}`

  fetch(recentUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      // const lat = data.coord.lat
      // const lon = data.coord.lon
      // recentSearch.push(data.name)
      // localStorage.setItem("city", JSON.stringify(recentSearch))
      getForecast(data.coord.lat, data.coord.lon)
      //localStorage.setItem("coord", JSON.stringify(data.coord))

      cityNameEl.innerHTML = data.name
      $('#day-0-date').text(today.format('YYYY-MM-D') + "   Today's Weather");
      dayZeroEl.children[1].src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      dayZeroEl.children[2].innerHTML = "Temperature: " + data.main.temp + "°F"
      dayZeroEl.children[3].innerHTML = "Humidity: " + data.main.humidity + "%"
      dayZeroEl.children[4].innerHTML = "Wind Speed:" + data.wind.speed + "mph"

    })

}