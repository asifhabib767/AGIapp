import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import shop from "../images/shop.png";
import message from "../images/message.png";
import Icon from "react-native-vector-icons/FontAwesome";
import telephone from "../images/telephone.png";
import { Actions } from "react-native-router-flux";

import { getImageDecodePath } from "../Util/ImageDecoder";

class Outlet extends Component {
  state = {
    imagePath: "",
  };

  async componentDidMount() {
    if (this.props.outlet.strOutletImagePath != "NA") {
      let path = await getImageDecodePath(this.props.outlet.strOutletImagePath);
      let extension = this.props.outlet.strOutletImagePath.split(".").pop();
      let imageUrl = `data:image/${extension};base64,${path.result.fileContents}`;
      this.setState({ imagePath: imageUrl });
    }
  }

  goEditPage = () => {
    Actions.ContactEdit({ outlet: this.props.outlet });
  };

  render() {
    const {
      intRouteID,
      intOutletID,
      strRouteName,
      strOutletName,
      strOwnerName,
      strMobileNumber,
      strBusinessType,
      dteDateOfBirth,
      dteMarriageDate,
      strEmailAddress,
      strLatitude,
      strLongitude,
      strOutletImagePath,
      strOutletAddress,
      strContactType,
    } = this.props.outlet;

    return (
      <ScrollView>
        <SafeAreaView>
          <View style={[styles.AccountDetailsArea]}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={[styles.headingOne]}>Contact</Text>
              <View
                style={{
                  flexBasis: "70%",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity onPress={this.goEditPage}>
                  <Icon name="edit" size={25} color="#4421B4" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{ flexBasis: "10%", marginRight: 10, marginTop: 13 }}
              >
                <Image source={shop} />
              </View>
              <View
                style={{ flexBasis: "60%", paddingTop: 20, paddingLeft: 10 }}
              >
                <Text style={[styles.statusAddress]}> {strOutletName}</Text>
                <Text
                  style={[
                    styles.statusLeave,
                    { fontSize: 18, fontWeight: "bold" },
                  ]}
                >
                  #{intOutletID}
                </Text>
                <Text style={[styles.statusLeave]}>
                  {strOwnerName}{" "}
                  {strContactType != null ? "(" + strContactType + ")" : ""}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexBasis: "30%",
                  marginRight: 10,
                  marginTop: 25,
                }}
              >
                <TouchableOpacity
                  onPress={() => Linking.openURL(`mailto:${strEmailAddress}`)}
                >
                  <Image style={[styles.envelopStyle]} source={message} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${strMobileNumber}`)}
                >
                  <Image style={[styles.telephoneStyle]} source={telephone} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.boxGrid, { marginTop: 50 }]}>
              <View style={{ flexBasis: "50%" }}>
                <Text style={[styles.inputLebel]}> Route </Text>
                <Text style={[styles.inputOutput]}> {strRouteName} </Text>
                {/* 
                              <Text style={[styles.empty]}></Text> 
                              <Text style={[styles.inputLebel]}> Outlet Type </Text>  
                              <Text style={[styles.inputOutput]}> Shipping Point </Text>   */}

                <Text style={[styles.empty]}></Text>
                <Text style={[styles.inputLebel]}> Contact Type </Text>
                <Text style={[styles.inputOutput]}> {strBusinessType} </Text>
                {/*                             
                              <Text style={[styles.empty]}></Text> 
                              <Text style={[styles.inputLebel]}> Your Location </Text>  
                              <Text style={[styles.inputOutput]}> 2 A, Shankar, Dhanmondi </Text>   */}
                {this.state.imagePath.length > 0 && (
                  <View>
                    {this.props.pageTitle == "Profile List" && (
                      <View style={{ flexBasis: "100%" }}>
                        <Image
                          style={{ width: "90%", height: 80 }}
                          source={{ uri: this.state.imagePath }}
                        />
                      </View>
                    )}
                    {this.props.pageTitle == "Contact Details" && (
                      <View style={{ flexBasis: "100%" }}>
                        <Image
                          style={{ width: "90%", height: 80 }}
                          source={{ uri: this.state.imagePath }}
                        />
                      </View>
                    )}
                  </View>
                )}
              </View>

              <View style={{ flexBasis: "50%" }}>
                <Text style={[styles.inputLebel]}> Address </Text>
                <Text style={[styles.inputOutput]}> {strOutletAddress} </Text>

                <Text style={[styles.empty]}></Text>
                <Text style={[styles.inputLebel]}> Mobile Number</Text>
                <Text style={[styles.inputOutput]}> {strMobileNumber} </Text>

                {/* <Text style={[styles.empty]}></Text> 
                              <Text style={[styles.inputLebel]}> Sales Type </Text>  
                              <Text style={[styles.inputOutput]}>  ... </Text>   */}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headingOne: {
    fontSize: RFPercentage(2.5),
    fontFamily: "Poppins-bold",
    fontWeight: "700",
    letterSpacing: 2,
    paddingVertical: 10,
    textTransform: "uppercase",
  },

  AccountDetailsArea: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 5, height: 5 },
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
    fontSize: RFPercentage(2.2),
    textAlign: "left",
    color: "#888888",
  },

  inputOutput: {
    fontSize: RFPercentage(2.2),
    textAlign: "left",
    color: "#000000",
    fontWeight: "bold",
    paddingVertical: 5,
    width: "90%",
  },

  InputField: {
    height: 40,
    color: "#000",
    fontSize: 16,
    borderBottomColor: "#DADADA",
    borderStyle: "solid",
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 5,
    fontWeight: "bold",
  },

  date: {
    fontSize: RFPercentage(2.2),
    fontFamily: "Poppins-bold",
    fontWeight: "700",
    textTransform: "uppercase",
    paddingTop: 13,
  },
  statusAddress: {
    fontSize: RFPercentage(2.5),
    fontFamily: "Poppins-bold",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  envelopStyle: {
    marginHorizontal: 10,
    width: 37,
    height: 29,
  },
  telephoneStyle: {
    marginHorizontal: 5,
    width: 29,
    height: 29,
  },
});

export default Outlet;
