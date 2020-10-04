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
  multilineInputState,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {getAuthAction} from '../../User/actions/AuthAction';
import {Radio, RadioGroup} from '@ui-kitten/components';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-community/picker';

const JoiningSeafarers = (props) => {
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
              <Text style={[styles.headerTitle]}>Joining Seafarers</Text>
            </View>
            <View>
              <View style={[styles.inputBoxStyle]}>
                <Picker
                  // selectedValue={state.userSelected}
                  style={[styles.selectBoxStyle]}
                  onValueChange={(item, itemIndex) => changeUser(item)}>
                  <Picker.Item label="Ship Name" value="" />
                  <Picker.Item label={'Officer'} value={1} key={1} />
                  <Picker.Item label={'Engineer'} value={2} key={2} />
                </Picker>
              </View>
              <View style={[styles.inputBoxStyle]}>
                <Picker
                  // selectedValue={state.userSelected}
                  style={[styles.selectBoxStyle]}
                  onValueChange={(item, itemIndex) => changeUser(item)}>
                  <Picker.Item label="Port of Joining" value="" />
                  <Picker.Item label={'Officer'} value={1} key={1} />
                  <Picker.Item label={'Engineer'} value={2} key={2} />
                </Picker>
              </View>

              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Name of Joiner"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View style={[styles.inputBoxStyle]}>
                <Picker
                  // selectedValue={state.userSelected}
                  style={[styles.selectBoxStyle]}
                  onValueChange={(item, itemIndex) => changeUser(item)}>
                  <Picker.Item label="Rank/Staff ID" value="" />
                  <Picker.Item label={'Officer'} value={1} key={1} />
                  <Picker.Item label={'Engineer'} value={2} key={2} />
                </Picker>
              </View>
              <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                <TouchableOpacity onPress={showDateTimePicker}>
                  <View style={{paddingTop: 6, paddingLeft: 10}}>
                    <Text style={[styles.targetstyle]}> Date of Joining</Text>
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

              <View style={[styles.conductborder]}>
                <Text style={[styles.travelingstyle]}>
                  1. Traveling Documents and Discharge Book
                </Text>
                <View style={[styles.conductborderone]}></View>
                <Text style={[styles.Conductstyle]}>
                  I) Is the Seafarer above the age of 18 years?
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>Yes</Text>
                      </Radio>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>NO</Text>
                      </Radio>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>N/A</Text>
                      </Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyle]}>
                  II) Is the Letter of appointment and "WCL's Terms and
                  Conditions" in order. Has the seafarer been provided with a
                  copy of the documents
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>Yes</Text>
                      </Radio>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>NO</Text>
                      </Radio>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>N/A</Text>
                      </Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyle]}>
                  III) Is Passport in order? *
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>Yes</Text>
                      </Radio>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>NO</Text>
                      </Radio>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>N/A</Text>
                      </Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '33%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="Nationality"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"

                        // value={state.purpose}
                        // onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '33%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="P/p No"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"

                        // value={state.purpose}
                        // onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '33%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="Expiry"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"

                        // value={state.purpose}
                        // onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyle]}>
                  IV) Any special Visa required for vessel trade? *
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>Yes</Text>
                      </Radio>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>NO</Text>
                      </Radio>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>N/A</Text>
                      </Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '33%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="Country"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"

                        // value={state.purpose}
                        // onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '33%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="Type"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"

                        // value={state.purpose}
                        // onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '33%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="Expiry"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"

                        // value={state.purpose}
                        // onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyle]}>
                  V) Discharge Book valid and in order? *
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View
                    style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>Yes</Text>
                      </Radio>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>NO</Text>
                      </Radio>
                      <Radio>
                        {' '}
                        <Text style={[styles.radiobutton]}>N/A</Text>
                      </Radio>
                    </RadioGroup>
                  </View>
                </View>
                <View style={[styles.inputBoxStyle]}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Seamen ID"
                    placeholderTextColor={'#000000'}
                  />
                </View>
                <View style={[styles.inputBoxStyle]}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Medical Fitness Certificate"
                    placeholderTextColor={'#000000'}
                  />
                </View>
                <View style={[styles.inputBoxStyle]}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Vaccination Book"
                    placeholderTextColor={'#000000'}
                  />
                </View>
                <View style={[styles.inputBoxStyle]}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Cholera Vaccination Expiry"
                    placeholderTextColor={'#000000'}
                  />
                </View>
                <View style={[styles.inputBoxStyle]}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Yellow Fever Vaccination Expiry "
                    placeholderTextColor={'#000000'}
                  />
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
                  <Text style={styles.buttonStyle}>Next</Text>
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
  },
  bgbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    margin: 10,
    padding: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  promotionstyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',
    paddingTop: 15,
  },
  radioTexttyle: {
    fontSize: 20,
  },
  targetstyle: {
    color: '#1E2E40',
    fontWeight: 'bold',

    fontSize: 16,
  },
  inputBoxStyle: {
    fontSize: 16,

    marginTop: 20,

    borderColor: '#E2E2E2',
    borderWidth: 1,
    borderRadius: 6,

    backgroundColor: '#F7F9FC',

    fontWeight: 'bold',
  },
  InputField: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 17,
    backgroundColor: '#F7F9FC',
    borderColor: '#F2F2F2',
    paddingLeft: 15,
    marginTop: 7,
    borderRadius: 4,
    borderWidth: 1,
    paddingBottom: 17,
    marginLeft: 6,

    color: '#000000',
  },
  Cargotypestyle: {
    flex: 1,
    flexDirection: 'row',
  },
  travelingstyle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 10,
  },
  Cargotypestyleone: {
    flexBasis: '46%',
    marginLeft: 8,
  },
  inputBoxStyle: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    marginTop: 7,
    borderRadius: 6,

    backgroundColor: '#F7F9FC',

    fontWeight: 'bold',
    marginLeft: 6,
  },
  radiobutton: {
    fontSize: 16,
  },

  Conductstyle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 10,
    paddingLeft: 20,
  },
  conductborder: {
    borderTopWidth: 1,
    borderTopColor: '#00000029',
    marginTop: 20,
  },
  conductborderone: {
    borderTopWidth: 1,
    borderTopColor: '#00000029',
    marginTop: 6,
    width: '30%',
  },
  radioBoxStyle: {
    marginTop: 8,
    marginLeft: 20,
  },
  labelstyle: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
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
export default JoiningSeafarers;
