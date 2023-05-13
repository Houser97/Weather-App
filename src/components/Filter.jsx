import React from 'react'
import { StyleSheet, View } from 'react-native';
import DotsFilter from './DotsFilter';
import FilterButtons from './FilterButtons';

const Filter = ({filter, setFilter, filterDailyData, setFilterDailyData}) => {
  return (
    <View style={styles.filterContainer}>
        <FilterButtons filter={filter} setFilter={setFilter} />
        {filter === 'hourly' && <DotsFilter filterDailyData={filterDailyData} setFilterDailyData={setFilterDailyData} />}
    </View>
  )
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        marginTop: 40,
        flexWrap: 'wrap'
    }
})

export default Filter