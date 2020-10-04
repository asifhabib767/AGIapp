import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import icon from '../images/Icons.png';
import DateTimePicker from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import car from '../images/car.png';
import {Form, TextValidator} from 'react-native-validator-form';
import {generateStringDateFromDate} from '../Util/DateConfigure';
import {showShipTopSheet} from '../service/shiptopsheet/ShipTopsheet';
//import CustomSearchbar from "../components/CustomSearchbar";
import {Picker} from '@react-native-community/picker';
import * as Animatable from 'react-native-animatable';
import {getCenter} from 'geolib';

export default class TopsheetScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
    isTimePickerVisible: false,

    isEndDateTimePickerVisible: false,
    isEndTimePickerVisible: false,

    priority: '',
    shiptopsheet: [],
    startDate: '',
    endDate: '',
  };
  componentDidMount() {
    this.setState({
      startDate: this.currentDate(),
      endDate: this.currentDate(),
    });
    this.initializeList();
    // console.log('ShipmentDetails', this.state.shipmentListDetaills);
    Form.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  initializeList = async () => {
    this.handleDatePicked();
  };

  startDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  endDateTimePicker = () => {
    this.setState({isEndDateTimePickerVisible: true});
  };

  showTimePicker = () => {
    this.setState({isTimePickerVisible: true});
  };

  showTimePicker = () => {
    this.setState({isEndTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  hideEndDateTimePicker = () => {
    this.setState({isEndDateTimePickerVisible: false});
  };

  hideTimePicker = () => {
    this.setState({isTimePickerVisible: false});
  };

  hideEndTimePicker = () => {
    this.setState({isEndTimePickerVisible: false});
  };

  handleDatePicked = (date) => {
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let created_at = year + '-' + month + '-' + dateNow;
    created_at = created_at.trim();
    this.setState({
      startDate: created_at,
      isDateTimePickerVisible: false,
    });
  };

  handleEndDatePicked = (date) => {
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let created_at = year + '-' + month + '-' + dateNow;
    created_at = created_at.trim();
    this.setState({endDate: created_at, isEndDateTimePickerVisible: false});
  };

  handleTimePicked = (date) => {
    let showTime = String(date).substr(15, 7) + '00';
    showTime = showTime.trim();
    this.setState({showTime});
    this.hideTimePicker();
  };

  currentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  };

  showShipTopSheet = async () => {
    let fromdate = this.state.startDate;
    let todate = this.state.endDate;
    let shiptopsheet = await showShipTopSheet(fromdate, todate);
    console.log('shipdata', shiptopsheet);

    this.setState({
      shiptopsheet: shiptopsheet,
    });
  };

  getTotalBill = () => {
    let totalBill = 0;
    this.state.shiptopsheet.forEach((item, index) => {
      totalBill += item.grandmonTotalAmount;
    });
    return totalBill;
  };

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.selectBox]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.headTitle]}>টপ শিট</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  flexBasis: '48%',
                  borderBottomColor: '#D6D6D6',
                  borderBottomWidth: 1,
                  marginRight: 10,
                }}>
                <Text style={[styles.pikcerTitle]}> From </Text>
                <TouchableOpacity onPress={this.startDateTimePicker}>
                  <Text style={[styles.dataPicker]}>
                    {this.state.startDate}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={(date) => this.handleDatePicked(date)}
                  onCancel={this.hideDateTimePicker}
                  datePickerModeAndroid={'spinner'}
                  mode={'date'}
                />
              </View>
              <View
                style={{
                  flexBasis: '48%',
                  borderBottomColor: '#D6D6D6',
                  borderBottomWidth: 1,
                }}>
                <Text style={[styles.pikcerTitle]}> To </Text>
                <TouchableOpacity onPress={this.endDateTimePicker}>
                  <Text style={[styles.dataPicker]}>{this.state.endDate}</Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isEndDateTimePickerVisible}
                  onConfirm={(date) => this.handleEndDatePicked(date)}
                  onCancel={this.hideEndDateTimePicker}
                  datePickerModeAndroid={'spinner'}
                  mode={'date'}
                />
              </View>
            </View>

            <View
              style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <LinearGradient
                colors={['#2D3190', '#2D3190']}
                style={styles.linearGradient}>
                <TouchableOpacity onPress={this.showShipTopSheet}>
                  <Text style={styles.buttonText}>টপ শিট দেখুন &nbsp; </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            {/* 
                    <View style={{flex:1, flexDirection:'row',paddingVertical:25}}>

                        <View style={{flexBasis:'65%',marginRight:15}}>
                            <CustomSearchbar
                                placeHolderText="Search from outlets"
                            />
                        </View>
                        <View style={[styles.selects]}>
                            <Picker
                                selectedValue={this.state.priority}
                            
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ selects: itemValue })
                                }>
                                <Picker.Item label="Select" value="Select" /> 
                                <Picker.Item label="1" value="2" /> 
                                <Picker.Item label="1" value="2" /> 
                                
                            </Picker>
                        </View>
                    </View> */}
            {this.state.shiptopsheet.map((item, index) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingVertical: 20,
                  borderBottomColor: '#D6D6D6',
                  borderBottomWidth: 1,
                }}>
                <View style={{flexBasis: 70}}>
                  <Image source={car} style={[styles.iconStyle]} />
                </View>

                <View style={{flexBasis: '40%'}}>
                  <Text style={[styles.shipmentNo]}>জাহাজের নাম: </Text>
                  <Text style={[styles.shipmentNo]}> মোট পরিমাণ: </Text>
                  <Text style={[styles.shipmentNo]}> মোট ট্রিপ: </Text>
                  <Text style={[styles.shipmentNo]}> পরিমাণ: </Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text style={[styles.shipmentNo]}>{item.strRegNo}</Text>
                  <Text style={[styles.shipmentNo]}> {item.numPieces}</Text>
                  <Text style={[styles.shipmentNo]}> {item.totaltrip}</Text>
                  <Text style={[styles.shipmentNo]}>
                    {' '}
                    {item.grandmonTotalAmount}৳
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingVertical: 10,
                backgroundColor: '#FFF',
                borderRadius: 50,
                width: '100%',
              }}>
              <View style={{flexBasis: '45%'}}>
                <Text style={[styles.grandTotal]}> Grand Total </Text>
              </View>
              <View style={{flexBasis: '45%'}}>
                <Text style={[styles.grandTotalValue]}>
                  {' '}
                  {this.getTotalBill()}৳{' '}
                </Text>
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
  selectBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    marginBottom: 5,
    padding: 10,
    paddingLeft: 10,
    marginTop: 5,
    justifyContent: 'center',
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
  },
  headTitle: {
    fontSize: RFPercentage(3.5),
    color: '#000000',
    fontWeight: 'bold',

    textTransform: 'uppercase',
  },
  shipmentNo: {
    fontSize: RFPercentage(2.4),
    color: '#000000',
    fontWeight: 'bold',
  },
  shipDate: {
    fontSize: RFPercentage(2.5),
    color: '#272727',
  },
  iconStyle: {
    width: 50,
    height: 50,
  },

  linearGradient: {
    width: '50%',
    borderRadius: 50,
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: '#2D3190',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 16,
  },

  pikcerTitle: {
    fontSize: RFPercentage(2.6),
    color: '#000000',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  dataPicker: {
    fontSize: RFPercentage(2.2),
    color: '#000000',
    fontWeight: 'bold',
    paddingVertical: 15,
    paddingLeft: 10,
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
  grandTotal: {
    fontSize: RFPercentage(3),
    color: '#2D3190',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  grandTotalValue: {
    fontSize: RFPercentage(3.5),
    color: '#2D3190',
    fontWeight: 'bold',
  },
});
