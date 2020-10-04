import React, {useEffect} from 'react';
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
  BackHandler,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import topbar from '../../images/top-bar.png';
import {Button, Spinner} from '@ui-kitten/components';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetDepartmentList,
  emptyRefreshControl,
} from '../../actions/distribution/distributionAction';
import {FlatList} from 'react-native-gesture-handler';
import {NavigationActions} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Loader from '../../../Master/components/loader/Loader';

const DistributionList = (props) => {
  const [value, setValue] = React.useState('');
  const isFocused = useIsFocused();

  const {navigate} = props.navigation;
  const dispatch = useDispatch();

  let departmentList = useSelector((state) => state.department.departmentList);
  let isLoading = useSelector((state) => state.department.isLoading);
  const refreshingStatus = useSelector((state) => state.department.refreshing);

  useEffect(() => {
    getInitialData();
  }, [isFocused]);

  const getInitialData = () => {
    dispatch(GetDepartmentList());
    dispatch(emptyRefreshControl(false));
  };

  // const initializaAllDatas = () => {
  //   dispatch(emptyRefreshControl(false));
  // };

  const onRefresh = () => {
    dispatch(emptyRefreshControl(true));
    // getInitialData();
  };

  return (
    <KeyboardAvoidingView
      style={[GlobalStyles.backgroundColor, styles.container]}>
      <ScrollView>
        <View>
          <View style={[styles.postionbox]}>
            <ImageBackground style={[styles.topbar]} source={topbar} />
            <View style={[styles.headerDetails]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexBasis: '65%'}}>
                  <Text style={[styles.headerTitle]}> Department </Text>
                </View>
                <View style={{flexBasis: '30%'}}>
                  <TouchableOpacity>
                    <Text
                      style={[styles.buttonss]}
                      size="medium"
                      onPress={() => navigate('addDepartment')}>
                      ADD
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View>{isLoading ? <Loader /> : null}</View>
            <FlatList
              data={departmentList}
              keyExtractor={(item) => item.Id}
              renderItem={({item, index, separators}) => (
                <View style={styles.rowViewContainer}>
                  <View style={styles.itemList}>
                    <Text>{item.Name}</Text>
                  </View>
                  <View style={styles.iconsec}>
                    <View style={styles.activesizebutton}>
                      <Text style={[styles.buttonActive]} size="small">
                        Active
                      </Text>
                    </View>
                    <View style={styles.penIcon}>
                      <Icon
                        name="edit"
                        size={20}
                        color={'#3366FF'}
                        onPress={() =>
                          props.navigation.navigate('editDepartment', {
                            id: item.Id,
                          })
                        }
                      />
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

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
    borderRadius: 50,
    marginTop: 15,
  },
  icon: {
    width: 32,
    height: 32,
  },
  buttonss: {
    backgroundColor: '#19d4ee',
    borderColor: '#19d4ee',
    color: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 13,
    textAlign: 'center',
  },
  buttonActive: {
    backgroundColor: '#B3FFD6',
    borderColor: '#6df3bd',
    color: '#08a571',
    borderRadius: 6,
    paddingVertical: 2,
    textAlign: 'center',
  },
  activesizebutton: {
    width: wp('17%'),
    marginRight: 5,
  },
  penIcon: {
    padding: 5,
  },
});
export default DistributionList;
