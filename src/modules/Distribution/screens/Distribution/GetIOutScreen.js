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
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import {Radio} from '@ui-kitten/components';
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

const GetOutScreen = (props) => {
  const [checked, setChecked] = React.useState(false);

  const [refreshing, setrefreshing] = React.useState(false);

  let [isLoading, setisLoading] = useState(false);

  let dispatch = useDispatch();
  const inputData = useSelector((state) => state.department.inputData);
  const departmentStateStatus = useSelector((state) => state.department.status);
  const message = useSelector((state) => state.department.message);
  const refreshingStatus = useSelector((state) => state.department.refreshing);

  const businessdropdownList = useSelector(
    (state) => state.dropdown.businessListDDL,
  );
  const status = useSelector((state) => state.dropdown.statusListDDL);

  const handleInputChange = (inputName, inputValue) => {
    // dispatch(DepartmentInputAddHandling(inputName, inputValue));
  };

  const handleSubmit = (e) => {
    dispatch(addDepartment(inputData));
  };

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  const handleSelect = (inputName, index) => {
    // dispatch(departmentSelectHandeling(inputName, index));
    // setSelectedIndex(index);
  };

  useEffect(() => {
    // dispatch(GetBusinessDropdown());
    // dispatch(GetStatusDropdown());
    if (departmentStateStatus && message.length > 0) {
      showMessage({
        message: message,
        type: 'info',
      });
      dispatch(emptyMessage());
      props.navigation.navigate('departmentList');
    } else {
      if (!departmentStateStatus && message.length > 0) {
        showMessage({
          message: message,
          type: 'danger',
        });
        dispatch(emptyMessage());
      }
    }
  }, [dispatch, departmentStateStatus, message]);

  const initializaAllDatas = () => {
    // dispatch(emptyRefreshControl(false));
  };

  const onRefresh = () => {
    // dispatch(emptyRefreshControl(true));
    initializaAllDatas();
  };

  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
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
                  <Text style={[styles.headerTitle]}> Get OUT </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={[styles.masterInput]}>
              <View style={{flexBasis: '50%', marginRight: 10}}>
                <IAppsSelect
                  name="Unit"
                  label="Unit"
                  items={businessdropdownList}
                  onChangeItem={(value) => handleSelect('Unit', value)}
                />
              </View>
              <View style={{flexBasis: '50%', paddingTop: 1}}>
                <IAppsSelect
                  name="ShipPoint"
                  label="ShipPoint"
                  items={businessdropdownList}
                  onChangeItem={(value) => handleSelect('ShipPoint', value)}
                />
              </View>
            </View>

            <View>
              <IAppsInput
                label="Search By Vehicle"
                name="vehicleno"
                onChangeText={(value) => handleInputChange('vehicleno', value)}
                placeholder="Type and Search"
                value={inputData.name}
              />
            </View>

            <View>
              <IAppsInput
                label="Trip No"
                name="tripnumber"
                onChangeText={(value) => handleInputChange('tripnumber', value)}
                placeholder="Type and Search"
                value={inputData.name}
              />
            </View>
            <View>
              <IAppsInput
                label="Driver Name"
                name="drivername"
                onChangeText={(value) => handleInputChange('drivername', value)}
                placeholder="Driver Name"
                value={inputData.name}
              />
            </View>
            <View>
              <IAppsInput
                label="Helper Name"
                name="helpername"
                onChangeText={(value) => handleInputChange('helpername', value)}
                placeholder="Helper Name"
                value={inputData.name}
              />
            </View>
            <View>
              <IAppsInput
                label="Brand Issue Number"
                name="brandissueno"
                onChangeText={(value) =>
                  handleInputChange('brandissueno', value)
                }
                placeholder="Type"
                value={inputData.name}
              />
            </View>
            <Text>Status</Text>
            <View style={[styles.statusLoading]}>
              <View style={styles.stutusBox} style={styles.statusbg}>
                <Text style={styles.statusText}>000.00</Text>
                <Text style={styles.statusText}>Unload</Text>
              </View>
              <View style={styles.stutusBox} style={styles.statusbg}>
                <Text style={styles.statusText}>000.00</Text>
                <Text style={styles.statusText}>Unload</Text>
              </View>

              <View style={styles.stutusBox} style={styles.statusbg}>
                <Text style={styles.statusText}>000.00</Text>
                <Text style={styles.statusText}>Unload</Text>
              </View>

              <View style={styles.stutusBox} style={styles.statusbg}>
                <Text style={styles.statusText}>000.00</Text>
                <Text style={styles.statusText}>Unload</Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '45%'}}>
                <Button
                  style={styles.button}
                  size="large"
                  appearance="outline"
                  status="basic">
                  Back
                </Button>
              </View>
              <View style={{width: '45%'}}>
                <Button
                  style={styles.button}
                  size="large"
                  onPress={() => handleSubmit()}>
                  CHECK IN
                </Button>
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
});
export default GetOutScreen;
