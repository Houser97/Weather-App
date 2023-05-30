import { StyleSheet, View, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import Search from './src/components/Search';
import WeatherCard from './src/components/WeatherCard';
import backgroundBlue from './src/Assets/Background/pint6.jpg'
import { useEffect, useState } from 'react';
import Forecast from './src/components/Forecast';
import Filter from './src/components/Filter';
import { fetchWeatherData } from './src/Assets/apiFunctions';
import ExtraData from './src/components/ExtraData';
import UnitFilter from './src/components/UnitFilter';

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

interface forecastType {
  dt: number,
  day: string,
  date: string,
  temperature: number,
  feels_like: number,
  weather: string,
  type: string,
  city: string, //Se agrega para mejorar KEY al momento de renderizar ForecastCard en Forecast.
  units: string    
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

export default function App() {

  const [weatherData, setWeatherData] = useState<weatherDataType>({current: currentInitialValue, forecast: [], hourly: {}, hasData: false})
  const [city, setCity] = useState('Puebla')
  const [filter, setFilter] = useState('daily')
  const [filterDailyData, setFilterDailyData] = useState('set1')
  const [isLoading, setIsLoading] = useState(false) //Loading para componente Search
  const [isLoadingData, setIsLoadingData] = useState(true) //Loading para predicciones.
  const [cityError, setCityError] = useState(false)
  const [tempUnit, setTempUnit] = useState('metric') //El valor se pasa al objeto creado en la API en lugar de pasarlo
  //directo a los componente para garantizar que la aplicación se renderiza al mismo tiempo y no las unidades antes que el valor.

  useEffect(() => {
    //Este useEffect ayuda con la pantalla de carga apenas se renderiza por primera vez la app.
    if(weatherData.hasData){
      setIsLoadingData(false)
      setIsLoading(false)
    }
  }, [weatherData])
  

  useEffect(() => {
    if(city === '') return undefined;

    const handleCityChange = async () => {
      const weatherData = await fetchWeatherData(city, tempUnit)
      // Si las coordenadas no son válidas fetchWeatherData retorna false
      if(weatherData){ 
        setWeatherData(weatherData)
        setCityError(false)
      } else {
        setCityError(true)
        setIsLoadingData(false)
        setIsLoading(false)
      }
    }
    handleCityChange()
  }, [city, tempUnit])

  const forecastSection = () => {
    return(
        filter === 'daily' ? 
          (weatherData.forecast).length !== 0 && <Forecast forecastData={weatherData.forecast}/>
          :
          (Object.keys(weatherData.hourly)).length !== 0 && <Forecast forecastData={weatherData.hourly[filterDailyData]}/>
    )
  }

  const loadingSection = () => {
    return(
      <View style={styles.whiteOverlay}>
        <ActivityIndicator size={100} color={'white'} />
      </View >
    )
  }

  return (
    <SafeAreaView style={styles.mainView}>
      {isLoadingData && loadingSection()}
      <Image source={backgroundBlue} style={styles.bgImage}></Image>
      <ScrollView style={styles.scroll}>
        <View style={styles.appContainer}>
          {!isLoadingData && 
          <>
          <Search setCity={setCity} isLoading={isLoading} setIsLoading={setIsLoading} cityError={cityError} />
          <UnitFilter setUnits={setTempUnit} units={tempUnit} />
          <WeatherCard {...weatherData.current} />
          <ExtraData {...weatherData.current}  />
          <Filter filter={filter} setFilter={setFilter} filterDailyData={filterDailyData} setFilterDailyData={setFilterDailyData}  />
          {forecastSection()}
          </>
          }
        </View>  
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative'
  },
  appContainer:{
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top:0,
    left:0,
    zIndex: -10
  },
  scroll: {
    width:'100%',
    flex: 1,
    minHeight: '100%',
  },
  whiteOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'      
 }
})