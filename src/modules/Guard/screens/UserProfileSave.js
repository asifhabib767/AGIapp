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
import userImage from "../images/caruser.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { RFPercentage } from "react-native-responsive-fontsize";

export default class UserProfileSave extends Component {
  render() {
    return (
      <View>
        <ScrollView style={[styles.fullbg]}>
          <SafeAreaView style={styles.container}>
            <View style={[styles.MainContainer]}>
              <View style={[styles.userCardBox]}>
                <View style={{ flexBasis: 75 }}>
                  <Image style={[styles.userImage]} source={userImage} />
                </View>

                <View style={{ flexBasis: "60%" }}>
                  <Text style={[styles.userName]}>A.M. Rafat Rahman </Text>
                </View>
                <View style={{ flexBasis: 85, paddingTop: 25 }}>
                  <Icon
                    style={{ paddingLeft: 8 }}
                    name="save"
                    size={18}
                    color="#393CA4"
                  />
                  <Text style={[styles.editProfile]}> Save </Text>
                </View>
              </View>
            </View>

            <View style={[styles.AccountDetailsArea]}>
              <Text style={[styles.sectionTitle]}> Account Details </Text>

              <View style={[styles.boxGrid]}>
                <View style={{ flexBasis: "45%", marginRight: 10 }}>
                  <View>
                    <Text style={[styles.inputLebel]}> Name </Text>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="A.M. Rafat Rahman"
                    />
                  </View>

                  <View>
                    <Text style={[styles.inputLebel]}> Email </Text>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="Type your email"
                    />
                  </View>

                  <View>
                    <Text style={[styles.inputLebel]}> Phone </Text>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="Type your Phone Number"
                    />
                  </View>

                  <View>
                    <Text style={[styles.inputLebel]}> Password </Text>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="Type your Password"
                    />
                  </View>
                </View>

                <View style={{ flexBasis: "45%" }}>
                  <View>
                    <Text style={[styles.inputLebel]}> District </Text>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="Type your District"
                    />
                  </View>
                  <View>
                    <Text style={[styles.inputLebel]}> Thana </Text>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="Type your Thana"
                    />
                  </View>
                  <View>
                    <Text style={[styles.inputLebel]}> Address </Text>
                    <TextInput
                      style={[styles.InputField]}
                      placeholder="Type your Address"
                    />
                  </View>
                </View>
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
    width: "100%",
    height: "100%",
    paddingHorizontal: 8,
  },

  sectionTitle: {
    fontSize: RFPercentage(3),
    color: "#2D2D2D",
    fontWeight: "700",
    paddingBottom: 10,
  },

  userCardBox: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    paddingVertical: 15,
    paddingLeft: 10,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOpacity: 0.2,
    elevation: 8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderEndColor: "#fff",
    marginTop: 10,
    borderRadius: 20,
  },

  userImage: {
    width: 70,
    height: 70,
    marginTop: 5,
    borderRadius: 50,
    margin: 10,
    padding: 5,
    paddingVertical: 30,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  userName: {
    color: "#353559",
    fontSize: RFPercentage(2.8),
    fontWeight: "700",
    paddingLeft: 10,
    paddingTop: 32,
  },

  location: {
    color: "#919191",
    fontSize: 16,
    borderRadius: 10,
    marginTop: 3,
    textTransform: "uppercase",
    paddingLeft: 10,
  },

  profileMenu: {
    flex: 1,
    flexDirection: "row",
  },

  AccountDetailsArea: {
    backgroundColor: "#fff",
    borderRadius: 10,
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
    color: "#000",
    fontWeight: "bold",
  },

  InputField: {
    height: 40,
    color: "#000",
    fontSize: 20,
    fontSize: 16,
    borderBottomColor: "#DADADA",
    borderStyle: "solid",
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 5,
    fontWeight: "bold",
  },

  editProfile: {
    color: "#8E8E8E",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
  },
});
