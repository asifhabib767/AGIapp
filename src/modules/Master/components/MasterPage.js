import React, {useState} from 'react';
import {View, KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native';
import {
  Layout,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Card,
  Text,
  Avatar,
  Button,
} from '@ui-kitten/components';
import BottomMenu from './BottomMenu';
import TopHeaderBar from './TopHeaderBar';

const MasterPage = (props) => {
  return (
    <View style={styles.container}>
      <TopHeaderBar title={props.pageTitle} />
      {props.children}
      <BottomMenu />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstSection: {
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabbottom: {
    justifyContent: 'flex-end',
  },
});
export default MasterPage;
