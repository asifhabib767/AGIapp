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
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import topbar from '../images/top-bar.png';
import {Button} from '@ui-kitten/components';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Supplier = (props) => {
  const [value, setValue] = React.useState('');
  const {navigation} = props;
  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
        <View>
          <View style={[styles.postionbox]}>
            <ImageBackground style={[styles.topbar]} source={topbar} />
            <View style={[styles.headerDetails]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexBasis: '65%'}}>
                  <Text style={[styles.headerTitle]}> Supplier </Text>
                </View>
                <View style={{flexBasis: '30%'}}>
                  <TouchableOpacity>
                    <Button
                      style={[styles.button]}
                      size="medium"
                      onPress={() => navigation.navigate('addSupplier')}>
                      ADD
                    </Button>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.container]}>
            <TouchableOpacity
              style={[GlobalStyles.boxShadow]}
              onPress={() => navigation.navigate('supplierDetails')}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '55%'}}>
                  <Text style={[styles.emplyeeTitle]}> Customer Name</Text>
                  <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                    <Text style={[styles.employeeid]}>Emplooyee ID</Text>
                    <Text style={[styles.employeeidguard]}>Guard</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexBasis: '25%',
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}>
                  <Button style={[styles.button]} size="small">
                    Active
                  </Button>
                </View>
                <View
                  style={{
                    flexBasis: 50,
                    marginTop: 25,
                    alignItems: 'flex-end',
                    backgroundColor: '#ccc',
                    alignItems: 'center',
                    paddingVertical: 5,
                  }}>
                  <Icon name="edit" size={23} color="#000" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[GlobalStyles.boxShadow]}
              onPress={() => navigation.navigate('supplierDetails')}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flexBasis: '55%'}}>
                  <Text style={[styles.emplyeeTitle]}> Customer Name</Text>
                  <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                    <Text style={[styles.employeeid]}>Emplooyee ID</Text>
                    <Text style={[styles.employeeidguard]}>Guard</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexBasis: '25%',
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}>
                  <Button style={[styles.button]} size="small">
                    Active
                  </Button>
                </View>
                <View
                  style={{
                    flexBasis: 50,
                    marginTop: 25,
                    alignItems: 'flex-end',
                    backgroundColor: '#ccc',
                    alignItems: 'center',
                    paddingVertical: 5,
                  }}>
                  <Icon name="edit" size={23} color="#000" />
                </View>
              </View>
            </TouchableOpacity>
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
    marginTop: 15,
  },

  topbar: {
    marginTop: -0,
    width: width,
    height: height / 4,
    resizeMode: 'contain',
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
    fontWeight: 'normal',
    paddingVertical: 10,
  },
  button: {
    borderRadius: 50,
    marginTop: 15,
  },
  emplyeeTitle: {
    color: '#202B35',
    fontSize: RFPercentage(2.7),
    fontWeight: 'bold',
    marginLeft: -5,
  },
  employeeid: {
    color: '#202B35',
    fontSize: RFPercentage(2.5),
    marginRight: 20,
  },
  employeeidguard: {
    color: '#202B35',
    fontSize: RFPercentage(2.5),
  },
  icon: {
    width: 32,
    height: 32,
  },
});
export default Supplier;
