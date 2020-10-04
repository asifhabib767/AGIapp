import React, { Component } from 'react'
import { View  , Text  , StyleSheet , SafeAreaView , ScrollView  , TextInput , TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DateTimePicker from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-community/picker';

export default class HrAddMovement extends Component {
 
    
    state = {
        addtype: '', 
        addCountrytype:'',
        addDistricttype:'',
    };
 
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
                                  <Text style={[styles.pageTitle]}> Add Movement </Text>   
                                </View>
 
                                <View>
                                  <Text style={[styles.inputLebel]}> Type </Text> 
                                    <Picker
                                        selectedValue={this.state.addtype}
                                        style={[styles.Prority]}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({addtype: itemValue})
                                        }>
                                        <Picker.Item label="Official Tour" value="" />
                                        <Picker.Item label="select-1" value="select-1" />
                                         
                                    </Picker>
                                    <Text style={[styles.borderColors]}></Text>
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

                                <View>
                                  <Text style={[styles.inputLebel]}> Country </Text> 
                                    <Picker
                                        selectedValue={this.state.addCountrytype}
                                        style={[styles.Prority]}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({addCountrytype: itemValue})
                                        }>
                                        <Picker.Item label="Country" value="" />
                                        <Picker.Item label="select-1" value="select-1" />
                                         
                                    </Picker>
                                    <Text style={[styles.borderColors]}></Text>
                                </View>           
                                
                                <View style={{ paddingTop:15}}>
                                  <Text style={[styles.inputLebel]}> District </Text> 
                                    <Picker
                                        selectedValue={this.state.addDistricttype}
                                        style={[styles.Prority]}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({addDistricttype: itemValue})
                                        }>
                                        <Picker.Item label="Country" value="" />
                                        <Picker.Item label="select-1" value="select-1" />
                                         
                                    </Picker>
                                    <Text style={[styles.borderColors]}></Text>
                                </View>  

                                <View style={{ paddingTop:15}}>
                                    <Text style={[styles.inputLebel]}> Reason </Text>   
                                    <TextInput  
                                        style={[styles.InputField]}  
                                        placeholder="Type Reason here"  
                                    />  
                                </View>


                                <View> 
                                    <Text style={[styles.inputLebel]}> Address </Text>   
                                    <TextInput  
                                        style={[styles.InputField]}  
                                        placeholder="Type Address Here"  
                                    />  
                                </View>
                            </View>
 
                            <View style={{ marginBottom: 20 }}>
                                <Text style={[styles.buttonStyle]} onPress={this.submit}> Submit </Text>
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

    
    borderColors: {
        borderBottomColor: '#DADADA',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        marginTop: -15,
    },

    pageTitle:{
        fontSize:RFPercentage(5),
        fontWeight:'bold',
        color: '#005BD2',
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
        marginVertical:20,
         
    },
    buttonStyle: {
        backgroundColor: '#4E51C9',  
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