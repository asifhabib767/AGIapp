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
  // Input,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import Header from "./../../Master/components/header/Header";
import { IappsNetInfo } from "./../../Master/components/netInfo/IappsNetInfo";

import VoyageHeader from "../components/VoyageHeader";
import BunkerVlsfo from "../components/BunkerVlsfo";

// const multilineInputState = useInputState();

const VoyageVlsfo = (props) => {
  const [state, setState] = React.useState({
    enginnerData: props.route.params,
    voyagePropsData: props.route.params.voyagePropsData,
  });
  const isFocused = useIsFocused();

  const { navigate } = props.navigation;
  const dispatch = useDispatch();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    //
  };

  const onRefresh = () => {
    getInitialData();
  };

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <ScrollView>
        <View>
          <Header title="Bunker VLSFO" />

          <View style={[styles.container]}>
            <VoyageHeader headerProps={state.voyagePropsData} />
            <BunkerVlsfo enginnerData={state.enginnerData} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({});
export default VoyageVlsfo;
