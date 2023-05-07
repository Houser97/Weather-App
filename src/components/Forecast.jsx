import React from 'react'
import { StyleSheet, View } from 'react-native';
import ForecastCard from './ForecastCard';

const Forecast = ({forecastData}) => {
  return (
    <View style={styles.forecastContainer}>
        {forecastData.map((forecast, index) => {
            return(
                <ForecastCard key={`forecast-${index}`}
                 temp={forecast.temperature} 
                 icon={forecast.weather}
                 day={forecast.day ? forecast.day.split(',')[0] : forecast.hour}/>
            )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
    forecastContainer:{
        width:'100%',
        flexDirection:'column'
    }
})

export default Forecast