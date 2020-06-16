import React, { Component } from 'react';
import { Image, Text, Alert, Button, FlatList, Platform, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.currentUserID = props.navigation.getParam('currentUserID') || 2;
    this.currentUserToken = props.navigation.getParam('currentUserToken') || '43985ece-e49d-477f-b843-3a5501799ef7&limit=1000';
    this.state = {
      messages : null,
      lastShownMessageDate: null
    };
  }

  async componentDidMount() {
    try {
      const response = await axios('https://1g3l9sc0l0.execute-api.us-east-1.amazonaws.com/dev/get-conversation/?uid=2&oid=1&token=43985ece-e49d-477f-b843-3a5501799ef7&limit=1000&ts=');
      // const response = await axios(`https://1g3l9sc0l0.execute-api.us-east-1.amazonaws.com/dev/get-conversation/?uid=${this.currentUserID}&oid=${this.props.navigation.getParam('contactID')}&token=${this.currentUserToken}&limit=1000&ts=`);
      const messages = response.data.messages;
      // console.log('asyncy', new Date(`${messages[messages.length - 1].created_at}Z`))
      this.setState({
        messages,
      })
      this.lastShownMessageDate = this.formatDate(messages[messages.length - 1].created_at);
      console.log('async', this.lastShownMessageDate)
    }
    catch(error) {
      alert(`An error occurred : ${error}`);
    }
  }

  mapMessages() {
    const messages = this.state.messages.slice(0, 10);
    const messagesList = [];

    for (let i = messages.length - 1; i >= 0; i--) {
      const currentMessage = messages[i];
      if (currentMessage.user_id == this.currentUserID) {
          messagesList.push(
            <View key={currentMessage.message_id} style={{...styles.message, ...styles.ownMessage}}>
              <Text style={styles.messageText}>{currentMessage.message}</Text>
            </View>)
      }
      else {
        messagesList.push(
          <View key={currentMessage.message_id} style={styles.otherMessageContainer}>
            <Image style={styles.userIcon} source={{uri: this.props.navigation.getParam('profilePicURL')}}></Image>
            <View style={{...styles.message, ...styles.otherMessage}}><Text style={styles.messageText}>{currentMessage.message}</Text></View>
          </View>
        )
      }
    }
    return messagesList;
  }

  formatDate(dateStr) {
    return `${dateStr.substring(0, 10)}T${dateStr.substring(11, 19)}Z`;
  }

  renderMessage(item) {
    // console.log('render', this.lastShownMessageDate, item.message)
    // const currentMessageDate = this.formatDate(item.created_at);
    // let showDate = true;

    // if (new Date(currentMessageDate) - new Date(this.lastShownMessageDate) > 1000) {
    //   console.log(new Date(currentMessageDate) - new Date(this.lastShownMessageDate))
    //   showDate = true;
    //   this.lastShownMessageDate = currentMessageDate;
    // }
    // else {
    //   showDate = false;
    // }
    // console.log('show', showDate, item.message, currentMessageDate, this.lastShownMessageDate)
    // console.log(new Date(currentMessageDate) - new Date(this.lastShownMessageDate))
    return (
      item.user_id == this.currentUserID ?
        <View>
          <View style={{...styles.message, ...styles.ownMessage}}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        </View>
        :
        <View>
          <View style={styles.otherMessageContainer}>
            <Image style={styles.userIcon} source={{uri: this.props.navigation.getParam('profilePicURL')}}></Image>
            <View style={{...styles.message, ...styles.otherMessage}}><Text style={styles.messageText}>{item.message}</Text></View>
          </View>
        </View>
    )
  }


  render() {

    const {navigation} = this.props;

    const goBackToContacts = () => {
      navigation.goBack();
    }

    return (
      <View style={{...styles.container, ...iOSPlatformStyle}}>
        <LinearGradient colors={['#FFF', '#FFFEEB']} style={{height: '100%'}}>
          <TouchableOpacity style={styles.topBanner} onPress={() => alert('info')}>
            <TouchableOpacity style={styles.backArrowContainer} onPress={goBackToContacts}>
              <Icon name='keyboard-arrow-left' color='#1B1B1B' size={50} />
            </TouchableOpacity>
            <Text style={styles.contactName}>User {navigation.getParam('contactName')}</Text>
            <View style={styles.contactInfoBtn}><Text style={styles.infoLetter}>i</Text></View>
          </TouchableOpacity>

          <View style={styles.conversationContainer}>
            {/*<View style={styles.otherMessageContainer}>
              <Image style={styles.userIcon} source={{uri: navigation.getParam('profilePicURL')}}></Image>
              <View style={{...styles.message, ...styles.otherMessage}}><Text style={styles.messageText}>please show ups Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, nobis.</Text></View>
            </View>

            <View style={styles.dateContainer}><Text style={styles.dateText}>Wed, Feb 26, 9:05am</Text></View>
            <View style={{...styles.message, ...styles.ownMessage}}><Text style={styles.messageText}>please show up</Text></View>

            <View style={styles.otherMessageContainer}>
              <Image style={styles.userIcon} source={{uri: navigation.getParam('profilePicURL')}}></Image>
              <View style={{...styles.message, ...styles.otherMessage}}><Text style={styles.messageText}>please show up</Text></View>
            </View>*/}

            {/*{this.state.messages ? this.mapMessages() : null}*/}
            <FlatList
              keyExtractor={(item) => item.message_id.toString()}
              data={this.state.messages}
              inverted
              initialScrollToIndex={this.state.messages ? this.state.messages.length - 1 : null}
              renderItem={({ item }) =>
                this.renderMessage(item)
              }

            />

          </View>
        </LinearGradient>
      </View>
    );
  }
}

class ShownDate extends Component {

}

const platform = Platform.OS;
let iOSPlatformStyle = {};
if (platform === 'ios') iOSPlatformStyle = {paddingTop: 40};

const contactPurple = '#7F06FE';
const gray = '#8D99AE';

const styles = StyleSheet.create({
  container: {
  },
  topBanner: {
    height: '10%',
    width: '100%',
    backgroundColor: 'white',
    shadowOffset: { height: 7 },
    shadowColor: '#8e8e8e',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowContainer: {
    position: 'absolute',
    width: '18%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    zIndex: 1,
  },
  contactName: {
    color: contactPurple,
    fontSize: 26,
    letterSpacing: 1,
    paddingLeft: '7%',
  },
  contactInfoBtn: {
    fontSize: 24,
    backgroundColor: contactPurple,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '4%'
  },
  infoLetter: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  userIcon: {
    width: 50,
    height: 50,
    backgroundColor:'#f0f0f0',
    borderRadius: 25,
    borderColor: gray,
    borderWidth: 2,
    marginRight: '5%'
  },
  conversationContainer: {
    // backgroundColor: 'pink',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  otherMessageContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 7,
    flexWrap: 'wrap'
  },
  message: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  otherMessage: {
    backgroundColor: '#2B2D42',
    borderTopLeftRadius: 0,
    maxWidth: '80%'
  },
  ownMessage: {
    borderTopRightRadius: 0,
    backgroundColor: '#439E73',
    marginVertical: 7,
    alignSelf: 'flex-end',
    maxWidth: '90%',
    minHeight: 50
  },
  messageText: {
    color: 'white',
    fontSize: 20,
  },
  dateContainer: {
    width: '100%',
    display: "flex",
    alignItems: "center",
    marginVertical: 10
  },
  dateText: {
    color: gray,
    fontSize: 18
  }
});