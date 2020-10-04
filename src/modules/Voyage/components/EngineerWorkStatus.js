import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const EngineerWorkStatus = (props) => {
  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = () => {
    // if (props.enginnerData.positionSelected === "") {
    //   Alert.alert("Error", "Please select position");
    //   return false;
    // }
    // if (props.enginnerData.date === "") {
    //   Alert.alert("Error", "Please select date");
    //   return false;
    // }
    // if (props.enginnerData.intShipConditionTypeId === 0) {
    //   Alert.alert("Error", "Please select condition type");
    //   return false;
    // }
    // if (props.enginnerData.strRPM === "") {
    //   Alert.alert("Error", "Please give R.P.M value");
    //   return false;
    // }
    // if (props.enginnerData.decEngineSpeed === 0) {
    //   Alert.alert("Error", "Please give engine speed");
    //   return false;
    // }
    // if (props.enginnerData.decSlip === 0) {
    //   Alert.alert("Error", "Please give slip percentage");
    //   return false;
    // }
  };

  const checkValidation = () => {
    if (props.enginnerData.positionSelected === '') {
      Alert.alert('Error', 'Please select position');
      return false;
    }
    if (props.enginnerData.date === '') {
      Alert.alert('Error', 'Please select date');
      return false;
    }
    if (props.enginnerData.intShipConditionTypeId === 0) {
      Alert.alert('Error', 'Please select condition type');
      return false;
    }
    if (props.enginnerData.strRPM === '') {
      Alert.alert('Error', 'Please give R.P.M value');
      return false;
    }

    if (props.enginnerData.decEngineSpeed === 0) {
      Alert.alert('Error', 'Please give engine speed');
      return false;
    }
    if (props.enginnerData.decSlip === 0) {
      Alert.alert('Error', 'Please give slip percentage');
      return false;
    }
    return true;
  };

  return (
    <View style={[styles.akijnoorcardDetails]}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flexBasis: '47%',
            marginLeft: 5,
            marginRight: 5,
          }}>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={
                () => {
                  if (checkValidation()) {
                    props.gotoActivity('VoyageVlsfo', props.enginnerData);
                  }
                }
                // props.gotoActivity("VoyageVlsfo", props.enginnerData)
              }>
              <Text style={styles.mainEnginestyle}>
                Bunker VLSFO{'     '}
                <Text style={styles.mainEngineIcon}>
                  {' '}
                  <Icon name="arrow-circle-right" size={18} />{' '}
                </Text>
                {'   '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexBasis: '47%', marginLeft: 5}}>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={
                () => {
                  if (checkValidation()) {
                    props.gotoActivity('mainEngine', props.enginnerData);
                  }
                }
                // props.gotoActivity("mainEngine", props.enginnerData)
              }>
              <Text style={styles.mainEnginestyle}>
                Main Engine{'        '}
                <Text style={styles.mainEngineIcon}>
                  {' '}
                  <Icon name="arrow-circle-right" size={18} />{' '}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flexBasis: '47%',
            marginLeft: 5,
            marginRight: 5,
          }}>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={
                () => {
                  if (checkValidation()) {
                    props.gotoActivity('exhtEngine', props.enginnerData);
                  }
                }
                // props.gotoActivity("exhtEngine", props.enginnerData)
              }>
              <Text style={styles.mainEnginestyle}>
                Exht.Engine 1{'       '}
                <Text style={styles.mainEngineIcon}>
                  {' '}
                  <Icon name="arrow-circle-right" size={18} />{' '}
                </Text>
                {'   '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexBasis: '47%', marginLeft: 5}}>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={
                () => {
                  if (checkValidation()) {
                    props.gotoActivity('exhtEngineOne', props.enginnerData);
                  }
                }
                // props.gotoActivity("exhtEngineOne", props.enginnerData)
              }>
              <Text style={styles.mainEnginestyle}>
                Exht.Engine 2{'      '}
                <Text style={styles.mainEngineIcon}>
                  {' '}
                  <Icon name="arrow-circle-right" size={18} />{' '}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flexBasis: '47%',
            marginLeft: 5,
            marginRight: 5,
          }}>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={
                () => {
                  if (checkValidation()) {
                    props.gotoActivity('exhtEngineThree', props.enginnerData);
                  }
                }
                // props.gotoActivity("exhtEngineThree", props.enginnerData)
              }>
              <Text style={styles.mainEnginestyle}>
                Exht.Engine 3{'      '}
                <Text style={styles.mainEngineIcon}>
                  {' '}
                  <Icon name="arrow-circle-right" size={18} />{' '}
                </Text>
                {'   '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexBasis: '47%', marginLeft: 5}}>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={
                () => {
                  if (checkValidation()) {
                    props.gotoActivity('boiler', props.enginnerData);
                  }
                }
                // props.gotoActivity("boiler", props.enginnerData)
              }>
              <Text style={styles.mainEnginestyle}>
                Boiler{'                    '}
                <Text style={styles.mainEngineIcon}>
                  {' '}
                  <Icon name="arrow-circle-right" size={18} />{' '}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flexBasis: '47%',
            marginLeft: 5,
            marginRight: 5,
          }}>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={
                () => {
                  if (checkValidation()) {
                    props.gotoActivity('gasChemical', props.enginnerData);
                  }
                }
                // props.gotoActivity("gasChemical", props.enginnerData)
              }>
              <Text style={styles.mainEnginestyleone}>
                Gas AND {'\n'} Chemical's{' '}
                <Text style={styles.mainEngineIcon}>
                  {'          '}
                  <Icon name="arrow-circle-right" size={18} />{' '}
                </Text>{' '}
                {'\n'} CONSUMPTION {'   '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Place CSS
  mainEnginestyle: {
    backgroundColor: '#137beb',
    color: '#fff',
    fontSize: 14,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 50,
    paddingLeft: 20,
    textAlign: 'center',
  },
  mainEngineIcon: {
    backgroundColor: '#137beb',
  },
  mainEnginestyleone: {
    backgroundColor: '#137beb',
    color: '#fff',
    fontSize: 16,
    paddingTop: 8,

    borderRadius: 50,
    paddingLeft: 20,
    height: 80,
  },
});
export default EngineerWorkStatus;
