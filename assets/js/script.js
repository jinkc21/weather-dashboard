const getWeatherBtn = document.getElementById('get-weather-button')
const getForecastBtn = document.getElementById('get-forecast-button')
const weatherOutput = document.getElementById('weather-output')
const cityInput = document.getElementById('city-input')
const APIKey = "fa6f4ef3799ea75f4bd83e1146ea02a9"
const cityNameEl = document.getElementById('city-name')
const dayOneEl = document.getElementById('day-1')
const dayTwoEl = document.getElementById('day-2')
const dayThreeEl = document.getElementById('day-3')
const dayFourEl = document.getElementById('day-4')
const dayFiveEl = document.getElementById('day-5')
const recentSearch = JSON.parse(localStorage.getItem('city'))
const latLon = JSON.parse(localStorage.getItem('coord'))

const today = dayjs()

function getWeather(event) {
  // event.preventDefault()
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${APIKey}`

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // const lat = data.coord.lat
      // const lon = data.coord.lon

      localStorage.setItem("city", JSON.stringify(data.name))
      localStorage.setItem("coord", JSON.stringify(data.coord))

      cityNameEl.innerHTML = data.name
      $('#day-1-date').text(today.format('MMM D, YYYY'));
      dayOneEl.children[1].src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      dayOneEl.children[2].innerHTML = "Temperature: " + data.main.temp
      dayOneEl.children[3].innerHTML = "Humidity: " + data.main.humidity
      dayOneEl.children[4].innerHTML = "Wind Speed:" + data.wind.speed
    
    })
}

getWeatherBtn.addEventListener('click', getWeather);
getForecastBtn.addEventListener('click', getForecast);

      function getForecast(event) {
        // event.preventDefault()
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latLon.lat}&lon=${latLon.lon}&appid=${APIKey}`
        fetch(forecastUrl)
             .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log("hello")
            cityNameEl.innerHTML = data.city.name
            dayOneEl.children[0].innerHTML = data.list[0].dt_txt
            dayOneEl.children[1].src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png"
            dayOneEl.children[2].innerHTML = "Temperature: " + data.list[0].main.temp
            dayOneEl.children[3].innerHTML = "Humidity: " + data.list[0].main.humidity
            dayOneEl.children[4].innerHTML = "Wind Speed:" + data.list[0].wind.speed

            dayTwoEl.children[0].innerHTML = data.list[8].dt_txt
            dayTwoEl.children[1].src = "https://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + "@2x.png"
            dayTwoEl.children[2].innerHTML = "Temperature: " + data.list[8].main.temp
            dayTwoEl.children[3].innerHTML = "Humidity: " + data.list[8].main.humidity
            dayTwoEl.children[4].innerHTML = "Wind Speed:" + data.list[8].wind.speed

            dayThreeEl.children[0].innerHTML = data.list[16].dt_txt
            dayThreeEl.children[1].src = "https://openweathermap.org/img/wn/" + data.list[16].weather[0].icon + "@2x.png"
            dayThreeEl.children[2].innerHTML = "Temperature: " + data.list[16].main.temp
            dayThreeEl.children[3].innerHTML = "Humidity: " + data.list[16].main.humidity
            dayThreeEl.children[4].innerHTML = "Wind Speed:" + data.list[16].wind.speed

            dayFourEl.children[0].innerHTML = data.list[24].dt_txt
            dayFourEl.children[1].src = "https://openweathermap.org/img/wn/" + data.list[24].weather[0].icon + "@2x.png"
            dayFourEl.children[2].innerHTML = "Temperature: " + data.list[24].main.temp
            dayFourEl.children[3].innerHTML = "Humidity: " + data.list[24].main.humidity
            dayFourEl.children[4].innerHTML = "Wind Speed:" + data.list[24].wind.speed

            dayFiveEl.children[0].innerHTML = data.list[32].dt_txt
            dayFiveEl.children[1].src = "https://openweathermap.org/img/wn/" + data.list[32].weather[0].icon + "@2x.png"
            dayFiveEl.children[2].innerHTML = "Temperature: " + data.list[32].main.temp
            dayFiveEl.children[3].innerHTML = "Humidity: " + data.list[32].main.humidity
            dayFiveEl.children[4].innerHTML = "Wind Speed:" + data.list[32].wind.speed
          })
      }