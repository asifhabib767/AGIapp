import React, { Component } from "react";
import Drawer from "react-native-drawer";
import { SwitchIOS, View, Text, Alert, TouchableOpacity } from "react-native";
import ControlPanel from "./../components/ControlPanel";
import Header from "./../components/Header";
import Dashboard from "./../screens/Dashboard";
import EmergencyContactList from "../screens/EmergencyContactList";

class EmergencyContactListDrawer extends Component {
  closeControlPanel = () => {
    this._drawer.close();
  };

  openControlPanel = () => {
    this._drawer.open();
  };

  render() {
    const drawerStyles = {
      drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 },
      main: { paddingLeft: 3 },
    };
    return (
      <Drawer
        ref={(ref) => (this._drawer = ref)}
        type="overlay"
        content={<ControlPanel />}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 },
        })}
      >
        <Header
          drawerCollapse={() => {
            this._drawer.open();
          }}
          screenDetect="EmergencyContactList"
        />
        <EmergencyContactList />
      </Drawer>
    );
  }
}

export default EmergencyContactListDrawer;
