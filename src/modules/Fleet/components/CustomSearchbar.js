import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SearchBar from 'react-native-search-bar';

const CustomSearchbar = ({ onChangeText, children, customStyles, placeHolderText="Search" }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <View style={[styles.searchBarArea, customStyles]}>  
        <SearchBar
            // ref="searchBar"
            placeholder={placeHolderText}
            onChangeText={onChangeText}
        />
    </View> 
  );
};

export default CustomSearchbar;

const styles = {
    searchBarArea: {
        flexBasis:'80%', 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 20, 
        paddingLeft: 20, 
        paddingRight: 20, 
        height: 42
    }
};