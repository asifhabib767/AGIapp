import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Button,
  RefreshControl,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import marker1 from "../images/marker-1.png";
import marker2 from "../images/marker-2.png";
import qrCode from "../images/qr-code.png";
import icon1 from "../images/dashboard-icon1.png";
import icon2 from "../images/dashboard-icon2.png";
import icon3 from "../images/dashboard-icon3.png";
import icon4 from "../images/dashboard-icon4.png";
import icon5 from "../images/dashboard-icon5.png";
import icon6 from "../images/dashboard-icon6.png";
import panicAlert from "../images/dashboard-alert.png";
import emergencyAlert from "../images/dashboard-emergency.png";
import torch from "../images/dashboard-torch.png";
import { Actions } from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";
import TorchButton from "../components/TorchButton";
import {
  getCompletedCheckpoint,
  getMissedCheckpoint,
} from "../service/checkpoint/CheckpointService";
import EmergencyButton from "../components/EmergencyButton";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";
import Header from "./../../Master/components/header/Header";

// import * as LocalizeHelper from '../Util/LocalizeHelper';
// import * as RNLocalize from "react-native-localize";

export default class AppDashborad extends Component {
  state = {
    strEmployeeName: "",
    strDesignation: "",

    system_lang: "bn",
    refreshing: false,
    completedRound: [],
    missedCheckpoint: [],
  };

  async componentDidMount() {
    await this.getAsyncLanguageCode();
    this.initializeData();
    this.getProfile();
  }

  getAsyncLanguageCode = async () => {
    let system_lang = await getAsyncData("system_lang");
    this.setState({ system_lang });
  };

  initializeData = async () => {
    // Completed Round Data
    let completedRoundData = await getCompletedCheckpoint();
    this.setState({
      completedRound: completedRoundData.length,
    });

    // Missed Checkpoint Data
    let missedCheckpointData = await getMissedCheckpoint();
    this.setState({
      missedCheckpoint: missedCheckpointData.length,
    });
  };

  getProfile = async () => {
    let userData = (await AsyncStorage.getItem("userData")) || "none";
    let dataParse = JSON.parse(userData);
    this.setState({
      strEmployeeName: dataParse.tokenData.userData.strEmployeeName,
      strDesignation: dataParse.tokenData.userData.strDesignation,
    });
  };

