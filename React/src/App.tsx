import { createContext, useState } from 'react'
import './App.css'
import Home from './components/Home'
interface currentType {
  dt: number,
  description: string,
  humidity: number,
  pressure: number,
  temperature: number,
  icon: string,
  lat: number,
  lon: number,
  city: string,
  feels_like: number,
  wind: number,
  visibility: number,
  date: string,
  day: string,
  units: string
}

//Se exporta este tipo para definirlo en la Prop de Forecast.tsx
export interface forecastType {
  dt: number,
  day: string,
  date: string,
  temperature: number,
  feels_like: number,
  weather: string,
  type: string,
  city: string, //Se agrega para mejorar KEY al momento de renderizar ForecastCard en Forecast.
  units: string,
  hour?: string   
}

interface hourlyType {
  set1: Array<forecastType>,
  set2: Array<forecastType>,
  set3: Array<forecastType>,
  set4: Array<forecastType>
}


interface weatherDataType {
  current: currentType,
  forecast: Partial<Array<forecastType>>,
  hourly: Partial<hourlyType>,
  hasData: boolean
}

const currentInitialValue = {
  dt: 0,
  description: '',
  humidity: 0,
  pressure: 0,
  temperature: 0,
  icon: '',
  lat: 0,
  lon: 0,
  city: '',
  feels_like: 0,
  wind: 0,
  visibility: 0,
  date: '',
  day: '',
  units: ''
}

export const weatherContext = createContext({})

function App() {

  const [weatherData, setWeatherData] = useState<weatherDataType>({current: currentInitialValue, forecast: [], hourly: {}, hasData: false})
  const [city, setCity] = useState('Puebla')
  const [filter, setFilter] = useState('daily')
  const [filterDailyData, setFilterDailyData] = useState('set1')
  const [isLoading, setIsLoading] = useState(false) //Loading para componente Search
  const [isLoadingData, setIsLoadingData] = useState(true) //Loading para predicciones.
  const [cityError, setCityError] = useState(false)
  const [tempUnit, setTempUnit] = useState('metric') //El valor se pasa al objeto creado en la API en lugar de pasarlo
  //directo a los componente para garantizar que la aplicación se renderiza al mismo tiempo y no las unidades antes que el valor.

  const value = {setWeatherData, weatherData, city, setCity}

  return (
    <div className='app'>
      <weatherContext.Provider value = {value}>
        <Home/>
      </weatherContext.Provider>
    </div>
  )
}

export default App
