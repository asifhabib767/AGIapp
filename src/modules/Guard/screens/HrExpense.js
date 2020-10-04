import React, { Component } from 'react'
import { View  , Text , Image , StyleSheet , SafeAreaView , ScrollView , TouchableOpacity } from 'react-native'; 
import menuIcon5 from '../images/m5.png';
import { Actions } from 'react-native-router-flux';
import { RFPercentage } from 'react-native-responsive-fontsize';

 

export default class HrExpense extends Component {

    
    render(){

        return(
            
            
               
                <ScrollView style={styles.container}>  
                    <SafeAreaView>   
                        <View style={[styles.profileDetails]}>

                            <View style={[styles.profileMenu]} >  
                                <View style={{ flexBasis: '50%'}}> 
                                    <TouchableOpacity onPress={()=>Actions.HrExpenseEntery()} style={[styles.singleMenuItem]}>  
                                        <Image source={menuIcon5} style={[styles.menuImage]} />
                                        <Text style={[styles.singleMenuItemTitle]}>  Expense Entry </Text> 
                                    </TouchableOpacity> 
                                </View> 
                                <View style={{ flexBasis: '50%'}}> 
                                    <TouchableOpacity onPress={()=>Actions.ExpenseBillingPart()} style={[styles.singleMenuItem]}>
                                        <Image source={menuIcon5} style={[styles.menuImage]} />
                                        <Text style={[styles.singleMenuItemTitle]}> Expense Billing Part </Text> 
                                    </TouchableOpacity>  
                                </View>  
                            </View>  
                            <View style={[styles.profileMenu]} >  
                                <View style={{ flexBasis: '50%'}}> 
                                    <TouchableOpacity onPress={()=>Actions.ExpenseBillingPart()} style={[styles.singleMenuItem]}>
                                        <Image source={menuIcon5} style={[styles.menuImage]} />
                                        <Text style={[styles.singleMenuItemTitle]}> Expense Edit & Report</Text> 
                                    </TouchableOpacity> 
                                </View> 
                                 
                            </View>  
 
                        </View>   
                    </SafeAreaView>  
                </ScrollView >
                
            

       )
 
    }
    
}

const styles = StyleSheet.create({
     
    container: { 
        width: '95%',
        margin:8,
        height: '100%',
        backgroundColor: '#F2F8FF',
    },

    profileMenu:{
        flex:1,
        flexDirection:'row', 
    },
     
    singleMenuItem: {
        backgroundColor: '#fff',
        borderRadius: 5,
        textAlign: "center",
        margin: 10,
        alignItems: "center",
        padding: 5, 
        shadowColor: 'rgba(0, 0, 0, 5)',
        shadowOpacity: 0.5,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 23, height: 113},
        height: 135,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    singleMenuItemTitle: {
        fontSize: RFPercentage(2.5),
        color: '#353559',
        fontWeight: '700',
        paddingVertical: 10, 
        textAlign:'center'
    },

   
 
})