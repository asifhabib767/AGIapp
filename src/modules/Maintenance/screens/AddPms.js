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
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
// import {
//   getWarehouseByUnitId,
//   getItemTypeList,
//   getItemListByUnitId,
//   getDepartmentList,
//   AddStoreRequisitionAction,
//   getAssetListByJobStationearchList,
//   getWarehouseByEmployeeId,
// } from "../../actions/StoreRequisition/StoreRequisitionAction";
import {
  getAssetListByJobStation,
  getWarehouseList,
  getServiceNameListByWareHouse,
  getItemList,
  getPersonsList,
} from '../service/maintenance/MaintenanceService';
import {FlatList} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
// import storeValidation from "../../validation/StoreValidation";
import {checkObjectInArray} from './../../Master/Util/Helper';
import {getFormattedCurrentDate} from './../../Master/Util/DateConfigure';
import Header from './../../Master/components/header/Header';
import {IappsNetInfo} from './../../Master/components/netInfo/IappsNetInfo';
// import { addSqliteStoreRequisition } from "../../offLineData/SqliteAddStoreRequisition";
import {getUnit} from '../../Sales/service/auth/AuthService';
import {getUserId} from '../../User/util/AuthData';
// import { itemSearchgetbyOffline } from "../../offLineData/ItemOffline";
import {Radio, RadioGroup} from '@ui-kitten/components';
import {
  maintenanceValidation,
  submitMaintananceAction,
  getEmployeePersonal,
} from '../actions/MaintananceAction';
import {
  getMaintenanceWHList,
  getWarehouseByEmployeeId,
} from '../../Inventory/actions/StoreRequisition/StoreRequisitionAction';

