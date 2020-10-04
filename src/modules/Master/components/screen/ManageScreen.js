import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
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

const ManageScreen = (props) => {
  console.log(props);
  const {navigation} = props;

  const [checked, setChecked] = React.useState(false);
  const loginState = useSelector((state) => state.login);
  const [isLoading, setisLoading] = React.useState(false);

  const dispatch = useDispatch();

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  const logout = () => {
    dispatch(logoutAction());
    AsyncStorage.setItem('is_log_in', JSON.stringify(false));
  };

  useEffect(() => {
    if (loginState.logoutStatus && !loginState.isLogin) {
      navigation.navigate('login');
    }
  }, [loginState, loginState.logoutStatus, loginState.isLogin]);

  const getOfflineSyncData = () => {
    let db = SQLite.openDatabase({
      name: 'Iapps.db',
      createFromLocation: '~WWW/Iapps.db',
    });
    setisLoading(true);
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM tblReqObj where isSyncd = 0 `,
            [],
            (tx, results) => {
              let storeRequisition = results.rows.length;
              console.log('storeRequisition', storeRequisition);
              let data = [];
              for (let i = 0; i < storeRequisition; i++) {
                const element = results.rows.item(i);
                let parseData = JSON.parse(element.state);
                let dataState = AddStoreRequisitionAction(parseData);
                // data.push(element);
              }
              setisLoading(false);
              // resolve(data);

              // dispatch({type: Types.GET_DEPARTMENT, payload: responseList});
            },

            (tx, error) => {
              // reject(error);
              setisLoading(false);
            },
          );
        },
        (error) => {},
        (ex) => {},
      );
    });
  };

  return (
    <View style={[GlobalStyles.backgroundColor]}>
      <View>{isLoading ? <Loader /> : null}</View>
      <ScrollView>
        <View>
          <Header title="Menu" subtitle="" />
        </View>
        <View style={[styles.container]}>
          <View style={[GlobalStyles.boxShadow]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {/* <View style={[styles.boxsize]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Account")}
                >
                  <View style={[styles.iconBoxStyle]}>
                    <Image source={accountsImage} style={[styles.ibonbox]} />
                  </View>
                  <Text style={[styles.iconTitle]}> Account </Text>
                </TouchableOpacity>
              </View> */}

              {/* <View style={[styles.boxsize]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('userManagement')}>
                  <View style={[styles.iconBoxStyle]}>
                    <Image source={accountsImage} style={[styles.ibonbox]} />
                  </View>
                  <Text style={[styles.iconTitle]}> User Management </Text>
                </TouchableOpacity>
              </View> */}

              <View style={[styles.boxsize]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SettingList')}>
                  <View style={[styles.iconBoxStyle]}>
                    <Image source={settingsImage} style={[styles.ibonbox]} />
                  </View>
                  <Text style={[styles.iconTitle]}> Setting </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.boxsize]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SettingList')}>
                  <View style={[styles.iconBoxStyle]}>
                    <Image source={helpImage} style={[styles.ibonbox]} />
                  </View>
                  <Text style={[styles.iconTitle]}> Help </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.boxsize]}>
                <TouchableOpacity onPress={() => logout()}>
                  <View style={[styles.iconBoxStyle]}>
                    <Image source={logoutImage} style={[styles.ibonbox]} />
                  </View>
                  <Text style={[styles.iconTitle]}> Logout </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.boxsize]}>
                <TouchableOpacity onPress={() => getOfflineSyncData()}>
                  <View style={[styles.iconBoxStyle]}>
                    <Image source={sync} style={[styles.ibonbox]} />
                  </View>
                  <Text style={[styles.iconTitle]}> Data sync </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.boxsize]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('changePassword')}>
                  <View style={[styles.iconBoxStyle]}>
                    <Image source={helpImage} style={[styles.ibonbox]} />
                  </View>
                  <Text style={[styles.iconTitle]}> Change Password </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={[styles.borderBottom]}></View>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <Text>{`Dark Mode `}</Text>
              <Toggle checked={checked} onChange={onCheckedChange}></Toggle>
            </View> */}
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
});
export default ManageScreen;
