import React, { Component } from 'react';
import { Text,  Alert, Button, Image, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.currentUserID = 3;
    this.tokens = {
      1 : '58db4abf-fd9c-451f-ab5d-199f04118335',
      3 : '12b2d376-d566-42a8-8109-11586e205698',
      4 : '410735d6-1ac9-4e16-b0db-88282c77858f',
      5 : '289f72a7-3cdf-401f-b589-5366f5ccb9a1',
      7 : 'b617cc9f-3c0b-4506-ab10-e2941ba4dfd5',
    };
    this.state = {
      conversations : {},
      // convosInfo: [],
      isRead : false,
    };
  }

  async componentDidMount() {
    try {
      const responseContacts = await axios(`https://fwbtngtv7j.execute-api.us-east-1.amazonaws.com/r2/messages/?uid=${this.currentUserID}&token=${this.tokens[this.currentUserID]}&ts=`);
      const contacts = responseContacts.data.users;

      const conversations = {}
      
      for (const contact in contacts) {

        const responseMessages = await axios(`https://fwbtngtv7j.execute-api.us-east-1.amazonaws.com/r2/get-convo/?uid=${this.currentUserID}&oid=${contact}&token=${this.tokens[this.currentUserID]}&ts=`);
        const mostRecentMessage = responseMessages.data.messages[0].message;

        const responseContactProfile = await axios(`http://ec2-35-172-118-51.compute-1.amazonaws.com:8080/get_profile/?uid=${contact}&token=${this.tokens[contact]}`);
        const contactName = responseContactProfile.data.username;

        const contactInfoStr = responseContactProfile.data.info;

        if (contactInfoStr.includes('=')) {
          contactInfoStr = contactInfoStr.replace("=", ":");// replace the "=" with ":", b/c the str isn't configured correctly -_-
        }
        const profilePicURL = JSON.parse(contactInfoStr).profile_pic;

        conversations[contact] = {contactName: contactName, mostRecentMessage: mostRecentMessage, profilePicURL: profilePicURL};
      }
      this.setState({conversations: conversations});
    }
    catch(error) {
      alert(`An error occurred: ${error}`);
    }    
  }

  mapConversations() {
    const convoList = [];
    const {conversations} = this.state;
    let i = 0;

    for (const contact in conversations) {

      const pressHandler = () => {
        this.props.navigation.navigate('IndividualChatScreen', conversations[contact]);
      }
      
      convoList.push(
        <TouchableOpacity key={contact} style={[styles.convoItem, i === 0 ? null : styles.convoSeparator]} onPress={pressHandler}>
          <Image style={[styles.userIcon, this.state.isRead ? null : styles.unreadUserIcon]} source={{uri: conversations[contact].profilePicURL}}></Image>
          <View style={styles.convoText}>
            <Text style={[styles.contactName, this.state.isRead ? styles.readText : styles.unreadName]}>{conversations[contact].contactName}</Text>
            <Text style={[styles.messageText, this.state.isRead ? styles.readText : styles.unreadText]}>{conversations[contact].mostRecentMessage}</Text>
          </View>
        </TouchableOpacity>
      )
      i++;
    }
    return convoList;
  }
  
  
  render() {
    // console.log('show', this.state.conversations)
    return (
      <View>
        <LinearGradient colors={['#FFF', '#FFFEEB']} style={{height: '100%'}}>
          <View style={styles.container}>
            <Text style={styles.heading}>Messages</Text>
            {this.mapConversations()}
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
    marginBottom: 10
  },
  convoItem: {
    width: '80%',
    height: '14.5%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: '2.5%',
    paddingBottom: '2%',
  },
  convoSeparator: {
    borderTopWidth: 1,
    borderTopColor: '#9BA6B7',
  },
  userIcon: {
    width: 60,
    height: 60,
    backgroundColor:'#f0f0f0',
    borderRadius: 30,
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
  contactName: {
    fontSize: 26,
    letterSpacing: 1,
  },
  messageText: {
    fontSize: 22,
    fontWeight: "300"
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

