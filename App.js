import React, {useEffect, useState} from 'react';
import {View, Button, StatusBar} from 'react-native';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/modules/User/screens/Login';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Dashboard from './src/modules/Master/components/screen/Dashboard';
import ManageScreen from './src/modules/Master/components/screen/ManageScreen';
import Registration from './src/modules/User/screens/Registration';
import AddEmployee from './src/modules/User/screens/AddEmployee';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddSupplier from './src/modules/User/componets/supplier/AddSupplier';
import Empolyee from './src/modules/User/screens/Empolyee';
import SplashScreen from 'react-native-splash-screen';
import CustomerMenu from './src/modules/Customer/screens/CustomerMenu';
import HrMenuScreen from './src/modules/HR/screens/HrMenuScreen';
import DepartmentAddScreen from './src/modules/HR/screens/Department/DepartmentAddScreen';
import DepartmentList from './src/modules/HR/screens/Department/DepartmentList';
import DepartmentEditScreen from './src/modules/HR/screens/Department/DepartmentEditScreen';
import AccountScreen from './src/modules/Master/components/screen/AccountScreen';
import SettingListScreen from './src/modules/Master/components/screen/SettingScreen';
import FlashMessage from 'react-native-flash-message';
import {openDatabase} from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';
// import DistributionList from './src/modules/Distribution/screens/Distribution/DistributionList';
import DistributionMenu from './src/modules/Distribution/screens/DistributionMenu';
import GetInAddScreen from './src/modules/Distribution/screens/Distribution/GetInAddScreen';
import GetIOutScreen from './src/modules/Distribution/screens/Distribution/GetIOutScreen';
import AttendanceList from './src/modules/HR/screens/Attendance/AttendanceList';
import AddAttendance from './src/modules/HR/screens/Attendance/AddAttendance';
import LeaveList from './src/modules/HR/screens/Leave/LeaveList';

import SalesMenuScreen from './src/modules/Sales/screens/SalesMenuScreen';
import SalesOrder from './src/modules/Sales/screens/SalesOrder';
import CustomerSalesOrder from './src/modules/Sales/screens/CustomerSalesOrder';
import DeliveryRequisition from './src/modules/Sales/screens/DeliveryRequisition';
import DeliveryRequisitionList from './src/modules/Sales/screens/DeliveryRequisitionList';
import Sales from './src/modules/Sales/screens/Sales';
import CompleteReq from './src/modules/Sales/screens/CompleteReq';
import RequisitionSummery from './src/modules/Sales/screens/RequisitionSummery';
import ChallanList from './src/modules/Sales/screens/ChallanList';
import TripAssignScreen from './src/modules/Distribution/screens/Distribution/TripAssignScreen';
import AssignVehicle from './src/modules/Distribution/screens/Distribution/AssignVehicle';
import TripOutScreen from './src/modules/Distribution/screens/Distribution/TripOutScreen';
import TripCompleteScreen from './src/modules/Distribution/screens/Distribution/TripCompleteScreen';
import UnloadVehicleScreen from './src/modules/Distribution/screens/Distribution/UnloadVehicleScreen';
import AddUnloadVehicleScreen from './src/modules/Distribution/screens/Distribution/AddUnloadVehicleScreen';
import LoadedVehicleScreen from './src/modules/Distribution/screens/Distribution/LoadedVehicleScreen';
import AddloadedVehicleScreen from './src/modules/Distribution/screens/Distribution/AddloadedVehicleScreen';
import DistributorDealer from './src/modules/Sales/screens/DistributorDealer';
import AddLeave from './src/modules/HR/screens/Leave/AddLeave';
import MovementList from './src/modules/HR/screens/Movement/MovementList';
import salesDeliveryRequest from './src/modules/Sales/screens/SalesDeliveryRequest';
import DistributorDealerDetails from './src/modules/Sales/screens/DistributorDealerDetails';
import AddMovement from './src/modules/HR/screens/Movement/AddMovement';

import ShipmentAssign from './src/modules/Distribution/screens/ShipmentPlanning/ShipmentAssign';
import ShipmentPlanningMenu from './src/modules/Distribution/screens/ShipmentPlanning/ShipmentPlanningMenu';
import TransportSchedule from './src/modules/Distribution/screens/ShipmentPlanning/TransportSchedule';
import AddTransportSchedule from './src/modules/Distribution/screens/ShipmentPlanning/AddTransportSchedule';
import RequisitionPlanning from './src/modules/Distribution/screens/ShipmentPlanning/RequisitionPlanning';
import AllowenceList from './src/modules/HR/screens/Allowence/AllowenceList';
import MonthlyStatement from './src/modules/HR/screens/MonthlyStatement/MonthlyStatement';
import {useSelector} from 'react-redux';
import ScanScreen from './src/modules/Distribution/screens/Distribution/ScanScreen';
import LanguageScreen from './src/modules/Master/components/screen/LocalizationScreen';
import ChallanScreen from './src/modules/Distribution/screens/Distribution/ChallanScreen';
import TripoutScanScreen from './src/modules/Distribution/screens/Distribution/TripoutScanScreen';
import UnloadScanScreen from './src/modules/Distribution/screens/Distribution/UnloadScanScreen';
import LoadedScanScreen from './src/modules/Distribution/screens/Distribution/LoadedScanScreen';
import GetInQrCodeGenerator from './src/modules/Distribution/screens/Distribution/GetInQrCodeGenerator';
import TripListScreen from './src/modules/Distribution/screens/Distribution/TripListScreen';
import PrinterScreen from './src/modules/Distribution/screens/Distribution/PrinterScreen';
import EscPos from './src/modules/Distribution/screens/Distribution/EscPos';

