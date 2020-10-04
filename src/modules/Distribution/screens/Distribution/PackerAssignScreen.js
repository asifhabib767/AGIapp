import React, {useEffect, useState} from 'react';
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
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  FlatList,
  Picker,
  Alert,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import {Radio, Autocomplete} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import topbar from '../../images/top-bar.png';
import qr from '../../images/qr.png';
import {
  Datepicker,
  Layout,
  Toggle,
  Button,
  Input,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import GlobalStyles from './../../../Master/styles/GlobalStyles';
import {
  callPLCAPI,
  getPackerList,
  getPackerInfoByPackerNo,
  storePackerBagInfoByPackerNo
} from './../../actions/distribution/PLCAction';
import CustomSearchbar from './../../../Master/components/CustomSearchBar';

const PackerAssignScreen = (props) => {

  const [refreshing, setrefreshing] = React.useState(false);
  const [plcData, setPLCData] = React.useState([]);
  const [packerList, setPackerList] = React.useState([]);
  let [isLoading, setisLoading] = useState(false);
  const [selectedPacker, setselectedPacker] = React.useState();
  const [bagsQty, setBagsQty] = React.useState();
  const [currentPackerInformation, setcurrentPackerInformation] = React.useState();
  const [intervalId, setIntervalId] = React.useState(0);

  const [state, setState] = useState({
    selectedPackerNo: '',
  });

  useEffect(() => {
    if(typeof props.route.params !== 'undefined' && typeof props.route.params.data !== 'undefined'){
      setBagsQty(parseInt(props.route.params.data));
    }

    initializaAllDatas();
  }, [props]);

  const initializaAllDatas = async () => {
    // const data = await callPLCAPI();
    // const plcData = data.data;
    // setPLCData(plcData);

    if(typeof props.route.params !== 'undefined' && typeof props.route.params.data !== 'undefined'){
      setBagsQty(parseInt(props.route.params.data));
    }

    const data = await getPackerList();
    const packerList = data.data;
    setPackerList(packerList);
  };

  const selectPacker = async (item) => {
    setselectedPacker(item);

    if(typeof intervalId != 'undefined' || intervalId != ''){
      clearInterval(intervalId);
    }

    if(item.packerNo != '' || item.packerNo > 0){
      let intervalId = setInterval(async () => {
        setIntervalId(intervalId);

        const response = await getPackerInfoByPackerNo(item.packerNo);
        const currentPackerInformation = response.data;
        console.log('currentPackerInformation', currentPackerInformation);
        setcurrentPackerInformation(currentPackerInformation);
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }
  
  const gotoPackerScan = () => {
    if(typeof selectedPacker !== 'undefined' && selectPacker !== {}){
      props.navigation.navigate('packerScan', {
        packerData: selectedPacker,
      });
    }else{
      Alert.alert('Warning', 'Please, Select a Packer First !');
    }
  }
  const handleSubmit = async () => {
    if(bagsQty > 0 && selectedPacker.packerNo > 0){
      const response = await storePackerBagInfoByPackerNo(selectedPacker.packerNo, bagsQty);
      setBagsQty(0);
      Alert.alert('Success', 'Packer Data Updated !');
    }else{
      Alert.alert('Warning', 'Packer & Quantity are wrong !');
      return false;
    }
  };

  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
        <View>
          <View style={[styles.container, { paddingLeft: 10, paddingRight: 10, marginTop: 5}]}>
            
            <View>
              <Text style={{ fontWeight: 'bold' }}>Packer List </Text>
              <Picker
                selectedValue={selectedPacker}
                style={[styles.Vehicle]}
                onValueChange={(itemValue, itemIndex) => selectPacker(itemValue)}>
                <Picker.Item label="Select A Packer" value="" />
                {packerList.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.packerName}
                    value={item}
                  />
                ))}
              </Picker>
              {
                typeof currentPackerInformation != 'undefined' && 

                <View style={{ background: '#eee', padding: 5, borderColor: '#ddd', borderWidth: 1, marginRight: 15 }}>
                    <Text>
                      <Text style={styles.countLabel}>Preseted Bag - </Text>
                      <Text style={styles.countQty}> {currentPackerInformation.PresetedBag}</Text>
                    </Text>

                    <Text>
                      <Text style={styles.countLabel}>QR Quantity Set - </Text>
                      <Text style={styles.countQty}> {currentPackerInformation.PresetbyQR}</Text>
                    </Text>

                    <Text>
                      <Text style={styles.countLabel}>Bags Count - </Text>
                      <Text style={styles.countQty}> {currentPackerInformation.BagsCount}</Text>
                    </Text>
                </View>
              }

            <View style={[styles.masterInput, {marginBottom: 0, marginTop: 10}]}>
                <View style={{flexBasis: '80%', marginRight: 10}}>
                  <Text style={{ paddingLeft: 0, fontWeight: 'bold'}}>Scan QR Code</Text>
                  {
                    typeof props.route.params != 'undefined' && props.route.params.packerData != 'undefined' &&
                   <>
                    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
                      Packer - {selectedPacker.packerNo} 
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
                      Qty - <Text style={{ backgroundColor: '#eee', borderRadius: 10, fontSize: 25 }}> {bagsQty} </Text>
                    </Text>
                   </>
                  }
                  
                </View>
                <View style={{flexBasis: '20%', marginRight: 10}}>
                  <TouchableOpacity
                    onPress={() => gotoPackerScan()}>
                    <Image source={qr} style={[styles.qrImage]} />
                  </TouchableOpacity>
                </View>
              </View>
              

              <View style={{margin: 10, marginRight: 30}}>
                {isLoading ? (
                  <Button style={styles.button} size="large">
                    {' '}
                    Submitting...
                  </Button>
                ) : (
                  <Button
                    style={styles.button}
                    size="large"
                    onPress={() => handleSubmit()}>
                    Submit
                  </Button>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  masterInput: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  statusLoading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  statusTextsq: {
    marginBottom: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },

  statusTextsqq: {
    marginBottom: 5,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2163D8',
  },

  stutusBox: {
    width: wp('25%'),
  },
  statusbg: {
    backgroundColor: '#2163D8',
    padding: 10,
  },

  buttons: {
    marginTop: 10,
    marginBottom: 5,
    width: 80,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },

  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  dropdownText: {
    color: '#ccc',
  },
  radioContain: {
    flex: 1,
    flexDirection: 'row',
  },

  containers: {
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 2,
  },

  logicStics: {
    fontWeight: 'bold',
  },

  topbar: {
    marginTop: -0,
    width: width,
    height: height / 5.5,
    resizeMode: 'contain',
  },
  postionbox: {
    position: 'relative',
  },
  headerDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },

  headerTitle: {
    color: '#fff',
    fontSize: RFPercentage(4),
    fontWeight: 'normal',
    paddingVertical: 10,
  },
  button: {
    marginTop: 35,
    marginBottom: 35,
  },
  emplyeeTitle: {
    color: '#202B35',
    fontSize: RFPercentage(2.7),
    fontWeight: 'bold',
    marginLeft: -5,
  },
  employeeid: {
    color: '#202B35',
    fontSize: RFPercentage(2.5),
    marginRight: 20,
  },
  employeeidguard: {
    color: '#202B35',
    fontSize: RFPercentage(2.5),
  },
  icon: {
    width: 32,
    height: 32,
  },
  maxHeight: {
    height: hp('100%'),
  },
  logInputStyle: {
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 2,
    height: 55,
  },

  containers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radio: {
    margin: 1,
    fontSize: 10,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: '#3366FF',
  },
  qrImage: {
    width: 50,
    height: 50,
  },
  qrImage: {
    width: 50,
    resizeMode: 'contain',
    height: 50,
  },
  countLabel: {
    fontWeight: 'bold'
  },
  countQty: {
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 25
  }
});
export default PackerAssignScreen;
