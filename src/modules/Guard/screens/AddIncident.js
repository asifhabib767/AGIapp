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
  CheckBox,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Animatable from "react-native-animatable";
import { Picker } from "@react-native-community/picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import panicAlert from "../images/dashboard-alert.png";
import emergencyAlert from "../images/dashboard-emergency.png";
import torch from "../images/dashboard-torch.png";
import {
  addIncidentType,
  getIncidentType,
} from "../service/incident/IncidentService";
import TorchButton from "../components/TorchButton";
import EmergencyButton from "../components/EmergencyButton";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";

export default class AddIncident extends Component {
  state = {
    system_lang: "bn",
    refreshing: false,
    comment: "Write a note",
    error_comment: "",

    errorMessage: "",
    successMessage: "",
    isLoading: false,

    isChecked: false,
    incidentTypeList: [],
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
    // Type List Data
    let incidentTypeData = await getIncidentType();
    this.setState({
      incidentTypeList: incidentTypeData,
    });
  };

  addIncidentData = async (e, itemData, index) => {
    let incidentTypeList = this.state.incidentTypeList;
    incidentTypeList[index].isChecked = e;
    this.setState(incidentTypeList);
  };

  changeComment = (inputValue) => {
    this.setState({
      comment: inputValue,
    });
  };

  submit = async () => {
    let checkedData = [];
    this.state.incidentTypeList.forEach((element) => {
      if (element.isChecked === true) {
        element.comment = this.state.comment;
        checkedData.push(element);
      }
    });
    if (checkedData.length != 0) {
      let response = await addIncidentType(checkedData);
      if (response.data != 0) {
        alert("Incident added successfully");
        this.props.navigation.navigate("startPatrol");
      } else {
        alert("Unsuccessful! Please try again.");
      }
    } else {
      alert("Please select an incident.");
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
                  {translate("add_incident", this.state.system_lang)}
                </Text>
              </View>
              <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                <Text style={[styles.inputLebel]}>
                  {" "}
                  {translate(
                    "suspicious_activity",
                    this.state.system_lang
                  )}{" "}
                </Text>
              </View>

              {this.state.incidentTypeList.map((item, index) => (
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ flexBasis: "70%" }}>
                    <Text style={[styles.shipmentNo]}>
                      {item.strIncidentName}
                    </Text>
                  </View>

                  <View style={{ flexBasis: 30, paddingTop: 1 }}>
                    <CheckBox
                      value={item.isChecked}
                      onValueChange={(e) =>
                        this.addIncidentData(e, item, index)
                      }
                      style={styles.checkbox}
                    />
                  </View>
                </View>
              ))}

              <View>
                <View
                  style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
                >
                  <Text style={[styles.inputLebel]}> Comments </Text>
                  <View>
                    <View style={{ flexBasis: "100%" }}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Type here"
                        placeholderTextColor={"#000000"}
                        value={this.state.comment}
                        onChangeText={(value) => this.changeComment(value)}
                      />

                      {this.state.error_comment.length > 0 && (
                        <Text style={{ color: "red" }}>
                          {this.state.error_comment}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <TouchableOpacity onPress={() => this.submit()}>
                <Text style={styles.buttonStyle}>
                  {translate("send", this.state.system_lang)}
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
                  onPress={() => Actions.StartPatrol()}
                >
                  {translate("panic", this.state.system_lang)}
                </Text>
              </View>

              <EmergencyButton
                url={() =>
                  this.props.navigation.navigate("emergencyContactList")
                }
              />

              {/* <View style={[styles.footerBox, { backgroundColor: "#E04236" }]}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    resizeMode: "contain",
                    marginHorizontal: 10,
                  }}
                  source={emergencyAlert}
                />
                <Text
                  style={[styles.bodyIconTitle, { color: "#FFFFFF" }]}
                  onPress={() => Actions.StartPatrol()}
                >
                  Emergency
                </Text>
              </View> */}

              {/* <View style={[styles.footerBox]}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    resizeMode: "contain",
                    marginHorizontal: 10,
                  }}
                  source={torch}
                />
                <Text
                  style={[styles.bodyIconTitle]}
                  onPress={() => Actions.StartPatrol()}
                >
                  Torch
                </Text>
              </View> */}

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
  shipmentNo: {
    fontSize: RFPercentage(2.4),
    color: "#000000",
    fontWeight: "bold",
  },
});
