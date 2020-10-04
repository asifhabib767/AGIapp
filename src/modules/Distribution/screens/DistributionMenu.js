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
import {
  Datepicker,
  Layout,
  Toggle,
  Button,
  Input,
  Card,
} from '@ui-kitten/components';
import GlobalStyles from '../../Master/styles/GlobalStyles';
import gateIN from '../images/gateIN.png';
import gateOUT from '../images/gateOUT.png';
import tripAssign from '../images/tripAssign.png';
import tripOut from '../images/tripOut.png';
import unload from '../images/unload.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CardMenu from '../../Master/components/cards/CardMenu';
import Header from '../../Master/components/header/Header';

const DistributionMenu = (props) => {
  const [value, setValue] = React.useState('');

  const [date, setDate] = React.useState(new Date());

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
        <View>
          <Header title="Distribution" />
          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              <CardMenu
                image={tripOut}
                cardText="Shipment Planning"
                url={() => props.navigation.navigate('shipmentPlanning')}
                customStyle={styles.cardStyle}
              />

              <CardMenu
                image={gateIN}
                cardText="Gate In"
                url={() => props.navigation.navigate('getIn')}
                customStyle={styles.cardStyle}
              />
              {/* <CardMenu
                image={gateOUT}
                cardText="Get Out"
                url={() => props.navigation.navigate('getOut')}
                customStyle={styles.cardStyle}
              /> */}
              <CardMenu
                image={tripAssign}
                cardText="Trip Assign"
                url={() => props.navigation.navigate('tripAssign')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={tripAssign}
                cardText="Packer Assign"
                url={() => props.navigation.navigate('packerAssign')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={tripOut}
                cardText="Trip List"
                url={() => props.navigation.navigate('tripList')}
                customStyle={styles.cardStyle}
              />

              <CardMenu
                image={unload}
                cardText="Unload Vehicle"
                url={() => props.navigation.navigate('unloadVehicle')}
                customStyle={styles.cardStyle}
              />

              <CardMenu
                image={tripOut}
                cardText="Load Vehicle"
                url={() => props.navigation.navigate('loadedVehicle')}
                customStyle={styles.cardStyle}
              />

              <CardMenu
                image={gateOUT}
                cardText="Gate Out"
                url={() => props.navigation.navigate('tripOut')}
                customStyle={styles.cardStyle}
              />
            </View>
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
    marginTop: 15,
  },
  cardStyle: {
    marginBottom: 10,
  },
  containers: {
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },

  cardSize: {
    width: wp('50%'),
    height: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 35,
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
  logInputStyle: {
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 2,
    height: 55,
  },
});
export default DistributionMenu;
