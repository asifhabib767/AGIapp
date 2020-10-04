import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {RFPercentage} from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import topbar from '../../images/top-bar.png';
import {Button, Input} from '@ui-kitten/components';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  departmentSelectHandeling,
  DepartmentInputAddHandling,
  departmentEdit,
  updateDepartment,
} from './../../actions/department/departmentAction';
import {
  GetBusinessDropdown,
  GetStatusDropdown,
} from './../../actions/dropdown/DropdownAction';

const DepartmentEditScreen = (props) => {
  let dispatch = useDispatch();
  const departmentStateStatus = useSelector((state) => state.department.status);
  const inputData = useSelector((state) => state.department.inputData);
  const editValue = useSelector((state) => state.department.editData);
  const businessdropdownList = useSelector(
    (state) => state.dropdown.businessListDDL,
  );

  const statusDropdownList = useSelector(
    (state) => state.dropdown.statusListDDL,
  );

  const handleInputChange = (inputName, inputValue) => {
    dispatch(DepartmentInputAddHandling(inputName, inputValue));
  };

  const handleUpdate = () => {
    dispatch(updateDepartment(inputData));
  };

  const handleSelect = (inputName, index) => {
    dispatch(departmentSelectHandeling(inputName, index));
  };

  useEffect(() => {
    dispatch(GetBusinessDropdown());
    dispatch(GetStatusDropdown());
    dispatch(departmentEdit(props.route.params.id));

    if (departmentStateStatus) {
      props.navigation.goBack();
    }
  }, [departmentStateStatus]);

  return (
    <KeyboardAvoidingView
      style={[GlobalStyles.backgroundColor, styles.maxHeight]}>
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
                  <Text style={[styles.headerTitle]}> Edit Department </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View>
              <Input
                size="large"
                label="Name"
                name="name"
                onChangeText={(value) => handleInputChange('name', value)}
                value={inputData.name}
                placeholder="Employee Name"
              />
            </View>
            <View>
              <Input
                size="large"
                label="Code"
                name="code"
                onChangeText={(value) => handleInputChange('code', value)}
                value={inputData.code}
                placeholder="Employee Name"
              />
            </View>
            <View>
              <Text>Business name</Text>
              <DropDownPicker
                items={businessdropdownList}
                label="Name"
                style={{backgroundColor: '#F4F6F9'}}
                defaultValue={
                  typeof inputData.businessId != 'undefined'
                    ? inputData.businessId
                    : null
                }
                onChangeItem={(value) => handleSelect('businessId', value)}
              />
            </View>
            <View>
              <Text>Status</Text>
              <DropDownPicker
                items={statusDropdownList}
                style={{backgroundColor: '#F4F6F9'}}
                label="Name"
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
