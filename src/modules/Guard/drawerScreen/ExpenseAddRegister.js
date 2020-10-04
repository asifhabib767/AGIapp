import React, { Component } from 'react'
import { View  , Text  , StyleSheet , SafeAreaView , ScrollView  , TextInput , TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-community/picker';

export default class ExpenseAddRegister extends Component {



    state = {
        disburseCenter: '',
        totalExpense: '',
        paymentmedthod: '',
        expensegroup: '',
        expensetypename: '',
        selectarea: '',
        description: '',
        
       
    }

    
    submit = () => {
        let data = {
            disburseCenter: this.state.disburseCenter,
            totalExpense: this.state.totalExpense,
            paymentmedthod: this.state.paymentmedthod,
            expensegroup: this.state.expensegroup,
            expensetypename: this.state.expensetypename,
            selectarea: this.state.selectarea,
            description: this.state.description,
            
        };
         
        console.log(data); 

     }

   
 
 
     
    render(){ 

        return(
            
         
               
                <ScrollView style={[styles.fullbg]}> 

                        <SafeAreaView style={styles.container}>  

                                
                        
                           

                            <View style={[styles.AccountDetailsArea]}>
                                <View style={{marginBottom:10}}>
                                  <Text style={[styles.pageTitle]}> Expense Register </Text>   
                                </View>

                                <View style={[styles.selectBoxStyle]}>  
                                    <Text style={[styles.inputLebel]}> Disburse Center </Text>   
                                    <Picker
                                        selectedValue={this.state.disburseCenter}  
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({disburseCenter: itemValue})
                                        
                                        }>
                                        <Picker.Item label="Select Method" value="Select Method" />
                                        <Picker.Item label="Adjustment" value="Adjustment" />
                                        
                                       
                                    </Picker> 
                                    
                                </View>

                                    
                               <View> 
                                    <Text style={[styles.inputLebel]}> Total Expense </Text>   
                                    <TextInput  
                                        style={[styles.InputField]}  
                                        placeholder="0.00"   
                                        value={this.state.totalExpense} 
                                        onChangeText={value => {  this.setState({totalExpense: value}); }} 
                                    />  
                                </View>
                                
                              

                                <View style={[styles.selectBoxStyle]}>
                                   
                                    <TouchableOpacity onPress={this.showDateTimePicker}> 
                                        <Text style={[styles.inputLebel]}> Start Date </Text> 
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
                                        <Text style={[styles.inputLebel]}> End Date </Text> 
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
                                    <Text style={[styles.inputLebel]}> Payment Mode </Text>   
                                    <Picker
                                        selectedValue={this.state.paymentmedthod}  
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({paymentmedthod: itemValue})
                                        
                                        }>
                                        <Picker.Item label="Select Method" value="Select Method" />
                                        <Picker.Item label="Adjustment" value="Adjustment" />
                                        <Picker.Item label="Cash" value="Cash" />
                                        <Picker.Item label="Cash Cheque" value="Cash Cheque" />
                                        <Picker.Item label="Cheque" value="Cheque" />
                                        <Picker.Item label="Online" value="Online" />
                                        <Picker.Item label="Pay Order" value="Pay Order" />
                                       
                                    </Picker> 
                                    
                                </View>

                                
                                
                                  
                                <View style={[styles.selectBoxStyle]}>  
                                    <Text style={[styles.inputLebel]}> Expense Group </Text>   
                                    <Picker
                                        selectedValue={this.state.expensegroup}  
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({expensegroup: itemValue})
                                        
                                        }>
                                        <Picker.Item label="Select Group" value="Select Group" />
                                        <Picker.Item label="General Expense" value="General Expense" />
                                        <Picker.Item label="Public Transport" value="Public Transport" />
                                        <Picker.Item label="Company Transport" value="Company Transport" />
                                        
                                       
                                    </Picker> 
                                    
                                </View>

                                <View style={[styles.selectBoxStyle]}>  
                                    <Text style={[styles.inputLebel]}> Expense Name </Text>   
                                    <Picker
                                        selectedValue={this.state.expensetypename}  
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({expensetypename: itemValue})
                                        
                                        }>
                                        <Picker.Item label="Select Expense Type" value="Select Expense Type" />
                                        <Picker.Item label="Select Expense Type" value="Select Expense Type" />
                                        <Picker.Item label="Select Expense Type" value="Select Expense Type" />
                                        <Picker.Item label="Select Expense Type" value="Select Expense Type" />
                                       
                                       
                                    </Picker> 
                                    
                                </View>

                                         
                               <View> 
                                    <Text style={[styles.inputLebel]}> Expense Amount </Text>   
                                    <TextInput  
                                        style={[styles.InputField]}  
                                        placeholder="0.00"  
                                    />  
                                </View>      


                                <View style={[styles.selectBoxStyle]}>
                                   
                                   <TouchableOpacity onPress={this.showDateTimePicker}> 
                                       <Text style={[styles.inputLebel]}> Transaction Date </Text> 
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
                                    <Text style={[styles.inputLebel]}> Expense Location </Text>   
                                    <Picker
                                        selectedValue={this.state.selectarea}  
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({selectarea: itemValue})
                                        
                                        }>
                                        <Picker.Item label="Select Area " value="Select Area " />
                                        <Picker.Item label="Select Area " value="Select Area " />
                                        <Picker.Item label="Select Area " value="Select Area " />
                                        
                                       
                                    </Picker> 
                                    
                                </View>
                                  
                                <View> 
                                    <Text style={[styles.inputLebel]}> Description </Text>   
                                    <TextInput  
                                        style={[styles.InputField]}  
                                        placeholder="Type Description Here"  
                                        value={this.state.description} 
                                        onChangeText={value => {  this.setState({description: value}); }} 
                                    />  
                                </View>

                            </View>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={[styles.buttonStyle]} onPress={this.submit}> Save </Text>
                            </View>

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
        shadowOffset : { width: 23, height: 113},  
    },

    pageTitle:{
        fontSize:RFPercentage(5),
        fontWeight:'bold',
        color: '#005BD2',
    },
    selectBoxStyle: {  
        borderBottomColor: '#000',
        borderBottomWidth: 2,
    },
    creditDetails: { 
        flex:1,
        flexDirection: 'row',
        justifyContent:'center', 
         
    },

    leaveTitle:{
        fontSize:RFPercentage(5),
        fontWeight:'bold',
        color: '#005BD2',
        textAlign:'center'
    },

    leaveSubTitle:{
        fontSize:RFPercentage(2.3),
        fontWeight:'bold',
        color: '#231F20',
        textAlign:'center'
    },
    
    inputLebel: {
        fontSize: 16 ,
        textAlign: 'left',
        color: '#232A2F',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },

  
    InputField: { 
        height: 40, 
        color: '#000',
        fontSize: 20,  
        fontSize: 16,
        borderBottomColor: '#DADADA',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        marginBottom: 10,
        marginTop:5,
        fontWeight: 'bold' 
    },
    selectBoxStyle:{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
        marginTop:10,
    },
    buttonStyle: {
        backgroundColor: '#00D2A7',  
        width: '95%',
        color: '#fff', 
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.5,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 3, height: 113},  
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
     
})

