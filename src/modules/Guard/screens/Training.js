import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
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
// import { Actions } from "react-native-router-flux";
// import CustomSearchbar from "../components/CustomSearchbar";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";

// import * as LocalizeHelper from '../Util/LocalizeHelper';
// import * as RNLocalize from "react-native-localize";

export default class TrainingScreen extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={[styles.container]}>
          {/* Starts Video Section */}

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flexBasis: "100%" }}>
              <Text style={[styles.headingOne]}> Training List</Text>
            </View>
          </View>

          <FlatList
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{ flexBasis: "47%", marginRight: 5, marginLeft: 5 }}
                >
                  <TouchableOpacity>
                    <View style={[styles.AccountDetailsArea]}>
                      <View>
                        <Image
                          style={[styles.videoview]}
                          source={{ uri: item.image }}
                        />
                        {/* <Image source={item.image} style={{ width: 100, height: 80 }} /> */}
                      </View>
                      <Text style={[styles.register]}> {item.title} </Text>
                      <Text style={[styles.registerDate]}> 02 Jan 2018</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
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
    width: "98%",
    margin: 5,
    padding: 5,
  },

  AccountDetailsArea: {
    backgroundColor: "#fff",
    borderRadius: 5,
    textAlign: "center",
    marginVertical: 5,
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: { width: 5, height: 1 },
    height: 150,
  },
  headingOne: {
    fontSize: RFPercentage(4),
    fontWeight: "700",
    letterSpacing: 1,
    paddingVertical: 5,
  },
  register: {
    fontSize: RFPercentage(2.2),
    fontFamily: "Poppins-bold",
    fontWeight: "700",
  },
  registerDate: {
    fontSize: RFPercentage(2),
  },
  videoview: {
    width: "100%",
    height: 80,
    paddingBottom: 10,
    resizeMode: "contain",
  },
  list: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
