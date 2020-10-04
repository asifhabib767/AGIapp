import React, {useEffect} from 'react';
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
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import loadscreen from '../../User/images/loadscreenimg.png';
import roundSape from '../../User/images/roundsape.png';
import {Input, Button} from '@ui-kitten/components';
import GlobalStyles from '../../Master/styles/GlobalStyles';

const loadScreen = (props) => {
  const [value, setValue] = React.useState('');

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Home');
    }, 500);
  }, []);

  return (
    <KeyboardAvoidingView style={[styles.backgroundColor]}>
      <ScrollView>
        {/* <ImageBackground style={[styles.loadscreen]} source={loadscreen} /> */}

        <View styl={[styles.overContent]}>
          <View>
            <Image source={roundSape} style={[styles.roundSape]} />
            <Text style={[styles.itemName]}> iapp </Text>
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

  loadscreen: {
    marginTop: 0,
    width: width,
    height: height / 1,
    resizeMode: 'contain',
    position: 'absolute',
  },

  roundSape: {
    resizeMode: 'contain',
    width: '100%',
    marginTop: 100,
  },
  backgroundColor: {
    backgroundColor: '#1B2662',
    height: '100%',
  },

  itemName: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFPercentage(4),
    paddingVertical: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  devlopby: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginTop: 50,
  },
});
export default loadScreen;
