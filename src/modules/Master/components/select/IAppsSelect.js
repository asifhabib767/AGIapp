import React from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {Spinner, Input} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import IAppsInputLabel from './../input/IAppsInputLabel';
const IAppsSelect = (props) => {
  return (
    <View>
      <IAppsInputLabel label={props.label} />
      <DropDownPicker
        items={props.items}
        label={props.label}
        defaultValue={props.defaultValue}
        onChangeItem={props.onChangeItem}
        dropDownStyle={{
          backgroundColor: '#fff',
          zIndex: 10000000000000000000000000,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controlContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('50%'),
  },
});
export default IAppsSelect;
