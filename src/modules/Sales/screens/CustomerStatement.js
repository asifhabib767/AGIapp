import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Linking,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  getChallanList,
  GetCustomerStatementForAPI,
} from '../service/sales/ChallanService';
import AsyncStorage from '@react-native-community/async-storage';

import * as DateClass from '../../Master/Util/DateConfigure';

export default class CustomerStatement extends Component {
  state = {
    sortBy: '1',
    challanList: [],
    isDateTimePickerVisible: false,
    isEndDateTimePickerVisible: false,
    dteDate: '',
    dteFromdate: '',
    dteTodate: '',
    refreshing: false,
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
    let dteFromdate = year + '-' + month + '-' + dateNow;
    this.setState({dteFromdate});
    this.hideDateTimePicker();
  };
  EndhandleDatePicked = (date) => {
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let dteTodate = year + '-' + month + '-' + dateNow;
    this.setState({dteTodate});
    this.EndhideDateTimePicker();
  };

  async componentDidMount() {
    this.setState({
      dteFromdate: DateClass.currentMonth(),
      dteTodate: DateClass.currentdate(),
    });

    // let challanList = await getChallanList(DateClass.currentMonth(), DateClass.currentdate());

    // this.setState({ challanList});
    this.initializeData();
  }

  initializeData = async () => {
    let challanListData = await GetCustomerStatementForAPI(
      DateClass.currentMonth(),
      DateClass.currentdate(),
    );

    this.setState({challanList: challanListData.data});
  };

  onRefresh() {
    this.setState({refreshing: true});
    this.initializeData().then(() => {
      this.setState({refreshing: false});
    });
  }

  dateFilter = async () => {
    let challanListData = await GetCustomerStatementForAPI(
      this.state.dteFromdate,
      this.state.dteTodate,
    );
    this.setState({challanList: challanListData.data});
  };

  render() {
    console.log('customer Statement', this.state.CustomerStatement);
    return (
      <KeyboardAvoidingView style={{backgroundColor: '#FFF'}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }>
          <SafeAreaView style={[styles.container]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={[styles.selectBoxStyle]}>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                  <Text style={[styles.inputLebel]}> Start Date </Text>
                  <Text style={[styles.inputLebel]}>
                    {this.state.dteFromdate}
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
                  <Text style={[styles.inputLebel]}> End Date </Text>
                  <Text style={[styles.inputLebel]}>
                    {' '}
                    {this.state.dteTodate}{' '}
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
              <TouchableOpacity
                style={styles.submitButton}
                onPress={this.dateFilter}>
                <View>
                  <Text style={styles.btnText}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.bgbox]}>
              <View>
                <Text
                  style={{
                    color: '#2E4798',
                    fontWeight: 'bold',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    fontSize: 18,
                  }}></Text>
              </View>

              <FlatList
                data={this.state.challanList}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                  // <TouchableOpacity onPress={()=>this.handleData(item)}>

                  <View style={[styles.distributorDetails]}>
                    <View style={{flexBasis: '65%'}}>
                      <Text style={[styles.distributerName]}>
                        {' '}
                        Chalan No #{item.strCode}{' '}
                      </Text>

                      <Text style={{marginLeft: 8, fontWeight: 'bold'}}>
                        Balance Type: {item.sprDescription}{' '}
                      </Text>
                      <Text style={{marginLeft: 8}}>
                        Cash Amount: {item.monCredit}
                      </Text>
                      <Text style={{marginLeft: 8}}>
                        Purchase: {item.monDebit}
                      </Text>
                      <Text style={{marginLeft: 8}}>
                        Date: {item.dteDate}
                        {/* {DateClass.generateStringDateFromDate(item.dteDate)} */}
                      </Text>
                    </View>
                    <View style={{flexBasis: '35%', justifyContent: 'center'}}>
                      {/* <Text style={[styles.distributerLocation]}>
                        Q: {item.numPieces}{' '}
                      </Text> */}
                      <Text style={styles.chalanValueText}>
                        ‎৳{item.RunningTotal}
                      </Text>
                    </View>
                  </View>
                )}
              />
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
    backgroundColor: '#f9f9f9',
  },

  datepicker: {
    flexBasis: '60%',
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 113},
    borderRadius: 10,
    marginTop: 13,
    marginBottom: 10,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#3850A2',
    width: '20%',
    height: '35%',
    marginVertical: 30,
    justifyContent: 'center',
    marginLeft: 10,
  },
  btnText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  selectBoxStyle: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 20,
    width: '30%',
    marginLeft: 10,
  },

  iconstyle: {
    position: 'absolute',
    marginLeft: 15,
    marginTop: 15,
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    paddingRight: 10,
  },
  inputLebel: {
    fontSize: 16,
    textAlign: 'center',
    color: '#232A2F',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  InputField: {
    fontSize: 20,
    borderRadius: 5,
    paddingLeft: 55,
  },

  bgbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    margin: 10,
    padding: 5,
    paddingTop: 15,
    paddingBottom: 100,
    // shadowColor: 'rgba(0, 0, 0, 5)',
    // shadowOpacity: 0.5,
    // elevation: 8,
    // shadowRadius: 10,
    // shadowOffset: {width: 23, height: 10},
  },

  distributorDetails: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
    textAlign: 'left',
  },

  chalanValueText: {
    textAlign: 'center',
    backgroundColor: '#2E4798',
    color: '#FAFAFA',
    fontSize: RFPercentage(3),
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
  },

  distributerName: {
    color: '#707070',
    fontSize: RFPercentage(2.5),
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  distributerLocation: {
    textAlign: 'center',
    color: '#000000',
    fontSize: RFPercentage(2.5),
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: 30,
  },

  outstanding: {
    color: '#707070',
    fontSize: RFPercentage(2.5),
    fontFamily: 'Poppins',
    marginTop: '15%',
  },

  distributorProgrss: {
    backgroundColor: '#E8A13A',
    width: '30%',
    height: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    borderRadius: 50,
    marginTop: 2,
    fontSize: RFPercentage(1.8),
    paddingTop: '1%',
    paddingBottom: '1%',
    marginLeft: 8,
  },
  distributorCompleted: {
    backgroundColor: '#28a745',
    width: '30%',
    height: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    borderRadius: 50,
    marginTop: 2,
    fontSize: RFPercentage(1.8),
    paddingTop: '1%',
    paddingBottom: '1%',
    marginLeft: 8,
  },
});
