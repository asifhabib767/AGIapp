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
  getCheckpointList,
  updateQrCode,
} from "../service/checkpoint/CheckpointService";
import TorchButton from "../components/TorchButton";
import EmergencyButton from "../components/EmergencyButton";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";
// import {dateTimeConvertToDate} from '../Util/DateConfigure'
// import { showFuelReport,showFuelVehilceTypewiseReport, getFuelMonthWiseReport } from '../service/fuel/fuelReportService';

export default class CreateQrCodeScreen extends Component {
  state = {
    system_lang: "bn",
    isModalVisible: false,
    refreshing: false,

    floorType: "",
    floorTypeId: 0,
    error_message: "",

    errorMessage: "",
    successMessage: "",
    isLoading: false,

    floorTypeList: [
      { floorName: "Ground Floor", floorId: 1 },
      { floorName: "First Floor", floorId: 2 },
      { floorName: "Second Floor", floorId: 3 },
      { floorName: "Third Floor", floorId: 4 },
      { floorName: "Fourth Floor", floorId: 5 },
      { floorName: "Fifth Floor", floorId: 6 },
      { floorName: "Sixth Floor", floorId: 7 },
      { floorName: "Seventh Floor", floorId: 8 },
      { floorName: "Eighth Floor", floorId: 9 },
      { floorName: "Ninth Floor", floorId: 10 },
      { floorName: "Tenth Floor", floorId: 11 },
      { floorName: "Eleventh Floor", floorId: 12 },
      { floorName: "Twelveth Floor", floorId: 13 },
      { floorName: "Thirteenth Floor", floorId: 14 },
      { floorName: "Fourteenth Floor", floorId: 15 },
      { floorName: "Fifteenth Floor", floorId: 16 },
      { floorName: "Sixteenth Floor", floorId: 17 },
      { floorName: "Seventeenth Floor", floorId: 18 },
      { floorName: "Eighteenth Floor", floorId: 19 },
      { floorName: "Nineteenth Floor", floorId: 20 },
      { floorName: "Twenty Floor", floorId: 21 },
    ],
    unitId: 0,
    unitName: "",
    unitList: [],
    jobStationId: 0,
    jobStationName: "",
    jobStationList: [],
    checkpointId: 0,
    checkpointName: "",
    checkpointSelected: {},
    checkpointList: [],
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
    this.initializeReport().then(() => {
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
      checkpointList: [],
    });

    //Job Station List Data
    let jobStationListData = await getJobStationList(value);
    this.setState({
      jobStationList: jobStationListData,
    });
  };

  selectFloor = async (value, key) => {
    this.setState({
      floorType: value,
      floorTypeId: key,
    });

    //Checkpoint List Data
    let checkpointListData = await getCheckpointList(
      this.state.unitId,
      this.state.jobStationId,
      value
    );
    this.setState({
      checkpointList: checkpointListData,
    });
  };

  changeCheckpointName = (inputValue) => {
    this.setState({
      checkpointName: inputValue,
    });
  };

  submit = async () => {
    if (this.state.unitId === 0) {
      alert("Please select a unit");
      return false;
    }
    if (this.state.jobStationId === 0) {
      alert("Please select a job station");
      return false;
    }
    if (this.state.floorTypeId === 0) {
      alert("Please select a floor");
      return false;
    }
    if (this.state.checkpointName === "") {
      alert("Please write a checkpoint name");
      return false;
    }

    let qrCode =
      "U" +
      this.state.unitId +
      "J" +
      this.state.jobStationId +
      "F" +
      this.state.floorTypeId +
      "C" +
      this.state.checkpointId;

    // Store QR Code in Database
    let response = await updateQrCode(this.state.checkpointId, qrCode);

    if (response.data.status === true) {
      let data = {
        intUnitID: this.state.unitId,
        intJobStationId: this.state.jobStationId,
        intFloorId: this.state.floorTypeId,
        intCheckpointId: this.state.checkpointId,
      };

      this.props.navigation.navigate("generateQr", {
        qrData: data,
      });
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
              <View>
                <Text style={[styles.headerLabel]}>
                  {translate("create_qr_code", this.state.system_lang)}
                </Text>
              </View>
              <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                <Text style={[styles.inputLebel]}>
                  {" "}
                  {translate("select_unit", this.state.system_lang)}{" "}
                </Text>
                <View>
                  <Picker
                    selectedValue={this.state.unitName}
                    style={[styles.Vehicle]}
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
              </View>

              <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                <Text style={[styles.inputLebel]}>
                  {" "}
                  {translate("select_job_station", this.state.system_lang)}{" "}
                </Text>
                <View>
                  <Picker
                    selectedValue={this.state.jobStationName}
                    style={[styles.Vehicle]}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        jobStationName: itemValue,
                        jobStationId: itemIndex,
                        checkpointList: [],
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
              </View>

              <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                <Text style={[styles.inputLebel]}>
                  {" "}
                  {translate("select_floor", this.state.system_lang)}{" "}
                </Text>
                <View>
                  <Picker
                    selectedValue={this.state.floorType}
                    style={[styles.Vehicle]}
                    // onValueChange={(itemValue, itemIndex) =>
                    //   this.setState({
                    //     floorType: itemValue,
                    //     floorTypeId: itemIndex,
                    //   })
                    // }
                    onValueChange={(itemValue, itemIndex) =>
                      this.selectFloor(itemValue, itemIndex)
                    }
                  >
                    <Picker.Item label="Select" value="" />
                    {this.state.floorTypeList.map((item, index) => (
                      <Picker.Item
                        label={item.floorName}
                        value={item.floorId}
                        key={index}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                <Text style={[styles.inputLebel]}>
                  {" "}
                  {translate("select_checkpoint", this.state.system_lang)}{" "}
                </Text>
                <View>
                  <Picker
                    selectedValue={this.state.checkpointSelected}
                    style={[styles.Vehicle]}
                    onValueChange={(itemValue) =>
                      this.setState({
                        checkpointName: itemValue.strCheckPointName,
                        checkpointId: itemValue.intID,
                        checkpointSelected: itemValue,
                      })
                    }
                  >
                    <Picker.Item label="Select" value="" />
                    {this.state.checkpointList.map((item, index) => (
                      <Picker.Item
                        label={item.strCheckPointName}
                        value={item}
                        key={index}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <TouchableOpacity onPress={() => this.submit()}>
                <Text style={styles.buttonStyle}>
                  {translate("create", this.state.system_lang)}
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
});