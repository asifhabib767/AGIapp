import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {getAuthAction} from '../../User/actions/AuthAction';

import {CheckBox, Layout} from '@ui-kitten/components';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

const ContigencyPlan = (props) => {
  const [state, setState] = React.useState({
    isDateTimePickerVisible: false,
    date: '',
  });
  const dispatch = useDispatch();

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
              <Text style={[styles.headerTitle]}>Contingency Plan Drill</Text>
            </View>
            <View>
              <View style={[styles.inputBoxStyle]}>
                <Picker
                  // selectedValue={state.userSelected}
                  style={[styles.selectBoxStyle]}
                  onValueChange={(item, itemIndex) => changeUser(item)}>
                  <Picker.Item label="Plans" value="" />
                  <Picker.Item label={'Officer'} value={1} key={1} />
                  <Picker.Item label={'Engineer'} value={2} key={2} />
                </Picker>
              </View>
              <View style={[styles.inputBoxStyle]}>
                <Picker
                  // selectedValue={state.userSelected}
                  style={[styles.selectBoxStyle]}
                  onValueChange={(item, itemIndex) => changeUser(item)}>
                  <Picker.Item label="Drill frequency in months" value="" />
                  <Picker.Item label={'Officer'} value={1} key={1} />
                  <Picker.Item label={'Engineer'} value={2} key={2} />
                </Picker>
              </View>
              <View style={[styles.inputBoxStyle]}>
                <Picker
                  // selectedValue={state.userSelected}
                  style={[styles.selectBoxStyle]}
                  onValueChange={(item, itemIndex) => changeUser(item)}>
                  <Picker.Item label="Year" value="" />
                  <Picker.Item label={'Officer'} value={1} key={1} />
                  <Picker.Item label={'Engineer'} value={2} key={2} />
                </Picker>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',

                  marginBottom: 20,
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '50%'}}>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}> January</Text>
                  </CheckBox>
                </View>
                <View style={{flexBasis: '50%'}}>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}>February</Text>
                  </CheckBox>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',

                  marginBottom: 20,
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '50%'}}>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}> March</Text>
                  </CheckBox>
                </View>
                <View style={{flexBasis: '50%'}}>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}>April</Text>
                  </CheckBox>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',

                  marginBottom: 20,
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '50%'}}>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}> May</Text>
                  </CheckBox>
                </View>
                <View style={{flexBasis: '50%'}}>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}>June</Text>
                  </CheckBox>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',

                  marginBottom: 20,
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '50%'}}>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}>July</Text>
                  </CheckBox>
                </View>
                <View style={{flexBasis: '50%'}}>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}>August</Text>
                  </CheckBox>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',

                  marginBottom: 20,
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '50%'}}>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}> September</Text>
                  </CheckBox>
                </View>
                <View style={{flexBasis: '50%'}}>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}>October</Text>
                  </CheckBox>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',

                  marginBottom: 20,
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '50%'}}>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}> November</Text>
                  </CheckBox>
                </View>
                <View style={{flexBasis: '50%'}}>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}>December</Text>
                  </CheckBox>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',

                  marginBottom: 20,
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '50%'}}>
                  <Text style={[styles.labelstyle]}>Approved By</Text>
                  <CheckBox
                    checked={activeChecked}
                    onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                    <Text style={styles.checkboxstyle}> D.P.A</Text>
                  </CheckBox>
                </View>
              </View>
              <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
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
  selectBoxStyle: {
    flex: 1,
    flexDirection: 'row',

    flexBasis: '100%',
    marginRight: 2,
    fontWeight: 'bold',
  },
  promotionstyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    paddingBottom: 15,
  },
  checkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 17,
    marginLeft: 3,
  },
  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 15,
  },

  imageButtonStyle: {
    backgroundColor: '#2ECBAD',
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 14,

    borderRadius: 50,
    borderColor: '#2ECBAD',

    borderWidth: 2,
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
  Cargotypestyle: {
    flex: 1,
    flexDirection: 'row',
  },
  Cargotypestyleone: {
    flexBasis: '100%',
    marginRight: 10,
  },
  inputBoxStyle: {
    fontSize: 16,
    borderRadius: 7,
    flexBasis: '48%',

    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',

    backgroundColor: '#F7F9FC',
    padding: 2,
    fontWeight: 'bold',
    marginRight: 10,
  },

  labelstyle: {
    fontSize: 18,

    paddingBottom: 20,
    fontWeight: '600',
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
export default ContigencyPlan;
