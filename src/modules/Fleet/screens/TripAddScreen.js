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
  Alert,
  Picker,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  getDriverList,
  getVehicleList,
  getItemList,
  addTrip,
} from '../service/trip/TripService';
import {Actions} from 'react-native-router-flux';

export default class TripAddScreen extends Component {
  state = {
    providerType: '',
    VehicleCapacity: '',
    SelectVehicle: '',
    RequisitionNo: '',
    query: '',
    intVehicleID: 0,
    strVehicleRegNo: '',
    strDriver: '',
    intID: '',
    // intDriverEnroll: "",
    // strHelperName: "",
    strCode: '',

    intShipPointId: 1,
    date: '',
    time: '',
    driverList: [],
    errorMessage: {},
    masterName: '',

    vehicleId: '',
    strRegNo: '',
    strDriverName: '',
    strDriverContact: '',
    intDriverEnroll: '',
    strHelperName: '',
    strType: '',
    strVheicleParentName: '',
    itemList: [],
    item: '',
    itemId: 0,
    quantity: 0,
    comment: '',

    all_vehicles: [],
    serachVehicleText: '',
    searched_vehicles: [],
    search_ships_text: '',

    isDateTimePickerVisible: false,
    leavelist: '',
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

    this.setState({date: fromDate, isDateTimePickerVisible: false});
    // this.hideDateTimePicker();
  };

  componentDidMount() {
    // let leavelist = await getLeaveList();
    // this.setState({
    //   leavelist,
    // });
    this.initializeData();
  }

  initializeData = async () => {
    // Driver List Data
    let driverData = await getDriverList();
    this.setState({
      driverList: driverData,
    });

    // Vehicle Data
    let vehicleData = await getVehicleList();
    console.log('vehicleData', vehicleData);
    this.setState({
      all_vehicles: vehicleData,
      searched_vehicles: vehicleData,
    });

    // Item List Data
    let itemData = await getItemList();
    this.setState({
      itemList: itemData,
    });
  };

