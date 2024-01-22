import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Weather = ( { country }) => {
    const [temp, setTemp] = useState([])
    const [wind, setWind] = useState([])
    const [iconId, setIconId] = useState('')
    

     const apiKey = import.meta.env.VITE_API_KEY
     const capital = country.capital
     const lat = JSON.parse(country.latlng[0])
     const lng = JSON.parse(country.latlng[1])
     useEffect(() => {
       axios
           .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`)
           .then(response => {
              setTemp(response.data.main.temp)
              setWind(response.data.wind.speed)
              setIconId(response.data.weather[0].icon)
           })
   }, [])
  
     
     const celsius = parseInt(temp-273.15)
     return(
       <div>
         <h3>Weather in {capital}</h3>
         <p>Temperature: {celsius} Celsius</p>
         <img src={`https://openweathermap.org/img/w/${iconId}.png`}></img>
         <p>Wind: {wind} m/s</p>
       </div>
     )
   
   }

   export default Weather