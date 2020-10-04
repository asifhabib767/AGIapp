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

  // Input,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import VoyageHeader from "../components/VoyageHeader";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  getGasNChemicalItemListAction,
  createVoyageGasNChemical,
} from "../actions/VoyageGasNChemicalAction";
import Header from "../../Master/components/header/Header";
import { Input } from "@ui-kitten/components";

const GasChemical = (props) => {
  const [state, setState] = React.useState({
    gasNChemicalList: [],
    voyagePropsData: props.route.params.voyagePropsData,
    isLoading: false,
    strRemarks:'',
    isLoading: false,
  });

  const { navigate } = props.navigation;
  const dispatch = useDispatch();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    const propsVoyage = props.route.params.voyagePropsData;
    const gasNChemicalItemListResponse = await getGasNChemicalItemListAction();
    const gasNChemicalItemList = gasNChemicalItemListResponse.data;
    let gasNChemicalList = [];

    gasNChemicalItemList.forEach((item) => {
      const itemForEntry = {
        intVoyageID: propsVoyage.intID,
        intVoyageActivityID: 0,
        intGasNChemicalId: item.intId,
        strGasNChemicalName: item.strName,
        decBFWD: 0,
        decRecv: 0,
        decCons: 0,
        dectotal: 0,
        intCreatedBy: 0,
        newInsert: false,
      };
      gasNChemicalList.push(itemForEntry);
    });

    let cloneObj = { ...state };
    cloneObj.gasNChemicalList = gasNChemicalList;
    setState(cloneObj);
  };

  const changeItem = (inputValue, index, name) => {
    let cloneObj = { ...state };
    let item = cloneObj.gasNChemicalList[index];
    if (name === "decBFWD") {
      item.decBFWD = inputValue;
    }
    if (name === "decRecv") {
      item.decRecv = inputValue;
    }
    if (name === "decCons") {
      item.decCons = inputValue;
    }
    if (name === "strGasNChemicalName") {
      item.strGasNChemicalName = inputValue;
    }
    item.dectotal =
      parseFloat(item.decBFWD) +
      parseFloat(item.decRecv) -
      parseFloat(item.decCons);
    cloneObj.gasNChemicalList[index] = item;
    setState(cloneObj);
  };
  
  const handleInputChange = (inputkey, inputValue) => {
    let cloneObj = { ...state };
    cloneObj[inputkey] = inputValue;
    setState(cloneObj);
  };

  const submit = async () => {
    let cloneObj = {...state};
    cloneObj.isLoading = true;
    setState(cloneObj);

    let response = await createVoyageGasNChemical(props.route.params, state);
    console.log('response',response);
    if (response.status) {
      Alert.alert("Success", response.data.message);
      props.navigation.navigate("voyageActivity");
      let cloneObj = {...state};
      cloneObj.isLoading =  response.isLoading;
      setState(cloneObj);
    } else {
      Alert.alert("Warning", "Something is wrong. Please try again.");
      let cloneObj = {...state};
      cloneObj.isLoading =  false;
      setState(cloneObj);
    }
  };

  const deleteItem = (item) => {
    let cloneObj = { ...state };
    try {
      for (var i = 0; i < cloneObj.multipleWarehouse.length; i++) {
        if (cloneObj.multipleWarehouse[i] == item) {
          cloneObj.multipleWarehouse.splice(i, 1);
          setState(cloneObj);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addGasItem = () => {
    let cloneObj = { ...state };
    const propsVoyage = props.route.params.voyagePropsData;
    const itemForEntry = {
      intVoyageID: propsVoyage.intID,
      intVoyageActivityID: 0,
      intGasNChemicalId: 0,
      strGasNChemicalName: "",
      decBFWD: 0,
      decRecv: 0,
      decCons: 0,
      dectotal: 0,
      intCreatedBy: 0,
      newInsert: true,
    };
    cloneObj.gasNChemicalList.push(itemForEntry);
    setState(cloneObj);
  };

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <ScrollView>
        <View>
          <Header title="Gas and Chemical" />

          <View style={[styles.container]}>
            <VoyageHeader headerProps={state.voyagePropsData} />

            <View>
              <View>
                <Text style={[styles.labelstyletwo]}>
                  GAS AND CHEMICAL'S CONSUMPTION
                </Text>
                <Text style={[styles.labelstyleborder]}></Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderBottomColor: "lightgray",
                  borderBottomWidth: 2,
                  width: "90%",
                  marginLeft: 20,
                  paddingBottom: 13,
                }}
              >
                <View style={{ flexBasis: "30%" }}>
                  <View>
                    <Text style={[styles.textstyle]}>Name</Text>
                  </View>
                </View>

                <View style={{ flexBasis: "20%" }}>
                  <View>
                    <Text style={[styles.textstyle]}>B.FWD</Text>
                  </View>
                </View>
                <View style={{ flexBasis: "20%" }}>
                  <View>
                    <Text style={[styles.textstyle]}>RECV</Text>
                  </View>
                </View>
                <View style={{ flexBasis: "15%" }}>
                  <View>
                    <Text style={[styles.textstyle]}>CONS</Text>
                  </View>
                </View>
                <View style={{ flexBasis: "15%", marginRight: 15 }}>
                  <TouchableOpacity onPress={() => addGasItem()}>
                    <Text
                      style={{
                        backgroundColor: "#2B72E5",
                        padding: 5,
                        color: "#fff",
                        marginLeft: 10,
                        textAlign: "center",
                      }}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {state.gasNChemicalList.map((item, index) => (
                <View
                  style={{
                    borderColor: "#707070",
                    borderWidth: 0.5,
                    marginTop: 10,
                    width: "95%",
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 13,

                      paddingLeft: 10,
                      width: "100%",
                      borderColor: "#707070",
                      borderWidth: 0.2,

                      paddingBottom: 10,
                    }}
                  >
                    <View style={{ flexBasis: "30%" }}>
                      {!item.newInsert && (
                        <Text style={[styles.textstyleone]}>
                          {item.strGasNChemicalName}
                        </Text>
                      )}
                      {item.newInsert && (
                        <TextInput
                          style={[styles.inputBoxStyle]}
                          placeholder="Item Name"
                          placeholderTextColor={"#000000"}
                          value={item.strGasNChemicalName}
                          onChangeText={(value) =>
                            changeItem(value, index, "strGasNChemicalName")
                          }
                        />
                      )}
                    </View>

                    <View style={{ flexBasis: "18%" }}>
                      <TextInput
                        style={[styles.inputBoxStyle]}
                        placeholder="0"
                        placeholderTextColor={"#000000"}
                        keyboardType="numeric"
                        value={item.decBFWD}
                        onChangeText={(value) =>
                          changeItem(value, index, "decBFWD")
                        }
                      />
                    </View>
                    <View style={{ flexBasis: "18%" }}>
                      <TextInput
                        style={[styles.inputBoxStyle]}
                        placeholder="0"
                        placeholderTextColor={"#000000"}
                        keyboardType="numeric"
                        value={item.decRecv}
                        onChangeText={(value) =>
                          changeItem(value, index, "decRecv")
                        }
                      />
                    </View>
                    <View style={{ flexBasis: "18%" }}>
                      <TextInput
                        style={[styles.inputBoxStyle]}
                        placeholder="0"
                        placeholderTextColor={"#000000"}
                        keyboardType="numeric"
                        value={item.decCons}
                        onChangeText={(value) =>
                          changeItem(value, index, "decCons")
                        }
                      />
                    </View>
                    <View style={{ flexBasis: "18%" }}>
                      <Text
                        style={[
                          styles.inputBoxStyle,
                          { borderWidth: 0, padding: 5 },
                        ]}
                      >
                        {item.dectotal}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
              <View style={{ flexBasis: "100%",backgroundColor:'#fff'}}>
                      <TextInput
                        style={{ backgroundColor:'#F7F9FC',borderColor:'#ccc',borderWidth:1,padding:20,margin:10 }}
                        placeholder="Remarks"
                        placeholderTextColor={"#000000"}
                        keyboardType="numeric"
                        value={state.strRemarks}
                        onChangeText={(value) =>
                          handleInputChange('strRemarks', value)
                        }
                        
                        
                      />
                    </View>
            </View>
            
            

              

            <View style={[styles.voyagebuttstyle]}>
              {!state.isLoading && (
                <TouchableOpacity onPress={() => submit()}>
                  <Text style={[styles.buttonStyle, { margin: 10 }]}>
                    {" "}
                    Submit{" "}
                  </Text>
                </TouchableOpacity>
              )}
              {state.isLoading && (
                <Text style={[styles.buttonStyle, { margin: 10 }]}>
                  {" "}
                  Submitting...{" "}
                </Text>
              )}
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
    paddingTop: 20,
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
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F7F9FC",
    borderRadius: 7,
    marginRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  labelstyletwo: {
    fontSize: 19,
    marginLeft: 15,
  },
  backButtonStyle: {
    backgroundColor: "#F3F6FA",
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
  boilertextstyle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  addbuttonStyle: {
    backgroundColor: "#2dc48d",
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 15,
    paddingHorizontal: 35,

    borderRadius: 50,
    fontWeight: "bold",
  },
  serviceTypeStyle: {
    flexBasis: "25%",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  serviceTypeStyleone: {
    flexBasis: "20%",
    fontSize: 18,
    fontWeight: "bold",
  },
  textstyle: {
    fontSize: 15,
    paddingTop: 10,
  },
  textstyleone: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 10,
  },
  labelstyleborder: {
    borderBottomColor: "#88959F",
    borderBottomWidth: 0.5,
    width: "30%",
    marginLeft: 15,
    marginBottom: 20,
  },
  //   InputField: {
  //     marginLeft: 50,
  //     color: '#000000',
  //     fontSize: 14,
  //     fontWeight: '300',
  //     fontFamily: 'popppins',
  //     borderRadius: 0,
  //     paddingLeft: 5,
  //     paddingVertical: 12,
  //     borderBottomColor: '#000',
  //     borderBottomWidth: 0,
  //   },
  inputBoxStyle: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: "#ddd",

    backgroundColor: "#F7F9FC",
    borderRadius: 4,
    height: 50,
    width: "90%",
    textAlign: "center",
    paddingTop: 13,
    paddingBottom: 13,
  },
});
export default GasChemical;
