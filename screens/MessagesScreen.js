import React, { Component } from 'react';
import { Text,  Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationsObj : {},
      isRead : false,
    };
    
  }

  async componentDidMount() {
    try {
      const responseUsers = await axios('https://fwbtngtv7j.execute-api.us-east-1.amazonaws.com/r2/messages/?uid=1&token=58db4abf-fd9c-451f-ab5d-199f04118335&ts=');
      const otherUsers = responseUsers.data.users;

      const responseMessages = await axios('https://fwbtngtv7j.execute-api.us-east-1.amazonaws.com/r2/get-convo/?uid=1&oid=2&token=58db4abf-fd9c-451f-ab5d-199f04118335&ts=');
      const messages = responseMessages.data.messages;

      const conversations = {}
      
      for (const user in otherUsers) {
        conversations[user] = messages[0].message; // hack; need restructure get-convo json
      }
      
      this.setState({conversationsObj: conversations});
    }
    catch(error) {
      alert(`An error occurred: ${error}`);
    }    
  }

  mapConversations() {
    const convoList = [];
    const convos = this.state.conversationsObj;
    for (const user in convos) {
      convoList.push(
        <View key={user} style={styles.convoItem}>
          <View style={[styles.userIcon, this.state.isRead ? null : styles.unreadUserIcon]}></View>
          <View style={styles.convoText}>
            <Text style={[styles.opponentName, this.state.isRead ? styles.readText : styles.unreadName]}>{user}</Text>
            <Text style={[styles.messageText, this.state.isRead ? styles.readText : styles.unreadText]}>{convos[user]}</Text>
          </View>
        </View>
      )
    }
    return convoList;
  }
  
  
  render() {
    return (
      <View>
        <LinearGradient colors={['#FFF', '#FFFEEB']} style={{height: '100%'}}>
          <View style={styles.container}>
            <Text style={styles.heading}>Messages</Text>
            {this.mapConversations()}
            {/*
            <Button
              title={'Logout'}
              style={styles.input}
              onPress={this.onLogin.bind(this)}
            />*/}
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
  heading: {
    fontSize: 30,
    color: '#454759',
    letterSpacing: 1,
    marginBottom: 30
  },
  convoItem: {
    width: '80%',
    // backgroundColor: "pink",
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  userIcon: {
    width: 60,
    height: 60,
    backgroundColor:'#f0f0f0',
    borderRadius: 30,
    borderStyle: 'solid',
    borderColor: readGray,
    borderWidth: 2,
    marginRight: '7%'
  },
  convoText: {
    justifyContent: 'space-around',
    // backgroundColor: 'yellow',
    flex: 1,
    height: '100%',
    
  },
  opponentName: {
    fontSize: 26,
    fontWeight: "300",
    letterSpacing: 1,
  },
  messageText: {
    fontSize: 22,
    fontWeight: "200"
  },
  unreadUserIcon: {
    borderColor: unreadPurple
  },
  readText: {
    color: readGray,
  },
  unreadName: {
    color: unreadPurple,
    fontWeight: '600',
  },
  unreadText: {
    color: unreadPurple,
  },

});
