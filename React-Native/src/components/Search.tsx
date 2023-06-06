import { View, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants'
import Icon from 'react-native-vector-icons/Ionicons'
import { Dispatch, SetStateAction, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import CityErrorMsg from './CityErrorMsg'
import { ERROR_COLOR } from '../Assets/constants'

type SearchProps = {
  setCity: Dispatch<SetStateAction<string>>,
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  cityError: boolean
}

const Search = ({setCity, isLoading, setIsLoading, cityError}: SearchProps) => {

  const [localCity, setLocalCity] = useState('')

  const handlePress = (localCity: string) => {
    setIsLoading(true)
    const city = localCity      
      .replace(/(,\s+)/g, ',') // Quitar espacios después de una coma.
      .replace(/(\s+,)/g, ',') // Quitar espacioes antes de una coma.
    setCity(city)
  }

  const SearchButton = () => {
    if(!isLoading) {
      return(
        <TouchableOpacity onPress={() => handlePress(localCity)}>
          <Icon name='search' size={28} color={cityError ? ERROR_COLOR : 'white'}/>
        </TouchableOpacity>
      )
    }
    return(
      <ActivityIndicator size={'large'}  color="white" />
    )
  }
 
  return (
    <View style = {[styles.search, cityError && styles.error]}>
        <TextInput 
         value = {localCity}
         onChangeText = {(city) => setLocalCity(city)}
         placeholder = {'Search city'}
         placeholderTextColor="white" 
         style = {[styles.input, cityError && styles.txtError]}></TextInput>
         {SearchButton()}
         {cityError && <CityErrorMsg />}
    </View>
  )
}

const styles = StyleSheet.create({
    search: {
        backgroundColor: 'transparent',
        width: '100%',
        marginTop: Constants.statusBarHeight + 15,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderColor: 'white',
        borderBottomWidth: 2,
        flexDirection: 'row',
        position: 'relative'
    },
    input: {
        flex: 1,
        paddingRight: 5,
        color:'white'
    },
    error: {
      borderColor: ERROR_COLOR,
    },
    txtError: {
      color: ERROR_COLOR
    }
})

export default Search