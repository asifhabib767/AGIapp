import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import OderImage from '../images/Calender.png';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import {getOrderDetails} from '../service/sales/OrderDetailsService';

import {generateStringDateFromDate} from '../../Master/Util/DateConfigure';

export default class SalesListDetails extends Component {
  state = {
    orderDetailsList: '',
  };

  async componentDidMount() {
    const orderID = this.props.orderDetailsList;
    let orderDetailsList = await getOrderDetails(orderID);
    console.log('order list', orderDetailsList);
    this.setState({orderDetailsList});
  }

  render() {
    const orderItem = this.state.orderDetailsList;

    // if(typeof orderItem != 'undefined'){
    //     const dateOrderTime = orderItem.dteInsertionTime; //"2017-12-28T13:52:37.69"
    //     console.log(new Date(dateOrderTime.toString("MMMM")));
    // }

    return (
      <View>
        <ScrollView style={[styles.fullbg]}>
          <SafeAreaView style={styles.container}>
            <View style={[styles.AccountDetailsArea]}>
              <View style={[styles.boxGb]}>
                <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
                  <View style={{width: '70%', flexDirection: 'row'}}>
                    <View style={{width: 70}}>
                      <Image source={OderImage} style={[styles.oderImage]} />
                    </View>
                    <View style={{width: '50%', marginTop: 10}}>
                      <Text
                        style={[
                          styles.storeName,
                          {textTransform: 'uppercase'},
                        ]}>
                        {' '}
                        DO #{orderItem.intSoid}{' '}
                      </Text>
                      <Text style={[styles.storeName]}>
                        {' '}
                        {orderItem.strName}{' '}
                      </Text>
                      <Text style={[styles.storeThana]}>
                        {' '}
                        {orderItem.areaname}
                      </Text>
                    </View>
                  </View>

                  {/* Hidden For This feature */}

                  {/* <View style={{width: '30%'}}> 
                                            <Text style={[styles.styleButtionTwo]}> <Icon name='users' /> Align </Text>
                                        </View> */}
                </View>
              </View>

              {/* <View>
                                <View style={{ flex:1, flexDirection:'row'}}>
                                        <View style={{ flexBasis: '50%' }}>
                                            <Text style={[styles.storeName]}> Salim Store </Text>
                                        </View>
                                        <View style={{ flexBasis: '50%' , flexDirection:'row', justifyContent: 'flex-end', paddingRight:20}}>
                                            <Text style={[styles.storeName]}> 100 </Text>
                                        </View>
                                    </View>
                                    <View style={{ flex:1, flexDirection:'row'}}>
                                        <View style={{ flexBasis: '50%' }}>
                                            <Text style={[styles.storeName]}> Salim Store </Text>
                                        </View>
                                        <View style={{ flexBasis: '50%' , flexDirection:'row', justifyContent: 'flex-end', paddingRight:20}}>
                                            <Text style={[styles.storeName]}> 100 </Text>
                                        </View>
                                    </View>
                                    <View style={{ flex:1, flexDirection:'row'}}>
                                        <View style={{ flexBasis: '50%' }}>
                                            <Text style={[styles.storeName]}> Salim Store </Text>
                                        </View>
                                        <View style={{ flexBasis: '50%' , flexDirection:'row', justifyContent: 'flex-end', paddingRight:20}}>
                                            <Text style={[styles.storeName]}> 100 </Text>
                                        </View>
                                    </View>
                               </View> */}

              <View style={[styles.boxGrid]}>
                <View style={{flexBasis: '50%'}}>
                  <Text style={[styles.inputLebel]}> Order Date </Text>
                  <Text style={[styles.inputOutput]}>
                    {' '}
                    {generateStringDateFromDate(
                      orderItem.dteInsertionTime,
                    )}{' '}
                  </Text>

                  <Text style={[styles.empty]}></Text>
                  <Text style={[styles.inputLebel]}> Shipping Point </Text>
                  <Text style={[styles.inputOutput]}> -- </Text>

                  <Text style={[styles.empty]}></Text>
                  <Text style={[styles.inputLebel]}> Delivery Point </Text>
                  <Text style={[styles.inputOutput]}> -- </Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text style={[styles.inputLebel]}> Delivery Date </Text>
                  <Text style={[styles.inputOutput]}> -- </Text>

                  <Text style={[styles.empty]}></Text>
                  <Text style={[styles.inputLebel]}> Phone </Text>
                  <Text style={[styles.inputOutput]}>
                    {' '}
                    {orderItem.strPhone ? orderItem.strPhone : '--'}{' '}
                  </Text>

                  <Text style={[styles.empty]}></Text>
                  <Text style={[styles.inputLebel]}> Address </Text>
                  <Text style={[styles.inputOutput]}>
                    {' '}
                    {orderItem.strAddress}
                  </Text>
                </View>
              </View>

              <View>
                <Text style={[styles.oderTitle]}> Order List </Text>
              </View>

              <View style={[styles.bgbox]}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flexBasis: '50%',
                      borderRightColor: '#ccc',
                      borderRightWidth: 0.7,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#393CA4',
                        paddingVertical: 8,
                        marginTop: 5,
                      }}>
                      <Text style={[styles.avgQality]}> ITEM </Text>
                    </View>
                    <View style={[styles.singleMenuItem]}>
                      <Text style={[styles.singleMenuItemSubTitle]}>
                        {' '}
                        {orderItem.strProductName}{' '}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexBasis: '50%',
                      borderRightColor: '#ccc',
                      borderRightWidth: 0.7,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#393CA4',
                        paddingVertical: 8,
                        marginTop: 5,
                      }}>
                      <Text style={[styles.avgQality]}> QTY </Text>
                    </View>
                    <View style={[styles.singleMenuItem]}>
                      <Text style={[styles.singleMenuItemSubTitle]}>
                        {' '}
                        {orderItem.numQuantity} ({orderItem.strUom}){' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingTop: 15,
                  marginBottom: 50,
                }}>
                <Text style={[styles.amountTitle]}>
                  {' '}
                  Total{' '}
                  <Text style={[styles.totalAmount]}>
                    {' '}
                    ৳ {orderItem.totalprice}{' '}
                  </Text>{' '}
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    margin: 8,
    height: '100%',
    backgroundColor: '#F2F8FF',
  },

  storeName: {
    fontSize: RFPercentage(2.5),
    textAlign: 'left',
    color: '#000',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  storeThana: {
    fontSize: RFPercentage(2.5),
    textAlign: 'left',
    color: '#707070',
    textTransform: 'uppercase',
  },

  styleButtionTwo: {
    backgroundColor: '#585CDB',
    color: '#fff',
    fontSize: RFPercentage(2.2),
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    paddingVertical: 10,
    borderRadius: 50,
    marginVertical: 10,
  },

  AccountDetailsArea: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingVertical: 25,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 113},
  },

  boxGrid: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
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
  editProfile: {
    color: '#8E8E8E',
    fontSize: 14,
  },

  oderListBox: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },

  bgbox: {
    borderWidth: 1,
    borderTopColor: '#fff',
    borderBottomColor: '#ccc',
    borderLeftColor: '#ccc',
    borderRightColor: '#ccc',
    paddingBottom: 10,
  },

  oderTitle: {
    color: '#232A2F',
    fontSize: 22,
    paddingVertical: 20,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  avgQality: {
    fontSize: RFPercentage(2),
    color: '#fff',
    marginLeft: -3,
    textAlign: 'center',
  },
  avgQalityValue: {
    fontSize: RFPercentage(2.5),
    color: '#fff',
    marginLeft: -3,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  amountTitle: {
    fontSize: RFPercentage(2.5),
    color: '#000000',
    marginLeft: -3,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 5,
  },

  totalAmount: {
    color: '#0353A7',
    fontSize: RFPercentage(5),
  },
  singleMenuItemTitle: {
    fontSize: RFPercentage(2.5),
    color: '#000000',
    fontWeight: '400',
    paddingTop: 5,
    marginLeft: -3,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  singleMenuItemSubTitle: {
    fontSize: RFPercentage(3),
    color: '#000000',
    fontWeight: '700',
    paddingTop: 5,
    marginLeft: -3,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
});
