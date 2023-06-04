import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { TEXT_COLOR, ERROR_COLOR } from '../Assets/constants'

const CityErrorMsg = () => {
  return (
    <View style={styles.MsgContainer}>
        <TextInput style={styles.MsgTxt}>City is not valid</TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
    MsgContainer: {
        width: '100%',
        position: 'absolute',
        bottom: -35
    },
    MsgTxt: {
        fontSize: 16,
        color: ERROR_COLOR,
        fontWeight: 'bold'
    }
})

export default CityErrorMsg