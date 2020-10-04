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
} from "react-native";
import pumimage from "../images/avatar.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";

export default class UserProfileEdit extends Component {
  state = {
    userData: "",
  };

  async componentDidMount() {
    const that = this;
    let userData = (await AsyncStorage.getItem("userData")) || "none";
    let dataParse = JSON.parse(userData);

    that.setState({
      userData: dataParse,
    });
  }

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <Animatable.View animation="slideInUp">
          <SafeAreaView>
            <View style={{ width: "100%", paddingHorizontal: 8 }}>
              <TouchableOpacity>
                <View style={[styles.areaBox]}>
                  <View style={{ flexBasis: "25%" }}>
                    <Image source={pumimage} style={[styles.pumimage]} />
                  </View>
                  <View style={{ flexBasis: "75%", paddingVertical: 12 }}>
                    <Text style={[styles.stationName]}>
                      {" "}
                      {typeof this.state.userData != "undefined" &&
                        this.state.userData != null &&
                        this.state.userData.strName}
                    </Text>
                    <Text style={[styles.stationLocation]}>
                      {typeof this.state.userData != "undefined" &&
                        typeof this.state.userData.tokenData != "undefined" &&
                        this.state.userData != null &&
                        this.state.userData.tokenData.userData.strUserName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 8,
  },
  dasboardbg: {
    width: "100%",
    height: 300,
  },
  sectionTitle: {
    fontSize: RFPercentage(3),
    color: "#2D2D2D",
    fontWeight: "700",
    paddingBottom: 10,
  },

  location: {
    color: "#919191",
    fontSize: 16,
    borderRadius: 10,
    marginTop: 3,
    textTransform: "uppercase",
    paddingLeft: 10,
  },

  contactBox: {
    flex: 1,
    flexDirection: "row",
  },
  totalNo: {
    fontSize: RFPercentage(3.5),
    color: "#000",
    fontWeight: "bold",
  },
  countBox: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 3, height: 2 },
    height: 100,
    paddingVertical: 15,
  },
  AccountDetailsArea: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 3, height: 2 },
  },

  boxGrid: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    height: "100%",
  },

  AccountDetails: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D2D2D",
    paddingBottom: 10,
  },

  inputLebel: {
    fontSize: RFPercentage(2.2),
    textAlign: "left",
    color: "#707070",
    textTransform: "uppercase",
  },

  inputOutput: {
    fontSize: RFPercentage(2.2),
    textAlign: "left",
    color: "#231F20",
    fontWeight: "bold",
    paddingVertical: 5,
    width: "100%",
  },

  pumimage: {
    width: 75,
    height: 75,
  },
  stationName: {
    fontSize: RFPercentage(2.5),
    color: "#171717",
    fontWeight: "bold",
  },
  stationLocation: {
    fontSize: RFPercentage(2.2),
    color: "#171717",
    opacity: 0.55,
  },
  areaBox: {
    flex: 1,
    flexDirection: "row",
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
  },
});
