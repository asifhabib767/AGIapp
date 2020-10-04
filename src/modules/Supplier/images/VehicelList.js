import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import vehicel from '../images/vehicel.png';
import vehicelcall from '../images/vehicelcall.png';
import minicar from '../images/minicar.png';
import caruser from '../images/caruser.png';
import CustomSearchbar from "../components/CustomSearchbar";
import { Picker } from "@react-native-community/picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { getSupplieridvsVehicleList } from "../service/shipment/ShipmentRequestService";
import { Form, TextValidator } from "react-native-validator-form";
export default class VehicelList extends Component {

    // state={

    //     priority:''
    // };


    state = {

        vehiclelist: []


    };

    componentDidMount() {
        this.initializeList();
        // console.log('ShipmentDetails', this.state.shipmentListDetaills);
        Form.addValidationRule("isPasswordMatch", value => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });

    }

    initializeList = async () => {
        //  const shipmentListDetaills = await getShipmentOpenRequestDetaills(this.props.itemData.intShipmentId);


        const vehiclelist = await getSupplieridvsVehicleList();

        console.log("vehiclelist init 1", vehiclelist);
        this.setState({
            // shipmentListDetaills,
            vehiclelist: vehiclelist
        })

        console.log("vehiclelist init 2", this.state.itemData.strDriverName);
    }

    render() {

        return (

            <ScrollView style={[styles.fullbg]} >
                <SafeAreaView style={styles.container}>

                    <View style={[styles.selectBox]}>

                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ flexBasis: '70%', }}>
                                <Text style={[styles.headTitle]}>
                                    Vehicle List
                            </Text>
                            </View>
                            <View style={{ flexBasis: '30%' }}>
                                <TouchableOpacity onPress={() => Actions.VehicelAdd()}>
                                    <Text style={styles.buttonStyle}>
                                        Add &nbsp;{''}
                                        <Icon name="plus" size={23} color="#fff" />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 25 }}>

                            <View style={{ flexBasis: '65%', marginRight: 15 }}>
                                <CustomSearchbar
                                    placeHolderText="Search from outlets"
                                />
                            </View>
                            <View style={[styles.selects]}>
                                <Picker
                                    selectedValue={this.state.priority}

                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ selects: itemValue })
                                    }>
                                    <Picker.Item label="Select" value="Select" />
                                    <Picker.Item label="1" value="2" />
                                    <Picker.Item label="1" value="2" />

                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.selectBox]}>
                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 20, }}>
                            <View style={{ flexBasis: '75%' }}>
                                <Text style={[styles.shipDate]}> Name </Text>
                            </View>
                            <View style={{ flexBasis: '22%' }}>
                                <Text style={[styles.shipDate]}> Status </Text>
                            </View>
                        </View>



                        {
                            this.state.vehiclelist.map(((item, index) => (
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 20, borderBottomColor: '#D6D6D6', borderBottomWidth: 1, }}>
                                    <View style={{ flexBasis: 60 }}>
                                        <Image source={vehicel} style={[styles.iconStyle]} />
                                    </View>
                                    <View style={{ flexBasis: '70%' }}>
                                        <Text style={[styles.shipmentNo]}> {item.strRegistrationNo} </Text>
                                        <Text style={[styles.carDetails]}>  <Image source={minicar} style={[styles.carStyle]} /> {item.strFuelType}      &nbsp;{' '} <Text> <Image source={caruser} style={[styles.carcaruserStyle]} /> {item.strDriverName}  </Text> </Text>

                                    </View>
                                    <View style={{ flexBasis: 60 }}>
                                        <Image source={vehicelcall} style={[styles.iconStyle]} />
                                    </View>
                                </View>
                            )))
                        }





















                    </View>



                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    fullbg: {
        backgroundColor: "#F2F8FF",
        height: "100%"
    },

    container: {
        width: "96%",
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
        shadowOffset: { width: 1, height: 1 },
    },
    headTitle: {
        fontSize: RFPercentage(3.5),
        color: '#000000',
        fontWeight: 'bold',
    },
    shipmentNo: {
        fontSize: RFPercentage(3),
        color: '#000000',
        fontWeight: 'bold'
    },
    shipDate: {
        fontSize: RFPercentage(2.5),
        color: '#272727',
    },
    iconStyle: {
        width: 50,
        height: 50,
    },


    selects: {
        shadowColor: "rgba(0, 0, 0, 5)",
        shadowOpacity: 0.5,
        elevation: 8,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
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
        fontWeight: 'bold'
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

    }

});
