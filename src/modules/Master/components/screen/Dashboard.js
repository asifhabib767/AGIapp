import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

import GlobalStyles from '../../../Master/styles/GlobalStyles';
import p2 from '../../../Master/images/p2.png';
import p3 from '../../../Master/images/p3.png';
import p4 from '../../../Master/images/p4.png';

import p7 from '../../../Master/images/p7.png';
import p8 from '../../../Master/images/p8.png';

import Maintenance from '../../../Master/images/maintenance.png';
import distribution from '../../../Master/images/distribution.png';
import settingsImage from '../../../Master/images/menus/settings2x.png';
import accountUserDefault from '../../../Master/images/accountuser.png';
import {useDispatch, useSelector} from 'react-redux';
import pos from '../../../Master/images/pos.png';
import vessel from '../../../Voyage/images/vessel.png';
import sandq from '../../../S&Q/images/sandq.png';

import Header from './../header/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getAuthAction} from '../../../User/actions/AuthAction';
import {translate} from '../../translations/Localization';
import {getAsyncData} from '../../Util/OfflineData';
import {
  getModulePermissionData,
  checkModulePermission,
} from '../../../User/util/ModulePermission';
import {GetCustomerStatementOnCrLimitAPI} from '../../action/DashboardAction';
import Reports from '../../../S&Q/screens/Reports';

