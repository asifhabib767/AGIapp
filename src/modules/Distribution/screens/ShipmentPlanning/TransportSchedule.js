import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import planicons from '../../images/tripAssign.png';
import {Picker} from '@react-native-community/picker';
import CustomSearchbar from '../../../Master/components/CustomSearchBar';
import * as DateClass from '../../../Master/Util/DateConfigure';
import LinearGradient from 'react-native-linear-gradient';

import {
  getShipmentPlanningData,
  getShipPointByUser,
} from '../ShipmentPlanning/ShipmentServices';
import {FlatList} from 'react-native-gesture-handler';

export default class TransportSchedule extends Component {
  state = {
    selects: '',
    orderList: [],
    refreshing: false,
    searchOrderList: [],
    searchRequestText: '',
  };

  async componentDidMount() {
    this.initializeData();
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.initializeData().then(() => {
      this.setState({refreshing: false});
    });
  }

  searchText = (value) => {
    this.searchFilterFunction(value);
  };

  initializeData = async () => {
    const orderList = await getShipmentPlanningData();
    // const shipPointList = await getShipPointByUser();
    console.log('orderList', orderList);
    // console.log('shipPointList', shipPointList);
    // orderList = orderList.data;

    this.setState({
      orderList: orderList,
      searchOrderList: orderList,
      // shipPointList,
    });
  };

  searchFilterFunction = (searchRequestText) => {
    if (searchRequestText.length > 0) {
      const newData = this.state.orderList.filter(function (item) {
        const itemData =
          item.intShipmentRequestID +
          ' ' +
          item.strSalesOrderCode.toUpperCase() +
          ' ' +
          item.strLastDestination.toUpperCase() +
          ' ' +
          item.strVehicleCapacity.toUpperCase();
        const textData = searchRequestText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        searchOrderList: newData,
        searchRequestText: searchRequestText,
      });
    } else {
      this.setState({
        searchOrderList: this.state.orderList,
        searchRequestText: '',
      });
    }
  };

  render() {
    console.log('this.state.orderList', this.state.orderList);
    const {navigation} = this.props;
    return (
      <ScrollView
        style={[styles.fullbg]}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
        <SafeAreaView style={styles.container}>
          <View style={[styles.selectBox]}>
            <Text style={[styles.headingOne]}> Transport Schedule </Text>

            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 15}}>
              <View style={{flexBasis: '100%', marginRight: 30}}>
                <CustomSearchbar
                  placeHolderText="Search Requisitions..."
                  onChangeText={(value) => this.searchText(value)}
                />
              </View>
            </View>

            <FlatList
              data={this.state.orderList}
              renderItem={({item, index, separators}) => (
                <View style={[styles.planningBox]} key={index}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flexBasis: 60}}>
                      <Image source={planicons} style={[styles.planicons]} />
                    </View>
                    <View style={{flexBasis: '60%'}}>
                      <Text style={[styles.date]}>
                        {' '}
                        {DateClass.generateStringDateFromDate(
                          item.dteRequestDateTime,
                          true,
                        )}{' '}
                      </Text>
                      <Text style={[styles.orderNo]}>
                        Req. No. #{item.intShipmentRequestID}{' '}
                      </Text>
                      <Text style={[styles.location]}>
                        <Icon
                          color={'#5D5C5C'}
                          size={20}
                          type="font-awesome"
                          name="map-marker"
                        />{' '}
                        {item.strLastDestination}, {item.customerName}
                      </Text>
                      <Text style={styles.vehicleType}>
                        {item.strVehicleType}
                      </Text>
                      <Text style={[styles.Type]}>
                        {item.strVehicleProviderType}{' '}
                      </Text>
                    </View>
                    <View style={{flexBasis: '20%'}}>
                      <Text style={[styles.bags]}> Qty(bags) </Text>
                      <Text style={[styles.bagsQty]}>
                        {' '}
                        {parseFloat(item.decTotalQty).toFixed(1)}{' '}
                      </Text>
                      {item.details.map((itemDetails, index2) => (
                        <View
                          key={index2}
                          style={{
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderTopColor: '#ccc',
                            borderBottomColor: '#ccc',
                            textAlign: 'center',
                            paddingTop: 5,
                          }}>
                          <Text style={{fontWeight: 'bold'}}>
                            <Text>
                              {itemDetails.strProductName}{' '}
                              {parseFloat(itemDetails.decQty).toFixed(1)}
                            </Text>
                            {itemDetails.strBagType != null && (
                              <Text>
                                #BT-
                                {itemDetails.strBagType}
                              </Text>
                            )}
                          </Text>
                          <Text>#{itemDetails.strSalesOrderCode}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignSelf: 'flex-end',
                      marginTop: 5,
                    }}>
                    <LinearGradient
                      colors={['#48C1B9', '#11D6A0']}
                      style={styles.linearGradient}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('addTransportSchedule', {
                            transport: item,
                          })
                        }>
                        <Text style={styles.buttonText}>Schedule</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              )}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: '#F2F8FF',
    height: '100%',
  },

  container: {
    width: '96%',
    margin: 8,
  },

  AccountDetailsArea: {
    backgroundColor: '#fff',
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 113},
  },

  headingOne: {
    fontSize: RFPercentage(3.5),
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    paddingTop: 5,
  },
  selectBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    paddingLeft: 10,
    marginTop: 30,
    justifyContent: 'center',
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
  },

  selects: {
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
    backgroundColor: '#fff',
    borderRadius: 50,
    flexBasis: '30%',
    height: 42,
    lineHeight: 42,
  },

  date: {
    fontSize: RFPercentage(2.5),
    color: '#000000',
  },
  orderNo: {
    fontSize: RFPercentage(3),
    color: '#231F20',
    fontWeight: 'bold',
  },
  location: {
    fontSize: RFPercentage(2.5),
    color: '#000000',
    paddingVertical: 2,
  },
  Type: {
    fontSize: RFPercentage(2),
    color: '#000000',
    borderWidth: 2,
    borderColor: '#3187FE',
    padding: 2,
    width: 120,
    textAlign: 'center',
    borderRadius: 50,
    fontWeight: 'bold',
  },
  bags: {
    fontSize: RFPercentage(2.2),
    color: '#000000',
  },
  bagsQty: {
    fontSize: RFPercentage(3),
    color: '#231F20',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  planicons: {
    width: 45,
    height: 45,
  },
  planningBox: {
    color: '#000000',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    marginBottom: 5,
    paddingVertical: 20,
  },
  linearGradient: {
    borderRadius: 50,
    width: 120,
  },
  buttonText: {
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 7,
  },
  vehicleType: {
    backgroundColor: '#fff',
    width: 100,
    margin: 5,
    borderRadius: 20,
    padding: 5,
    color: '#000',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#3AC6B3',
  },
});
