import React, {useEffect, useRef} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import headerbg from '../../User/images/headerbg.png';
import {Input, Button} from '@ui-kitten/components';
import GlobalStyles from '../../Master/styles/GlobalStyles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {
  inputAddHandling,
  loginAction,
  emptyMessage,
  getAuthAction,
} from '../actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import AppVersion from '../../Master/components/help/AppVersion';

const Login = (props) => {
  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const refPasswordInput = useRef(null);

  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);
  // const authState = useSelector((state) => state.auth);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const inputData = useSelector((state) => state.login.inputData);
  const handleInputChange = (inputName, inputValue) => {
    dispatch(inputAddHandling(inputName, inputValue));
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const unsubscribe = dispatch(loginAction(inputData));
  //     // Do something when the screen is focused
  //     return () => {
  //       alert('Screen was unfocused');
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //       return unsubscribe;
  //     };
  //   }, []),
  // );

  const handleSubmit = () => {
    dispatch(loginAction(inputData));
  };

  useEffect(() => {
    // dispatch(getAuthAction());
    // if (isLoggedIn) {
    //   console.log('authState', authState);
    //   alert('logged user');
    //   // props.navigation.navigate('Home');
    // }
    if (loginState.status && loginState.isLogin) {
      AsyncStorage.setItem('userData', JSON.stringify(loginState.data));
      AsyncStorage.setItem('tokenData', JSON.stringify(loginState.tokenData));
      AsyncStorage.setItem('is_log_in', JSON.stringify(true));
      props.navigation.navigate('Home');
    }
  }, [loginState]);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const AlertIcon = (props) => (
    <MaterialCommunityIcons {...props} name="alert-circle-outline" />
  );

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <MaterialCommunityIcons
        {...props}
        size={22}
        color={'#878787'}
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView style={[GlobalStyles.whiteBg, styles.fullHeight]}>
      <ScrollView>
        <View>
          <View style={[styles.postionbox]}>
            <ImageBackground
              style={[styles.headerbg]}
              source={headerbg}
              resizeMode="stretch"
            />
            <View style={[styles.headerDetails]}>
              <Text
                style={[styles.headerTitle]}
                onPress={() => props.navigation.navigate('login')}>
                Sign In
              </Text>
              <Text style={[styles.headerSubTitle]}>
                Please enter your credentials to proceed
              </Text>
            </View>
          </View>

          <View style={[styles.container]}>
            <View>
              {loginState.status && loginState.message.length > 0 && (
                <Text style={[styles.loginMessage]}>{loginState.message}</Text>
              )}

              {!loginState.status && loginState.message.length > 0 && (
                <Text style={[styles.loginErrorMessage]}>
                  {loginState.message}
                </Text>
              )}
            </View>
            <View>
              <Input
                style={[styles.logInputStyle]}
                size="large"
                name="username"
                onChangeText={(value) => handleInputChange('username', value)}
                value={inputData.username}
                placeholder="Type Username Or Email"
                returnKeyType={'next'}
                onSubmitEditing={() => refPasswordInput.current.focus()}
              />
            </View>
            <View>
              <Input
                style={[styles.logInputStyle]}
                size="large"
                value={inputData.password}
                name="password"
                placeholder="Type Password"
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                ref={refPasswordInput}
                returnKeyType={'go'}
                onChangeText={(value) => handleInputChange('password', value)}
                onSubmitEditing={() => handleSubmit()}
              />
            </View>
            <View>
              {!loginState.isLoading && (
                <Button
                  style={styles.button}
                  size="large"
                  onPress={() => handleSubmit()}>
                  Log In
                </Button>
              )}

              {loginState.isLoading && loginState.message.length === 0 && (
                <Button style={styles.button} size="large">
                  Logging in...
                </Button>
              )}
            </View>
            <Text style={styles.forget}> Forgot password </Text>
          </View>
          {/* <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <Text
              style={{
                fontSize: RFPercentage(2.4),
                color: '#878787',
                fontWeight: 'normal',
              }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('signup')}>
              <Text
                style={{
                  fontSize: RFPercentage(2.4),
                  color: '#000000',
                  fontWeight: 'bold',
                }}>
                {'  '}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={{flex: 1, marginTop: 50}}>
            <Text style={[styles.devlopby]}>
              Developed By AITL <AppVersion />
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  fullHeight: {
    height: height,
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 45,
  },
  loginMessage: {
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6ED899',
    fontSize: RFPercentage(2.6),
    color: '#44CA7B',
  },
  loginErrorMessage: {
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F47E43',
    fontSize: RFPercentage(2.6),
    color: 'red',
  },
  headerbg: {
    marginTop: -40,
    width: width,
    height: height / 2.5,
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
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingVertical: 10,
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: RFPercentage(2),
  },
  headTitle: {
    color: '#000',
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingBottom: 20,
    marginTop: 10,
  },

  logInputStyle: {
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
    fontSize: RFPercentage(2.5),
  },

  forget: {
    color: '#1E2E40',
    fontSize: RFPercentage(2.5),
    textAlign: 'right',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },

  button: {
    borderRadius: 50,
    marginTop: 15,
  },

  devlopby: {
    color: '#1B2662',
    textAlign: 'center',
    fontSize: RFPercentage(2.5),
    paddingVertical: 30,
    fontWeight: 'bold',
  },
});
export default Login;