  /**
   * SearchDeliveryPoints
   *
   * Search Filter of Delivery Points
   * @param string SearchText
   */
  searchVehicles = (searchText) => {
    // if empty delivery point then remove the field data
    if (searchText == '') {
      this.setState({
        vehicleId: '',
        strRegNo: '',
        strDriverName: '',
        strDriverContact: '',
        intDriverEnroll: '',
        strHelperName: '',
        strType: '',
        strVheicleParentName: '',
      });
    }
    let errorMessage = this.state.errorMessage;

    // Search Delivery Points using javascript
    const searched_vehicles = this.state.all_vehicles.filter(function (item) {
      console.log('item', item);
      let strShipName = item.strRegNo + ' ' + item.intID;
      strShipName += item.strShipName
        ? item.strShipName.toUpperCase()
        : ''.toUpperCase();
      const itemData = strShipName.toUpperCase();
      const textData = searchText.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    if (this.state.searched_vehicles.length == 1) {
      //remove error message

      this.setState({
        search_ships_text: searchText,
        searched_vehicles,
        intID: '',
      });
      this.selectShip(this.state.searched_vehicles[0]);
    } else {
      this.setState({
        search_ships_text: searchText,
        searched_vehicles,
        intID: '',
      });
      this.setState((prevState) => {
        let customer = Object.assign({}, prevState.errorMessage);
        errorMessage.intID = ''; // update the name property, assign a new value
        return {customer}; // return new object jasper object
      });
    }
  };

  /**
   * selectShip
   */
  selectShip = async (item) => {
    let vehicleId = item.intID;
    let strDriverName = item.strDriverName;
    let strDriverContact =
      typeof item.strDriverContact === 'undefined' ? '' : item.strDriverContact;
    let intDriverEnroll =
      typeof item.intDriverEnroll === 'undefined' ? '' : item.intDriverEnroll;
    let strHelperName =
      typeof item.strHelperName === 'undefined' ? '' : item.strHelperName;
    let strType = item.strType;
    let strVheicleParentName = item.strVheicleParentName;

    this.setState({
      vehicleId: item.intID,
      search_ships_text: item.strRegNo + ' [' + vehicleId + ']',
      search_vehicle_text: item.strRegNo + ' [' + vehicleId + ']',
      strRegNo: item.strRegNo,
      searched_vehicles: [],
      strDriverName,
      strDriverContact,

      intDriverEnroll,
      strHelperName,
      strType,
      strVheicleParentName,
    });
  };

  changeMasterName = (inputValue) => {
    this.setState({
      masterName: inputValue,
    });
  };

  changeDriverName = (inputValue) => {
    this.setState({
      strDriverName: inputValue,
    });
  };

  changeHelperName = (inputValue) => {
    this.setState({
      strHelperName: inputValue,
    });
  };

  changeQuantity = (inputValue) => {
    this.setState({
      quantity: inputValue,
    });
  };

  changeComment = (inputValue) => {
    this.setState({
      comment: inputValue,
    });
  };

  submit = async () => {
    if (this.state.date == '') {
      Alert.alert('দুঃখিত', 'তারিখ সিলেক্ট করুন !');
      return false;
    }
    if (this.state.vehicleId == '') {
      Alert.alert('দুঃখিত', 'শিপ সিলেক্ট করুন !');
      return false;
    }
    if (this.state.strDriverName == '') {
      Alert.alert('দুঃখিত', 'ড্রাইভার নাম টাইপ করুন !');
      return false;
    }
    if (this.state.strHelperName == '') {
      Alert.alert('দুঃখিত', 'হেলপার নাম টাইপ করুন !');
      return false;
    }
    if (this.state.itemId == 0) {
      Alert.alert('দুঃখিত', 'আইটেম সিলেক্ট করুন !');
      return false;
    }
    if (this.state.quantity == 0) {
      Alert.alert('দুঃখিত', 'পরিমাণ টাইপ করুন !');
      return false;
    }
    if (this.state.comment == '') {
      Alert.alert('দুঃখিত', 'মন্তব্য টাইপ করুন !');
      return false;
    }

    let postData = {
      shipPointId: this.state.intShipPointId,
      date: this.state.date,
      vehicleId: this.state.vehicleId,
      vehicleRegNo: this.state.strRegNo,
      driverName: this.state.strDriverName,
      ysn: true,
      helperName: this.state.strHelperName,
      driverEnroll: this.state.intDriverEnroll,
      itemId: this.state.itemId,
      quantity: this.state.quantity,
      narration: this.state.comment,
    };

    let response = await addTrip(postData);

    if (response === 200) {
      // Actions.TripListScreen();
      this.props.navigation.navigate('tripDashboard');
    } else {
      this.props.navigation.navigate('TripAdd');
    }
  };

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flexBasis: '60%'}}>
              <Text style={[styles.headingOne]}> ট্রিপ যুক্ত করুন </Text>
            </View>
            {/* <View style={{ flexBasis: "40%" }}>
              <Text
                style={{
                  fontSize: RFPercentage(2.2),
                  color: "#000",
                  marginTop: 13,
                  fontWeight: "bold",
                  textAlign: "right",
                  marginRight: 10,
                }}
              >
                {" "}
                শিপিং পয়েন্ট{" "}
              </Text>
              <Picker
                selectedValue={this.state.intShipPointId}
                style={{ height: 50, width: "100%" }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ intShipPointId: itemValue })
                }
              >
                <Picker.Item label="Chittagong Port" value={1} />
                <Picker.Item label="Narayanganj Port" value={2} />
              </Picker>
            </View> */}
          </View>

