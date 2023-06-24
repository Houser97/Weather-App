import { useSelector } from 'react-redux'
import { getHourFromDT } from '../assets/apiWeatherFunctions'
import { weatherIcons } from '../assets/weatherIcons'
import { weatherDataSelector } from '../redux/slices/weather'
import '../styles/SunriseSunsetCard.css'

const SunriseSunsetCard = () => {

  const { current } = useSelector(weatherDataSelector)
  const sunset = getHourFromDT(current.sunset)
  const sunrise = getHourFromDT(current.sunrise)

  return (
    <div className='datacard-container'>
        <h3>Sunrise & Sunset</h3>
        <div className='icon-value'>
            <img src={weatherIcons['Sunrise']} alt="icon" />
            <div className='sunrise-hour'>
              <div className='sunrise-sunset-value'>{sunrise}</div>
              Sunrise
            </div>
        </div>
        <div className='icon-value'>
            <img src={weatherIcons['Sunset']} alt="icon" />
            <div className='sunrise-hour'>
              <div className='sunrise-sunset-value'>{sunset}</div>
              Sunset
            </div>
        </div>
    </div>
  )
}

export default SunriseSunsetCard