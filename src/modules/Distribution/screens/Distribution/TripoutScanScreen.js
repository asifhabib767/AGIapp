'use strict';

import React, {Component} from 'react';
import {Toggle} from '@ui-kitten/components';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ScanData,
  Alert,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {Actions} from 'react-native-router-flux';
import {RNCamera} from 'react-native-camera';
import {tripInfoUpdateNRollbackAPI} from './../../actions/distribution/TripOutScreenAction';
import {decryptCode} from '../../../Master/Util/EncryptedCode';

export default class TripoutScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlashOn: false,
      checked: false,
    };
  }

  onSuccess = (response) => {
    const scanData = response.data;
    const scanString = scanData;
    let tripCode = '';
    if (scanString.indexOf('^') > 0) {
      alert('if');
      tripCode = scanString.substr(0, scanString.indexOf('^'));
    } else {
      tripCode = scanString;
    }

    if (tripCode.length === 0) {
      Alert.alert('Warning', 'Trip Code can not be detected !!');
      return false;
    }

    let tripComplete = tripInfoUpdateNRollbackAPI(decryptCode(tripCode));

    if (tripComplete) {
      Alert.alert('Success', 'Gate Out Completed Successfully !');
      this.props.navigation.navigate('tripOut');
    }
  };

  onCheckedChange = (isChecked) => {
    this.setState({checked: isChecked});
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={
          this.state.checked
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        bottomContent={
          <View>
            <Text style={styles.buttonText}>
              Put your camera on QR Code to Scan..
            </Text>
            <Toggle
              checked={this.state.checked}
              onChange={this.onCheckedChange}>
              <Text style={{color: 'red'}}>
                {' '}
                {`Flash Light: ${this.state.checked ? 'ON' : 'OFF'}`}
              </Text>
            </Toggle>
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 15,
    color: '#FFF',
    marginTop: -15,
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent('default', () => TripoutScanScreen);
