import axios from 'axios'
import { useState, useEffect } from 'react' 

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => {
        setCountry(response.data[0])
      })
      .catch(setCountry(null))
  }, [name])

  return country
}

export default useCountry