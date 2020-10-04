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
  getDataVehicleInformation,
  getVehicleProviderData,
  getOrderData,
  getVehicleCapacityData,
  postShipmentData,
  getVehicleData,
  getDriversData,
  getDataVehicleTypeVsVehicleList,
} from '../ShipmentPlanning/ShipmentServices';
// import { getUnit, getUserId } from '../service/auth/AuthService';
import * as DateClass from '../../../Master/Util/DateConfigure';

export default class AddTransportSchedule extends Component {
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

    confirmData: {
      intUnitId: 0,
      dteRequestDateTime: DateClass.getFormattedCurrentDate(),
      intInsertBy: this.props.route.params.transport.intInsertBy,
      strText: '',
      strVehicleCapacity: '',
      strLastDestination: this.props.route.params.transport.strLastDestination,
      intID: 4,
      intDriverEnroll: '',
      vehicleSelected: {},
      vehicleCapacitySeleted: {},
      ysnScheduleId: false,
      intShipmentRequestID: this.props.route.params.transport
        .intShipmentRequestID,
      strRequestNo: 0,
      strVehicleType: '',
      vehicleSeleted: {},
    },

    refreshing: false,
    isDateTimePickerVisible: false,
    selectedProvaider: {},
    selectedOrder: {},
    requisition_quantity: '',
    selectedOrderList: [],
    requestOrderData: [],
    totalQuantity: '0',
    numRestPieces: '0',
    isLoading: false,
  };

  componentDidMount() {
    console.log('PropsData', this.props);
    this.initializeData();
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.initializeData().then(() => {
      this.setState({refreshing: false});
    });
  }

  initializeData = async () => {
    // let providerType = this.changeVehicleProviderType()

    let vehicleProviderData = await getVehicleProviderData(); // ok
    let vehicleCapacityData = await getVehicleCapacityData(); // ok

    let orderListData = await getOrderData(
      this.props.route.params.transport.intShipmentRequestID,
    ); // ok

    let initialOrderListData = orderListData;
    // let vehicleData = await getVehicleData(); // ok
    let driversData = await getDriversData(); // ok
    const {
      intRequestId,
      strSalesOrderCode,
      decQty,
    } = this.props.route.params.transport.details[0];

    // alert(intRequestId);

    // Filter Shipment Requisition List and select this requisition
    // const searched_vehicles = this.state.all_vehicles.filter(function (item) {
    //   let strShipName = item.intShipmentRequestID;
    //   strShipName += item.strShipName
    //     ? item.strShipName.toUpperCase()
    //     : ''.toUpperCase();
    //   const itemData = strShipName.toUpperCase();
    //   const textData = searchText.toUpperCase();
    //   return itemData.indexOf(textData) > -1;
    // });

    var filteredArray = orderListData.filter(function (itm) {
      return itm.intShipmentRequestID == intRequestId;
    });
    if (filteredArray.length > 0) {
      this.selectShip(filteredArray[0]);
    }
    // console.log('selected requisition: ', filteredArray[0]);

    this.setState({
      vehicleProviderData,
      vehicleCapacityData,
      orderListData: orderListData,
      initialOrderListData,
      driversData,
      all_vehicles: orderListData,
      searched_vehicles: orderListData,
      search_ships_text:
        strSalesOrderCode +
        '[' +
        intRequestId +
        ']' +
        'Qty-' +
        decQty +
        this.props.route.params.transport.strVehicleCapacity,
      searched_vehicles: [],
    });

    //
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
    let dteDODate = year + '-' + month + '-' + dateNow;
    let confirmData = {...this.state.confirmData};
    confirmData.dteRequestDateTime = dteDODate;

    this.setState({confirmData});
    this.hideDateTimePicker();
  };
  changeVehicleType = (value) => {
    if (value != null) {
      let confirmData = {...this.state.confirmData};
      confirmData.strVehicleType = value;
      this.setState({confirmData});
    } else {
      let errorMsg = 'Select a provider';
      this.setState({errorMsg});
    }
  };

  changeVehicleProviderType = async (value) => {
    let cloneObj = {...this.state};
    cloneObj.confirmData.strText = value;
    cloneObj.confirmData.selectedProvaider = value;
    this.setState({cloneObj});
    this.getVehicleListByTypeandCapacity(
      value,
      this.state.confirmData.vehicleCapacitySeleted,
    );
  };

  changeVehicleCapacity = async (item) => {
    // let vehicleData = await getDataVehicleTypeVsVehicleList(item.intid);

    let cloneObj = {...this.state};
    cloneObj.confirmData.strVehicleCapacity = item;
    cloneObj.confirmData.vehicleCapacitySeleted = item;
    this.setState({
      cloneObj,
    });
    this.getVehicleListByTypeandCapacity(
      this.state.confirmData.selectedProvaider,
      item,
    );
  };

  getVehicleListByTypeandCapacity = async (providerType, vehicleCapacity) => {
    if (providerType.strText !== '' && vehicleCapacity.strText !== '') {
      // this function call for provaider type and vehicle capacity against
      let vehicleData = await getVehicleData(
        this.state.confirmData.selectedProvaider,
        this.state.confirmData.vehicleCapacitySeleted,
      );

      this.setState({vehicleData});
    }
  };

  changeVehicle = async (item) => {
    let cloneObj = {...this.state};
    cloneObj.confirmData.intID = item;
    cloneObj.confirmData.vehicleSelected = item;

    let vehicleInfoData = await getShipmentDataByVehicleId(
      this.state.confirmData.selectedProvaider,
      this.state.confirmData.vehicleSelected,
    );

    // cloneObj.vehicleShipmentData = vehicleInfoData;

    this.setState({
      cloneObj,
      vehicleShipmentData: vehicleInfoData,
    });
  };

  changeDriver = (item) => {
    let confirmData = {...this.state.confirmData};
    confirmData.intDriverEnroll = item;
    this.setState({confirmData});
  };

  changeLastDestination = (value) => {
    let confirmData = {...this.state.confirmData};
    confirmData.strLastDestination = value;
    this.setState({confirmData});
  };

  changeRequestQuantity = (value) => {
    if (value > this.state.selectedOrder.numRestPieces) {
      Alert.alert(
        'Error',
        'Please give less than ' + this.state.selectedOrder.numRestPieces,
      );
      return false;
    }
    // this.setState({requisition_quantity: value});
  };

  selectOrderItem = (item) => {
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
  };

  setOrderItem = async () => {
    if (this.state.selectedOrder.intShipmentRequestID == null) {
      Alert.alert('Error', 'Please select an order !');
      return false;
    }

    if (this.state.requisition_quantity < 1) {
      Alert.alert('Error', 'Please add minimum One quantity !');
      return false;
    } else if (
      this.state.selectedOrder.decTotalQty < this.state.requisition_quantity
    ) {
      Alert.alert('Error', 'Access Quantity is not Allowed !');
      return false;
    }

    let selectedOrderList = this.state.selectedOrderList;
    let newOrderItem = this.state.selectedOrder;

    let orderItem = {
      intShipmentId: 0,
      intRequestId: newOrderItem.intShipmentRequestID,
      intReqDetailsId: newOrderItem.intShipmentRequestDetails,
      intSalesOrderId: newOrderItem.intSalesOrderId,
      strSalesOrderCode: newOrderItem.strSalesOrderCode,
      intCustomerId: newOrderItem.intInsertBy,
      intDistPointId: 0,
      strDestinationAddress: newOrderItem.strLastDestination,
      decQty: parseInt(this.state.requisition_quantity),
    };

    let totalQuantity = 0;
    totalQuantity = parseInt(this.state.totalQuantity);
    totalQuantity += parseInt(this.state.requisition_quantity);

    selectedOrderList.push(orderItem);

    /** Remove item from previous list */
    for (var i = 0; i < this.state.orderListData.length; i++) {
      if (this.state.orderListData[i] == this.state.selectedOrder) {
        this.state.orderListData.splice(i, 1);
      }
    }

    this.setState({
      selectedOrder: {},
      requisition_quantity: '0',
      selectedOrderList,
      totalQuantity,
      search_ships_text: '',
    });
  };

  deleteItem = (item) => {
    let selectedOrderList = this.state.selectedOrderList;
    let orderListData = this.state.orderListData;
    let initialOrderListData = this.state.initialOrderListData;

    let totalQuantity = parseInt(this.state.totalQuantity);

    let newOrderItem = {};
    let intId = item.intShipmentId;
    newOrderItem = initialOrderListData.find(
      (orderItem) => orderItem.intShipmentRequestID === intId,
    );

    for (var i = 0; i < selectedOrderList.length; i++) {
      if (selectedOrderList[i] == item) {
        selectedOrderList.splice(i, 1);
        orderListData.unshift(newOrderItem);
        totalQuantity -= parseInt(item.decQty);
      }
    }

    this.setState({
      selectedOrderList,
      orderListData,
      totalQuantity,
    });
  };

  submitDeliveryOrder = async () => {
    this.setState({isLoading: true});
    // validate order
    if (this.state.selectedOrderList.length == 0) {
      Alert.alert('Warning', 'Please add minimum one order !');
      this.setState({isLoading: false});
      return false;
    }

    if (this.state.confirmData.intID == 0) {
      Alert.alert('Warning', 'Please add a Vehicle Name !');
      this.setState({isLoading: false});
      return false;
    }

    try {
      let requestNo = await postShipmentData(
        this.state.confirmData,
        this.state.selectedOrderList,
      );
      if (requestNo != '') {
        this.setState({
          confirmData: {},
          totalQuantity: '0',
          requisition_quantity: '0',
          selectedOrderList: [],
        });
        Alert.alert('Shipment Planning Created', 'Shipment No - ' + requestNo);
        this.props.navigation.navigate('transportSchedule');
        this.setState({isLoading: false});
      } else {
        Alert.alert('Error', 'Something Error happend !');
        this.setState({isLoading: false});
        return false;
      }
    } catch (error) {
      Alert.alert('Error', 'Something Error happend !');
      this.setState({isLoading: false});
    }
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
  selectShip = (item) => {
    let vehicleId = item.intShipmentRequestID;
    console.log('decTotalQty', item.decTotalQty);

    if (
      typeof item.decTotalQty !== 'undefined' &&
      item.decTotalQty !== null &&
      typeof item !== 'string'
    ) {
      this.setState({
        selectedOrder: item,
        requisition_quantity: item.decTotalQty.toString(),
      });
    }

    this.setState({
      selectedOrder: item,
      requisition_quantity: item.decTotalQty,
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
              <Text style={[styles.headingOne]}>Shipment Planning</Text>

              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
                <View style={[styles.picStyle]}>
                  <Text style={[styles.inputLebel]}> Provider Type </Text>
                  <Picker
                    style={[styles.picStyle]}
                    selectedValue={this.state.confirmData.selectedProvaider}
                    onValueChange={(value) =>
                      this.changeVehicleProviderType(value)
                    }>
                    {this.state.vehicleProviderData.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.strText}
                        value={item}
                      />
                    ))}
                  </Picker>
                </View>

                <View style={[styles.picStyle]}>
                  <Text style={[styles.inputLebel]}>Vehicle Capacity </Text>
                  <Picker
                    style={[{flexBasis: '45%'}]}
                    selectedValue={
                      this.state.confirmData.vehicleCapacitySeleted
                    }
                    onValueChange={(item, itemIndex) =>
                      this.changeVehicleCapacity(item)
                    }>
                    {this.state.vehicleCapacityData.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.strText}
                        value={item}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              {/* end */}

              {/*  Type and Capacity */}
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={[styles.picStyle]}>
                  <Text style={[styles.inputLebel]}> Select Vehicle </Text>
                  <Picker
                    style={[{flexBasis: '70%'}]}
                    selectedValue={this.state.confirmData.vehicleSelected}
                    onValueChange={(itemVehicle) =>
                      this.changeVehicle(itemVehicle)
                    }>
                    {this.state.vehicleData.map((itemVehicle, index) => (
                      <Picker.Item
                        key={index}
                        label={itemVehicle.strRegNo}
                        value={itemVehicle}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={[styles.picStyle]}>
                  <Text style={[styles.inputLebel]}>Vehicle Type </Text>
                  <Picker
                    style={[{flexBasis: '30%'}]}
                    selectedValue={
                      this.props.route.params.transport.strVehicleType
                    }
                    onValueChange={(value) => this.changeVehicleType(value)}>
                    {/* <Picker.Item
                      label={this.props.route.params.transport.strVehicleType}
                      value={this.props.route.params.transport.strVehicleType}
                    /> */}
                    {/* <Picker.Item key={0} label="Open" value="Open" />
                    <Picker.Item key={1} label="Covered" value="Covered" />
                    <Picker.Item key={2} label="Any Truck" value="Any Truck" /> */}
                    {this.state.vehicleShipmentData.map(
                      (vehicleType, index) => (
                        <Picker.Item
                          key={index}
                          label={vehicleType.strCoverStatus}
                          value={vehicleType}
                        />
                      ),
                    )}
                  </Picker>
                </View>
              </View>

              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
                <View
                  style={[styles.picStyle]}
                  onPress={this.showDateTimePicker}>
                  <Text
                    style={[styles.inputLebel]}
                    onPress={this.showDateTimePicker}>
                    {' '}
                    Request Date
                  </Text>

                  <TouchableOpacity onPress={this.showDateTimePicker}>
                    <Text
                      title="Show DatePicker"
                      onPress={this.showDateTimePicker}
                    />
                    <Text>{this.state.confirmData.dteRequestDateTime}</Text>
                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this.handleDatePicked}
                      onCancel={this.hideDateTimePicker}
                      datePickerModeAndroid={'spinner'}
                      mode={'date'}
                      value={this.state.confirmData.dteRequestDateTime}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* end */}

              <View style={[styles.picStyle]}>
                <Text style={[styles.inputLebel]}> Select Drivers </Text>
                <Picker
                  style={[styles.picStyle]}
                  selectedValue={this.state.confirmData.intDriverEnroll}
                  onValueChange={(value) => this.changeDriver(value)}>
                  {this.state.vehicleShipmentData.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.strDriver}
                      value={item.intDriverEnroll}
                    />
                  ))}
                </Picker>
              </View>

              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
                <View style={[styles.lastDestination]}>
                  <Text style={[styles.inputLebel]}> Last Destination </Text>
                  <Text style={[styles.InputField]}>
                    {this.props.route.params.transport.strLastDestination}
                  </Text>
                </View>
              </View>
              {/* end */}
            </View>

            <View style={[styles.bgbox]}>
              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
                <View style={[styles.orderNo]}>
                  <Text style={[styles.inputLebel]}> Requisition No </Text>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Type Requisition"
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
                              {item.strSalesOrderCode +
                                ' [' +
                                item.intShipmentRequestID +
                                ']'}
                              {'-Qty-' +
                                item.decTotalQty +
                                '-' +
                                item.strVehicleCapacity}
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

              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
                <View style={{flexBasis: '35%', marginRight: 5}}>
                  <Text style={[styles.inputLebel]}>
                    {' '}
                    Requisition Quantity{' '}
                  </Text>
                  <Text style={[styles.inputOutput, {marginLeft: 10}]}>
                    {this.state.selectedOrder.decTotalQty
                      ? this.state.selectedOrder.decTotalQty
                      : '0'}
                  </Text>
                </View>
                <View style={{flexBasis: '40%', marginRight: 5}}>
                  <Text style={[styles.inputLebel]}> Request Quantity </Text>
                  <TextInput
                    style={[styles.InputField]}
                    // placeholder={this.state.selectedOrder.decTotalQty}
                    value={'' + this.state.requisition_quantity}
                    onChangeText={(value) => this.changeRequestQuantity(value)}
                    keyboardType={'numeric'}
                  />
                </View>
                <View style={{flexBasis: '20%'}}>
                  <TouchableOpacity onPress={this.setOrderItem}>
                    <Text style={[styles.styleButtionOne]}>
                      {' '}
                      <Icon name="plus" /> Add{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={[styles.orderBox]}>
              {this.state.selectedOrderList.length > 0 && (
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.inputLebel]}> Requisition No.</Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.inputLebel]}> Request Quantity </Text>
                  </View>
                </View>
              )}

              {this.state.selectedOrderList.map((item, index) => (
                <View style={{flex: 1, flexDirection: 'row'}} key={index}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.inputOutput]}>
                      {item.strSalesOrderCode}
                    </Text>
                  </View>
                  <View style={{flexBasis: '40%'}}>
                    <Text style={[styles.inputOutput]}> {item.decQty} </Text>
                  </View>
                  <View style={{flexBasis: '10%'}}>
                    <TouchableOpacity
                      style={{textAlign: 'center', paddingVertical: 10}}
                      onPress={() => this.deleteItem(item)}>
                      <Icon color={'#EC5757'} size={26} name="close" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              <View style={[styles.bags]}>
                <Text style={[styles.totalQun]}>
                  {' '}
                  Total Quantity{' '}
                  <Text style={{fontWeight: 'bold'}}>
                    {this.state.totalQuantity} bags
                  </Text>
                </Text>
              </View>

              <View style={{marginVertical: 70}}>
                {!this.state.isLoading && (
                  <TouchableOpacity onPress={this.submitDeliveryOrder}>
                    <Text style={[styles.buttonStyle]}> Submit </Text>
                  </TouchableOpacity>
                )}

                {this.state.isLoading && (
                  <Text style={[styles.buttonStyle]}> Submiting ..... </Text>
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
