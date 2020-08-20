import React, { Component } from 'react';
import { Image, Text, Alert, Button, Dimensions, FlatList, KeyboardAvoidingView, ScrollView, Platform, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Header } from "react-navigation-stack";
import { Ionicons } from '@expo/vector-icons';
import InView from "react-native-component-inview";
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import axios from 'axios';

const platform = Platform.OS;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.currentUserID = props.navigation.getParam('currentUserID') || 2;
    this.currentUserToken = props.navigation.getParam('currentUserToken') || '43985ece-e49d-477f-b843-3a5501799ef7&limit=1000';
    this.state = {
      messages : null,
      startIndex: 0,
      endIndex: 7,
      userInput: '',
    };
    this.displayedMessages = [];
    this.formatMoment();
    this.handleScrollTop = this.handleScrollTop.bind(this);
    this.mapMessages = this.mapMessages.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios(`https://1g3l9sc0l0.execute-api.us-east-1.amazonaws.com/dev/get-conversation/?uid=${this.currentUserID}&oid=${this.props.navigation.getParam('contactID')}&token=${this.currentUserToken}&limit=1000&ts=`);
      const messages = response.data.messages;
      this.setState({
        messages,
      }, () => this.mapMessages(this.state.startIndex, Math.min(this.state.endIndex, this.state.messages.length - 1)));
      
      this.refreshMessages = setInterval(() => this.mapMessages(0, Math.min(7, this.state.messages.length - 1), true, true), 2000);
      
    }
    catch(error) {
      alert(`An error occurred : ${error}`);
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshMessages);
  }

  formatDate(dateStr) {
    return `${dateStr.substring(0, 10)}T${dateStr.substring(11, 19)}Z`;
  }

  formatMoment() {
    moment.updateLocale('en', {
      longDateFormat : {
          llll: "ddd, MMM D LT"
      }
    });
  }

  mapMessages(start, end, refreshing, mounted) {
    if (this.state.messages.length === 0) return;
    let showDate;
    const moreMessages = [];
    let lastShownMessagDate = new Date(this.formatDate(this.state.messages[end].created_at))

    // console.log('map', this.state.isVisible, refreshing, 'mounted', mounted)
    if (refreshing === true) this.displayedMessages = [];

    for (let i = end; i >= start; i--) {
      const currentMessage = this.state.messages[i];
      const currentMessageDate = new Date(this.formatDate(currentMessage.created_at));

      if (i === end || currentMessageDate - lastShownMessagDate > 1000 * 60 * 60) {
        showDate = true;
        lastShownMessagDate = currentMessageDate;
      }
      else {
        showDate = false;
      }

      if (currentMessage.user_id == this.currentUserID) {
        if (i === 0) {
          moreMessages.push(
          <InView onChange={isVisible => this.setState({isVisible})}>
            <OwnMessage showDate={showDate} currentMessage={currentMessage.message} currentMessageDate={showDate ? moment(currentMessageDate).format('llll') : null} />
          </InView>
          )
        }
        else {
          moreMessages.push(
            <OwnMessage showDate={showDate} currentMessage={currentMessage.message} currentMessageDate={showDate ? moment(currentMessageDate).format('llll') : null} />
          )
        }
      }
      else {
        if (i === 0) {
          moreMessages.push(
          <InView onChange={isVisible => this.setState({isVisible})}>
            <OtherMessage showDate={showDate} currentMessage={currentMessage.message} currentMessageDate={showDate ? moment(currentMessageDate).format('llll') : null} profilePicURL={this.props.navigation.getParam('profilePicURL')} />
          </InView>
          )
        }
        else {
          moreMessages.push(<OtherMessage showDate={showDate} currentMessage={currentMessage.message} currentMessageDate={showDate ? moment(currentMessageDate).format('llll') : null} profilePicURL={this.props.navigation.getParam('profilePicURL')} />);
        }
      }
    }

    this.displayedMessages = moreMessages.concat(this.displayedMessages);
    this.forceUpdate();
  }

  handleScrollTop(event) {
    const offset = event.nativeEvent.contentOffset.y;
    clearInterval(this.refreshMessages);

    if (offset < 0 && offset > -5 && this.state.endIndex < this.state.messages.length - 1) {
      this.setState({
        startIndex: this.state.endIndex + 1,
        endIndex: Math.min(this.state.endIndex + 10, this.state.messages.length - 1),
      }, () => this.mapMessages(this.state.startIndex, this.state.endIndex));
    }
    else if (this.state.isVisible) {
      this.setState({
        startIndex: 0,
        endIndex: 7
      });
      this.refreshMessages = setInterval(() => this.mapMessages(0, Math.min(7, this.state.messages.length - 1), true), 2000);
    }
  }

  async uploadMessage() {
    try {
      const msgObj = {
        "uid" : this.currentUserID,
        "oid" : this.props.navigation.getParam('contactID'),
        "token" : this.currentUserToken,
        "msg" : this.state.userInput
      }

      const API_ENDPOINT = 'https://1g3l9sc0l0.execute-api.us-east-1.amazonaws.com/dev/add-message/';
      const params = new URLSearchParams();
      for (let key in msgObj) {
        params.append(key, msgObj[key]);
      }
      const res = await axios.post(API_ENDPOINT, params);

      const response = await axios(`https://1g3l9sc0l0.execute-api.us-east-1.amazonaws.com/dev/get-conversation/?uid=${this.currentUserID}&oid=${this.props.navigation.getParam('contactID')}&token=${this.currentUserToken}&limit=1000&ts=`);
      const messages = response.data.messages;
      this.setState({
        messages,
      });
      
      this.displayedMessages.push(<OwnMessage currentMessage={this.state.userInput} />);
      this.setState({userInput:''});
      this.forceUpdate();
    }
    catch (error) {
      console.log('message upload error:', error)
    }
  }

  


  render() {
    const {navigation} = this.props;

    const goBackToContacts = () => {
      navigation.goBack();
    }

    const contactPressHandler = () => {
      this.props.navigation.navigate('MessagesProfile',
        {
          currentUserID: navigation.getParam('currentUserID'),
          currentUserToken: navigation.getParam('currentUserToken'),
          contactID: navigation.getParam('contactID')
        })
    }

    return (
      <KeyboardAvoidingView style={{...styles.container, ...iOSPlatformStyle}} behavior={platform === "ios" ? "padding" : null} >
        <LinearGradient colors={['#FFF', '#FFFEEB']} style={{height: '100%'}}>
          <TouchableOpacity style={styles.topBanner} onPress={contactPressHandler}>
            <TouchableOpacity style={styles.backArrowContainer} onPress={goBackToContacts}>
              <Ionicons name='ios-arrow-back' color='#1B1B1B' size={50} />
            </TouchableOpacity>
            <Text style={styles.contactName}>{navigation.getParam('contactName')}</Text>
            <View style={styles.contactInfoBtn}><Text style={styles.infoLetter}>i</Text></View>
          </TouchableOpacity>

          <View style={styles.conversationContainer}>
            <ScrollView
              style={styles.scrollView}
              ref={ref => {this.scrollView = ref}}
              onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
              onScroll={this.handleScrollTop}
              onScrollAnimationEnd={this.handleScrollTop}
            >
              {this.displayedMessages}
            </ScrollView>
          </View>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.messageInput}
              onChangeText={(val) => this.setState({userInput: val})}
              value={this.state.userInput}
              multiline
            />
            <TouchableOpacity style={styles.sendIconContainer} onPress={() => this.uploadMessage()}>
              <Ionicons name="md-send" size={30} color={"black"} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

function OwnMessage(props) {
  const {showDate, currentMessage, currentMessageDate} = props;

  return (
    <View>
      {showDate ? <View style={styles.dateContainer}><Text style={styles.dateText}>{currentMessageDate}</Text></View> : null}
      <View style={{...styles.message, ...styles.ownMessage}}>
        <Text style={styles.messageText}>{currentMessage}</Text>
      </View>
    </View>
  )
}

function OtherMessage(props) {
  const {showDate, currentMessage, currentMessageDate, profilePicURL} = props;
  
  return (
    <View>
      {showDate ? <View style={styles.dateContainer}><Text style={styles.dateText}>{currentMessageDate}</Text></View> : null}
      <View style={styles.otherMessageContainer}>
        <Image style={styles.userIcon} source={{uri: profilePicURL}}></Image>
        <View style={{...styles.message, ...styles.otherMessage}}><Text style={styles.messageText}>{currentMessage}</Text></View>
      </View>
    </View>
  )
}

let iOSPlatformStyle = {};
if (platform === 'ios') iOSPlatformStyle = {paddingTop: 40};

const contactPurple = '#7F06FE';
const gray = '#8D99AE';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  scrollView: {
    flex: 1,
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
    zIndex: 1000
  },
  backArrowContainer: {
    position: 'absolute',
    width: '18%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    zIndex: 1001,
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
    marginRight: 10
  },
  conversationContainer: {
    height: '80%',
    width: '100%',
    overflow: "scroll",
    paddingHorizontal: 15
  },
  flatlist: {
    paddingHorizontal: '5%',
  },
  otherMessageContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 7,
  },
  message: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
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
  },
  inputContainer: {
    backgroundColor: '#CCC',
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-around"
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: '80%',
    backgroundColor: 'white'
  },
  sendIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
  }
});
