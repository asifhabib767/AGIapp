import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const IAppsInputLabel = (props) => {
  return (
      <Text style={[styles.inputLabel, props.styles]}>{props.label}</Text>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    color: '#1C2761',
    paddingBottom: 5,
    fontSize: RFPercentage(2.5),
    paddingTop: 5,
  },
});
export default IAppsInputLabel;
