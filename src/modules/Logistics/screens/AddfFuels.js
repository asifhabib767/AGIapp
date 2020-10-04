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
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class AddfFuels extends Component {
  state = {
    providerType: '',
    VehicleCapacity: '',
    SelectVehicle: '',
    RequisitionNo: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      leavelist: '',
    };
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.hideDateTimePicker();
  };
  async componentDidMount() {
    let leavelist = await getLeaveList();
    console.log(leavelist);

    this.setState({
      leavelist,
    });
  }

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <Text style={[styles.headingOne]}> জ্বালানি </Text>

          <View style={[styles.selectBox]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={[styles.selectBoxStyle]}>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                  <Text style={[styles.inputLebel]}>
                    {' '}
                    তারিখ <Text style={{color: '#D71920'}}>*</Text>{' '}
                  </Text>
                  <Text
                    title="Show DatePicker"
                    onPress={this.showDateTimePicker}
                  />
                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    datePickerModeAndroid={'spinner'}
                    mode={'date'}
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.selectBoxStyle]}>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                  <Text style={[styles.inputLebel]}>
                    {' '}
                    সময় <Text style={{color: '#D71920'}}>*</Text>{' '}
                  </Text>
                  <Text
                    title="Show DatePicker"
                    onPress={this.showDateTimePicker}
                  />
                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    datePickerModeAndroid={'spinner'}
                    mode={'date'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text style={[styles.inputLabel]}>
                {' '}
                জ্বালানী পরিমাণ <Text style={{color: '#D71920'}}>*</Text>
              </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="0.00"
                placeholderTextColor={'#000000'}
              />
            </View>

            <View>
              <Text style={[styles.inputLabel]}>
                {' '}
                দূরত্বমাপণী মিটার <Text style={{color: '#D71920'}}>*</Text>
              </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="সর্বশেষ পরিমাপ ৭২ ,০০০"
                placeholderTextColor={'#000000'}
              />
            </View>

            <View>
              <Text style={[styles.inputLabel]}>
                {' '}
                চালান নম্বর <Text style={{color: '#D71920'}}>*</Text>
              </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="চালান নম্বর দিন"
                placeholderTextColor={'#000000'}
              />
            </View>

            <View style={[styles.selects]}>
              <Text style={[styles.inputLabel]}>
                {' '}
                জ্বালানী টাইপ <Text style={{color: '#D71920'}}>*</Text>{' '}
              </Text>
              <Picker
                selectedValue={this.state.providerType}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({providerType: itemValue})
                }>
                <Picker.Item
                  label="পেট্রল অক্টেন গ্যাস"
                  value="পেট্রল অক্টেন গ্যাস"
                />
                <Picker.Item
                  label="পেট্রল অক্টেন গ্যাস"
                  value="পেট্রল অক্টেন গ্যাস"
                />
                <Picker.Item
                  label="পেট্রল অক্টেন গ্যাস"
                  value="পেট্রল অক্টেন গ্যাস"
                />
              </Picker>
            </View>
          </View>

          <View style={[styles.selectBox]}>
            <Text style={[styles.headingOne]}>
              {' '}
              ডকুমেন্ট যুক্ত করুন <Text style={{color: '#D71920'}}>*</Text>{' '}
            </Text>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
              <View style={{flexBasis: '70%'}}>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="Select file"
                  placeholderTextColor={'#000000'}
                />
              </View>
              <View style={{flexBasis: '30%'}}>
                <LinearGradient
                  colors={['#48C1B9', '#11D6A0']}
                  style={styles.linearGradient}>
                  <TouchableOpacity onPress={() => Actions.AddfFuels()}>
                    <Text style={styles.buttonText}>
                      Add&nbsp;{''}
                      <Icon name="plus" size={18} color="#fff" />
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>

          <View style={[styles.selectBox]}>
            <Text style={[styles.headingOne]}>
              {' '}
              মন্তব্য <Text style={{color: '#D71920'}}>*</Text>{' '}
            </Text>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
              <View style={{flexBasis: '100%'}}>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="মন্তব্য"
                  placeholderTextColor={'#000000'}
                />
              </View>
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
              <TouchableOpacity>
                <Text style={styles.buttonText}>
                  জ্বালানী এন্ট্রি সংরক্ষণ করুন
                </Text>
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
    marginTop: 10,
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
    paddingTop: 10,
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
    borderRadius: 50,
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
  selectBoxStyle: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    flexBasis: '48%',
    marginRight: 10,
  },
});
