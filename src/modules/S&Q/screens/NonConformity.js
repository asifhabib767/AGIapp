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

import {CheckBox, Layout} from '@ui-kitten/components';

const NonConformity = (props) => {
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
              <Text style={[styles.headerTitle]}>Non Conformity Report</Text>
            </View>
            <View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="NC Report No"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Entity (Vessel/area/procedure)"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Ref no"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Major NC/Observation"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Section/subsection of the SMS"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Paragraph number(s) of relevant requirement, if any"
                  placeholderTextColor={'#000000'}
                  fontSize={14}
                />
              </View>
            </View>

            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Detailed Description of Findings
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
            </View>
            <View>
              <TextInput
                style={[styles.InputField]}
                placeholder="Name & rank of entity represenetive"
                placeholderTextColor={'#000000'}
              />
            </View>
            <View>
              <TextInput
                style={[styles.InputField]}
                placeholder="Name & Designation"
                placeholderTextColor={'#000000'}
              />
            </View>
            <View style={[styles.analysisborderstyle]}>
              <Text style={[styles.analysisstyle]}>
                Analysis & Action Proposed by the entity representive
              </Text>
            </View>

            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}>
                  {' '}
                  Summary of Root Cause Analysis
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
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}> Corrective action</Text>
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
            </View>
            <View style={[styles.multilinestyle]}>
              <View>
                <Text style={[styles.labelstyle]}> Preventive action</Text>
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
            </View>
            <View>
              <TextInput
                style={[styles.InputField]}
                placeholder="Name & rank of entity represenetive"
                placeholderTextColor={'#000000'}
              />
            </View>
            <View style={[styles.analysisborderstyle]}>
              <Text style={[styles.analysisstyle]}>
                Further Assessment of Proposed Corrective Action
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginBottom: 20,
                marginTop: 20,
              }}>
              <View style={{flexBasis: '50%'}}>
                <CheckBox
                  checked={activeChecked}
                  onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                  <Text style={styles.checkboxstyle}> Accepted</Text>
                </CheckBox>
              </View>
              <View style={{flexBasis: '50%'}}>
                <CheckBox
                  checked={activeChecked}
                  onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                  <Text style={styles.checkboxstyle}> Not accepted</Text>
                </CheckBox>
              </View>
            </View>
            <View>
              <TextInput
                style={[styles.InputField]}
                placeholder="Name & Designation"
                placeholderTextColor={'#000000'}
              />
            </View>
            <View style={[styles.analysisborderstyle]}>
              <Text style={[styles.analysisstyle]}>
                Further Assessment of Proposed Corrective Action
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginBottom: 20,
                marginTop: 20,
              }}>
              <View style={{flexBasis: '50%'}}>
                <CheckBox
                  checked={activeChecked}
                  onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                  <Text style={styles.checkboxstyle}> Accepted</Text>
                </CheckBox>
              </View>
              <View style={{flexBasis: '50%'}}>
                <CheckBox
                  checked={activeChecked}
                  onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                  <Text style={styles.checkboxstyle}> Not accepted</Text>
                </CheckBox>
              </View>
            </View>
            <View>
              <TextInput
                style={[styles.InputField]}
                placeholder="Name & Designation (Reported by)"
                placeholderTextColor={'#000000'}
              />
            </View>
            <View style={[styles.analysisborderstyle]}>
              <Text style={[styles.analysisstyle]}>
                Corrective Action Implemented & Completed
              </Text>
            </View>
            <View>
              <TextInput
                style={[styles.InputField]}
                placeholder="Name & Designation (Master/CE/DPA)"
                placeholderTextColor={'#000000'}
              />
            </View>
            <View style={[styles.analysisborderstyle]}>
              <Text style={[styles.analysisstyle]}>
                Verification of Implemented Corrective Action
              </Text>
            </View>
            <View style={{flexBasis: '50%', marginTop: 20, marginBottom: 10}}>
              <CheckBox
                checked={activeChecked}
                onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                <Text style={styles.checkboxstyle}> Closed</Text>
              </CheckBox>
            </View>
            <View>
              <TextInput
                style={[styles.InputField]}
                placeholder="Reported By"
                placeholderTextColor={'#000000'}
                marginBottom={20}
              />
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
  analysisstyle: {
    color: '#1E2E40',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 10,
  },
  selectBoxStyle: {
    flex: 1,
    flexDirection: 'row',

    flexBasis: '100%',
    marginRight: 2,
    fontWeight: 'bold',
  },

  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 15,
  },
  analysisborderstyle: {
    borderBottomColor: '#00000029',
    borderBottomWidth: 1,
    width: '80%',
  },

  checkboxstyle: {
    fontSize: 15,
    padding: 10,
    margin: 10,
  },
  checkboxsection: {
    paddingTop: 16,
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

  multilinestyle: {
    backgroundColor: '#fff',
    paddingTop: 20,
  },

  labelstyle: {
    fontSize: 16,

    paddingBottom: 20,
    fontWeight: '600',
  },
  backButtonStyle: {
    backgroundColor: '#fff',
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
export default NonConformity;
