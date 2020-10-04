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
// import Calendar from 'react-native-calendar-datepicker';
import Moment from "moment";
import { Actions } from "react-native-router-flux";
import { getAttendanceData } from "../service/hr/AttendanceService";

import { generateStringDateFromDate } from "../Util/DateConfigure";

export default class AttendanceList extends Component {
  state = {
    attendanceList: [],
  };

  async componentDidMount() {
    let attendanceList = await getAttendanceData();
    console.log("data", attendanceList);
    this.setState({ attendanceList });
  }

  render() {
    const BLUE = "#2196F3";
    const WHITE = "#FFFFFF";
    const GREY = "#BDBDBD";
    const BLACK = "#424242";
    const LIGHT_GREY = "#F5F5F5";

    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.AccountDetailsArea]}>
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.pageTitle]}> Attendance List </Text>
            </View>

            <View style={[styles.calenderView]}>
              {/* <Calendar
                                    onChange={(date) => this.setState({date})}
                                    selected={this.state.date}
                                    // We use Moment.js to give the minimum and maximum dates.
                                    minDate={Moment().startOf('day')}
                                    maxDate={Moment().add(10, 'years').startOf('day')}
                                    /> */}
            </View>
          </View>

          <View style={[styles.AccountDetailsArea]}>
            <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
              <View style={{ flexBasis: "62%" }}>
                <Text style={[styles.attendTitle]}> ATTENDANCE DETAILS </Text>
              </View>
              <View style={{ flexBasis: "35%" }}>
                <Text style={[styles.attendSubTitle]}> VIEW DETAILS </Text>
              </View>
            </View>
            <View style={[styles.tableBox]}>
              <View style={{ flexBasis: "33%" }}>
                <Text style={[styles.tableHeading]}> DATE </Text>
              </View>
              <View style={{ flexBasis: "33%" }}>
                <Text style={[styles.tableHeading]}> TIMES </Text>
              </View>
              <View style={{ flexBasis: "33%" }}>
                <Text style={[styles.tableHeading]}> STATUS </Text>
              </View>
            </View>

            <FlatList
              data={this.state.attendanceList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[styles.tableListBox]}>
                  <View style={{ flexBasis: "33%" }}>
                    <Text style={[styles.tableList]}>
                      {" "}
                      {generateStringDateFromDate(item.MonthDate)}{" "}
                    </Text>
                  </View>
                  <View style={{ flexBasis: "33%" }}>
                    <Text style={[styles.tableList]}> 8: 40 PM </Text>
                  </View>
                  <View style={{ flexBasis: "33%" }}>
                    <Text style={[styles.tableList]}>
                      {" "}
                      {item.presentStatus}{" "}
                    </Text>
                  </View>
                </View>
              )}
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
    width: "95%",
    margin: 8,
  },
  AccountDetailsArea: {
    backgroundColor: "#fff",
    borderRadius: 5,
    textAlign: "center",
    marginTop: 10,
    paddingVertical: 15,
    shadowColor: "rgba(0, 0, 0, 5)",
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: { width: 23, height: 1 },
  },
  pageTitle: {
    fontSize: RFPercentage(3),
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  tableBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#2E3192",
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
  },

  attendTitle: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  attendSubTitle: {
    fontSize: RFPercentage(2),
    color: "#434343",
    paddingLeft: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "bold",
  },

  tableHeading: {
    color: "#fff",
    fontSize: RFPercentage(2.5),
  },

  tableListBox: {
    flex: 1,
    flexDirection: "row",
    padding: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 7,
  },

  tableList: {
    color: "#000",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    marginBottom: 5,
    backgroundColor: "#00000017",
    paddingVertical: 7,
  },
});
