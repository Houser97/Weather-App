import React from 'react'
import { StyleSheet, View } from 'react-native';
import ForecastCard from './ForecastCard';

const Forecast = ({forecastData}) => {
  return (
    <View style={styles.forecastContainer}>
        {forecastData.map((forecast) => {
            return(
                <ForecastCard key={forecast.type === 'daily' ? `forecast-${forecast.dt}-${forecast.city}` : `hourly-${forecast.dt}-${forecast.city}`}
                 temp={forecast.temperature} 
                 icon={forecast.weather}
                 day={forecast.type === 'daily' ? forecast.day.split(',')[0] : forecast.hour}
                 date={forecast.date}
                 dayHourly={forecast.type === 'hourly' && forecast.day.split(',')[0]}/>
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