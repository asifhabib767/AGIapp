import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  // Input,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../Master/components/header/Header';
import {IappsNetInfo} from '../../Master/components/netInfo/IappsNetInfo';
import VoyageHeader from '../components/VoyageHeader';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '../../Master/styles/GlobalStyles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {FlatList} from 'react-native-gesture-handler';
import {boilerStore, checkBoilerValidation} from '../actions/BoilerAction';
import { Input } from '@ui-kitten/components';

const Boiler = (props) => {
  const [state, setState] = React.useState({
    isDateTimePickerVisible: false,
    isEndDateTimePickerVisible: false,
    voyagePropsData: props.route.params.voyagePropsData,
    boilerList: [],
    date: '',
    phvalue: '',
    chloride: '',
    alkanlinity: '',
    workingPressure: '',
    voyageListData: {},
    isLoading: false,
  });
  const isFocused = useIsFocused();

  const {navigate} = props.navigation;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('props', props);
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let cloneObj = {...state};
    cloneObj.voyageListData = props.route.params;
    setState(cloneObj);
  };

  const onRefresh = () => {
    getInitialData();
  };

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

  const changePurpose = (inputValue) => {
    let cloneObj = {...state};
    cloneObj.purpose = inputValue;
    setState(cloneObj);
  };

  const changeQuantity = (inputValue) => {
    let cloneObj = {...state};
    cloneObj.quantity = inputValue;
    setState(cloneObj);
  };

  const submit = async () => {

    let cloneObj = {...state};
    cloneObj.isLoading = true;
    setState(cloneObj);
    
    if (state.boilerList.length > 0) {
      let saveData = await boilerStore(state);
      console.log('saveData', saveData);
      console.log('saveData.data.status', saveData.data.status);
      if (saveData.data.status) {
        Alert.alert('Success', saveData.data.message);
        let cloneObj = {...state};
        cloneObj.isLoading =  response.isLoading;
        setState(cloneObj);
        props.navigation.navigate('voyageList');
      } else {
        Alert.alert('Error', saveData.data.message);
        let cloneObj = {...state};
        cloneObj.isLoading =  false;
        setState(cloneObj);
      }
    } else {
      Alert.alert('Error', 'Please click add Button to create Boiler');
      let cloneObj = {...state};
      cloneObj.isLoading =  false;
      setState(cloneObj);
    }

  };

  const addMultiple = async () => {
    let cloneObj = {...state};

    let validation = await checkBoilerValidation(state);

    console.log('validation', validation);

    if (validation) {
      let item = {
        decWorkingPressure: state.workingPressure,
        decPhValue: state.phvalue,
        decChloride: state.chloride,
        decAlkalinity: state.alkanlinity,
        date: state.date,
      };
      cloneObj.boilerList.push(item);
      setState(cloneObj);
      // state empty
      if (state.boilerList.length > 0) {
        let cloneObject = {...state};
        cloneObject.phvalue = '';
        cloneObject.chloride = '';
        cloneObject.alkanlinity = '';
        cloneObject.workingPressure = '';
        setState(cloneObject);
        console.log('state.boilerList.length', state);
      }
    }
  };

  const deleteItem = (item) => {
    let cloneObj = {...state};
    try {
      for (var i = 0; i < cloneObj.boilerList.length; i++) {
        if (cloneObj.boilerList[i] == item) {
          cloneObj.boilerList.splice(i, 1);
          setState(cloneObj);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (inputkey, inputValue) => {
    let cloneObj = {...state};
    cloneObj[inputkey] = inputValue;
    setState(cloneObj);
  };

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <ScrollView>
        <View>
          <Header title="Voyage Activity" />

          <View style={[styles.container]}>
            <VoyageHeader headerProps={state.voyagePropsData} />

            <View>
              <View>
                <Text style={[styles.labelstyletwo]}>BOILER</Text>
              </View>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flexBasis: '32%',
                    marginRight: 10,
                    marginLeft: 10,
                  }}>
                  <View>
                    <Text style={[styles.boilertextstyle]}>
                      Working{'   '} Pressure (BAR)
                    </Text>
                  </View>
                </View>

                <View style={{flexBasis: '62%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={20}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.workingPressure}
                        onChangeText={(value) =>
                          handleInputChange('workingPressure', value)
                        }

                        // value={state.purpose}
                        // onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  margin: 10,
                  borderRadius: 10,
                  marginBottom: 40,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                {/* <View style={[styles.inputBoxStyle]}>
                  <Picker
                    selectedValue={state.userSelected}
                    style={[styles.selectBoxStyle]}
                  >
                    <Picker.Item label="Date" value="" />
                    <Picker.Item
                      label={"Site Audit Checklist"}
                      value={1}
                      key={1}
                    />
                    <Picker.Item label={"Demo Audit"} value={2} key={2} />
                    <Picker.Item label={"Forklift Check"} value={3} key={3} />
                  </Picker>
                </View> */}
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flexBasis: '32%',
                      marginRight: 10,
                      marginLeft: 10,
                    }}>
                    <View>
                      <View>
                        <TextInput
                          placeholder="Date"
                          placeholderTextColor={'#000000'}
                          fontSize={16}
                          fontWeight={'bold'}
                          editable={false}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{flexBasis: '64%'}}>
                    <TouchableOpacity onPress={showDateTimePicker}>
                      <View>
                        <View style={[styles.inputBoxStyle]}>
                          {/* <Text style={[styles.inputLebel]}> Delivery Date </Text> */}
                          <View style={GlobalStyles.pickerItem}>
                            <Text style={[styles.inputLebel]}>
                              {state.date}
                            </Text>
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
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flexBasis: '32%',
                      marginRight: 10,
                      marginLeft: 10,
                    }}>
                    <View>
                      <View>
                        <TextInput
                          placeholder="PH Value"
                          placeholderTextColor={'#000000'}
                          fontSize={16}
                          fontWeight={'bold'}
                          editable={false}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{flexBasis: '64%'}}>
                    <View style={[styles.inputBoxStyle]}>
                      <View>
                        <TextInput
                          placeholder="0"
                          placeholderTextColor={'#000000'}
                          fontSize={20}
                          fontWeight={'bold'}
                          paddingLeft={10}
                          keyboardType="numeric"
                          value={state.phvalue}
                          onChangeText={(value) =>
                            handleInputChange('phvalue', value)
                          }
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flexBasis: '32%',
                      marginRight: 10,
                      marginLeft: 10,
                    }}>
                    <View>
                      <View>
                        <TextInput
                          placeholder="Chloride"
                          placeholderTextColor={'#000000'}
                          fontSize={16}
                          fontWeight={'bold'}
                          editable={false}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{flexBasis: '64%'}}>
                    <View style={[styles.inputBoxStyle]}>
                      <View>
                        <TextInput
                          placeholder="0"
                          placeholderTextColor={'#000000'}
                          fontSize={20}
                          fontWeight={'bold'}
                          paddingLeft={10}
                          keyboardType="numeric"
                          value={state.chloride}
                          onChangeText={(value) =>
                            handleInputChange('chloride', value)
                          }
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flexBasis: '32%',
                      marginRight: 10,
                      marginLeft: 10,
                    }}>
                    <View>
                      <TextInput
                        placeholder="Alkanlinity"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        editable={false}
                      />
                    </View>
                  </View>

                  <View style={{flexBasis: '64%'}}>
                    <View style={[styles.inputBoxStyle]}>
                      <View>
                        <TextInput
                          placeholder="0"
                          placeholderTextColor={'#000000'}
                          fontSize={20}
                          fontWeight={'bold'}
                          paddingLeft={10}
                          keyboardType="numeric"
                          value={state.alkanlinity}
                          onChangeText={(value) =>
                            handleInputChange('alkanlinity', value)
                          }

                          // value={state.purpose}
                          // onChangeText={(value) => changePurpose(value)}
                        />
                      </View>
                    </View>
                  </View>
                 

                  
                </View>
                <View style={{flexBasis: '100%'}}>
                  <Input
                      multiline={true}
                      textStyle={{minHeight: 64}}
                      value={state.strRemarks}
                      placeholder="Remarks"
                      onChangeText={(value) =>
                        handleInputChange('strRemarks', value)
                      }
                  />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flexBasis: '45%',
                      marginLeft: 15,
                      marginRight: 5,
                      marginTop: 10,
                      marginBottom: 40,
                    }}>
                    </View>

                  <View style={{flexBasis: '45%', marginLeft: 5}}>
                    <View style={{marginTop: 20, marginBottom: 40}}>
                      <TouchableOpacity onPress={() => addMultiple()}>
                        <Text style={styles.addbuttonStyle}>
                          <Icon name="plus" size={20} color="#fff" /> Add
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              {state.boilerList.length > 0 ? (
                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      borderBottomColor: '#ADADADrr',
                      borderBottomWidth: 2,
                      width: '90%',
                      marginLeft: 20,
                      paddingBottom: 13,
                    }}>
                    <View style={{flexBasis: '30%'}}>
                      <View>
                        <Text style={[styles.textstyle]}>Date</Text>
                        {/* // value={state.purpose}
                      // onChangeText={(value) => changePurpose(value)} */}
                      </View>
                    </View>

                    <View style={{flexBasis: '20%'}}>
                      <View>
                        <Text style={[styles.textstyle]}>PH</Text>
                        {/* // value={state.purpose}
                      // onChangeText={(value) => changePurpose(value)} */}
                      </View>
                    </View>
                    <View style={{flexBasis: '20%'}}>
                      <View>
                        <Text style={[styles.textstyle]}>Chlo</Text>
                        {/* // value={state.purpose}
                      // onChangeText={(value) => changePurpose(value)} */}
                      </View>
                    </View>
                    <View style={{flexBasis: '15%'}}>
                      <View>
                        <Text style={[styles.textstyle]}>Alka</Text>
                        {/* // value={state.purpose}
                      // onChangeText={(value) => changePurpose(value)} */}
                      </View>
                    </View>
                    <View style={{flexBasis: '15%', marginRight: 15}}></View>
                  </View>
                  <FlatList
                    data={state.boilerList}
                    renderItem={({item, index, separators}) => (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          paddingTop: 13,
                          marginRight: 10,
                          paddingRight: 10,
                          width: '92%',
                          borderBottomColor: '#EEEEEE',
                          borderBottomWidth: 1,
                          marginLeft: 20,
                          paddingBottom: 6,
                        }}>
                        <View style={{flexBasis: '30%'}}>
                          <View>
                            <Text style={[styles.textstyleone]}>
                              {item.date}
                            </Text>
                          </View>
                        </View>

                        <View style={{flexBasis: '20%'}}>
                          <View>
                            <Text style={[styles.textstyleone]}>
                              {item.decPhValue}
                            </Text>
                          </View>
                        </View>
                        <View style={{flexBasis: '20%'}}>
                          <View>
                            <Text style={[styles.textstyleone]}>
                              {item.decChloride}
                            </Text>
                          </View>
                        </View>
                        <View style={{flexBasis: '15%'}}>
                          <View>
                            <Text style={[styles.textstyleone]}>
                              {item.decAlkalinity}
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity onPress={() => deleteItem(item)}>
                          <View
                            style={{
                              // flexBasis: '15%',
                              marginRight: 45,
                              marginLeft: 0,
                              backgroundColor: '#F3F6F9',
                              padding: 10,
                              width: 35,
                              height: 35,
                              borderRadius: 5,
                            }}>
                            <Icon
                              name="trash"
                              size={18}
                              marginLeft={5}
                              color={'#3366FF'}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
              ) : null}
              

              {/*  */}

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flexBasis: '45%',
                    marginLeft: 15,
                    marginRight: 5,
                    marginTop: 10,
                    marginBottom: 40,
                  }}>
                  <View style={{marginTop: 10}}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('voyageActivity')
                      }>
                      <Text style={styles.backButtonStyle}>Back</Text>
                    </TouchableOpacity>
                  </View>
                </View>


                <View style={{flexBasis: '47%', marginLeft: 5}}>
                    <View style={{marginTop: 10}}>
                      {!this.state.isLoading && (
                        <TouchableOpacity onPress={() => this.submitVlsfo()}>
                          <Text style={[styles.buttonStyle]}> Save </Text>
                        </TouchableOpacity>
                      )}
                      {this.state.isLoading && (
                        <Text style={[styles.buttonStyle]}> Saving... </Text>
                      )}
                    </View>
                  </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  enginetextstyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingLeft: 10,
    marginLeft: 15,
  },
  container: {
    backgroundColor: '#fff',
  },
  enginetextstyleone: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingLeft: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '92%',
    marginLeft: 15,
    paddingBottom: 10,
  },

  inputBoxStyle: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#ddd',

    backgroundColor: '#F7F9FC',
    borderRadius: 7,
    marginRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  labelstyletwo: {
    fontWeight: 'bold',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 10,
    width: '32%',
    marginLeft: 15,
    marginBottom: 20,
  },
  backButtonStyle: {
    backgroundColor: '#FFF',
    color: '#213547',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 18,
    borderRadius: 10,
    borderColor: '#88959F',
    fontWeight: 'bold',
    borderWidth: 2,
  },
  buttonStyle: {
    backgroundColor: '#2A71E5',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 18,
    paddingHorizontal: 35,

    borderRadius: 10,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#147AD6',
  },
  labelstylethree: {
    fontWeight: 'bold',
    fontSize: 18,

    marginLeft: 15,
    marginBottom: 10,
  },
  boilertextstyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  addbuttonStyle: {
    backgroundColor: '#2dc48d',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 35,

    borderRadius: 50,
    fontWeight: 'bold',
  },
  serviceTypeStyle: {
    flexBasis: '25%',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  serviceTypeStyleone: {
    flexBasis: '20%',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textstyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textstyleone: {
    fontSize: 18,
  },
});
export default Boiler;
