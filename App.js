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

  useEffect(() => {
    if(weatherData.hasData){
      setIsLoadingData(false)
      setIsLoading(false)
    }
  }, [weatherData])
  

  useEffect(() => {
    if(city === '') return undefined;
    const handleCityChange = async () => {
      const weatherData = await fetchWeatherData(city)
      setWeatherData(weatherData)
    }

    handleCityChange()
  }, [city])

  const forecastSection = () => {
    return(
        isLoadingData ? <ActivityIndicator size={100} color='white' style={{marginTop:50}}/> :
        filter === 'daily' ? 
          (weatherData.forecast).length !== 0 && <Forecast forecastData={weatherData.forecast}/>
          :
          (weatherData.hourly).length !== 0 && <Forecast forecastData={weatherData.hourly[filterDailyData]}/>
    )
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <Image source={backgroundBlue} style={styles.bgImage}></Image>
      <ScrollView style={styles.scroll}>
        <View style={styles.appContainer}>
          <Search setCity={setCity} isLoading={isLoading} setIsLoading={setIsLoading} />
          <WeatherCard {...weatherData.current} />
          <ExtraData {...weatherData.current} />
          <Filter filter={filter} setFilter={setFilter} filterDailyData={filterDailyData} setFilterDailyData={setFilterDailyData}  />
          {forecastSection()}
        </View>  
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#212120',
    alignItems: 'center',
  },
  appContainer:{
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%'
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
    width:'100%'
  }
})