import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import topbar from "../../images/top-bar.png";
import { Button, Spinner } from "@ui-kitten/components";
import GlobalStyles from "../../../Master/styles/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUnloadVehicleList,
  emptyRefreshControl,
  ScanDataHandling,
} from "../../actions/unloadvehicle/UnlaodVehicleAction";
import { FlatList } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";
import qr from "../../images/qr.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Loader from "./../../../Master/components/loader/Loader";
import CustomSearchbar from "../../../Master/components/CustomSearchBar";
import { decryptCode, encryptCode } from "../../../Master/Util/EncryptedCode";

/** React Native Pusher */
// import Pusher from 'pusher-js/react-native';
// import Echo from 'laravel-echo';
// import { encryptCode } from './../../../Master/Util/EncryptedCode';
// Pusher.logToConsole = true;
const host = "iapps.akij.net";

let options = {
  broadcaster: "pusher",
  encrypted: false,
  key: "iAppsAITL2020Key231209128102910271212",
  wsHost: host,
  host: host,
  wsPort: 6001,
  logToConsole: true,
  enableStats: false,
  // authEndpoint: host + '/broadcasting/auth',
  enabledTransports: ["ws", "flash"],
  cluster: "mt1",
  forceTLS: false,
  // auth: {
  //   headers: {
  //     Authorization: 'Bearer ' + token,
  //   },
  // },
};

// let PusherClient = new Pusher(options.key, options);
// PusherClient.subscribe('iapp_sales');

// let echo = new Echo({
//   broadcaster: 'pusher',
//   client: PusherClient,
//   ...options,
// });

// let echo = new Echo({
//   broadcaster: options.broadcaster,
//   key: options.key,
//   cluster: options.cluster,
//   forceTLS: options.forceTLS,
//   wsHost: options.wsHost,
//   wsPort: options.wsPort,
//   disableStats: options.disableStats,
// });

// PusherClient.connection.bind('unavailable', function () {
//   console.log('sorry, websocket not connected !!');
// });

// PusherClient.connection.bind('connected', function () {
//   console.log('websocket connected !!');
//   var global_message = PusherClient.subscribe('iapp_sales');
// });

// echo.channel('iapp_sales').listen('.requisition.created', (message) => {
//   console.log('message from pusher', message);
//   alert('entered');
// });
// echo.channel('iapp_sales').listen('.requisition.created', (e) => {
//   console.log('Got event...');
//   console.log(e);
// });
// console.log('echo2', echo);

