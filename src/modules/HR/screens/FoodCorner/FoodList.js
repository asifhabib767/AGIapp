import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl, TextInput, Image, FlatList, Alert } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCafeteriaMenuList, getScheduleMealList, getConsumedMealList, DeleteMeal } from '../../actions/foodcorner/FoodCornerAction';
import { generateStringDateFromDate } from '../../Utils/DateConfigure';
import Calendar from '../../images/Calendar.png';
import Consume from '../../images/consume.png';
import TodayMeal from '../../images/today_meal.png';
import HeaderButton from '../../../Master/components/header/HeaderButton';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class FoodList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            menuList: '',
            todayMenu: '',
            restMenu: '',
            refreshing: false,
            countScheduledMeal: 0,
            countConsumedMeal: 0
        };
    }

    async componentDidMount() {
        console.log('propsData', this.props)
        this.initializeData();

    }

    initializeData = async () => {
        let menuList = await getCafeteriaMenuList();
        let mealList = await getScheduleMealList();
        let consumeMealList = await getConsumedMealList();
        let countScheduledMeal = 0;
        let countConsumedMeal = 0;
        mealList.forEach(element => {
            countScheduledMeal += parseInt(element.MealNo);
        });

        consumeMealList.forEach(element => {
            countConsumedMeal += parseInt(element.MealNo);
        });

        const todayMenu = menuList.filter(x => x.isToday)[0];
        const restMenu = menuList.filter(x => x.isToday == false);
        this.setState({
            menuList,
            todayMenu,
            restMenu,
            mealList,
            countScheduledMeal,
            countConsumedMeal
        })

    }
    onRefresh() {
        this.setState({ refreshing: true });
        this.initializeData().then(() => {
            this.setState({ refreshing: false })
        });
    }

    deleteMealPrompt = async (dteMeal) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure to delete movement ?',
            [
                {
                    text: 'Confirm', onPress: async () => {
                        let deleteStatus = await DeleteMeal(dteMeal);
                        if (deleteStatus) {
                            await this.initializeData();
                        }
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
                        <HeaderButton title="Food Corner" />
                    </View>
                    <View style={[styles.AccountDetailsArea]} >
                        <View style={styles.monthlyFood}>
                            <Text style={styles.monthlyFoodText}>Monthly Food</Text>
                            <Text style={{ fontSize: 12, marginRight: 5 }}><Text style={{
                                backgroundColor: '#08C48F', borderRadius: 30
                            }}><Icon name='check' color='#fff' size={10} /></Text>  You Are now Regular</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.consumeMealBox}>
                                <View style={styles.imageBackground}><Image source={Consume} style={styles.consumeLogo} /></View>

                                <View style={{ margin: 5, flexBasis: '70%' }}>
                                    <Text style={{ color: '#fff', fontSize: 10 }}>Your Consumed Meal</Text>
                                    <Text style={styles.quantityMeal}>{this.state.countConsumedMeal}</Text>
                                </View>
                            </View>

                            <View style={styles.consumeMealBox}>
                                <View style={styles.imageBackground}><Image source={Consume} style={styles.consumeLogo} /></View>

                                <View style={{ margin: 5, flexBasis: '70%' }}>
                                    <Text style={{ color: '#fff', fontSize: 10 }}>Your Schedule Meal</Text>
                                    <Text style={styles.quantityMeal}>{this.state.countScheduledMeal}</Text>
                                </View>
                            </View>
                            {/* <View style={{ backgroundColor: '#3276DC' }}><Text>Hello</Text></View> */}
                        </View>

                    </View>
                    <View>
                        <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>Today's Meal</Text>
                    </View>

                    <View style={[styles.AccountDetailsArea]} >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexBasis: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={TodayMeal} />
                            </View>

                            <View style={{ flexBasis: '80%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 10 }}>{this.state.todayMenu.strMenuList}</Text>
                                <Text style={styles.dividerLine}></Text>
                                <Text style={{ color: '#A1A1A1', fontSize: 10 }}>{this.state.todayMenu.strDayName}</Text>

                            </View>
                        </View>

                    </View>

                    <View>


                        <FlatList
                            data={this.state.restMenu}
                            keyExtractor={item => item.intDayOffId}
                            renderItem={({ item }) =>
                                <View style={{ flexDirection: 'row', borderBottomWidth: 0.2, padding: 5 }}>
                                    <View style={{ flexBasis: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{item.strDayName.substr(0, 3)}</Text>
                                    </View>

                                    <View style={{ flexBasis: '80%', }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 10 }}>{item.strMenuList}</Text>
                                    </View>
                                </View>

                            }
                        />
                    </View>

                    <View style={{ padding: 5 }}>
                        <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>Meal List</Text>
                    </View>
                    <View style={[styles.AccountDetailsArea]} >

                        <FlatList
                            data={this.state.mealList}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) =>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        borderBottomColor: '#ACACAC',
                                        borderBottomWidth: 0.5,
                                        paddingVertical: 10,
                                        marginLeft: 10
                                    }} key={index}>
                                    <View style={styles.totalDashboard}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <View style={{ flexBasis: '15%' }}>
                                                <Image source={Calendar} style={{ resizeMode: 'contain', height: 40 }} />
                                            </View>

                                            <View style={{ flexBasis: '55%' }}>
                                                <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{item.strNarration}</Text>
                                                <Text style={{ fontSize: 15, marginLeft: 10 }}>{generateStringDateFromDate(item.dteMeal)}</Text>
                                            </View>

                                            <View style={{ flexBasis: '15%' }}>
                                                <Text>{item.MealNo}</Text>
                                            </View>

                                            <View style={{ flexBasis: '15%' }}>
                                                <TouchableOpacity onPress={() => this.deleteMealPrompt(item.dteMeal)}>
                                                    <Icon name="times-circle-o" size={20} color='red' />
                                                </TouchableOpacity>
                                            </View>
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
    },
    monthlyFood: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    consumeLogo: {
        resizeMode: 'contain',
        width: wp('3%'),
        height: hp('4%'),
    },
    imageBackground: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 4,
        flexBasis: '20%',
        alignItems: 'center',
        marginLeft: 10

    },

    consumeMealBox: {
        backgroundColor: '#3276DC',
        flexBasis: '48%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 5
    },
    quantityMeal: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25
    },
    monthlyFoodText: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 10

    },
    dividerLine: {
        backgroundColor: '#3276DC',
        height: hp('0.4%'),
        width: wp('6%'),
        marginBottom: 5,
        marginTop: 5
    }


})