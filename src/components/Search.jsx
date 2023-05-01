import { View, TextInput, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Icon from 'react-native-vector-icons/Ionicons'

const Search = () => {
  return (
    <View style = {styles.search}>
        <TextInput style = {styles.input}></TextInput>
        <Icon name='search' size={28} color='white'/>
    </View>
  )
}

const styles = StyleSheet.create({
    search: {
        backgroundColor: 'transparent',
        width: '100%',
        borderRadius:10,
        marginTop: Constants.statusBarHeight + 15,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderColor: 'white',
        borderWidth: 2,
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        paddingRight: 5
    }
})

export default Search