// Guard Module
import GuardDashboard from './src/modules/Guard/screens/Dashboard';
import StartPatrol from './src/modules/Guard/screens/StartPatrol';
import Activity from './src/modules/Guard/screens/Activity';
import GateInOutListScreen from './src/modules/Guard/screens/GateInOutList';
import IncidentListScreen from './src/modules/Guard/screens/IncidentList';
import AddIncidentScreen from './src/modules/Guard/screens/AddIncident';
import AuditScreen from './src/modules/Guard/screens/Audit';
import TrainingScreen from './src/modules/Guard/screens/Training';
import PimScreen from './src/modules/Guard/screens/Pim';
import EmergencyContactListScreen from './src/modules/Guard/screens/EmergencyContactList';
import Scan from './src/modules/Guard/screens/Scan';
import CheckpointListScreen from './src/modules/Guard/screens/CheckpointList';
import AddMessageScreen from './src/modules/Guard/screens/AddMessage';
import AddGateInScreen from './src/modules/Guard/screens/AddGateIn';
import AddGateOutScreen from './src/modules/Guard/screens/AddGateOut';
import ShowGateOutScreen from './src/modules/Guard/screens/ShowGateOut';
import TaskListScreen from './src/modules/Guard/screens/TaskList';
import HelpScreen from './src/modules/Guard/screens/Help';
import HrAttendanceScreen from './src/modules/Guard/screens/HrAttendance';
import HrAddAttendanceScreen from './src/modules/Guard/screens/AddAttendance';
import HrAttendanceListScreen from './src/modules/Guard/screens/AttendanceList';
import HrLeaveScreen from './src/modules/Guard/screens/HrLeave';
import HrAddLeaveScreen from './src/modules/Guard/screens/HrAddLeave';
import HrMovementScreen from './src/modules/Guard/screens/HrMovement';
import HrAddMovementScreen from './src/modules/Guard/screens/HrAddMovement';
import HrExpenseScreen from './src/modules/Guard/screens/HrExpense';
import SettingScreen from './src/modules/Guard/screens/Setting';
import ProfileEditScreen from './src/modules/Guard/screens/UserProfileEdit';
import ProfileSaveScreen from './src/modules/Guard/screens/UserProfileSave';
import CreateQrCodeScreen from './src/modules/Guard/screens/CreateQrCode';
import GenerateQrCodeScreen from './src/modules/Guard/screens/GenerateQrCode';
import AsyncStorage from '@react-native-community/async-storage';
import UserManagementScreen from './src/modules/Guard/screens/UserManagement';
import AddCheckpointScreen from './src/modules/Guard/screens/AddCheckpoint';
import FleetMenu from './src/modules/Fleet/screens/FleetMenu';
import shippingMenu from './src/modules/Fleet/screens/shippingMenu';
import TripAddScreen from './src/modules/Fleet/screens/TripAddScreen';
import ShipStatementScreen from './src/modules/Fleet/screens/ShipStatementScreen';
import TopsheetScreen from './src/modules/Fleet/screens/TopsheetScreen';
import FuelLogEntry from './src/modules/Fleet/screens/FuelLogEntry';
import FuelLogDaybaseReport from './src/modules/Fleet/screens/FuelLogDaybaseReport';
import FuelLogVehiclebaseReport from './src/modules/Fleet/screens/FuelLogVehiclebaseReport';
import MyTrip from './src/modules/Fleet/screens/MyTrip';
import tripDashboard from './src/modules/Fleet/screens/tripDashboard';
import InventoryMenu from './src/modules/Inventory/screens/InventoryMenu';
import PurchaseRequisitionList from './src/modules/Inventory/screens/PurchaseRequisition/PurchaseRequisitionList';
import AddPurchaseRequisition from './src/modules/Inventory/screens/PurchaseRequisition/AddPurchaseRequisition';
import StoreRequisitionList from './src/modules/Inventory/screens/StoreRequisition/StoreRequisitionList';
import AddStoreRequisition from './src/modules/Inventory/screens/StoreRequisition/AddStoreRequisition';
import MrrList from './src/modules/Inventory/screens/Mrr/MrrList';
import AddMrr from './src/modules/Inventory/screens/Mrr/AddMrr';
import logisticsMenu from './src/modules/Logistics/screens/logisticsMenu';
import MyCar from './src/modules/Logistics/screens/MyCar';
import ListOfFuels from './src/modules/Logistics/screens/ListOfFuels';
import MiterHistory from './src/modules/Logistics/screens/MiterHistory';
import CarProblem from './src/modules/Logistics/screens/CarProblem';
import AddfFuels from './src/modules/Logistics/screens/AddfFuels';
import AddCarProblem from './src/modules/Logistics/screens/AddCarProblem';
import LogisticsDashboard from './src/modules/Logistics/screens/LogisticsDashboard';
import LogisticsMyTrip from './src/modules/Logistics/screens/LogisticsMyTrip';
import IssueShow from './src/modules/Inventory/screens/Issue/IssueShow';
import IssueDetails from './src/modules/Inventory/screens/Issue/IssueDetails';
import QRCodeList from './src/modules/Guard/screens/QRCodeList';
import SupplierMenu from './src/modules/Supplier/screens/SupplierMenu';
import ShipmentRequest from './src/modules/Supplier/screens/TransportProvider/ShipmentRequest';
import SupplierTerritoryAssign from './src/modules/Distribution/screens/ShipmentPlanning/SupplierTerritoryAssign';

import ShipmentRequestEntry from './src/modules/Supplier/screens/TransportProvider/ShipmentRequestEntry';
import VehicelList from './src/modules/Supplier/screens/TransportProvider/VehicleList';
import VehicelAdd from './src/modules/Supplier/screens/TransportProvider/VehicleAdd';
import BillingReport from './src/modules/Supplier/screens/TransportProvider/BillingReport';
import SubmitBill from './src/modules/Supplier/screens/TransportProvider/SubmitBill';
import DriverList from './src/modules/Supplier/screens/TransportProvider/DriverList';
import DriverAdd from './src/modules/Supplier/screens/TransportProvider/DriverAdd';
import FoodList from './src/modules/HR/screens/FoodCorner/FoodList';
import AddMeal from './src/modules/HR/screens/FoodCorner/AddMeal';
import ProductList from './src/modules/Pos/screens/ProductList';
import CartList from './src/modules/Pos/screens/CartList';
import VoyageMenuScreen from './src/modules/Voyage/screens/VoyageMenuScreen';
import VoyageList from './src/modules/Voyage/screens/VoyageList';
import CreateVoyage from './src/modules/Voyage/screens/CreateVoyage';
import VoyageActivity from './src/modules/Voyage/screens/VoyageActivity';
import VoyageVlsfo from './src/modules/Voyage/screens/VoyageVlsfo';
import MainEngine from './src/modules/Voyage/screens/MainEngine';
import ExhtEngine from './src/modules/Voyage/screens/ExhtEngine';
import ExhtEngineOne from './src/modules/Voyage/screens/ExhtEngineOne';
import ExhtEngineThree from './src/modules/Voyage/screens/ExhtEngineThree';
import Boiler from './src/modules/Voyage/screens/Boiler';
import GasChemical from './src/modules/Voyage/screens/GasChemical';

