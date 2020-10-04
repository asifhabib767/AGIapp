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
import helpIcon from "../images/m-3.png";
import callIcon from "../images/vehicelcall.png";
// import { Actions } from "react-native-router-flux";
// import CustomSearchbar from "../components/CustomSearchbar";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";
import call from "react-native-phone-call";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";

export default class EmergencyContactList extends Component {
  state = {
    system_lang: "bn",
    helpList: [
      {
        name: "National Helpline",
        number: "999",
      },
      {
        name: "Ambulance Service",
        number: "01701777782",
      },
      {
        name: "Fire Service and Civil Defence",
        number: "01839421521",
      },
      {
        name: "Police Station",
        number: "01769058053",
      },
    ],
    refreshing: false,
  };

  async componentDidMount() {
    await this.getAsyncLanguageCode();
  }

  getAsyncLanguageCode = async () => {
    let system_lang = await getAsyncData("system_lang");
    this.setState({ system_lang });
  };

  callToggle = (callNumber) => {
    const args = {
      number: callNumber, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
    };
    call(args).catch(console.error);
  };

  initializeData = async () => {
    //
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
                  {translate("emergency_contact", this.state.system_lang)}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.selectBox]}>
            <View
              style={{ flex: 1, flexDirection: "row", paddingVertical: 20 }}
            >
              <View style={{ flexBasis: "80%" }}>
                <Text style={[styles.shipDate]}>
                  {" "}
                  {translate("emergency_service", this.state.system_lang)}{" "}
                </Text>
              </View>
              <View style={{ flexBasis: "22%" }}>
                <Text style={[styles.shipDate]}>
                  {" "}
                  {translate("call_now", this.state.system_lang)}{" "}
                </Text>
              </View>
            </View>
            {this.state.helpList.map((item, index) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingVertical: 20,
                  borderBottomColor: "#D6D6D6",
                  borderBottomWidth: 1,
                }}
                onPress={() => this.callToggle(item.number)}
              >
                <View style={{ flexBasis: 60 }}>
                  <Image source={helpIcon} style={[styles.iconStyle]} />
                </View>
                <View style={{ flexBasis: "70%" }}>
                  <Text style={[styles.shipmentNo]}>{item.name}</Text>
                  <TouchableOpacity>
                    <Text style={styles.gateIn}>{item.number}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexBasis: 60 }}>
                  <Image source={callIcon} style={[styles.callIconStyle]} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    width: 100,
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
  callIconStyle: {
    width: 40,
    height: 40,
    // backgroundColor: "#2ACB85",
    // resizeMode: "contain",
  },
});
