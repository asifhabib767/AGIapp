import React from 'react';
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

const Registration = (props) => {
  const [value, setValue] = React.useState('');

  return (
    <KeyboardAvoidingView style={[GlobalStyles.whiteBg]}>
      <ScrollView>
        <View>
          <View style={[styles.postionbox]}>
            <ImageBackground style={[styles.headerbg]} source={headerbg} />
            <View style={[styles.headerDetails]}>
              <Text style={[styles.headerTitle]}> Registration </Text>
              <Text style={[styles.headerSubTitle]}>
                {' '}
                Fill the form for registration{' '}
              </Text>
            </View>
          </View>

          <View style={[styles.container]}>
            <View style={{marginTop: 30}}>
              <Input
                style={[styles.logInputStyle]}
                size="large"
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Full Name"
              />
            </View>
            <View>
              <Input
                style={[styles.logInputStyle]}
                size="large"
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Email"
              />
            </View>
            <View>
              <Input
                style={[styles.logInputStyle]}
                size="large"
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Password"
              />
            </View>
            <View>
              <Input
                style={[styles.logInputStyle]}
                size="large"
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Confirm Password"
              />
            </View>
            <View>
              <Button style={styles.button} status='success'  size="large">
                Sign Up
              </Button>
            </View>
          </View>

          <View
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
                fontWeight: 'bold',
                color: '#878787',
                fontWeight: 'normal',
              }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('login')}>
              <Text
                style={{
                  fontSize: RFPercentage(2.4),
                  color: '#000000',
                  fontWeight: 'bold',
                }}>
                {'  '}
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.devlopby]}> Developed By AITL </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
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
    paddingVertical: 10,
  },

  logInputStyle: {
    backgroundColor: '#f1f1f1',
    marginBottom:10,
    borderRadius:10,
    borderColor:'#f0f0f0',
    borderStyle:'solid',
    borderWidth:2,
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
export default Registration;
