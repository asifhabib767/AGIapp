import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  BackHandler,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import SearchBar from 'react-native-search-bar';
import planicons from '../images/Icons.png';
import * as Animatable from 'react-native-animatable';
import {Picker} from '@react-native-community/picker';
import CustomSearchbar from '../components/CustomSearchbar';
import LinearGradient from 'react-native-linear-gradient';

export default class Transport extends Component {
  state = {
    selects: '',
  };

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.selectBox]}>
            <Text style={[styles.headingOne]}> Shipment Planning </Text>

            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 15}}>
              <View style={{flexBasis: '65%', marginRight: 15}}>
                <CustomSearchbar placeHolderText="Search from outlets" />
              </View>
              <View style={[styles.selects]}>
                <Picker
                  selectedValue={this.state.priority}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({selects: itemValue})
                  }>
                  <Picker.Item label="Select" value="Select" />
                  <Picker.Item label="1" value="2" />
                  <Picker.Item label="1" value="2" />
                </Picker>
              </View>
            </View>

            <View style={[styles.planningBox]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: 60}}>
                  <Image source={planicons} style={[styles.planicons]} />
                </View>
                <View style={{flexBasis: '60%'}}>
                  <Text style={[styles.date]}> 02 Dec 2019 </Text>
                  <Text style={[styles.orderNo]}> Req. No. #87962 </Text>
                  <Text style={[styles.location]}> Gabtoli, Dhaka </Text>
                  <Text style={[styles.Type]}> Company </Text>
                </View>
                <View style={{flexBasis: '20%'}}>
                  <Text style={[styles.bags]}> Qty(bags) </Text>
                  <Text style={[styles.bagsQty]}> 2000 </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginTop: 10,
                }}>
                <LinearGradient
                  colors={['#48C1B9', '#11D6A0']}
                  style={styles.linearGradient}>
                  <TouchableOpacity onPress={() => Actions.TransportSchedule()}>
                    <Text style={styles.buttonText}>Schedule</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>

            <View style={[styles.planningBox]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: 60}}>
                  <Image source={planicons} style={[styles.planicons]} />
                </View>
                <View style={{flexBasis: '60%'}}>
                  <Text style={[styles.date]}> 02 Dec 2019 </Text>
                  <Text style={[styles.orderNo]}> Req. No. #87962 </Text>
                  <Text style={[styles.location]}> Gabtoli, Dhaka </Text>
                  <Text style={[styles.Type]}> Company </Text>
                </View>
                <View style={{flexBasis: '20%'}}>
                  <Text style={[styles.bags]}> Qty(bags) </Text>
                  <Text style={[styles.bagsQty]}> 2000 </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginTop: 5,
                }}>
                <LinearGradient
                  colors={['#48C1B9', '#11D6A0']}
                  style={styles.linearGradient}>
                  <TouchableOpacity onPress={() => Actions.TransportSchedule()}>
                    <Text style={styles.buttonText}>Schedule</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>

            <View style={[styles.planningBox]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: 60}}>
                  <Image source={planicons} style={[styles.planicons]} />
                </View>
                <View style={{flexBasis: '60%'}}>
                  <Text style={[styles.date]}> 02 Dec 2019 </Text>
                  <Text style={[styles.orderNo]}> Req. No. #87962 </Text>
                  <Text style={[styles.location]}> Gabtoli, Dhaka </Text>
                  <Text style={[styles.Type]}> Company </Text>
                </View>
                <View style={{flexBasis: '20%'}}>
                  <Text style={[styles.bags]}> Qty(bags) </Text>
                  <Text style={[styles.bagsQty]}> 2000 </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginTop: 5,
                }}>
                <LinearGradient
                  colors={['#48C1B9', '#11D6A0']}
                  style={styles.linearGradient}>
                  <TouchableOpacity onPress={() => Actions.TransportSchedule()}>
                    <Text style={styles.buttonText}>Schedule</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>

            <View style={[styles.planningBox]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: 60}}>
                  <Image source={planicons} style={[styles.planicons]} />
                </View>
                <View style={{flexBasis: '60%'}}>
                  <Text style={[styles.date]}> 02 Dec 2019 </Text>
                  <Text style={[styles.orderNo]}> Req. No. #87962 </Text>
                  <Text style={[styles.location]}> Gabtoli, Dhaka </Text>
                  <Text style={[styles.Type]}> Company </Text>
                </View>
                <View style={{flexBasis: '20%'}}>
                  <Text style={[styles.bags]}> Qty(bags) </Text>
                  <Text style={[styles.bagsQty]}> 2000 </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginTop: 5,
                }}>
                <LinearGradient
                  colors={['#48C1B9', '#11D6A0']}
                  style={styles.linearGradient}>
                  <TouchableOpacity onPress={() => Actions.TransportSchedule()}>
                    <Text style={styles.buttonText}>Schedule</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>

            <View style={[styles.planningBox]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: 60}}>
                  <Image source={planicons} style={[styles.planicons]} />
                </View>
                <View style={{flexBasis: '60%'}}>
                  <Text style={[styles.date]}> 02 Dec 2019 </Text>
                  <Text style={[styles.orderNo]}> Req. No. #87962 </Text>
                  <Text style={[styles.location]}> Gabtoli, Dhaka </Text>
                  <Text style={[styles.Type]}> Company </Text>
                </View>
                <View style={{flexBasis: '20%'}}>
                  <Text style={[styles.bags]}> Qty(bags) </Text>
                  <Text style={[styles.bagsQty]}> 2000 </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginTop: 5,
                }}>
                <LinearGradient
                  colors={['#48C1B9', '#11D6A0']}
                  style={styles.linearGradient}>
                  <TouchableOpacity onPress={() => Actions.TransportSchedule()}>
                    <Text style={styles.buttonText}>Schedule</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>

            <View style={[styles.planningBox]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: 60}}>
                  <Image source={planicons} style={[styles.planicons]} />
                </View>
                <View style={{flexBasis: '60%'}}>
                  <Text style={[styles.date]}> 02 Dec 2019 </Text>
                  <Text style={[styles.orderNo]}> Req. No. #87962 </Text>
                  <Text style={[styles.location]}> Gabtoli, Dhaka </Text>
                  <Text style={[styles.Type]}> Company </Text>
                </View>
                <View style={{flexBasis: '20%'}}>
                  <Text style={[styles.bags]}> Qty(bags) </Text>
                  <Text style={[styles.bagsQty]}> 2000 </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginTop: 5,
                }}>
                <LinearGradient
                  colors={['#48C1B9', '#11D6A0']}
                  style={styles.linearGradient}>
                  <TouchableOpacity onPress={this.login}>
                    <Text style={styles.buttonText}>Schedule</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>

            <View style={[styles.planningBox]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: 60}}>
                  <Image source={planicons} style={[styles.planicons]} />
                </View>
                <View style={{flexBasis: '60%'}}>
                  <Text style={[styles.date]}> 02 Dec 2019 </Text>
                  <Text style={[styles.orderNo]}> Req. No. #87962 </Text>
                  <Text style={[styles.location]}> Gabtoli, Dhaka </Text>
                  <Text style={[styles.Type]}> Company </Text>
                </View>
                <View style={{flexBasis: '20%'}}>
                  <Text style={[styles.bags]}> Qty(bags) </Text>
                  <Text style={[styles.bagsQty]}> 2000 </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginTop: 5,
                }}>
                <LinearGradient
                  colors={['#48C1B9', '#11D6A0']}
                  style={styles.linearGradient}>
                  <TouchableOpacity onPress={() => Actions.TransportSchedule()}>
                    <Text style={styles.buttonText}>Schedule</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: '#F2F8FF',
    height: '100%',
  },

  container: {
    width: '96%',
    margin: 8,
  },

  AccountDetailsArea: {
    backgroundColor: '#fff',
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 113},
  },

  headingOne: {
    fontSize: RFPercentage(3.5),
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    paddingTop: 5,
  },
  selectBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    paddingLeft: 10,
    marginTop: 30,
    justifyContent: 'center',
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
  },

  selects: {
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
    backgroundColor: '#fff',
    borderRadius: 50,
    flexBasis: '30%',
    height: 42,
    lineHeight: 42,
  },

  date: {
    fontSize: RFPercentage(2.5),
    color: '#000000',
  },
  orderNo: {
    fontSize: RFPercentage(3),
    color: '#231F20',
    fontWeight: 'bold',
  },
  location: {
    fontSize: RFPercentage(2.5),
    color: '#000000',
    paddingVertical: 2,
  },
  Type: {
    fontSize: RFPercentage(2),
    color: '#000000',
    borderWidth: 2,
    borderColor: '#3187FE',
    padding: 2,
    width: 120,
    textAlign: 'center',
    borderRadius: 50,
    fontWeight: 'bold',
  },
  bags: {
    fontSize: RFPercentage(2.2),
    color: '#000000',
  },
  bagsQty: {
    fontSize: RFPercentage(3),
    color: '#231F20',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  planicons: {
    width: 45,
    height: 45,
  },
  planningBox: {
    color: '#000000',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    marginBottom: 5,
    paddingVertical: 20,
  },
  linearGradient: {
    borderRadius: 50,
    width: 120,
  },
  buttonText: {
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 7,
  },
});
