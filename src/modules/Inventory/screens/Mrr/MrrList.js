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
  Alert,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getwhStoreLocation, mrrcreate} from '../../actions/Mrr/MrrAction';
import {FlatList} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Loader from './../../../Master/components/loader/Loader';
import currency from '../../images/currency.png';
import conversion from '../../images/conversion.png';
import {Picker} from '@react-native-community/picker';
import Header from '../../../Master/components/header/Header';

const MrrList = (props) => {
  const [state, setState] = React.useState({
    UnloadedData: [],
    searchOrderList: [],
    searchRequestText: '',
    stateData: {},
    warehouseListData: [],
    warehouseSelected: {},
    warehouseId: 0,
    warehouseName: '',

    receiveQty: 0,
    locationListData: [],
    locationSelected: {},
    locationId: 0,
    locationName: '',
    mrrListData: [],
    mrrQty: 0,
  });
  const isFocused = useIsFocused();

  const {navigate} = props.navigation;
  const dispatch = useDispatch();
  console.log('PropsData', props);

  // let unloadVehicleList = useSelector((state) => state.unloadVehicle.unloadVehicleList);

  let isLoading = useSelector((state) => state.department.isLoading);
  const refreshingStatus = useSelector((state) => state.department.refreshing);
  const departmentListStatus = useSelector(
    (state) => state.department.departmentListStatus,
  );
  console.log('propsData', props);

  useEffect(() => {
    getInitialData();
  }, [isFocused]);

  const getInitialData = async () => {
    let fullObjectData = {...state};
    const locationListData = await getwhStoreLocation(
      props.route.params.state.warehouseId,
    );
    fullObjectData.locationListData = locationListData.data;
    fullObjectData.mrrListData = props.route.params.listData;
    fullObjectData.stateData = props.route.params.state;
    setState(fullObjectData);
  };

  const isValidQunatity = async (quantity, previousReceive, poQuantity) => {
    let sumPreQuantity = parseInt(previousReceive) + parseInt(quantity);
    if (poQuantity > sumPreQuantity) {
      Alert.alert('you are not eligible');
    }
  };

  const changeMrrQunatity = (inputValue, value) => {
    console.log('value', value);
    console.log('inputValue', inputValue);
    let cloneObj = {...state};
    for (let i = 0; i < cloneObj.mrrListData.length; i++) {
      const element = cloneObj.mrrListData[i];
      console.log('element chnagemrrQunatity', element);
      if (element.intItemID == inputValue.intItemID) {
        cloneObj.mrrListData[i].mrrQty = value;
        let rate = cloneObj.mrrListData[i].monRate;
        cloneObj.mrrListData[i].mrrReceiveValue = rate * value;

        let sumPreQuantity =
          parseInt(element.numPrRcv) + parseInt(element.mrrQty);

        if (element.numQty < sumPreQuantity) {
          Alert.alert('Error', `Full PO Quntity has already been received`);
          cloneObj.mrrListData[i].mrrQty = '';
        }

        // if (cloneObj.mrrListData[i].numQty < value) {
        //   Alert.alert(
        //     'Error',
        //     'Issue Quantity can not be greate approved quantity',
        //   );
        //   cloneObj.mrrListData[i].mrrQty = '';
        // }
      }
    }
    setState(cloneObj);
  };

  const checkingIssueQty = () => {
    for (let i = 0; i < state.mrrListData.length; i++) {
      const element = state.mrrListData[i];

      console.log('element', element);

      // if (!element.hasOwnProperty('mrrQty')) {
      //   Alert.alert('Error', 'Please Type Qunatity');
      //   return false;
      // }

      // if (element.mrrQty == 0) {
      //   Alert.alert('Error', 'Please Type Qunatity');
      //   return false;
      // } else if (!element.hasOwnProperty('mrrQty')) {
      //   Alert.alert('Error', 'Please Type Qunatity');
      //   return false;
      // } else if (!element.hasOwnProperty('locationId')) {
      //   Alert.alert('Error', 'Please Select Store Location');
      //   return false;
      // }
    }

    return true;
  };

  const locationSelected = (item, location, index) => {
    let cloneObj = {...state};
    for (let i = 0; i < cloneObj.mrrListData.length; i++) {
      const element = cloneObj.mrrListData[i];
      if (element.intItemID == item.intItemID) {
        cloneObj.mrrListData[i].locationName = location.strLocationName;
        cloneObj.mrrListData[i].locationId = location.intStoreLocationID;
        cloneObj.mrrListData[i].locationSelected = location;

        //  cloneObj.locationId = location.intStoreLocationID
        //  cloneObj.locationName = location.locationName
        //  cloneObj.locationSelected = location
      }
    }
    setState(cloneObj);
  };

  const onSubmit = async () => {
    // let chekQty = checkingIssueQty();

    // return false;

    let mrr = await mrrcreate(state);
    if (mrr.data !== '') {
      Alert.alert('Success', mrr.data);
      props.navigation.navigate('mrr');
    }

    // alert('Submit Successful');
    // props.navigation.navigate('dashboard');
  };

  const {POName} = props.route.params.state;
  return (
    <KeyboardAvoidingView
      style={[GlobalStyles.backgroundColor, styles.container]}>
      <ScrollView>
        <View>
          <View style={[styles.postionbox]}>
            <Header
              title="MRR List"
              button={
                <TouchableOpacity>
                  {/* <Text
                  style={[styles.buttonss]}
                  size="medium"
                  onPress={() =>
                    props.navigation.navigate("addPurchaseRequisition")
                  }
                >
                  ADD
                </Text> */}
                </TouchableOpacity>
              }
            />
            {/* <ImageBackground style={[styles.topbar]} source={topbar} />
            <View style={[styles.headerDetails]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexBasis: "65%" }}>
                  <Text style={[styles.headerTitle]}> MRR List </Text>
                </View>
              </View>
            </View> */}
          </View>

          <View style={[styles.container]}>
            <View>{isLoading ? <Loader /> : null}</View>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 20, margin: 10}}>
                {POName}
              </Text>
            </View>

            <View style={{flexDirection: 'row', flex: 1, margin: 10}}>
              <View style={{flexBasis: '50%'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '30%'}}>
                    <Image source={currency} style={{width: 30, height: 30}} />
                  </View>
                  <View style={{flexBasis: '40%'}}>
                    <Text>Currency</Text>
                  </View>
                  <View style={{flexBasis: '30%'}}>
                    <Text style={{fontWeight: 'bold'}}>BDT</Text>
                  </View>
                </View>
              </View>
              <View style={{flexBasis: '50%'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '30%'}}>
                    <Image
                      source={conversion}
                      style={{width: 30, height: 30}}
                    />
                  </View>
                  <View style={{flexBasis: '40%'}}>
                    <Text>Conversion</Text>
                  </View>
                  <View style={{flexBasis: '30%'}}>
                    <Text style={{fontWeight: 'bold'}}>1.00</Text>
                  </View>
                </View>
              </View>
            </View>
            <FlatList
              data={state.mrrListData}
              keyExtractor={(item) => item.strTripCode}
              renderItem={({item, index, separators}) => (
                <View style={styles.rowViewContainer}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      borderBottomWidth: 2,
                      borderColor: '#ddd',
                      padding: 10,
                    }}
                    key={index}>
                    <View style={styles.itemList}>
                      <View style={{flexDirection: 'row'}}>
                        <Text>#{item.intItemID}</Text>
                      </View>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        {item.itemname}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text>{item.numQty}PCS</Text>
                      </View>
                    </View>

                    <View style={{flexBasis: '40%'}}>
                      <View style={{}}>
                        <TextInput
                          style={[styles.InputField, styles.InputFieldCount]}
                          placeholder="0"
                          placeholderTextColor={'#000000'}
                          // value={state.issueQty}
                          value={state.mrrListData[index].mrrQty}
                          onChangeText={(value) =>
                            changeMrrQunatity(item, value)
                          }
                          keyboardType={'numeric'}
                        />
                      </View>
                      <View
                        style={[
                          styles.InputField,
                          {height: 50, padding: 0, marginTop: 5},
                        ]}>
                        <Picker
                          selectedValue={
                            state.mrrListData[index].locationSelected
                          }
                          style={[styles.selectBoxStyle]}
                          onValueChange={(location) =>
                            locationSelected(item, location, index)
                          }>
                          <Picker.Item label="Store Location" value="" />
                          {state.locationListData &&
                            state.locationListData.map((location, indexNo) => (
                              <Picker.Item
                                label={location.strLocationName}
                                value={location}
                                key={indexNo}
                              />
                            ))}
                        </Picker>
                      </View>
                    </View>
                  </View>

                  <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
                    <View style={{flexBasis: '34%'}}>
                      <Text>PO QTY</Text>
                      <Text style={{fontWeight: 'bold'}}>{item.numQty}</Text>
                    </View>
                    <View style={{flexBasis: '34%'}}>
                      <Text>Description</Text>
                      <Text style={{fontWeight: 'bold'}}>Phillipse</Text>
                    </View>
                    <View style={{flexBasis: '34%'}}>
                      <Text>Prev Receive</Text>
                      <Text style={{fontWeight: 'bold'}}>{item.numPrRcv}</Text>
                    </View>
                  </View>
                </View>
              )}
            />

            <View style={{marginTop: 10}}>
              <TouchableOpacity
                // onPress={() => this.toggleModal()}
                onPress={() => onSubmit()}>
                <Text style={styles.buttonStyle}>
                  {/* {translate("get_in", this.state.system_lang)} */}
                  Save
                </Text>
              </TouchableOpacity>
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
    marginTop: 5,
    marginBottom: 20,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 0,
    borderColor: '#ddd',
    fontSize: 20,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 10,
    // shadowColor: "#eee",
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.0,

    // elevation: 5,
  },
  itemList: {
    flex: 1,
    flexBasis: '60%',
    // flexDirection: "row",
    // justifyContent: "space-between",
    width: wp('68%'),
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
    backgroundColor: '#19d4ee',
    borderColor: '#19d4ee',
    color: '#000',
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
  filterImage: {
    width: 60,
    resizeMode: 'contain',
    height: 50,
  },
  boxStyle: {
    margin: 5,
    padding: 10,
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 5,
  },
  selectBoxStyle: {
    flex: 1,
    flexDirection: 'row',
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 10,
    flexBasis: '100%',
    marginRight: 10,
  },
  buttonStyle: {
    backgroundColor: '#2A71E5',
    color: '#fff',
    fontSize: RFPercentage(3),
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 35,
    textTransform: 'uppercase',
    borderRadius: 10,
  },

  masterInput: {
    // flex: 1,
    // flexDirection: 'row',
    // backgroundColor: '#fff',
    // marginBottom: 10,
  },
  InputField: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    borderColor: '#ddd',
    textAlign: 'center',
  },
  InputFieldCount: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
  },
  innerAreaDiv: {
    marginTop: -10,
    flex: 1,
    margin: 10,
    // backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 15,
    padding: 5,
  },
});
export default MrrList;
