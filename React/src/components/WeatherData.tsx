import { weatherIcons } from '../assets/weatherIcons'
import '../styles/WeatherData.css'
import test from '../assets/Puebla.jpg'
import { weatherContext } from '../App'
import { useContext } from 'react'

const WeatherData = () => {

  const {weatherData} = useContext(weatherContext)

  return (
    <div className="weather-data-container">
        <img src={weatherData.hasData ? weatherIcons[weatherData.current.icon] : 'Clear' } alt="sun" className='icon' />
        <div className="temperature-container">
          <span className='temperature'>{weatherData.hasData ? weatherData.current.temperature : 20}</span>
          <span className='unit'>°C</span>
        </div>
        <div className="day-hour-container">
            <span>{weatherData.hasData && weatherData.current.day},</span>
            <span className='hour'>16:00</span>
        </div>
        <div className='extra-data-container'>
          <div className='description-icon'>
            <img src={weatherData.hasData ? weatherIcons[weatherData.current.icon] : 'Clear'} alt="icon" className='icon-extra-data' />
            <span>{weatherData.hasData && weatherData.current.description}</span>
          </div>
          <div className='description-icon'>
            <img src={weatherIcons['Humidity']} alt="icon" className='icon-extra-data' />
            <span>Humidity</span>
            <span>-</span>
            <span>{weatherData.hasData && weatherData.current.humidity}%</span>
          </div>
          <div className='city-img-container'>
            <img src={test} className='place-img'></img>
            <div className='img-opacity'></div>
            <span className='city'>{weatherData.hasData && weatherData.current.city}</span>
          </div>
        </div>
    </div>
  )
}

export default WeatherData