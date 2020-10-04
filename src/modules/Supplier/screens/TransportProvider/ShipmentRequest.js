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
  BackHandler,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import CustomSearchbar from '../../../Master/components/CustomSearchBar';
import {
  getShipmentOpenRequest,
  getSupplierAcceptedRequest,
} from '../../actions/TransportProvider/ShipmentRequestAction';
import {Form, TextValidator} from 'react-native-validator-form';
import {generateStringDateFromDate} from '../../../Master/Util/DateConfigure';
import {FlatList} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class ShipmentRequest extends Component {
  state = {
    shipmentList: [],
    searchShipmentList: [],
    is_open: true,
    searchValue: '',
    isDateTimePickerVisible: false,
    isEndDateTimePickerVisible: false,
  };

  componentDidMount = () => {
    this.initializeList();
    Form.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  };

  startDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };
  endDateTimePicker = () => {
    this.setState({isEndDateTimePickerVisible: true});
  };
  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };
  hideEndDateTimePicker = () => {
    this.setState({isEndDateTimePickerVisible: false});
  };

  handleDatePicked = (date) => {
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let created_at = year + '-' + month + '-' + dateNow;
    created_at = created_at.trim();
    this.setState({startDate: created_at, isDateTimePickerVisible: false});
  };
  handleEndDatePicked = (date) => {
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let created_at = year + '-' + month + '-' + dateNow;
    created_at = created_at.trim();
    this.setState({endDate: created_at, isEndDateTimePickerVisible: false});
  };

  initializeList = async () => {
    const shipmentList = await getShipmentOpenRequest();
    console.log('ShipmentList', shipmentList);
    this.setState({
      shipmentList,
      searchShipmentList: shipmentList,
    });
  };

  getRequest = async (no) => {
    if (no == 0) {
      const shipmentList = await getShipmentOpenRequest();
      this.setState({
        is_open: true,
        shipmentList,
        searchShipmentList: shipmentList,
      });
    } else {
      const shipmentList = await getSupplierAcceptedRequest();
      this.setState({
        is_open: false,
        shipmentList,
        searchShipmentList: shipmentList,
      });
    }
  };

  SearchFilterFunction = (text) => {
    if (text.length > 0) {
      const newShipmentList = this.state.shipmentList.filter(function (item) {
        let itemData = item.strLastDestination ? item.strLastDestination : '';
        itemData += item.intShipmentId ? item.intShipmentId : '';
        itemData += item.decTotalQty ? item.decTotalQty : '';
        itemData += item.dteScheduledTime ? item.dteScheduledTime : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        searchShipmentList: newShipmentList,
        searchValue: text,
      });
    }
  };

  render() {
    const customErrorStyle = {
      container: {top: 0, left: 0, position: 'absolute'},
      text: {color: 'red'},
      underlineValidColor: '#272727',
      underlineInvalidColor: 'red',
    };

    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.selectBox]}>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 15}}>
              <View style={{flexBasis: '100%'}}>
                <CustomSearchbar
                  placeHolderText="রিকোয়েস্ট থেকে অনুসন্ধান করুন"
                  onChangeText={(value) => this.SearchFilterFunction(value)}
                />
              </View>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                flexBasis: '48%',
                borderBottomColor: '#D6D6D6',
                borderBottomWidth: 1,
                marginRight: 10,
                backgroundColor: '#fff',
              }}>
              <Text style={[styles.pikcerTitle]}> হতে </Text>
              <TouchableOpacity onPress={this.startDateTimePicker}>
                <Text style={[styles.dataPicker]}>{this.state.startDate}</Text>

                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={(date) => this.handleDatePicked(date)}
                  onCancel={this.hideDateTimePicker}
                  datePickerModeAndroid={'spinner'}
                  mode={'date'}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexBasis: '48%',
                borderBottomColor: '#D6D6D6',
                borderBottomWidth: 1,
                backgroundColor: '#fff',
              }}>
              <TouchableOpacity onPress={this.endDateTimePicker}>
                <Text style={[styles.pikcerTitle]}> থেকে </Text>

                <Text style={[styles.dataPicker]}>{this.state.endDate}</Text>

                <DateTimePicker
                  isVisible={this.state.isEndDateTimePickerVisible}
                  onConfirm={(date) => this.handleEndDatePicked(date)}
                  onCancel={this.hideEndDateTimePicker}
                  datePickerModeAndroid={'spinner'}
                  mode={'date'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              paddingVertical: 25,
            }}>
            <TouchableOpacity onPress={() => this.onShowBill}>
              <Text style={styles.buttonStyle}>রিপোট দেখান</Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
            <TouchableOpacity
              style={{flexBasis: '48%'}}
              onPress={() => this.getRequest(0)}>
              <Text
                style={[
                  this.state.is_open ? styles.openQequst : styles.closeQequst,
                ]}>
                {' '}
                ওপেন রিকুয়েস্ট
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexBasis: '48%'}}
              onPress={() => this.getRequest(1)}>
              <Text
                style={[
                  !this.state.is_open ? styles.openQequst : styles.closeQequst,
                ]}>
                {' '}
                গ্রহন রিকুয়েস্ট
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.searchShipmentList}
            keyExtractor={(item, index) => index}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                style={[styles.selectBox]}
                onPress={() =>
                  this.props.navigation.navigate('shipmentRequestEntry', {
                    itemData: item,
                  })
                }>
                <View style={[styles.planningBox]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flexBasis: '60%'}}>
                      <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                        {' '}
                        #{item.intShipmentId}
                      </Text>

                      <Text style={[styles.location]}>
                        {' '}
                        {generateStringDateFromDate(
                          item.dteScheduledTime,
                          true,
                        )}{' '}
                      </Text>
                      <Text style={[styles.orderNo]}>
                        {' '}
                        {item.strLastDestination}{' '}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexBasis: '20%',
                        marginTop: 10,
                        textAlign: 'center',
                      }}>
                      <Text style={[styles.bags]}> {item.decTotalQty} </Text>
                      <Text style={[styles.bagsQty]}> Bags </Text>
                    </View>

                    <View style={{flexBasis: '20%', marginTop: 25}}>
                      <Text style={[styles.bagCapcity]}>
                        {item.strVehicleCapacity}{' '}
                      </Text>
                      <Text style={[styles.orderNo]}>
                        {' '}
                        {item.strPickingPointName}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
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

  openQequst: {
    fontSize: RFPercentage(2.5),
    backgroundColor: '#3762D8',
    color: '#fff',
    borderRadius: 20,
    paddingVertical: 12,
    textAlign: 'center',
  },
  closeQequst: {
    fontSize: RFPercentage(2.5),
    color: '#888888',
    borderRadius: 20,
    paddingVertical: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    marginBottom: 5,
    padding: 10,
    paddingLeft: 10,
    marginTop: 5,
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
    fontSize: RFPercentage(2.5),
    color: '#231F20',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  location: {
    fontSize: RFPercentage(2.5),
    color: '#000000',
    paddingVertical: 2,
    marginRight: 10,
  },
  Type: {
    fontSize: RFPercentage(2.5),
    color: '#000000',
    marginLeft: 10,
    marginTop: 5,
  },
  bags: {
    fontSize: RFPercentage(2.2),
    color: '#000000',
    paddingTop: 10,
  },
  bagsQty: {
    fontSize: RFPercentage(2.5),
    color: '#231F20',
    fontWeight: 'bold',
  },
  bagCapcity: {
    fontSize: RFPercentage(2.2),
    color: '#000000',
    paddingTop: 10,
    fontWeight: 'bold',
  },

  planicons: {
    width: 45,
    height: 45,
  },

  planningBox: {
    paddingVertical: 20,
  },

  tableTile: {
    fontSize: RFPercentage(2.5),
    color: '#5A5A5A',
    paddingVertical: 15,
  },
  buttonStyle: {
    backgroundColor: '#1544B3',
    color: '#fff',
    fontSize: RFPercentage(3),
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 35,
    textTransform: 'uppercase',
    borderRadius: 10,
  },
});
