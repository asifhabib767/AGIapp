import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Linking,
  RefreshControl,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';
import {
  salesOrderList,
  getsalesOrderList,
  searchOrderList,
} from './../service/sales/salesOrderService';
import {Actions} from 'react-native-router-flux';
import {getOrderDetails} from '../service/sales/OrderDetailsService';
import AsyncStorage from '@react-native-community/async-storage';

import * as DateClass from '../../Master/Util/DateConfigure';

export default class SalseList extends Component {
  state = {
    sortBy: '1',
    salesList: [],
    searchSalesList: [],
    searchValue: '',
    isSearching: '',
    ysnDOCompleted: 1,
    refreshing: false,
  };

  async componentDidMount() {
    this.getSalesData();
  }

  getSalesData = async () => {
    let salesList = await getsalesOrderList(this.state.ysnDOCompleted);
    this.setState({salesList, searchSalesList: salesList});
  };

  onRefresh() {
    this.setState({refreshing: true});
    this.getSalesData().then(() => {
      this.setState({refreshing: false});
    });
  }

  handleData = async (item) => {
    // alert(item.intId);
    // return false;
    await Actions.salesOrderDetails({orderDetailsList: item.DONumber});
    //getOrderDetails(item.intId)
  };

  searchOrders = async (searchValue) => {
    this.setState({searchValue});
    // Search from API
    let salesList = await searchOrderList(searchValue);
    this.setState({salesList});
  };

  setStatus = async (ysnDOCompleted) => {
    this.setState({ysnDOCompleted});
    let salesList = await getsalesOrderList(ysnDOCompleted);
    this.setState({
      salesList,
      searchSalesList: salesList,
    });
  };

  SearchFilterFunction = (text) => {
    if (text.length > 0) {
      const newsearchSalesListData = this.state.salesList.filter(function (
        item,
      ) {
        const itemData = item.DONumber
          ? item.DONumber.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        searchSalesList: newsearchSalesListData,
        searchValue: text,
      });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{backgroundColor: '#FFF'}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }>
          <SafeAreaView style={[styles.container]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={[styles.searcbox]}>
                <View style={[styles.iconstyle]}>
                  <Icon name="search" size={20} color="#818181" />
                </View>
                <View style={{flexBasis: '100%'}}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="Search By #DO"
                    placeholderTextColor={'#818181'}
                    onChangeText={(value) => this.SearchFilterFunction(value)}
                    value={this.state.searchValue}
                  />
                </View>
              </View>

              {/* <View style={[styles.sortBy]}>
                <Picker
                  selectedValue={this.state.ysnDOCompleted}
                  onValueChange={(value) => this.setStatus(value)}>
                  <Picker.Item label="Pending DO" value="0" />
                  <Picker.Item label="Completed DO" value="1" />
                </Picker>
              </View> */}
            </View>

            <View style={[styles.bgbox]}>
              <View>
                <Text
                  style={{
                    color: '#2E4798',
                    fontWeight: 'bold',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    fontSize: 18,
                  }}>
                  Total{' '}
                  {this.state.ysnDOCompleted ? 'Completed DO' : 'Pending DO '} #
                  {this.state.searchSalesList.length}
                </Text>
              </View>

              <FlatList
                data={this.state.searchSalesList}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                  // <TouchableOpacity onPress={()=>this.handleData(item)}>

                  <TouchableOpacity>
                    <View style={[styles.distributorDetails]}>
                      <View style={{flexBasis: '65%'}}>
                        <Text style={[styles.distributerName]}>
                          {' '}
                          DO #{item.DONumber}{' '}
                        </Text>

                        <Text style={{marginLeft: 8, fontWeight: 'bold'}}>
                          Shop: {item.shopname} [{item.shopid}]{' '}
                        </Text>
                        <Text style={{marginLeft: 8}}>
                          Contacted: {item.contactat}
                        </Text>
                        <Text style={{marginLeft: 8}}>
                          Delivery Address: {item.delvadr}
                        </Text>
                        <Text style={{marginLeft: 8}}>Phone: {item.phone}</Text>
                        <Text style={{marginLeft: 8}}>
                          DO Date:{' '}
                          {DateClass.generateStringDateFromDate(item.dodate)}
                        </Text>
                        {this.state.ysnDOCompleted == 0 ? (
                          <Text style={[styles.distributorProgrss]}>
                            Pending{' '}
                          </Text>
                        ) : (
                          <Text style={[styles.distributorCompleted]}>
                            {' '}
                            Complete{' '}
                          </Text>
                        )}
                      </View>
                      <View style={{flexBasis: '35%', alignItems: 'center'}}>
                        {/* <Text style={[styles.outstanding]}> {item.restqnt} </Text>*/}
                        <Text style={[styles.distributerLocation]}>
                          {' '}
                          {item.narration}{' '}
                        </Text>
                        {!this.props.isCustomer && (
                          <TouchableOpacity
                            onPress={() =>
                              Linking.openURL(`tel:${item.phone}`)
                            }>
                            <Text
                              style={[styles.distributerAmonut]}
                              style={{
                                backgroundColor: '#2E4798',
                                padding: 5,
                                borderRadius: 5,
                              }}>
                              <Icon name="phone" size={20} color="#fff" />
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
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
    backgroundColor: '#f9f9f9',
  },

  searcbox: {
    flexBasis: '95%',
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 113},
    borderRadius: 10,
    marginTop: 13,
    marginBottom: 10,
    marginLeft: 10,
  },
  sortBy: {
    flexBasis: '33%',
    backgroundColor: '#fff',
    color: '#000',
    marginLeft: 5,
    height: 50,
    marginTop: 12,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 113},
    borderRadius: 10,
    paddingLeft: 5,
  },

  iconstyle: {
    position: 'absolute',
    marginLeft: 15,
    marginTop: 15,
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    paddingRight: 10,
  },

  InputField: {
    fontSize: 20,
    fontSize: 16,
    borderRadius: 5,
    paddingLeft: 55,
  },

  bgbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    margin: 10,
    padding: 5,
    paddingTop: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 113},
  },

  distributorDetails: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
  },

  distributerName: {
    color: '#707070',
    fontSize: RFPercentage(2.5),
    fontFamily: 'Poppins',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  distributerLocation: {
    color: '#000000',
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: 30,
  },

  outstanding: {
    color: '#707070',
    fontSize: RFPercentage(2.5),
    fontFamily: 'Poppins',
    marginTop: '15%',
  },

  distributorProgrss: {
    backgroundColor: '#E8A13A',
    width: '30%',
    height: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    borderRadius: 50,
    marginTop: 2,
    fontSize: RFPercentage(1.8),
    paddingTop: '1%',
    paddingBottom: '1%',
    marginLeft: 8,
  },
  distributorCompleted: {
    backgroundColor: '#28a745',
    width: '30%',
    height: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    borderRadius: 50,
    marginTop: 2,
    fontSize: RFPercentage(1.8),
    paddingTop: '1%',
    paddingBottom: '1%',
    marginLeft: 8,
  },
});
