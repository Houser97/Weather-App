import '../styles/ExtraData.css'
import DataCard from './DataCard'

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
  },
  {
    title: 'Max & Min',
    valueTarget1: 'min',
    valueTarget2: 'max',
    type: 'temperature'
  }
]

const ExtraData = () => {
  return (
    <div className='extraData-container'>
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