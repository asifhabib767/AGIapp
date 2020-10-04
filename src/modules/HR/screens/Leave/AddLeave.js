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
import {
  getLeaveType,
  PostLeave,
  api_post_leave_create,
} from '../Leave/LeaveService';
import {Actions} from 'react-native-router-flux';
import {leaveValidation} from '../../Utils/Validation';
import {useIsFocused} from '@react-navigation/native';

export default class AddLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
      leaveType: [],
      addtype: '',
      fromDate: '',
      endDate: '',
      reason: '',
      address: '',
      phoneno: '',
      isLoading: false,
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
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let endDate = year + '-' + month + '-' + dateNow;
    this.setState({endDate});
    this.EndhideDateTimePicker();
  };

  async componentDidMount() {
    let leaveType = await getLeaveType();

    console.log(leaveType);
    this.setState({
      leaveType,
    });
  }

  submit = async () => {
    this.setState({isLoading: true});
    const {addtype, fromDate, endDate, reason, address} = this.state;

    let validation = leaveValidation(fromDate, endDate, reason, address);

    if (validation == false) {
      this.setState({isLoading: false});
    }

    let leaveCreate = await PostLeave(
      addtype,
      fromDate,
      endDate,
      reason,
      address,
    );

    if (leaveCreate) {
      this.setState({isLoading: true});
      Alert.alert('success', leaveCreate);
      this.props.navigation.navigate('leaveList');
      this.setState({isLoading: false});
    }

    //console.log('leave appsss',leaveCreate);
    //Alert.alert(leaveCreate);
  };
  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          {/* <View style={[styles.AccountDetailsArea]} >  
 
                                <View style={[styles.creditDetails]} >  

                                    <View style={{ flexBasis: '33%'}}> 
                                        <View style={[styles.singleCreditItem]}> 
                                            <Text style={[styles.leaveTitle]}> 1/2 </Text>
                                            <Text style={[styles.leaveSubTitle]}> Casual Leave </Text>
                                        </View> 
                                    </View> 

                                    <View style={{ flexBasis: '33%'}}> 
                                        <View style={[styles.singleCreditItem]}> 
                                            <Text style={[styles.leaveTitle]}> 6/14 </Text>
                                            <Text style={[styles.leaveSubTitle]}> Medical Leave </Text>
                                        </View> 
                                    </View> 

                                    <View style={{ flexBasis: '33%'}}> 
                                        <View style={[styles.singleCreditItem]}> 
                                            <Text style={[styles.leaveTitle]}> 0/10 </Text>
                                            <Text style={[styles.leaveSubTitle]}> PL </Text>
                                        </View> 
                                    </View> 
                                    
                                </View>  
                            </View>   */}

          <View style={[styles.AccountDetailsArea]}>
            <View style={{marginBottom: 20}}>
              <Text style={[styles.pageTitle]}> Leave </Text>
            </View>

            <View>
              <Text style={[styles.inputLebel]}> Type </Text>
              <Picker
                selectedValue={this.state.addtype}
                style={[styles.Prority]}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({addtype: itemValue})
                }>
                {/* <Picker.Item label="select-1" value="select-1" />
                                        <Picker.Item label="Official Tour" value="" /> */}
                {this.state.leaveType.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.strLeaveType}
                    value={item.intLeaveTypeID}
                  />
                ))}
              </Picker>
              <Text style={[styles.borderColors]}></Text>
            </View>

            <View style={[styles.selectBoxStyle]}>
              <TouchableOpacity onPress={this.showDateTimePicker}>
                <Text style={[styles.inputLebel]}> Start Time </Text>
                <Text style={[styles.inputLebel]}>{this.state.fromDate}</Text>
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
                <Text style={[styles.inputLebel]}> {this.state.endDate} </Text>
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

            <View style={{paddingTop: 15}}>
              <Text style={[styles.inputLebel]}> Reason </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="Type Reason here"
                value={this.state.reason}
                onChangeText={(value) => {
                  this.setState({reason: value});
                }}
              />
            </View>
            <View style={{paddingTop: 15}}>
              <Text style={[styles.inputLebel]}> Address </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="Type Address Here"
                value={this.state.address}
                onChangeText={(value) => {
                  this.setState({address: value});
                }}
              />
            </View>
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
    fontSize: RFPercentage(5),
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
});
