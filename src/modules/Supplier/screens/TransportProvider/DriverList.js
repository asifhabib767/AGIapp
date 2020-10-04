import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import vehicelcall from '../../images/vehicelcall.png';
import minicar from '../../images/minicar.png';
import driverlist from '../../images/driverlist.png';
import CustomSearchbar from '../../../Master/components/CustomSearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getSupplieridvsDriverList} from '../../actions/TransportProvider/ShipmentRequestAction';
import {Actions} from 'react-native-router-flux';
import {Form, TextValidator} from 'react-native-validator-form';
import {FlatList} from 'react-native-gesture-handler';
export default class DriverList extends Component {
  // state={

  //     priority:''
  // };

  state = {
    allDriverList: [],
    driverlist: [],
    searchVehcileList: [],
    searchDriverText: '',
    refreshing: false,
  };

  componentDidMount() {
    this.initializeList();
    Form.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  initializeList = async () => {
    const driverlist = await getSupplieridvsDriverList();
    console.log('driverlist.data', driverlist.data);

    this.setState({driverlist: driverlist.data});
    // this.setState(
    //   {
    //     allDriverList: [...driverlist],
    //     driverlist,
    //   },
    //   () => {},
    // );
  };

  onRefresh() {
    this.setState({refreshing: true});
    this.initializeList().then(() => {
      this.setState({refreshing: false});
    });
  }

  searchText = (value) => {
    this.searchFilterFunction(value);
  };

  searchFilterFunction = (searchDriverText) => {
    if (searchDriverText.length > 0) {
      const newData = this.state.allDriverList.filter(function (item) {
        const itemData =
          item.strDriverName.toUpperCase() + '' + item.strPhoneNo;

        const textData = searchDriverText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      this.setState({
        driverlist: newData,
        searchDriverText: searchDriverText,
      });
    } else {
      this.setState({
        driverlist: this.state.allDriverList,
        searchDriverText: 'No Data Found',
      });
    }
  };

  render() {
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
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flexBasis: '70%'}}>
                <Text style={[styles.headTitle]}>ড্রাইভার লিস্ট</Text>
              </View>
              <View style={{flexBasis: '30%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('driverAdd')}>
                  <Text style={styles.buttonStyle}>
                    ড্রাইভার এন্ট্রি &nbsp;{''}
                    <Icon name="plus" size={23} color="#fff" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 20}}>
              <View style={{flexBasis: '100%', marginRight: 15}}>
                {/* <CustomSearchbar
                                    placeHolderText="Search from outlets"
                                /> */}

                <CustomSearchbar
                  placeHolderText="ড্রাইভারলিস্ট থেকে অনুসন্ধান করুন"
                  onChangeText={(value) => {
                    this.searchText(value);
                  }}
                />
              </View>
            </View>
          </View>

          <View style={[styles.selectBox]}>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
              <View style={{flexBasis: '75%'}}>
                <Text style={[styles.shipDate]}> নাম </Text>
              </View>
              <View style={{flexBasis: '22%'}}>
                <Text style={[styles.shipDate]}> কল করুন </Text>
              </View>
            </View>

            <FlatList
              data={this.state.driverlist}
              keyExtractor={(item) => item.strCode}
              renderItem={({item, index, separators}) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingVertical: 20,
                    borderBottomColor: '#D6D6D6',
                    borderBottomWidth: 1,
                  }}
                  key={index}>
                  <View style={{flexBasis: 60, marginRight: 10}}>
                    <Image source={driverlist} style={[styles.iconStyle]} />
                  </View>

                  <View style={{flexBasis: '65%'}}>
                    <Text style={[styles.shipmentNo]}>
                      {item.strDriverName}{' '}
                    </Text>
                    <Text style={[styles.carOwner]}>
                      {' '}
                      <Image source={minicar} style={[styles.carStyle]} />{' '}
                      {item.strPhoneNo}{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: 60}}>
                    <Icon
                      name="pencil"
                      size={20}
                      onPress={() =>
                        this.props.navigation.navigate('driverEdit', item)
                      }
                    />
                    <TouchableOpacity
                      onPress={() => Linking.openURL(`tel:${item.strPhoneNo}`)}>
                      <Image source={vehicelcall} style={[styles.iconStyle]} />
                    </TouchableOpacity>
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
  headTitle: {
    fontSize: RFPercentage(3.5),
    color: '#000000',
    fontWeight: 'bold',

    textTransform: 'uppercase',
  },
  shipmentNo: {
    fontSize: RFPercentage(3),
    color: '#000000',
    fontWeight: 'bold',
  },
  shipDate: {
    fontSize: RFPercentage(2.5),
    color: '#272727',
  },
  iconStyle: {
    width: 60,
    height: 60,
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

  carDetails: {
    fontSize: RFPercentage(2),
    color: '#272727',
    paddingVertical: 5,
  },
  carOwner: {
    fontSize: RFPercentage(2.2),
    color: '#272727',
    paddingVertical: 8,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  carStyle: {
    width: 15,
    height: 15,
  },
  buttonStyle: {
    backgroundColor: '#11D6A0',
    color: '#fff',
    fontSize: RFPercentage(3),
    textAlign: 'center',
    paddingVertical: 8,
    borderRadius: 50,
  },
});
