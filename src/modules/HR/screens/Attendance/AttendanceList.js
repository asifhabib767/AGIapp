import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {getAttendanceData} from '../Attendance/AttendanceService';
import {generateStringDateFromDate} from '../../Utils/DateConfigure';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
export default class AttendanceList extends Component {
  state = {
    attendanceList: [],
    enableCalendar: false,
  };

  async componentDidMount() {
    let attendanceList = await getAttendanceData();
    this.setState({attendanceList});
  }

  render() {
    const {navigation} = this.props;

    const BLUE = '#2196F3';
    const WHITE = '#FFFFFF';
    const GREY = '#BDBDBD';
    const BLACK = '#424242';
    const LIGHT_GREY = '#F5F5F5';

    return (
      <ScrollView style={[styles.fullbg]}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.AccountDetailsArea]}>
            <View style={{marginBottom: 10, flexDirection: 'row'}}>
              <Text style={[styles.pageTitle]}> Attendance List </Text>
              <View style={{flexBasis: '30%'}}>
                <TouchableOpacity>
                  <Text
                    style={[styles.buttonss]}
                    size="medium"
                    onPress={() => navigation.navigate('addAttendance')}>
                    ADD
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {this.state.enableCalendar && (
              <View style={[styles.calenderView]}>
                <Calendar
                  // Initially visible month. Default = Date()
                  current={'2020-07-28'}
                  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                  minDate={'2020-07-01'}
                  customStyle={{day: {fontSize: 15, textAlign: 'center'}}}
                  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                  maxDate={'2020-07-31'}
                  // Handler which gets executed on day press. Default = undefined
                  onDayPress={(day) => {
                    console.log('selected day', day);
                  }}
                  // Handler which gets executed on day long press. Default = undefined
                  onDayLongPress={(day) => {
                    console.log('selected day', day);
                  }}
                  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                  monthFormat={'yyyy MM'}
                  disableMonth={false}
                  // Handler which gets executed when visible month changes in calendar. Default = undefined
                  onMonthChange={(month) => {
                    console.log('month changed', month);
                  }}
                  onVisibleMonthsChange={(months) => {
                    console.log('now these months are visible', months);
                  }}
                  // Hide month navigation arrows. Default = false
                  hideArrows={false}
                  // Replace default arrows with custom ones (direction can be 'left' or 'right')
                  // renderArrow={(direction) => (<Arrow />)}
                  // Do not show days of other months in month page. Default = false
                  hideExtraDays={false}
                  // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                  // day from another month that is visible in calendar page. Default = false
                  disableMonthChange={false}
                  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                  firstDay={2}
                  // Hide day names. Default = false
                  hideDayNames={false}
                  // Show week numbers to the left. Default = false
                  showWeekNumbers={true}
                  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                  onPressArrowLeft={(subtractMonth) => subtractMonth()}
                  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                  onPressArrowRight={(addMonth) => addMonth()}
                  // Disable left arrow. Default = false
                  disableArrowLeft={false}
                  // Disable right arrow. Default = false
                  disableArrowRight={false}
                  // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                  disableAllTouchEventsForDisabledDays={false}
                  /** Replace default month and year title with custom one. the function receive a date as parameter. */
                  renderHeader={(date) => {
                    /*Return JSX*/
                  }}
                  renderItem={(item, firstItemInDay) => {
                    return <View />;
                  }}
                  // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
                  renderDay={(day, item) => {
                    return <View />;
                  }}
                  // Specify how empty date content with no items should be rendered
                  renderEmptyDate={() => {
                    return <View />;
                  }}
                  // Specify how agenda knob should look like
                  renderKnob={() => {
                    return <View />;
                  }}
                  // Specify what should be rendered instead of ActivityIndicator
                  renderEmptyData={() => {
                    return <View />;
                  }}
                  markingType={'custom'}
                  markedDates={{
                    '2020-07-28': {
                      customStyles: {
                        container: {
                          backgroundColor: '#38B8F2',
                        },
                        text: {
                          color: 'black',
                          fontWeight: 'bold',
                        },
                      },
                    },
                  }}
                />
              </View>
            )}
          </View>

