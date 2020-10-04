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
  TextInput,
  Alert,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import planicons from '../../images/tripAssign.png';
import {Picker} from '@react-native-community/picker';
import CustomSearchbar from '../../../Master/components/CustomSearchBar';
import * as DateClass from '../../../Master/Util/DateConfigure';
import LinearGradient from 'react-native-linear-gradient';

import {
  // getShipmentPlanningData,
  getRequisitionsForAssign,
  getShipPointByUser,
  postShipmentAssigntoData,
  getProfileByEnrollandUnitId,
} from '../ShipmentPlanning/ShipmentServices';
import {FlatList} from 'react-native-gesture-handler';
import {CheckBox} from '@ui-kitten/components';
import {getShipmentDateStatus} from '../../../Master/Util/DateConfigure';

export default class ShipmentAssign extends Component {
  state = {
    selects: '',
    orderList: [],
    refreshing: false,
    searchOrderList: [],
    searchRequestText: '',
    checked: false,
    // setChecked: '',
    assignedEnroll: '',
    errorMessage: {},
    selectedType: 'All',
    profileData: [],
    searchProfileList: [],
    searchRequestProfileText: '',
  };

  async componentDidMount() {
    this.initializeData();
  }

  filterType = (itemValue) => {
    this.setState({selectedType: itemValue});
    // Sort orders by itemValue
    const newData = this.state.orderList.filter(function (item) {
      if (itemValue == 'All') {
        item.isChecked = true;
        return true;
      } else {
        item.isChecked = true;
        if (item.strVehicleProviderType == itemValue) return true;
      }
    });
    this.setState({
      searchOrderList: newData,
    });
  };

  onRefresh() {
    this.setState({refreshing: true});
    this.initializeData().then(() => {
      this.setState({refreshing: false});
    });
  }

  onReadCheckedChange = (checked, item, index) => {
    const searchOrderList = this.state.searchOrderList;

    if (checked) {
      item.isChecked = true;
    } else {
      item.isChecked = false;
    }
    searchOrderList[index] = item;
    this.setState({searchOrderList});
  };

  searchText = (value) => {
    this.searchFilterFunction(value);
  };

  initializeData = async () => {
    const orderList = await getRequisitionsForAssign();

    const getProfileData = await getProfileByEnrollandUnitId();

    // this.setState({
    //   startDate: this.currentDate(),
    //   endDate: this.currentDate(),
    // });
    // orderList = orderList.data;
    const shipPointList = await getShipPointByUser();
    let i = 0;
    orderList.forEach((item) => {
      item.isChecked = false;
      orderList[i] = item;
      i++;
    });

    this.setState({
      orderList,
      searchOrderList: orderList,
      shipPointList,
      profileData: getProfileData,
    });
  };

  searchFilterFunction = (searchRequestText) => {
    if (searchRequestText.length > 0) {
      const newData = this.state.orderList.filter(function (item) {
        const itemData =
          item.intShipmentRequestID +
          ' ' +
          item.strSalesOrderCode.toUpperCase() +
          ' ' +
          item.strLastDestination.toUpperCase() +
          ' ' +
          item.strVehicleCapacity.toUpperCase();
        const textData = searchRequestText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        searchOrderList: newData,
        searchRequestText: searchRequestText,
      });
    } else {
      this.setState({
        searchOrderList: this.state.orderList,
        searchRequestText: '',
      });
    }
  };
  searchBYName = (searchRequestText) => {
    if (searchRequestText.length > 0) {
      const newData = this.state.profileData.filter(function (item) {
        const itemData =
          item.intEmployeeID +
          ' ' +
          item.strSalesOrderCode +
          ' ' +
          item.strEmployeeName.toUpperCase();

        const textData = searchRequestText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        searchProfileList: newData,
        searchRequestProfileText: searchRequestText,
      });
    } else {
      this.setState({
        searchProfileList: [],
        searchRequestProfileText: '',
      });
    }
  };

  selectedProfileData = (data) => {
    this.setState({
      assignedEnroll: data.intEmployeeID,
      searchRequestProfileText: data.strEmployeeName,
      searchProfileList: [],
    });
  };
  submit = async () => {
    const requisitions = [];

    this.state.searchOrderList.forEach((item, index) => {
      if (item.isChecked) {
        requisitions.push(item.intShipmentRequestID);
      }
    });
    if (requisitions.length == 0) {
      Alert.alert('Warning', 'Please assign at least one request !');
      return false;
    }
    if (this.state.assignedEnroll.length == '') {
      Alert.alert('Warning', 'Please give assigned enroll number !');
      return false;
    }

    let shipementAssignResponse = await postShipmentAssigntoData(
      requisitions,
      this.state.assignedEnroll,
    );

    if (
      shipementAssignResponse != null ||
      shipementAssignResponse != 'undefined'
    ) {
      Alert.alert('Assigned Successfull', 'Your assign has been successfull');
      this.initializeData();
      this.props.navigation.navigate('shipmentAssign');
    }
  };

