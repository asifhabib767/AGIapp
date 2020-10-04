import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {addUnloadVehicle} from '../../actions/unloadvehicle/UnlaodVehicleAction';
import IAppsSelect from '../../../Master/components/select/IAppsSelect';
import IAppsInput from '../../../Master/components/input/IAppsInput';
import Header from '../../../Master/components/header/Header';
import {getUserData} from '../../../User/util/AuthData';

const AddUnloadVehicleScreen = (props) => {
  const {
    strVehicleRegNo,
    strDriver,
    strHelperName,
    numEmptyWeight,
    strTripCode,
    strShippingPointName,
    numLoadedWeight,
  } = props.route.params.data.trip;
  const [state, setState] = React.useState({
    strVehicleRegNo: strVehicleRegNo,
    strDriver: strDriver,
    strHelperName: strHelperName,
    numEmptyWeight: numEmptyWeight,
    UnloadedWeight: numEmptyWeight,
    strTripCode: strTripCode,
    strShippingPointName: strShippingPointName,
    unit: '',
    intUnitId: '',
    userId: '',
    numLoadedWeight: numLoadedWeight,
  });
  const [checked, setChecked] = React.useState(false);

  const [refreshing, setrefreshing] = React.useState(false);

  // let dispatch = useDispatch();
  const inputData = useSelector((state) => state.department.inputData);
  const departmentStateStatus = useSelector((state) => state.department.status);
  const message = useSelector((state) => state.department.message);
  const refreshingStatus = useSelector((state) => state.department.refreshing);

  const businessdropdownList = useSelector(
    (state) => state.dropdown.businessListDDL,
  );
  const status = useSelector((state) => state.dropdown.statusListDDL);
  let [isLoading, setisLoading] = useState(false);

  const handleInputChange = (inputName, inputValue) => {
    let inputData = {...state};
    // inputData.numEmptyWeight = inputValue;
    inputData[inputName] = inputValue;
    setState(inputData);
  };

  const handleSubmit = async (e) => {
    setisLoading(true);
    if (state.UnloadedWeight !== null && state.UnloadedWeight.length == 0) {
      Alert.alert('Warning', 'Please Give Empty Weight !');
      setisLoading(false);
      return false;
    }
    let AddResponseData = await addUnloadVehicle(state);

    if (AddResponseData.status) {
      setisLoading(AddResponseData.isLoading);
      Alert.alert('Weight Taken', 'Unloaded Weight Taken Successfully !');
    } else {
      Alert.alert('Warning', 'Unloaded Weight Already Taken !');
      setisLoading(false);
    }
    props.navigation.navigate('unloadVehicle');
  };

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  const handleSelect = (inputName, index) => {
    dispatch(departmentSelectHandeling(inputName, index));
    // setSelectedIndex(index);
  };

  const unitData = async () => {
    let unit = await getUserData();
    let UnitName = {...state};
    UnitName.unit = unit.strDescription;
    UnitName.intUnitId = unit.intUnitId;
    UnitName.userId = unit.intEmployeeId;
    setState(UnitName);

    // let UnitId = { ...state };
    // UnitId.unit = unit.intUnitId;
    // setState(UnitId);
  };

  useEffect(() => {
    // dispatch(GetBusinessDropdown());
    // dispatch(GetStatusDropdown());
    unitData();
  }, []);

  const initializaAllDatas = () => {
    dispatch(emptyRefreshControl(false));
  };

  const onRefresh = () => {
    dispatch(emptyRefreshControl(true));
    initializaAllDatas();
  };

  return (
    <KeyboardAvoidingView style={{backgroundColor: '#0000000F'}}>
      <ScrollView>
        <View>
          <Header title="Add Unload Vehicle" />
          <View style={[styles.container]}>
            <View style={[styles.masterInput]}>
              <View style={{flexBasis: '50%', marginRight: 10}}>
                <Text style={styles.topText}>{state.unit}</Text>
              </View>
              <View style={{flexBasis: '50%', paddingTop: 1}}>
                <Text style={styles.topText}>{state.strShippingPointName}</Text>
              </View>
            </View>
            <View>
              <IAppsInput
                label="Vehicle No"
                name="vehicleno"
                onChangeText={(value) => handleInputChange('vehicleno', value)}
                placeholder="Vehicle No"
                value={strVehicleRegNo}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View style={{flexBasis: '32%'}}>
                <Text style={styles.challanHeading}>Driver</Text>
                <Text>{strDriver}</Text>
              </View>

              <View style={{flexBasis: '32%'}}>
                <Text style={styles.challanHeading}>Helper</Text>
                <Text>{strHelperName}</Text>
              </View>
              <View style={{flexBasis: '31%'}}>
                <Text style={styles.challanHeading}>Status</Text>
                {state.numEmptyWeight == null && (
                  <Text
                    style={{
                      marginTop: 5,
                      backgroundColor: '#F1B4B4',
                      color: '#C92E2E',
                      padding: 5,
                      textAlign: 'center',
                      borderRadius: 10,
                    }}>
                    Unloaded
                  </Text>
                )}
                {state.numEmptyWeight != null && (
                  <Text
                    style={{
                      marginTop: 5,
                      backgroundColor: '#F1B4B4',
                      color: 'green',
                      padding: 5,
                      textAlign: 'center',
                      borderRadius: 10,
                    }}>
                    Unloaded Completed
                  </Text>
                )}
              </View>
            </View>

            {/* <Text style={[styles.challanHeading, {marginBottom: 0}]}>
              Un Loaded Weight
            </Text> */}
            <View style={[styles.masterInput]}>
              <View style={{flexBasis: '70%', marginRight: 10}}>
                <IAppsInput
                  name="UnloadedWeight"
                  label="Give UnLoaded Weight"
                  onChangeText={(value) => handleInputChange('Unloaded', value)}
                  placeholder="0.00"
                  value={state.UnloadedWeight}
                />
              </View>
              <View style={{flexBasis: '50%', paddingTop: 1}}>
                <Text
                  style={{fontWeight: 'bold', paddingTop: 35, fontSize: 20}}>
                  Ton
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%'}}>
                {isLoading ? (
                  <Button style={styles.button} size="large">
                    TAKE WEIGHT .......
                  </Button>
                ) : (
                  <Button
                    style={styles.button}
                    size="large"
                    onPress={() => handleSubmit()}>
                    TAKE WEIGHT
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
    // marginBottom: 10,
  },
  topText: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    height: 50,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownText: {
    color: '#ccc',
  },
  radioContain: {
    flex: 1,
    flexDirection: 'row',
  },

  challanHeading: {
    fontWeight: 'bold',
    fontSize: 16,
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
});
export default AddUnloadVehicleScreen;