// End of Guard Module

// Maintenance Module Start
import MaintenanceMenuScreen from './src/modules/Maintenance/screens/MaintenanceMenuScreen';
import PmsList from './src/modules/Maintenance/screens/PmsList';
import AddPms from './src/modules/Maintenance/screens/AddPms';
import CustomerStatement from './src/modules/Sales/screens/CustomerStatement';
import PackerAssignScreen from './src/modules/Distribution/screens/Distribution/PackerAssignScreen';
// Maintenance Module End
// S&Q strat
import SandQMenuScreen from './src/modules/S&Q/screens/SandQMenuScreen';
import Reports from './src/modules/S&Q/screens/Reports';
import Confidential from './src/modules/S&Q/screens/Confidential';
import NearMiss from './src/modules/S&Q/screens/NearMiss';
import AccidentIncident from './src/modules/S&Q/screens/AccidentIncident';
import NonConformity from './src/modules/S&Q/screens/NonConformity';
import ShipboardEmergency from './src/modules/S&Q/screens/ShipboardEmergency';
import Permits from './src/modules/S&Q/screens/Permits';
import EnclosedPermit from './src/modules/S&Q/screens/EnclosedPermit';
import HotWorkPermit from './src/modules/S&Q/screens/HotWorkPermit';
import ChangePasswordScreen from './src/modules/Master/components/screen/ChangePasswordScreen';
import DriverEdit from './src/modules/Supplier/screens/TransportProvider/DriverEdit';
import VehicleEdit from './src/modules/Supplier/screens/TransportProvider/VehicleEdit';
import SmallCraftPermit from './src/modules/S&Q/screens/SmallCraftPermit';
import ElectricalCircuit from './src/modules/S&Q/screens/ElectricalCircuit';
import WorkAloftPermit from './src/modules/S&Q/screens/WorkAloftPermit';
import PipelinesPressure from './src/modules/S&Q/screens/PipelinesPressure';
import WorkOverside from './src/modules/S&Q/screens/WorkOverside';
import CloudWorkPermit from './src/modules/S&Q/screens/CloudWorkPermit';
import UnderwaterWork from './src/modules/S&Q/screens/UnderwaterWork';
import ContigencyPlan from './src/modules/S&Q/screens/ContigencyPlan';
import PmsDetailsPage from './src/modules/Maintenance/screens/PmsDetailsPage';
import PrmsJobCard from './src/modules/Maintenance/screens/PrmsJobCard';
import ScanScreenPacker from './src/modules/Distribution/screens/ScanScreenPacker';
import PurchaseRequistionDetails from './src/modules/Inventory/screens/PurchaseRequisition/PurchaseRequistionDetails';
import Audit from './src/modules/S&Q/screens/Audit';
import InternalSafety from './src/modules/S&Q/screens/InternalSafety';
import CompanyInternal from './src/modules/S&Q/screens/CompanyInternal';
import ShipboardInternal from './src/modules/S&Q/screens/ShipboardInternal';
import SeafarersJoining from './src/modules/S&Q/screens/SeafarersJoining';
import JoiningSeafarers from './src/modules/S&Q/screens/JoiningSeafarers';
import Event from './src/modules/S&Q/screens/Event';
import AddEvent from './src/modules/S&Q/screens/AddEvent';
import SignOff from './src/modules/S&Q/screens/SignOff';
import Improvement from './src/modules/S&Q/screens/Improvement';
import AddImprovement from './src/modules/S&Q/screens/AddImprovement';
import PlanEquipment from './src/modules/S&Q/screens/PlanEquipment';
import RestHour from './src/modules/S&Q/screens/RestHour';
import AddRestHour from './src/modules/S&Q/screens/AddRestHour';
// S&Q end

function FeedScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('login')}
      />
    </View>
  );
}
function ProfileScreen() {
  return <View />;
}

function SettingsScreen() {
  return <View />;
}

const FeedStack = createStackNavigator();

function FeedStackScreen() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={FeedScreen} />
      {/* other screens */}
    </FeedStack.Navigator>
  );
}

