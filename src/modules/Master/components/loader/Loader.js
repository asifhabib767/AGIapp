import React from 'react';
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
  BackHandler,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Spinner} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Loader = () => {
  return (
    <View style={styles.controlContainer}>
      <Spinner status="primary" size="giant" />
    </View>
  );
};

const styles = StyleSheet.create({
  controlContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('50%'),
  },
});
export default Loader;
