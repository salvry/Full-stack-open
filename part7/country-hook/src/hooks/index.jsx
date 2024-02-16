import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)


    useEffect(() => {
        if (name) {
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
                .then(response => {

                    setCountry({ data: response.data, found: true })

                })
                .catch(error => {
                    setCountry({ data: null, found: false })
                })

        }


    }, [name])


    return country


}


