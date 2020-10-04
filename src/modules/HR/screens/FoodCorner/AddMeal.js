import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-community/picker';
import { getMovementType, getCountryList, getDistrictList, createMovement } from '../Movement/MovementService';
import { Actions } from 'react-native-router-flux';
import { Radio, Autocomplete, RadioGroup } from '@ui-kitten/components';
import { MovementValidation } from '../../Utils/Validation';

export default class AddMeal extends Component {


    state = {
        typeList: [],
        countryList: [],
        districtList: [],

        type: '',
        country: 22,
        district: '',
        addCountrytype: '',
        addDistricttype: '',
        fromDate: '',
        endDate: '',
        reason: '',
        address: '',
        isDateTimePickerVisible: false,
        isEndDateTimePickerVisible: false,
    };

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       isDateTimePickerVisible: false,
    //       isEndDateTimePickerVisible: false,
    //     };
    //   }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    showEndDateTimePicker = () => {
        this.setState({ isEndDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    EndhideDateTimePicker = () => {
        this.setState({ isEndDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        let year = date.getFullYear();
        let dateNow = date.getDate();
        let month = parseInt(date.getMonth() + 1);
        let fromDate = year + '-' + month + '-' + dateNow;
        this.setState({ fromDate });
        this.hideDateTimePicker();
    };
    EndhandleDatePicked = date => {
        let year = date.getFullYear();
        let dateNow = date.getDate();
        let month = parseInt(date.getMonth() + 1);
        let endDate = year + '-' + month + '-' + dateNow;
        this.setState({ endDate });
        this.EndhideDateTimePicker();
    };

    async componentDidMount() {
        const { type, fromDate, endDate, country, district, reason, address } = this.state

        let typeList = await getMovementType();
        let countryList = await getCountryList();
        let districtList = await getDistrictList();


        // console.log(typeList);
        // console.log(countryList);
        // console.log(districtList);
        this.setState({
            typeList,
            countryList,
            districtList
        })
    }

    submit = async () => {
        const { type, fromDate, endDate, country, district, reason, address } = this.state
        let validation = MovementValidation(fromDate, endDate, reason, address)


        let postMovement = await createMovement(type, fromDate, endDate, country, district, reason, address);

        if (postMovement) {
            Alert.alert('Success', postMovement);
            // Actions.HrMovement();
            this.props.navigation.navigate('movementList');
        }

        //Alert.alert(postMovement);

    }

    SelectedIndex = () => {
        alert('clicked')
    }

    render() {
        return (



            <ScrollView style={[styles.fullbg]}>

                <SafeAreaView style={styles.container}>




                    <View style={[styles.AccountDetailsArea]}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.pageTitle]}> Add Meal </Text>
                        </View>

                        <View style={[styles.selectBoxStyle]}>

                            <TouchableOpacity onPress={this.showDateTimePicker}>
                                <Text style={[styles.inputLebel]}> Date </Text>
                                <Text style={[styles.inputLebel]}>{this.state.fromDate}</Text>
                                <Text title="Show DatePicker" onPress={this.showDateTimePicker} />
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                    datePickerModeAndroid={'spinner'}
                                    mode={'date'}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ paddingTop: 15 }}>
                            <Text style={[styles.inputLebel]}> No Of Meal </Text>
                            <TextInput
                                style={[styles.InputField]}
                                placeholder="No Of Meal"
                                // value={this.state.reason}
                                onChangeText={value => {
                                    this.setState({ reason: value });
                                }}
                            />
                        </View>

                        <View>
                            <Text style={[styles.inputLebel]}> Type </Text>
                            <Picker
                                selectedValue={this.state.country}
                                style={[styles.Prority]}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ country: itemValue })
                                }>
                                {/* <Picker.Item label="select-1" value="select-1" />
                                        <Picker.Item label="Official Tour" value="" /> */}
                                {
                                    this.state.countryList.map((item, index) =>
                                        (
                                            <Picker.Item key={index} label={item.strName} value={item.intId} />
                                        )
                                    )
                                }
                            </Picker>
                            <Text style={[styles.borderColors]}></Text>
                        </View>

                        <View style={{ paddingTop: 15 }}>
                            <Text style={[styles.inputLebel]}> Remarks </Text>
                            <TextInput
                                style={[styles.InputField]}
                                placeholder="Remarks"
                                // value={this.state.reason}
                                onChangeText={value => {
                                    this.setState({ reason: value });
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <RadioGroup style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                            // selectedIndex={selectedIndex}
                            onChange={() => this.SelectedIndex()}>
                            <Radio>Option 1</Radio>
                            <Radio>Option 3</Radio>
                        </RadioGroup>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <TouchableOpacity onPress={this.submit}>
                            <Text style={[styles.buttonStyle]}> Submit </Text>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>

            </ScrollView >



        )

    }

}

const styles = StyleSheet.create({


    fullbg: {
        backgroundColor: '#F2F8FF',
        height: '100%'
    },

    container: {
        width: '95%',
        margin: 8,
    },
    AccountDetailsArea: {
        backgroundColor: '#fff',
        borderRadius: 5,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        paddingVertical: 15,
        shadowColor: 'rgba(0, 0, 0, 5)',
        shadowOpacity: 0.5,
        elevation: 8,
        shadowRadius: 10,
        shadowOffset: { width: 23, height: 113 },
    },


    borderColors: {
        borderBottomColor: '#DADADA',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        marginTop: -15,
    },

    pageTitle: {
        fontSize: RFPercentage(5),
        fontWeight: 'bold',
        color: '#005BD2',
    },

    creditDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',

    },

    leaveTitle: {
        fontSize: RFPercentage(5),
        fontWeight: 'bold',
        color: '#005BD2',
        textAlign: 'center'
    },

    leaveSubTitle: {
        fontSize: RFPercentage(2.3),
        fontWeight: 'bold',
        color: '#231F20',
        textAlign: 'center'
    },

    inputLebel: {
        fontSize: 16,
        textAlign: 'left',
        color: '#232A2F',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },


    InputField: {
        height: 40,
        color: '#000',
        fontSize: 20,
        fontSize: 16,
        borderBottomColor: '#DADADA',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        marginBottom: 10,
        marginTop: 5,
        fontWeight: 'bold'
    },
    selectBoxStyle: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 20,

    },
    buttonStyle: {
        backgroundColor: '#4E51C9',
        width: '95%',
        color: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.5,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 3, height: 113 },
        fontSize: RFPercentage(3),
        lineHeight: 40,
        fontWeight: '700',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
        textTransform: 'uppercase',
        borderRadius: 5,
        marginLeft: 10,
        marginTop: 20,
    },

})