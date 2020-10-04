import React, { Component, useState } from "react";
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
import emergencyAlert from "../images/dashboard-emergency.png";
// import { Actions } from "react-native-router-flux";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";

class EmergencyButton extends Component {
  state = {
    system_lang: "bn",
    torchStatus: false,
  };

  async componentDidMount() {
    await this.getAsyncLanguageCode();
  }

  getAsyncLanguageCode = async () => {
    let system_lang = await getAsyncData("system_lang");
    this.setState({ system_lang });
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.footerBox, { backgroundColor: "#E04236" }]}
        // onPress={() => Actions.EmergencyContactList()}
        onPress={this.props.url}
      >
        <Image
          style={{
            height: 30,
            width: 30,
            resizeMode: "contain",
            marginHorizontal: 10,
          }}
          source={emergencyAlert}
        />
        <Text style={[styles.bodyIconTitle, { color: "#FFFFFF" }]}>
          {translate("emergency", this.state.system_lang)}
        </Text>
      </TouchableOpacity>
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
  footerBox: {
    paddingVertical: 10,
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

export default EmergencyButton;
