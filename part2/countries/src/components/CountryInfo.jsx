import React from 'react'
import Weather from './Weather'

const CountryInfo = ({ country, name, capital, area, languages, flag }) => {
    const langs = []
    for(const l in languages){
      langs.push(languages[l])
    }
    
    return(
      <div>
        <h2>{name}</h2>
        <h3>Capital</h3>
        <p>{capital}</p>
        <h3>Area</h3>
        <p>{area} {"\u33A2"}</p>
        <h3>Languages</h3>
        <ul>
          {langs.map(l => <li key={l}>{l}</li>)}
        </ul>
        <img src={flag}></img>
        <Weather country={country} />
  
      </div>
    )
  }
  export default CountryInfo