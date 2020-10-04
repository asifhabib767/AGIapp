import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  View,
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {RFPercentage} from 'react-native-responsive-fontsize';

import * as Core from '../../Master/Util/Core';
import * as DateClass from '../../Master/Util/DateConfigure';

import {
  getShippingPoints,
  getShippingPointsForSalesOrder,
} from '../service/sales/ShippingPoint';
import {getSalesOffices} from '../service/sales/SalesOffice';
import {getSalesTypes} from '../service/sales/SalesType';
import {getRetailers, getRetailerBalance} from '../service/retailers/Retailer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  getProducts,
  getProductPrice,
  getChartOfAccountData,
  getSalesOrderProducts,
} from '../service/products/Product';
// import { getCustomer } from '../service/sales/CustomerList';
import {
  getDeliveryPoints,
  searchDeliveryPoints,
} from '../service/sales/DeliveryPoint';
import {
  getDistributorBalance,
  getCustomerTypes,
} from '../service/distributor/Distributor';
import AsyncStorage from '@react-native-community/async-storage';
import {
  salesOrderCreate,
  getCustomerList,
} from '../service/sales/salesOrderService';

import {SalesOrderValidation} from '../../Master/Util/Validation';
import {getUserEmail, getUnit, getUserId} from '../service/auth/AuthService';
import IAppsInput from './../../Master/components/input/IAppsInput';
import GlobalStyles from './../../Master/styles/GlobalStyles';
import {FlatList} from 'react-native-gesture-handler';

class SalesOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intUserID: '',
      intUnitID: '',
      dteDate: '',
      dteDODate: '',
      intCustomerType: '',
      intCustomerId: '',
      intDisPointId: '',
      strNarration: '',
      strAddress: '',
      intPriceVarId: 0,
      intVehicleVarId: 0,
      ysnLogistic: false,
      intChargeId: 0,
      numCharge: 0,
      intIncentiveId: 0,
      numIncentive: 0,
      intCurrencyId: 0,
      numConvRate: 0,
      intSalesTypeId: 0,
      monExtraAmount: 0,
      strExtraCause: '',
      strOther: '',
      strContactAt: '',
      strPhone: '',
      intSalesOffId: '',
      intShipPointId: '',
      ysnSiteDelivery: '',
      ysnDeliveryOrder: '',
      email: '',
      ysnPeriodicleCrLim: false,
      productId: '',
      product: {},
      product_quantity: 0,
      product_price: '0',
      productPriceObj: {},
      uom: '',
      product_uom: 'Bag',
      total_price: '0',
      product_accId: 0,
      product_accName: 'Portland Cement',

      salesCustomer: '',
      isDateTimePickerVisible: false,

      credit_limit: 0,
      debit: 0,
      outstanding: 0,
      pending: 0,
      collection: 0,

      retailer_name: '',

      shipping_points: [],
      sales_offices: [],
      sales_types: [],
      customer_types: [],
      product_types: [],
      sales_customers: [],

      all_delivery_points: [],
      searched_delivery_points: [],
      search_delivery_point_text: '',

      strCusName: '',
      products: [],

      productsCart: [],

      errorMessage: {},
      disabledButton: true,
      isLoading: false,
      search_product_text: '',
      searched_product: [],

      search_shippingPoint_text: '',
      searched_shippingPoint: [],
    };
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = (date) => {
    let year = date.getFullYear();
    let dateNow = date.getDate();
    let month = parseInt(date.getMonth() + 1);
    let dteDODate = year + '-' + month + '-' + dateNow;
    this.setState({dteDODate});
    this.hideDateTimePicker();
  };

  componentDidMount = async () => {
    let userData = (await AsyncStorage.getItem('userData')) || 'none';
    let dataParse = JSON.parse(userData);
    let email = dataParse.strOfficeEmail;

    this.setState({
      intUserID: dataParse.intEmployeeId,
      intUnitID: dataParse.intUnitId,
      dteDate: DateClass.getFormattedCurrentDate(),
      email,
    });

    let shipping_pointsData = await getShippingPointsForSalesOrder();
    // let customerList = await getCustomerList(this.state.email);

    let sales_offices = await getSalesOffices();

    let sales_types = await getSalesTypes();
    console.log('sales_types', sales_types);
    //    let sales_customers = await getRetailers();
    let products = await getSalesOrderProducts();
    let all_delivery_points = await getDeliveryPoints(this.state.email, false);
    let customer_types = await getCustomerTypes(4); // Unit 4

    this.setState({
      shipping_points: shipping_pointsData,
      sales_offices,
      sales_types,
      // sales_customers,
      all_delivery_points,
      customer_types,
      products,
      dteDODate: DateClass.getFormattedCurrentDate(),
    });

    this.setFixedData();
  };

  /**
   * On press customer, set the account limits
   *
   * @param customerBalanceData - Distributor Account Balance Data
   */
  setAccountLimits = async (customerBalanceData) => {
    console.log(customerBalanceData);
    let that = this;

    if (!Core.isEmpty(customerBalanceData)) {
      that.setState({
        credit_limit: customerBalanceData.monCreditLimit,
        debit: customerBalanceData.monDebit,
        outstanding: -customerBalanceData.monOutstanding,
        pending: customerBalanceData.monPending,
        collection: customerBalanceData.monCollection,
      });
    }
  };

  customerListByshippingPoint = async (value, index) => {
    let errorMessage = this.state.errorMessage;
    if (value !== '') {
      this.setState((prevState) => {
        let customer = Object.assign({}, prevState.errorMessage);
        errorMessage.intSalesOffId = ''; // update the name property, assign a new value
        return {customer}; // return new object jasper object
      });
    }
    this.setState({
      intSalesOffId: value,
    });

    // let sales_customers =  await getCustomer(value);
    // console.log('view customer', sales_customers);

    // this.setState({
    //     sales_customers
    // })
  };

  /**
   * Calculate total price of product
   *
   * @param {int} product_price
   * @param {int} product_quantity
   */
  calculateTotalPrice = (product_price, product_quantity) => {
    let errorMessage = this.state.errorMessage;
    this.setState((prevState) => {
      let customer = Object.assign({}, prevState.errorMessage);
      errorMessage.productQuantiy = ''; // update the name property, assign a new value
      return {customer}; // return new object jasper object
    });

    let total_price = parseFloat(product_quantity * product_price);
    let outStanding = this.state.outstanding;
    //   let newOutstanding = - (outStanding);

    if (total_price > outStanding) {
      Alert.alert('Warning', 'You Balance is low');
    }
    this.setState({total_price});
  };

  /**
   * SearchDeliveryPoints
   *
   * Search Filter of Delivery Points
   * @param string SearchText
   */
  searchDeliveryPoints = (searchText) => {
    // if empty delivery point then remove the field data
    if (searchText == '') {
      this.setState({
        credit_limit: 0,
        debit: 0,
        outstanding: 0,
        strCusName: '',
      });
    }
    let errorMessage = this.state.errorMessage;

    // Search Delivery Points using javascript
    const searched_delivery_points = this.state.all_delivery_points.filter(
      function (item) {
        const strDisPointName = item.strDisPointName + ' ' + item.intDisPointId;
        // const itemData = item.strDisPointName ? item.strDisPointName.toUpperCase() : ''.toUpperCase();
        const itemData = strDisPointName.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      },
    );

    if (this.state.searched_delivery_points.length == 1) {
      //remove error message
      this.setState({
        search_delivery_point_text: searchText,
        searched_delivery_points,
        intDisPointId: '',
      });
      this.selectDisPoint(this.state.searched_delivery_points[0]);
    } else {
      this.setState({
        search_delivery_point_text: searchText,
        searched_delivery_points,
        intDisPointId: '',
      });
      this.setState((prevState) => {
        let customer = Object.assign({}, prevState.errorMessage);
        errorMessage.intDisPointId = ''; // update the name property, assign a new value
        return {customer}; // return new object jasper object
      });
    }
  };

  /**
   * selectDisPoint
   */
  selectDisPoint = async (item) => {
    let intDisPointId = item.intDisPointId;
    let search_delivery_point_text =
      item.strDisPointName + ' [' + intDisPointId + ']';
    let intCustomerId = item.intCusId;
    let strCusName = item.strCusName;
    let retailer_name = item.strContactPerson;
    let strAddress = item.strAddress;
    let strPhone = item.strContactNo;
    let strContactAt = item.strContactPerson;

    this.setState({
      intDisPointId,
      search_delivery_point_text,
      intCustomerId,
      searched_delivery_points: [],
      strCusName,
      strContactAt,

      retailer_name,
      strAddress,
      strPhone,
      intVehicleVarId: item.intLogisticCatagory,
      territoryId: item.intPriceCatagory,
    });

    let distributorBalanceItem = await getDistributorBalance(
      intDisPointId,
      DateClass.getFormattedCurrentDate(),
      4,
    );
    console.log('distributorBalanceItem', distributorBalanceItem);
    this.setAccountLimits(distributorBalanceItem);
    let customerList = await getCustomerList(
      this.state.email,
      this.state.intCustomerId,
    );

    // this.setState({
    //   ysnPeriodicleCrLim: customerList[0].ysnPeriodicleCrLim
    // });
    // console.log("yns enalble", customerList[0].ysnPeriodicleCrLim);
    // alert(this.state.ysnPeriodicleCrLim);

    // console.log("customer list data", customerList[0].ysnPeriodicleCrLim);
  };

  /**
   * Select shipping Point
   *
   * set price values and set state
   */
  searchShippingPoint = (searchText) => {
    // Search Delivery Points using javascript

    const searched_shippingPoint = this.state.shipping_points.filter(function (
      item,
    ) {
      const strCusName = item.strName + ' ' + item.strDescription;
      const itemData = strCusName.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    console.log('searched_product', searched_shippingPoint);

    if (this.state.searched_shippingPoint.length == 1) {
      //remove error message
      this.setState({
        search_shippingPoint_text: searchText,
        searched_shippingPoint,
      });
    } else {
      this.setState({
        search_shippingPoint_text: searchText,
        searched_shippingPoint,
      });
    }
  };
  /**
   * Select Product
   *
   * set price values and set state
   */
  searchProduct = (searchText) => {
    // Search Delivery Points using javascript

    if (this.state.search_delivery_point_text == '') {
      Alert.alert('Error', 'Please select Delivery points');
      return false;
    }

    const searched_product = this.state.products.filter(function (item) {
      const strCusName = item.strProductName + ' ' + item.strUOM;
      const itemData = strCusName.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    console.log('searched_product', searched_product);

    if (this.state.searched_product.length == 1) {
      //remove error message
      this.setState({
        search_product_text: searchText,
        searched_product,
      });
    } else {
      this.setState({
        search_product_text: searchText,
        searched_product,
      });
    }
  };
  selectShippingPoint = async (item) => {
    let that = this;
    that.setState({
      search_shippingPoint_text: item.strName,
      searched_shippingPoint: [],
      intShipPointId: item.intId,
    });
  };

  selectProduct = async (item) => {
    let that = this;

    // that.setState({
    //   product: item,
    //   product_uom: item.strUOM,
    //   productId: item.intId,
    //   uom: item.intSellingUom,
    //   intPriceVarId: that.state.territoryId,
    // });

    that.setState({
      product: item,
      product_uom: item.strUOM,
      productId: item.intId,
      uom: item.intSellingUom,
      intPriceVarId: that.state.territoryId,
      search_product_text: item.strProductName,
      searched_product: [],
    });

    // console.log("item is", item);
    // console.log("Product ID: ", item.intId);
    // console.log("Customer ID: ", that.state.intCustomerId);
    // console.log("Sales Type ID: ", that.state.intSalesTypeId);
    // console.log("UomID ID: ", item.intSellingUom);
    // console.log("PriceID: ", that.state.territoryId);
    let UomID = item.intSellingUom;

    // Get price of that product, from customer, product etc.
    let productPriceObj = await getProductPrice(
      item.intId,
      that.state.intCustomerId,
      UomID,
      that.state.intSalesTypeId,
      that.state.territoryId,
    );

    console.log('productPriceObj: ', productPriceObj);
    that.setState({
      product_price: productPriceObj.price,
      productPriceObj,
    });

    let chartOfAccount = await getChartOfAccountData(
      item.intId,
      that.state.intSalesTypeId,
      that.state.intUnitID,
    );

    // console.log('chartOfAccount: ', chartOfAccount);

    that.setState({
      product_accId: chartOfAccount.intcoaid,
      product_accName: chartOfAccount.strcoaname,
    });

    // Set Narration
    that.setNarration();

    // console.log('Price Got Obj: ', productPriceObj );
  };

  /**
   * setNarration
   */
  setNarration = (product_quantity = this.state.product_quantity) => {
    let product_name = this.state.product.strProductName;
    let product_uom = this.state.product_uom;
    let strNarration =
      '[' + product_quantity + ' ' + product_uom + ' ' + product_name + ']';
    this.setState({strNarration});
    // console.log('strNarration: ', this.state.strNarration);
  };

  setFixedData = () => {
    this.setState({
      ysnLogistic: true,
      ysnSiteDelivery: false,
      ysnDeliveryOrder: true,

      intChargeId: 4,
      numCharge: 0,
      intIncentiveId: 4,
      intCurrencyId: 1,
      numConvRate: 1,

      monExtraAmount: 0,
      strExtraCause: 'NA',
      strOther: 'NA',
    });
  };

  /**
   * submitOrder
   */
  submitOrder = async () => {
    console.log('this.state', this.state);

    this.setState({isLoading: true});

    const {
      intUserID,
      intUnitID,
      dteDate,
      dteDODate,
      intCustomerType,
      intCustomerId,
      intDisPointId,
      strNarration,
      strAddress,
      intPriceVarId,
      intVehicleVarId,
      ysnLogistic,
      intChargeId,
      numCharge,
      intIncentiveId,
      numIncentive,
      intCurrencyId,
      numConvRate,
      intSalesTypeId,
      monExtraAmount,
      strExtraCause,
      strOther,
      strContactAt,
      strPhone,
      intSalesOffId,
      intShipPointId,
      ysnSiteDelivery,
      ysnDeliveryOrder,
      product_price,
    } = this.state;
    let product_quantity = this.state.product_quantity;

    //validation input and picker
    let salesValidation = SalesOrderValidation(
      intShipPointId,
      intSalesOffId,
      intCustomerType,
      intSalesTypeId,
      product_quantity,
      intDisPointId,
      product_price,
    );
    //console.log('validation is',salesValidation);

    // console.log("sales validation", salesValidation);
    let validationError = Object.keys(salesValidation.errorMsg).length;
    if (validationError > 0) {
      this.setState({isLoading: false});
      this.setState({errorMessage: salesValidation.errorMsg});
    }

    if (this.state.ysnPeriodicleCrLim === false) {
      if (this.state.total_price > this.state.outstanding) {
        this.setState({isLoading: false});
        Alert.alert('Error', 'Your outstanding balance is over to order !');
        return false;
      }
    } else {
      alert('true');
      if (this.state.credit_limit > 0) {
        this.setState({isLoading: false});
        return true;
      }
    }

    const singleProductData = {
      pid: this.state.productId,
      pName: this.state.product.strProductName,
      qnt: parseInt(this.state.product_quantity),
      pr: this.state.product_price,
      accId: this.state.product_accId, // Will be Given
      accName: this.state.product_accName, // Will be Given
      extId: 4,
      extName: 'Labour',
      extPr: 0,
      uom: this.state.uom,
      cur: 1,
      narr: this.state.strNarration,
      sType: this.state.intSalesTypeId,
      logisId: this.state.intVehicleVarId, // vehicle bar id
      prom: 0,
      comm: this.state.productPriceObj.commission,
      incId: 4,
      incPr: 0,
      suppTax: this.state.productPriceObj.suppTax,
      vat: this.state.productPriceObj.vat,
      vatPr: this.state.productPriceObj.vatPrice,
      uomTxt: this.state.product_uom,
      promItemId: this.state.productId,
      promItem: this.state.product.strProductName,
      promUom: this.state.uom,
      promUomText: this.state.product_uom,
      promPr: this.state.product_price,
      promItemCOA: this.state.product_accId,
      soPkId: 0,
      apprQnt: parseInt(this.state.product_quantity),
    };

    let DO_NO = await salesOrderCreate(
      intUserID,
      intUnitID,
      dteDate,
      dteDODate,
      intCustomerType,
      intCustomerId,
      intDisPointId,
      strNarration,
      strAddress,
      intPriceVarId,
      intVehicleVarId,
      ysnLogistic,
      intChargeId,
      numCharge,
      intIncentiveId,
      numIncentive,
      intCurrencyId,
      numConvRate,
      intSalesTypeId,
      monExtraAmount,
      strExtraCause,
      strOther,
      strContactAt,
      strPhone,
      intSalesOffId,
      intShipPointId,
      ysnSiteDelivery,
      ysnDeliveryOrder,
      singleProductData,
    );

    if (DO_NO.length != 0) {
      this.setState({isLoading: true});
      Alert.alert('Sales Order Created', 'Sales Order No - ' + DO_NO);

      // Redirect
      // Actions.allOrders();

      this.props.navigation.navigate('myOrders');
      this.setState({isLoading: false});
    }
  };

  customerType = (itemValue) => {
    let errorMessage = this.state.errorMessage;
    if (itemValue !== '') {
      this.setState((prevState) => {
        let customer = Object.assign({}, prevState.errorMessage);
        errorMessage.intCustomerType = ''; // update the name property, assign a new value
        return {customer}; // return new object jasper object
      });
    }
    this.setState({intCustomerType: itemValue});
  };

  shippingPointPicker = (itemValue) => {
    //error message none
    let errorMessage = this.state.errorMessage;
    if (itemValue !== '') {
      this.setState((prevState) => {
        let customer = Object.assign({}, prevState.errorMessage);
        errorMessage.intShipPointId = ''; // update the name property, assign a new value
        return {customer}; // return new object jasper object
      });
    }
    this.setState({intShipPointId: itemValue});
  };

  salesTypeId = (itemValue) => {
    //error message hide
    let errorMessage = this.state.errorMessage;
    if (itemValue !== '') {
      this.setState((prevState) => {
        let customer = Object.assign({}, prevState.errorMessage);
        errorMessage.intSalesType = ''; // update the name property, assign a new value
        return {customer}; // return new object jasper object
      });
    }
    this.setState({intSalesTypeId: itemValue});
  };

  render() {
    return (
      <KeyboardAvoidingView style={{backgroundColor: '#f9f9f9'}}>
        <ScrollView>
          <SafeAreaView style={[styles.container]}>
            <View style={[styles.bgbox]}>
              {/* <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                <Text style={[styles.headingOne]}> Sales Orders </Text>
              </View> */}
              <View style={styles.errorBags}>
                <Text style={styles.errorMessage}>
                  {this.state.errorMessage.intShipPointId}
                </Text>
              </View>

              {/* <View style={{marginVertical: 0}}>
                <Text style={[styles.inputLebel]}> Shipping Point </Text>
                <View style={GlobalStyles.pickerItem}>
                  <Picker
                    selectedValue={this.state.intShipPointId}
                    onValueChange={(itemValue, itemIndex) =>
                      this.shippingPointPicker(itemValue)
                    }>
                    <Picker.Item key="-1" label="Select" value="" />
                    {this.state.shipping_points.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.strName}
                        value={item.intId}
                      />
                    ))}
                  </Picker>
                </View>
              </View> */}

              <View>
                <IAppsInput
                  label="Search shipping Point"
                  style={[styles.InputField]}
                  placeholder="Search Shipping Point"
                  placeholderTextColor={'#000'}
                  value={this.state.search_shippingPoint_text}
                  onChangeText={(value) => this.searchShippingPoint(value)}
                />
              </View>
              <View style={{marginTop: 10}}>
                <FlatList
                  data={this.state.searched_shippingPoint}
                  keyExtractor={(item) => item.Id}
                  renderItem={({item, index, separators}) => (
                    <View>
                      <TouchableOpacity
                        onPress={() => this.selectShippingPoint(item, index)}>
                        <View style={styles.listItemSearch}>
                          <TouchableOpacity></TouchableOpacity>
                          <View style={{flexBasis: '20%'}}>
                            <Text>SL</Text>
                            <Text>{++index}</Text>
                          </View>
                          <View style={{flexBasis: '60%'}}>
                            <Text>Item Name</Text>
                            <Text>{item.strName}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>

              <View>
                <View style={styles.errorBags}>
                  <Text style={styles.errorMessage}>
                    {this.state.errorMessage.intSalesOffId}
                  </Text>
                </View>

                <Text style={[styles.inputLebel]}> Sales Office </Text>
                {/* <Picker
                                    selectedValue={this.state.intSalesOffId}  
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({intSalesOffId: itemValue})
                                    
                                    }>
                                    <Picker.Item key="-1" label="Select" value="" />
                                    {
                                        this.state.sales_offices.map((item, index) => 
                                            (
                                                <Picker.Item key={index} label={item.strName} value={item.intId} />
                                            )
                                        )
                                    }
                                </Picker>  */}
                {/* <Picker
                                    selectedValue={this.state.intShipPointId}  
                                    onValueChange={(itemValue, itemIndex)=>this.customerListByshippingPoint}
                                    >
                                    <Picker.Item key="-1" label="Select" value="" />
                                    {
                                        this.state.shipping_points.map((item, index) => 
                                            (
                                                <Picker.Item key={index} label={item.strName} value={item.intId} />
                                            )
                                        )
                                    }
                                </Picker> */}
                <View style={[GlobalStyles.pickerItem]}>
                  <Picker
                    selectedValue={this.state.intSalesOffId}
                    onValueChange={(value, index) =>
                      this.customerListByshippingPoint(value, index)
                    }>
                    <Picker.Item key="-1" label="Select" value="" />
                    {this.state.sales_offices.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.strName}
                        value={item.intId}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View>
                <Text style={[styles.inputLebel]}> Customer Type </Text>
                <View style={styles.errorBags}>
                  <Text style={styles.errorMessage}>
                    {this.state.errorMessage.intCustomerType}
                  </Text>
                </View>
                <View style={GlobalStyles.pickerItem}>
                  <Picker
                    selectedValue={this.state.intCustomerType}
                    onValueChange={
                      (itemValue, itemIndex) => this.customerType(itemValue)
                      //this.setState({intCustomerType: itemValue})
                    }>
                    {this.state.customer_types.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.strTypeName}
                        value={item.intTypeId}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              {this.state.strCusName.length > 0 && (
                <View style={{marginVertical: 10}}>
                  <View style={[styles.selectBoxStyle]}>
                    <Text style={[styles.inputLebel]}> Customer </Text>
                    <Text style={{marginLeft: 2, padding: 8}}>
                      {this.state.strCusName}
                    </Text>
                  </View>
                </View>
              )}

              <View>
                <View>
                  <Text style={styles.errorMessage}>
                    {this.state.errorMessage.intDisPointId}
                  </Text>
                  <IAppsInput
                    label="Delivery Points"
                    style={[styles.InputField]}
                    placeholder="Search Delivery Points"
                    placeholderTextColor={'#000'}
                    value={this.state.search_delivery_point_text}
                    onChangeText={(value) => this.searchDeliveryPoints(value)}
                  />
                </View>

                {this.state.search_delivery_point_text.length != 0 &&
                  this.state.searched_delivery_points.length > 0 && (
                    <ScrollView
                      style={{backgroundColor: '#eee', height: '100%'}}>
                      {this.state.searched_delivery_points.map(
                        (item, index) => (
                          <TouchableOpacity
                            onPress={() => this.selectDisPoint(item)}>
                            <Text
                              key={index}
                              style={{
                                padding: 8,
                                borderWidth: 0,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ddd',
                              }}>
                              {' '}
                              {item.strDisPointName +
                                ' [' +
                                item.intDisPointId +
                                ']'}{' '}
                            </Text>
                          </TouchableOpacity>
                        ),
                      )}
                    </ScrollView>
                  )}

                {this.state.search_delivery_point_text.length != 0 &&
                  this.state.searched_delivery_points.length === 0 &&
                  this.state.intDisPointId.length == 0 && (
                    <Text
                      style={{
                        backgroundColor: '#eee',
                        padding: 8,
                        color: 'red',
                      }}>
                      Sorry !! No Dispoint found by -{' '}
                      {this.state.search_delivery_point_text}
                    </Text>
                  )}
              </View>

              <View style={{marginVertical: 10}}>
                <View style={[styles.selectBoxStyle]}>
                  <Text style={[styles.inputLebel]}> Delivery Date </Text>

                  <TouchableOpacity onPress={this.showDateTimePicker}>
                    <View style={GlobalStyles.pickerItem}>
                      <Text style={([styles.inputLebel], {paddingTop: 15})}>
                        {' '}
                        {this.state.dteDODate}{' '}
                      </Text>
                      <Text
                        title="Show DatePicker"
                        onPress={this.showDateTimePicker}
                      />
                      <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        datePickerModeAndroid={'spinner'}
                        mode={'date'}
                        value={this.state.dteDODate}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <IAppsInput
                label="Phones"
                name="donumber"
                onChangeText={(value) => {
                  this.setState({strPhone: value});
                }}
                placeholder="Type your phone number"
                value={this.state.strPhone}
              />

              <View style={{marginVertical: 10}}>
                <IAppsInput
                  style={[styles.InputField]}
                  label="Address"
                  placeholder="Type your Address"
                  placeholderTextColor={'#000'}
                  value={this.state.strAddress}
                  onChangeText={(value) => {
                    this.setState({strAddress: value});
                  }}
                />
              </View>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flexBasis: '34%',
                    borderRightColor: '#ccc',
                    borderRightWidth: 0.7,
                  }}>
                  <View style={[styles.singleMenuItem]}>
                    <Text style={[styles.singleMenuItemTitle]}>
                      {' '}
                      Credit Limit{' '}
                    </Text>
                    <Text style={[styles.singleMenuItemSubTitle]}>
                      {' '}
                      ৳{this.state.credit_limit}{' '}
                    </Text>
                  </View>
                  {/* <View style={{ backgroundColor: '#393CA4', paddingVertical:8 , marginTop:5}}>
                                    <Text style={[styles.avgQality]}> Avg. Sales Qty </Text>
                                    <Text style={[styles.avgQalityValue]}> ৳1500 </Text>
                                </View> */}
                </View>
                <View
                  style={{
                    flexBasis: '33%',
                    borderRightColor: '#ccc',
                    borderRightWidth: 0.7,
                  }}>
                  <View style={[styles.singleMenuItem]}>
                    <Text style={[styles.singleMenuItemTitle]}> Debit </Text>
                    <Text style={[styles.singleMenuItemSubTitle]}>
                      {' '}
                      ৳{this.state.debit}{' '}
                    </Text>
                  </View>
                  {/* <View style={{ backgroundColor: '#393CA4', paddingVertical:8 , marginTop:5}}>
                                    <Text style={[styles.avgQality]}> Starting </Text>
                                    <Text style={[styles.avgQalityValue]}> ৳2000 </Text>
                                </View> */}
                </View>
                <View style={{flexBasis: '33%'}}>
                  <View style={[styles.singleMenuItem]}>
                    <Text style={[styles.singleMenuItemTitle]}>
                      {' '}
                      Outstanding{' '}
                    </Text>
                    <Text
                      style={[
                        styles.singleMenuItemRedSubTitle,
                        {color: '#000'},
                      ]}>
                      {' '}
                      ৳{this.state.outstanding}{' '}
                    </Text>
                  </View>
                  {/* <View style={{ backgroundColor: '#D71920', paddingVertical:8 , marginTop:5 }}>
                                    <Text style={[styles.avgQality]}> Remaining Qty. </Text>
                                    <Text style={[styles.avgQalityValue]}> ৳1800 </Text>
                                </View> */}
                </View>
              </View>

              <View style={{marginVertical: 15}}>
                <View style={{marginVertical: 10}}>
                  <Text style={[styles.inputLebel]}> Sales Type </Text>
                  <Text style={styles.errorMessage}>
                    {this.state.errorMessage.intSalesType}
                  </Text>
                  <View style={GlobalStyles.pickerItem}>
                    <Picker
                      selectedValue={this.state.intSalesTypeId}
                      onValueChange={(itemValue, itemIndex) =>
                        this.salesTypeId(itemValue)
                      }>
                      {this.state.sales_types.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.strTypeName}
                          value={item.intTypeId}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                {/* <View style={[styles.selectBoxStyle]}>
                  <Text style={[styles.inputLebel]}> Select Product </Text>
                  <View style={GlobalStyles.pickerItem}>
                    <Picker
                      selectedValue={this.state.product}
                      onValueChange={(item, itemIndex) =>
                        this.selectProduct(item)
                      }>
                      <Picker.Item key="-1" label="Select" value="" />
                      {this.state.products.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.strProductName}
                          value={item}
                        />
                      ))}
                    </Picker>
                  </View>
                </View> */}
                <View>
                  <IAppsInput
                    label="Search Product"
                    style={[styles.InputField]}
                    placeholder="Search Products"
                    placeholderTextColor={'#000'}
                    value={this.state.search_product_text}
                    onChangeText={(value) => this.searchProduct(value)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <FlatList
                    data={this.state.searched_product}
                    keyExtractor={(item) => item.Id}
                    renderItem={({item, index, separators}) => (
                      <View>
                        <TouchableOpacity
                          onPress={() => this.selectProduct(item)}>
                          <View style={styles.listItemSearch}>
                            <TouchableOpacity></TouchableOpacity>
                            <View style={{flexBasis: '20%'}}>
                              <Text>Item ID</Text>
                              <Text>{item.intId}</Text>
                            </View>
                            <View style={{flexBasis: '60%'}}>
                              <Text>Item Name</Text>
                              <Text>{item.strProductName}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
            <View />

            <View style={[styles.bgbox]}>
              <Text style={styles.errorMessage}>
                {this.state.errorMessage.productQuantiy}
              </Text>
              <Text style={styles.errorMessage}>
                {this.state.errorMessage.product_price}
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flexBasis: '30%',
                    borderRightColor: '#ccc',
                    borderRightWidth: 0.7,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#393CA4',
                      paddingVertical: 8,
                      marginTop: 5,
                    }}>
                    <Text style={[styles.avgQality]}> Item</Text>
                  </View>
                  <View style={[styles.singleMenuItem]}>
                    <Text style={[styles.singleMenuItemSubTitle]}>
                      {' '}
                      {this.state.product.strProductName}{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexBasis: '30%',
                    borderRightColor: '#ccc',
                    borderRightWidth: 0.7,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#393CA4',
                      paddingVertical: 8,
                      marginTop: 5,
                    }}>
                    <Text style={[styles.avgQality]}> Price</Text>
                  </View>
                  <View style={[styles.singleMenuItem]}>
                    <Text style={[styles.singleMenuItemSubTitle]}>
                      {' '}
                      ৳{this.state.product_price}{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexBasis: '40%',
                    borderRightColor: '#ccc',
                    borderRightWidth: 0.7,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#393CA4',
                      paddingVertical: 8,
                      marginTop: 5,
                    }}>
                    <Text style={[styles.avgQality]}> Quantity</Text>
                  </View>
                  <View style={[styles.singleMenuItem]}>
                    <TextInput
                      style={[
                        styles.InputField,
                        {
                          borderBottomWidth: 0.5,
                          fontWeight: 'bold',
                          fontSize: 18,
                        },
                      ]}
                      value={this.state.product_quantity}
                      editable={this.state.disabledButton}
                      onChangeText={(value) => {
                        this.setState({product_quantity: value});
                        this.calculateTotalPrice(
                          this.state.product_price,
                          value,
                        );

                        // Set Narration
                        this.setNarration(value);
                      }}
                      keyboardType={'numeric'}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingVertical: 10,
              }}>
              <Text style={[styles.amountTitle]}>
                {' '}
                Total{' '}
                <Text style={[styles.totalAmount]}>
                  {' '}
                  ৳ {this.state.total_price}{' '}
                </Text>{' '}
              </Text>
            </View>

            <View style={{marginBottom: 120}}>
              {!this.state.isLoading && (
                <TouchableOpacity onPress={() => this.submitOrder()}>
                  <Text style={[styles.buttonStyle]}> Submit </Text>
                </TouchableOpacity>
              )}
              {this.state.isLoading && (
                <Text style={[styles.buttonStyle]}> Submiting ..... </Text>
              )}
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // width: '95%',
    // margin: 8,
    height: '100%',

    backgroundColor: '#f9f9f9',
  },

  bgbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    margin: 10,
    padding: 10,
    paddingTop: 15,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOpacity: 0.5,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: {width: 23, height: 1},
  },

  headingOne: {
    fontSize: RFPercentage(3.5),
    fontFamily: 'Poppins-bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingTop: 5,
  },

  inputLebel: {
    fontSize: 16,
    textAlign: 'left',
    color: '#232A2F',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  InputField: {
    color: '#000',
    fontSize: 15,
  },

  selectBoxStyle: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  singleMenuItemTitle: {
    fontSize: RFPercentage(2.2),
    color: '#000000',
    fontWeight: '400',
    paddingTop: 5,
    marginLeft: -3,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  singleMenuItemSubTitle: {
    fontSize: RFPercentage(2),
    color: '#000000',
    fontWeight: '700',
    paddingTop: 5,
    marginLeft: -3,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  singleMenuItemRedSubTitle: {
    fontSize: RFPercentage(2.2),
    color: '#FF6B6B',
    fontWeight: '700',
    paddingTop: 5,
    marginLeft: -3,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  avgQality: {
    fontSize: RFPercentage(2),
    color: '#fff',
    marginLeft: -3,
    textAlign: 'center',
  },
  avgQalityValue: {
    fontSize: RFPercentage(2.5),
    color: '#fff',
    marginLeft: -3,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  amountTitle: {
    fontSize: RFPercentage(2.5),
    color: '#000000',
    marginLeft: -3,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 5,
  },

  totalAmount: {
    color: '#0353A7',
    fontSize: RFPercentage(5),
  },
  buttonStyle: {
    backgroundColor: '#4E51C9',
    width: '95%',
    color: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 3, height: 1},
    fontSize: RFPercentage(3),
    lineHeight: 40,
    fontWeight: '700',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 20,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'left',
    fontSize: 16,
  },
  listItemSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 20,
  },
});
export default SalesOrder;
