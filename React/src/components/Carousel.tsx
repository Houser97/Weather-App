import "../styles/Carousel.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useSelector } from "react-redux";
import { filterSelector } from "../redux/slices/filter";
import { weatherDataSelector } from "../redux/slices/weather";
import { getforecastDailyData, getforecastHourlyData } from "../assets/FormatFunctions";
import useWindowSize from "../assets/hooks/windowSize";
import { useEffect, useState } from "react";

const widthWindow = 2560

const Carousel = () => {

    const windowSize = useWindowSize()

    const { forecastOption } = useSelector(filterSelector)
    const { forecastDaily, forecastHourly, current } = useSelector(weatherDataSelector)

    const CarouselInitialOptions = {
      slidesToScroll: forecastOption === 'daily' ? 2 : 7,
      slidesToShow: windowSize.width <= widthWindow ? 4 : 7
    }

    const [carouselOptions, setCarouselOptions] = useState(CarouselInitialOptions)

    useEffect(() => {
      let newOptions;
      if(windowSize.width <= 1050){
        newOptions = {
          slidesToScroll: forecastOption === 'daily' ? 3 : 3,
          slidesToShow: forecastOption === 'daily' ? 3 : 3
        }
      } else if(windowSize.width <= 1800){
        newOptions = {
          slidesToScroll: forecastOption === 'daily' ? 4 : 4,
          slidesToShow: forecastOption === 'daily' ? 4 : 4
        }
      } else {
        newOptions = {
          slidesToScroll: forecastOption === 'daily' ? 2 : 5,
          slidesToShow: forecastOption === 'daily' ? 5 : 5
        }
      }
      setCarouselOptions(newOptions)
    }, [windowSize.width, forecastOption])
    

    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: carouselOptions.slidesToShow,
        slidesToScroll: carouselOptions.slidesToScroll,
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