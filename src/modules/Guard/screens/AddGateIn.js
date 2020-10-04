import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
// import gasStation from '../images/gas-station.png';
import * as Animatable from "react-native-animatable";
import { Picker } from "@react-native-community/picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import torch from "../images/dashboard-torch.png";
import {
  getType,
  getVehicleType,
  getPassengerType,
  getJobStation,
  getWhomToVisit,
  getVehicleList,
  addGateIn,
} from "../service/gateInOut/GateInOutService";
import Modal from "react-native-modal";
import { translate } from "../translations/Localization";
import { getAsyncData } from "../Util/OfflineData";
// import {dateTimeConvertToDate} from '../Util/DateConfigure'
// import { showFuelReport,showFuelVehilceTypewiseReport, getFuelMonthWiseReport } from '../service/fuel/fuelReportService';

export default class AddGateIn extends Component {
  state = {
    system_lang: "bn",
    isModalVisible: false,
    refreshing: false,
    fueltype: "",
    showDate: "",
    showToDate: "",
    reports: [],
    isDateTimePickerVisible: false,
    isToDateTimePickerVisible: false,
    isSubmitButton: false,

    vehicleType: "",
    vehicleTypeId: 0,
    type: "",
    typeId: 0,
    personType: "",
    personTypeId: 0,
    vehicleNo: "Dha-kha-3256",
    deliveryVehicle: false,
    passengerVehicle: false,
    drivername: "Type",
    error_drivername: "",
    driverNumber: "01xxxxxxxxx",
    error_driver_number: "",
    comment: "Write a note",
    error_comment: "",
    enroll: 0,
    error_enroll: "",
    toWhomVisited: "string",
    toWhomVisitedId: 0,
    fromWhere: "",
    fromWhereId: 0,
    guestName: "Type",
    error_guest_name: "",
    guestContact: "",
    error_guest_contact: "",

    errorMessage: "",
    successMessage: "",
    isLoading: false,

    typeList: [],
    vehicleTypeList: [],
    passengerTypeList: [],
    jobStationList: [],
    whomToVisitList: [],
    vehicleList: [],
  };

  async componentDidMount() {
    await this.getAsyncLanguageCode();
    this.initializeReport();
    this.initializeData();
  }

  getAsyncLanguageCode = async () => {
    let system_lang = await getAsyncData("system_lang");
    this.setState({ system_lang });
  };

  onRefresh() {
    this.setState({ refreshing: true });
    this.initializeReport().then(() => {
      this.setState({ refreshing: false });
    });
  }

  initializeData = async () => {
    // Type List Data
    let typeData = await getType();
    this.setState({
      typeList: typeData,
    });

    // Vehicle Type List Data
    let vehicleTypeData = await getVehicleType();
    this.setState({
      vehicleTypeList: vehicleTypeData,
    });

    // Passenger Type List Data
    let passengerTypeData = await getPassengerType();
    this.setState({
      passengerTypeList: passengerTypeData,
    });

    // Job Station List Data
    let jobStationData = await getJobStation();
    this.setState({
      jobStationList: jobStationData,
    });

    // Whom To Visit List Data
    let whomToVisitData = await getWhomToVisit();
    this.setState({
      whomToVisitList: whomToVisitData,
    });

    // Vehicle List Data
    let vehicleData = await getVehicleList();
    this.setState({
      vehicleList: vehicleData,
    });
  };

  initializeReport = async () => {
    this.setState({
      showDate: this.currentDate(),
      showToDate: this.currentDate(),
    });
  };

  reportShow = async () => {
    let reportObj = {
      fueltype: this.state.fueltype,
      fromDate: this.state.showDate,
      toDate: this.state.showToDate,
    };

    // if (this.state.vehicleType == "FuelType") {
    //   let reports = await showFuelReport(reportObj);
    //   this.setState({ reports });
    // } else if (this.state.vehicleType == "VehicleWise") {
    //   let reports = await showFuelVehilceTypewiseReport(reportObj);
    //   this.setState({ reports });
    // } else if (this.state.vehicleType == "Month") {
    //   let reports = await getFuelMonthWiseReport(reportObj);
    //   this.setState({ reports });
    // }
  };

