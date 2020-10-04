'use strict';

import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ScanData,
  Alert,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {Actions} from 'react-native-router-flux';
import {ScanDataHandling} from '../../actions/unloadvehicle/UnlaodVehicleAction';
import {decryptCode, encryptCode} from '../../../Master/Util/EncryptedCode';

export default class UnloadScanScreen extends Component {
  onSuccess = async (response) => {
    const scanData = response.data;
    const scanString = scanData;
    let tripCode = '';
    if (scanString.indexOf('^') > 0) {
      tripCode = scanString.substr(0, scanString.indexOf('^'));
    } else {
      tripCode = scanString;
    }

    if (tripCode.length === 0) {
      Alert.alert('Warning', 'Trip Code can not be detected !!');
      return false;
    }

    let responseData = await ScanDataHandling(decryptCode(tripCode));

    let encryptData = encryptCode(responseData.data.trip.strCode);

    if (responseData.status) {
      Alert.alert(
        'Trip Code Detected : ',
        `Code: ${encryptData}\nPlease Unload Vehicle`,
      );
      this.props.navigation.navigate('addUnloadVehicle', responseData);
    }
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            {/* Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code. */}
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={[styles.buttonText, {marginTop: -30}]}>
              Put Your Mobile Onto the QR Code
            </Text>
          </TouchableOpacity>
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
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent('default', () => UnloadScanScreen);
