import { weatherIcons } from '../assets/weatherIcons'
import '../styles/ForecastCard.css'
import { forecastType } from '../TypeScript/weatherTypes'

interface ForecastCardProps {
    data: forecastType,
    forecastType: string
}

const ForecastCard = ({data, forecastType}: ForecastCardProps) => {

    const icon = weatherIcons[data.weather]
    const date = data.date
    const temperature = data.temperature
    console.log(icon)
    
  return (
    <div className='forecast-card'>
        <div className='forecast-day-hour'>{date}</div>
        <img src={icon} alt="weather-icon" className='forecast-weather-icon' />
        <div className='weather-data-forecast'>
            <div className='forecast-pressure-humidity'>
                <span>12</span>
                <span>23</span>
            </div>
            <span className='forecast-temperature'>{temperature}</span>
        </div>
    </div>
  )
}

export default ForecastCard