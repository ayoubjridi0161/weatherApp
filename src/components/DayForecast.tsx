import axios from 'axios'
import React, { use, useEffect } from 'react'

type Props = {}

export default function DayForecast({}: Props) {
    //api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}
    const [data, setData] = React.useState({})
    useEffect( () => {
        async function fetchData() {
        const {data} = await axios.get(`
        api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}`)
        setData(data)
        }
        fetchData()
    }, [])
  return (
    <div>

    </div>
  )
}