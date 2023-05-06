import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { iconsUnits, TEXT_COLOR } from '../Assets/constants'

const DataCard = ({value, icon, variable}) => {
  return (
    <View style = {styles.DataCard}>
      <View style = {styles.cardBackground}></View>
      {iconsUnits[icon].icon}
      <Text style = {styles.value}>{value} {iconsUnits[icon].unit}</Text>
      <Text style = {styles.variable}>{variable}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  DataCard: {
    width: 120,
    height: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
    zIndex: 10,
  },
  cardBackground: {
      width: '100%',
      height: '100%',
      opacity: 0.08,
      backgroundColor: TEXT_COLOR,
      position: 'absolute',
      borderRadius: 20,
      top: 0,
      left: 0
  },
  value: {
      fontSize: 16,
      color: TEXT_COLOR
  },
  variable: {
      color: TEXT_COLOR,
      fontSize: 10,
      fontWeight: 'bold'
  },
})

export default DataCard