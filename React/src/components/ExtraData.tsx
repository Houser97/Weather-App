import '../styles/ExtraData.css'
import DataCard from './DataCard'
import Gauge from './Gauge'

const data = [
  {
    title: 'Sunrise & Sunset',
    valueTarget1: 'sunrise',
    valueTarget2: 'sunset',
    type: 'hour',
  },
  {
    title: 'Max & Min',
    valueTarget1: 'min',
    valueTarget2: 'max',
    type: 'temperature'
  },
  {
    title: 'Feels like',
    valueTarget1: 'feelsDay',
    valueTarget2: 'feelsNight',
    type: 'temperature'
  }
]

const ExtraData = () => {
  return (
    <div className='extraData-container'>
      <Gauge />
      {
        data.map((current, index) => {
          return(
            <DataCard {...current} key = {`extradata-${index}`} />
          )
        })
      }
    </div>
  )
}

export default ExtraData