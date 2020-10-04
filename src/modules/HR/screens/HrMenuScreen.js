import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import GlobalStyles from '../../Master/styles/GlobalStyles';
import Attendance from '../images/attendance.png';
import Leave from '../images/leave.png';
import Movement from '../images/movement.png';
import FoodCorner from '../images/food.png';
import Allowance from '../images/allowance.png';
import MonthlyStatement from '../images/monthly_statement.png';
import OverTime from '../images/overtime.png';
import CardUpdate from '../images/cardupdate.png';
import Bonus from '../images/bonus.png';
import BonusBank from '../images/bonusbank.png';
import AllowanceCheck from '../images/allowancecheck.png';
import ConfirmResign from '../images/confirmresign.png';
import Insurance from '../images/insurance.png';
import Cost from '../images/cost.png';
import OffDay from '../images/offday.png';
import Punishment from '../images/punishment.png';
import EmployeeService from '../images/employeeservice.png';
import EarnLeave from '../images/earnleave.png';
import Holidays from '../images/holidays.png';
import HrClearence from '../images/hrclearence.png';
import EmployeeTransfer from '../images/employeetransfer.png';
import KpiPerformance from '../images/kpiperformance.png';
import OfficeHour from '../images/officehour.png';
import SalaryAddition from '../images/salaryaddition.png';
import RosterAdd from '../images/rosteradd.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CardMenu from '../../Master/components/cards/CardMenu';
import Header from '../../Master/components/header/Header';
import { getAuthAction } from '../../User/actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';

const HrMenuScreen = (props) => {
  const [value, setValue] = React.useState('');

  const [date, setDate] = React.useState(new Date());
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const intUserTypeID = parseInt(userData.intUserTypeID);

  const [checked, setChecked] = React.useState(false);
  // Check the isLogged In
  useEffect(() => {
    dispatch(getAuthAction());
  }, [props]);
  console.log('userData', userData);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
        <View>
          <Header title="HR Management" />
          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              <CardMenu
                image={Attendance}
                cardText="Attendance"
                url={() => props.navigation.navigate('attendanceList')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={Leave}
                cardText="Leave"
                url={() => props.navigation.navigate('leaveList')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={Movement}
                cardText="Movement"
                url={() => props.navigation.navigate('movementList')}
                customStyle={styles.cardStyle}
              />
              {/* <CardMenu
                image={Allowance}
                cardText="Allowance"
                // url={
                //   () => props.navigation.navigate('allowenceList')
                // }
                customStyle={styles.cardStyle}
              /> */}
              <CardMenu
                image={MonthlyStatement}
                cardText="Monthly Statement"
                url={() => props.navigation.navigate('monthlyStatement')}
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={FoodCorner}
                cardText="FoodCorner"
                url={() => props.navigation.navigate('foodCorner')}
                customStyle={styles.cardStyle}
              />
              {/*
              <CardMenu
                image={CardUpdate}
                cardText="Card Update"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={Bonus}
                cardText="Bonus Top Sheet"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={BonusBank}
                cardText="Bonus to Bank"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={AllowanceCheck}
                cardText="Allowance Check"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={ConfirmResign}
                cardText="Confirmation and Resign"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={Insurance}
                cardText="Insurance"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={Cost}
                cardText="Employee Cost Center"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={OffDay}
                cardText="Employee Off Day Update"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={Punishment}
                cardText="Employee Punishment"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={EmployeeService}
                cardText="Employee Service Information"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={EarnLeave}
                cardText="Earn Leave"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={Holidays}
                cardText="Holidays"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={HrClearence}
                cardText="HR Clearence"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={EmployeeTransfer}
                cardText="Employee Transfer"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={KpiPerformance}
                cardText="KPI Performance"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={OfficeHour}
                cardText="Official Hour Change"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={SalaryAddition}
                cardText="Salary Addition & Deduction"
                customStyle={styles.cardStyle}
              />
              <CardMenu
                image={RosterAdd}
                cardText="Roster Add"
                customStyle={styles.cardStyle}
              /> */}
              {intUserTypeID == 6 && (
                <CardMenu
                  image={RosterAdd}
                  cardText="Guard"
                  url={() => props.navigation.navigate('guardDashboard')}
                  customStyle={styles.cardStyle}
                />
              )}

              {intUserTypeID !== 6 && intUserTypeID !== 3 && (
                <>
                  <CardMenu
                    image={RosterAdd}
                    cardText="Create Guard"
                    url={() => props.navigation.navigate('userManagement')}
                    customStyle={styles.cardStyle}
                  />
                  <CardMenu
                    image={RosterAdd}
                    cardText="Create Checkpoint"
                    url={() => props.navigation.navigate('addCheckpoint')}
                    customStyle={styles.cardStyle}
                  />
                  <CardMenu
                    image={RosterAdd}
                    cardText="Create QR Code"
                    url={() => props.navigation.navigate('createQr')}
                    customStyle={styles.cardStyle}
                  />
                  <CardMenu
                    image={RosterAdd}
                    cardText="QR Code List"
                    url={() => props.navigation.navigate('qrCodeList')}
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
const { width, height } = Dimensions.get('window');

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
    marginTop: -30,
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
export default HrMenuScreen;
