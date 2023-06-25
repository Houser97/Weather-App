import '../styles/Sidebar.css'
import Search from './Search'
import WeatherData from './WeatherData'

const Sidebar = () => {
  return (
    <div className='Sidebar-container'>
        <Search />
        <WeatherData />
    </div>
  )
}

export default Sidebar