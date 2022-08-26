import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LoadingSpinner = () => {
  return <ActivityIndicator size={'large'} color="green" style={{flex: 1}} />;
};

export default LoadingSpinner;

const styles = StyleSheet.create({});
