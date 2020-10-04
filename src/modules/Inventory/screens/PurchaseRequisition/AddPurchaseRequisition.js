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
import {Button, Spinner} from '@ui-kitten/components';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  getWarehouseByUnitId,
  getItemTypeList,
  getItemListByUnitId,
  getDepartmentList,
  addPurchaseRequisition,
} from '../../actions/PurchaseRequisition/PurchaseRequisitionAction';
import {FlatList} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Loader from './../../../Master/components/loader/Loader';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Header from '../../../Master/components/header/Header';
import addPurchaseValidation from '../../validation/PurchaseValidation';
import {checkObjectInArray} from '../../../Master/Util/Helper';
import {
  getItemSearchList,
  getItemListByWearhouseAndBalance,
  getWarehouseByEmployeeId,
} from '../../actions/StoreRequisition/StoreRequisitionAction';
import {getFormattedCurrentDate} from '../../../HR/Utils/DateConfigure';
const AddPurchaseRequisition = (props) => {
  const [state, setState] = React.useState({
    UnloadedData: [],
    searchOrderList: [],
    searchRequestText: '',

    system_lang: 'bn',
    isModalVisible: false,
    refreshing: false,
    isDateTimePickerVisible: false,
    isToDateTimePickerVisible: false,
    date: '',
    quantity: '',
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
    // const warehouseListData = await getWarehouseByUnitId();
    const warehouseListData = await getWarehouseByEmployeeId();
    const itemTypeListData = await getItemTypeList();
    // const itemListData = await getItemListByUnitId();
    const departmentListData = await getDepartmentList();

    let fullObjectData = {...state};
    let currntData = await getFormattedCurrentDate();

    fullObjectData.itemTypeListData = itemTypeListData.data;
    // fullObjectData.itemListData = itemListData.data;
    fullObjectData.departmentListData = departmentListData.data;
    fullObjectData.date = currntData;
    fullObjectData.warehouseListData = warehouseListData.data;
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
    if (state.multipleWarehouse.length == 0) {
      Alert.alert('Error', 'Please add button click to add item');
      return false;
    }
    let response = await addPurchaseRequisition(state);
    if (response.status) {
      Alert.alert('Success', `${response.data.message}`);
      props.navigation.navigate('purchaseRequisition');
    } else {
      Alert.alert(
        'Warning',
        'Purchase Requisition did not created successfully !',
      );
    }
  };

  const searchText = async (searchRequestText) => {
    if (state.warehouseName == '') {
      Alert.alert('Error', 'Please Select ware house');
      return false;
    }
    let cloneObj = {...state};
    // cloneObj.searchRequestText = searchRequestText;
    // setState(cloneObj);
    if (searchRequestText.length > 0) {
      let getSearchValue = state.itemListData;
      const newData = getSearchValue.filter(function (item) {
        const itemData = item.intItemID + ' ' + item.strItemFullName;
        const textData = searchRequestText.toUpperCase();

        return itemData.toUpperCase().indexOf(textData) > -1;
      });
      cloneObj.searchRequestText = searchRequestText;
      cloneObj.searchOrderList = newData;
      setState(cloneObj);
    } else {
      cloneObj.searchOrderList = [];
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
  const addMultipleWarehouse = () => {
    let cloneObj = {...state};
    let validationCheck = addPurchaseValidation(state);

    if (validationCheck) {
      let item = {
        itemId: state.itemId,
        itemName: state.itemName,
        warehouseId: state.warehouseSelected,
        quantity: state.quantity,
        warehouseName: state.warehouseName,
        purpose: state.purpose,
        dueDate: state.date,
        deptId: state.deptId,
      };
      if (checkObjectInArray(item, state.multipleWarehouse, 'itemId')) {
        Alert.alert('Error', 'Please select another Item');
        return false;
      }
      cloneObj.multipleWarehouse.push(item);
      setState(cloneObj);

      if (state.multipleWarehouse.length > 0) {
        cloneObj.quantity = '0';
        cloneObj.itemName = '';
        cloneObj.itemTypeSelected = {};
        cloneObj.searchRequestText = '';
        cloneObj.itemTypeName = '';
        cloneObj.itemSelected = {};
        setState(cloneObj);
      }
    }
  };

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

  const changeWarehoue = async (item) => {
    let fullObjectData = {...state};
    let itemlist = await getItemListByWearhouseAndBalance(item.intWHID);
    console.log('itemlist', itemlist);
    fullObjectData.itemListData = itemlist.data;
    fullObjectData.warehouseName = item.strWareHoseName;
    fullObjectData.warehouseId = item.intWHID;
    fullObjectData.warehouseSelected = item;
    setState(fullObjectData);
  };

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <ScrollView>
        <View>
          <Header title="Purchase Requisition" />

          <View style={[styles.container]}>
            <View>
              <View style={styles.innerAreaDiv}>
                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    selectedValue={state.warehouseSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => changeWarehoue(item)}>
                    <Picker.Item label="Warehouse" value="" />
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
              <View style={[styles.innerAreaDiv, {marginTop: 20}]}>
                {/* <View style={[styles.inputBoxStyle]}>
                  <Picker
                    selectedValue={state.itemTypeSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => {
                      let fullObjectData = {...state};
                      fullObjectData.itemTypeName = item.strItemTypeName;
                      fullObjectData.itemTypeId = item.intItemTypeID;
                      fullObjectData.itemTypeSelected = item;
                      setState(fullObjectData);
                    }}>
                    <Picker.Item label="Item Type" value="" />
                    {state.itemTypeListData &&
                      state.itemTypeListData.map((item, index) => (
                        <Picker.Item
                          label={item.strItemTypeName}
                          value={item}
                          key={index}
                        />
                      ))}
                  </Picker>
                </View> */}
                {/* <View style={[styles.inputBoxStyle]}>
                  <Picker
                    selectedValue={state.itemSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => {
                      let fullObjectData = { ...state };
                      fullObjectData.itemName = item.strItemName;
                      fullObjectData.itemId = item.intItemID;
                      fullObjectData.itemSelected = item;
                      setState(fullObjectData);
                    }}>
                    <Picker.Item label="Item" value="" />
                    {state.itemListData &&
                      state.itemListData.map((item, index) => (
                        <Picker.Item
                          label={item.strItemName}
                          value={item}
                          key={index}
                        />
                      ))}
                  </Picker>
                </View> */}
                <View style={[styles.inputBoxStyle]}>
                  {/* <Text style={[styles.inputLebel]}> Quantity </Text> */}
                  <View>
                    <View style={{flexBasis: '100%'}}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Search Your Item"
                        placeholderTextColor={'#000000'}
                        value={state.searchRequestText}
                        onChangeText={(value) => {
                          let cloneObj = {...state};
                          cloneObj.searchRequestText = value;
                          setState(cloneObj);
                          searchText(value);
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={{marginTop: 10}}>
                  <FlatList
                    data={state.searchOrderList}
                    keyExtractor={(item) => item.Id}
                    renderItem={({item, index, separators}) => (
                      <View>
                        <TouchableOpacity onPress={() => selectItem(item)}>
                          <View style={styles.listItemSearch}>
                            <TouchableOpacity></TouchableOpacity>
                            <View style={{flexBasis: '20%'}}>
                              <Text>Item ID</Text>
                              <Text>{item.intItemID}</Text>
                            </View>
                            <View style={{flexBasis: '60%'}}>
                              <Text>Item Name</Text>
                              <Text>{item.strItemFullName}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
                <View style={[styles.inputBoxStyle]}>
                  {/* <Text style={[styles.inputLebel]}> Quantity </Text> */}
                  <View>
                    <View style={{flexBasis: '100%'}}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Quantity"
                        placeholderTextColor={'#000000'}
                        value={state.quantity}
                        onChangeText={(value) => changeQuantity(value)}
                        keyboardType={'numeric'}
                      />
                    </View>
                  </View>
                </View>
                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    selectedValue={state.departmentSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => {
                      let fullObjectData = {...state};
                      fullObjectData.deptName = item.strDepartmentName;
                      fullObjectData.deptId = item.intDeptID;
                      fullObjectData.departmentSelected = item;
                      setState(fullObjectData);
                    }}>
                    <Picker.Item label="Department" value="" />
                    {state.departmentListData &&
                      state.departmentListData.map((item, index) => (
                        <Picker.Item
                          label={item.strDepartmentName}
                          value={item}
                          key={index}
                        />
                      ))}
                  </Picker>
                </View>
                <View style={[styles.inputBoxStyle]}>
                  {/* <Text style={[styles.inputLebel]}> Purpose </Text> */}
                  <View>
                    <View style={{flexBasis: '100%'}}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Purpose"
                        placeholderTextColor={'#000000'}
                        value={state.purpose}
                        onChangeText={(value) => changePurpose(value)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.addSection}>
              <TouchableOpacity onPress={() => addMultipleWarehouse()}>
                <Text style={styles.addbutton}>
                  <Icon name="plus" size={18} />
                  Add
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              {state.multipleWarehouse.length > 0 ? (
                <View style={styles.listItemSec}>
                  {state.multipleWarehouse &&
                    state.multipleWarehouse.map((item, index) => (
                      <View style={styles.listItem}>
                        <View>
                          <Text>Item ID</Text>
                          <Text>{item.itemId}</Text>
                        </View>
                        <View>
                          <Text>Item Name</Text>
                          <Text>{item.itemName}</Text>
                        </View>
                        <View>
                          <Text>Qty</Text>
                          <Text>{item.quantity}</Text>
                        </View>
                        <View>
                          <Text>Purpose</Text>
                          <Text>{item.purpose}</Text>
                        </View>
                        <View>
                          <TouchableOpacity onPress={() => deleteItem(item)}>
                            <Text>Delete</Text>
                            <Icon name="trash" size={20} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                </View>
              ) : null}
            </View>

            <View style={{marginTop: 10}}>
              <TouchableOpacity onPress={() => submit()}>
                <Text style={styles.buttonStyle}>
                  {/* {translate("get_in", this.state.system_lang)} */}
                  Submit
                </Text>
              </TouchableOpacity>
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
    fontSize: RFPercentage(3),
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 35,
    textTransform: 'uppercase',
    borderRadius: 10,
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
  },
  addbutton: {
    padding: 10,
    backgroundColor: '#3366FF',
    marginRight: 10,
    width: 100,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  listItemSec: {
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
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
  inputBoxStyle: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
    backgroundColor: '#F7F9FC',
  },
  listItemSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 20,
  },
});
export default AddPurchaseRequisition;
