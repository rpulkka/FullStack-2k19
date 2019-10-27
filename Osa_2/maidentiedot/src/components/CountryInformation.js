import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInformation = (props) => {
    const languages = props.list[0].languages
    const languageNames = languages.map(language => <li key={language.name}>{language.name}</li>)
    const address = 'http://api.weatherstack.com/current?access_key=b2c17d7fe10f122218b0cab4383a03f7&query='+props.list[0].capital

    const [ temperature, setTemperature ] = useState('')
    const [ windSpeed, setWindSpeed ] = useState('')
    const [ windDegree, setWindDegree ] = useState('')
    const [ weatherIcon, setWeatherIcon ] = useState('')
  
    useEffect(() => {
      axios
        .get(address)
        .then(response => {
          setTemperature(response.data.current.temperature)
          setWindSpeed(response.data.current.wind_speed)
          setWindDegree(response.data.current.wind_degree)
          setWeatherIcon(response.data.current.weather_icons[0])
        })
    }, [])
    

    return(
        <div>
            <h1>{props.list[0].name}</h1>
            Capital: {props.list[0].capital} <br/>
            Population: {props.list[0].population} <br/>
            <h2>Languages</h2>
            <ul>
                {languageNames}
            </ul>
            <br/>
            <img src={props.list[0].flag} alt="Problem occured." height="15%" width="15%"></img>
            <br/>
            <h2>Weather in {props.list[0].capital}</h2>
            Temperature: {temperature} celsius<br/><br/>
            <img src={weatherIcon} alt="Problem occured."></img><br/><br/>
            Wind: {windSpeed} kph, {windDegree} degrees
        </div>
    )
}

export default CountryInformation