import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
// import gasStation from '../images/gas-station.png';
import * as Animatable from "react-native-animatable";
import { Picker } from "@react-native-community/picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";
// import { Actions } from "react-native-router-flux";
import panicAlert from "../images/dashboard-alert.png";
import emergencyAlert from "../images/dashboard-emergency.png";
import torch from "../images/dashboard-torch.png";
import {
  getUnitList,
  getJobStationList,
  addCheckpoint,
} from "../service/checkpoint/CheckpointService";
import TorchButton from "../components/TorchButton";
import EmergencyButton from "../components/EmergencyButton";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";
// import {dateTimeConvertToDate} from '../Util/DateConfigure'
// import { showFuelReport,showFuelVehilceTypewiseReport, getFuelMonthWiseReport } from '../service/fuel/fuelReportService';

export default class AddCheckpoint extends Component {
  state = {
    system_lang: "bn",
    isModalVisible: false,
    refreshing: false,

    enroll: "",
    error_message: "",

    errorMessage: "",
    successMessage: "",
    isLoading: false,

    checkpointName: "",
    floorId: 0,
    floorName: "",
    floorTypeList: [
      { floorType: "Ground Floor", floorTypeId: 1 },
      { floorType: "First Floor", floorTypeId: 2 },
      { floorType: "Second Floor", floorTypeId: 3 },
      { floorType: "Third Floor", floorTypeId: 4 },
      { floorType: "Fourth Floor", floorTypeId: 5 },
      { floorType: "Fifth Floor", floorTypeId: 6 },
      { floorType: "Sixth Floor", floorTypeId: 7 },
      { floorType: "Seventh Floor", floorTypeId: 8 },
      { floorType: "Eighth Floor", floorTypeId: 9 },
      { floorType: "Ninth Floor", floorTypeId: 10 },
      { floorType: "Tenth Floor", floorTypeId: 11 },
      { floorType: "Eleventh Floor", floorTypeId: 12 },
      { floorType: "Twelveth Floor", floorTypeId: 13 },
      { floorType: "Thirteenth Floor", floorTypeId: 14 },
      { floorType: "Fourteenth Floor", floorTypeId: 15 },
      { floorType: "Fifteenth Floor", floorTypeId: 16 },
      { floorType: "Sixteenth Floor", floorTypeId: 17 },
      { floorType: "Seventeenth Floor", floorTypeId: 18 },
      { floorType: "Eighteenth Floor", floorTypeId: 19 },
      { floorType: "Nineteenth Floor", floorTypeId: 20 },
      { floorType: "Twenty Floor", floorTypeId: 21 },
    ],
    unitId: 0,
    unitName: "",
    unitList: [],
    jobStationId: 0,
    jobStationName: "",
    jobStationList: [],
    latitude: 0,
    longitude: 0,
    zaxis: 0,
    sideName: "",
  };

  async componentDidMount() {
    await this.getAsyncLanguageCode();
    this.initializeData();
  }

  getAsyncLanguageCode = async () => {
    let system_lang = await getAsyncData("system_lang");
    this.setState({ system_lang });
  };

  onRefresh() {
    this.setState({ refreshing: true });
    this.initializeData().then(() => {
      this.setState({ refreshing: false });
    });
  }

  initializeData = async () => {
    //Unit List Data
    let unitListData = await getUnitList();
    this.setState({
      unitList: unitListData,
    });
  };

  selectUnit = async (value, key) => {
    this.setState({
      unitName: value,
      unitId: key,
    });

    //Job Station List Data
    let jobStationListData = await getJobStationList(value);
    this.setState({
      jobStationList: jobStationListData,
    });
  };

  changeCheckpointName = (inputValue) => {
    this.setState({
      checkpointName: inputValue,
    });
  };

  changeLatitude = (inputValue) => {
    this.setState({
      latitude: inputValue,
    });
  };

  changeLongitude = (inputValue) => {
    this.setState({
      longitude: inputValue,
    });
  };

  changeZaxis = (inputValue) => {
    this.setState({
      zaxis: inputValue,
    });
  };

  changeSidename = (inputValue) => {
    this.setState({
      sideName: inputValue,
    });
  };

