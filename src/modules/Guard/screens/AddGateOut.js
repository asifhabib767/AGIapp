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
  RefreshControl,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/FontAwesome";
import filterIcon from "../images/Activiy-list.png";
import vehicel from "../images/car.png";
import caruser from "../images/caruser.png";
import panicAlert from "../images/dashboard-alert.png";
import emergencyAlert from "../images/dashboard-emergency.png";
import torch from "../images/dashboard-torch.png";
// import { Actions } from "react-native-router-flux";
// import CustomSearchbar from "../components/CustomSearchbar";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";
import {
  getVehicleDetails,
  addGateOut,
} from "../service/gateInOut/GateInOutService";
import Modal from "react-native-modal";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";

// import * as LocalizeHelper from '../Util/LocalizeHelper';
// import * as RNLocalize from "react-native-localize";

export default class AddGateOut extends Component {
  state = {
    system_lang: "bn",
    refreshing: false,
    isModalVisible: false,
    vehicleDetailsId: {
      partId: 2,
      unitId: 4,
      shippingPointId: this.props.route.params.data.intShippingPointID,
      autoId: this.props.route.params.data.intAutoID,
    },
    ownerName: "",
    entryTime: "",
    entryDate: "",
    vehicleType: "",
    whomToVisit: "",
    fromWhere: "",
  };

  async componentDidMount() {
    await this.getAsyncLanguageCode();
    this.initializeData();
  }

  getAsyncLanguageCode = async () => {
    let system_lang = await getAsyncData("system_lang");
    this.setState({ system_lang });
  };

  initializeData = async () => {
    let vehicleDetails = await getVehicleDetails(this.state.vehicleDetailsId);

    this.setState({
      ownerName:
        vehicleDetails[0].strDriverName != null
          ? vehicleDetails[0].strDriverName
          : vehicleDetails[0].strGuestName,
      entryTime: vehicleDetails[0].dteGateInDateTime.substring(11, 19),
      entryDate: vehicleDetails[0].dteGateInDateTime.substring(0, 10),
      vehicleType: vehicleDetails[0].strOwernerShip,
      whomToVisit: vehicleDetails[0].strVisitToName,
      fromWhere: vehicleDetails[0].strJobStationName,
    });
  };

  onRefresh() {
    this.setState({ refreshing: true });
    this.initializeData().then(() => {
      this.setState({ refreshing: false });
    });
  }

  // submit = async () => {
  //   let postData = [
  //     {
  //       intGateEntryID: this.state.vehicleDetailsId.autoId,
  //       intVehicleID: this.state.vehicleDetailsId.autoId,
  //       strVehicleName: "string",
  //       intshippingpoint: this.state.vehicleDetailsId.shippingPointId,
  //     },
  //   ];

  //   let response = await addGateOut(postData);

  //   console.log("Get Out Post Data :>> ", postData);
  //   console.log("Insert Response :>> ", response);
  // };

