import React from 'react'
import { LuEye } from "react-icons/lu";
import { FaWind } from "react-icons/fa6";
import { TbDroplet } from "react-icons/tb";
import { IoMdSpeedometer } from "react-icons/io";
import { LuSunrise } from "react-icons/lu";
import { LuSunset } from "react-icons/lu";
type Props = {
  
    visibility: string | number | undefined;
    humidity: string | number | undefined;
    wind_speed: string | number | undefined;
    pressure: string | number | undefined;
    sunrise: string | number | undefined;
    sunset: string | number | undefined;
  
}

export default function WeatherDetails(props : Props) {
  return (
    <>
      <SingleWeatherDetails icon={<LuEye />} information='Visibility' value={`${Number(props.visibility)/1000}km`} />
      <SingleWeatherDetails icon={<TbDroplet />} information='Humidity' value ={ `${props.humidity}%` } />
      <SingleWeatherDetails icon={<FaWind />} information='Windspeed ' value ={`${props.wind_speed }km/h`}  />
      <SingleWeatherDetails icon={<IoMdSpeedometer />} information='Air Pressure' value = {`${props.pressure} hPA`}  />
      <SingleWeatherDetails icon={<LuSunrise />} information='Sunrise'  value ={`${props.sunrise}` } />
      <SingleWeatherDetails icon={<LuSunset />} information='Sunset'   value ={`${props.sunset}`} />

      
    </>

    )
}
export interface SingleWeatherDetails{  
  information: string;
  icon: React.ReactNode;
  value: string;

}
function SingleWeatherDetails(props : SingleWeatherDetails){
  return(
    <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
      <p className='whitespace-nowrap'>{props.information}</p>
      <div className='text-3xl'>{props.icon} </div>
      <p>{props.value}</p>


    </div>
  )
}