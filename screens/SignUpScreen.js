import React, { Component } from 'react';
import { Text, Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'

export default class App extends Component {
        constructor(props) {
                super(props);

                this.state = {
page: 0,
      text: '01/01/1900',
      username: '',
      password: '',
      retype: '',
      fname: '',
      lname: '',
      city: '',
      state: '',
      bday: '',
      gender: '',
      grateful: '',
      dreamed: '',
      treasured: '',
                };
        }

        onBackToLogin() {
                this.props.navigation.navigate('SignIn')
        }
        onContinue() {
                if (this.state.page == 0){
                        if (this.state.username == ''){
                                Alert.alert('Username is empty');
                                return
                        } else if (this.state.password != this.state.retype){
                                Alert.alert('Passwords don\'t match', `${this.state.password} != ${this.state.retype}`);
                                return
                        } else {
                                if (!this.validate()){
                                        Alert.alert('Username is already taken');
                                        return
                                }
                        }
                } else if (this.state.page == 1){
                        if (this.state.fname == '' || this.state.lname == ''){
                                Alert.alert('Missing First or Last Name');
                                return
                        }
                } else if (this.state.page == 2){
                        if (this.state.city == '' || this.state.state == ''){
                                Alert.alert('Missing City or State');
                                return
                        }
                }
                this.state.page += 1;
                this.props.navigation.navigate('SignUp', { state: this.state
                                });
        }
        onBack() {
                this.state.page -= 1;
                this.props.navigation.navigate('SignUp', { state: this.state
                                });
        }
        validate() {
                //Place holder
                return true
        }
        secondSignUp() {
                return (

                                <View style={styles.container}>
                                <Button
                                title={'Wait let me go back'}
                                style={styles.input}
                                onPress={this.onBack.bind(this)}
                                />
                                <View style={{ width: 50, height: 50 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 40 }}>
                                <Text style={{ color: 'red' }}>My Name is</Text>
                                </Text>
                                <View style={{ width: 50, height: 50 }} />
                                <TextInput
                                value={this.state.fname}
                                onChangeText={(fname) => this.setState({ fname })}
                                placeholder={'First Name'}
                                style={styles.input}
                                />
                                <TextInput
                                value={this.state.lname}
                                onChangeText={(lname) => this.setState({ lname })}
                                placeholder={'Last Name'}
                                secureTextEntry={true}
                                style={styles.input}
                                />
                                        <View style={{ width: 50, height: 50 }} />
                                        <Button
                                        title={'Continue'}
                                style={styles.input}
                                onPress={this.onContinue.bind(this)}
                                />
                                        </View>
                                        );
        }
        thirdSignUp() {
                return (

                                <View style={styles.container}>
                                <Button
                                title={'Wait let me go back'}
                                style={styles.input}
                                onPress={this.onBack.bind(this)}
                                />
                                <View style={{ width: 50, height: 50 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 40 }}>
                                <Text style={{ color: 'red' }}>I live in</Text>
                                </Text>
                                <View style={{ width: 50, height: 50 }} />
                                <TextInput
                                value={this.state.city}
                                onChangeText={(city) => this.setState({ city })}
                                placeholder={'City'}
                                style={styles.input}
                                />
                                <TextInput
                                value={this.state.state}
                                onChangeText={(state) => this.setState({ state })}
                                placeholder={'State'}
                                secureTextEntry={true}
                                style={styles.input}
                                />
                                        <View style={{ width: 50, height: 50 }} />
                                        <Button
                                        title={'Continue'}
                                style={styles.input}
                                onPress={this.onContinue.bind(this)}
                                />
                                        </View>
                                        );
        }
        fourthSignUp() {
                return (

                                <View style={styles.container}>
                                <Button
                                title={'Wait let me go back'}
                                style={styles.input}
                                onPress={this.onBack.bind(this)}
                                />
                                <View style={{ width: 50, height: 50 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 40 }}>
                                <Text style={{ color: 'red' }}>My Birthday is</Text>
                                </Text>
                                <View style={{ width: 50, height: 50 }} />
                                <TextInputMask
                                type={'custom'}
                                options={{
                                /**
                                 * mask: (String | required | default '')
                                 * the mask pattern
                                 * 9 - accept digit.
                                 * A - accept alpha.
                                 * S - accept alphanumeric.
                                 * * - accept all, EXCEPT white space.
                                 */
mask: '99/99/9999',
              placeholder: "01/01/1900"
                                }}
                                value={this.state.text}
                                fontSize={40}
                                onChangeText={text => {
                                        this.setState({
text: text
})
}}
style={'MM-DD-YYYY'}
/>

<View style={{ width: 50, height: 50 }} />
<Button
title={'Continue'}
style={styles.input}
onPress={this.onContinue.bind(this)}
/>
</View>
);
}


render() {
        if (this.props.navigation.state.params) {
                if (this.props.navigation.state.params.state.page == 1) {
                        return this.secondSignUp()
                } else if (this.props.navigation.state.params.state.page == 2) {
                        return this.thirdSignUp()
                } else if (this.props.navigation.state.params.state.page == 3) {
                        return this.fourthSignUp()
                }
        }
        return (

                        <View style={styles.container}>
                        <Button
                        title={'Wait I didn\'t want to sign up!'}
                        style={styles.input}
                        onPress={this.onBackToLogin.bind(this)}
                        />
                        <View style={{ width: 50, height: 50 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 40, textAlign: 'left' }}>
                        <Text style={{}}>Sign up</Text>
                        </Text>
                        <View style={{ width: 50, height: 50 }} />
                        <TextInput
                        value={this.state.username}
                        onChangeText={(username) => this.setState({ username })}
                        placeholder={'Username'}
                        style={styles.input}
                        />
                        <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        style={styles.input}
                        />
                                <TextInput
                                value={this.state.retype}
                        onChangeText={(retype) => this.setState({ retype })}
                        placeholder={'Retype Password'}
                        secureTextEntry={true}
                        style={styles.input}
                        />
                                <View style={{ width: 50, height: 50 }} />
                                <Button
                                title={'Continue'}
                        style={styles.input}
                        onPress={this.onContinue.bind(this)}
                        />
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