          <View style={[styles.selectBox]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={[styles.selectBoxStyle]}>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                  <Text style={[styles.inputLebel]}> তারিখ </Text>
                  <Text>{this.state.date}</Text>
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

              <View style={{flexBasis: '40%'}}>
                <Text
                  style={{
                    fontSize: RFPercentage(2.2),
                    color: '#000',
                    marginTop: 13,
                    fontWeight: 'bold',
                    textAlign: 'right',
                    marginRight: 10,
                  }}>
                  {' '}
                  শিপিং পয়েন্ট{' '}
                </Text>
                <Picker
                  selectedValue={this.state.intShipPointId}
                  style={{height: 50, width: '100%'}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({intShipPointId: itemValue})
                  }>
                  <Picker.Item label="Chittagong Port" value={1} />
                  <Picker.Item label="Narayanganj Port" value={2} />
                </Picker>
              </View>
            </View>

            <View>
              <Text style={[styles.inputLabel]}>
                {' '}
                শিপ সার্চ করুন <Text style={{color: '#D71920'}}>*</Text>{' '}
              </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="টাইপ শিপ"
                placeholderTextColor={'#000000'}
                value={this.state.search_ships_text}
                onChangeText={(value) => this.searchVehicles(value)}
              />
            </View>

            {this.state.search_ships_text.length > 0 &&
              this.state.searched_vehicles.length > 0 && (
                <ScrollView style={{backgroundColor: '#eee', height: '100%'}}>
                  {this.state.searched_vehicles.map((item, index) => (
                    <TouchableOpacity onPress={() => this.selectShip(item)}>
                      <Text
                        key={index}
                        style={{
                          padding: 8,
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          borderBottomColor: '#ddd',
                        }}>
                        {' '}
                        {item.strRegNo + ' [' + item.intID + ']'}{' '}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

            {/* {this.state.search_ships_text.length > 0 this.state.searched_vehicles.length == 0 && (
              <Text
                style={{
                  backgroundColor: "#eee",
                  padding: 8,
                  color: "red",
                }}
              >
                Sorry !! No Dispoint found by - {this.state.search_vehicle_text}
              </Text>
            )} */}

            <View style={{marginVertical: 10}}>
              {/* <View style={[styles.selectBoxStyle]}>
                <Text style={[styles.inputLebel]}> Delivery Point </Text>
                <Text style={styles.errorMessage}>
                  {this.state.errorMessage.intID}
                </Text>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Search Delivery Points"
                  placeholderTextColor={"#000"}
                  value={this.state.search_ships_text}
                  onChangeText={(value) => this.searchVehicles(value)}
                />
              </View> */}

              {/* {this.state.search_ships_text.length != 0 &&
                this.state.searched_vehicles.length > 0 && (
                  <ScrollView
                    style={{ backgroundColor: "#eee", height: "100%" }}
                  >
                    {this.state.searched_vehicles.map((item, index) => (
                      <TouchableOpacity
                        onPress={() => this.selectShip(item)}
                      >
                        <Text
                          key={index}
                          style={{
                            padding: 8,
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderBottomColor: "#ddd",
                          }}
                        >
                          {" "}
                          {item.strRegNo + " [" + item.intID + "]"}{" "}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )} */}

              {/* {this.state.search_ships_text.length != 0 &&
                this.state.searched_vehicles.length === 0 &&
                this.state.intID.length == 0 && (
                  <Text
                    style={{
                      backgroundColor: "#eee",
                      padding: 8,
                      color: "red",
                    }}
                  >
                    Sorry !! No Dispoint found by -{" "}
                    {this.state.search_ships_text}
                  </Text>
                )} */}
            </View>

            <View>
              <Text style={[styles.inputLabel]}>
                {' '}
                মাস্টার নাম <Text style={{color: '#D71920'}}>*</Text>{' '}
              </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="মাস্টার নাম"
                placeholderTextColor={'#000000'}
                value={this.state.masterName}
                onChangeText={(value) => this.changeMasterName(value)}
              />
            </View>

            <View>
              <Text style={[styles.inputLabel]}>
                {' '}
                ড্রাইভার নাম <Text style={{color: '#D71920'}}>*</Text>{' '}
              </Text>
              <TextInput
                disabled
                style={[styles.InputField]}
                placeholder="ড্রাইভার নাম"
                placeholderTextColor={'#000000'}
                value={this.state.strDriverName}
                onChangeText={(value) => this.changeDriverName(value)}
              />
            </View>

            <View>
              <Text style={[styles.inputLabel]}>
                {' '}
                হেলপার নাম <Text style={{color: '#D71920'}}>*</Text>{' '}
              </Text>
              <TextInput
                disabled
                style={[styles.InputField]}
                placeholder="হেলপার নাম"
                placeholderTextColor={'#000000'}
                value={this.state.strHelperName}
                onChangeText={(value) => this.changeHelperName(value)}
              />
            </View>

            <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1}}>
              <Text style={[styles.inputLebel]}> আইটেম </Text>
              <View>
                <Picker
                  selectedValue={this.state.item}
                  style={[styles.Vehicle]}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      item: itemValue,
                      itemId: itemIndex,
                    })
                  }>
                  <Picker.Item label="Select" value="" />
                  {this.state.itemList.map((item, index) => (
                    <Picker.Item
                      label={item.strName}
                      value={item.strName}
                      key={index}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View>
              <Text style={[styles.inputLabel]}>
                {' '}
                পরিমাণ <Text style={{color: '#D71920'}}>*</Text>{' '}
              </Text>
              <TextInput
                disabled
                style={[styles.InputField]}
                placeholder="পরিমাণ"
                placeholderTextColor={'#000000'}
                keyboardType={'numeric'}
                value={this.state.quantity}
                onChangeText={(value) => this.changeQuantity(value)}
              />
            </View>

            <View>
              <Text style={[styles.inputLabel]}>
                {' '}
                মন্তব্য <Text style={{color: '#D71920'}}>*</Text>{' '}
              </Text>
              <TextInput
                disabled
                style={[styles.InputField]}
                placeholder="মন্তব্য"
                placeholderTextColor={'#000000'}
                value={this.state.comment}
                onChangeText={(value) => this.changeComment(value)}
              />
            </View>
          </View>

          <View>
            <LinearGradient
              colors={['#2D3190', '#2964BF']}
              style={styles.linearGradient}>
              <TouchableOpacity onPress={() => this.submit()}>
                <Text style={styles.buttonText}>ট্রিপ তৈরি করুন &nbsp; </Text>
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
  errorMessage: {
    color: 'red',
    textAlign: 'left',
    fontSize: 16,
  },
});