const HrStack = createStackNavigator();
function HrStackScreen() {
  return (
    <HrStack.Navigator initialRouteName="hrMenu">
      <HrStack.Screen
        name="hrMenu"
        component={HrMenuScreen}
        options={{headerShown: true, title: 'HR Management'}}
      />
      <HrStack.Screen
        name="departmentList"
        component={DepartmentList}
        options={{headerShown: true, title: 'Department'}}
      />
      <HrStack.Screen
        name="addDepartment"
        component={DepartmentAddScreen}
        options={{headerShown: true, title: 'Add Department'}}
      />
      <HrStack.Screen
        name="editDepartment"
        component={DepartmentEditScreen}
        options={{headerShown: true, title: 'Department Edit'}}
      />

      <HrStack.Screen
        name="attendanceList"
        component={AttendanceList}
        options={{headerShown: true, title: 'Attendance List'}}
      />

      <HrStack.Screen
        name="addAttendance"
        component={AddAttendance}
        options={{headerShown: true, title: 'Add Attendance'}}
      />

      <HrStack.Screen
        name="leaveList"
        component={LeaveList}
        options={{headerShown: true, title: 'Leave List'}}
      />

      <HrStack.Screen
        name="addLeave"
        component={AddLeave}
        options={{headerShown: true, title: 'Add Leave'}}
      />

      <HrStack.Screen
        name="movementList"
        component={MovementList}
        options={{headerShown: true, title: 'Movement List'}}
      />

      <HrStack.Screen
        name="foodCorner"
        component={FoodList}
        options={{headerShown: true, title: 'Food Corner'}}
      />

      <HrStack.Screen
        name="addMeal"
        component={AddMeal}
        options={{headerShown: true, title: 'Add Meal'}}
      />

      <HrStack.Screen
        name="addMovement"
        component={AddMovement}
        options={{headerShown: true, title: 'Add Movement'}}
      />

      <HrStack.Screen
        name="allowenceList"
        component={AllowenceList}
        options={{headerShown: true, title: 'Allowence List'}}
      />

      <HrStack.Screen
        name="monthlyStatement"
        component={MonthlyStatement}
        options={{headerShown: true, title: 'Monthly Statement'}}
      />

      {/* Guard Module */}
      <HrStack.Screen
        name="guardDashboard"
        component={GuardDashboard}
        options={{headerShown: true, title: 'Guard Dashboard'}}
      />
      <HrStack.Screen
        name="startPatrol"
        component={StartPatrol}
        options={{
          title: 'Start Patrol',
        }}
      />
      <HrStack.Screen
        name="activity"
        component={Activity}
        options={{
          title: 'Activity',
        }}
      />
      <HrStack.Screen
        name="gateInOutList"
        component={GateInOutListScreen}
        options={{
          title: 'Gate In/Gate Out List',
        }}
      />
      <HrStack.Screen
        name="addGateIn"
        component={AddGateInScreen}
        options={{
          title: 'Add Gate In',
        }}
      />
      <HrStack.Screen
        name="addGateOut"
        component={AddGateOutScreen}
        options={{
          title: 'Add Gate Out',
        }}
      />
      <HrStack.Screen
        name="showGateOut"
        component={ShowGateOutScreen}
        options={{
          title: 'Show Gate Out',
        }}
      />
      <HrStack.Screen
        name="incidentList"
        component={IncidentListScreen}
        options={{
          title: 'Incident List',
        }}
      />
      <HrStack.Screen
        name="addIncident"
        component={AddIncidentScreen}
        options={{title: 'Add Incident'}}
      />
      <HrStack.Screen
        name="audit"
        component={AuditScreen}
        options={{
          title: 'Audit',
        }}
      />
      <HrStack.Screen
        name="training"
        component={TrainingScreen}
        options={{
          title: 'Training',
        }}
      />
      <HrStack.Screen
        name="pim"
        component={PimScreen}
        options={{
          title: 'Pim',
        }}
      />
      <HrStack.Screen
        name="emergencyContactList"
        component={EmergencyContactListScreen}
        options={{
          title: 'Emergency Contact List',
        }}
      />
      <HrStack.Screen
        name="scan"
        component={Scan}
        options={{
          title: 'Scan',
        }}
      />
      <HrStack.Screen
        name="checkpointList"
        component={CheckpointListScreen}
        options={{
          title: 'CheckpointList',
        }}
      />
      <HrStack.Screen
        name="addMessage"
        component={AddMessageScreen}
        options={{
          title: 'AddMessage',
        }}
      />
      <HrStack.Screen
        name="taskList"
        component={TaskListScreen}
        options={{
          title: 'Task List',
        }}
      />
      <HrStack.Screen
        name="help"
        component={HelpScreen}
        options={{
          title: 'Help',
        }}
      />
      <HrStack.Screen
        name="hrAttendance"
        component={HrAttendanceScreen}
        options={{
          title: 'Attendance',
        }}
      />
      <HrStack.Screen
        name="hrAddAttendance"
        component={HrAddAttendanceScreen}
        options={{
          title: 'Add Attendance',
        }}
      />
      <HrStack.Screen
        name="hrAttendanceList"
        component={HrAttendanceListScreen}
        options={{
          title: 'Attendance List',
        }}
      />
      <HrStack.Screen
        name="hrLeave"
        component={HrLeaveScreen}
        options={{
          title: 'Leave',
        }}
      />
      <HrStack.Screen
        name="hrAddLeave"
        component={HrAddLeaveScreen}
        options={{
          title: 'Add Leave',
        }}
      />
      <HrStack.Screen
        name="hrMovement"
        component={HrMovementScreen}
        options={{
          title: 'Movement',
        }}
      />
      <HrStack.Screen
        name="hrAddMovement"
        component={HrAddMovementScreen}
        options={{
          title: 'Add Movement',
        }}
      />
      <HrStack.Screen
        name="hrExpense"
        component={HrExpenseScreen}
        options={{
          title: 'Expense',
        }}
      />
      <HrStack.Screen
        name="profileEdit"
        component={ProfileEditScreen}
        options={{
          title: 'Profile',
        }}
      />
      <HrStack.Screen
        name="profileSave"
        component={ProfileSaveScreen}
        options={{
          title: 'Profile',
        }}
      />
      <HrStack.Screen
        name="createQr"
        component={CreateQrCodeScreen}
        options={{
          title: 'Create QR Code',
        }}
      />
      <HrStack.Screen
        name="generateQr"
        component={GenerateQrCodeScreen}
        options={{
          title: 'Your QR Code',
        }}
      />
      <HrStack.Screen
        name="userManagement"
        component={UserManagementScreen}
        options={{
          title: 'User Management',
        }}
      />
      <HrStack.Screen
        name="addCheckpoint"
        component={AddCheckpointScreen}
        options={{
          title: 'Add Checkpoint',
        }}
      />
      <HrStack.Screen
        name="qrCodeList"
        component={QRCodeList}
        options={{
          title: 'Checkpoint QR Codes',
        }}
      />
      {/* End of Guard Module */}
    </HrStack.Navigator>
  );
}
const SalesStack = createStackNavigator();
function SalesStackScreen() {
  return (
    <SalesStack.Navigator initialRouteName="salesMenu">
      <SalesStack.Screen
        name="salesMenu"
        component={SalesMenuScreen}
        options={{headerShown: true, title: 'Sales Menu'}}
      />
      <SalesStack.Screen
        name="salesOrder"
        component={SalesOrder}
        options={{headerShown: true, title: 'Sales Order'}}
      />
      <SalesStack.Screen
        name="salesOrderCustomer"
        component={CustomerSalesOrder}
        options={{headerShown: true, title: 'Sales Order Customer'}}
      />
      <SalesStack.Screen
        name="myOrders"
        component={Sales}
        options={{headerShown: true, title: 'My Order'}}
      />
      <SalesStack.Screen
        name="deliveryRequisition"
        component={DeliveryRequisition}
        options={{headerShown: true, title: 'Delivery Requisition'}}
      />
      <SalesStack.Screen
        name="deliveryRequisitionList"
        component={DeliveryRequisitionList}
        options={{headerShown: true, title: 'Delivery Requistion List'}}
      />
      <SalesStack.Screen
        name="scheduleRequisition"
        component={CompleteReq}
        options={{headerShown: true, title: 'Schedule Requistion'}}
      />
      <SalesStack.Screen
        name="requisitionSummery"
        component={RequisitionSummery}
        options={{headerShown: true, title: 'Delivery Requistion Summery'}}
      />
      <SalesStack.Screen
        name="challanlist"
        component={ChallanList}
        options={{headerShown: true, title: 'Challan List'}}
      />
      <SalesStack.Screen
        name="distributionDealer"
        component={DistributorDealer}
        options={{headerShown: true, title: 'Dealer'}}
      />
      <SalesStack.Screen
        name="distributionDealerDetails"
        component={DistributorDealerDetails}
        options={{headerShown: true, title: 'Distribution Dealer Details'}}
      />
      <SalesStack.Screen
        name="salesDeliveryRequest"
        component={salesDeliveryRequest}
        options={{headerShown: true, title: 'Sales Delivery Request'}}
      />
      <SalesStack.Screen
        name="customerStatement"
        component={CustomerStatement}
        options={{headerShown: true, title: 'My Statement'}}
      />
    </SalesStack.Navigator>
  );
}
const distributorStack = createStackNavigator();
function DistributorStackScreen() {
  return (
    <distributorStack.Navigator initialRouteName="distributionMenu">
      <distributorStack.Screen
        name="distributionMenu"
        component={DistributionMenu}
        options={{headerShown: true, title: 'Distribution'}}
      />
      <distributorStack.Screen
        name="getIn"
        component={GetInAddScreen}
        options={{headerShown: true, title: 'Gate In'}}
      />

      <distributorStack.Screen
        name="getOut"
        component={GetIOutScreen}
        options={{headerShown: true, title: 'Gate Out'}}
      />
      <distributorStack.Screen
        name="assignVehicle"
        component={AssignVehicle}
        options={{headerShown: true, title: 'Assign Vehicle'}}
      />
      <distributorStack.Screen
        name="tripAssign"
        component={TripAssignScreen}
        options={{headerShown: true, title: 'Trip Assign'}}
      />
      <distributorStack.Screen
        name="tripList"
        component={TripListScreen}
        options={{headerShown: true, title: 'Trip List'}}
      />
      <distributorStack.Screen
        name="scan"
        component={ScanScreen}
        options={{headerShown: true, title: 'Trip Assign Scan'}}
      />
      <distributorStack.Screen
        name="packerScan"
        component={ScanScreenPacker}
        options={{headerShown: true, title: 'Packer Scan Screen'}}
      />
      <distributorStack.Screen
        name="packerAssign"
        component={PackerAssignScreen}
        options={{headerShown: true, title: 'Packer Assign'}}
      />
      <distributorStack.Screen
        name="tripOut"
        component={TripOutScreen}
        options={{headerShown: true, title: 'Gate Out'}}
      />
      <distributorStack.Screen
        name="tripComplete"
        component={TripCompleteScreen}
        options={{headerShown: true, title: 'Trip Complete'}}
      />

      <distributorStack.Screen
        name="unloadVehicle"
        component={UnloadVehicleScreen}
        options={{headerShown: true, title: 'Unload Vehicle'}}
      />

      <distributorStack.Screen
        name="loadedVehicle"
        component={LoadedVehicleScreen}
        options={{headerShown: true, title: 'Loaded Vehicle'}}
      />

      <distributorStack.Screen
        name="unloadScan"
        component={UnloadScanScreen}
        options={{headerShown: true, title: 'Unload Weight Scan'}}
      />

      <distributorStack.Screen
        name="addUnloadVehicle"
        component={AddUnloadVehicleScreen}
        options={{headerShown: true, title: 'Add Unload Vehicle'}}
      />
      <distributorStack.Screen
        name="print"
        component={PrinterScreen}
        options={{headerShown: true, title: 'Printer'}}
      />
      <distributorStack.Screen
        name="escpost"
        component={EscPos}
        options={{headerShown: true, title: 'Printer'}}
      />

      <distributorStack.Screen
        name="loadedScan"
        component={LoadedScanScreen}
        options={{headerShown: true, title: 'Loaded Weight Scan'}}
      />

      <distributorStack.Screen
        name="addLoadedVehicle"
        component={AddloadedVehicleScreen}
        options={{headerShown: true, title: 'Add Loaded Vehicle'}}
      />

      <distributorStack.Screen
        name="shipmentPlanning"
        component={ShipmentPlanningMenu}
        options={{headerShown: true, title: 'Shipment Planning'}}
      />

      <distributorStack.Screen
        name="transportSchedule"
        component={TransportSchedule}
        options={{headerShown: true, title: 'Transport Schedule'}}
      />

      <distributorStack.Screen
        name="addTransportSchedule"
        component={AddTransportSchedule}
        options={{headerShown: true, title: 'Add Transport Schedule'}}
      />
      <distributorStack.Screen
        name="shipmentAssign"
        component={ShipmentAssign}
        options={{headerShown: true, title: 'Shipment Assign'}}
      />
      <distributorStack.Screen
        name="supplierTerritoryAssign"
        component={SupplierTerritoryAssign}
        options={{headerShown: true, title: 'Supplier Territory Assign'}}
      />
      <distributorStack.Screen
        name="requisitionPlanning"
        component={RequisitionPlanning}
        options={{headerShown: true, title: 'Requisition Planning'}}
      />

      <distributorStack.Screen
        name="challan"
        component={ChallanScreen}
        options={{headerShown: true, title: 'Loading Slip'}}
      />
      <distributorStack.Screen
        name="tripoutScan"
        component={TripoutScanScreen}
        options={{headerShown: false, title: 'Trip Out Scan'}}
      />
      <distributorStack.Screen
        name="getInQrcode"
        component={GetInQrCodeGenerator}
        options={{headerShown: true, title: 'Gate In Scan'}}
      />
    </distributorStack.Navigator>
  );
}

