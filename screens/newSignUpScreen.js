import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { LinearGradient} from 'expo-linear-gradient';
import styled from '@emotion/native'

export default function SignUp(props) {
    const [page, setPage] = useState(1);
    // screen 1
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRetype, setPasswordRetype] = useState('');
    const [username, setUsername] = useState('');
    // screen 2
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    // screen 3
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [distance, setDistance] = useState(25);
    // screen 4
    const [birthday, setBirthday] = useState('');
    const [ageRange, setAgeRange] = useState([23, 29]);
    // screen 5
    const [gender, setGender] = useState('');
    const [sameGender, setSameGender] = useState(false);
    // screen 6
    const interests = ['art', 'food', 'nature', 'sports'];
    const [selectedInterests, setSelectedInterests] = useState(new Set());
    const [sameInterests, setSameInterests] = useState(false);

    function onBack() {
        page == 1 ? onBackToLogin() : setPage(page - 1);
    }

    function onBackToLogin() {
        props.navigation.navigate('SignIn');
    }

    function onContinue() {
        // if (page == 1) {
        //     if (!username) {
        //         Alert.alert('Username is empty');
        //         return;
        //     }
        //     else if (!email) {
        //         Alert.alert('Email is empty');
        //         return;
        //     }
        //     else if (!password || !passwordRetype) {
        //         Alert.alert('Password is empty');
        //         return;
        //     }
        //     else if (password != passwordRetype) {
        //         Alert.alert("Passwords don't match");
        //         return;
        //     }
        //     else {
        //         if (!validate()) {
        //             Alert.alert('Username is already taken');
        //             return;
        //         }
        //         if (!validate()) {
        //             Alert.alert('Email is already taken');
        //             return;
        //         }
        //     }
        // }
        // else if (page == 2) {
        //     if (!fname || !lname) {
        //         Alert.alert('Missing First or Last Name');
        //         return;
        //     }
        // }
        // else if (page == 3) {
        //     if (!city || !state) {
        //         Alert.alert('Missing City or State');
        //         return;
        //     }
        // }

        setPage(page + 1);
    }

    function validate() {
        // TODO: fill in later
        return true;
    }

    function onDone() {
        let emailData = `email=${email}`;
        let usernameData = `username=${username}`;
        let passwordData = `password=${password}`;
        let securityLevelData = `security_level=user`;
        let infoData = `info={
            name: ${{
                first: fname,
                last: lname
            }},
            city: ${city},
            state: ${state},
            distance: ${distance},
            birthday: ${birthday},
            ageRange: ${ageRange},
            gender: ${gender},
            sameGender: ${sameGender},
            interests: ${[...selectedInterests]},
        }`;

        fetch(`http://192.168.1.15:8080/sign_up/?${emailData}&${usernameData}&${passwordData}&${securityLevelData}&${infoData}`)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(json => {
            console.log(json);
            return json;
        })
        .catch(err => {
            console.log('ERROR:', err);
            console.log(JSON.stringify(err));
        });
    }

    let view;
    if (page == 1) {
        view = <SignUpOne
            email={email}
            password={password}
            passwordRetype={passwordRetype}
            username={username}
            setEmail={setEmail}
            setPassword={setPassword}
            setPasswordRetype={setPasswordRetype}
            setUsername={setUsername}
        />;
    }
    else if (page == 2) {
        view = <SignUpTwo
            fname={fname}
            lname={lname}
            setFname={setFname}
            setLname={setLname}
        />;
    }
    else if (page == 3) {
        view = <SignUpThree
            city={city}
            state={state}
            distance={distance}
            setCity={setCity}
            setState={setState}
            setDistance={setDistance}
        />;
    }
    else if (page == 4) {
        view = <SignUpFour
            birthday={birthday}
            ageRange={ageRange}
            setBirthday={setBirthday}
            setAgeRange={setAgeRange}
        />;
    }
    else if (page == 5) {
        view = <SignUpFive
            gender={gender}
            sameGender={sameGender}
            setGender={setGender}
            setSameGender={setSameGender}
        />;
    }
    else if (page == 6) {
        view = <SignUpSix
            interests={interests}
            selectedInterests={selectedInterests}
            sameInterests={sameInterests}
            setSelectedInterests={setSelectedInterests}
            setSameInterests={setSameInterests}
        />;
    }

    return (
        // SafeAreaView automatically adjusts for the notch on iOS
        <Container>
            <LinearGradient colors={['rgba(254, 241, 2, 0)', 'rgba(254, 241, 2, 0.1)']} style={{flex: 1}}>
                <KeyboardAvoidingView behavior='height' style={{flex: 1}}>
                    <SafeAreaView style={{flex: 1}}>
                        <ProgressBar page={page} />
                        <View style={{flex: 1}}>
                            <Back onPress={onBack}>&#10094;</Back>
                            {view}
                            <TouchableWithoutFeedback onPress={page < 6 ? onContinue : onDone}>
                                <Continue>
                                    <Text style={{color: 'white', fontSize: 20, fontWeight: '600', lineHeight: 27}}>Continue</Text>
                                </Continue>
                            </TouchableWithoutFeedback>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </Container>
    );
}

