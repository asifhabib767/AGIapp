import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  multilineInputState,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {getAuthAction} from '../../User/actions/AuthAction';
import {Radio, RadioGroup} from '@ui-kitten/components';
import {Input} from '@ui-kitten/components';
import {Picker} from '@react-native-community/picker';

const Confidential = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthAction());
  }, [props]);

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <ScrollView>
        <SafeAreaView>
          <View style={[styles.bgbox]}>
            <View>
              <Text style={[styles.headerTitle]}>Confidential Report</Text>
            </View>
            <View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Name of Employee"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Rank"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Name of Vessel"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View style={[styles.Cargotypestyle]}>
                <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                  <TextInput
                    style={[styles.testInputStyle]}
                    placeholder="Employed  On"
                    placeholderTextColor={'#000000'}
                    fontSize={20}
                    fontWeight={'bold'}
                    value={0}
                    onChangeText={(value) => changePurpose(value)}
                  />
                </View>
                <View style={[styles.Cargotypestyleone, styles.inputBoxStyle]}>
                  <TextInput
                    style={[styles.testInputStyle]}
                    placeholder="To"
                    placeholderTextColor={'#000000'}
                    fontSize={20}
                    fontWeight={'bold'}
                    value={0}
                    onChangeText={(value) => changePurpose(value)}
                  />
                </View>
              </View>
              <View style={[styles.conductborder]}>
                <Text style={[styles.Conductstyleone]}>Conduct</Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>Above average</Radio>
                      <Radio>Average</Radio>
                      <Radio>Below Average</Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyle]}>Ability</Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>Above average</Radio>
                      <Radio>Average</Radio>
                      <Radio>Below Average</Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyle]}>
                  Professional Knowledge
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>Above average</Radio>
                      <Radio>Average</Radio>
                      <Radio>Below Average</Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyle]}>Initiative</Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>Above average</Radio>
                      <Radio>Average</Radio>
                      <Radio>Below Average</Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyle]}>Sobriety</Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>Above average</Radio>
                      <Radio>Average</Radio>
                      <Radio>Below Average</Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyle]}>
                  Sense Of Responsiblity
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>Above average</Radio>
                      <Radio>Average</Radio>
                      <Radio>Below Average</Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyle]}>Relation with others</Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>Above average</Radio>
                      <Radio>Average</Radio>
                      <Radio>Below Average</Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyle]}>Adaptability</Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>Above average</Radio>
                      <Radio>Average</Radio>
                      <Radio>Below Average</Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
              <View style={[styles.abilitystyle]}>
                <Text style={[styles.Conductstyle]}>
                  Devotion and enthusiasm
                </Text>

                <View style={[styles.radioBoxStyle]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <RadioGroup
                      // selectedIndex={state.maintenanceTypeValue}
                      onChange={(index) => changeMaintenanceValue(index)}
                      style={{flexDirection: 'row', zIndex: 0}}>
                      <Radio>Above average</Radio>
                      <Radio>Average</Radio>
                      <Radio>Below Average</Radio>
                    </RadioGroup>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.multilinestyle]}>
            <View>
              <Text style={[styles.labelstyle]}> Remarks</Text>
            </View>

            <View
              style={{
                width: '99%',
              }}>
              <Input
                style={{
                  backgroundColor: '#F3F3F3',
                  borderRadius: 13,
                }}
                multiline={true}
                textStyle={{minHeight: 100}}
                placeholder="Type"
                {...multilineInputState}
              />
            </View>

            <View style={[styles.abilitystyle]}>
              <Text style={[styles.promotionstyle]}>
                1. Promotion recommended
              </Text>

              <View style={[styles.radioBoxStyle]}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <RadioGroup
                    // selectedIndex={state.maintenanceTypeValue}
                    onChange={(index) => changeMaintenanceValue(index)}
                    style={{flexDirection: 'row', zIndex: 0}}>
                    <Radio>Yes</Radio>
                    <Radio>No</Radio>
                  </RadioGroup>
                </View>
              </View>
            </View>
            <View style={[styles.inputBoxStyle]}>
              <Picker
                // selectedValue={state.userSelected}
                style={[styles.selectBoxStyle]}
                onValueChange={(item, itemIndex) => changeUser(item)}>
                <Picker.Item label="Approved By" value="" />
                <Picker.Item label={'Officer'} value={1} key={1} />
                <Picker.Item label={'Engineer'} value={2} key={2} />
              </Picker>
            </View>
          </View>
          <View style={[styles.multilinestyle]}>
            <View>
              <Text style={[styles.labelstyle]}> Remarks</Text>
            </View>

            <View
              style={{
                width: '99%',
              }}>
              <Input
                style={{
                  backgroundColor: '#F3F3F3',
                  borderRadius: 13,
                }}
                multiline={true}
                textStyle={{minHeight: 100}}
                placeholder="Type"
                {...multilineInputState}
              />
            </View>

            <View style={[styles.abilitystyle]}>
              <Text style={[styles.promotionstyle]}>
                2. Further employment recommended
              </Text>

              <View style={[styles.radioBoxStyle]}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <RadioGroup
                    // selectedIndex={state.maintenanceTypeValue}
                    onChange={(index) => changeMaintenanceValue(index)}
                    style={{flexDirection: 'row', zIndex: 0}}>
                    <Radio>Yes</Radio>
                    <Radio>No</Radio>
                  </RadioGroup>
                </View>
              </View>
            </View>
            <View style={[styles.inputBoxStyle]}>
              <Picker
                // selectedValue={state.userSelected}
                style={[styles.selectBoxStyle]}
                onValueChange={(item, itemIndex) => changeUser(item)}>
                <Picker.Item label="Approved By" value="" />
                <Picker.Item label={'Officer'} value={1} key={1} />
                <Picker.Item label={'Engineer'} value={2} key={2} />
              </Picker>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#fff',
              marginBottom: 40,
            }}>
            <View
              style={{
                flexBasis: '42%',
                marginLeft: 20,
                marginRight: 15,
              }}>
              <View style={{marginTop: 20}}>
                <TouchableOpacity onPress={() => submit()}>
                  <Text style={styles.backButtonStyle}>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexBasis: '42%', marginLeft: 5}}>
              <View style={{marginTop: 20}}>
                <TouchableOpacity onPress={() => submit()}>
                  <Text style={styles.buttonStyle}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  promotionstyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',
    paddingTop: 15,
  },
  radioTexttyle: {
    fontSize: 20,
  },
  InputField: {
    fontSize: 20,
    paddingTop: 17,
    backgroundColor: '#F7F9FC',
    borderColor: '#F2F2F2',
    paddingLeft: 15,
    marginTop: 20,
    borderRadius: 4,
    borderWidth: 1,
    paddingBottom: 17,
    fontWeight: '400',
    marginLeft: 10,
    marginRight: 10,
    color: '#000000',
  },
  Cargotypestyle: {
    flex: 1,
    flexDirection: 'row',
  },
  Cargotypestyleone: {
    flexBasis: '46%',
    marginLeft: 8,
  },
  inputBoxStyle: {
    fontSize: 17,
    borderWidth: 0,
    borderColor: '#ddd',
    marginTop: 25,

    backgroundColor: '#F7F9FC',
    padding: 10,
    fontWeight: 'bold',
  },
  Conductstyleone: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
    paddingLeft: 20,
  },
  multilinestyle: {
    backgroundColor: '#fff',
    padding: 15,
  },
  Conductstyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    paddingLeft: 20,
  },
  conductborder: {
    borderTopWidth: 1,
    borderTopColor: '#00000029',
    marginTop: 40,
  },
  radioBoxStyle: {
    fontSize: 17,
    marginTop: 8,
  },
  labelstyle: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  backButtonStyle: {
    backgroundColor: '#F3F6FA',
    color: '#213547',

    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 35,
    textTransform: 'uppercase',
    borderRadius: 10,
    borderColor: '#88959F',
    fontWeight: 'bold',
    borderWidth: 2,
  },
  buttonStyle: {
    backgroundColor: '#2A71E5',
    color: '#fff',

    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 35,

    borderRadius: 10,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#147AD6',
  },
});
export default Confidential;
