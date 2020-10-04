import React from "react";
import SwitchButton from "switch-button-react-native";

import { ToastAndroid } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { getAsyncData } from "../Util/OfflineData";
import { Actions } from "react-native-router-flux";

class LanguageComponent extends React.Component {
  state = {
    activeSwitch: 1,
    system_lang: "",
  };
  async componentDidMount() {
    await this.getAsyncLanguageCode();
  }

  getAsyncLanguageCode = async () => {
    let system_lang = await getAsyncData("system_lang");
    // let activeSwitch = 1;
    // if (system_lang == "en") {
    //   activeSwitch = 1;
    // } else if (system_lang == "bn") {
    //   activeSwitch = 2;
    // }
    this.setState({ activeSwitch: 1 });
  };

  changeLanguage = async (val) => {
    this.setState({ activeSwitch: val });
    await this.toggleLanguage();
    ToastAndroid.show("ভাষা পরিবর্তন হয়েছে।", ToastAndroid.SHORT);
    // Actions.Setting();
    this.props.navigation.navigate("Setting");
  };

  toggleLanguage = async () => {
    let system_lang = await getAsyncData("system_lang");
    if (system_lang === "bn") {
      system_lang = "en";
    } else {
      system_lang = "bn";
    }

    AsyncStorage.setItem("system_lang", system_lang);
    this.setState({ system_lang });
  };

  render() {
    return (
      <>
        <SwitchButton
          onValueChange={(val) => this.changeLanguage(val)}
          // this is necessary for this component
          text1={"EN"} // optional: first text in switch button --- default ON
          text2={"বাং"} // optional: second text in switch button --- default OFF
          switchWidth={120} // optional: switch width --- default 44
          switchHeight={40} // optional: switch height --- default 100
          switchdirection="rtl" // optional: switch button direction ( ltr and rtl ) --- default ltr
          switchBorderRadius={100} // optional: switch border radius --- default oval
          switchSpeedChange={500} // optional: button change speed --- default 100
          switchBorderColor="#34467D" // optional: switch border color --- default #d4d4d4
          switchBackgroundColor="#34467D" // optional: switch background color --- default #fff
          btnBorderColor="#34467D" // optional: button border color --- default #00a4b9
          btnBackgroundColor="#EFEFEF" // optional: button background color --- default #00bcd4
          fontColor="#fff" // optional: text font color --- default #b1b1b1
          activeFontColor="#000"
        />

        {this.state.activeSwitch === 1
          ? console.log("view1")
          : console.log("view2")}
      </>
    );
  }
}

export default LanguageComponent;
