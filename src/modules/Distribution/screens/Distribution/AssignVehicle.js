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
  GetTripDetailsByTripCode,
  assignVehicle,
  getExtraChargeType,
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
import IAppsInputLabel from '../../../Master/components/input/IAppsInputLabel';
import {showMessage, hideMessage} from 'react-native-flash-message';
// import { Picker } from "@react-native-community/picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import {encryptCode} from './../../../Master/Util/EncryptedCode';

const AssignVehicle = (props) => {
  const [checked, setChecked] = React.useState(false);
  const [refreshing, setrefreshing] = React.useState(false);
  const [tripDetails, setTripDetails] = React.useState();
  const [extraChargeTypeList, setExtraChargeTypeList] = React.useState([]);
  const [extraChargeId, setExtraChargeId] = React.useState();
  const [extraChargeName, setExtraChargeName] = React.useState();
  const [incentiveId, setIncentiveId] = React.useState();
  const [incentiveName, setIncentiveName] = React.useState();
  const [pcc, setPcc] = React.useState();
  const [vehicleNo, setVehicleNo] = React.useState();

  const [state, setState] = React.useState({
    orders: [],
    qty: [],
    trip: {},
    strVehicleRegNo: '',
    ysnOwn: 0,
    logisticBy: 0,
    ysnLogisticByCompany: 0,
    ysnChargeToSupplier: 0,
  });

  const refreshingStatus = useSelector((state) => state.department.refreshing);

  const businessdropdownList = useSelector(
    (state) => state.dropdown.businessListDDL,
  );
  const status = useSelector((state) => state.dropdown.statusListDDL);
  let [isLoading, setisLoading] = useState(false);

  const handleSubmit = async () => {
    setisLoading(true);
    if (extraChargeId === undefined) {
      alert('Please select an extra charge.');
      setisLoading(false);
      return false;
    }
    if (incentiveId === undefined) {
      alert('Please select an incentive.');
      setisLoading(false);
      return false;
    }

    let response = await assignVehicle(state, extraChargeName, incentiveName);

    if (response.data !== '') {
      setisLoading(response.isLoading);

      Alert.alert('Challan Created', `Challan No - ${response.data}`);
    }

    // Alert.alert('Success', 'Submit Success fully');
    // props.navigation.navigate('tripAssign');
  };

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  useEffect(() => {
    initializaAllDatas();
  }, []);

  const initializaAllDatas = async () => {
    let cloneObj = {...state};
    let tripDetailsData = await GetTripDetailsByTripCode(
      props.route.params.data,
    );

    let ysnOwndata = tripDetailsData.data.data.trip.ysnOwn;

    if (ysnOwndata == 0) {
      cloneObj.ysnOwn = 1;
      cloneObj.ysnLogisticByCompany = 1;
      cloneObj.ysnChargeToSupplier = 0;
    } else if (ysnOwndata == 1) {
      cloneObj.ysnOwn = 0;
      cloneObj.ysnLogisticByCompany = 0;
      cloneObj.ysnChargeToSupplier = 0;
    }
    cloneObj.orders = tripDetailsData.data.data.orders;
    cloneObj.qty = tripDetailsData.data.data.qty;
    cloneObj.trip = tripDetailsData.data.data.trip;
    cloneObj.strVehicleRegNo = tripDetailsData.data.data.trip.strVehicleRegNo;
    setState(cloneObj);

    // Extra Charge Type List Data
    // let extraChargeTypeListData = await getExtraChargeType();
    // await setExtraChargeTypeList(extraChargeTypeListData);
  };

  const onRefresh = () => {
    // dispatch(emptyRefreshControl(true));
    // initializaAllDatas();
  };

  const quantityChange = (value, index) => {
    let cloneObj = {...state};
    for (let i = 0; i < cloneObj.qty.length; i++) {
      const element = cloneObj.qty[i];
      element.sumDeliveryQuantity = value;
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
                  <Text style={[styles.headerTitle]}> Assign Vehicle </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View>
              <IAppsInputLabel label={'Logicstics By'} />
            </View>
            <View style={styles.radioContain}>
              <RadioGroup
                selectedIndex={state.ysnOwn}
                style={{flexDirection: 'row', zIndex: 0}}>
                <Radio>Company</Radio>
                <Radio>Customers</Radio>
                <Radio>Rented</Radio>
              </RadioGroup>
            </View>

            <View>
              <IAppsInput
                label="Vehicle No"
                name="vehicleno"
                onChangeText={(value) => setVehicleNo(value)}
                placeholder="Type and Search"
                value={state.trip.strVehicleRegNo}
              />
            </View>

            <View style={[styles.statusLoading]}>
              <View style={styles.stutusBox} style={styles.statusbg}>
                <Text style={styles.statusText}>
                  {tripDetails != undefined
                    ? tripDetails.trip.numLoadingCapacity
                    : ''}
                </Text>
                <Text style={styles.statusText}>Capacity</Text>
              </View>
              <View style={styles.stutusBox} style={styles.statusbg}>
                <Text style={styles.statusText}>
                  {tripDetails != undefined ? tripDetails.trip.intLoadUOM : ''}
                </Text>
                <Text style={styles.statusText}>Loaded</Text>
              </View>

              <View style={styles.stutusBox} style={styles.statusbg}>
                <Text style={styles.statusText}>Not Entered</Text>
                <Text style={styles.statusText}>Wb.in</Text>
              </View>
            </View>

            <View style={[styles.masterInput]}>
              <View style={{flexBasis: '50%', marginRight: 10}}>
                {/* <IAppsSelect
                  name="Charge"
                  label="Charge"
                  items={businessdropdownList}
                  onChangeItem={(value) => handleSelect("Charge", value)}
                /> */}
                <View>
                  <Picker
                    selectedValue={extraChargeName}
                    style={[styles.Vehicle]}
                    onValueChange={(itemValue, itemIndex) => {
                      setExtraChargeId(itemIndex),
                        setExtraChargeName(itemValue);
                    }}>
                    <Picker.Item label="Select Extra Charge" value="" />
                    {/* {extraChargeTypeList.map((item, index) => (
                      <Picker.Item
                        label={item.strIncentiveName}
                        value={item.intIncentiveId}
                        key={index}
                      />
                    ))} */}
                    <Picker.Item label="No" value={4} />
                    <Picker.Item label="Labour" value={17} />
                  </Picker>
                </View>
              </View>
              <View style={{flexBasis: '50%', paddingTop: 1}}>
                {/* <IAppsSelect
                  name="incentive"
                  label="incentive"
                  items={businessdropdownList}
                  onChangeItem={(value) => handleSelect("incentive", value)}
                /> */}

                <Picker
                  selectedValue={incentiveName}
                  style={[styles.Vehicle]}
                  onValueChange={(itemValue, itemIndex) => {
                    setIncentiveName(itemValue), setIncentiveId(itemIndex);
                  }}>
                  <Picker.Item label="Select Incentive" value="" />
                  {/* {extraChargeTypeList.map((item, index) => (
                      <Picker.Item
                        label={item.strIncentiveName}
                        value={item.intIncentiveId}
                        key={index}
                      />
                    ))} */}
                  <Picker.Item label="No" value={4} />
                  <Picker.Item label="Trawler" value={17} />
                </Picker>
              </View>
            </View>

            <Text style={{color: '#2163D8', fontWeight: 'bold'}}>
              {' '}
              Delivery Order{' '}
            </Text>

            <FlatList
              data={state.qty}
              renderItem={({item, index, separators}) => (
                <View style={[styles.DeliveryOrder]}>
                  <View>
                    <Text>{item.pName}</Text>
                  </View>
                  <View style={{marginTop: -30}}>
                    <IAppsInput
                      name="pcc"
                      onChangeText={(value) => quantityChange(value, index)}
                      placeholder="Type"
                      value={`${item.sumDeliveryQuantity}`}
                    />
                  </View>
                  <View>
                    <Text style={styles.orderText}>
                      <Icon name="pencil" size={30} />
                    </Text>
                  </View>
                </View>
              )}
            />

            {/* <Text style={{marginBottom: 10}}>Promotion Details</Text>
            <View style={[styles.PromotionsDetails]}>
              <View>
                <Text style={styles.orderText}>PCC</Text>
              </View>
              <View>
                <Text style={styles.orderText}>2000.00 Bag</Text>
              </View>

              <View>
                <Text style={styles.orderTexts}>2000.00 Bag</Text>
              </View>
            </View> */}

            <View>
              <View>
                {isLoading ? (
                  <Button style={styles.button} size="large" Assign Vehicle>
                    {' '}
                    Assign Vehicle ........
                  </Button>
                ) : (
                  <Button
                    style={styles.button}
                    size="large"
                    onPress={() => handleSubmit()}>
                    Assign Vehicle
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
    marginHorizontal: 15,
    marginTop: -20,
    backgroundColor: '#FFF',
    padding: 15,
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
    marginBottom: 10,
  },
  stutusBox: {
    width: wp('25%'),
  },
  statusbg: {
    backgroundColor: '#2163D8',
    padding: 10,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  PromotionsDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  orderText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },

  orderTexts: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  DeliveryOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 10,
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
    padding: 15,
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
    marginLeft: -5,
    fontSize: 10,

    paddingVertical: 15,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: '#3366FF',
  },
});
export default AssignVehicle;
