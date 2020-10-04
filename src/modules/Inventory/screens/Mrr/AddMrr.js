import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getWarehouseByUnitId,
  getItemTypeList,
  getPOListByWHId,
  getPOVSItemDet,
} from '../../actions/Mrr/MrrAction';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Loader from './../../../Master/components/loader/Loader';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Header from '../../../Master/components/header/Header';
import addMrrValidation from '../../validation/MrrValidation';
import {getWarehouseByEmployeeId} from '../../actions/StoreRequisition/StoreRequisitionAction';

const AddMrr = (props) => {
  const [state, setState] = React.useState({
    searchOrderList: [],
    searchRequestText: '',
    invoiceNo: '',

    warehouseListData: [],
    warehouseSelected: {},
    warehouseId: 0,
    warehouseName: '',

    POListData: [],
    POSelected: {},
    POId: 0,
    POName: '',

    itemTypeListData: [],
    itemTypeId: 0,
    itemTypeSelected: {},
    itemTypeName: '',

    system_lang: 'bn',
    isModalVisible: false,
    refreshing: false,
    isDateTimePickerVisible: false,
    isToDateTimePickerVisible: false,
    date: '',
    purpose: '',
    challan: '',
    vatChallan: '',
    vatAmount: '',
    sendData: {},
  });
  const isFocused = useIsFocused();

  const {navigate} = props.navigation;
  const dispatch = useDispatch();

  // let unloadVehicleList = useSelector((state) => state.unloadVehicle.unloadVehicleList);

  let isLoading = useSelector((state) => state.department.isLoading);
  const refreshingStatus = useSelector((state) => state.department.refreshing);
  const departmentListStatus = useSelector(
    (state) => state.department.departmentListStatus,
  );
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
    let fullObjectData = {...state};
    fullObjectData.itemTypeListData = itemTypeListData.data;
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
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    const monthString = month < 10 ? '0' + month : month;
    let fromDate = year + '-' + monthString + '-' + dateNow;

    // setState({ date: fromDate, isDateTimePickerVisible: false });
    let cloneObj = {...state};
    cloneObj.date = fromDate;
    cloneObj.isDateTimePickerVisible = false;
    setState(cloneObj);
    // hideDateTimePicker();
  };

  const changePurpose = (inputValue) => {
    let cloneObj = {...state};
    cloneObj.purpose = inputValue;
    setState(cloneObj);
  };

  const getPOList = async (warehouseitem, itemIndex) => {
    let fullObjectData = {...state};
    const item = state.warehouseListData[itemIndex];
    fullObjectData.warehouseName = warehouseitem.strWareHoseName;
    fullObjectData.warehouseId = warehouseitem.intWHID;
    fullObjectData.warehouseSelected = warehouseitem;
    const getPo = await getPOListByWHId(warehouseitem.intWHID);

    console.log('getPo', getPo);
    fullObjectData.POListData = getPo.data;
    setState(fullObjectData);
  };

  const changeChallan = (inputValue) => {
    let cloneObj = {...state};
    cloneObj.challan = inputValue;
    setState(cloneObj);
  };

  const InvoiceNo = (inputValue) => {
    let cloneObj = {...state};
    cloneObj.invoiceNo = inputValue;
    setState(cloneObj);
  };

  const changeVatChallan = (inputValue) => {
    let cloneObj = {...state};
    cloneObj.vatChallan = inputValue;
    setState(cloneObj);
  };

  const changeVatAmount = (inputValue) => {
    let cloneObj = {...state};
    cloneObj.vatAmount = inputValue;
    setState(cloneObj);
  };

  const goToMrrList = async () => {
    let validation = addMrrValidation(state);

    if (validation) {
      const poListData = await getPOVSItemDet(state.POId, state.warehouseId);
      console.log('poListData.data new test;', poListData.data);
      let listData = poListData.data;

      const sendData = {
        listData,
        state,
      };
      props.navigation.navigate('mrrList', sendData);
    }

    // if (
    //   state.POId == 0 &&
    //   typeof state.POId === 'undefined' &&
    //   state.warehouseId == '' &&
    //   typeof state.warehouseId === 'undefined'
    // ) {
    //   alert('PO and Warehouse can not be empty');
    //   return false;
    // } else {
    //   const poListData = await getPOVSItemDet(state.POId, state.warehouseId);
    //   console.log('poListData.data new test;', poListData.data);
    //   let listData = poListData.data;

    //   const sendData = {
    //     listData,
    //     state,
    //   };
    //   props.navigation.navigate('mrrList', sendData);
    //   console.log('Sendata', sendData);
    // }
  };

  console.log('StateData', state);

  return (
    <KeyboardAvoidingView
      style={[GlobalStyles.backgroundColor, styles.container]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshingStatus}
            onRefresh={onRefresh.bind(this)}
          />
        }>
        <View>
          <View style={[styles.positionBox]}>
            <Header title="Add MRR" />
          </View>
          <View style={[styles.container]}>
            <View style={[styles.innerAreaDiv]}>
              <View>{isLoading ? <Loader /> : null}</View>

              <View style={[styles.inputBoxStyle]}>
                <Picker
                  selectedValue={state.warehouseSelected}
                  style={[styles.selectBoxStyle]}
                  // onValueChange={(item, itemIndex) => {
                  //   console.log('item', item);
                  //   console.log('itemIndex', itemIndex);
                  // }}
                  onValueChange={(item, itemIndex) =>
                    getPOList(item, itemIndex)
                  }>
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

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '48%'}}>
                  <View style={[styles.inputBoxStyle, {marginRight: 2}]}>
                    <Picker
                      selectedValue={state.POSelected}
                      style={[styles.selectBoxStyle]}
                      onValueChange={(item, itemIndex) => {
                        let fullObjectData = {...state};
                        fullObjectData.POName = item.strSupplierName;
                        fullObjectData.POId = item.intPOID;
                        fullObjectData.intSupplierID = item.intSupplierID;
                        fullObjectData.POSelected = item;
                        setState(fullObjectData);
                      }}>
                      <Picker.Item label="PO List" value="" />
                      {state.POListData &&
                        state.POListData.map((item, index) => (
                          <Picker.Item
                            label={item.FullID}
                            value={item}
                            key={index}
                          />
                        ))}
                    </Picker>
                  </View>
                </View>
                <View style={{flexBasis: '51%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="Invoice No."
                      placeholderTextColor={'#000000'}
                      value={state.invoiceNo}
                      onChangeText={(value) => InvoiceNo(value)}
                    />
                  </View>
                </View>
              </View>

              <View style={[styles.inputBoxStyle]}>
                <View>
                  <View style={{flexBasis: '100%'}}>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="Challan/Vol"
                      placeholderTextColor={'#000000'}
                      value={state.challan}
                      onChangeText={(value) => changeChallan(value)}
                    />
                  </View>
                </View>
              </View>

              <View style={[styles.inputBoxStyle]}>
                <View style={{}}>
                  <TouchableOpacity onPress={showDateTimePicker}>
                    <View>
                      <Text style={{}}> Challan Date </Text>
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
                    {/* <View>
      <Image source={calendar} style={[styles.calendarImage]} />
    </View> */}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '49%'}}>
                  <View style={[styles.inputBoxStyle, {marginRight: 5}]}>
                    <View>
                      <View style={{flexBasis: '100%'}}>
                        <TextInput
                          style={[styles.InputField]}
                          placeholder="Vat Challan"
                          placeholderTextColor={'#000000'}
                          value={state.vatChallan}
                          onChangeText={(value) => changeVatChallan(value)}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '51%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <View style={{flexBasis: '100%'}}>
                        <TextInput
                          style={[styles.InputField]}
                          placeholder="Vat Amount"
                          placeholderTextColor={'#000000'}
                          value={state.vatAmount}
                          onChangeText={(value) => changeVatAmount(value)}
                          keyboardType={'numeric'}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <TouchableOpacity
              // onPress={() => this.toggleModal()}
              onPress={() => goToMrrList()}>
              <Text style={styles.buttonStyle}>
                {/* {translate("get_in", this.state.system_lang)} */}
                Show
              </Text>
            </TouchableOpacity>
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
    backgroundColor: '#F1F4F9',
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
  positionBox: {
    position: 'relative',
  },
  headerDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
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
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 2,
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
    // fontWeight: "bold",
    textTransform: 'capitalize',
  },
  InputField: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '300',
    fontFamily: 'popppins',
    borderRadius: 0,
    paddingLeft: 5,
    paddingVertical: 12,
    borderBottomColor: '#000',
    borderWidth: 0,
  },
  boxStyle: {
    padding: 5,
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
  inputBoxStyle: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
    backgroundColor: '#F7F9FC',
  },
});
export default AddMrr;
