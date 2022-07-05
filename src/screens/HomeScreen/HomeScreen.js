import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function HomeScreen(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    console.log("wohoo");
    // const userID = props.extraData.id

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    
    console.log(userName + " " + userEmail);

    return <Text>MERGE</Text>

}