  submit = async () => {
    if (this.state.checkpointName === "") {
      alert("Please give a checkpoint name");
      return false;
    }
    if (this.state.floorId === 0) {
      alert("Please select a floor");
      return false;
    }
    if (this.state.unitId === 0) {
      alert("Please select a unit");
      return false;
    }
    if (this.state.jobStationId === 0) {
      alert("Please select a job station");
      return false;
    }
    if (this.state.longitude === 0) {
      alert("Please give a longitude");
      return false;
    }
    if (this.state.latitude === 0) {
      alert("Please give a latitude");
      return false;
    }
    if (this.state.zaxis === 0) {
      alert("Please give a zaxis");
      return false;
    }
    if (this.state.sideName === "") {
      alert("Please give a side name");
      return false;
    }
    let checkpointData = {
      strCheckPointName: this.state.checkpointName,
      intFloorID: this.state.floorId,
      intJobStationID: this.state.jobStationId,
      intUnitID: this.state.unitId,
      ysnActive: true,
      decLatitude: this.state.latitude,
      decLongitude: this.state.longitude,
      intZAxis: this.state.zaxis,
      strSideName: this.state.sideName,
    };

    let response = await addCheckpoint(checkpointData);

    console.log("Checkpoint response :>> ", response);

    if (response.data != 0) {
      alert("Checkpoint Created Successfully!");
      this.props.navigation.navigate("hrMenu");
    } else {
      alert("Unsuccessful! Please try again.");
    }
  };

