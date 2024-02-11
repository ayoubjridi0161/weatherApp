"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import Container from "@/components/Container";
import { convert } from "@/utils/convert";
import { list } from "postcss";


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
    const { isLoading, error, data } = useQuery<WeatherData>('repoData', async() => {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Kairouan&APPID=54cefeff0f4c1f1c05e4d7f9d19aa55f&cnt=56`)
      return data
    })
    console.log(data)
  
  if (isLoading) return 'Loading...'
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
    

  return (
    <div className="flex-col gap-4 flex bg-gray-100 min-h-screen">
      <Navbar city={data?.city.name} />
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
                {data?.list.map((item, index) => 
                (
                  <div key={index} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                    <p>
                      {convert(item.main.temp)}
                    </p>
                  </div>
                ))}
                

                
              </div>
            </Container>
          </div>
        </section>
        {/*7 days data*/}
      </main>
    </div>
    );
}
