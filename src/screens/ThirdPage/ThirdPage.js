import styles from './styles'
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { firebase } from '../../firebase/config';

export default function ThirdPage({navigation}) {

    const ingredient = localStorage.getItem("ingredient")
    console.log("ingredientul jmk este: " + ingredient);


    return (
        <Text>Numarul de ingrediente</Text>
    )
} 
