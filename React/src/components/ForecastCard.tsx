import { useSelector } from 'react-redux'
import { units } from '../assets/constants'
import { weatherIcons } from '../assets/weatherIcons'
import { filterSelector } from '../redux/slices/filter'
import { weatherDataSelector } from '../redux/slices/weather'
import '../styles/ForecastCard.css'
import { forecastType, hourlyForecast } from '../TypeScript/weatherTypes'

interface ForecastCardProps {
    data: hourlyForecast | forecastType,
}

const ForecastCard = ({data}: ForecastCardProps) => {

    const { current } = useSelector(weatherDataSelector) // Se ocupa para extraer las unidades a usar.
    const { forecastOption } = useSelector(filterSelector)

    const icon = weatherIcons[data.weather]
    const dayHour = 'hour' in data ? data.hour : data.day
    const humidity = data.humidity
    const pressure = data.pressure
    const windSpeed = data.windSpeed
    const temperature = data.temperature

    const unitWind = current.units === 'metric' ? 'wind_metric' : 'wind_imperial'
    const unitTemp = current.units === 'metric' ? 'temp_metric' : 'temp_imperial'
    
  return (
    <div className={`forecast-card ${forecastOption === 'hourly' && 'hourly'}`}>
        <div className='forecast-day-hour'>{dayHour}</div>
        <img src={icon} alt="weather-icon" className='forecast-weather-icon' />
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