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
import { getQRCodeList } from "../service/checkpoint/CheckpointService";
import { currentdate } from "../Util/DateConfigure";
import TorchButton from "../components/TorchButton";
import EmergencyButton from "../components/EmergencyButton";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";

export default class QRCodeList extends Component {
  state = {
    system_lang: "bn",
    refreshing: false,
    comment: "Write a note",
    error_comment: "",

    errorMessage: "",
    successMessage: "",
    isLoading: false,

    isChecked: false,
    qrCodeListData: [],
    today: "",
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
    // Checkpoint Summary List Data
    let qrCodeData = await getQRCodeList();
    this.setState({
      qrCodeListData: qrCodeData,
    });
    this.setState({
      today: await currentdate(),
    });
  };

  generateQR = async (value) => {
    let data = {
      intUnitID: value.intUnitID,
      intJobStationId: value.intJobStationID,
      intFloorId: value.intFloorID,
      intCheckpointId: value.intID,
    };

    this.props.navigation.navigate("generateQr", {
      qrData: data,
    });
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
              <View style={{ flex: 1, flexDirection: "row", marginBottom: 20 }}>
                <View style={{ flexBasis: "80%" }}>
                  <Text style={[styles.headerLabel]}>
                    {translate("qr_code_list", this.state.system_lang)}
                  </Text>
                </View>

                <View style={{ flexBasis: 90, paddingTop: 1 }}>
                  <Text style={[styles.inputLebel]}>{this.state.today}</Text>
                </View>
              </View>

              <View
                style={{ flex: 1, flexDirection: "row", marginVertical: 5 }}
              >
                <View style={{ flexBasis: "75%" }}>
                  <Text style={[styles.shipmentNo]}>
                    {translate("checkpoint_name", this.state.system_lang)}
                  </Text>
                </View>

                <View style={{ flexBasis: 90, paddingTop: 1 }}>
                  <Text style={{ color: "#000000", fontWeight: "bold" }}>
                    {translate("qr_code", this.state.system_lang)}
                  </Text>
                </View>
              </View>
              {this.state.qrCodeListData.map((item, index) => (
                <TouchableOpacity onPress={() => this.generateQR(item)}>
                  <View>
                    <View style={[styles.floorDetails]}>
                      <View style={{ flexBasis: "80%" }}>
                        <Text style={[styles.floorName]}>
                          {item.strCheckPointName}
                        </Text>
                      </View>

                      <View style={{ flexBasis: 85, paddingTop: 1 }}>
                        <Text style={{ color: "#44588A" }}>
                          {item.strQRCode}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
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
    // textTransform: "capitalize",
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
  floorDetails: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#E2EEFF",
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  floorName: {
    fontSize: RFPercentage(2.4),
    color: "#44588A",
    fontWeight: "bold",
  },
});
