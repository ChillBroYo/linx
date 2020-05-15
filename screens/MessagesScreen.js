import React, { Component } from 'react';
import { Text,  Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      response : "yellow"
    };
  }

  componentDidMount() {
    // try {
    //   const response = await axios('https://fwbtngtv7j.execute-api.us-east-1.amazonaws.com/r2/get-convo/?uid=1&oid=2&token=58db4abf-fd9c-451f-ab5d-199f04118335&ts=');

    // }
    fetch('https://fwbtngtv7j.execute-api.us-east-1.amazonaws.com/r2/get-convo/?uid=1&oid=2&token=58db4abf-fd9c-451f-ab5d-199f04118335&ts=')
      .then(response => {
          console.log(response);
          return response.json();
      })
      .then(json => {
          console.log(json);
          this.setState({response: json.messages[1]})
          return json;
      })
      .catch(error => {
          console.log(error);
      });
    
  }
  
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Messages {this.state.response}</Text>

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
    backgroundColor: 'yellow',
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

