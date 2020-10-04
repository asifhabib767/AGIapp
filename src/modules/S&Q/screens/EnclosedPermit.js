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
} from 'react-native';
import {useDispatch} from 'react-redux';

import {getAuthAction} from '../../User/actions/AuthAction';
import {Radio, RadioGroup} from '@ui-kitten/components';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const EnclosedPermit = (props) => {
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
              <Text style={[styles.headerTitle]}>Enclosed Spaces Permit</Text>
            </View>
            <View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Location/Name of Enclosed Space"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Reason for entry"
                  placeholderTextColor={'#000000'}
                />
              </View>

              <View style={[styles.Cargotypestyle, styles.cargostyle]}>
                <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                  <TextInput
                    placeholder="Permit Valid Form"
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
              <View>
                <Text style={[styles.Conductstyleone]}>
                  Pre Entry Preparations
                </Text>
                <Text style={[styles.Conductstyletwo]}>
                  I) Has the space been segregated by blanking off or isolating
                  all connecting pipelines?
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{
                        flexDirection: 'row',
                        zIndex: 0,
                        paddingLeft: 20,
                      }}>
                      <Radio>
                        <Text style={[styles.radiobutton]}>Yes</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>No</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>N/A</Text>
                      </Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyletwo]}>
                  I) Have valves on all pipelines serving the space been secured
                  to prevent their accidental opening?
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{
                        flexDirection: 'row',
                        zIndex: 0,
                        paddingLeft: 20,
                      }}>
                      <Radio>
                        <Text style={[styles.radiobutton]}>Yes</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>No</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>N/A</Text>
                      </Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyletwo]}>
                  I) Has the spaces been cleaned?
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{
                        flexDirection: 'row',
                        zIndex: 0,
                        paddingLeft: 20,
                      }}>
                      <Radio>
                        <Text style={[styles.radiobutton]}>Yes</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>No</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>N/A</Text>
                      </Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyletwo]}>
                  I) Has the spaces been thoroughly ventilated?
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{
                        flexDirection: 'row',
                        zIndex: 0,
                        paddingLeft: 20,
                      }}>
                      <Radio>
                        <Text style={[styles.radiobutton]}>Yes</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>No</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>N/A</Text>
                      </Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View>
                <Text style={[styles.Conductstyleone]}>
                  Pre Entry Atmosphere Test
                </Text>
                <View style={[styles.Cargotypestyle, styles.cargostyle]}>
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <TextInput
                      placeholder="Oxygen"
                      placeholderTextColor={'#000000'}
                      fontSize={16}
                      fontWeight={'bold'}
                      value={0}
                      paddingLeft={10}
                      onChangeText={(value) => changePurpose(value)}
                    />
                  </View>
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <View style={{}}>
                      <TouchableOpacity onPress={showDateTimePicker}>
                        <View style={{paddingTop: 7, paddingLeft: 20}}>
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
                <View style={[styles.Cargotypestyle, styles.cargostyle]}>
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <TextInput
                      placeholder="Hydrocarbon"
                      placeholderTextColor={'#000000'}
                      fontSize={16}
                      fontWeight={'bold'}
                      value={0}
                      paddingLeft={10}
                      onChangeText={(value) => changePurpose(value)}
                    />
                  </View>
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <View style={{}}>
                      <TouchableOpacity onPress={showDateTimePicker}>
                        <View style={{paddingTop: 15, paddingLeft: 20}}>
                          <Text>
                            {' '}
                            Time{'               '}{' '}
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
                <View style={[styles.Cargotypestyle, styles.cargostyle]}>
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <TextInput
                      placeholder="Toxic Gases"
                      placeholderTextColor={'#000000'}
                      fontSize={16}
                      fontWeight={'bold'}
                      value={0}
                      paddingLeft={10}
                      onChangeText={(value) => changePurpose(value)}
                    />
                  </View>
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <View style={{}}>
                      <TouchableOpacity onPress={showDateTimePicker}>
                        <View style={{paddingTop: 15, paddingLeft: 20}}>
                          <Text>
                            {' '}
                            Time {'               '}{' '}
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
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Name of Person(s) entering"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Rank"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Name of responsible officer in charge"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Rank"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyletwo]}>
                  I) Has the procedure-407 in Fleet Instruction manual been
                  followed?
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>
                        <Text style={[styles.radiobutton]}>Yes</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>No</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>N/A</Text>
                      </Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyletwo]}>
                  I) Has checklist no-20 for Entry into Enclosed Spaces been
                  completed?
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>
                        <Text style={[styles.radiobutton]}>Yes</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>No</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>N/A</Text>
                      </Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyletwo]}>
                  I) Special Conditions/Precautions
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>
                        <Text style={[styles.radiobutton]}>Yes</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>No</Text>
                      </Radio>
                      <Radio>
                        <Text style={[styles.radiobutton]}>N/A</Text>
                      </Radio>
                    </RadioGroup>
                  </View>
                </View>
                <View>
                  <Text style={[styles.Conductstyleone]}>
                    I am satisfied that all precautions have been taken and that
                    Safety arrangements will be maintained during the validity
                    of this permit
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '49%'}}>
                    <View style={[styles.inputBoxStyle]}>
                      <Picker
                        // selectedValue={state.userSelected}

                        onValueChange={(item, itemIndex) => changeUser(item)}>
                        <Picker.Item label="Safety Officer" value="" />
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
                        <Picker.Item label="Person Entering" value="" />
                        <Picker.Item label={'Officer'} value={1} key={1} />
                        <Picker.Item label={'Engineer'} value={2} key={2} />
                      </Picker>
                    </View>
                  </View>
                </View>

                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Responsible officer in charge of work team"
                    placeholderTextColor={'#000000'}
                  />
                </View>
                <View>
                  <Text style={[styles.Conductstyleone]}>
                    The work has been completed and all persons under my
                    supervision, materials and equipment have been withdrawn.
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Responsible officer in charge"
                    placeholderTextColor={'#000000'}
                  />
                </View>
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
                            Time {'               '}{' '}
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

                <View>
                  <Text style={[styles.Conductstylethree]}>Advisory</Text>
                  <Text style={[styles.Conductstyleone]}>
                    a) Starting and finishing time must not exceed the
                    authorized signatories/responsible officers working hours.
                  </Text>
                  <Text style={[styles.Conductstyleone]}>
                    b) Specific location of work to be given.
                  </Text>
                  <Text style={[styles.Conductstyleone]}>
                    c) Description of work to include type of equipment to be
                    used.
                  </Text>
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
  radiobutton: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',
    paddingTop: 15,
  },
  radioTexttyle: {
    fontSize: 20,
  },
  Conductstylethree: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
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
  Conductstyleone: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
  },
  Conductstyletwo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 20,
  },

  Conductstyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    paddingLeft: 20,
  },

  radioBoxStyle: {
    marginTop: 8,
    marginLeft: 20,
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
export default EnclosedPermit;
