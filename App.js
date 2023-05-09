import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import Search from './src/components/Search';
import WeatherCard from './src/components/WeatherCard';
//import backgroundBlue from './src/Assets/Background/Bg2.jpg'
import backgroundBlue from './src/Assets/Background/pint6.jpg'
import { useEffect, useState } from 'react';
import DataCard from './src/components/DataCard';
import Forecast from './src/components/Forecast';
import Filter from './src/components/Filter';
import { fetchWeatherData } from './src/Assets/apiFunctions';

export default function App() {

  const [weatherData, setWeatherData] = useState({current: {}, forecast: [], hourly: [], hasData: false})
  const [city, setCity] = useState('Puebla')
  const [filter, setFilter] = useState('daily')
  const [filterDailyData, setFilterDailyData] = useState('set4')
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

  return (
    <SafeAreaView style={styles.mainView}>
      <Image source={backgroundBlue} style={styles.bgImage}></Image>
      <ScrollView style={styles.scroll}>
        <View style={styles.appContainer}>
          <Search setCity={setCity} isLoading={isLoading} setIsLoading={setIsLoading} />
          <WeatherCard 
          temperature={weatherData.current.temperature} 
          city={weatherData.current.city} 
          description={weatherData.current.description} 
          date = {weatherData.current.date}
          icon = {weatherData.current.weather} />
          <View style={styles.appContainerData}>
            <DataCard value={weatherData.current.feels_like} icon={'feels_like'} variable={'Feels like'} /> 
            <DataCard value={weatherData.current.humidity} icon={'humidity'} variable={'Humidity'} /> 
            <DataCard value={weatherData.current.pressure} icon={'pressure'} variable={'Pressure'} /> 
            <DataCard value={weatherData.current.wind} icon={'wind'} variable={'Wind speed'} /> 
            {/*<DataCard value={weatherData.current.visibility} icon={'visibility'} variable={'Visibility'} />*/}
          </View>
          <Filter filter={filter} setFilter={setFilter} />
          {
            isLoadingData ? <ActivityIndicator size={100} color='white' style={{marginTop:50}}/> :
            filter === 'daily' ? 
              (weatherData.forecast).length !== 0 && <Forecast forecastData={weatherData.forecast}/>
              :
              (weatherData.hourly).length !== 0 && <Forecast forecastData={weatherData.hourly[filterDailyData]}/>
          }
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
  appContainerData: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    rowGap: 30,
    columnGap:20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scroll: {
    width:'100%'
  }
})