import React, { Component } from 'react';
import { Text,  Alert, Button, Image, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.contactID = this.props.navigation.getParam('contactID');
    
    this.state = {
      
    };
  }

  async componentDidMount() {
    try {
      const response = await axios(`https://1g3l9sc0l0.execute-api.us-east-1.amazonaws.com/dev/get-profile/?uid=${this.contactID}&key=123`);
      const contactInfo = JSON.parse(response.data.user_info.info);
      console.log('test')
      console.log(typeof(contactInfo), contactInfo.birthday)

    }
    catch(error) {
      alert(`An error occurred: ${error}`);
    }    
  }

  
  
  
  render() {

    const goBackToChat = () => {
      this.props.navigation.goBack();
    }

    return (
      <View>
        <LinearGradient colors={['#FFF', '#FFFEEB']} style={{height: '100%'}}>
          <View style={styles.container}>
            <Text style={styles.heading}>Profile of Ohter user</Text>
            <TouchableOpacity onPress={goBackToChat}><Text>Chat {this.contactID}</Text></TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const unreadPurple = '#9F42FE';
const readGray = '#8D99AE';
const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center', // flexDirection is 'column' by default
    paddingTop: "25%",
  },


});

