import {StatusBar, StyleSheet, AppState, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification';

import SplashScreen from './src/screens/SplashScreen';
import QuizConfigScreen from './src/screens/QuizConfigScreen';
import QuizScreen from './src/screens/QuizScreen';
import {Provider} from 'react-redux';
import store from './src/store';
import ScoreScreen from './src/screens/ScoreScreen';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from './src/screens/NoInternetScreen';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashScreenTime, setIsSplashScreen] = useState(true);
  const [isInternetConnected, setIsInternetConnected] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setTimeout(() => setIsSplashScreen(false), 3000);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      state.isConnected
        ? setIsInternetConnected(true)
        : setIsInternetConnected(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'inactive' || nextAppState === 'background') {
        const oneDayInMilliseconds = 86400000;

        setTimeout(() => {
          if (Platform.OS === 'ios') {
            PushNotificationIOS.addNotificationRequest({
              body: 'You have not opened the app in 1 day!',
            });
          } else {
            PushNotification.scheduleLocalNotification({
              message: "It's been 1 day since you last opened the app!",
              date: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });
          }
        }, oneDayInMilliseconds);
      }
    };
    AppState.addEventListener('change', handleAppStateChange);

    return () => AppState.removeEventListener('change', handleAppStateChange);
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
