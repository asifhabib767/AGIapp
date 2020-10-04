import React, { Component } from 'react'
import { View  , Text  , StyleSheet , SafeAreaView , ScrollView  , TextInput , TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Picker } from '@react-native-community/picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

export default class ExpenseBillingPart extends Component {
 
    state= {
        showDateTimePicker: '',
    }

    constructor(props) {
        super(props);
        this.state = {
          isDateTimePickerVisible: false
        };
      }
    
      showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
    
      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };
    
      handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
      };
     
    render(){

        

        return(
            
         
               
                <ScrollView style={[styles.fullbg]}> 

                        <SafeAreaView style={styles.container}>  

                                 
                            <View style={[styles.AccountDetailsArea]}>
                                <View style={{marginBottom:10}}>
                                  <Text style={[styles.pageTitle]}> Expense Billing Part </Text>   
                                </View> 
                                <View style={[styles.selectBoxStyle]}>
                                   
                                    <TouchableOpacity onPress={this.showDateTimePicker}> 
                                        <Text style={[styles.inputLebel]}> From Date </Text> 
                                        <Text title="Show DatePicker" onPress={this.showDateTimePicker} />
                                        <DateTimePicker
                                            isVisible={this.state.isDateTimePickerVisible}
                                            onConfirm={this.handleDatePicked}
                                            onCancel={this.hideDateTimePicker}
                                            datePickerModeAndroid={'spinner'}
                                            mode={'date'}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.selectBoxStyle]}>
                                   
                                   <TouchableOpacity onPress={this.showDateTimePicker}> 
                                       <Text style={[styles.inputLebel]}> To Date </Text> 
                                       <Text title="Show DatePicker" onPress={this.showDateTimePicker} />
                                       <DateTimePicker
                                           isVisible={this.state.isDateTimePickerVisible}
                                           onConfirm={this.handleDatePicked}
                                           onCancel={this.hideDateTimePicker}
                                           datePickerModeAndroid={'spinner'}
                                           mode={'date'}
                                       />
                                   </TouchableOpacity>
                               </View> 
                               
                            </View>
                          
                            <View style={{ flex:1, flexDirection:'row', }}>
                                <View style={{ flexBasis:'50%'}}>
                                    <Text style={[styles.buttonStyle]} onPress={this.submit}> Show </Text>
                                </View>
                                <View style={{ flexBasis:'50%'}}>
                                    <Text style={[styles.buttonStyleGreen]} > Create Bill </Text>
                                </View>
                            </View>


                            <TouchableOpacity onPress={()=>Actions.ExpenseCreateVoucer()} style={[styles.AccountDetailsArea]}>  
                           
                                <View style={[styles.distributorDetails]}>
                                    <View style={{flexBasis: '65%'}}>
                                        <Text style={[styles.distributerName]}> #AFBL-EXP-NOV19-1 </Text>
                                        <Text style={[styles.distributerLocation]}> Imran Miah [Assistant Manager] </Text>
                                        <Text style={[styles.distributorActive]}> ACCL, Corporate Office </Text>
                                    </View>
                                    <View style={{flexBasis: '30%'}}>
                                        <Text style={[styles.outstanding]}> ৳ 542 </Text> 
                                    </View>
                                    <View  style={{flexBasis: '5%'}}>
                                      <Text style={[styles.distributerAmonut]}>  <Icon name="save"  size={20} /> </Text>
                                    </View>
                               </View>
                               
                            </TouchableOpacity>
 
                            <TouchableOpacity onPress={()=>Actions.ExpenseCreateVoucer()} style={[styles.AccountDetailsArea]}>  
                                
                                <View style={[styles.distributorDetails]}>
                                    <View style={{flexBasis: '65%'}}>
                                        <Text style={[styles.distributerName]}> #AFBL-EXP-NOV19-1 </Text>
                                        <Text style={[styles.distributerLocation]}> Imran Miah [Assistant Manager] </Text>
                                        <Text style={[styles.distributorActive]}> ACCL, Corporate Office </Text>
                                    </View>
                                    <View style={{flexBasis: '30%'}}>
                                        <Text style={[styles.outstanding]}> ৳ 542 </Text> 
                                    </View>
                                    <View  style={{flexBasis: '5%'}}>
                                        <Text style={[styles.distributerAmonut]}>  <Icon name="save"  size={20} /> </Text>
                                    </View>
                                </View>
                                
                            </TouchableOpacity>
                            

                    </SafeAreaView> 

                </ScrollView >
                
           

       )
 
    }
    
}

const styles = StyleSheet.create({
  
        
    fullbg:  {  
        backgroundColor: '#F2F8FF',
        height:'100%'
    },

    container: { 
        width: '95%',
        margin:8,
    },
    AccountDetailsArea:  {   
        backgroundColor: '#fff',
        borderRadius: 5,
        textAlign: "center",
        marginTop:10,
        marginBottom:10,
        padding: 10,
        paddingVertical: 15,
        shadowColor: 'rgba(0, 0, 0, 5)',
        shadowOpacity: 0.5,
        elevation: 8,
        shadowRadius: 10 ,
        shadowOffset : { width: 23, height: 1},  
    },

    pageTitle:{
        fontSize:RFPercentage(3.5),
        fontWeight:'bold',
        color: '#005BD2',
    },
     
    inputLebel: {
        fontSize: 16 ,
        textAlign: 'left',
        color: '#232A2F',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
 
    selectBoxStyle:{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
        marginTop:10,
    },
    buttonStyle: {
        backgroundColor: '#4E51C9',  
        width: '95%',
        color: '#fff', 
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.5,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 3, height: 1},  
        fontSize: RFPercentage(3),
        lineHeight: 40,
        fontWeight: '700',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
        textTransform: 'uppercase',
        borderRadius: 5,
        marginLeft:10,
        marginTop:20,
        
      },
      buttonStyleGreen: {
        backgroundColor: '#34C787',  
        width: '95%',
        color: '#fff', 
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.5,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 3, height: 1},  
        fontSize: RFPercentage(3),
        lineHeight: 40,
        fontWeight: '700',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
        textTransform: 'uppercase',
        borderRadius: 5,
        marginLeft:10,
        marginTop:20,
        
      },
      distributorDetails: {
        flex:1, 
        flexDirection: "row" , 
       
    },

    distributerName: {
        color: '#707070',  
        fontSize: RFPercentage(2.2),
        fontFamily: 'Poppins', 
        textTransform: 'uppercase',
        letterSpacing: 2,
    },

    distributerLocation: {
        color: '#000000',  
        fontSize: RFPercentage(2),
        fontFamily: 'Poppins',
        fontWeight: 'bold', 
        textTransform: 'uppercase',
        lineHeight: 30,
    },
    distributorActive:{
        color: '#000000',  
        fontSize: RFPercentage(2.2),
        fontFamily: 'Poppins',
        fontWeight: 'bold', 
        textTransform: 'uppercase',
        lineHeight: 30,
    },

    outstanding:{
        color: '#393CA4',  
        fontSize: RFPercentage(3),
        fontFamily: 'Poppins',  
        fontWeight:'bold',
        marginTop: 35,
        textAlign:'center'
    },

    distributerAmonut:{
        color: '#393CA4',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: '15%',
        paddingRight:-20,
    }     
   
})



