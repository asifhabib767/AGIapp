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
  departmentEdit,
  updateDepartment,
} from './../../actions/department/departmentAction';
import IAppsSelect from './../../../Master/components/select/IAppsSelect';
import {
  GetBusinessDropdown,
  GetStatusDropdown,
} from './../../actions/dropdown/DropdownAction';
import IAppsInput from './../../../Master/components/input/IAppsInput';
import {showMessage, hideMessage} from 'react-native-flash-message';

const DepartmentEditScreen = (props) => {
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

  const handleInputChange = (inputName, inputValue) => {
    dispatch(DepartmentInputAddHandling(inputName, inputValue));
  };

  const handleSubmit = (e) => {
    dispatch(addDepartment(inputData));
  };

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  const handleSelect = (inputName, index) => {
    dispatch(departmentSelectHandeling(inputName, index));
  };

  useEffect(() => {
    dispatch(GetBusinessDropdown());
    dispatch(GetStatusDropdown());
    dispatch(departmentEdit(props.route.params.id));
    if (departmentStateStatus && message.length > 0) {
      showMessage({
        message: message,
        type: 'success',
      });
      dispatch(emptyMessage());
      // props.navigation.navigate('departmentList');
      props.navigation.goBack();
    } else {
      if (!departmentStateStatus && message.length > 0) {
        showMessage({
          message: message,
          type: 'danger',
        });
        dispatch(emptyMessage());
      }
    }
    initializaAllDatas();
  }, [dispatch, departmentStateStatus, message]);

  const initializaAllDatas = () => {
    dispatch(departmentEdit(props.route.params.id));
    dispatch(emptyRefreshControl(false));
  };

  const onRefresh = () => {
    dispatch(emptyRefreshControl(true));
    initializaAllDatas();
  };
  const handleUpdate = () => {
    dispatch(updateDepartment(inputData));
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
                  <Text style={[styles.headerTitle]}> Edit Department </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View>
              <IAppsInput
                label="Name"
                name="name"
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="Employee Name"
                value={inputData.name}
              />
            </View>
            <View>
              <IAppsInput
                size="large"
                label="Code"
                name="code"
                onChangeText={(value) => handleInputChange('code', value)}
                value={inputData.code}
                placeholder="Employee Name"
              />
            </View>
            <View>
              <IAppsSelect
                name="Business name"
                label="Name"
                items={businessdropdownList}
                defaultValue={
                  typeof inputData.businessId != 'undefined'
                    ? inputData.businessId
                    : null
                }
                // defaultValue={2}
                onChangeItem={(value) => handleSelect('businessId', value)}
              />
            </View>
            <View>
              <IAppsSelect
                name="Status"
                label="Name"
                items={status}
                defaultValue={
                  typeof inputData.statusId != 'undefined'
                    ? inputData.statusId
                    : null
                }
                onChangeItem={(value) => handleSelect('status', value)}
              />
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
                  onPress={() => handleUpdate()}>
                  Save
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
    marginTop: 15,
  },
  dropdownText: {
    color: '#ccc',
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

  headerTitle: {
    color: '#fff',
    fontSize: RFPercentage(4),
    fontWeight: 'normal',
    paddingVertical: 10,
  },
  button: {
    marginTop: 35,
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
});
export default DepartmentEditScreen;
