import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { units } from '../assets/constants'
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

const ForecastCard = ({data}: ForecastCardProps) => {

    const windowSize = useWindowSize()

    const { current } = useSelector(weatherDataSelector) // Se ocupa para extraer las unidades a usar.
    const { forecastOption } = useSelector(filterSelector)

    const [icon, setIcon] = useState<string>('Clear')
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
    const windSpeed = data.windSpeed
    const temperature = data.temperature

    const unitWind = current.units === 'metric' ? 'wind_metric' : 'wind_imperial'
    const unitTemp = current.units === 'metric' ? 'temp_metric' : 'temp_imperial'
    
  return (
    <div className={forecastCardClasses}>
        <div className='forecast-day-hour'>{formattedDate} {hour}</div>
        <img src={weatherIcons[icon]} alt="weather-icon" className='forecast-weather-icon' />
        <div className='weather-data-forecast'>
            <div className='forecast-pressure-humidity'>
                <span>
                    <img src={weatherIcons['Humidity']} alt="Humidity-icon" />
                    {humidity} {units['humidity']}
                </span>
                <span>
                    <img src={weatherIcons['Barometer']} alt="Humidity-icon" />
                    {pressure} {units['pressure']}
                </span>
                <span>
                    <img src={weatherIcons['WindSpeed']} alt="Humidity-icon" />
                    {windSpeed} {units[unitWind]}
                </span>
            </div>
            <div className="temperature-container">
                <span className='temperature'>{temperature}</span>
                <span className='unit'>{units[unitTemp]}</span>
            </div>
        </div>
    </div>
  )
}

export default ForecastCard