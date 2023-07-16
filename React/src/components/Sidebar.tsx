import '../styles/Sidebar.css'
import Search from './Search'
import ToggleDarkLightBtn from './ToggleDarkLightBtn'
import WeatherData from './WeatherData'

const Sidebar = () => {
  return (
    <div className='Sidebar-container'>
        <Search />
        <WeatherData />
        <ToggleDarkLightBtn />
    </div>
  )
}

export default Sidebar