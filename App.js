import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import Search from './src/components/Search';
import WeatherCard from './src/components/WeatherCard';
//import backgroundBlue from './src/Assets/Background/Bg2.jpg'
import backgroundBlue from './src/Assets/Background/Bg3.jpg'
import { useEffect, useState } from 'react';
import DataCard from './src/components/DataCard';

const capitalizeFirstLetter = (word) => {
  let firstLetter = word.charAt(0)
  let firstLetterCap = firstLetter.toUpperCase()
  return firstLetterCap + word.slice(1)
}

export default function App() {

  const [weatherData, setWeatherData] = useState({})
  const [city, setCity] = useState('Puebla')

  useEffect(() => {
    if(city === '') return undefined;

    const getCityCoords = async (city) => {
      const coordsDataRaw = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=a17d8aca84846ee500b328a8df181e45`, { mode: "cors" })
      const coordsData = await coordsDataRaw.json()
      return {lat: coordsData[0].lat, lon: coordsData[0].lon}
    }

    const fetchWeatherData = async () => {
      const {lat, lon} = await getCityCoords(city)
      const weatherDataRaw = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,alerts&units=metric&appid=a17d8aca84846ee500b328a8df181e45`, { mode: "cors" })
      const {current, daily} = await weatherDataRaw.json()
      //console.log(current)
      const {humidity, pressure, temp, visibility, wind_speed, weather} = current
      const weatherData = {
        description: capitalizeFirstLetter(weather[0].description),
        humidity: humidity,
        pressure: pressure,
        temperature: temp,
        weather: weather[0].main,
        lat,
        lon,
        city,
        wind: wind_speed,
        visibility
      }
      setWeatherData(weatherData)
    }
    fetchWeatherData()
    
  }, [city])

  return (
    <SafeAreaView style={styles.mainView}>
      <Image source={backgroundBlue} style={styles.bgImage}></Image>
      <View style={styles.appContainer}>
        <Search setCity={setCity} />
        <WeatherCard 
         temperature={weatherData.temperature} 
         city={weatherData.city} 
         description={weatherData.description} 
         date = {`${new Date()}`.substring(0,10)}
         icon = {weatherData.weather} />
        <View style={styles.appContainerData}>
          <DataCard value={weatherData.humidity} icon={'humidity'} variable={'Humidity'} /> 
          <DataCard value={weatherData.pressure} icon={'pressure'} variable={'Pressure'} /> 
          <DataCard value={weatherData.wind} icon={'wind'} variable={'Wind speed'} /> 
          <DataCard value={weatherData.visibility} icon={'visibility'} variable={'Visibility'} /> 
        </View>
      </View>
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
    gap: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})