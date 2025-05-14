import { useState, useEffect } from 'react'
import countryinfo from './services/countryinfo'
import Weather from './components/Weather'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [countriesToShow,setCountriestoShow] = useState([])


  useEffect(() => {
    console.log("effect run")
      countryinfo.search().then(response => {
        console.log("promise fulfilled")
        setCountries(response)
        setCountriestoShow(response)
      }
    )
    console.log("render", countries.length, "countries")
  }, [])

  const handleChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    setCountriestoShow(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

const handleClick = (name,e) => {
    e.preventDefault()
    const country = countries.find(country => country.name.common === name)
    setCountriestoShow([country])
}
  
  return (
    <div>
      <h1>Countries</h1>
      <div>find countries: <input onChange={handleChange}/></div>
      <ul>
        {countriesToShow.length > 10 ?
         <p>Too many matches, specify another filter</p> 
         : 
        countriesToShow.length === 1 ?
        <div>
          <h2>{countriesToShow[0].name.common}</h2>
          <p>capital {countriesToShow[0].capital}</p>
          <p>area {countriesToShow[0].area}</p>
          <h3>languages</h3>
          <ul>
            {Object.values(countriesToShow[0].languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={countriesToShow[0].flags.png} alt="flag" />
          <Weather capital={countriesToShow[0].capital} />
        </div>
        :
         countriesToShow.map(country => (
          <li key={country.name.common}>
            {country.name.common} <button onClick={(e) => handleClick(country.name.common,e)}> show</button>
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export default App
