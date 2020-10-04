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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CardMenu from '../../Master/components/cards/CardMenu';
import Header from '../../Master/components/header/Header';
import {getAuthAction} from '../../User/actions/AuthAction';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductList = (props) => {
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
          <Header title="POS" />
          <View style={[styles.container]}>
            <View style={styles.productbutton}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('cartList')}>
                <View style={[styles.Cartbutton]}>
                  <Icon name="cart-plus" size={22} color={'#FFF'} />
                  <Text style={[styles.mycartstyle]}>My Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.menuContainer}>
              <>
                {/* <CardMenu
                    image={Bonus}
                    cardText="Customer Sales Order"
                    url={() => navigation.navigate('salesOrderCustomer')}
                    customStyle={styles.cardStyle}
                  /> */}

                <View style={styles.productBox}>
                  <Text style={styles.singleproductTextStyle}>৳ 189</Text>
                  <Image source={productImg1} style={[styles.productImg1]} />
                  {/* <Image source={OderImage} style={[styles.oderImage]} /> */}
                  <Text style={styles.productTitleStyle}>Product 1</Text>

                  <View style={styles.productBoxStyle}>
                    <Text style={styles.productTextStyle}>1 kg</Text>
                    <Text style={styles.productTextStyle}>30Pieces</Text>
                  </View>

                  <TouchableOpacity onPress={() => alert('added to cart')}>
                    <Text style={[styles.buttonStyle]}>Add</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.productBox}>
                  <Text style={styles.singleproductTextStyle}>৳ 189</Text>
                  <Image source={productImg1} style={[styles.productImg1]} />
                  {/* <Image source={OderImage} style={[styles.oderImage]} /> */}
                  <Text style={styles.productTitleStyle}>Product 1</Text>
                  <View style={styles.productBoxStyle}>
                    <Text style={styles.productTextStyle}>1 kg</Text>
                    <Text style={styles.productTextStyle}>30Pieces</Text>
                  </View>

                  <TouchableOpacity onPress={() => alert('added to cart')}>
                    <Text style={[styles.buttonStyle]}>Add</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.productBox}>
                  <Text style={styles.singleproductTextStyle}>৳ 189</Text>
                  <Image source={productImg1} style={[styles.productImg1]} />
                  {/* <Image source={OderImage} style={[styles.oderImage]} /> */}
                  <Text style={styles.productTitleStyle}>Product 1</Text>
                  <View style={styles.productBoxStyle}>
                    <Text style={styles.productTextStyle}>1 kg</Text>
                    <Text style={styles.productTextStyle}>30Pieces</Text>
                  </View>

                  <TouchableOpacity onPress={() => alert('added to cart')}>
                    <Text style={[styles.buttonStyle]}>Add</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.productBox}>
                  <Text style={styles.singleproductTextStyle}>৳ 189</Text>
                  <Image source={productImg1} style={[styles.productImg1]} />
                  {/* <Image source={OderImage} style={[styles.oderImage]} /> */}
                  <Text style={styles.productTitleStyle}>Product 1</Text>
                  <View style={styles.productBoxStyle}>
                    <Text style={styles.productTextStyle}>1 kg</Text>
                    <Text style={styles.productTextStyle}>30Pieces</Text>
                  </View>

                  <TouchableOpacity onPress={() => alert('added to cart')}>
                    <Text style={[styles.buttonStyle]}>Add</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.productBox}>
                  <Text style={styles.singleproductTextStyle}>৳ 189</Text>
                  <Image source={productImg1} style={[styles.productImg1]} />
                  {/* <Image source={OderImage} style={[styles.oderImage]} /> */}
                  <Text style={styles.productTitleStyle}>Product 1</Text>
                  <View style={styles.productBoxStyle}>
                    <Text style={styles.productTextStyle}>1 kg</Text>
                    <Text style={styles.productTextStyle}>30Pieces</Text>
                  </View>

                  <TouchableOpacity onPress={() => alert('added to cart')}>
                    <Text style={[styles.buttonStyle]}>Add</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.productBox}>
                  <Text style={styles.singleproductTextStyle}>৳ 189</Text>
                  <Image source={productImg1} style={[styles.productImg1]} />
                  {/* <Image source={OderImage} style={[styles.oderImage]} /> */}
                  <Text style={styles.productTitleStyle}>Product 1</Text>
                  <View style={styles.productBoxStyle}>
                    <Text style={styles.productTextStyle}>1 kg</Text>
                    <Text style={styles.productTextStyle}>30Pieces</Text>
                  </View>

                  <TouchableOpacity onPress={() => alert('added to cart')}>
                    <Text style={[styles.buttonStyle]}>Add</Text>
                  </TouchableOpacity>
                </View>
              </>
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
  containers: {
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
  productBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    width: '46%',
    marginRight: 15,
  },
  productBoxStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  singleproductStyle: {
    // flexBasis:'50%',
    // width:'50%',
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
  singleproductTextStyle: {
    color: '#272727',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  productTitleStyle: {
    color: '#272727',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  productTextStyle: {
    color: '#6E6E6E',
    fontSize: 12,
    flexBasis: '65%',
  },
  buttonStyle: {
    backgroundColor: '#0091EA',
    width: '80%',
    color: '#fff',
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
  },
  Cartbutton: {
    flex: 1,
    flexDirection: 'row',

    backgroundColor: '#5CADFE',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 50,
    borderRadius: 50,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'space-between',
    marginTop: 20,
    // marginLeft:'30%',
  },
  productbutton: {
    flex: 1,
    width: '40%',
    alignSelf: 'flex-end',
  },
  Carticon: {
    flexBasis: '50%',
  },
  mycartstyle: {
    color: '#FFF',
  },
});
export default ProductList;
