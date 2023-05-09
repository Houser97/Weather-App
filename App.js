import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import Search from './src/components/Search';
import WeatherCard from './src/components/WeatherCard';
//import backgroundBlue from './src/Assets/Background/Bg2.jpg'
import backgroundBlue from './src/Assets/Background/pint6.jpg'
import { useEffect, useState } from 'react';
import DataCard from './src/components/DataCard';
import Forecast from './src/components/Forecast';
import Filter from './src/components/Filter';

const capitalizeFirstLetter = (word) => {
  let firstLetter = word.charAt(0)
  let firstLetterCap = firstLetter.toUpperCase()
  return firstLetterCap + word.slice(1)
}

const getDateFromDT = (dt) => {
  const dateRaw = new Date(dt * 1000)
  const date = dateRaw.toLocaleDateString()
  const day = dateRaw.toLocaleString('en-US', { weekday: 'long' });
  return {day, date}
}

const getHourFromDT = (dt) => {
  const rawDate = new Date(dt * 1000)
  return rawDate.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: true})
}

export default function App() {

  const [weatherData, setWeatherData] = useState({current: {}, forecast: [], hourly: []})
  const [city, setCity] = useState('Puebla')
  const [filter, setFilter] = useState('daily')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(city === '') return undefined;

    const getCityCoords = async (city) => {
      const coordsDataRaw = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=a17d8aca84846ee500b328a8df181e45`, { mode: "cors" })
      const coordsData = await coordsDataRaw.json()
      return {lat: coordsData[0].lat, lon: coordsData[0].lon}
    }

    const fetchWeatherData = async () => {
      const {lat, lon} = await getCityCoords(city)
      const weatherDataRaw = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=metric&appid=a17d8aca84846ee500b328a8df181e45`, { mode: "cors" })
      const {current, daily, hourly} = await weatherDataRaw.json()
      const {humidity, pressure, temp, visibility, wind_speed, weather, feels_like, dt} = current
      const {day, date} = getDateFromDT(dt)

      const currentData = {
        dt,
        description: capitalizeFirstLetter(weather[0].description),
        humidity: humidity,
        pressure: pressure,
        temperature: temp,
        weather: weather[0].main,
        lat,
        lon,
        city,
        feels_like,
        wind: wind_speed,
        visibility,
        date,
        day
      }

      const forecastData = []

      for(const forecast of daily){
        const dt = forecast.dt;
        const {day, date} = getDateFromDT(dt)
        const data = {
          dt,
          day,
          date,
          temperature: forecast.temp.day,
          feels_like: forecast.feels_like.day,
          weather: forecast.weather[0].main,
          type: 'daily',
          city //Se agrega para mejorar KEY al momento de renderizar ForecastCard en Forecast.
        }
        forecastData.push(data)
      }

      const forecastDataHourly = []

      for(const forecast of hourly){
        const dt = forecast.dt;
        const hour = getHourFromDT(dt)
        const {day, date} = getDateFromDT(dt)
        const data = {
          dt,
          hour,
          date,
          day,
          temperature: forecast.temp,
          feels_like: forecast.feels_like,
          weather: forecast.weather[0].main,
          type: 'hourly'
        }
        forecastDataHourly.push(data)
      }

      const weatherData = {current: currentData, forecast: forecastData, hourly: forecastDataHourly}

      setWeatherData(weatherData)
      setIsLoading(false)
    }
    fetchWeatherData()
    
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
            filter === 'daily' ? 
              (weatherData.forecast).length !== 0 && <Forecast forecastData={weatherData.forecast}/>
              :
              (weatherData.hourly).length !== 0 && <Forecast forecastData={weatherData.hourly}/>
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