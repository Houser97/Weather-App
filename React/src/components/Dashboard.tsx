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
import SidebarSM from './SidebarSM'

const widthWindow = 2560
const widthWindowSM = 850

const Dashboard = () => {

  const windowSize = useWindowSize()

  const { forecastOption } = useSelector(filterSelector)

  const { forecastDaily, forecastHourly, current } = useSelector(weatherDataSelector)

  const [showCarousel, setShowCarousel] = useState(windowSize.width < widthWindow || forecastOption == 'hourly')
  const [showForecastSM, setShowForecastSM] = useState(windowSize.width < widthWindow)

  useEffect(() => {
    if(windowSize.width < widthWindowSM){
      setShowCarousel(false)
      setShowForecastSM(true)
    } else {
      setShowCarousel(windowSize.width < widthWindow || forecastOption == 'hourly')
      setShowForecastSM(false)
    }
  }, [windowSize.width, forecastOption])
   
  const CardNoCarousel = () => {
    return(
      <div className={`${showForecastSM ? 'dashboard-forecast-container-sm':'dashboard-forecast-container'}`}>
          {
            forecastOption === 'daily' ? getforecastDailyData(forecastDaily, current) : getforecastHourlyData(forecastHourly, current)
          }
      </div>
    )
  }

  return (
    <div className='dashboard-container'>
      <FilterOptions />
      <SidebarSM />
      {showCarousel ? <Carousel /> : !showForecastSM && CardNoCarousel()}
      <div className='chart-extradata-container'>
        <Chart />
        <ExtraData />
      </div>
      {showForecastSM && CardNoCarousel()}
    </div>
  )
}

export default Dashboard