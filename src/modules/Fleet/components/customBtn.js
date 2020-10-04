import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Buttons = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
     
    
  },
  buttonStyle: {
    backgroundColor: '#2e3192', 
    paddingTop:6,
    paddingBottom: 6,
    paddingRight: 25,
    paddingLeft: 25, 
    width: '100%',
    color: '#fff',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 3, height: 113},
    
  }
};