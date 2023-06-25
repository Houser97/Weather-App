import { useSelector } from 'react-redux'
import { capitalizeFirstLetter } from '../assets/apiWeatherFunctions'
import { weatherIcons } from '../assets/weatherIcons'
import { weatherDataSelector } from '../redux/slices/weather'
import '../styles/DataCard.css'

interface props {
  title: string,
  valueTarget1: string,
  valueTarget2: string,
  type: string
}

const getSecondWord = (word: string) => {
  const wordArray = word.split(/(?=[A-Z])/)
  return wordArray.length === 2 ? wordArray[1] : wordArray[0]
}

const DataCard = ({title, valueTarget1, valueTarget2, type}: props) => {

  const { current } = useSelector(weatherDataSelector)
  const value1 = current[valueTarget1]
  const value2 = current[valueTarget2]
  const Icon1 = capitalizeFirstLetter(valueTarget1)
  const Icon2 = capitalizeFirstLetter(valueTarget2)
  const Description1 = getSecondWord(Icon1)
  const Description2 = getSecondWord(Icon2)
  const unit = type === 'temperature' ? '°C' : ''

  return (
    <div className='datacard-container'>
        <h3>{title}</h3>
        <div className='icon-value'>
            <img src={weatherIcons[Icon1]} alt="icon" />
            <div className='sunrise-hour'>
              <div className='sunrise-sunset-value'>{value1} {unit}</div>
              {Description1}
            </div>
        </div>
        <div className='icon-value'>
            <img src={weatherIcons[Icon2]} alt="icon" />
            <div className='sunrise-hour'>
              <div className='sunrise-sunset-value'>{value2} {unit}</div>
              {Description2}
            </div>
        </div>
    </div>
  )
}

export default DataCard