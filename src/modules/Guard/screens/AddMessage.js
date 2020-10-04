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
import { getMessageType, addMessage } from "../service/message/MessageService";
import TorchButton from "../components/TorchButton";
import EmergencyButton from "../components/EmergencyButton";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";
// import {dateTimeConvertToDate} from '../Util/DateConfigure'
// import { showFuelReport,showFuelVehilceTypewiseReport, getFuelMonthWiseReport } from '../service/fuel/fuelReportService';

export default class AddMessage extends Component {
  state = {
    system_lang: "bn",
    isModalVisible: false,
    refreshing: false,

    messageType: "",
    messageTypeId: 0,
    message: "Write a message",
    error_message: "",

    errorMessage: "",
    successMessage: "",
    isLoading: false,

    messageTypeList: [],
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
    // Vehicle Type List Data
    let messageTypeData = await getMessageType();
    this.setState({
      messageTypeList: messageTypeData,
    });
  };

  changeMessage = (inputValue) => {
    this.setState({
      message: inputValue,
    });
  };

  submit = async () => {
    let postData = [
      {
        intMessageid: this.state.messageTypeId,
        strmessages: this.state.message,
      },
    ];

    let response = await addMessage(postData);

    if (response.data != 0) {
      alert("Message sent successfully");
      this.props.navigation.navigate("startPatrol");
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
                  {translate("messages", this.state.system_lang)}
                </Text>
              </View>
              <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                <Text style={[styles.inputLebel]}>
                  {" "}
                  {translate("type", this.state.system_lang)}{" "}
                </Text>
                <View>
                  <Picker
                    selectedValue={this.state.messageType}
                    style={[styles.Vehicle]}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        messageType: itemValue,
                        messageTypeId: itemIndex,
                      })
                    }
                  >
                    <Picker.Item label="Select" value="" />
                    {this.state.messageTypeList.map((item, index) => (
                      <Picker.Item
                        label={item.strIncidentMessage}
                        value={item.intID}
                        key={index}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                <Text style={[styles.inputLebel]}>
                  {" "}
                  {translate("message", this.state.system_lang)}{" "}
                </Text>
                <View>
                  <View style={{ flexBasis: "100%" }}>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="Type"
                      placeholderTextColor={"#000000"}
                      value={this.state.message}
                      onChangeText={(value) => this.changeMessage(value)}
                    />

                    {this.state.error_message.length > 0 && (
                      <Text style={{ color: "red" }}>
                        {this.state.error_message}
                      </Text>
                    )}
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
                  // onPress={() => Actions.StartPatrol()}
                >
                  {translate("panic", this.state.system_lang)}
                </Text>
              </View>

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

              <EmergencyButton
                url={() =>
                  this.props.navigation.navigate("emergencyContactList")
                }
              />

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
});
