import "../styles/Carousel.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useSelector } from "react-redux";
import { filterSelector } from "../redux/slices/filter";
import { weatherDataSelector } from "../redux/slices/weather";
import ForecastCard from "./ForecastCard";

let settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 0,
  autoplay: true,
}

const Carousel = () => {

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
    <div className='carousel-container'>
        <Slider {...settings} className = "carousel">
            {
            forecastOption === 'daily' ? getforecastDailyData() : getforecastHourlyData()
            }
        </Slider>
    </div>
  )
}

export default Carousel