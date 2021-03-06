import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import gateIN from '../../images/tripOut.png';
import gateOUT from '../../images/requisition.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CardMenu from '../../../Master/components/cards/CardMenu';
import Header from '../../../Master/components/header/Header';

const ShipmentPlanningMenu = (props) => {
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
          <Header title="Shipment Planning" />
          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              <CardMenu
                image={gateIN}
                cardText="Transport Assign"
                url={() => props.navigation.navigate('transportSchedule')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={gateOUT}
                cardText="Requisition Planning"
                url={() => props.navigation.navigate('requisitionPlanning')}
                customStyle={styles.cardStyle}
              />

              <CardMenu
                image={gateOUT}
                cardText="Shipment Assign"
                url={() => props.navigation.navigate('shipmentAssign')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={gateOUT}
                cardText="Supplier Territory Assign"
                url={() => props.navigation.navigate('supplierTerritoryAssign')}
                customStyle={styles.cardStyle}
              />

              {/* <CardMenu
                image={gateOUT}
                cardText="Shipment Requests"
                url={() => props.navigation.navigate('shipmentRequest')}
                customStyle={styles.cardStyle}
              /> */}
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
export default ShipmentPlanningMenu;
