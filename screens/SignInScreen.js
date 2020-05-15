import React, { useState } from 'react';
import {
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import styled from '@emotion/native'

const BACKGROUND_IMAGE = { uri: 'https://linx-images.s3-us-west-2.amazonaws.com/reference/main_pic.png' };

export default function SignIn(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function onSignIn() {
        // Alert.alert(`Credentials: ${username} + ${password}`);
        props.navigation.navigate('Home');
    }

    function onSignUp() {
        props.navigation.navigate('SignUp');
    }

    return (
        <Container>
            <Background source={BACKGROUND_IMAGE}>
                <Wrapper>
                    <Header>Linx</Header>
                    <Input
                        placeholder='Email'
                        value={username}
                        onChangeText={(username) => setUsername(username)}
                    />
                    <Input
                        placeholder='Password'
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        secureTextEntry={true}
                    />
                    <TouchableWithoutFeedback onPress={onSignIn}>
                        <Button colored={true}>
                            <ButtonText>Sign in</ButtonText>
                        </Button>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={onSignUp}>
                        <Button>
                            <ButtonText colored={true}>Sign up</ButtonText>
                        </Button>
                    </TouchableWithoutFeedback>
                </Wrapper>
            </Background>
        </Container>
    );
}

const GREEN = '#439E73';

const Container = styled.View`
    flex: 1;
    flex-direction: column;
`;

const Wrapper = styled.View`
    align-items: center;
`;

const Background = styled.ImageBackground`
    flex: 1;
    resize-mode: cover;
`;

const Header = styled.Text`
    color: white;
    font-size: 80px;
    margin-bottom: 36px;
    margin-top: 20%;
`

const Input = styled.TextInput`
    background: rgba(255, 255, 255, 0.75);
    border-radius: 10px;
    margin-bottom: 16px;
    padding: 14px;
    height: 48px;
    width: 268px;
`;

const Button = styled.View`
    align-items: center;
    justify-content: center;
    background: ${props => props.colored ? GREEN : 'transparent'};
    border-radius: 10px;
    margin-top: 16px;
    height: 41px;
    width: 164px;
`;

const ButtonText = styled.Text`
    color: ${props => props.colored ? GREEN : 'white'};
    font-size: 20px;
    font-weight: 600;
    line-height: 27px;
`;
