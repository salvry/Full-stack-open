import React from 'react'
import CountryInfo from './CountryInfo'


const CountryRows = ({ countries, handleShowButtonClick }) => {
    if(countries.length > 10){
      return(
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
    if(countries.length === 1){
      const country = countries[0]
      
      return(
        <div>
          <CountryInfo  country={country} name={country.name.common} capital={country.capital} area={country.area} languages={country.languages} flag={country.flags['png']}/>
        </div>
      )
    }
    return(
      <div>
        <ul>
          {countries.map(c => <li key={c.name.common}>{c.name.common}
          <br></br>
          <button onClick={()=>handleShowButtonClick(c.name.common)}>Show</button></li>)}
        </ul>
      </div>
    )
  }
  export default CountryRows