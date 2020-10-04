import {combineReducers} from 'redux';
import LoginReducer from '../../modules/User/reducers/LoginReducer';
import DepartmentReducer from '../../modules/HR/reducers/department/DepartmentReducer';
import DropdownReducer from '../../modules/HR/reducers/dropdown/DropdownReducer';
import DistributionReducer from './../../modules/Distribution/reducers/department/DistributionReducer';
import AuthReducer from '../../modules/User/reducers/AuthReducer';
import UnloadVehicleReducer from '../../modules/Distribution/reducers/unloadvehicle/UnloadVehicleReducer';
import LoadedVehicleReducer from '../../modules/Distribution/reducers/loadedvvehicle/LoadedVehicleReducer';
import VoyageReducer from '../../modules/Voyage/reducers/VoyageReducer';

const RootReducer = combineReducers({
  login: LoginReducer,
  department: DepartmentReducer,
  distribution: DistributionReducer,
  dropdown: DropdownReducer,
  unloadVehicle: UnloadVehicleReducer,
  loadedvehicle: LoadedVehicleReducer,
  auth: AuthReducer,

  // Voyage
  voyage: VoyageReducer,
});

export default RootReducer;
