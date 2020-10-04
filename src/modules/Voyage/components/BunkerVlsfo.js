import { Input } from '@ui-kitten/components';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {submitVoyageVlsfoAction} from '../actions/VoyageVlsfoAction';

class BunkerVlsfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Inputs
      isLoading: false,

      // Previous Page Data
      intVoyageID: this.props.enginnerData.voyagePropsData.intID,
      intShipPositionID: this.props.enginnerData.positionSelected,
      intShipConditionTypeID: this.props.enginnerData.intShipConditionTypeId,
      dteCreatedAt: this.props.enginnerData.voyagePropsData.created_at,
      strRPM: this.props.enginnerData.strRPM,
      decEngineSpeed: this.props.enginnerData.decEngineSpeed,
      decSlip: this.props.enginnerData.decSlip,

      // This data
      decBunkerVlsfoCon: 0,
      decBunkerVlsfoAdj: 0,
      decBunkerVlsfoRob: 0,

      decBunkerLsmgoCon: 0,
      decBunkerLsmgoAdj: 0,
      decBunkerLsmgoRob: 0,

      decLubMeccCon: 0,
      decLubMeccAdj: 0,
      decLubMeccRob: 0,

      decLubMecylCon: 0,
      decLubMecylAdj: 0,
      decLubMecylRob: 0,
      strRemarks:'',
      decLubAeccCon: 0,
      decLubAeccAdj: 0,
      decLubAeccRob: 0,
    };
  }

  componentDidMount() {
    //
  }

  submitVlsfo = async () => {
    // Validate data
    if (this.state.decBunkerVlsfoCon === 0) {
      Alert.alert('Warning', 'Please give bunker VLSFO CON');
      return false;
    }
    if (this.state.decBunkerVlsfoAdj === 0) {
      Alert.alert('Warning', 'Please give bunker VLSFO RCVD/ADJ');
      return false;
    }
    if (this.state.decBunkerVlsfoRob === 0) {
      Alert.alert('Warning', 'Please give bunker VLSFO ROB');
      return false;
    }
    if (this.state.decBunkerLsmgoCon === 0) {
      Alert.alert('Warning', 'Please give bunker LSMGO CON');
      return false;
    }
    if (this.state.decBunkerLsmgoAdj === 0) {
      Alert.alert('Warning', 'Please give bunker LSMGO Adj');
      return false;
    }
    if (this.state.decBunkerLsmgoRob === 0) {
      Alert.alert('Warning', 'Please give bunker LSMGO ROB');
      return false;
    }

    if (this.state.decLubMeccCon === 0) {
      Alert.alert('Warning', 'Please give bunker Lub Oil MECC CON');
      return false;
    }
    if (this.state.decLubMeccAdj === 0) {
      Alert.alert('Warning', 'Please give bunker Lub Oil MECC Adj');
      return false;
    }
    if (this.state.decLubMeccRob === 0) {
      Alert.alert('Warning', 'Please give bunker Lub Oil MECC ROB');
      return false;
    }

    if (this.state.decLubMecylCon === 0) {
      Alert.alert('Warning', 'Please give bunker Lub Oil MECYL CON');
      return false;
    }
    if (this.state.decLubMecylAdj === 0) {
      Alert.alert('Warning', 'Please give bunker Lub Oil MECYL Adj');
      return false;
    }
    if (this.state.decLubMecylRob === 0) {
      Alert.alert('Warning', 'Please give bunker Lub Oil MECYL ROB');
      return false;
    }

    if (this.state.decLubAeccCon === 0) {
      Alert.alert('Warning', 'Please give bunker Lub Oil AECC CON');
      return false;
    }
    if (this.state.decLubAeccAdj === 0) {
      Alert.alert('Warning', 'Please give bunker Lub Oil AECC Adj');
      return false;
    }
    if (this.state.decLubAeccRob === 0) {
      Alert.alert('Warning', 'Please give bunker Lub Oil AECC ROB');
      return false;
    }
    this.setState({isLoading: true});

    // Submit Data
    let response = await submitVoyageVlsfoAction(this.state);
    console.log('Here is response :>> ', response);
    console.log('Here is status :>> ', response.status);
    if (response.status) {
      this.setState({isLoading: response.isLoading});
      Alert.alert('Success', response.message);
      this.props.navigation.navigate('voyageActivity');
    } else {
      Alert.alert('Warning', 'Something is wrong. Please try again.');
      this.setState({isLoading: false});
    }
  };

  render() {
    return (
      <>
        <View style={[styles.container]}>
          <View>
            <Text style={[styles.labelstylefour]}>Bunker VLSFO</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flexBasis: '31%', marginRight: 10}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="CON"
                    placeholderTextColor={'#000000'}
                    value={this.state.decBunkerVlsfoCon}
                    onChangeText={(value) =>
                      this.setState({decBunkerVlsfoCon: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View style={{flexBasis: '31%'}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="RCVD/ADJ"
                    placeholderTextColor={'#000000'}
                    value={this.state.decBunkerVlsfoAdj}
                    onChangeText={(value) =>
                      this.setState({decBunkerVlsfoAdj: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
            <View style={{flexBasis: '31%', marginLeft: 10}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="ROB"
                    placeholderTextColor={'#000000'}
                    value={this.state.decBunkerVlsfoRob}
                    onChangeText={(value) =>
                      this.setState({decBunkerVlsfoRob: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={[styles.labelstylefour]}>Bunker LSMGO</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flexBasis: '31%', marginRight: 10}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="CON"
                    placeholderTextColor={'#000000'}
                    value={this.state.decBunkerLsmgoCon}
                    onChangeText={(value) =>
                      this.setState({decBunkerLsmgoCon: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View style={{flexBasis: '31%'}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="RCVD/ADJ"
                    placeholderTextColor={'#000000'}
                    value={this.state.decBunkerLsmgoAdj}
                    onChangeText={(value) =>
                      this.setState({decBunkerLsmgoAdj: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
            <View style={{flexBasis: '31%', marginLeft: 10}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="ROB"
                    placeholderTextColor={'#000000'}
                    value={this.state.decBunkerLsmgoRob}
                    onChangeText={(value) =>
                      this.setState({decBunkerLsmgoRob: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={[styles.labelstylefour]}>Lub Oil MECC</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flexBasis: '31%', marginRight: 10}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="CON"
                    placeholderTextColor={'#000000'}
                    value={this.state.decLubMeccCon}
                    onChangeText={(value) =>
                      this.setState({decLubMeccCon: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View style={{flexBasis: '31%'}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="RCVD/ADJ"
                    placeholderTextColor={'#000000'}
                    value={this.state.decLubMeccAdj}
                    onChangeText={(value) =>
                      this.setState({decLubMeccAdj: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
            <View style={{flexBasis: '31%', marginLeft: 10}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="ROB"
                    placeholderTextColor={'#000000'}
                    value={this.state.decLubMeccRob}
                    onChangeText={(value) =>
                      this.setState({decLubMeccRob: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={[styles.labelstylefour]}>Lub Oil MECYL</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flexBasis: '31%', marginRight: 10}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="CON"
                    placeholderTextColor={'#000000'}
                    value={this.state.decLubMecylCon}
                    onChangeText={(value) =>
                      this.setState({decLubMecylCon: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View style={{flexBasis: '31%'}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="RCVD/ADJ"
                    placeholderTextColor={'#000000'}
                    value={this.state.decLubMecylAdj}
                    onChangeText={(value) =>
                      this.setState({decLubMecylAdj: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
            <View style={{flexBasis: '31%', marginLeft: 10}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="ROB"
                    placeholderTextColor={'#000000'}
                    value={this.state.decLubMecylRob}
                    onChangeText={(value) =>
                      this.setState({decLubMecylRob: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={[styles.labelstyleone]}>Lub Oil AECC</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flexBasis: '31%', marginRight: 10}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="CON"
                    placeholderTextColor={'#000000'}
                    value={this.state.decLubAeccCon}
                    onChangeText={(value) =>
                      this.setState({decLubAeccCon: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View style={{flexBasis: '31%'}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="RCVD/ADJ"
                    placeholderTextColor={'#000000'}
                    value={this.state.decLubAeccAdj}
                    onChangeText={(value) =>
                      this.setState({decLubAeccAdj: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
            <View style={{flexBasis: '31%', marginLeft: 10}}>
              <View style={[styles.inputBoxStyle]}>
                <View>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="ROB"
                    placeholderTextColor={'#000000'}
                    value={this.state.decLubAeccRob}
                    onChangeText={(value) =>
                      this.setState({decLubAeccRob: value})
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
          <View>
            <Text style={[styles.labelstyle]}> Remarks</Text>
          </View>

          <View>
            <View style={{flexBasis: '100%'}}>
              <Input
                multiline={true}
                textStyle={{minHeight: 64}}
                value={this.state.strRemarks}
                placeholder="Type"
                onChangeText={(value) =>
                this.setState({strRemarks: value})
                }
              />
            </View>
          </View>
        </View>
          {/* <View>
        <Text style={[styles.labelstyleThree]}>Engine and Machine</Text>
      </View> */}
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                flexBasis: '47%',
                marginLeft: 5,
                marginRight: 5,
              }}>
              <View style={{marginTop: 10}}>
                <TouchableOpacity
                // onPress={() =>
                //   this.props.navigation.navigate("voyageActivity")
                // }
                >
                  <Text style={styles.backButtonStyle}>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexBasis: '47%', marginLeft: 5}}>
              <View style={{marginTop: 10}}>
                {!this.state.isLoading && (
                  <TouchableOpacity onPress={() => this.submitVlsfo()}>
                    <Text style={[styles.buttonStyle]}> Add </Text>
                  </TouchableOpacity>
                )}
                {this.state.isLoading && (
                  <Text style={[styles.buttonStyle]}> Adding.... </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 10,
  },
  labelstylefour: {
    fontSize: 18,
    paddingTop: 15,
    paddingBottom: 5,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '34%',
  },
  inputBoxStyle: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
    backgroundColor: '#F7F9FC',
    borderRadius: 7,
    paddingLeft: 10,
  },
  InputField: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'popppins',
    borderRadius: 0,
    paddingLeft: 5,
    paddingVertical: 12,
    borderBottomColor: '#000',
    borderBottomWidth: 0,
  },
  labelstyleone: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 4,
    fontWeight: 'bold',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.6,
    width: '30%',
  },
  backButtonStyle: {
    backgroundColor: '#fff',
    color: '#213547',
    // fontSize: RFPercentage(2.5),
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    textTransform: 'uppercase',
    borderRadius: 10,
    borderColor: '#88959F',
    fontWeight: 'bold',
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 30,
  },
  buttonStyle: {
    backgroundColor: '#2A71E5',
    color: '#fff',

    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,

    borderRadius: 10,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#147AD6',
    marginTop: 10,
    marginBottom: 30,
  },
});
export default BunkerVlsfo;
