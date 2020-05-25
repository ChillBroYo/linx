import React, { Component } from 'react';
import { Text,  Alert, Button, Platform, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages : "why"
    };
    
  }

  async componentDidMount() {
    try {
      const response = await axios('https://fwbtngtv7j.execute-api.us-east-1.amazonaws.com/r2/get-convo/?uid=1&oid=2&token=58db4abf-fd9c-451f-ab5d-199f04118335&ts=');
      this.messages = response.data.messages;
      this.setState({messages: this.messages})
    }
    catch(error) {
      alert(`An error occurred : ${error}`);
    }
    
  }
  
  // {this.props.navigation.getParam('user')}
  render() {
    
    

    return (
      <View style={{...styles.container, ...iOSPlatformStyle}}>
        
        {/*<Text>Fantasia {this.state.messages[0].message}</Text>*/}
        <View style={styles.topBanner}>
          <TouchableOpacity style={styles.backArrowContainer} onPress={() => alert('back')}>
            <Icon name='keyboard-arrow-left' color='#1B1B1B' size={50} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactInfoTouch} onPress={() => alert('info')}>
            <Text style={styles.contactName}>Kevin L.</Text>
            <View style={styles.contactInfoBtn}><Text style={styles.infoLetter}>i</Text></View>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}

const platform = Platform.OS;
let iOSPlatformStyle = {};
if (platform === 'ios') iOSPlatformStyle = {paddingTop: 40};

const contactPurple = '#7F06FE';

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center', // flexDirection is 'column' by default
  // },
  topBanner: {
    height: '30%',
    width: '100%',
    backgroundColor: 'white',
    shadowOffset: { height: 7 },
    shadowColor: '#8e8e8e',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    
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
  contactInfoTouch: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactName: {
    color: contactPurple,
    fontSize: 26,
    letterSpacing: 1
  },
  contactInfoBtn: {
    fontSize: 24,
    backgroundColor: contactPurple,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '2%'
  },
  infoLetter: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  }
});