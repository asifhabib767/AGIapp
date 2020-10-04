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
import Icon from 'react-native-vector-icons/FontAwesome';

import {Input} from '@ui-kitten/components';
import {Radio, RadioGroup} from '@ui-kitten/components';

const WorkAloftPermit = (props) => {
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
              <Text style={[styles.headerTitle]}>Work Aloft Permit</Text>
            </View>
            <View>
              <View style={[styles.Cargotypestyle, styles.cargostyle]}>
                <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                  <TextInput
                    placeholder=" Permit Valid Form"
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
                  <Text style={[styles.labelstyle]}> Reason Of Work</Text>
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
                  <Text style={[styles.promotionstyle]}>
                    I) Has enclosed space entry permit been issued?
                  </Text>

                  <View>
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
                </View>
                <View>
                  <Text style={[styles.labelstyle]}>
                    Description of work outboard / aloft
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
                    {' '}
                    Personnel carrying out work outboard / aloft
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Rank"
                    placeholderTextColor={'#000000'}
                    marginBottom={10}
                  />
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
                    Responsible person in attendance
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
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Rank"
                    placeholderTextColor={'#000000'}
                    marginBottom={10}
                  />
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) Has the person(s) designated to carry out work sufficient
                    sea experience to understand the risks involved?
                  </Text>

                  <View>
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
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) Has a senior officer appointed to carry out this job?
                  </Text>

                  <View>
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
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) Is the work aloft in the vicinity of a ship's whistle?
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
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) If yes, has the power of whistles been shut off & warned
                    to engine room?
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
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) Is the work in the vicinity of the radio-aerials?
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
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) If yes, has the power of whistles been shut off & warned
                    to engine room?
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
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) Is the work carried out in the vicinity of radar
                    scanners?
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
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) If yes, then have the radars been shut down and isolated
                    warning notices been placed on all radar sets until work
                    aloft has been completed?
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
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) Have the equipment to be used for the persons working
                    aloft been thoroughly examined for defects?
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
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) Have the equipment to be used for the persons working
                    aloft been thoroughly examined for defects?
                  </Text>
                  <View style={[styles.Cargotypestyle, styles.cargostyle]}>
                    <View
                      style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                      <TextInput
                        placeholder="Safety Harness/betls"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        value={0}
                        onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                    <View
                      style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                      <TextInput
                        placeholder="Lifelines"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        value={0}
                        onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                  </View>
                  <View style={[styles.Cargotypestyle, styles.cargostyle]}>
                    <View
                      style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                      <TextInput
                        placeholder=" Lifeboys"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        value={0}
                        onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                    <View
                      style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                      <TextInput
                        placeholder="Goggles"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        value={0}
                        onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                  </View>
                  <View style={[styles.Cargotypestyle, styles.cargostyle]}>
                    <View
                      style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                      <TextInput
                        placeholder="Others"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        value={0}
                        onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) Have suitable notices been placed in suitable positions
                    so that other persons many avoid walking or working directly
                    below those working aloft?
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
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) Are tools carried in an appropriate container?
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
                </View>
                <View>
                  <Text style={[styles.promotionstyle]}>
                    I) Have ladders been secured before use against possible
                    movement?
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
                </View>
                <View>
                  <Text style={[styles.labelstyleone]}>
                    This work has been completed and all persons under my
                    supervision, materials and equipment have been withdrawn.
                  </Text>
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
    fontWeight: '600',

    color: '#000000',
  },
  promotionstyle: {
    fontSize: 18,
    fontWeight: '700',
    paddingTop: 10,
    paddingBottom: 8,
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

  radiobutton: {
    fontSize: 20,
  },
  labelstyleone: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
  },

  backButtonStyle: {
    backgroundColor: '#FFF',
    color: '#213547',

    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 35,

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
    paddingBottom: 10,
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
export default WorkAloftPermit;
