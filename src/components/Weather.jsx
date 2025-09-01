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

import React from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

  const search = async (city)=>{
     try{
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`
     }catch(e){

     }
  }
  return (
    <div className='weather'>
      <div className='search-bar'>
        <input type='text' placeholder='Search'/>
        <img src={search_icon} alt='search' />
      </div>
      <img src={clear_icon} alt='weather' className='weather-icon'/>
      <p className='temperature'>16℃</p>
      <p className='location'>London</p>
      <div className='weather-data'>
        <div className='col'>
          <img src={humidity_icon} alt="" />
          <div>
            <p> 91 % </p>
            <span> Humidity </span>
          </div>
        </div>
        <div className='col'>
          <img src={wind_icon} alt="" />
          <div>
            <p> 3.6 Km/h </p>
            <span> Wind Speed </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
