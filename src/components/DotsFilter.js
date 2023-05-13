import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

const WeatherSets = ['set1', 'set2', 'set3', 'set4']

const DotsFilter = ({filterDailyData, setFilterDailyData}) => {
  return (
    <View style={styles.container}>
    {
        WeatherSets.map((currentSet, index) => {
            return(
                <TouchableOpacity style={styles.button}
                onPress = {() => setFilterDailyData(currentSet)}
                key={`set-${index}`}>
                    <Text style={[styles.dot, currentSet === filterDailyData && styles.selected]}></Text>
                </TouchableOpacity>
            )
        })
    }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',

    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 15,
        height: 15,
        borderRadius: 20,
        backgroundColor: 'white',
        opacity: 0.25
    },
    selected: {
        opacity: 1,
    }
})

export default DotsFilter