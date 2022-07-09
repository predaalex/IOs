import React, { useState, useRef } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert, Animated} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../firebase/config'
import styles from './styles';
import animationData from "../../../assets/animated_cocktail.json";
import LottieView from 'lottie-react-native';

import axios from "axios";

export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = async () => {
        const api_key = "AIzaSyCajM9YfO0A5xf3wCz3zHSFj-Vy80djE4w";
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword" + "?key=" + api_key;
        console.log(url);
        try {
            const response = await axios.post(url,
                {
                email:email,
                password: password,
                });
            console.log(response)
            localStorage.setItem("userName", "");
            localStorage.setItem("userEmail", email);

            navigation.navigate('Home');
        }
        catch (msg) {
            console.log(msg)
            Alert.alert("Eroare", "Verificati credentialele!")
        }
    }


      const animation = useRef(null);

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={{alignItems:'center'}}>
                    <LottieView
                        autoPlay
                        ref={animation}
                        style={{
                        width: 200,
                        height: 200,
                        }}
                        source={animationData}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}