import { useDispatch, useSelector } from 'react-redux'
import { capitalizeFirstLetter } from '../assets/apiWeatherFunctions'
import { FORECAST_OPTIONS } from '../assets/constants'
import { filterSelector, updateForecastFilter } from '../redux/slices/filter'
import { setIsLoading } from '../redux/slices/weather'
import '../styles/ForecastOptions.css'

const ForecastOptions = () => {

    const dispatch = useDispatch()
    
    const { forecastOption } = useSelector(filterSelector)

    const handleClick = (option: string) => {
        dispatch(setIsLoading(true))
        dispatch(updateForecastFilter(option))
        setTimeout(() => {
            dispatch(setIsLoading(false))
        }, 300);
    }

  return (
    <div className='ForecastOptions-container'>
        {
            FORECAST_OPTIONS.map((option, index) => {
                return(
                    <div 
                     className={`forecast-option ${option === forecastOption && 'selected'}`}
                     onClick={() => handleClick(option)}
                     key={`forecast-option-${index}`}
                    >
                        {capitalizeFirstLetter(option)}
                        <span></span>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ForecastOptions