          <View style={[styles.AccountDetailsArea]}>
            <FlatList
              data={this.state.attendanceList}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderBottomColor: '#ACACAC',
                    borderBottomWidth: 0.5,
                    paddingVertical: 10,
                  }}>
                  <View style={styles.totalDashboard}>
                    <View style={[styles.sectionTotalStyle]}>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        {generateStringDateFromDate(item.MonthDate)}
                      </Text>
                      <Text style={{fontWeight: 'bold', paddingBottom: 20}}>
                        {item.DayName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      {/* <View>
                        <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                          In Time
                        </Text>
                        <Text style={{fontSize: 20, marginLeft: 10}}>
                          09:00:34
                        </Text>
                      </View> */}
                      {/* <View>
                        <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                          Out Time
                        </Text>
                        <Text style={{fontSize: 20, marginLeft: 10}}>
                          18:00:34
                        </Text>
                      </View> */}
                      {/* <View>
                        <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                          Over Time
                        </Text>
                        <Text style={{fontSize: 20, marginLeft: 10}}>
                          21:00:34
                        </Text>
                      </View> */}
                      {item.presentStatus === 'Present' ? (
                        <View style={[styles.statusPresent]}>
                          <Text style={{color: '#00BB7D'}}>
                            {item.presentStatus}
                          </Text>
                        </View>
                      ) : item.presentStatus === 'Movement' ? (
                        <View style={[styles.statusMovement]}>
                          <Text style={{color: '#48BACC'}}>
                            {item.presentStatus}
                          </Text>
                        </View>
                      ) : item.presentStatus === 'Leave' ? (
                        <View style={[styles.statusLeave]}>
                          <Text style={{color: '#2163D8'}}>
                            {item.presentStatus}
                          </Text>
                        </View>
                      ) : item.presentStatus === 'Off Day' ? (
                        <View style={[styles.statusOffday]}>
                          <Text style={{color: '#fff'}}>
                            {item.presentStatus}
                          </Text>
                        </View>
                      ) : item.presentStatus === 'Late' ? (
                        <View style={[styles.statusLate]}>
                          <Text style={{color: '#FFAB02'}}>
                            {item.presentStatus}
                          </Text>
                        </View>
                      ) : (
                        <View style={[styles.statusLate]}>
                          <Text style={{color: '#FFAB02'}}>
                            {item.presentStatus}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              )}
            />
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
    width: '95%',
    margin: 8,
  },
  AccountDetailsArea: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 1},
  },
  pageTitle: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: '#000',
    paddingLeft: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tableBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2E3192',
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
  },

  attendTitle: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#000',
    paddingLeft: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 5,
  },

  attendSubTitle: {
    fontSize: RFPercentage(2),
    color: '#434343',
    paddingLeft: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 'bold',
  },

  tableHeading: {
    color: '#fff',
    fontSize: RFPercentage(2.5),
  },

  tableListBox: {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 7,
  },

  tableList: {
    color: '#000',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor: '#00000017',
    paddingVertical: 7,
  },
  buttonss: {
    backgroundColor: '#19d4ee',
    borderColor: '#19d4ee',
    color: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  totalDashboard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  sectionTotalStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
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
    marginLeft: 20,
  },

  statusAbsent: {
    backgroundColor: '#FFD4D2',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    borderRadius: 7,
    width: '25%',
    height: 25,
    marginTop: 10,
    marginLeft: 20,
  },

  statusMovement: {
    backgroundColor: '#E8FDFF',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    borderRadius: 7,
    width: '25%',
    height: 25,
    marginTop: 10,
    marginLeft: 20,
  },

  statusLeave: {
    backgroundColor: '#D9E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    borderRadius: 7,
    width: '25%',
    height: 25,
    marginTop: 10,
    marginLeft: 20,
  },

  statusOffday: {
    backgroundColor: '#696969',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    borderRadius: 7,
    width: '25%',
    height: 25,
    marginTop: 10,
    marginLeft: 20,
  },

  statusLate: {
    backgroundColor: '#FFF1D6',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    borderRadius: 7,
    width: '25%',
    height: 25,
    marginTop: 10,
    marginLeft: 20,
  },
});
