import { weatherIcons } from '../assets/weatherIcons'
import '../styles/WeatherData.css'
import test from '../assets/Puebla.jpg'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { weatherDataSelector } from '../redux/slices/weather'

const WeatherData = () => {

  const [icon, setIcon] = useState<string>('Clear')
  const {current, hasData} = useSelector(weatherDataSelector)
  const tempUnit = current.units === 'metric' ? '°C' : '°F'

  useEffect(() => {
    if(!hasData) return undefined
    const generalIcons = ['Tornado', 'Mist'];
    const icon = current.icon
    const isDay = current.dt > current.sunriseDt && current.dt < current.sunsetDt
    !isDay && !generalIcons.includes(current.icon) ? setIcon(icon+'Night') : setIcon(icon)
  }, [current.city])

  return (
    <div className="weather-data-container">
        <img src={weatherIcons[icon]} alt="sun" className='icon' />
        <div className="temperature-container">
          <span className='temperature'>{hasData ? current.temperature : 20}</span>
          <span className='unit'>{tempUnit}</span>
        </div>
        <div className="day-hour-container">
            <span>{hasData && current.day},</span>
            <span className='hour'>{hasData && current.hour}</span>
        </div>
        <div className='extra-data-container'>
          <div className='description-icon'>
            <img src={weatherIcons[icon]} alt="icon" className='icon-extra-data' />
            <span>{hasData && current.description}</span>
          </div>
          <div className='description-icon'>
            <img src={weatherIcons['Humidity']} alt="icon" className='icon-extra-data' />
            <span>Humidity</span>
            <span>-</span>
            <span>{hasData && current.humidity}%</span>
          </div>
          <div className='city-img-container'>
            <img src={test} className='place-img'></img>
            <div className='img-opacity'></div>
            <span className='city'>{hasData && current.city}</span>
          </div>
        </div>
    </div>
  )
}

export default WeatherData