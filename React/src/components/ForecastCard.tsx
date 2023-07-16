import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { units, weatherDataArray } from '../assets/constants'
import useWindowSize from '../assets/hooks/windowSize'
import { weatherIcons } from '../assets/weatherIcons'
import { filterSelector } from '../redux/slices/filter'
import { weatherDataSelector } from '../redux/slices/weather'
import '../styles/ForecastCard.css'
import { forecastType, hourlyForecast } from '../TypeScript/weatherTypes'
import { DateTime } from 'luxon';

interface ForecastCardProps {
    data: hourlyForecast | forecastType,
}

interface valuesType {
    [index: string]: number,
    humidity: number,
    pressure: number,
    wind: number
}

const ForecastCard = ({data}: ForecastCardProps) => {

    const windowSize = useWindowSize()

    const { current } = useSelector(weatherDataSelector) // Se ocupa para extraer las unidades a usar.
    const { forecastOption, metricOptions } = useSelector(filterSelector)

    const [icon, setIcon] = useState<string>('')
    const [forecastCardClasses, setForecastCardClasses] = useState(`forecast-card ${forecastOption === 'hourly' && 'hourly'} 
    ${forecastOption !== 'hourly' && windowSize.width < 2560 && 'daily-sm'}`)

    useEffect(() => {
        const generalIcons = ['Tornado', 'Mist'];
        const icon = data.weather
        const isDay = data.dt > data.sunrise && data.dt < data.sunset
        !isDay && !generalIcons.includes(icon) ? setIcon(icon+'Night') : setIcon(icon)
    }, [current.city])

    useEffect(() => {
        setForecastCardClasses(`forecast-card ${forecastOption === 'hourly' && 'hourly'} 
        ${forecastOption !== 'hourly' && windowSize.width < 2560 && 'daily-sm'}`)
    }, [forecastOption, windowSize.width])

    const hour = 'hour' in data ? data.hour : '' 
    const date = DateTime.fromFormat(data.date, 'M/d/yyyy', { locale: 'en-US' })
    const format = hour === '' ? 'EEEE, MMM d' : 'EEE MMM d, '
    const formattedDate = date.toFormat(format);
    const humidity = data.humidity
    const pressure = data.pressure
    const wind = data.windSpeed
    const temperature = data.temperature

    const value: valuesType = {
        humidity,
        pressure,
        wind
    }

  return (
    <div className={forecastCardClasses}>
        <div className='forecast-day-hour'>{formattedDate} {hour}</div>
        <img src={weatherIcons[icon]} alt="weather-icon" className='forecast-weather-icon' />
        <div className='weather-data-forecast'>
            <div className='forecast-pressure-humidity'>
            {
                weatherDataArray.map(({icon, variable}, index) => {
                    return(
                        <span key={`forecast-card-${hour}-${variable}.${index}`}>
                            <img src={weatherIcons[icon]} alt="icon" />
                            {value[variable]} {units[metricOptions][variable]}
                        </span>
                    )
                })
            }
            </div>
            <div className="temperature-container">
                <span className='temperature'>{temperature}</span>
                <span className='unit'>{units[metricOptions]['temperature']}</span>
            </div>
        </div>
    </div>
  )
}

export default ForecastCard