import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RFPercentage} from 'react-native-responsive-fontsize';
import GlobalStyles from '../../Master/styles/GlobalStyles';
import confidential from '../images/confidential.png';

import accident from '../images/accident.png';

import event from '../images/event.png';

import risk from '../images/risk.png';
import equipment from '../images/equipment.png';

import CardMenu from '../../Master/components/cards/CardMenu';
import Header from '../../Master/components/header/Header';
import {getAuthAction} from '../../User/actions/AuthAction';

const Reports = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthAction());
  }, [props]);

  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
        <View>
          <Header title="Reports" />
          <View style={[styles.containerone]}>
            <View style={styles.menuContainer}>
              <CardMenu
                image={confidential}
                cardText="Confidential"
                url={() => props.navigation.navigate('confidential')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={equipment}
                cardText="Near Miss"
                url={() => props.navigation.navigate('nearMiss')}
                customStyle={styles.cardStyle}
              />
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              <CardMenu
                image={accident}
                cardText="Accident Incident"
                url={() => props.navigation.navigate('accidentIncident')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={event}
                cardText="Non Conformity"
                url={() => props.navigation.navigate('nonConformity')}
                customStyle={styles.cardStyle}
              />
            </View>
          </View>

          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              <CardMenu
                image={risk}
                cardText="Shipboard Emergency"
                url={() => props.navigation.navigate('shipboardEmergency')}
                customStyle={styles.cardStyle}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerone: {
    flex: 1,
    marginTop: 50,
  },
  cardStyle: {
    marginBottom: 20,
    borderRadius: 5,

    marginTop: 25,
  },
  containers: {
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  topbar: {
    marginTop: -0,
    width: width,
    height: height / 4,
    resizeMode: 'contain',
  },
  postionbox: {
    position: 'relative',
  },
  headerDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },

  headerTitle: {
    color: '#fff',
    fontSize: RFPercentage(4),
    fontWeight: 'normal',
    paddingVertical: 10,
  },
  button: {
    marginTop: 35,
  },
  emplyeeTitle: {
    color: '#202B35',
    fontSize: RFPercentage(2.7),
    fontWeight: 'bold',
    marginLeft: -5,
  },
  employeeid: {
    color: '#202B35',
    fontSize: RFPercentage(2.5),
    marginRight: 20,
  },
  employeeidguard: {
    color: '#202B35',
    fontSize: RFPercentage(2.5),
  },
  icon: {
    width: 32,
    height: 32,
  },
  logInputStyle: {
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 2,
    height: 55,
  },
});
export default Reports;
