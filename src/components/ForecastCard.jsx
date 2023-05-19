import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { weatherIconsSmall, TEXT_COLOR, MistCategorySmall } from '../Assets/constants'

const ForecastCard = ({day, temp, units, icon, date, dayHourly}) => {

    const unitVariable = units === 'metric' 
                         ? '°C'
                         : '°F'

  return (
    <View style={styles.forecastContainer}>
        <View style={styles.dayDate}>
            <Text style={styles.day}>{day}</Text>
            <Text style={styles.date}>{date}</Text>
            {dayHourly && <Text style={styles.dayHourly}>{dayHourly}</Text>}
        </View>
        <View style = {styles.temperature}>
            <Text style = {styles.wheaterNumber}>{temp}</Text>
            <Text style = {styles.celsius}>{unitVariable}</Text>
        </View>
        {weatherIconsSmall[icon] ? weatherIconsSmall[icon] : MistCategorySmall}
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
        width: 80, //Se establece para que la data esté alineada.
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
    },
    dayDate:{
        flexDirection: 'column'
    },
    date:{
        fontSize:12,
        color: TEXT_COLOR
    },
    dayHourly:{
        fontSize:10,
        color: TEXT_COLOR
    }
})


export default ForecastCard