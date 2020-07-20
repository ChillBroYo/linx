import React, { Component } from 'react';
import { Text,  Alert, Button, Image, Platform, ScrollView, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const platform = Platform.OS;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.contactID = this.props.navigation.getParam('contactID') || 1;
    this.state = {
      contactInfo: {}
    }
  }

  async componentDidMount() {
    try {
      const response = await axios(`https://1g3l9sc0l0.execute-api.us-east-1.amazonaws.com/dev/get-profile/?uid=${this.contactID}&key=123`);
      const contactInfo = JSON.parse(response.data.user_info.info);
      this.setState({ contactInfo })
    }
    catch(error) {
      alert(`An error occurred: ${error}`);
    }    
  }

  determinePronoun() {
    const {contactInfo} = this.state;

    if (!contactInfo.gender) {
      return "  ";
    }
    else if (contactInfo.gender === "male") {
      return "He";
    }
    else if (contactInfo.gender === "female") {
      return "She";
    }
    else {
      return "They";
    }
  }

  determineGender() {
    const {contactInfo} = this.state;

    if (contactInfo.gender === "male") {
      return "man";
    }
    else if (contactInfo.gender === "female") {
      return "woman";
    }
  }

  determineAge() {
    const {contactInfo} = this.state;
    let age;

    if (contactInfo.birthday) {
      birthdate = new Date(contactInfo.birthday);
      const now = new Date();
      age = Math.floor( (now.getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
    }
    return age;
  }

  render() {

    const goBackToChat = () => {
      this.props.navigation.goBack();
    }

    const {contactInfo} = this.state;

    const pronoun = this.determinePronoun();
    const isPronounThey = pronoun === "they" ? true : false;

    return (
      <View>
        <LinearGradient colors={['#FFF', '#FFFEEB']} style={{height: '100%'}}>
          <View style={styles.container}>
            <Image style={styles.userIcon} source={{uri: contactInfo.imgUrl}}></Image>
            <Text style={styles.heading}>{contactInfo.name ? `${contactInfo.name.first} ${contactInfo.name.last}` : null}</Text>
            <ScrollView style={styles.contactInfoContainer}>
              <Text style={styles.subheading}>{`${pronoun} ${isPronounThey ? "live in" : "lives in"}`}</Text>
              <Text style={styles.infoLine}>{`${contactInfo.city}, ${contactInfo.state}`}</Text>
              <View style={styles.separator} />
              <Text style={styles.subheading}>{`${pronoun} ${isPronounThey ? "are" : "is"}`}</Text>
              <Text style={styles.infoLine}>{`${this.determineAge()} years old ${this.determineGender()}`}</Text>
              <View style={styles.separator} />
              <Text style={styles.subheading}>{`${pronoun} ${isPronounThey ? "like" : "likes"}`}</Text>
              <Text style={styles.infoLine}>{contactInfo.interests ? contactInfo.interests.join(", ") : ""}</Text>
              <View style={styles.separator} />
            </ScrollView>
            <TouchableOpacity onPress={goBackToChat} style={{...styles.chatBar, ...iOSPlatformBottom}}><Text style={styles.chatText}>Chat</Text></TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

let iOSPlatformBottom;
if (platform === 'ios') iOSPlatformBottom = {bottom: 30}
const headingPurple = '#7F06FE';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: "20%",
    position: 'relative'
  },
  userIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor:'#f0f0f0',
  },
  heading: {
    fontSize: 40,
    color: headingPurple,
    marginTop: '6%',
    marginBottom: '2%',
  },
  subheading: {
    color: headingPurple,
    marginVertical: '5%',
    fontSize: 22,
    fontWeight: '600',
  },
  infoLine: {
    fontSize: 22,
    fontWeight: '300',
    marginBottom: '6%'
  },
  separator: {
    borderBottomColor: '#8D99AE',
    borderBottomWidth: 1,
    alignSelf: 'stretch'
  },
  contactInfoContainer: {
    width: '100%',
    paddingHorizontal: '7%',
    flex: 1,
  }, 
  chatBar: {
    backgroundColor: '#449E73',
    width: '100%',
    height: '10%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chatText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
    letterSpacing: 1
  }


});

