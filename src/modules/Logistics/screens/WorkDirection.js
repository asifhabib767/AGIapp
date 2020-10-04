import React, { Component } from 'react';
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
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import SearchBar from "react-native-search-bar";
import CustomSearchbar from "../components/CustomSearchbar";
import { Picker } from "@react-native-community/picker";
import { getTotalTripCompleteByDriver } from "../service/VehicleTracking/VehicleLocation";
import { Form, TextValidator } from "react-native-validator-form";
import { getFormattedCurrentDate } from "../Util/DateConfigure";
import Moment from 'moment';
// import * as LocalizeHelper from '../Util/LocalizeHelper';
// import * as RNLocalize from "react-native-localize";

export default class WorkDirection extends Component {

  state = {
    TripCompletedbyDriverList: [],

  };

  componentDidMount = () => {
    this.initializeList();
    Form.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  initializeList = async () => {
    const TripCompletedbyDriverList = await getTotalTripCompleteByDriver();
    console.log('TripCompletedbyDriverList', TripCompletedbyDriverList)
    this.setState({
      TripCompletedbyDriverList: TripCompletedbyDriverList

    })

  }




  render() {
    return (

      <ScrollView style={styles.container}>
        <SafeAreaView>

          <Animatable.View animation="fadeInUp">
            <View style={{ flex: 1, flexDirection: 'row', marginVertical: 20 }}>
              <View style={{ flexBasis: '75%' }}>
                <Text style={[styles.headingOne]}> কাজের আদেশ </Text>
              </View>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp">

            <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 15, backgroundColor: '#fff', }}>

              <View style={{ flexBasis: '65%', marginRight: 15 }}>
                <CustomSearchbar
                  placeHolderText="Search from outlets"
                />
              </View>
              <View style={[styles.selects]}>
                <Picker
                  selectedValue={this.state.selectOption}

                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selectOption: itemValue })
                  }>
                  <Picker.Item label="সব" value="সব" />
                  <Picker.Item label="নতুন" value="নতুন" />
                  <Picker.Item label="তারিখ" value="তারিখ" />
                  <Picker.Item label="কাজের সময়" value="কাজের সময়" />

                </Picker>
              </View>

            </View>

          </Animatable.View>

          {
            this.state.TripCompletedbyDriverList.map(((item, index) => (


              <Animatable.View animation="fadeInUp">
                <View style={[styles.boxTime, styles.bgimg]}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{ flexBasis: '35%', flexWrap: 'nowrap', }}>
                      <Text style={[styles.tripTitle]}> ট্রিপ নং  </Text>
                      <Text style={[styles.tripName]}> {item.tripcode} </Text>
                    </View>
                    <View style={{ flexBasis: '40%' }}>
                      <Text style={[styles.tripTitle]}> তারিখ </Text>
                      <Text style={[styles.tripName]}> {Moment(item.dteOutTime).format('yyyy-MM-dd')}</Text>
                    </View>
                    <View style={{ flexBasis: '30%', }}>
                      <Text style={[styles.tripTitle]}> কাজের সময়</Text>
                      <Text style={[styles.workingTime]}>{item.decRequiredTime} </Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, marginTop: 20 }}>

                    <View>
                      <Text style={[styles.location]}> {item.fromaddr} </Text>
                      <Text style={[styles.location]}> {item.toaddress} </Text>
                    </View>

                  </View>
                </View>
              </Animatable.View>

            )))}












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
    shadowOffset: { width: 1, height: 1 },
    marginBottom: 10,
  },

  tripTitle: {
    color: '#1A1818',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
  },
  tripName: {
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
    fontWeight: 'bold'
  },
  selects: {
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 1 },
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
  location: {
    color: '#000000',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    borderLeftColor: '#064CB5',
    borderLeftWidth: 5,
    paddingLeft: 10,
  },
  workingTime: {
    fontSize: RFPercentage(2.8),
    color: '#26C8A1',
    fontWeight: 'bold'
  }

});
