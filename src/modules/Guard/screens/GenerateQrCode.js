import React, { Component } from "react";
import QRCode from "react-native-qrcode-svg";
import { View, StyleSheet, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const GetInQrCodeGenerator = (props) => {
  let code = props.route.params.qrData;

  // const CheckpointCodeValue = code.intFloorId + "^" + code.strCheckpointName;
  const CheckpointCodeValue =
    "U" +
    code.intUnitID +
    "J" +
    code.intJobStationId +
    "F" +
    code.intFloorId +
    "C" +
    code.intCheckpointId;

  return (
    <View style={styles.container}>
      <Text style={styles.tripCode}>
        Your Unit Id Is : <Text style={styles.qrText}>{code.intUnitID}</Text>
      </Text>
      <Text style={styles.regiText}>
        Job Station Id is :{" "}
        <Text style={styles.qrText}>{code.intJobStationId}</Text>
      </Text>
      <Text style={styles.regiText}>
        Floor Id is : <Text style={styles.qrText}>{code.intFloorId}</Text>
      </Text>
      <View style={styles.qrcode}>
        <QRCode value={CheckpointCodeValue} />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            margin: 50,
            fontSize: RFPercentage(2),
            fontWeight: "bold",
          }}
        >
          <Text style={styles.qrText}>U{code.intUnitID}</Text>
          <Text style={styles.qrText}>J{code.intJobStationId}</Text>
          <Text style={styles.qrText}>F{code.intFloorId}</Text>
          <Text style={styles.qrText}>C{code.intCheckpointId}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tripCode: {
    textAlign: "center",
    fontSize: 25,
    padding: 20,
  },
  qrText: {
    color: "#000",
  },
  regiText: {
    fontSize: 14,
    textAlign: "center",
  },
  qrcode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
  },
});
export default GetInQrCodeGenerator;
