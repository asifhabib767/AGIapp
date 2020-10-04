import React from 'react';
import PropTypes from 'prop-types';

import {View, Image, StyleSheet} from 'react-native';
import {Card, Text} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CardMenu = (props) => {
  return (
    <View style={[styles.menu]}>
      <TouchableOpacity onPress={props.url}>
        <Card>
          <View style={[styles.cardSize, props.customStyle]}>
            <Image source={props.image} style={{resizeMode: 'contain'}} />
          </View>
          <Text style={styles.cardText}>{props.cardText}</Text>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

CardMenu.propTypes = {
  customStyle: PropTypes.object,
  cardText: PropTypes.string,
  url: PropTypes.func,
  image: PropTypes.number,
};

const styles = StyleSheet.create({
  menu: {
    marginBottom: 10,
  },

  cardSize: {
    width: wp('30%'),
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardText: {
    fontWeight: 'bold',
    width: wp('30%'),
    height: hp('6%'),
    fontSize: 15,
    textAlign: 'center',
  },
});

export default CardMenu;
