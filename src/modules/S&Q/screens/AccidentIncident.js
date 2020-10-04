import React, {useEffect, useState} from 'react';
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

import {Input} from '@ui-kitten/components';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const AccidentIncident = (props) => {
  const dispatch = useDispatch();

  const [activeChecked, setActiveChecked] = useState(false);

  useEffect(() => {
    dispatch(getAuthAction());
  }, [props]);

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <ScrollView>
        <SafeAreaView>
          <View style={[styles.bgbox]}>
            <View>
              <Text style={[styles.headerTitle]}>Accident Incident Report</Text>
            </View>
            <View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Vessel"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Position of Vessel"
                  placeholderTextColor={'#000000'}
                />
              </View>

              <View style={[styles.Cargotypestyle, styles.cargostyle]}>
                <View
                  style={[styles.Cargotypestyleone, styles.inputBoxoneStyle]}>
                  <TextInput
                    placeholder="Time Of Event"
                    placeholderTextColor={'#BBBBBB'}
                    fontSize={16}
                    value={0}
                    marginLeft={10}
                    onChangeText={(value) => changePurpose(value)}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Details Of Accident/Hazardous Occurrence
                </Text>
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
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    // selectedValue={state.userSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => changeUser(item)}>
                    <Picker.Item label="Head of Dept" value="" />
                    <Picker.Item label={'Officer'} value={1} key={1} />
                    <Picker.Item label={'Engineer'} value={2} key={2} />
                  </Picker>
                </View>
                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    // selectedValue={state.userSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => changeUser(item)}>
                    <Picker.Item label="Master" value="" />
                    <Picker.Item label={'Officer'} value={1} key={1} />
                    <Picker.Item label={'Engineer'} value={2} key={2} />
                  </Picker>
                </View>
              </View>
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Details Of On-Board Investigation & Prevention
                </Text>
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
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    // selectedValue={state.userSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => changeUser(item)}>
                    <Picker.Item label="Head of Dept" value="" />
                    <Picker.Item label={'Officer'} value={1} key={1} />
                    <Picker.Item label={'Engineer'} value={2} key={2} />
                  </Picker>
                </View>
                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    // selectedValue={state.userSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => changeUser(item)}>
                    <Picker.Item label="Master" value="" />
                    <Picker.Item label={'Officer'} value={1} key={1} />
                    <Picker.Item label={'Engineer'} value={2} key={2} />
                  </Picker>
                </View>
              </View>
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Details Of Head Office Investigation & Prevention
                </Text>
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
                  textStyle={{minHeight: 80}}
                  placeholder="Type"
                  {...multilineInputState}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    // selectedValue={state.userSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => changeUser(item)}>
                    <Picker.Item label="Super Intendent" value="" />
                    <Picker.Item label={'Officer'} value={1} key={1} />
                    <Picker.Item label={'Engineer'} value={2} key={2} />
                  </Picker>
                </View>
                <View style={[styles.inputBoxStyle]}>
                  <Picker
                    // selectedValue={state.userSelected}
                    style={[styles.selectBoxStyle]}
                    onValueChange={(item, itemIndex) => changeUser(item)}>
                    <Picker.Item label="DPA" value="" />
                    <Picker.Item label={'Officer'} value={1} key={1} />
                    <Picker.Item label={'Engineer'} value={2} key={2} />
                  </Picker>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.innerAreaDiv, {marginTop: 10}]}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 20}}>
                Add Photo
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flexBasis: '50%'}}>
                <Text
                  style={{
                    fontSize: 20,

                    marginTop: 10,
                    marginLeft: 20,
                  }}>
                  No Files Selected
                </Text>
              </View>
              <View style={{flexBasis: '47%'}}>
                <View>
                  <TouchableOpacity onPress={() => submit()}>
                    <Text style={styles.imageButtonStyle}>
                      {/* {translate("get_in", this.state.system_lang)} */}
                      <Icon name="camera" size={18} />
                      {'  '} Add Image
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',

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
    backgroundColor: '#fff',
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
  selectBoxStyle: {
    flex: 1,
    flexDirection: 'row',

    flexBasis: '100%',
    marginRight: 2,
    fontWeight: 'bold',
  },
  promotionstyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    paddingBottom: 15,
  },
  checkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 17,
    marginLeft: 3,
  },
  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 15,
  },

  imageButtonStyle: {
    backgroundColor: '#2ECBAD',
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 14,

    borderRadius: 50,
    borderColor: '#2ECBAD',

    borderWidth: 2,
  },

  InputField: {
    fontSize: 16,
    paddingTop: 12,
    backgroundColor: '#F7F9FC',
    borderColor: '#F2F2F2',
    paddingLeft: 15,
    marginTop: 10,
    borderRadius: 4,
    borderWidth: 1,
    paddingBottom: 12,
    fontWeight: '400',

    color: '#000000',
  },
  Cargotypestyle: {
    flex: 1,
    flexDirection: 'row',
  },
  Cargotypestyleone: {
    flexBasis: '100%',
    marginRight: 10,
  },
  inputBoxStyle: {
    fontSize: 16,
    borderRadius: 7,
    flexBasis: '48%',

    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',

    backgroundColor: '#F7F9FC',
    padding: 2,
    fontWeight: 'bold',
    marginRight: 10,
  },
  inputBoxoneStyle: {
    fontSize: 16,
    borderRadius: 7,

    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',

    backgroundColor: '#F7F9FC',
    padding: 2,
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
    paddingTop: 20,
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

  labelstyle: {
    fontSize: 16,

    paddingBottom: 20,
    fontWeight: '600',
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
export default AccidentIncident;
