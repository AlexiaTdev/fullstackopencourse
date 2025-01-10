import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'

function App() {
  
  const [countries, setCountries] = useState([])
  const [searchedCountries, setSearchedCountries] = useState([])
  const [detailedCountry, setdetailedCountry] = useState([])
  const [detailedWeather, setDetailedWeather] = useState([])

  const handleSearchChange = (event) => {
    setSearchedCountries(countries.filter((element)=> element.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  const selectCountry = (country) => {
    setSearchedCountries(countries.filter((element)=> element.toLowerCase().includes(country.toLowerCase())));
  }
  useEffect(()=>{
    if (countries.length==0) {
      countriesService.getAll().then(responseCountries => {
        setCountries(responseCountries.map((country)=> {return country.name.common}))
      })
    }
    if (searchedCountries.length==1) {
      countriesService.getCountry(searchedCountries[0].toLowerCase()).then(response => 
        {
          setdetailedCountry({
            name: response.name.common,
            capital: response.capital[0],
            area: response.area,
            languages: Object.values(response.languages),
            flag: response.flags.png
          })
        }
      )
      
    }
  },[searchedCountries])

  useEffect(()=>{
    if (searchedCountries.length==1) {
      weatherService.getWeather(detailedCountry.name, detailedCountry.capital).then(response => 
        {
          setDetailedWeather({
            temp: response.main.temp,
            icon: response.weather[0].icon,
            wind: response.wind.speed,
          })
        }
      )
    }
  },[detailedCountry])

  function addIndexToListObject(list) {
    return list?.map((value, i)=> {return {id:i, value:value}})
  }

  const ListContent = (props) => {
    if(props.listType=='country'){
      return (
      <>
        {addIndexToListObject(props.listValue)?.map((country) => { 
          return  <div>
                    <p key={country.id} style={{display: 'inline-block', minWidth: '17vw'}}>{country.value}</p>
                    <button onClick={()=>{selectCountry(country.value)}} style={{display: 'inline-block', minWidth: '8vw'}}>show</button>
                  </div>
          })}
      </>
      )
    } else if(props.listType=='languages'){
      return(
        <ul>
          {addIndexToListObject(props.listValue)?.map((language) => { return <li key={language.id}>{language.value}</li> })}
        </ul>
      )
    }
  }

  const CountryDetails = (props) => {
    return (
      <>
        <h1>{props.countryDetails.name}</h1>
        <p>capital {props.countryDetails.capital}</p>
        <p>area {props.countryDetails.area}</p>
        <h3>languages:</h3>
        <ListContent listType='languages' listValue={props.countryDetails.languages}/>
        <img src={props.countryDetails.flag}/>
      </>
    )
  }
  
  const WeatherDetails = (props) => {
    var celciusTemp = (props.detailedWeather.temp -273.15).toFixed(2);
    return (
      <>
        <h1>Weather in {props.countryDetails.capital}</h1>
        <p>temperature {celciusTemp} Celcius</p>
        <img src={"https://openweathermap.org/img/wn/"+props.detailedWeather.icon+"@2x.png"}/>
        <p>wind {props.detailedWeather.wind} m/s</p>
      </>
    )
  }
  
  return (
    <>
      <>
        <p style={{display: 'inline-block', minWidth: '8vw'}}>find countries</p>
        <input onChange={handleSearchChange}></input>
      </>
      {(searchedCountries.length>10) ? 
          <p>Too many matches, specify another file</p>
          : (searchedCountries!=[] && searchedCountries.length!=1) ?
            <ListContent listType='country' listValue={searchedCountries}/>
            : (searchedCountries.length==1 && detailedCountry!=[]) ?
              <>
                <CountryDetails countryDetails={detailedCountry}/>
                <WeatherDetails countryDetails={detailedCountry} detailedWeather={detailedWeather}/>
              </>
              : ''
      }
    </>
  )
}

export default App