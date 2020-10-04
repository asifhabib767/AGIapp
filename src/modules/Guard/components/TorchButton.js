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
import torchOff from "../images/dashboard-torch.png";
import torchOn from "../images/torch-on.png";
import Torch from "react-native-torch";
import { Platform } from "react-native";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";

class TorchButton extends Component {
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

  torchToggle = async () => {
    if (Platform.OS === "ios") {
      Torch.switchState(!this.state.torchStatus);
      this.setState({
        torchStatus: !this.state.torchStatus,
      });
    } else {
      const cameraAllowed = await Torch.requestCameraPermission(
        "Camera Permissions", // dialog title
        "We require camera permissions to use the torch on the back of your phone." // dialog body
      );

      if (cameraAllowed) {
        Torch.switchState(!this.state.torchStatus);
        this.setState({
          torchStatus: !this.state.torchStatus,
        });
      }
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={
          this.state.torchStatus != false
            ? [
                styles.footerBox,
                { backgroundColor: "#1544B3", textColor: "#EFF5FF" },
              ]
            : [styles.footerBox, { backgroundColor: "#fff" }]
        }
        onPress={() => this.torchToggle()}
      >
        <Image
          style={{
            height: 30,
            width: 30,
            resizeMode: "contain",
            marginHorizontal: 10,
          }}
          source={this.state.torchStatus != false ? torchOn : torchOff}
        />
        <Text
          style={
            this.state.torchStatus != false
              ? [styles.bodyIconTitle, { color: "#EFF5FF" }]
              : [styles.bodyIconTitle, { color: "#000000" }]
          }
        >
          {translate("torch", this.state.system_lang)}
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

export default TorchButton;
