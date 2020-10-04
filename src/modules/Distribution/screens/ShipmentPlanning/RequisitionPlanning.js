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
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import icon from '../../images/Icons.png';
import DateTimePicker from 'react-native-modal-datetime-picker';
// import { Form, TextValidator } from "react-native-validator-form";
import {getRequisitionPlanningData} from './ShipmentServices';
import {FlatList} from 'react-native-gesture-handler';
export default class RequisitionPlanning extends Component {
  state = {
    isDateTimePickerVisible: false,
    isTimePickerVisible: false,

    isEndDateTimePickerVisible: false,
    isEndTimePickerVisible: false,

    priority: '',
    billsubmitbyprovider: [],
    startDate: '',
    endDate: '',
  };
  componentDidMount() {
    this.setState({
      startDate: this.currentDate(),
      endDate: this.currentDate(),
    });
    this.initializeList();
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
    this.setState({startDate: created_at, isDateTimePickerVisible: false});
  };
  handleEndDatePicked = (date) => {
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let created_at = year + '-' + month + '-' + dateNow;
    created_at = created_at.trim();
    this.setState({endDate: created_at, isEndDateTimePickerVisible: false});
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
    let billsubmitbyprovider = await getRequisitionPlanningData(
      fromdate,
      todate,
    );
    this.setState({
      billsubmitbyprovider: billsubmitbyprovider,
    });
  };

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.selectBox]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.headTitle]}>
                Requisition Planning Report
              </Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  flexBasis: '48%',
                  borderBottomColor: '#D6D6D6',
                  borderBottomWidth: 1,
                  marginRight: 10,
                }}>
                <Text style={[styles.pikcerTitle]}> From </Text>
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
                <Text style={[styles.pikcerTitle]}> To </Text>
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

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
                paddingVertical: 25,
              }}>
              <TouchableOpacity onPress={this.onShowBill}>
                <Text style={styles.buttonStyle}>Show Report</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={this.state.billsubmitbyprovider}
              renderItem={({item, index, separators}) => (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingVertical: 20,
                    borderBottomColor: '#D6D6D6',
                    borderBottomWidth: 1,
                  }}>
                  <View style={{flexBasis: 60}}>
                    <Image source={icon} style={[styles.iconStyle]} />
                  </View>

                  {/* .format('dd MM') */}
                  <View style={{flexBasis: '60%'}}>
                    <Text style={[styles.shipmentNo]}>
                      SCode:{item.strSalesOrderCode}
                    </Text>
                    <Text style={[styles.shipDate]}>Name:{item.strName} </Text>
                    <Text style={[styles.shipDate]}>
                      R-time:{item.RemaingTime}{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '30%'}}>
                    <Text style={[styles.shipmentNo]}> Total Quantity</Text>
                    <Text style={[styles.amount]}> {item.decTotalQty} </Text>
                  </View>
                </TouchableOpacity>
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
    fontWeight: '700',
  },
  shipDate: {
    fontSize: RFPercentage(2.5),
    color: '#272727',
    fontWeight: 'bold',
  },
  amount: {
    fontSize: RFPercentage(2.5),
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#2C57BB',
    borderRadius: 10,
    marginRight: 20,
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
