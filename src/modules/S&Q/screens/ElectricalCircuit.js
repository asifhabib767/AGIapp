import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  multilineInputState,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {getAuthAction} from '../../User/actions/AuthAction';

import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {Input} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';

const ElectricalCircuit = (props) => {
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

  const hideDateTimePicker = () => {
    let cloneObj = {...state};
    cloneObj.isDateTimePickerVisible = false;
    setState(cloneObj);
  };

  handleDatePicked = (date) => {
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let fromDate = year + '-' + month + '-' + dateNow;
    this.setState({fromDate});
    this.hideDateTimePicker();
  };

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <ScrollView>
        <SafeAreaView>
          <View style={[styles.bgbox]}>
            <View>
              <Text style={[styles.headerTitle]}>
                Electrical Circuit Work Permit
              </Text>
            </View>
            <View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="M.V"
                  placeholderTextColor={'#000000'}
                  fontWeight={'bold'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Position"
                  placeholderTextColor={'#000000'}
                  fontWeight={'bold'}
                />
              </View>

              <View style={[styles.Cargotypestyle, styles.cargostyle]}>
                <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                  <TextInput
                    placeholder="Valid Form"
                    placeholderTextColor={'#000000'}
                    fontSize={16}
                    fontWeight={'bold'}
                    value={0}
                    onChangeText={(value) => changePurpose(value)}
                  />
                </View>
                <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                  <TextInput
                    placeholder="To"
                    placeholderTextColor={'#000000'}
                    fontSize={16}
                    fontWeight={'bold'}
                    value={0}
                    onChangeText={(value) => changePurpose(value)}
                  />
                </View>
              </View>

              <View style={[styles.abilitystyle]}>
                <View style={[styles.Cargotypestyle]}>
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <View style={{}}>
                      <TouchableOpacity onPress={showDateTimePicker}>
                        <View>
                          <Text style={{paddingTop: 15, paddingLeft: 20}}>
                            {' '}
                            Date{' '}
                          </Text>
                          <Text>{state.date}</Text>
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
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <View style={{}}>
                      <TouchableOpacity onPress={showDateTimePicker}>
                        <View style={{paddingTop: 10, paddingLeft: 20}}>
                          <Text> Date</Text>
                          <Text>{state.date}</Text>
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
                </View>
              </View>
              <View style={[styles.multilinestyle]}>
                <View>
                  <Text style={[styles.labelstyle]}>Location Of Work</Text>
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
                    textStyle={{minHeight: 100}}
                    placeholder="Type"
                    {...multilineInputState}
                  />
                </View>
                <View>
                  <Text style={[styles.labelstyle]}> Circuits involved</Text>
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
                    textStyle={{minHeight: 100}}
                    placeholder="Type"
                    {...multilineInputState}
                  />
                </View>
                <View>
                  <Text style={[styles.labelstyle]}> Special Conditions</Text>
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
                    textStyle={{minHeight: 100}}
                    placeholder="Type"
                    {...multilineInputState}
                  />
                </View>
                <View>
                  <Text style={[styles.labelstyle]}>
                    {' '}
                    Personnel assigned to the work
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
                    textStyle={{minHeight: 100}}
                    placeholder="Type"
                    {...multilineInputState}
                  />
                </View>
                <View>
                  <Text style={[styles.labelstyle]}>
                    We, the undersigned, are satisfied that the circuits
                    described above :
                  </Text>
                  <Text style={[styles.labelstyle]}>
                    A. Have been isolated and that it is safe for the work
                    outlined to commence.
                  </Text>
                  <Text style={[styles.labelstyle]}>
                    B. Lock-out / tag-out procedures complied with.
                  </Text>
                  <Text style={[styles.labelstyle]}>
                    C. Cannot be isolated but the special precautions are
                    adequate and that it is safe for the work to commence.
                  </Text>
                  <Text style={[styles.labelstyle]}>
                    D. In cases where special conditions exist, has a risk
                    assessment been carried out?
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '49%'}}>
                    <View style={[styles.inputBoxStyle]}>
                      <Picker
                        // selectedValue={state.userSelected}

                        onValueChange={(item, itemIndex) => changeUser(item)}>
                        <Picker.Item label="Officer" value="" />
                        <Picker.Item label={'Officer'} value={1} key={1} />
                        <Picker.Item label={'Engineer'} value={2} key={2} />
                      </Picker>
                    </View>
                  </View>

                  <View style={{flexBasis: '49%', marginLeft: 10}}>
                    <View style={[styles.inputBoxStyle]}>
                      <Picker
                        // selectedValue={state.userSelected}

                        onValueChange={(item, itemIndex) => changeUser(item)}>
                        <Picker.Item label="Chief Engineer" value="" />
                        <Picker.Item label={'Officer'} value={1} key={1} />
                        <Picker.Item label={'Engineer'} value={2} key={2} />
                      </Picker>
                    </View>
                  </View>
                </View>
                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    // selectedValue={state.userSelected}

                    onValueChange={(item, itemIndex) => changeUser(item)}>
                    <Picker.Item label="Master" value="" />
                    <Picker.Item label={'Officer'} value={1} key={1} />
                    <Picker.Item label={'Engineer'} value={2} key={2} />
                  </Picker>
                </View>
                <View>
                  <Text style={[styles.labelstyle]}> Permit Cancellation</Text>
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
                    textStyle={{minHeight: 100}}
                    placeholder="Type"
                    {...multilineInputState}
                  />
                </View>
                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    // selectedValue={state.userSelected}

                    onValueChange={(item, itemIndex) => changeUser(item)}>
                    <Picker.Item label="Master" value="" />
                    <Picker.Item label={'Officer'} value={1} key={1} />
                    <Picker.Item label={'Engineer'} value={2} key={2} />
                  </Picker>
                </View>
                <View style={[styles.abilitystyle]}>
                  <View style={[styles.Cargotypestyle]}>
                    <View
                      style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                      <View style={{}}>
                        <TouchableOpacity onPress={showDateTimePicker}>
                          <View>
                            <Text style={{paddingTop: 15, paddingLeft: 20}}>
                              {' '}
                              Date{' '}
                            </Text>
                            <Text>{state.date}</Text>
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
                    <View
                      style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                      <View style={{}}>
                        <TouchableOpacity onPress={showDateTimePicker}>
                          <View style={{paddingTop: 10, paddingLeft: 20}}>
                            <Text>
                              {' '}
                              Time {'              '}{' '}
                              <Icon name="clock-o" size={18} />
                            </Text>
                            <Text>{state.date}</Text>
                            <Text
                              title="Show DatePicker"
                              onPress={showDateTimePicker}
                            />
                            <DateTimePicker
                              isVisible={state.isDateTimePickerVisible}
                              onConfirm={handleDatePicked}
                              onCancel={hideDateTimePicker}
                              datePickerModeAndroid={'spinner'}
                              mode={'time'}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#fff',
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
  },

  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',
    paddingTop: 15,

    paddingBottom: 10,
  },

  InputField: {
    fontSize: 16,
    // paddingTop: 17,
    backgroundColor: '#F7F9FC',
    borderColor: '#F2F2F2',
    paddingLeft: 15,
    marginTop: 10,
    borderRadius: 4,
    borderWidth: 1,
    // paddingBottom: 17,
    fontWeight: '400',

    color: '#000000',
  },
  Cargotypestyle: {
    flex: 1,
    flexDirection: 'row',
  },
  Cargotypestyleone: {
    flexBasis: '49%',
    marginRight: 8,
  },
  inputBoxStyle: {
    fontSize: 16,
    borderWidth: 0,
    borderColor: '#ddd',
    marginTop: 20,

    backgroundColor: '#F7F9FC',

    fontWeight: 'bold',
  },

  backButtonStyle: {
    backgroundColor: '#FFF',
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
  multilinestyle: {
    backgroundColor: '#fff',
  },
  labelstyle: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: 'bold',
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
export default ElectricalCircuit;
