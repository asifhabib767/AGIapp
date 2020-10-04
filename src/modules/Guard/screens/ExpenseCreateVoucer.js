import React, { Component } from 'react'
import { View  , Text  , StyleSheet , SafeAreaView , ScrollView  , TextInput , TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default class ExpenseCreateVoucer extends Component {
 
    
    render(){

        

        return(
            
         
               
                <ScrollView style={[styles.fullbg]}> 

                        <SafeAreaView style={styles.container}>  

                                  
                            <View style={[styles.AccountDetailsArea]}>
                                <View style={[styles.distributorDetails]}>
                                    <View style={{flexBasis: '70%'}}>
                                        
                                        <Text style={[styles.distributerLocation]}> Imran Miah </Text>
                                        <Text style={[styles.distributorActive]}> ACCL, Corporate Office</Text>
                                    </View>
                                    <View style={{flexBasis: '30%'}}>
                                        <Text style={[styles.outstanding]}> ৳ 542 </Text> 
                                    </View>
                                   
                               </View>
                               
                            </View>
                            
                            <View style={[styles.AccountDetailsArea]}>

                                

                                <View style={{flex:1,flexDirection:'row'}} > 
                                    
                                <View style={{ flexBasis: '50%' }}>

                                       <View style={{paddingVertical:10}}>
                                        <Text style={[styles.inputLebel]}> Expense ID </Text>  
                                            <Text style={[styles.inputOutput]}>  #AFBL-EXP-NOV19-1 </Text>  

                                       </View>
                                        
                                       <View style={{paddingVertical:10}}>
                                           <Text style={[styles.inputLebel]}> Job Station </Text>  
                                         <Text style={[styles.inputOutput]}>  ACCL, Corporate Office </Text>  
                                       </View>

                                       <View style={{paddingVertical:10}}>
                                            <Text style={[styles.inputLebel]}> Start Date </Text>  
                                            <Text style={[styles.inputOutput]}>  2019-11-01 </Text>  
                                         </View>
 

                                    </View>

                                    <View style={{ flexBasis: '50%' }}>

                                        <View style={{paddingVertical:10}}>
                                            <Text style={[styles.inputLebel]}> Designation </Text>  
                                            <Text style={[styles.inputOutput]}>   Assistant Manager </Text>  

                                       </View>
                                        
                                       <View style={{paddingVertical:10}}>
                                            <Text style={[styles.inputLebel]}> Entry Date </Text>  
                                            <Text style={[styles.inputOutput]}> 2019-11-05  </Text>   
                                        </View>
                                        
                                        <View style={{paddingVertical:10}}>
                                            <Text style={[styles.inputLebel]}> End Date </Text>  
                                            <Text style={[styles.inputOutput]}> 2019-11-05  </Text>  
                                        </View>

                                    </View>

                                </View>
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
    inputLebel: {
        fontSize: RFPercentage(2.2),
        textAlign: 'left',
        color: '#707070',  
        textTransform:"uppercase"
    },

    inputOutput: {
        fontSize: RFPercentage(2.0),
        textAlign: 'left',
        color: '#231F20', 
        fontWeight: 'bold', 
        paddingVertical: 5,
        width: '90%'
    },

    editProfile: {
        color: '#8E8E8E',
        fontSize: 14, 
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



