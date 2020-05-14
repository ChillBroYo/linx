import React, { Component } from 'react';
import { Text,  Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      response : null
    };
  }

  async componentDidMount() {
    
      console.log('bambi')
      fetch('https://fwbtngtv7j.execute-api.us-east-1.amazonaws.com/r2/get-convo/?uid=1&oid=2&token=58db4abf-fd9c-451f-ab5d-199f04118335&ts=')
        .then(response => response.json())
        .then(data => console.log(data));
      // this.response = response.messages;
      // this.setState({response: this.response})
      // console.log('bambi', this.response)
    
    
    
  }
  
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Messages</Text>

        {/*<Text style={{ fontWeight: 'bold', fontSize: 40 }}>
        <Text style={{ color: 'red' }}>Linx</Text>
        </Text>
        <View style={{ width: 50, height: 50 }} />
        <Button
          title={'Logout'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

