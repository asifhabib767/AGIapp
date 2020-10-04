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
import topbar from '../../images/top-bar.png';
import qr from '../../images/qr.png';
import {Button, Spinner} from '@ui-kitten/components';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetLaodedVehicleList,
  emptyRefreshControl,
} from '../../actions/loadedvehicle/LoadedVehicleAction';
import {FlatList} from 'react-native-gesture-handler';
import {NavigationActions} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Loader from './../../../Master/components/loader/Loader';
import CustomSearchbar from '../../../Master/components/CustomSearchBar';
import {ScanDataHandling} from '../../actions/unloadvehicle/UnlaodVehicleAction';
import {encryptCode, decryptCode} from './../../../Master/Util/EncryptedCode';

const LoadedVehicleScreen = (props) => {
  const [state, setState] = React.useState({
    LoadedData: [],
    searchOrderList: [],
    searchRequestText: '',
  });
  const isFocused = useIsFocused();

  const {navigate} = props.navigation;
  const dispatch = useDispatch();

  let isLoading = useSelector((state) => state.department.isLoading);
  const refreshingStatus = useSelector((state) => state.department.refreshing);
  const departmentListStatus = useSelector(
    (state) => state.department.departmentListStatus,
  );

  useEffect(() => {
    getInitialData();
  }, [isFocused]);

  const getInitialData = async () => {
    let LoadedData = await GetLaodedVehicleList();
    LoadedData = LoadedData.data;
    setState({LoadedData, searchOrderList: LoadedData});
  };

  const onRefresh = () => {
    dispatch(emptyRefreshControl(true));
    getInitialData();
  };

  const searchText = (searchRequestText) => {
    let cloneObj = {...state};
    if (searchRequestText.length > 0) {
      const newData = state.LoadedData.filter(function (item) {
        const itemData =
          item.strCode + ' ' + item.strDriver + ' ' + item.strTripCode + ' ';
        const textData = decryptCode(searchRequestText).toUpperCase();
        return itemData.toUpperCase().indexOf(textData) > -1;
      });
      cloneObj.searchRequestText = decryptCode(searchRequestText);
      cloneObj.searchOrderList = newData;
      setState(cloneObj);
    } else {
      cloneObj.searchOrderList = state.LoadedData;
      cloneObj.searchRequestText = '';
      setState(cloneObj);
    }
  };

  const gotoLoadScreen = async (tripCode) => {
    let responseData = await ScanDataHandling(tripCode);

    if (responseData.status) {
      props.navigation.navigate('addLoadedVehicle', responseData);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[GlobalStyles.backgroundColor, styles.container]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshingStatus}
            onRefresh={onRefresh.bind(this)}
          />
        }>
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
                  <Text style={[styles.headerTitle]}> Loaded Vehicle </Text>
                </View>
                <View style={{flexBasis: '25%'}}>
                  <TouchableOpacity>
                    <Text
                      style={[styles.buttonss]}
                      size="medium"
                      onPress={() => props.navigation.navigate('loadedScan')}>
                      ADD
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View>{isLoading ? <Loader /> : null}</View>
            <View style={{flexDirection: 'row', flex: 1, padding: 10}}>
              <View style={{flexBasis: '80%'}}>
                <CustomSearchbar
                  placeHolderText="Search Trip Code"
                  onChangeText={(value) => searchText(value)}
                />
              </View>
              <View style={{flexBasis: '20%', marginRight: 10}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('loadedScan')}>
                  <Image source={qr} style={[styles.qrImage]} />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={state.searchOrderList}
              keyExtractor={(item) => item.Id}
              renderItem={({item, index, separators}) => (
                <View style={styles.rowViewContainer} key={index}>
                  <View style={styles.itemList}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                      #{encryptCode(item.strTripCode)}
                    </Text>
                    <Text
                      style={{
                        backgroundColor: '#1A73E8',
                        padding: 5,
                        paddingRight: 15,
                        paddingLeft: 15,
                        color: '#fff',
                        borderRadius: 10,
                      }}
                      onPress={() => gotoLoadScreen(item.strTripCode)}>
                      Take Weight
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', paddingRight: 60}}>
                    <Text style={{padding: 10}}>
                      {item.strDriver}-{item.strContact}
                    </Text>
                    <Text style={{padding: 10}}>Gate Time</Text>
                  </View>

                  <View style={{flexDirection: 'row', paddingRight: 60}}>
                    <Text style={{padding: 10}}>{item.strVehicleRegNo}</Text>
                    <Text style={{padding: 10}}>{item.dteEmptyWgtTime}</Text>
                  </View>

                  <View style={{flexDirection: 'row', paddingRight: 60}}>
                    <Text style={{padding: 10}}>
                      Empty Weight: {item.numEmptyWeight} Ton
                    </Text>
                    <Text style={{padding: 10}}>
                      Loaded Weight: {item.numLoadedWeight} Ton
                    </Text>
                  </View>
                </View>
              )}
            />
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
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    // flexDirection: 'row',
    // alignItems: 'center',
    fontSize: 20,
    marginLeft: 10,
  },
  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%'),
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
  qrImage: {
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
});
export default LoadedVehicleScreen;
