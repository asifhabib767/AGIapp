import React from 'react';
import {Text, StyleSheet} from 'react-native';

import * as config from '../../main_config.json';
const AppVersion = (props) => {
  return (
    <Text style={[styles.versionName, props.style]}> {config.app_version}</Text>
  );
};
const styles = StyleSheet.create({
  versionName: {
    fontSize: 15,
    marginLeft: 5,
    borderRadius: 10,
    paddingRight: 5,
    paddingLeft: 5,
    color: '#FFF',
    backgroundColor: '#3548A5',
  },
});
export default AppVersion;
