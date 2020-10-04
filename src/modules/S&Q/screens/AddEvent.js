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

const AddEvent = (props) => {
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
          <View>
            <View>
              <Text style={[styles.headerTitle]}>Add Event</Text>
            </View>
            <View>
              <View style={[styles.inputBoxStyle]}>
                <Picker
                  // selectedValue={state.userSelected}
                  style={[styles.selectBoxStyle]}
                  onValueChange={(item, itemIndex) => changeUser(item)}>
                  <Picker.Item label="Event Type" value="" />
                  <Picker.Item label={'Officer'} value={1} key={1} />
                  <Picker.Item label={'Engineer'} value={2} key={2} />
                </Picker>
              </View>

              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Event"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Description"
                  placeholderTextColor={'#000000'}
                />
              </View>

              <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                <TouchableOpacity onPress={showDateTimePicker}>
                  <View style={{paddingTop: 6, paddingLeft: 10}}>
                    <Text style={[styles.targetstyle]}>Start Date </Text>
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

              <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                <TouchableOpacity onPress={showDateTimePicker}>
                  <View style={{paddingTop: 6, paddingLeft: 10}}>
                    <Text style={[styles.targetstyle]}>Due Date </Text>
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
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('signOff')}>
                  <Text style={styles.buttonStyle}>Sign Off</Text>
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

    padding: 15,
  },

  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 10,
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
export default AddEvent;
