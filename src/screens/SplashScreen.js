import {
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import RenderHTML from 'react-native-render-html';

const SplashScreen = () => {
  const width = Number(useWindowDimensions());
  return (
    <>
      <StatusBar hidden={false} barStyle="dark-content" />
      <View style={{height: '100%', flex: 1, backgroundColor: '#008000'}}>
        <Lottie
          source={require('../assets/splash/splash.json')}
          autoPlay
          loop
        />
        <View style={{flex: 1}}></View>
        <View
          style={{
            padding: 8,
            backgroundColor: '#4e4e4e',
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            This Application is made by AbdElRahman Mostafa{' '}
          </Text>
          <RenderHTML
            contentWidth={width}
            source={{html: '&copy'}}
            baseStyle={{color: 'white'}}
          />
        </View>
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
