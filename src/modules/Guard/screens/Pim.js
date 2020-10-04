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
import menuIcon1 from "../images/m1.png";
import menuIcon2 from "../images/m2.png";
import menuIcon3 from "../images/m3.png";
import menuIcon5 from "../images/m5.png";
import comment from "../images/comment.png";
import panicAlert from "../images/dashboard-alert.png";
import emergencyAlert from "../images/dashboard-emergency.png";
import torch from "../images/dashboard-torch.png";
// import { Actions } from "react-native-router-flux";
// import CustomSearchbar from "../components/CustomSearchbar";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";

// import * as LocalizeHelper from '../Util/LocalizeHelper';
// import * as RNLocalize from "react-native-localize";

export default class PimScreen extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={[styles.container]}>
          {/* Starts HR  Section */}

          <View style={[styles.profileDetails]}>
            <View style={[styles.profileMenu]}>
              <View style={{ flexBasis: "50%" }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("hrAttendance")}
                  style={[styles.singleMenuItem]}
                >
                  <Image source={menuIcon1} style={[styles.menuImage]} />
                  <Text style={[styles.singleMenuItemTitle]}> Attendence </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexBasis: "50%" }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("hrLeave")}
                  style={[styles.singleMenuItem]}
                >
                  <Image source={menuIcon2} style={[styles.menuImage]} />
                  <Text style={[styles.singleMenuItemTitle]}> Leave </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.profileMenu]}>
              <View style={{ flexBasis: "50%" }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("hrMovement")}
                  style={[styles.singleMenuItem]}
                >
                  <Image source={menuIcon3} style={[styles.menuImage]} />
                  <Text style={[styles.singleMenuItemTitle]}> Movement </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexBasis: "50%" }}>
                <TouchableOpacity
                  // onPress={() => this.props.navigation.navigate("hrExpense")}
                  onPress={() => this.props.navigation.navigate("pim")}
                  style={[styles.singleMenuItem]}
                >
                  <Image source={menuIcon5} style={[styles.menuImage]} />
                  <Text style={[styles.singleMenuItemTitle]}> Expense </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* End of Footer section */}
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
