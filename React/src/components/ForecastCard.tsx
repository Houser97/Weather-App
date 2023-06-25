import { weatherIcons } from '../assets/weatherIcons'
import '../styles/ForecastCard.css'
import { forecastType, hourlyForecast, hourlyType } from '../TypeScript/weatherTypes'

interface ForecastCardProps {
    data: hourlyForecast | forecastType,
}

const ForecastCard = ({data}: ForecastCardProps) => {

    const icon = weatherIcons[data.weather]
    const dayHour = 'hour' in data ? data.hour : data.day
    const humidity = data.humidity
    const pressure = data.pressure
    const windSpeed = data.windSpeed
    const temperature = data.temperature
    
  return (
    <div className='forecast-card'>
        <div className='forecast-day-hour'>{dayHour}</div>
        <img src={icon} alt="weather-icon" className='forecast-weather-icon' />
        <div className='weather-data-forecast'>
            <div className='forecast-pressure-humidity'>
                <span>
                    <img src={weatherIcons['Humidity']} alt="Humidity-icon" />
                    {humidity} %
                </span>
                <span>
                    <img src={weatherIcons['Barometer']} alt="Humidity-icon" />
                    {pressure} hPa
                </span>
                <span>
                    <img src={weatherIcons['WindSpeed']} alt="Humidity-icon" />
                    {windSpeed} km/h
                </span>
            </div>
            <div className="temperature-container">
                <span className='temperature'>{temperature}</span>
                <span className='unit'>°C</span>
            </div>
        </div>
    </div>
  )
}

export default ForecastCard