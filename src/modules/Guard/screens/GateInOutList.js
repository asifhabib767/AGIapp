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
  RefreshControl,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/FontAwesome";
import filterIcon from "../images/Activiy-list.png";
import vehicel from "../images/car.png";
import caruser from "../images/caruser.png";
import panicAlert from "../images/dashboard-alert.png";
import emergencyAlert from "../images/dashboard-emergency.png";
import torch from "../images/dashboard-torch.png";
// import { Actions } from "react-native-router-flux";
// import CustomSearchbar from "../components/CustomSearchbar";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";
import { getGateInOut } from "../service/gateInOut/GateInOutService";
import TorchButton from "../components/TorchButton";
import EmergencyButton from "../components/EmergencyButton";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";

// import * as LocalizeHelper from '../Util/LocalizeHelper';
// import * as RNLocalize from "react-native-localize";

export default class GateInOutList extends Component {
  state = {
    system_lang: "bn",
    strCarringType: "",
    ysnActive: "",

    entryInOutList: [],
    refreshing: false,
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
    let gateInOutData = await getGateInOut();
    this.setState({
      entryInOutList: gateInOutData,
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
          <View style={[styles.selectBox]}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flexBasis: "70%" }}>
                <Text style={[styles.headTitle]}>
                  {translate("gate_in_out", this.state.system_lang)}
                </Text>
              </View>
              <View style={{ flexBasis: "30%" }}>
                <TouchableOpacity
                  // onPress={() => Actions.AddGateIn()}
                  onPress={() => this.props.navigation.navigate("addGateIn")}
                >
                  <Text style={styles.buttonStyle}>
                    {translate("add", this.state.system_lang)} &nbsp;{""}
                    <Icon name="plus" size={23} color="#fff" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Search will be implemented later */}
            {/* <View
              style={{ flex: 1, flexDirection: "row", paddingVertical: 25 }}
            >
              <View style={{ flexBasis: "75%", marginRight: 15 }}>
                <CustomSearchbar placeHolderText="Search from outlets" />
              </View>
              <View style={{ flexBasis: 40, marginLeft: 10, marginBottom: 10 }}>
                <Image source={filterIcon} style={[styles.searchIconStyle]} />
              </View>
              <View style={[styles.selects]}>
                <Picker
                  selectedValue={this.state.priority}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selects: itemValue })
                  }
                >
                  <Picker.Item label="Select" value="Select" />
                  <Picker.Item label="1" value="2" />
                  <Picker.Item label="1" value="2" />
                </Picker>
              </View>
            </View> */}
          </View>

          <View style={[styles.selectBox]}>
            <View
              style={{ flex: 1, flexDirection: "row", paddingVertical: 20 }}
            >
              <View style={{ flexBasis: "85%" }}>
                <Text style={[styles.shipDate]}>
                  {" "}
                  {translate("name", this.state.system_lang)}{" "}
                </Text>
              </View>
              <View style={{ flexBasis: "22%" }}>
                <Text style={[styles.shipDate]}>
                  {" "}
                  {translate("time", this.state.system_lang)}{" "}
                </Text>
              </View>
            </View>

            {this.state.entryInOutList.map((item, index) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingVertical: 20,
                  borderBottomColor: "#D6D6D6",
                  borderBottomWidth: 1,
                }}
                key={index}
                onPress={() =>
                  item.TRIPSTATUS === "IN"
                    ? this.props.navigation.navigate("addGateOut", {
                        data: item,
                      })
                    : this.props.navigation.navigate("showGateOut", {
                        data: item,
                      })
                }
              >
                {/* Main Part Start */}
                <View style={{ flexBasis: 60 }}>
                  <Image source={vehicel} style={[styles.iconStyle]} />
                </View>
                <View style={{ flexBasis: "70%" }}>
                  <Text style={[styles.shipmentNo]}>{item.strVisitToName}</Text>
                  {item.TRIPSTATUS === "IN" && (
                    <TouchableOpacity
                      // onPress={() => Actions.AddGateOut({ gateOutData: item })}
                      onPress={() =>
                        this.props.navigation.navigate("addGateOut", {
                          data: item,
                        })
                      }
                    >
                      <Text style={styles.gateIn}>Gate In</Text>
                    </TouchableOpacity>
                  )}
                  {item.TRIPSTATUS === "OUT" && (
                    <Text style={styles.gateOut}>Gate Out</Text>
                  )}
                </View>
                <View style={{ flexBasis: 60 }}>
                  {item.TRIPSTATUS === "IN" && (
                    <Text style={[styles.time]}>
                      {" "}
                      {item.dteGateInDateTime.substring(11, 19)}{" "}
                    </Text>
                  )}
                  {item.TRIPSTATUS === "IN" && (
                    <Text style={[styles.date]}>
                      {" "}
                      {item.dteGateInDateTime.substring(0, 10)}{" "}
                    </Text>
                  )}
                  {item.TRIPSTATUS === "OUT" && (
                    <Text style={[styles.time]}>
                      {" "}
                      {item.dteGateOutDateTime.substring(11, 19)}{" "}
                    </Text>
                  )}
                  {item.TRIPSTATUS === "OUT" && (
                    <Text style={[styles.date]}>
                      {" "}
                      {item.dteGateOutDateTime.substring(0, 10)}{" "}
                    </Text>
                  )}
                </View>
                {/* Main Part End */}

