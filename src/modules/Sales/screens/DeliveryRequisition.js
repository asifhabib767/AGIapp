import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-community/picker';
import {Actions} from 'react-native-router-flux';
import {leaveValidation} from '../../Master/Util/Validation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getVehicleCapacity,
  PostDeliveryRequistion,
  getDeliveryRequstDo,
  getDataForBagType,
  deliverRequistionValidation,
} from '../service/sales/DeliveryRequisitionService';
import {
  getShippingPoints,
  getShippingPointsForSalesOrder,
} from '../service/sales/ShippingPoint';
import GlobalStyles from '../../Master/styles/GlobalStyles';
import IAppsInput from './../../Master/components/input/IAppsInput';
import {checkObjectInArray} from '../../Master/Util/Helper';

export default class DeliveryRequisition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
      vehileCapacity: [],
      DoList: [],
      intShipPointId: null,
      shipping_points: [],
      addtype: '',
      lastDestination: '',
      PendingQty: '',
      vehicleCategory: '',
      DoItem: '',
      modType: '',
      vehicleType: '',
      bagTypes: [],
      selectedBagTypes: {},
      all_delivery_points: [],
      fromDate: '',
      endDate: '',
      reason: '',
      address: '',
      phoneno: '',
      isLoading: false,
      destinationAddress: '',
      strName: '',
      DOQnt: '',
      multipleRequisition: [],
    };
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };
  showEndDateTimePicker = () => {
    this.setState({isEndDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };
  EndhideDateTimePicker = () => {
    this.setState({isEndDateTimePickerVisible: false});
  };

  //   handleDatePicked = date => {
  //     console.log("A date has been picked: ", date);
  //     this.hideDateTimePicker();
  //   };
  handleDatePicked = (date) => {
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let fromDate = year + '-' + month + '-' + dateNow;
    this.setState({fromDate});
    this.hideDateTimePicker();
  };
  EndhandleDatePicked = (date) => {
    let hours = date.getHours();
    let miniutes = date.getMinutes();
    let endDate = hours + ':' + miniutes;
    this.setState({endDate});
    this.EndhideDateTimePicker();
  };

  async componentDidMount() {
    let vehileCapacity = await getVehicleCapacity();
    let bagTypes = await getDataForBagType();
    let DoList = await getDeliveryRequstDo();
    let shipping_points = await getShippingPointsForSalesOrder();
    this.setState({
      bagTypes: bagTypes.data,
      vehileCapacity,
      DoList,
      shipping_points,
    });

    // Check Websocket live data
  }

  submit = async () => {
    if (this.state.multipleRequisition.length > 0) {
      this.setState({isLoading: true});

      const {
        doNO,
        PendingQty,
        fromDate,
        endDate,
        modType,
        vehicleType,
        vehicleCategory,
        lastDestination,
        destinationAddress,
        DoItem,
        multipleRequisition,
        selectedBagTypes,
      } = this.state;

      // let validation = leaveValidation(
      //   doNO,
      //   fromDate,
      //   endDate,
      //   modType,
      //   vehicleType,
      //   vehicleCategory,
      // );

      // if (validation == false) {
      //   this.setState({isLoading: false});
      // }

      let deliveryCreate = await PostDeliveryRequistion(
        doNO,
        PendingQty,
        fromDate,
        endDate,
        modType,
        vehicleType,
        vehicleCategory,
        lastDestination,
        destinationAddress,
        DoItem,
        multipleRequisition,
        selectedBagTypes,
      );

      if (deliveryCreate.status) {
        // this.setState({isLoading: true});

        Alert.alert(
          'Delivery Requisition Created',
          'Requisition No - ' + deliveryCreate.data,
        );
        this.props.navigation.navigate('deliveryRequisitionList');
        // //Actions.hrLeave();
        this.setState({isLoading: false});
      } else {
        Alert.alert('Error', 'Please Try again,Some thing wrong');
        this.setState({isLoading: false});
      }
    } else {
      Alert.alert('Error', 'Plese add Button Click to create store requistion');
    }

    //console.log('leave appsss',leaveCreate);
    //Alert.alert(leaveCreate);
  };
  changeDeliveryDo = (value) => {
    console.log('value is', value);
    let dolist = this.state.DoList;
    var item = dolist.find((item) => item.intid === value);
    console.log('item name', item);

    this.setState({
      doNO: value,
      PendingQty: String(item.PendingQty),
      DoItem: item,
      intShipPointId: item.intShipPointId,
      modType: item.logisticby,
      lastDestination: item.delvaddres,
      destinationAddress: item.delvaddres,
      strName: item.strName,
      DOQnt: String(item.DOQnt),
    });
  };

  addMultipleRequisition = async () => {
    let validationCheck = await deliverRequistionValidation(this.state);

    if (validationCheck) {
      let itemValue = this.state.DoItem;
      let multipleData = this.state.multipleRequisition;
      let item = {
        intSalesOrderId: itemValue.intid,
        strSalesOrderCode: itemValue.strCode,
        intReqDetailsId: 1,
        intCustomerId: itemValue.intcustomerid,
        intDistPointId: itemValue.intshopid,
        strDestinationAddress: itemValue.delvaddres,
        decQty: parseInt(this.state.PendingQty),
        intBagType: parseInt(this.state.selectedBagTypes.intID),
        strBagType: this.state.selectedBagTypes.strBagType,
        strProductName: itemValue.strProductName,
      };

      if (
        checkObjectInArray(
          item,
          this.state.multipleRequisition,
          'intSalesOrderId',
        )
      ) {
        Alert.alert('Error', 'Please select another Sales order');
        return false;
      }
      // this.state.multipleRequisition.push(item);
      multipleData.push(item);
      this.setState({multipleRequisition: multipleData});
    }

    // if (this.state.multipleRequisition.length > 0) {
    //   cloneObj.quantity = '0';
    //   cloneObj.itemName = '';
    //   cloneObj.itemTypeSelected = {};
    //   cloneObj.itemTypeName = '';
    //   cloneObj.itemSelected = {};
    //   cloneObj.departmentSelected = {};
    //   cloneObj.deptName = '';
    //   setState(cloneObj);
    // }
  };

  deleteItem = (item) => {
    let multipleRequisition = this.state.multipleRequisition;
    try {
      for (var i = 0; i < multipleRequisition.length; i++) {
        if (multipleRequisition[i] == item) {
          multipleRequisition.splice(i, 1);
          this.setState({multipleRequisition});
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  shippingPointPicker = (itemValue) => {
    this.setState({intShipPointId: itemValue});
  };

  render() {
    console.log('this.state', this.state);
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.AccountDetailsArea]}>
            <View style={{marginBottom: 20}}>
              <Text style={[styles.pageTitle]}> Delivery Requisition </Text>
            </View>
            <View>
              <Text style={[styles.inputLebel]}> Sales Order No </Text>
              <View style={GlobalStyles.pickerItem}>
                <Picker
                  selectedValue={this.state.doNO}
                  style={[styles.Prority]}
                  onValueChange={(value) => this.changeDeliveryDo(value)}>
                  {this.state.DoList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.strCode}
                      value={item.intid}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={[styles.selectBoxStyle]}>
              <Text style={[styles.inputLebel]}> Shipping Point </Text>
              <View style={GlobalStyles.pickerItem}>
                <Picker
                  selectedValue={this.state.intShipPointId}
                  onValueChange={(itemValue, itemIndex) =>
                    // this.setState({intShipPointId: itemValue})
                    this.shippingPointPicker(itemValue)
                  }>
                  <Picker.Item key="-1" label="Select" value="" />
                  {this.state.shipping_points.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.strName}
                      value={item.intId}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{paddingTop: 15}}>
              <IAppsInput
                label="Pending Quantity"
                style={[styles.InputField]}
                value={this.state.DOQnt}
                editable={false}
                isDisabled
              />
            </View>

            <View style={{paddingTop: 15}}>
              <IAppsInput
                label="Requisition Quantity"
                style={[styles.InputField]}
                placeholder="Type Quatity"
                value={this.state.PendingQty}
                keyboardType={'numeric'}
                onChangeText={(value) => {
                  this.setState({PendingQty: value});
                }}
              />
            </View>
            <View style={styles.divWidth}>
              <View style={{width: '50%'}}>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                  <Text style={[styles.inputLebel]}> Delivery Date </Text>
                  <View style={GlobalStyles.pickerItem}>
                    <Text style={[styles.inputLebel]}>
                      {this.state.fromDate}
                    </Text>
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
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{width: '50%'}}>
                <TouchableOpacity onPress={this.showEndDateTimePicker}>
                  <Text style={[styles.inputLebel]}> Time </Text>
                  <View style={GlobalStyles.pickerItem}>
                    <Text style={[styles.inputLebel]}>
                      {' '}
                      {this.state.endDate}{' '}
                    </Text>
                    <Text
                      title="Show DatePicker"
                      onPress={this.showEndDateTimePicker}
                    />
                    <DateTimePicker
                      isVisible={this.state.isEndDateTimePickerVisible}
                      onConfirm={this.EndhandleDatePicked}
                      onCancel={this.EndhideDateTimePicker}
                      datePickerModeAndroid={'spinner'}
                      mode={'time'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={[styles.inputLebel]}> Mode</Text>
              <View style={GlobalStyles.pickerItem}>
                <Picker
                  selectedValue={this.state.modType}
                  style={[styles.Prority]}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({modType: itemValue})
                  }>
                  <Picker.Item label="Customer" value="Customer" />
                  <Picker.Item label="Company" value="Company" />
                  <Picker.Item label="Supplier" value="Supplier" />
                </Picker>
              </View>
            </View>
            <View>
              <Text style={[styles.inputLebel]}> Vehicle Type</Text>
              <View style={GlobalStyles.pickerItem}>
                <Picker
                  selectedValue={this.state.vehicleType}
                  style={[styles.Prority]}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({vehicleType: itemValue})
                  }>
                  <Picker.Item label="select" value="-1" />
                  <Picker.Item label="Open" value="Open" />
                  <Picker.Item label="Cavard" value="Cavard" />
                </Picker>
              </View>
            </View>
            <View>
              <Text style={[styles.inputLebel]}> Bag types</Text>
              <View style={GlobalStyles.pickerItem}>
                <Picker
                  selectedValue={this.state.selectedBagTypes}
                  style={[styles.Prority]}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({selectedBagTypes: itemValue})
                  }>
                  {/* <Picker.Item label="select" value="-1" /> */}
                  {this.state.bagTypes.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.strBagType}
                      value={item}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View>
              <Text style={[styles.inputLebel]}> Category</Text>
              <View style={GlobalStyles.pickerItem}>
                <Picker
                  selectedValue={this.state.vehicleCategory}
                  style={[styles.Prority]}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({vehicleCategory: itemValue})
                  }>
                  <Picker.Item label="select" value="-1" />
                  {this.state.vehileCapacity.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.strType}
                      value={item.strType}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{paddingTop: 15}}>
              <IAppsInput
                label="Party Name"
                style={[styles.InputField]}
                placeholder="Party Name"
                value={this.state.strName}
                editable={false}
              />
            </View>
            <View style={{paddingTop: 15}}>
              <IAppsInput
                label="Last Destination"
                style={[styles.InputField]}
                value={this.state.lastDestination}
                isDisabled
                // onChangeText={(value) => {
                //   this.setState({lastDestination: value});
                // }}
              />
            </View>
            <View style={{paddingTop: 15}}>
              <IAppsInput
                label="Destination Address"
                style={[styles.InputField]}
                value={this.state.destinationAddress}
                isDisabled
                onChangeText={(value) => {
                  this.setState({destinationAddress: value});
                }}
              />
            </View>
          </View>
          <View style={styles.addSection}>
            <TouchableOpacity onPress={this.addMultipleRequisition}>
              <Text style={styles.addbutton}>
                <Icon name="plus" size={18} />
                Add
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 10}}>
            {this.state.multipleRequisition.length > 0 ? (
              <View style={styles.listItemSec}>
                {this.state.multipleRequisition &&
                  this.state.multipleRequisition.map((item, index) => (
                    <View style={styles.listItem}>
                      <View>
                        <Text>SL NO</Text>
                        <Text>{++index}</Text>
                      </View>
                      <View>
                        <Text>Product name</Text>
                        <Text>{item.strProductName}</Text>
                      </View>
                      <View>
                        <Text>Qty</Text>
                        <Text>{item.decQty}</Text>
                      </View>
                      <View>
                        <TouchableOpacity onPress={() => this.deleteItem(item)}>
                          <Text>Delete</Text>
                          <Icon name="trash" size={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
              </View>
            ) : null}
          </View>

          <View style={{marginBottom: 20}}>
            {!this.state.isLoading && (
              <TouchableOpacity onPress={this.submit}>
                <Text style={[styles.buttonStyle]}> Submit </Text>
              </TouchableOpacity>
            )}
            {this.state.isLoading && (
              <View>
                <Text style={styles.buttonStyle}>Submiting ...</Text>
              </View>
            )}
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
    width: '95%',
    margin: 8,
  },
  AccountDetailsArea: {
    backgroundColor: '#fff',
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 113},
  },

  pageTitle: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: '#005BD2',
  },

  creditDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  leaveTitle: {
    fontSize: RFPercentage(5),
    fontWeight: 'bold',
    color: '#005BD2',
    textAlign: 'center',
  },

  leaveSubTitle: {
    fontSize: RFPercentage(2.3),
    fontWeight: 'bold',
    color: '#231F20',
    textAlign: 'center',
  },

  inputLebel: {
    fontSize: 16,
    textAlign: 'left',
    color: '#232A2F',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  InputField: {
    height: 40,
    color: '#000',
    fontSize: 20,
    fontSize: 16,
    borderBottomColor: '#DADADA',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  selectBoxStyle: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  buttonStyle: {
    backgroundColor: '#4E51C9',
    width: '95%',
    color: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 3, height: 113},
    fontSize: RFPercentage(3),
    lineHeight: 40,
    fontWeight: '700',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 20,
  },
  borderColors: {
    borderBottomColor: '#DADADA',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    marginTop: -15,
  },
  divWidth: {
    flex: 1,
    flexDirection: 'row',
  },
  addSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  addbutton: {
    padding: 10,
    backgroundColor: '#3366FF',
    marginRight: 10,
    width: 100,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  listItemSec: {
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
