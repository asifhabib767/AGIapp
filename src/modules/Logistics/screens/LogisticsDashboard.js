import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Platform,
  RefreshControl,
  FlatList,
} from 'react-native';

import quickcar from '../images/quickcar.png';
import car from '../images/car.png';
import time from '../images/time.png';
import map from '../images/map.png';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import {getGrandTotalTrip} from '../service/VehicleTracking/VehicleLocation';
import {getCurrentStatusNTripPending} from '../service/VehicleTracking/VehicleLocation';
import {Form, TextValidator} from 'react-native-validator-form';
import {PERMISSIONS, request} from 'react-native-permissions';
import * as Geolocation from '@react-native-community/geolocation';
import {LocationEnabler} from '../components/LocationEnabler';
import {dateDifferenceInFormattedTime} from '../Util/TimeHelper';
// import * as LocalizeHelper from '../Util/LocalizeHelper';
// import * as RNLocalize from "react-native-localize";

export default class LogisticsDashboard extends Component {
  state = {
    grandTotalTripList: [],
    pendingTripList: [],

    // Map Data
    lat: '',
    long: '',
    lat_long_text: '',

    // refreshing
    refreshing: false,
    isTripStarted: false,
    diffTimes: '',
  };

  componentDidMount = () => {
    LocationEnabler();
    this.initializeList();
    this.setGeolocationMap();

    Form.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  };

  initializeList = async () => {
    const grandTotalTripList = await getGrandTotalTrip();
    const pendingTripList = await getCurrentStatusNTripPending();

    this.setState({
      grandTotalTripList: grandTotalTripList,
      pendingTripList: pendingTripList,
    });

    setInterval(() => {
      this.setGeolocationMap();
    }, 1000); // In every seconds
  };

  getTripTimeStatus(time) {
    const diffTimes = dateDifferenceInFormattedTime(new Date(), new Date(time));
    return diffTimes;
  }

