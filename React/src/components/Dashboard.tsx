import { useSelector } from 'react-redux'
import { filterSelector } from '../redux/slices/filter'
import { weatherDataSelector } from '../redux/slices/weather'
import '../styles/Dashboard.css'
import Chart from './Chart'
import ExtraData from './ExtraData'
import FilterOptions from './FilterOptions'
import ForecastCard from './ForecastCard'

const Dashboard = () => {

  const { forecastOption } = useSelector(filterSelector)

  const { forecastDaily, forecastHourly } = useSelector(weatherDataSelector)

  const getforecastDailyData = () => {
    return forecastDaily.map((forecastData, index) => {
      return(
        <ForecastCard data={forecastData} key={`forecast-${index}`} />
      )
    })
  }

  const getforecastHourlyData = () => {
    return forecastHourly.set1.map((forecastData, index) => {
      return(
        <ForecastCard data={forecastData} key={`forecast-${index}`} />
      )
    })
  }

  return (
    <div className='dashboard-container'>
      <FilterOptions />
      <div className='dashboard-forecast-container'>
        {
          forecastOption === 'daily' ? getforecastDailyData() : getforecastHourlyData()
        }
      </div>
      <div className='chart-extradata-container'>
        <Chart />
        <ExtraData />
      </div>
    </div>
  )
}

export default Dashboard