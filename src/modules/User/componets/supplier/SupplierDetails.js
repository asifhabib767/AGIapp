import React from 'react';
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
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import topbar from '../images/top-bar.png';
import {Button} from '@ui-kitten/components';
import GlobalStyles from '../../../Master/styles/GlobalStyles';
import saleslist from '../../../User/images/saleslist.png';

const SupplierDetails = (props) => {
  const {navigation} = props;
  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
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
                  <Text style={[styles.headerTitle]}> Supplier Details </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.container]}>
            <View>
              <View>
                <Image source={saleslist} style={[styles.saleslist]} />
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 20,
                }}>
                <View>
                  <Text style={[styles.customerTarget]}> Customer Target </Text>
                  <Text style={[styles.customerTargetNumber]}>
                    {' '}
                    XX total off XX
                  </Text>
                </View>

                <View></View>
              </View>

              <View>
                <View>
                  <Text style={[styles.customerTarget]}>
                    {' '}
                    Supplier Statement{' '}
                  </Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Contact Type{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Md. Rafiul Alam
                    </Text>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}> Name </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Dhaka , Bangladesh{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Business Name{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      0199-0389941{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Contact ID{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      abc@gmail.com{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Tax Number{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      20/11/98{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Opening Balance{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      20/11/98{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Pay Terms{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      20/11/98{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Customer Group{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      20/11/98{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Credit Limit{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Type{' '}
                    </Text>
                  </View>
                </View>

                <View style={[styles.borderBottom]}></View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}> Email </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Type{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}> Mobile </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Type{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      Alternative Mobile Number{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Type{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}> City </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Type{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>Status </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Type{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Landmark{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Type{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Credit Limit{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Type{' '}
                    </Text>
                  </View>
                </View>

                <View style={[styles.borderBottom]}></View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Custome filed 1{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Type{' '}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Custome filed 2{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Type{' '}
                    </Text>
                  </View>
                </View>

                <View style={[styles.borderBottom]}></View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetails]}>
                      {' '}
                      Shipping Address{' '}
                    </Text>
                  </View>
                  <View style={{flexBasis: '50%'}}>
                    <Text style={[styles.customerTargetDetailsFiled]}>
                      {' '}
                      Type{' '}
                    </Text>
                  </View>
                </View>
              </View>
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
    marginHorizontal: 15,
    marginTop: 15,
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
    marginTop: 15,
    width: 180,
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
  saleslist: {
    marginTop: 30,
    width: '100%',
    height: height / 2,
    resizeMode: 'contain',
  },
  customerTarget: {
    color: '#000',
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  customerTargetNumber: {
    color: '#213547',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
  },
  customerTargetDetails: {
    color: '#213547',
    fontSize: RFPercentage(2.5),
    fontWeight: 'normal',
    paddingVertical: 10,
  },
  customerTargetDetailsFiled: {
    color: '#213547',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  borderBottom: {
    borderBottomColor: '#C8CDD4',
    borderStyle: 'solid',
    borderWidth: 0.5,
    marginVertical: 10,
  },
});
export default SupplierDetails;
