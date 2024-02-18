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
  
 export function filterUniqueDates(weatherEntries: WeatherEntry[]): WeatherEntry[] {
    const uniqueDates: { [date: string]: WeatherEntry } = {};
  
    for (const entry of weatherEntries) {
      // Extract the date part of dt_txt
      const date = entry.dt_txt.split(' ')[0];
  
      // If this date hasn't been seen before, add the entry to uniqueDates
      if (!uniqueDates[date]) {
        uniqueDates[date] = entry;
      }
    }
  
    // Return the unique date entries as an array
    return Object.values(uniqueDates);
  }
  
  // Usage:
  // const weatherEntries: WeatherEntry[] = [...]; // your weather data
  // const uniqueDateEntries = filterUniqueDates(weatherEntries);