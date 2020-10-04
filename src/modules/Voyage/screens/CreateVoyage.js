import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  View,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {RFPercentage} from 'react-native-responsive-fontsize';

import * as Core from '../../Master/Util/Core';
import * as DateClass from '../../Master/Util/DateConfigure';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

import {SalesOrderValidation} from '../../Master/Util/Validation';
import IAppsInput from './../../Master/components/input/IAppsInput';
import GlobalStyles from './../../Master/styles/GlobalStyles';
import {
  getVesselListListAction,
  getCargoListListAction,
  getPortsAction,
  submitVoyageAction,
} from '../actions/VoyageAction';

class CreateVoyage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: DateClass.getFormattedCurrentDate(),
      isDateTimePickerVisible: false,

      // Inputs
      vesselList: [],
      cargoTypeList: [],
      portList: [],
      searchFromPortList: [],
      searchToPortList: [],
      searchFromPortText: '',
      searchToPortText: '',
      isLoading: false,
      strVesselName: '',
      intVesselID: '',
      vesselSelected: {},
      intVoyageNo: '',
      intCargoTypeID: '',
      strCargoTypeName: '',
      cargoTypeSelected: {},
      intCargoQty: '',
      dteVoyageDate: DateClass.getFormattedCurrentDate(),
      strPlaceOfVoyageCommencement: '',
      decBunkerQty: '',
      decDistance: '',
      intFromPortID: '',
      strFromPortName: '',
      portFromSelected: {},
      intToPortID: '',
      strToPortName: '',
      portToSelected: {},
    };
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = (date) => {
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let dteDODate = year + '-' + month + '-' + dateNow;
    this.setState({dteDODate});
    this.hideDateTimePicker();
  };

  componentDidMount = async () => {
    this.initilizeData();
  };

  initilizeData = async () => {
    const vesselListData = await getVesselListListAction();
    const cargoTypeList = await getCargoListListAction();
    const portList = await getPortsAction();

    this.setState({
      vesselList: vesselListData.data,
      cargoTypeList: cargoTypeList.data,
      portList: portList.data,
      searchFromPortList: portList.data,
      searchToPortList: portList.data,
    });
  };

  searchPortsTo = (searchText) => {
    this.setState({
      searchFromPortList: [],
    });
    const searchToPortList = this.state.portList.filter(function (item) {
      const portName =
        item.strPortName + ' ' + item.strCountryName + ' ' + item.strLOCODE;
      const itemData = portName.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      searchToPortText: searchText,
      searchToPortList,
    });
  };

  searchPortsFrom = (searchText) => {
    this.setState({
      searchToPortList: [],
    });
    const searchFromPortList = this.state.portList.filter(function (item) {
      const portName =
        item.strPortName + ' ' + item.strCountryName + ' ' + item.strLOCODE;
      const itemData = portName.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      searchFromPortText: searchText,
      searchFromPortList,
    });
  };

  submitVoyage = async () => {
    // this.setState({ isLoading: true });
    // Check Validations
    const {
      intVesselID,
      intVoyageNo,
      intCargoTypeID,
      intCargoQty,
      dteVoyageDate,
      strPlaceOfVoyageCommencement,
      decBunkerQty,
      decDistance,
      intFromPortID,
    } = this.state;

    if (intVesselID.length === 0) {
      Alert.alert('Select Vessel', 'Please Select a Vessel !');
      return false;
    }
    if (intVoyageNo.length === 0) {
      Alert.alert('Give Voyage No', 'Please Give A Voyage No !');
      return false;
    }
    if (intCargoTypeID.length === 0) {
      Alert.alert('Select Cargo Type', 'Please Select a  Cargo Type !');
      return false;
    }
    if (intCargoQty.length === 0) {
      Alert.alert('Give Cargo Qty', 'Please Give Cargo Quantity !');
      return false;
    }
    if (dteVoyageDate.length === 0) {
      Alert.alert('Select A Date', 'Please Select a Date for Voyage');
      return false;
    }
    if (strPlaceOfVoyageCommencement.length === 0) {
      Alert.alert(
        'Give Place of Voyage Commencement',
        'Please Give Place of Voyage Commencement',
      );
      return false;
    }
    if (decBunkerQty.length === 0) {
      Alert.alert('Give Bunker Qty', 'Please Give Bunker Quantity');
      return false;
    }
    if (decDistance.length === 0) {
      Alert.alert('Give Distance', 'Please Give Distance in Notical Mile');
      return false;
    }
    if (intFromPortID.length === 0) {
      Alert.alert(
        'Select From Port',
        'Please Select a port from FROM Port list',
      );
      return false;
    }
    if (decDistance.length === 0) {
      Alert.alert('Select From Port', 'Please Select a port from TO Port list');
      return false;
    }

    this.setState({isLoading: true});

    // Submit Data
    try {
      const responseData = await submitVoyageAction(this.state);
      if (responseData.status) {
        Alert.alert('Success', responseData.message);
        this.setState({
          isLoading: false,
          intVesselID: '',
          intVoyageNo: '',
          intCargoTypeID: '',
          intCargoQty: '',
          dteVoyageDate: '',
          strPlaceOfVoyageCommencement: '',
          decBunkerQty: '',
          decDistance: '',
          intFromPortID: '',
        });
        this.props.navigation.navigate('voyageList');
      } else {
        Alert.alert('Failed', responseData.message);
        this.setState({isLoading: false});
      }
      this.setState({isLoading: false});
    } catch (error) {
      this.setState({isLoading: false});
    }

    this.setState({isLoading: false});
  };

  showDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: true,
    });
  };

  hideDateTimePicker = () => {
    let cloneObj = {...this.state};
    cloneObj.isDateTimePickerVisible = false;
    this.setState(cloneObj);
  };

  handleDatePicked = (date) => {
    let cloneObj = {...this.state};
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    const monthString = month < 10 ? '0' + month : month;
    let fromDate = year + '-' + monthString + '-' + dateNow;
    cloneObj.dteVoyageDate = fromDate;
    cloneObj.isDateTimePickerVisible = false;
    this.setState(cloneObj);
  };

  selectFromPort = (item) => {
    const portName =
      item.strPortName + ' ' + item.strCountryName + ' ' + item.strLOCODE;
    this.setState({
      searchFromPortText: portName,
      searchFromPortList: [],
      intFromPortID: item.intPortId,
      strFromPortName: item.strPortName,
      portFromSelected: item,
    });
  };

  selectToPort = (item) => {
    const portName =
      item.strPortName + ' ' + item.strCountryName + ' ' + item.strLOCODE;
    this.setState({
      searchToPortText: portName,
      intToPortID: item.intPortId,
      strToPortName: item.strPortName,
      searchToPortList: [],
      portToSelected: item,
    });
  };

  selectCargoType = (type) => {
    this.setState({
      intCargoTypeID: type.intID,
      strCargoTypeName: type.strCargoTypeName,
      cargoTypeSelected: type,
    });
  };

  selectVessel = (vessel) => {
    this.setState({
      intVesselID: vessel.intID,
      strVesselName: vessel.strVesselName,
      vesselSelected: vessel,
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={{backgroundColor: '#f9f9f9'}}>
        <ScrollView>
          <SafeAreaView style={[styles.container]}>
            <View style={[styles.bgbox]}>
              <View>
                <View>
                  <View style={[styles.Cargotypestyleone]}>
                    <View style={[GlobalStyles.pickerItem]}>
                      <View style={[styles.inputBoxStyleForPicker]}>
                        <Picker
                          style={[styles.selectBoxStyleForPicker]}
                          selectedValue={this.state.vesselSelected}
                          onValueChange={(item) => this.selectVessel(item)}>
                          <Picker.Item label="Select Vessel" value="" />
                          {this.state.vesselList &&
                            this.state.vesselList.map((item, index) => (
                              <Picker.Item
                                label={
                                  item.strVesselName +
                                  ' #' +
                                  item.intID +
                                  ' (' +
                                  item.strVesselTypeName +
                                  ')'
                                }
                                value={item}
                                key={index}
                              />
                            ))}
                        </Picker>
                      </View>
                    </View>
                  </View>
                </View>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Voyage No"
                    placeholderTextColor={'#000000'}
                    keyboardType={'numeric'}
                    onChangeText={(value) =>
                      this.setState({intVoyageNo: value})
                    }
                  />
                </View>

                <View style={[styles.Cargotypestyle, styles.cargostyle]}>
                  <View style={[styles.Cargotypestyleone]}>
                    <View style={[GlobalStyles.pickerItem, {marginTop: 5}]}>
                      <View style={[styles.inputBoxStyleForPicker]}>
                        <Picker
                          style={[styles.selectBoxStyleForPicker]}
                          selectedValue={this.state.cargoTypeSelected}
                          onValueChange={(item) => this.selectCargoType(item)}>
                          <Picker.Item label="Cargo type" value="" />
                          {this.state.cargoTypeList &&
                            this.state.cargoTypeList.map((item, index) => (
                              <Picker.Item
                                label={item.strCargoTypeName}
                                value={item}
                                key={index}
                              />
                            ))}
                        </Picker>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <TextInput
                      style={[styles.testInputStyle]}
                      placeholder="Cargo QTY"
                      placeholderTextColor={'#000000'}
                      value={0}
                      keyboardType={'numeric'}
                      onChangeText={(value) =>
                        this.setState({intCargoQty: value})
                      }
                    />
                  </View>
                </View>
              </View>

              <View
                style={[
                  styles.inputBoxStyle,
                  styles.inputBoxStyleone,
                  {padding: 0},
                ]}>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                  <Text> Voyage Date </Text>
                  <Text>{this.state.dteVoyageDate}</Text>
                  <Text
                    title="Show DatePicker"
                    onPress={this.showDateTimePicker}
                  />
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                  datePickerModeAndroid={'spinner'}
                  mode={'date'}
                />
              </View>
              <View style={[styles.portdetails]}>
                <View style={[styles.portone]}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Port From"
                    placeholderTextColor={'#000000'}
                    value={this.state.searchFromPortText}
                    onChangeText={(value) => this.searchPortsFrom(value)}
                  />
                </View>
                <View style={[styles.portone]}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholderTextColor={'#000000'}
                    placeholder="Port To"
                    value={this.state.searchToPortText}
                    onChangeText={(value) => this.searchPortsTo(value)}
                  />
                </View>
              </View>
              <>
                {this.state.searchFromPortText.length != 0 &&
                  this.state.searchFromPortList.length > 0 && (
                    <ScrollView
                      style={{
                        backgroundColor: '#F7F9FC',
                        height: '100%',
                        marginTop: -15,
                        marginLeft: 5,
                        marginRight: 5,
                      }}>
                      {this.state.searchFromPortList.map((item, index) => (
                        <TouchableOpacity
                          onPress={() => this.selectFromPort(item)}>
                          <Text
                            key={index}
                            style={{
                              padding: 8,
                              borderWidth: 0,
                              borderBottomWidth: 1,
                              borderBottomColor: '#ddd',
                            }}>
                            {' '}
                            {item.strPortName +
                              ' [' +
                              item.strCountryName +
                              ']'}{' '}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
              </>
              <>
                {this.state.searchToPortText.length != 0 &&
                  this.state.searchToPortList.length > 0 && (
                    <ScrollView
                      style={{
                        backgroundColor: '#F7F9FC',
                        height: '100%',
                        marginTop: -15,
                        marginLeft: 5,
                        marginRight: 5,
                      }}>
                      {this.state.searchToPortList.map((item, index) => (
                        <TouchableOpacity
                          onPress={() => this.selectToPort(item)}>
                          <Text
                            key={index}
                            style={{
                              padding: 8,
                              borderWidth: 0,
                              borderBottomWidth: 1,
                              borderBottomColor: '#ddd',
                            }}>
                            {' '}
                            {item.strPortName +
                              ' [' +
                              item.strCountryName +
                              ']'}{' '}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
              </>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Place of Voyage Commencement"
                  placeholderTextColor={'#000000'}
                  value={this.state.strPlaceOfVoyageCommencement}
                  onChangeText={(value) =>
                    this.setState({strPlaceOfVoyageCommencement: value})
                  }
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Bunker QTY at voyage Commencement"
                  placeholderTextColor={'#000000'}
                  keyboardType="numeric"
                  value={this.state.decBunkerQty}
                  onChangeText={(value) => this.setState({decBunkerQty: value})}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Distance"
                  placeholderTextColor={'#000000'}
                  keyboardType="numeric"
                  value={this.state.decDistance}
                  onChangeText={(value) => this.setState({decDistance: value})}
                />
              </View>
            </View>
            <View />

            <View style={[styles.voyagebutton]}>
              <View style={[styles.voyagebuttstyle]}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('voyageList')}>
                  <Text style={[styles.buttonStyleone]}> Back </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.voyagebuttstyle]}>
                {!this.state.isLoading && (
                  <TouchableOpacity onPress={() => this.submitVoyage()}>
                    <Text style={[styles.buttonStyle]}> Add </Text>
                  </TouchableOpacity>
                )}
                {this.state.isLoading && (
                  <Text style={[styles.buttonStyle]}> Adding... </Text>
                )}
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f9f9f9',
  },

  bgbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    margin: 10,
  },

  headingOne: {
    fontSize: RFPercentage(1.5),
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingTop: 5,
  },
  selectBoxStylecargo: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  InputField: {
    fontSize: 14,
    paddingTop: 14,
    backgroundColor: '#F7F9FC',
    borderColor: '#F2F2F2',
    paddingLeft: 15,
    marginTop: 5,
    borderRadius: 4,
    borderWidth: 1,
    paddingBottom: 14,
    fontWeight: '400',
    marginLeft: 10,
    marginRight: 10,
  },

  selectBoxStyle: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },

  singleMenuItemTitle: {
    fontSize: RFPercentage(2),
    color: '#000000',
    fontWeight: '400',
    paddingTop: 5,
    marginLeft: -3,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  singleMenuItemSubTitle: {
    fontSize: RFPercentage(1.5),
    color: '#000000',
    fontWeight: '700',
    paddingTop: 5,
    marginLeft: -3,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  singleMenuItemRedSubTitle: {
    fontSize: RFPercentage(1.5),
    color: '#FF6B6B',
    fontWeight: '700',
    paddingTop: 5,
    marginLeft: -3,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  avgQality: {
    fontSize: RFPercentage(1.5),
    color: '#fff',
    marginLeft: -3,
    textAlign: 'center',
  },
  avgQalityValue: {
    fontSize: RFPercentage(1.5),
    color: '#fff',
    marginLeft: -3,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  amountTitle: {
    fontSize: RFPercentage(1.5),
    color: '#000000',
    marginLeft: -3,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 5,
  },

  totalAmount: {
    color: '#0353A7',
    fontSize: RFPercentage(5),
  },
  buttonStyle: {
    backgroundColor: '#1c6dd6',
    width: '95%',
    color: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 3, height: 1},
    fontSize: RFPercentage(1.5),
    lineHeight: 40,
    fontWeight: '700',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  buttonStyleone: {
    borderColor: 'black',
    width: '95%',
    color: '#000',
    borderWidth: 1,

    fontSize: RFPercentage(1.5),
    lineHeight: 40,
    fontWeight: '700',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',

    borderRadius: 5,
    marginLeft: 10,
    marginTop: 20,
  },

  errorMessage: {
    color: 'red',
    textAlign: 'left',
    fontSize: 16,
  },
  voyagebutton: {
    flex: 1,
    flexDirection: 'row',
  },
  voyagebuttstyle: {
    flexBasis: '48%',
  },
  portdetails: {
    flex: 1,
    flexDirection: 'row',
  },
  portone: {
    flexBasis: '50%',

    justifyContent: 'center',

    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  Cargotypestyle: {
    flex: 1,
    flexDirection: 'row',
  },
  Cargotypestyleone: {
    flexBasis: '46%',
    marginLeft: 8,
  },
  testInputStyle: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'popppins',
    borderRadius: 0,
    paddingLeft: 10,
    paddingVertical: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 0,
  },
  inputBoxStyle: {
    fontSize: 14,
    borderWidth: 0,
    borderColor: '#ddd',
    marginTop: 5,
    marginLeft: 10,
    backgroundColor: '#F7F9FC',
    padding: 5,
  },
  inputBoxStyleone: {
    padding: 8,
    marginTop: 5,
  },
  inputBoxStyleForPicker: {
    fontSize: 14,

    borderColor: '#ddd',
    marginTop: 2,
    backgroundColor: '#F7F9FC',
    // paddingTop: 10,
    marginLeft: 15,
  },
  selectBoxStyleForPicker: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 1,
    marginTop: 1,
    flexBasis: '100%',
    marginRight: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  cargostyle: {
    height: 70,
  },
});
export default CreateVoyage;
