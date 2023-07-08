import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getforecastDailyData, getforecastHourlyData, getforecastHourlyDataSM } from '../assets/FormatFunctions'
import useWindowSize from '../assets/hooks/windowSize'
import { filterSelector } from '../redux/slices/filter'
import { weatherDataSelector } from '../redux/slices/weather'
import '../styles/Dashboard.css'
import Carousel from './Carousel'
import Chart from './Chart'
import ExtraData from './ExtraData'
import FilterOptions from './FilterOptions'
import Search from './Search'
import ForecastSetSelector from './ForecastSetSelector'
import Sidebar from './Sidebar'
import SidebarSM from './SidebarSM'
import WeatherDataSM from './WeatherDataSM'

const widthWindow = 2560
const widthWindowSM = 850

const Dashboard = () => {

  const windowSize = useWindowSize()

  const { forecastOption } = useSelector(filterSelector)

  const { forecastDaily, forecastHourly, current } = useSelector(weatherDataSelector)

  const [showCarousel, setShowCarousel] = useState(windowSize.width < widthWindow || forecastOption == 'hourly')
  const [showForecastSM, setShowForecastSM] = useState(windowSize.width < widthWindow)
  const [currentSet, setCurrentSet] = useState('set1')

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
      <>
        <ForecastSetSelector setCurrentSet={setCurrentSet} currentSet = {currentSet} visible = {showForecastSM && forecastOption === 'hourly'} />
        <div className={`${showForecastSM ? 'dashboard-forecast-container-sm':'dashboard-forecast-container'}`}>
            {
              forecastOption === 'daily' ? getforecastDailyData(forecastDaily, current) : showForecastSM ? getforecastHourlyDataSM(forecastHourly, current, currentSet)  : getforecastHourlyData(forecastHourly, current)
            }
        </div>
      </>
    )
  }

  return (
    <div className='dashboard-container'>
      <FilterOptions />
      <SidebarSM />
      <h1 className="title title-forecast">Forecast</h1>
      {showCarousel ? <Carousel /> : !showForecastSM && CardNoCarousel()}
      <h1 className="title">Weather Data</h1>
      <div className='chart-extradata-container'>
        <Chart />
        <ExtraData />
      </div>
      <h1 className="title-SM">Forecast</h1>
      {showForecastSM && CardNoCarousel()}
    </div>
  )
}

export default Dashboard