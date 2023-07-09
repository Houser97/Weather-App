import { weatherIcons } from '../assets/weatherIcons'
import '../styles/WeatherData.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { weatherDataSelector } from '../redux/slices/weather'
import { weatherDataArray } from '../assets/constants'

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
        <span className='city'>{hasData && current.city}</span>
        <div className='extra-data-container'>
          <div className='description-icon'>
            <img src={weatherIcons[icon]} alt="icon" className='icon-extra-data' />
            <span>{hasData && current.description}</span>
          </div>
        {
          weatherDataArray.map(({icon, name}) => {
            return(
              <div className='description-icon' key={name}>
                <img src={weatherIcons[icon]} alt="icon" className='icon-extra-data' />
                <span>{name} </span>
                <span> - </span>
                <span> {hasData && current.pressure}%</span>
              </div>
            )
          })
        }
        </div>
    </div>
  )
}

export default WeatherData