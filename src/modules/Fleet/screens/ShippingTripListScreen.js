import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  CheckBox,
  TouchableOpacity,
  ImageBackground,
  Button,
  RefreshControl,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
// import filterIcon from "../images/Activiy-list.png";
// import vehicel from "../images/car.png";
// import caruser from "../images/caruser.png";
// import panicAlert from "../images/dashboard-alert.png";
// import emergencyAlert from "../images/dashboard-emergency.png";
// import torch from "../images/dashboard-torch.png";
import {Actions} from 'react-native-router-flux';
import CustomSearchbar from '../components/CustomSearchbar';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
// import { getGateInOut } from "../service/gateInOut/GateInOutService";
// import TorchButton from "../components/TorchButton";
// import EmergencyButton from "../components/EmergencyButton";
// import { translate } from "../translations/Localization";
// import { getAsyncData } from "../Util/OfflineData";

// import * as LocalizeHelper from '../Util/LocalizeHelper';
// import * as RNLocalize from "react-native-localize";

export default class GateInOutList extends Component {
  state = {
    system_lang: 'bn',
    strCarringType: '',
    ysnActive: '',

    entryInOutList: [],
    refreshing: false,
  };

  async componentDidMount() {
    await this.getAsyncLanguageCode();
    this.initializeData();
  }

  getAsyncLanguageCode = async () => {
    let system_lang = await getAsyncData('system_lang');
    this.setState({system_lang});
  };

  initializeData = async () => {
    let gateInOutData = await getGateInOut();
    this.setState({
      entryInOutList: gateInOutData,
    });
  };

  onRefresh() {
    this.setState({refreshing: true});
    this.initializeData().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    return (
      <ScrollView
        style={[styles.fullbg]}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
        <SafeAreaView style={[styles.container]}>
          <View style={[styles.selectBox]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flexBasis: '70%'}}>
                <Text style={[styles.headTitle]}>ট্রীপ লিস্ট</Text>
              </View>
              <View style={{flexBasis: '30%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('TripAdd')}>
                  <Text style={styles.buttonStyle}>
                    যোগ করুন &nbsp;{''}
                    <Icon name="plus" size={23} color="#fff" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.selectBox]}>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 20}}>
              <View style={{flexBasis: '85%'}}>
                <Text style={[styles.shipDate]}> ট্রীপ নাম </Text>
              </View>
              <View style={{flexBasis: '22%'}}>
                <Text style={[styles.shipDate]}> কোড</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingVertical: 20,
                borderBottomColor: '#D6D6D6',
                borderBottomWidth: 1,
              }}
              // key={index}
              onPress={() => this.componentDidMount}>
              {/* Main Part Start */}
              <View style={{flexBasis: 60}}>
                {/* <Image source={vehicel} style={[styles.iconStyle]} /> */}
              </View>
              <View style={{flexBasis: '70%'}}>
                <Text style={[styles.shipmentNo]}>her</Text>
                {/* <TouchableOpacity onPress={() => Actions.AddGateOut()}>
                  <Text style={styles.gateIn}>Gate In</Text>
                </TouchableOpacity> */}
                <Text style={styles.gateOut}>Gate Out</Text>
              </View>
              <View style={{flexBasis: 60}}>
                <Text style={[styles.time]}> rfr </Text>
                <Text style={[styles.date]}> ef </Text>
                <Text style={[styles.time]}> hello </Text>
                <Text style={[styles.date]}> hello </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: '#F2F8FF',
    height: '100%',
  },
  container: {
    width: '96%',
    margin: 8,
  },
  selectBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    marginBottom: 5,
    padding: 10,
    paddingLeft: 10,
    marginTop: 5,
    justifyContent: 'center',
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
  },
  headTitle: {
    fontSize: RFPercentage(3.5),
    color: '#000000',
    fontWeight: 'bold',
  },
  shipmentNo: {
    fontSize: RFPercentage(3),
    color: '#000000',
    fontWeight: 'bold',
  },
  shipDate: {
    fontSize: RFPercentage(2.5),
    color: '#272727',
  },
  iconStyle: {
    width: 55,
    height: 55,
    backgroundColor: '#4346B6',
    resizeMode: 'contain',
  },
  searchIconStyle: {
    width: 35,
    height: 35,
    backgroundColor: '#4346B6',
    resizeMode: 'contain',
  },
  selects: {
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
    backgroundColor: '#fff',
    borderRadius: 50,
    flexBasis: '30%',
    height: 42,
    lineHeight: 42,
  },
  carDetails: {
    fontSize: RFPercentage(2),
    color: '#272727',
    paddingVertical: 5,
  },
  carOwner: {
    fontSize: RFPercentage(2.2),
    color: '#272727',
    paddingVertical: 8,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  carStyle: {
    width: 15,
    height: 15,
  },
  buttonStyle: {
    backgroundColor: '#11D6A0',
    color: '#fff',
    fontSize: RFPercentage(3),
    textAlign: 'center',
    paddingVertical: 8,
    borderRadius: 50,
  },
  gateIn: {
    backgroundColor: '#11D6A0',
    color: '#fff',
    fontSize: RFPercentage(2),
    textAlign: 'center',
    paddingVertical: 6,
    borderRadius: 50,
    width: 85,
    height: 30,
    textTransform: 'uppercase',
  },
  gateOut: {
    backgroundColor: '#E04236',
    color: '#fff',
    fontSize: RFPercentage(2),
    textAlign: 'center',
    paddingVertical: 6,
    borderRadius: 50,
    width: 85,
    height: 30,
    textTransform: 'uppercase',
  },
  time: {
    fontSize: RFPercentage(2.0),
    color: '#000000',
    fontWeight: 'bold',
  },
  date: {
    fontSize: RFPercentage(1.5),
    color: '#000000',
  },
  footerBox: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    marginVertical: 8,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 23, height: 1},
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
