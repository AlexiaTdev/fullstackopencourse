import { useState, useEffect } from 'react'
import countriesService from './services/countries'

function addIndexToListObject(list) {
  return list?.map((value, i)=> {return {id:i, value:value}})
}

const ListContent = (props) => {
  if(props.listType=='country'){
    return (
    <>
      {addIndexToListObject(props.listValue)?.map((country) => { return <p key={country.id}>{country.value}</p> })}
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

function App() {
  const [countries, setCountries] = useState([])
  const [searchedCountries, setSearchedCountries] = useState([])
  const [detailedCountry, setdetailedCountry] = useState([])
  const handleSearchChange = (event) => {
    setSearchedCountries(countries.filter((element)=> element.toLowerCase().includes(event.target.value)))

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
              <CountryDetails countryDetails={detailedCountry}/>
              : ''
      }
    </>
  )
}

export default App