import { createContext, useState } from 'react'
import './App.css'
import Home from './components/Home'


export const weatherContext = createContext({})

function App() {
  
  const [filter, setFilter] = useState('daily')
  const [filterDailyData, setFilterDailyData] = useState('set1')
  const [isLoading, setIsLoading] = useState(false) //Loading para componente Search
  const [isLoadingData, setIsLoadingData] = useState(true) //Loading para predicciones.
  const [cityError, setCityError] = useState(false)
  const [tempUnit, setTempUnit] = useState('metric') //El valor se pasa al objeto creado en la API en lugar de pasarlo
  //directo a los componente para garantizar que la aplicación se renderiza al mismo tiempo y no las unidades antes que el valor.

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
