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
import SalseList from './SalesList';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getUserTypeId} from '../../User/util/AuthData';

export default class Sales extends Component {
  state = {
    salesPlan: [],
    isCustomer: false,
    isERPUser: true,
  };

  componentDidMount() {
    // const salesPlan = salesPlanService();
    // this.setState({salesPlan});
    this.checkIsCustomer();
  }

  checkIsCustomer = async () => {
    const intUserTypeId = await getUserTypeId();
    if (intUserTypeId == 1) {
      this.setState({isCustomer: false, isERPUser: true});
    } else if (intUserTypeId == 5) {
      this.setState({isCustomer: true, isERPUser: false});
    }
  };

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
                <View style={{flexBasis: '36%'}}>
                  <Text style={[styles.headingOne]}>My Orders</Text>
                </View>
                <View
                  style={{
                    flexBasis: '56%',
                    flex: 1,
                    flexDirection: 'row',
                    marginLeft: 15,
                    justifyContent: 'flex-end',
                  }}>
                  {this.state.isERPUser && (
                    <Text
                      style={[styles.styleButtionTwo]}
                      onPress={() =>
                        this.props.navigation.navigate('salesDeliveryRequest')
                      }>
                      {' '}
                      Delivery Request{' '}
                    </Text>
                  )}
                  {this.state.isERPUser && (
                    <Text
                      style={[styles.styleButtionOne]}
                      onPress={() =>
                        this.props.navigation.navigate('salesOrder')
                      }>
                      {' '}
                      <Icon name="plus" /> Add{' '}
                    </Text>
                  )}
                  {this.state.isCustomer && (
                    <Text
                      style={[styles.styleButtionOne]}
                      onPress={() =>
                        this.props.navigation.navigate('salesOrderCustomer')
                      }>
                      {' '}
                      <Icon name="plus" /> New{' '}
                    </Text>
                  )}
                </View>
              </View>

              {this.state.salesPlan.length !== 0 && (
                <View>
                  <View style={[styles.tableHeading]}>
                    <View style={{flexBasis: '25%'}}>
                      <Text style={[styles.tableTitle]}> Shop Name </Text>
                    </View>
                    <View style={{flexBasis: '28%'}}>
                      <Text style={[styles.tableTitle]}> Avg. Sales Qty </Text>
                    </View>
                    <View style={{flexBasis: '20%'}}>
                      <Text style={[styles.tableTitle]}> Starting </Text>
                    </View>
                    <View style={{flexBasis: '28%'}}>
                      <Text style={[styles.tableTitle]}> Remaining Qty. </Text>
                    </View>
                  </View>

                  <ScrollView>
                    <View style={{borderColor: '#ccc', borderWidth: 1}}>
                      <FlatList
                        data={this.state.salesPlan}
                        renderItem={({item}) => (
                          <View style={[styles.tableField]}>
                            <View style={{flexBasis: '35%'}}>
                              <Text style={[styles.shopTitle]}>
                                {' '}
                                {item.shop_name}{' '}
                              </Text>
                              <Text style={[styles.shopId]}>
                                {item.shop_id}{' '}
                              </Text>
                            </View>
                            <View style={{flexBasis: '21%'}}>
                              <Text style={[styles.shopTitle]}>
                                {item.avg_sales_qty}{' '}
                              </Text>
                            </View>
                            <View style={{flexBasis: '21%'}}>
                              <Text style={[styles.shopTitle]}>
                                {item.starting}
                              </Text>
                            </View>
                            <View style={{flexBasis: '18%'}}>
                              <Text style={[styles.shopTitleRed]}>
                                {' '}
                                {item.remainingQty}{' '}
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

              {this.state.salesPlan.length === 0 && (
                // <View>
                //     <Text style={{ height: '100%', marginTop: 50, textAlign: 'center' }}>
                //         Wait !! { '\n' } Sales Plan Feature will be available soon
                //     </Text>
                // </View>
                <SalseList isCustomer={this.state.isCustomer} />
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
    fontSize: RFPercentage(2.2),
    width: '40%',
    textAlign: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    paddingVertical: 10,
    borderRadius: 50,
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