const AddPms = (props) => {
  const [state, setState] = React.useState({
    system_lang: 'bn',
    isModalVisible: false,
    refreshing: false,
    isDateTimePickerVisible: false,
    isToDateTimePickerVisible: false,
    isDateTimePickerVisibleNext: false,
    date: '' + getFormattedCurrentDate(),
    nextMaintenanceDate: '' + getFormattedCurrentDate(),
    quantity: '0',
    remarks: '',
    strAssetID: '',

    warehouseListData: [],
    warehouseSelected: {},
    warehouseId: 0,
    warehouseName: '',

    personListData: [],
    selectedPersonListData: [],
    personId: 0,
    personSelected: {},
    personName: '',

    assetListData: [],
    assetSelected: {},
    assetId: 0,
    assetName: '',

    itemListData: [],
    selectedItemListData: [],
    itemSelected: {},

    itemId: 0,
    itemName: '',
    intJobStationId: '',

    serviceListData: [],
    serviceSelected: {},
    serviceId: 0,
    serviceName: '',

    departmentListData: [],
    deptId: 0,
    deptName: '',
    departmentSelected: {},
    multipleWarehouse: [],
    maintenanceTypeValue: 0,
    isLoading: false,
  });
  const isFocused = useIsFocused();

  const {navigate} = props.navigation;
  const dispatch = useDispatch();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    // const warehouseListData = await getWarehouseList();
    // const warehouseListData = await getWarehouseByEmployeeId();
    const warehouseListData = await getMaintenanceWHList();
    const personListData = await getEmployeePersonal();
    console.log('personListData', personListData);
    // const personListData = await getPersonsList();

    let fullObjectData = {...state};
    // fullObjectData.assetListData = assetListData;

    fullObjectData.warehouseListData = warehouseListData.data;
    fullObjectData.personListData = personListData.data.data;
    setState(fullObjectData);
  };

  const onRefresh = () => {
    getInitialData();
  };

  const showDateTimePicker = () => {
    let cloneObj = {...state};
    cloneObj.isDateTimePickerVisible = true;
    setState(cloneObj);
  };

  const showDateTimePickerNext = () => {
    let cloneObj = {...state};
    cloneObj.isDateTimePickerVisibleNext = true;
    setState(cloneObj);
  };

  const hideDateTimePicker = () => {
    let cloneObj = {...state};
    cloneObj.isDateTimePickerVisible = false;
    setState(cloneObj);
  };

  const hideDateTimePickerNext = () => {
    let cloneObj = {...state};
    cloneObj.isDateTimePickerVisibleNext = false;
    setState(cloneObj);
  };

  const changeRemarks = (inputValue) => {
    let cloneObj = {...state};
    cloneObj.remarks = inputValue;
    setState(cloneObj);
  };

  const changeQuantity = (inputValue) => {
    let cloneObj = {...state};
    cloneObj.quantity = inputValue;
    setState(cloneObj);
  };

  const changePersonQty = (inputValue) => {
    console.log('inputValue', inputValue);
    let cloneObj = {...state};
    cloneObj.personQty = inputValue;
    setState(cloneObj);
  };

  const deleteItem = (item) => {
    let cloneObj = {...state};
    try {
      for (var i = 0; i < cloneObj.selectedItemListData.length; i++) {
        if (cloneObj.selectedItemListData[i] == item) {
          cloneObj.selectedItemListData.splice(i, 1);
          setState(cloneObj);
        }
      }
    } catch (error) {
      console.log(error);
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

  const changeMaintenanceValue = async (key) => {
    let fullObjectData = {...state};
    const serviceListgetData = await getItemList(key, state.intJobStationId);
    fullObjectData.maintenanceTypeValue = key;

    // fullObjectData.itemListData = itemListData;
    fullObjectData.serviceListData = serviceListgetData;
    setState(fullObjectData);
  };

  const addSelectedItems = async (item) => {
    let validationCheck = await maintenanceValidation(state);
    let cloneObj = {...state};
    if (validationCheck) {
      let itemData = {
        strAssetNumber: state.assetSelected.strAssetID,
        itemid: parseInt(state.itemId),
        qnt: parseInt(state.quantity),
        siteaudichecktype: 0,
        employeeid: await getUserId(),
        ysnProcess: true,
        itemName: state.itemName,
      };
      if (checkObjectInArray(itemData, state.selectedItemListData, 'itemid')) {
        Alert.alert('Error', 'Please select another Item');
        return false;
      }
      cloneObj.selectedItemListData.push(itemData);
      setState(cloneObj);
      if (state.selectedItemListData.length > 0) {
        let cloneObj = {...state};
        cloneObj.quantity = '0';
        cloneObj.itemSelected = {};
        setState(cloneObj);
      }
    }
  };
  const handleDatePicked = (date) => {
    let cloneObj = {...state};
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let fromDate = year + '-' + month + '-' + dateNow;
    cloneObj.date = fromDate;
    console.log('cloneObj', cloneObj);
    cloneObj.isDateTimePickerVisible = false;
    setState(cloneObj);
    // hideDateTimePicker();
  };

  const handleDatePickedNext = (date) => {
    let cloneObj = {...state};
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let fromDate = year + '-' + month + '-' + dateNow;
    cloneObj.nextMaintenanceDate = fromDate;
    cloneObj.isDateTimePickerVisibleNext = false;
    setState(cloneObj);
    // hideDateTimePickerNext();
  };

  const selectVessel = async (item) => {
    let fullObjectData = {...state};
    console.log('item', item);
    const assetListData = await getAssetListByJobStation(item.intJobStationId);
    console.log('assetListData', assetListData);
    const itemListData = await getServiceNameListByWareHouse(item.intWHID);
    const serviceListgetData = await getItemList(0, item.intJobStationId);
    fullObjectData.warehouseSelected = item;
    fullObjectData.assetListData = assetListData;
    fullObjectData.warehouseName = item.strWareHoseName;
    fullObjectData.intJobStationId = item.intJobStationId;
    fullObjectData.serviceListData = serviceListgetData;
    fullObjectData.itemListData = itemListData;
    setState(fullObjectData);
  };

  // const addSelectedItems = async (item) => {
  //   let cloneObj = {...state};
  //   let itemData = {
  //     itemId: state.itemId,
  //     itemName: state.itemName,
  //     quantity: state.quantity,
  //   };
  //   cloneObj.selectedItemListData.push(itemData);
  //   setState(cloneObj);
  // };

  const addPersons = async (item) => {
    console.log(item);
    let cloneObj = {...state};
    let personsData = {
      personId: state.personId,
      personName: state.personName,
      personQty: state.personQty,
    };
    cloneObj.selectedPersonListData.push(personsData);
    setState(cloneObj);
  };

  // const addPersons = async (item) => {

  //   let fullObjectData = { ...state };
  //   const itemTypeListData = await getPersonsList(item.intEmployeeID);
  //   console.log("Person checking", )
  //   fullObjectData.itemTypeSelected = item;
  //   fullObjectData.itemTypeListData = itemTypeListData;
  //   setState(fullObjectData);

  // };

  const submitMaintanance = async () => {
    if (state.selectedItemListData.length == 0) {
      Alert.alert('Error', 'Please add button click to add item');
      return false;
    }
    let cloneObj = {...state};
    cloneObj.isLoading = true;
    setState(cloneObj);

    const submitState = {
      wareHouseid: state.warehouseSelected.intWHID,
      assetcode: state.assetSelected.strAssetID,
      maintenanceType: state.maintenanceTypeValue,
      intserviceid: state.serviceSelected.intID,
      nextMaintenanceDate: state.nextMaintenanceDate,
      remarks: state.remarks,
      strassignto: state.personSelected.strName,
    };

    console.log('submitState', submitState);

    // let netStatus = await IappsNetInfo();
    // if (!netStatus) {
    //   let offlineData = addSqliteStoreRequisition(state);
    // }
    // if (
    //   state.warehouseSelected.intWHID == '' ||
    //   state.warehouseSelected.intWHID == 0
    // ) {
    //   Alert.alert('Error', 'Please select a vessel');
    //   return false;
    // }
    // if (
    //   state.assetSelected.strAssetID == 0 ||
    //   state.assetSelected.strAssetID == ''
    // ) {
    //   Alert.alert('Error', 'Please select an asset');
    //   return false;
    // }
    // if (state.serviceSelected.intID == 0 || state.serviceSelected.intID == '') {
    //   Alert.alert('Error', 'Please select a service');
    //   return false;
    // }
    // if (
    //   state.personSelected.strEmployeeName == '' ||
    //   state.personSelected.strEmployeeName.length == 0
    // ) {
    //   Alert.alert('Error', 'Please select a responsible person');
    //   return false;
    // }

    let response = await submitMaintananceAction(
      submitState,
      state.selectedItemListData,
    );

    if (response.status) {
      let cloneObj = {...state};
      cloneObj.isLoading = response.isLoading;
      setState(cloneObj);
      Alert.alert('Success', 'Maintanance  - ' + response.data);
      props.navigation.navigate('pmsList');
    } else {
      let cloneObj = {...state};
      cloneObj.isLoading = response.isLoading;
      setState(cloneObj);
      Alert.alert('Warning', 'Something went wrong, please try again !');
    }
  };

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <ScrollView>
        <View>
          <Header title="Add New" />

          <View style={[styles.container]}>
            <View>
              <View style={styles.innerAreaDiv}>
                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    selectedValue={state.warehouseSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => selectVessel(item)}>
                    <Picker.Item label="Vessel Name" value="" />
                    {state.warehouseListData &&
                      state.warehouseListData.map((item, index) => (
                        <Picker.Item
                          label={item.strWareHoseName}
                          value={item}
                          key={index}
                        />
                      ))}
                  </Picker>
                </View>

                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    selectedValue={state.assetSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => {
                      let fullObjectData = {...state};
                      fullObjectData.assetName = item.strNameOfAsset;
                      fullObjectData.assetId = item.strDescriptionAsset;
                      fullObjectData.assetSelected = item;
                      setState(fullObjectData);
                    }}>
                    <Picker.Item label="Asset Name" value="" />
                    {state.assetListData &&
                      state.assetListData.map((item, index) => (
                        <Picker.Item
                          label={item.strDescriptionAsset}
                          value={item}
                          key={index}
                        />
                      ))}
                  </Picker>
                </View>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>Planned Maintenance</Radio>
                      <Radio>Breakdown Maintenance</Radio>
                    </RadioGroup>
                  </View>
                </View>

                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    selectedValue={state.serviceSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => {
                      let fullObjectData = {...state};
                      fullObjectData.serviceName = item.strServiceName;
                      fullObjectData.serviceId = item.intID;
                      fullObjectData.serviceSelected = item;
                      setState(fullObjectData);
                    }}>
                    <Picker.Item label="Service Name" value="" />
                    {state.serviceListData &&
                      state.serviceListData.map((item, index) => (
                        <Picker.Item
                          label={item.strServiceName}
                          value={item}
                          key={index}
                        />
                      ))}
                  </Picker>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '47%', marginRight: 10}}>
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
                  </View>

                  <View style={{flexBasis: '47%', marginLeft: 10}}>
                    <View style={[styles.inputBoxStyle]}>
                      <View style={{}}>
                        <TouchableOpacity onPress={showDateTimePickerNext}>
                          <View>
                            <Text> Next Maintanance Date </Text>
                            <Text>{state.nextMaintenanceDate}</Text>
                            <Text
                              title="Show DatePicker"
                              onPress={showDateTimePickerNext}
                            />
                            <DateTimePicker
                              isVisible={state.isDateTimePickerVisibleNext}
                              onConfirm={handleDatePickedNext}
                              onCancel={hideDateTimePickerNext}
                              datePickerModeAndroid={'spinner'}
                              mode={'date'}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={[styles.inputBoxStyle]}>
                  {/* <Text style={[styles.inputLebel]}> Purpose </Text> */}
                  <View>
                    <View style={{flexBasis: '100%'}}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Remarks"
                        placeholderTextColor={'#000000'}
                        value={state.remarks}
                        onChangeText={(value) => changeRemarks(value)}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.innerAreaDiv, {marginTop: 20}]}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '65%', marginRight: 5}}>
                    <View style={[styles.inputBoxStyle]}>
                      <Picker
                        selectedValue={state.itemSelected}
                        style={[styles.selectBoxStyle]}
                        onValueChange={(item, itemIndex) => {
                          console.log('item', item);
                          let fullObjectData = {...state};
                          fullObjectData.itemName = item.strItem;
                          fullObjectData.itemId = item.intItem;

                          // fullObjectData.itemName = item.strServiceName;
                          // fullObjectData.itemId = item.intID;

                          fullObjectData.itemSelected = item;
                          setState(fullObjectData);
                        }}>
                        <Picker.Item label="Item Name" value="" />
                        {state.itemListData &&
                          state.itemListData.map((item, index) => (
                            <Picker.Item
                              label={item.strItem}
                              value={item}
                              key={index}
                            />
                          ))}
                      </Picker>
                    </View>
                  </View>
                  <View style={{flexBasis: '32%', marginLeft: 5}}>
                    <View style={[styles.inputBoxStyle]}>
                      <View>
                        <View style={{flexBasis: '100%'}}>
                          <TextInput
                            style={[styles.InputField]}
                            placeholder="0.0"
                            placeholderTextColor={'#000000'}
                            value={state.quantity}
                            // value={0.0}
                            onChangeText={(value) => changeQuantity(value)}
                            keyboardType={'numeric'}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.addSection}>
                  <TouchableOpacity onPress={() => addSelectedItems()}>
                    <Text style={styles.addbutton}>
                      <Icon name="plus" size={18} />
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.multipleRowStyle]}>
                  <View style={styles.listItem}>
                    <View style={{flexBasis: '40%'}}>
                      <Text style={{fontWeight: 'bold'}}>Item Name</Text>
                    </View>
                    <View style={{flexBasis: '30%'}}>
                      <Text style={{fontWeight: 'bold'}}>Qty</Text>
                    </View>
                    <View style={{flexBasis: '30%'}}>
                      <Text>Delete</Text>
                    </View>
                  </View>

                  {state.selectedItemListData.length > 0 ? (
                    <View style={styles.listItemSec}>
                      {state.selectedItemListData &&
                        state.selectedItemListData.map((item, index) => (
                          <View
                            style={styles.listItem}
                            //  key={index}
                            key={1}>
                            <View style={{flexBasis: '40%'}}>
                              <Text>{item.itemName}</Text>
                            </View>
                            <View style={{flexBasis: '30%'}}>
                              <Text>{item.qnt}</Text>
                            </View>
                            <View style={{flexBasis: '30%'}}>
                              <TouchableOpacity
                                onPress={() => deleteItem(item)}>
                                <Icon
                                  name="trash"
                                  size={20}
                                  style={{
                                    color: '#3679E6',
                                    backgroundColor: '#F3F6F9',
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}
                    </View>
                  ) : null}
                </View>
              </View>

              <View style={[styles.innerAreaDiv, {marginTop: 20}]}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '100%', marginRight: 5}}>
                    <View style={[styles.inputBoxStyle]}>
                      <Picker
                        selectedValue={state.personSelected}
                        style={[styles.selectBoxStyle]}
                        onValueChange={(item, itemIndex) => {
                          let fullObjectData = {...state};
                          fullObjectData.personId = item.intEmployeeID;
                          fullObjectData.personName = item.strEmployeeName;
                          fullObjectData.personCode = item.strEmployeeCode;
                          fullObjectData.personSelected = item;
                          setState(fullObjectData);
                        }}>
                        <Picker.Item label="Assigned Persons" value="" />
                        {state.personListData &&
                          state.personListData.map((item, index) => (
                            <Picker.Item
                              label={item.strName + '[' + item.intID + ']'}
                              value={item}
                              key={index}
                            />
                          ))}
                      </Picker>
                    </View>
                  </View>
                  {/* <View style={{flexBasis: '32%', marginLeft: 5}}>
                    <View style={[styles.inputBoxStyle]}>
                      <View>
                        <View style={{flexBasis: '100%'}}>
                          <TextInput
                            style={[styles.InputField]}
                            placeholder="0h"
                            placeholderTextColor={'#000000'}
                            value={state.personQty}
                            onChangeText={(value) => changePersonQty(value)}
                            keyboardType={'numeric'}
                          />
                        </View>
                      </View>
                    </View>
                  </View> */}
                </View>

                {/* <View style={styles.addSection}>
                  <TouchableOpacity onPress={() => addPersons()}>
                    <Text style={styles.addbutton}>
                      <Icon name="plus" size={18} />
                      Add
                    </Text>
                  </TouchableOpacity>
                </View> */}

                <View style={[styles.multipleRowStyle]}>
                  {state.selectedPersonListData.length > 0 ? (
                    <View style={styles.listItemSec}>
                      {state.selectedPersonListData &&
                        state.selectedPersonListData.map((item, index) => (
                          <View
                            style={styles.listItem}
                            //  key={index}
                            key={1}>
                            <View style={{flexBasis: '40%'}}>
                              <Text>{item.personName}</Text>
                            </View>
                            <View style={{flexBasis: '30%'}}>
                              <Text>{item.personQty}</Text>
                            </View>
                            <View style={{flexBasis: '30%'}}>
                              <TouchableOpacity
                              // onPress={() => deleteItem(item)}
                              >
                                <Icon
                                  name="trash"
                                  size={20}
                                  style={{
                                    color: '#3679E6',
                                    backgroundColor: '#F3F6F9',
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}
                    </View>
                  ) : null}
                </View>

                <View style={[styles.innerAreaDiv, {marginTop: 20}]}>
                  {/* <View>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                      Add Photo
                    </Text>
                  </View> */}
                  {/* <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flexBasis: '50%'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          marginTop: 15,
                        }}>
                        No Files Selected
                      </Text>
                    </View>
                    <View style={{flexBasis: '50%'}}>
                      <View>
                        <TouchableOpacity >
                          <Text style={styles.imageButtonStyle}>
                            <Icon name="camera" size={18} /> Add Image
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View> */}
                </View>
              </View>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '47%', marginLeft: 5, marginRight: 5}}>
                  <View style={{marginTop: 10}}>
                    <TouchableOpacity>
                      <Text style={styles.backButtonStyle}>Back</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {state.isLoading ? (
                  <View style={{flexBasis: '47%', marginLeft: 5}}>
                    <View style={{marginTop: 10}}>
                      <Text style={styles.buttonStyle}>
                        {/* {translate("get_in", state.system_lang)} */}
                        Save ......
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={{flexBasis: '47%', marginLeft: 5}}>
                    <View style={{marginTop: 10}}>
                      <TouchableOpacity onPress={() => submitMaintanance()}>
                        <Text style={styles.buttonStyle}>
                          {/* {translate("get_in", state.system_lang)} */}
                          Save
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
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
    paddingVertical: 12,
    paddingHorizontal: 35,
    textTransform: 'uppercase',
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
    fontSize: RFPercentage(2.5),
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
  listItemSec: {
    // marginBottom: 20,
    // paddingVertical: 20,
    // paddingHorizontal: 10,
  },

  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: '#fff',
    marginBottom: 2,
  },
  listLable: {
    fontSize: 16,
  },
  inputBoxStyle: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
    backgroundColor: '#F7F9FC',
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    // flexDirection: 'row',
    // alignItems: 'center',
    fontSize: 20,
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
    fontSize: 17,
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
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
    paddingVertical: 12,
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
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 35,
    textTransform: 'uppercase',
    borderRadius: 50,
    borderColor: '#2ECBAD',
    fontWeight: 'bold',
    borderWidth: 2,
    padding: 10,
  },
});
export default AddPms;
