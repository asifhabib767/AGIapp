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
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Loader from './../../../Master/components/loader/Loader';
import {Picker} from '@react-native-community/picker';
import Header from '../../../Master/components/header/Header';
import {
  getCostCenterByUnitId,
  getStoreRequisitionDetailsByRequisitionId,
  getStoreLocationByEmployeeId,
  getwhStoreLocation,
  storeIssue,
  getEmployeeProfileSearch,
} from '../../actions/Issue/IssueAction';
import Icon from 'react-native-vector-icons/FontAwesome';

const IssueDetails = (props) => {
  let {warehouseId} = props.route.params.state;
  let requisitionData = props.route.params.requisitionData;

  const [state, setState] = React.useState({
    UnloadedData: [],
    searchOrderList: [],
    searchRequestText: '',

    system_lang: 'bn',
    isModalVisible: false,
    refreshing: false,

    costCenterListData: [],
    costCenterSelected: {},
    costCenterId: 0,
    costCenterName: '',

    receivedByEnroll: 0,
    propsData: props.route.params.requisitionData,
    requisitionId: props.route.params.requisitionData.intReqID,
    requisitionDetailsListData: [],
    issueQty: 0,
    locationListData: [],
    locationSelected: {},
    locationId: 0,
    locationName: '',
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
    const costCenterListData = await getCostCenterByUnitId();
    const requisitionDetailsListData = await getStoreRequisitionDetailsByRequisitionId(
      state.requisitionId,
    );

    // const locationListData = await getStoreLocationByEmployeeId();
    const locationListData = await getwhStoreLocation(warehouseId);
    let fullObjectData = {...state};
    fullObjectData.costCenterListData = costCenterListData.data;
    fullObjectData.requisitionDetailsListData =
      requisitionDetailsListData.data.requisitionItemDetails;
    fullObjectData.locationListData = locationListData.data;
    for (let i = 0; i < fullObjectData.requisitionDetailsListData.length; i++) {
      const element = fullObjectData.requisitionDetailsListData[i];
      element.locationSelected = {};
      element.issueQty = 0;
      element.locationName = '';
    }
    setState(fullObjectData);
  };

  const onRefresh = () => {
    dispatch(emptyRefreshControl(true));
    getInitialData();
  };

  const changeReceivedByEnroll = (inputValue) => {
    let cloneObj = {...state};
    cloneObj.receivedByEnroll = inputValue;
    setState(cloneObj);
  };

  const searchText = async () => {
    let searchRequestText = state.receivedByEnroll;

    console.log('searchRequestText', searchRequestText);
    let cloneObj = {...state};
    if (searchRequestText.length > 1) {
      // let getSearchValue = state.itemListData;
      // const newData = getSearchValue.filter(function (item) {
      //   const itemData = item.intItemID + ' ' + item.strItemFullName;
      //   const textData = searchRequestText.toUpperCase();

      //   return itemData.toUpperCase().indexOf(textData) > -1;
      // });
      let employeeData = await getEmployeeProfileSearch(searchRequestText);
      let newData = employeeData.data;
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
    cloneObj.intEmployeeID = item.intEmployeeID;
    (cloneObj.strEmployeeName = item.strEmployeeName),
      (cloneObj.receivedByEnroll =
        item.strEmployeeName + ' ' + '(' + item.intEmployeeID + ')'),
      (cloneObj.searchOrderList = []),
      setState(cloneObj);
  };

  const changeIssueQty = (inputValue, value) => {
    let cloneObj = {...state};
    for (let i = 0; i < cloneObj.requisitionDetailsListData.length; i++) {
      const element = cloneObj.requisitionDetailsListData[i];
      if (element.intItemID == inputValue.intItemID) {
        cloneObj.requisitionDetailsListData[i].issueQty = value;
        if (
          parseInt(cloneObj.requisitionDetailsListData[i].numReqQty) < value
        ) {
          Alert.alert(
            'Error',
            'Issue Quantity can not be greate approved quantity',
          );
          cloneObj.requisitionDetailsListData[i].issueQty = '';
        }
      }
    }
    setState(cloneObj);
  };

  const checkingIssueQty = () => {
    for (let i = 0; i < state.requisitionDetailsListData.length; i++) {
      const element = state.requisitionDetailsListData[i];
      if (element.issueQty == 0) {
        Alert.alert('Error', 'Please Type Qunatity');
        return false;
      } else if (element.locationName == '') {
        Alert.alert('Error', 'Please Select Store Location');
        return false;
      }
    }
    return true;
  };

  const submit = async () => {
    if (state.costCenterName == '') {
      Alert.alert('Error', 'Please select Cost center name');
      return false;
    } else if (state.receivedByEnroll == 0) {
      Alert.alert('Error', 'Please Receiver Enrol no');
      return false;
    }
    let checkvalidation = checkingIssueQty();

    if (checkvalidation) {
      let issueCreate = await storeIssue(state, warehouseId, requisitionData);
      console.log('issueCreate', issueCreate);
      if (issueCreate.data.data !== '') {
        Alert.alert(
          'Success',
          `${issueCreate.data.message} Id is ${issueCreate.data.data}`,
        );
        props.navigation.navigate('inventoryMenu');
      }
    }

    // if (state.multipleWarehouse.length == 0) {
    //   Alert.alert("Error", "Please add button click to add item");
    //   return false;
    // }
    // let response = await addPurchaseRequisition(state);
    // if (response.status) {
    //   Alert.alert("Success", `${response.data.message}`);
    //   props.navigation.navigate("purchaseRequisition");
    // } else {
    //   Alert.alert(
    //     "Warning",
    //     "Purchase Requisition did not created successfully !"
    //   );
    // }
  };

  const locationSelected = (item, location, index) => {
    let cloneObj = {...state};
    for (let i = 0; i < cloneObj.requisitionDetailsListData.length; i++) {
      const element = cloneObj.requisitionDetailsListData[i];
      if (element.intItemID == item.intItemID) {
        cloneObj.requisitionDetailsListData[i].locationName =
          location.strLocationName;
        cloneObj.requisitionDetailsListData[i].locationId =
          location.intStoreLocationID;
        cloneObj.requisitionDetailsListData[i].locationSelected = location;

        //  cloneObj.locationId = location.intStoreLocationID
        //  cloneObj.locationName = location.locationName
        //  cloneObj.locationSelected = location
      }
    }
    setState(cloneObj);
  };

  console.log(
    'state.requisitionDetailsListData',
    state.requisitionDetailsListData,
  );

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
            <Header title="Issue Details" />
          </View>
          <View style={[styles.container]}>
            <View style={[styles.innerAreaDiv]}>
              <View>{isLoading ? <Loader /> : null}</View>

              <View style={[styles.inputBoxStyle]}>
                <Picker
                  selectedValue={state.costCenterSelected}
                  style={[styles.selectBoxStyle]}
                  onValueChange={(item, itemIndex) => {
                    let fullObjectData = {...state};
                    fullObjectData.costCenterName = item.strCCName;
                    fullObjectData.costCenterId = item.intCostCenterID;
                    fullObjectData.costCenterSelected = item;
                    setState(fullObjectData);
                  }}>
                  <Picker.Item label="Cost Center" value="" />
                  {state.costCenterListData &&
                    state.costCenterListData.map((item, index) => (
                      <Picker.Item
                        label={item.strCCName}
                        value={item}
                        key={index}
                      />
                    ))}
                </Picker>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={[{flexBasis: '70%'}]}>
                  <View style={[styles.inputBoxStyle]}>
                    <TextInput
                      placeholder="enroll or name then press check button"
                      value={state.receivedByEnroll}
                      onChangeText={(value) => {
                        let cloneObj = {...state};
                        cloneObj.receivedByEnroll = value;
                        setState(cloneObj);
                      }}
                    />
                  </View>
                </View>
                <View style={styles.checkContainer}>
                  <View
                    style={{
                      backgroundColor: '#1C2761',
                      width: '70%',
                      height: '70%',
                      color: '#fff',
                      borderRadius: 10,
                      borderWidth: 1,
                    }}>
                    <TouchableOpacity onPress={() => searchText()}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          textAlign: 'center',
                          paddingVertical: 10,
                        }}>
                        <Icon name="check" />
                        Check
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View>
            <FlatList
              data={state.searchOrderList}
              keyExtractor={(item) => item.Id}
              renderItem={({item, index, separators}) => (
                <View>
                  <TouchableOpacity onPress={() => selectItem(item)}>
                    <View style={styles.listItemSearch}>
                      <TouchableOpacity></TouchableOpacity>
                      <View style={{flexBasis: '20%'}}>
                        <Text>Employee Id</Text>
                        <Text>{item.intEmployeeID}</Text>
                      </View>
                      <View style={{flexBasis: '60%'}}>
                        <Text>Employee Name</Text>
                        <Text>{item.strEmployeeName}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          <View style={[styles.container]}>
            <View style={[styles.innerAreaDiv]}>
              <FlatList
                data={state.requisitionDetailsListData}
                keyExtractor={(item) => item.intReqID}
                renderItem={({item, index, separators}) => (
                  <View style={styles.requisitionContainer}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderBottomWidth: 2,
                        borderColor: '#ddd',
                        padding: 10,
                      }}>
                      <View style={styles.itemList}>
                        <View style={{flexDirection: 'row'}}>
                          <Text>{item.intItemID}</Text>
                        </View>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>
                          {item.strItemName}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text>{item.strUoM}</Text>
                        </View>
                      </View>

                      <View style={{flexBasis: '40%'}}>
                        <View style={{}}>
                          <TextInput
                            style={[styles.InputField, styles.InputFieldCount]}
                            placeholder="0"
                            placeholderTextColor={'#000000'}
                            // value={state.issueQty}
                            value={
                              state.requisitionDetailsListData[index].issueQty
                            }
                            onChangeText={(value) =>
                              changeIssueQty(item, value)
                            }
                            keyboardType={'numeric'}
                          />
                        </View>
                        <View
                          style={[
                            styles.InputField,
                            {height: 50, padding: 0, marginTop: 5},
                          ]}>
                          <Picker
                            selectedValue={
                              state.requisitionDetailsListData[index]
                                .locationSelected
                            }
                            style={[styles.selectBoxStyle]}
                            // onValueChange={(item, itemIndex) => {
                            //   let fullObjectData = { ...state };
                            //   fullObjectData.locationName =
                            //     item.strLocationName;
                            //   fullObjectData.locationId = item.intStoreLocationID;
                            //   fullObjectData.locationSelected = item;
                            //   setState(fullObjectData);
                            // }}
                            onValueChange={(location) =>
                              locationSelected(item, location, index)
                            }>
                            <Picker.Item label="Store Location" value="" />
                            {state.locationListData &&
                              state.locationListData.map(
                                (location, indexNo) => (
                                  <Picker.Item
                                    label={location.strLocationName}
                                    value={location}
                                    key={indexNo}
                                  />
                                ),
                              )}
                          </Picker>
                        </View>
                      </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
                      <View style={{flexBasis: '34%'}}>
                        <Text>Req QTY</Text>
                        <Text style={{fontWeight: 'bold'}}>
                          {item.numReqQty}
                        </Text>
                      </View>
                      <View style={{flexBasis: '34%'}}>
                        <Text>Remarks</Text>
                        <Text style={{fontWeight: 'bold'}}>
                          {item.strRemarks}
                        </Text>
                      </View>
                      <View style={{flexBasis: '34%'}}>
                        <Text>Approved QTY</Text>
                        <Text style={{fontWeight: 'bold'}}>
                          {item.numApproveQty}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
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
    flexBasis: '60%',
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
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    borderColor: '#ddd',
    textAlign: 'center',
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
  requisitionContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 20,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 0,
    borderColor: '#ddd',
    fontSize: 20,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
  InputFieldCount: {
    width: '100%',
    fontSize: 17,
  },
  receivedByInput: {
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
  receivedByInputFieldCount: {
    width: '100%',
    fontSize: 17,
  },
  listItemSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 20,
  },
  checkContainer: {
    flexBasis: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
});
export default IssueDetails;
