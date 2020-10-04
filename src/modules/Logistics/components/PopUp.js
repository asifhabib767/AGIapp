import React, { Component } from "react";
import { Button, Text, View , Image , StyleSheet} from "react-native";
import Modal from "react-native-modal";
// import Successful  from "../images/sucessful.png";

export default class PopUP extends Component {
  state = {
    isModalVisible: this.props.isModalVisible
  };

  onChangeToggleModal = () => {
    
  }
 
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
 
  render() {
    return (
      <View>
        <Button title="Show modal" onPress={this.toggleModal} />
        <Modal isVisible={this.state.isModalVisible}> 

          <View style={[styles.SuccessfulBox]}>
              {/* <Image source={Successful} /> */}
              <Text style={[styles.secTitle]}> Successful </Text>
              <Text style={[styles.secSubTitle]}> Information successfully updated. </Text>
              <View style={[styles.buttonView]}>
                <Button title="Close" onPress={this.toggleModal} >  </Button> 
              </View>
          </View>

        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
     
  SuccessfulBox: {
      backgroundColor: '#fff',
      padding: 50,
     alignItems: "center",
     borderRadius: 10,

  },
  secTitle: {
    color: '#232A2F',
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical:20,
  },
  secSubTitle: {
    color: '#232A2F',
    fontSize: 16, 
  },
  buttonView:{
    marginTop:  20,
  }




})