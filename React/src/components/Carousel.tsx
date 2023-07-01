import "../styles/Carousel.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useSelector } from "react-redux";
import { filterSelector } from "../redux/slices/filter";
import { weatherDataSelector } from "../redux/slices/weather";
import { getforecastDailyData, getforecastHourlyData } from "../assets/FormatFunctions";

const Carousel = () => {

    const { forecastOption } = useSelector(filterSelector)

    const { forecastDaily, forecastHourly, current } = useSelector(weatherDataSelector)

    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        autoplay: true,
        dots: true,
    }

  return (
    <div className='carousel-container'>
        <Slider {...settings} className = "carousel">
            {
            forecastOption === 'daily' ? getforecastDailyData(forecastDaily, current) : getforecastHourlyData(forecastHourly, current)
            }
        </Slider>
    </div>
  )
}

export default Carousel