  render() {
    const {navigation} = this.props;
    return (
      <ScrollView
        style={[styles.fullbg]}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
        <SafeAreaView style={styles.container}>
          <View style={[styles.selectBox]}>
            <Text style={[styles.headingOne]}> Transport Schedule Assign </Text>

            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 15}}>
              <View style={{flexBasis: '100%', marginRight: 30}}>
                <CustomSearchbar
                  placeHolderText="Search from List"
                  onChangeText={(value) => this.searchText(value)}
                />
              </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 15}}>
              {/* <View style={{flexBasis: 80, marginRight: 15}}>
                <Image source={driverphoto} style={[styles.photo]} />
              </View> */}

              <View style={{flexDirection: 'row'}}>
                <Picker
                  selectedValue={this.state.selectedType}
                  style={{height: 40, flexBasis: '30%'}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.filterType(itemValue)
                  }>
                  <Picker.Item label="All" value="All" />
                  <Picker.Item label="Supplier" value="Supplier" />
                  <Picker.Item label="Company" value="Company" />
                  <Picker.Item label="Customer" value="Customer" />
                </Picker>
                <TextInput
                  style={[
                    styles.InputField,
                    {
                      flexBasis: '40%',
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                    },
                  ]}
                  placeholder="Search By Name"
                  placeholderTextColor={'#000000'}
                  onChangeText={(value) => this.searchBYName(value)}
                  // onChangeText={(value) =>
                  //   this.setState({assignedEnroll: value})
                  // }

                  value={this.state.searchRequestProfileText}
                />

                <LinearGradient
                  colors={['#4E51C9', '#4E51C9']}
                  style={[
                    styles.linearGradient,
                    {flexBasis: '30%', marginLeft: 20},
                  ]}>
                  <TouchableOpacity onPress={this.submit}>
                    <Text style={styles.buttonText}> Submit</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
            <FlatList
              data={this.state.searchProfileList}
              renderItem={({item, index, separators}) => (
                <TouchableOpacity
                  onPress={() => this.selectedProfileData(item)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      paddingVertical: 20,
                      backgroundColor: '#fff',
                      borderBottomColor: '#ccc',
                      borderBottomWidth: 1,
                    }}>
                    <View>
                      <Text>{item.intEmployeeID}</Text>
                    </View>
                    <View>
                      <Text>{item.strEmployeeName}</Text>
                    </View>
                    <View>
                      <Text>{item.strEmployeeCode}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />

            <FlatList
              data={this.state.searchOrderList}
              keyExtractor={(item, index) => index}
              renderItem={({item, index, separators}) => (
                <View
                  style={[
                    styles.planningBox,
                    !getShipmentDateStatus(item.dteRequestDateTime)
                      ? styles.TimeWarningBg
                      : '',
                  ]}
                  key={index}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flexBasis: 60}}>
                      <CheckBox
                        style={styles.option}
                        checked={item.isChecked}
                        onChange={(e) =>
                          this.onReadCheckedChange(e, item, index)
                        }></CheckBox>
                    </View>
                    <View style={{flexBasis: '60%'}}>
                      <Text style={[styles.date]}>
                        {' '}
                        {DateClass.generateStringDateFromDateTime(
                          item.dteRequestDateTime,
                          true,
                        )}{' '}
                      </Text>
                      <Text style={[styles.orderNo]}>
                        Req. No #{item.intShipmentRequestID}{' '}
                      </Text>
                      <Text style={[styles.location]}>
                        <Icon
                          color={'#5D5C5C'}
                          size={20}
                          type="font-awesome"
                          name="map-marker"
                        />{' '}
                        {item.strLastDestination}, {item.customerName}
                      </Text>
                      <Text style={styles.vehicleType}>
                        {item.strVehicleType}
                      </Text>
                      <Text style={[styles.Type]}>
                        {item.strVehicleProviderType}{' '}
                      </Text>
                      {!getShipmentDateStatus(item.dteRequestDateTime) && (
                        <Text style={styles.TimeWarning}>For Tomorrow</Text>
                      )}
                    </View>
                    <View style={{flexBasis: '20%'}}>
                      <Text style={[styles.bags]}> Qty(bags) </Text>
                      <Text style={[styles.bagsQty]}>
                        {' '}
                        {parseFloat(item.decTotalQty).toFixed(1)}{' '}
                      </Text>
                      {item.details.map((itemDetails, index2) => (
                        <View
                          key={index2}
                          style={{
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderTopColor: '#ccc',
                            borderBottomColor: '#ccc',
                            textAlign: 'center',
                            paddingTop: 5,
                          }}>
                          <Text style={{fontWeight: 'bold'}}>
                            {itemDetails.strProductName}{' '}
                            {parseFloat(itemDetails.decQty).toFixed(1)}
                            {itemDetails.strBagType != null && (
                              <>
                                #BT-
                                {itemDetails.strBagType}
                              </>
                            )}
                          </Text>
                          <Text>#{itemDetails.strSalesOrderCode}</Text>
                        </View>
                      ))}
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
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('addTransportSchedule', {
                            transport: item,
                          })
                        }>
                        <Text style={styles.buttonText}>Schedule</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              )}
            />
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

  option: {
    marginVertical: 4,
    marginHorizontal: 12,
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
    fontSize: RFPercentage(3),
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
  TimeWarningBg: {
    backgroundColor: '#FFFFCC',
  },
  TimeWarning: {
    fontSize: RFPercentage(2),
    color: '#000000',
    borderWidth: 1,
    borderColor: '#3187FE',
    padding: 2,
    textAlign: 'center',
    borderRadius: 50,
    fontWeight: 'bold',
    marginTop: 5,
    backgroundColor: '#FFFFCC',
    borderRadius: 5,
    width: 120,
    paddingLeft: 5,
    paddingRight: 5,
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
    width: 70,
  },
  buttonText: {
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 7,
  },
  vehicleType: {
    backgroundColor: '#fff',
    width: 100,
    margin: 5,
    borderRadius: 20,
    padding: 5,
    color: '#000',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#3AC6B3',
  },
});
