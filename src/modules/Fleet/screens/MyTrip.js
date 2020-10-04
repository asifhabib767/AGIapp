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
  Button,
  TextInput,
  RefreshControl,
  Platform,
  Dimensions,
  Picker,
} from 'react-native';
import Modal from 'react-native-modal';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Polyline from '@mapbox/polyline';

import quickcar from '../images/quickcar.png';
import car from '../images/car.png';
import time from '../images/time.png';
import maptrip from '../images/maptrip.png';
import map from '../images/map.png';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import {
  getSingleTripDetaills,
  checkTourStarted,
  EntryCurrentData,
  postVerifyCustomerConfirmation,
} from '../service/VehicleTracking/VehicleLocation';
import {Form, TextValidator} from 'react-native-validator-form';
import {getMaxDistanceNTime} from '../service/VehicleTracking/VehicleLocation';
import {postsmsforchallan} from '../service/VehicleTracking/VehicleLocation';
import {postVehicleTrackingStarting} from '../service/VehicleTracking/VehicleLocation';
import {google_map_api_key} from '../config.json';

import PopUP from '../components/PopUp';
import {diffInMinutes, dateDifferenceInFormattedTime} from '../Util/TimeHelper';

import * as mapStyle from '../styles/customMapStyle';
import {LocationEnabler} from '../components/LocationEnabler';
import {PERMISSIONS, request} from 'react-native-permissions';
import * as Geolocation from '@react-native-community/geolocation';
import * as geolib from 'geolib';
import {getDistance} from 'geolib';
import Geocoder from 'react-native-geocoding';
import {
  getWorkingCenterList,
  getWorkingCenterStatusByTrip,
} from '../service/trip/TripService';

export default class MyTrip extends Component {
  state = {
    workingCenterList: [],
    workingCenterSelected: {},
    singleTripDetList: [],
    maxDistanceList: [],
    smsList: [],
    tripstartlist: [],
    isVisible: false,
    text: '',
    isModalVisible: false,
    isModalCodeVisible: false,

    isModalVisibleConfirmation: false,
    isModalCodeVisibleConfirmation: false,

    singleConfirmItem: '',

    refreshing: false,
    isTripStarted: false,
    diffTimes: '',

    // Current lat, long
    lat: '',
    long: '',
    lat_long_text: '',
    currentAddress: '',
    fullLocation: '',

    // Bangladesh Map Lat, long
    regionLatitude: 23.4502735,
    regionLongitude: 90.802897,
    regionLatitudeDelta: 1,
    regionLongitudeDelta: 1,

    region: {
      latitude: 23.4502735,
      longitude: 90.802897,
      latitudeDelta: 1,
      longitudeDelta: 1,
    },

    lastPosition: '',

    // Mapping Coords
    coords: [],
    startLoc:
      this.props.route.params.itemData.fromaddr == 'Factory'
        ? 'Akij Cement Factory'
        : this.props.route.params.fromaddr,
    destinationLoc: this.props.route.params.itemData.ThanaName,
    coordsResponse: {},

    // Api Key
    google_map_api_key: 'AIzaSyDLj-Mx1_PCXsvJnL9COV14XsKDbLyouWQ',

    //props data
    tripCode: this.props.route.params.itemData.TripCode,
    tripId: this.props.route.params.itemData.tripID,
    destinationAddress: this.props.route.params.itemData.destinationadr,
    shipRegNo: this.props.route.params.itemData.strRegNo,
    masterName: this.props.route.params.itemData.strDriverName,
  };