  // vehicleTypeReport = (value) => {
  //   let reportObj = {
  //     drivername: value.strdrivername,
  //     vehicleNo: value.strVehicleno,
  //     vehicleId: value.intvehicleid,
  //     fromDate: this.state.showDate,
  //     toDate: this.state.showToDate,
  //   };

  //   Actions.ReportList({ reportData: reportObj });
  // };

  // Guard App
  changeDrivername = (inputValue) => {
    this.setState({
      drivername: inputValue,
    });
  };

  changeDriverNumber = (inputValue) => {
    this.setState({
      driverNumber: inputValue,
    });
  };

  changeComment = (inputValue) => {
    this.setState({
      comment: inputValue,
    });
  };

  changeEnroll = (inputValue) => {
    this.setState({
      enroll: inputValue,
    });
  };

  changeGuestName = (inputValue) => {
    this.setState({ guestName: inputValue });
  };

  changeGuestContact = (inputValue) => {
    this.setState({ guestContact: inputValue });
  };

  submit = async () => {
    let postData = [
      {
        intGateEntryID: 0,
        intGuestEnroll: this.state.enroll,
        strGuestName: this.state.guestName,
        intVisitToEnroll: this.state.toWhomVisitedId,
        strVisitToName: this.state.toWhomVisited,
        intCarringTypeID: this.state.vehicleTypeId,
        intOwnerShipID: this.state.typeId,
        intPassengerTypeID: this.state.personTypeId,
        intJobstationID: this.state.fromWhereId,
        strContactNumber: this.state.driverNumber,
        intVehicleID: 0,
        strVehicleName: this.state.vehicleNo,
        strDriverName: this.state.drivername,
        strDriverPhone: this.state.driverNumber,
        strComments: this.state.comment,
        intshippingpoint: 15,
      },
    ];

    let response = await addGateIn(postData);

    console.log("Guard Post Data :>> ", postData);
    console.log("Insert Response :>> ", response);
  };

