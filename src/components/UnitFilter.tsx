import React, { Dispatch, SetStateAction } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { TEXT_COLOR } from '../Assets/constants'

interface UnitFilterProps {
    setUnits: Dispatch<SetStateAction<string>>,
    units: string
}

const UnitFilter = ({setUnits, units}: UnitFilterProps) => {

  return (
    <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => setUnits('metric')}>
            <Text style={[styles.unitOption, units === 'metric' && styles.selected]}>°C</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => setUnits('imperial')}>
            <Text style={[styles.unitOption, units === 'imperial' && styles.selected]}>°F</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        columnGap: 10
    },
    unitOption: {
        fontSize: 40,
        color: TEXT_COLOR,
        opacity: 0.5
    },
    separator: {
        fontSize: 45,
        color: TEXT_COLOR,
        marginLeft: 8
    },
    selected: {
        opacity: 1,
    }
})

export default UnitFilter