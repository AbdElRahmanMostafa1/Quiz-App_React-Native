import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import GlobalStyles from '../constants/GlobalStyles';

const SelectField = ({label, data, onSelect}) => {
  return (
    <View style={styles.selectFieldContainer}>
      <Text style={styles.selectDropdownLabel}>{label}</Text>
      <SelectDropdown
        dropdownOverlayColor={'#00000090'}
        defaultButtonText={data ? data[0].name : 'Loading...'}
        disabled={!data}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        dropdownStyle={styles.dropdownStyle}
        selectedRowTextStyle={styles.selectedRowTextStyle}
        selectedRowStyle={styles.selectedRowStyle}
        data={data}
        onSelect={onSelect}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.name;
        }}
      />
    </View>
  );
};

export default SelectField;

const styles = StyleSheet.create({
  selectFieldContainer: {
    marginVertical: GlobalStyles.spacing.margin,
  },
  selectDropdownLabel: {
    marginBottom: 4,
    ...GlobalStyles.textStyles,
  },
  buttonStyle: {
    backgroundColor: 'green',
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  buttonTextStyle: {
    color: 'white',
  },
  dropdownStyle: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  selectedRowTextStyle: {
    color: 'white',
  },
  selectedRowStyle: {
    backgroundColor: '#293462',
  },
});
