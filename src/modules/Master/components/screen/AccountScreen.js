import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Dimensions} from 'react-native';
import Header from '../header/Header';
import GlobalStyles from '../../styles/GlobalStyles';
import accountuser from '../../../Master/images/accountuser.png';
import {RFPercentage} from 'react-native-responsive-fontsize';

const AccountScreen = (props) => {
  return (
    <View style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
        <View>
          <Header title="Account" subtitle="" />
        </View>
        <View style={[styles.container]}>
          <View style={[GlobalStyles.boxShadow]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexBasis: 0}}>
                <Image source={accountuser} style={[styles.accountuser]} />
              </View>
              <View>
                <Text style={[styles.userTitle]}> John Doe </Text>
                <Text style={[styles.userSubTitle]}> Global Technologies </Text>
              </View>
              <View>
                <Text style={[styles.userclient]}> Client </Text>
              </View>
            </View>
          </View>

          <View style={[GlobalStyles.boxShadow]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexBasis: 0}}>
                <Image source={accountuser} style={[styles.accountuser]} />
              </View>
              <View>
                <Text style={[styles.userTitle]}> John Doe </Text>
                <Text style={[styles.userSubTitle]}> Global Technologies </Text>
              </View>
              <View>
                <Text style={[styles.userclient]}> Client </Text>
              </View>
            </View>
          </View>

          <View style={[GlobalStyles.boxShadow]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexBasis: 0}}>
                <Image source={accountuser} style={[styles.accountuser]} />
              </View>
              <View>
                <Text style={[styles.userTitle]}> John Doe </Text>
                <Text style={[styles.userSubTitle]}> Global Technologies </Text>
              </View>
              <View>
                <Text style={[styles.userclient]}> Client </Text>
              </View>
            </View>
          </View>

          <View style={[GlobalStyles.boxShadow]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexBasis: 0}}>
                <Image source={accountuser} style={[styles.accountuser]} />
              </View>
              <View>
                <Text style={[styles.userTitle]}> John Doe </Text>
                <Text style={[styles.userSubTitle]}> Global Technologies </Text>
              </View>
              <View>
                <Text style={[styles.userclient]}> Client </Text>
              </View>
            </View>
          </View>

          <View style={[GlobalStyles.boxShadow]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexBasis: 0}}>
                <Image source={accountuser} style={[styles.accountuser]} />
              </View>
              <View>
                <Text style={[styles.userTitle]}> John Doe </Text>
                <Text style={[styles.userSubTitle]}> Global Technologies </Text>
              </View>
              <View>
                <Text style={[styles.userclient]}> Client </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Bottom navigation */}
    </View>
  );
};
const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  accountuser: {
    width: 65,
    height: 65,
  },
  userTitle: {
    color: '#202B35',
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    lineHeight: 40,
  },
  userSubTitle: {
    color: '#58595A',
    fontSize: RFPercentage(2.2),
  },
  userclient: {
    color: '#0075EB',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
  },
});
export default AccountScreen;
