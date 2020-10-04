import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
    RefreshControl,
    BackHandler,
    Picker,
    Alert
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { getVehicleList } from '../service/trip/TripService';
import { getFuelDataByDay } from '../service/shippingStatement/shippingStatementService';
import { generateStringDateFromDate } from "../Util/DateConfigure";
import CustomSearchbar from '../components/CustomSearchbar';

export default class FuelLogDaybaseReport extends Component {
    state = {
        all_vehicles: [],
        isDateTimePickerVisible: false,
        intID: "",
        errorMessage: {},
        leavelist: '',
        all_vehicles: [],
        serachVehicleText: "",
        searched_vehicles: [],
        search_ships_text: "",
        startDate: "",
        endDate: "",
        singleShipData: [],
        searchedSingleShipData: [],

        vehicleId: '',
        strRegNo: '',
        strDriverName: '',
        strDriverContact: '',
        intDriverEnroll: '',
        strHelperName: '',
        strType: '',
        strVheicleParentName: '',
        refreshing: false,
        searchRequestText: ""
    };


    componentDidMount() {
        this.setState({
            startDate: this.currentDate(),
            endDate: this.currentDate()
        });
        this.initializeData();
    }

    initializeData = async () => {
        // Ship List Data
        let vehicleData = await getVehicleList();
        this.setState({
            all_vehicles: vehicleData,
        });

    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.initializeData().then(() => {
            this.setState({ refreshing: false })
        });
    }

    startDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    endDateTimePicker = () => {
        this.setState({ isEndDateTimePickerVisible: true });
    };

    showTimePicker = () => {
        this.setState({ isTimePickerVisible: true });
    };
    showTimePicker = () => {
        this.setState({ isEndTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    hideEndDateTimePicker = () => {
        this.setState({ isEndDateTimePickerVisible: false });
    };

    hideTimePicker = () => {
        this.setState({ isTimePickerVisible: false });
    };
    hideEndTimePicker = () => {
        this.setState({ isEndTimePickerVisible: false });
    };

    handleDatePicked = (date) => {

        let year = date.getFullYear();
        let dateNow = date.getDate();
        let month = parseInt(date.getMonth() + 1);
        let created_at = year + '-' + month + '-' + dateNow;
        created_at = created_at.trim();
        this.setState({ startDate: created_at });



        this.hideTimePicker();
        this.hideDateTimePicker();
    };
    handleEndDatePicked = (date) => {

        let year = date.getFullYear();
        let dateNow = date.getDate();
        let month = parseInt(date.getMonth() + 1);
        let created_at = year + '-' + month + '-' + dateNow;
        created_at = created_at.trim();
        this.setState({ endDate: created_at });



        this.hideEndTimePicker();
        this.hideEndDateTimePicker();
    };

    handleTimePicked = date => {
        let showTime = String(date).substr(15, 7) + '00';
        showTime = showTime.trim();
        this.setState({ showTime });
        this.hideTimePicker();
    };

    currentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    };



    onShowShipDetails = async () => {
        const { startDate, endDate } = this.state
        if (startDate === '' || endDate === '') {
            Alert.alert(
                "ডাটা নেই",
                "শুরুর সময় অথবা শেষের সময় খালি আছে",
                [
                    {
                        text: "অন্য কোনো সময়",
                        onPress: () => console.log("অন্য কোনো সময়")
                    },
                    {
                        text: "কাটুন",
                        onPress: () => console.log("কাটুন"),
                        style: "cancel"
                    },
                    { text: "ঠিক আছে", onPress: () => console.log("ঠিক আছে") }
                ],
                { cancelable: false }
            );
            return false;
        }
        let singleShipData = await getFuelDataByDay(startDate, endDate);
        console.log('singleShipData', singleShipData);
        this.setState({
            singleShipData,
            searchedSingleShipData: singleShipData

        })

    }

    searchText = searchRequestText => {
        if (searchRequestText.length > 0) {

            const newData = this.state.singleShipData.filter(function (item) {
                const itemData = item.decQnt + ' ';
                // console.log('newData', itemData);
                const textData = searchRequestText.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            this.setState({
                searchedSingleShipData: newData,
                searchRequestText: searchRequestText
            });
        } else {
            this.setState({
                searchedSingleShipData: this.state.singleShipData,
                searchRequestText: '',
            })
        }

    };


    render() {
        return (
            <ScrollView style={[styles.fullbg]} refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                />
            }>
                <SafeAreaView style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flexBasis: '70%' }}>
                            <Text style={[styles.headingOne]}> দিন অনুযাই রিপোর্ট </Text>
                        </View>

                    </View>

                    <View style={[styles.selectBox]}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={[styles.selectBoxStyle]}>
                                <Text style={[styles.inputLebel]}>শুরু তারিখ </Text>
                                <TouchableOpacity onPress={this.startDateTimePicker}>
                                    <Text style={[styles.dataPicker]}>{this.state.startDate}</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={(date) => this.handleDatePicked(date)}
                                    onCancel={this.hideDateTimePicker}
                                    datePickerModeAndroid={'spinner'}
                                    mode={'date'}
                                />

                            </View>

                            <View style={[styles.selectBoxStyle]}>
                                <Text style={[styles.inputLebel]}> শেষ তারিখ </Text>
                                <TouchableOpacity onPress={this.endDateTimePicker}>
                                    <Text style={[styles.dataPicker]}>{this.state.endDate}</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isEndDateTimePickerVisible}
                                    onConfirm={(date) => this.handleEndDatePicked(date)}
                                    onCancel={this.hideEndDateTimePicker}
                                    datePickerModeAndroid={'spinner'}
                                    mode={'date'}
                                />
                            </View>
                        </View>



                        {/* {this.state.search_ships_text.length > 0 this.state.searched_vehicles.length == 0 && (
              <Text
                style={{
                  backgroundColor: "#eee",
                  padding: 8,
                  color: "red",
                }}
              >
                Sorry !! No Dispoint found by - {this.state.search_vehicle_text}
              </Text>
            )} */}
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexBasis: '60%', marginRight: 5 }}>
                            <LinearGradient
                                colors={['#2D3190', '#2964BF']}
                                style={styles.linearGradient}>
                                <TouchableOpacity onPress={this.onShowShipDetails}>
                                    <Text style={styles.buttonText}>রিপোর্ট দেখুন &nbsp; </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={{ flexBasis: '40%' }}>
                            <CustomSearchbar
                                placeHolderText="Search from outlets"
                                onChangeText={(value) => this.searchText(value)}
                                style={styles.linearGradient}
                            />
                        </View>

