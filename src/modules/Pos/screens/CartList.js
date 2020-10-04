import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RFPercentage} from 'react-native-responsive-fontsize';
import GlobalStyles from '../../Master/styles/GlobalStyles';
import productImg1 from '../images/productImg1.png';

import Header from '../../Master/components/header/Header';
import {getAuthAction} from '../../User/actions/AuthAction';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartList = (props) => {
  const {navigation} = props;
  const [value, setValue] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [checked, setChecked] = React.useState(false);
  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const intUserTypeID = userData.intUserTypeID;

  useEffect(() => {
    dispatch(getAuthAction());
  }, [props]);

  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
        <View>
          <Header title="" />
          <View style={[styles.container]}>
            <View style={styles.menuContainer}>
              <View style={styles.amountBox}>
                <Text style={styles.Totalamount}>Total Amount </Text>
                <Text style={styles.Totalamounttwo}>৳ 1222.00</Text>
              </View>
            </View>

            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 20,
                }}>
                <Text style={styles.mycart}>My Cart</Text>

                <View style={{flexBasis: '37%'}}>
                  <TouchableOpacity>
                    <Text
                      style={[styles.addButtonStyle]}
                      size="medium"
                      onPress={() => props.navigation.navigate('unloadScan')}>
                      Add More
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Image source={productImg1} />
                </View>

                <View style={{flexBasis: '45%'}}>
                  <View>
                    <Text style={styles.producttext}>Product 1 </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 20,
                    }}>
                    <Text style={styles.productamountone}>1 kg</Text>
                    <Text style={styles.productamountone}>30 Pieces</Text>
                  </View>
                </View>

                <View style={{flexBasis: '20%', marginLeft: 35}}>
                  <View style={{paddingLeft: 20}}>
                    <Text style={styles.deleteIcon}>
                      <Icon name="times-circle" size={20} color={'#F28383'} />{' '}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.cartamount}>৳ 189</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginLeft: 125,
                }}>
                <Text
                  style={[styles.ButtonStyle]}
                  size="medium"
                  onPress={() => props.navigation.navigate('unloadScan')}>
                  -
                </Text>
                <Text style={styles.textarea}>01</Text>
                <Text
                  style={[styles.ButtonStyletwo]}
                  size="medium"
                  onPress={() => props.navigation.navigate('unloadScan')}>
                  +
                </Text>
              </View>

              {/* Temporary Use */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 30,
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Image source={productImg1} />
                </View>

                <View style={{flexBasis: '45%'}}>
                  <View>
                    <Text style={styles.producttext}>Product 1 </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 20,
                    }}>
                    <Text style={styles.productamountone}>1 kg</Text>
                    <Text style={styles.productamountone}>30 Pieces</Text>
                  </View>
                </View>

                <View style={{flexBasis: '20%', marginLeft: 35}}>
                  <View style={{paddingLeft: 20}}>
                    <Text style={styles.deleteIcon}>
                      <Icon name="times-circle" size={20} color={'#F28383'} />{' '}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.cartamount}>৳ 189</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginLeft: 125,
                }}>
                <Text
                  style={[styles.ButtonStyle]}
                  size="medium"
                  onPress={() => props.navigation.navigate('unloadScan')}>
                  -
                </Text>
                <Text style={styles.textarea}>01</Text>
                <Text
                  style={[styles.ButtonStyletwo]}
                  size="medium"
                  onPress={() => props.navigation.navigate('unloadScan')}>
                  +
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 30,
                }}>
                <View style={{flexBasis: '30%'}}>
                  <Image source={productImg1} />
                </View>

                <View style={{flexBasis: '45%'}}>
                  <View>
                    <Text style={styles.producttext}>Product 1 </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 20,
                    }}>
                    <Text style={styles.productamountone}>1 kg</Text>
                    <Text style={styles.productamountone}>30 Pieces</Text>
                  </View>
                </View>

                <View style={{flexBasis: '20%', marginLeft: 35}}>
                  <View style={{paddingLeft: 20}}>
                    <Text style={styles.deleteIcon}>
                      <Icon name="times-circle" size={20} color={'#F28383'} />{' '}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.cartamount}>৳ 189</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginLeft: 125,
                }}>
                <Text
                  style={[styles.ButtonStyle]}
                  size="medium"
                  onPress={() => props.navigation.navigate('unloadScan')}>
                  -
                </Text>
                <Text style={styles.textarea}>01</Text>
                <Text
                  style={[styles.ButtonStyletwo]}
                  size="medium"
                  onPress={() => props.navigation.navigate('unloadScan')}>
                  +
                </Text>
              </View>
              {/* Temporary Use */}
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                marginTop: 20,
                borderRadius: 12,
                shadowColor: '#000',
                width: '95%',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                marginBottom: 30,
                paddingBottom: 40,
              }}>
              <View
                style={{
                  borderRadius: 12,
                }}>
                <View style={styles.pickerBox}>
                  <Picker selectedValue="2">
                    <Picker.Item key="0" label="Select" value="0" />
                    <Picker.Item key={1} label="Customer" value="1" />
                    <Picker.Item key={2} label="Audit Form" value="2" />
                    <Picker.Item
                      key={3}
                      label="Sit Audit Checklist"
                      value="3"
                    />
                  </Picker>
                </View>
              </View>
              <View style={styles.referencestyle}>
                <Text style={styles.referencetext}>Reference No.</Text>
              </View>
              <View style={styles.referencestyle}>
                <Text style={styles.referencetext}>Note</Text>
              </View>
            </View>

            <View>
              <TouchableOpacity>
                <Text
                  style={[styles.checkout]}
                  size="medium"
                  onPress={() => props.navigation.navigate('unloadScan')}>
                  Checkout
                </Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 50,
  },
  cardStyle: {
    marginBottom: 10,
    borderRadius: 5,
  },

  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
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
    marginTop: 35,
  },
  emplyeeTitle: {
    color: '#202B35',
    fontSize: RFPercentage(2.7),
    fontWeight: 'bold',
    marginLeft: -5,
  },
  employeeid: {
    color: '#202B35',
    fontSize: RFPercentage(2.5),
    marginRight: 20,
  },
  employeeidguard: {
    color: '#202B35',
    fontSize: RFPercentage(2.5),
  },
  icon: {
    width: 32,
    height: 32,
  },
  logInputStyle: {
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 2,
    height: 55,
  },
  // Custom Box Styles

  productBoxStyle: {
    flex: 1,
    flexDirection: 'row',
  },

  productImg1: {
    width: '70%',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  container: {
    backgroundColor: '#F3F6FA',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 2,
  },

  buttonStyle: {
    backgroundColor: '#0091EA',
    width: '80%',
    color: 'red',
    borderRadius: 50,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 3, height: 113},
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    paddingVertical: 12,
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 15,
    borderTopLeftRadius: 20,
  },
  amountBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F3F6FA',
    marginBottom: 10,
  },
  Totalamount: {
    color: '#000000',
    fontSize: 26,
    fontWeight: 'bold',
    flexBasis: '50%',
  },
  Totalamounttwo: {
    color: '#2B45AE',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'right',
    flexBasis: '50%',
  },
  mycart: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    flexBasis: '60%',
  },

  addButtonStyle: {
    backgroundColor: '#0072BC',
    borderColor: '#19d4ee',
    color: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },

  producttext: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productamountone: {
    color: '#6E6E6E',
  },

  ButtonStyle: {
    backgroundColor: '#C5CEE0',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    color: '#fff',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  ButtonStyletwo: {
    backgroundColor: '#C5CEE0',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    color: '#fff',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  textarea: {
    backgroundColor: '#F3F6FA',
    padding: 15,
  },
  pickerItem: {
    backgroundColor: '#F6F6F6',
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkout: {
    backgroundColor: '#72B9FF',
    color: '#FFFFFF',
    borderRadius: 5,
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 26,
    textTransform: 'uppercase',
    width: '95%',
  },
  referencestyle: {
    backgroundColor: '#F6F6F6',
    color: '#000000',
    padding: 20,
    marginLeft: 10,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    width: '95%',
  },
  referencetext: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  pickerBox: {
    width: '95%',
    marginTop: 20,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: 'center',
    backgroundColor: '#F6F6F6',
    padding: 8,
  },
  cartamount: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default CartList;
