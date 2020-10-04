import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import Header from "./../../Master/components/header/Header";
import { IappsNetInfo } from "./../../Master/components/netInfo/IappsNetInfo";

import VoyageHeader from "../components/VoyageHeader";
import { exhtEngineThreeSubmit } from "../actions/ExhtEngineAction";

const ExhtEngineThree = (props) => {
  const [state, setState] = React.useState({
    system_lang: "bn",
    refreshing: false,

    dceRH: 0,
    dceLoad: 0,
    dceExhtTemp1: 0,
    dceExhtTemp2: 0,
    dceJacketTemp: 0,
    dceScavTemp: 0,
    dceLubOilTemp: 0,
    dceTCRPM: 0,
    dceJacketPressure: 0,
    dceScavPressure: 0,
    dceLubOilPressure: 0,

    voyagePropsData: props.route.params.voyagePropsData,
  });
  const isFocused = useIsFocused();

  const { navigate } = props.navigation;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await getInitialData();
    }
    fetchData();
  }, []);

  const gotoActivity = (routeName) => {
    props.navigation.navigate(routeName);
  };

  const getInitialData = async () => {
    //
  };

  const onRefresh = () => {
    getInitialData();
  };

  const handleInputChange = (inputkey, inputValue) => {
    let cloneObj = { ...state };
    cloneObj[inputkey] = inputValue;
    setState(cloneObj);
  };

  const searchText = async (searchRequestText) => {
    let netStatus = await IappsNetInfo();

    if (state.warehouseName == "") {
      Alert.alert("Error", "Please Select ware house");
      return false;
    }
    let cloneObj = { ...state };
    if (searchRequestText.length > 0) {
      let getSearchValue = {};
      getSearchValue.data = [];

      if (!netStatus) {
        // getSearchValue.data = await itemSearchgetbyOffline(searchRequestText);
      } else {
      }
      console.log("getSearchValue", getSearchValue);

      const newData = getSearchValue.data.filter(function (item) {
        const itemData = item.intItemID + " " + item.strItemFullName;
        const textData = searchRequestText.toUpperCase();
        return itemData.toUpperCase().indexOf(textData) > -1;
      });
      console.log("newData", newData);
      cloneObj.searchRequestText = searchRequestText;
      cloneObj.searchOrderList = newData;
      setState(cloneObj);
    } else {
      cloneObj.searchOrderList = state.LoadedData;
      cloneObj.searchRequestText = "";
      setState(cloneObj);
    }
  };

  const submit = async () => {
    if (state.dceRH === 0) {
      Alert.alert("Warning", "Please give RH");
      return false;
    }
    if (state.dceLoad === 0) {
      Alert.alert("Warning", "Please give Load");
      return false;
    }
    if (state.dceExhtTemp1 === 0) {
      Alert.alert("Warning", "Please give Exht Temp 1");
      return false;
    }
    if (state.dceExhtTemp2 === 0) {
      Alert.alert("Warning", "Please give Exht Temp 2");
      return false;
    }
    if (state.dceJacketTemp === 0) {
      Alert.alert("Warning", "Please give Jacket Temp");
      return false;
    }
    if (state.dceScavTemp === 0) {
      Alert.alert("Warning", "Please give Scav Temp");
      return false;
    }
    if (state.dceLubOilTemp === 0) {
      Alert.alert("Warning", "Please give Lub Oil Temp");
      return false;
    }
    if (state.dceTCRPM === 0) {
      Alert.alert("Warning", "Please give TCRPM");
      return false;
    }
    if (state.dceJacketPressure === 0) {
      Alert.alert("Warning", "Please give Jacket Pressure");
      return false;
    }
    if (state.dceScavPressure === 0) {
      Alert.alert("Warning", "Please give Scav Pressure");
      return false;
    }
    if (state.dceLubOilPressure === 0) {
      Alert.alert("Warning", "Please give Lub Oil Pressure");
      return false;
    }

    let response = await exhtEngineThreeSubmit(props.route.params, state);
    if (response.status) {
      Alert.alert("Success", response.data.message);
      props.navigation.navigate("voyageActivity");
    } else {
      Alert.alert("Warning", "Something is wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <ScrollView>
        <View>
          <Header title="Exht Engine 3" />

          <View style={[styles.container]}>
            <VoyageHeader headerProps={state.voyagePropsData} />
            <View>
              <View>
                <Text style={[styles.labelstyletwo]}>EXHT.ENGINE 3</Text>
              </View>

              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexBasis: "47%",
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                >
                  <View>
                    <Text style={[styles.labelstylethree]}>R/H</Text>
                  </View>
                  <View>
                    <View style={[styles.inputBoxStyle]}>
                      <View>
                        <TextInput
                          placeholder="0"
                          placeholderTextColor={"#000000"}
                          fontSize={20}
                          fontWeight={"bold"}
                          paddingLeft={10}
                          keyboardType="numeric"
                          value={state.dceRH}
                          onChangeText={(value) =>
                            handleInputChange("dceRH", value)
                          }
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ flexBasis: "47%" }}>
                  <View>
                    <Text style={[styles.labelstylethree]}>Load (KW)</Text>
                  </View>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="0"
                        placeholderTextColor={"#000000"}
                        fontSize={20}
                        fontWeight={"bold"}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceLoad}
                        onChangeText={(value) =>
                          handleInputChange("dceLoad", value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexBasis: "32%",
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                >
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: "#000000",
                            fontSize: 20,
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        Exht. Temp.
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexBasis: "30%" }}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="MIN"
                        placeholderTextColor={"#000000"}
                        fontSize={20}
                        fontWeight={"bold"}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceExhtTemp1}
                        onChangeText={(value) =>
                          handleInputChange("dceExhtTemp1", value)
                        }
                      />
                    </View>
                  </View>
                </View>

                <View style={{ flexBasis: "30%", marginLeft: 10 }}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="MAX"
                        placeholderTextColor={"#000000"}
                        fontSize={20}
                        fontWeight={"bold"}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceExhtTemp2}
                        onChangeText={(value) =>
                          handleInputChange("dceExhtTemp2", value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexBasis: "32%",
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                >
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: "#000000",
                            fontSize: 20,
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        Jacket Temp.
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexBasis: "63%" }}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="0"
                        placeholderTextColor={"#000000"}
                        fontSize={20}
                        fontWeight={"bold"}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceJacketTemp}
                        onChangeText={(value) =>
                          handleInputChange("dceJacketTemp", value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexBasis: "32%",
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                >
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: "#000000",
                            fontSize: 20,
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        SCAV Temp.
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexBasis: "63%" }}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="0"
                        placeholderTextColor={"#000000"}
                        fontSize={20}
                        fontWeight={"bold"}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceScavTemp}
                        onChangeText={(value) =>
                          handleInputChange("dceScavTemp", value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexBasis: "32%",
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                >
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: "#000000",
                            fontSize: 20,
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        Lub Oil Temp.
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexBasis: "63%" }}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="0"
                        placeholderTextColor={"#000000"}
                        fontSize={20}
                        fontWeight={"bold"}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceLubOilTemp}
                        onChangeText={(value) =>
                          handleInputChange("dceLubOilTemp", value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexBasis: "32%",
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                >
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: "#000000",
                            fontSize: 20,
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        T/C RPM
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexBasis: "63%" }}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="0"
                        placeholderTextColor={"#000000"}
                        fontSize={20}
                        fontWeight={"bold"}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceTCRPM}
                        onChangeText={(value) =>
                          handleInputChange("dceTCRPM", value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexBasis: "32%",
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                >
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: "#000000",
                            fontSize: 20,
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        Jacket Pressure
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexBasis: "63%" }}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="0"
                        placeholderTextColor={"#000000"}
                        fontSize={20}
                        fontWeight={"bold"}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceJacketPressure}
                        onChangeText={(value) =>
                          handleInputChange("dceJacketPressure", value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexBasis: "32%",
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                >
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: "#000000",
                            fontSize: 20,
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        SCAV Pressure
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexBasis: "63%" }}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="0"
                        placeholderTextColor={"#000000"}
                        fontSize={20}
                        fontWeight={"bold"}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceScavPressure}
                        onChangeText={(value) =>
                          handleInputChange("dceScavPressure", value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexBasis: "32%",
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                >
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.Inputtitle,
                          {
                            color: "#000000",
                            fontSize: 20,
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        Lub Oil Pressure
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexBasis: "63%" }}>
                  <View style={[styles.inputBoxStyle]}>
                    <View>
                      <TextInput
                        placeholder="0"
                        placeholderTextColor={"#000000"}
                        fontSize={20}
                        fontWeight={"bold"}
                        paddingLeft={10}
                        keyboardType="numeric"
                        value={state.dceLubOilPressure}
                        onChangeText={(value) =>
                          handleInputChange("dceLubOilPressure", value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexBasis: "45%",
                    marginLeft: 15,
                    marginRight: 5,
                    marginTop: 10,
                    marginBottom: 40,
                  }}
                >
                  <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("voyageActivity")
                      }
                    >
                      <Text style={styles.backButtonStyle}>Back</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flexBasis: "45%", marginLeft: 5 }}>
                  <View style={{ marginTop: 20, marginBottom: 40 }}>
                    <TouchableOpacity onPress={() => submit()}>
                      <Text style={styles.buttonStyle}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  enginetextstyle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 10,
    marginLeft: 15,
  },
  container: {
    backgroundColor: "#fff",
  },
  enginetextstyleone: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    width: "92%",
    marginLeft: 15,
    paddingBottom: 10,
  },

  inputBoxStyle: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: "#ddd",

    backgroundColor: "#F7F9FC",
    borderRadius: 7,
    marginRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  labelstyletwo: {
    fontWeight: "bold",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 10,
    width: "32%",
    marginLeft: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  backButtonStyle: {
    backgroundColor: "#FFF",
    color: "#213547",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 18,
    borderRadius: 10,
    borderColor: "#88959F",
    fontWeight: "bold",
    borderWidth: 2,
  },
  buttonStyle: {
    backgroundColor: "#2A71E5",
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 18,
    paddingHorizontal: 35,

    borderRadius: 10,
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: "#147AD6",
  },
  labelstylethree: {
    fontWeight: "bold",
    fontSize: 18,

    marginLeft: 15,
    marginBottom: 10,
  },
});
export default ExhtEngineThree;
