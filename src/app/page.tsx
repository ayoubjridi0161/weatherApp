"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import Container from "@/components/Container";
import { convert } from "@/utils/convert";
import "./loader.css";
import { list } from "postcss";
import { format, fromUnixTime } from 'date-fns';
import WeatherIcon from "@/components/WeatherIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { convertUnixToTime } from "@/utils/convertTime";
import WeatherForecast from "@/components/WeatherForecast";
import { filterUniqueDates } from "@/utils/spliceDays";
import { useState } from "react";
  //https://api.openweathermap.org/data/2.5/forecast?q=kairouan&APPID=54cefeff0f4c1f1c05e4d7f9d19aa55f&cnt=56
  interface WeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherEntry[];
    city: CityInfo;
  }
  type Options =  {
    year : String
    month : String
    day : String
  }
  
  interface WeatherEntry {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Weather[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }
  
  interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface CityInfo {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }

  export default function Home() {
    const [city, setCity] = useState('kairouan')
    const { isLoading, error, data } = useQuery<WeatherData>('repoData', async() => {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=54cefeff0f4c1f1c05e4d7f9d19aa55f&cnt=56`)
      return data
    })
    console.log(data)
  if (error) return "error 404"
  if (isLoading) return (
    <div className="container">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
  )
  const CurrentDate = ({CityDate} : any)=>{
    const date =new Date(CityDate)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = days[date.getDay()]
    const options : Options = { year: '2-digit', month: '2-digit', day: '2-digit' }
    const formattedDate = date.toLocaleDateString("en-US", options as any)
    return (
      <h2 className="flex gap-2 items-end text-2xl mb-3">
      <p >{day}</p>
      <p className="text-lg">({formattedDate})</p>
      </h2>
    )


  }
  console.log(city)

    

  return (
    <div className="flex-col gap-4 flex bg-gray-100 min-h-screen">
      <Navbar submitValue={(v)=>{setCity(v)}} city={data?.city.name} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col w-full pb-10 pt-4">
        {/*today's data*/}
        <section className="space-y-4">
          <div className="space-y-2">
            <CurrentDate CityDate={data?.list[0].dt_txt}  />
            <Container className="gap-10 px-6 ">
              {/*TEMP*/}
              <div className="flex flex-col justify-center p-5 gap-1 w-1/6">
                <h1 className="text-5xl text-center">{convert(data?.list[0].main.temp ?? 99)}°</h1> 
                <div className="text-gray-500">
                <p className="text-xs space-x-2 text-center ">Feels like {convert(data?.list[0].main.feels_like ?? 99)}°</p>
                <p className="text-xs  flex justify-center  ">
                  <span className="px-1"> {convert(data?.list[0].main.temp_max ?? 0)}°↑</span >
                  <span className="px-1"> {convert(data?.list[0].main.temp_min ?? 0)}°↓</span>
                </p>
                </div>
              </div>
              {/*weather & Time*/}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.slice(0,7).map((item, index) => 
                (
                  <div key={index} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                    <p className="text-nowrap">{format(item.dt_txt,"h:mm a")}</p>
                    <WeatherIcon icon={item.weather[0].icon} imageAlt={item.weather[0].description} />
                    <p>{convert(item.main.temp ) ?? 0}°C</p>
                  </div>
                ))}                
              </div>
            </Container>
          </div>
          <div className="flex gap-4 ">
            <Container className="w-fit justify-center flex-col px-4 items-center ">
                <p>{data?.list[0].weather[0].main}</p>
                <WeatherIcon  icon={data?.list[0].weather[0].icon ?? 0} imageAlt={data?.list[0].weather[0].description ?? ""} />
            </Container>
            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDetails 
              visibility={data?.list[0].visibility ?? 0} 
              humidity={data?.list[0].main.humidity ?? 0}
              wind_speed={data?.list[0].wind.speed ?? 0}
              pressure={data?.list[0].main.pressure}
              sunrise={format(fromUnixTime(data?.city.sunrise ?? 0), "h:mm a")}
              sunset={format(fromUnixTime(data?.city.sunset ?? 0), "h:mm a")}
                 />
            </Container>
          </div>
        </section>
        {/*7 days data*/}
        
        <section className="flex w-full flex-col gap-4 mt-4">
        {filterUniqueDates(data?.list.slice(1) || []).map((item, index ) => (
            <WeatherForecast key={index} visibility={item.visibility ?? 0} pressure={item.main.pressure} humidity={item.main.humidity} speed={item.wind.speed} sunset={data?.city.sunset} sunrise={data?.city.sunrise} temp_min={item.main.temp_min} temp_max={item.main.temp_max} feels_like={item.main.feels_like} icon={item.weather[0].icon} day={item.dt_txt} temp={item.main.temp} />
        ))}
        </section>
      </main>
    </div>
    );
}
