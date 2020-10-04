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
import {Input} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';

import {CheckBox, Layout} from '@ui-kitten/components';

const WorkOverside = (props) => {
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
              <Text style={[styles.headerTitle]}>Work Overside Permit</Text>
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

            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Specific Location & Description Of Work
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
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>
            <View>
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
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>

            <View style={[styles.analysisborderstyle]}>
              <Text style={[styles.analysisstyle]}>
                We, the undersigned, are satisfied that the circuits described
                above :
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
              <View style={{flexBasis: '33%'}}>
                <CheckBox
                  checked={activeChecked}
                  onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                  <Text style={styles.checkboxstyle}> Officer in charge</Text>
                </CheckBox>
              </View>
              <View style={{flexBasis: '33%'}}>
                <CheckBox
                  checked={activeChecked}
                  onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                  <Text style={styles.checkboxstyle}>
                    Chief {'\n'} engineer
                  </Text>
                </CheckBox>
              </View>
              <View style={{flexBasis: '33%'}}>
                <CheckBox
                  checked={activeChecked}
                  onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                  <Text style={styles.checkboxstyle}> Master</Text>
                </CheckBox>
              </View>
            </View>
            <View>
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
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
            </View>

            <View style={{flexBasis: '50%', marginTop: 20, marginBottom: 10}}>
              <CheckBox
                checked={activeChecked}
                onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                <Text style={styles.checkboxstyle}>Officer in charge</Text>
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

  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',
    paddingTop: 15,
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
export default WorkOverside;
