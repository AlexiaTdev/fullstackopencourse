import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const api_key = import.meta.env.VITE_SOME_KEY
// use command line ($env:VITE_SOME_KEY="YOURKEY") -and (npm run dev) // For Windows PowerShell

const getWeather = (countryName, countryCapital) => {
  const request =  axios.get(`${baseUrl}${countryName},${countryCapital}&APPID=${api_key}`)
  return request.then(response => response.data)
}

/**
 * Response example
 * 
 * 
{
    "coord": {
        "lon": -0.1257,
        "lat": 51.5085
    },
    "weather": [
        {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 272.84,
        "feels_like": 272.84,
        "temp_min": 271.51,
        "temp_max": 274.01,
        "pressure": 1021,
        "humidity": 88,
        "sea_level": 1021,
        "grnd_level": 1016
    },
    "visibility": 10000,
    "wind": {
        "speed": 0.51,
        "deg": 0
    },
    "clouds": {
        "all": 88
    },
    "dt": 1736527507,
    "sys": {
        "type": 2,
        "id": 268730,
        "country": "GB",
        "sunrise": 1736496173,
        "sunset": 1736525567
    },
    "timezone": 0,
    "id": 2643743,
    "name": "London",
    "cod": 200
}
 */


export default { 
    getWeather
}