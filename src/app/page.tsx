"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";


  //https://api.openweathermap.org/data/2.5/forecast?q=kairouan&APPID=54cefeff0f4c1f1c05e4d7f9d19aa55f&cnt=56
  interface WeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherEntry[];
    city: CityInfo;
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
    const { isLoading, error, data } = useQuery<WeatherEntry>('repoData', async() => {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=kairouan&APPID=${process.env.WEATHER_API_KEY}&cnt=56`)
      return data
    })
    console.log(data)
  
  if (isLoading) return 'Loading...'
  return (
    <div className="flex-col gap-4 flex bg-gray-100 min-h-screen">
      <Navbar />
    </div>
    );
}
