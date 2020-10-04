import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  RefreshControl,
  BackHandler,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Picker} from '@react-native-community/picker';
import Checkbox from 'react-native-modest-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

export default class TransportSchedule extends Component {
  state = {
    providerType: '',
    VehicleCapacity: '',
    SelectVehicle: '',
    RequisitionNo: '',
  };

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.selectBox]}>
            <Text style={[styles.headingOne]}> Shipment Planning </Text>

            <View>
              <Text style={[styles.inputLabel]}> Schedule time </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="02 Dec 2019 00:00 PM"
                placeholderTextColor={'#000000'}
              />
            </View>

            <View style={[styles.selects]}>
              <Text style={[styles.inputLabel]}> Provider Type </Text>
              <Picker
                selectedValue={this.state.providerType}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({providerType: itemValue})
                }>
                <Picker.Item label="Select" value="Select" />
                <Picker.Item label="1" value="2" />
                <Picker.Item label="1" value="2" />
              </Picker>
            </View>

            <View style={[styles.selects]}>
              <Text style={[styles.inputLabel]}> Vehicle Capacity </Text>
              <Picker
                selectedValue={this.state.VehicleCapacity}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({VehicleCapacity: itemValue})
                }>
                <Picker.Item label="Select" value="Select" />
                <Picker.Item label="1" value="2" />
                <Picker.Item label="1" value="2" />
              </Picker>
            </View>

            <View style={{flex: 1, flexDirection: 'row', marginVertical: 20}}>
              <View style={{flexBasis: '100%'}}>
                <Checkbox
                  label="Text for checkbox"
                  onChange={(checked) => console.log('Checked!')}
                  style={[styles.inputLabel]}
                />
              </View>
            </View>

            <View style={[styles.selects]}>
              <Text style={[styles.inputLabel]}> Select Vehicle </Text>
              <Picker
                selectedValue={this.state.SelectVehicle}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({SelectVehicle: itemValue})
                }>
                <Picker.Item
                  label="Dh. Met. Sha 11-0755 [Heavy Truck]"
                  value="Dh. Met. Sha 11-0755 [Heavy Truck]"
                />
                <Picker.Item
                  label="Dh. Met. Sha 11-0755 [Heavy Truck]"
                  value="Dh. Met. Sha 11-0755 [Heavy Truck]"
                />
                <Picker.Item
                  label="Dh. Met. Sha 11-0755 [Heavy Truck]"
                  value="Dh. Met. Sha 11-0755 [Heavy Truck]"
                />
              </Picker>
            </View>

            <View style={[styles.selects]}>
              <Text style={[styles.inputLabel]}> Driver </Text>
              <Picker
                selectedValue={this.state.Driver}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({Driver: itemValue})
                }>
                <Picker.Item
                  label="Rahman, Rahim (01741568975)"
                  value="Rahman, Rahim (01741568975)"
                />
                <Picker.Item
                  label="Rahman, Rahim (01741568975)"
                  value="Rahman, Rahim (01741568975)"
                />
                <Picker.Item
                  label="Rahman, Rahim (01741568975)"
                  value="Rahman, Rahim (01741568975)"
                />
                <Picker.Item
                  label="Rahman, Rahim (01741568975)"
                  value="Rahman, Rahim (01741568975)"
                />
              </Picker>
            </View>

            <View style={{paddingTop: 10}}>
              <Text style={[styles.inputLabel]}> Last Destination </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="Gabtoli, Dhaka"
                placeholderTextColor={'#000000'}
              />
            </View>
          </View>

          <View style={[styles.requestBox]}>
            <View style={{flexBasis: '80%'}}>
              <View style={[styles.selects]}>
                <Text style={[styles.inputLabel]}> Requisition No. </Text>
                <Picker
                  selectedValue={this.state.RequisitionNo}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({RequisitionNo: itemValue})
                  }>
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="1" value="1" />
                </Picker>
              </View>
            </View>
            <View
              style={{flexBasis: '20%', marginVertical: 20, marginLeft: 15}}>
              <Icon style={[styles.reqNo]} name="plus" size={23} color="#fff" />
            </View>
          </View>

          <View style={[styles.selectBox]}>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
              <View style={{flexBasis: '50%'}}>
                <Text style={[styles.inputLebel]}> Order No.</Text>
              </View>
              <View style={{flexBasis: '50%'}}>
                <Text style={[styles.inputLebel]}> Request Quantity </Text>
              </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flexBasis: '50%'}}>
                <Text style={[styles.inputOutput]}>
                  {' '}
                  #564789 [Enamul Store][Dhaka]{' '}
                </Text>
              </View>
              <View style={{flexBasis: '40%'}}>
                <Text style={[styles.inputOutput]}> 500 </Text>
              </View>
              <View style={{flexBasis: '10%'}}>
                <Text style={{textAlign: 'center', paddingVertical: 10}}>
                  {' '}
                  <Icon color={'#EC5757'} size={26} name="close" />{' '}
                </Text>
              </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
              <View style={{flexBasis: '50%'}}>
                <Text style={[styles.inputOutput]}>
                  {' '}
                  #564789 [Enamul Store][Dhaka]{' '}
                </Text>
              </View>
              <View style={{flexBasis: '40%'}}>
                <Text style={[styles.inputOutput]}> 500 </Text>
              </View>
              <View style={{flexBasis: '10%'}}>
                <Text style={{textAlign: 'center', paddingVertical: 10}}>
                  {' '}
                  <Icon color={'#EC5757'} size={26} name="close" />{' '}
                </Text>
              </View>
            </View>

            <View style={[styles.orderBox]}>
              <Text style={[styles.totalBags]}>
                {' '}
                Total Quantity{' '}
                <Text style={{fontWeight: 'bold'}}> 500 bags </Text>{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginTop: 5,
            }}>
            <LinearGradient
              colors={['#4E51C9', '#4E51C9']}
              style={styles.linearGradient}>
              <TouchableOpacity onPress={() => Actions.TransportSchedule()}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View>
            <Text></Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: '#F2F8FF',
    height: '100%',
  },

  container: {
    width: '96%',
    margin: 8,
  },

  headingOne: {
    fontSize: RFPercentage(3.5),
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    paddingVertical: 10,
  },
  selectBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    paddingLeft: 10,
    marginTop: 30,
    justifyContent: 'center',
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
  },

  inputLabel: {
    fontSize: RFPercentage(2.5),
    color: '#000000',
    fontWeight: 'bold',
  },
  InputField: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'popppins',
    borderRadius: 0,
    paddingLeft: 5,
    paddingVertical: 12,
    borderBottomColor: '#000',
    borderBottomWidth: 0.6,
  },
  selects: {
    paddingVertical: 12,
    borderBottomColor: '#000',
    borderBottomWidth: 0.6,
  },
  inputOutput: {
    fontSize: RFPercentage(2.5),
    color: '#231F20',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  inputLebel: {
    fontSize: RFPercentage(2.2),
    color: '#000000',
    fontWeight: 'bold',
  },
  totalBags: {
    fontSize: RFPercentage(3),
    color: '#000000',
  },
  orderBox: {
    borderTopColor: '#707070',
    borderTopWidth: 0.6,
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    width: '100%',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: RFPercentage(3),
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  requestBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    paddingLeft: 10,
    marginTop: 30,
    justifyContent: 'center',
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
    flex: 1,
    flexDirection: 'row',
  },
  reqNo: {
    backgroundColor: '#08C48F',
    width: 55,
    height: 55,
    color: '#fff',
    borderRadius: 100,
    lineHeight: 55,
    textAlign: 'center',
  },
});
