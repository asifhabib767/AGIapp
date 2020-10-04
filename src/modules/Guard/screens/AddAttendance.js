import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import mapimage from "../images/chat.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-community/async-storage";

export default class AddAttendance extends Component {
  render() {
    return (
      <View>
        <ScrollView style={[styles.fullbg]}>
          <SafeAreaView style={styles.container}>
            <View style={[styles.AccountDetailsArea]}>
              <Text style={[styles.sectionTitle]}> Add Attendance </Text>

              <View style={[styles.boxGrid]}>
                <View style={{ flexBasis: "75%" }}>
                  <Text style={[styles.inputLebel]}> Unit </Text>
                  <TextInput
                    style={[styles.InputField]}
                    placeholder="ACCL, CORPORATE OFFICE"
                    value="Akij Cement Company LTD"
                  />
                </View>

                <View style={{ flexBasis: "25%", marginLeft: 10 }}>
                  <View style={[styles.userStyles]}>
                    <Icon name="retweet" size={23} color="#2E3192" />
                  </View>
                </View>
              </View>

              <View style={[styles.boxGrid]}>
                <View style={{ flexBasis: "48%", marginRight: 10 }}>
                  <View>
                    <Text style={[styles.inputLebel]}> LONGITUDE </Text>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="00.000000"
                      value="24.3456"
                    />
                  </View>

                  <View>
                    <Text style={[styles.inputLebel]}> LATITUDE </Text>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="00.000000"
                      value="30.34567"
                    />
                  </View>
                </View>

                <View style={{ flexBasis: "48%" }}>
                  <View>
                    <Text style={[styles.inputLebel]}> DISTANCE </Text>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="00.000000"
                      value="230"
                    />
                  </View>
                  <View>
                    <Text style={[styles.inputLebel]}> ACCURACY </Text>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="00.000000"
                      value="90%"
                    />
                  </View>
                </View>
              </View>

              <View>
                <Text style={[styles.buttonStyle]} onPress={this.login}>
                  {" "}
                  LOG IN{" "}
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: "#F2F8FF",
  },

  container: {
    width: "95%",
    margin: 8,
  },
  sectionTitle: {
    fontSize: RFPercentage(3),
    color: "#000000",
    fontWeight: "700",
    paddingBottom: 10,
    textTransform: "uppercase",
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
    shadowOffset: { width: 3, height: 113 },
  },

  boxGrid: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
  },

  AccountDetails: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D2D2D",
    paddingBottom: 10,
  },

  inputLebel: {
    fontSize: RFPercentage(2.5),
    textAlign: "left",
    color: "#707070",
    fontWeight: "bold",
  },

  InputField: {
    height: 40,
    fontSize: RFPercentage(2),
    fontSize: 16,
    marginBottom: 10,
    marginTop: 5,
    fontWeight: "bold",
    backgroundColor: "#D7E8FB",
  },

  userStyles: {
    width: "60%",
    height: "60%",
    backgroundColor: "#D7E8FB",
    alignItems: "center",
    borderRadius: 100,
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 3, height: 113 },
    marginLeft: 10,
    marginTop: 15,
  },

  buttonStyle: {
    backgroundColor: "#0091EA",
    width: "100%",
    color: "#fff",
    borderRadius: 5,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 3, height: 113 },
    fontSize: 16,
    lineHeight: 30,
    fontWeight: "600",
    paddingVertical: 12,
    textAlign: "center",
  },
});
