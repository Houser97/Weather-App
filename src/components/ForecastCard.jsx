import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { weatherIconsSmall, TEXT_COLOR } from '../Assets/constants'

const ForecastCard = ({day, temp, feels_like, icon}) => {
  return (
    <View style={styles.forecastContainer}>
        <Text style={styles.day}>{day}</Text>
        <View style = {styles.temperature}>
            <Text style = {styles.wheaterNumber}>{temp}</Text>
            <Text style = {styles.celsius}>°C</Text>
        </View>
        {weatherIconsSmall[icon]}
    </View>
  )
}

const styles = StyleSheet.create({
    forecastContainer: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 20,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'space-around',
        overflow: 'hidden',
        zIndex: 10,
    },
    wheaterNumber: {
        fontSize: 16,
        color: TEXT_COLOR
    },
    temperature: {
        flexDirection: 'row',
        position: 'relative',
    },
    celsius: {
        color: TEXT_COLOR,
        fontSize: 16,
        position: 'relative',
        top: 0,
        right: 0
    },
    day:{
        color: TEXT_COLOR,
        fontSize: 18,
        width: 130
    }
})


export default ForecastCard