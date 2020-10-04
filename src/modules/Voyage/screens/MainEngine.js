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

import Header from './../../Master/components/header/Header';
import {IappsNetInfo} from './../../Master/components/netInfo/IappsNetInfo';

import VoyageHeader from '../components/VoyageHeader';
import {mainEngineSubmit} from '../actions/MainEngineAction';
import { Input } from '@ui-kitten/components';

const MainEngine = (props) => {
  const [state, setState] = React.useState({
    system_lang: 'bn',
    refreshing: false,
    dceJacketTemp1: 0,
    dceJacketTemp2: 0,
    dcePistonTemp1: 0,
    dcePistonTemp2: 0,
    dceExhtTemp1: 0,
    dceExhtTemp2: 0,
    dceScavTemp1: 0,
    dceScavTemp2: 0,
    dceTurboCharger1Temp1: 0,
    dceTurboCharger1Temp2: 0,
    dceEngineLoad: 0,
    dceJacketCoolingTemp1: 0,
    dcePistonCoolingTemp1: 0,
    dceLubOilCoolingTemp1: 0,
    dceFuelCoolingTemp1: 0,
    dceScavCoolingTemp1: 0,
    strRemarks:'',
    isLoading:false,

    voyagePropsData: props.route.params.voyagePropsData,
  });
  const isFocused = useIsFocused();

  const {navigate} = props.navigation;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await getInitialData();
    }
    fetchData();
  }, []);

  const gotoActivity = (routeName) => {
    props.navigation.navigate(routeName);
  };

  const getInitialData = async () => {
    // const warehouseListData = await getWarehouseByUnitId();
    // let unitId = await getUnit();
    // let actionId = await getUserId();
    // const warehouseListData = await getWarehouseByEmployeeId();
    // const itemTypeListData = await getItemTypeList();
    // const itemListData = await getItemListByUnitId();
    // const departmentListData = await getDepartmentList();
    // let fullObjectData = { ...state };
    // fullObjectData.itemTypeListData = itemTypeListData.data;
    // fullObjectData.itemListData = itemListData.data;
    // fullObjectData.departmentListData = departmentListData.data;
    // fullObjectData.warehouseListData = warehouseListData.data;
    // fullObjectData.unitId = unitId;
    // fullObjectData.actionId = actionId;
    // setState(fullObjectData);
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

  const handleInputChange = (inputkey, inputValue) => {
    let cloneObj = {...state};
    cloneObj[inputkey] = inputValue;
    setState(cloneObj);
  };

  const changeQuantity = (inputValue) => {
    let cloneObj = {...state};
    cloneObj.quantity = inputValue;
    setState(cloneObj);
  };

  const changePosition = (item) => {
    let fullObjectData = {...state};
    fullObjectData.positionSelected = item;
    setState(fullObjectData);
  };
  const changeUser = (item) => {
    let fullObjectData = {...state};
    fullObjectData.userSelected = item;
    setState(fullObjectData);
  };

  const changeInput = (inputValue, stateName) => {
    let cloneObj = {...state};
    cloneObj.stateName = inputValue;
    stateName == 'timeAtPortHour' ? (cloneObj.timeAtPortHour = inputValue) : '';
    stateName == 'windDirection' ? (cloneObj.windDirection = inputValue) : '';
    stateName == 'windBF' ? (cloneObj.windBF = inputValue) : '';
    stateName == 'seaDirection' ? (cloneObj.seaDirection = inputValue) : '';
    stateName == 'seaDSS' ? (cloneObj.seaDSS = inputValue) : '';
    stateName == 'toBe' ? (cloneObj.toBe = inputValue) : '';
    setState(cloneObj);
  };

  const submit = async () => {
    if (state.dceJacketTemp1 === 0) {
      Alert.alert('Warning', 'Please give Jacket Temp1');
      return false;
    }
    if (state.dceJacketTemp2 === 0) {
      Alert.alert('Warning', 'Please give Jacket Temp2');
      return false;
    }
    if (state.dcePistonTemp1 === 0) {
      Alert.alert('Warning', 'Please give Piston Temp1');
      return false;
    }
    if (state.dcePistonTemp2 === 0) {
      Alert.alert('Warning', 'Please give Piston Temp2');
      return false;
    }
    if (state.dceExhtTemp1 === 0) {
      Alert.alert('Warning', 'Please give Exht Temp1');
      return false;
    }
    if (state.dceExhtTemp2 === 0) {
      Alert.alert('Warning', 'Please give Exht Temp2');
      return false;
    }
    if (state.dceScavTemp1 === 0) {
      Alert.alert('Warning', 'Please give Scav Temp1');
      return false;
    }
    if (state.dceScavTemp2 === 0) {
      Alert.alert('Warning', 'Please give Scav Temp2');
      return false;
    }
    if (state.dceTurboCharger1Temp1 === 0) {
      Alert.alert('Warning', 'Please give TurboCharger1 Temp1');
      return false;
    }
    if (state.dceTurboCharger1Temp2 === 0) {
      Alert.alert('Warning', 'Please give TurboCharger1 Temp2');
      return false;
    }
    if (state.dceEngineLoad === 0) {
      Alert.alert('Warning', 'Please give EngineLoad');
      return false;
    }
    if (state.dceJacketCoolingTemp1 === 0) {
      Alert.alert('Warning', 'Please give JacketCooling Temp1');
      return false;
    }
    if (state.dcePistonCoolingTemp1 === 0) {
      Alert.alert('Warning', 'Please give PistonCooling Temp1');
      return false;
    }
    if (state.dceLubOilCoolingTemp1 === 0) {
      Alert.alert('Warning', 'Please give LubOilCooling Temp1');
      return false;
    }
    if (state.dceFuelCoolingTemp1 === 0) {
      Alert.alert('Warning', 'Please give FuelCooling Temp1');
      return false;
    }
    if (state.dceScavCoolingTemp1 === 0) {
      Alert.alert('Warning', 'Please give ScavCooling Temp1');
      return false;
    }
    let cloneObj = {...state};
    cloneObj.isLoading = true;
    setState(cloneObj);

    let response = await mainEngineSubmit(props.route.params, state);
    console.log('response',response);
    if (response.status) {
      Alert.alert('Success', response.data.message);
      let cloneObj = {...state};
      cloneObj.isLoading =  response.isLoading;
      setState(cloneObj);
      props.navigation.navigate('voyageActivity');
    } else {
      Alert.alert('Warning', 'Something is wrong. Please try again.');
      let cloneObj = {...state};
      cloneObj.isLoading =  false;
      setState(cloneObj);
    }
  };

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <ScrollView>
        <View>
          <Header title="Main Engine" />

          <View style={[styles.container]}>
            <VoyageHeader headerProps={state.voyagePropsData} />
            <View>
              <Text style={[styles.enginetextstyle]}>Engine and Machine</Text>
              <Text style={[styles.enginetextstyleone]}>
                MAIN ENGINE (TEMPERATURE)
              </Text>
            </View>
            <View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '30%', marginRight: 10}}>
                  <View>
                    <View>
                      {/* <TextInput
                        placeholderTextColor={"#000000"}
                        value={state.dceExhtTemp1}
                        onChangeText={(value) =>
                          handleInputChange("dceExhtTemp2", value)
                        }
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '30%', marginLeft: 10}}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#599172',
                            fontSize: 20,
                            fontWeight: 'bold',
                          },
                        ]}>
                        IN
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="IN"
                        placeholderTextColor={"#599172"}
                        fontSize={20}
                        fontWeight={"bold"}
                        value={state.dceExhtTemp1}
                        onChangeText={(value) =>
                          handleInputChange("dceExhtTemp2", value)
                        }
                      /> */}
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '30%', marginLeft: 10}}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#eb746c',
                            fontSize: 20,
                            fontWeight: 'bold',
                          },
                        ]}>
                        OUT
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitleone]}
                        placeholder="OUT"
                        placeholderTextColor={"#eb746c"}
                        fontSize={20}
                        fontWeight={"bold"}
                        value={state.dceExhtTemp1}
                        onChangeText={(value) =>
                          handleInputChange("dceExhtTemp2", value)
                        }
                      /> */}
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{flexBasis: '30%', marginRight: 10, marginLeft: 10}}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                          },
                        ]}>
                        Jacket (°C)
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="Jacket"
                        placeholderTextColor={"#000000"}
                        fontSize={16}
                        fontWeight={"bold"}
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '32%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceJacketTemp1}
                        onChangeText={(value) =>
                          handleInputChange('dceJacketTemp1', value)
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '32%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceJacketTemp2}
                        onChangeText={(value) =>
                          handleInputChange('dceJacketTemp2', value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{flexBasis: '30%', marginRight: 10, marginLeft: 10}}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                          },
                        ]}>
                        Piston (°C)
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="Piston"
                        placeholderTextColor={"#000000"}
                        fontSize={16}
                        fontWeight={"bold"}
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '32%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dcePistonTemp1}
                        onChangeText={(value) =>
                          handleInputChange('dcePistonTemp1', value)
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '32%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dcePistonTemp2}
                        onChangeText={(value) =>
                          handleInputChange('dcePistonTemp2', value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{flexBasis: '30%', marginRight: 10, marginLeft: 10}}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                          },
                        ]}>
                        Exht.(°C)
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="Exht."
                        placeholderTextColor={"#000000"}
                        fontSize={16}
                        fontWeight={"bold"}
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '32%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="MIN"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceExhtTemp1}
                        onChangeText={(value) =>
                          handleInputChange('dceExhtTemp1', value)
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '32%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="MAX"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceExhtTemp2}
                        onChangeText={(value) =>
                          handleInputChange('dceExhtTemp2', value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{flexBasis: '30%', marginRight: 10, marginLeft: 10}}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                          },
                        ]}>
                        SCAV (°C)
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="SCAV"
                        placeholderTextColor={"#000000"}
                        fontSize={16}
                        fontWeight={"bold"}
                        value={state.dceExhtTemp1}
                        onChangeText={(value) =>
                          handleInputChange("dceExhtTemp2", value)
                        }
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '32%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceScavTemp1}
                        onChangeText={(value) =>
                          handleInputChange('dceScavTemp1', value)
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '32%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={16}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceScavTemp2}
                        onChangeText={(value) =>
                          handleInputChange('dceScavTemp2', value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{flexBasis: '30%', marginRight: 10, marginLeft: 10}}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                          },
                        ]}>
                        Turbo Charger 1 (°C)
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="Turbo Charger 1"
                        placeholderTextColor={"#000000"}
                        fontSize={16}
                        fontWeight={"bold"}
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '32%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={20}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceTurboCharger1Temp1}
                        onChangeText={(value) =>
                          handleInputChange('dceTurboCharger1Temp1', value)
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '32%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={20}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceTurboCharger1Temp2}
                        onChangeText={(value) =>
                          handleInputChange('dceTurboCharger1Temp2', value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{flexBasis: '30%', marginRight: 10, marginLeft: 10}}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                          },
                        ]}>
                        Turbo Charger 2 (°C)
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="Turbo Charger 2"
                        placeholderTextColor={"#000000"}
                        fontSize={16}
                        fontWeight={"bold"}
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '32%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={20}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceTurboCharger2Temp1}
                        onChangeText={(value) =>
                          handleInputChange('dceTurboCharger2Temp1', value)
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '32%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={20}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceTurboCharger2Temp2}
                        onChangeText={(value) =>
                          handleInputChange('dceTurboCharger2Temp2', value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{flexBasis: '43%', marginRight: 10, marginLeft: 10}}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                          },
                        ]}>
                        Main Engine Load (KW) (°C)
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="Main Engine Load (KW)"
                        placeholderTextColor={"#000000"}
                        fontSize={16}
                        fontWeight={"bold"}
                        value={state.dceTurboCharger1Temp2}
                        onChangeText={(value) =>
                          handleInputChange("dceTurboCharger1Temp2", value)
                        }
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '52%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={20}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceEngineLoad}
                        onChangeText={(value) =>
                          handleInputChange('dceEngineLoad', value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <Text style={[styles.labelstyletwo]}>
                  MAIN ENGINE (PRESSURE)
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flexBasis: '30%',
                    marginRight: 10,
                    marginLeft: 10,
                  }}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                          },
                        ]}>
                        Jacket Cooling
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="Jacket Cooling"
                        placeholderTextColor={"#000000"}
                        fontSize={16}
                        fontWeight={"bold"}
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '40%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={20}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceJacketCoolingTemp1}
                        onChangeText={(value) =>
                          handleInputChange('dceJacketCoolingTemp1', value)
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '20%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <Text style={([styles.InputField], {padding: 15})}>
                        Bar
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flexBasis: '30%',
                    marginRight: 10,
                    marginLeft: 10,
                  }}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                          },
                        ]}>
                        Piston Cooling
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="Piston Cooling"
                        placeholderTextColor={"#000000"}
                        fontSize={16}
                        fontWeight={"bold"}
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '40%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={20}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dcePistonCoolingTemp1}
                        onChangeText={(value) =>
                          handleInputChange('dcePistonCoolingTemp1', value)
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '20%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <Text style={([styles.InputField], {padding: 15})}>
                        Bar
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flexBasis: '30%',
                    marginRight: 10,
                    marginLeft: 10,
                  }}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                          },
                        ]}>
                        Lub Oil
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="Lub Oil"
                        placeholderTextColor={"#000000"}
                        fontSize={16}
                        fontWeight={"bold"}
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '40%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={20}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceLubOilCoolingTemp1}
                        onChangeText={(value) =>
                          handleInputChange('dceLubOilCoolingTemp1', value)
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '20%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <Text style={([styles.InputField], {padding: 15})}>
                        Bar
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flexBasis: '30%',
                    marginRight: 10,
                    marginLeft: 10,
                  }}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                          },
                        ]}>
                        Fuel
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="Fuel"
                        placeholderTextColor={"#000000"}
                        fontSize={16}
                        fontWeight={"bold"}
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '40%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={20}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceFuelCoolingTemp1}
                        onChangeText={(value) =>
                          handleInputChange('dceFuelCoolingTemp1', value)
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '20%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <Text style={([styles.InputField], {padding: 15})}>
                        Bar
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flexBasis: '30%',
                    marginRight: 10,
                    marginLeft: 10,
                  }}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                          },
                        ]}>
                        SCAV
                      </Text>
                      {/* <TextInput
                        style={[styles.Inputtitle]}
                        placeholder="SCAV"
                        placeholderTextColor={"#000000"}
                        fontSize={16}
                        fontWeight={"bold"}
                      /> */}
                    </View>
                  </View>
                </View>

                <View style={{flexBasis: '40%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="0"
                        placeholderTextColor={'#000000'}
                        fontSize={20}
                        fontWeight={'bold'}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceScavCoolingTemp1}
                        onChangeText={(value) =>
                          handleInputChange('dceScavCoolingTemp1', value)
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '20%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <Text style={([styles.InputField], {padding: 15})}>
                        Bar
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
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
                  <View style={{marginTop: 10}}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('voyageActivity')
                      }>
                      <Text style={styles.backButtonStyle}>Back</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* <View style={{flexBasis: '45%', marginLeft: 5}}>
                  <View style={{marginTop: 20, marginBottom: 40}}>
                    <TouchableOpacity onPress={() => submit()}>
                      <Text style={styles.buttonStyle}>Save</Text>
                    </TouchableOpacity>
                    {state.isLoading && (
                  <Text style={[styles.buttonStyle]}> Saving... </Text>
                )}
                  </View>
                </View> */}

                <View style={{flexBasis: '47%', marginLeft: 5}}>
                    <View style={{marginTop: 10}}>
                      {!state.isLoading && (
                        <TouchableOpacity onPress={() => submit()}>
                          <Text style={[styles.buttonStyle]}> Add </Text>
                        </TouchableOpacity>
                      )}
                      {state.isLoading && (
                        <Text style={[styles.buttonStyle]}> Adding... </Text>
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
    // paddingTop: 0,
    // paddingBottom: 0,
    backgroundColor: '#F7F9FC',
    borderRadius: 7,
    marginRight: 10,
    paddingLeft: 10,
    marginBottom: 7,
  },
  labelstyletwo: {
    fontWeight: 'bold',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 10,
    width: '92%',
    marginLeft: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  backButtonStyle: {
    backgroundColor: '#F3F6FA',
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
});
export default MainEngine;
