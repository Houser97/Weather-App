import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import Search from './src/components/Search';
import WeatherCard from './src/components/WeatherCard';
import backgroundBlue from './src/Assets/Background/Bg2.jpg'
import { useEffect, useState } from 'react';

const capitalizeFirstLetter = (word) => {
  let firstLetter = word.charAt(0)
  let firstLetterCap = firstLetter.toUpperCase()
  return firstLetterCap + word.slice(1)
}

export default function App() {

  const [weatherData, setWeatherData] = useState({})
  const [city, setCity] = useState('')

  useEffect(() => {
    if(city === '') return undefined;

    const fetchWeatherData = async () => {
      const weatherDataRaw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a17d8aca84846ee500b328a8df181e45`, { mode: "cors" })
      const {weather, coord, main, name, wind} = await weatherDataRaw.json()
      const weatherData = {
        description: capitalizeFirstLetter(weather[0].description),
        humidity: weather[0].humidity,
        pressure: weather[0].pressure,
        sea_level: weather[0].sea_level,
        temperature: main.temp,
        coord,
        city: name,
        wind
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
         date = {`${new Date()}`.substring(0,10)} />
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
  }
})