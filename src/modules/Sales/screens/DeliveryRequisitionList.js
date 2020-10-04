import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import {salesPlanService} from './../service/sales/SalesPlanService';
import {getDeliveryRequstDo} from '../service/sales/DeliveryRequisitionService';

export default class DeliveryRequisitionList extends Component {
  state = {
    salesPlan: [],
    DoList: [],
  };

  async componentDidMount() {
    // const salesPlan = salesPlanService();
    // this.setState({salesPlan});
    let DoList = await getDeliveryRequstDo();
    this.setState({DoList});
  }

  render() {
    return (
      <KeyboardAvoidingView style={{backgroundColor: '#fff', marginBottom: 80}}>
        <ScrollView style={{height: '100%', backgroundColor: '#fff'}}>
          <SafeAreaView style={[styles.container]}>
            <View style={[styles.bgbox]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingBottom: 10,
                  paddingLeft: 15,
                }}>
                <View style={{flexBasis: '60%'}}>
                  <Text style={[styles.headingOne]}>Delivery Requistion</Text>
                </View>
                <View
                  style={{
                    flexBasis: '30%',
                    flex: 1,
                    flexDirection: 'row',
                    marginLeft: 15,
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={[styles.styleButtionOne]}
                    onPress={() =>
                      this.props.navigation.navigate('deliveryRequisition')
                    }>
                    {' '}
                    <Icon name="plus" /> Add{' '}
                  </Text>
                </View>
              </View>

              {this.state.DoList.length !== 0 && (
                <View>
                  <View style={[styles.tableHeading]}>
                    <View style={{flexBasis: '25%'}}>
                      <Text style={[styles.tableTitle]}> DO No</Text>
                    </View>
                    <View style={{flexBasis: '25%'}}>
                      <Text style={[styles.tableTitle]}>Product</Text>
                    </View>
                    <View style={{flexBasis: '28%'}}>
                      <Text style={[styles.tableTitle]}>DO Qty </Text>
                    </View>
                    <View style={{flexBasis: '28%'}}>
                      <Text style={[styles.tableTitle]}>Pending Qty </Text>
                    </View>
                  </View>

                  <ScrollView>
                    <View style={{borderColor: '#ccc', borderWidth: 1}}>
                      <FlatList
                        data={this.state.DoList}
                        renderItem={({item}) => (
                          <View style={[styles.tableField]}>
                            <View style={{flexBasis: '35%'}}>
                              <Text style={[styles.shopTitle]}>
                                {' '}
                                {/* {item.intid}{' '} */} {item.strCode}{' '}
                              </Text>
                              {/* <Text style={[styles.shopId]}>
                                {item.strProductName}{' '}
                              </Text> */}
                            </View>
                            <View style={{flexBasis: '21%'}}>
                              <Text style={[styles.shopTitle]}>
                                {item.strProductName}{' '}
                              </Text>
                            </View>
                            <View style={{flexBasis: '21%'}}>
                              <Text style={[styles.shopTitle]}>
                                {item.DOQnt}
                              </Text>
                            </View>
                            <View style={{flexBasis: '18%'}}>
                              <Text style={[styles.shopTitleRed]}>
                                {' '}
                                {item.PendingQty}{' '}
                              </Text>
                            </View>
                            <View style={{flexBasis: '3%', paddingTop: 5}}>
                              <Icon name="chevron-right" color="#585CDB" />
                            </View>
                          </View>
                        )}
                        keyExtractor={(item) => item.id}
                      />
                    </View>
                  </ScrollView>
                </View>
              )}
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },

  bgbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    paddingVertical: 5,
    // shadowColor: 'rgba(0, 0, 0, 5)',
    // shadowOpacity: 0.5,
    // elevation: 8,
    // shadowRadius: 10 ,
    // shadowOffset : { width: 23, height: 113},
  },

  tableHeading: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 15,
  },

  tableTitle: {
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
  },

  tableField: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 0.7,
    borderBottomColor: '#ccc',
  },

  headingOne: {
    fontSize: 19,
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingTop: 5,
  },

  styleButtionOne: {
    backgroundColor: '#08C48F',
    color: '#fff',
    fontSize: RFPercentage(2.5),
    width: 80,
    textAlign: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  styleButtionTwo: {
    backgroundColor: '#2E3192',
    color: '#fff',
    fontSize: RFPercentage(2),
    width: '65%',
    textAlign: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 5,
  },

  shopTitle: {
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    fontSize: RFPercentage(2.5),
    marginLeft: -5,
  },
  shopId: {
    fontFamily: 'Poppins-bold',
    fontSize: RFPercentage(2),
    color: '#707070',
  },
  shopTitleRed: {
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    fontSize: RFPercentage(2.5),
    marginLeft: -5,
    color: '#D71920',
  },
});
