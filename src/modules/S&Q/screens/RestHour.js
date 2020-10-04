import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  StyleSheet,
  ScrollView,
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

import {generateStringDateFromDate} from '../../Master/Util/DateConfigure';

const RestHour = (props) => {
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
              title="Rest Hours Records"
              btnName="Add"
              url={() => props.navigation.navigate('addRestHour')}
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
                <Text style={{fontSize: 17}}>
                  {/* {item.strCargoTypeName} */}
                  Vessel Name
                </Text>
                <View style={styles.itemList}>
                  <View style={{flexBasis: '48%'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        paddingTop: 6,
                        paddingBottom: 6,
                      }}>
                      {/* {item.strVesselName} */}
                      Seafarer Name
                    </Text>
                    <Text style={styles.datestyle}>
                      {/* {generateStringDateFromDate(item.created_at)} */}
                      20 Aug 2020
                    </Text>
                  </View>

                  <View style={{flexBasis: '36%'}}>
                    <Text style={styles.voyagenotwo}>
                      {/* #{item.intVoyageNo} */}
                      Hours
                    </Text>
                    <Text style={styles.voyagenothree}>
                      {/* #{item.intVoyageNo} */}
                      10 Hrs
                    </Text>
                  </View>
                  <View style={{flexBasis: '28%', marginRight: 20}}>
                    <Text
                      style={styles.completestyle}

                      // onPress={() => gotoUnloadScreen(item.strTripCode)}
                    >
                      Approved
                    </Text>
                  </View>
                </View>
              </View>
              {/* )} */}
              {/* /> */}
            </View>

            <View
              style={styles.rowViewContainer}
              //  key={index}
              key={1}>
              {/* <FlatList
                data={JoiningSeafarers}
                renderItem={({item, index, separators}) => ( */}
              <View>
                <Text style={{fontSize: 17}}>
                  {/* {item.strCargoTypeName} */}
                  Vessel Name
                </Text>
                <View style={styles.itemList}>
                  <View style={{flexBasis: '48%'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        paddingTop: 6,
                        paddingBottom: 6,
                      }}>
                      {/* {item.strVesselName} */}
                      Seafarer Name
                    </Text>
                    <Text style={styles.datestyle}>
                      {/* {generateStringDateFromDate(item.created_at)} */}
                      20 Aug 2020
                    </Text>
                  </View>

                  <View style={{flexBasis: '36%'}}>
                    <Text style={styles.voyagenotwo}>
                      {/* #{item.intVoyageNo} */}
                      Hours
                    </Text>
                    <Text style={styles.voyagenothree}>
                      {/* #{item.intVoyageNo} */}
                      10 Hrs
                    </Text>
                  </View>
                  <View style={{flexBasis: '28%', marginRight: 20}}>
                    <Text
                      style={styles.completestyle}

                      // onPress={() => gotoUnloadScreen(item.strTripCode)}
                    >
                      Approved
                    </Text>
                  </View>
                </View>
              </View>
              {/* )} */}
              {/* /> */}
            </View>

            <View
              style={styles.rowViewContainer}
              //  key={index}
              key={1}>
              {/* <FlatList
                data={JoiningSeafarers}
                renderItem={({item, index, separators}) => ( */}
              <View
                style={{
                  marginBottom: 30,
                  borderBottomColor: 'lightgray',
                  borderBottomWidth: 1,
                  paddingBottom: 25,
                }}>
                <Text style={{fontSize: 17}}>
                  {/* {item.strCargoTypeName} */}
                  Vessel Name
                </Text>
                <View style={styles.itemList}>
                  <View style={{flexBasis: '48%'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        paddingTop: 6,
                        paddingBottom: 6,
                      }}>
                      {/* {item.strVesselName} */}
                      Seafarer Name
                    </Text>
                    <Text style={styles.datestyle}>
                      {/* {generateStringDateFromDate(item.created_at)} */}
                      20 Aug 2020
                    </Text>
                  </View>

                  <View style={{flexBasis: '36%'}}>
                    <Text style={styles.voyagenotwo}>
                      {/* #{item.intVoyageNo} */}
                      Hours
                    </Text>
                    <Text style={styles.voyagenothree}>
                      {/* #{item.intVoyageNo} */}
                      10 Hrs
                    </Text>
                  </View>
                  <View style={{flexBasis: '28%', marginRight: 20}}>
                    <Text
                      style={styles.completestyle}

                      // onPress={() => gotoUnloadScreen(item.strTripCode)}
                    >
                      Approved
                    </Text>
                  </View>
                </View>
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

  datestyle: {
    paddingBottom: 20,
  },
  voyageno: {
    fontSize: 16,
  },
  voyagenotwo: {
    fontWeight: '500',
    fontSize: 16,
    paddingTop: 10,
  },
  voyagenothree: {
    fontWeight: '700',
    fontSize: 19,
  },
  completestyle: {
    backgroundColor: '#CAFCE1',
    padding: 7,
    paddingRight: 15,
    paddingLeft: 15,
    color: '#19C389',
    borderRadius: 8,
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});
export default RestHour;
