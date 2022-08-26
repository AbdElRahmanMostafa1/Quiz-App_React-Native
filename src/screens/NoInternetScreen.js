import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

const NoInternetScreen = () => {
  const width = useWindowDimensions();
  return (
    <>
      <View style={{height: '100%', flex: 1, backgroundColor: '#FFF'}}>
        <Lottie
          source={require('../assets/no-internet/lf30_editor_fxxurfme.json')}
          autoPlay
          loop
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 24,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '600',
              fontSize: 18,
              textAlign: 'center',
            }}>
            Please Check your Internet connection
          </Text>
        </View>
      </View>
    </>
  );
};

export default NoInternetScreen;

const styles = StyleSheet.create({});
