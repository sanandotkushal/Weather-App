import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";

import axios from 'axios';
function App() {

  const [search,setSearch]=useState("")
  const [loading,setLoading] = useState(false)
  const [temperature, setTemperature] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [windSpeed, setWindSpeed] = useState(null)
  const [cityName, setCityName] = useState("")
  const [weatherIcon, setWeatherIcon] = useState("01d")

  const API_KEY="8b1c97fc1357938a3036f0dffb82ee87"

  const fetchWeather=async()=>{
    
    if(!search) return;
    setLoading(true)
    try {
      const { data }=await axios.get
      (`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`

      );
      console.log(data);
      if(data.cod==200){
        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setCityName(data.name);
        setWeatherIcon(data.weather[0].icon);
      }
    } catch (error) {
      console.log(error);
      setCityName("City Not Found")
      setTemperature(null)
      setHumidity(null)
      setWindSpeed(null)
      setWeatherIcon("01d")
    }
    setLoading(false);
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-950 to-black text-white">
        {/* search bar & icon */}
        <div className="flex items-center bg-white rounded-full px-4 py-2 mb-6 w-80 shadow-lg">
          <input 
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className=" flex-1 text-black outline-none px-2" />
          <FaSearch onClick={fetchWeather} className="text-gray-500 cursor-pointer" />
        </div>

        {/* weather icon */}
        <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="weather icon"  className="w-20 h-20 mb-4" />

        {/* Temperture & City Name */}
        <h1 className="text-4xl font-bold mb-1">{loading?"loading...":temperature!==null?`${temperature}℃`:"--"}</h1>
        <h2 className="text-2xl mt-2 font-semibold">{cityName || "type to check temperature"}</h2>

        {/* Humidity & Wind Speed */}
        <div className="w-full max-w-md mt-7 flex flex-col md:flex-row items-center justify-between md:items-start">
          <div className="flex flex-col items-center">
            <WiHumidity className="text-3xl" />
            <span className="text-lg font-medium">{humidity!==null?`${humidity}%`:"--"}</span>
            <p className="text-sm">Humidity</p>
          </div>
          <div className="flex flex-col items-center">
            <WiStrongWind className="text-3xl" />
            <span className="text-lg font-medium">{windSpeed!==null?`${windSpeed}km/h`:"--"}</span>
            <p className="text-sm">Wind Speed</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