const inventoryStack = createStackNavigator();
function InventoryStackScreen() {
  return (
    <inventoryStack.Navigator initialRouteName="inventoryMenu">
      <inventoryStack.Screen
        name="inventoryMenu"
        component={InventoryMenu}
        options={{headerShown: true, title: 'Inventory'}}
      />

      <inventoryStack.Screen
        name="purchaseRequisition"
        component={PurchaseRequisitionList}
        options={{headerShown: true, title: 'Purchase Requisition'}}
      />
      <inventoryStack.Screen
        name="purchaseRequisitionDetals"
        component={PurchaseRequistionDetails}
        options={{headerShown: true, title: 'Purchase Requisition Details'}}
      />

      <inventoryStack.Screen
        name="addPurchaseRequisition"
        component={AddPurchaseRequisition}
        options={{headerShown: true, title: 'Add Purchase Requisition'}}
      />

      <inventoryStack.Screen
        name="storeRequisition"
        component={StoreRequisitionList}
        options={{headerShown: true, title: 'Store Requisition'}}
      />

      <inventoryStack.Screen
        name="addStoreRequisition"
        component={AddStoreRequisition}
        options={{headerShown: true, title: 'Add Store Requisition'}}
      />

      <inventoryStack.Screen
        name="mrr"
        component={AddMrr}
        options={{headerShown: true, title: 'Add Mrr'}}
      />

      <inventoryStack.Screen
        name="mrrList"
        component={MrrList}
        options={{headerShown: true, title: 'Mrr List'}}
      />

      <inventoryStack.Screen
        name="issue"
        component={IssueShow}
        options={{headerShown: true, title: 'Issue Show'}}
      />

      <inventoryStack.Screen
        name="issueDetails"
        component={IssueDetails}
        options={{headerShown: true, title: 'Issue Details'}}
      />
    </inventoryStack.Navigator>
  );
}
const DashboardStack = createStackNavigator();
function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator initialRouteName="Dashboard">
      <DashboardStack.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          headerShown: false,
        }}
      />
      <DashboardStack.Screen
        name="employee"
        component={Empolyee}
        options={{headerShown: true, title: 'Employee'}}
      />
      <DashboardStack.Screen
        name="addEmployee"
        component={AddEmployee}
        options={{headerShown: true, title: 'Add Employee'}}
      />
      <DashboardStack.Screen
        name="customerMenu"
        component={CustomerMenu}
        options={{headerShown: true, title: 'Customer'}}
      />
      <DashboardStack.Screen
        name="supplier"
        component={SupplierMenu}
        options={{headerShown: true, title: 'Supplier'}}
      />

      <DashboardStack.Screen
        name="shipmentRequest"
        component={ShipmentRequest}
        options={{headerShown: true, title: 'শিপমেন্ট রিকোয়েস্ট'}}
      />

      <DashboardStack.Screen
        name="shipmentRequestEntry"
        component={ShipmentRequestEntry}
        options={{headerShown: true, title: 'শিপমেন্ট রিকোয়েস্ট'}}
      />

      <DashboardStack.Screen
        name="vehicleList"
        component={VehicelList}
        options={{headerShown: true, title: 'গাড়ি'}}
      />

      <DashboardStack.Screen
        name="vehcileAdd"
        component={VehicelAdd}
        options={{headerShown: true, title: 'গাড়ি'}}
      />
      <DashboardStack.Screen
        name="vehicleEdit"
        component={VehicleEdit}
        options={{headerShown: true, title: 'গাড়ি আপডেট'}}
      />
      <DashboardStack.Screen
        name="driverList"
        component={DriverList}
        options={{headerShown: true, title: 'চালক'}}
      />

      <DashboardStack.Screen
        name="driverAdd"
        component={DriverAdd}
        options={{headerShown: true, title: 'চালক'}}
      />
      <DashboardStack.Screen
        name="driverEdit"
        component={DriverEdit}
        options={{headerShown: true, title: 'চালক তথ্য আপডেট'}}
      />
      <DashboardStack.Screen
        name="billingReport"
        component={BillingReport}
        options={{headerShown: true, title: 'বিলিং রিপোর্'}}
      />

      <DashboardStack.Screen
        name="submitBill"
        component={SubmitBill}
        options={{headerShown: true, title: 'বিল সাবমিট'}}
      />
      <DashboardStack.Screen
        name="sales"
        component={SalesStackScreen}
        options={{headerShown: false, title: 'Sales'}}
      />
      <DashboardStack.Screen
        name="designation"
        component={AddSupplier}
        options={{headerShown: true, title: 'Supplier'}}
      />
      <DashboardStack.Screen
        name="hrMenu"
        component={HrStackScreen}
        options={{headerShown: false, title: 'Hr Menu'}}
      />
      <DashboardStack.Screen
        name="distributor"
        component={DistributorStackScreen}
        options={{headerShown: false, title: 'Distributor'}}
      />

      <DashboardStack.Screen
        name="inventory"
        component={InventoryStackScreen}
        options={{headerShown: false, title: 'Inventory'}}
      />
      <DashboardStack.Screen
        name="fleet"
        component={FleetStackScreen}
        options={{headerShown: false, title: 'Fleet'}}
      />
      <DashboardStack.Screen
        name="language"
        component={LanguageScreen}
        options={{headerShown: true, title: 'Change Language'}}
      />

      <DashboardStack.Screen
        name="productList"
        component={ProductList}
        options={{headerShown: true, title: 'POS'}}
      />

      <DashboardStack.Screen
        name="cartList"
        component={CartList}
        options={{headerShown: true, title: 'Cart'}}
      />
      <DashboardStack.Screen
        name="voyage"
        component={VoyageStackScreen}
        options={{headerShown: false, title: 'Voyage'}}
      />
      <DashboardStack.Screen
        name="maintenance"
        component={MaintenanceStackScreen}
        options={{headerShown: false, title: 'Maintenance'}}
      />
      <DashboardStack.Screen
        name="sandQ"
        component={SandQStackScreen}
        options={{headerShown: false, title: 'S&Q'}}
      />
      <DashboardStack.Screen
        name="changePassword"
        component={ChangePasswordScreen}
        options={{headerShown: true, title: 'Change Password'}}
      />

      {/* other screens */}
    </DashboardStack.Navigator>
  );
}

