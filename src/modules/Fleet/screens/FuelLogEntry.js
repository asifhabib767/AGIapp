import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  RefreshControl,
  BackHandler,
  Picker,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {fuelEntryValidation} from './../Util/validation/FuelEntryValidation';
import {Actions} from 'react-native-router-flux';
import {
  getShippingVehicle,
  getFuelType,
  postFuelEntry,
} from '../service/fuelLogEntry/FuelLogEntry';

export default class FuelLogEntry extends Component {
  state = {
    isDateTimePickerVisible: false,
    fromDate: '',
    vehileList: [],
    searchVehileList: [],
    fuelType: [],
    fuelTypeId: '',
    searchValue: '',
    isSearching: '',
    vehileId: '',
    vehicleName: '',
    qty: '',
    meDetails: '',
    price: '',
    fuelTypeName: '',
    fuelTypeItem: {},
    disabled: true,
  };

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
    const monthString = month < 10 ? '0' + month : month;
    let fromDate = year + '-' + monthString + '-' + dateNow;
    this.setState({fromDate});
    this.hideDateTimePicker();
  };

  SearchFilterFunction = (text) => {
    if (text.length > 0) {
      const searchVehileList = this.state.vehileList.filter(function (item) {
        const itemData = item.strRegNo
          ? item.strRegNo.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      this.setState({
        searchVehileList,
        vehicleName: text.strRegNo,
      });
    }
  };
  async componentDidMount() {
    let vehileList = await getShippingVehicle();
    let fuelType = await getFuelType();
    this.setState({
      vehileList,
      fuelType,
    });
  }
  selectVehile = async (item) => {
    this.setState({
      vehileId: item.intID,
      vehicleName: item.strRegNo,
      searchVehileList: [],
    });
  };

  changeFuelType = (item) => {
    let price = item.monPrice;

    let fuelTypeId = item.intID;
    let fuelTypeName = item.strFuelName;

    this.setState({
      price,
      fuelTypeId,
      fuelTypeName,
      fuelTypeItem: item,
    });
  };

  fuelEntrySubmit = async () => {
    const {
      vehileId,
      fromDate,
      fuelTypeId,
      qty,
      meDetails,
      price,
      fuelTypeItem,
    } = this.state;

    console.log(fuelTypeItem);
    let postData = {
      vehileId,
      fromDate,
      fuelTypeId,
      qty,
      meDetails,
      price,
    };
    let fuelValidation = await fuelEntryValidation(
      vehileId,
      fromDate,
      fuelTypeId,
      qty,
      meDetails,
      price,
      fuelTypeItem,
    );

    if (fuelValidation) {
      let postFuelEntr = await postFuelEntry(postData);
      if (postFuelEntr.data !== '') {
        alert('আপনার ফুয়েল এন্ট্রি সফল হয়েছে !');
        // Actions.FuelLogDashboard();
        this.props.navigation.navigate('tripDashboard');
      }
    }
    // let postFuelEntr = postFuelEntry(postData);
  };

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flexBasis: '60%'}}>
              <Text style={[styles.headingOne]}> ফুয়েল লগ এন্ট্রি</Text>
            </View>
          </View>

          <View style={[styles.selectBox]}>
            <View style={[styles.searcbox]}>
              {/* <View style={{flexBasis: '100%'}}>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Search By Lighter"
                  placeholderTextColor={'#818181'}
                  onChangeText={value => this.SearchFilterFunction(value)}
                  value={this.state.vehicleName}
                />
              </View> */}
              <View>
                <Text style={[styles.inputLabel]}>
                  {' '}
                  শিপ সার্চ করুন <Text style={{color: '#D71920'}}>*</Text>{' '}
                </Text>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="টাইপ শিপ"
                  placeholderTextColor={'#000000'}
                  onChangeText={(value) => this.SearchFilterFunction(value)}
                  value={this.state.vehicleName}
                />
              </View>
              {this.state.searchVehileList.length != 0 &&
                this.state.searchVehileList.length > 0 && (
                  <ScrollView style={{backgroundColor: '#eee', height: '100%'}}>
                    {this.state.searchVehileList.map((item, index) => (
                      <TouchableOpacity onPress={() => this.selectVehile(item)}>
                        <Text
                          key={index}
                          style={{
                            padding: 8,
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ddd',
                          }}>
                          {' '}
                          {item.strRegNo + ' [' + item.strType + ']'}{' '}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
            </View>
            <View>
              <View style={[styles.selectBoxStyle]}>
                <Text style={[styles.inputLabel]}>
                  {' '}
                  তারিখ <Text style={{color: '#D71920'}}>*</Text>{' '}
                </Text>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                  <Text style={[styles.inputLebel]}>{this.state.fromDate}</Text>
                  <Text
                    title="Show DatePicker"
                    onPress={this.showDateTimePicker}
                  />
                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    datePickerModeAndroid={'spinner'}
                    mode={'date'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={[styles.inputLabel]}>
                {' '}
                জ্বালানির ধরণ <Text style={{color: '#D71920'}}>*</Text>{' '}
              </Text>
              <Picker
                selectedValue={this.state.fuelTypeItem}
                style={{height: 50, width: '100%'}[styles.InputField]}
                onValueChange={(value) => this.changeFuelType(value)}>
                <Picker.Item label="জ্বালানির ধরণ নির্বাচন করুন" value="0" />
                {this.state.fuelType.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.strFuelName}
                    value={item}
                  />
                ))}
              </Picker>
              <Text style={[styles.borderColors]} />
            </View>
            <View style={{flexBasis: '100%'}}>
              <Text style={[styles.inputLabel]}>
                {' '}
                জ্বালানির দাম
                <Text style={{color: '#D71920'}}>*</Text>
              </Text>
              <TextInput
                value={
                  typeof this.state.fuelTypeItem.monPrice != 'undefined'
                    ? this.state.fuelTypeItem.monPrice + ''
                    : '0'
                }
                style={[styles.InputField]}
                editable={false}
              />
            </View>
            <View style={[styles.searcbox]}>
              <Text style={[styles.inputLabel]}>
                {' '}
                জ্বালানির পরিমাণ <Text style={{color: '#D71920'}}>*</Text>{' '}
              </Text>
              <View style={{flexBasis: '100%'}}>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="জ্বালানির পরিমাণ"
                  placeholderTextColor={'#818181'}
                  value={this.state.qty}
                  onChangeText={(value) => {
                    this.setState({qty: value});
                  }}
                  keyboardType={'phone-pad'}
                />
              </View>

              <View style={{flexBasis: '100%'}}>
                <Text style={[styles.inputLabel]}>
                  {' '}
                  বিস্তারিত<Text style={{color: '#D71920'}}>*</Text>{' '}
                </Text>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="বিস্তারিত লিখুন (অপশনাল)"
                  placeholderTextColor={'#818181'}
                  value={this.state.meDetails}
                  onChangeText={(value) => {
                    this.setState({meDetails: value});
                  }}
                />
              </View>
            </View>
          </View>
          <View>
            <LinearGradient
              colors={['#2D3190', '#2964BF']}
              style={styles.linearGradient}>
              <TouchableOpacity onPress={() => this.fuelEntrySubmit()}>
                <Text style={styles.buttonText}>
                  ফুয়েল লগ এন্ট্রি করুন &nbsp;{' '}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
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

  itemText: {
    fontSize: 15,
    margin: 2,
  },

  container: {
    width: '96%',
    margin: 8,
  },

  headingOne: {
    fontSize: RFPercentage(3.5),
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    paddingVertical: 10,
  },
  selectBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    paddingLeft: 10,
    marginTop: 10,
    justifyContent: 'center',
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
  },

  inputLabel: {
    fontSize: RFPercentage(2.5),
    color: '#000000',
    fontWeight: 'bold',
    paddingTop: 10,
  },
  InputField: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'popppins',
    borderRadius: 0,
    paddingLeft: 5,
    paddingVertical: 12,
    borderBottomColor: '#000',
    borderBottomWidth: 0.6,
  },
  selects: {
    paddingVertical: 12,
    borderBottomColor: '#000',
    borderBottomWidth: 0.6,
  },
  inputOutput: {
    fontSize: RFPercentage(2.5),
    color: '#231F20',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  inputLebel: {
    fontSize: RFPercentage(2.2),
    color: '#000000',
    fontWeight: 'bold',
  },
  totalBags: {
    fontSize: RFPercentage(3),
    color: '#000000',
  },
  orderBox: {
    borderTopColor: '#707070',
    borderTopWidth: 0.6,
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    width: '100%',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: RFPercentage(3),
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  requestBox: {
    backgroundColor: '#fff',
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
    flex: 1,
    flexDirection: 'row',
  },
  reqNo: {
    backgroundColor: '#08C48F',
    width: 55,
    height: 55,
    color: '#fff',
    borderRadius: 100,
    lineHeight: 55,
    textAlign: 'center',
  },
  selectBoxStyle: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    flexBasis: '48%',
    marginRight: 10,
  },
  searcbox: {
    flexBasis: '60%',
    backgroundColor: '#fff',
    // shadowColor: 'rgba(0, 0, 0, 5)',
    // shadowOpacity: 0.5,
    // elevation: 8,
    // shadowRadius: 10,
    // shadowOffset: {width: 23, height: 113},
    borderRadius: 10,
    marginTop: 13,
    marginBottom: 10,
    marginLeft: 10,
  },
  iconstyle: {
    position: 'absolute',
    marginLeft: 15,
    marginTop: 15,
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    paddingRight: 10,
  },

  borderColors: {
    borderBottomColor: '#DADADA',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    marginTop: -15,
  },
});
