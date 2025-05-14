import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"
const openWeatherUrl = "https://api.openweathermap.org/data/2.5"

const search = () => {
    return axios.get(`${baseUrl}/all`).then(response => response.data)
}
const getWeather = (city) => {
    console.log("city", city)
    return axios.get(`${openWeatherUrl}/weather?q=${city}&appid=${api_key}&units=metric`).then(response => response.data)
}

// const getWeatherIcon = (icon) => {
//     return axios.get().then(response => response.data)
// }

export default { search , getWeather}