import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl, TextInput, Image, FlatList, Alert } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getMovementList, DeleteMovementData } from '../Movement/MovementService';
import { generateStringDateFromDate } from '../../Utils/DateConfigure';
import Calendar from '../../images/Calendar.png';
import HeaderButton from '../../../Master/components/header/HeaderButton';


export default class MovementList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            movementType: '',
            movement: '',
            refreshing: false
        };
    }

    async componentDidMount() {
        this.initializeData();

    }
    initializeData = async () => {
        let movement = await getMovementList();
        console.log('movement', movement)
        this.setState({
            movement
        })
    }
    onRefresh() {
        this.setState({ refreshing: true });
        this.initializeData().then(() => {
            this.setState({ refreshing: false })
        });
    }
    deleteMovement = (movementId) => {

        Alert.alert(
            'Confirm Delete',
            'Are you sure to delete movement ?',
            [
                {
                    text: 'Confirm', onPress: () => {
                        let deletemovement = DeleteMovementData(movementId);
                        this.props.navigation.navigate('movementList');
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                }
            ],
            { cancelable: false },
        );
    }
    render() {
        const { navigation } = this.props;
        return (



            <ScrollView style={[styles.fullbg]}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }>

                <SafeAreaView style={styles.container}>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <HeaderButton title="Movement" btnName="Add" url={() => navigation.navigate('addMovement')} />
                    </View>

                    <View style={[styles.AccountDetailsArea]} >

                        <FlatList
                            data={this.state.movement}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        borderBottomColor: '#ACACAC',
                                        borderBottomWidth: 0.5,
                                        paddingVertical: 10,
                                        marginLeft: 10
                                    }}>
                                    <View style={styles.totalDashboard}>
                                        <View style={[styles.sectionTotalStyle]}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.strMoveType}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ paddingBottom: 10, color: '#ACACAC' }}>#{item.intId}</Text>
                                                <Text style={{ paddingBottom: 10, paddingLeft: 10, color: '#ACACAC' }}>{item.strReason}</Text>
                                            </View>

                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <View>
                                                <Image source={Calendar} style={{ resizeMode: 'contain', height: 40 }} />
                                            </View>
                                            <View>
                                                <Text style={{ fontWeight: 'bold', marginLeft: 10, color: '#ACACAC' }}>From Date</Text>
                                                <Text style={{ fontSize: 15, marginLeft: 10 }}>{generateStringDateFromDate(item.dteStartTime)}</Text>
                                            </View>

                                            <View>
                                                <Text style={{ fontWeight: 'bold', marginLeft: 10, color: '#ACACAC' }}>To Date</Text>
                                                <Text style={{ fontSize: 15, marginLeft: 10 }}>{generateStringDateFromDate(item.dteEndTime)}</Text>
                                            </View>

                                            {item.srtStatus === 'Approved' ? (<View style={[styles.statusPresent]}>
                                                <Text style={{ color: '#33C796' }}>{item.srtStatus}</Text>
                                            </View>) : <View style={[styles.statusPending]}>
                                                    <Text style={{ color: '#FFCD6B' }}>{item.srtStatus}</Text>
                                                </View>}

                                        </View>

                                    </View>
                                </View>}
                        />
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
        width: '96%',
        margin: 4,
    },
    AccountDetailsArea: {
        backgroundColor: '#fff',
        borderRadius: 5,
        textAlign: "center",
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
        textAlign: "center",
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
        fontSize: RFPercentage(2, 2),
        textAlign: "center",
        fontFamily: 'Poppins-bold',
        fontWeight: '700',
        paddingVertical: 7,
        borderRadius: 50,
        marginRight: 5,
        width: '100%',
        height: 35,
    },
    statusPresent: {
        backgroundColor: '#B3FFD6',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins-bold',
        fontWeight: '700',
        borderRadius: 7,
        width: '25%',
        height: 25,
        marginTop: 10,
        marginLeft: 20
    },

    statusPending: {
        backgroundColor: '#FFF1D6',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins-bold',
        fontWeight: '700',
        borderRadius: 7,
        width: '25%',
        height: 25,
        marginTop: 10,
        marginLeft: 20
    },
    closeIcon: {
        backgroundColor: '#FB5E5E',
        color: '#fff',
        textAlign: "center",
        borderRadius: 100,
        paddingVertical: 8,
        borderRadius: 50,
        height: 35,
    },
    statusAddress: {
        fontSize: RFPercentage(2.5),
        fontWeight: 'bold'
    },

    statusLeave: {
        fontSize: RFPercentage(2.2),
        color: '#888888',
        fontWeight: 'bold'
    },
    statusBold: {
        fontSize: RFPercentage(2),
        color: '#000',
        fontWeight: 'bold'
    }


})