import React, { Component } from 'react'
import { KeyboardAvoidingView , View  , Text , Image , StyleSheet , TextInput , SafeAreaView , ScrollView , Button  } from 'react-native';
import Buttons from '../components/customBtn';
import {Picker} from '@react-native-community/picker';
 
 


export default class AddComplain extends Component {

   
    state = {
        selectsite: 'product', 
      };
 
  
    render(){

      
        return(
            
            <KeyboardAvoidingView > 
               
                <ScrollView>
                             
                            <SafeAreaView style={styles.container}>  
                                
                                <Text style={[styles.addProjectTitle]}> Add complain </Text>  

                                
                                
                                <Text style={[styles.inputLebel]}> Add Site </Text>  

                                <View>
                                    <Picker
                                        selectedValue={this.state.selectsite}
                                        style={[styles.Prority]}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({selectsite: itemValue})
                                        }>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="select-1" value="select-1" />
                                        <Picker.Item label="select-2" value="select-2" />
                                        <Picker.Item label="select-3" value="select-3" />
                                    </Picker>
                                    <Text style={[styles.borderColors]}></Text>
                                </View>
                                
                                <Text style={[styles.empty]}></Text>

                                <View>
                                    <Text style={[styles.inputLebel]}> Your Complain </Text>         
                                    <View style={styles.textAreaContainer} >
                                        <TextInput
                                            style={styles.textArea} 
                                            placeholder="Type here"  
                                            />
                                    </View>  
                                </View>

                                 
                                 <Text style={[styles.empty]}></Text>
                                         
                                <Text style={[styles.empty]}></Text> 

                                 <Buttons > SEND COMPLAIN </Buttons>
                                 <Text style={[styles.empty]}></Text>
                                  

                        </SafeAreaView>



                    </ScrollView >
                
            </KeyboardAvoidingView >

       )
 
    }
    
}

const styles = StyleSheet.create({
 

    addProjectTitle: {
        fontSize: 24,
        color: '#005BD2',
        paddingBottom: 20, 
        paddingTop: 30, 
        textTransform: 'uppercase',
        fontWeight: 'bold'
        
    },


    inputLebel: {
        fontSize: 16 ,
        textAlign: 'left',
        color: '#232A2F',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },

    borderColors: {
        borderBottomColor: '#DADADA',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        marginTop: -15,
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

    textAreaContainer: { 
        height: 100, 
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
 
    container: { 
        width: '90%',
        marginLeft: 20,
      },
 


})