import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import SearchBar from 'react-native-search-bar';
import CustomSearchbar from '../components/CustomSearchbar';
import {Picker} from '@react-native-community/picker';

// import * as LocalizeHelper from '../Util/LocalizeHelper';
// import * as RNLocalize from "react-native-localize";

export default class CarProblem extends Component {
  state = {
    selects: '',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView>
          <Animatable.View animation="fadeInUp">
            <View style={{flex: 1, flexDirection: 'row', marginVertical: 20}}>
              <View style={{flexBasis: '75%'}}>
                <Text style={[styles.headingOne]}> সমস্যা সমূহ </Text>
              </View>
              <View style={{flexBasis: '25%'}}>
                <LinearGradient
                  colors={['#48C1B9', '#11D6A0']}
                  style={styles.linearGradient}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('addCarProblem')
                    }>
                    <Text style={styles.buttonText}>
                      Add&nbsp;{''}
                      <Icon name="plus" size={18} color="#fff" />
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp">
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingVertical: 15,
                backgroundColor: '#fff',
              }}>
              <View style={{flexBasis: '65%', marginRight: 15}}>
                <CustomSearchbar placeHolderText="Search from outlets" />
              </View>
              <View style={[styles.selects]}>
                <Picker
                  selectedValue={this.state.selects}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({selects: itemValue})
                  }>
                  <Picker.Item label="Select" value="Select" />
                  <Picker.Item label="1" value="2" />
                  <Picker.Item label="1" value="2" />
                </Picker>
              </View>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp">
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.boxTitle, {flexBasis: '70%'}]}>
                {' '}
                সমস্যা{' '}
              </Text>
              <Text style={[styles.boxTitle, {flexBasis: '30%'}]}>
                {' '}
                আরোপিত{' '}
              </Text>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp">
            <View style={[styles.boxTime]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '70%', flexWrap: 'nowrap'}}>
                  <Text style={[styles.tripNos]}> # ৭ · গিয়ারবক্স শব্দ </Text>
                  <Text style={[styles.tripDate]}>
                    {' '}
                    রাফাত রহমান লিখেছেন ১২ ডিসেম্বর, ২০১৯{' '}
                  </Text>
                  <Text style={[styles.tripName]}> মধ্যম </Text>
                </View>
                <View style={{flexBasis: '30%', marginTop: 25}}>
                  <Text style={[styles.listName]}>
                    {' '}
                    <Icon name="user" size={20} /> রাফাত রহমান{' '}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.boxTime]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '70%', flexWrap: 'nowrap'}}>
                  <Text style={[styles.tripNos]}> # ৭ · গিয়ারবক্স শব্দ </Text>
                  <Text style={[styles.tripDate]}>
                    {' '}
                    রাফাত রহমান লিখেছেন ১২ ডিসেম্বর, ২০১৯{' '}
                  </Text>
                  <Text style={[styles.tripName]}> মধ্যম </Text>
                </View>
                <View style={{flexBasis: '30%', marginTop: 25}}>
                  <Text style={[styles.listName]}>
                    {' '}
                    <Icon name="user" size={20} /> রাফাত রহমান{' '}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.boxTime]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '70%', flexWrap: 'nowrap'}}>
                  <Text style={[styles.tripNos]}> # ৭ · গিয়ারবক্স শব্দ </Text>
                  <Text style={[styles.tripDate]}>
                    {' '}
                    রাফাত রহমান লিখেছেন ১২ ডিসেম্বর, ২০১৯{' '}
                  </Text>
                  <Text style={[styles.tripName]}> মধ্যম </Text>
                </View>
                <View style={{flexBasis: '30%', marginTop: 25}}>
                  <Text style={[styles.listName]}>
                    {' '}
                    <Icon name="user" size={20} /> রাফাত রহমান{' '}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.boxTime]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '70%', flexWrap: 'nowrap'}}>
                  <Text style={[styles.tripNos]}> # ৭ · গিয়ারবক্স শব্দ </Text>
                  <Text style={[styles.tripDate]}>
                    {' '}
                    রাফাত রহমান লিখেছেন ১২ ডিসেম্বর, ২০১৯{' '}
                  </Text>
                  <Text style={[styles.tripName]}> মধ্যম </Text>
                </View>
                <View style={{flexBasis: '30%', marginTop: 25}}>
                  <Text style={[styles.listName]}>
                    {' '}
                    <Icon name="user" size={20} /> রাফাত রহমান{' '}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.boxTime]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '70%', flexWrap: 'nowrap'}}>
                  <Text style={[styles.tripNos]}> # ৭ · গিয়ারবক্স শব্দ </Text>
                  <Text style={[styles.tripDate]}>
                    {' '}
                    রাফাত রহমান লিখেছেন ১২ ডিসেম্বর, ২০১৯{' '}
                  </Text>
                  <Text style={[styles.tripName]}> মধ্যম </Text>
                </View>
                <View style={{flexBasis: '30%', marginTop: 25}}>
                  <Text style={[styles.listName]}>
                    {' '}
                    <Icon name="user" size={20} /> রাফাত রহমান{' '}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.boxTime]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '70%', flexWrap: 'nowrap'}}>
                  <Text style={[styles.tripNos]}> # ৭ · গিয়ারবক্স শব্দ </Text>
                  <Text style={[styles.tripDate]}>
                    {' '}
                    রাফাত রহমান লিখেছেন ১২ ডিসেম্বর, ২০১৯{' '}
                  </Text>
                  <Text style={[styles.tripName]}> মধ্যম </Text>
                </View>
                <View style={{flexBasis: '30%', marginTop: 25}}>
                  <Text style={[styles.listName]}>
                    {' '}
                    <Icon name="user" size={20} /> রাফাত রহমান{' '}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.boxTime]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '70%', flexWrap: 'nowrap'}}>
                  <Text style={[styles.tripNos]}> # ৭ · গিয়ারবক্স শব্দ </Text>
                  <Text style={[styles.tripDate]}>
                    {' '}
                    রাফাত রহমান লিখেছেন ১২ ডিসেম্বর, ২০১৯{' '}
                  </Text>
                  <Text style={[styles.tripName]}> মধ্যম </Text>
                </View>
                <View style={{flexBasis: '30%', marginTop: 25}}>
                  <Text style={[styles.listName]}>
                    {' '}
                    <Icon name="user" size={20} /> রাফাত রহমান{' '}
                  </Text>
                </View>
              </View>
            </View>
          </Animatable.View>

          <View>
            <Text></Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 4,
    backgroundColor: '#F2F8FF',
  },

  profileMenu: {
    flex: 1,
    flexDirection: 'row',
    resizeMode: 'stretch',
  },
  headingOne: {
    color: '#1A1818',
    fontWeight: 'bold',
    fontSize: RFPercentage(4),
  },
  boxTime: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 5,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
    marginBottom: 10,
  },

  car: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  tripNos: {
    color: '#1A1818',
    fontWeight: 'bold',
    fontSize: RFPercentage(3),
  },
  tripDate: {
    color: '#1A1818',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.2),
  },

  listName: {
    color: '#064CB5',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.2),
  },
  listValue: {
    color: '#064CB5',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.2),
  },
  linearGradient: {
    borderRadius: 50,
  },
  buttonText: {
    fontSize: RFPercentage(3),
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 12,
    fontWeight: 'bold',
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
  boxTitle: {
    color: '#000000',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    paddingVertical: 10,
  },
});
