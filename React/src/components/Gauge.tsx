import '../styles/Gauge.css'

const Gauge = () => {
  return (
    <div className='gauge__container'>
      <h3 className='gauge__title'>UVI</h3>
      <div className="gauge__body">
        <div className="gauge">
          <div className="gauge__fill"></div>
          <div className="gauge__cover"></div>
        </div>
      </div>
    </div>
  )
}

export default Gauge