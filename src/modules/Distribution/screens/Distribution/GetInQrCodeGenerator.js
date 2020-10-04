import React, {Component} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {View, StyleSheet, Text, Button} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {encryptCode} from './../../../Master/Util/EncryptedCode';

const GetInQrCodeGenerator = (props) => {
  console.log('qr code value', props.route.params.ScanValue);
  let code = props.route.params.ScanValue;
  const TripCodeValue = code.strCode + '^' + code.strRegNo;

  return (
    <View style={styles.container}>
      <Text style={styles.tripCode}>
        Your Trip Code Is :{' '}
        <Text style={styles.qrText}>{encryptCode(code.strCode)}</Text>
      </Text>
      <Text style={styles.regiText}>
        Vehicle No is : <Text style={styles.qrText}>{code.strRegNo}</Text>
      </Text>
      <View style={styles.qrcode}>
        <QRCode value={TripCodeValue} />
        <Text style={styles.qrText}>#{encryptCode(code.strCode)}</Text>
        <Text style={styles.qrText}>{code.strRegNo}</Text>
        <View>
          {/* <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('print', {ScanValue: code})
            }>
            <Text>Print</Text>
            <Text></Text>
          </TouchableOpacity> */}
          <Button
            title="Print"
            onPress={() => {
              props.navigation.navigate('print', {ScanValue: code});
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tripCode: {
    textAlign: 'center',
    fontSize: 25,
    padding: 20,
  },
  qrText: {
    color: '#000',
  },
  regiText: {
    fontSize: 14,
    textAlign: 'center',
  },
  qrcode: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  printButton: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#3A2767',
    textAlign: 'center',
  },
});
export default GetInQrCodeGenerator;
