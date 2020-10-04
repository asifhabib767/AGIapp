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
import DropDownPicker from 'react-native-dropdown-picker';
import {Radio, RadioGroup} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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

import IAppsSelect from '../../../Master/components/select/IAppsSelect';
import {
  GetBusinessDropdown,
  GetStatusDropdown,
} from '../../actions/dropdown/DropdownAction';
import IAppsInput from '../../../Master/components/input/IAppsInput';
import IAppsInputLabel from '../../../Master/components/input/IAppsInputLabel';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Header from '../../../Master/components/header/Header';
import Loader from './../../../Master/components/loader/Loader';
import {encryptCode} from './../../../Master/Util/EncryptedCode';
import {
  getVehicleList,
  searchAction,
  getInSubmitActon,
  searchByRequestShippingno,
} from './../../actions/distribution/GetInAction';

const GetInAddScreen = (props) => {
  const [checked, setChecked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  let [isLoading, setisLoading] = useState(false);
  const [state, setState] = useState({
    doNo: '',
    shipmentPlanintList: [],
    searched_delivery_points: [],
    decQty: '.00',
    intSalesOrderId: '0',
    intCustomerId: '',
    intDriverEnroll: '',
    intProductId: '',
    strProductName: '',
    strRegNo: '',
    intVehicleID: 0,
    intVehicleTypeId: 0,
    ysnOwn: 0,
    logisticBy: 0,
    strType: '',
    intUnitID: 0,
    strUnit: '',
    shippingpointid: 0,
    intShipmentId: 0,
    shppointname: '',
    intRequestId: 0,
    intReqDetailsId: '0',
    strDriverName: '',
    intMeterReadingNo: '0',
    strDriverNID: '',
    strDriverContact: '',
    strLisenceNo: '',
    strHelperName: '',
    strName: '',
    strPickingPointName: '',
    strSalesOrderCode: '',
    suppliername: '',
    strDestinationAddress: '',
    supplierid: 0,
    collapse: false,
    checkinSubmit: false,
    isFound: false,
    isFoundMessage: '',
  });

  const handleInputChange = (searchText) => {
    const cloneObj = {...state};
    cloneObj.doNo = searchText;
    const searched_delivery_points = state.shipmentPlanintList.filter(function (
      item,
    ) {
      const shipmentList = item.Name + ' ' + item.Code;
      // const itemData = item.strDisPointName ? item.strDisPointName.toUpperCase() : ''.toUpperCase();
      const itemData = shipmentList.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (searchText.length > 0) {
      cloneObj.searched_delivery_points = searched_delivery_points;
      setState(cloneObj);
    } else {
      cloneObj.searched_delivery_points = [];
      setState(cloneObj);
    }
  };

  // async function fetchSearchData() {
  //   const cloneObj = {...state};
  //   cloneObj.isLoading = true;

  //   setState(cloneObj);
  //   let data = await searchAction();
  //   cloneObj.shipmentPlanintList = data.data.data;
  //   cloneObj.isLoading = false;
  //   setState(cloneObj);
  // }

  const selectedSearchList = (item) => {
    const cloneObj = {...state};
    cloneObj.doNo = item.Name;
    cloneObj.searched_delivery_points = [];
    setState(cloneObj);
  };

  // useEffect(() => {
  //   fetchSearchData();
  // }, []);

  const handaleSearch = async () => {
    if (state.doNo.length == 0) {
      Alert.alert('Warning', 'Please Give Shipment No !');
      return false;
    }

    let searchData = await searchByRequestShippingno(state.doNo);

    if (searchData.status) {
      let data = searchData.data;
      // stateManageByShipping(searchData.data);
      let logisticBy = 0;
      if (parseInt(data.ysnOwn) === 1 && data.int3rdPartyCOAid == null) {
        logisticBy = 0;
      } else if (parseInt(data.ysnOwn) === 0 && data.int3rdPartyCOAid == null) {
        logisticBy = 1;
      } else if (parseInt(data.ysnOwn) === 0 && data.int3rdPartyCOAid != null) {
        logisticBy = 2;
      }

      let cloneObj = {...state};
      cloneObj.decQty = data.decQty;
      cloneObj.intSalesOrderId = data.intSalesOrderId;
      cloneObj.intCustomerId = data.intCustomerId;
      cloneObj.intProductId = data.intProductId;
      cloneObj.strProductName = data.strProductName.trim();
      cloneObj.strRegNo = data.strRegNo.trim();
      cloneObj.intVehicleID = data.intVehicleID;
      cloneObj.intVehicleTypeId = data.intVehicleTypeID;
      cloneObj.ysnOwn = parseInt(data.ysnOwn);
      cloneObj.logisticBy = logisticBy;
      cloneObj.strType = data.strType;
      cloneObj.strUnit = data.strUnit;
      cloneObj.intUnitID = data.intUnitID;
      cloneObj.shippingpointid = data.shippingpointid;
      cloneObj.intShipmentId = data.intShipmentId;
      cloneObj.shppointname = data.shppointname;
      cloneObj.intRequestId = data.intRequestId;
      cloneObj.intReqDetailsId = data.intReqDetailsId;
      cloneObj.strDriverName = data.strDriverName.trim();
      cloneObj.strDriverNID = data.strDriverNID;
      cloneObj.strDriverContact = data.strDriverContact;
      cloneObj.strLisenceNo = data.strLisenceNo;
      cloneObj.strHelperName = data.strHelperName;
      cloneObj.strPickingPointName = data.strPickingPointName;
      cloneObj.strSalesOrderCode = data.strSalesOrderCode;
      cloneObj.strDestinationAddress = data.strDestinationAddress;
      cloneObj.supplierid = data.supplierid;
      cloneObj.suppliername = data.suppliername;

      cloneObj.isFound = true;
      cloneObj.isFoundMessage = 'Found';
      setState(cloneObj);
    } else {
      let cloneObj = {...state};
      cloneObj.isFound = false;
      cloneObj.isFoundMessage = 'Not Found';
      setState(cloneObj);
    }
  };

  // const stateManageByShipping = (data) => {
  //   let logisticBy = 0;
  //   if (parseInt(data.ysnOwn) === 1 && data.int3rdPartyCOAid == null) {
  //     logisticBy = 0;
  //   } else if (parseInt(data.ysnOwn) === 0 && data.int3rdPartyCOAid == null) {
  //     logisticBy = 1;
  //   } else if (parseInt(data.ysnOwn) === 0 && data.int3rdPartyCOAid != null) {
  //     logisticBy = 2;
  //   }

  //   let cloneObj = {...state};
  //   cloneObj.decQty = data.decQty;
  //   cloneObj.intSalesOrderId = data.decQty;
  //   cloneObj.intCustomerId = data.intCustomerId;
  //   cloneObj.intProductId = data.intProductId;
  //   cloneObj.strProductName = data.strProductName;
  //   cloneObj.strRegNo = data.strRegNo;
  //   cloneObj.intVehicleID = data.intVehicleID;
  //   cloneObj.ysnOwn = parseInt(data.ysnOwn);
  //   cloneObj.logisticBy = logisticBy;
  //   cloneObj.strType = data.strType;
  //   cloneObj.intShipmentId = data.intShipmentId;
  //   cloneObj.intRequestId = data.intRequestId;
  //   cloneObj.intReqDetailsId = data.intReqDetailsId;
  //   cloneObj.strDriverName = data.strDriverName;
  //   cloneObj.strDriverNID = data.strDriverNID;
  //   cloneObj.strDriverContact = data.strDriverContact;
  //   cloneObj.strHelperName = data.strHelperName;
  //   cloneObj.strPickingPointName = data.strPickingPointName;
  //   cloneObj.strSalesOrderCode = data.strSalesOrderCode;
  //   cloneObj.strDestinationAddress = data.strDestinationAddress;
  //   setState(cloneObj);
  // };

  const getRadioData = (index) => {
    let cloneObj = {...state};

    if (index == 0) {
      cloneObj.ysnOwn = 1;
    } else if (index == 1) {
      cloneObj.ysnOwn = 0;
    } else if (index == 2) {
      cloneObj.ysnOwn = 0;
    }
    cloneObj.logisticBy = index;
    setState(cloneObj);
  };

  const handleSubmit = async () => {
    // props.navigation.navigate('getInQrcode', {
    //   ScanValue: {
    //     strCode: '081001212',
    //     strRegNo: state.strRegNo,
    //   },
    // });
    // return false;

    setisLoading(true);

    let post = await getInSubmitActon(state);

    console.log('post', post);

    if (!state.isFound) {
      Alert.alert('Warning', 'Please Give A Correct Shipment No First !');
      return false;
    }

    if (post.status == 200) {
      showMessage({
        message: post.data.message,
        type: 'success',
      });

      setisLoading(post.isLoading);
    }
    let encrytCode = encryptCode(post.data.data.strCode);
    Alert.alert('Trip Created', `Trip Code - ${encrytCode}`);
    let ScanValue = {
      strCode: post.data.data.strCode,
      strRegNo: state.strRegNo,
    };
    props.navigation.navigate('getInQrcode', {ScanValue: ScanValue});
  };
  const showCollapse = async () => {
    let cloneObj = {...state};
    cloneObj.collapse = !cloneObj.collapse;
    setState(cloneObj);
  };

  return (
    <KeyboardAvoidingView style={{backgroundColor: '#0000000F'}}>
      <ScrollView>
        <View>
          <Header title="Get In" />
          {/* <View>{!state.isLoading ? <Loader /> : null}</View> */}

          <View style={[styles.container]}>
            <View style={[styles.masterInput]}>
              <View style={{flexBasis: '70%', marginRight: 10}}>
                <IAppsInput
                  label="Shipment No"
                  name="donumber"
                  onChangeText={(value) => handleInputChange(value)}
                  placeholder="Shipment No"
                  value={state.doNo}
                />
              </View>
              <View>{/* <Text>{`Hello${isLoading}`}</Text> */}</View>
              <View style={{flexBasis: '30%', paddingTop: 1}}>
                <Text>
                  {state.isFound && state.isFoundMessage.length > 0 && (
                    <Text style={{color: 'green'}}>{state.isFoundMessage}</Text>
                  )}
                  {!state.isFound && state.isFoundMessage.length > 0 && (
                    <Text style={{color: 'red'}}>{state.isFoundMessage}</Text>
                  )}
                </Text>

                <TouchableOpacity onPress={() => handaleSearch()}>
                  <Text style={styles.button}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.searchContainer}>
              <FlatList
                data={state.searched_delivery_points}
                keyExtractor={(item) => item.Id}
                renderItem={({item, index, separators}) => (
                  <View style={[styles.serchList]}>
                    <View style={[styles.searchItemContainer]}>
                      <TouchableOpacity
                        onPress={() => selectedSearchList(item)}>
                        <View>
                          <Text style={[styles.searchItem]}>{item.name}</Text>
                          <Text>{item.Code}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View> */}

            <View>
              <IAppsInputLabel label={'Logicstics By'} />
            </View>
            <View style={styles.radioContain}>
              <RadioGroup
                selectedIndex={state.logisticBy}
                style={{flexDirection: 'row', zIndex: 0}}
                onChange={(index) => getRadioData(index)}>
                <Radio>Company</Radio>
                <Radio>Customer</Radio>
                <Radio>Rented</Radio>
              </RadioGroup>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => showCollapse()}>
                <Text style={styles.showRight}>
                  {state.collapse ? 'Show hide' : ' Show Details'}
                </Text>
              </TouchableOpacity>
            </View>
            {state.collapse ? (
              <View>
                <View style={[styles.masterInput]}>
                  <View style={{flexBasis: '50%', marginRight: 10}}>
                    <IAppsInput
                      label="Unit"
                      name="unit"
                      onChangeText={(value) => handleInputChange(value)}
                      placeholder="Unit"
                      value={state.strUnit}
                    />
                  </View>
                  <View style={{flexBasis: '50%', paddingTop: 1}}>
                    <View style={{flexBasis: '50%', marginRight: 10}}>
                      <IAppsInput
                        label="Shipping Point"
                        name="Shipping Point"
                        onChangeText={(value) => handleInputChange(value)}
                        placeholder="Shipment No"
                        value={state.shppointname}
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <IAppsInput
                    label="Vehicle No"
                    name="vehicleno"
                    placeholder="Vehicle No"
                    value={state.strRegNo}
                    editable={true}
                  />
                </View>
                <View>
                  <IAppsInput
                    label="DO No"
                    name="donumber"
                    onChangeText={(value) =>
                      handleInputChange('donumber', value)
                    }
                    placeholder="DO No"
                    value={state.strSalesOrderCode}
                  />
                </View>
                <View>
                  <IAppsInput
                    label="Driver Name"
                    name="drivername"
                    // onChangeText={(value) =>
                    //   handleInputChange('drivername', value)
                    // }
                    placeholder="Driver Name"
                    value={state.strDriverName}
                  />
                </View>
                <View>
                  <IAppsInput
                    label="Helper Name"
                    name="helpername"
                    onChangeText={(value) =>
                      handleInputChange('helpername', value)
                    }
                    placeholder="Helper Name"
                    value={state.strHelperName}
                  />
                </View>
                <View>
                  <IAppsInput
                    label="Contact No"
                    name="contactno"
                    // onChangeText={(value) =>
                    //   handleInputChange('contactno', value)
                    // }
                    placeholder="Contact No"
                    value={state.strDriverContact}
                  />
                </View>
                <View>
                  <IAppsInput
                    label="Driver NID"
                    name="drivernid"
                    // onChangeText={(value) =>
                    //   handleInputChange('drivernid', value)
                    // }
                    placeholder="Driver NID"
                    value={state.strDriverNID}
                  />
                </View>
                <View>
                  <IAppsInput
                    label="Meter Reading No"
                    name="intMeterReadingNo"
                    onChangeText={(value) =>
                      handleInputChange('intMeterReadingNo', value)
                    }
                    placeholder="Meter Reading No"
                    value={state.intMeterReadingNo}
                  />
                </View>
                <View style={[styles.masterInput]}>
                  <View style={{flexBasis: '50%', marginRight: 10}}>
                    <IAppsInput
                      label="Loading Capacity"
                      name="donumber"
                      onChangeText={(value) => handleInputChange(value)}
                      placeholder="Vehicle Capacity"
                      value={'3'}
                    />
                  </View>
                  <View>{/* <Text>{`Hello${isLoading}`}</Text> */}</View>
                  <View style={{flexBasis: '50%'}}>
                    <IAppsInput
                      label="Vehicle Capacity"
                      name="donumber"
                      onChangeText={(value) => handleInputChange(value)}
                      placeholder="Vehicle Capacity"
                      value={'3'}
                    />
                  </View>
                </View>
              </View>
            ) : null}

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '45%'}}>
                <Button
                  onPress={() => props.navigation.navigate('distributionMenu')}
                  style={styles.button}
                  size="large"
                  appearance="outline"
                  status="basic">
                  Back
                </Button>
              </View>

              <View style={{width: '45%'}}>
                {isLoading ? (
                  <Button style={styles.button} size="large">
                    CHECK IN .......
                  </Button>
                ) : (
                  <Button
                    style={styles.button}
                    size="large"
                    onPress={() => handleSubmit()}>
                    CHECK IN
                  </Button>
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
    // marginHorizontal: 15,
    // marginTop: -20,
    backgroundColor: '#FFF',
    padding: 15,
  },

  serchList: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderColor: 'rgb(228, 233, 242)',
    borderWidth: 1,
    // padding: 12px 8px;
  },
  searchItemContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchItem: {
    color: 'rgb(34, 43, 69)',
    fontSize: 13,
    fontWeight: 'bold',
    marginRight: 8,
    marginLeft: 8,
  },

  masterInput: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
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
    marginTop: 12,
    marginBottom: 35,
    backgroundColor: '#1C43EB',
    padding: 12,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 10,
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
  collapseIcocn: {
    justifyContent: 'flex-end',
  },
  // containers: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  // },
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
  searchContainer: {
    marginTop: -32,
    justifyContent: 'center',
  },
  showRight: {
    backgroundColor: '#ccc',
    padding: 10,
  },
});
export default GetInAddScreen;
