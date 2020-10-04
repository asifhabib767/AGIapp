import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  View,
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  RefreshControl,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions} from 'react-native-router-flux';

// import { SalesOrderValidation } from '../Util/Validation';
import {
  getShipmentDataByVehicleId,
  getVehicleProviderData,
  getOrderData,
  getVehicleCapacityData,
  postShipmentData,
  getVehicleData,
  getDriversData,
  getSupplierListForBridge,
  getTerritoryList,
} from '../ShipmentPlanning/ShipmentServices';
// import { getUnit, getUserId } from '../service/auth/AuthService';
import * as DateClass from '../../../Master/Util/DateConfigure';

export default class SupplierTerritoryAssign extends Component {
  state = {
    vehicleProvider: '',
    vehicleType: '',
    orderNo: '',

    vehicleProviderData: [],
    vehicleTypeData: [],
    vehicleCapacityData: [],
    orderListData: [],
    vehicleData: [],
    driversData: [],
    initialOrderListData: [],
    vehicleShipmentData: [],
    all_vehicles: [],
    serachVehicleText: '',
    searched_vehicles: [],
    search_ships_text: '',
    intShipmentRequestID: '',
    SupplierData: [],
    TerritoryData: [],

    // confirmData: {
    //   intUnitId: 0,
    //   dteRequestDateTime: DateClass.getFormattedCurrentDate(),
    //   intInsertBy: this.props.route.params.transport.intInsertBy,
    //   strText: '',
    //   strVehicleCapacity: '',
    //   strLastDestination: this.props.route.params.transport.strLastDestination,
    //   intID: 4,
    //   intDriverEnroll: '',
    //   ysnScheduleId: false,
    //   intShipmentRequestID: this.props.route.params.transport
    //     .intShipmentRequestID,
    //   strRequestNo: 0,
    //   strVehicleType: '',
    // },

    refreshing: false,
    isDateTimePickerVisible: false,

    selectedOrder: {},
    requisition_quantity: '0',
    selectedOrderList: [],
    requestOrderData: [],
    totalQuantity: '0',
    numRestPieces: '0',
    isLoading: false,
  };

  componentDidMount() {
    this.initializeData();
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.initializeData().then(() => {
      this.setState({refreshing: false});
    });
  }

  initializeData = async () => {
    // let providerType = this.changeVehicleProviderType();

    // let vehicleProviderData = await getVehicleProviderData(); // ok
    // let vehicleCapacityData = await getVehicleCapacityData(); // ok
    let SupplierData = await getSupplierListForBridge();
    console.log('SupplierData', SupplierData);
    let TerritoryData = await getTerritoryList();

    // let orderListData = await getOrderData(
    //   this.props.route.params.transport.intShipmentRequestID,
    // ); // ok
    console.log('SupplierData', SupplierData);
    let initialOrderListData = orderListData;
    let vehicleData = await getVehicleData(); // ok
    let driversData = await getDriversData(); // ok

    this.setState({
      SupplierData,
      TerritoryData,
    });
  };

  setOrderItem = async () => {
    this.setState({
      search_ships_text: '',
    });
  };

