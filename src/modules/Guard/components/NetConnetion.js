import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ToastAndroid,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import NetIcon from '../images/logoNet.jpg';

class NetConnection extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection !</Text>
        </View>

        <View style={styles.netImageSec}>
          <Image source={NetIcon} style={styles.imageRes} />
          <Text style={styles.heading}>Ooops!</Text>
          <Text style={styles.childText}>No Internet Connection found</Text>
          <Text style={styles.childText}>Check Your connection to use</Text>
          <Text
            style={[styles.childText, {fontWeight: 'bold', color: '#1F267C'}]}>
            Akij Cement Engineers App
          </Text>
        </View>
      </View>
    );
  }
}
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  offlineContainer: {
    textAlign: 'center',
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0,
  },
  offlineText: {color: '#fff'},
  netImageSec: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageRes: {
    resizeMode: 'contain',
    width: 250,
  },
  heading: {
    fontSize: 51,
    color: '#ccc',
    fontWeight: 'bold',
  },
  childText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
export default NetConnection;
