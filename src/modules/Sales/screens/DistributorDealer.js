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
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import {getDistributor} from '../service/distributor/Distributor';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class DistributorDealer extends Component {
  state = {
    getDealer: '',
  };

  componentDidMount = async () => {
    // let userData = await AsyncStorage.getItem('userData') || 'none';
    //  let dataParse = JSON.parse(userData);

    // let email = dataParse.strOfficeEmail;
    let getDealer = await getDistributor();
    console.log('get dealer is', getDealer);

    this.setState({
      getDealer,
    });
  };
  render() {
    return (
      <KeyboardAvoidingView style={{backgroundColor: '#FFF'}}>
        <ScrollView style={{marginBottom: 50}}>
          <SafeAreaView style={[styles.container]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.headingOne]}> Distributor/Dealer </Text>
            </View>

            <View style={[styles.bgbox, {marginBottom: 50}]}>
              <FlatList
                data={this.state.getDealer}
                renderItem={({item}) => (
                  // <TouchableOpacity
                  //   onPress={() =>
                  //     Actions.distributorDealerDetails({
                  //       distributorSingleData: item,
                  //     })
                  //   }>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate(
                        'distributionDealerDetails',
                        item,
                      )
                    }>
                    <View style={[styles.distributorDetails]}>
                      <View style={{flexBasis: '65%'}}>
                        <Text style={[styles.distributerName]}>
                          {' '}
                          {item.strName}{' '}
                        </Text>
                        <Text style={[styles.distributerLocation]}>
                          {' '}
                          {item.strAddress}{' '}
                        </Text>
                      </View>
                      <View style={{flexBasis: '35%', alignItems: 'center'}}>
                        <Text style={[styles.outstanding]}>
                          {' '}
                          Ledger Balance{' '}
                        </Text>
                        <Text style={[styles.distributerAmonut]}>
                          {item.monLedgerBalance <= 0 && (
                            <Text style={{color: 'red'}}>
                              ৳{item.monLedgerBalance}
                            </Text>
                          )}
                          {item.monLedgerBalance > 0 && (
                            <Text style={{color: 'green'}}>
                              ৳{item.monLedgerBalance}
                            </Text>
                          )}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
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
    width: '95%',
    margin: 8,
    height: '100%',
    backgroundColor: '#fff',
  },

  bgbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    margin: 5,
    padding: 5,
    paddingTop: 0,
  },

  headingOne: {
    fontSize: 19,
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingTop: 5,
  },

  distributorDetails: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
  },

  distributerName: {
    color: '#231F20',
    fontSize: RFPercentage(2.5),
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },

  distributerLocation: {
    color: '#231F20',
    fontSize: RFPercentage(2.5),
    fontFamily: 'Poppins',
    fontStyle: 'italic',
  },

  outstanding: {
    color: '#231F20',
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins',
    marginTop: '15%',
  },

  distributerAmonut: {
    color: '#231F20',
    fontSize: RFPercentage(2.2),
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },

  distributorActive: {
    backgroundColor: '#34C787',
    width: '35%',
    height: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    borderRadius: 50,
    marginTop: 5,
    fontSize: RFPercentage(2.0),
    paddingTop: '1%',
  },
  distributorInactive: {
    backgroundColor: '#ccc',
    width: '35%',
    height: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    borderRadius: 50,
    marginTop: 5,
    fontSize: RFPercentage(2.0),
    paddingTop: '1%',
  },
});
