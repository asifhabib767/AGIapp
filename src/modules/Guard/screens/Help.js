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
import akijlogo from "../images/fotakij.png";
import talephone from "../images/callphone.png";
import website from "../images/internet.png";
import mails from "../images/black-back-closed-envelope-shape.png";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Animatable from "react-native-animatable";
import { Actions } from "react-native-router-flux";

export default class Help extends Component {
  call = (number) => {
    Linking.openURL("tel:" + number);
  };

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <Animatable.View animation="slideInUp">
          <SafeAreaView style={styles.container}>
            <View style={[styles.selectBox]}>
              <View style={{ width: "100%", alignSelf: "center" }}>
                <Text style={[styles.logoStyle]}>
                  {" "}
                  AKij <Text style={{ color: "#3187FE" }}>
                    {" "}
                    Guard App{" "}
                  </Text>{" "}
                </Text>
              </View>

              <View style={[styles.versionBox]}>
                <Text style={[styles.version]}> Version 1.0.0 </Text>
                <Text style={[styles.Developed]}> Developed By </Text>
                <View style={[styles.akijlogo]}>
                  <Image source={akijlogo} />
                </View>
              </View>

              <View style={[styles.contactbox]}>
                <View style={[styles.letfbox]}>
                  <TouchableOpacity onPress={() => this.call("08000016609")}>
                    <Image style={[styles.helpImage]} source={talephone} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.call("08000016609")}>
                    <Text style={[styles.tollFree]}> Toll Free </Text>
                    <Text style={[styles.tollNumber]}> 08000016609 </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.borderCenter]}></View>
                <View style={[styles.rightBox]}>
                  <TouchableOpacity onPress={() => this.call("16609")}>
                    <Text style={[styles.tollFree]}> Hot Line </Text>
                    <Text style={[styles.tollNumber]}> 16609 </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.contactbox]}>
                <View style={[styles.letfbox]}>
                  <View>
                    <Image style={[styles.mails]} source={mails} />
                  </View>
                  <View>
                    <Text style={[styles.tollFree]}> Email </Text>
                    <Text style={[styles.tollNumber]}> support@akij.net </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.contactbox]}>
                <View style={[styles.letfbox]}>
                  <View>
                    <Image style={[styles.mails]} source={website} />
                  </View>
                  <View>
                    <Text style={[styles.tollFree]}> Website </Text>
                    <Text style={[styles.tollNumber]}> www.akij.net </Text>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <TouchableOpacity>
                <Text
                  style={styles.buttonStyle}
                  //   onPress={()=>Actions.Feedback()}
                >
                  Send Feedback
                </Text>
              </TouchableOpacity>
            </View>

            <View></View>
          </SafeAreaView>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: "#F2F8FF",
    height: 700,
  },

  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 8,
  },
  helpTitle: {
    textAlign: "center",
    fontSize: RFPercentage(4),
    textTransform: "uppercase",
  },
  selectBox: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    paddingLeft: 10,
    marginTop: 30,
    justifyContent: "center",
    paddingVertical: 15,
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: { width: 23, height: 113 },
  },

  logohelp: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 40,
    alignSelf: "center",
  },

  versionBox: {
    marginBottom: 20,
  },
  version: {
    textAlign: "center",
    color: "#2D2D2D",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },

  Developed: {
    textAlign: "center",
    color: "#2D2D2D",
    fontWeight: "normal",
    fontSize: 18,
    paddingVertical: 10,
  },

  akijlogo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 7,
  },

  akijsite: {
    textAlign: "center",
    color: "#000",
    fontWeight: "normal",
    fontSize: 20,
    letterSpacing: 4,
  },

  contactbox: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  letfbox: {
    flex: 1,
    flexDirection: "row",
  },
  tollFree: {
    color: "#353559",
    fontWeight: "normal",
    fontSize: 16,
  },
  tollNumber: {
    color: "#353559",
    fontWeight: "bold",
    fontSize: 20,
  },
  helpImage: {
    height: 40,
    width: 40,
    marginRight: 10,
    marginTop: 10,
  },
  mails: {
    height: 37,
    width: 37,
    marginRight: 10,
    marginTop: 15,
  },

  borderCenter: {
    borderWidth: 0.5,
    borderColor: "#00000014",
    marginRight: 20,
  },
  gosite: {
    color: "#353559",
    fontSize: 20,
    textAlign: "center",
    flex: 1,
    flexDirection: "row",
  },
  mainlogo: {
    width: "100%",
    height: 66,
    resizeMode: "stretch",
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: "#1544B3",
    color: "#fff",
    fontSize: RFPercentage(3),
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 35,
    textTransform: "uppercase",
    borderRadius: 50,
  },
  logoStyle: {
    color: "#231F20",
    fontWeight: "bold",
    fontSize: RFPercentage(4.5),
    fontWeight: "bold",
    textAlign: "center",
  },
});
