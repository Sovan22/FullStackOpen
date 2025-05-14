
import { useState, useEffect } from 'react'
import countryinfo from '../services/countryinfo'

const Weather = ({capital}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        console.log("effect run")
        countryinfo.getWeather(capital).then(response => {
            console.log("promise fulfilled")
            setWeather(response)
        })
        console.log("render", weather)
    }, [])

    if (weather) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>temperature {weather.main.temp} Celsius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
    return null
}

export default Weather