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
import Icon from "react-native-vector-icons/FontAwesome";
import map from "../images/map.png";
import scan from "../images/scan.png";
import group from "../images/group.png";
import problem from "../images/problem.png";
import comment from "../images/comment.png";
import panicAlert from "../images/dashboard-alert.png";
import emergencyAlert from "../images/dashboard-emergency.png";
import torch from "../images/dashboard-torch.png";
import { Actions } from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";
import { currentdate } from "../Util/DateConfigure";
import TorchButton from "../components/TorchButton";
import EmergencyButton from "../components/EmergencyButton";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";

// import * as LocalizeHelper from '../Util/LocalizeHelper';
// import * as RNLocalize from "react-native-localize";

export default class StartPatrol extends Component {
  state = {
    system_lang: "bn",
    refreshing: false,
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

  initializeData = async () => {
    this.setState({
      today: await currentdate(),
    });
  };

  onRefresh() {
    this.setState({ refreshing: true });
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
          {/* Starts Map Section */}
          <View style={[styles.mapBox]}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flexBasis: "50%" }}>
                <Text style={[styles.mapTitle]}>
                  {translate("patrolling", this.state.system_lang)}
                </Text>
                <Text>
                  <Icon name="map-marker" size={23} color="#1544B3" />
                  2nd Floor, Akij House
                </Text>
              </View>

              <View style={{ flexBasis: "50%" }}>
                <Text style={[styles.mapDate]}>{this.state.today}</Text>
              </View>
            </View>

            {/* <View style={{ flex: 1, flexBasis: "100%" }}>
              <Image style={[styles.mapImage]} source={map} />
            </View> */}
          </View>
          {/* End of Map Section */}

          {/* Starts Button Section */}
          <View style={[styles.mapBox]}>
            <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
              <View style={[styles.boxLogin]}>
                <View style={{ flexBasis: "20%", marginLeft: 5 }}>
                  <Image source={scan} style={[styles.buttonImage]} />
                </View>
                <TouchableOpacity
                  style={{ flexBasis: "80%", paddingTop: 5 }}
                  // onPress={() => Actions.Scan()}
                  onPress={() => this.props.navigation.navigate("scan")}
                >
                  <Text style={[styles.buttonText]}>
                    {" "}
                    {translate("qr_scan", this.state.system_lang)}{" "}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.boxLogin]}
                // onPress={() => Actions.AddIncident()}
                onPress={() => this.props.navigation.navigate("addIncident")}
              >
                <View style={{ flexBasis: "20%", marginLeft: 5 }}>
                  <Image source={problem} style={[styles.buttonImage]} />
                </View>
                <View style={{ flexBasis: "80%", paddingTop: 5 }}>
                  <Text style={[styles.buttonText]}>
                    {" "}
                    {translate("add_incident", this.state.system_lang)}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity
                style={[styles.boxLogin]}
                // onPress={() => Actions.CheckpointList()}
                onPress={() => this.props.navigation.navigate("checkpointList")}
              >
                <View style={{ flexBasis: "20%", marginLeft: 5 }}>
                  <Image source={group} style={[styles.buttonImage]} />
                </View>
                <View style={{ flexBasis: "80%", paddingTop: 5 }}>
                  <Text style={[styles.buttonText]}>
                    {" "}
                    {translate("all_checkpoint", this.state.system_lang)}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.boxLogin]}
                // onPress={() => Actions.AddMessage()}
                onPress={() => this.props.navigation.navigate("addMessage")}
              >
                <View style={{ flexBasis: "20%", marginLeft: 5 }}>
                  <Image source={comment} style={[styles.buttonImage]} />
                </View>
                <View style={{ flexBasis: "80%", paddingTop: 5 }}>
                  <Text style={[styles.buttonText]}>
                    {" "}
                    {translate("messages", this.state.system_lang)}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* <Text
              style={[styles.endButton]}
              onPress={() => Actions.StartPatrol()}
            >
              End Petrol
            </Text> */}
          </View>
          {/* End of Button Section */}

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
              url={() => this.props.navigation.navigate("emergencyContactList")}
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
  mapBox: {
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

    padding: 10,
  },
  mapTitle: {
    fontSize: RFPercentage(4),
    color: "#171717",
    fontWeight: "bold",
  },
  mapDate: {
    fontSize: RFPercentage(2.5),
    color: "#171717",
    textAlign: "left",
    fontStyle: "italic",
  },
  mapImage: {
    height: 200,
    width: "100%",
    marginTop: 10,
  },
  boxLogin: {
    flex: 1,
    flexDirection: "row",
    flexBasis: "48%",
    backgroundColor: "#1544B3",
    height: 80,
    paddingTop: 25,
    marginRight: 10,
  },
  buttonImage: {
    width: 25,
    height: 25,
    marginTop: 5,
    marginLeft: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: RFPercentage(2.2),
    marginLeft: 20,
  },
  endButton: {
    textAlign: "center",
    color: "#FFFFFF",
    backgroundColor: "#DA2F2F",
    borderRadius: 100,
    lineHeight: 70,
    fontSize: RFPercentage(3),
    textTransform: "uppercase",
    marginTop: 15,
    letterSpacing: 1,
    fontWeight: "bold",
    marginLeft: 50,
    marginRight: 50,
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
