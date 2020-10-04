import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import driverphoto from '../../images/driverphoto.png';
import LinearGradient from 'react-native-linear-gradient';
import {
  postDriverAdd,
  driverUpdate,
} from '../../actions/TransportProvider/ShipmentRequestAction';
import {DriverValidation} from '../../../Master/Util/Validation';
export default class DriverEdit extends Component {
  // state={
  //     username:'',
  // }

  state = {
    drivername: '',
    mobile: '',
    driverlicense: '',
    strDriverImagePath: '',
    strLicenceImagePath: '',
    intDriverId: '',
    // isUploading: false,
    // isImageUploaded: false,
    // images: "",
    // uploadData: "",
    // avatarSource: null,
    errorMessage: {},
    // isLoading: false,
    // refreshing: false,
    // initialPosition: "unknown",

    // fileHeight: 1280,
    // fileWidth: 960
  };

  componentDidMount() {
    let propsData = this.props.route.params;

    console.log('propsData', propsData);

    this.setState({
      intDriverId: propsData.intDriverId,
      intProviderIdb: propsData.intProviderIdb,
      intServiceProviderCOAID: propsData.intServiceProviderCOAID,
      serviceProviderName: propsData.serviceProviderName,
      drivername: propsData.strDriverName,
      mobile: propsData.strPhoneNo,
      driverlicense: propsData.strDrivingLicence,
      intDriverId: propsData.intDriverId,
    });
  }

  drivername = (value) => {
    this.setState({drivername: value});
  };

  mobile = (value) => {
    this.setState({mobile: value});
  };

  driverlicense = (value) => {
    this.setState({driverlicense: value});
  };

  update = async () => {
    const {mobile, drivername, driverlicense, intDriverId} = this.state;
    let validation = await DriverValidation(mobile, drivername, driverlicense);

    if (validation && validation.length > 0) {
      //Alert.alert('Error', 'Please fill all the data !');
      this.setState({errorMessage: validation}, () => {
        Alert.alert('Warning', this.state.errorMessage);
      });
      // this.setState({ isLoading: false });
    } else {
      const strDriverImagePath = '12';
      const strLicenceImagePath = '59';
      let driveraddresponse = await driverUpdate(
        mobile,
        drivername,
        driverlicense,
        strDriverImagePath,
        strLicenceImagePath,
        intDriverId,
      );
      console.log('driveraddresponse', driveraddresponse);
      if (driveraddresponse.status) {
        Alert.alert('চালক  তথ্য আপডেট হয়েছে');
        this.props.navigation.navigate('driverList');
      } else {
        Alert.alert('চালক  তথ্য আপডেট হয়নি');
      }
    }
  };

  render() {
    console.log('this.state', this.state);
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.selectBox]}>
            <View>
              <Text style={[styles.headTitle]}>ড্রাইভার নিবন্ধন</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 15}}>
              <View style={{flexBasis: 80, marginRight: 15}}>
                <Image source={driverphoto} style={[styles.photo]} />
              </View>

              <View style={{flexBasis: '70%'}}>
                <Text style={[styles.inputLable]}> নাম </Text>
                <TextInput
                  style={[styles.InputField]}
                  placeholder="নাম লিখুন "
                  placeholderTextColor={'#000000'}
                  onChangeText={(value) => this.drivername(value)}
                  value={this.state.drivername}
                />
              </View>
            </View>

            <View>
              <Text style={[styles.inputLable]}> ফোন নাম্বার </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="০১xxxxxxxxx"
                placeholderTextColor={'#000000'}
                keyboardType={'numeric'}
                onChangeText={(value) => this.mobile(value)}
                value={this.state.mobile}
              />
            </View>

            <View>
              <Text style={[styles.inputLable]}> লাইসেন্স নং </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="XXXX XXXXX XXXX XXXXXX"
                placeholderTextColor={'#000000'}
                onChangeText={(value) => this.driverlicense(value)}
                value={this.state.driverlicense}
              />
            </View>

            {/* <View>
              <Text style={[styles.inputLable]}> Driving License Upload </Text>
            </View> */}
          </View>

          <View>
            <LinearGradient
              colors={['#4E51C9', '#4E51C9']}
              style={styles.linearGradient}>
              <TouchableOpacity onPress={this.update}>
                <Text style={styles.buttonText}> এন্ট্রি শেষ করুন</Text>
              </TouchableOpacity>
            </LinearGradient>
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
  selectBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    marginBottom: 5,
    padding: 10,
    paddingLeft: 10,
    marginTop: 5,
    justifyContent: 'center',
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
  },
  headTitle: {
    fontSize: RFPercentage(3.5),
    color: '#000000',
    fontWeight: 'bold',
  },
  photo: {
    width: 75,
    height: 75,
  },
  inputLable: {
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
    borderBottomColor: '#000',
    borderBottomWidth: 0.6,
    paddingVertical: 10,
    marginBottom: 15,
  },
  linearGradient: {
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: RFPercentage(3),
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
