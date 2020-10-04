import React from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';

// https://www.reactnativeschool.com/how-to-upload-images-in-a-react-native-app

export default class ImageUpload extends React.Component {
  state = {
    photo: null,
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  render() {
    const {photo} = this.state;
    return (
      <View>
        {photo && (
          <Image source={{uri: photo.uri}} style={{width: 300, height: 300}} />
        )}
        <Button title="Add attachment" onPress={this.handleChoosePhoto} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Button: {},
});
