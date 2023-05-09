import { View, TextInput, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

const Search = ({setCity}) => {

  const [localCity, setLocalCity] = useState('')

  return (
    <View style = {styles.search}>
        <TextInput 
         value = {localCity}
         onChangeText = {(city) => setLocalCity(city)}
         placeholder = {'Search city'}
         placeholderTextColor="white" 
         style = {styles.input}></TextInput>
         <TouchableOpacity onPress={() => setCity(localCity)}>
          <Icon name='search' size={28} color='white'/>
        </TouchableOpacity>
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
    },
    input: {
        flex: 1,
        paddingRight: 5,
        color:'white'
    }
})

export default Search