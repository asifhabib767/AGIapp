import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {api_get_distributor_details, api_retailers} from '../SalesConfig.json';
import {getRetailersByDistributor} from '../service/distributor/Distributor';

import Axios from 'axios';

export default class DistributorDealerDetails extends Component {
  state = {
    distributorItem: '',
    distributeCreditInfo: '',
    disPointId: '',
    useId: '',
    retailers: [],
  };

  callCustomer = () => {
    Linking.openURL(`tel:${this.state.distributorItem.strPhone}`);
  };

  async componentDidMount() {
    // const that = this;
    // let distributorItem = this.props.distributor;
    let distributorItem = this.props.route.params;
    console.log('Distributor Data: ', this.props.route.params);

    this.setState({distributorItem});
    let retailers = [];

    // this.getDistributorRetailers(distributorItem.intCusId);
    // let retailers = await getRetailersByDistributor(distributorItem.intCusId);
    // this.setState({ retailers });

    // console.log('Retailers: ', this.state.retailers);

    await Axios.get(
      api_retailers + '?query=intcustomerid=' + distributorItem.intCusId,
    )
      .then((res) => {
        retailers = res.data;
      })
      .catch(function (error) {
        console.log('Error happened...');
        console.log(error);
      });
    this.setState({retailers});
    console.log('Retailers: ', retailers);

    // let distributorBalanceItem = await getDistributorBalance(intDisPointId, DateClass.getFormattedCurrentDate(), 4);

    // let response = await Axios.get(api_get_distributor_details,
    //     {
    //         params: {
    //             disPointId:distributorItem.intDisPointId,
    //             unitID:4,
    //             date:'10/12/2019',
    //             intUserID:distributorItem.intCustomerId,
    //           }
    //     })
    //     .then(function(response) {
    //             that.setState({ distributeCreditInfo:response.data[0] });
    //     })
  }

  /**
   * getDistributorRetailers()
   */
  //    getDistributorRetailers = async (intCusId) => {
  //     alert(intCusId);
  //     let retailers = await getRetailersByDistributor(intCusId);
  //     this.setState({ retailers });
  //     console.log('Retailers: ', this.state.retailers);
  //    }

  render() {
    return (
      <View>
        <ScrollView style={[styles.fullbg]}>
          <SafeAreaView style={styles.container}>
            <View style={[styles.AccountDetailsArea]}>
              <View style={[styles.boxGb]}>
                <View style={[styles.userStyles]}>
                  <Icon name="user" size={30} color="#2E3192" />
                </View>

                <View style={{width: '70%'}}>
                  <Text style={[styles.dealerName]}>
                    {' '}
                    {this.state.distributorItem.strName}{' '}
                  </Text>
                  <View style={{marginLeft: 8}}>
                    <Text>{this.state.distributorItem.strAddress}</Text>
                  </View>
                </View>
                <View style={{width: '15%'}}>
                  <TouchableOpacity
                    onPress={() => this.callCustomer()}
                    style={{marginTop: 10}}>
                    <Icon name="phone" size={25} color="#0054A6" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={[styles.AccountDetailsArea]}>
              <View style={[styles.creditDetails]}>
                <View style={{flexBasis: '33%'}}>
                  <View style={[styles.singleCreditItem]}>
                    <Text style={[styles.creditSectionTitle]}>
                      Credit Limit
                    </Text>
                    <Text style={[styles.creditSectionValue]}>
                      ৳{this.state.distributorItem.monCreditLimit}
                    </Text>
                  </View>
                </View>

                <View style={{flexBasis: '33%'}}>
                  <View style={[styles.singleCreditItem]}>
                    <Text style={[styles.creditSectionTitle]}>Debit</Text>
                    <Text style={[styles.creditSectionValue]}>
                      ৳{this.state.distributorItem.monOverDueLimit}
                    </Text>
                  </View>
                </View>

                <View style={{flexBasis: '33%'}}>
                  <View style={[styles.singleCreditItem]}>
                    <Text style={[styles.creditSectionTitle]}>Outstanding</Text>
                    <Text style={[styles.creditSectionRedValue]}>
                      ৳{this.state.distributorItem.monLedgerBalance}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.AccountDetailsArea]}>
              <View style={[styles.boxGb]}>
                <View style={{flexBasis: '50%'}}>
                  <Text style={[styles.inputLebel]}> Propitor </Text>
                  <Text style={[styles.inputOutput]}>
                    {' '}
                    {this.state.distributorItem.strPropitor}{' '}
                  </Text>

                  <Text style={[styles.empty]}></Text>
                  <Text style={[styles.inputLebel]}> Region </Text>
                  <Text style={[styles.inputOutput]}>
                    {' '}
                    {this.state.distributorItem.strAddress}{' '}
                  </Text>

                  <Text style={[styles.empty]}></Text>
                  <Text style={[styles.inputLebel]}> Address </Text>
                  <Text style={[styles.inputOutput]}>
                    {' '}
                    {this.state.distributeCreditInfo.strAddress}{' '}
                  </Text>
                </View>

                <View style={{flexBasis: '50%'}}>
                  <Text style={[styles.inputLebel]}> Phone </Text>
                  <Text style={[styles.inputOutput]}>
                    {' '}
                    {this.state.distributorItem.strPhone}{' '}
                  </Text>

                  <Text style={[styles.empty]}></Text>
                  <Text style={[styles.inputLebel]}> Territory </Text>
                  <Text style={[styles.inputOutput]}>
                    {' '}
                    {this.state.distributeCreditInfo.monOutstanding}{' '}
                  </Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: '#F2F8FF',
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
    flexDirection: 'row',
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
