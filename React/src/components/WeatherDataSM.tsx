import '../styles/WeatherDataSM.css'
import { weatherIcons } from '../assets/weatherIcons'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { weatherDataSelector } from '../redux/slices/weather'
import { units, weatherDataArray } from '../assets/constants'
import { filterSelector } from '../redux/slices/filter'

const WeatherDataSM = () => {

  const [icon, setIcon] = useState<string>('Clear')
  const {current, hasData} = useSelector(weatherDataSelector)
  const { metricOptions } = useSelector(filterSelector)
  const tempUnit = current.units === 'metric' ? '°C' : '°F'

  useEffect(() => {
    if(!hasData) return undefined
    const generalIcons = ['Tornado', 'Mist'];
    const icon = current.icon
    const isDay = current.dt > current.sunriseDt && current.dt < current.sunsetDt
    !isDay && !generalIcons.includes(current.icon) ? setIcon(icon+'Night') : setIcon(icon)
  }, [current.city])

  return (
    <div className="weather-data-container-SM">
        <div className='weather-data'>
            <img src={weatherIcons[icon]} alt="sun" className='icon mainIcon' />
            <div className='temp-dar-hour'>
                <div className="temperature-container">
                    <span className='temperature'>{hasData ? current.temperature : 20}</span>
                    <span className='unit'>{tempUnit}</span>
                </div>
                <div className="day-hour-container">
                    <span>{hasData && current.day},</span>
                    <span className='hour'>{hasData && current.hour}</span>
                </div>
                <div className='city'>{hasData && current.city}</div>
            </div>
        </div>
        <div className='extra-data-container'>
            <div className='description-icon'>
                <img src={weatherIcons[icon]} alt="icon" className='icon-extra-data' />
                <span>{hasData && current.description}</span>
            </div>
            {
                weatherDataArray.map(({icon, name, variable}) => {
                    return(
                    <div className='description-icon' key={name}>
                        <img src={weatherIcons[icon]} alt="icon" className='icon-extra-data' />
                        <span>{name} </span>
                        <span> - </span>
                        <span> {hasData && current[variable]}{' '}{units[metricOptions][variable]}</span>
                    </div>
                    )
                })
            }
        </div>
    </div>
  )
}
export default WeatherDataSM