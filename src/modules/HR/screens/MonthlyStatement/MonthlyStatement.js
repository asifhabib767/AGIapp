import React, { useEffect } from 'react';
import {
    KeyboardAvoidingView,
    View,
    Dimensions,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import {
    getSalaryStatement,
    emptyRefreshControl,
} from '../../actions/montlyStatement/MonthlyStatementAction';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Loader from './../../../Master/components/loader/Loader';
import HeaderButton from '../../../Master/components/header/HeaderButton';
import Header from '../../../Master/components/header/Header';

const MonthlyStatement = (props) => {
    const [state, setState] = React.useState({
        SalaryStatement: [],
        leaveCount: 0,
    });
    const [leaveCount, setLeaveCount] = React.useState(0)
    const [punishmentCount, setPunishmentCount] = React.useState(0)
    const isFocused = useIsFocused();

    const { navigate } = props.navigation;
    const dispatch = useDispatch();

    // let unloadVehicleList = useSelector((state) => state.unloadVehicle.unloadVehicleList);
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    let isLoading = useSelector((state) => state.department.isLoading);
    const refreshingStatus = useSelector((state) => state.department.refreshing);
    const departmentListStatus = useSelector(
        (state) => state.department.departmentListStatus,
    );

    useEffect(() => {
        getInitialData();
    }, [isFocused]);

    const getInitialData = async () => {
        let SalaryStatement = await getSalaryStatement();
        const { intBL, intCL, intLWP, intML, intPL, intSL, monAbsentPunishmentAmount, monLatePunishmentAmount, monLeavePunishmentAmount } = SalaryStatement;
        const count = (parseInt(intBL) + parseInt(intCL) + parseInt(intSL) + parseInt(intML) + parseInt(intPL) + parseInt(intLWP));
        const punishment = (parseFloat(monAbsentPunishmentAmount) + parseFloat(monLatePunishmentAmount) + parseFloat(monLeavePunishmentAmount));

        console.log('punishment', punishment);
        setState({ SalaryStatement });
        setLeaveCount(count);
        setPunishmentCount(punishment);
    };

    const { intAbsent, intBL, intCL, intEL, intEmpID, intHoliday, intLWP, intLate, intML, intOffDay, intPL, intPresent, intSL, intWorkingDays, monNetPayableSalary } = state.SalaryStatement


    const onRefresh = () => {
        dispatch(emptyRefreshControl(true));
        getInitialData();
    };

    return (
        <KeyboardAvoidingView
            style={[GlobalStyles.backgroundColor, styles.container]}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshingStatus}
                        onRefresh={onRefresh.bind(this)}
                    />
                }>
                <View>
                    <Header title="Monthly Statement" />
                    <View style={[styles.container]}>
                        <View style={styles.leaveDashboard}>
                            {/* <Layout style={styles.dropDown} level='2'>
                                <Select
                                    selectedIndex={selectedIndex}
                                    onSelect={index => setSelectedIndex(index)}>
                                    <SelectItem title='Option 1' />
                                    <SelectItem title='Option 2' />
                                    <SelectItem title='Option 3' />
                                </Select>
                            </Layout> */}
                            <View style={[styles.sectionStyle]}>
                                <View style={[styles.statementBox]}>
                                    <View>
                                        <Text style={[styles.boxDays]}>{intWorkingDays}</Text>
                                        <Text style={[styles.boxText]}>Working Day</Text>
                                    </View>
                                </View>

                                <View style={[styles.statementBox]}>
                                    <View>
                                        <Text style={[styles.boxDays]}>{intOffDay}</Text>
                                        <Text style={[styles.boxText]}>Off Day</Text>
                                    </View>
                                </View>

                                <View style={[styles.statementBox]}>
                                    <View>
                                        <Text style={[styles.boxDays]}>{intHoliday}</Text>
                                        <Text style={[styles.boxText]}>Holyday</Text>
                                    </View>
                                </View>
                                <View style={[styles.statementBox]}>
                                    <View>
                                        <Text style={[styles.boxDays]}>{intPresent}</Text>
                                        <Text style={[styles.boxText]}>Present</Text>
                                    </View>
                                </View>

                                <View style={[styles.statementBox]}>
                                    <View>
                                        <Text style={[styles.boxDays]}>{leaveCount}</Text>
                                        <Text style={[styles.boxText]}>Leave</Text>
                                        {/* <Text style={[styles.leaveText]}>-৳২৫০০</Text> */}
                                    </View>
                                </View>
                                <View style={[styles.statementBox]}>
                                    <View>
                                        <Text style={[styles.boxDays]}>{intAbsent}</Text>
                                        <Text style={[styles.boxText]}>Absent</Text>
                                    </View>
                                </View>

                                <View style={[styles.statementBox]}>
                                    <View>
                                        <Text style={[styles.boxDays]}>{intLate}</Text>
                                        <Text style={[styles.boxText]}>Late</Text>
                                    </View>
                                </View>

                                <View style={[styles.statementBox]}>
                                    <View>
                                        <Text style={[styles.boxDays]}>{intEL}</Text>
                                        <Text style={[styles.boxText]}>Early Leave</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.totalDashboard}>
                            <View style={[styles.sectionTotalStyle]}>
                                <Text style={{ fontWeight: 'bold' }}>Punishment Amount</Text>
                                {punishmentCount !== 'undefined' ? <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 15 }}>{punishmentCount}/-</Text> : 0}

                            </View>
                            <View style={[styles.sectionTotalStyle]}>
                                <Text style={{ fontWeight: 'bold' }}>Total Payable Amount</Text>
                                <Text style={{ fontWeight: 'bold', color: '#73CD8E', fontSize: 15 }}>৳{monNetPayableSalary}/-</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowViewContainer: {
        flex: 1,
        paddingRight: 15,
        paddingTop: 13,
        paddingBottom: 13,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 20,
        marginLeft: 10,
    },
    itemList: {
        width: wp('68%'),
    },
    iconsec: {
        flexDirection: 'row',
        width: wp('20%'),
    },
    topbar: {
        marginTop: -0,
        width: width,
        height: height / 4,
        resizeMode: 'contain',
    },
    postionbox: {
        position: 'relative',
    },

    leaveDashboard: {
        flex: 1,
        // flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    sectionStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10
    },
    statementBox: {
        backgroundColor: '#F4F8FB',
        width: '25%',
        height: 75,
        borderRadius: 10,
        marginLeft: 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxDays: {
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 25
    },
    boxText: {
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 12
    },
    leaveText: {
        fontWeight: 'bold',
        color: 'red',
        marginLeft: 5,
        fontSize: 12
    },
    dropDown: {
        width: '30%',
        marginLeft: 30
    },
    totalDashboard: {
        flex: 1,
        // flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    sectionTotalStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginLeft: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    },

});
export default MonthlyStatement;
