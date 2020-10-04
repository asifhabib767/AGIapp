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

import mycar from '../images/mycar.png';
import f1 from '../images/f1.png';
import f2 from '../images/f2.png';
import f3 from '../images/f3.png';
import f4 from '../images/f4.png';
import I1 from '../images/I1.png';
import I2 from '../images/I2.png';
import I3 from '../images/I3.png';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';

// import * as LocalizeHelper from '../Util/LocalizeHelper';
// import * as RNLocalize from "react-native-localize";

export default class MyCar extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView>
          <Animatable.View animation="fadeInUp">
            <View style={{paddingVertical: 15}}>
              <Text style={[styles.headingOne]}> আমার গাড়ি </Text>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp">
            <View style={[styles.boxTime]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '45%'}}>
                  <Text style={[styles.tripNos]}> SY204C-6 </Text>
                  <Text style={[styles.tripMobileNumber]}>
                    {' '}
                    চুয়াডাঙ্গা টি.এ 11-0392{' '}
                  </Text>
                  <Text style={[styles.tripActivity]}> চলমান </Text>
                </View>

                <View style={{flexBasis: '55%'}}>
                  <Image source={mycar} style={[styles.mycar]} />
                </View>
              </View>

              <View style={{flex: 1, flexDirection: 'row', marginTop: 50}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexBasis: '50%',
                    paddingLeft: 12,
                  }}>
                  <View style={{flexBasis: 30}}>
                    <Image source={f1} style={[styles.smImage]} />
                  </View>
                  <View style={{flexBasis: '70%'}}>
                    <Text style={[styles.titleList]}> মাঝারি ট্রাক </Text>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', flexBasis: '50%'}}>
                  <View style={{flexBasis: 30}}>
                    <Image source={f2} style={[styles.smImage]} />
                  </View>
                  <View style={{flexBasis: '70%'}}>
                    <Text style={[styles.titleList]}> মাঝারি ট্রাক </Text>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row', marginTop: 30}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexBasis: '50%',
                    paddingLeft: 12,
                  }}>
                  <View style={{flexBasis: 30}}>
                    <Image source={f3} style={[styles.smImage]} />
                  </View>
                  <View style={{flexBasis: '70%'}}>
                    <Text style={[styles.titleList]}> মাঝারি ট্রাক </Text>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', flexBasis: '50%'}}>
                  <View style={{flexBasis: 30}}>
                    <Image source={f4} style={[styles.smImage]} />
                  </View>
                  <View style={{flexBasis: '70%'}}>
                    <Text style={[styles.titleList]}> মাঝারি ট্রাক </Text>
                  </View>
                </View>
              </View>

              <View style={{flex: 1, flexDirection: 'row', marginTop: 30}}>
                <View style={{flexBasis: '48%', marginRight: 10}}>
                  <View style={[styles.numberBox]}>
                    <Text style={[styles.assetsName]}> অ্যাসেট নম্বর </Text>
                    <Text style={[styles.number]}> ৮৭৪৯৮৭ </Text>
                  </View>
                </View>
                <View style={{flexBasis: '48%'}}>
                  <View style={[styles.numberBox]}>
                    <Text style={[styles.assetsName]}> অ্যাসেট নম্বর </Text>
                    <Text style={[styles.number]}> ৮৭৪৯৮৭ </Text>
                  </View>
                </View>
              </View>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp">
            <View style={{flex: 1, flexDirection: 'row', marginTop: 30}}>
              <TouchableOpacity
                style={[styles.issueBox]}
                onPress={() => this.props.navigation.navigate('fuelList')}>
                <View style={{flexBasis: '80%'}}>
                  <Text style={[styles.issueTitle]}>
                    {' '}
                    <Image source={I1} style={[styles.issueImage]} /> ফুয়েল লগ{' '}
                  </Text>
                </View>
                <View style={{flexBasis: 20}}>
                  <Text style={[styles.issues]}> 3 </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.issueBox]}
                onPress={() => this.props.navigation.navigate('carProblem')}>
                <View style={{flexBasis: '80%'}}>
                  <Text style={[styles.issueTitle]}>
                    {' '}
                    <Image source={I2} style={[styles.issueImage]} /> গাড়ির
                    সমস্যা{' '}
                  </Text>
                </View>
                <View style={{flexBasis: 20}}>
                  <Text style={[styles.issues]}> 3 </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp">
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity
                style={[styles.issueBox]}
                onPress={() => this.props.navigation.navigate('meterhistory')}>
                <View style={{flexBasis: '42%'}}>
                  <Text style={[styles.issueTitle]}>
                    {' '}
                    <Image source={I3} style={[styles.issueImage]} /> মিটার
                    ইতিহাস{' '}
                  </Text>
                </View>
                <View style={{flexBasis: 20}}>
                  <Text style={[styles.issues]}> 3 </Text>
                </View>
              </TouchableOpacity>
              <View></View>
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
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 5,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
  },

  tripNos: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: RFPercentage(3),

    lineHeight: 30,
  },
  tripMobileNumber: {
    color: '#1A1818',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
  },
  tripActivity: {
    color: '#1A1818',
    fontSize: RFPercentage(2.2),
    backgroundColor: '#26C8A1',
    width: 100,
    textAlign: 'center',
    color: '#fff',
    borderRadius: 50,
    marginTop: 10,
  },
  mycar: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    marginLeft: 0,
  },
  smImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  titleList: {
    color: '#231F20',
    fontSize: RFPercentage(3),
  },
  numberBox: {
    backgroundColor: '#064CB5',
    flex: 1,
    width: '100%',
    paddingVertical: 8,
    borderRadius: 50,
  },
  assetsName: {
    color: '#fff',
    fontSize: RFPercentage(2.5),
    alignSelf: 'center',
  },
  number: {
    color: '#fff',
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  issueBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderLeftColor: '#064CB5',
    borderLeftWidth: 5,
    height: 65,
    flexBasis: '48%',
    marginHorizontal: 5,
    lineHeight: 65,
  },
  issueBoxs: {
    backgroundColor: '#fff',
    borderLeftColor: '#064CB5',
    borderLeftWidth: 5,
    height: 65,
    flexBasis: '48%',
    marginHorizontal: 5,
    lineHeight: 65,
  },

  issueTitle: {
    color: '#231F20',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    lineHeight: 60,
  },
  issues: {
    color: '#231F20',
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    lineHeight: 60,
  },
  issueImage: {
    paddingRight: 12,
  },
});