function SignUpOne(props) {
    return (
        <SignUpWrapper>
            <SignUpHeader>Sign up</SignUpHeader>
            <SignUpFormWrapper>
                <SignUpTextInput
                    name='username'
                    placeholder='Username'
                    value={props.username}
                    onChangeText={username => props.setUsername(username)}
                    style={styles.input}
                />
                <SignUpTextInput
                    keyboardType='email-address'
                    name='email'
                    placeholder='Email'
                    value={props.email}
                    onChangeText={email => props.setEmail(email)}
                    style={styles.input}
                />
                <SignUpTextInput
                    secureTextEntry
                    name='password'
                    placeholder='Password'
                    value={props.password}
                    onChangeText={password => props.setPassword(password)}
                    style={styles.input}
                />
                <SignUpTextInput
                    secureTextEntry
                    name='passwordRetype'
                    placeholder='Retype Password'
                    value={props.passwordRetype}
                    onChangeText={password => props.setPasswordRetype(password)}
                    style={styles.input}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}

function SignUpTwo(props) {
    return (
        <SignUpWrapper>
            <SignUpHeader>My name is</SignUpHeader>
            <SignUpFormWrapper>
                <SignUpTextInput
                    name='fname'
                    placeholder='First Name'
                    value={props.fname}
                    onChangeText={fname => props.setFname(fname)}
                    style={styles.input}
                />
                <SignUpTextInput
                    name='lname'
                    placeholder='Last Name'
                    value={props.lname}
                    onChangeText={lname => props.setLname(lname)}
                    style={styles.input}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}

function SignUpThree(props) {
    return (
        <SignUpWrapper>
            <SignUpHeader>I live in</SignUpHeader>
            <SignUpFormWrapper>
                <SignUpTextInput
                    placeholder='City'
                    value={props.city}
                    onChangeText={city => props.setCity(city)}
                    style={styles.input}
                />
                <SignUpTextInput
                    placeholder='State'
                    value={props.state}
                    onChangeText={state => props.setState(state)}
                    style={styles.input}
                />
                <SignUpText>
                    Connect with people who are less than <SignUpTextValue>{props.distance}</SignUpTextValue> miles away
                </SignUpText>
                <MultiSlider
                    min={5}
                    max={50}
                    values={[props.distance]}
                    onValuesChange={distance => props.setDistance(parseInt(distance))}
                    selectedStyle={{backgroundColor: PURPLE}}
                    trackStyle={{backgroundColor: PURPLE}}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}

function SignUpFour(props) {
    return (
        <SignUpWrapper>
            <SignUpHeader>My birthday is</SignUpHeader>
            <SignUpFormWrapper>
                <TextInputMask
                    keyboardType='number-pad'
                    type='datetime'
                    options={{ format:'MM / DD / YYYY' }}
                    placeholder='MM / DD / YYYY'
                    value={props.birthday}
                    onChangeText={props.setBirthday}
                />
                <SignUpText>
                    Connect with people who are between <SignUpTextValue>{props.ageRange[0]}</SignUpTextValue> and <SignUpTextValue>{props.ageRange[1]}</SignUpTextValue> years old
                </SignUpText>
                <MultiSlider
                    min={21}
                    max={40}
                    values={props.ageRange}
                    onValuesChange={ageRange => props.setAgeRange(ageRange.map(age => parseInt(age)))}
                    selectedStyle={{backgroundColor: PURPLE}}
                    trackStyle={{backgroundColor: PURPLE}}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}

function SignUpFive(props) {
    return (
        <SignUpWrapper>
            <SignUpHeader>I'm a</SignUpHeader>
            <SignUpFormWrapper>
                <TouchableWithoutFeedback onPress={() => props.setGender('woman')}>
                    <PillButton selected={props.gender == 'woman'}>
                        <PillText selected={props.gender == 'woman'}>Woman</PillText>
                    </PillButton>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => props.setGender('man')}>
                    <PillButton selected={props.gender == 'man'}>
                        <PillText selected={props.gender == 'man'}>Man</PillText>
                    </PillButton>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => props.setGender('other')}>
                    <PillButton selected={props.gender == 'other'}>
                        <PillText selected={props.gender == 'other'}>Other</PillText>
                    </PillButton>
                </TouchableWithoutFeedback>
                <SignUpText>Connect only with the same gender as me</SignUpText>
                <Toggle
                    value={props.sameGender}
                    onValueChange={sameGender => props.setSameGender(sameGender)}
                    trackColor={{
                        false: '#8D99AE',
                        true: PURPLE
                    }}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}

function SignUpSix(props) {
    // FlatList renderItem passes { index: <i>, item: <data[i]> }
    function renderInterest({ item: interest }) {
        let isSelected = props.selectedInterests.has(interest);

        return (
            <TouchableWithoutFeedback onPress={() => toggleInterest(interest)}>
                <PillButton selected={isSelected}>
                    <PillText selected={isSelected}>{interest}</PillText>
                </PillButton>
            </TouchableWithoutFeedback>
        );
    }

    function toggleInterest(interest) {
        let nextInterests = new Set([...props.selectedInterests]);
        console.log({
            selectedInterests: props.selectedInterests,
            nextInterests
        });
        props.selectedInterests.has(interest) ? nextInterests.delete(interest) : nextInterests.add(interest);
        props.setSelectedInterests(nextInterests);
    }

    return (
        <SignUpWrapper>
            <SignUpHeader>I like</SignUpHeader>
            <SignUpFormWrapper wide={true}>
                <FlatList
                    data={props.interests}
                    extraData={props.selectedInterests}
                    horizontal={false}
                    numColumns={2}
                    renderItem={renderInterest}
                />
                <SignUpText>Connect only with people that like the same things as me</SignUpText>
                <Toggle
                    value={props.sameInterests}
                    onValueChange={sameInterests => props.setSameInterests(sameInterests)}
                    trackColor={{
                        false: '#8D99AE',
                        true: PURPLE
                    }}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}


// constant css values
const PURPLE = '#8002FE'
const INPUT_HEIGHT = '44px';
const INPUT_WIDTH = '252px';

const Container = styled.View`
    flex: 1;
`;

const Column = styled.View`
    display: flex;
    flex-direction: column;
`;

const Row = styled.View`
    display: flex;
`;

const Back = styled.Text`
    color: #1B1B1B;
    font-size: 36;
    font-weight: 900;
    margin: 12px 30px 0;
`;

const Continue = styled.View`
    background: ${props => props.page < 6 ? '#8D99AE' : '#439E73'};
    align-items: center;
    justify-content: center;
    height: 56px;
    margin-top: 16px;
`;

const PillButton = styled.View`
    align-items: center;
    justify-content: center;
    background: ${props => props.selected ? PURPLE : 'transparent'};
    border-color: ${props => props.selected ? PURPLE : '#1B1B1B'};
    border-style: solid;
    border-width: 1px;
    border-radius: 100px;
    height: 42px;
    width: 141px;
    margin: 0 11px 23px;
`;

const PillText = styled.Text(props => ({
    color: props.selected ? 'white' : '#1B1B1B',
    fontWeight: props.selected ? '700' : '400'
}));

const ProgressBar = styled.View(props => ({
    backgroundColor: PURPLE,
    height: 11,
    width: `${(props.page / 6) * 100}%`,
}));

const SignUpWrapper = styled.View`
    flex: 1;
`;

const SignUpHeader = styled.Text`
    color: ${PURPLE};
    fontSize: 30px;
    lineHeight: 41px;
    margin: 16px 60px 32px;
`;

const SignUpFormWrapper = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: ${props => props.wide ? '0 40px' : '0 60px'};
`;

const SignUpTextInput = styled.TextInput`
    border-color: #1B1B1B;
    border-style: solid;
    border-bottom-width: 1px;
    font-size: 20px;
    font-style: ${props => props.value ? 'normal' : 'italic'};
    margin-bottom: 10px;
    padding: 10px;
    height: ${INPUT_HEIGHT};
    width: 100%;
`;

const SignUpText = styled.Text`
    color: black;
    font-size: 20px;
    line-height: 25px;
    margin-top: 20px;
    width: 252px;
`;

const SignUpTextValue = styled.Text`
    color: ${PURPLE};
    font-weight: 700;
`;

const Toggle = styled.Switch`
    margin-top: 16px;
    height: 36px;
    width: 80px;
`;

const styles = StyleSheet.create({});
