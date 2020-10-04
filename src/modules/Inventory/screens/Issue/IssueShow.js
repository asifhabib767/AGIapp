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
import DateTimePicker from 'react-native-modal-datetime-picker';
import Header from '../../../Master/components/header/Header';
import {
  getWarehouseByUnitId,
  getRequisitionList,
} from '../../actions/Issue/IssueAction';
import {getWarehouseByEmployeeId} from '../../actions/StoreRequisition/StoreRequisitionAction';

const IssueShow = (props) => {
  const [state, setState] = React.useState({
    UnloadedData: [],
    searchOrderList: [],
    searchRequestText: '',

    system_lang: 'bn',
    isModalVisible: false,
    refreshing: false,
    isFromDateTimePickerVisible: false,
    isToDateTimePickerVisible: false,
    fromDate: '',
    toDate: '',

    warehouseListData: [],
    warehouseSelected: {},
    warehouseId: 0,
    warehouseName: '',

    requisitionList: [],
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

    let fullObjectData = {...state};
    fullObjectData.warehouseListData = warehouseListData.data;
    setState(fullObjectData);
  };

  const onRefresh = () => {
    dispatch(emptyRefreshControl(true));
    getInitialData();
  };

  const showFromDateTimePicker = () => {
    let cloneObj = {...state};
    cloneObj.isFromDateTimePickerVisible = true;
    setState(cloneObj);
  };

  const showToDateTimePicker = () => {
    let cloneObj = {...state};
    cloneObj.isToDateTimePickerVisible = true;
    setState(cloneObj);
  };

  const hideFromDateTimePicker = () => {
    let cloneObj = {...state};
    cloneObj.isFromDateTimePickerVisible = false;
    setState(cloneObj);
  };

  const hideToDateTimePicker = () => {
    let cloneObj = {...state};
    cloneObj.isToDateTimePickerVisible = false;
    setState(cloneObj);
  };

  const handleFromDatePicked = (date) => {
    let cloneObj = {...state};
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    const monthString = month < 10 ? '0' + month : month;
    let fromDate = year + '-' + monthString + '-' + dateNow;
    cloneObj.fromDate = fromDate;
    cloneObj.isFromDateTimePickerVisible = false;
    setState(cloneObj);
  };

  const handleToDatePicked = (date) => {
    let cloneObj = {...state};
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    const monthString = month < 10 ? '0' + month : month;
    let toDate = year + '-' + monthString + '-' + dateNow;
    cloneObj.toDate = toDate;
    cloneObj.isToDateTimePickerVisible = false;
    setState(cloneObj);
  };

  const showIssueList = async () => {
    if (state.warehouseName == '') {
      Alert.alert('Error', 'Please select warehouse name');
      return false;
    } else if (state.fromDate == '') {
      Alert.alert('Error', 'Please select From date');
      return false;
    } else if (state.toDate == '') {
      Alert.alert('Error', 'Please select To date');
      return false;
    }
    let requisitionList = await getRequisitionList(
      state.warehouseId,
      state.fromDate,
      state.toDate,
    );
    console.log('requisition list', requisitionList);
    let cloneObj = {...state};
    cloneObj.requisitionList = requisitionList.data;
    setState(cloneObj);
  };

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
            <Header title="Issue" />
          </View>
          <View style={[styles.container]}>
            <View style={[styles.innerAreaDiv]}>
              <View>{isLoading ? <Loader /> : null}</View>

              <View style={[styles.inputBoxStyle]}>
                <Picker
                  selectedValue={state.warehouseSelected}
                  style={[styles.selectBoxStyle]}
                  onValueChange={(item, itemIndex) => {
                    let fullObjectData = {...state};
                    fullObjectData.warehouseName = item.strWareHoseName;
                    fullObjectData.warehouseId = item.intWHID;
                    fullObjectData.warehouseSelected = item;
                    setState(fullObjectData);
                  }}>
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

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '48%'}}>
                  <View style={[styles.inputBoxStyle, {marginRight: 2}]}>
                    <View style={{}}>
                      <TouchableOpacity onPress={showFromDateTimePicker}>
                        <View>
                          <Text style={{}}> From </Text>
                          <Text>{state.fromDate}</Text>
                          <Text
                            title="Show DatePicker"
                            onPress={showFromDateTimePicker}
                          />
                          <DateTimePicker
                            isVisible={state.isFromDateTimePickerVisible}
                            onConfirm={handleFromDatePicked}
                            onCancel={hideFromDateTimePicker}
                            datePickerModeAndroid={'spinner'}
                            mode={'date'}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{flexBasis: '51%'}}>
                  <View style={[styles.inputBoxStyle]}>
                    <View style={{}}>
                      <TouchableOpacity onPress={showToDateTimePicker}>
                        <View>
                          <Text style={{}}> To </Text>
                          <Text>{state.toDate}</Text>
                          <Text
                            title="Show DatePicker"
                            onPress={showToDateTimePicker}
                          />
                          <DateTimePicker
                            isVisible={state.isToDateTimePickerVisible}
                            onConfirm={handleToDatePicked}
                            onCancel={hideToDateTimePicker}
                            datePickerModeAndroid={'spinner'}
                            mode={'date'}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginTop: 10, marginBottom: 40}}>
            <TouchableOpacity
              // onPress={() => this.toggleModal()}
              onPress={() => showIssueList()}>
              <Text style={styles.buttonStyle}>
                {/* {translate("get_in", this.state.system_lang)} */}
                Show
              </Text>
            </TouchableOpacity>
          </View>

          {state.requisitionList.length > 0 ? (
            <View style={[styles.container]}>
              <View style={[styles.innerAreaDiv]}>
                <FlatList
                  data={state.requisitionList}
                  keyExtractor={(item) => item.intReqID}
                  renderItem={({item, index, separators}) => (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('issueDetails', {
                          requisitionData: item,
                          state,
                        })
                      }>
                      <View style={styles.requisitionContainer}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            padding: 10,
                          }}>
                          <View style={styles.itemList}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>
                              {item.strCode}
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                              <Text>{item.dteReqDate}</Text>
                            </View>
                          </View>

                          <View style={{flexBasis: '40%'}}>
                            <Text>{item.strDepatrment}</Text>
                          </View>
                        </View>

                        <View
                          style={{flex: 1, flexDirection: 'row', margin: 10}}>
                          <View style={{flexBasis: '50%'}}>
                            <Text>Request by</Text>
                            <Text style={{fontWeight: 'bold'}}>
                              {item.strRequestByName}
                            </Text>
                          </View>
                          <View style={{flexBasis: '50%'}}>
                            {/* <Text>Approve by</Text>
                            <Text style={{ fontWeight: "bold" }}>
                              MD. Monsurul
                            </Text> */}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          ) : null}
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
    flexBasis: '75%',
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
});
export default IssueShow;
