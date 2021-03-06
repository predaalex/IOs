import React, { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider, Text } from "native-base";
import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import {Chip} from 'react-native-paper'
import axios from 'axios'
import { Button } from 'react-native'
import styles from './styles';

export default function SecondPage({navigation}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const resp = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list");
        const data = await resp.data.drinks;
        setData(data);
        setLoading(false);
    };

    const onIngredientPress = ( item ) => {
        console.log(item);
        localStorage.setItem("ingredient", item);
        navigation.navigate('Third')
    }

    const renderItem = ({ item }) => {
        return (
            // <TouchableOpacity 
            //     onPress={() => onIngredientPress(item.strIngredient1)}>
            //     <Text style={styles.items}>{item.strIngredient1}</Text>
            // </TouchableOpacity>
            <Chip
              mode="outlined"
              onPress = {() => onIngredientPress(item.strIngredient1)}
              style={styles.chip}
              >
              <Text>{item.strIngredient1}</Text>
            </Chip>
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Text style={styles.box}> Choose ingredient</Text>
                {loading && <Box>Loading..</Box>}
                {data && (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.strIngredient1}
                    />
                )}
            </Center>
        </NativeBaseProvider>
    )
}