import React from 'react'
import { StyleSheet, View } from 'react-native'
import DataCard from './DataCard'

const ExtraData = ({weatherData}) => {
  return (
    <View style={styles.appContainerData}>
        <DataCard value={weatherData.current.feels_like} icon={'feels_like'} variable={'Feels like'} /> 
        <DataCard value={weatherData.current.humidity} icon={'humidity'} variable={'Humidity'} /> 
        <DataCard value={weatherData.current.pressure} icon={'pressure'} variable={'Pressure'} /> 
        <DataCard value={weatherData.current.wind} icon={'wind'} variable={'Wind speed'} /> 
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default ExtraData