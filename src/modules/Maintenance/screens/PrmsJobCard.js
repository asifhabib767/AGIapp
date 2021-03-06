import React, {useEffect} from 'react';
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
  BackHandler,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import topbar from '../images/top-bar.png';
import {Button, Spinner} from '@ui-kitten/components';
import GlobalStyles from '../../Master/styles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
// import {
//   GetUnloadVehicleList,
//   emptyRefreshControl,
//   ScanDataHandling,
// } from "../../actions/unloadvehicle/UnlaodVehicleAction";
import {FlatList} from 'react-native-gesture-handler';
import {NavigationActions} from 'react-navigation';
import qr from '../images/allowancecheck.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Loader from './../../Master/components/loader/Loader';
import CustomSearchbar from '../../Master/components/CustomSearchBar';
import {decryptCode, encryptCode} from '../../Master/Util/EncryptedCode';
import {
  getPMsList,
  getPmsListByUnitId,
  getJObCard,
} from '../actions/MaintananceAction';
import {getFormattedCurrentDate} from '../../HR/Utils/DateConfigure';

const PrmsJobCard = (props) => {
  const [state, setState] = React.useState({
    UnloadedData: [],
    searchOrderList: [],
    searchRequestText: '',
    pmsDataList: [],
    isLoading: false,
    jobCardList: [],
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    let cloneObj = {...state};
    cloneObj.isLoading = true;
    setState(cloneObj);
    getInitialData();
  }, [isFocused]);

  const getInitialData = async () => {
    let cloneObj = {...state};
    let jobCard = await getJObCard();
    cloneObj.isLoading = jobCard.isLoading;
    cloneObj.jobCardList = jobCard.data.data;
    setState(cloneObj);
  };

  const searchText = (searchRequestText) => {
    let cloneObj = {...state};
    if (searchRequestText.length > 0) {
      const newData = state.UnloadedData.filter(function (item) {
        const itemData =
          item.strCode + ' ' + item.strDriver + ' ' + item.strTripCode + ' ';
        const textData = decryptCode(searchRequestText).toUpperCase();
        return itemData.toUpperCase().indexOf(textData) > -1;
      });
      cloneObj.searchRequestText = decryptCode(searchRequestText);
      cloneObj.searchOrderList = newData;
      setState(cloneObj);
    } else {
      cloneObj.searchOrderList = state.UnloadedData;
      cloneObj.searchRequestText = '';
      setState(cloneObj);
    }
  };

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <ScrollView
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshingStatus}
      //     onRefresh={onRefresh.bind(this)}
      //   />
      // }
      >
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
                  <Text style={[styles.headerTitle]}>JOB CARD</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.container, {backgroundColor: '#FFFFFF'}]}>
            <View>
              {state.isLoading ? (
                <Loader />
              ) : (
                <FlatList
                  data={state.jobCardList}
                  renderItem={({item, index, separators}) => (
                    <TouchableOpacity>
                      <View>
                        <View
                          style={styles.rowViewContainer}
                          //  key={index}
                          key={1}>
                          <View style={styles.itemList}>
                            <View style={{flexBasis: '90%'}}>
                              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                                {item.strCode}
                              </Text>
                            </View>
                            <View>
                              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                                {item.strAssignTo}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              marginLeft: 5,
                            }}>
                            <Text style={{fontSize: 16, color: '#B8B7B7'}}>
                              {`Req ID:` + item.intReqID}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              marginLeft: 5,
                            }}>
                            <Text style={{fontSize: 16, color: '#B8B7B7'}}>
                              {item.strItemName}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              marginLeft: 5,
                            }}>
                            <Text style={{fontSize: 16, color: '#B8B7B7'}}>
                              {`Service ID :` + item.intServiceID}
                            </Text>
                          </View>

                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              marginTop: 5,
                            }}>
                            <View>
                              <Text
                                style={[styles.serviceTypeStyle]}
                                // onPress={() => gotoUnloadScreen(item.strTripCode)}
                              >
                                {item.numReqQty}
                              </Text>
                            </View>
                            {/* <View>
                              <Text
                                style={{
                                  backgroundColor: '#CAFCE1',
                                  padding: 5,
                                  paddingRight: 15,
                                  paddingLeft: 15,
                                  color: '#19C389',
                                  borderRadius: 10,
                                  fontSize: 14,
                                }}>
                                {item.strWareHoseName}
                              </Text>
                            </View> */}
                            {/* <View style={{flexDirection: 'row'}}>
                        <View style={{paddingRight: 10}}>
                          <Icon
                            name="edit"
                            size={20}
                            color={'#3366FF'}
                            onPress={() =>
                              props.navigation.navigate('editDepartment', {
                                id: 2,
                              })
                            }
                          />
                        </View>
                        <View style={{paddingLeft: 10}}>
                          <Icon
                            name="trash"
                            size={20}
                            color={'#3366FF'}
                            onPress={() =>
                              props.navigation.navigate('editDepartment', {
                                id: 2,
                              })
                            }
                          />
                        </View>
                      </View> */}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
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
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    // flexDirection: 'row',
    // alignItems: 'center',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  itemList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%'),
    margin: 5,
  },
  iconsec: {
    flexDirection: 'row',
    width: wp('20%'),
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
    borderRadius: 50,
    marginTop: 15,
  },
  icon: {
    width: 32,
    height: 32,
  },
  buttonss: {
    backgroundColor: '#26C8A1',
    borderColor: '#26C8A1',
    color: '#EEFBF7',
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 13,
    textAlign: 'center',
  },
  buttonActive: {
    backgroundColor: '#B3FFD6',
    borderColor: '#6df3bd',
    color: '#08a571',
    borderRadius: 6,
    paddingVertical: 3,
    textAlign: 'center',
  },
  buttondeActive: {
    backgroundColor: '#B32229',
    borderColor: '#6df3bd',
    color: '#fff',
    borderRadius: 6,
    paddingVertical: 3,
    textAlign: 'center',
  },
  activesizebutton: {
    width: wp('17%'),
    marginRight: 5,
  },
  penIcon: {
    padding: 5,
  },
  qrImage: {
    width: 60,
    resizeMode: 'contain',
    height: 50,
  },

  serviceTypeStyle: {
    backgroundColor: '#F2F8FF',
    padding: 5,
    paddingRight: 15,
    paddingLeft: 15,
    color: '#3586D1',
    borderRadius: 10,
    fontSize: 14,
    marginRight: 10,
  },

  masterInput: {
    // flex: 1,
    // flexDirection: 'row',
    // backgroundColor: '#fff',
    // marginBottom: 10,
  },
});
export default PrmsJobCard;
