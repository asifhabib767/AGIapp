import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import LoginBg from "../images/login-image.png";
import logo from "../images/logo1.png";
import developedBy from "../images/akij-logo-sm.png";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import { RFPercentage } from "react-native-responsive-fontsize";
import PasswordInputText from "react-native-hide-show-password-input";

import { LoginValidation } from "./../Util/Validation";

import { login } from "../service/auth/AuthService";
// import { api_get_distributor_details } from "../../config.json";
import AsyncStorage from "@react-native-community/async-storage";
// 9122Akij@123
export default class Login extends Component {
  state = {
    username: "",
    password: "",
    error_username: "",
    error_password: "",
    error_server: "",

    errorMessage: "",
    successMessage: "",
  };

  render() {
    return (
      <KeyboardAvoidingView>
        <View>
          <Text>Hello</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: "#fff",
    height: "100%",
  },

  container: {
    width: "90%",
    marginLeft: 20,
  },

  ApartImage: {
    marginTop: 0,
    width: width,
    height: height / 3,
  },

  logo: {
    width: 250,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
  },

  logoAkijText: {
    width: 50,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 0,
    marginBottom: -20,
  },

  logoStyle: {
    color: "#231F20",
    fontWeight: "bold",
    fontSize: RFPercentage(4.5),

    textAlign: "center",
    fontStyle: "italic",
  },
  iconstyle: {
    position: "absolute",
    marginLeft: 15,
    marginTop: 17,
    paddingRight: 10,
    right: 0,
  },

  InputField: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "300",
    fontFamily: "popppins",
    borderRadius: 0,
    paddingLeft: 5,
    paddingVertical: 12,

    borderBottomColor: "#000",
    borderBottomWidth: 0.6,
  },
  paaswordField: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "300",
    fontFamily: "popppins",
    borderRadius: 0,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },

  forget: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },

  errorMessage: {
    color: "#7181B3",
    textAlign: "center",
    fontSize: 21,
    paddingVertical: 10,
  },
  linearGradient: {
    borderRadius: 5,
  },
  buttonText: {
    fontSize: RFPercentage(3),
    textAlign: "center",
    color: "#ffffff",
    paddingVertical: 15,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  forgetPin: {
    color: "#000000",
    textAlign: "right",
    fontSize: RFPercentage(2.4),
    paddingTop: 20,
  },
  devlopby: {
    color: "#000000",
    textAlign: "right",
    fontSize: RFPercentage(2),
    paddingVertical: 10,
  },
  developImge: {
    width: 39,
    height: 22,
  },
  sidebarBG: {
    position: "absolute",
    bottom: -100,
    left: -30,
  },
});
