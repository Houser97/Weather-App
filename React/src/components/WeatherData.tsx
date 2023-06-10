import { weatherIcons } from '../assets/weatherIcons'
import '../styles/WeatherData.css'
import test from '../assets/Puebla.jpg'

const WeatherData = () => {
  return (
    <div className="weather-data-container">
        <img src={weatherIcons['Clear']} alt="sun" className='icon' />
        <div className="temperature-container">
          <span className='temperature'>20</span>
          <span className='unit'>°C</span>
        </div>
        <div className="day-hour-container">
            <span>Monday,</span>
            <span className='hour'>16:00</span>
        </div>
        <div className='extra-data-container'>
          <div className='description-icon'>
            <img src={weatherIcons['Tornado']} alt="icon" className='icon-extra-data' />
            <span>Mostly Coudy</span>
          </div>
          <div className='description-icon'>
            <img src={weatherIcons['Humidity']} alt="icon" className='icon-extra-data' />
            <span>Humidity</span>
            <span>-</span>
            <span>30%</span>
          </div>
          <div className='city-img-container'>
            <img src={test} className='place-img'></img>
            <div className='img-opacity'></div>
            <span className='city'>Puebla</span>
          </div>
        </div>
    </div>
  )
}

export default WeatherData