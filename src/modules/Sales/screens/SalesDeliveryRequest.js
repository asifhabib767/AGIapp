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

import {SalesOrderValidation} from '../../Master/Util/Validation';
import {
  getVehicleProviderData,
  getOrderData,
  getVehicleCapacityData,
  postDeliveryRequest,
} from '../service/sales/DeliveryRequestService';
import {getUnit, getUserId} from '../service/auth/AuthService';
import * as DateClass from '../../Master/Util/DateConfigure';
import GlobalStyles from './../../Master/styles/GlobalStyles';
import IAppsInput from './../../Master/components/input/IAppsInput';

export default class salesDeliveryRequest extends Component {
  state = {
    vehicleProvider: '',
    vehicleType: '',
    orderNo: '',

    vehicleProviderData: [],
    vehicleTypeData: [],
    vehicleCapacityData: [],
    orderListData: [],
    initialOrderListData: [],

    confirmData: {
      intShipmentRequestID: 0,
      dteRequestDateTime: DateClass.getFormattedCurrentDate(),
      intInsertBy: 0,
      strVehicleProviderType: '',
      strVehicleType: 'Open',
      intUnitId: 4,
      strLastDestination: 'N/A',
      strVehicleCapacity: '',
      ysnScheduleId: false,
    },

    refreshing: false,
    isDateTimePickerVisible: false,

    selectedOrder: {},
    requisition_quantity: '0',
    selectedOrderList: [],
    requestOrderData: [],
    totalQuantity: '0',
    isLoading: false,
  };

  componentDidMount = () => {
    this.initializeData();
  };

  onRefresh() {
    this.setState({refreshing: true});
    this.initializeData().then(() => {
      this.setState({refreshing: false});
    });
  }

  initializeData = async () => {
    this.setState({
      vehicleProviderData: await getVehicleProviderData(),
      vehicleCapacityData: await getVehicleCapacityData(),
      orderListData: await getOrderData(),
      initialOrderListData: await getOrderData(),
    });
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

  changeVehicleProviderType = (value) => {
    let confirmData = {...this.state.confirmData};
    confirmData.strVehicleProviderType = value;
    this.setState({confirmData});
  };

  changeVehicleType = (value) => {
    let confirmData = {...this.state.confirmData};
    confirmData.strVehicleType = value;
    this.setState({confirmData});
  };

  changeVehicleCapacity = (item) => {
    let confirmData = {...this.state.confirmData};
    confirmData.strVehicleCapacity = item;
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
    this.setState({requisition_quantity: value});
  };

  selectOrderItem = (item) => {
    if (
      typeof item.numRestPieces !== 'undefined' &&
      item.numRestPieces !== null &&
      typeof item !== 'string'
    ) {
      this.setState({
        selectedOrder: item,
        requisition_quantity: item.numRestPieces.toString(),
      });
    }
  };

  setOrderItem = async () => {
    if (this.state.selectedOrder.intId == null) {
      Alert.alert('Error', 'Please select an order !');
      return false;
    }

    if (this.state.requisition_quantity < 1) {
      Alert.alert('Error', 'Please add minimum One quantity !');
      return false;
    }

    let selectedOrderList = this.state.selectedOrderList;
    let newOrderItem = this.state.selectedOrder;

    let orderItem = {
      intRequestId: 0,
      intSalesOrderId: newOrderItem.intId,
      // "strSalesOrderCode": `#${newOrderItem.DONumber} [${newOrderItem.strDisPointName}][${newOrderItem.strAddress}]`,
      strSalesOrderCode: `#${newOrderItem.DONumber} [${newOrderItem.strDisPointName}]`,
      intCustomerId: newOrderItem.intCustomerId,
      intDistPointId: newOrderItem.intDisPointId,
      strDestinationAddress: newOrderItem.strAddress,
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
    });
  };