const ManageStack = createStackNavigator();
function ManageStackScreen() {
  return (
    <ManageStack.Navigator>
      {/* <ManageStack.Screen name="dashboard" component={Dashboard} /> */}
      <ManageStack.Screen
        name="employee"
        component={Empolyee}
        options={{headerShown: true}}
      />
      <ManageStack.Screen
        name="addEmployee"
        component={AddEmployee}
        options={{headerShown: true}}
      />

      {/* other screens */}
    </ManageStack.Navigator>
  );
}

/**
 * Fleet Management
 */
const FleetStack = createStackNavigator();

function FleetStackScreen() {
  return (
    <FleetStack.Navigator>
      <FleetStack.Screen
        name="fleetMenu"
        component={FleetMenu}
        options={{headerShown: true, title: 'Fleet Menu'}}
      />
      <FleetStack.Screen
        name="tripDashboard"
        component={tripDashboard}
        options={{headerShown: true, title: 'Trip Dashboard'}}
      />
      <FleetStack.Screen
        name="mytrip"
        component={MyTrip}
        options={{headerShown: true, title: 'My Trip'}}
        options={{headerShown: true}}
      />
      <FleetStack.Screen
        name="shippingMenu"
        component={shippingMenu}
        options={{headerShown: true, title: 'Shipping Menu'}}
      />
      <FleetStack.Screen
        name="TripAdd"
        component={TripAddScreen}
        options={{headerShown: true, title: 'Trip Menu'}}
      />
      <FleetStack.Screen
        name="ShipStatement"
        component={ShipStatementScreen}
        options={{headerShown: true, title: 'Statement'}}
      />
      <FleetStack.Screen
        name="shippingTripList"
        component={TripListScreen}
        options={{headerShown: true, title: 'Shipping Trip List'}}
      />
      <FleetStack.Screen
        name="TopSheet"
        component={TopsheetScreen}
        options={{headerShown: true, title: 'Top Sheet'}}
      />
      <FleetStack.Screen
        name="fuelLogEntry"
        component={FuelLogEntry}
        options={{headerShown: true, title: 'Fuel Log Entry'}}
      />
      <FleetStack.Screen
        name="FuelLogDaybaseReport"
        component={FuelLogDaybaseReport}
        options={{headerShown: true, title: 'Day Base Report'}}
      />
      <FleetStack.Screen
        name="FuelLogVehiclebaseReport"
        component={FuelLogVehiclebaseReport}
        options={{headerShown: true, title: 'Vehicle Base Report'}}
      />
      {/* Logistics menu url */}

      <FleetStack.Screen
        name="logisticsMenu"
        component={logisticsMenu}
        options={{headerShown: true, title: 'Logistics'}}
      />
      <FleetStack.Screen
        name="logistricsDriverTrip"
        component={LogisticsDashboard}
        options={{headerShown: true, title: 'Logistic Dashboard'}}
      />
      <FleetStack.Screen
        name="mylogisticstrip"
        component={LogisticsMyTrip}
        options={{headerShown: true, title: 'My Logistic Trip'}}
      />
      <FleetStack.Screen
        name="mycar"
        component={MyCar}
        options={{headerShown: true, title: 'My Car'}}
      />
      <FleetStack.Screen
        name="fuelList"
        component={ListOfFuels}
        options={{headerShown: true, title: 'Fuel List'}}
      />
      <FleetStack.Screen
        name="addfuel"
        component={AddfFuels}
        options={{headerShown: true, title: 'Add Fuel'}}
      />
      <FleetStack.Screen
        name="addCarProblem"
        component={AddCarProblem}
        options={{headerShown: true, title: 'Add Car Problem'}}
      />
      <FleetStack.Screen
        name="carProblem"
        component={CarProblem}
        options={{headerShown: true, title: 'Car Problem'}}
      />
      <FleetStack.Screen
        name="meterhistory"
        component={MiterHistory}
        options={{headerShown: true, title: 'Meter History'}}
      />
      {/* other screens */}
    </FleetStack.Navigator>
  );
}

