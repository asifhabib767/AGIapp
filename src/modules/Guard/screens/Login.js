import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import headerbg from "../images/login-image.png";
import { Input, Button } from "@ui-kitten/components";
import GlobalStyles from "../../Master/styles/GlobalStyles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
// import { inputAddHandling, loginAction } from "../../User/actions/AuthAction";
import AsyncStorage from "@react-native-community/async-storage";
import { LoginValidation } from "./../Util/Validation";
import { login } from "../service/auth/AuthService";

export default class Login extends Component {
  state = {
    username: "shakib.corp",
    password: "nsr@aug20",
    error_username: "",
    error_password: "",
    error_server: "",
    errorMessage: "",
    successMessage: "",
  };
  componentDidMount() {
    // let disPointId=3499;
    // let intUnitId =4
    // axios.get(`http://masterdata.akij.net/api/DisPoint/GetDisPointsByQuery?query=intUnitId=${intUnitId} and intDisPointId=${disPointId}`)
    // .then(function (response) {
    //     // handle success
    //     console.log('string params',response);
    // })
    // .catch(function (error) {
    //     // handle error
    //     console.log(error);
    // })
  }
  changeUsername = (inputValue) => {
    this.setState({ username: inputValue });
    // if(inputValue.length < 3){
    //     let error_username = 'Please enter an username at least 3 characters';
    //     this.setState({ error_username });
    // }else{
    //     this.setState({ error_username: '' });
    // }
  };

  changePassword = (inputValue) => {
    this.setState({ password: inputValue });
    // if(inputValue.length < 6){
    //     let error_password = 'Please enter a password at least 6 characters';
    //     this.setState({ error_password });
    // }else{
    //     this.setState({ error_password: '' });
    // }
  };

  handleSubmit = async () => {
    const username = this.state.username;
    const password = this.state.password;

    // check validations
    let validation = LoginValidation(username, password);
    this.setState({ errorMessage: validation.errorMsg });
    if (validation.errorMsg == "") {
      // Check live server
      let responseData = await login(username, password);
      if (responseData.logged) {
        await AsyncStorage.setItem("is_logged_in", "true");

        this.props.navigation.navigate("Home");
      } else {
        this.setState({ errorMessage: "Invalid username and password" });
        return false;
      }
    }
  };

  welcomeText = () => {
    // Welcome
  };
  showPassword = () => {
    alert();
  };

  render() {
    return (
      <KeyboardAvoidingView style={[GlobalStyles.whiteBg]}>
        <ScrollView>
          <View>
            <View style={[styles.postionbox]}>
              <ImageBackground
                style={[styles.headerbg]}
                source={headerbg}
                resizeMode="stretch"
              />
              <View style={[styles.headerDetails]}>
                <Text
                  style={[styles.headerTitle]}
                  onPress={() => props.navigation.navigate("login")}
                >
                  Sign In
                </Text>
                <Text style={[styles.headerSubTitle]}>
                  Please enter your credentials to proceed
                </Text>
              </View>
            </View>

            <View style={[styles.container]}>
              <View>
                {/* <Text style={[styles.headTitle]}> Login </Text> */}
                <Text style={styles.errorMessage}>
                  {this.state.errorMessage}
                </Text>
              </View>
              <View>
                <Input
                  style={[styles.logInputStyle]}
                  size="large"
                  name="username"
                  onChangeText={(value) => this.changeUsername(value)}
                  placeholder="Name"
                  value={this.state.username}
                />
                {this.state.error_username.length > 0 && (
                  <Text style={{ color: "red" }}>
                    {this.state.error_username}
                  </Text>
                )}
              </View>
              <View>
                <Input
                  style={[styles.logInputStyle]}
                  secureTextEntry={true}
                  size="large"
                  name="password"
                  onChangeText={(value) => this.changePassword(value)}
                  placeholder="Password"
                  value={this.state.password}
                />
                {this.state.error_password.length > 0 && (
                  <Text style={{ color: "red" }}>
                    {this.state.error_password}
                  </Text>
                )}
              </View>
              <View>
                <Button
                  style={styles.button}
                  size="large"
                  onPress={() => this.handleSubmit()}
                >
                  Log in
                </Button>
              </View>
              {/* <Text style={styles.forget}> Forgot password </Text> */}
            </View>
            {/* <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontSize: RFPercentage(2.4),
                  fontWeight: "bold",
                  color: "#878787",
                  fontWeight: "normal",
                }}
              >
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("signup")}
              >
                <Text
                  style={{
                    fontSize: RFPercentage(2.4),
                    color: "#000000",
                    fontWeight: "bold",
                  }}
                >
                  {"  "}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View> */}
            <View style={{ flex: 1 }}>
              <Text style={[styles.devlopby]}> Developed By AITL </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },

  headerbg: {
    marginTop: -40,
    width: width,
    height: height / 1.8,
  },
  postionbox: {
    position: "relative",
  },
  headerDetails: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: RFPercentage(4),
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingVertical: 10,
  },
  headerSubTitle: {
    color: "#fff",
    fontSize: RFPercentage(2),
  },

  headTitle: {
    color: "#000",
    fontSize: RFPercentage(4),
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 20,
  },

  logInputStyle: {
    backgroundColor: "#f1f1f1",
    marginBottom: 10,
  },

  forget: {
    color: "#1E2E40",
    fontSize: RFPercentage(2.5),
    textAlign: "right",
    marginTop: 10,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },

  button: {
    borderRadius: 50,
    marginTop: 15,
  },

  devlopby: {
    color: "#1B2662",
    textAlign: "center",
    fontSize: RFPercentage(2.5),
    paddingVertical: 30,
    fontWeight: "bold",
  },

  errorMessage: {
    color: "#7181B3",
    textAlign: "center",
    fontSize: 21,
    paddingVertical: 10,
  },
});
