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

import DateTimePicker from 'react-native-modal-datetime-picker';

import {Input} from '@ui-kitten/components';

const ShipboardInternal = (props) => {
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
              <Text style={[styles.headerTitle]}>Shipboard Internal Audit</Text>
            </View>
            <View>
              <View style={[styles.Cargotypestyle]}>
                <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                  <TextInput
                    placeholder="Sheet"
                    placeholderTextColor={'#000000'}
                    fontSize={16}
                    fontWeight={'bold'}
                    value={0}
                    onChangeText={(value) => changePurpose(value)}
                  />
                </View>
                <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                  <TextInput
                    placeholder="of"
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
                    <TextInput
                      placeholder="To"
                      placeholderTextColor={'#000000'}
                      fontSize={16}
                      fontWeight={'bold'}
                      value={0}
                      onChangeText={(value) => changePurpose(value)}
                    />
                  </View>
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <TouchableOpacity onPress={showDateTimePicker}>
                      <View style={{paddingTop: 10}}>
                        <Text style={[styles.targetstyle]}>
                          {' '}
                          Date of report
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
              </View>
              <View style={[styles.abilitystyle]}>
                <View style={[styles.Cargotypestyle]}>
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <TextInput
                      placeholder="Procedure"
                      placeholderTextColor={'#000000'}
                      fontSize={16}
                      fontWeight={'bold'}
                      value={0}
                      onChangeText={(value) => changePurpose(value)}
                    />
                  </View>
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <TouchableOpacity onPress={showDateTimePicker}>
                      <View style={{paddingTop: 10}}>
                        <Text style={[styles.targetstyle]}>Audit Date </Text>
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
                  <Text style={[styles.labelstyle]}> Non-conformances</Text>
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
                <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                  <TouchableOpacity onPress={showDateTimePicker}>
                    <View style={{paddingTop: 10, paddingLeft: 20}}>
                      <Text style={[styles.targetstyle]}>Target Date </Text>
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

                <View>
                  <Text style={[styles.labelstyle]}>
                    {' '}
                    Observations (if any)
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
                <View style={[styles.Cargotypestyle, styles.cargostyle]}>
                  <View
                    style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                    <TextInput
                      placeholder="Author's Name"
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
                      placeholder="Auditee's Name"
                      placeholderTextColor={'#000000'}
                      fontSize={16}
                      fontWeight={'bold'}
                      value={0}
                      onChangeText={(value) => changePurpose(value)}
                    />
                  </View>
                </View>
                <View>
                  <Text style={[styles.labelstyle]}>Action Taken Compiled</Text>
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
                <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                  <TouchableOpacity onPress={showDateTimePicker}>
                    <View style={{paddingTop: 10}}>
                      <Text style={[styles.targetstyle]}>Date </Text>
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
                <View style={[styles.auditorstyle]}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Auditor's Name"
                    placeholderTextColor={'#000000'}
                    fontWeight={'bold'}
                  />
                </View>
                <View>
                  <Text style={[styles.labelstyle]}> Verification</Text>
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

                <View style={[styles.auditorstyle]}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Auditor's Name"
                    placeholderTextColor={'#000000'}
                    fontWeight={'bold'}
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

    paddingBottom: 10,
  },
  targetstyle: {
    color: '#1E2E40',
    fontWeight: 'bold',

    fontSize: 16,
  },

  InputField: {
    fontSize: 16,

    backgroundColor: '#F7F9FC',
    borderColor: '#F2F2F2',
    paddingLeft: 15,
    marginTop: 10,
    borderRadius: 4,
    borderWidth: 1,

    fontWeight: '400',

    color: '#000000',
  },
  auditorstyle: {
    width: '98%',
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 4,
  },
  Cargotypestyle: {
    flex: 1,
    flexDirection: 'row',
  },
  Cargotypestyleone: {
    flexBasis: '48%',
    marginRight: 8,
  },
  inputBoxStyle: {
    fontSize: 16,

    marginTop: 20,
    paddingLeft: 20,
    borderColor: '#E2E2E2',
    borderWidth: 1,
    borderRadius: 6,

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
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '500',
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
export default ShipboardInternal;
