import React, {useState} from 'react';
import {
  Text,
  TopNavigation,
  TopNavigationAction,
  Divider,
} from '@ui-kitten/components';
import {View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

function TopHeaderBar(props) {
  const BackIcon = (props) => (
    <Icon {...props} name="long-arrow-left" size={30} />
  );
  const BackAction = () => <TopNavigationAction icon={BackIcon} />;
  const TopNavigationStyling = () => (
    <TopNavigation
      title={(evaProps) => <Text {...evaProps}>Title</Text>}
      subtitle={(evaProps) => <Text {...evaProps}>Subtitle</Text>}
    />
  );

  return (
    <View>
      <TopNavigation
        accessoryLeft={BackAction}

        // title={Actions.currentScene}
      />
      <Divider />
    </View>
  );
}
export default TopHeaderBar;