  setGeolocationMap = () => {
    try {
      let geoOptions = {
        enableHighAccuracy: false,
        timeOut: 20000,
        maximumAge: 60 * 60 * 24,
      };

      request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
      ).then((res) => {
        if (res == 'granted') {
          Geolocation.getCurrentPosition(
            this.geoSuccess,
            this.geoFailure,
            geoOptions,
          );
          Geolocation.watchPosition(
            this.geoSuccess,
            this.geoFailure,
            geoOptions,
          );
        } else {
          LocationEnabler();
        }
      });
    } catch (error) {
      Alert.alert(
        'দুঃখিত',
        'আপনার লোকেশন চালু করুন, অন্যথায় এপটি ব্যবহার করতে পারবেন না !',
      );
    }
  };

  geoSuccess = (position) => {
    try {
      this.setState({
        lat: position.coords.latitude.toString(),
        long: position.coords.longitude.toString(),
        lat_long_text:
          'Lat: ' +
          position.coords.latitude.toString() +
          ' Long: ' +
          position.coords.longitude.toString(),
      });
    } catch (error) {
      console.log('Google Map Error: ', position);
    }
  };

  geoFailure = (err) => {
    console.log('map err message', err);
  };

  onRefresh() {
    this.setState({refreshing: true});
    this.initializeList().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
        <SafeAreaView>
          <Animatable.View animation="fadeInUp">
            <View style={{paddingVertical: 15}}>
              <Text style={[styles.headingOne]}> বর্তমান অবস্থা </Text>
            </View>
          </Animatable.View>

          <View style={[styles.profileMenu]}>
            {this.state.grandTotalTripList.map((item, index) => (
              <View style={{flexBasis: '48%', marginHorizontal: 5}} key={index}>
                <Animatable.View animation="fadeInUp">
                  <View style={[styles.Box]}>
                    <View style={{flexBasis: 50, marginRight: 10}}>
                      <Image source={quickcar} style={[styles.quickcar]} />
                    </View>
                    <View style={{flexBasis: '75%'}}>
                      <Text style={[styles.tripNo]}> {item.DayTotaltrip} </Text>

                      <Text style={[styles.tripDone]}>
                        {' '}
                        আজকের সম্পন্ন ট্রিপস{' '}
                      </Text>
                    </View>
                  </View>
                </Animatable.View>
              </View>
            ))}
            <View style={{flexBasis: '48%'}}>
              {this.state.grandTotalTripList.map((item, index) => (
                <Animatable.View animation="fadeInUp" key={index}>
                  <View style={[styles.Box]}>
                    <View style={{flexBasis: 50, marginRight: 10}}>
                      <Image source={quickcar} style={[styles.quickcar]} />
                    </View>
                    <View style={{flexBasis: '75%'}}>
                      <Text style={[styles.tripNo]}>
                        {' '}
                        {item.MonthTotaltrip}{' '}
                      </Text>
                      <Text style={[styles.tripDone]}>
                        {' '}
                        এই মাসে সম্পন্ন ট্রিপস{' '}
                      </Text>
                    </View>
                  </View>
                </Animatable.View>
              ))}
            </View>
          </View>

          <Animatable.View animation="fadeInUp">
            <View style={{paddingVertical: 15}}>
              <Text style={[styles.headingOne]}> আমার ট্রিপসমূহ </Text>
            </View>

            <FlatList
              data={this.state.pendingTripList}
              renderItem={({item, index, separators}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('mylogisticstrip', {
                      itemData: item,
                    })
                  }>
                  <Animatable.View animation="fadeInUp" key={index}>
                    <View style={[styles.boxTime]}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            flexBasis: '60%',
                          }}>
                          <View style={{flexBasis: 60}}>
                            <Image source={car} style={[styles.car]} />
                          </View>
                          <View style={{flexBasis: '65%'}}>
                            <Text style={[styles.tripNos]}> ট্রিপ কোড </Text>
                            <Text style={[styles.tripMobileNumber]}>
                              {item.tripcode}{' '}
                            </Text>
                            {index === 0 && (
                              <Text style={[styles.tripActivity]}> চলমান </Text>
                            )}
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          marginTop: 20,
                        }}>
                        <View style={{flexBasis: 40}} />
                        <View style={{flexBasis: '65%'}}>
                          <Text style={[styles.location]}>
                            {item.fromaddr}{' '}
                          </Text>
                          <Text style={[styles.location]}>
                            {' '}
                            {item.toaddress}{' '}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Animatable.View>
                </TouchableOpacity>
              )}
            />
          </Animatable.View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 4,
    backgroundColor: '#F2F8FF',
  },

  profileMenu: {
    flex: 1,
    flexDirection: 'row',
    resizeMode: 'stretch',
  },
  headingOne: {
    color: '#1A1818',
    fontWeight: 'bold',
    fontSize: RFPercentage(3),
    marginLeft: 5,
  },
  Box: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 5,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
  },
  quickcar: {
    resizeMode: 'stretch',
    width: 50,
    height: 28,
    marginVertical: 35,
    marginLeft: 5,
  },
  tripNo: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: RFPercentage(3),
    marginLeft: 5,
  },
  tripDone: {
    color: '#1A1818',
    fontSize: RFPercentage(2.2),
    marginLeft: 5,
  },
  car: {
    resizeMode: 'stretch',
    width: 64,
    height: 73,
  },
  tripNos: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
    marginLeft: 5,
    lineHeight: 30,
  },
  tripMobileNumber: {
    color: '#1A1818',
    fontSize: RFPercentage(2.5),
    marginLeft: 5,
    fontWeight: 'bold',
  },
  tripActivity: {
    color: '#1A1818',
    fontSize: RFPercentage(2.2),
    marginLeft: 5,
    backgroundColor: '#26C8A1',
    width: 100,
    textAlign: 'center',
    color: '#fff',
    borderRadius: 50,
    marginTop: 10,
  },
  tripNosblack: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.2),
    marginLeft: 5,
    lineHeight: 30,
  },
  boxTime: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 5,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
  },
  miniute: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
    marginLeft: 5,
    lineHeight: 30,
  },
  time: {
    width: 35,
    height: 35,
    marginVertical: 20,
  },
  location: {
    color: '#000',
    fontSize: RFPercentage(2.2),
    lineHeight: 30,
  },
  map: {
    width: 120,
    height: 75,
    resizeMode: 'stretch',
    marginLeft: -30,
  },
  timeCalculation: {
    flex: 1,
    flexDirection: 'row',
    flexBasis: '10%',
    backgroundColor: '#D71920',
    borderRadius: 10,
    height: 80,
    paddingTop: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
