'use strict';

import React, {Component} from 'react';
import {Toggle} from '@ui-kitten/components';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreenPacker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlashOn: false,
      checked: false,
    };
  }
  onSuccess = async (response) => {
    const scanData = response.data;
    const scanString = scanData;
    let tripCode = '';
    let bagsQty = 0;
    if (scanString.indexOf('^') > 0) {
      tripCode = scanString.substr(0, scanString.indexOf('^'));
      bagsQty = scanString.substr(2, scanString.indexOf('^'));

      const firstPosition = scanString.indexOf("^");
      const newScanString = scanString.substring(firstPosition+1, scanString.length);
      const secondPosition = newScanString.indexOf("^")+firstPosition+1;
      bagsQty = scanString.substring(firstPosition+1, secondPosition);
    } else {
      tripCode = scanString;
    }

    if (tripCode.length === 0) {
      Alert.alert('Warning', 'Trip Code can not be detected !!');
      return false;
    }

    console.log('this.props in scan screen: ', this.props);
    console.log('bagsQty  in scan screen: ', bagsQty);

    this.props.navigation.navigate('packerAssign', {
      data: bagsQty,
      packerData: typeof this.props.route.params != 'undefined' ? this.props.route.params.packerData : ''
    });

    // let tripDetailsData = await GetTripDetailsByTripCode(tripCode);

    // this.props.navigation.navigate('assignVehicle', {scanData: tripCode});
    // alert(scanData);
    // Actions.Entry({ scanData: scanData });
    // alert(e.data);
    //Actions.dashboard({scanData: e.da});
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
  };

  onCheckedChange = (isChecked) => {
    this.setState({checked: isChecked});
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        // flashMode={
        //   this.state.checked
        //     ? RNCamera.Constants.FlashMode.torch
        //     : RNCamera.Constants.FlashMode.off
        // }
        bottomContent={
          <View>
            <Text style={styles.buttonText}>Barcode Scanning...</Text>
            <Toggle
              checked={this.state.checked}
              onChange={this.onCheckedChange}>
              <Text style={{color: 'red'}}>
                {' '}
                {`Flas Light: ${this.state.checked ? 'ON' : 'OFF'}`}
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
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent('default', () => ScanScreenPacker);
