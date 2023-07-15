import '../styles/SidebarSM.css'
import Search from './Search'
import ToggleDarkLightBtn from './ToggleDarkLightBtn'
import WeatherDataSM from './WeatherDataSM'

const SidebarSM = () => {
  return (
    <div className='siderbarSM-container'>
        <ToggleDarkLightBtn />
        <Search />
        <WeatherDataSM />
    </div>
  )
}

export default SidebarSM