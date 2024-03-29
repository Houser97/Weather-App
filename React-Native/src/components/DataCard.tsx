import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { iconsUnits, TEXT_COLOR } from '../Assets/constants'

type DatacardProps = {
  value: number,
  icon: string,
  variable: string,
  unit: string
}

const DataCard = ({value, icon, variable, unit}: DatacardProps) => {

  const unitVariable = typeof iconsUnits[icon].unit === 'object' 
                       ? iconsUnits[icon].unit[unit] 
                       : iconsUnits[icon].unit

  return (
    <View style = {styles.DataCard}>
      <View style = {styles.cardBackground}></View>
      {iconsUnits[icon].icon}
      <Text style = {styles.value}>{value} {unitVariable}</Text>
      <Text style = {styles.variable}>{variable}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  DataCard: {
    width: 160,
    height: 130,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
    zIndex: 10,
  },
  cardBackground: {
      width: '100%',
      height: '100%',
      opacity: 0.1,
      backgroundColor: TEXT_COLOR,
      position: 'absolute',
      borderRadius: 20,
      top: 0,
      left: 0
  },
  value: {
      fontSize: 18,
      color: TEXT_COLOR
  },
  variable: {
      color: TEXT_COLOR,
      fontSize: 13,
      fontWeight: 'bold'
  },
})

export default DataCard