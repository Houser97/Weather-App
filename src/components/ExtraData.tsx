import React from 'react'
import { StyleSheet, View } from 'react-native'
import DataCard from './DataCard'

type Props = {
  feels_like: number, 
  units: string,
  pressure: number,
  humidity: number, 
  wind: number
}

const ExtraData = ({feels_like, humidity, pressure, wind, units}: Props) => {
  return (
    <View style={styles.appContainerData}>
        <DataCard value={feels_like} icon={'feels_like'} variable={'Feels like'} unit={units} /> 
        <DataCard value={humidity} icon={'humidity'} variable={'Humidity'} unit = {""} /> 
        <DataCard value={pressure} icon={'pressure'} variable={'Pressure'} unit = {""} /> 
        <DataCard value={wind} icon={'wind'} variable={'Wind speed'} unit={units} /> 
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