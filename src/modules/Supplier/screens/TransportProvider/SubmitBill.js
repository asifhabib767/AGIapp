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
  Alert,
  CheckBox,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CustomSearchbar from '../../../Master/components/CustomSearchBar';
import {Picker} from '@react-native-community/picker';
import {Actions} from 'react-native-router-flux';
import {generateStringDateFromDate} from '../../../Master/Util/DateConfigure';
import {
  postTransportProviderBill,
  getRequestAcceptedByTransportProvider,
} from '../../actions/TransportProvider/ShipmentRequestAction';
import {Form, TextValidator} from 'react-native-validator-form';
import {getUnitId, getUserId} from '../../../User/util/AuthData';
import * as DateClass from '../../../Master/Util/DateConfigure';
import {FlatList} from 'react-native-gesture-handler';

export default class SubmitBill extends Component {
  state = {
    isDateTimePickerVisible: false,
    isTimePickerVisible: false,

    isEndDateTimePickerVisible: false,
    isEndTimePickerVisible: false,

    priority: '',
    requestacceptedbyvendor: [],
    requestacceptedbyvendorWithChecked: [],
    startDate: '',
    endDate: '',
    totalQuantity: 0,
    intShippingID: 0,
    decQty: 0,
    monTotalLogisticCharge: '0',
    shipmentData: {},

    confirmData: {
      intPart: 1,
      intUnitId: 0,
      intProviderId: 0,
      fromdate: DateClass.getFormattedCurrentDate(),
      todate: DateClass.getFormattedCurrentDate(),
      strRemarks: '',
    },

    selectedOrder: {},
    requisition_quantity: '0',
    selectedOrderList: [],
    requestOrderData: [],

    isLoading: false,
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
    let fromdate = handleDatePicked;
    let todate = handleDatePicked;
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
    // this.setState({startDate: created_at});
    this.setState({startDate: created_at, isDateTimePickerVisible: false});
    this.hideTimePicker();
    this.hideDateTimePicker();
  };
  handleEndDatePicked = (date) => {
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let created_at = year + '-' + month + '-' + dateNow;
    created_at = created_at.trim();
    // this.setState({endDate: created_at});
    this.setState({endDate: created_at, isEndDateTimePickerVisible: false});
    this.hideEndTimePicker();
    this.hideEndDateTimePicker();
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

  onShowBill = async () => {
    let fromdate = this.state.startDate;
    let todate = this.state.endDate;
    const requestacceptedbyvendor = await getRequestAcceptedByTransportProvider(
      fromdate,
      todate,
    );

    let totalQuantity = 0;

    requestacceptedbyvendor.forEach((item, index) => {
      totalQuantity += item.decQty;
    });

    let requestacceptedbyvendorWithChecked = [];

    for (let i = 0; i < requestacceptedbyvendor.length; ++i) {
      const item = {...requestacceptedbyvendor[i], checked: true};
      requestacceptedbyvendorWithChecked.push(item);
    }
    this.setState(
      {
        requestacceptedbyvendor: requestacceptedbyvendor,
        requestacceptedbyvendorWithChecked: [
          ...requestacceptedbyvendorWithChecked,
        ],
        totalQuantity: totalQuantity,
      },
      () => {},
    );
  };

  submit = async () => {
    let confirmData = {...this.state.confirmData};
    confirmData.intPart = 1;
    this.setState({confirmData});

    let intUnit = await getUnitId();
    confirmData = {...this.state.confirmData, intUnitId: intUnit};
    //confirmData.intUnitId = intUnit

    this.setState({confirmData});

    let intProvider = await getUserId();
    confirmData = {...this.state.confirmData};
    confirmData.intProviderId = intProvider;
    this.setState({confirmData});

    let fromdate = this.state.startDate;
    confirmData = {...this.state.confirmData};
    confirmData.fromdate = fromdate;
    this.setState({confirmData});

    let todate = this.state.endDate;
    confirmData = {...this.state.confirmData};
    confirmData.todate = todate;
    this.setState({confirmData});

    let strRemark = 'na';
    confirmData = {...this.state.confirmData};
    confirmData.strRemarks = strRemark;
    this.setState({confirmData});

    let productDataList = [];

    for (let i = 0; i < this.state.requestacceptedbyvendor.length; ++i) {
      const entity = this.state.requestacceptedbyvendor[i];

      const productData = {
        intShipmentId: entity.intShippingID,
        decBillQnt: entity.decQty,
        monBillAmount: entity.monTotalLogisticCharge.toString(),
      };
      productDataList.push(productData);
    }

    this.setState({productDataList});
    let ShipementResponse = await postTransportProviderBill(
      this.state.confirmData,
      this.state.productDataList,
    );

    if (ShipementResponse != null || ShipementResponse != 'undefined') {
      if (ShipementResponse > 0) {
        Alert.alert('Submit Successfull');
        this.props.navigation.navigate('supplier');
      } else if (ShipementResponse < 1) {
        Alert.alert('Faill...Already Exist');
        this.props.navigation.navigate('supplier');
      }
    }
  };

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.selectBox]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.headTitle]}>বিল টপ শীট</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  flexBasis: '48%',
                  borderBottomColor: '#D6D6D6',
                  borderBottomWidth: 1,
                  marginRight: 10,
                }}>
                <Text style={[styles.pikcerTitle]}> থেকে </Text>
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
                <Text style={[styles.pikcerTitle]}> পর্যন্ত </Text>
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

            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 25}}>
              <View style={{flexBasis: '65%', marginRight: 15}}>
                <CustomSearchbar placeHolderText="আউটলেট থেকে অনুসন্ধান করুন" />
              </View>
              <View style={[styles.selects]}>
                <Picker
                  selectedValue={this.state.billcatg}
                  onValueChange={(itemValue, itemIndex) => {
                    let itemlabel = 'Select';
                    if (itemValue === '2') {
                      itemlabel = ' Pending Bill Submit';
                    } else if (itemValue === '3') {
                      itemlabel = 'Completed Bill Submit ';
                    }
                    this.setState({billcatg: itemValue, billlabel: itemlabel});
                  }}>
                  <Picker.Item label="Select" value="0" />
                  <Picker.Item label="Pending Bill Submit " value="2" />
                  <Picker.Item label="Completed Bill Submit " value="3" />
                </Picker>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              paddingVertical: 25,
            }}>
            <TouchableOpacity onPress={this.onShowBill}>
              <Text style={styles.buttonStyle}>দেখানো</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.selectBox]}>
            <FlatList
              data={this.state.requestacceptedbyvendor}
              keyExtractor={(item) => item.strCode}
              renderItem={({item, index, separators}) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingVertical: 20,
                    borderBottomColor: '#D6D6D6',
                    borderBottomWidth: 1,
                  }}
                  key={index}>
                  <View style={{flexBasis: '40%'}}>
                    <Text style={[styles.shipmentNo]}>
                      {' '}
                      {item.strcustomername}{' '}
                    </Text>
                    <Text style={[styles.shipDate]}>
                      {' '}
                      {generateStringDateFromDate(item.dteAcceptedTime)}{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '20%'}}>
                    <Text style={[styles.shipmentNo]}> পরিমান </Text>
                    <Text style={[styles.shipDate]}> {item.decQty} </Text>
                  </View>
                  <View style={{flexBasis: '30%'}}>
                    <Text style={[styles.shipmentNo]}>মোট পরিমাণ </Text>
                    <Text style={[styles.shipDate]}>
                      {' '}
                      {item.monTotalLogisticCharge}{' '}
                    </Text>
                  </View>
                </View>
              )}
            />
            <View>
              <View style={{backgroundColor: '#4346B6'}}>
                <View style={{flexBasis: '20%'}}>
                  <Text style={[styles.grandTotal]}>
                    {' '}
                    সর্বমোট {this.state.totalQuantity}{' '}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{marginVertical: 15}}>
              <TouchableOpacity onPress={this.submit}>
                <Text style={styles.buttonStyle}>সাবমিট</Text>
              </TouchableOpacity>
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
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  grandTotalValue: {
    fontSize: RFPercentage(3.5),
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: '#1544B3',
    color: '#fff',
    fontSize: RFPercentage(3),
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 35,
    textTransform: 'uppercase',
    borderRadius: 10,
  },
});
