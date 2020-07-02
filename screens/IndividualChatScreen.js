import React, { Component } from 'react';
import { Image, Text, Alert, Button, FlatList, ScrollView, Platform, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
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
      displayedMessages : [],
      startIndex: 0,
      endIndex: 7
    };
    this.displayedMessages = [];

    this.handleScrollTop = this.handleScrollTop.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios('https://1g3l9sc0l0.execute-api.us-east-1.amazonaws.com/dev/get-conversation/?uid=2&oid=1&token=43985ece-e49d-477f-b843-3a5501799ef7&limit=1000&ts=');
      // const response = await axios(`https://1g3l9sc0l0.execute-api.us-east-1.amazonaws.com/dev/get-conversation/?uid=${this.currentUserID}&oid=${this.props.navigation.getParam('contactID')}&token=${this.currentUserToken}&limit=1000&ts=`);
      const messages = response.data.messages;
      this.setState({
        messages,
      }, () => this.mapMessages(this.state.startIndex, this.state.endIndex))
      
    }
    catch(error) {
      alert(`An error occurred : ${error}`);
    }
  }

  formatDate(dateStr) {
    return `${dateStr.substring(0, 10)}T${dateStr.substring(11, 19)}Z`;
  }

  dateOptions = { weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };

  mapMessages(start, end) {
    let showDate;
    const moreMessages = [];
    let lastShownMessagDate = new Date(this.formatDate(this.state.messages[end].created_at))

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
        moreMessages.push(<OwnMessage currentMessage={currentMessage} currentMessageDate={currentMessageDate} showDate={showDate} />)
      }
      else {
        moreMessages.push(<OtherMessage showDate={showDate} currentMessage={currentMessage} currentMessageDate={showDate ? currentMessageDate : null} profilePicURL={this.props.navigation.getParam('profilePicURL')} />)
      }
    }

    this.displayedMessages = moreMessages.concat(this.displayedMessages);
    this.forceUpdate();
  }

  handleScrollTop(event) {
    const offset = event.nativeEvent.contentOffset.y;
    if (offset < 0 && offset >= -3 && this.state.endIndex < this.state.messages.length - 1) {
      this.setState({
        startIndex: this.state.endIndex + 1,
        endIndex: Math.min(this.state.endIndex + 10, this.state.messages.length - 1),
      }, () => this.mapMessages(this.state.startIndex, this.state.endIndex));
    }
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
        </LinearGradient>
      </View>
    );
  }
}

const dateOptions = { weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };

function OwnMessage(props) {
  const {showDate, currentMessage, currentMessageDate} = props;

  return (
    <View>
      {showDate ? <View style={styles.dateContainer}><Text style={styles.dateText}>{currentMessageDate.toLocaleDateString("en-US", dateOptions)}</Text></View> : null}
      <View key={currentMessage.message_id} style={{...styles.message, ...styles.ownMessage}}>
        <Text style={styles.messageText}>{currentMessage.message}</Text>
      </View>
    </View>
  )
}

function OtherMessage(props) {
  const {showDate, currentMessage, currentMessageDate, profilePicURL} = props;
  
  return (
    <View>
      {showDate ? <View style={styles.dateContainer}><Text style={styles.dateText}>{currentMessageDate.toLocaleDateString("en-US", dateOptions)}</Text></View> : null}
      <View key={currentMessage.message_id} style={styles.otherMessageContainer}>
        <Image style={styles.userIcon} source={{uri: profilePicURL}}></Image>
        <View style={{...styles.message, ...styles.otherMessage}}><Text style={styles.messageText}>{currentMessage.message}</Text></View>
      </View>
    </View>
  )
}

const platform = Platform.OS;
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
    position: 'absolute',
    top: '10%',
    height: '90%',
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
  }
});