const VoyageStack = createStackNavigator();

function VoyageStackScreen() {
  return (
    <VoyageStack.Navigator>
      <VoyageStack.Screen
        name="voyageMenu"
        component={VoyageMenuScreen}
        options={{headerShown: true, title: 'Voyage Dashboard'}}
      />
      <VoyageStack.Screen
        name="voyageList"
        component={VoyageList}
        options={{headerShown: true, title: 'Voyage List'}}
      />
      <VoyageStack.Screen
        name="voyageActivity"
        component={VoyageActivity}
        options={{headerShown: true, title: 'Voyage Activity'}}
      />
      <VoyageStack.Screen
        name="createVoyage"
        component={CreateVoyage}
        options={{headerShown: true, title: 'Add Voyage'}}
      />
      <VoyageStack.Screen
        name="VoyageVlsfo"
        component={VoyageVlsfo}
        options={{headerShown: true, title: 'Voyage Vlsfo'}}
      />
      <VoyageStack.Screen
        name="mainEngine"
        component={MainEngine}
        options={{headerShown: true, title: 'Main Engine'}}
      />
      <VoyageStack.Screen
        name="exhtEngine"
        component={ExhtEngine}
        options={{headerShown: true, title: 'Exht Engine'}}
      />
      <VoyageStack.Screen
        name="exhtEngineOne"
        component={ExhtEngineOne}
        options={{headerShown: true, title: 'Exht Engine One'}}
      />
      <VoyageStack.Screen
        name="exhtEngineThree"
        component={ExhtEngineThree}
        options={{headerShown: true, title: 'Exht Engine Three'}}
      />
      <VoyageStack.Screen
        name="boiler"
        component={Boiler}
        options={{headerShown: true, title: 'Bolier'}}
      />
      <VoyageStack.Screen
        name="gasChemical"
        component={GasChemical}
        options={{headerShown: true, title: 'GasChemical'}}
      />
    </VoyageStack.Navigator>
  );
}
// S & Q
const SandQStack = createStackNavigator();

