import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/FontAwesome";
import { Rating, AirbnbRating } from "react-native-ratings";
import * as Animatable from "react-native-animatable";

export default class Feedback extends Component {
  ratingCompleted(rating) {
    console.log(`Rating is: ${rating}`);
  }

  render() {
    return (
      <ScrollView style={[styles.fullbg]}>
        <Animatable.View animation="slideInUp">
          <SafeAreaView>
            <View style={[styles.feedbackbox]}>
              <Text style={[styles.howDoYou]}> How do you feel? </Text>
              <Text style={[styles.howDoYouRate]}> Give us your rating </Text>

              <View style={{ marginVertical: 10 }}>
                <AirbnbRating
                  count={5}
                  reviews={["Bad", "OK", "Good", "Very Good", "Amazing"]}
                  defaultRating={3}
                  size={30}
                  onFinishRating={this.ratingCompleted}
                />
              </View>
            </View>
            <View style={[styles.container]}>
              <Text style={[styles.giveUs]}> Give us Feedback </Text>
              <Text style={[styles.writeCom]}> Write your comment </Text>
              <TextInput
                style={[styles.InputField]}
                placeholder="Type"
                placeholderTextColor={"#000000"}
                multiline={true}
                numberOfLines={5}
              />
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={[styles.words]}> 120 words </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.buttonStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fullbg: {
    backgroundColor: "#fff",
    height: 700,
  },
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },

  feedbackbox: {
    backgroundColor: "#315AE1",
    height: 300,
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },

  howDoYou: {
    color: "#fff",
    fontSize: RFPercentage(5),
    fontWeight: "bold",
    paddingTop: 65,
    textAlign: "center",
  },
  howDoYouRate: {
    color: "#fff",
    fontSize: RFPercentage(3),
    opacity: 0.5,
    textAlign: "center",
  },

  giveUs: {
    color: "#393CA4",
    fontSize: RFPercentage(4),
    fontWeight: "bold",
    paddingTop: 25,
    textTransform: "uppercase",
    letterSpacing: 0,
  },
  writeCom: {
    color: "#232A2F",
    fontSize: RFPercentage(3),
  },
  InputField: {
    backgroundColor: "#F3F3F3",
    marginVertical: 20,
    height: 150,
    paddingLeft: 10,
    borderRadius: 20,
  },
  words: {
    color: "#232A2F",
    fontSize: RFPercentage(2),
  },
  buttonStyle: {
    backgroundColor: "#1544B3",
    color: "#fff",
    fontSize: RFPercentage(3),
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 35,
    textTransform: "uppercase",
    borderRadius: 50,
    marginTop: 20,
  },
});
