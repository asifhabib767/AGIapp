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
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingListScreen = (props) => {
  return (
    <View style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
        <View style={{marginBottom: 20}}>
          <Header title="Settings" subtitle="" />
        </View>
        <View style={[styles.container]}>
          <View style={[styles.centerAlignBox]}>
            <View>
              <Text style={[styles.userTitle]}> Company Settings </Text>
            </View>
            <View>
              <Icon name="chevron-right" size={23} color="#000" />
            </View>
          </View>

          {/* <View style={[styles.centerAlignBox]}> */}
          <TouchableOpacity
            style={[styles.centerAlignBox]}
            onPress={() => props.navigation.navigate('language')}>
            <View>
              <Text style={[styles.userTitle]}> Localization </Text>
            </View>
            <View>
              <Icon name="chevron-right" size={23} color="#000" />
            </View>
          </TouchableOpacity>
          {/* </View> */}

          <View style={[styles.centerAlignBox]}>
            <View>
              <Text style={[styles.userTitle]}> Email Settings </Text>
            </View>
            <View>
              <Icon name="chevron-right" size={23} color="#000" />
            </View>
          </View>

          <View style={[styles.centerAlignBox]}>
            <View>
              <Text style={[styles.userTitle]}> Invoice Settings </Text>
            </View>
            <View>
              <Icon name="chevron-right" size={23} color="#000" />
            </View>
          </View>

          <View style={[styles.centerAlignBox]}>
            <View>
              <Text style={[styles.userTitle]}> Notifications </Text>
            </View>
            <View>
              <Icon name="chevron-right" size={23} color="#000" />
            </View>
          </View>

          <View style={[styles.centerAlignBox]}>
            <View>
              <Text style={[styles.userTitle]}> Change Password </Text>
            </View>
            <View>
              <Icon name="chevron-right" size={23} color="#000" />
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
  centerAlignBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: 3,
    shadowRadius: 0,
    shadowOffset: {width: 1, height: 1},
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
export default SettingListScreen;
