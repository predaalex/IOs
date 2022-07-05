import styles from './styles'
import { Keyboard, Text, TextInput, View } from 'react-native'
import React, { useState } from "react";
import { Box, FlatList, Center, NativeBaseProvider, Button } from "native-base";
import IngredientsAutonomous from "./IngredientsAutonomous"

export default function SecondPage({navigation}) {
    
    // counter
    let [count, setCount] = useState(0);

    function incrementCount() {
        count = count + 1;
        setCount(count);
    }
    function decrementCount() {
        count = count - 1;
        setCount(count);
    }

    return (
        <>
        <View style={styles.counter}>
            <Text>Numarul de ingrediente</Text>
            <div>{count}</div>
            <button onClick={incrementCount}>+</button>
            <button onClick={decrementCount}>-</button>
        </View>
        <IngredientsAutonomous/>;
        </>
    )
}