  toggleModalConfirm = async () => {
    let postData = [
      {
        intGateEntryID: 0,
        intGuestEnroll: this.state.enroll,
        strGuestName: this.state.guestName,
        intVisitToEnroll: this.state.toWhomVisitedId,
        strVisitToName: this.state.toWhomVisited,
        intCarringTypeID: this.state.vehicleTypeId,
        intOwnerShipID: this.state.typeId,
        intPassengerTypeID: this.state.personTypeId,
        intJobstationID: this.state.fromWhereId,
        strContactNumber: this.state.driverNumber,
        intVehicleID: 0,
        strVehicleName: this.state.vehicleNo,
        strDriverName: this.state.drivername,
        strDriverPhone: this.state.driverNumber,
        strComments: this.state.comment,
        intshippingpoint: 15,
      },
    ];

    let response = await addGateIn(postData);
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
        <Animatable.View animation="slideInUp">
          <SafeAreaView style={styles.container}>
            <Modal isVisible={this.state.isModalVisible}>
              <View style={[styles.SuccessfulBox]}>
                <Text style={[styles.secSubTitle]}>
                  {" "}
                  {translate("are_you_sure", this.state.system_lang)}{" "}
                </Text>
                <Text>
                  {" "}
                  {translate("want_to_getin", this.state.system_lang)}{" "}
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

            <View style={[styles.areaBox]}>
              <View>
                <Text style={[styles.headerLabel]}>
                  {translate("add_gate_in", this.state.system_lang)}
                </Text>
              </View>
              <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                <Text style={[styles.inputLebel]}> Type </Text>
                <View>
                  <Picker
                    selectedValue={this.state.vehicleType}
                    style={[styles.Vehicle]}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        vehicleType: itemValue,
                        vehicleTypeId: itemIndex,
                      })
                    }
                  >
                    <Picker.Item label="Select" value="" />
                    {this.state.typeList.map((item, index) => (
                      <Picker.Item
                        label={item.strCarringType}
                        value={item.strCarringType}
                        key={index}
                      />
                    ))}
                    {/* <Picker.Item
                      label="Passenger Vehicle"
                      value="Passenger Vehicle"
                    /> */}
                  </Picker>
                </View>
              </View>

              <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                <Text style={[styles.inputLebel]}> Vehicle No. </Text>
                <View>
                  <Picker
                    selectedValue={this.state.vehicleNo}
                    style={[styles.Vehicle]}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ vehicleNo: itemValue })
                    }
                  >
                    <Picker.Item label="Select" value="" />
                    {this.state.vehicleList.map((item, index) => (
                      <Picker.Item
                        label={item.strRegNo}
                        value={item.strRegNo}
                        key={index}
                      />
                    ))}
                    {/* <Picker.Item label="Dha-Kha-3254" value="dhaKha" />
                    <Picker.Item label="Dha-Met-3256" value="dhaMet" /> */}
                  </Picker>
                </View>
              </View>

              {this.state.vehicleType === "Delivery Vehicle" ? (
                <View>
                  <View
                    style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
                  >
                    <Text style={[styles.inputLebel]}> Driver Name </Text>
                    <View>
                      <View style={{ flexBasis: "100%" }}>
                        <TextInput
                          style={[styles.InputField]}
                          placeholder="Type"
                          placeholderTextColor={"#000000"}
                          value={this.state.drivername}
                          onChangeText={(value) => this.changeDrivername(value)}
                          returnKeyType={"next"}
                          onSubmitEditing={() => {
                            this.secondTextInput.focus();
                          }}
                        />

                        {this.state.error_drivername.length > 0 && (
                          <Text style={{ color: "red" }}>
                            {this.state.error_drivername}
                          </Text>
                        )}
                      </View>
                    </View>

                    <Text style={[styles.inputLebel]}> Driver Number </Text>
                    <View>
                      <View style={{ flexBasis: "100%" }}>
                        <TextInput
                          ref={(input) => {
                            this.secondTextInput = input;
                          }}
                          style={[styles.InputField]}
                          placeholder="Type"
                          placeholderTextColor={"#000000"}
                          value={this.state.driverNumber}
                          onChangeText={(value) =>
                            this.changeDriverNumber(value)
                          }
                          returnKeyType={"next"}
                          onSubmitEditing={() => {
                            this.thirdTextInput.focus();
                          }}
                        />

                        {this.state.error_driver_number.length > 0 && (
                          <Text style={{ color: "red" }}>
                            {this.state.error_driver_number}
                          </Text>
                        )}
                      </View>
                    </View>

                    <Text style={[styles.inputLebel]}> Comments </Text>
                    <View>
                      <View style={{ flexBasis: "100%" }}>
                        <TextInput
                          ref={(input) => {
                            this.thirdTextInput = input;
                          }}
                          style={[styles.InputField]}
                          placeholder="Type here"
                          placeholderTextColor={"#000000"}
                          value={this.state.comment}
                          onChangeText={(value) => this.changeComment(value)}
                          returnKeyType={"go"}
                        />

                        {this.state.error_comment.length > 0 && (
                          <Text style={{ color: "red" }}>
                            {this.state.error_comment}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              ) : null}

              {this.state.vehicleType === "Passenger Vehicle" ? (
                <View>
                  <View
                    style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
                  >
                    <Text style={[styles.inputLebel]}> Vehicle Type </Text>
                    <View>
                      <Picker
                        selectedValue={this.state.type}
                        style={[styles.Vehicle]}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({
                            type: itemValue,
                            typeId: itemIndex,
                          })
                        }
                      >
                        <Picker.Item label="Select" value="" />
                        {this.state.vehicleTypeList.map((item, index) => (
                          <Picker.Item
                            label={item.strOwernerShip}
                            value={item.strOwernerShip}
                            key={index}
                          />
                        ))}
                        {/* <Picker.Item label="Company" value="Company" />
                        <Picker.Item label="Personal" value="personal" />
                        <Picker.Item label="N/A" value="others" /> */}
                      </Picker>
                    </View>
                  </View>
                </View>
              ) : null}

              {this.state.vehicleType === "Passenger Vehicle" &&
              this.state.type === "Company" ? (
                <View>
                  <View
                    style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
                  >
                    <Text style={[styles.inputLebel]}> Person Type </Text>
                    <View>
                      <Picker
                        selectedValue={this.state.personType}
                        style={[styles.Vehicle]}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({
                            personType: itemValue,
                            personTypeId: itemIndex,
                          })
                        }
                      >
                        <Picker.Item label="Select" value="" />
                        {this.state.passengerTypeList.map((item, index) => (
                          <Picker.Item
                            label={item.strPassengerType}
                            value={item.strPassengerType}
                            key={index}
                          />
                        ))}
                        {/* <Picker.Item label="Staff" value="staff" />
                        <Picker.Item label="Guest" value="guest" /> */}
                      </Picker>
                    </View>
                  </View>
                </View>
              ) : null}

              {/* Vehicle Type: Passenger, Type: Company, Person Type Staff */}
              {this.state.vehicleType === "Passenger Vehicle" &&
              this.state.type === "Company" &&
              this.state.personType === "Staff" ? (
                <View>
                  <Text style={[styles.inputLebel]}> Enroll </Text>
                  <View>
                    <View style={{ flexBasis: "100%" }}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Type"
                        placeholderTextColor={"#000000"}
                        value={this.state.enroll}
                        onChangeText={(value) => this.changeEnroll(value)}
                        returnKeyType={"next"}
                        // onSubmitEditing={() => {
                        //   this.secondTextInput.focus();
                        // }}
                      />

                      {this.state.error_enroll.length > 0 && (
                        <Text style={{ color: "red" }}>
                          {this.state.error_enroll}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View
                    style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
                  >
                    <Text style={[styles.inputLebel]}>
                      {" "}
                      To Whom to Visited?{" "}
                    </Text>
                    <View>
                      <Picker
                        selectedValue={this.state.toWhomVisited}
                        style={[styles.Vehicle]}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({
                            toWhomVisited: itemValue,
                            toWhomVisitedId: itemIndex,
                          })
                        }
                      >
                        <Picker.Item label="Select" value="" />
                        {this.state.whomToVisitList.map((item, index) => (
                          <Picker.Item
                            label={item.strEmployeeName}
                            value={item.strEmployeeName}
                            key={index}
                          />
                        ))}
                        {/* <Picker.Item label="GM Sir" value="gm" />
                        <Picker.Item label="Director Sir" value="director" /> */}
                      </Picker>
                    </View>
                  </View>

                  <View
                    style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
                  >
                    <Text style={[styles.inputLebel]}> From Where? </Text>
                    <View>
                      <Picker
                        selectedValue={this.state.fromWhere}
                        style={[styles.Vehicle]}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({
                            fromWhere: itemValue,
                            fromWhereId: itemIndex,
                          })
                        }
                      >
                        <Picker.Item label="Select" value="" />
                        {this.state.jobStationList.map((item, index) => (
                          <Picker.Item
                            label={item.strJobStationName}
                            value={item.strJobStationName}
                            key={index}
                          />
                        ))}
                        {/* <Picker.Item label="Head Office" value="headoffice" />
                        <Picker.Item label="Panthapath" value="panthapath" /> */}
                      </Picker>
                    </View>
                  </View>
                </View>
              ) : null}

              {/* Vehicle Type: Passenger, Type: Company, Person Type Guest */}
              {this.state.vehicleType === "Passenger Vehicle" &&
              this.state.type === "Company" &&
              this.state.personType === "Guest" ? (
                <View>
                  <Text style={[styles.inputLebel]}> Guest Name </Text>
                  <View>
                    <View style={{ flexBasis: "100%" }}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Type"
                        placeholderTextColor={"#000000"}
                        value={this.state.guestName}
                        onChangeText={(value) => this.changeGuestName(value)}
                        returnKeyType={"next"}
                        // onSubmitEditing={() => {
                        //   this.secondTextInput.focus();
                        // }}
                      />

                      {this.state.error_guest_name.length > 0 && (
                        <Text style={{ color: "red" }}>
                          {this.state.error_guest_name}
                        </Text>
                      )}
                    </View>
                  </View>

                  <Text style={[styles.inputLebel]}> Guest Contact </Text>
                  <View>
                    <View style={{ flexBasis: "100%" }}>
                      <TextInput
                        style={[styles.InputField]}
                        placeholder="Type"
                        placeholderTextColor={"#000000"}
                        value={this.state.guestContact}
                        onChangeText={(value) => this.changeGuestContact(value)}
                        returnKeyType={"next"}
                        // onSubmitEditing={() => {
                        //   this.secondTextInput.focus();
                        // }}
                      />

                      {this.state.error_guest_contact.length > 0 && (
                        <Text style={{ color: "red" }}>
                          {this.state.error_guest_contact}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View
                    style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
                  >
                    <Text style={[styles.inputLebel]}>
                      {" "}
                      To Whom to Visited?{" "}
                    </Text>
                    <View>
                      <Picker
                        selectedValue={this.state.toWhomVisited}
                        style={[styles.Vehicle]}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({ toWhomVisited: itemValue })
                        }
                      >
                        <Picker.Item label="Select" value="" />
                        {this.state.whomToVisitList.map((item, index) => (
                          <Picker.Item
                            label={item.strEmployeeName}
                            value={item.strEmployeeName}
                            key={index}
                          />
                        ))}
                        {/* <Picker.Item label="GM Sir" value="gm" />
                        <Picker.Item label="Director Sir" value="director" /> */}
                      </Picker>
                    </View>
                  </View>

                  <View
                    style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
                  >
                    <Text style={[styles.inputLebel]}> From Where? </Text>
                    <View>
                      <Picker
                        selectedValue={this.state.fromWhere}
                        style={[styles.Vehicle]}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({ fromWhere: itemValue })
                        }
                      >
                        <Picker.Item label="Select" value="" />
                        {this.state.jobStationList.map((item, index) => (
                          <Picker.Item
                            label={item.strJobStationName}
                            value={item.strJobStationName}
                            key={index}
                          />
                        ))}
                        {/* <Picker.Item label="Head Office" value="headoffice" />
                        <Picker.Item label="Panthapath" value="panthapath" /> */}
                      </Picker>
                    </View>
                  </View>
                </View>
              ) : null}
            </View>

            <View style={{ marginTop: 10 }}>
              <TouchableOpacity onPress={() => this.toggleModal()}>
                <Text style={styles.buttonStyle}>
                  {translate("get_in", this.state.system_lang)}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: "#fff",
    height: 700,
  },
  container: {
    paddingHorizontal: 12,
    width: "100%",
  },

  inputLebel: {
    fontSize: RFPercentage(2.5),
    textAlign: "left",
    color: "#000000",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  areaBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 3, height: 2 },
    width: "100%",
  },
  Vehicle: {
    color: "#000",
  },
  buttonStyle: {
    backgroundColor: "#3EC48A",
    color: "#fff",
    fontSize: RFPercentage(3),
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 35,
    textTransform: "uppercase",
    borderRadius: 10,
  },
  boxBOrder: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginVertical: 5,
    width: "100%",
    borderWidth: 2,
    borderColor: "#D4D4D4",
  },
  date: {
    color: "#000000",
    fontSize: RFPercentage(2),
  },
  driverName: {
    color: "#000000",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
  pumLocation: {
    color: "#000000",
    fontSize: RFPercentage(2.2),
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  fuelLitter: {
    color: "#000000",
    fontSize: RFPercentage(2.2),
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  totalAmount: {
    color: "#000000",
    fontSize: RFPercentage(2.5),
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  totalAmountRate: {
    color: "#2E3192",
    fontSize: RFPercentage(3.5),
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  headerLabel: {
    fontSize: RFPercentage(3.5),
    textAlign: "left",
    color: "#000000",
    fontWeight: "bold",
    textTransform: "capitalize",
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
