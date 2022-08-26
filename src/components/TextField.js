import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect} from 'react';
import GlobalStyles from '../constants/GlobalStyles';

const TextField = (
  {label, value, defaultValue, onChangeText, textError},
  props,
) => {
  return (
    <View style={styles.textFieldContainer}>
      <Text style={textError ? styles.labelDisabled : styles.label}>
        {label}
      </Text>
      <TextInput
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        style={
          textError
            ? styles.textInputContainerDisabled
            : styles.textInputContainer
        }
        keyboardType="phone-pad"
        maxLength={2}
        {...props}
      />
      {textError && (
        <Text style={{color: 'crimson', textAlign: 'center'}}>{textError}</Text>
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  textFieldContainer: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 4,
    ...GlobalStyles.textStyles,
  },
  labelDisabled: {
    marginBottom: 4,
    ...GlobalStyles.textStyles,
    color: 'red',
  },
  textInputContainer: {
    padding: 8,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
  },
  textInputContainerDisabled: {
    padding: 8,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    color: 'red',
  },
});
