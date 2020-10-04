import React, {useEffect, useState} from 'react';
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
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  Picker,
  FlatList,
  Alert,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import qr from '../../images/qr.png';
import DropDownPicker from 'react-native-dropdown-picker';
import {Radio, Autocomplete} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import topbar from '../../images/top-bar.png';
import {
  Datepicker,
  Layout,
  Toggle,
  Button,
  Input,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  addDepartment,
  departmentSelectHandeling,
  DepartmentInputAddHandling,
  emptyMessage,
  emptyRefreshControl,
} from '../../actions/distribution/distributionAction';
import IAppsSelect from '../../../Master/components/select/IAppsSelect';
import {
  GetBusinessDropdown,
  GetStatusDropdown,
} from '../../actions/dropdown/DropdownAction';
import IAppsInput from '../../../Master/components/input/IAppsInput';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {getTripListByUnitId} from './../../actions/distribution/TripAssignedAction';
import CustomSearchbar from './../../../Master/components/CustomSearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {encryptCode, decryptCode} from './../../../Master/Util/EncryptedCode';
import {
  createLoadingSlipchalan,
  tripInfoUpdateNRollbackAPI,
  tripRollBack,
} from './../../actions/distribution/TripOutScreenAction';

const TripListScreen = (props) => {
  const [state, setState] = React.useState({
    tripList: [],
    searchOrderList: [],
    searchRequestText: '',
  });
  const [checked, setChecked] = React.useState(false);

  const [refreshing, setrefreshing] = React.useState(false);

  let dispatch = useDispatch();
  const inputData = useSelector((state) => state.department.inputData);
  const departmentStateStatus = useSelector((state) => state.department.status);
  const message = useSelector((state) => state.department.message);
  const refreshingStatus = useSelector((state) => state.department.refreshing);

  const businessdropdownList = useSelector(
    (state) => state.dropdown.businessListDDL,
  );
  const status = useSelector((state) => state.dropdown.statusListDDL);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  const handleSelect = (inputName, index) => {
    // dispatch(departmentSelectHandeling(inputName, index));
    // setSelectedIndex(index);
  };
  useEffect(() => {
    initializaAllDatas();
  }, []);

  const initializaAllDatas = async () => {
    let tripList = await getTripListByUnitId();

    const cloneObj = {...state};
    cloneObj.tripList = tripList.data;
    cloneObj.searchOrderList = tripList.data;
    setState(cloneObj);
  };

  const onRefresh = () => {
    dispatch(emptyRefreshControl(true));
    initializaAllDatas();
  };

  const tripCancel = (strCode, intTripId) => {
    let rollback = tripRollBack(strCode, intTripId);

    if (rollback) {
      Alert.alert('Error', 'Trip Roll Back successfully');
      props.navigation.navigate('distributionMenu');
    }
  };

  const tripUpdate = async (strCode) => {
    let tripCompelte = await tripInfoUpdateNRollbackAPI(strCode);
    if (tripCompelte) {
      Alert.alert('Trip Completed', 'Trip Completed Successfully');
      props.navigation.navigate('distributionMenu');
    }
  };

  const tripDetails = async (item) => {
    let dataLoading = await createLoadingSlipchalan(item);
    if (dataLoading.data.trip !== null) {
      props.navigation.navigate('tripComplete', dataLoading.data);
    }

    // props.navigation.navigate('tripComplete');
  };
  const searchText = (searchRequestText) => {
    let cloneObj = {...state};
    if (searchRequestText.length > 0) {
      const newData = state.tripList.filter(function (item) {
        const itemData = item.strCode.toUpperCase();
        const textData = decryptCode(searchRequestText).toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      cloneObj.searchRequestText = decryptCode(searchRequestText);
      cloneObj.searchOrderList = newData;
      setState(cloneObj);
    } else {
      cloneObj.searchOrderList = state.tripList;
      cloneObj.searchRequestText = '';
      setState(cloneObj);
    }
  };

  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshingStatus}
            onRefresh={onRefresh.bind(this)}
          />
        }>
        <View>
          <View style={[styles.postionbox]}>
            <ImageBackground style={[styles.topbar]} source={topbar} />
            <View style={[styles.headerDetails]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexBasis: '65%'}}>
                  <Text style={[styles.headerTitle]}> Trip List </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={[styles.masterInput]}>
              <View style={{flexBasis: '80%', marginRight: 10}}>
                <CustomSearchbar
                  placeHolderText="Search Trip Code"
                  onChangeText={(value) => searchText(value)}
                />
              </View>
              <View style={{flexBasis: '30%', marginRight: 10}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('tripoutScan')}>
                  <Image source={qr} style={[styles.qrImage]} />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={state.searchOrderList}
              renderItem={({item, index, separators}) => (
                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}>
                    <View style={{flexBasis: '38%'}}>
                      <View>
                        <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                          Trip#{encryptCode(item.strCode)}
                        </Text>
                        <Text>{item.strDriver}</Text>
                        <Text>{item.strContact}</Text>
                        <Text>{item.strVehicleRegNo}</Text>
                      </View>
                    </View>

                    <View>
                      <View>
                        <TouchableOpacity
                          onPress={() => tripUpdate(item.strCode)}>
                          <Text
                            style={[
                              styles.buttons,
                              {backgroundColor: 'green', borderWidth: 0},
                            ]}
                            size="small">
                            Complete
                            {/* <Icon name="check" /> */}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View>
                      <View>
                        <TouchableOpacity
                          onPress={() => tripDetails(item.strCode)}>
                          <Text style={styles.buttons} size="small">
                            Details
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginTop: -30,
                    }}>
                    <TouchableOpacity
                      onPress={() => tripCancel(item.strCode, item.intTripId)}>
                      <View>
                        <Text style={styles.buttons}>Rollback</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <View style={{marginTop: 10, fontWeight: 'bold'}}>
                        <Text>Gate Time</Text>
                        <Text>In : {item.dteInsertionTime}</Text>
                        <Text>Capacity & Load</Text>
                        <Text>C : {item.intLoadedWgtBy}</Text>
                      </View>
                    </View>

                    <View>
                      <View style={{marginTop: 10, fontWeight: 'bold'}}>
                        <Text>Loading Time</Text>
                        <Text>In : {item.dteLoadedWgtTime}</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 25,
                    }}></View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: -20,
    backgroundColor: '#FFF',
    padding: 10,
  },

  masterInput: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  statusLoading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  statusTextsq: {
    marginBottom: 5,
    fontWeight: 'bold',
    marginTop: 5,
  },

  statusTextsqq: {
    marginBottom: 24,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2163D8',
  },

  stutusBox: {
    width: wp('25%'),
  },
  statusbg: {
    backgroundColor: '#2163D8',
    padding: 10,
  },

  buttons: {
    backgroundColor: 'blue',
    width: 90,
    height: 30,
    borderRadius: 50,
    textAlign: 'center',
    color: '#fff',
    lineHeight: 30,
  },

  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  dropdownText: {
    color: '#ccc',
  },
  radioContain: {
    flex: 1,
    flexDirection: 'row',
  },

  containers: {
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 2,
  },

  logicStics: {
    fontWeight: 'bold',
  },

  topbar: {
    marginTop: -0,
    width: width,
    height: height / 5.5,
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

  headerTitle: {
    color: '#fff',
    fontSize: RFPercentage(4),
    fontWeight: 'normal',
    paddingVertical: 10,
  },
  button: {
    marginTop: 35,
    marginBottom: 35,
  },
  emplyeeTitle: {
    color: '#202B35',
    fontSize: RFPercentage(2.7),
    fontWeight: 'bold',
    marginLeft: -5,
  },
  employeeid: {
    color: '#202B35',
    fontSize: RFPercentage(2.5),
    marginRight: 20,
  },
  employeeidguard: {
    color: '#202B35',
    fontSize: RFPercentage(2.5),
  },
  icon: {
    width: 32,
    height: 32,
  },
  maxHeight: {
    height: hp('100%'),
  },
  logInputStyle: {
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 2,
    height: 55,
  },

  containers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radio: {
    margin: 1,
    fontSize: 10,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: '#3366FF',
  },
  qrImage: {
    width: 50,
    resizeMode: 'contain',
    height: 50,
  },
});
export default TripListScreen;
