import { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import Home from './components/Home'
import { fetchWeatherDataRedux } from './redux/slices/weather'
import { AppDispatch } from './redux/store'


export const weatherContext = createContext({})

function App() {

  const dispatch = useDispatch<AppDispatch>()
  
  const [filter, setFilter] = useState('daily')
  const [filterDailyData, setFilterDailyData] = useState('set1')
  const [isLoading, setIsLoading] = useState(false) //Loading para componente Search
  const [isLoadingData, setIsLoadingData] = useState(true) //Loading para predicciones.
  const [cityError, setCityError] = useState(false)
  const [fetchDataOnce, setFetchDataOnce] = useState(true)
  const [tempUnit, setTempUnit] = useState('metric') //El valor se pasa al objeto creado en la API en lugar de pasarlo
  //directo a los componente para garantizar que la aplicación se renderiza al mismo tiempo y no las unidades antes que el valor.

  //useEffect que se usa para llenar el dashboard con datos de Puebla cuando se abre por primera vez.
  useEffect(() => {
    if(!fetchDataOnce) return undefined
    setFetchDataOnce(false)
    dispatch(fetchWeatherDataRedux('Puebla', 'metric'))
  }, [fetchDataOnce])
  

  const value = {}

  return (
    <div className='app'>
      <weatherContext.Provider value = {value}>
        <Home/>
      </weatherContext.Provider>
    </div>
  )
}

export default App
