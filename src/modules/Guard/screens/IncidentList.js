import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  CheckBox,
  TouchableOpacity,
  ImageBackground,
  Button,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/FontAwesome";
import map from "../images/map.png";
import scan from "../images/scan.png";
import group from "../images/group.png";
import search from "../images/Activiy-list.png";
import problem from "../images/problem.png";
import comment from "../images/comment.png";
import panicAlert from "../images/dashboard-alert.png";
import emergencyAlert from "../images/dashboard-emergency.png";
import torch from "../images/dashboard-torch.png";
import { Actions } from "react-native-router-flux";
// import CustomSearchbar from "../components/CustomSearchbar";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";
import { getIncidentList } from "../service/incident/IncidentService";
import TorchButton from "../components/TorchButton";
import EmergencyButton from "../components/EmergencyButton";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";

// import * as LocalizeHelper from '../Util/LocalizeHelper';
// import * as RNLocalize from "react-native-localize";

export default class IncidentList extends Component {
  state = {
    system_lang: "bn",
    isModalVisible: false,
    refreshing: false,
    jobStationID: "",
    incidentList: [],
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
    let getIncidentData = await getIncidentList();

    this.setState({
      incidentList: getIncidentData,
    });
  };

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={[styles.container]}>
          {/* Starts Map Section */}
          <View style={[styles.wrapperView]}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={[styles.bodyIconTitle]}
                onPress={() => Actions.IncidentList()}
              >
                {translate("incident_list", this.state.system_lang)}
              </Text>
            </View>

            {/* Search will be implemented later */}
            {/* <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{ flexBasis: "80%", marginRight: 1, marginBottom: 10 }}
              >
                <CustomSearchbar placeHolderText="Search" />
              </View>

              <View style={{ flexBasis: 40, marginLeft: 10, marginBottom: 10 }}>
                <Image source={search} style={[styles.iconStyle]} />
              </View>
            </View> */}

            {/* <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <View style={{ flexBasis: "28%", marginRight: 10 }}>
                <Text style={[styles.allTab]}>
                  {" "}
                  {translate("all", this.state.system_lang)}{" "}
                </Text>
              </View>
              <View style={{ flexBasis: "28%" }}>
                <Text style={[styles.completedTab]}>
                  {translate("completed", this.state.system_lang)}{" "}
                </Text>
              </View>
            </View> */}

            {/* List   */}

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flexBasis: "15%", paddingTop: 1 }}>
                <Text style={[styles.activityTitle]}>
                  {translate("date", this.state.system_lang)}
                </Text>
              </View>
              <View style={{ flexBasis: "70%" }}>
                <Text style={[styles.activityTitle]}></Text>
                <Text style={[styles.actvityTime]}></Text>
              </View>
              {/* <View style={{ flexBasis: "15%", paddingTop: 1 }}>
                <Text style={[styles.activityTitle]}>Action</Text>
              </View> */}
            </View>

            {/* Copy from Transport provider */}
            {this.state.incidentList.map((item, index) => (
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{ flexBasis: 40, marginRight: 5, marginBottom: 10 }}
                >
                  <Image source={search} style={[styles.iconStyle]} />
                </View>

                <View style={{ flexBasis: "70%" }}>
                  <Text style={[styles.shipmentNo]}>
                    {" "}
                    {item.strIncidentName}{" "}
                  </Text>
                  <Text style={[styles.shipDate]}>
                    {" "}
                    {item.dteDate.substring(0, 10)}{" "}
                    {item.dteDate.substring(11, 19)}{" "}
                  </Text>
                </View>

                {/* <View style={{ flexBasis: 30, paddingTop: 1 }}>
                    <CheckBox style={styles.checkBox} />
                  </View> */}
              </View>
            ))}

            {/* My own tag */}
          </View>

          {/* End of Activity Section */}

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
  wrapperView: {
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
  activityTitle: {
    fontSize: RFPercentage(4),
    color: "#171717",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
  },

  actvityTime: {
    fontSize: RFPercentage(4),
    color: "#171717",
    fontWeight: "bold",
    fontSize: 10,
  },
  mapDate: {
    fontSize: RFPercentage(2.5),
    color: "#171717",
    textAlign: "left",
    fontStyle: "italic",
  },

  iconStyle: {
    width: 35,
    height: 35,
    backgroundColor: "#4346B6",
    resizeMode: "contain",
  },

  shipmentNo: {
    fontSize: RFPercentage(2.4),
    color: "#000000",
    fontWeight: "bold",
  },
  shipDate: {
    fontSize: RFPercentage(2.5),
    color: "#272727",
  },

  scanTitle: {
    fontSize: RFPercentage(3.5),
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },

  scanButton: {
    backgroundColor: "#dddddd",
    textAlign: "center",
    color: "#FFFFFF",
    backgroundColor: "#1544B3",
    borderRadius: 100,
    lineHeight: 50,
    fontSize: RFPercentage(2),
    textTransform: "uppercase",
    marginTop: 5,
    letterSpacing: 1,
    fontWeight: "bold",
  },

  allTab: {
    fontSize: RFPercentage(2.5),
    backgroundColor: "#3762D8",
    color: "#fff",
    borderRadius: 20,
    paddingVertical: 12,
    textAlign: "center",
  },
  completedTab: {
    fontSize: RFPercentage(2.5),
    color: "#888888",
    borderRadius: 20,
    paddingVertical: 12,
    textAlign: "center",
    fontWeight: "bold",
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
  // bodyIconTitle: {
  //   fontSize: RFPercentage(3),
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   paddingVertical: 5,
  // },
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
