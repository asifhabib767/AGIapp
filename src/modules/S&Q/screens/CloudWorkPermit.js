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
import DateTimePicker from 'react-native-modal-datetime-picker';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Radio, RadioGroup} from '@ui-kitten/components';

import {CheckBox, Layout} from '@ui-kitten/components';

const CloudWorkPermit = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    isDateTimePickerVisible: false,
    date: '',
  });

  const [activeChecked, setActiveChecked] = useState(false);

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
              <Text style={[styles.headerTitle]}>Cloud Work Permit</Text>
            </View>
            <View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Vessel Name"
                  placeholderTextColor={'#000000'}
                />
              </View>

              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Position"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Reason of Works"
                  placeholderTextColor={'#000000'}
                />
              </View>
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
            <View style={[styles.Cargotypestyle]}>
              <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                <View style={{}}>
                  <TouchableOpacity onPress={showDateTimePicker}>
                    <View>
                      <Text style={{paddingLeft: 20}}> Date </Text>
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
              <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                <View style={{}}>
                  <TouchableOpacity onPress={showDateTimePicker}>
                    <View style={{paddingLeft: 20}}>
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

            <View>
              <Text style={[styles.analysisstyleone]}>Actions & Controls</Text>
              <Text style={[styles.promotionstyleone]}></Text>
              <View>
                <Text style={[styles.promotionstyle]}>I) Depressurizing</Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>
                  I) Adequate lighting
                </Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>I) Draining</Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>
                  I) Safety tags and locks
                </Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>
                  I) Electrical Isolation
                </Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>
                  I) Mechanical Isolation
                </Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>
                  I) Exposure to moving/rotating machinery
                </Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>I) Confined space</Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>I) Stand by man</Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>
                  I) Ventilate properly
                </Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>I) Warning notice</Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>
                  I) Potential flammable/explosive atmosphere
                </Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>
                  I) Potential high temperature
                </Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>
                  I) Potential high pressure
                </Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>
                  I) Potential exposure to hazardous materials
                </Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>I) Excavation works</Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>
                  Personnel protective equipment to be worn
                </Text>
                <Text style={[styles.promotionstyleone]}></Text>
                <Text style={[styles.promotionstyle]}>I) Working Gloves</Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>I) PVC Gloves</Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>I) Face shields</Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>I) Goggles</Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>I) Ear plugs</Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View>
                <Text style={[styles.promotionstyle]}>I) Gas masks</Text>

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
                      {' '}
                      <Text style={[styles.radiobutton]}>Yes</Text>
                    </Radio>
                    <Radio>
                      {' '}
                      <Text style={[styles.radiobutton]}>No</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>

              <Text style={[styles.analysisstyle]}>
                Information and instructions to person carrying out cold work.
              </Text>
              <Text style={[styles.promotionstyleone]}></Text>

              <Text style={[styles.analysisstyle]}>
                A. The above mentioned personal protections must be worn.
              </Text>
              <Text style={[styles.analysisstyle]}>
                B. Above mentioned equipment/pipeline contents in service.
              </Text>
              <Text style={[styles.analysisstyle]}>
                C. Equipment expected to contain the above hazardous material
                when opened.
              </Text>
              <Text style={[styles.analysisstyle]}>
                D. In the circumstances noted, it is considered safe to proceed
                with this cold work.
              </Text>
              <Text style={[styles.analysisstyle]}>Permitions</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginBottom: 20,
                marginTop: 20,
              }}>
              <View style={{flexBasis: '60%'}}>
                <CheckBox
                  checked={activeChecked}
                  onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                  <Text style={styles.checkboxstyle}>
                    Senior Officer in charge
                  </Text>
                </CheckBox>
              </View>
              <View style={{flexBasis: '40%'}}>
                <CheckBox
                  checked={activeChecked}
                  onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                  <Text style={styles.checkboxstyle}>Master</Text>
                </CheckBox>
              </View>
            </View>
            <View>
              <Text style={[styles.analysisstyle]}>
                The coldwork has been completed and all persons under my
                supervision, materials and equipment have been withdrawn
              </Text>
            </View>

            <View style={{flexBasis: '50%', marginTop: 20, marginBottom: 10}}>
              <CheckBox
                checked={activeChecked}
                onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                <Text style={styles.checkboxstyle}>
                  Senior Officer in charge
                </Text>
              </CheckBox>
            </View>
            <View style={[styles.Cargotypestyle]}>
              <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                <View style={{}}>
                  <TouchableOpacity onPress={showDateTimePicker}>
                    <View>
                      <Text style={{paddingLeft: 20}}> Date </Text>
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
              <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                <View style={{}}>
                  <TouchableOpacity onPress={showDateTimePicker}>
                    <View style={{paddingLeft: 20}}>
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
                  <Text style={styles.buttonStyle}>Submit</Text>
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
  Cargotypestyle: {
    flex: 1,
    flexDirection: 'row',
  },
  Cargotypestyleone: {
    flexBasis: '49%',
    marginRight: 8,
    paddingTop: 6,
  },
  bgbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    margin: 10,
    padding: 10,
  },
  analysisstyle: {
    color: '#1E2E40',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 7,
  },
  analysisstyleone: {
    color: '#1E2E40',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  promotionstyle: {
    fontSize: 18,
    fontWeight: '700',
    paddingTop: 10,
  },
  radiobutton: {
    fontSize: 20,
  },
  promotionstyleone: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '30%',
  },
  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',

    paddingBottom: 15,
  },

  checkboxstyle: {
    fontSize: 15,
    // padding: 10,
    // margin: 10,
    color: '#5D5C5C',
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
    flexBasis: '48%',

    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',

    backgroundColor: '#F7F9FC',

    fontWeight: 'bold',
    marginRight: 10,
  },

  labelstyle: {
    fontSize: 16,

    paddingBottom: 7,
    paddingTop: 7,
    fontWeight: '500',
  },
  backButtonStyle: {
    backgroundColor: '#fff',
    color: '#232A2F',

    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 35,

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
export default CloudWorkPermit;