const UnlaodVehicleList = (props) => {
  const [state, setState] = React.useState({
    UnloadedData: [],
    searchOrderList: [],
    searchRequestText: "",
  });
  const isFocused = useIsFocused();
  const { navigate } = props.navigation;
  const dispatch = useDispatch();

  // let unloadVehicleList = useSelector((state) => state.unloadVehicle.unloadVehicleList);

  let isLoading = useSelector((state) => state.department.isLoading);
  const refreshingStatus = useSelector((state) => state.department.refreshing);
  const departmentListStatus = useSelector(
    (state) => state.department.departmentListStatus
  );

  useEffect(() => {
    getInitialData();
  }, [isFocused]);

  const getInitialData = async () => {
    let UnloadedData = await GetUnloadVehicleList();
    UnloadedData = UnloadedData.data;
    setState({ UnloadedData, searchOrderList: UnloadedData });
  };

  const searchText = (searchRequestText) => {
    let cloneObj = { ...state };
    if (searchRequestText.length > 0) {
      const newData = state.UnloadedData.filter(function (item) {
        const itemData =
          item.strCode + " " + item.strDriver + " " + item.strTripCode + " ";
        const textData = decryptCode(searchRequestText).toUpperCase();
        return itemData.toUpperCase().indexOf(textData) > -1;
      });
      cloneObj.searchRequestText = decryptCode(searchRequestText);
      cloneObj.searchOrderList = newData;
      setState(cloneObj);
    } else {
      cloneObj.searchOrderList = state.UnloadedData;
      cloneObj.searchRequestText = "";
      setState(cloneObj);
    }
  };

  const onRefresh = () => {
    dispatch(emptyRefreshControl(true));
    getInitialData();
  };

  const gotoUnloadScreen = async (tripCode) => {
    let responseData = await ScanDataHandling(tripCode);

    if (responseData.status) {
      props.navigation.navigate("addUnloadVehicle", responseData);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[GlobalStyles.backgroundColor, styles.container]}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshingStatus}
            onRefresh={onRefresh.bind(this)}
          />
        }
      >
        <View>
          <View style={[styles.postionbox]}>
            <ImageBackground style={[styles.topbar]} source={topbar} />
            <View style={[styles.headerDetails]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexBasis: "65%" }}>
                  <Text style={[styles.headerTitle]}>
                    {" "}
                    Unload Vehicle Weight{" "}
                  </Text>
                </View>
                <View style={{ flexBasis: "25%" }}>
                  <TouchableOpacity>
                    <Text
                      style={[styles.buttonss]}
                      size="medium"
                      onPress={() => props.navigation.navigate("unloadScan")}
                    >
                      ADD
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View>{isLoading ? <Loader /> : null}</View>
            <View style={{ flexDirection: "row", flex: 1, padding: 10 }}>
              <View style={{ flexBasis: "80%" }}>
                <CustomSearchbar
                  placeHolderText="Search Trip Code"
                  onChangeText={(value) => searchText(value)}
                />
              </View>
              <View style={{ flexBasis: "20%", marginRight: 10 }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("unloadScan")}
                >
                  <Image source={qr} style={[styles.qrImage]} />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={state.searchOrderList}
              keyExtractor={(item) => item.strTripCode}
              renderItem={({ item, index, separators }) => (
                <View style={styles.rowViewContainer} key={index}>
                  <View style={styles.itemList}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      #{encryptCode(item.strTripCode)}
                    </Text>
                    <Text
                      style={{
                        backgroundColor: "#1A73E8",
                        padding: 5,
                        paddingRight: 15,
                        paddingLeft: 15,
                        color: "#fff",
                        borderRadius: 10,
                      }}
                      onPress={() => gotoUnloadScreen(item.strTripCode)}
                    >
                      Take Weight
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", paddingRight: 60 }}>
                    <Text style={{ padding: 10 }}>
                      {item.strDriver}-{item.strContact}
                    </Text>
                    <Text style={{ padding: 10 }}>Gate Time</Text>
                  </View>

                  <View style={{ flexDirection: "row", paddingRight: 60 }}>
                    <Text style={{ padding: 10 }}>{item.strVehicleRegNo}</Text>
                    <Text style={{ padding: 10 }}>{item.dteEmptyWgtTime}</Text>
                  </View>

                  <View style={{ flexDirection: "row", paddingRight: 60 }}>
                    <Text style={{ padding: 10 }}>
                      Empty Weight: {item.numEmptyWeight} Ton
                    </Text>
                    <Text style={{ padding: 10 }}>
                      Loaded Weight: {item.numLoadedWeight} Ton
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    // flexDirection: 'row',
    // alignItems: 'center',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  itemList: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("80%"),
  },
  iconsec: {
    flexDirection: "row",
    width: wp("20%"),
  },
  topbar: {
    marginTop: -0,
    width: width,
    height: height / 4,
    resizeMode: "contain",
  },
  postionbox: {
    position: "relative",
  },
  headerDetails: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: RFPercentage(4),
    fontWeight: "normal",
    paddingVertical: 10,
  },
  button: {
    borderRadius: 50,
    marginTop: 15,
  },
  icon: {
    width: 32,
    height: 32,
  },
  buttonss: {
    backgroundColor: "#19d4ee",
    borderColor: "#19d4ee",
    color: "#000",
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 13,
    textAlign: "center",
  },
  buttonActive: {
    backgroundColor: "#B3FFD6",
    borderColor: "#6df3bd",
    color: "#08a571",
    borderRadius: 6,
    paddingVertical: 3,
    textAlign: "center",
  },
  buttondeActive: {
    backgroundColor: "#B32229",
    borderColor: "#6df3bd",
    color: "#fff",
    borderRadius: 6,
    paddingVertical: 3,
    textAlign: "center",
  },
  activesizebutton: {
    width: wp("17%"),
    marginRight: 5,
  },
  penIcon: {
    padding: 5,
  },
  qrImage: {
    width: 60,
    resizeMode: "contain",
    height: 50,
  },

  masterInput: {
    // flex: 1,
    // flexDirection: 'row',
    // backgroundColor: '#fff',
    // marginBottom: 10,
  },
});
export default UnlaodVehicleList;
