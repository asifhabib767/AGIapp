import React, { useEffect, useState } from "react";
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
  RefreshControl,
  FlatList,
  Picker,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import { Radio, Autocomplete, CheckBox } from "@ui-kitten/components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import topbar from "../../images/top-bar.png";
import print from "../../images/print.png";
import {
  Datepicker,
  Layout,
  Toggle,
  Button,
  Input,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import {
  addDepartment,
  departmentSelectHandeling,
  DepartmentInputAddHandling,
  emptyMessage,
  emptyRefreshControl,
} from "../../actions/distribution/distributionAction";
import IAppsSelect from "../../../Master/components/select/IAppsSelect";
import {
  GetBusinessDropdown,
  GetStatusDropdown,
} from "../../actions/dropdown/DropdownAction";
import IAppsInput from "../../../Master/components/input/IAppsInput";
import { showMessage, hideMessage } from "react-native-flash-message";
import GlobalStyles from "./../../../Master/styles/GlobalStyles";
import { getTripListByUnitId } from "./../../actions/distribution/TripAssignedAction";
import CustomSearchbar from "./../../../Master/components/CustomSearchBar";

const TripAssignScreen = (props) => {
  const checkboxState = (initialCheck = false) => {
    const [checked, setChecked] = React.useState(initialCheck);
    return { checked, onChange: setChecked };
  };

  const loadingSlipCheck = checkboxState();
  const challanCheck = checkboxState();

  const [checked, setChecked] = React.useState(false);

  const [refreshing, setrefreshing] = React.useState(false);

  const [state, setState] = useState({
    tripList: [],
    searchtripList: [],
    searchRequestText: "",
  });

  useEffect(() => {
    initializaAllDatas();
  }, []);
  const initializaAllDatas = async () => {
    let tripList = await getTripListByUnitId();
    console.log("tripList", tripList);
    const cloneObj = { ...this.state };
    cloneObj.tripList = tripList.data;
    setState(cloneObj);
  };

  const searchText = (value) => {
    searchFilterFunction(value);
  };

  const searchFilterFunction = (searchRequestText) => {
    const cloneObj = { ...state };
    if (searchRequestText.length > 0) {
      const newData = state.tripList.filter(function (item) {
        const itemData =
          item.strShippingPointName + " " + item.strTripCode.toUpperCase();
        const textData = searchRequestText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log("newData", newData);
      cloneObj.searchtripList = newData;
      cloneObj.searchRequestText = searchRequestText;
      setState(cloneObj);
    } else {
      cloneObj.searchtripList = state.tripList;
      cloneObj.searchRequestText = "";
      setState(cloneObj);
    }
  };

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
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexBasis: "65%" }}>
                  <Text style={[styles.headerTitle]}> LOADING SLIP </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.headerStyle, GlobalStyles.boxShadow]}>
            <View style={{ flex: 1, flexDirection: "row", flexBasis: "88%" }}>
              <CheckBox
                style={styles.checkbox}
                status="primary"
                {...loadingSlipCheck}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Loading Slip
                </Text>
              </CheckBox>
              <CheckBox
                style={styles.checkbox}
                status="primary"
                {...challanCheck}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Challan
                </Text>
              </CheckBox>
            </View>
            <View style={{ flexBasis: "20%" }}>
              <TouchableOpacity>
                <Image
                  source={print}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 5,
  },

  masterInput: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  statusLoading: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 10,
  },
  statusTextsq: {
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: 5,
  },

  statusTextsqq: {
    marginBottom: 24,
    fontWeight: "bold",
    marginTop: 5,
    color: "#2163D8",
  },

  stutusBox: {
    width: wp("25%"),
  },
  statusbg: {
    backgroundColor: "#2163D8",
    padding: 10,
  },

  buttons: {
    marginBottom: 5,
    width: 80,
    height: 35,
    borderRadius: 10,
  },

  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  dropdownText: {
    color: "#ccc",
  },
  radioContain: {
    flex: 1,
    flexDirection: "row",
  },

  containers: {
    backgroundColor: "#f1f1f1",
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: "#E8E8E8",
    borderLeftColor: "#E8E8E8",
    borderRightColor: "#E8E8E8",
    borderBottomColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 2,
  },

  logicStics: {
    fontWeight: "bold",
  },

  topbar: {
    marginTop: -0,
    width: width,
    height: height / 5.5,
    resizeMode: "contain",
  },
  postionbox: {
    position: "relative",
  },
  headerDetails: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: RFPercentage(4),
    fontWeight: "normal",
    paddingVertical: 10,
  },
  button: {
    marginTop: 35,
    marginBottom: 35,
  },
  emplyeeTitle: {
    color: "#202B35",
    fontSize: RFPercentage(2.7),
    fontWeight: "bold",
    marginLeft: -5,
  },
  employeeid: {
    color: "#202B35",
    fontSize: RFPercentage(2.5),
    marginRight: 20,
  },
  employeeidguard: {
    color: "#202B35",
    fontSize: RFPercentage(2.5),
  },
  icon: {
    width: 32,
    height: 32,
  },
  maxHeight: {
    height: hp("100%"),
  },
  logInputStyle: {
    backgroundColor: "#f1f1f1",
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: "#E8E8E8",
    borderLeftColor: "#E8E8E8",
    borderRightColor: "#E8E8E8",
    borderBottomColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 2,
    height: 55,
  },

  containers: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  radio: {
    margin: 1,
    fontSize: 10,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: "#3366FF",
  },
  qrImage: {
    width: 60,
    height: 60,
  },
  headerStyle: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  employeeName: {
    fontWeight: "bold",
    fontSize: RFPercentage(2.2),
  },
  muteInfo: {
    color: "gray",
  },
  checkbox: {
    margin: 15,
  },
});
export default TripAssignScreen;
