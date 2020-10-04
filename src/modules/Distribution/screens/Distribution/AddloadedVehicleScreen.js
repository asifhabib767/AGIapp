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
  Image,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {
  addLoadedVehicle,
  submitLoadedConditionCheck,
} from '../../actions/loadedvehicle/LoadedVehicleAction';
import IAppsSelect from '../../../Master/components/select/IAppsSelect';
import IAppsInput from '../../../Master/components/input/IAppsInput';
import Header from '../../../Master/components/header/Header';
import {getUserData} from '../../../User/util/AuthData';
import GreenImage from '../../images/Green.png';
import RedImage from '../../images/Red.png';

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
    strTripCode: strTripCode,
    strShippingPointName: strShippingPointName,
    unit: '',
    intUnitId: '',
    userId: '',
    numLoadedWeight: numLoadedWeight,
    Unloaded: numLoadedWeight,
  });

  const [checked, setChecked] = React.useState(false);
  const [refreshing, setrefreshing] = React.useState(false);
  const [isLoadedWeightOk, setisLoadedWeightOk] = React.useState(false);
  let [isLoading, setisLoading] = useState(false);

  // let dispatch = useDispatch();
  const inputData = useSelector((state) => state.department.inputData);
  const departmentStateStatus = useSelector((state) => state.department.status);
  const message = useSelector((state) => state.department.message);
  const refreshingStatus = useSelector((state) => state.department.refreshing);

  const businessdropdownList = useSelector(
    (state) => state.dropdown.businessListDDL,
  );
  const status = useSelector((state) => state.dropdown.statusListDDL);

  const handleInputChange = (inputName, inputValue) => {
    let inputData = {...state};
    // inputData.numEmptyWeight = inputValue;
    inputData[inputName] = inputValue;
    setState(inputData);
  };

  const handleTakeDecission = async (e) => {
    if (state.Unloaded == null) {
      Alert.alert('Warning', 'Please Give Loaded Weight !');
      return false;
    }

    let decissionData = await submitLoadedConditionCheck(state);

    if (decissionData.status) {
      Alert.alert('Loaded Weight Ok', 'Please Take Weight Now !');
      setisLoadedWeightOk(true);
    } else {
      Alert.alert(
        'Loaded Weight Wrong',
        'Loaded Weight Is Wrong or May Be Taken. Please Check Again !',
      );
      setisLoadedWeightOk(false);
    }
  };

  const handleSubmit = async (e) => {
    setisLoading(true);
    if (state.Unloaded == null) {
      Alert.alert('Warning', 'Please Give Loaded Weight !');
      setisLoading(false);
      return false;
    }

    if (!isLoadedWeightOk) {
      Alert.alert(
        'Warning',
        'Loaded Weight Is Wrong. Please Take Decision First !',
      );
      setisLoading(false);
      return false;
    }

    let AddResponseData = await addLoadedVehicle(state);

    if (AddResponseData.status) {
      setisLoading(AddResponseData.isLoading);
      Alert.alert('Weight Taken', 'Loaded Weight Taken Successfully !');
    } else {
      Alert.alert('Warning', 'Loaded Weight Not Taken !');
      setisLoading(false);
    }
    props.navigation.navigate('loadedVehicle');
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
  };

  useEffect(() => {
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
          <Header title="Add Loaded Vehicle" />
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
                {state.numLoadedWeight == null && (
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
                {state.numLoadedWeight != null && (
                  <Text
                    style={{
                      marginTop: 5,
                      backgroundColor: '#F1B4B4',
                      color: 'green',
                      padding: 5,
                      textAlign: 'center',
                      borderRadius: 10,
                    }}>
                    Loaded Completed
                  </Text>
                )}
              </View>
            </View>

            <View style={[styles.masterInput]}>
              <View style={{flexBasis: '50%', marginRight: 10}}>
                <IAppsInput
                  name="UnloadedWeight"
                  label="Give Loaded Weight"
                  onChangeText={(value) => handleInputChange('Unloaded', value)}
                  placeholder="0.00"
                  value={state.Unloaded}
                />
              </View>
              <View style={{flexBasis: '20%', paddingTop: 1}}>
                <Text
                  style={{fontWeight: 'bold', paddingTop: 35, fontSize: 20}}>
                  Ton
                </Text>
              </View>
              {!isLoadedWeightOk && (
                <View style={{flexBasis: '20%', paddingTop: 15}}>
                  <Image source={RedImage} style={{width: 60, height: 60}} />
                </View>
              )}
              {isLoadedWeightOk && (
                <View style={{flexBasis: '20%', paddingTop: 15}}>
                  <Image source={GreenImage} style={{width: 60, height: 60}} />
                </View>
              )}
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%'}}>
                <Button
                  style={[
                    styles.button,
                    {backgroundColor: 'gray', borderWidth: 0},
                  ]}
                  size="large"
                  onPress={() => handleTakeDecission()}>
                  Take Decision
                </Button>
              </View>
              <View style={{width: '48%'}}>
                {isLoading ? (
                  <Button style={styles.button} size="large">
                    Take Weight ......
                  </Button>
                ) : (
                  <Button
                    style={styles.button}
                    size="large"
                    onPress={() => handleSubmit()}>
                    Take Weight
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
  topText: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    height: 50,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 0,
  },
  masterInput: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
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
