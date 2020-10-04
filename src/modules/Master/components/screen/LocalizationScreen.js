import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Animatable from "react-native-animatable";
// import { Actions } from "react-native-router-flux";
import LanguageScreen from "./LanguageScreen";
import { getAsyncData } from "../../Util/OfflineData";

import AsyncStorage from "@react-native-community/async-storage";
import { translate } from "../../translations/Localization";

export default class Setting extends Component {
  state = {
    system_lang: "bn",
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
      <ScrollView>
        <SafeAreaView style={[styles.container]}>
          <View style={[styles.wrapperView]}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={[styles.bodyIconTitle]}>
                {translate("settings", this.state.system_lang)}
              </Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flexBasis: "50%" }}>
                <Text style={[styles.bodyIconTitle]}>
                  {translate("change_language", this.state.system_lang)}
                </Text>
              </View>

              <View style={{ flexBasis: "40%" }}>
                <LanguageScreen />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bodyIconTitle: {
    fontSize: RFPercentage(3),
    fontWeight: "bold",
    textAlign: "left",

    paddingVertical: 5,
  },

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
});
