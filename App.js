import { StyleSheet, View, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import Search from './src/components/Search';
import WeatherCard from './src/components/WeatherCard';
import backgroundBlue from './src/Assets/Background/pint6.jpg'
import { useEffect, useState } from 'react';
import Forecast from './src/components/Forecast';
import Filter from './src/components/Filter';
import { fetchWeatherData } from './src/Assets/apiFunctions';
import ExtraData from './src/components/ExtraData';

export default function App() {

  const [weatherData, setWeatherData] = useState({current: {}, forecast: [], hourly: [], hasData: false})
  const [city, setCity] = useState('Puebla')
  const [filter, setFilter] = useState('daily')
  const [filterDailyData, setFilterDailyData] = useState('set1')
  const [isLoading, setIsLoading] = useState(false) //Loading para componente Search
  const [isLoadingData, setIsLoadingData] = useState(true) //Loading para predicciones.
  const [cityError, setCityError] = useState(false)

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
      const weatherData = await fetchWeatherData(city)
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
  }, [city])

  const forecastSection = () => {
    return(
        filter === 'daily' ? 
          (weatherData.forecast).length !== 0 && <Forecast forecastData={weatherData.forecast}/>
          :
          (weatherData.hourly).length !== 0 && <Forecast forecastData={weatherData.hourly[filterDailyData]}/>
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
          <WeatherCard {...weatherData.current} />
          <ExtraData {...weatherData.current} />
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