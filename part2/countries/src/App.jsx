import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import CountryRows from './components/CountryRows'

            
function App() {
  const [allCountries, setAllCountries] = useState([])
  const [newSearchName, setNewSearchName] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

const handleCountrySearchChange = (event) => {

  setNewSearchName(event.target.value)
  }
  
  const filtered = allCountries.filter(country => country.name.common.toLowerCase().startsWith(newSearchName.toLowerCase()))

  const handleShowButtonClick = (countryName) => {
      setNewSearchName(countryName)
      filtered.find(c => c.name.common === newSearchName)
      
    }

  return (
    <div>
      <h1>Country database</h1>
      <Search searchName={newSearchName} handle={handleCountrySearchChange} />
      <CountryRows countries={filtered} handleShowButtonClick={handleShowButtonClick} />
    </div>
  )

}
export default App