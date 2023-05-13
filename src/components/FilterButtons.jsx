import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { filterOptions, TEXT_COLOR } from '../Assets/constants';

const FilterButtons = ({filter, setFilter}) => {
  return (
    <View style={styles.container}>
    {filterOptions.map((optionFilter, index) => {
        return(
            <TouchableOpacity 
                style={[styles.button, filter === optionFilter.status && styles.selected]} 
                key = {`filter-option-${index}`}
                onPress={() => setFilter(optionFilter.status)}>
                <Text style={[styles.option, filter === optionFilter.status && styles.selectedButton]}>{optionFilter.status}</Text>
            </TouchableOpacity>
        )
    })}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',
        gap: 30
    },
    option: {
        color: TEXT_COLOR,
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    },
    selected: {
        backgroundColor: 'white',
    },
    selectedButton:{
        color: 'black',
    }
})

export default FilterButtons