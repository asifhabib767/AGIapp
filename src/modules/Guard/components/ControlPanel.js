import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

import styles from "../components/Style";
import Avatar from "../images/avatar.png";
import AsyncStorage from "@react-native-community/async-storage";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import { RFPercentage } from "react-native-responsive-fontsize";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";

export default class ControlPanel extends Component {
  state = {
    system_lang: "bn",
    strEmployeeName: "",
    strEmployeeEmail: "",
  };

  logout = async () => {
    try {
      await AsyncStorage.removeItem("is_logged_in");
      Actions.login();
    } catch (e) {
      console.log("Done.");
    }
    console.log("Done.");
  };

  async componentDidMount() {
    await this.getAsyncLanguageCode();
    try {
      let userData = (await AsyncStorage.getItem("userData")) || "none";
      // this.setState({name:JSON.parse(name)});
      let dataParse = JSON.parse(userData);
      this.setState({
        strEmployeeName: dataParse.strEmployeeName,
        strEmployeeEmail: dataParse.strOfficeEmail,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  getAsyncLanguageCode = async () => {
    let system_lang = await getAsyncData("system_lang");
    this.setState({ system_lang });
  };

  render() {
    return (
      <ScrollView style={styles.controlPanel}>
        <SafeAreaView>
          <ImageBackground style={{ width: "100%", height: "100%" }}>
            <View style={[styling.SideBarBg]}>
              <LinearGradient
                colors={["#2E3192", "#2E3192"]}
                style={styles.linearGradient}
              >
                <TouchableOpacity onPress={() => Actions.userProfileEdit()}>
                  <View style={[styling.userCardBox]}>
                    <View style={{ width: 80 }}>
                      {this.state.strEmployeeEmail ==
                        "mijanur.accl@akij.net" && (
                        <Image
                          style={[styling.userImage]}
                          style={{ width: 50, height: 50, marginTop: 15 }}
                          source={{ uri: "https://i.ibb.co/0hYgYyc/user.jpg" }}
                        />
                      )}

                      {this.state.strEmployeeEmail !=
                        "mijanur.accl@akij.net" && (
                        <Image style={[styling.userImage]} source={Avatar} />
                      )}
                    </View>

                    <View style={{ width: "80%" }}>
                      <Text style={[styling.userName]}>
                        {this.state.strEmployeeName}
                      </Text>
                      <Text style={[styling.status]}>
                        {translate("active", this.state.system_lang)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
              <View style={[styling.menuTest]}>
                <View>
                  <TouchableOpacity onPress={() => Actions.dashboard()}>
                    <Text style={[styling.item]}>
                      {translate("dashboard", this.state.system_lang)}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.Activity()}>
                    <Text style={[styling.item]}>
                      {translate("activity", this.state.system_lang)}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.hrattendance()}>
                    <Text style={[styling.item]}>
                      {translate("attendence", this.state.system_lang)}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.IncidentList()}>
                    <Text style={[styling.item]}>
                      {translate("incident", this.state.system_lang)}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.Audit()}>
                    <Text style={[styling.item]}>
                      {translate("audit", this.state.system_lang)}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.Setting()}>
                    <Text style={[styling.item]}>
                      {translate("settings", this.state.system_lang)}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => Actions.Training()}>
                    <Text style={[styling.item]}>
                      {translate("training", this.state.system_lang)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ width: "50%" }}>
                  <TouchableOpacity onPress={this.logout}>
                    <Text style={[styling.LogOut]}>
                      <Icon name="power-off" size={20} color="#E00100" />
                      &nbsp; {translate("logout", this.state.system_lang)}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ width: "50%" }}>
                  <TouchableOpacity onPress={() => Actions.help()}>
                    <Text style={[styling.Help]}>
                      <Icon name="question-circle" size={20} color="#2D2D2D" />
                      &nbsp; {translate("help", this.state.system_lang)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const styling = StyleSheet.create({
  SideBarBg: {
    flex: 1,
    width: "100%",
  },
  userCardBox: {
    width: "100%",
    flex: 0.1,
    flexDirection: "row",
    paddingVertical: 25,
    marginTop: 20,
    height: "100%",
  },

  userImage: {
    width: 70,
    height: 70,
    marginTop: 5,
    borderRadius: 50,
    margin: 10,
    padding: 5,
    paddingVertical: 30,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    paddingLeft: 15,
    paddingTop: 10,
  },

  status: {
    color: "#fff",
    fontSize: 16,
    borderRadius: 50,
    marginTop: 5,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#29BCA3",
    width: 80,
    marginLeft: 10,
    lineHeight: 30,
    textAlign: "center",
  },

  item: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    width: "90%",
    marginLeft: 40,
    borderBottomColor: "#000",
    borderBottomWidth: 0.55,
  },

  menuTest: {
    marginTop: 15,
    marginLeft: -15,
  },
  LogOut: {
    fontSize: RFPercentage(2.5),
    color: "#2D2D2D",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 7,
    paddingVertical: 20,
    marginHorizontal: 10,
    marginLeft: 20,
  },
  Help: {
    fontSize: RFPercentage(2.5),
    color: "#2D2D2D",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 7,
    paddingVertical: 20,
    marginHorizontal: 10,
    marginLeft: 20,
  },
  powser: {
    width: 25,
    height: 25,
  },
});
