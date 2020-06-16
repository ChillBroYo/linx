import React, { Component } from 'react';
import { Text,  Alert, Button, Image, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.currentUserID = 1;
    this.tokens = {
      1 : '58db4abf-fd9c-451f-ab5d-199f04118335',
      2 : 'beacde9c-d02f-40ea-a987-fac7b8b1b019',
      3 : '12b2d376-d566-42a8-8109-11586e205698',
      4 : '410735d6-1ac9-4e16-b0db-88282c77858f',
      5 : '289f72a7-3cdf-401f-b589-5366f5ccb9a1',
      7 : 'b617cc9f-3c0b-4506-ab10-e2941ba4dfd5',
    };
    this.state = {
      conversations : {},
      isRead : false,
    };
  }

  async componentDidMount() {
    try {
      

    }
    catch(error) {
      alert(`An error occurred: ${error}`);
    }    
  }

  
  
  
  render() {
    return (
      <View>
        <LinearGradient colors={['#FFF', '#FFFEEB']} style={{height: '100%'}}>
          <View style={styles.container}>
            <Text style={styles.heading}>Profile of Ohter user</Text>
            
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