const Dashboard = (props) => {
  const [systemLang, setSystemLang] = React.useState('en');

  const [customerBalance, setcustomerBalance] = React.useState({});
  const {navigation} = props;
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const {
    strEmployeeName,
    strDesignation,
    strDepatrment,
    intEmployeeId,
    intUserTypeID,
  } = authState.userData;

  // Check the isLogged In
  useEffect(() => {
    dispatch(getAuthAction());

    checkPermissionData();
    initializeData();
  }, [props, checkPermissionData]);

  const getAsyncLanguageCode = async () => {
    let system_lang = await getAsyncData('system_lang');

    // let modulePermission = await getModulePermissionData();
    setSystemLang(system_lang);
    // setModule(modulePermission);
  };

  const initializeData = async () => {
    let balance = await GetCustomerStatementOnCrLimitAPI();
    console.log('balance', balance.data[0]);
    setcustomerBalance(balance.data[0]);
  };

  const [enableHR, setEnableHR] = React.useState(false);
  const [enableSales, setEnableSales] = React.useState(false);
  const [enableInventory, setEnableInventory] = React.useState(false);
  const [enableReport, setEnableReport] = React.useState(false);
  const [enableFleet, setEnableFleet] = React.useState(false);
  const [enableDistribution, setEnableDistribution] = React.useState(false);
  const [enableSettings, setEnableSettings] = React.useState(false);
  const [enableCustomer, setEnableCustomer] = React.useState(false);
  const [enableSupply, setEnableSupply] = React.useState(false);

  const [enableVoyage, setEnableVoyage] = React.useState(false);
  const [enablePOS, setEnablePOS] = React.useState(false);
  const [enableMaintanance, setEnableMaintanance] = React.useState(false);
  const [enableSandQ, setEnableSandQ] = React.useState(false);

  const checkPermissionData = async (moduleName = '') => {
    setEnableHR(await checkModulePermission('hr'));
    setEnableSales(await checkModulePermission('sales'));
    setEnableInventory(await checkModulePermission('inventory'));
    setEnableReport(await checkModulePermission('reports'));
    setEnableFleet(await checkModulePermission('fleet'));
    setEnableDistribution(await checkModulePermission('distribution'));
    setEnableSettings(await checkModulePermission('settings'));
    setEnableCustomer(await checkModulePermission('customer'));
    setEnableSupply(await checkModulePermission('supplier'));
    setEnableVoyage(await checkModulePermission('voyage'));
    setEnablePOS(await checkModulePermission('pos'));
    setEnableMaintanance(await checkModulePermission('maintanance'));
    setEnableSandQ(await checkModulePermission('safety'));
  };

  // console.log('intUserTypeID', intUserTypeID);
  // console.log('strUserType', authState.userData.strUserType);
  // console.log('checkModulePermission', await checkModulePermission('sales'));

  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <Header
        title={strEmployeeName}
        subtitle={strDesignation + ', ' + strDepatrment}
        isDashboard={true}
      />
      <ScrollView>
        <View>
          <View style={[styles.container]}>
            {/* <View style={[styles.useruiImg]}>
              <Image style={[styles.userui]} source={userui} />
            </View> */}

            {/* <View>
              <Text style={[styles.fuelTitle]}> Fuel Station Management </Text>
            </View> */}

            <View style={[styles.headerStyle, GlobalStyles.boxShadow]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 2,
                  padding: 10,
                }}>
                <View style={{flexBasis: '22%'}}>
                  <Image source={accountUserDefault} />
                </View>
                <View style={{flexBasis: '78%'}}>
                  <Text style={[styles.employeeName]}>{strEmployeeName}</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginRight: 20,
                      marginTop: 10,
                    }}>
                    <View>
                      <Text style={styles.muteInfo}>
                        {translate('id', systemLang)}
                      </Text>
                      <Text>{intEmployeeId}</Text>
                    </View>
                    <View>
                      <Text style={styles.muteInfo}>
                        {translate('designation', systemLang)}
                      </Text>
                      <Text>
                        {strDesignation}{' '}
                        {strDepatrment != null ? ',' + strDepatrment : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {intUserTypeID == 5 ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                    }}>
                    <Text style={{flexBasis: '60%', fontSize: 18}}>
                      Outstanding
                    </Text>

                    <Text
                      style={{
                        color: '#1C2761',
                        fontWeight: 'bold',
                        flexBasis: '40%',
                        fontSize: 18,
                      }}>
                      {` ট ` + -1 * customerBalance.monOutstanding}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                    }}>
                    <Text style={{flexBasis: '60%', fontSize: 18}}>
                      Credit Limit
                    </Text>

                    <Text
                      style={{
                        color: '#1C2761',
                        fontWeight: 'bold',
                        flexBasis: '40%',
                        fontSize: 18,
                      }}>
                      {` ট ` + customerBalance.monCreditLimit}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                    }}>
                    <Text style={{flexBasis: '60%', fontSize: 18}}>
                      Purchase
                    </Text>

                    <Text
                      style={{
                        color: '#1C2761',
                        fontWeight: 'bold',
                        flexBasis: '40%',
                        fontSize: 18,
                      }}>
                      {` ট ` + customerBalance.monDebit}
                    </Text>
                  </View>
                </>
              ) : null}
            </View>

            <View style={[GlobalStyles.boxShadow, styles.homePageContainer]}>
              {enableHR && (
                <View style={[styles.boxsize]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('hrMenu')}>
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={p7} style={[styles.ibonbox]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {' '}
                      {translate('hr', systemLang)}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {enableCustomer && (
                <View style={[styles.boxsize]}>
                  <TouchableOpacity
                  // onPress={() => navigation.navigate('customerMenu')}
                  >
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={p2} style={[styles.ibonbox]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {' '}
                      {translate('customer', systemLang)}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {enableSupply && (
                <View style={[styles.boxsize]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('supplier')}>
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={p3} style={[styles.ibonbox]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {' '}
                      {translate('Supplier', systemLang)}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* {ysnOwnUser == true ||
                (intUserTypeID == 5 && ( */}
              <>
                {enableSales && (
                  <View style={[styles.boxsize]}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('sales')}>
                      <View style={[styles.iconBoxStyle]}>
                        <Image source={p4} style={[styles.ibonbox]} />
                      </View>
                      <Text style={[styles.iconTitle]}>
                        {' '}
                        {translate('sales', systemLang)}{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* {enableReport && (
                  <View style={[styles.boxsize]}>
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={p5} style={[styles.ibonbox]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {' '}
                      {translate('report', systemLang)}{' '}
                    </Text>
                  </View>
                )} */}
              </>
              {/* ))} */}

              {/* <View style={[styles.boxsize]}>
                  <View style={[styles.iconBoxStyle]}>
                    <Image source={p6} style={[styles.ibonbox]} />
                  </View>
                  <Text style={[styles.iconTitle]}>
                    {' '}
                    {translate('purchase', systemLang)}{' '}
                  </Text>
                </View> */}
              {enableInventory && (
                <View style={[styles.boxsize]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('inventory')}>
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={p7} style={[styles.ibonbox]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {' '}
                      {translate('inventory', systemLang)}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {enableFleet && (
                <View style={[styles.boxsize]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('fleet')}>
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={p8} style={[styles.ibonbox]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {' '}
                      {translate('Fleet', systemLang)}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* <View style={[styles.boxsize]}>
                <TouchableOpacity onPress={() => navigation.navigate('fleet')}>
                  <View style={[styles.iconBoxStyle]}>
                    <Image source={p8} style={[styles.ibonbox]} />
                  </View>
                  <Text style={[styles.iconTitle]}>
                    {' '}
                    {translate('Fleet', systemLang)}{' '}
                  </Text>
                </TouchableOpacity>
              </View> */}

              {/* <View style={[styles.boxsize]}>
                  <View style={[styles.iconBoxStyle]}>
                    <Image source={p9} style={[styles.ibonbox]} />
                  </View>
                  <Text style={[styles.iconTitle]}>
                    {' '}
                    {translate('invoice', systemLang)}{' '}
                  </Text>
                </View> */}

              {enableDistribution && (
                <View style={[styles.boxsize]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('distributor')}>
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={distribution} style={[styles.ibonbox]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {' '}
                      {translate('distribution', systemLang)}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Employee */}
              {/* <View style={[styles.boxsize]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('employee2')}>
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={p1} style={[styles.ibonbox]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {' '}
                      {translate('employee', systemLang)}{' '}
                    </Text>
                  </TouchableOpacity>
                </View> */}

              {enableSettings && (
                <View style={[styles.boxsize]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Setting')}>
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={settingsImage} style={[styles.ibonbox]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {' '}
                      {translate('settings', systemLang)}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {enablePOS && (
                <View style={[styles.boxsize]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('productList')}>
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={pos} style={[styles.ibonboxtwo]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {' '}
                      {translate('pos', systemLang)}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {enableVoyage && (
                <View style={[styles.boxsize]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('voyage')}>
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={vessel} style={[styles.ibonboxtwo]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {' '}
                      {translate('voyage', systemLang)}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* {enableSettings && ( */}
              {/* <View style={[styles.boxsize]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Setting')}>
                  <View style={[styles.iconBoxStyle]}>
                    <Image source={settingsImage} style={[styles.ibonbox]} />
                  </View>
                  <Text style={[styles.iconTitle]}>
                    {' '}
                    {translate('settings', systemLang)}{' '}
                  </Text>
                </TouchableOpacity>
              </View> */}
              {/* )} */}

              {/* {enableMaintenance && ( */}
              {enableMaintanance && (
                <View style={[styles.boxsize]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('maintenance')}>
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={Maintenance} style={[styles.ibonbox]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {translate('maintenance', systemLang)}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {enableSandQ && (
                <View style={[styles.boxsize]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('sandQ')}>
                    <View style={[styles.iconBoxStyle]}>
                      <Image source={sandq} style={[styles.ibonboxtwo]} />
                    </View>
                    <Text style={[styles.iconTitle]}>
                      {' '}
                      {translate('S&Q', systemLang)}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
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
    flex: 1,
    marginHorizontal: 15,
  },
  headerStyle: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  topbar: {
    marginTop: -0,
    width: width,
    height: height / 4,
    resizeMode: 'contain',
  },
  postionbox: {
    position: 'relative',
    backgroundColor: '#1B2662',
    height: 170,
  },
  headerDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },

  headerTitle: {
    color: '#fff',
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingVertical: 10,
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: RFPercentage(2),
  },

  fuelTitle: {
    color: '#000',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingVertical: 20,
  },
  iconBoxStyle: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingBottom: 2,
    width: '100%',
  },
  iconTitle: {
    color: '#000',
    fontSize: RFPercentage(1.8),
    fontWeight: 'normal',
    paddingVertical: 0,
    textAlign: 'center',
  },
  userui: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
    marginVertical: 20,
  },

  homePageContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    // height: hp('25%'),
    minHeight: 260,
  },
  boxsize: {
    // height: hp('18%'), // 70% of height device screen
    // width: wp('21%'),
    flexBasis: '25%',
  },

  ibonbox: {
    height: hp('8%'),
    width: wp('16%'),
    borderRadius: 10,
  },
  ibonboxtwo: {
    height: hp('8%'),
    width: wp('16%'),
    borderRadius: 10,
    // margin: 10,
    marginLeft: 20,
  },
  iconbg: {
    backgroundColor: '#4E72B2',
    width: 100,
    height: 100,
    borderBottomLeftRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  iconstyle: {
    marginTop: -20,
    marginLeft: 20,
  },
  employeeName: {
    fontWeight: 'bold',
    fontSize: RFPercentage(2.2),
  },
  muteInfo: {
    color: 'gray',
  },
});
export default Dashboard;
