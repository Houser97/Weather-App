import { useDispatch, useSelector } from 'react-redux'
import { capitalizeFirstLetter } from '../assets/apiWeatherFunctions'
import { FORECAST_OPTIONS } from '../assets/constants'
import { filterSelector, updateForecastFilter } from '../redux/slices/filter'
import '../styles/ForecastOptions.css'

const ForecastOptions = () => {

    const dispatch = useDispatch()
    
    const { forecastOption } = useSelector(filterSelector)

  return (
    <div className='ForecastOptions-container'>
        {
            FORECAST_OPTIONS.map((option, index) => {
                return(
                    <div 
                     className={`forecast-option ${option === forecastOption && 'selected'}`}
                     onClick={() => dispatch(updateForecastFilter(option))}
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