function SandQStackScreen() {
  return (
    <SandQStack.Navigator>
      <SandQStack.Screen
        name="sandQMenu"
        component={SandQMenuScreen}
        options={{headerShown: true, title: 'S & Q Dashboard'}}
      />
      <SandQStack.Screen
        name="reports"
        component={Reports}
        options={{headerShown: true, title: 'Reports'}}
      />
      <SandQStack.Screen
        name="confidential"
        component={Confidential}
        options={{headerShown: true, title: 'Confidential'}}
      />
      <SandQStack.Screen
        name="nearMiss"
        component={NearMiss}
        options={{headerShown: true, title: 'Near Miss'}}
      />
      <SandQStack.Screen
        name="accidentIncident"
        component={AccidentIncident}
        options={{headerShown: true, title: 'Accident Incident'}}
      />
      <SandQStack.Screen
        name="nonConformity"
        component={NonConformity}
        options={{headerShown: true, title: 'Non Conformity'}}
      />
      <SandQStack.Screen
        name="shipboardEmergency"
        component={ShipboardEmergency}
        options={{headerShown: true, title: 'Shipboard Emergency'}}
      />
      <SandQStack.Screen
        name="permits"
        component={Permits}
        options={{headerShown: true, title: 'Permits'}}
      />
      <SandQStack.Screen
        name="enclosedPermit"
        component={EnclosedPermit}
        options={{headerShown: true, title: 'Enclosed Permit'}}
      />
      <SandQStack.Screen
        name="hotWorkPermit"
        component={HotWorkPermit}
        options={{headerShown: true, title: 'Hot Work Permit'}}
      />
      <SandQStack.Screen
        name="smallCraftPermit"
        component={SmallCraftPermit}
        options={{headerShown: true, title: 'Small Craft Permit'}}
      />
      <SandQStack.Screen
        name="electricalCircuit"
        component={ElectricalCircuit}
        options={{headerShown: true, title: 'Electrical Circuit'}}
      />
      <SandQStack.Screen
        name="workAloftPermit"
        component={WorkAloftPermit}
        options={{headerShown: true, title: 'Work Aloft Permit'}}
      />
      <SandQStack.Screen
        name="pipelinesPressure"
        component={PipelinesPressure}
        options={{headerShown: true, title: 'Pipelines & Pressure'}}
      />
      <SandQStack.Screen
        name="workOverside"
        component={WorkOverside}
        options={{headerShown: true, title: 'Work Overside'}}
      />
      <SandQStack.Screen
        name="cloudWorkPermit"
        component={CloudWorkPermit}
        options={{headerShown: true, title: 'Cloud Work Permit'}}
      />
      <SandQStack.Screen
        name="underwaterWork"
        component={UnderwaterWork}
        options={{headerShown: true, title: 'Underwater Work'}}
      />
      <SandQStack.Screen
        name="contigencyPlan"
        component={ContigencyPlan}
        options={{headerShown: true, title: 'Contigency Plan'}}
      />
      <SandQStack.Screen
        name="audit"
        component={Audit}
        options={{headerShown: true, title: 'Audit'}}
      />
      <SandQStack.Screen
        name="internalSafety"
        component={InternalSafety}
        options={{headerShown: true, title: 'Internal Safety'}}
      />
      <SandQStack.Screen
        name="companyInternal"
        component={CompanyInternal}
        options={{headerShown: true, title: 'Company Internal'}}
      />
      <SandQStack.Screen
        name="shipboardInternal"
        component={ShipboardInternal}
        options={{headerShown: true, title: 'Shipboard Internal'}}
      />
      <SandQStack.Screen
        name="seafarersJoining"
        component={SeafarersJoining}
        options={{headerShown: true, title: 'Seafarers Joining'}}
      />
      <SandQStack.Screen
        name="joiningSeafarers"
        component={JoiningSeafarers}
        options={{headerShown: true, title: 'Joining Seafarers'}}
      />
      <SandQStack.Screen
        name="event"
        component={Event}
        options={{headerShown: true, title: 'Event'}}
      />
      <SandQStack.Screen
        name="addEvent"
        component={AddEvent}
        options={{headerShown: true, title: 'AddEvent'}}
      />
      <SandQStack.Screen
        name="signOff"
        component={SignOff}
        options={{headerShown: true, title: 'SignOff'}}
      />
      <SandQStack.Screen
        name="improvement"
        component={Improvement}
        options={{headerShown: true, title: 'Improvement'}}
      />
      <SandQStack.Screen
        name="addImprovement"
        component={AddImprovement}
        options={{headerShown: true, title: 'AddImprovement'}}
      />
      <SandQStack.Screen
        name="planEquipment"
        component={PlanEquipment}
        options={{headerShown: true, title: 'PlanEquipment'}}
      />
      <SandQStack.Screen
        name="restHour"
        component={RestHour}
        options={{headerShown: true, title: 'RestHour'}}
      />
      <SandQStack.Screen
        name="addRestHour"
        component={AddRestHour}
        options={{headerShown: true, title: 'AddRestHour'}}
      />
    </SandQStack.Navigator>
  );
}

/**
 * Maintenance Management
 */
const MaintenanceStack = createStackNavigator();
function MaintenanceStackScreen() {
  return (
    <MaintenanceStack.Navigator initialRouteName="maintenanceMenu">
      <MaintenanceStack.Screen
        name="maintenanceMenu"
        component={MaintenanceMenuScreen}
        options={{headerShown: true, title: 'Maintenance Menu'}}
      />
      <MaintenanceStack.Screen
        name="pmsList"
        component={PmsList}
        options={{headerShown: true, title: 'List'}}
      />
      <MaintenanceStack.Screen
        name="pmsDetails"
        component={PmsDetailsPage}
        options={{headerShown: true, title: 'PMS Details'}}
      />
      <MaintenanceStack.Screen
        name="jobcard"
        component={PrmsJobCard}
        options={{headerShown: true, title: 'Job card'}}
      />
      <MaintenanceStack.Screen
        name="addPms"
        component={AddPms}
        options={{headerShown: true, title: 'Add New Maintanance'}}
      />
    </MaintenanceStack.Navigator>
  );
}

const AuthStack = createStackNavigator();

const Tab = createBottomTabNavigator();
function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={DashboardStackScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Manage"
        component={DashboardStackScreen}
        options={{
          title: 'Search',
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingListScreen}
        options={{
          title: 'Manage',
          tabBarLabel: 'Setting',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="settings" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={ManageScreen}
        options={{
          title: 'Manage',
          tabBarLabel: 'Menu',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();
const App = (props) => {
  var db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });

  const [state, setstate] = useState(false);

  useEffect(() => {
    initiaLizeData();
    SplashScreen.hide();
  }, []);

  const initiaLizeData = async () => {
    let is_log_in = (await AsyncStorage.getItem('is_log_in')) || 'none';
    setstate(is_log_in);
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <StatusBar backgroundColor="#1C2761" />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={state ? 'Home' : 'login'}
          screenOptions={{
            headerShown: false,
          }}>
          <RootStack.Screen name="Home" component={HomeTabs} />
          <RootStack.Screen name="Settings" component={SettingsScreen} />
          <RootStack.Screen name="Account" component={AccountScreen} />
          <RootStack.Screen name="SettingList" component={SettingListScreen} />
          <RootStack.Screen name="login" component={Login} />
          <RootStack.Screen name="signup" component={Registration} />
        </RootStack.Navigator>
      </NavigationContainer>
      {/* <IappsNetInfo /> */}
      <FlashMessage position="top" />
    </ApplicationProvider>
  );
};
export default App;
