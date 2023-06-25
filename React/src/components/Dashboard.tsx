import { useSelector } from 'react-redux'
import { weatherDataSelector } from '../redux/slices/weather'
import '../styles/Dashboard.css'
import Chart from './Chart'
import ExtraData from './ExtraData'
import FilterOptions from './FilterOptions'
import ForecastCard from './ForecastCard'

const Dashboard = () => {

  const { forecastDaily } = useSelector(weatherDataSelector)

  return (
    <div className='dashboard-container'>
      <FilterOptions />
      <div className='dashboard-forecast-container'>
        {
          forecastDaily.map((forecastData, index) => {
            return(
              <ForecastCard data={forecastData} forecastType={'daily'} key={`forecast-${index}`} />
            )
          })
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