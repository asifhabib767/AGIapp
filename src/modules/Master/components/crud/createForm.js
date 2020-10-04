import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useSelector, useDispatch} from 'react-redux';
import {inputHandling} from './../../../../store/actions/createFormAction';

const createForm = () => {
  const dispatch = useDispatch();
  const inputData = useSelector((state) => state.FormInput.inputData);

  const handleInputChange = (inputName, inputValue) => {
    dispatch(inputHandling(inputName, inputValue));
  };

  const handleSubmit = () => {};

  return (
    <View>
      <View>
        <Text style={styles.inputLebel}> Name </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="name"
            value={inputData.value}
            name="name"
            style={[styles.input]}
            onChangeText={(value) => handleInputChange('name', value)}
          />
        </View>
      </View>
      <View style={{paddingVertical: 10}}>
        <Text style={[styles.inputLebel]}> Father Name </Text>
        <TextInput
          placeholderTextColor="name"
          value={inputData.value}
          name="fathername"
          style={[styles.input]}
          onChangeText={(value) => handleInputChange('fathername', value)}
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.buttonStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#1544B3',
    color: '#fff',
    fontSize: RFPercentage(3),
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 35,
    textTransform: 'uppercase',
  },
  inputLebel: {
    fontSize: RFPercentage(2.5),
    textAlign: 'left',
    color: '#000',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    paddingVertical: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FFFFFF',
  },
});
export default createForm;
