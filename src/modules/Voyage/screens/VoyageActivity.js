import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  Alert,
  // Input,
  multilineInputState,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {Input} from '@ui-kitten/components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

import Header from './../../Master/components/header/Header';
import {IappsNetInfo} from './../../Master/components/netInfo/IappsNetInfo';
import VoyageHeader from '../components/VoyageHeader';
import EngineerWorkStatus from '../components/EngineerWorkStatus';
import BunkerVlsfo from '../components/BunkerVlsfo';
import {
  getShipConditionType,
  createVoyageActivity,
  voyageWindDirection,
  voyageActivitybyDate,
} from '../actions/VoyageAction';

// const multilineInputState = useInputState();

const VoyageActivity = (props) => {
  let voyageData = props.route.params.voyageData;
  const [state, setState] = React.useState({
    UnloadedData: [],
    searchOrderList: [],
    searchRequestText: '',
    isDateTimePickerVisible: false,
    isEndDateTimePickerVisible: false,

    system_lang: 'bn',
    isModalVisible: false,
    refreshing: false,

    date: '',
    quantity: '0',
    purpose: '',

    warehouseListData: [],
    warehouseSelected: {},
    warehouseId: 0,
    warehouseName: '',

    itemTypeListData: [],
    itemTypeId: 0,
    itemTypeSelected: {},
    itemTypeName: '',

    itemListData: [],
    itemSelected: {},
    itemId: 0,
    itemName: '',

    departmentListData: [],
    deptId: 0,
    deptName: '',
    departmentSelected: {},
    multipleWarehouse: [],

    positionSelected: 1,

    userSelected: 1,

    timeAtPortHour: '',
    windDirection: '',
    windBF: 0,

    seaDirection: '',
    seaDSS: '',

    toBe: '',

    voyagePropsData: voyageData,
    shipConditionTypeListData: [],
    shipConditionTypeSelected: {},
    intShipConditionTypeId: 0,
    strShipConditionType: '',
    latitude: 0,
    longitude: 0,
    course: 0,
    streaming: '',
    isStreamingVisible: false,
    stoppage: '',
    isStoppageVisible: false,
    seaDistance: 0,
    dailySpeed: 0,
    generalSpeed: 0,
    portTo: '',
    etaTime: '',
    isEtaTimeVisible: false,
    remarks: '',
    strRPM: '',
    decEngineSpeed: 0,
    decSlip: 0,
    windDataList: [],
    intWindId: '',
    windSelected: {},
    seaDataList: [],
    seaSelected: {},
    intSeaId: '',
    isEtaDateTimePickerVisible: false,
    etadate: '',
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

  const getInitialData = async () => {
    let fullObjectData = {...state};
    const conditionTypeListData = await getShipConditionType();
    const windData = await voyageWindDirection();
    const voyageApiData = await voyageActivitybyDate(voyageData.intID);
    console.log('voyageApiData',voyageApiData.data);
    fullObjectData.shipConditionTypeListData = conditionTypeListData.data;
    fullObjectData.date = voyageApiData.data.dteCreatedAt;
    fullObjectData.latitude = voyageApiData.data.decLatitude;
    fullObjectData.longitude = voyageApiData.data.decLongitude;
    fullObjectData.course = voyageApiData.data.intCourse;
    fullObjectData.streaming = voyageApiData.data.timeSeaStreaming;
    fullObjectData.stoppage = voyageApiData.data.timeSeaStoppage;
    fullObjectData.seaDistance = voyageApiData.data.decSeaDistance;
    fullObjectData.dailySpeed = voyageApiData.data.decSeaDailyAvgSpeed;
    fullObjectData.generalSpeed = voyageApiData.data.decSeaGenAvgSpeed;
    fullObjectData.windBF = voyageApiData.data.decWindBF;
    fullObjectData.seaDSS = voyageApiData.data.strSeaState;
    fullObjectData.etadate = voyageApiData.data.strETADateTime;
    fullObjectData.etaTime = voyageApiData.data.strETDDateTime;
    fullObjectData.remarks = voyageApiData.data.strRemarks;
    fullObjectData.windDataList = windData.data;
    setState(fullObjectData);
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

  const showEtaDateTimePicker = () => {
    let cloneObj = {...state};
    cloneObj.isEtaDateTimePickerVisible = true;
    setState(cloneObj);
  };

  const EtahideDateTimePicker = () => {
    let cloneObj = {...state};
    cloneObj.isEtaDateTimePickerVisible = false;
    setState(cloneObj);
  };
  const hideDateTimePicker = () => {
    let cloneObj = {...state};
    cloneObj.isDateTimePickerVisible = false;
    setState(cloneObj);
  };

  const EtahandleDatePicked = (date) => {
    let cloneObj = {...state};
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    const monthString = month < 10 ? '0' + month : month;
    let fromDate = year + '-' + monthString + '-' + dateNow;
    cloneObj.etadate = fromDate;
    cloneObj.isEtaDateTimePickerVisible = false;
    setState(cloneObj);

    // setState({date: fromDate, isDateTimePickerVisible: false});
    // hideDateTimePicker();
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

  // const addMultipleWarehouse = () => {
  //   let cloneObj = { ...state };
  //   let validationCheck = storeValidation(state);

  //   if (validationCheck) {
  //     let item = {
  //       itemId: state.itemId,
  //       itemName: state.itemName,
  //       warehouseId: state.warehouseSelected,
  //       quantity: state.quantity,
  //       warehouseName: state.warehouseName,
  //       purpose: state.purpose,
  //       dueDate: state.date,
  //       deptId: state.deptId,
  //     };
  //     if (checkObjectInArray(item, state.multipleWarehouse, "itemId")) {
  //       Alert.alert("Error", "Please select another Item");
  //       return false;
  //     }
  //     cloneObj.multipleWarehouse.push(item);
  //     setState(cloneObj);

  //     if (state.multipleWarehouse.length > 0) {
  //       cloneObj.quantity = "0";
  //       cloneObj.itemName = "";
  //       cloneObj.itemTypeSelected = {};
  //       cloneObj.itemTypeName = "";
  //       cloneObj.itemSelected = {};
  //       cloneObj.departmentSelected = {};
  //       cloneObj.deptName = "";
  //       setState(cloneObj);
  //     }
  //   }
  // };

  const deleteItem = (item) => {
    let cloneObj = {...state};
    try {
      for (var i = 0; i < cloneObj.multipleWarehouse.length; i++) {
        if (cloneObj.multipleWarehouse[i] == item) {
          cloneObj.multipleWarehouse.splice(i, 1);
          setState(cloneObj);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log('state.userse', state.userSelected);

  const searchText = async (searchRequestText) => {
    let netStatus = await IappsNetInfo();

    if (state.warehouseName == '') {
      Alert.alert('Error', 'Please Select ware house');
      return false;
    }
    let cloneObj = {...state};
    if (searchRequestText.length > 0) {
      let getSearchValue = {};
      getSearchValue.data = [];

      if (!netStatus) {
        // getSearchValue.data = await itemSearchgetbyOffline(searchRequestText);
      } else {
        // getSearchValue = await getItemSearchList(
        //   state.warehouseId,
        //   searchRequestText
        // );
      }

      const newData = getSearchValue.data.filter(function (item) {
        const itemData = item.intItemID + ' ' + item.strItemFullName;
        const textData = searchRequestText.toUpperCase();
        return itemData.toUpperCase().indexOf(textData) > -1;
      });
      console.log('newData', newData);
      cloneObj.searchRequestText = searchRequestText;
      cloneObj.searchOrderList = newData;
      setState(cloneObj);
    } else {
      cloneObj.searchOrderList = state.LoadedData;
      cloneObj.searchRequestText = '';
      setState(cloneObj);
    }
  };
  const selectItem = async (item) => {
    let cloneObj = {...state};
    let itemId = item.intItemID;
    cloneObj.itemId = item.intItemID;
    (cloneObj.itemName = item.strItemFullName),
      (cloneObj.searchRequestText = item.strItemFullName),
      (cloneObj.searchOrderList = []),
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
    stateName == 'windBF' ? (cloneObj.windBF = inputValue) : 0;
    stateName == 'seaDirection' ? (cloneObj.seaDirection = inputValue) : '';
    stateName == 'seaDSS' ? (cloneObj.seaDSS = inputValue) : '';
    stateName == 'toBe' ? (cloneObj.toBe = inputValue) : '';
    stateName == 'latitude' ? (cloneObj.latitude = inputValue) : 0;
    stateName == 'longitude' ? (cloneObj.longitude = inputValue) : 0;
    stateName == 'course' ? (cloneObj.course = inputValue) : 0;
    stateName == 'seaDistance' ? (cloneObj.seaDistance = inputValue) : 0;
    stateName == 'dailySpeed' ? (cloneObj.dailySpeed = inputValue) : 0;
    stateName == 'generalSpeed' ? (cloneObj.generalSpeed = inputValue) : 0;
    stateName == 'portTo' ? (cloneObj.portTo = inputValue) : 0;
    stateName == 'remarks' ? (cloneObj.remarks = inputValue) : '';
    stateName == 'strRPM' ? (cloneObj.strRPM = inputValue) : '';
    stateName == 'decEngineSpeed' ? (cloneObj.decEngineSpeed = inputValue) : 0;
    stateName == 'decSlip' ? (cloneObj.decSlip = inputValue) : 0;
    setState(cloneObj);
  };

  const showStreaming = () => {
    let cloneObj = {...state};
    cloneObj.isStreamingVisible = true;
    setState(cloneObj);
  };

  const hideStreaming = () => {
    let cloneObj = {...state};
    cloneObj.isStreamingVisible = false;
    setState(cloneObj);
  };

  const handleStreaming = (time) => {
    let cloneObj = {...state};
    let hours = time.getHours();
    let miniutes = time.getMinutes();
    let endDate = hours + ':' + miniutes;
    cloneObj.streaming = endDate;
    cloneObj.isStreamingVisible = false;
    setState(cloneObj);
  };

  const showStoppage = () => {
    let cloneObj = {...state};
    cloneObj.isStoppageVisible = true;
    setState(cloneObj);
  };

  const hideStoppage = () => {
    let cloneObj = {...state};
    cloneObj.isStoppageVisible = false;
    setState(cloneObj);
  };

  const handleStoppage = (time) => {
    let cloneObj = {...state};
    let hours = time.getHours();
    let miniutes = time.getMinutes();
    let endDate = hours + ':' + miniutes;
    cloneObj.stoppage = endDate;
    cloneObj.isStoppageVisible = false;
    setState(cloneObj);
  };

  const showEtaTime = () => {
    let cloneObj = {...state};
    cloneObj.isEtaTimeVisible = true;
    setState(cloneObj);
  };

  const hideEtaTime = () => {
    let cloneObj = {...state};
    cloneObj.isEtaTimeVisible = false;
    setState(cloneObj);
  };

  const handleEtaTime = (time) => {
    let cloneObj = {...state};
    let hours = time.getHours();
    let miniutes = time.getMinutes();
    let endDate = hours + ':' + miniutes;
    cloneObj.etaTime = endDate;
    cloneObj.isEtaTimeVisible = false;
    setState(cloneObj);
    this.EndhideDateTimePicker();
  };

  const submit = async () => {
    // let netStatus = await IappsNetInfo();
    // if (!netStatus) {
    //   let offlineData = addSqliteStoreRequisition(state);
    // }

    if (state.date === '') {
      Alert.alert('Error', 'Please select date');
      return false;
    }
    if (state.intShipConditionTypeId === 0) {
      Alert.alert('Error', 'Please select ship condition type');
      return false;
    }
    if (state.latitude === 0) {
      Alert.alert('Error', 'Please give latitude');
      return false;
    }
    if (state.longitude === 0) {
      Alert.alert('Error', 'Please give longitude');
      return false;
    }
    if (state.course === 0) {
      Alert.alert('Error', 'Please give course');
      return false;
    }
    if (state.streaming === '') {
      Alert.alert('Error', 'Please give streaming');
      return false;
    }
    if (state.stoppage === '') {
      Alert.alert('Error', 'Please give stoppage');
      return false;
    }
    if (state.seaDistance === 0) {
      Alert.alert('Error', 'Please give sea distance');
      return false;
    }
    if (state.dailySpeed === 0) {
      Alert.alert('Error', 'Please give daily speed');
      return false;
    }
    if (state.generalSpeed === 0) {
      Alert.alert('Error', 'Please give general speed');
      return false;
    }
    // if (state.windDirection === '') {
    //   Alert.alert('Error', 'Please give wind direction');
    //   return false;
    // }
    if (state.windBF === 0) {
      Alert.alert('Error', 'Please give wind BF');
      return false;
    }
    // if (state.seaDirection === "") {
    //   Alert.alert("Error", "Please give sea direction");
    //   return false;
    // }
    // if (state.seaDSS === "") {
    //   Alert.alert("Error", "Please give sea DSS");
    //   return false;
    // }
    // if (state.portTo === '') {
    //   Alert.alert('Error', 'Please give port to');
    //   return false;
    // }
    if (state.etaTime === '') {
      Alert.alert('Error', 'Please give eta time');
      return false;
    }
    if (state.remarks === '') {
      Alert.alert('Error', 'Please give remarks');
      return false;
    }

    let response = await createVoyageActivity(state);

    if (response.status) {
      Alert.alert('Success', response.message);
      props.navigation.navigate('voyageList');
    } else {
      Alert.alert('Warning', 'Voyage Activity did not created successfully!');
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
              <View style={styles.innerAreaDiv}>
                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    selectedValue={state.userSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => changeUser(item)}>
                    <Picker.Item label="User type" value="" />
                    <Picker.Item label={'Officer'} value={1} key={1} />
                    <Picker.Item label={'Engineer'} value={2} key={2} />
                  </Picker>
                </View>

                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    selectedValue={state.positionSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => changePosition(item)}>
                    <Picker.Item label="Position" value="" />
                    <Picker.Item label={'Sea'} value={1} key={1} />
                    <Picker.Item label={'Port'} value={2} key={2} />
                  </Picker>
                </View>

                {/* <View
                  style={{
                    flexBasis: "48%",
                    borderBottomColor: "#D6D6D6",
                    borderBottomWidth: 1,
                    marginRight: 10,
                  }}
                >
                  <TouchableOpacity onPress={() => showDateTimePicker}>
                    <Text style={[styles.pikcerTitle]}> From </Text>
                    <Text style={[styles.dataPicker]}>{state.startDate}</Text>
                  </TouchableOpacity>
                  <DateTimePicker
                    isVisible={state.isDateTimePickerVisible}
                    onConfirm={(date) => handleDatePicked(date)}
                    onCancel={hideDateTimePicker}
                    datePickerModeAndroid={"spinner"}
                    mode={"date"}
                  />
                </View> */}

                <View style={[styles.inputBoxStyle]}>
                  <View style={{}}>
                    <TouchableOpacity onPress={showDateTimePicker}>
                      <View>
                        <Text style={{}}> Date </Text>
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
                {/*  */}

                {/*  */}

                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    selectedValue={state.shipConditionTypeSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => {
                      let fullObjectData = {...state};
                      fullObjectData.strShipConditionType =
                        item.strShipConditionType;
                      fullObjectData.intShipConditionTypeId = item.intID;
                      fullObjectData.shipConditionTypeSelected = item;
                      setState(fullObjectData);
                    }}>
                    <Picker.Item label="Condition" value="" />
                    {state.shipConditionTypeListData &&
                      state.shipConditionTypeListData.map((item, index) => (
                        <Picker.Item
                          label={item.strShipConditionType}
                          value={item}
                          key={index}
                        />
                      ))}
                  </Picker>
                </View>
                {state.userSelected == 2 && (
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <View style={{flexBasis: '100%'}}>
                        <TextInput
                          style={[styles.InputField]}
                          placeholder="R.P.M"
                          placeholderTextColor={'#000000'}
                          value={state.strRPM}
                          // onChangeText={(value) =>
                          //   handleInputChange("strRPM", value)
                          // }
                          onChangeText={(value) => changeInput(value, 'strRPM')}
                          keyboardType={'numeric'}
                        />
                      </View>
                    </View>
                  </View>
                )}
                {state.userSelected == 2 && (
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <View style={{flexBasis: '100%'}}>
                        <TextInput
                          style={[styles.InputField]}
                          placeholder="Engine Speed"
                          placeholderTextColor={'#000000'}
                          value={state.decEngineSpeed}
                          // onChangeText={(value) =>
                          //   handleInputChange("decEngineSpeed", value)
                          // }
                          onChangeText={(value) =>
                            changeInput(value, 'decEngineSpeed')
                          }
                          keyboardType={'numeric'}
                        />
                      </View>
                    </View>
                  </View>
                )}
                {state.userSelected == 2 && (
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <View style={{flexBasis: '100%'}}>
                        <TextInput
                          style={[styles.InputField]}
                          placeholder="Slip (%)"
                          placeholderTextColor={'#000000'}
                          value={state.decSlip}
                          // onChangeText={(value) =>
                          //   handleInputChange("decSlip", value)
                          // }
                          onChangeText={(value) =>
                            changeInput(value, 'decSlip')
                          }
                          keyboardType={'numeric'}
                        />
                      </View>
                    </View>
                  </View>
                )}

                {state.positionSelected == 2 && state.userSelected == 1 && (
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <View style={{flexBasis: '100%'}}>
                        <TextInput
                          style={[styles.InputField]}
                          placeholder="PORT Name"
                          min="0"
                          max="10"
                          placeholderTextColor={'#000000'}
                          value={state.purpose}
                          onChangeText={(value) => changePurpose(value)}
                        />
                      </View>
                    </View>
                  </View>
                )}

                {/* <View>
                  <Text style={[styles.labelstyleone]}>
                    Time at {state.positionSelected == 1 ? 'Sea' : 'Port'}
                  </Text>
                </View> */}

                {state.positionSelected == 2 && state.userSelected == 1 && (
                  <View>
                    <View>
                      <Text style={[styles.labelstyleone]}>Time at Port</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={{
                          flexBasis: '47%',
                          marginRight: 20,
                        }}>
                        <View style={[styles.inputBoxStyle]}>
                          <TextInput
                            style={[styles.InputField]}
                            placeholder="Working"
                            placeholderTextColor={'#000000'}
                            value={state.purpose}
                            onChangeText={(value) => changePurpose(value)}
                          />
                        </View>
                      </View>
                      <View style={{flexBasis: '47%'}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="Oh"
                              placeholderTextColor={'#000000'}
                              value={state.timeAtPortHour}
                              onChangeText={(value) =>
                                changeInput(value, 'timeAtPortHour')
                              }
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}

                {state.positionSelected == 1 && state.userSelected == 1 && (
                  <View>
                    {/* {state.positionSelected == 2 && ( */}
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flexBasis: '47%', marginRight: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <View style={{flexBasis: '100%'}}>
                              <TextInput
                                style={[styles.InputField]}
                                placeholder="LAT"
                                placeholderTextColor={'#000000'}
                                value={state.latitude}
                                onChangeText={(value) =>
                                  changeInput(value, 'latitude')
                                }
                                keyboardType={'numeric'}
                              />
                            </View>
                          </View>
                        </View>
                      </View>

                      {/* {state.positionSelected == 1 && ( */}

                      <View style={{flexBasis: '47%', marginLeft: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <View style={{flexBasis: '100%'}}>
                              <TextInput
                                style={[styles.InputField]}
                                placeholder="LONG"
                                placeholderTextColor={'#000000'}
                                value={state.longitude}
                                onChangeText={(value) =>
                                  changeInput(value, 'longitude')
                                }
                                keyboardType={'numeric'}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={[styles.inputBoxStyle]}>
                      <View>
                        <View style={{flexBasis: '100%'}}>
                          <TextInput
                            style={[styles.InputField]}
                            placeholder="Course(0-360)"
                            placeholderTextColor={'#000000'}
                            value={state.course}
                            onChangeText={(value) =>
                              changeInput(value, 'course')
                            }
                            keyboardType={'numeric'}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                )}

                {state.positionSelected == 1 && state.userSelected == 1 && (
                  <>
                    <View>
                      <Text style={[styles.labelstyleone]}>Time at Sea</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flexBasis: '47%', marginRight: 20}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View style={{}}>
                            <TouchableOpacity onPress={showStreaming}>
                              <View>
                                <Text style={{}}> Streaming </Text>
                                <Text>{state.streaming}</Text>
                                <Text
                                  title="Show Streaming"
                                  onPress={showStreaming}
                                />
                                <DateTimePicker
                                  isVisible={state.isStreamingVisible}
                                  onConfirm={handleStreaming}
                                  onCancel={hideStreaming}
                                  datePickerModeAndroid={'spinner'}
                                  mode={'time'}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      <View style={{flexBasis: '47%'}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View style={{}}>
                            <TouchableOpacity onPress={showStoppage}>
                              <View>
                                <Text style={{}}> Stoppage </Text>
                                <Text>{state.stoppage}</Text>
                                <Text
                                  title="Show Stoppage"
                                  onPress={showStoppage}
                                />
                                <DateTimePicker
                                  isVisible={state.isStoppageVisible}
                                  onConfirm={handleStoppage}
                                  onCancel={hideStoppage}
                                  datePickerModeAndroid={'spinner'}
                                  mode={'time'}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flexBasis: '30%', marginRight: 15}}>
                        <View style={[styles.inputBoxStyle]}>
                          <TextInput
                            style={[styles.InputField]}
                            placeholder="SEA DISTANCE"
                            placeholderTextColor={'#000000'}
                            value={state.seaDistance}
                            onChangeText={(value) =>
                              changeInput(value, 'seaDistance')
                            }
                            keyboardType={'numeric'}
                          />
                        </View>
                      </View>
                      <View style={{flexBasis: '30%', marginRight: 15}}>
                        <View style={[styles.inputBoxStyle]}>
                          <TextInput
                            style={[styles.InputField]}
                            placeholder="DAILY AVG SPEED(Auto)"
                            placeholderTextColor={'#000000'}
                            value={state.dailySpeed}
                            onChangeText={(value) =>
                              changeInput(value, 'dailySpeed')
                            }
                            keyboardType={'numeric'}
                          />
                        </View>
                      </View>
                      <View style={{flexBasis: '30%'}}>
                        <View style={[styles.inputBoxStyle]}>
                          <TextInput
                            style={[styles.InputField]}
                            placeholder="GENERAL AVG SPEED"
                            placeholderTextColor={'#000000'}
                            value={state.generalSpeed}
                            onChangeText={(value) =>
                              changeInput(value, 'generalSpeed')
                            }
                            keyboardType={'numeric'}
                          />
                        </View>
                      </View>
                    </View>
                  </>
                )}
                {state.positionSelected == 1 && state.userSelected == 1 && (
                  <>
                    <View>
                      <Text style={[styles.labelstyleone]}>Wind</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flexBasis: '47%', marginRight: 10}}>
                        {/* <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="Direction"
                              placeholderTextColor={'#000000'}
                              value={state.windDirection}
                              onChangeText={(value) =>
                                changeInput(value, 'windDirection')
                              }
                            />
                          </View>
                        </View> */}
                        <View style={[styles.inputBoxStyle]}>
                          <Picker
                            selectedValue={state.windSelected}
                            style={[styles.selectBoxStyle]}
                            onValueChange={(item, itemIndex) => {
                              let fullObjectData = {...state};
                              fullObjectData.strShipConditionType =
                                item.strShipConditionType;
                              fullObjectData.intWindId = item.id;
                              fullObjectData.windSelected = item;
                              setState(fullObjectData);
                            }}>
                            <Picker.Item label="Direction" value="" />
                            {state.windDataList &&
                              state.windDataList.map((item, index) => (
                                <Picker.Item
                                  label={item.name}
                                  value={item}
                                  key={index}
                                />
                              ))}
                          </Picker>
                        </View>
                      </View>

                      <View style={{flexBasis: '47%', marginLeft: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="BF (0-12)"
                              placeholderTextColor={'#000000'}
                              value={state.windBF}
                              onChangeText={(value) =>
                                changeInput(value, 'windBF')
                              }
                              keyboardType={'numeric'}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                )}
                {state.positionSelected == 1 && state.userSelected == 1 && (
                  <>
                    <View>
                      <Text style={[styles.labelstyleone]}>Sea</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flexBasis: '47%', marginRight: 10}}>
                        {/* <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="Direction"
                              placeholderTextColor={'#000000'}
                              value={state.purpose}
                              onChangeText={(value) => changePurpose(value)}
                            />
                          </View>
                        </View> */}
                        <View style={[styles.inputBoxStyle]}>
                          <Picker
                            selectedValue={state.seaSelected}
                            style={[styles.selectBoxStyle]}
                            onValueChange={(item, itemIndex) => {
                              let fullObjectData = {...state};
                              fullObjectData.strShipConditionType =
                                item.strShipConditionType;
                              fullObjectData.intSeaId = item.id;
                              fullObjectData.seaSelected = item;
                              setState(fullObjectData);
                            }}>
                            <Picker.Item label="Direction" value="" />
                            {state.windDataList &&
                              state.windDataList.map((item, index) => (
                                <Picker.Item
                                  label={item.name}
                                  value={item}
                                  key={index}
                                />
                              ))}
                          </Picker>
                        </View>
                      </View>

                      <View style={{flexBasis: '47%', marginLeft: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="Sea State (0-12)"
                              placeholderTextColor={'#000000'}
                              value={state.purpose}
                              onChangeText={(value) => changeInput(value, 'seaDSS')}
                              keyboardType={'numeric'}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                )}
                {state.positionSelected == 2 && (
                  <>
                    <View>
                      <Text style={[styles.labelstyleone]}>Sea</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flexBasis: '47%', marginRight: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="Direction"
                              placeholderTextColor={'#000000'}
                              value={state.seaDirection}
                              onChangeText={(value) =>
                                changeInput(value, 'seaDirection')
                              }
                            />
                          </View>
                        </View>
                      </View>

                      <View style={{flexBasis: '47%', marginLeft: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="DSS"
                              placeholderTextColor={'#000000'}
                              value={state.seaDSS}
                              onChangeText={(value) =>
                                changeInput(value, 'seaDSS')
                              }
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                )}
                {state.positionSelected == 1 && state.userSelected == 1 && (
                  <>
                    <View>
                      <Text style={[styles.labelstyleone]}> ETA</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flexBasis: '47%', marginRight: 10}}>
                        {/* <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="PORT TO"
                              placeholderTextColor={'#000000'}
                              value={state.portTo}
                              onChangeText={(value) =>
                                changeInput(value, 'portTo')
                              }
                            />
                          </View>
                        </View> */}
                        <View style={[styles.inputBoxStyle]}>
                          <View style={{}}>
                            <TouchableOpacity onPress={showEtaDateTimePicker}>
                              <View>
                                <Text style={{}}> Eta Date </Text>
                                <Text>{state.etadate}</Text>
                                <Text
                                  title="Show DatePicker"
                                  onPress={showEtaDateTimePicker}
                                />
                                <DateTimePicker
                                  isVisible={state.isEtaDateTimePickerVisible}
                                  onConfirm={EtahandleDatePicked}
                                  onCancel={EtahideDateTimePicker}
                                  datePickerModeAndroid={'spinner'}
                                  mode={'date'}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                      <View style={{flexBasis: '47%', marginLeft: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View style={{}}>
                            <TouchableOpacity onPress={showEtaTime}>
                              <View>
                                <Text style={{}}> Eta Time </Text>
                                <Text>{state.etaTime}</Text>
                                <Text
                                  title="Show EtaTime"
                                  onPress={showEtaTime}
                                />
                                <DateTimePicker
                                  isVisible={state.isEtaTimeVisible}
                                  onConfirm={handleEtaTime}
                                  onCancel={hideEtaTime}
                                  datePickerModeAndroid={'spinner'}
                                  mode={'time'}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                )}
                {state.positionSelected == 2 && (
                  <>
                    <View>
                      <Text style={[styles.labelstylefive]}>
                        Cargo Report for Last 24 Hrs
                      </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flexBasis: '30%', marginRight: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="To Be(L/D)"
                              placeholderTextColor={'#000000'}
                              value={state.toBe}
                              onChangeText={(value) =>
                                changeInput(value, 'toBe')
                              }
                            />
                          </View>
                        </View>
                      </View>

                      <View style={{flexBasis: '30%', marginLeft: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="Prev(L/D)"
                              placeholderTextColor={'#000000'}
                              value={state.purpose}
                              onChangeText={(value) => changePurpose(value)}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={{flexBasis: '30%', marginLeft: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="Daily(L/D)"
                              placeholderTextColor={'#000000'}
                              value={state.purpose}
                              onChangeText={(value) => changePurpose(value)}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flexBasis: '47%', marginRight: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="TTL(L/D)"
                              placeholderTextColor={'#000000'}
                              value={state.purpose}
                              onChangeText={(value) => changePurpose(value)}
                            />
                          </View>
                        </View>
                      </View>

                      <View style={{flexBasis: '47%', marginLeft: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="Balance CGO"
                              placeholderTextColor={'#000000'}
                              value={state.purpose}
                              onChangeText={(value) => changePurpose(value)}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                )}
                {state.positionSelected == 2 && (
                  <>
                    <View>
                      <Text style={[styles.labelstyleone]}>ETD</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flexBasis: '47%', marginRight: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="Port Name"
                              placeholderTextColor={'#000000'}
                              value={state.purpose}
                              onChangeText={(value) => changePurpose(value)}
                            />
                          </View>
                        </View>
                      </View>

                      <View style={{flexBasis: '47%', marginLeft: 10}}>
                        <View style={[styles.inputBoxStyle]}>
                          <View>
                            <TextInput
                              style={[styles.InputField]}
                              placeholder="Time"
                              placeholderTextColor={'#000000'}
                              value={state.purpose}
                              onChangeText={(value) => changePurpose(value)}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                )}
                {state.positionSelected == 1 && state.userSelected == 1 && (
                  <>
                    <View>
                      <View>
                        <Text style={[styles.labelstyle]}> Remarks</Text>
                      </View>

                      <View>
                        <View style={{flexBasis: '100%'}}>
                          <Input
                            multiline={true}
                            textStyle={{minHeight: 64}}
                            value={state.remarks}
                            placeholder="Type"
                            {...multilineInputState}
                            onChangeText={(value) =>
                              changeInput(value, 'remarks')
                            }
                          />
                        </View>
                      </View>
                    </View>
                  </>
                )}

                {/* {state.positionSelected == 2 && (
                  <BunkerVlsfo item={props.route.params.item} state={state} />
                )} */}

                {state.userSelected == 2 && (
                  <EngineerWorkStatus
                    gotoActivity={(routeName, state) =>
                      props.navigation.navigate(routeName, state)
                    }
                    enginnerData={state}
                  />
                )}
                {state.positionSelected == 2 && state.userSelected == 1 && (
                  <View>
                    <Text style={[styles.labelstyleThree]}>
                      Engine and Machine
                    </Text>
                  </View>
                )}
                {/* {state.positionSelected == 2 &&
                  state.userSelected == 1 &&
                  state.positionSelected == 1 && (
                    <> */}
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flexBasis: '47%',
                      marginLeft: 5,
                      marginRight: 5,
                    }}>
                    <View style={{marginTop: 10}}>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate('voyageList')}>
                        <Text style={styles.backButtonStyle}>Back</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {state.userSelected !== 2 ? (
                    <View style={{flexBasis: '47%', marginLeft: 5}}>
                      <View style={{marginTop: 10}}>
                        <TouchableOpacity onPress={() => submit()}>
                          <Text style={styles.buttonStyle}>Save</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
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
  container: {
    flex: 1,
    marginBottom: 10,
  },
  innerAreaDiv: {
    marginTop: -20,
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 5,
    padding: 8,
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    flexDirection: 'row',
    // alignItems: 'center',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  itemList: {
    flex: 1,
    flexBasis: '33%',
    // flexDirection: "row",
    // justifyContent: "space-between",
    width: wp('68%'),
  },
  iconsec: {
    flexDirection: 'row',
    width: wp('20%'),
  },
  topbar: {
    marginTop: -0,
    width: width,
    height: height / 4,
    resizeMode: 'contain',
  },
  postionbox: {
    position: 'relative',
  },
  headerDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  warehousemultiplesec: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },

  headerTitle: {
    color: '#fff',
    fontSize: RFPercentage(4),
    fontWeight: 'normal',
    paddingVertical: 10,
  },
  button: {
    borderRadius: 50,
    marginTop: 15,
  },
  icon: {
    width: 32,
    height: 32,
  },
  buttonss: {
    backgroundColor: '#19d4ee',
    borderColor: '#19d4ee',
    color: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 13,
    textAlign: 'center',
  },
  buttonActive: {
    backgroundColor: '#B3FFD6',
    borderColor: '#6df3bd',
    color: '#08a571',
    borderRadius: 6,
    paddingVertical: 3,
    textAlign: 'center',
  },
  buttondeActive: {
    backgroundColor: '#B32229',
    borderColor: '#6df3bd',
    color: '#fff',
    borderRadius: 6,
    paddingVertical: 3,
    textAlign: 'center',
  },
  activesizebutton: {
    width: wp('17%'),
    marginRight: 5,
  },
  penIcon: {
    padding: 5,
  },
  calendarImage: {
    width: 60,
    resizeMode: 'contain',
    height: 50,
    marginLeft: 275,
  },

  masterInput: {
    // flex: 1,
    // flexDirection: 'row',
    // backgroundColor: '#fff',
    // marginBottom: 10,
  },

  Vehicle: {
    color: '#000',
    borderRadius: 5,
  },
  buttonStyle: {
    backgroundColor: '#2A71E5',
    color: '#fff',
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 35,

    borderRadius: 10,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#147AD6',
  },
  selectBoxStyle: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 1,
    marginTop: 1,
    flexBasis: '100%',
    marginRight: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  inputLebel: {
    fontSize: RFPercentage(1.5),
    textAlign: 'left',
    color: '#000000',
    // fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  InputField: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'popppins',
    borderRadius: 0,
    paddingLeft: 5,
    paddingVertical: 12,
    borderBottomColor: '#000',
    borderBottomWidth: 0,
  },
  addSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 15,
  },
  addbutton: {
    padding: 10,
    backgroundColor: '#26C8A1',
    marginRight: 10,
    width: 100,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
    borderRadius: 50,
  },

  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  listLable: {
    fontSize: 16,
  },

  inputBoxStyletwo: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
    backgroundColor: '#F7F9FC',
    borderRadius: 7,
    paddingLeft: 10,
    height: 50,
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',

    fontSize: 14,
    marginLeft: 10,
  },
  listItemSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 20,
  },
  radioBoxStyle: {
    fontSize: 14,
    marginTop: 8,
  },
  multipleRowStyle: {
    marginTop: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#EAEAEA',
  },
  backButtonStyle: {
    backgroundColor: '#F3F6FA',
    color: '#213547',
    fontSize: RFPercentage(1.5),
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 35,
    textTransform: 'uppercase',
    borderRadius: 10,
    borderColor: '#88959F',
    fontWeight: 'bold',
    borderWidth: 2,
  },
  imageButtonStyle: {
    backgroundColor: '#2ECBAD',
    color: '#FFFFFF',
    fontSize: RFPercentage(1.5),
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 35,
    textTransform: 'uppercase',
    borderRadius: 50,
    borderColor: '#2ECBAD',
    fontWeight: 'bold',
    borderWidth: 2,
    padding: 10,
  },

  Lattext: {
    paddingLeft: 10,
  },
  BunkerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  singleBunkerStyle: {
    flexBasis: '33%',
  },
  //   direction: {
  //     // paddingLeft: 10,
  //     textAlign: 'center',
  //   },
  labelstyle: {
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  labelstyleThree: {
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '45%',
  },
  labelstylefive: {
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '65%',
  },
  labelstylefour: {
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '34%',
  },
  labelstyleone: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 7,
    fontWeight: 'bold',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.6,
    width: '30%',
  },
  inputBoxStyle: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
    backgroundColor: '#F7F9FC',
    borderRadius: 7,
    paddingLeft: 10,
  },
});
export default VoyageActivity;
