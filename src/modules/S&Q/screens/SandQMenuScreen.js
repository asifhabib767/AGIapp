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
import reports from '../images/reports.png';
import traning from '../images/traning.png';
import permit from '../images/permit.png';
import plan from '../images/plan.png';
import join from '../images/join.png';
import event from '../images/event.png';
import improvemnet from '../images/improvemnet.png';
import confidential from '../images/confidential.png';
import equipment from '../images/equipment.png';

import risk from '../images/risk.png';

import CardMenu from '../../Master/components/cards/CardMenu';
import Header from '../../Master/components/header/Header';
import {getAuthAction} from '../../User/actions/AuthAction';

const SandQMenuScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthAction());
  }, [props]);

  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
        <View>
          <Header title="S&Q" />
          <View style={[styles.containerone]}>
            <View style={styles.menuContainer}>
              <CardMenu
                image={confidential}
                cardText="Reports"
                url={() => props.navigation.navigate('reports')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={traning}
                cardText="Traning Plans"
                url={() => props.navigation.navigate('')}
                customStyle={styles.cardStyle}
              />
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              <CardMenu
                image={permit}
                cardText="Permits"
                url={() => props.navigation.navigate('permits')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={plan}
                cardText="Contigency Plan"
                url={() => props.navigation.navigate('contigencyPlan')}
                customStyle={styles.cardStyle}
              />
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              <CardMenu
                image={reports}
                cardText="Audit"
                url={() => props.navigation.navigate('audit')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={join}
                cardText="Seafarers Joining"
                url={() => props.navigation.navigate('seafarersJoining')}
                customStyle={styles.cardStyle}
              />
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              <CardMenu
                image={event}
                cardText="Event"
                url={() => props.navigation.navigate('event')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={improvemnet}
                cardText="Improvement"
                url={() => props.navigation.navigate('improvement')}
                customStyle={styles.cardStyle}
              />
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              <CardMenu
                image={equipment}
                cardText="Plan & Equipment "
                url={() => props.navigation.navigate('planEquipment')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={equipment}
                cardText="Rest Hour"
                url={() => props.navigation.navigate('restHour')}
                equipment
                customStyle={styles.cardStyle}
              />
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              <CardMenu
                image={risk}
                cardText="Risk"
                url={() => props.navigation.navigate('voyageList')}
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
    marginBottom: 10,
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
export default SandQMenuScreen;
