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

import headLogo from "../images/headLogo.png";
import logo from "../images/headLogo.png";
import Menu from "../components/Menu";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";

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
      <View style={{ backgroundColor: "#2E3192", height: 120 }}>
        <StatusBar translucent backgroundColor={""} />
        <View style={styles.headingsec}>
          <View style={styles.headignlogo}>
            {this.props.screenDetect == "dashboard" ? (
              <Image
                source={headLogo}
                style={{ width: width / 1.8, height: 50 }}
                resizeMode="contain"
              />
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
    );
  }
}
const styles = StyleSheet.create({
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
