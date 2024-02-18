import React from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import { format, fromUnixTime } from 'date-fns';
import { convert } from '@/utils/convert';
import WeatherDetails from './WeatherDetails';
type Props = {
    visibility: number;
    pressure: string | number | undefined;
    humidity: number | undefined;
    speed: number | undefined;
    sunset: number | undefined;
    sunrise: number  | undefined;
    temp_min: number  | undefined;
    temp_max: number | undefined;
    feels_like: number  | undefined;
    icon: string | number;
    day: string | number | undefined;
    temp: number | undefined;
}

export default function WeatherForecast(props: Props) {
    const date =new Date(props.day)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = days[date.getDay()]
    const options  = {  month: '2-digit', day: '2-digit'  }
    const formattedDate = date.toLocaleDateString("en-US", options as any)
  return (
    <Container className="gap-4 my-4" >
        <section className='flex flex-col gap-1 px-4 items-center'>
            <div >
                <WeatherIcon icon={props.icon} imageAlt='weatherIcon'  />
            </div>
            <p>{day}</p>
            <p>{formattedDate}</p>
        </section>
        <section>
        <div className="flex flex-col justify-center p-5 gap-1 w-1/8">
                <h1 className="text-5xl text-center">{convert(props.temp ?? 99)}°</h1> 
                <div className="text-gray-500">
                <p className="text-xs space-x-2 text-center ">Feels like {convert(props.feels_like ?? 99)}°</p>
                <p className="text-xs  flex justify-center  ">
                  <span className="px-1"> {convert(props.temp_max ?? 0)}°↑</span >
                  <span className="px-1"> {convert(props.temp_min ?? 0)}°↓</span>
                </p>
                </div>
        </div>
        </section>
        <section className='flex justify-between w-full px-6 '>
        <WeatherDetails 
              visibility={props.visibility ?? 0} 
              humidity={props.humidity ?? 0}
              wind_speed={props.speed ?? 0}
              pressure={props.pressure}
              sunrise={format(fromUnixTime(props.sunrise ?? 0), "h:mm a")}
              sunset={format(fromUnixTime(props.sunset ?? 0), "h:mm a")}
                 />
        </section>
    </Container>
  )
}