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
import headerBg from "../images/userProfileBg.png";
import userimg from "../images/caruser.png";
import shop from "../images/shop.png";
import requsition from "../images/requsition.png";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";

export default class UserProfileEdit extends Component {
  state = {
    intEmployeeId: "",
    strEmployeeCode: "",
    strEmployeeName: "",
    strOfficeEmail: "",
    strContactNo1: "",
    strPermanentAddress: "",
    strPresentAddress: "",
    strAlias: "",
    strCountry: "",
    strDistrict: "",
    strCity: "",

    strJobStationName: "",
    strDepatrment: "",
    strDesignation: "",
  };

  async componentDidMount() {
    const that = this;
    let userData = (await AsyncStorage.getItem("userData")) || "none";
    let dataParse = JSON.parse(userData);
    this.setState({
      intEmployeeId: dataParse.tokenData.userData.intEmployeeId,
      strEmployeeCode: dataParse.tokenData.userData.strEmployeeCode,
      strEmployeeName: dataParse.tokenData.userData.strEmployeeName,
      strOfficeEmail: dataParse.tokenData.userData.strOfficeEmail,
      strContactNo1: dataParse.tokenData.userData.strContactNo1,
      strPermanentAddress: dataParse.tokenData.userData.strPermanentAddress,
      strPresentAddress: dataParse.tokenData.userData.strPresentAddress,
      strAlias: dataParse.tokenData.userData.strAlias,
      strCountry: dataParse.tokenData.userData.strCountry,
      strCity: dataParse.tokenData.userData.strCity,
      strDistrict: dataParse.tokenData.userData.strDistrict,

      strJobStationName: dataParse.tokenData.userData.strJobStationName,
      strDepatrment: dataParse.tokenData.userData.strDepatrment,
      strDesignation: dataParse.tokenData.userData.strDesignation,
    });
  }

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView>
          <View>
            <TouchableOpacity>
              <ImageBackground source={headerBg} style={[styles.userProfile]}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image source={userimg} style={[styles.userimg]} />
                  <Text style={[styles.userName]}>
                    {" "}
                    {this.state.strEmployeeName}{" "}
                  </Text>
                  <Text style={[styles.userPostion]}>
                    {" "}
                    {this.state.strDesignation}{" "}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View style={[styles.contactBox]}>
              {/* <View style={{ flexBasis: '47%' , marginRight:10 }}>
                                    <View style={[styles.countBox]}> 
                                       <View style={{flex:1,flexDirection:'row'}}>
                                        <View style={{ flexBasis:'35%',paddingTop:6}}>
                                                <Image source={shop} />   
                                            </View>
                                            <View  style={{ flexBasis:'65%'}}>
                                                <Text style={[styles.totalNo]}> 70 </Text>
                                                <Text style={[styles.inputOutput]}> Total Contacts </Text>
                                            </View>
                                       </View>
                                    </View>
                                </View> */}

              {/* <View style={{ flexBasis: '50%' }}>
                                    <View style={[styles.countBox]}> 
                                       <View style={{flex:1,flexDirection:'row'}}>
                                        <View style={{ flexBasis:'35%',paddingTop:6}}>
                                                <Image source={requsition} style={{ width:50,resizeMode:'contain'}} />   
                                            </View>
                                            <View  style={{ flexBasis:'65%'}}>
                                                <Text style={[styles.totalNo]}> 70 </Text>
                                                <Text style={[styles.inputOutput]}> Total assets requsition </Text>
                                            </View>
                                       </View>
                                    </View>
                                </View> */}
            </View>

            <View style={[styles.AccountDetailsArea]}>
              <Text style={[styles.sectionTitle]}> Account Details </Text>

              <View style={[styles.boxGrid]}>
                <View style={{ flexBasis: "50%" }}>
                  <Text style={[styles.inputLebel]}> Email </Text>
                  <Text style={[styles.inputOutput]}>
                    {" "}
                    {this.state.strOfficeEmail}{" "}
                  </Text>

                  <Text style={[styles.empty]}></Text>
                  <Text style={[styles.inputLebel]}> Phone </Text>
                  <Text style={[styles.inputOutput]}>
                    {" "}
                    {this.state.strContactNo1}{" "}
                  </Text>

                  {/* <Text style={[styles.empty]}></Text> 
                                        <Text style={[styles.inputLebel]}> Sales Territory </Text>  
                                        <Text style={[styles.inputOutput]}> Region Name/Area/ Territory / Cluster /Route </Text>   */}

                  {/* <Text style={[styles.empty]}></Text> 
                                        <Text style={[styles.inputLebel]}> Key Account </Text>  
                                        <Text style={[styles.inputOutput]}> List of customers </Text>  */}
                </View>

                <View style={{ flexBasis: "50%" }}>
                  <Text style={[styles.inputLebel]}> District </Text>
                  <Text style={[styles.inputOutput]}>
                    {" "}
                    {this.state.strDistrict}{" "}
                  </Text>

                  <Text style={[styles.empty]}></Text>
                  <Text style={[styles.inputLebel]}> Address</Text>
                  <Text style={[styles.inputOutput]}>
                    {" "}
                    {this.state.strPresentAddress}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fullbg: {
    width: "100%",
    height: "100%",
  },

  container: {
    width: "100%",
    paddingHorizontal: 8,
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

  editProfile: {
    color: "#8E8E8E",
    fontSize: 14,
  },
  userProfile: {
    width: "100%",
    height: 150,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  userimg: {
    width: 65,
    height: 65,
  },
  userName: {
    color: "#fff",
    fontSize: RFPercentage(3.5),
    paddingVertical: 5,
  },
  userPostion: {
    color: "#fff",
    fontSize: RFPercentage(2.5),
  },
});
