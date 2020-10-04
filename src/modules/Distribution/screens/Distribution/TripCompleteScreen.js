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
import Icon from 'react-native-vector-icons/FontAwesome';
import {Radio, RadioGroup} from '@ui-kitten/components';
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
  CheckBox,
} from '@ui-kitten/components';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import acclLogo from '../../../Distribution/images/acclLogo.png';
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
import IAppsInputLabel from '../../../Master/components/input/IAppsInputLabel';
import {showMessage, hideMessage} from 'react-native-flash-message';

const TripCompleteScreen = (props) => {
  let data = props.route.params.trip;
  let qty = props.route.params.qty;

  let [state, setState] = React.useState({
    loadingSlip: false,
    challan: false,
  });

  const [loadingChecked, setloadingChecked] = React.useState(false);
  const [challanChecked, setchallanChecked] = React.useState(false);

  const getRadioData = (index) => {
    let cloneObj = {...state};

    if (index == 0) {
      cloneObj.loadingSlip !== cloneObj.loadingSlip;
    } else if (index == 1) {
      cloneObj.challan !== cloneObj.challan;
    }
    // cloneObj.logisticBy = index;
    setState(cloneObj);
  };

  return (
    <KeyboardAvoidingView>
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
                  <Text style={[styles.headerTitle]}> LOADING SLIP </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.loadingTitle}>
            {/* <CheckBox style={styles.checkbox} status="primary">
              Loading Slip
            </CheckBox> */}
            <CheckBox
              checked={loadingChecked}
              onChange={(nextChecked) => setloadingChecked(nextChecked)}>
              Loading Slip
            </CheckBox>
            <CheckBox
              checked={challanChecked}
              onChange={(nextChecked) => setchallanChecked(nextChecked)}>
              Challan
            </CheckBox>

            <Text>
              <Icon name="print" size={30} color="#900" />
            </Text>
          </View>
          {!loadingChecked ? (
            <View style={[styles.container]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Image source={acclLogo} style={[styles.ibonbox]} />
                </View>
                <View style={{flexBasis: '70%'}}>
                  <Text style={styles.challanHeading}>DELIVERY CHALLAN</Text>
                  <Text style={styles.challanHeading}>
                    Akij Cement Company Ltd.
                  </Text>
                  <Text>Akij Cement . Nobigong, Kodomrosul</Text>
                  <Text>Narayangonj</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Text>Challan No</Text>
                  <Text style={styles.challanHeading}>98654654</Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text>DELIVERY Order</Text>
                  <Text style={styles.challanHeading}>651234778999</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Text>Customer</Text>
                  <Text style={styles.challanHeading}>98654654</Text>
                  <Text style={styles.challanHeading}>
                    {data.strCustomerName},
                  </Text>
                  <Text>(Cash),Gopalgonj</Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text>Delivery At</Text>
                  <Text style={styles.challanHeading}>13/07/2020 11:39 AM</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Text>Vehicle No</Text>
                  <Text style={styles.challanHeading}>
                    {data.strVehicleRegNo}
                  </Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text>Contact Person</Text>
                  <Text style={styles.challanHeading}>
                    Md. Najim Uddin Ahammod
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Text>Driver</Text>
                  <Text style={styles.challanHeading}>{data.strDriver}</Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text>Contact No</Text>
                  <Text style={styles.challanHeading}>{data.strContact}</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Text>Contact No</Text>
                  <Text style={styles.challanHeading}>{data.strContact}</Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text>Address</Text>
                  <Text style={styles.challanHeading}>
                    M/S Arnob & Brothers,
                  </Text>
                  <Text>Gopinathpur Hospital </Text>
                  <Text>Rod, P.S- Gopalgonj Sador, Gopalgonj.</Text>
                  <Text> *Route no : 253*</Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <Text>SL</Text>
                  <Text>PRODUCT</Text>
                  <Text>QNT</Text>
                  <Text>WEIGHT</Text>
                </View>
                {qty.map((item, index) => (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                    }}
                    key={index}>
                    <Text>{++index}</Text>
                    <Text>{item.pName}</Text>
                    <Text>{item.sumDeliveryQuantity}</Text>
                    <Text>20.00</Text>
                  </View>
                ))}
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  backgroundColor: '#F3F6FA',
                  padding: 25,
                }}>
                <View style={{flexBasis: '25%'}}>
                  <Text style={styles.challanHeading}>TOTAL</Text>
                </View>

                <View style={{flexBasis: '40%'}}>
                  <Text style={styles.challanHeading}>2000.00Bag</Text>
                </View>

                <View style={{flexBasis: '25%'}}>
                  <Text style={styles.challanHeading}>2000.00Bag</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '25%'}}>
                  <Text>CHARGE</Text>
                  <Text style={styles.challanHeading}>NO</Text>
                </View>

                <View style={{flexBasis: '40%'}}>
                  <Text>LOGISTIC</Text>
                  <Text style={styles.challanHeading}>By Company </Text>
                  <Text style={styles.challanHeading}>(Rented)</Text>
                  <Text style={styles.challanHeading}>Supp: Prodhan</Text>
                  <Text style={styles.challanHeading}> Transport Ag</Text>
                </View>

                <View style={{flexBasis: '25%'}}>
                  <Text>INCENTIVE</Text>
                  <Text style={styles.challanHeading}>NO</Text>
                </View>
              </View>

              <View style={{flexBasis: '25%', marginTop: 15}}>
                <Text>Vat Challan No: N/A</Text>
              </View>
            </View>
          ) : null}
          {!challanChecked ? (
            <View style={[styles.container]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Image source={acclLogo} style={[styles.ibonbox]} />
                </View>
                <View style={{flexBasis: '70%'}}>
                  <Text style={styles.challanHeading}>Loading SLIP</Text>
                  <Text style={styles.challanHeading}>
                    Akij Cement Company Ltd.
                  </Text>
                  <Text>Akij Cement . Nobigong, Kodomrosul</Text>
                  <Text>Narayangonj</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Text>Challan No</Text>
                  <Text style={styles.challanHeading}>98654654</Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text>DELIVERY Order</Text>
                  <Text style={styles.challanHeading}>651234778999</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Text>Customer</Text>
                  <Text style={styles.challanHeading}>98654654</Text>
                  <Text style={styles.challanHeading}>
                    {data.strCustomerName},
                  </Text>
                  <Text>(Cash),Gopalgonj</Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text>Delivery At</Text>
                  <Text style={styles.challanHeading}>13/07/2020 11:39 AM</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Text>Vehicle No</Text>
                  <Text style={styles.challanHeading}>
                    {data.strVehicleRegNo}
                  </Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text>Contact Person</Text>
                  <Text style={styles.challanHeading}>
                    Md. Najim Uddin Ahammod
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Text>Driver</Text>
                  <Text style={styles.challanHeading}>{data.strDriver}</Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text>Contact No</Text>
                  <Text style={styles.challanHeading}>{data.strContact}</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Text>Contact No</Text>
                  <Text style={styles.challanHeading}>{data.strContact}</Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text>Address</Text>
                  <Text style={styles.challanHeading}>
                    M/S Arnob & Brothers,
                  </Text>
                  <Text>Gopinathpur Hospital </Text>
                  <Text>Rod, P.S- Gopalgonj Sador, Gopalgonj.</Text>
                  <Text> *Route no : 253*</Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <Text>SL</Text>
                  <Text>PRODUCT</Text>
                  <Text>QNT</Text>
                  <Text>WEIGHT</Text>
                </View>
                {qty.map((item, index) => (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                    }}
                    key={index}>
                    <Text>{++index}</Text>
                    <Text>{item.pName}</Text>
                    <Text>{item.sumDeliveryQuantity}</Text>
                    <Text>20.00</Text>
                  </View>
                ))}
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  backgroundColor: '#F3F6FA',
                  padding: 25,
                }}>
                <View style={{flexBasis: '25%'}}>
                  <Text style={styles.challanHeading}>TOTAL</Text>
                </View>

                <View style={{flexBasis: '40%'}}>
                  <Text style={styles.challanHeading}>2000.00Bag</Text>
                </View>

                <View style={{flexBasis: '25%'}}>
                  <Text style={styles.challanHeading}>2000.00Bag</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexBasis: '25%'}}>
                  <Text>CHARGE</Text>
                  <Text style={styles.challanHeading}>NO</Text>
                </View>

                <View style={{flexBasis: '40%'}}>
                  <Text>LOGISTIC</Text>
                  <Text style={styles.challanHeading}>By Company </Text>
                  <Text style={styles.challanHeading}>(Rented)</Text>
                  <Text style={styles.challanHeading}>Supp: Prodhan</Text>
                  <Text style={styles.challanHeading}> Transport Ag</Text>
                </View>

                <View style={{flexBasis: '25%'}}>
                  <Text>INCENTIVE</Text>
                  <Text style={styles.challanHeading}>NO</Text>
                </View>
              </View>

              <View style={{flexBasis: '25%', marginTop: 15}}>
                <Text>Vat Challan No: N/A</Text>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    // marginTop: -20,
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 30,
  },

  containers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    marginBottom: 10,
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

  PromotionsDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  challanHeading: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkbox: {
    margin: 2,
    marginBottom: 20,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: '#3366FF',
  },

  orderText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },

  orderTexts: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  DeliveryOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 10,
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
    padding: 15,
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
    marginLeft: -5,
    fontSize: 10,

    paddingVertical: 15,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: '#3366FF',
  },
  loadingTitle: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});
export default TripCompleteScreen;
