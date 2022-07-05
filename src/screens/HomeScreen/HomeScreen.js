import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'
import { FAB } from 'react-native-paper';
import 'react-native-vector-icons';

export default function HomeScreen({navigation}) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    
    console.log(userName + " " + userEmail);

    const onFABPress = () => {
        navigation.navigate('Second')
    }

    return (
        
        <View style={styles.container}>
                <Text>Salut are</Text>
                <FAB title="New cocktail" 
                style={styles.fab}
                icon = "plus"
                onPress={onFABPress}
                />
        </View>
    )

}