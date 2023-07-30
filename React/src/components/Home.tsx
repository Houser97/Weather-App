import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeatherDataRedux, weatherDataSelector } from '../redux/slices/weather'
import { AppDispatch } from '../redux/store'
import '../styles/Home.css'
import Dashboard from './Dashboard'
import Loading from './Loading'
import Sidebar from './Sidebar'

const Home = () => {

  const dispatch = useDispatch<AppDispatch>()

  const { isLoading } = useSelector(weatherDataSelector)

  //Sirve para buscar datos apenas se abrá la aplicación por primera vez.
  const [fetchOnce, setFetchOnce] = useState(true)

  useEffect(() => {
    if(!isLoading) {setFetchOnce(false)}
    if(!fetchOnce) return undefined
    dispatch(fetchWeatherDataRedux('Puebla', 'metric'));
  }, [isLoading])
  
  return (
    <div className="main__container">
      <div className='Home-container'>
        {
          isLoading && fetchOnce
          ? <Loading /> 
          : <>
              <Sidebar />
              <Dashboard />
            </>
        }
      </div>
    </div>
  )
}

export default Home