  submitDeliveryOrder = async () => {
    this.setState({isLoading: true});
    // validate order
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
      let strShipName =
        item.strSalesOrderCode + ' ' + item.intShipmentRequestID;
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
        intShipmentRequestID: '',
      });
      this.selectShip(this.state.searched_vehicles[0]);
    } else {
      this.setState({
        search_ships_text: searchText,
        searched_vehicles,
        intShipmentRequestID: '',
      });
    }
  };

  /**
   * selectShip
   */
  selectShip = async (item) => {
    let vehicleId = item.intShipmentRequestID;

    if (
      typeof item.decTotalQty !== 'undefined' &&
      item.decTotalQty !== null &&
      typeof item !== 'string'
    ) {
      this.setState({
        selectedOrder: item,
        requisition_quantity: item.decTotalQty,
      });
    }

    this.setState({
      vehicleId: item.intShipmentRequestID,
      search_ships_text: item.strSalesOrderCode + ' [' + vehicleId + ']',
      search_vehicle_text: item.strSalesOrderCode + ' [' + vehicleId + ']',
      searched_vehicles: [],
    });
  };

  render() {
    return (
      <KeyboardAvoidingView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }>
          <SafeAreaView style={[styles.container]}>
            <View style={[styles.bgbox]}>
              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
                <View style={[styles.orderNo]}>
                  <Text style={[styles.inputLebel]}> Supplier Name </Text>

                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Type Supplier Name"
                    placeholderTextColor={'#000000'}
                    value={this.state.search_ships_text}
                    onChangeText={(value) => this.searchVehicles(value)}
                  />

                  {this.state.search_ships_text.length > 0 &&
                    this.state.searched_vehicles.length > 0 && (
                      <ScrollView
                        style={{backgroundColor: '#B3FFD6', height: '100%'}}>
                        {this.state.searched_vehicles.map((item, index) => (
                          <TouchableOpacity
                            onPress={() => this.selectShip(item)}>
                            <Text
                              key={index}
                              style={{
                                padding: 8,
                                borderWidth: 0,
                                fontWeight: 'bold',
                                color: 'black',
                                borderBottomWidth: 1,
                                borderBottomColor: '#ddd',
                              }}>
                              {' '}
                              {item.strType + ' [' + item.strType + ']'}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    )}
                  {this.state.searched_vehicles.length > 0 &&
                    this.state.searched_vehicles.length == 0 && (
                      <Text
                        style={{
                          backgroundColor: '#eee',
                          padding: 8,
                          color: 'red',
                        }}>
                        Sorry !! No Dispoint found by -{' '}
                        {this.state.search_vehicle_text}
                      </Text>
                    )}
                </View>
              </View>
              {/* end */}
            </View>

            <View style={[styles.bgbox]}>
              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
                <View style={[styles.orderNo]}>
                  <Text style={[styles.inputLebel]}> Territory Name </Text>

                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Type Territory Name"
                    placeholderTextColor={'#000000'}
                    value={this.state.search_ships_text}
                    onChangeText={(value) => this.searchVehicles(value)}
                  />

                  {this.state.search_ships_text.length > 0 &&
                    this.state.searched_vehicles.length > 0 && (
                      <ScrollView
                        style={{backgroundColor: '#B3FFD6', height: '100%'}}>
                        {this.state.searched_vehicles.map((item, index) => (
                          <TouchableOpacity
                            onPress={() => this.selectShip(item)}>
                            <Text
                              key={index}
                              style={{
                                padding: 8,
                                borderWidth: 0,
                                fontWeight: 'bold',
                                color: 'black',
                                borderBottomWidth: 1,
                                borderBottomColor: '#ddd',
                              }}>
                              {' '}
                              {item.strType + ' [' + item.strType + ']'}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    )}
                  {this.state.searched_vehicles.length > 0 &&
                    this.state.searched_vehicles.length == 0 && (
                      <Text
                        style={{
                          backgroundColor: '#eee',
                          padding: 8,
                          color: 'red',
                        }}>
                        Sorry !! No Dispoint found by -{' '}
                        {this.state.search_vehicle_text}
                      </Text>
                    )}
                </View>
              </View>
              {/* end */}
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  bgbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    margin: 10,
    padding: 10,
    paddingTop: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 1},
  },

  headingOne: {
    fontSize: 19,
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingTop: 5,
  },
  inputLebel: {
    fontSize: RFPercentage(2.2),
    color: '#000000',
    fontWeight: 'bold',
  },
  picStyle: {
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 0.8,
    flexBasis: '47%',
    marginRight: 10,
  },
  lastDestination: {
    flex: 1,
    flexBasis: '100%',
  },
  InputField: {
    height: 40,
    color: '#000',
    fontSize: RFPercentage(2.5),
    fontSize: 16,
    borderBottomColor: '#DADADA',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  orderNo: {
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 0.8,
    flexBasis: '100%',
  },
  inputOutput: {
    fontSize: RFPercentage(2.5),
    color: '#231F20',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  buttonStyle: {
    backgroundColor: '#4E51C9',
    color: '#fff',
    fontSize: RFPercentage(3.5),
    textAlign: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    paddingVertical: 15,
    textTransform: 'uppercase',
    borderRadius: 10,
  },
  styleButtionOne: {
    backgroundColor: '#08C48F',
    color: '#fff',
    fontSize: RFPercentage(2.2),
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 5,
    borderRadius: 10,
  },
  orderBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    margin: 10,
    padding: 10,
    paddingTop: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 1},
    marginBottom: 50,
  },
  bags: {
    flex: 1,
    flexDirection: 'row',
    flexBasis: '100%',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingTop: 10,
    alignContent: 'flex-end',
  },
  totalQun: {
    fontSize: RFPercentage(2.8),
    color: '#231F20',
    textAlign: 'right',
    flex: 1,
    flexDirection: 'row',
  },
});
