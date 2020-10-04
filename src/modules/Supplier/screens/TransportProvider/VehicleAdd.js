import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-community/picker';
import {
  getVehicleArea,
  getVehicleIdentityNumber,
  getVehicleClassDigits,
  getVehicleCapacity,
  getVehicleFuelType,
  getVehicleClass,
  postVehicleAdd,
} from '../../actions/TransportProvider/ShipmentRequestAction';
export default class VehicelAdd extends Component {
  state = {
    vheiclename: '',
    vehicleclass: '',
    vehicleLabel: '',
    vehiclearea: '',
    prefixalphabet: '',
    prefixAlphabetName: '',
    prefixNumberName: '',
    VehicleClassName: '',
    vehicleLabelName: '',
    prefixlabel: '',
    prefixnumber: '',
    areaLabel: '',
    endnumber: '',
    ownername: '',
    mobile: '',
    volumecapacity: '',
    unladencapacity: '',
    maxunladencapacity: '',
    fuelused: '',
    capacity: '',
    errorMessage: {},
    areaNameList: [],
    prefixalphabetList: [],
    prefixnumberlist: [],
    VehicleCapacityList: [],
    VehicleFuelTypeList: [],
    VehicleClassList: [],
    VehicleClassSelected: '',
    productId: '',
    product: '',
    vhclareaId: '',
    vhclarea: '',
    vhclIdentifierId: '',
    vhclIdentifier: '',
    vhclPrefixNumberId: '',
    vhclPrefixNumber: '',
  };

  ownername = (value) => {
    let errorMessage = this.state.errorMessage;
    if (value !== '') {
      this.setState((prevState) => {
        let ownername = Object.assign({}, prevState.errorMessage);
        errorMessage.ownername = ''; // update the name property, assign a new value
        return {ownername}; // return new object jasper object
      });
    } else {
      errorMessage.ownername = 'Please type outlet address';
    }

    this.setState({ownername: value});
  };

  mobile = (value) => {
    let errorMessage = this.state.errorMessage;
    this.setState({mobile: value});

    if (value.length !== 11) {
      errorMessage.mobile = 'mobile No should be 11 characters long';
    }

    if (value !== '') {
      this.setState((prevState) => {
        if (value.length == 11) {
          errorMessage.mobile = '';
        }
      });
    } else {
      errorMessage.mobile = 'Please type owner/manager mobile number';
    }
  };

  volumecapacity = (value) => {
    let errorMessage = this.state.errorMessage;
    if (value !== '') {
      this.setState((prevState) => {
        let volumecapacity = Object.assign({}, prevState.errorMessage);
        errorMessage.volumecapacity = ''; // update the name property, assign a new value
        return {volumecapacity}; // return new object jasper object
      });
    } else {
      errorMessage.volumecapacity = 'Please type ';
    }

    this.setState({volumecapacity: value});
  };

  unladencapacity = (value) => {
    let errorMessage = this.state.errorMessage;
    if (value !== '') {
      this.setState((prevState) => {
        let unladencapacity = Object.assign({}, prevState.errorMessage);
        errorMessage.unladencapacity = ''; // update the name property, assign a new value
        return {unladencapacity}; // return new object jasper object
      });
    } else {
      errorMessage.unladencapacity = 'Please type ';
    }

    this.setState({unladencapacity: value});
  };

  maxunladencapacity = (value) => {
    let errorMessage = this.state.errorMessage;
    if (value !== '') {
      this.setState((prevState) => {
        let maxunladencapacity = Object.assign({}, prevState.errorMessage);
        errorMessage.maxunladencapacity = ''; // update the name property, assign a new value
        return {maxunladencapacity}; // return new object jasper object
      });
    } else {
      errorMessage.maxunladencapacity = 'Please type ';
    }

    this.setState({maxunladencapacity: value});
  };

  endnumber = (value) => {
    let errorMessage = this.state.errorMessage;
    if (value !== '') {
      this.setState((prevState) => {
        let endnumber = Object.assign({}, prevState.errorMessage);
        errorMessage.endnumber = ''; // update the name property, assign a new value
        return {endnumber}; // return new object jasper object
      });
    } else {
      errorMessage.endnumber = 'Please type ';
    }

    this.setState({endnumber: value});
  };

  async componentDidMount() {
    const {vehiclearea, prefixalphabet, prefixnumber} = this.state;

    let areaNameList = await getVehicleArea();
    let prefixalphabetList = await getVehicleIdentityNumber();
    let prefixnumberlist = await getVehicleClassDigits();
    let VehicleCapacityList = await getVehicleCapacity();
    let VehicleFuelTypeList = await getVehicleFuelType();
    let VehicleClassList = await getVehicleClass();

    this.setState({
      areaNameList,
      prefixalphabetList,
      prefixnumberlist,
      VehicleCapacityList,
      VehicleFuelTypeList,
      VehicleClassList,
    });
  }

