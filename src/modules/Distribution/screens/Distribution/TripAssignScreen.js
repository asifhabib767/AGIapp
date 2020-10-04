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
  FlatList,
  Picker,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import {Radio, Autocomplete} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import topbar from '../../images/top-bar.png';
import qr from '../../images/qr.png';
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
import GlobalStyles from './../../../Master/styles/GlobalStyles';
import {
  getTripListByUnitId,
  getTripAssinged,
  callPLCAPI,
} from './../../actions/distribution/TripAssignedAction';
import CustomSearchbar from './../../../Master/components/CustomSearchBar';
import {decryptCode} from '../../../Master/Util/EncryptedCode';

/**
 * Test Pusher Applications
 */
// import Pusher from 'pusher-js/react-native';
// import Echo from 'laravel-echo';
import {encryptCode} from './../../../Master/Util/EncryptedCode';

// const options = {
//   broadcaster: 'pusher',
//   key: 'sdsdsd',
//   cluster: 'mt1',
//   forceTLS: true,
//   encrypted: false,
//   //authEndpoint is your apiUrl + /broadcasting/auth
//   authEndpoint: 'https://iapps.akij.net/broadcasting/auth',
//   // As I'm using JWT tokens, I need to manually set up the headers.
// };

// const echo = new Echo(options);

// echo
//   .channel('home')
//   .listen('.requisition.created', (ev) =>
//     console.log('requisition event triggered.', ev.message.text),
//   );

const TripAssignScreen = (props) => {
  const [checked, setChecked] = React.useState(false);

  const [refreshing, setrefreshing] = React.useState(false);
  const [plcData, setPLCData] = React.useState([]);

  const [state, setState] = useState({
    tripList: [],
    searchOrderList: [],
    searchRequestText: '',
  });

  useEffect(() => {
    initializaAllDatas();
  }, []);

  const initializaAllDatas = async () => {
    let cloneObj = {...state};
    let tripListData = await getTripAssinged();
    cloneObj.tripList = tripListData.data;
    cloneObj.searchOrderList = tripListData.data;
    setState(cloneObj);
  };

  const searchText = (searchRequestText) => {
    let cloneObj = {...state};
    if (searchRequestText.length > 0) {
      const newData = state.tripList.filter(function (item) {
        const itemData = item.strCode.toUpperCase();
        const textData = decryptCode(searchRequestText).toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      cloneObj.searchRequestText = decryptCode(searchRequestText);
      cloneObj.searchOrderList = newData;
      setState(cloneObj);
    } else {
      cloneObj.searchOrderList = state.tripList;
      cloneObj.searchRequestText = '';
      setState(cloneObj);
    }
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
                  <Text style={[styles.headerTitle]}> Trip Assign </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={[styles.masterInput]}>
              <View style={{flexBasis: '80%', marginRight: 10}}>
                <CustomSearchbar
                  placeHolderText="Search Trip Code"
                  onChangeText={(value) => searchText(value)}
                />
              </View>
              <View style={{flexBasis: '20%', marginRight: 10}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('scan')}>
                  <Image source={qr} style={[styles.qrImage]} />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={state.searchOrderList}
              keyExtractor={(item) => item.Id}
              renderItem={({item, index, separators}) => (
                <View
                  style={{
                    borderWidth: 0.2,
                    marginBottom: 5,
                    marginRight: 20,
                    padding: 10,
                  }}
                  key={index}>
                  <Text>Shipping Point Name</Text>
                  <Text style={{fontWeight: 'bold', marginBottom: 15}}>
                    {item.strShippingPointName}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <View>
                        <View>
                          <Text style={styles.statusTexts}></Text>
                          <Text style={styles.statusTextsq}></Text>
                          <Text></Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <View>
                        <Text style={styles.statusTexts}></Text>
                        <Text style={styles.statusTextsq}></Text>
                        <Text></Text>
                      </View>
                    </View>

                    <View style={{marginTop: -35}}>
                      <Text style={styles.statusTextsqq}>
                        # {encryptCode(item.strTripCode)}
                      </Text>

                      <Text style={styles.statusTexts}>
                        {item.dteInsertionTime.substring(0, 10)}
                      </Text>

                      <Button
                        style={styles.buttons}
                        size="small"
                        onPress={() =>
                          props.navigation.navigate('assignVehicle', {
                            data: item.strTripCode,
                          })
                        }>
                        Assign Vehicle
                      </Button>
                    </View>
                  </View>
                </View>
              )}
            />

            {/* <Text
              style={{ fontWeight: "bold", marginBottom: 15, marginTop: 20 }}
            >
              Noapara Ghat
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <View>
                  <Text style={styles.statusTexts}>Rest Qty</Text>
                  <Text style={styles.statusTextsq}>42100.00</Text>
                  <Text>Bag Pcc</Text>
                </View>
              </View>

              <View>
                <View>
                  <Text style={styles.statusTexts}>Appr Qty</Text>
                  <Text style={styles.statusTextsq}>10000.00</Text>
                  <Text>Bag Pcc</Text>
                </View>
              </View>

              <View style={{ marginTop: -35 }}>
                <Text style={styles.statusTexts}>14-07-2020</Text>
                <Text style={styles.statusTextsqq}>001234560</Text>

                <Button style={styles.buttons} size="small">
                  Assign Vehicle
                </Button>
              </View>
            </View> */}

            {/* <View
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
            </View> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 5,
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
  statusTextsq: {
    marginBottom: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },

  statusTextsqq: {
    marginBottom: 5,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2163D8',
  },

  stutusBox: {
    width: wp('25%'),
  },
  statusbg: {
    backgroundColor: '#2163D8',
    padding: 10,
  },

  buttons: {
    marginTop: 10,
    marginBottom: 5,
    width: 80,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center',
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
  qrImage: {
    width: 50,
    height: 50,
  },
  qrImage: {
    width: 50,
    resizeMode: 'contain',
    height: 50,
  },
});
export default TripAssignScreen;
