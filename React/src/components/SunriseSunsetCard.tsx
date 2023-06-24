import { useSelector } from 'react-redux'
import { capitalizeFirstLetter, getHourFromDT } from '../assets/apiWeatherFunctions'
import { weatherIcons } from '../assets/weatherIcons'
import { weatherDataSelector } from '../redux/slices/weather'
import '../styles/SunriseSunsetCard.css'

interface props {
  title: string,
  valueTarget1: string,
  valueTarget2: string,
  type: string
}

const SunriseSunsetCard = ({title, valueTarget1, valueTarget2, type}: props) => {

  const { current } = useSelector(weatherDataSelector)
  const value1 = type === 'hour' ? getHourFromDT(Number(current[valueTarget1])) : current[valueTarget1]
  const value2 = type === 'hour' ? getHourFromDT(Number(current[valueTarget2])) : current[valueTarget2]
  const nameValue1 = capitalizeFirstLetter(valueTarget1)
  const nameValue2 = capitalizeFirstLetter(valueTarget2)
  const unit = type === 'temperature' ? '°C' : ''

  return (
    <div className='datacard-container'>
        <h3>{title}</h3>
        <div className='icon-value'>
            <img src={weatherIcons[nameValue1]} alt="icon" />
            <div className='sunrise-hour'>
              <div className='sunrise-sunset-value'>{value1} {unit}</div>
              {nameValue1}
            </div>
        </div>
        <div className='icon-value'>
            <img src={weatherIcons[nameValue2]} alt="icon" />
            <div className='sunrise-hour'>
              <div className='sunrise-sunset-value'>{value2} {unit}</div>
              {nameValue2}
            </div>
        </div>
    </div>
  )
}

export default SunriseSunsetCard