  selectProduct = async (item) => {
    let that = this;

    that.setState({
      product: item,
      productId: item.intvehicleClassid,
      VehicleClassSelected: item,
    });
  };

  selectVhclArea = async (item) => {
    let that = this;

    that.setState({
      vhclarea: item,
      vhclareaId: item.intID,
    });
  };

  selectVhclIdentifier = async (item) => {
    let that = this;

    that.setState({
      vhclIdentifier: item,
      vhclIdentifierId: item.intID,
    });
  };

  selectvhclPrefixNumber = async (item) => {
    let that = this;

    that.setState({
      vhclPrefixNumber: item,
      vhclPrefixNumberId: item.intID,
    });
  };

  submit = async () => {
    const {
      vehiclearea,
      vehicleclass,
      areaname,
      areaLabel,
      prefixalphabet,
      prefixnumber,
      endnumber,
      ownername,
      mobile,
      volumecapacity,
      unladencapacity,
      maxunladencapacity,
      fuelused,
      capacity,
      intSupplierID,
    } = this.state;

    // Check if vehicle type and other option selected or not
    if (this.state.VehicleClassSelected == '') {
      Alert.alert('Warning', 'Please Select a Vehicle Class');
      return false;
    }
    if (this.state.vhclarea == '') {
      Alert.alert('Warning', 'Please Select a Vehicle Area');
      return false;
    }
    if (this.state.vhclIdentifier == '') {
      Alert.alert('Warning', 'Please Select a Vehicle Identifier');
      return false;
    }
    if (this.state.vhclPrefixNumber == '') {
      Alert.alert('Warning', 'Please Select a Vehicle Prefix Number');
      return false;
    }
    if (this.state.endnumber == '') {
      Alert.alert('Warning', 'Please Type Vehicle End Number');
      return false;
    }

    if (capacity == '') {
      Alert.alert('Warning', 'Please Select Vehicle Capacity');
      return false;
    }

    if (ownername == '') {
      Alert.alert('Warning', 'Please Give Owner Name');
      return false;
    }
    if (mobile == '') {
      Alert.alert('Warning', 'Please Give Driver Mobile No');
      return false;
    }
    if (mobile.length != 11) {
      Alert.alert('Warning', 'Mobile No Should be 11 Digit');
      return false;
    }

    let vehicleaddresponse = await postVehicleAdd(
      this.state.mobile,
      this.state.productId,
      this.state.vhclareaId,
      this.state.vhclIdentifierId,
      this.state.vhclPrefixNumberId,
      this.state.endnumber,
      this.state.ownername,
      this.state.mobile,
      '7',
      1,
      '1',
      '6',
      this.state.capacity,
      this.state.vhclPrefixNumberId,
    );
    if (vehicleaddresponse != null || vehicleaddresponse != 'undefined') {
      Alert.alert('গাড়ি এন্ট্রি হয়েছে', vehicleaddresponse);
      this.props.navigation.navigate('vehicleList');
    }
  };

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.selectBox]}>
            <View style={{paddingBottom: 15}}>
              <Text style={[styles.headTitle]}>গাড়ি এন্ট্রি</Text>
            </View>

            <View>
              <Text style={[styles.inputLable]}>গাড়ির ক্লাস </Text>

              <View style={[styles.selects]}>
                <Picker
                  selectedValue={this.state.VehicleClassSelected}
                  onValueChange={(item, itemIndex) => this.selectProduct(item)}>
                  <Picker.Item key="-1" label="Select" value="" />
                  {this.state.VehicleClassList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.strVechicleClassname}
                      value={item}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <Text style={[styles.inputLable]}> রেজিস্ট্রেশন নাম্বার </Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexBasis: '48%'}}>
                <View style={[styles.selects]}>
                  {/* <Picker
                                        selectedValue={this.state.areaname}
                                        style={[styles.Prority]}

                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ areaname: itemValue, areaLabel: itemValue.strVehicleCity })
                                        }>

                                        {
                                            this.state.areaNameList.map((item, index) =>
                                                (
                                                    <Picker.Item key={index} label={item.strVehicleCity} value={item} />
                                                )
                                            )
                                        }
                                    </Picker>
 */}
                  <Picker
                    selectedValue={this.state.vhclarea}
                    onValueChange={(item, itemIndex) =>
                      this.selectVhclArea(item)
                    }>
                    <Picker.Item key="-1" label="Select Area" value="" />
                    {this.state.areaNameList.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.strVehicleCity}
                        value={item}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={{flexBasis: '48%'}}>
                <View style={[styles.selects]}>
                  {/* <Picker
                                        selectedValue={this.state.prefixalphabet}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ prefixalphabet: itemValue, prefixAlphabetName: itemValue.strIndentityNymber })
                                        }>
                                        {
                                            this.state.prefixalphabetList.map((item, index) =>
                                                (
                                                    <Picker.Item key={index} label={item.strIndentityNymber} value={item} />
                                                )
                                            )
                                        }
                                    </Picker> */}

                  <Picker
                    selectedValue={this.state.vhclIdentifier}
                    onValueChange={(item, itemIndex) =>
                      this.selectVhclIdentifier(item)
                    }>
                    <Picker.Item
                      key="-1"
                      label="Select Identity No."
                      value=""
                    />
                    {this.state.prefixalphabetList.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.strIndentityNymber}
                        value={item}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexBasis: '48%'}}>
                <View style={[styles.selects]}>
                  <Picker
                    selectedValue={this.state.vhclPrefixNumber}
                    onValueChange={(item, itemIndex) =>
                      this.selectvhclPrefixNumber(item)
                    }>
                    <Picker.Item
                      key="-1"
                      label="Select Vehicle Prefix"
                      value=""
                    />
                    {this.state.prefixnumberlist.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.intVehicleClassNumber.toString()}
                        value={item}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={{flexBasis: '48%'}}>
                <View style={[styles.selects]}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Type End Number"
                    placeholderTextColor={'#000000'}
                    onChangeText={(value) => this.endnumber(value)}
                    value={this.state.endnumber}
                    keyboardType={'numeric'}
                  />
                </View>
              </View>
            </View>

            <View>
              <Text style={[styles.inputLable]}> ক্যাপাসিটি </Text>

              <View style={[styles.selects]}>
                <Picker
                  selectedValue={this.state.capacity}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({capacity: itemValue})
                  }>
                  <Picker.Item
                    key="-1"
                    label="Select Vehicle Capacity"
                    value=""
                  />
                  {this.state.VehicleCapacityList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.strType}
                      value={item.intTypeId}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View>
              <Text style={[styles.inputLable]}> মালিকের নাম </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="Type Name"
                placeholderTextColor={'#000000'}
                onChangeText={(value) => this.ownername(value)}
                value={this.state.ownername}
              />
            </View>

            <View>
              <Text style={[styles.inputLable]}> ফোন নম্বর </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="0171XXXXXX"
                placeholderTextColor={'#000000'}
                keyboardType={'numeric'}
                onChangeText={(value) => {
                  this.mobile(value.replace(/[^0-9]/g, ''));
                }}
                value={this.state.mobile}
              />
            </View>

            {/* <View>
              <Text style={[styles.inputLable]}> ভলিয়ম ক্যাপাসিটি (টন) </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="লিখুন"
                keyboardType={'numeric'}
                placeholderTextColor={'#000000'}
                onChangeText={value => this.volumecapacity(value)}
                value={this.state.volumecapacity}
              />
            </View> */}
            {/* 
            <View>
              <Text style={[styles.inputLable]}> ফুয়েল ব্যবহার্য </Text>

              <View style={[styles.selects]}>
                <Picker
                  selectedValue={this.state.fuelused}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({fuelused: itemValue})
                  }>
                  {this.state.VehicleFuelTypeList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.strFuelType}
                      value={item.intFuelType}
                    />
                  ))}
                </Picker>
              </View>
            </View> */}

            {/* <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexBasis: '48%'}}>
                <Text style={[styles.inputLable]}> খালি গাড়ির ওজন (টন) </Text>
                <View style={[styles.selects]}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="লিখুন"
                    placeholderTextColor={'#000000'}
                    onChangeText={value => this.unladencapacity(value)}
                    value={this.state.unladencapacity}
                    keyboardType={'numeric'}
                  />
                </View>
              </View>

              <View style={{flexBasis: '48%'}}>
                <Text style={[styles.inputLable]}> লোডেড গাড়ির ওজন (টন)</Text>
                <View style={[styles.selects]}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="লিখুন"
                    placeholderTextColor={'#000000'}
                    onChangeText={value => this.maxunladencapacity(value)}
                    value={this.state.maxunladencapacity}
                    keyboardType={'numeric'}
                  />
                </View>
              </View>
            </View> */}
          </View>

          <View>
            <LinearGradient
              colors={['#4E51C9', '#4E51C9']}
              style={styles.linearGradient}>
              <TouchableOpacity
                onPress={() => {
                  this.submit();
                }}>
                <Text style={styles.buttonText}>এন্ট্রি শেষ করুন</Text>
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
  },
  photo: {
    width: 75,
    height: 75,
  },
  inputLable: {
    fontSize: RFPercentage(2.5),
    color: '#000000',
    fontWeight: 'bold',
  },
  InputField: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'popppins',
    borderRadius: 0,
    borderBottomColor: '#000',
    borderBottomWidth: 0.6,
    paddingVertical: 10,
    marginBottom: 15,
  },
  linearGradient: {
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: RFPercentage(3),
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  selects: {
    color: 'red',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