  render() {
    return (
      <ScrollView
        style={[styles.fullbg]}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      >
        <Animatable.View animation="slideInUp">
          <SafeAreaView style={styles.container}>
            <View style={[styles.areaBox]}>
              <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                <View style={{ marginVertical: 20 }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexBasis: "30%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFPercentage(3),
                          fontWeight: "bold",
                        }}
                      >
                        {translate("name", this.state.system_lang)}:{" "}
                      </Text>
                    </View>
                    <View style={{ flexBasis: "70%" }}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Type"
                        placeholderTextColor={"#000000"}
                        value={this.state.checkpointName}
                        onChangeText={(value) =>
                          this.changeCheckpointName(value)
                        }
                      />
                    </View>
                  </View>

                  <Text style={[styles.inputLebel]}>
                    {" "}
                    {translate("select_floor", this.state.system_lang)}{" "}
                  </Text>
                  <View>
                    <Picker
                      selectedValue={this.state.floorName}
                      style={[styles.Vehicle]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          floorName: itemValue,
                          floorId: itemIndex,
                        })
                      }
                    >
                      <Picker.Item label="Select" value="" />
                      {this.state.floorTypeList.map((item, index) => (
                        <Picker.Item
                          label={item.floorType}
                          value={item.floorTypeId}
                          key={index}
                        />
                      ))}
                    </Picker>
                  </View>

                  <Text style={[styles.inputLebel]}>
                    {" "}
                    {translate("select_unit", this.state.system_lang)}{" "}
                  </Text>
                  <View>
                    <Picker
                      selectedValue={this.state.unitName}
                      style={[styles.Vehicle]}
                      // onValueChange={(itemValue, itemIndex) =>
                      //   this.setState({
                      //     unitName: itemValue,
                      //     unitId: itemIndex,
                      //   })
                      // }
                      onValueChange={(itemValue, itemIndex) =>
                        this.selectUnit(itemValue, itemIndex)
                      }
                    >
                      <Picker.Item label="Select" value="" />
                      {this.state.unitList.map((item, index) => (
                        <Picker.Item
                          label={item.strUnit}
                          value={item.intUnitID}
                          key={index}
                        />
                      ))}
                    </Picker>
                  </View>

                  <Text style={[styles.inputLebel]}>
                    {" "}
                    {translate(
                      "select_job_station",
                      this.state.system_lang
                    )}{" "}
                  </Text>
                  <View>
                    <Picker
                      selectedValue={this.state.jobStationName}
                      style={[styles.Vehicle]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          jobStationName: itemValue,
                          jobStationId: itemIndex,
                        })
                      }
                    >
                      <Picker.Item label="Select" value="" />
                      {this.state.jobStationList.map((item, index) => (
                        <Picker.Item
                          label={item.strJobStationName}
                          value={item.intEmployeeJobStationId}
                          key={index}
                        />
                      ))}
                    </Picker>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexBasis: "30%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFPercentage(3),
                          fontWeight: "bold",
                        }}
                      >
                        {translate("latitude", this.state.system_lang)}:{" "}
                      </Text>
                    </View>
                    <View style={{ flexBasis: "70%" }}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Type"
                        placeholderTextColor={"#000000"}
                        value={this.state.latitude}
                        keyboardType={"numeric"}
                        onChangeText={(value) => this.changeLatitude(value)}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexBasis: "30%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFPercentage(3),
                          fontWeight: "bold",
                        }}
                      >
                        {translate("longitude", this.state.system_lang)}:{" "}
                      </Text>
                    </View>
                    <View style={{ flexBasis: "70%" }}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Type"
                        placeholderTextColor={"#000000"}
                        value={this.state.longitude}
                        keyboardType={"numeric"}
                        onChangeText={(value) => this.changeLongitude(value)}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexBasis: "30%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFPercentage(3),
                          fontWeight: "bold",
                        }}
                      >
                        {translate("zaxis", this.state.system_lang)}:{" "}
                      </Text>
                    </View>
                    <View style={{ flexBasis: "70%" }}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Type"
                        placeholderTextColor={"#000000"}
                        value={this.state.zaxis}
                        keyboardType={"numeric"}
                        onChangeText={(value) => this.changeZaxis(value)}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexBasis: "30%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFPercentage(3),
                          fontWeight: "bold",
                        }}
                      >
                        {translate("sidename", this.state.system_lang)}:{" "}
                      </Text>
                    </View>
                    <View style={{ flexBasis: "70%" }}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Type"
                        placeholderTextColor={"#000000"}
                        value={this.state.sideName}
                        onChangeText={(value) => this.changeSidename(value)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <TouchableOpacity onPress={() => this.submit()}>
                <Text style={styles.buttonStyle}>
                  {translate("submit", this.state.system_lang)}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Starts Footer section */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginVertical: 20,
                justifyContent: "space-between",
              }}
            >
              <View style={[styles.footerBox]}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    resizeMode: "contain",
                    marginHorizontal: 10,
                  }}
                  source={panicAlert}
                />
                <Text
                  style={[styles.bodyIconTitle]}
                  // onPress={() => Actions.StartPatrol()}
                >
                  {translate("panic", this.state.system_lang)}
                </Text>
              </View>

              <EmergencyButton
                url={() =>
                  this.props.navigation.navigate("emergencyContactList")
                }
              />

              <TorchButton />
            </View>
            {/* End of Footer section */}
          </SafeAreaView>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: "#fff",
    height: 700,
  },
  container: {
    paddingHorizontal: 12,
    width: "100%",
  },

  inputLebel: {
    fontSize: RFPercentage(2.5),
    textAlign: "left",
    color: "#000000",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  areaBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 3, height: 2 },
    width: "100%",
  },
  Vehicle: {
    color: "#000",
  },
  buttonStyle: {
    backgroundColor: "#1544B3",
    color: "#fff",
    fontSize: RFPercentage(3),
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 35,
    textTransform: "uppercase",
    borderRadius: 10,
  },
  boxBOrder: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginVertical: 5,
    width: "100%",
    borderWidth: 2,
    borderColor: "#D4D4D4",
  },
  date: {
    color: "#000000",
    fontSize: RFPercentage(2),
  },
  driverName: {
    color: "#000000",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
  pumLocation: {
    color: "#000000",
    fontSize: RFPercentage(2.2),
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  fuelLitter: {
    color: "#000000",
    fontSize: RFPercentage(2.2),
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  totalAmount: {
    color: "#000000",
    fontSize: RFPercentage(2.5),
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  totalAmountRate: {
    color: "#2E3192",
    fontSize: RFPercentage(3.5),
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  headerLabel: {
    fontSize: RFPercentage(3.5),
    textAlign: "left",
    color: "#000000",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  InputField: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "300",
    fontFamily: "popppins",
    borderRadius: 0,
    paddingLeft: 5,
    paddingVertical: 12,

    borderBottomColor: "#000",
    borderBottomWidth: 0.6,
  },
  SuccessfulBox: {
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 10,
    height: 250,
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  secSubTitle: {
    color: "#232A2F",
    fontSize: 16,
    textAlign: "center",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
  yesbutton: {
    backgroundColor: "#34C787",
    width: 100,
    height: 40,
    textAlign: "center",
    lineHeight: 40,
    color: "#fff",
    borderRadius: 50,
    marginRight: 10,
    fontSize: RFPercentage(2.5),
  },
  nobutton: {
    backgroundColor: "#D32F2F",
    width: 100,
    height: 40,
    textAlign: "center",
    lineHeight: 40,
    color: "#fff",
    borderRadius: 50,
    fontSize: RFPercentage(2.5),
  },
  footerBox: {
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    marginVertical: 8,
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 23, height: 1 },
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  searchButton: {
    backgroundColor: "green",
    color: "#fff",
    fontSize: RFPercentage(3.2),
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 28,
    textTransform: "uppercase",
    // borderRadius: 5,
  },
});
