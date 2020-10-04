import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import {salesPlanService} from './../service/sales/SalesPlanService';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-community/picker';
import SalseList from './SalesList';
import {getFormattedCurrentDate} from '../../Master/Util/DateConfigure';
import {
  getDeliveryRequstDo,
  getCompleteReqList,
} from '../service/sales/DeliveryRequisitionService';

export default class CompleteReq extends Component {
  state = {
    salesPlan: [],
    DoList: [],
    isDateTimePickerVisible: false,
    isEndDateTimePickerVisible: false,
    fromDate: '',
    endDate: '',
  };

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
  handleDatePicked = (date) => {
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let fromDate = year + '-' + month + '-' + dateNow;
    this.setState({fromDate});
    this.hideDateTimePicker();
  };
  EndhandleDatePicked = (date) => {
    // let hours = date.getHours();
    // let miniutes = date.getMinutes();
    // let endDate = hours + ':' + miniutes;
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let endDate = year + '-' + month + '-' + dateNow;
    this.setState({endDate});
    this.EndhideDateTimePicker();
  };

  async componentDidMount() {
    // const salesPlan = salesPlanService();
    // this.setState({salesPlan});
    this.previousMonth();
    // let DoList = await getCompleteReqList();
    // this.setState({DoList});
  }

  previousMonth = async () => {
    let fromDate = getFormattedCurrentDate();
    var d = new Date();
    var mm = d.getMonth() - 1;
    var dd = d.getDate();
    var yy = d.getFullYear();
    var myDateString = yy + '-' + mm + '-' + dd;
    let DoList = await getCompleteReqList(myDateString, fromDate);
    this.setState({DoList});
  };

  showReport = async () => {
    let fromDate = this.state.fromDate;
    let endDate = this.state.endDate;
    let DoList = await getCompleteReqList(fromDate, endDate);
    this.setState({DoList});
  };