  deleteItem = (item) => {
    let selectedOrderList = this.state.selectedOrderList;
    let orderListData = this.state.orderListData;
    let initialOrderListData = this.state.initialOrderListData;

    let totalQuantity = parseInt(this.state.totalQuantity);

    let newOrderItem = {};
    let intId = item.intSalesOrderId;
    newOrderItem = initialOrderListData.find(
      (orderItem) => orderItem.intId === intId,
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

    try {
      let requestNo = await postDeliveryRequest(
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
        Alert.alert('Success', 'Request Created Successfully !');
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
              <Text style={[styles.headingOne]}>Confirming</Text>

              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
                <View style={[styles.picStyle]}>
                  <Text style={[styles.inputLebel]}> Vehicle Provider </Text>
                  <View style={GlobalStyles.pickerItem}>
                    <Picker
                      style={[styles.picStyle]}
                      selectedValue={
                        this.state.confirmData.strVehicleProviderType
                      }
                      onValueChange={(value) =>
                        this.changeVehicleProviderType(value)
                      }>
                      {this.state.vehicleProviderData.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.strText}
                          value={item.strText}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={[styles.picStyle]}>
                  <Text style={[styles.inputLebel]}> Vehicle Type </Text>
                  <View style={GlobalStyles.pickerItem}>
                    <Picker
                      selectedValue={this.state.confirmData.strVehicleType}
                      onValueChange={(value) => this.changeVehicleType(value)}>
                      <Picker.Item key={0} label="Open" value="Open" />
                      <Picker.Item key={1} label="Close" value="Close" />
                    </Picker>
                  </View>
                </View>
              </View>
              {/* end */}
              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
                <View style={[styles.picStyle]}>
                  <Text style={[styles.inputLebel]}> Vehicle Capacity </Text>
                  <View style={GlobalStyles.pickerItem}>
                    <Picker
                      style={[styles.picStyle]}
                      selectedValue={this.state.confirmData.strVehicleCapacity}
                      onValueChange={(value) =>
                        this.changeVehicleCapacity(value)
                      }>
                      {this.state.vehicleCapacityData.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.strText}
                          value={item.strText}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

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
                    <View style={GlobalStyles.pickerItem}>
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
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/* end */}

              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
                <View style={[styles.lastDestination]}>
                  <IAppsInput
                    label="Last Destination"
                    style={[styles.InputField]}
                    placeholder="Gabtoli, Dhaka"
                    value={this.state.confirmData.strLastDestination}
                    onChangeText={(value) => this.changeLastDestination(value)}
                  />
                </View>
              </View>
              {/* end */}
            </View>

            <View style={[styles.bgbox]}>
              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
                <View style={[styles.orderNo]}>
                  <Text style={[styles.inputLebel]}> Order No </Text>
                  <View style={GlobalStyles.pickerItem}>
                    <Picker
                      style={styles.picStyle}
                      selectedValue={this.state.selectedOrder}
                      onValueChange={(item) => this.selectOrderItem(item)}>
                      <Picker.Item label="Please Select #DO" value="" />
                      {this.state.orderListData.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={`#${item.DONumber} (${item.intCustomerId}) [${item.strName}] [${item.strAddress}]`}
                          value={item}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
              {/* end */}

              <View
                style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
                <View style={{flexBasis: '35%', marginRight: 5, marginTop: 5}}>
                  <Text style={[styles.inputLebel]}> Order Quantity </Text>
                  <Text style={[styles.inputOutput, {marginLeft: 10}]}>
                    {this.state.selectedOrder.numRestPieces
                      ? this.state.selectedOrder.numRestPieces
                      : '0'}
                  </Text>
                </View>
                <View style={{flexBasis: '40%', marginRight: 5}}>
                  <IAppsInput
                    label="Request Quantity"
                    style={[styles.InputField]}
                    // placeholder={this.state.selectedOrder.numRestPieces}
                    value={this.state.requisition_quantity}
                    onChangeText={(value) => this.changeRequestQuantity(value)}
                    keyboardType={'numeric'}
                  />
                </View>
                <View style={{flexBasis: '20%', marginTop: 10}}>
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
                    <Text style={[styles.inputLebel]}> Order No.</Text>
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

              <View style={{marginVertical: 50}}>
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
