import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import LoginBg from '../images/loginbg.png';
import mainlogo from '../images/unitlogo.png';
import developedBy from '../images/akij-logo-sm.png';
import sidebarBG from '../images/sidebar.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage} from 'react-native-responsive-fontsize';
import PasswordInputText from 'react-native-hide-show-password-input';
import {Actions} from 'react-native-router-flux';
import {NetActivity} from './../components/NetActivity';
import {LoginValidation} from './../Util/Validation';
import axios from 'axios';
import {login} from '../service/auth/AuthService';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    error_username: '',
    error_password: '',
    error_server: '',

    errorMessage: '',
    successMessage: '',
  };
  componentDidMount() {
    // let disPointId=3499;
    // let intUnitId =4
    // axios.get(`http://masterdata.akij.net/api/DisPoint/GetDisPointsByQuery?query=intUnitId=${intUnitId} and intDisPointId=${disPointId}`)
    // .then(function (response) {
    //     // handle success
    //     console.log('string params',response);
    // })
    // .catch(function (error) {
    //     // handle error
    //     console.log(error);
    // })
  }
  changeUsername = inputValue => {
    this.setState({username: inputValue});
  };

  changePassword = inputValue => {
    this.setState({password: inputValue});
  };

  login = async () => {
    const username = this.state.username;
    const password = this.state.password;

    // check validations
    let validation = LoginValidation(username, password);
    this.setState({errorMessage: validation.errorMsg});
    if (validation.errorMsg == '') {
      // Check live server
      let responseData = await login(username, password);
      console.log('responseData', responseData);

      if (responseData.logged) {
        await AsyncStorage.setItem('is_logged_in', 'true');
        Actions.dashboard();
      } else {
        this.setState({errorMessage: 'Invalid username and password'});
        return false;
      }
    }
  };

  welcomeText = () => {
    // Welcome
  };
  showPassword = () => {
    alert();
  };
  render() {
    const {password} = this.state;

    return (
      <KeyboardAvoidingView>
        <ScrollView style={[styles.fullbg]}>
          <View>
            <View>
              <Image style={[styles.ApartImage]} source={LoginBg} />
            </View>

            <View>
              <Image style={[styles.mainlogo]} source={mainlogo} />
              <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            </View>

            <View style={styles.container}>
              {this.state.error_server.length > 0 && (
                <Text style={{color: 'red'}}>{this.state.error_server}</Text>
              )}

              <View style={{flex: 1, flexDirection: 'row', marginTop: -50}}>
                <View style={{flexBasis: '100%'}}>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="ফোন নম্বর"
                    placeholderTextColor={'#000000'}
                    value={this.state.username}
                    onChangeText={value => this.changeUsername(value)}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      this.secondTextInput.focus();
                    }}
                    keyboardType="numeric"
                  />

                  {this.state.error_username.length > 0 && (
                    <Text style={{color: 'red'}}>
                      {this.state.error_username}
                    </Text>
                  )}
                </View>
                <View style={[styles.iconstyle]}>
                  <Icon name="envelope" size={20} color="#000000" />
                </View>
              </View>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={[styles.paaswordField]}>
                  <PasswordInputText
                    ref={input => {
                      this.secondTextInput = input;
                    }}
                    returnKeyType={'go'}
                    onSubmitEditing={() => {
                      this.login();
                    }}
                    getRef={input => (this.input = input)}
                    secureTextEntry={true}
                    placeholder="পাসওয়ার্ড"
                    value={this.state.password}
                    placeholderTextColor={'#000000'}
                    iconSize={30}
                    onChangeText={value => this.changePassword(value)}
                  />
                  {this.state.error_password.length > 0 && (
                    <Text style={{color: 'red'}}>
                      {this.state.error_password}
                    </Text>
                  )}
                </View>
              </View>
              <View />
              <View>
                <LinearGradient
                  colors={['#D71920', '#D71920']}
                  style={styles.linearGradient}>
                  <TouchableOpacity onPress={this.login}>
                    <Text style={styles.buttonText}>
                      লগ ইন করুন &nbsp;{' '}
                      <Icon name="sign-in" size={23} color="#fff" />
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              {/* <View>
                                <Text style={[styles.forgetPin]}> Forget Password </Text>
                            </View> */}

              <View style={{flex: 1, flexDirection: 'row', marginTop: 35}}>
                <View style={{flexBasis: '20%'}}>
                  <Image source={sidebarBG} style={[styles.sidebarBG]} />
                </View>
                <View style={{flexBasis: '60%', marginLeft: 20}}>
                  <Text style={[styles.devlopby]}> Developed By </Text>
                </View>
                <View style={{flexBasis: '20%', marginTop: 10, marginLeft: 5}}>
                  <Image style={[styles.developImge]} source={developedBy} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: '#fff',
    height: '100%',
  },

  container: {
    width: '90%',
    marginLeft: 20,
  },

  ApartImage: {
    marginTop: -150,
    width: width,
    height: height / 1.6,
  },

  mainlogo: {
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -50,
  },

  iconstyle: {
    position: 'absolute',
    marginLeft: 15,
    marginTop: 17,
    paddingRight: 10,
    right: 0,
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
  paaswordField: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'popppins',
    borderRadius: 0,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },

  forget: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },

  errorMessage: {
    color: '#7181B3',
    textAlign: 'center',
    fontSize: 21,
    paddingVertical: 10,
  },
  linearGradient: {
    borderRadius: 5,
  },
  buttonText: {
    fontSize: RFPercentage(3),
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  forgetPin: {
    color: '#000000',
    textAlign: 'right',
    fontSize: RFPercentage(2.4),
    paddingTop: 20,
  },
  devlopby: {
    color: '#000000',
    textAlign: 'right',
    fontSize: RFPercentage(2),
    paddingVertical: 10,
  },
  developImge: {
    width: 39,
    height: 22,
  },
  sidebarBG: {
    position: 'absolute',
    bottom: -100,
    left: -30,
  },
});
