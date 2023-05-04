import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import Search from './src/components/Search';
import WeatherCard from './src/components/WeatherCard';
import backgroundBlue from './src/Assets/Background/Bg2.jpg'
import { useState } from 'react';

export default function App() {

  return (
    <SafeAreaView style={styles.mainView}>
      <Image source={backgroundBlue} style={styles.bgImage}></Image>
      <View style={styles.appContainer}>
        <Search />
        <WeatherCard temperature={40} place = {'Puebla'} date = {`${new Date()}`.substring(0,10)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#212120',
    alignItems: 'center',
  },
  appContainer:{
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%'
  },
  bgImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top:0,
    left:0,
    zIndex: -10
  }
})