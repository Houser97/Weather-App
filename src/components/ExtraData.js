import React from 'react'
import { StyleSheet, View } from 'react-native'
import DataCard from './DataCard'

const ExtraData = ({feels_like, humidity, pressure, wind}) => {
  return (
    <View style={styles.appContainerData}>
        <DataCard value={feels_like} icon={'feels_like'} variable={'Feels like'} /> 
        <DataCard value={humidity} icon={'humidity'} variable={'Humidity'} /> 
        <DataCard value={pressure} icon={'pressure'} variable={'Pressure'} /> 
        <DataCard value={wind} icon={'wind'} variable={'Wind speed'} /> 
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