                    </View>
                    {this.state.searchedSingleShipData.length > 0 && (
                        <View style={[styles.selectBox]}>
                            {this.state.searchedSingleShipData.map((item, index) => (

                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 20, borderBottomColor: '#D6D6D6', borderBottomWidth: 1, }}>

                                    <View style={{ flexBasis: '58%' }}>

                                        <Text style={[styles.shipmentNo]}>সময়:{generateStringDateFromDate(item.dteDate)}</Text>

                                    </View>
                                    <View style={{ flexBasis: '20%' }}>
                                        <Text style={[styles.shipmentNo]}> পরিমান</Text>
                                        <Text style={[styles.amount]}> {item.decQnt} ব্যাগ</Text>
                                    </View>

                                    <View style={{ flexBasis: '22%' }}>
                                        <Text style={[styles.shipmentNo]}> টোটাল</Text>
                                        <Text style={[styles.amount]}>{item.TotalAmounts} টাকা</Text>
                                    </View>

                                </View>

                            ))}
                        </View>
                    )}
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

    itemText: {
        fontSize: 15,
        margin: 2,
    },

    container: {
        width: '96%',
        margin: 8,
    },

    headingOne: {
        fontSize: RFPercentage(3.5),
        fontFamily: 'Poppins-bold',
        fontWeight: '700',
        paddingVertical: 10,
    },
    selectBox: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        paddingLeft: 10,
        marginTop: 10,
        justifyContent: 'center',
        paddingVertical: 15,
        shadowColor: 'rgba(0, 0, 0, 5)',
        shadowOpacity: 0.5,
        elevation: 8,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
    },

    inputLabel: {
        fontSize: RFPercentage(2.5),
        color: '#000000',
        fontWeight: 'bold',
        paddingTop: 10,
    },
    InputField: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '300',
        fontFamily: 'popppins',
        borderRadius: 0,
        paddingLeft: 5,
        paddingVertical: 12,
        borderBottomColor: '#000',
        borderBottomWidth: 0.6,
    },
    selects: {
        paddingVertical: 12,
        borderBottomColor: '#000',
        borderBottomWidth: 0.6,
    },
    inputOutput: {
        fontSize: RFPercentage(2.5),
        color: '#231F20',
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    inputLebel: {
        fontSize: RFPercentage(2.2),
        color: '#000000',
        fontWeight: 'bold',
    },
    totalBags: {
        fontSize: RFPercentage(3),
        color: '#000000',
    },
    orderBox: {
        borderTopColor: '#707070',
        borderTopWidth: 0.6,
        paddingTop: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    linearGradient: {
        width: '100%',
        borderRadius: 50,
    },
    buttonText: {
        fontSize: RFPercentage(3),
        textAlign: 'center',
        color: '#ffffff',
        paddingVertical: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    requestBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        paddingLeft: 10,
        marginTop: 30,
        justifyContent: 'center',
        paddingVertical: 15,
        shadowColor: 'rgba(0, 0, 0, 5)',
        shadowOpacity: 0.5,
        elevation: 8,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        flex: 1,
        flexDirection: 'row',
    },
    reqNo: {
        backgroundColor: '#08C48F',
        width: 55,
        height: 55,
        color: '#fff',
        borderRadius: 100,
        lineHeight: 55,
        textAlign: 'center',
    },
    selectBoxStyle: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
        marginTop: 10,
        flexBasis: '48%',
        marginRight: 10,
    },
});
