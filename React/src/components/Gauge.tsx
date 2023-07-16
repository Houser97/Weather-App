import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { weatherDataSelector } from '../redux/slices/weather'
import '../styles/Gauge.css'

const UVI_MAX = 14;
const UVI_MIN = 0;

const Gauge = () => {

  const { current } = useSelector(weatherDataSelector)
  const fillRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const UVI = current.uvi > UVI_MAX ? 1 : current.uvi/UVI_MAX
    if(fillRef.current){
      fillRef.current.style.transform = `rotate(${UVI/2}turn)`
    }
  }, [current.city])
  

  return (
    <div className='gauge__container'>
      <h3 className='gauge__title'>UVI</h3>
      <div className="gauge__body">
        <div className="gauge">
          <div ref={fillRef} className="gauge__fill"></div>
          <div className="gauge__cover">{current.uvi}</div>
        </div>
      </div>
    </div>
  )
}

export default Gauge