  componentDidMount = () => {
    Geocoder.init(this.state.google_map_api_key);
    this.initializeList();
  };

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${this.state.google_map_api_key}&language=bn&region=BD`,
      );
      let respJson = await resp.json();
      // console.log("respJson", respJson);

      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });

      this.setState({coords: coords, coordsResponse: respJson});
      return coords;
    } catch (error) {
      // alert('দুঃখিত, গুগল মেপে গন্তব্য লোকেশনটি সঠিকভাবে পাওয়া যায়নি। ');
      return error;
    }
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.initializeList().then(() => {
      this.setState({refreshing: false});
    });
  }

  onRegionChange(region) {
    // console.log("region", region);
    let that = this;

    that.setState({
      region,
      lat: region.latitude,
      long: region.longitude,
    });
  }

  initializeList = async () => {
    console.log('this.props', this.props);
    if (!this.state.isTripStarted) {
      await this.checkTourStarted();
    }

    // console.log("this.props.route.params.itemData", this.props.route.params.itemData);
    this.getWorkingCenterListData();
    // this.start();
    LocationEnabler();
    this.setGeolocationMap();
    this.getDirections(this.state.startLoc, this.state.destinationLoc);

    Form.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });

    const singleTripDetList = await getSingleTripDetaills(
      this.props.route.params.itemData.tripID,
    );

    const maxDistanceList = await getMaxDistanceNTime(
      this.props.route.params.itemData.tripID,
    );
    // console.log('maxDistanceList by props', maxDistanceList);

    // const smsList = await postsmsforchallan(
    //   this.props.route.params.itemData.intId,
    //   this.props.route.params.itemData.tripID,
    //   0
    // );

    let addressObject = '';
    let fullLocationObject = '';

    let that = this;

    Geocoder.from(that.state.lat, that.state.long)
      .then((json) => {
        var addressComponent = json.results[0].address_components[0];
        addressObject = addressComponent;
        fullLocationObject = json.results[0];
        that.setState({
          currentAddress: addressObject,
          fullLocation: fullLocationObject,
        });
      })
      .catch((error) => console.warn(error));

    that.setState({
      singleTripDetList: singleTripDetList,
      maxDistanceList: maxDistanceList,
      // smsList: smsList,
    });
  };

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
      console.log('location set error:', error);
      Alert.alert(
        'Error',
        'Sorry !! Problem in your location. Please enable it.',
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

  _twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Hello',
      //body
      'Are you sure, your trip complete ?',
      [
        {text: 'Yes', onPress: () => console.log('Yes Pressed')},
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  toggleModal = (item) => {
    if (typeof item != 'undefined') {
      this.setState({
        singleConfirmItem: item,
        workingCenterSelected: item,
      });
    }
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  toggleModalConfirm = async () => {
    try {
      const result = await EntryCurrentData(
        this.props.route.params.itemData.tripID,
        this.state,
        this.props.route.params.itemData,
      );

      const lastPosition = {
        latitude: this.state.lat,
        longitude: this.state.long,
      };
      this.setState({
        lastPosition,
        isModalVisibleConfirmation: false,
        isModalCodeVisible: false,
        isModalVisible: false,
      });
      Alert.alert('ধন্যবাদ', 'আপনার স্ট্যাটাসটি আপডেট হয়েছে !');
      this.props.navigation.replace('mytrip', {
        itemData: this.props.route.params.itemData,
      });
      // Actions.MyTrip({itemData: this.props.route.params.itemData});
    } catch (error) {
      alert(error);
    }
  };

  toggleCodeModal = () => {
    this.setState({
      isModalCodeVisible: !this.state.isModalCodeVisible,
      isModalVisibleConfirmation: !this.state.isModalVisibleConfirmation,
      isModalVisible: false,
    });
  };

  toggleCodeModalConfirm = async () => {
    if (!this.state.isModalCodeVisibleConfirmation) {
      // Check there is any code
      if (this.state.text.length > 0) {
        const messageSuccess = await postVerifyCustomerConfirmation(
          this.state,
          this.props.route.params.itemData,
          this.state.text,
        );
        this.initializeList();
        Alert.alert('আপনার কোডটি ভেরিফাইড হয়েছে !');
      } else {
        Alert.alert('দুঃখিত', 'দয়া করে কোড লিখুন !');
        return false;
      }
    }

    this.setState({
      isModalCodeVisibleConfirmation: !this.state
        .isModalCodeVisibleConfirmation,
      isModalVisible: false,
      isModalCodeVisible: false,
    });
  };

  closeCongratulationModal = () => {
    this.setState({
      isModalCodeVisibleConfirmation: false,
      isModalVisibleConfirmation: false,
      isModalVisible: false,
      isModalCodeVisible: false,
    });
  };

  startTripAction = async () => {
    await postVehicleTrackingStarting(this.props.route.params.itemData.tripID);
    this.initializeList();
  };

  checkTourStarted = async () => {
    // check if tour has been started or not
    const isTripStarted = await checkTourStarted(
      this.props.route.params.itemData.tripID,
    );
    this.setState({
      isTripStarted,
    });
  };

  start() {
    setInterval(() => {
      const diffTimes = dateDifferenceInFormattedTime(
        new Date(),
        new Date(this.props.route.params.itemData.dteOutTime),
      );

      this.setState({
        diffTimes,
      });
    }, 1000);

    setInterval(async () => {
      // console.log("enter in every minutes");
      // Add an entry in database details table
      try {
        if (this.state.isTripStarted) {
          let currentPosition = {
            latitude: parseFloat(this.state.lat),
            longitude: parseFloat(this.state.long),
          };

          let isInRadius = geolib.isPointWithinRadius(
            this.state.lastPosition,
            currentPosition,
            1,
          );
          let calcualateDistance = getDistance(
            currentPosition,
            this.state.lastPosition,
          );

          // console.log("calcualateDistance", calcualateDistance);
          // alert(calcualateDistance);

          // alert(isInRadius);
          // this.state.lastPosition != "" && !isInRadius
          if (1 === 1) {
            await EntryCurrentData(
              this.props.route.params.itemData.tripID,
              this.state,
              this.props.route.params.itemData,
            );

            const lastPosition = {
              latitude: this.state.lat,
              longitude: this.state.long,
            };
            this.setState({lastPosition});
          } else {
            await EntryCurrentData(
              this.props.route.params.itemData.tripID,
              this.state,
              this.props.route.params.itemData,
            );

            const lastPosition = {
              latitude: this.state.lat,
              longitude: this.state.long,
            };
            this.setState({lastPosition});
          }
        }
      } catch (error) {
        alert(error);
      }
    }, 5000); // In every one minutes
  }

  getWorkingCenterListData = async () => {
    const workingCenterList = await getWorkingCenterStatusByTrip(
      this.props.route.params.itemData.tripID,
    );
    this.setState({
      workingCenterList,
    });
  };

  selectWorkingList = (item) => {
    this.setState({
      workingCenterSelected: item,
    });
  };

  render() {
    let {width, height} = Dimensions.get('window');
    height = height / 2;
    console.log('render', this.props.route.params);
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
            <View style={styles.headingArea}>
              <View style={{flexBasis: '50%'}}>
                <Text style={[styles.headingOne]}> আমার ট্রিপ</Text>
                <Text style={[styles.tripNos]}>
                  ট্রিপ কোডঃ {this.state.tripCode}{' '}
                </Text>
                <Text style={[styles.tripNos]}>
                  ট্রিপ আইডিঃ #{this.state.tripId}{' '}
                </Text>
              </View>

              <View style={{flexBasis: '65%'}}>
                <Text style={[styles.location]}>
                  গন্তব্যঃ {this.state.destinationAddress}{' '}
                </Text>
                <Text style={[styles.location]}>
                  {' '}
                  শিপঃ {this.state.shipRegNo}{' '}
                </Text>
                <Text style={[styles.location]}>
                  {' '}
                  মাস্টারঃ {this.state.masterName}{' '}
                </Text>
              </View>

              {/* {!this.state.isTripStarted && (
                <View style={{flexBasis: '15%'}}>
                  <Text
                    style={styles.btnStartTrip}
                    onPress={() => this.startTripAction()}>
                    শুরু{' '}
                  </Text>
                </View>
              )} */}
              {this.state.isTripStarted && (
                <View style={{flexBasis: '18%'}}>
                  <Text
                    style={styles.btnStartTrip}
                    onPress={() => this.onRefresh()}>
                    রিফ্রেশ
                  </Text>
                </View>
              )}
            </View>
          </Animatable.View>

          <Modal isVisible={this.state.isModalVisible}>
            <View style={[styles.SuccessfulBox]}>
              <Text style={[styles.secSubTitle]}>
                আপনি কি স্ট্যাটাস আপডেট করতে চান ?
              </Text>
              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 20}}>
                <Text
                  onPress={() => this.toggleModalConfirm()}
                  style={[styles.yesbutton]}>
                  হাঁ
                </Text>
                <Text
                  onPress={() => this.toggleModal()}
                  style={[styles.nobutton]}>
                  না
                </Text>
              </View>
            </View>
          </Modal>

          {/* congratulation Modal */}
          <Modal isVisible={this.state.isModalCodeVisibleConfirmation}>
            <View style={[styles.CongratulationBox]}>
              <Image style={[styles.pumimage]} source={car} />
              <Text style={styles.congratualtion}>অভিন্দন</Text>
              <Text style={styles.trip}>আপনি ট্রিপ সফলভাবে শেষ করেছেন।</Text>

              <View style={styles.totalDistance}>
                <View style={styles.toalDistanceCount}>
                  <Text style={styles.messuredistance}>গন্তব্য পরিমাপ</Text>
                  <Text style={styles.messageDistacnetext}>
                    {typeof this.state.coordsResponse.routes != 'undefined' &&
                      this.state.coordsResponse.routes[0].legs[0].distance.text}
                  </Text>
                </View>
                {/* <View style={styles.toalDistanceCount}>
                  <Text style={styles.messuredistance}>আপনার মোট সময়</Text>
                  <Text style={styles.messageDistacnetextColor}>২৯ মিনিট</Text>
                </View> */}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => this.closeCongratulationModal()}>
                  <Text style={styles.nobutton}>বন্ধ করুন</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {typeof this.state.maxDistanceList != 'undefined' &&
            this.state.maxDistanceList.map((item, index) => (
              <View style={[styles.boxTime]} key={index}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{flex: 1, flexDirection: 'row', flexBasis: '60%'}}>
                    <View style={{flexBasis: 60}}>
                      <Image source={car} style={[styles.car]} />
                    </View>
                    <View style={{flexBasis: '65%'}}>
                      <Text style={[styles.tripNos]}> ট্রিপ কোড </Text>
                      <Text style={[styles.tripMobileNumber]}>
                        {' '}
                        {item.tripcode}{' '}
                      </Text>

                      {this.state.isTripStarted && (
                        <Text style={[styles.tripActivity]}> চলমান </Text>
                      )}
                    </View>
                  </View>
                  <View style={[styles.roundeTime]}>
                    <Text style={[styles.tripNosblack]}>
                      {/* ০০:৪৮:০০  */}
                      {this.state.diffTimes}
                    </Text>
                    <Text style={[styles.miniute]}> ঘন্টা </Text>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                  <View style={{flexBasis: 40}} />
                  <View style={{flexBasis: '40%'}}>
                    <Text style={[styles.distance]}> গন্তব্য দূরত্ব </Text>
                    <Text style={[styles.distanceMinute]}>
                      {' '}
                      {/* {item.decDistanceKM} কি মি{" "} */}
                      {typeof this.state.coordsResponse.routes != 'undefined' &&
                        this.state.coordsResponse.routes[0].legs[0].distance
                          .text}
                    </Text>
                  </View>
                  <View style={{flexBasis: '40%'}}>
                    <Text style={[styles.distance]}> পৌঁছানো সময় </Text>
                    <Text style={[styles.distanceMinute]}>
                      {' '}
                      {/* {item.decRequiredTime}{" "} */}
                      {typeof this.state.coordsResponse.routes != 'undefined' &&
                        this.state.coordsResponse.routes[0].legs[0].duration
                          .text}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                  <View style={{flexBasis: '100%'}}>
                    <Text style={[styles.distance, {textAlign: 'center'}]}>
                      গন্তব্য পথঃ{' '}
                      {typeof this.state.coordsResponse.routes != 'undefined' &&
                        this.state.coordsResponse.routes[0].summary}
                    </Text>
                  </View>
                </View>

                <View>
                  {/* Map view */}
                  <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    // style={styles.map}
                    style={{
                      width,
                      height,
                    }}
                    showsMyLocationButton={true}
                    region={this.state.region}
                    onRegionChange={(region) => this.onRegionChange(region)}
                    // customMapStyle={mapStyle.customStyle}
                  >
                    <MapView.Marker
                      coordinate={{
                        latitude: parseFloat(this.state.lat),
                        longitude: parseFloat(this.state.long),
                      }}
                      title={'My Current Location'}>
                      <MapView.Callout tooltip style={styles.customMarkerView}>
                        <TouchableOpacity underlayColor="#FFF">
                          <View style={styles.calloutText}>
                            <Text style={{marginTop: 5}} />
                          </View>
                        </TouchableOpacity>
                      </MapView.Callout>
                    </MapView.Marker>

                    <MapView.Polyline
                      coordinates={this.state.coords}
                      strokeWidth={2}
                      strokeColor="red"
                    />
                  </MapView>
                  {/* Map view */}
                </View>

                <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                  <View style={[styles.boxLogins]}>
                    <View
                      style={[
                        styles.avarageKm,
                        {
                          flex: 1,
                          flexDirection: 'row',
                          flexBasis: '100%',
                          marginLeft: 5,
                        },
                      ]}>
                      <Image source={time} style={[styles.times]} />
                      <Text
                        style={{
                          flexBasis: '100%',
                          color: '#FFF',
                          padding: 20,
                        }}>
                        আনুমানিক পৌঁছার সময় -{' '}
                        {typeof this.state.coordsResponse.routes !=
                          'undefined' &&
                          this.state.coordsResponse.routes[0].legs[0].duration
                            .text}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}

          <Animatable.View animation="fadeInUp" style={{marginTop: 20}}>
            <View style={[styles.boxTime]}>
              <Text style={[styles.sellInfo]}>
                লোডিং এবং ডিসচার্জিং স্ট্যাটাস
              </Text>
              <Text style={{marginTop: 5, textAlign: 'center'}}>
                {' '}
                স্ট্যাটাস আপডেট করতে নিচে ক্লিক করুন
              </Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 20,
                  flexWrap: 'wrap',
                }}>
                {this.state.workingCenterList.map((item, index) => (
                  <View
                    style={{
                      flexBasis: '45%',
                      flexGrow: 1,
                      marginRight: 5,
                      marginTop: 5,
                    }}>
                    {item.intID}
                    <TouchableOpacity>
                      <Text
                        style={[
                          !item.ysnstatus
                            ? styles.buttonInactive
                            : styles.completeButton,
                        ]}
                        onPress={() =>
                          !item.ysnstatus
                            ? this.toggleModal(item)
                            : Alert.alert(
                                'দুঃখিত',
                                'এটার স্ট্যাটাস অলরেডি আপডেট করা হয়েছে !',
                              )
                        }>
                        {item.ysnstatus ? '✓ ' : ' '}
                        {item.strworkingcenter}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </Animatable.View>

          {/* <Animatable.View animation="fadeInUp">
            <View>
              <LinearGradient
                colors={['#01B288', '#01B288']}
                style={styles.linearGradient}>
                <TouchableOpacity onPress={this.login}>
                  <Text style={styles.buttonText}>ট্রিপ সম্পূর্ণ শেষ করুন</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </Animatable.View> */}
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
  },
  headingArea: {
    paddingVertical: 20,
    flexDirection: 'row',
    flex: 1,
    flexBasis: '100%',
  },
  boxTime: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 20,
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
    fontSize: RFPercentage(2.3),
    marginLeft: 5,
    lineHeight: 30,
    textAlign: 'left',
    width: '100%',
  },
  tripMobileNumber: {
    color: '#1A1818',
    fontSize: RFPercentage(2.3),
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
    fontSize: RFPercentage(2.3),
    textAlign: 'center',
  },

  miniute: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.3),
    lineHeight: 40,
    textAlign: 'center',
  },

  roundeTime: {
    flexBasis: '30%',
    backgroundColor: '#064CB5',
    borderRadius: 10,
    textAlign: 'center',
    paddingTop: 15,
  },
  distance: {
    color: '#231F20',
    fontSize: RFPercentage(2.3),
  },
  distanceMinute: {
    color: '#231F20',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.3),
  },
  maptrip: {
    resizeMode: 'cover',
    width: '100%',
    height: 120,
  },
  boxLogin: {
    flex: 1,
    flexDirection: 'row',
    flexBasis: '48%',
    backgroundColor: '#064CB5',
    height: 80,
    paddingTop: 5,
    marginRight: 10,
  },
  boxLogins: {
    flex: 1,
    flexDirection: 'row',
    flexBasis: '48%',
    backgroundColor: '#2E3192',
    height: 80,
    paddingTop: 5,
  },
  times: {
    width: 25,
    height: 25,
    marginTop: 20,
    marginLeft: 5,
  },
  avarageSpeed: {
    color: '#fff',
    fontSize: RFPercentage(2.2),
  },
  avarageKm: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.3),
  },
  sellInfo: {
    color: '#fff',
    fontSize: RFPercentage(2.3),
    backgroundColor: '#393CA4',
    textAlign: 'center',
    lineHeight: 50,
  },
  name: {
    color: '#000',
    fontSize: RFPercentage(2.3),
    fontWeight: 'bold',
  },
  location: {
    color: '#000',
    fontSize: RFPercentage(2.5),
  },
  completeButton: {
    color: '#fff',
    fontSize: RFPercentage(2.5),
    backgroundColor: '#01B288',
    textAlign: 'center',
    borderRadius: 50,
    paddingVertical: 15,
  },

  buttonInactive: {
    color: '#000',
    fontSize: RFPercentage(2.5),
    backgroundColor: '#ddd',
    textAlign: 'center',
    borderRadius: 50,
    paddingVertical: 15,
  },

  linearGradient: {
    borderRadius: 5,
    marginTop: 50,
  },

  buttonText: {
    fontSize: RFPercentage(2.3),
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  SuccessfulBox: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
    height: 250,
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  CongratulationBox: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
    height: 400,
    paddingVertical: 40,
    paddingHorizontal: 10,
  },

  secSubTitle: {
    color: '#232A2F',
    textAlign: 'center',
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
  },
  buttonView: {
    marginTop: 20,
  },
  yesbutton: {
    backgroundColor: '#34C787',
    width: 100,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    color: '#fff',
    borderRadius: 50,
    marginRight: 10,
    fontSize: RFPercentage(2.5),
  },
  nobutton: {
    backgroundColor: '#D32F2F',
    width: 100,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    color: '#fff',
    borderRadius: 50,
    fontSize: RFPercentage(2.5),
  },
  InputField: {
    color: '#000aaff0',
    fontSize: 12,
    fontWeight: '300',
    fontFamily: 'popppins',
    borderRadius: 0.1,
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    marginBottom: 10,
    width: '100%',
    // borderRightWidth: 1,
    // borderLeftWidth: 1
  },
  confimationCode: {
    paddingVertical: 10,
  },

  confirmInput: {
    height: 50,
    width: 200,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    alignItems: 'center',
  },
  congratualtion: {
    color: '#26C8A1',
    fontSize: 40,
    fontWeight: 'bold',
  },
  trip: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  totalDistance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  toalDistanceCount: {
    flexBasis: '50%',
    paddingVertical: 20,
  },
  messuredistance: {
    fontSize: RFPercentage(2),
  },
  messageDistacnetext: {
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
  },
  messageDistacnetextColor: {
    fontWeight: 'bold',
    color: '#26C8A1',
    fontSize: RFPercentage(2),
  },
  closeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  btnStartTrip: {
    backgroundColor: '#26C8A1',
    borderRadius: 10,
    textAlign: 'center',
    padding: 10,
    color: '#FFF',
  },
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
