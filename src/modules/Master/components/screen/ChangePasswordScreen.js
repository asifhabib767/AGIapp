import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Toggle, Text} from '@ui-kitten/components';
import {Dimensions} from 'react-native';
import Header from '../header/Header';
import {RFPercentage} from 'react-native-responsive-fontsize';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import accountsImage from '../../../Master/images/menus/account2x.png';
import logoutImage from '../../../Master/images/menus/logout2x.png';
import settingsImage from '../../../Master/images/menus/settings2x.png';
import helpImage from '../../../Master/images/menus/help2x.png';
import sync from '../../images/sync.png';
import {useDispatch, useSelector} from 'react-redux';
import {logoutAction} from '../../../User/actions/AuthAction';
import {AddStoreRequisitionAction} from '../../../Inventory/actions/StoreRequisition/StoreRequisitionAction';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../loader/Loader';
var SQLite = require('react-native-sqlite-storage');
SQLite.DEBUG(true);

import {Input, Button} from '@ui-kitten/components';
import {ChangePassword} from '../../action/PasswordAction';

const ChangePasswordScreen = (props) => {
  console.log(props);
  const {navigation} = props;
  const [isLoading, setisLoading] = React.useState(false);

  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleSubmit = async () => {
    if (password !== confirmpassword) {
      Alert.alert('Warning', 'Password Confirmation Does not Match !');
      return false;
    }

    const response = await ChangePassword(password);
    console.log('response', response);

    if (response.status) {
      Alert.alert('Success', response.message);
      return false;
    } else {
      Alert.alert('Warning', response.message);
      return false;
    }
  };

  return (
    <View style={[GlobalStyles.backgroundColor]}>
      <View>{isLoading ? <Loader /> : null}</View>
      <ScrollView>
        <View>
          <Header title="Change Password" subtitle="" />
        </View>
        <View style={[styles.container]}>
          <View style={[GlobalStyles.boxShadow]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <View style={{flexBasis: '100%'}}>
                <Input
                  style={[styles.logInputStyle]}
                  size="large"
                  name="password"
                  onChangeText={(value) => setpassword(value)}
                  value={password}
                  placeholder="Type Password"
                />
              </View>

              <View style={{flexBasis: '100%'}}>
                <Input
                  style={[styles.logInputStyle]}
                  size="large"
                  name="password_confirm"
                  onChangeText={(value) => setconfirmpassword(value)}
                  value={confirmpassword}
                  placeholder="Type Confirm Password "
                />
              </View>

              <View>
                <Button
                  style={styles.button}
                  size="large"
                  onPress={() => handleSubmit()}>
                  Change Password
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Bottom navigation */}
    </View>
  );
};
const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconBoxStyle: {
    alignItems: 'center',

    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  iconTitle: {
    color: '#000',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
    paddingVertical: 0,
    textAlign: 'center',
  },
  userui: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
    marginVertical: 20,
  },

  boxsize: {
    flexBasis: '24%',
    margin: 10,
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  ibonbox: {
    height: hp('8%'),
    width: wp('15%'),
    borderRadius: 10,
  },
  logInputStyle: {
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
    fontSize: RFPercentage(2.5),
  },
});
export default ChangePasswordScreen;
