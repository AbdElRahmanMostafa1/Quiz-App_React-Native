import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './src/screens/SplashScreen';
import QuizConfigScreen from './src/screens/QuizConfigScreen';
import QuizScreen from './src/screens/QuizScreen';
import {Provider} from 'react-redux';
import store from './src/store';
import ScoreScreen from './src/screens/ScoreScreen';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from './src/screens/NoInternetScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashScreenTime, setIsSplashScreen] = useState(true);
  const [isInternetConnected, setIsInternetConnected] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsSplashScreen(false), 3000);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      state.isConnected
        ? setIsInternetConnected(true)
        : setIsInternetConnected(false);
    });
    // unsubscribe();
    return () => unsubscribe();
  }, []);

  if (!isInternetConnected) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {isSplashScreenTime && (
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
          )}
          <Stack.Screen
            name="NoInternetScreen"
            component={NoInternetScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {isSplashScreenTime && (
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
              />
            )}
            <Stack.Screen
              name="QuizConfig"
              component={QuizConfigScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="QuizScreen"
              component={QuizScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ScoreScreen"
              component={ScoreScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
