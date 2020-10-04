import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    RefreshControl,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import GlobalStyles from "../../../Master/styles/GlobalStyles";
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getLeaveList, DeleteLeave, getLeaveType } from '../Leave/LeaveService';
import HeaderButton from '../../../Master/components/header/HeaderButton';

export default class LeaveList extends Component {
    state = {
        isDateTimePickerVisible: false,
        leavelist: [],
        leaveType: '',
        refreshing: false,
        count: []
    };
    onRefresh() {
        this.setState({ refreshing: true });
        this.initializeData().then(() => {
            this.setState({ refreshing: false });
        });
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = (date) => {
        this.hideDateTimePicker();
    };

    async componentDidMount() {
        this.initializeData();
    }

    initializeData = async () => {
        let leavelist = await getLeaveList();
        console.log('leave Data', leavelist)
        let leaveType = await getLeaveType();
        console.log('leaveType', leaveType)
        this.setState({ leavelist, leaveType });
    };



    delateLeave = (ApplicationId) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure to delete Leave ?',
            [
                {
                    text: 'Confirm',
                    onPress: () => {
                        let Delete = DeleteLeave(ApplicationId);
                        this.props.navigation.navigate('leaveList');
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    };

    render() {
        console.log('leavelist', this.state.leavelist)
        const { navigation } = this.props;
        const { isFocused } = this.props;
        return isFocused ? null : (
            <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
                <ScrollView
                    style={[styles.fullbg]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }>
                    <SafeAreaView style={styles.container}>
                        <HeaderButton title="Leave" btnName="Add" url={() => navigation.navigate('addLeave')} />
                        {/* <View style={styles.leaveDashboard}>
                            <FlatList
                                data={this.state.leaveType}
                                renderItem={({ item }) => (
                                    <View style={styles.leaveBox}>
                                        <View >
                                            <Text style={styles.dashboardTextView}>0/10</Text>
                                            <Text style={{ color: '#fff', padding: 5 }}>Earn Leave</Text>
                                        </View>
                                    </View>


                                )}
                                keyExtractor={(item) => item.id}
                            />
                        </View> */}
                        <View style={[styles.AccountDetailsArea]}>
                            <FlatList
                                data={this.state.leavelist}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            borderBottomColor: '#ACACAC',
                                            borderBottomWidth: 0.5,
                                            paddingVertical: 10,
                                        }}>
                                        <View>
                                            <Text style={[styles.statusDate]}>
                                                {' '}
                                                <Text style={[styles.statusBold]}>From</Text>{' '}
                                                {item.dateAppliedFromDate.substr(0, 10)}{' '}
                                                <Text style={[styles.statusBold]}> To </Text>{' '}
                                                {item.dateAppliedToDate.substr(0, 10)}
                                            </Text>
                                            <Text style={[styles.statusAddress]}>
                                                {item.strLeaveReason}
                                            </Text>
                                            <Text style={[styles.statusLeave]}>
                                                {' '}
                                                {item.strLeaveType}{' '}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexBasis: '25%',
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end',
                                                marginVertical: 12,
                                            }}>
                                            <Text
                                                style={
                                                    item.srtApprovedStatus === 'Pending'
                                                        ? styles.statusPending
                                                        : styles.statusApproved
                                                }>
                                                {' '}
                                                {item.srtApprovedStatus}{' '}
                                            </Text>
                                        </View>

                                        {item.srtApprovedStatus === 'Pending' ? (
                                            <View style={{ flexBasis: '10%', marginVertical: 12 }}>
                                                <TouchableOpacity
                                                    onPress={() => this.delateLeave(item.intApplicationId)}>
                                                    <Text style={[styles.closeIcon]}>
                                                        {' '}
                                                        <Icon name="trash" size={12} />{' '}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : null}
                                    </View>
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardAvoidingView >
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
        margin: 4,
        flex: 1,
    },
    AccountDetailsArea: {
        backgroundColor: '#fff',
        borderRadius: 5,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        padding: 10,
        paddingVertical: 15,
        shadowColor: 'rgba(0, 0, 0, 5)',
        shadowOpacity: 0.5,
        elevation: 8,
        shadowRadius: 10,
        shadowOffset: { width: 23, height: 113 },
    },

    styleButtionTwo: {
        backgroundColor: '#585CDB',
        color: '#fff',
        fontSize: RFPercentage(2.2),
        width: '40%',
        textAlign: 'center',
        fontFamily: 'Poppins-bold',
        fontWeight: '700',
        paddingVertical: 10,
        borderRadius: 50,
    },

    headingOne: {
        fontSize: 19,
        fontFamily: 'Poppins-bold',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 2,
        paddingTop: 5,
    },
    statusTitle: {
        fontSize: RFPercentage(2),
        paddingTop: 5,
    },

    statusPending: {
        backgroundColor: '#ACACAC',
        color: '#fff',
        // fontSize: RFPercentage(2, 2),
        textAlign: 'center',
        fontFamily: 'Poppins-bold',
        fontWeight: '700',
        paddingVertical: 3,
        borderRadius: 7,
        marginRight: 5,
        width: '60%',
        height: 25,
    },
    statusApproved: {
        backgroundColor: '#B3FFD6',
        color: '#2CCC93',
        // fontSize: RFPercentage(2, 2),
        textAlign: 'center',
        fontFamily: 'Poppins-bold',
        fontWeight: '700',
        paddingVertical: 3,
        borderRadius: 7,
        marginRight: 5,
        width: '60%',
        height: 25,
    },
    closeIcon: {
        backgroundColor: '#FB5E5E',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 3,
        borderRadius: 10,
        // height: 35,
    },
    statusAddress: {
        fontSize: RFPercentage(2.5),
        fontWeight: 'bold',
    },

    statusLeave: {
        fontSize: RFPercentage(2.2),
        color: '#888888',
        fontWeight: 'bold',
    },
    statusBold: {
        fontSize: RFPercentage(2),
        color: '#000',
        fontWeight: 'bold',
    },
    buttonss: {
        backgroundColor: '#19d4ee',
        borderColor: '#19d4ee',
        color: '#000',
        borderRadius: 20,
        paddingVertical: 10,
        textAlign: 'center',
    },
    leaveDashboard: {
        backgroundColor: '#215ABF',
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 10,
        marginLeft: 10
    },
    sectionStyle: {
        justifyContent: 'space-between',
        paddingRight: 30,
        paddingLeft: 30,

    },

    // sectionTextStyle: {
    //     justifyContent: 'space-between',
    //     paddingRight: 30,
    //     paddingLeft: 30,

    // },
    dashboardTextView: {
        flexBasis: '30%',
        backgroundColor: '#4D7BCC',
        flexWrap: 'wrap',
        color: '#fff',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textView: {
        color: '#fff',
        fontSize: 10,
    },
    leaveBox: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
    }
});
