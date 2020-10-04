import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import icon from '../../images/Icons.png';
import { Picker } from '@react-native-community/picker';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import {
    getShipmentOpenRequestDetaills, getTransportProviderVehicleList
    , getTransportProviderDriverList, getShipmentOpenRequest,
    postTransportProvider
} from '../../actions/TransportProvider/ShipmentRequestAction';
import { Form, TextValidator } from "react-native-validator-form";
import { generateStringDateFromDate } from '../../../Master/Util/DateConfigure';
export default class ShipmentRequestEntry extends Component {
    state = {
        shipmentListDetaills: [],
        vehicleList: [],
        driverlist: [],
        shipmentList: [],
        selectedShipmentDetails: {},
        totalQuantity: 0,
        totalAmount: 0,
        monTotalLogistic: 0,
    };

    componentDidMount() {
        this.initializeList();
        Form.addValidationRule('isPasswordMatch', value => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }

    initializeList = async () => {
        const shipmentListDetaills = await getShipmentOpenRequestDetaills(
            this.props.route.params.itemData.intShipmentId,
        );

        const vehicleList = await getTransportProviderVehicleList();
        const driverlist = await getTransportProviderDriverList();
        const shipmentList = await getShipmentOpenRequest();

        let totalQuantity = 0;
        let totalAmount = 0;
        let monTotalLogistic = 0;

        shipmentListDetaills.forEach((item, index, shipmentListDetaills) => {
            totalQuantity = totalQuantity + item.decQty;
            monTotalLogistic = monTotalLogistic + item.monTotalLogistic;
            //   totalAmount = totalAmount + item.monBillAmount;
        });

        // intVehicleID, intDriverID

        this.setState({
            shipmentListDetaills: shipmentListDetaills,
            vehicleList,
            driverlist,
            shipmentList,
            totalQuantity,
            totalAmount,
            monTotalLogistic,
        });
    };

    submit = async () => {

        const ShipmentId = this.props.route.params.itemData.intShipmentId;
        const intVehicleID = this.state.selectVicel;
        const intDriverID = this.state.selectDriver;
        let ShipementResponse = await postTransportProvider(
            ShipmentId,
            intVehicleID,
            intDriverID,
        );
        if (ShipementResponse != null || ShipementResponse != 'undefined') {
            Alert.alert(
                'আপনার রিকোয়েস্টটি এক্সেপ্ট হয়েছে !!',
                'এক্সেপ্টেড আইডিঃ ' + ShipementResponse,
            );
            this.props.navigation.navigate('shipmentRequest');
        }
    };

    render() {
        return (
            <ScrollView style={[styles.fullbg]}>
                <SafeAreaView style={styles.container}>
                    <View style={[styles.selectBox]}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={[styles.headTitle]}>Confirming</Text>
                        </View>

                        <View style={[styles.selectBox]}>
                            <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 20 }}>
                                <View style={{ flexBasis: 80 }}>
                                    <Image source={icon} style={{ width: 75, height: 75 }} />
                                </View>
                                <View style={{ flexBasis: '80%' }}>
                                    <Text style={[styles.shipmentNo]}>
                                        Shipment No. # {this.props.route.params.itemData.intShipmentId}
                                    </Text>
                                    <Text style={[styles.shipDate]}>
                                        Date :{' '}
                                        {generateStringDateFromDate(
                                            this.props.route.params.itemData.dteScheduledTime,
                                        )}{' '}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flexBasis: '50%' }}>
                                    <Text style={[styles.cofirmTitle]}> vehicle Type </Text>
                                    <Text style={[styles.cofirmValue]}> Open </Text>
                                </View>
                                <View style={{ flexBasis: '50%' }}>
                                    <Text style={[styles.cofirmTitle]}> Capacity </Text>
                                    <Text style={[styles.cofirmValue]}>
                                        {' '}
                                        {this.props.route.params.itemData.strPickingPointName}{' '}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flexBasis: '50%' }}>
                                    <Text style={[styles.cofirmTitle]}> Arrival Time </Text>
                                    <Text style={[styles.cofirmValue]}>
                                        {generateStringDateFromDate(
                                            this.props.route.params.itemData.dteScheduledTime,
                                        )}{' '}
                                    </Text>
                                </View>
                                <View style={{ flexBasis: '50%' }}>
                                    <Text style={[styles.cofirmTitle]}> picking point </Text>
                                    <Text style={[styles.cofirmValue]}>
                                        {' '}
                                        {this.props.route.params.itemData.strPickingPointName}{' '}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 20 }}>
                                <View style={{ flexBasis: '50%' }}>
                                    <Text style={[styles.cofirmTitle]}> Total Charge </Text>
                                    <Text style={[styles.cofirmValue]}>
                                        {' '}
                                        {this.state.monTotalLogistic} BDT
                  </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ borderBottomColor: '#D6D6D6', borderBottomWidth: 1 }}>
                            <Text style={[styles.pikcerTitle]}> Select Vehicle </Text>
                            <Picker
                                selectedValue={this.state.selectVicel}
                                style={[styles.Prority]}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ selectVicel: itemValue })
                                }>
                                <Picker.Item label="Select" value="" />
                                {this.state.vehicleList.map((item, index) => (
                                    // <Picker.Item label={item.strRegNo} value={item.intID} />
                                    <Picker.Item
                                        label={item.strRegistrationNo}
                                        value={item.intVehicleId}
                                    />
                                ))}
                            </Picker>
                            <Text style={[styles.borderColors]}></Text>
                        </View>
                        <View style={{ borderBottomColor: '#D6D6D6', borderBottomWidth: 1 }}>
                            <Text style={[styles.pikcerTitle]}> Select Driver </Text>
                            <Picker
                                selectedValue={this.state.selectDriver}
                                style={[styles.Prority]}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ selectDriver: itemValue })
                                }>
                                <Picker.Item label="Select" value="" />
                                {this.state.driverlist.map((item, index) => (
                                    <Picker.Item
                                        label={item.strDriverName}
                                        value={item.intDriverId}
                                    />
                                ))}
                            </Picker>
                            <Text style={[styles.borderColors]}></Text>
                        </View>
                    </View>

                    <View style={[styles.selectBox]}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flexBasis: '35%' }}>
                                <Text style={[styles.tableTile]}> Store name </Text>
                            </View>
                            <View style={{ flexBasis: '30%' }}>
                                <Text style={[styles.tableTile]}> Quantity </Text>
                            </View>
                            <View style={{ flexBasis: '35%' }}>
                                <Text style={[styles.tableTile]}> Destination </Text>
                            </View>
                        </View>

                        {this.state.shipmentListDetaills.map((item, index) => (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    borderBottomColor: '#D6D6D6',
                                    borderBottomWidth: 1,
                                }}>
                                <View style={{ flexBasis: '35%' }}>
                                    <Text style={[styles.tableValue]}> {item.shopname} </Text>
                                </View>
                                <View style={{ flexBasis: '30%' }}>
                                    <Text style={[styles.tableValue]}> {item.decQty} </Text>
                                </View>
                                <View style={{ flexBasis: '35%' }}>
                                    <Text style={[styles.tableValue]}>
                                        {' '}
                                        {item.strDestinationAddress}{' '}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View>
                        <Text style={{ textAlign: 'center', fontSize: 25 }}>
                            Qnt: {this.state.totalQuantity} Bag | Amount:{' '}
                            {this.state.monTotalLogistic} BDT
            </Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.submit}>
                            <Text style={styles.buttonStyle}>Accept</Text>
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
        shadowOffset: { width: 1, height: 1 },
    },
    tableTile: {
        fontSize: RFPercentage(2.2),
        color: '#000',
        paddingVertical: 12,
        textTransform: 'uppercase',
    },
    tableValue: {
        fontSize: RFPercentage(2.5),
        color: '#000000',
        paddingVertical: 10,
        fontWeight: 'bold',
    },
    headTitle: {
        fontSize: RFPercentage(3.5),
        color: '#000000',
        fontWeight: 'bold',
        paddingVertical: 12,
        textTransform: 'uppercase',
    },
    cofirmTitle: {
        fontSize: RFPercentage(2.6),
        color: '#000000',
        textTransform: 'uppercase',
        paddingVertical: 12,
    },
    cofirmValue: {
        fontSize: RFPercentage(2.6),
        color: '#000000',
        fontWeight: 'bold',
    },
    shipmentNo: {
        fontSize: RFPercentage(3),
        color: '#000000',
        fontWeight: 'bold',
    },
    shipDate: {
        fontSize: RFPercentage(2.6),
        color: '#272727',
    },
    pikcerTitle: {
        fontSize: RFPercentage(2.6),
        color: '#000000',
        fontWeight: 'bold',
        paddingTop: 20,
    },
    buttonStyle: {
        backgroundColor: '#4E51C9',
        color: '#fff',
        fontSize: RFPercentage(3),
        textAlign: 'center',
        paddingVertical: 12,
        paddingHorizontal: 35,
        textTransform: 'uppercase',
        borderRadius: 5,
        marginTop: 10,
    },

    vehicleType: {
        fontSize: RFPercentage(2.5),
        color: '#000000',
    },
    capacity: {
        fontSize: RFPercentage(2.5),
        color: '#231F20',
        fontWeight: 'bold',
    },
    arrivalTime: {
        fontSize: RFPercentage(2.5),
        color: '#000000',
        paddingVertical: 2,
    },
    pickingpoint: {
        fontSize: RFPercentage(2.5),
        color: '#000000',
        marginLeft: 10,
        marginTop: 5,
    },
    totalCharge: {
        fontSize: RFPercentage(2.2),
        color: '#000000',
        paddingTop: 10,
    },
    vehicle: {
        fontSize: RFPercentage(2.5),
        color: '#231F20',
        fontWeight: 'bold',
    },
    driver: {
        fontSize: RFPercentage(2.2),
        color: '#000000',
        paddingTop: 10,
        fontWeight: 'bold',
    },
    storeName: {
        fontSize: RFPercentage(2.2),
        color: '#000000',
        paddingTop: 10,
        fontWeight: 'bold',
    },

    qnt: {
        fontSize: RFPercentage(2.2),
        color: '#000000',
        paddingTop: 10,
    },
    destination: {
        fontSize: RFPercentage(2.5),
        color: '#231F20',
        fontWeight: 'bold',
    },
});
