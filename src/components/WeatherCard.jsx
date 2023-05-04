import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 

const WeatherCard = ({weatherData, date}) => {

    const [data, setData] = useState(null)

    useEffect(() => {
        if(!weatherData) return undefined
        const dataObject = {
            temperature: weatherData.main.temp,
            city: weatherData.name,
            weather: weatherData.weather[0].description,
        }
        setData(dataObject)
    }, [weatherData])

    const weatherCardContent = () => {
        if(data) {
            return(
                <View style = {styles.weatherCard}>
                    <View style = {styles.cardBackground}></View>
                    <View style = {styles.temperature}>
                        <Text style = {styles.wheaterNumber}>{data.temperature}</Text>
                        <Text style = {styles.celsius}>°C</Text>
                    </View>
                    <Ionicons name="partly-sunny-outline" size={124} color="#FFD700" />
                    <Text style = {styles.today}>{data.weather}</Text>
                    <Text style = {styles.date}>{date}</Text>
                    <Text style = {styles.place}>{data.city}</Text>
                </View>
            )
        } 
        return(
            <View style = {styles.weatherCard}>
                <Text style = {styles.today}>Weather App</Text>
            </View>
        )
    }

  return (  
        weatherCardContent()
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
        opacity: 0.08,
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: 20,
        top: 0,
        left: 0
    },
    wheaterNumber: {
        fontSize: 60,
        color: 'white'
    },
    temperature: {
        flexDirection: 'row',
        position: 'relative',
    },
    celsius: {
        color: '#FFD700',
        fontSize: 40,
        position: 'relative',
        top: 0,
        right: 0
    },
    today: {
        fontSize: 24,
        position: 'absolute',
        top: 20,
        left: 40,
        color: 'white'
    }, 
    date: {
        position: 'absolute',
        top: 25,
        right: 40,
        fontSize: 13,
        color: 'white'
    },
    place: {
        position: 'absolute',
        bottom: 20,
        left: 40,
        fontSize: 18,
        color: 'white'
    }
})

export default WeatherCard