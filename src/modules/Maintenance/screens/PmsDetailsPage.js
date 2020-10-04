import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {getMaintenanceReportByReqID} from '../actions/MaintananceAction';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/FontAwesome';

const PmsDetailsPage = (props) => {
  const [state, setState] = React.useState({
    pmsDetailsData: [],
    propsDataSet: {},
  });

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let cloneObj = {...state};
    const propsData = props.route.params;
    console.log('propsData', propsData);
    let pmsDetails = await getMaintenanceReportByReqID(propsData.intReqID);
    cloneObj.pmsDetailsData = pmsDetails.data.data;
    cloneObj.propsDataSet = propsData;
    setState(cloneObj);
  };

  return (
    <ScrollView style={[styles.fullbg]}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.AccountDetailsArea]}>
          <View style={[styles.boxGb]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <View>
                <Text style={styles.dealerName}>Ware House</Text>
                <Text style={{marginTop: 20, fontWeight: 'bold'}}>
                  {state.propsDataSet.strWareHoseName}
                </Text>
              </View>
              <View>
                <Text style={styles.dealerName}>Total Qunatity</Text>
                <Text style={{marginTop: 20, fontWeight: 'bold'}}>
                  {state.propsDataSet.numReqQty}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.AccountDetailsArea]}>
          <View style={[styles.boxGb]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                border: 1,
                borderWidth: 1,
                justifyContent: 'center',
                padding: 10,
              }}>
              <View style={([styles.rowContent], {flexBasis: '20%'})}>
                <Text
                  style={{fontWeight: 'bold', color: '#1C2761', fontSize: 20}}>
                  ID
                </Text>
              </View>
              <View style={([styles.rowContent], {flexBasis: '50%'})}>
                <Text
                  style={{fontWeight: 'bold', color: '#1C2761', fontSize: 20}}>
                  Item
                </Text>
              </View>
              <View style={([styles.rowContent], {flexBasis: '30%'})}>
                <Text
                  style={{fontWeight: 'bold', color: '#1C2761', fontSize: 20}}>
                  Quantity
                </Text>
              </View>
            </View>
            <View>
              <View>
                <FlatList
                  data={state.pmsDetailsData}
                  renderItem={({item, index, separators}) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        border: 1,
                        borderWidth: 1,
                        justifyContent: 'center',
                        padding: 20,
                      }}>
                      <View style={{flexBasis: '20%'}}>
                        <Text>{item.intItemID}</Text>
                      </View>
                      <View style={{flexBasis: '50%'}}>
                        <Text>{item.strItemName}</Text>
                      </View>
                      <View style={{flexBasis: '30%'}}>
                        <Text>{item.numReqQty}</Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PmsDetailsPage;

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: '#F2F8FF',
  },
  rowContent: {
    flexBasis: '20%',
    borderWidth: 1,
    justifyContent: 'center',
  },

  container: {
    width: '95%',
    margin: 8,
  },
  AccountDetailsArea: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 113},
  },

  boxGb: {
    flex: 1,
  },

  userStyles: {
    width: 55,
    height: 55,
    backgroundColor: '#D7E8FB',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 100,
    marginRight: 10,
  },

  dealerName: {
    fontSize: RFPercentage(2.5),
    textAlign: 'left',
    color: '#0054A6',
    fontWeight: 'bold',
  },

  creditDetails: {
    flex: 1,
    flexDirection: 'row',
  },
  singleCreditItem: {
    alignItems: 'center',
  },
  creditSectionTitle: {
    color: '#231F20',
    fontSize: 11,
    fontFamily: 'poppins',
    fontWeight: '600',
  },
  creditSectionValue: {
    color: '#231F20',
    fontSize: 18,
    fontFamily: 'poppins',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  creditSectionRedValue: {
    color: '#FF6B6B',
    fontSize: 20,
    fontFamily: 'poppins',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  inputLebel: {
    fontSize: RFPercentage(2.5),
    textAlign: 'left',
    color: '#707070',
    textTransform: 'uppercase',
  },

  inputOutput: {
    fontSize: RFPercentage(2.5),
    textAlign: 'left',
    color: '#231F20',
    fontWeight: 'bold',
    paddingVertical: 5,
    width: '90%',
  },
});