  onRefresh() {
    this.setState({ refreshing: true });
    this.initializeData().then(() => {
      this.setState({ refreshing: false });
    });
  }

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
        <SafeAreaView style={[styles.container]}>
          <Header
            title={this.state.strEmployeeName}
            subtitle={this.state.strDesignation}
          />
          {/* Starts Round Counter Section */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={[styles.gridBox]}>
              <View style={{ flexBasis: 60 }}>
                <Image
                  style={{ width: 40, resizeMode: "contain" }}
                  source={marker1}
                />
              </View>

              <View style={{ flexBasis: "70%" }}>
                <Text style={[styles.number]}>
                  {" "}
                  {this.state.completedRound}
                </Text>
                <Text style={[styles.title]}>
                  {" "}
                  {translate("completed_rounds", this.state.system_lang)}{" "}
                </Text>
              </View>
            </View>
            <View style={[styles.gridBox]}>
              <View style={{ flexBasis: 60 }}>
                <Image
                  style={{ width: 40, resizeMode: "contain" }}
                  source={marker2}
                />
              </View>

              <View style={{ flexBasis: "70%" }}>
                <Text style={[styles.number]}>
                  {this.state.missedCheckpoint}
                </Text>
                <Text style={[styles.title]}>
                  {" "}
                  {translate("missed_checkpoints", this.state.system_lang)}{" "}
                </Text>
              </View>
            </View>
          </View>
          {/* End of Round Counter Section */}

          {/* Starts Scan Section */}
          <View style={[styles.scanGridBox]}>
            <View style={{ flexBasis: "60%" }}>
              <Text style={[styles.scanTitle]}>
                {translate("scan_checkpoints", this.state.system_lang)}
              </Text>
              <Text
                style={[styles.scanButton]}
                // onPress={() => Actions.StartPatrol()}
                onPress={() => this.props.navigation.navigate("startPatrol")}
              >
                {translate("start_patrol", this.state.system_lang)}
              </Text>
            </View>
            <TouchableOpacity
              style={{ flexBasis: "40%" }}
              onPress={() => this.props.navigation.navigate("createQr")}
            >
              <Image
                style={{ width: "80%", height: "100%", marginHorizontal: 20 }}
                source={qrCode}
              />
            </TouchableOpacity>
          </View>
          {/* End of Scan Section */}

          {/* Starts Body Section */}

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              style={[styles.bodyBox]}
              // onPress={() => Actions.Activity()}
              onPress={() => this.props.navigation.navigate("activity")}
            >
              <Image
                style={{ height: 50, width: 50, resizeMode: "contain" }}
                source={icon1}
              />
              <Text style={[styles.bodyIconTitle]}>
                {translate("activity", this.state.system_lang)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bodyBox]}
              // onPress={() => Actions.GateInOutList()}
              onPress={() => this.props.navigation.navigate("gateInOutList")}
            >
              <Image
                style={{
                  height: 50,
                  width: 50,
                  resizeMode: "contain",
                  marginHorizontal: 10,
                }}
                source={icon2}
              />
              <Text style={[styles.bodyIconTitle]}>
                {translate("gate_in_out", this.state.system_lang)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bodyBox]}
              // onPress={() => Actions.IncidentList()}
              onPress={() => this.props.navigation.navigate("incidentList")}
            >
              <Image
                style={{
                  height: 50,
                  width: 50,
                  resizeMode: "contain",
                  marginHorizontal: 10,
                }}
                source={icon3}
              />
              <Text style={[styles.bodyIconTitle]}>
                {translate("incident", this.state.system_lang)}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={[styles.bodyBox]}
              // onPress={() => Actions.Audit()}
              onPress={() => this.props.navigation.navigate("audit")}
            >
              <Image
                style={{ height: 50, width: 50, resizeMode: "contain" }}
                source={icon4}
              />
              <Text style={[styles.bodyIconTitle]}>
                {translate("audit", this.state.system_lang)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bodyBox]}
              // onPress={() => Actions.Training()}
              onPress={() => this.props.navigation.navigate("training")}
            >
              <Image
                style={{
                  height: 50,
                  width: 50,
                  resizeMode: "contain",
                  marginHorizontal: 10,
                }}
                source={icon5}
              />
              <Text style={[styles.bodyIconTitle]}>
                {translate("training", this.state.system_lang)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bodyBox]}
              // onPress={() => Actions.Pim()}
              onPress={() => this.props.navigation.navigate("pim")}
            >
              <Image
                style={{
                  height: 50,
                  width: 50,
                  resizeMode: "contain",
                  marginHorizontal: 10,
                }}
                source={icon6}
              />
              <Text style={[styles.bodyIconTitle]}>
                {translate("pim", this.state.system_lang)}
              </Text>
            </TouchableOpacity>
          </View>
          {/* End of Body Section */}

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
              <Text style={[styles.bodyIconTitle]}>
                {translate("panic", this.state.system_lang)}
              </Text>
            </View>

            <EmergencyButton
              url={() => this.props.navigation.navigate("emergencyContactList")}
            />
            <TorchButton />
          </View>
          {/* End of Footer section */}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 8,
    paddingTop: 10,
    backgroundColor: "#F2F8FF",
  },
  gridBox: {
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 4,
    marginVertical: 8,
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 23, height: 113 },
    width: "50%",
    height: 100,
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  number: {
    fontSize: RFPercentage(4),
    color: "#171717",
  },
  title: {
    fontSize: RFPercentage(2.5),
    color: "#171717",
  },
  scanGridBox: {
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 4,
    marginVertical: 8,
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 23, height: 113 },
    height: 150,
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
    padding: 10,
  },
  scanTitle: {
    fontSize: RFPercentage(3.5),
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  scanButton: {
    textAlign: "center",
    color: "#FFFFFF",
    backgroundColor: "#1544B3",
    borderRadius: 100,
    lineHeight: 70,
    fontSize: RFPercentage(3),
    textTransform: "uppercase",
    marginTop: 15,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  bodyBox: {
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 4,
    marginVertical: 8,
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 23, height: 113 },
    width: "33%",
    height: 120,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyIconTitle: {
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 5,
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
