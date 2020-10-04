import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-community/async-storage';
import * as Geolocation from '@react-native-community/geolocation';
import {Actions} from 'react-native-router-flux';
import {postAttendanceData} from '../Attendance/AttendanceService';

export default class AddAttendance extends Component {
  constructor() {
    super();
    this.state = {
      latitude: '',
      longitude: '',
      error: null,
      ready: false,
      error: null,
      isLoading: false,
    };
  }

  async componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: false,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };

    Geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions,
    );

    Geolocation.watchPosition(this.geoSuccess, this.geoFailure, geoOptions);
    Actions.refresh();
  }

  submit = async () => {
    this.setState({isLoading: true});
    Geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions,
    );

    const {latitude, longitude} = this.state;

    let attendanceData = await postAttendanceData(latitude, longitude);

    Alert.alert(
      'Message',
      attendanceData,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.props.navigation.navigate('attendanceList'),
        },
      ],
      {cancelable: false},
    );

    console.log('attendance app', attendanceData);
    this.setState({isLoading: false});
  };

  geoSuccess = (position) => {
    console.log(position);

    this.setState({
      ready: true,
      latitude: position.coords.latitude.toString(),
      longitude: position.coords.longitude.toString(),
    });
  };
  geoFailure = (err) => {
    this.setState({error: err.message});
  };

  render() {
    return (
      <View>
        <ScrollView style={[styles.fullbg]}>
          <SafeAreaView style={styles.container}>
            <View style={[styles.AccountDetailsArea]}>
              <Text style={[styles.sectionTitle]}> Add Attendance </Text>

              <View style={[styles.boxGrid]}>
                <View style={{flexBasis: '75%'}}>
                  {/* <Text style={[styles.inputLebel]}> Unit </Text> */}
                  {/* <TextInput  
                                            style={[styles.InputField]}  
                                            placeholder="ACCL, CORPORATE OFFICE" 
                                            value="Akij Cement Company LTD" 
                                        />  */}
                  {/* <Text
                    style={[styles.InputField]}
                    placeholder="ACCL, CORPORATE OFFICE">
                    {{ getUnitName() }}
                  </Text> */}
                </View>

                {/* <View style={{flexBasis: '25%', marginLeft: 10}}>
                  <TouchableOpacity
                    style={[styles.userStyles]}
                    onPress={() => Actions.refresh()}>
                    <View>
                      <Icon name="retweet" size={23} color="#2E3192" />
                    </View>
                  </TouchableOpacity>
                </View> */}
              </View>

              <View style={[styles.boxGrid]}>
                <View style={{flexBasis: '48%', marginRight: 10}}>
                  <View>
                    <Text style={[styles.inputLebel]}> LONGITUDE </Text>
                    <Text style={[styles.InputField]} placeholder="00.000000">
                      {this.state.longitude}
                    </Text>
                  </View>
                </View>

                <View style={{flexBasis: '48%'}}>
                  <View>
                    <Text style={[styles.inputLebel]}> LATITUDE </Text>
                    <Text style={[styles.InputField]} placeholder="00.000000">
                      {this.state.latitude}{' '}
                    </Text>
                  </View>
                </View>
              </View>

              {/* 
                                <View> 
                                    <Text style={[styles.buttonStyle]} onPress={this.login}> lOG IN </Text>
                               </View> */}
              <View>
                {!this.state.isLoading && (
                  <TouchableOpacity onPress={this.submit}>
                    <Text style={[styles.buttonStyle]}> Submit </Text>
                  </TouchableOpacity>
                )}
                {this.state.isLoading && (
                  <View>
                    <Text style={[styles.buttonStyle]}>Submitting ...</Text>
                  </View>
                )}
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: '#F2F8FF',
  },

  container: {
    width: '95%',
    margin: 8,
  },
  sectionTitle: {
    fontSize: RFPercentage(3),
    color: '#000000',
    fontWeight: '700',
    paddingBottom: 10,
    textTransform: 'uppercase',
  },

  AccountDetailsArea: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 3, height: 113},
  },

  boxGrid: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },

  AccountDetails: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D2D2D',
    paddingBottom: 10,
  },

  inputLebel: {
    fontSize: RFPercentage(2.5),
    textAlign: 'left',
    color: '#707070',
    fontWeight: 'bold',
  },

  InputField: {
    height: 40,
    textAlign: 'center',
    paddingVertical: 6,
    fontSize: RFPercentage(2),
    fontSize: 16,
    marginBottom: 10,
    marginTop: 5,
    fontWeight: 'bold',
    backgroundColor: '#D7E8FB',
  },

  userStyles: {
    width: '60%',
    height: '60%',
    backgroundColor: '#D7E8FB',
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 3, height: 113},
    marginLeft: 10,
    marginTop: 15,
  },

  buttonStyle: {
    backgroundColor: '#0091EA',
    width: '100%',
    color: '#fff',
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 3, height: 113},
    fontSize: 16,
    lineHeight: 30,
    fontWeight: '600',
    paddingVertical: 12,
    textAlign: 'center',
  },
});
