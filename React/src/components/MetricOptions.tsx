import { useDispatch, useSelector } from 'react-redux'
import { METRIC_OPTIONS } from '../assets/constants'
import { filterSelector, updateMetricFilter } from '../redux/slices/filter'
import '../styles/MetricOptions.css'

const MetricOptions = () => {

    const dispatch = useDispatch()

    const { metricOptions } = useSelector(filterSelector)

  return (
    <div className='MetricOptions-container'>
        {
            METRIC_OPTIONS.map((metric, index) => {
                return(
                    <div 
                     className={`metric-option ${metric.option === metricOptions && 'selected'}`}
                     onClick={() => dispatch(updateMetricFilter(metric.option))}
                     key={`metric-option-${index}`}
                    >
                        {metric.unit}
                        <span></span>
                    </div>
                )
            })
        }
    </div>
  )
}

export default MetricOptions