  render() {
    return (
      <KeyboardAvoidingView style={{backgroundColor: '#fff', marginBottom: 80}}>
        <ScrollView style={{height: '100%', backgroundColor: '#fff'}}>
          <SafeAreaView style={[styles.container]}>
            <View style={[styles.bgbox]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingBottom: 10,
                  paddingLeft: 15,
                }}>
                <View>
                  <Text style={[styles.headingOne]}>Scheduled Requistion</Text>
                </View>
              </View>
              <View style={styles.datePickerDesign}>
                <View style={[styles.selectBoxStyle]}>
                  <TouchableOpacity onPress={this.showDateTimePicker}>
                    <Text style={[styles.shopTitle]}> FromDate </Text>
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
                  </TouchableOpacity>
                </View>
                <View style={[styles.selectBoxStyle]}>
                  <TouchableOpacity onPress={this.showEndDateTimePicker}>
                    <Text style={[styles.shopTitle]}> ToDate </Text>
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
                      mode={'date'}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={this.showReport}>
                    <Text style={[styles.buttonStyle]}> Show </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {this.state.DoList.length !== 0 && (
                <View>
                  {/* <View style={[styles.tableHeading]}>
                    <View style={{flexBasis: '25%'}}>
                      <Text style={[styles.tableTitle]}> Order No</Text>
                    </View>
                    <View style={{flexBasis: '25%'}}>
                      <Text style={[styles.tableTitle]}> Quantity </Text>
                    </View>
                    <View style={{flexBasis: '28%'}}>
                      <Text style={[styles.tableTitle]}>Party Name</Text>
                    </View>
                    <View style={{flexBasis: '28%'}}>
                      <Text style={[styles.tableTitle]}>Remaining Time</Text>
                    </View>
                  </View> */}

                  <ScrollView>
                    <View style={{borderColor: '#ccc', borderWidth: 1}}>
                      <FlatList
                        data={this.state.DoList}
                        renderItem={({item}) => (
                          // <View style={[styles.tableField]}>
                          //   <View style={{flexBasis: '25%'}}>
                          //     <Text style={[styles.shopTitle]}>
                          //       {' '}
                          //       {item.intShipmentId}{' '}
                          //     </Text>
                          //   </View>
                          //   <View style={[{flexBasis: '25%'}]}>
                          //     <Text style={[styles.shopTitle]}>
                          //      c
                          //     </Text>
                          //   </View>
                          //   <View style={{flexBasis: '28%'}}>
                          //     <Text style={[styles.shopTitle]}>
                          //       {' '}
                          //       {item.strName}{' '}
                          //     </Text>
                          //   </View>
                          //   <View style={{flexBasis: '18%'}}>
                          //     <Text style={[styles.shopTitle]}>
                          //       {' '}
                          //       {item.RemaingTime}{' '}
                          //     </Text>
                          //   </View>
                          //   <View style={{flexBasis: '3%', paddingTop: 5}}>
                          //     <Icon name="chevron-right" color="#585CDB" />
                          //   </View>
                          // </View>
                          <TouchableOpacity>
                            <View style={[styles.distributorDetails]}>
                              <View style={{flexBasis: '65%'}}>
                                <Text style={{fontWeight: 'bold'}}>
                                  {' '}
                                  DO #{item.strSalesOrderCode}
                                </Text>
                                <Text
                                  style={{marginLeft: 8, fontWeight: 'bold'}}>
                                  Name: {item.strName} [{item.shopid}]{' '}
                                </Text>
                                <Text style={{marginLeft: 8}}>
                                  Delivery Address: {item.strAddress}
                                </Text>
                                <Text style={{marginLeft: 8}}>
                                  Phone: {item.phone}
                                </Text>
                                <Text style={{marginLeft: 8}}>DO Date: </Text>
                              </View>
                              <View
                                style={{
                                  flexBasis: '35%',
                                  alignItems: 'center',
                                  fontWeight: 'bold',
                                }}>
                                {/* <Text style={[styles.outstanding]}> {item.restqnt} </Text>*/}
                                <Text style={[styles.distributerName]}>
                                  {' '}
                                  Shipment No #{item.intShipmentId}{' '}
                                </Text>
                                <Text style={[styles.distributerName]}>
                                  {' '}
                                  Quantity #{item.decTotalQty}{' '}
                                </Text>
                                <Text style={[styles.distributerName]}>
                                  {' '}
                                  INsert Time #{item.dteInsertTime}
                                </Text>
                                <Text style={[styles.distributerName]}>
                                  {' '}
                                  Remaining Time #{item.RemaingTime}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                      />
                    </View>
                  </ScrollView>
                </View>
              )}
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  distributorDetails: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },

  bgbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    paddingVertical: 5,
    // shadowColor: 'rgba(0, 0, 0, 5)',
    // shadowOpacity: 0.5,
    // elevation: 8,
    // shadowRadius: 10 ,
    // shadowOffset : { width: 23, height: 113},
  },

  tableHeading: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 15,
  },

  tableTitle: {
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
  },

  tableField: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 0.7,
    borderBottomColor: '#ccc',
  },

  headingOne: {
    fontSize: 19,
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingTop: 5,
  },

  styleButtionOne: {
    backgroundColor: '#08C48F',
    color: '#fff',
    fontSize: RFPercentage(2.2),
    width: '40%',
    textAlign: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 5,
  },
  styleButtionTwo: {
    backgroundColor: '#2E3192',
    color: '#fff',
    fontSize: RFPercentage(2),
    width: '65%',
    textAlign: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 5,
  },

  shopTitle: {
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    fontSize: RFPercentage(2.5),
    marginLeft: -5,
  },
  shopId: {
    fontFamily: 'Poppins-bold',
    fontSize: RFPercentage(2),
    color: '#707070',
  },
  shopTitleRed: {
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    fontSize: RFPercentage(2.5),
    marginLeft: -5,
    color: '#D71920',
  },
  selectBoxStyle: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
    flexBasis: '40%',
  },
  datePickerDesign: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    backgroundColor: '#4E51C9',
    color: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 3, height: 1},
    fontSize: RFPercentage(2),
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
  titleborder: {
    borderRightColor: '#000',
    borderColor: 'white',
  },
});
