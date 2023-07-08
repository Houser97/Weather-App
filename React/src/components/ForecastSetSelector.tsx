import { Dispatch, SetStateAction } from 'react'
import { forecastDailySet } from '../assets/constants'
import '../styles/ForecastSetSelector.css'

interface setSelectorProp {
    setCurrentSet: Dispatch<SetStateAction<string>>
    currentSet: string
    visible: boolean
}

const ForecastSetSelector = ({setCurrentSet, currentSet, visible}: setSelectorProp) => {
  return (
    <div className={`${visible ? 'set__selector' : 'hide__selector'}`}>
        {
            forecastDailySet.map(({set, number}) => {
                return(
                    <button 
                     className={`button__set ${currentSet === set && 'set__selected'}`}
                     onClick={() => setCurrentSet(set)}>
                        {number}
                    </button>
                )
            })
        }
    </div>
  )
}

export default ForecastSetSelector