                {/* Test Start */}
                {/* {item.TRIPSTATUS === "IN" && (
                  <TouchableOpacity onPress={this.goToGateOutPage(item, index)}>
                    <View style={{ flexBasis: 60 }}>
                      <Image source={vehicel} style={[styles.iconStyle]} />
                    </View>
                    <View style={{ flexBasis: "70%" }}>
                      <Text style={[styles.shipmentNo]}>
                        {item.strVisitToName}
                      </Text>
                      <Text style={styles.gateIn}>Gate In</Text>
                    </View>
                    <View style={{ flexBasis: 60 }}>
                      <Text style={[styles.time]}>
                        {" "}
                        {item.dteGateInDateTime.substring(11, 19)}{" "}
                      </Text>
                      <Text style={[styles.date]}>
                        {" "}
                        {item.dteGateInDateTime.substring(0, 10)}{" "}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )} */}
                {/* Test End */}
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
                onPress={() => this.props.navigation.navigate("startPatrol")}
              >
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
  fullbg: {
    backgroundColor: "#F2F8FF",
    height: "100%",
  },
  container: {
    width: "96%",
    margin: 8,
  },
  selectBox: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    marginBottom: 5,
    padding: 10,
    paddingLeft: 10,
    marginTop: 5,
    justifyContent: "center",
    paddingVertical: 15,
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 1 },
  },
  headTitle: {
    fontSize: RFPercentage(3.5),
    color: "#000000",
    fontWeight: "bold",
  },
  shipmentNo: {
    fontSize: RFPercentage(3),
    color: "#000000",
    fontWeight: "bold",
  },
  shipDate: {
    fontSize: RFPercentage(2.5),
    color: "#272727",
  },
  iconStyle: {
    width: 55,
    height: 55,
    backgroundColor: "#4346B6",
    resizeMode: "contain",
  },
  searchIconStyle: {
    width: 35,
    height: 35,
    backgroundColor: "#4346B6",
    resizeMode: "contain",
  },
  selects: {
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 1 },
    backgroundColor: "#fff",
    borderRadius: 50,
    flexBasis: "30%",
    height: 42,
    lineHeight: 42,
  },
  carDetails: {
    fontSize: RFPercentage(2),
    color: "#272727",
    paddingVertical: 5,
  },
  carOwner: {
    fontSize: RFPercentage(2.2),
    color: "#272727",
    paddingVertical: 8,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  carStyle: {
    width: 15,
    height: 15,
  },
  buttonStyle: {
    backgroundColor: "#11D6A0",
    color: "#fff",
    fontSize: RFPercentage(3),
    textAlign: "center",
    paddingVertical: 8,
    borderRadius: 50,
  },
  gateIn: {
    backgroundColor: "#11D6A0",
    color: "#fff",
    fontSize: RFPercentage(2),
    textAlign: "center",
    paddingVertical: 6,
    borderRadius: 50,
    width: 85,
    height: 30,
    textTransform: "uppercase",
  },
  gateOut: {
    backgroundColor: "#E04236",
    color: "#fff",
    fontSize: RFPercentage(2),
    textAlign: "center",
    paddingVertical: 6,
    borderRadius: 50,
    width: 85,
    height: 30,
    textTransform: "uppercase",
  },
  time: {
    fontSize: RFPercentage(2.0),
    color: "#000000",
    fontWeight: "bold",
  },
  date: {
    fontSize: RFPercentage(1.5),
    color: "#000000",
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
