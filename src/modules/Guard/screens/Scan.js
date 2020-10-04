"use strict";

import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ScanData,
  Alert,
} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
// import { Actions } from "react-native-router-flux";
import { addScan } from "../service/scan/ScanService";

export default class Scan extends Component {
  onSuccess = async (response) => {
    let scanData = response.data;
    //Actions.dashboard({scanData: e.da});

    let postData = [
      {
        decLatitude: 120,
        decLongitude: 140,
        strScannedInfo: scanData,
      },
    ];

    // let responseData = await addScan(postData);
    this.props.navigation.navigate("taskList", { data: scanData });

    // Linking.openURL(scanData).catch((err) =>
    //   alert("Unsuccessful! Please try again.")
    // );
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        // flashMode={QRCodeScanner.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            {/* Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code. */}
            Take your camera onto the barcode
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>Barcode Scanning...</Text>
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
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent("default", () => Scan);
