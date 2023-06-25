import '../styles/FilterOptions.css'
import ForecastOptions from './ForecastOptions'
import MetricOptions from './MetricOptions'

const FilterOptions = () => {
  return (
    <div className='filter-container'>
      <ForecastOptions />
      <MetricOptions />
    </div>
  )
}

export default FilterOptions