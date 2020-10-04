import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RFPercentage} from 'react-native-responsive-fontsize';
import GlobalStyles from '../../Master/styles/GlobalStyles';
import Attendance from '../images/attendance.png';
import Leave from '../images/leave.png';
import Movement from '../images/movement.png';
import Allowance from '../images/allowance.png';
import OverTime from '../images/overtime.png';
import CardUpdate from '../images/cardupdate.png';
import Bonus from '../images/bonus.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CardMenu from '../../Master/components/cards/CardMenu';
import Header from '../../Master/components/header/Header';
import {getAuthAction} from '../../User/actions/AuthAction';

const SalesMenuScreen = (props) => {
  const [value, setValue] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [checked, setChecked] = React.useState(false);
  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const intUserTypeID = userData.intUserTypeID;

  useEffect(() => {
    dispatch(getAuthAction());
  }, [props]);

  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
        <View>
          <Header title="Sales Management" />
          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              {intUserTypeID == 5 && (
                <>
                  <CardMenu
                    image={Bonus}
                    cardText="Customer Sales Order"
                    url={() => props.navigation.navigate('salesOrderCustomer')}
                    customStyle={styles.cardStyle}
                  />
                  <CardMenu
                    image={Attendance}
                    cardText="My Order"
                    url={() => props.navigation.navigate('myOrders')}
                    customStyle={styles.cardStyle}
                  />
                  <CardMenu
                    image={Attendance}
                    cardText="My Statement"
                    url={() => props.navigation.navigate('customerStatement')}
                    customStyle={styles.cardStyle}
                  />
                </>
              )}

              {intUserTypeID == 1 && (
                <>
                  <CardMenu
                    image={Bonus}
                    cardText="Sales order"
                    url={() => props.navigation.navigate('salesOrder')}
                    customStyle={styles.cardStyle}
                  />
                  <CardMenu
                    image={Attendance}
                    cardText="My Order"
                    url={() => props.navigation.navigate('myOrders')}
                    customStyle={styles.cardStyle}
                  />
                  <CardMenu
                    image={Leave}
                    cardText="Delivery Requisition"
                    url={() => props.navigation.navigate('deliveryRequisition')}
                    customStyle={styles.cardStyle}
                  />
                  <CardMenu
                    image={Movement}
                    url={() =>
                      props.navigation.navigate('deliveryRequisitionList')
                    }
                    cardText="Pending DO Qnt List"
                    customStyle={styles.cardStyle}
                  />
                  <CardMenu
                    image={Allowance}
                    url={() => props.navigation.navigate('scheduleRequisition')}
                    cardText="Scheduled Requistion"
                    customStyle={styles.cardStyle}
                  />
                  <CardMenu
                    image={OverTime}
                    url={() => props.navigation.navigate('requisitionSummery')}
                    cardText="Requisition Summery"
                    customStyle={styles.cardStyle}
                  />
                  <CardMenu
                    image={CardUpdate}
                    url={() => props.navigation.navigate('distributionDealer')}
                    cardText="Distribution/Dealer"
                    customStyle={styles.cardStyle}
                  />
                  <CardMenu
                    image={Bonus}
                    url={() => props.navigation.navigate('challanlist')}
                    cardText="Challan List"
                    customStyle={styles.cardStyle}
                  />
                </>
              )}
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
    marginTop: 50,
  },
  cardStyle: {
    marginBottom: 10,
    borderRadius: 5,
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
export default SalesMenuScreen;
