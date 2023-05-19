import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MistCategory, TEXT_COLOR, weatherIcons } from '../Assets/constants'

const WeatherCard = ({temperature, description, city, date, icon, units}) => {

  return (  
    <View style = {styles.weatherCard}>
        <View style = {styles.cardBackground}></View>
        <View style = {styles.temperature}>
            <Text style = {styles.wheaterNumber}>{temperature}</Text>
            <Text style = {styles.celsius}>{units === 'metric' ? '°C':'°F'}</Text>
        </View>
        {weatherIcons[icon] ? weatherIcons[icon] : MistCategory}
        <Text style = {styles.today}>{description}</Text>
        <Text style = {styles.date}>{date}</Text>
        <Text style = {styles.place}>{city}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    weatherCard: {
        flexDirection: 'row',
        width: '100%',
        height: 250,
        borderRadius: 20,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'space-around',
        overflow: 'hidden',
        zIndex: 10,
    },
    cardBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.09,
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: 20,
        top: 0,
        left: 0
    },
    wheaterNumber: {
        fontSize: 50,
        color: TEXT_COLOR
    },
    temperature: {
        flexDirection: 'row',
        position: 'relative',
    },
    celsius: {
        color: TEXT_COLOR,
        fontSize: 40,
        position: 'relative',
        top: 0,
        right: 0
    },
    today: {
        fontSize: 20,
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: TEXT_COLOR,
    }, 
    date: {
        position: 'absolute',
        top: 25,
        right: 40,
        fontSize: 13,
        color: TEXT_COLOR,
    },
    place: {
        position: 'absolute',
        top: 20,
        left: 40,
        fontSize: 18,
        color: TEXT_COLOR,
    }
})

export default WeatherCard