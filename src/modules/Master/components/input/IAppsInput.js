import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Spinner, Input} from '@ui-kitten/components';
import {RFPercentage} from 'react-native-responsive-fontsize';
import IAppsInputLabel from './IAppsInputLabel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const IAppsInput = (props) => {
  console.log(props.isDisabled);
  return (
    <>
      <IAppsInputLabel label={props.label} />

      {props.isDisabled != undefined && (
        <Text style={styles.disabledInput}>{props.value}</Text>
      )}

      {props.isDisabled == undefined && (
        <Input
          size="large"
          // label={props.label}
          name={props.name}
          editable={props.editable}
          onChangeText={props.onChangeText}
          defaultValue={props.defaultValue}
          value={props.value}
          placeholder={props.placeholder}
          textStyle={[styles.input, props.inputStyle]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    color: '#1C2761',
    fontSize: RFPercentage(2.6),
  },
  disabledInput: {
    color: '#1C2761',
    fontSize: RFPercentage(2.6),
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    borderRadius: 5,
  },
});
export default IAppsInput;
