import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import menuIcon1 from "../images/m1.png";
import menuIcon2 from "../images/m1.png";

import { RFPercentage } from "react-native-responsive-fontsize";
// import { Actions } from "react-native-router-flux";

export default class HrAttendance extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView>
          <View style={[styles.profileDetails]}>
            <View style={[styles.profileMenu]}>
              <View style={{ flexBasis: "50%" }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("hrAddAttendance")
                  }
                  style={[styles.singleMenuItem]}
                >
                  <Image source={menuIcon1} style={[styles.menuImage]} />
                  <Text style={[styles.singleMenuItemTitle]}>
                    {" "}
                    Add Attendance{" "}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexBasis: "50%" }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("hrAttendanceList")
                  }
                  style={[styles.singleMenuItem]}
                >
                  <Image source={menuIcon2} style={[styles.menuImage]} />
                  <Text style={[styles.singleMenuItemTitle]}>
                    {" "}
                    Attendance List{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    margin: 8,
    height: "100%",
    backgroundColor: "#F2F8FF",
  },

  profileMenu: {
    flex: 1,
    flexDirection: "row",
  },

  singleMenuItem: {
    backgroundColor: "#fff",
    borderRadius: 5,
    textAlign: "center",
    margin: 10,
    alignItems: "center",
    padding: 5,
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 23, height: 113 },
    height: 125,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  singleMenuItemTitle: {
    fontSize: RFPercentage(2.5),
    color: "#353559",
    fontWeight: "700",
    paddingVertical: 10,
    textAlign: "center",
  },
});