  toggleModalConfirm = async () => {
    // const smsList = await postsmsforchallan(
    //   this.props.itemData.intId,
    //   this.props.itemData.intTripId,
    //   0
    // );

    let postData = [
      {
        intGateEntryID: this.state.vehicleDetailsId.autoId,
        intVehicleID: this.state.vehicleDetailsId.autoId,
        strVehicleName: "string",
        intshippingpoint: this.state.vehicleDetailsId.shippingPointId,
      },
    ];

    let response = await addGateOut(postData);

    if (response.data.length != 0) {
      this.props.navigation.navigate("gateInOutList");
    } else {
      // alert("Please fill all the data and try again !");
    }

    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <ScrollView
        style={[styles.fullbg]}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      >
        <SafeAreaView style={[styles.container]}>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={[styles.SuccessfulBox]}>
              <Text style={[styles.secSubTitle]}>
                {" "}
                {translate("are_you_sure", this.state.system_lang)}{" "}
              </Text>
              <Text>
                {" "}
                {translate("want_to_get_out", this.state.system_lang)}{" "}
              </Text>
              <View
                style={{ flex: 1, flexDirection: "row", paddingVertical: 20 }}
              >
                <Text
                  onPress={this.toggleModalConfirm}
                  style={[styles.yesbutton]}
                >
                  {" "}
                  {translate("yes", this.state.system_lang)}{" "}
                </Text>
                <Text onPress={this.toggleModal} style={[styles.nobutton]}>
                  {" "}
                  {translate("no", this.state.system_lang)}{" "}
                </Text>
              </View>
            </View>
          </Modal>

          <View style={[styles.selectBox]}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flexBasis: "70%" }}>
                <Text style={[styles.headTitle]}>
                  {translate("gate_out", this.state.system_lang)}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.selectBox]}>
            {/* <View
              style={{ flex: 1, flexDirection: "row", paddingVertical: 20 }}
            >
              <View style={{ flexBasis: "85%" }}>
                <Text style={[styles.shipDate]}> Name </Text>
              </View>
              <View style={{ flexBasis: "22%" }}>
                <Text style={[styles.shipDate]}> Time </Text>
              </View>
            </View> */}

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingVertical: 20,
                borderBottomColor: "#D6D6D6",
                borderBottomWidth: 1,
              }}
            >
              <View style={{ flexBasis: 60 }}>
                <Image source={vehicel} style={[styles.iconStyle]} />
              </View>
              <View style={{ flexBasis: "70%" }}>
                <Text style={[styles.shipmentNo]}>{this.state.ownerName}</Text>
                <Text style={styles.gateIn}>Gate In</Text>
              </View>
              {/* <View style={{ flexBasis: 60 }}>
                <Text style={[styles.time]}>19:38:36</Text>
                <Text style={[styles.date]}>2020-06-24</Text>
              </View> */}
            </View>

            <View
              style={{ flex: 1, flexDirection: "row", paddingVertical: 20 }}
            >
              <View style={{ flexBasis: "75%" }}>
                <Text style={[styles.shipDate]}>
                  {" "}
                  {translate("entry_time", this.state.system_lang)}{" "}
                </Text>
              </View>
              <View style={{ flexBasis: "22%" }}>
                <Text style={[styles.shipDate]}>
                  {" "}
                  {translate("entry_date", this.state.system_lang)}{" "}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingVertical: 20,
                borderBottomColor: "#D6D6D6",
                borderBottomWidth: 1,
              }}
            >
              <View style={{ flexBasis: "75%" }}>
                <Text style={[styles.time]}>{this.state.entryTime}</Text>
              </View>
              <View style={{ flexBasis: "22%" }}>
                <Text style={[styles.date]}>{this.state.entryDate}</Text>
              </View>
            </View>

            <View
              style={{ flex: 1, flexDirection: "row", paddingVertical: 20 }}
            >
              <View style={{ flexBasis: "75%" }}>
                <Text style={[styles.shipDate]}>
                  {" "}
                  {translate("vehicle_type", this.state.system_lang)}{" "}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingVertical: 20,
                borderBottomColor: "#D6D6D6",
                borderBottomWidth: 1,
              }}
            >
              <View style={{ flexBasis: "75%" }}>
                <Text style={[styles.time]}>{this.state.vehicleType}</Text>
              </View>
            </View>

            <View
              style={{ flex: 1, flexDirection: "row", paddingVertical: 20 }}
            >
              <View style={{ flexBasis: "75%" }}>
                <Text style={[styles.shipDate]}>
                  {" "}
                  {translate("whom_to_visit", this.state.system_lang)}{" "}
                </Text>
              </View>
              <View style={{ flexBasis: "22%" }}>
                <Text style={[styles.shipDate]}>
                  {" "}
                  {translate("from_where", this.state.system_lang)}{" "}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingVertical: 20,
                borderBottomColor: "#D6D6D6",
                borderBottomWidth: 1,
              }}
            >
              <View style={{ flexBasis: "75%" }}>
                <Text style={[styles.time]}>{this.state.whomToVisit}</Text>
              </View>
              <View style={{ flexBasis: "22%" }}>
                <Text style={[styles.date]}>{this.state.fromWhere}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={() => this.toggleModal()}>
              <Text style={styles.buttonStyle}>
                {translate("get_out", this.state.system_lang)}
              </Text>
            </TouchableOpacity>
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
    margin: 8,
  },
  selectBox: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    marginBottom: 5,
    padding: 10,
    paddingLeft: 10,
    marginTop: 5,
    justifyContent: "center",
    paddingVertical: 15,
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 1 },
  },
  headTitle: {
    fontSize: RFPercentage(3.5),
    color: "#000000",
    fontWeight: "bold",
  },
  shipmentNo: {
    fontSize: RFPercentage(3),
    color: "#000000",
    fontWeight: "bold",
  },
  shipDate: {
    fontSize: RFPercentage(2.5),
    color: "#272727",
  },
  iconStyle: {
    width: 55,
    height: 55,
    backgroundColor: "#4346B6",
    resizeMode: "contain",
  },
  searchIconStyle: {
    width: 35,
    height: 35,
    backgroundColor: "#4346B6",
    resizeMode: "contain",
  },
  selects: {
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 1 },
    backgroundColor: "#fff",
    borderRadius: 50,
    flexBasis: "30%",
    height: 42,
    lineHeight: 42,
  },
  carDetails: {
    fontSize: RFPercentage(2),
    color: "#272727",
    paddingVertical: 5,
  },
  carOwner: {
    fontSize: RFPercentage(2.2),
    color: "#272727",
    paddingVertical: 8,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  carStyle: {
    width: 15,
    height: 15,
  },
  buttonStyle: {
    backgroundColor: "#E04236",
    color: "#fff",
    fontSize: RFPercentage(3),
    textAlign: "center",
    paddingVertical: 8,
    borderRadius: 50,
  },
  gateIn: {
    backgroundColor: "#11D6A0",
    color: "#fff",
    fontSize: RFPercentage(2),
    textAlign: "center",
    paddingVertical: 6,
    borderRadius: 50,
    width: 85,
    height: 30,
    textTransform: "uppercase",
  },
  gateOut: {
    backgroundColor: "#E04236",
    color: "#fff",
    fontSize: RFPercentage(2),
    textAlign: "center",
    paddingVertical: 6,
    borderRadius: 50,
    width: 85,
    height: 30,
    textTransform: "uppercase",
  },
  time: {
    fontSize: RFPercentage(2.5),
    color: "#000000",
    // fontWeight: "bold",
  },
  date: {
    fontSize: RFPercentage(2.5),
    color: "#000000",
  },
  footerBox: {
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    marginVertical: 8,
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 23, height: 1 },
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  SuccessfulBox: {
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 10,
    height: 250,
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  secSubTitle: {
    color: "#232A2F",
    fontSize: 16,
    textAlign: "center",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
  yesbutton: {
    backgroundColor: "#34C787",
    width: 100,
    height: 40,
    textAlign: "center",
    lineHeight: 40,
    color: "#fff",
    borderRadius: 50,
    marginRight: 10,
    fontSize: RFPercentage(2.5),
  },
  nobutton: {
    backgroundColor: "#D32F2F",
    width: 100,
    height: 40,
    textAlign: "center",
    lineHeight: 40,
    color: "#fff",
    borderRadius: 50,
    fontSize: RFPercentage(2.5),
  },
});
