import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, View } from 'react-native';
import DotsFilter from './DotsFilter';
import FilterButtons from './FilterButtons';

type FilterProps = {
  filter: string,
  setFilter: Dispatch<SetStateAction<string>>,
  filterDailyData: string,
  setFilterDailyData: Dispatch<SetStateAction<string>>
}

const Filter = ({filter, setFilter, filterDailyData, setFilterDailyData}: FilterProps) => {
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