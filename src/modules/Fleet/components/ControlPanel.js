import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';

import styles from '../components/Style';
import Avatar from '../images/avatar.png';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage} from 'react-native-responsive-fontsize';
import pumimage from '../images/avatar.png';
import SwitchButton from 'switch-button-react-native';

export default class ControlPanel extends Component {
  state = {
    strEmployeeName: '',
    strEmployeeEmail: '',
    activeSwitch: 1,
    userData: null,
  };

  logout = async () => {
    try {
      await AsyncStorage.removeItem('is_logged_in');
      Actions.login();
    } catch (e) {
      console.log('Done.');
    }
  };

  async componentDidMount() {
    try {
      let userData = (await AsyncStorage.getItem('userData')) || 'none';

      console.log('userData', userData);

      let dataParse = JSON.parse(userData);
      this.setState({
        userData: dataParse,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <ScrollView style={styles.controlPanel}>
        <SafeAreaView>
          <ImageBackground style={{width: '100%', height: '100%'}}>
            <View style={[styling.SideBarBg]}>
              <LinearGradient
                colors={['#34467D', '#34467D']}
                style={styles.linearGradient}>
                <TouchableOpacity>
                  <View style={[styling.userCardBox]}>
                    <View style={{marginLeft: 10}}>
                      <Image style={[styling.pumimage]} source={pumimage} />
                    </View>

                    <View style={{width: '80%'}}>
                      <Text style={[styling.stationName]}>
                        {/* {typeof this.state.userData != 'undefined' &&
                          this.state.userData != null &&
                          this.state.userData.strName} */}
                        হ্যালো
                      </Text>

                      <Text
                        style={{
                          fontSize: RFPercentage(2),
                          color: '#fff',
                          paddingLeft: 10,
                        }}>
                        {/* হ্যালো */}
                        {/* {typeof this.state.userData != 'undefined' &&
                          this.state.userData != null &&
                          this.state.userData.tokenData.userData.strUserName} */}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>

              <View style={[styling.menuTest]}>
                <View>
                  <TouchableOpacity onPress={() => Actions.dashboard()}>
                    <Text style={[styling.item]}>ড্যাশবোর্ড</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.TripAdd()}>
                    <Text style={[styling.item]}>ট্রিপ এন্ট্রি</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.dashboard()}>
                    <Text style={[styling.item]}>ট্রিপ লিস্ট</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.ShipStatement()}>
                    <Text style={[styling.item]}>শিপ স্টেটমেন্ট</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.TopSheet()}>
                    <Text style={[styling.item]}>টপ শিট</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.fuelLogEntry()}>
                    <Text style={[styling.item]}>ফুয়েল লগ এন্ট্রি</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.FuelLogDashboard()}>
                    <Text style={[styling.item]}>ফুয়েল লগ রিপোর্ট</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.UserProfileEdit()}>
                    <Text style={[styling.item]}>আমার প্রোফাইল</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: '50%'}}>
                  <TouchableOpacity onPress={this.logout}>
                    <Text style={[styling.LogOut]}>
                      <Icon name="power-off" size={20} color="#E00100" />
                      &nbsp; লগ আউট
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{width: '50%'}}>
                  <TouchableOpacity onPress={() => Actions.help()}>
                    <Text style={[styling.Help]}>
                      <Icon name="question-circle" size={20} color="#2D2D2D" />
                      &nbsp; সাহায্য
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const styling = StyleSheet.create({
  SideBarBg: {
    flex: 1,
    width: '100%',
  },
  userCardBox: {
    width: '100%',
    flex: 0.1,
    flexDirection: 'row',
    paddingVertical: 25,
    marginTop: 20,
    height: '100%',
  },

  userImage: {
    width: 70,
    height: 70,
    marginTop: 5,
    borderRadius: 50,
    margin: 10,
    padding: 5,
    paddingVertical: 30,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },

  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    paddingLeft: 15,
    paddingTop: 10,
  },

  status: {
    color: '#fff',
    fontSize: 16,
    borderRadius: 50,
    marginTop: 5,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#29BCA3',
    width: 80,
    marginLeft: 10,
    lineHeight: 30,
    textAlign: 'center',
  },

  item: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    width: '100%',
    paddingLeft: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.6,
  },

  menuTest: {
    marginTop: 15,
    marginLeft: -15,
  },
  LogOut: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 7,
    paddingVertical: 20,
    marginHorizontal: 10,
    marginLeft: 20,
  },
  Help: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 7,
    paddingVertical: 20,
    marginHorizontal: 10,
    marginLeft: 20,
  },
  powser: {
    width: 25,
    height: 25,
  },
  pumimage: {
    width: 75,
    height: 75,
  },

  stationName: {
    fontSize: RFPercentage(2),
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: 15,
    paddingLeft: 10,
  },
  stationLocation: {},
});
