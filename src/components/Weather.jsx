// import React from 'react'
// import './Weather.css'
// import search_icon from '../assets/'
// import clear_icon from './assets/assets/clear.png'
// import drizzle_icon from './assets/assets/drizzle.png'
// import rain_icon from './assets/assets/rain.png'
// import snow_icon from './assets/assets/snow.png'
// import wind_icon from './assets/assets/wind.png'
// import humidity_icon from './assets/assets/humidity.png'



// const Weather = () => {
//   return (
    
//       <div className='weather'>
//         <div className='search-bar'>
//           <input type='text' placeholder='Search'/>
//           <img src="../assets/search.png" alt='' />
//         </div>
//         <img src={clear_icon} alt='' className='weather-icon'/>
//         <p className='temperature'> 16c</p>
//         <p className='location'>London</p>
//       </div>
    
//   )
// }

// export default Weather

// import React, {useEffect, useState} from 'react'
// import './Weather.css'
// import search_icon from '../assets/search.png'
// import clear_icon from '../assets/clear.png'
// import drizzle_icon from '../assets/drizzle.png'
// import rain_icon from '../assets/rain.png'
// import snow_icon from '../assets/snow.png'
// import wind_icon from '../assets/wind.png'
// import humidity_icon from '../assets/humidity.png'
// import { useEffect } from 'react'

// const Weather = () => {

//   const [weatherData, setWeatherData] = useState(false);

//   const allIcons = {
//     "01d": clear_icon,
//     "01n": clear_icon,
//     "02d": cloud_icon,
//     "02n": cloud_icon,
//     "03d": cloud_icon,
//     "03n": cloud_icon,
//     "04d": drizzle_icon,
//     "04n": drizzle_icon,
//     "09d": rain_icon,
//     "09n": rain_icon,
//     "10d": rain_icon,
//     "10n": rain_icon,
//     "13d": snow_icon,
//     "13n": snow_icon,
//   }

//   const search = async (city)=>{
//      try{
//        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

//        const response = await fetch(url);
//        const data = await response.json();
//        console.log(data);
//        const icon = allIcons[data.weather[0].icon] || clear_icon;
//        setWeatherData({
//         humidity: data.main.humidity,
//         windSpeed: data.wind.speed,
//         temperature: Math.floor(data.main.temp),
//         location: data.name,
//         icon: icon
//        })

//      }catch(error){

//      }
//   }

//   useEffect(()=>{
//     search("New York");
//   },[])

//   return (
//     <div className='weather'>
//       <div className='search-bar'>
//         <input type='text' placeholder='Search'/>
//         <img src={search_icon} alt='search' />
//       </div>
//       <img src={weatherData.icon} alt='' className='weather-icon'/>
//       <p className='temperature'>{weatherData.temperature}℃</p>
//       <p className='location'>{weatherData.location}</p>
//       <div className='weather-data'>
//         <div className='col'>
//           <img src={humidity_icon} alt="" />
//           <div>
//             <p> {weatherData.humidity} % </p>
//             <span> Humidity </span>
//           </div>
//         </div>
//         <div className='col'>
//           <img src={wind_icon} alt="" />
//           <div>
//             <p> {weatherData.windSpeed} Km/h </p>
//             <span> Wind Speed </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Weather

import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import { VITE_APP_ID } from '../config'



const Weather = () => {
const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('New York')

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  const search = async (searchCity) => {
    try {
      if(searchCity === ""){
        alert("Enter the City Name")
        return;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${VITE_APP_ID}`
      const response = await fetch(url)
      const data = await response.json()

      if (data.cod !== 200) {
        throw new Error(data.message)
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
      setError(null)
    } catch (error) {
      setError(error.message)
      setWeatherData(null)
    }
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const searchValue = e.target.value.trim()
      if (searchValue) {
        setCity(searchValue)
        search(searchValue)
      }
    }
  }

  useEffect(() => {
    search(city)
  }, [])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input 
        ref={inputRef}
          type='text' 
          placeholder='Search'
          onKeyDown={handleSearch}
        />
        <img src={search_icon} alt='search' onClick={()=>search(inputRef.current.value)} />
      </div>
      {error && <p className='error'>{error}</p>}
      {weatherData && (
        <>
          <img src={weatherData.icon} alt='weather' className='weather-icon'/>
          <p className='temperature'>{weatherData.temperature}℃</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt="wind speed" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather