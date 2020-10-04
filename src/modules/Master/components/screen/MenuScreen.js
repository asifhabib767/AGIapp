import React, {useState} from 'react';
import {View, KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native';
import {Card, Text, Layout} from '@ui-kitten/components';
import avatarImage from '../../images/avatar.jpg';
import BottomMenu from './../BottomMenu';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardLayout from './../layout/DashboardLayout';

const MenuScreen = () => {
  return (
    <View>
      <ScrollView>
        <Layout>
          <View style={styles.firstSection}>
            <View>
              <Text category="h4">Hello, Maniruzzaman</Text>
              <Text category="h6">Good Menu Screen</Text>
            </View>
          </View>
        </Layout>
      </ScrollView>
      {/* Bottom navigation */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  layoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  manageLayout: {
    paddingHorizontal: 12,
  },
  Card: {
    marginBottom: 10,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabbottom: {
    justifyContent: 'flex-end',
  },
  manageBox: {
    marginTop: 10,
  },
});
export default MenuScreen;
