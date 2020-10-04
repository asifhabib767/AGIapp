import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import { getMovementList } from "../service/hr/HrMovement";

export default class HrMovement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      movementType: "",
      movement: "",
    };
  }

  async componentDidMount() {
    let movement = await getMovementList();
    console.log("movement is", movement);

    this.setState({
      movement,
    });
  }
  //   showDateTimePicker = () => {
  //     this.setState({ isDateTimePickerVisible: true });
  //   };

  //   hideDateTimePicker = () => {
  //     this.setState({ isDateTimePickerVisible: false });
  //   };

  //   handleDatePicked = date => {
  //     console.log("A date has been picked: ", date);
  //     this.hideDateTimePicker();
  //   };

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.AccountDetailsArea]}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flexBasis: "36%" }}>
                <Text style={[styles.headingOne]}> Movement </Text>
              </View>
              <View
                style={{
                  flexBasis: "50%",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={[styles.styleButtionTwo]}
                  onPress={() =>
                    this.props.navigation.navigate("hrAddMovement")
                  }
                >
                  {" "}
                  Add <Icon name="plus" />{" "}
                </Text>
              </View>
            </View>

            <View
              style={{ flex: 1, flexDirection: "row", paddingVertical: 10 }}
            >
              <View style={{ flexBasis: "50%" }}>
                <Text style={[styles.statusTitle]}> Name </Text>
              </View>
              <View
                style={{
                  flexBasis: "50%",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={[styles.statusTitle]}> Status </Text>
              </View>
            </View>
            <FlatList
              data={this.state.movement}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    borderBottomColor: "#ACACAC",
                    borderBottomWidth: 0.5,
                    paddingVertical: 10,
                  }}
                >
                  <View
                    style={{
                      flexBasis: "65%",
                      borderLeftColor: "#1E33CC",
                      borderLeftWidth: 5,
                      paddingLeft: 5,
                    }}
                  >
                    <Text style={[styles.statusDate]}>
                      {" "}
                      <Text style={[styles.statusBold]}>
                        {" "}
                        From{" "}
                      </Text> 2019-12-15{" "}
                      <Text style={[styles.statusBold]}>
                        {" "}
                        To{" "}
                      </Text> 2019-12-15{" "}
                    </Text>
                    <Text style={[styles.statusAddress]}>
                      {" "}
                      {item.strReason}{" "}
                    </Text>
                    <Text style={[styles.statusLeave]}>
                      {" "}
                      {item.strMoveType}{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexBasis: "25%",
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginVertical: 12,
                    }}
                  >
                    {/* <Text style={[styles.statusPending]}> Pending </Text> */}
                    <Text
                      style={
                        item.srtStatus === "Pending"
                          ? styles.statusPending
                          : styles.statusApproved
                      }
                    >
                      {" "}
                      {item.srtStatus}{" "}
                    </Text>
                  </View>
                  <View style={{ flexBasis: "10%", marginVertical: 12 }}>
                    <Text style={[styles.closeIcon]}>
                      {" "}
                      <Icon name="close" size={16} />{" "}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
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
    width: "96%",
    margin: 4,
  },
  AccountDetailsArea: {
    backgroundColor: "#fff",
    borderRadius: 5,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingVertical: 15,
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: { width: 23, height: 113 },
  },

  styleButtionTwo: {
    backgroundColor: "#585CDB",
    color: "#fff",
    fontSize: RFPercentage(2.2),
    width: "40%",
    textAlign: "center",
    fontFamily: "Poppins-bold",
    fontWeight: "700",
    paddingVertical: 10,
    borderRadius: 50,
  },

  headingOne: {
    fontSize: 19,
    fontFamily: "Poppins-bold",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 2,
    paddingTop: 5,
  },
  statusTitle: {
    fontSize: RFPercentage(2),
    paddingTop: 5,
  },

  statusPending: {
    backgroundColor: "#ACACAC",
    color: "#fff",
    fontSize: RFPercentage(2, 2),
    textAlign: "center",
    fontFamily: "Poppins-bold",
    fontWeight: "700",
    paddingVertical: 7,
    borderRadius: 50,
    marginRight: 5,
    width: "100%",
    height: 35,
  },
  statusApproved: {
    backgroundColor: "#3EC48A",
    color: "#fff",
    fontSize: RFPercentage(2, 2),
    textAlign: "center",
    fontFamily: "Poppins-bold",
    fontWeight: "700",
    paddingVertical: 7,
    borderRadius: 50,
    marginRight: 5,
    width: "100%",
    height: 35,
  },
  closeIcon: {
    backgroundColor: "#FB5E5E",
    color: "#fff",
    textAlign: "center",
    borderRadius: 100,
    paddingVertical: 8,
    borderRadius: 50,
    height: 35,
  },
  statusAddress: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },

  statusLeave: {
    fontSize: RFPercentage(2.2),
    color: "#888888",
    fontWeight: "bold",
  },
  statusBold: {
    fontSize: RFPercentage(2),
    color: "#000",
    fontWeight: "bold",
  },
});
