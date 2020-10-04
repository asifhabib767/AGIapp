import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  BackHandler,
  StatusBar,
  ImageBackground,
} from "react-native";

import logo from "../images/logo.png";
import bar from "../images/bar.png";
import headerBg from "../images/headerBg.png";
import Menu from "../components/Menu";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
import { RFPercentage } from "react-native-responsive-fontsize";

import { getUnitData } from "../service/units/UnitService";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: "About",
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  OnBackButton = (goBackLink) => {
    Actions.pop(goBackLink);
  };

  updateMenuState(isOpen) {
    this.setState({ isOpen });
    console.log(this.state.isOpen);
  }

  onMenuItemSelected = (item) =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  state = {
    unit: {},
  };

  async componentDidMount() {
    let unit = await getUnitData();
    let that = this;
    that.setState({ unit });
  }

  render() {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const menu = <Menu navigator={navigator} />;
    return (
      <ImageBackground source={headerBg} style={{ width: "100%" }}>
        <View style={styles.headerContent} style={{ height: 90 }}>
          <StatusBar translucent backgroundColor={""} />
          <View style={styles.headingsec}>
            <View style={styles.headignlogo}>
              {this.props.screenDetect == "dashboard" ? (
                <View>
                  <Text style={styles.headerTitle}>AKiJ</Text>
                  <Image
                    source={logo}
                    style={{ width: width / 2, height: 40 }}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => this.OnBackButton(this.props.goBackLink)}
                >
                  {/* <View>
                <Text style={styles.backButton}>Back</Text>
              </View> */}
                  {/* <Text style={{ marginLeft: 30 }}><Icon name="arrow-left" size={20} color="#FFF"/></Text> */}
                  <Text style={{ marginLeft: 30 }}>
                    <Icon name="chevron-circle-left" size={30} color="#FFF" />
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.hedingIcon}>
              <TouchableOpacity onPress={this.props.drawerCollapse}>
                <Icon name="bars" size={30} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  headerTitle: {
    color: "white",
    marginLeft: 45,
    fontSize: RFPercentage(2.9),
    fontStyle: "italic",
  },
  button: {
    position: "absolute",
    top: 20,
    padding: 10,
  },
  backButton: {
    backgroundColor: "#fff",
    width: 120,
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 50,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 30,
  },
  caption: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  headignlogo: {
    flexBasis: "70%",
    marginLeft: -25,
  },
  headingsec: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
});
export default Header;
