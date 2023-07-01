import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getforecastDailyData, getforecastHourlyData } from '../assets/FormatFunctions'
import useWindowSize from '../assets/hooks/windowSize'
import { filterSelector } from '../redux/slices/filter'
import { weatherDataSelector } from '../redux/slices/weather'
import '../styles/Dashboard.css'
import Carousel from './Carousel'
import Chart from './Chart'
import ExtraData from './ExtraData'
import FilterOptions from './FilterOptions'

const widthWindow = 2560

const Dashboard = () => {

  const windowSize = useWindowSize()

  const { forecastOption } = useSelector(filterSelector)

  const { forecastDaily, forecastHourly, current } = useSelector(weatherDataSelector)

  const [showCarousel, setShowCarousel] = useState(windowSize.width < widthWindow || forecastOption == 'hourly')

  useEffect(() => {
    setShowCarousel(windowSize.width < widthWindow || forecastOption == 'hourly')
  }, [windowSize.width, forecastOption])
   
  const CardNoCarousel = () => {
    return(
      <div className='dashboard-forecast-container'>
          {
            forecastOption === 'daily' ? getforecastDailyData(forecastDaily, current) : getforecastHourlyData(forecastHourly, current)
          }
      </div>
    )
  }

  return (
    <div className='dashboard-container'>
      <FilterOptions />
      {showCarousel ? <Carousel /> : CardNoCarousel()}
      <div className='chart-extradata-container'>
        <Chart />
        <ExtraData />
      </div>
    </div>
  )
}

export default Dashboard