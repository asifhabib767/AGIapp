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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/FontAwesome';
import {GetDataForIndentItemDetailsForAPI} from '../../actions/PurchaseRequisition/PurchaseRequisitionAction';

const PurchaseRequistionDetails = (props) => {
  const [state, setState] = React.useState({
    purchaseDataSet: [],
    propsDataSet: {},
  });

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let cloneObj = {...state};
    const propsData = props.route.params;
    console.log('propsData', propsData);
    let purchseData = await GetDataForIndentItemDetailsForAPI(
      propsData.intIndentID,
    );
    console.log('purchseData', purchseData);
    cloneObj.purchaseDataSet = purchseData.data;
    cloneObj.propsDataSet = propsData;
    setState(cloneObj);
  };

  return (
    <ScrollView style={[styles.fullbg]}>
      <SafeAreaView style={styles.container}>
        {/* <View style={[styles.AccountDetailsArea]}>
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
        </View> */}

        <View style={[styles.AccountDetailsArea]}>
          <View style={[styles.boxGb]}>
            <View>
              <View>
                <FlatList
                  data={state.purchaseDataSet}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => (
                    // <TouchableOpacity onPress={()=>this.handleData(item)}>

                    <View style={[styles.distributorDetails]}>
                      <View style={{flexBasis: '65%'}}>
                        <Text style={[styles.distributerName]}>
                          {' '}
                          Item Id #{item.intitemid}{' '}
                        </Text>
                        <Text style={{marginLeft: 8, fontWeight: 'bold'}}>
                          Product Name: {item.strName}{' '}
                        </Text>
                        <Text style={{marginLeft: 8}}>
                          Unit: {item.strUnit}
                        </Text>
                        <Text style={{marginLeft: 8}}>
                          Indent BY: {item.strIndentBy}
                        </Text>

                        <Text style={{marginLeft: 8}}>
                          price: {item.decLastPrice}
                        </Text>
                        <Text style={{marginLeft: 8}}>UOM: {item.strUOM}</Text>
                        <Text style={{marginLeft: 8}}>
                          Indent Date: {item.dteIndentDate}
                        </Text>
                        <Text style={{marginLeft: 8}}>
                          Approved By: {item.strApproveBy}
                        </Text>
                        <Text style={{marginLeft: 8}}>
                          Final Approved Date: {item.dteFianlAprvDate}
                        </Text>
                        <Text style={{marginLeft: 8}}>
                          Purpose: {item.strPurpouse}
                        </Text>
                      </View>
                      <View
                        style={{flexBasis: '35%', justifyContent: 'center'}}>
                        <Text style={[styles.distributerLocation]}>
                          Q: {item.numPieces}{' '}
                        </Text>
                        <Text style={styles.chalanValueText}>
                          ‎৳{item.decQnt}
                        </Text>
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

export default PurchaseRequistionDetails;

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: '#F2F8FF',
  },
  rowContent: {
    flexBasis: '20%',
    borderWidth: 1,
    justifyContent: 'center',
  },
  chalanValueText: {
    textAlign: 'center',
    backgroundColor: '#2E4798',
    color: '#FAFAFA',
    fontSize: RFPercentage(3),
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
  },

  distributorDetails: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
    textAlign: 'left',
  },
  distributerLocation: {
    textAlign: 'center',
    color: '#000000',
    fontSize: RFPercentage(2.5),
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: 30,
  },
  distributerName: {
    color: '#707070',
    fontSize: RFPercentage(2.5),
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
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
