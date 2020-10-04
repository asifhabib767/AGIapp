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
import {Button, Spinner} from '@ui-kitten/components';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import filter from '../../images/filter.png';
import {getPurchaseRequisitionList} from '../../actions/PurchaseRequisition/PurchaseRequisitionAction';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Loader from './../../../Master/components/loader/Loader';
import CustomSearchbar from '../../../Master/components/CustomSearchBar';
import Header from '../../../Master/components/header/Header';
import {FlatList} from 'react-native-gesture-handler';
import {generateStringDateFromDate} from '../../../Master/Util/DateConfigure';

const PurchaseRequisitionList = (props) => {
  const [state, setState] = React.useState({
    PurchaseRequisition: [],
    searchOrderList: [],
    searchRequestText: '',
    refreshingStatus: false,
  });
  const isFocused = useIsFocused();

  const {navigate} = props.navigation;
  const dispatch = useDispatch();

  let isLoading = useSelector((state) => state.department.isLoading);

  const departmentListStatus = useSelector(
    (state) => state.department.departmentListStatus,
  );

  useEffect(() => {
    getInitialData();
  }, [isFocused]);

  const getInitialData = async () => {
    let PurchaseRequisition = await getPurchaseRequisitionList();
    console.log('PurchaseRequisition', PurchaseRequisition.data);
    PurchaseRequisition = PurchaseRequisition.data;
    setState({PurchaseRequisition, searchOrderList: PurchaseRequisition});
  };

  const searchText = (searchRequestText) => {
    let cloneObj = {...state};
    if (searchRequestText.length > 0) {
      const newData = state.PurchaseRequisition.filter(function (item) {
        const itemData = item.intIndentID + ' ' + item.strCCName + ' ';
        const textData = searchRequestText.toUpperCase();
        return itemData.toUpperCase().indexOf(textData) > -1;
      });
      cloneObj.searchRequestText = searchRequestText;
      cloneObj.searchOrderList = newData;
      setState(cloneObj);
    } else {
      cloneObj.searchOrderList = state.PurchaseRequisition;
      cloneObj.searchRequestText = '';
      setState(cloneObj);
    }
  };

  const onRefresh = () => {
    getInitialData();
  };

  return (
    <KeyboardAvoidingView
      style={[GlobalStyles.backgroundColor, styles.container]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={state.refreshingStatus}
            onRefresh={onRefresh.bind(this)}
          />
        }>
        <View>
          <View style={[styles.postionbox]}>
            <Header
              title="Purchase Requisition"
              button={
                <TouchableOpacity>
                  <Text
                    style={[styles.buttonss]}
                    size="medium"
                    onPress={() =>
                      props.navigation.navigate('addPurchaseRequisition')
                    }>
                    ADD
                  </Text>
                </TouchableOpacity>
              }
            />
          </View>

          <View style={[styles.container]}>
            <View style={[styles.innerAreaDiv]}>
              <View>{isLoading ? <Loader /> : null}</View>
              <View style={{flexDirection: 'row', flex: 1, padding: 10}}>
                <View style={{flexBasis: '100%'}}>
                  <CustomSearchbar
                    placeHolderText="Search"
                    onChangeText={(value) => searchText(value)}
                  />
                </View>
              </View>
              <FlatList
                data={state.searchOrderList}
                keyExtractor={(item) => item.strTripCode}
                renderItem={({item, index, separators}) => (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate(
                          'purchaseRequisitionDetals',
                          item,
                        )
                      }>
                      <View style={styles.rowViewContainer}>
                        <View style={styles.itemList}>
                          <View style={{flexDirection: 'row'}}>
                            <Text>Indent Code</Text>
                          </View>
                          <Text style={{fontWeight: 'bold', fontSize: 15}}>
                            {item.intIndentID}
                          </Text>
                          {/* {item.intApprovedBy == null ? (
                          <Text style={styles.notApprovedStatus}>
                            Not Approved
                          </Text>
                        ) : (
                          <Text style={styles.stockStatus}>Approved</Text>
                        )} */}
                        </View>

                        <View style={{flex: 1, flexBasis: '33%'}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text>Date</Text>
                          </View>
                          <Text style={{fontWeight: 'bold', fontSize: 15}}>
                            {item.dteDueDate}
                          </Text>
                          <Text style={{marginTop: 10, fontSize: 15}}>
                            {item.strCCName}
                          </Text>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            flexBasis: '33%',
                          }}>
                          {/* <View style={{flexDirection: 'row'}}>
                          <View style={{padding: 10}}>
                            <View style={{padding: 5}}>
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
                          </View>
                          <View style={{padding: 10}}>
                            <View style={{padding: 5}}>
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
                          </View>
                        </View> */}
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />

              {/* Single Item */}
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
    backgroundColor: '#F3F6FA',
  },
  innerAreaDiv: {
    marginTop: 10,
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 15,
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    flexDirection: 'row',
    // alignItems: 'center',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  itemList: {
    flex: 1,
    flexBasis: '33%',
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
    marginRight: 60,
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

  masterInput: {
    // flex: 1,
    // flexDirection: 'row',
    // backgroundColor: '#fff',
    // marginBottom: 10,
  },
  stockStatus: {
    backgroundColor: '#CAFCE1',
    padding: 5,
    paddingRight: 15,
    paddingLeft: 15,
    width: 90,
    color: 'green',
    borderRadius: 10,
  },

  notApprovedStatus: {
    backgroundColor: '#FFD4D2',
    padding: 5,
    paddingRight: 15,
    paddingLeft: 15,
    width: 90,
    color: '#E93F39',
    borderRadius: 10,
  },
});
export default PurchaseRequisitionList;
