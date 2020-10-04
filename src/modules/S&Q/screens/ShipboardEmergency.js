import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  multilineInputState,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {getAuthAction} from '../../User/actions/AuthAction';

import {Input} from '@ui-kitten/components';

import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
const ShipboardEmergency = (props) => {
  const [state, setState] = React.useState({
    isDateTimePickerVisible: false,
    date: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthAction());
  }, [props]);

  const showDateTimePicker = () => {
    let cloneObj = {...state};
    cloneObj.isDateTimePickerVisible = true;
    setState(cloneObj);
  };

  const handleDatePicked = (date) => {
    let cloneObj = {...state};
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    const monthString = month < 10 ? '0' + month : month;
    let fromDate = year + '-' + monthString + '-' + dateNow;
    cloneObj.date = fromDate;
    cloneObj.isDateTimePickerVisible = false;
    setState(cloneObj);

    // setState({date: fromDate, isDateTimePickerVisible: false});
    // hideDateTimePicker();
  };
  const hideDateTimePicker = () => {
    let cloneObj = {...state};
    cloneObj.isDateTimePickerVisible = false;
    setState(cloneObj);
  };

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <ScrollView>
        <SafeAreaView>
          <View style={[styles.bgbox]}>
            <View>
              <Text style={[styles.headerTitle]}>
                Shipboard Emergency Report
              </Text>
            </View>
            <View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Name of Ship"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Port"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Berth"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '47%', marginRight: 10}}>
                  <View style={[styles.inputBoxStyletwo]}>
                    <View>
                      <View style={{flexBasis: '100%'}}>
                        <TextInput
                          style={[styles.InputField]}
                          placeholder="Lat"
                          placeholderTextColor={'#000000'}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '47%', marginLeft: 10}}>
                  <View style={[styles.inputBoxStyletwo]}>
                    <View>
                      <View style={{flexBasis: '100%'}}>
                        <TextInput
                          style={[styles.InputField]}
                          placeholder="Long"
                          placeholderTextColor={'#000000'}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '48%'}}>
                  <View style={[styles.inputBoxStylethree]}>
                    <TouchableOpacity onPress={showDateTimePicker}>
                      <View>
                        <Text style={{}}> Date </Text>
                        {/* <Text>{state.date}</Text> */}
                        <Text
                          title="Show DatePicker"
                          onPress={showDateTimePicker}
                        />
                        <DateTimePicker
                          isVisible={state.isDateTimePickerVisible}
                          onConfirm={handleDatePicked}
                          onCancel={hideDateTimePicker}
                          datePickerModeAndroid={'spinner'}
                          mode={'date'}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{flexBasis: '48%', marginLeft: 10}}>
                  <View style={[styles.inputBoxStyletwo]}>
                    <View>
                      <View style={{flexBasis: '100%'}}>
                        <TextInput
                          style={[styles.InputField]}
                          placeholder="Time"
                          placeholderTextColor={'#BBBBBB'}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '47%', marginRight: 10}}>
                  <View style={[styles.inputBoxStyletwo]}>
                    <View>
                      <View style={{flexBasis: '100%'}}>
                        <TextInput
                          style={[styles.InputField]}
                          placeholder="From"
                          placeholderTextColor={'#BBBBBB'}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '47%', marginLeft: 10}}>
                  <View style={[styles.inputBoxStyletwo]}>
                    <View>
                      <View style={{flexBasis: '100%'}}>
                        <TextInput
                          style={[styles.InputField]}
                          placeholder="To"
                          placeholderTextColor={'#BBBBBB'}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.inputBoxStyle]}>
                <Picker
                  // selectedValue={state.userSelected}

                  onValueChange={(item, itemIndex) => changeUser(item)}>
                  <Picker.Item label="Nature of Casuality" value="" />
                  <Picker.Item label={'Officer'} value={1} key={1} />
                  <Picker.Item label={'Engineer'} value={2} key={2} />
                </Picker>
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Nature of extent of damage"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View style={[styles.inputBoxStyle]}>
                <Picker
                  // selectedValue={state.userSelected}

                  onValueChange={(item, itemIndex) => changeUser(item)}>
                  <Picker.Item label="Cargo" value="" />
                  <Picker.Item label={'Officer'} value={1} key={1} />
                  <Picker.Item label={'Engineer'} value={2} key={2} />
                </Picker>
              </View>
            </View>

            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Name of charterer of agent with any contact names and after
                  off hours or emergency phone numbers
                </Text>
              </View>

              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>

            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Name, nationality, type, fax & telephone number and situation
                  of any other ship involved
                </Text>
              </View>
              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  Any casualties or fatalities
                </Text>
              </View>
              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>
            <View>
              <TextInput
                style={[styles.InputField]}
                placeholder="Nature of any services required"
                placeholderTextColor={'#000000'}
              />
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Services already summoned
                </Text>
              </View>
              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  National, local or any other authorities or agencies already
                  informed
                </Text>
              </View>
              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  State of weather and sea, present and forecast
                </Text>
              </View>
              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Other relevant comments
                </Text>
              </View>
              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Date and time of report
                </Text>
              </View>
              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>

            <View style={[styles.analysisborderstyle]}>
              <Text style={[styles.analysisstyle]}>
                In the event of a spillage of cargo or bunkers the following
                items should be added
              </Text>
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Type of oil or cargo spilled
                </Text>
              </View>
              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Cause of incident, if known (e.g. overflow, burst hoses, hull
                  damage etc.)
                </Text>
              </View>
              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Estimate of quantity spilled
                </Text>
              </View>
              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Estimated current rate of spillage
                </Text>
              </View>
              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Whether cleanup has been attempted by ship or a third party
                </Text>
              </View>
              <View
                style={{
                  width: '99%',
                }}>
                <Input
                  style={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: 13,
                  }}
                  multiline={true}
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',

              marginBottom: 40,
            }}>
            <View
              style={{
                flexBasis: '42%',
                marginLeft: 20,
                marginRight: 15,
              }}>
              <View style={{marginTop: 20}}>
                <TouchableOpacity onPress={() => submit()}>
                  <Text style={styles.backButtonStyle}>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexBasis: '42%', marginLeft: 5}}>
              <View style={{marginTop: 20}}>
                <TouchableOpacity onPress={() => submit()}>
                  <Text style={styles.buttonStyle}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  analysisstyle: {
    color: '#1E2E40',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  analysisborderstyle: {
    borderBottomColor: '#00000029',
    borderBottomWidth: 1,
    width: '80%',
  },

  checkboxstyle: {
    fontSize: 15,
    padding: 10,
    margin: 10,
  },
  checkboxsection: {
    paddingTop: 16,
  },
  InputField: {
    fontSize: 16,
    paddingTop: 12,
    backgroundColor: '#F7F9FC',
    borderColor: '#F2F2F2',
    paddingLeft: 15,
    marginTop: 10,
    borderRadius: 4,
    borderWidth: 1,
    paddingBottom: 12,
    fontWeight: '400',

    color: '#000000',
  },

  inputBoxStyle: {
    fontSize: 16,
    borderRadius: 7,
    flexBasis: '99%',

    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',

    backgroundColor: '#F7F9FC',
    padding: 2,
    fontWeight: 'bold',
  },
  inputBoxStylethree: {
    fontSize: 16,
    borderRadius: 7,
    flexBasis: '99%',
    paddingTop: 5,
    paddingBottom: 5,

    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',

    backgroundColor: '#F7F9FC',
    padding: 2,
    fontWeight: 'bold',
  },
  inputBoxoneStyle: {
    fontSize: 16,
    borderRadius: 7,

    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',

    backgroundColor: '#F7F9FC',
    padding: 2,
    fontWeight: 'bold',
  },

  multilinestyle: {
    backgroundColor: '#fff',
    paddingTop: 20,
  },

  labelstyle: {
    fontSize: 16,

    paddingBottom: 20,
    fontWeight: '600',
  },
  backButtonStyle: {
    backgroundColor: '#fff',
    color: '#213547',

    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 35,
    textTransform: 'uppercase',
    borderRadius: 10,
    borderColor: '#88959F',
    fontWeight: 'bold',
    borderWidth: 2,
  },
  buttonStyle: {
    backgroundColor: '#2A71E5',
    color: '#fff',

    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 35,

    borderRadius: 10,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#147AD6',
  },
});
export default ShipboardEmergency;
