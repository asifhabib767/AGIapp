import React, { useEffect } from 'react';
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
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyles from '../../Master/styles/GlobalStyles';
import tripOut from '../images/tripOut.png';
import { getModulePermissionData, checkModulePermission } from '../../User/util/ModulePermission';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CardMenu from '../../Master/components/cards/CardMenu';
import Header from '../../Master/components/header/Header';
import { getAuthAction } from '../../User/actions/AuthAction';

const FleetMenu = (props) => {
  const [value, setValue] = React.useState('');

  const [date, setDate] = React.useState(new Date());
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const ysnOwnUser = userData.ysnOwnUser;

  const [checked, setChecked] = React.useState(false);

  // Check the isLogged In
  useEffect(() => {
    dispatch(getAuthAction());
    checkPermissionData();
  }, [props, checkPermissionData]);


  const [enableFleetDriver, setEnableFleetDriver] = React.useState(false);
  const [enableFleetShipping, setEnableFleetShipping] = React.useState(false);

  const checkPermissionData = async (moduleName = '') => {
    setEnableFleetDriver(await checkModulePermission('fleet_driver'));
    setEnableFleetShipping(await checkModulePermission('fleet_shipping'));
  }


  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
        <View>
          <Header title="Fleet" />
          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              {enableFleetShipping && userData.intUnitId == 17 && (
                <CardMenu
                  image={tripOut}
                  cardText="Akij shipping"
                  url={() => props.navigation.navigate('shippingMenu')}
                  customStyle={styles.cardStyle}
                />
              )}
              {enableFleetDriver && (
                <CardMenu
                  image={tripOut}
                  cardText="Driver Menu"
                  url={() => props.navigation.navigate('logisticsMenu')}
                  customStyle={styles.cardStyle}
                />
              )}


            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  cardStyle: {
    marginBottom: 10,
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
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },

  cardSize: {
    width: wp('50%'),
    height: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
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
export default FleetMenu;
