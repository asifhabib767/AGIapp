import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Card, Text} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import topbar from '../../images/top-bar.png';
import mainLogoImage from '../../../Master/images/logo-main.png';

const Header = (props) => {
  const [isDashboard, setisDashboard] = useState(false);

  useEffect(() => {
    console.log('props', props);
    const isDashboard =
      typeof props.isDashboard != 'undefined' ? props.isDashboard : false;
    setisDashboard(isDashboard);
  }, [setisDashboard]);

  return (
    <View style={[styles.postionbox, {height: isDashboard ? 90 : 105}]}>
      {!props.button && (
        <ImageBackground style={[styles.topbar]} source={topbar} />
      )}

      {isDashboard && (
        <View style={[styles.headerDetails]}>
          <Image
            source={mainLogoImage}
            style={{width: 50, height: 50, resizeMode: 'contain'}}
          />
        </View>
      )}
      {!isDashboard && (
        <View style={[styles.headerDetails]}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexBasis: '70%'}}>
              <Text
                style={[
                  styles.headerTitle,
                  {
                    fontSize: isDashboard ? RFPercentage(3) : RFPercentage(3.5),
                  },
                ]}>
                {' '}
                {props.title}{' '}
              </Text>
              <Text style={[styles.headerSubTitle]}> {props.subtitle} </Text>
              {/* {props.subtitle && (
                <Text style={[styles.headerSubTitle]}> {props.subtitle} </Text>
              )} */}
            </View>

            <View style={{flexBasis: '30%'}}>
              {props.button && props.button}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  postionbox: {
    position: 'relative',
    backgroundColor: '#1B2662',
    height: 105,
  },
  headerDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  topbar: {
    marginTop: -0,
    width: width,
    height: height / 4,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#fff',
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    // textTransform: 'uppercase',
    paddingVertical: 10,
    paddingLeft: 0,
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: RFPercentage(2),
  },
  iconbg: {
    backgroundColor: '#4E72B2',
    width: 100,
    height: 100,
    borderBottomLeftRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  iconstyle: {
    marginTop: -20,
    marginLeft: 20,
  },
});

export default Header;
