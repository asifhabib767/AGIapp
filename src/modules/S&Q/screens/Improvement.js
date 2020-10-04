import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CustomSearchbar from '../../Master/components/CustomSearchBar';
import {decryptCode, encryptCode} from '../../Master/Util/EncryptedCode';
import HeaderButton from '../../Master/components/header/HeaderButton';

const Improvement = (props) => {
  const [state, setState] = React.useState({
    UnloadedData: [],
    searchOrderList: [],
    searchRequestText: '',
  });
  const isFocused = useIsFocused();
  const {navigate} = props.navigation;
  const dispatch = useDispatch();

  // let isLoading = useSelector((state) => state.voyage.isLoading);
  // const voyageList = useSelector((state) => state.voyage.voyageList);

  useEffect(() => {
    getInitialData();
  }, [isFocused]);

  const getInitialData = async () => {
    // dispatch(getVoyageListAction());
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

  const onRefresh = () => {
    // dispatch(emptyRefreshControl(true));
    getInitialData();
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
        <View style={{backgroundColor: '#F3F6FA'}}>
          <View style={[styles.postionbox]}>
            <HeaderButton
              title="Improvement"
              btnName="Add"
              url={() => props.navigation.navigate('addImprovement')}
            />
          </View>

          <View
            style={[
              styles.container,
              {
                backgroundColor: '#fff',
                margin: 10,
                marginTop: -10,
                borderRadius: 20,
                paddingLeft: 10,
              },
            ]}>
            <View style={{flexDirection: 'row', flex: 1, padding: 10}}>
              <View style={{flexBasis: '99%'}}>
                <CustomSearchbar
                  placeHolderText="Search"
                  onChangeText={(value) => searchText(value)}
                />
              </View>
            </View>

            {/* <View>{isLoading ? <Loader /> : null}</View> */}

            <View
              style={styles.rowViewContainer}
              //  key={index}
              key={1}>
              {/* <FlatList
                data={JoiningSeafarers}
                renderItem={({item, index, separators}) => ( */}
              <View>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(
                      'addImprovement',
                      // {
                      //   item: item,
                      // }
                    )
                  }>
                  <Text style={{fontSize: 15}}>
                    {/* {item.strCargoTypeName} */}
                    20 Aug 2020
                  </Text>
                  <View style={styles.itemList}>
                    <View style={{flexBasis: '70%'}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          paddingTop: 6,
                          paddingBottom: 6,
                        }}>
                        {/* {item.strVesselName} */}
                        IMP 00212
                      </Text>
                      <Text style={styles.datestyle}>
                        {/* {generateStringDateFromDate(item.created_at)} */}
                        Replace broken ladder
                      </Text>
                    </View>

                    <View style={{flexBasis: '30%', marginLeft: 30}}>
                      <Text
                        style={styles.completestyle}

                        // onPress={() => gotoUnloadScreen(item.strTripCode)}
                      >
                        Pending
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              {/* )} */}
              {/* /> */}
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
    backgroundColor: '#FFF',
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',

    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  itemList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%'),
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
    padding: 20,
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

  datestyle: {
    paddingBottom: 20,
  },
  voyageno: {
    fontSize: 16,
  },
  voyagenotwo: {
    fontWeight: '500',
    fontSize: 16,
    paddingTop: 40,
  },
  completestyle: {
    backgroundColor: '#CAFCE1',
    padding: 7,
    paddingRight: 15,
    paddingLeft: 15,
    color: '#19C389',
    borderRadius: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});
export default Improvement;
